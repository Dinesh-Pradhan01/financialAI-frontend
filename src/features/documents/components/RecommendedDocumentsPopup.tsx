import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X, FileCheck, Info } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogPortal,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import {
  useUploadDocument,
  useReplaceDocument,
  useDeleteDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import { KNOWN_DOCUMENT_SLOTS, type DocumentSlot } from "../lib/documentGuidance";
import { buildUploadFormData } from "../lib/uploadHelpers";
import { DocumentListRow } from "./DocumentListRow";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { ReplaceDocumentDialog } from "./ReplaceDocumentDialog";
import type { CompanyDocument } from "@/shared/types/api";

export interface RecommendedDocumentsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documents: CompanyDocument[];
}

export function RecommendedDocumentsPopup({
  open,
  onOpenChange,
  documents,
}: RecommendedDocumentsPopupProps) {
  const uploadMutation = useUploadDocument();
  const replaceMutation = useReplaceDocument();
  const deleteMutation = useDeleteDocument();

  const [uploadingSlotKey, setUploadingSlotKey] = useState<string | null>(null);
  const [replacingDocId, setReplacingDocId] = useState<string | null>(null);
  const [replacingTarget, setReplacingTarget] = useState<{
    document: CompanyDocument;
    slot: DocumentSlot;
    stagedFile?: File;
  } | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);

  const recommendedSlots = KNOWN_DOCUMENT_SLOTS.filter(
    (s) => s.category === "optional" || s.category === "recommended",
  );
  const completedCount = recommendedSlots.filter((slot) =>
    documents.some((d) => d.document_type === slot.typeKey),
  ).length;
  const totalCount = recommendedSlots.length;
  const percent =
    totalCount > 0 ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;

  const handleUpload = (file: File, typeKey: string, category: string) => {
    setUploadingSlotKey(typeKey);
    const formData = buildUploadFormData(file, {
      documentType: typeKey,
      documentCategory: category,
    });

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(`Uploaded ${file.name} successfully.`);
        setUploadingSlotKey(null);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "Upload failed"));
        setUploadingSlotKey(null);
      },
    });
  };

  const handleReplace = (file: File, docId: string) => {
    setReplacingDocId(docId);
    const formData = new FormData();
    formData.append("file", file);

    replaceMutation.mutate(
      { docId, formData },
      {
        onSuccess: () => {
          toast.success(`Replaced ${file.name} successfully.`);
          setReplacingDocId(null);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Replacement failed"));
          setReplacingDocId(null);
        },
      },
    );
  };

  const handleDelete = (docId: string, filename?: string) => {
    setDeletingDocId(docId);
    deleteMutation.mutate(docId, {
      onSuccess: () => {
        toast.success(`Deleted ${filename || "document"} successfully.`);
        setDeletingDocId(null);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "Failed to delete document"));
        setDeletingDocId(null);
      },
    });
  };

  const handleDownload = async (doc: CompanyDocument) => {
    try {
      setDownloadingDocId(doc.id);
      await downloadDocument(doc.id, doc.original_name);
      toast.success(`Downloaded ${doc.original_name}`);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Download failed"));
    } finally {
      setDownloadingDocId(null);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          {/* Brand-tinted backdrop overlay */}
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand/10 backdrop-blur-sm bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[90vh] overflow-y-auto">
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>

            {/* Modal Header */}
            <DialogHeader>
              <DialogTitle className="text-lg font-bold font-display text-text-primary flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <FileCheck className="h-4 w-4" />
                </div>
                Recommended Documents
              </DialogTitle>
              <DialogDescription className="text-xs text-text-secondary mt-0.5">
                {completedCount} of {totalCount} recommended documents uploaded •{" "}
                <span className="font-semibold text-brand font-num">{percent}% Completed</span>
              </DialogDescription>
            </DialogHeader>

            {/* Info Banner */}
            <div className="rounded-xl border border-brand/20 bg-brand/5 p-3.5 flex items-start gap-3 shadow-2xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand mt-0.5">
                <Info className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-xs text-text-primary">
                  Recommended Compliance Documents
                </p>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Upload recommended documents to improve your credit profiling and AI ratings.
                </p>
              </div>
            </div>

            {/* List of Recommended Slots with Stagger Animation */}
            <div className="space-y-3 py-1">
              {recommendedSlots.map((slot, index) => {
                const matchingDocs = documents
                  .filter((d) => d.document_type === slot.typeKey)
                  .sort((a, b) => {
                    const timeA = new Date(a.created_at || 0).getTime();
                    const timeB = new Date(b.created_at || 0).getTime();
                    return timeB - timeA;
                  });
                const latestDoc = matchingDocs[0] || null;

                return (
                  <motion.div
                    key={slot.typeKey}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                  >
                    <DocumentListRow
                      slot={slot}
                      document={latestDoc}
                      isUploading={uploadingSlotKey === slot.typeKey}
                      isReplacing={latestDoc ? replacingDocId === latestDoc.id : false}
                      isDeleting={latestDoc ? deletingDocId === latestDoc.id : false}
                      isDownloading={latestDoc ? downloadingDocId === latestDoc.id : false}
                      onUpload={(file) => handleUpload(file, slot.typeKey, slot.category)}
                      onRequestReplace={(stagedFile) =>
                        latestDoc && setReplacingTarget({ document: latestDoc, slot, stagedFile })
                      }
                      onReplace={(file) => latestDoc && handleReplace(file, latestDoc.id)}
                      onDelete={(docId) => handleDelete(docId, latestDoc?.original_name)}
                      onPreview={(d) => setPreviewDoc(d)}
                      onDownload={(d) => handleDownload(d)}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        open={Boolean(previewDoc)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewDoc(null);
        }}
        document={previewDoc}
      />

      {/* Document Replace Confirmation Modal */}
      <ReplaceDocumentDialog
        open={Boolean(replacingTarget)}
        onOpenChange={(open) => {
          if (!open) setReplacingTarget(null);
        }}
        targetDocument={replacingTarget?.document ?? null}
        targetLabel={replacingTarget?.slot.label}
        initialFile={replacingTarget?.stagedFile ?? null}
        isReplacing={Boolean(replacingTarget && replacingDocId === replacingTarget.document.id)}
        onConfirmReplace={(file) => {
          if (replacingTarget) {
            handleReplace(file, replacingTarget.document.id);
            setReplacingTarget(null);
          }
        }}
      />
    </>
  );
}
