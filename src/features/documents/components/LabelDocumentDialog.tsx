import React, { useState, useEffect, useRef } from "react";
import { FileText, Loader2, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { formatFileSize } from "../lib/documentPresentation";
import { suggestLabelFromFilename } from "../lib/uploadHelpers";

export interface LabelDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | null;
  isUploading?: boolean;
  onConfirmUpload: (file: File, label: string) => void | Promise<void>;
}

export function LabelDocumentDialog({
  open,
  onOpenChange,
  file,
  isUploading = false,
  onConfirmUpload,
}: LabelDocumentDialogProps) {
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && file) {
      setLabel(suggestLabelFromFilename(file.name));
      setError(null);
      setTimeout(() => inputRef.current?.select(), 50);
    } else {
      setLabel("");
      setError(null);
    }
  }, [open, file]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const trimmed = label.trim();
    if (!trimmed) {
      setError("Please enter a name or label for this document.");
      inputRef.current?.focus();
      return;
    }

    onConfirmUpload(file, trimmed);
  };

  if (!file) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !isUploading && onOpenChange(val)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold font-display text-text-primary">
            Name this document
          </DialogTitle>
          <DialogDescription className="text-xs text-text-secondary">
            Provide a descriptive name or label for this document so it can be easily identified in
            your records.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* File summary pill */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-border-c bg-surface-alt/40">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand border border-brand/20">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-text-primary truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-[11px] font-mono text-text-secondary">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          {/* Label input */}
          <div className="space-y-1.5">
            <label
              htmlFor="document-label-input"
              className="text-xs font-semibold text-text-primary block"
            >
              Document Name / Label <span className="text-destructive">*</span>
            </label>
            <Input
              id="document-label-input"
              ref={inputRef}
              type="text"
              placeholder="e.g. Board Resolution Q3, Vendor Contract, Audit Notes"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                if (error) setError(null);
              }}
              disabled={isUploading}
              className="text-xs h-9 bg-surface border-border-c"
            />
            {error && <p className="text-[11px] text-destructive font-medium">{error}</p>}
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => onOpenChange(false)}
              className="text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isUploading}
              className="text-xs font-semibold gap-1.5 cursor-pointer bg-brand text-white hover:bg-brand/90"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Uploading…</span>
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload Document</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
