import React, { useRef, useState } from "react";
import { Download, Eye, FilePlus2, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { useUploadDocument, useDeleteDocument, downloadDocument } from "../hooks/useDocuments";
import {
  buildUploadFormData,
  validateFile,
  ACCEPTED_FILE_FORMATS_STRING,
  UPLOAD_CONSTRAINTS_LABEL,
} from "../lib/uploadHelpers";
import { formatFileSize, formatDocumentDate } from "../lib/documentPresentation";
import { OTHER_DOCUMENT_CATEGORY_ID } from "../lib/documentTaxonomy";
import { DocumentInfoPopover } from "./DocumentInfoPopover";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import type { CompanyDocument } from "@/shared/types/api";

export interface OtherDocumentsSectionProps {
  /** Documents whose `document_type` matches no taxonomy row. */
  documents: CompanyDocument[];
  className?: string;
}

/**
 * The escape hatch for anything the taxonomy does not name.
 *
 * Deliberately quiet: no gradient, no progress ring, no drag target. The eight
 * category cards and their per-row dropzones are the primary path, and a second
 * large upload surface here would compete with them for attention — so this is a
 * single small outline button sitting below the registry.
 *
 * These uploads are stored under `document_type` / `document_category` of
 * "other" and are listed by filename, because the backend has no column for a
 * user-supplied description of an unmapped document. Adding one is a backend
 * request, not something to fake client-side.
 */
export function OtherDocumentsSection({ documents, className }: OtherDocumentsSectionProps) {
  const uploadMutation = useUploadDocument();
  const deleteMutation = useDeleteDocument();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [busyDocIds, setBusyDocIds] = useState<Record<string, "deleting" | "downloading">>({});
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);

  const markBusy = (docId: string, state: "deleting" | "downloading" | null) =>
    setBusyDocIds((prev) => {
      const next = { ...prev };
      if (state === null) delete next[docId];
      else next[docId] = state;
      return next;
    });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // Allow re-selecting the same file.
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error || "Invalid file");
      return;
    }

    setIsUploading(true);
    const formData = buildUploadFormData(file, {
      documentType: OTHER_DOCUMENT_CATEGORY_ID,
      documentCategory: OTHER_DOCUMENT_CATEGORY_ID,
    });

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(`Uploaded ${file.name}.`);
        setIsUploading(false);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, "Upload failed"));
        setIsUploading(false);
      },
    });
  };

  const handleDownload = async (doc: CompanyDocument) => {
    markBusy(doc.id, "downloading");
    try {
      await downloadDocument(doc.id, doc.original_name);
      toast.success(`Downloaded ${doc.original_name}.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Download failed"));
    } finally {
      markBusy(doc.id, null);
    }
  };

  const handleDelete = (doc: CompanyDocument) => {
    markBusy(doc.id, "deleting");
    deleteMutation.mutate(doc.id, {
      onSuccess: () => {
        toast.success(`Deleted ${doc.original_name}.`);
        markBusy(doc.id, null);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, "Failed to delete document"));
        markBusy(doc.id, null);
      },
    });
  };

  return (
    <>
      <section
        className={cn(
          "rounded-2xl border border-border-c/80 bg-surface-alt/20 p-4 sm:p-5 space-y-3",
          className,
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface border border-border-c text-text-secondary">
              <FilePlus2 aria-hidden="true" className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-text-primary">Other documents</h3>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Anything that does not fit the eight categories above. These sit outside the
                required and optional checklist and never block completion.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 self-start sm:self-center border-border-c bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-alt text-[11px] font-semibold gap-1.5 h-8 px-3 cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" />
                Upload other document
              </>
            )}
          </Button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={ACCEPTED_FILE_FORMATS_STRING}
          disabled={isUploading}
          tabIndex={-1}
        />

        {documents.length === 0 ? (
          <p className="text-[11px] text-text-secondary border-t border-border/60 pt-3">
            Nothing here yet · <span className="font-mono">{UPLOAD_CONSTRAINTS_LABEL}</span>
          </p>
        ) : (
          <ul className="space-y-2 border-t border-border/60 pt-3">
            {documents.map((doc) => {
              const busy = busyDocIds[doc.id];

              return (
                <li
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-border-c bg-surface px-3 py-2"
                >
                  <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-text-secondary min-w-0">
                    <span
                      className="font-medium text-text-primary truncate max-w-[240px]"
                      title={doc.original_name}
                    >
                      {doc.original_name}
                    </span>
                    <span className="font-mono">• {formatFileSize(doc.file_size_bytes)}</span>
                    <span>• Uploaded {formatDocumentDate(doc.created_at)}</span>
                    <DocumentInfoPopover
                      mode="metadata"
                      metadata={{
                        uploadedBy: doc.uploaded_by,
                        uploadedAt: doc.created_at,
                        qualityScore: doc.quality_score,
                        verificationNotes: doc.verification_notes,
                        originalName: doc.original_name,
                        fileSizeBytes: doc.file_size_bytes,
                        documentType: doc.document_type,
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Download ${doc.original_name}`}
                      title="Download"
                      disabled={Boolean(busy)}
                      onClick={() => handleDownload(doc)}
                      className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                    >
                      {busy === "downloading" ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                      ) : (
                        <Download className="h-3.5 w-3.5" />
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Preview ${doc.original_name}`}
                      title="Preview"
                      disabled={Boolean(busy)}
                      onClick={() => setPreviewDoc(doc)}
                      className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${doc.original_name}`}
                      title="Delete"
                      disabled={Boolean(busy)}
                      onClick={() => handleDelete(doc)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                    >
                      {busy === "deleting" ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <DocumentPreviewModal
        open={Boolean(previewDoc)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewDoc(null);
        }}
        document={previewDoc}
      />
    </>
  );
}
