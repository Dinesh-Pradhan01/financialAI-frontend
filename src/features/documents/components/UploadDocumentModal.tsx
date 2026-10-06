import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  ORDERED_CANONICAL_CATEGORIES,
} from "../lib/categoryNormalizer";
import {
  ACCEPTED_FILE_EXTENSIONS,
  validateFile,
} from "../lib/uploadHelpers";
import { formatFileSize, formatDocumentType } from "../lib/presentationModel";
import type { UploadQueueItem } from "../hooks/useUploadQueue";
import { cn } from "@/shared/lib/utils";

export interface UploadDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (file: File, options?: { documentCategory?: string; documentType?: string }) => void;
  activeUploads?: UploadQueueItem[];
  onCancelUpload?: (id: string) => void;
}

export function UploadDocumentModal({
  open,
  onOpenChange,
  onUpload,
  activeUploads = [],
  onCancelUpload,
}: Readonly<UploadDocumentModalProps>) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [manualCategoryOverride, setManualCategoryOverride] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active item if currently uploading
  const activeItem = activeUploads.find(
    (item) =>
      item.status === "uploading" ||
      item.status === "processing" ||
      item.status === "queued",
  );
  const latestDoneItem = activeUploads.find((item) => item.status === "done");

  const resetState = () => {
    setSelectedFile(null);
    setFileError(null);
    setManualCategoryOverride("");
    setDragActive(false);
  };

  const handleClose = (newOpen: boolean) => {
    if (!newOpen) {
      resetState();
    }
    onOpenChange(newOpen);
  };

  const handleFileSelect = (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setFileError(validation.error || "Invalid file format or size.");
      setSelectedFile(null);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    onUpload(selectedFile, {
      documentCategory: manualCategoryOverride || undefined,
    });

    // Reset local selection so user sees queue state or can upload another
    setSelectedFile(null);
    setManualCategoryOverride("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-6 bg-surface border-border-c">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-bold text-text-primary tracking-tight">
            Upload Document
          </DialogTitle>
          <DialogDescription className="text-xs text-text-secondary leading-relaxed">
            Spotlight automatically detects document types, validates statutory filings, and organizes evidence into your repository.
          </DialogDescription>
        </DialogHeader>

        {/* Live Upload & Classification Progress Banner (if an upload is actively running) */}
        {activeItem && (
          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-text-primary truncate">
                    {activeItem.file.name}
                  </p>
                  <p className="text-xs text-brand font-medium mt-0.5">
                    {activeItem.status === "uploading" && "Uploading binary payload…"}
                    {activeItem.status === "processing" && "Analyzing contents & running statutory checks…"}
                    {activeItem.status === "queued" && "Queued for upload…"}
                  </p>
                </div>
              </div>

              {onCancelUpload && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onCancelUpload(activeItem.id)}
                  className="h-7 px-2 text-xs text-text-tertiary hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
                >
                  Cancel
                </Button>
              )}
            </div>

            {activeItem.verifyingMessage && (
              <p className="text-xs text-text-tertiary pl-10 animate-pulse">
                {activeItem.verifyingMessage}
              </p>
            )}
          </div>
        )}

        {/* Latest Done Result Notice with Classification Details & Optional Exception Picker */}
        {latestDoneItem && !activeItem && !selectedFile && (
          <div className="rounded-2xl border border-success/30 bg-success/5 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success mt-0.5">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-text-primary truncate">
                  {latestDoneItem.file.name}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
                  <span className="font-semibold text-text-primary">
                    {formatDocumentType(latestDoneItem.uploadedDocument?.document_type)}
                  </span>
                  <span>•</span>
                  <span>{latestDoneItem.uploadedDocument?.document_category || "Categorized"}</span>
                </div>
              </div>
            </div>

            {/* If classification is uncertain or unclassified, offer exception category picker */}
            {latestDoneItem.uncertainClassification && (
              <div className="pt-2 border-t border-success/20 space-y-2">
                <p className="text-xs text-text-secondary">
                  Spotlight categorized this as <strong>Others / Unclassified</strong>. You can re-assign it to a canonical category if preferred:
                </p>
                <Select
                  value={manualCategoryOverride}
                  onValueChange={(val) => {
                    setManualCategoryOverride(val);
                    if (latestDoneItem.file) {
                      onUpload(latestDoneItem.file, { documentCategory: val });
                    }
                  }}
                >
                  <SelectTrigger className="h-8 text-xs rounded-xl bg-surface border-border-c">
                    <SelectValue placeholder="Choose Category Destination" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    {ORDERED_CANONICAL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.label}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        {/* Primary Upload Input Form (Purely File-Driven: No upfront category selector!) */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FILE_EXTENSIONS.join(",")}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {!selectedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-7 text-center cursor-pointer transition-all duration-200 select-none",
                dragActive
                  ? "border-brand bg-brand/5 scale-[0.99]"
                  : "border-border-c/90 bg-surface-alt/40 hover:border-brand/40 hover:bg-surface-alt/70",
              )}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-2xs mb-3">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-text-primary">
                Drag and drop your document here, or{" "}
                <span className="text-brand hover:underline">browse</span>
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                PDF only • Up to 10MB per file
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-brand/25 bg-brand/4 p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-brand border border-brand/20">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-text-primary truncate" title={selectedFile.name}>
                      {selectedFile.name}
                    </p>
                    <p className="text-xs font-mono tabular-nums text-text-secondary mt-0.5">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetState}
                  className="h-7 w-7 p-0 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>

              {/* Automatic AI Classification Notice (Zero-friction explanation) */}
              <div className="rounded-xl border border-border-c/70 bg-surface p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span>Automatic Classification</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed pl-5.5">
                  Spotlight will automatically identify the document type, extract key entities, and organize it into your evidence vault upon upload.
                </p>
              </div>
            </div>
          )}

          {/* Validation Error Message */}
          {fileError && (
            <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-text-tertiary">
              Uploads continue safely in background if closed.
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleClose(false)}
                className="text-xs h-9 rounded-xl border-border-c text-text-secondary hover:text-text-primary cursor-pointer"
              >
                {activeItem || latestDoneItem ? "Close" : "Cancel"}
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!selectedFile}
                className="text-xs h-9 rounded-xl bg-brand hover:bg-brand/90 text-white shadow-xs cursor-pointer gap-2 disabled:opacity-50 font-semibold"
              >
                <UploadCloud className="h-4 w-4" />
                <span>Upload & Classify</span>
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
