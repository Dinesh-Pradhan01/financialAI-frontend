import React, { useState, useRef } from "react";
import { format } from "date-fns";
import {
  FileText,
  Upload,
  Trash2,
  Download,
  Eye,
  Loader2,
  AlertCircle,
  RefreshCw,
  X,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useDeleteDocument, downloadDocument } from "../hooks/useDocuments";
import { useUploadQueue, type UploadQueueItem } from "../hooks/useUploadQueue";
import { formatFileSize } from "../lib/documentPresentation";
import { getDocumentRowState } from "../lib/documentStatus";
import { DocumentStatusBadge } from "./DocumentStatusBadge";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import type { VaultSubCategory } from "../lib/vaultManifest";
import type { CompanyDocument } from "@/shared/types/api";
import { Button } from "@/shared/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { cn } from "@/shared/lib/utils";

export interface DocumentListSectionProps {
  subCategory: VaultSubCategory;
  documents: CompanyDocument[];
}

export function DocumentListSection({ subCategory, documents }: DocumentListSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);
  const [docToDelete, setDocToDelete] = useState<CompanyDocument | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const deleteMutation = useDeleteDocument();
  const queue = useUploadQueue();

  const docType = subCategory.documentType || "other";
  const docCat = subCategory.targetBackendCategory || "other";

  // Filter matching uploaded documents
  const matchingDocuments = documents.filter((doc) => doc.document_type === docType);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    queue.enqueue(files, {
      documentType: docType,
      documentCategory: docCat,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const confirmDelete = async () => {
    if (!docToDelete) return;
    setIsDeleting(true);
    try {
      await deleteMutation.mutateAsync(docToDelete.id);
      toast.success(`Deleted ${docToDelete.original_name}.`);
      setDocToDelete(null);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Failed to delete document"));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = async (doc: CompanyDocument) => {
    setDownloadingId(doc.id);
    try {
      await downloadDocument(doc.id, doc.original_name);
      toast.success(`Downloaded ${doc.original_name}.`);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Download failed"));
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200",
          dragActive
            ? "border-brand bg-brand/5 shadow-brand"
            : "border-border-c hover:border-brand/40 bg-surface",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20">
            <Upload className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary">Upload {subCategory.label}</h3>
            <p className="text-xs text-text-secondary mt-1">
              Drag & drop one or multiple PDF documents, or browse from your computer
            </p>
            <p className="text-[11px] text-text-tertiary font-mono mt-0.5">
              PDF only • Maximum 10MB per file • Verified sequentially
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={queue.isUploading}
            className="gap-2 cursor-pointer mt-1"
          >
            {queue.isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing uploads...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Choose PDF Files
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Upload Queue In-Flight Progress */}
      {queue.items.length > 0 && (
        <div className="rounded-2xl border border-border-c bg-surface p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-primary">Upload Queue</span>
              {queue.isUploading && (
                <span className="inline-flex items-center gap-1 text-[11px] text-brand font-medium">
                  <Loader2 className="h-3 w-3 animate-spin" /> Processing file
                </span>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={queue.clearCompleted}
              className="text-xs text-text-secondary h-7 px-2"
            >
              Clear completed
            </Button>
          </div>

          <div className="space-y-2">
            {queue.items.map((item: UploadQueueItem) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-border-c/70 bg-surface-alt/50 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="h-4 w-4 shrink-0 text-brand" />
                  <div className="min-w-0">
                    <p className="font-medium text-text-primary truncate">{item.file.name}</p>
                    <p className="text-[10px] text-text-secondary font-mono">
                      {formatFileSize(item.file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === "queued" && (
                    <span className="text-[11px] text-text-secondary font-mono">Queued</span>
                  )}
                  {item.status === "uploading" && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-brand font-medium">
                      <Loader2 className="h-3 w-3 animate-spin shrink-0" />
                      <span>{item.verifyingMessage || "Verifying..."}</span>
                    </span>
                  )}
                  {item.status === "done" && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-success font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Uploaded
                    </span>
                  )}
                  {item.status === "error" && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[11px] text-destructive max-w-48 truncate"
                        title={item.errorMessage}
                      >
                        {item.errorMessage || "Failed"}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => queue.retry(item.id)}
                        className="h-6 w-6 p-0 text-text-secondary hover:text-text-primary"
                        title="Retry"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  {item.status === "queued" && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => queue.cancel(item.id)}
                      className="h-6 w-6 p-0 text-text-secondary hover:text-destructive"
                      title="Cancel"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Document Records List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Uploaded Records ({matchingDocuments.length})
          </h4>
        </div>

        {matchingDocuments.length === 0 ? (
          <div className="rounded-2xl border border-border-c bg-surface p-8 text-center space-y-2">
            <FileText className="mx-auto h-8 w-8 text-text-tertiary" />
            <p className="text-sm font-semibold text-text-primary">No records on file</p>
            <p className="text-xs text-text-secondary max-w-sm mx-auto">
              No documents have been uploaded for {subCategory.label} yet. Use the upload area above
              to add records.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border-c bg-surface shadow-xs">
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border-c bg-surface-alt/70 text-text-secondary">
                    <th className="py-3 px-4 font-semibold">Document</th>
                    <th className="py-3 px-4 font-semibold">Uploaded</th>
                    <th className="py-3 px-4 font-semibold">Size</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-c/60">
                  {matchingDocuments.map((doc) => {
                    const rowState = getDocumentRowState(doc);
                    return (
                      <tr key={doc.id} className="hover:bg-surface-alt/30 transition-colors">
                        <td className="py-3 px-4 font-medium text-text-primary">
                          <div className="flex items-center gap-2.5 max-w-xs md:max-w-md">
                            <FileCheck className="h-4 w-4 shrink-0 text-brand" />
                            <span className="truncate" title={doc.original_name}>
                              {doc.original_name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-text-secondary font-mono">
                          {doc.created_at ? format(new Date(doc.created_at), "dd MMM yyyy") : "—"}
                        </td>
                        <td className="py-3 px-4 text-text-secondary font-mono">
                          {formatFileSize(doc.file_size_bytes)}
                        </td>
                        <td className="py-3 px-4">
                          {doc.is_verified ? (
                            <DocumentStatusBadge state={rowState} />
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border-c text-[10px] font-medium cursor-help">
                                    <AlertCircle className="h-3 w-3 text-text-tertiary" />
                                    Not auto-verified
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs text-xs">
                                  No readable text found (likely a scan). Stored but not verified.
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setPreviewDoc(doc)}
                              className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
                              title="Preview document"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(doc)}
                              disabled={downloadingId === doc.id}
                              className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary"
                              title="Download document"
                            >
                              {downloadingId === doc.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-brand" />
                              ) : (
                                <Download className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setDocToDelete(doc)}
                              className="h-8 w-8 p-0 text-text-secondary hover:text-destructive"
                              title="Delete document"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (< 640px) */}
            <div className="block sm:hidden divide-y divide-border-c/60">
              {matchingDocuments.map((doc) => {
                const rowState = getDocumentRowState(doc);
                return (
                  <div key={doc.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileCheck className="h-4 w-4 shrink-0 text-brand" />
                        <span
                          className="font-medium text-xs text-text-primary truncate"
                          title={doc.original_name}
                        >
                          {doc.original_name}
                        </span>
                      </div>
                      {doc.is_verified ? (
                        <DocumentStatusBadge state={rowState} />
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border-c text-[10px] font-medium cursor-help">
                                <AlertCircle className="h-3 w-3 text-text-tertiary" />
                                Not auto-verified
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs text-xs">
                              No readable text found (likely a scan). Stored but not verified.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-text-secondary font-mono">
                      <span>
                        {doc.created_at ? format(new Date(doc.created_at), "dd MMM yyyy") : "—"}
                      </span>
                      <span>{formatFileSize(doc.file_size_bytes)}</span>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-border-c/40 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewDoc(doc)}
                        className="h-7 text-xs gap-1"
                      >
                        <Eye className="h-3 w-3" /> Preview
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        disabled={downloadingId === doc.id}
                        className="h-7 text-xs gap-1"
                      >
                        {downloadingId === doc.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3" />
                        )}
                        Download
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setDocToDelete(doc)}
                        className="h-7 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={Boolean(docToDelete)}
        onOpenChange={(open) => !open && setDocToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{" "}
              <strong className="text-text-primary">{docToDelete?.original_name}</strong>? This
              action cannot be undone and the file will be removed from your vault.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                void confirmDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Document Preview Modal */}
      {previewDoc && (
        <DocumentPreviewModal
          document={previewDoc}
          open={Boolean(previewDoc)}
          onOpenChange={(open) => !open && setPreviewDoc(null)}
        />
      )}
    </div>
  );
}
