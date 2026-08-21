import React, { useRef, useState } from "react";
import { CheckCircle2, FileText, Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { CompanyDocument } from "@/shared/types/api";
import { DocumentQualityBadge } from "./DocumentQualityBadge";

export interface DocumentUploadCardProps {
  label: string;
  description?: string;
  document: CompanyDocument | null; // null = nothing uploaded yet for this slot
  accept?: string; // defaults to ".pdf,.png,.jpg,.jpeg" if not provided
  isUploading: boolean;
  isDeleting: boolean;
  onUpload: (file: File) => void;
  onDelete: (docId: string) => void;
}

export function DocumentUploadCard({
  label,
  description,
  document,
  accept = ".pdf,.png,.jpg,.jpeg",
  isUploading,
  isDeleting,
  onUpload,
  onDelete,
}: DocumentUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const isBusy = isUploading || isDeleting;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = ""; // Reset input so re-selecting same file works
      onUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isBusy) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "rounded-xl border p-4 transition-all duration-150 shadow-xs",
        isDragOver
          ? "border-brand bg-brand/5"
          : document
          ? "border-success/40 bg-success/5 hover:border-success/60"
          : "border-border-c bg-surface hover:border-brand/40"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-colors",
              document
                ? "bg-success/15 text-success"
                : "bg-brand/10 text-brand"
            )}
          >
            {document ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <FileText className="h-5 w-5" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm text-text-primary">
                {label}
              </h4>
              {document && <DocumentQualityBadge document={document} />}
            </div>

            {description && (
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                {description}
              </p>
            )}

            {document && (
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs font-medium text-text-primary truncate max-w-[220px]">
                  {document.original_name}
                </span>
                <span className="text-xs text-text-secondary font-mono">
                  • {(document.file_size_bytes / 1024).toFixed(0)} KB
                </span>
                {document.quality_score !== null && (
                  <span className="text-xs text-text-secondary font-mono">
                    • Quality: {document.quality_score}%
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept={accept}
            disabled={isBusy}
          />

          {document ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isBusy}
              onClick={() => onDelete(document.id)}
              className="border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:text-destructive text-xs font-semibold"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> Removing…
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Remove
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isBusy}
              onClick={() => fileInputRef.current?.click()}
              className="border-border-c bg-surface text-text-primary hover:bg-surface-alt hover:border-brand/40 text-xs font-semibold"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5 text-brand" /> Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5 mr-1.5 text-brand" /> Upload File
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
