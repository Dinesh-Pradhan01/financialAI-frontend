import { useState, useRef, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { buildUploadFormData, validateFile } from "../lib/uploadHelpers";
import {
  savePersistedQueue,
  loadPersistedQueue,
  type PersistedQueueRecord,
  type UploadItemStatus,
} from "../lib/queuePersistence";
import type { CompanyDocument } from "@/shared/types/api";

export type { UploadItemStatus };

export interface UploadQueueItem {
  id: string;
  file: File;
  fileName: string;
  fileSize: number;
  documentType?: string;
  documentCategory?: string;
  status: UploadItemStatus;
  stage?: string;
  errorMessage?: string;
  verifyingMessage?: string;
  uncertainClassification?: boolean;
  uploadedDocument?: CompanyDocument;
  createdAt: number;
  isInterrupted?: boolean;
}

export interface UseUploadQueueOptions {
  onAllSettled?: () => void;
  onItemSuccess?: (item: UploadQueueItem, doc: CompanyDocument) => void;
  onItemError?: (item: UploadQueueItem, error: unknown) => void;
}

function syncToStorage(items: UploadQueueItem[]): void {
  const records: PersistedQueueRecord[] = items.map((i) => ({
    id: i.id,
    fileName: i.fileName,
    fileSize: i.fileSize,
    documentType: i.documentType,
    documentCategory: i.documentCategory,
    status: i.status,
    stage: i.stage,
    errorMessage: i.errorMessage,
    verifyingMessage: i.verifyingMessage,
    uncertainClassification: i.uncertainClassification,
    uploadedDocument: i.uploadedDocument,
    createdAt: i.createdAt,
    isInterrupted: i.isInterrupted,
  }));
  savePersistedQueue(records);
}

export function useUploadQueue(options: UseUploadQueueOptions = {}) {
  // Hydrate initial queue from localStorage
  const [items, setItems] = useState<UploadQueueItem[]>(() => {
    const loaded = loadPersistedQueue();
    return loaded.map((rec) => ({
      ...rec,
      // Provide fallback File object for memory consistency
      file: new File([], rec.fileName, { type: "application/pdf" }),
    }));
  });

  const itemsRef = useRef<UploadQueueItem[]>(items);
  const isProcessingRef = useRef(false);
  const queryClient = useQueryClient();
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const updateItem = useCallback((id: string, patch: Partial<UploadQueueItem>) => {
    itemsRef.current = itemsRef.current.map((item) =>
      item.id === id ? { ...item, ...patch } : item,
    );
    syncToStorage(itemsRef.current);
    setItems([...itemsRef.current]);
  }, []);

  const processNext = useCallback(async () => {
    if (isProcessingRef.current) return;

    // Find the oldest queued item synchronously from itemsRef
    const nextItem = itemsRef.current.find((item) => item.status === "queued");

    if (!nextItem) {
      isProcessingRef.current = false;
      return;
    }

    // Safety guard: if an item is interrupted or empty binary, cannot send
    if (nextItem.isInterrupted || nextItem.file.size === 0) {
      updateItem(nextItem.id, {
        status: "error",
        isInterrupted: true,
        stage: "Missing file payload",
        errorMessage: "File binary was lost when the browser refreshed. Please re-upload.",
      });
      isProcessingRef.current = false;
      setTimeout(() => {
        void processNext();
      }, 50);
      return;
    }

    isProcessingRef.current = true;
    const currentId = nextItem.id;
    const currentFile = nextItem.file;
    const docType = nextItem.documentType;
    const docCat = nextItem.documentCategory;

    // Transition to uploading
    updateItem(currentId, {
      status: "uploading",
      stage: "Uploading binary payload to secure vault...",
      errorMessage: undefined,
      verifyingMessage: undefined,
    });

    // Advance to processing state after initial upload stream initiates
    const processingTimer = setTimeout(() => {
      updateItem(currentId, {
        status: "processing",
        stage: "Classifying document & running statutory verification...",
      });
    }, 1_200);

    // If verification takes longer than 15 seconds, update stage message
    const slowWarningTimer = setTimeout(() => {
      updateItem(currentId, {
        verifyingMessage: "Deep statutory analysis taking longer than usual... finalizing checks",
      });
    }, 15_000);

    try {
      const formData = buildUploadFormData(currentFile, {
        documentType: docType,
        documentCategory: docCat,
      });

      const response = await api.upload<CompanyDocument>(
        "/api/company/documents",
        formData,
        "POST",
        { timeoutMs: 120_000 },
      );

      clearTimeout(processingTimer);
      clearTimeout(slowWarningTimer);

      const isUncertain =
        response.document_category === "Others / Unclassified" ||
        response.document_type === "Unknown" ||
        !response.document_type;

      updateItem(currentId, {
        status: "done",
        stage: "Document verified & ready in vault",
        uncertainClassification: isUncertain,
        uploadedDocument: response,
      });

      toast.success(`Uploaded and verified "${currentFile.name}"`);

      // Invalidate relevant queries
      await Promise.all([
        queryClient.refetchQueries({ queryKey: queryKeys.company.documents() }),
        queryClient.refetchQueries({ queryKey: queryKeys.company.packages() }),
        queryClient.refetchQueries({ queryKey: queryKeys.company.rating() }),
      ]);

      optionsRef.current.onItemSuccess?.(nextItem, response);
    } catch (err: unknown) {
      clearTimeout(processingTimer);
      clearTimeout(slowWarningTimer);

      let rawMsg = getApiErrorMessage(err, "Verification or upload failed");
      // Map duplicate or known error strings to executive-friendly messages
      if (
        rawMsg.toLowerCase().includes("already exists") ||
        rawMsg.toLowerCase().includes("duplicate") ||
        rawMsg.toLowerCase().includes("hash")
      ) {
        rawMsg = "A document with identical content has already been uploaded.";
      }

      updateItem(currentId, {
        status: "error",
        stage: "Upload or verification failed",
        errorMessage: rawMsg,
      });

      toast.error(`Failed to upload "${currentFile.name}": ${rawMsg}`);
      optionsRef.current.onItemError?.(nextItem, err);
    } finally {
      clearTimeout(processingTimer);
      clearTimeout(slowWarningTimer);
      isProcessingRef.current = false;
      // Continue with next queued item
      setTimeout(() => {
        void processNext();
      }, 50);
    }
  }, [queryClient, updateItem]);

  // Trigger processing whenever queue changes and an item is waiting
  useEffect(() => {
    const hasQueued = items.some((item) => item.status === "queued");
    if (hasQueued && !isProcessingRef.current) {
      void processNext();
    }
  }, [items, processNext]);

  const enqueue = useCallback(
    (files: File[], config?: { documentType?: string; documentCategory?: string }) => {
      const newItems: UploadQueueItem[] = [];

      for (const file of files) {
        const validation = validateFile(file);
        if (!validation.valid) {
          toast.error(validation.error || `File ${file.name} is invalid.`);
          continue;
        }

        const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        newItems.push({
          id,
          file,
          fileName: file.name,
          fileSize: file.size,
          documentType: config?.documentType,
          documentCategory: config?.documentCategory,
          status: "queued",
          stage: "Queued for upload",
          createdAt: Date.now(),
        });
      }

      if (newItems.length > 0) {
        itemsRef.current = [...itemsRef.current, ...newItems];
        syncToStorage(itemsRef.current);
        setItems([...itemsRef.current]);
      }
    },
    [],
  );

  const cancel = useCallback((id: string) => {
    itemsRef.current = itemsRef.current.map((item) => {
      if (item.id === id && item.status === "queued") {
        return { ...item, status: "cancelled", stage: "Cancelled by user" };
      }
      return item;
    });
    syncToStorage(itemsRef.current);
    setItems([...itemsRef.current]);
  }, []);

  const retry = useCallback((id: string, newFile?: File) => {
    const target = itemsRef.current.find((item) => item.id === id);
    if (!target) return;

    if (target.isInterrupted && !newFile) {
      toast.error("Original file content was lost on page refresh. Please re-select the file.");
      return;
    }

    itemsRef.current = itemsRef.current.map((item) => {
      if (item.id === id) {
        const fileToUse = newFile || item.file;
        return {
          ...item,
          file: fileToUse,
          fileName: fileToUse.name,
          fileSize: fileToUse.size,
          status: "queued" as const,
          stage: "Re-queued for upload",
          errorMessage: undefined,
          isInterrupted: false,
        };
      }
      return item;
    });
    syncToStorage(itemsRef.current);
    setItems([...itemsRef.current]);
  }, []);

  const dismissItem = useCallback((id: string) => {
    itemsRef.current = itemsRef.current.filter((item) => item.id !== id);
    syncToStorage(itemsRef.current);
    setItems([...itemsRef.current]);
  }, []);

  const clearCompleted = useCallback(() => {
    itemsRef.current = itemsRef.current.filter(
      (item) => item.status !== "done" && item.status !== "cancelled",
    );
    syncToStorage(itemsRef.current);
    setItems([...itemsRef.current]);
  }, []);

  const clearFailed = useCallback(() => {
    itemsRef.current = itemsRef.current.filter((item) => item.status !== "error");
    syncToStorage(itemsRef.current);
    setItems([...itemsRef.current]);
  }, []);

  // Categorized item sets
  const inProgressItems = items.filter(
    (item) => item.status === "uploading" || item.status === "processing",
  );
  const queuedItems = items.filter((item) => item.status === "queued");
  const failedItems = items.filter((item) => item.status === "error");
  const recentCompleted = items.filter((item) => item.status === "done");

  const isUploading = items.some((item) => item.status === "uploading");
  const isProcessing = items.some((item) => item.status === "processing");
  const activeCount = inProgressItems.length;
  const queuedCount = queuedItems.length;
  const failedCount = failedItems.length;
  const completedCount = recentCompleted.length;
  const totalActiveJobs = activeCount + queuedCount;
  const hasActiveJobs = totalActiveJobs > 0;
  const hasFailedJobs = failedCount > 0;
  const hasInterruptedJobs = items.some((item) => item.isInterrupted);

  return {
    items,
    inProgressItems,
    queuedItems,
    failedItems,
    recentCompleted,
    enqueue,
    cancel,
    retry,
    dismissItem,
    clearCompleted,
    clearFailed,
    isUploading,
    isProcessing,
    queuedCount,
    activeCount,
    failedCount,
    completedCount,
    totalActiveJobs,
    hasActiveJobs,
    hasFailedJobs,
    hasInterruptedJobs,
  };
}
