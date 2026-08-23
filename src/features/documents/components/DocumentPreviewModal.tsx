import React, { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Download, Loader2, AlertCircle, FileText } from "lucide-react";
import {
  Dialog,
  DialogPortal,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { api } from "@/shared/lib/api";
import { formatFileSize } from "../lib/documentPresentation";
import { downloadDocument } from "../hooks/useDocuments";
import type { CompanyDocument } from "@/shared/types/api";

export interface DocumentPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: CompanyDocument | null;
}

export function DocumentPreviewModal({
  open,
  onOpenChange,
  document,
}: DocumentPreviewModalProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let currentUrl: string | null = null;
    let isCancelled = false;

    if (open && document) {
      setIsLoading(true);
      setErrorMessage(null);
      setObjectUrl(null);

      api
        .download(`/api/company/documents/${document.id}/download`)
        .then((blob) => {
          if (!isCancelled) {
            currentUrl = URL.createObjectURL(blob);
            setObjectUrl(currentUrl);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (!isCancelled) {
            setIsLoading(false);
            setErrorMessage(
              err instanceof Error ? err.message : "Failed to load document preview"
            );
          }
        });
    }

    return () => {
      isCancelled = true;
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [open, document]);

  if (!document) return null;

  const isImage =
    document.mime_type?.startsWith("image/") ||
    /\.(png|jpg|jpeg|webp)$/i.test(document.filename || document.original_name);

  const isPdf =
    document.mime_type === "application/pdf" ||
    /\.pdf$/i.test(document.filename || document.original_name);

  const handleDownload = () => {
    downloadDocument(document.id, document.original_name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* Brand-tinted backdrop overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand/10 backdrop-blur-sm bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[92vh] overflow-y-auto">
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Header */}
          <DialogHeader className="pr-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-base font-bold font-display text-text-primary truncate">
                    {document.original_name}
                  </DialogTitle>
                  <Badge variant="outline" className="text-[10px] font-mono px-2 py-0.5">
                    {formatFileSize(document.file_size_bytes)}
                  </Badge>
                </div>
                <p className="text-xs text-text-secondary">
                  Document Preview • {document.document_type}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-1.5 text-xs font-semibold"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Preview Content Area */}
          <div className="min-h-[300px] flex items-center justify-center rounded-xl border border-border/70 bg-surface-alt/20 p-2 overflow-hidden">
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-12 space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-brand" />
                <p className="text-xs text-text-secondary font-medium">
                  Loading document preview…
                </p>
              </div>
            )}

            {!isLoading && errorMessage && (
              <div className="p-8 text-center space-y-3 max-w-sm mx-auto">
                <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
                <p className="text-xs font-semibold text-text-primary">
                  {errorMessage}
                </p>
                <p className="text-[11px] text-text-secondary">
                  Preview is unavailable in browser for this file. You can download it directly.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-1.5 text-xs mt-2"
                >
                  <Download className="h-3.5 w-3.5" /> Download Document
                </Button>
              </div>
            )}

            {!isLoading && !errorMessage && objectUrl && (
              <>
                {isImage && (
                  <img
                    src={objectUrl}
                    alt={document.original_name}
                    className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-xs"
                  />
                )}

                {isPdf && (
                  <iframe
                    src={objectUrl}
                    title={document.original_name}
                    className="w-full h-[68vh] rounded-lg border-0 bg-white"
                  />
                )}

                {!isImage && !isPdf && (
                  <div className="p-8 text-center space-y-3">
                    <FileText className="mx-auto h-12 w-12 text-brand" />
                    <p className="text-xs font-semibold text-text-primary">
                      Inline preview not supported for this file format.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="gap-1.5 text-xs"
                    >
                      <Download className="h-3.5 w-3.5" /> Download to View
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
