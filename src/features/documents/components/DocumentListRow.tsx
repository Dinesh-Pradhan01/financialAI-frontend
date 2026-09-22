import React, { useRef } from "react";
import { CheckCircle2, Download, Eye, FileText, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { DocumentInfoPopover } from "./DocumentInfoPopover";
import { formatFileSize, formatDocumentDate, isDocumentUpdated } from "../lib/documentPresentation";
import {
  validateFile,
  ACCEPTED_FILE_FORMATS_STRING,
  UPLOAD_CONSTRAINTS_LABEL,
} from "../lib/uploadHelpers";
import type { DocumentSlot } from "../lib/documentGuidance";
import type { CompanyDocument } from "@/shared/types/api";

export interface DocumentListRowProps {
  slot: DocumentSlot;
  document: CompanyDocument | null;
  onUpload: (file: File) => void;
  onReplace?: (file: File) => void;
  onRequestReplace?: (stagedFile?: File) => void;
  onDelete: (docId: string) => void;
  onPreview: (doc: CompanyDocument) => void;
  onDownload?: (doc: CompanyDocument) => void;
  isUploading?: boolean;
  isReplacing?: boolean;
  isDeleting?: boolean;
  isDownloading?: boolean;
}

export function DocumentListRow({
  slot,
  document,
  onUpload,
  onReplace,
  onRequestReplace,
  onDelete,
  onPreview,
  onDownload,
  isUploading = false,
  isReplacing = false,
  isDeleting = false,
  isDownloading = false,
}: DocumentListRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isBusy = isUploading || isReplacing || isDeleting || isDownloading;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = ""; // Reset input so re-selecting same file triggers change

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
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-3 sm:p-3.5 transition-all duration-150 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3",
        document
          ? "border-border-c bg-surface hover:border-brand/30"
          : "border-dashed border-border-c bg-surface hover:border-brand/40",
      )}
    >
      {/* Hidden file input for Upload and Replace */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={ACCEPTED_FILE_FORMATS_STRING}
        disabled={isBusy}
      />

      {/* Left: Status Icon + Meta Details */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-colors mt-0.5",
            document ? "bg-success/15 text-success" : "bg-brand/10 text-brand",
          )}
        >
          {document ? (
            <CheckCircle2 className="h-4.5 w-4.5" />
          ) : (
            <FileText className="h-4.5 w-4.5" />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="font-semibold text-xs text-text-primary">{slot.label}</h4>

            {/* Guidance Info Popover */}
            <DocumentInfoPopover
              mode="guidance"
              guidance={{
                why: slot.why,
                equivalents: slot.equivalents,
              }}
            />

            {document && <DocumentQualityBadge document={document} />}
          </div>

          {document ? (
            <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-text-secondary">
              <span
                className="font-medium text-text-primary truncate max-w-42.5"
                title={document.original_name}
              >
                {document.original_name}
              </span>
              <span className="font-mono">• {formatFileSize(document.file_size_bytes)}</span>
              <span>
                •{" "}
                {isDocumentUpdated(document.created_at, document.updated_at)
                  ? `Updated ${formatDocumentDate(document.updated_at)}`
                  : `Uploaded ${formatDocumentDate(document.created_at)}`}
              </span>

              {/* Upload Metadata Info Popover */}
              <DocumentInfoPopover
                mode="metadata"
                metadata={{
                  uploadedBy: document.uploaded_by,
                  uploadedAt: document.created_at,
                  qualityScore: document.quality_score,
                  verificationNotes: document.verification_notes,
                  originalName: document.original_name,
                  fileSizeBytes: document.file_size_bytes,
                  documentType: document.document_type,
                }}
              />
            </div>
          ) : (
            <div className="space-y-0.5">
              <p className="text-[11px] text-text-secondary leading-tight line-clamp-1">
                {slot.description}
              </p>
              <p className="text-[10px] text-text-tertiary font-mono">{UPLOAD_CONSTRAINTS_LABEL}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
        {document ? (
          <>
            {/* Download */}
            {onDownload && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Download ${document.original_name}`}
                title="Download document"
                disabled={isBusy}
                onClick={() => onDownload(document)}
                className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
              >
                {isDownloading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                ) : (
                  <Download className="h-3.5 w-3.5" />
                )}
              </Button>
            )}

            {/* Preview */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Preview ${document.original_name}`}
              title="Preview document"
              disabled={isBusy}
              onClick={() => onPreview(document)}
              className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>

            {/* Replace */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Replace ${document.original_name}`}
              title="Replace document"
              disabled={isBusy}
              onClick={() => {
                if (onRequestReplace) {
                  onRequestReplace();
                } else {
                  fileInputRef.current?.click();
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

            {/* Delete */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Delete ${document.original_name}`}
              title="Delete document"
              disabled={isBusy}
              onClick={() => onDelete(document.id)}
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
            onClick={() => fileInputRef.current?.click()}
            className="border-border-c bg-surface text-text-primary hover:bg-surface-alt hover:border-brand/40 text-xs font-semibold gap-1.5 h-8 px-3 cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" /> Uploading…
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 text-brand" /> Upload
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
