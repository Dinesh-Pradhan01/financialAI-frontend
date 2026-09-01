import React, { useState, useRef, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Upload, FileText, AlertTriangle, CheckCircle2, Loader2, FileUp } from "lucide-react";
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
import { cn } from "@/shared/lib/utils";
import {
  validateFile,
  ACCEPTED_FILE_FORMATS_STRING,
  UPLOAD_CONSTRAINTS_LABEL,
} from "../lib/uploadHelpers";
import { formatFileSize, formatDocumentDate } from "../lib/documentPresentation";
import { getTaxonomyDocument } from "../lib/documentTaxonomy";
import type { CompanyDocument } from "@/shared/types/api";

export interface ReplaceDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetDocument: CompanyDocument | null;
  targetLabel?: string;
  initialFile?: File | null;
  isReplacing?: boolean;
  onConfirmReplace: (file: File) => void | Promise<void>;
}

export function ReplaceDocumentDialog({
  open,
  onOpenChange,
  targetDocument,
  targetLabel,
  initialFile = null,
  isReplacing = false,
  onConfirmReplace,
}: ReplaceDocumentDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(initialFile);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragDepth = useRef(0);

  // Sync initialFile or reset when target changes/opens
  useEffect(() => {
    if (open) {
      if (initialFile) {
        const validation = validateFile(initialFile);
        if (validation.valid) {
          setSelectedFile(initialFile);
        } else {
          toast.error(validation.error || "Invalid replacement file");
          setSelectedFile(null);
        }
      } else {
        setSelectedFile(null);
      }
    } else {
      setSelectedFile(null);
      dragDepth.current = 0;
      setIsDraggingOver(false);
    }
  }, [open, initialFile, targetDocument]);

  if (!targetDocument) return null;

  const taxonomy = getTaxonomyDocument(targetDocument.document_type);
  const displayLabel =
    targetLabel || taxonomy?.label || targetDocument.document_type.replace(/[-_]/g, " ");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error || "Invalid file format or size.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (isReplacing) return;
    dragDepth.current += 1;
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragDepth.current = 0;
    setIsDraggingOver(false);
    if (isReplacing) return;

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error || "Invalid file format or size.");
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedFile || isReplacing) return;
    onConfirmReplace(selectedFile);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isReplacing && onOpenChange(next)}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[92vh] overflow-y-auto">
          <DialogPrimitive.Close
            disabled={isReplacing}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Dialog Header */}
          <DialogHeader className="pr-6 text-left">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20">
                <FileUp className="h-4.5 w-4.5" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold font-display text-text-primary">
                  Replace Document
                </DialogTitle>
                <DialogDescription className="text-xs text-text-secondary mt-0.5">
                  Confirm and select a new file to replace the existing corporate record.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Current vs New Comparison Container */}
          <div className="space-y-3.5 py-1">
            {/* Warning Callout */}
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-3">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
              <div className="text-[11px] text-text-secondary leading-relaxed space-y-0.5">
                <p className="font-semibold text-text-primary">
                  You are replacing: <span className="capitalize">{displayLabel}</span>
                </p>
                <p>
                  Uploading a new version will overwrite the current file on file and trigger a
                  fresh verification and compliance check.
                </p>
              </div>
            </div>

            {/* Existing File Information Card */}
            <div className="rounded-xl border border-border-c bg-surface-alt/40 p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-text-tertiary">
                <span className="font-semibold uppercase tracking-wider text-[10px]">
                  Current Document On File
                </span>
                <span className="font-mono">{formatDocumentDate(targetDocument.created_at)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-border-c text-text-secondary">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="font-medium text-xs text-text-primary truncate"
                    title={targetDocument.original_name}
                  >
                    {targetDocument.original_name}
                  </p>
                  <p className="text-[11px] text-text-secondary font-mono">
                    {formatFileSize(targetDocument.file_size_bytes)} •{" "}
                    {targetDocument.document_type}
                  </p>
                </div>
              </div>
            </div>

            {/* Hidden native input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept={ACCEPTED_FILE_FORMATS_STRING}
              disabled={isReplacing}
            />

            {/* Replacement Selection / Dropzone */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-text-secondary block">
                Select Replacement File
              </label>

              {selectedFile ? (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-brand/40 bg-brand/5 p-3 animate-in fade-in-50">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-semibold text-xs text-text-primary truncate"
                        title={selectedFile.name}
                      >
                        {selectedFile.name}
                      </p>
                      <p className="text-[11px] text-text-secondary font-mono">
                        {formatFileSize(selectedFile.size)} • Ready to upload
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isReplacing}
                      onClick={() => fileInputRef.current?.click()}
                      className="h-7 px-2 text-[11px] font-semibold border-border-c bg-surface cursor-pointer"
                    >
                      Change
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={isReplacing}
                      onClick={() => setSelectedFile(null)}
                      className="h-7 w-7 text-text-tertiary hover:text-text-primary cursor-pointer"
                      title="Remove selected file"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !isReplacing && fileInputRef.current?.click()}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all duration-150",
                    isDraggingOver
                      ? "border-brand bg-brand/10 shadow-xs"
                      : "border-border-c bg-surface hover:border-brand/40 hover:bg-surface-alt/30",
                    isReplacing && "pointer-events-none opacity-60",
                  )}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Upload className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-text-primary">
                      {isDraggingOver
                        ? "Drop replacement file here"
                        : "Click to browse or drag file here"}
                    </p>
                    <p className="text-[10px] text-text-secondary font-mono">
                      {UPLOAD_CONSTRAINTS_LABEL}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="gap-2 sm:gap-2 pt-2 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isReplacing}
              onClick={() => onOpenChange(false)}
              className="text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              disabled={!selectedFile || isReplacing}
              onClick={() => handleSubmit()}
              className="text-xs font-semibold gap-1.5 cursor-pointer shadow-xs"
            >
              {isReplacing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Replacing…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Confirm & Replace
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
