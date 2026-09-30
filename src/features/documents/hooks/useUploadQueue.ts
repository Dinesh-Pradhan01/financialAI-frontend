import { useState, useRef, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { buildUploadFormData, validateFile } from "../lib/uploadHelpers";
import type { CompanyDocument } from "@/shared/types/api";

export type UploadItemStatus = "queued" | "uploading" | "done" | "error" | "cancelled";

export interface UploadQueueItem {
  id: string;
  file: File;
  documentType: string;
  documentCategory: string;
  status: UploadItemStatus;
  errorMessage?: string;
  verifyingMessage?: string;
  uploadedDocument?: CompanyDocument;
  createdAt: number;
}

export interface UseUploadQueueOptions {
  onAllSettled?: () => void;
  onItemSuccess?: (item: UploadQueueItem, doc: CompanyDocument) => void;
  onItemError?: (item: UploadQueueItem, error: unknown) => void;
}

export function useUploadQueue(options: UseUploadQueueOptions = {}) {
  const [items, setItems] = useState<UploadQueueItem[]>([]);
  const isProcessingRef = useRef(false);
  const queryClient = useQueryClient();
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const updateItem = useCallback((id: string, patch: Partial<UploadQueueItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const processNext = useCallback(async () => {
    if (isProcessingRef.current) return;

    // Find the oldest queued item
    let nextItem: UploadQueueItem | undefined;
    setItems((currentItems) => {
      nextItem = currentItems.find((item) => item.status === "queued");
      return currentItems;
    });

    if (!nextItem) {
      isProcessingRef.current = false;
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
      errorMessage: undefined,
      verifyingMessage: undefined,
    });

    // If verification takes longer than 20 seconds, notify the user
    const timerId = setTimeout(() => {
      updateItem(currentId, {
        verifyingMessage: "Still verifying... this can take up to a minute",
      });
    }, 20_000);

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

      updateItem(currentId, {
        status: "done",
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
        errorMessage: rawMsg,
      });

      toast.error(`Failed to upload "${currentFile.name}": ${rawMsg}`);
      optionsRef.current.onItemError?.(nextItem, err);
    } finally {
      clearTimeout(timerId);
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
    (files: File[], config: { documentType: string; documentCategory: string }) => {
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
          documentType: config.documentType,
          documentCategory: config.documentCategory,
          status: "queued",
          createdAt: Date.now(),
        });
      }

      if (newItems.length > 0) {
        setItems((prev) => [...prev, ...newItems]);
      }
    },
    [],
  );

  const cancel = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.status === "queued") {
          return { ...item, status: "cancelled" };
        }
        return item;
      }),
    );
  }, []);

  const retry = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.status === "error") {
          return { ...item, status: "queued", errorMessage: undefined };
        }
        return item;
      }),
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setItems((prev) =>
      prev.filter((item) => item.status !== "done" && item.status !== "cancelled"),
    );
  }, []);

  const isUploading = items.some((item) => item.status === "uploading");
  const queuedCount = items.filter((item) => item.status === "queued").length;
  const activeCount = isUploading ? 1 : 0;

  return {
    items,
    enqueue,
    cancel,
    retry,
    clearCompleted,
    isUploading,
    queuedCount,
    activeCount,
  };
}
