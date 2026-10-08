import React, { useRef, useState } from "react";
import { CheckCircle2, FileText, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { validateFile } from "@/features/documents/lib/uploadHelpers";
import { DocumentRequirement } from "../lib/businessOnboarding";
import { UploadedDoc } from "./types";

export interface DocumentUploadCardProps {
  req: DocumentRequirement;
  uploadedDocs: UploadedDoc[];
  uploadingDocType: string | null;
  deletingDocId: string | null;
  onUpload: (file: File) => void;
  onDelete: (docId: string) => void;
}

export function DocumentUploadCard({
  req,
  uploadedDocs,
  uploadingDocType,
  deletingDocId,
  onUpload,
  onDelete,
}: DocumentUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const existingDoc = uploadedDocs.find((d) => d.document_type === req.typeKey);
  const isUploading = uploadingDocType === req.typeKey;
  const isDeleting = Boolean(existingDoc && deletingDocId === existingDoc.id);

  const handleProcessFile = (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error || "Only PDF files are accepted for document verification.");
      return;
    }
    onUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = ""; // Reset input so re-selecting same file works
      handleProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isUploading || isDeleting || uploadingDocType || deletingDocId) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
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
      className={`rounded-xl border p-4 transition-all duration-150 ${
        isDragOver
          ? "border-brand bg-brand/5 shadow-xs"
          : existingDoc
            ? "border-success/40 bg-success/5 shadow-xs"
            : "border-border-c bg-surface hover:border-brand/40 shadow-xs"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-colors ${
              existingDoc ? "bg-success/15 text-success" : "bg-brand/10 text-brand"
            }`}
          >
            {existingDoc ? <CheckCircle2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm text-text-primary">
                {req.label}
                {!req.isOptional && <span className="text-destructive font-bold ml-1">*</span>}
              </h4>
              {existingDoc && (
                <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-success/20 text-success">
                  Uploaded
                </span>
              )}
            </div>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">{req.why}</p>
            {!existingDoc && (
              <p className="text-[10px] text-text-tertiary font-mono mt-1">PDF only • Max 10MB</p>
            )}
            {existingDoc && (
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-medium text-text-primary truncate max-w-55">
                  {existingDoc.original_name}
                </span>
                <span className="text-xs text-text-secondary font-mono">
                  • {(existingDoc.file_size_bytes / 1024).toFixed(0)} KB
                </span>
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
            accept=".pdf"
            disabled={Boolean(uploadingDocType) || Boolean(deletingDocId)}
          />

          {existingDoc ? (
            <button
              type="button"
              disabled={Boolean(deletingDocId) || Boolean(uploadingDocType)}
              onClick={() => onDelete(existingDoc.id)}
              className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Removing…
                </>
              ) : (
                <>
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              disabled={Boolean(uploadingDocType) || Boolean(deletingDocId)}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg bg-surface border border-border-c px-4 py-2 text-xs font-semibold text-text-primary hover:bg-surface-alt hover:border-brand/40 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" /> Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5 text-brand" /> Upload File
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
