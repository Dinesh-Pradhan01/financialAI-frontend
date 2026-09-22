import React, { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Eye,
  FilePlus2,
  FileText,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/components/ui/alert-dialog";
import { cn } from "@/shared/lib/utils";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import {
  useDocuments,
  useUploadDocument,
  useDeleteDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import {
  buildUploadFormData,
  validateFile,
  ACCEPTED_FILE_FORMATS_STRING,
} from "../lib/uploadHelpers";
import { formatFileSize, formatDocumentDate } from "../lib/documentPresentation";
import { OTHER_DOCUMENT_CATEGORY_ID, isUnmappedDocumentType } from "../lib/documentTaxonomy";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { DocumentInfoPopover } from "./DocumentInfoPopover";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { LabelDocumentDialog } from "./LabelDocumentDialog";
import { DocumentCategoryNavTabs } from "./DocumentCategoryNavTabs";
import type { CompanyDocument } from "@/shared/types/api";

export function OtherDocumentsPage() {
  const { data: documents = [], isLoading } = useDocuments();
  const uploadMutation = useUploadDocument();
  const deleteMutation = useDeleteDocument();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [isLabelDialogOpen, setIsLabelDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);
  const [docToDelete, setDocToDelete] = useState<CompanyDocument | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

  // Filter documents that don't belong to any predefined taxonomy slot
  const otherDocuments = useMemo(
    () => documents.filter((doc) => isUnmappedDocumentType(doc.document_type)),
    [documents],
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // Allow re-selecting same file
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error || "Invalid file");
      return;
    }

    setStagedFile(file);
    setIsLabelDialogOpen(true);
  };

  const handleConfirmUpload = async (file: File, label: string) => {
    setIsUploading(true);
    try {
      const formData = buildUploadFormData(file, {
        documentType: label,
        documentCategory: OTHER_DOCUMENT_CATEGORY_ID,
      });

      await uploadMutation.mutateAsync(formData);
      toast.success(`Uploaded "${label}" successfully.`);
      setIsLabelDialogOpen(false);
      setStagedFile(null);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Failed to upload document"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (doc: CompanyDocument) => {
    setDownloadingDocId(doc.id);
    try {
      await downloadDocument(doc.id, doc.original_name);
      toast.success(`Downloaded ${doc.original_name}.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Download failed"));
    } finally {
      setDownloadingDocId(null);
    }
  };

  const handleConfirmDelete = () => {
    if (!docToDelete) return;
    setDeletingDocId(docToDelete.id);
    deleteMutation.mutate(docToDelete.id, {
      onSuccess: () => {
        toast.success(`Deleted ${docToDelete.original_name}.`);
        setDocToDelete(null);
        setDeletingDocId(null);
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, "Failed to delete document"));
        setDeletingDocId(null);
      },
    });
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] pb-16 pt-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-6">
        {/* Top Navigation / Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
          <Link
            to="/documents"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to All Categories</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-text-secondary font-mono">
            <span>
              <span className="font-semibold text-text-primary tabular-nums">
                {otherDocuments.length}
              </span>{" "}
              {otherDocuments.length === 1 ? "document" : "documents"} on record
            </span>
          </div>
        </nav>

        {/* Sticky Category Quick-Nav */}
        <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-background/80 backdrop-blur-md border-b border-border/60">
          <DocumentCategoryNavTabs
            activeCategoryId="other"
            otherDocumentsCount={otherDocuments.length}
          />
        </div>

        {/* Category Header Banner */}
        <header className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-2xs mt-0.5">
              <FilePlus2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border">
                  Custom & Uncategorized
                </span>
                <span className="text-xs text-text-secondary font-mono">
                  <span className="tabular-nums font-semibold text-text-primary">
                    {otherDocuments.length}
                  </span>{" "}
                  uploaded
                </span>
              </div>
              <h1 className="mt-1 text-lg sm:text-xl font-bold font-display text-text-primary tracking-tight">
                Other Documents
              </h1>
              <p className="mt-1 text-xs text-text-secondary leading-relaxed max-w-2xl">
                Upload and manage miscellaneous corporate records, custom agreements, or
                supplementary filings that do not belong to the eight predefined statutory
                categories.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 self-start sm:self-center">
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2 text-xs font-semibold cursor-pointer bg-brand text-white hover:bg-brand/90 shadow-xs"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Document</span>
            </Button>
          </div>
        </header>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept={ACCEPTED_FILE_FORMATS_STRING}
          tabIndex={-1}
        />

        {/* Document List Section */}
        <section aria-label="Other Documents List" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider text-[11px]">
              Uploaded Other Documents
            </h2>
            <span className="text-xs text-text-secondary">
              Custom named corporate files and auxiliary attachments
            </span>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-border bg-surface p-12 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand mb-2" />
              <p className="text-xs text-text-secondary">Loading documents…</p>
            </div>
          ) : otherDocuments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 p-10 text-center bg-surface/50 space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary">
                <FilePlus2 className="h-6 w-6 text-text-tertiary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  No other documents uploaded yet
                </p>
                <p className="text-xs text-text-secondary mt-1 max-w-md mx-auto">
                  Upload auxiliary corporate files, supplemental audit reports, or specific
                  agreements that don't fit into the standard categories.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload your first document</span>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5">
              {otherDocuments.map((doc, index) => {
                const isDownloading = downloadingDocId === doc.id;
                const isDeleting = deletingDocId === doc.id;
                const displayLabel =
                  doc.document_type && doc.document_type !== "other"
                    ? doc.document_type
                    : doc.original_name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(index, 8) * 0.03 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4 shadow-2xs hover:border-border/80 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand border border-brand/20 mt-0.5">
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="font-semibold text-xs text-text-primary truncate max-w-70 sm:max-w-md"
                            title={displayLabel}
                          >
                            {displayLabel}
                          </span>
                          <DocumentQualityBadge document={doc} />
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-text-secondary flex-wrap font-mono">
                          <span className="truncate max-w-50" title={doc.original_name}>
                            {doc.original_name}
                          </span>
                          <span>•</span>
                          <span>{formatFileSize(doc.file_size_bytes)}</span>
                          <span>•</span>
                          <span>Uploaded {formatDocumentDate(doc.created_at)}</span>
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
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Preview ${doc.original_name}`}
                        title="Preview"
                        disabled={isDownloading || isDeleting}
                        onClick={() => setPreviewDoc(doc)}
                        className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Download ${doc.original_name}`}
                        title="Download"
                        disabled={isDownloading || isDeleting}
                        onClick={() => handleDownload(doc)}
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
                        aria-label={`Delete ${doc.original_name}`}
                        title="Delete"
                        disabled={isDownloading || isDeleting}
                        onClick={() => setDocToDelete(doc)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Label Document Dialog */}
      <LabelDocumentDialog
        open={isLabelDialogOpen}
        onOpenChange={setIsLabelDialogOpen}
        file={stagedFile}
        isUploading={isUploading}
        onConfirmUpload={handleConfirmUpload}
      />

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        open={Boolean(previewDoc)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewDoc(null);
        }}
        document={previewDoc}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={Boolean(docToDelete)}
        onOpenChange={(open) => {
          if (!open) setDocToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-text-primary">{docToDelete?.original_name}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={Boolean(deletingDocId)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={Boolean(deletingDocId)}
              className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
            >
              {deletingDocId ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Deleting…
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
