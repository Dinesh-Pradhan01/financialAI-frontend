import React, { useRef, useState } from "react";
import { Download, Eye, FileText, Loader2, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { DocumentInfoPopover } from "./DocumentInfoPopover";
import { DocumentRequirementBadge } from "./DocumentRequirementBadge";
import { DocumentStatusBadge } from "./DocumentStatusBadge";
import { formatFileSize, formatDocumentDate, isDocumentUpdated } from "../lib/documentPresentation";
import {
  validateFile,
  ACCEPTED_FILE_FORMATS_STRING,
  UPLOAD_CONSTRAINTS_LABEL,
} from "../lib/uploadHelpers";
import { getDocumentRowState } from "../lib/documentStatus";
import type { TaxonomyDocument } from "../lib/documentTaxonomy";
import type { CompanyDocument } from "@/shared/types/api";

/** Per-row action state. Held by the parent keyed on the row, never as a page-level scalar. */
export interface DocumentRowBusyState {
  isUploading?: boolean;
  isReplacing?: boolean;
  isDeleting?: boolean;
  isDownloading?: boolean;
  /** Message from a rejecting upload, surfaced inline until dismissed. */
  rejectionReason?: string | null;
}

export interface DocumentRequirementRowProps {
  taxonomyDocument: TaxonomyDocument;
  /** Header for the row's guidance line — differs per category. */
  detailLabel: string;
  document: CompanyDocument | null;
  /** Total number of files on record matching this document_type in the registry. */
  instanceCount?: number;
  busy?: DocumentRowBusyState;
  onUpload: (file: File) => void;
  onReplace?: (file: File) => void;
  onRequestReplace?: (stagedFile?: File) => void;
  onDelete: () => void;
  onPreview: () => void;
  onDownload: () => void;
  onDismissRejection?: () => void;
  className?: string;
}

export function DocumentRequirementRow({
  taxonomyDocument,
  detailLabel,
  document,
  instanceCount,
  busy = {},
  onUpload,
  onReplace,
  onRequestReplace,
  onDelete,
  onPreview,
  onDownload,
  onDismissRejection,
  className,
}: DocumentRequirementRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  /**
   * Depth counter rather than a boolean: dragleave fires when the pointer crosses
   * into a child element, so a naive boolean flickers the highlight off mid-drag.
   */
  const dragDepth = useRef(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const {
    isUploading = false,
    isReplacing = false,
    isDeleting = false,
    isDownloading = false,
    rejectionReason = null,
  } = busy;

  const isBusy = isUploading || isReplacing || isDeleting || isDownloading;
  const rowState = getDocumentRowState(document, {
    isUploading: isUploading || isReplacing,
    rejectionReason,
  });

  const acceptFile = (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error || "Invalid file");
      return;
    }
    if (document) {
      if (onRequestReplace) {
        onRequestReplace(file);
      } else if (onReplace) {
        onReplace(file);
      }
    } else {
      onUpload(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // Allow re-selecting the same file.
    if (file) acceptFile(file);
  };

  const openFilePicker = () => {
    if (!isBusy) fileInputRef.current?.click();
  };

  const resetDrag = () => {
    dragDepth.current = 0;
    setIsDraggingOver(false);
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    if (isBusy) return;
    dragDepth.current += 1;
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    resetDrag();
    if (isBusy) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length === 0) return;

    // One row holds one document, so extra files are ambiguous. Say so rather
    // than silently keeping the first and discarding the rest.
    if (files.length > 1) {
      toast.warning(
        `This slot takes one file. Using ${files[0].name} and ignoring the other ${
          files.length - 1
        }.`,
      );
    }

    acceptFile(files[0]);
  };

  const showDropHint = !document && !isBusy;

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      /**
       * Mouse convenience only. The keyboard path is the real <button> below, so
       * this div is deliberately not given role/tabIndex — doing so would put a
       * focus stop on an element that announces nothing useful, and would nest
       * interactive controls inside it.
       */
      onClick={
        showDropHint
          ? () => {
              openFilePicker();
            }
          : undefined
      }
      className={cn(
        "rounded-xl border p-3 sm:p-3.5 transition-all duration-150 shadow-xs",
        "flex flex-col gap-2.5",
        document
          ? "border-emerald-500/20 bg-linear-to-r from-emerald-500/3 via-surface to-surface hover:border-emerald-500/40 hover:shadow-xs"
          : "border-dashed border-border-c bg-surface hover:border-brand/40 hover:bg-brand/2",
        showDropHint && "cursor-pointer",
        isDraggingOver && "border-solid border-brand bg-brand/10 ring-2 ring-brand/20 shadow-sm",
        rejectionReason &&
          "border-solid border-destructive/40 bg-destructive/5 ring-1 ring-destructive/20",
        className,
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={ACCEPTED_FILE_FORMATS_STRING}
        disabled={isBusy}
        tabIndex={-1}
      />

      {/* Header: identity + info on the left, requirement and status on the right */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors mt-0.5 shadow-2xs",
              document
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25"
                : "bg-brand/10 text-brand border border-brand/20",
            )}
          >
            <FileText aria-hidden="true" className="h-4 w-4" />
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="font-semibold text-xs text-text-primary leading-snug tracking-tight">
                {taxonomyDocument.label}
                {taxonomyDocument.requirement === "required" && (
                  <span className="text-destructive font-bold ml-1" title="Required">
                    *
                  </span>
                )}
              </h4>
              <DocumentInfoPopover
                taxonomyDocument={taxonomyDocument}
                detailLabel={detailLabel}
                instanceCount={instanceCount}
                metadata={
                  document
                    ? {
                        uploadedBy: document.uploaded_by,
                        uploadedAt: document.created_at,
                        qualityScore: document.quality_score,
                        verificationNotes: document.verification_notes,
                        originalName: document.original_name,
                        fileSizeBytes: document.file_size_bytes,
                        documentType: document.document_type,
                      }
                    : undefined
                }
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <DocumentRequirementBadge
            requirement={taxonomyDocument.requirement}
            sourceStatus={taxonomyDocument.sourceStatus}
          />
          <DocumentStatusBadge state={rowState} />
        </div>
      </div>

      {/* Footer: file details or the drop hint, plus actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pl-0 sm:pl-10.5">
        {document ? (
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-text-secondary min-w-0 font-mono">
            <span
              className="font-sans font-medium text-text-primary truncate max-w-50"
              title={document.original_name}
            >
              {document.original_name}
            </span>
            <span className="tabular-nums">• {formatFileSize(document.file_size_bytes)}</span>
            <span className="tabular-nums">
              •{" "}
              {isDocumentUpdated(document.created_at, document.updated_at)
                ? `Updated ${formatDocumentDate(document.updated_at)}`
                : `Uploaded ${formatDocumentDate(document.created_at)}`}
            </span>
            {instanceCount !== undefined && instanceCount > 1 && (
              <span className="font-sans inline-flex items-center px-1.5 py-0.2 rounded-md bg-brand/10 text-brand font-semibold text-[10px] border border-brand/20 tabular-nums">
                +{instanceCount - 1} more in Registry
              </span>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-text-secondary">
            {isDraggingOver ? (
              <span className="font-semibold text-brand animate-pulse">
                Drop file here to upload {taxonomyDocument.label}…
              </span>
            ) : (
              <>
                Drag a file here or browse ·{" "}
                <span className="font-mono tabular-nums">{UPLOAD_CONSTRAINTS_LABEL}</span>
              </>
            )}
          </p>
        )}

        <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
          {document ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Download ${document.original_name}`}
                title="Download"
                disabled={isBusy}
                onClick={onDownload}
                className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
              >
                {isDownloading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                ) : (
                  <Download className="h-3.5 w-3.5" />
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Preview ${document.original_name}`}
                title="Preview"
                disabled={isBusy}
                onClick={onPreview}
                className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Replace ${document.original_name}`}
                title="Replace"
                disabled={isBusy}
                onClick={() => {
                  if (onRequestReplace) {
                    onRequestReplace();
                  } else {
                    openFilePicker();
                  }
                }}
                className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
              >
                {isReplacing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Delete ${document.original_name}`}
                title="Delete"
                disabled={isBusy}
                onClick={onDelete}
                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
              >
                {isDeleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isBusy}
              onClick={(event) => {
                event.stopPropagation(); // The row's own onClick would double-fire.
                openFilePicker();
              }}
              aria-label={`Upload ${taxonomyDocument.label}`}
              className="border-border-c bg-surface text-text-primary hover:bg-surface-alt hover:border-brand/40 text-xs font-semibold gap-1.5 h-8 px-3 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5 text-brand" />
                  Upload
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Rejection detail. The backend rejects with HTTP 400 and never stores the
          record, so this is the only place the reason can be shown. */}
      {rejectionReason && (
        <div className="flex items-start justify-between gap-2 rounded-lg border border-destructive/30 bg-surface p-2.5 sm:ml-10.5">
          <p className="text-[11px] text-text-primary leading-relaxed">
            <span className="font-semibold">Upload rejected.</span> {rejectionReason}
          </p>
          {onDismissRejection && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Dismiss rejection message"
              onClick={(event) => {
                event.stopPropagation();
                onDismissRejection();
              }}
              className="h-6 w-6 shrink-0 text-text-secondary hover:text-text-primary cursor-pointer"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
