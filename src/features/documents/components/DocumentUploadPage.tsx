import React, { useState, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
  Eye,
  ShieldCheck,
  RefreshCw,
  FileCheck,
  X,
  Lock,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import {
  useDocuments,
  useUploadDocument,
  useReplaceDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import {
  getDocumentCategory,
  getTaxonomyDocument,
  type DocumentCategory,
  type TaxonomyDocument,
} from "../lib/documentTaxonomy";
import {
  validateFile,
  buildUploadFormData,
  ACCEPTED_FILE_FORMATS_STRING,
  UPLOAD_CONSTRAINTS_LABEL,
} from "../lib/uploadHelpers";
import { formatFileSize, formatDocumentDate, isDocumentUpdated } from "../lib/documentPresentation";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { DocumentRequirementBadge } from "./DocumentRequirementBadge";
import { DocumentStatusBadge } from "./DocumentStatusBadge";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { Button } from "@/shared/components/ui/button";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { getDocumentRowState } from "../lib/documentStatus";
import { cn } from "@/shared/lib/utils";
import type { CompanyDocument } from "@/shared/types/api";

export interface DocumentUploadPageProps {
  categoryId: string;
  docId: string;
}

export function DocumentUploadPage({ categoryId, docId }: DocumentUploadPageProps) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  const { data: documents = [], isLoading: isLoadingDocs } = useDocuments();
  const uploadMutation = useUploadDocument();
  const replaceMutation = useReplaceDocument();

  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [isUploadedSuccess, setIsUploadedSuccess] = useState(false);
  const [isReplacingMode, setIsReplacingMode] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const category: DocumentCategory | null = getDocumentCategory(categoryId);
  const taxonomyDoc: TaxonomyDocument | null =
    category?.documents.find((d) => d.key === docId) ?? getTaxonomyDocument(docId);

  // Find if a document of this type already exists on record
  const matchingDocs = documents.filter((d) => d.document_type === docId);
  const existingDoc: CompanyDocument | null = matchingDocs[0] ?? null;

  const isUploading = uploadMutation.isPending || replaceMutation.isPending;

  const rowState = getDocumentRowState(existingDoc, {
    isUploading,
    rejectionReason,
  });

  const handleStageFile = (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setValidationError(validation.error || "Invalid file");
      toast.error(validation.error || "Invalid file");
      return;
    }
    setValidationError(null);
    setRejectionReason(null);
    setStagedFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) handleStageFile(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
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

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    if (files.length > 1) {
      toast.warning(`Uploading single document. Staging ${files[0].name}.`);
    }
    handleStageFile(files[0]);
  };

  const handleSubmitUpload = () => {
    if (!stagedFile || !category || !taxonomyDoc) return;

    setRejectionReason(null);

    if (existingDoc && isReplacingMode) {
      // Replacement flow
      const formData = new FormData();
      formData.append("file", stagedFile);

      replaceMutation.mutate(
        { docId: existingDoc.id, formData },
        {
          onSuccess: () => {
            toast.success(`Successfully replaced ${taxonomyDoc.label}.`);
            setIsUploadedSuccess(true);
            setStagedFile(null);
            setIsReplacingMode(false);
          },
          onError: (error) => {
            const message = getApiErrorMessage(error, "Replacement failed");
            setRejectionReason(message);
            toast.error(message);
          },
        },
      );
    } else {
      // New upload flow
      const formData = buildUploadFormData(stagedFile, {
        documentType: taxonomyDoc.key,
        documentCategory: category.id,
      });

      uploadMutation.mutate(formData, {
        onSuccess: () => {
          toast.success(`Successfully uploaded ${taxonomyDoc.label}.`);
          setIsUploadedSuccess(true);
          setStagedFile(null);
        },
        onError: (error) => {
          const message = getApiErrorMessage(error, "Upload failed");
          setRejectionReason(message);
          toast.error(message);
        },
      });
    }
  };

  const handleDownloadExisting = async () => {
    if (!existingDoc) return;
    setIsDownloading(true);
    try {
      await downloadDocument(existingDoc.id, existingDoc.original_name);
      toast.success(`Downloaded ${existingDoc.original_name}`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to download document"));
    } finally {
      setIsDownloading(false);
    }
  };

  // Graceful fallback for non-existent category or document key
  if (!isLoadingDocs && (!category || !taxonomyDoc)) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary mb-4 shadow-xs">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">
          Document Requirement Not Found
        </h1>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          The requested document slot{" "}
          <code className="rounded bg-surface-alt px-1.5 py-0.5 font-mono text-xs text-brand font-semibold">
            "{docId}"
          </code>{" "}
          in category{" "}
          <code className="rounded bg-surface-alt px-1.5 py-0.5 font-mono text-xs text-brand font-semibold">
            "{categoryId}"
          </code>{" "}
          does not exist in the SpotLite taxonomy.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={() => navigate({ to: "/documents" })}
            className="gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Documents
          </Button>
        </div>
      </div>
    );
  }

  const CategoryIcon = category?.icon ?? FileText;

  return (
    <main className="min-h-[calc(100vh-4rem)] pb-16 pt-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6">
        {/* Top Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
          <Link
            to="/documents"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Documents</span>
          </Link>

          {category && (
            <div className="flex items-center gap-2 text-xs text-text-secondary font-mono">
              <span className="font-semibold text-text-primary">{category.shortLabel}</span>
              <span>/</span>
              <span className="truncate max-w-50 sm:max-w-none">{taxonomyDoc?.label}</span>
            </div>
          )}
        </nav>

        {/* Page Header Card */}
        <header className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-2xs mt-0.5">
              <CategoryIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border">
                  Category {category?.number} • {category?.shortLabel}
                </span>
                {taxonomyDoc && (
                  <DocumentRequirementBadge
                    requirement={taxonomyDoc.requirement}
                    sourceStatus={taxonomyDoc.sourceStatus}
                  />
                )}
                {existingDoc && <DocumentStatusBadge state={rowState} />}
              </div>
              <h1 className="mt-1 text-lg sm:text-xl font-bold font-display text-text-primary tracking-tight">
                {taxonomyDoc?.label}
              </h1>
              <p className="mt-1 text-xs text-text-secondary leading-relaxed max-w-2xl">
                {taxonomyDoc?.detail}
              </p>
            </div>
          </div>
        </header>

        {/* Success State View */}
        {isUploadedSuccess && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/4 p-6 sm:p-8 text-center space-y-4 shadow-sm"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-text-primary font-display">
                Document Uploaded & Reconciled
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                <span className="font-semibold text-text-primary">{taxonomyDoc?.label}</span> is now
                active on record. SpotLite has queued OCR extraction and ledger verification.
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                onClick={() => navigate({ to: "/documents" })}
                className="gap-2 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Documents Overview
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUploadedSuccess(false)}
                className="cursor-pointer"
              >
                Manage This Document
              </Button>
            </div>
          </motion.section>
        )}

        {/* Main Content Grid: Upload Dropzone & Contextual Information */}
        {!isUploadedSuccess && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Upload / Active Document Area */}
            <div className="lg:col-span-8 space-y-5">
              {/* Existing Active Document Card (if present and not replacing) */}
              {existingDoc && !isReplacingMode && (
                <div className="rounded-2xl border border-emerald-500/30 bg-surface p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <FileCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-text-primary">
                          Active Document on File
                        </h3>
                        <p className="text-[11px] text-text-secondary">
                          Uploaded {formatDocumentDate(existingDoc.created_at)}
                          {isDocumentUpdated(existingDoc.created_at, existingDoc.updated_at) &&
                            ` • Updated ${formatDocumentDate(existingDoc.updated_at)}`}
                        </p>
                      </div>
                    </div>

                    <DocumentQualityBadge document={existingDoc} />
                  </div>

                  {/* File Metadata Row */}
                  <div className="rounded-xl border border-border/70 bg-surface-alt/60 p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="h-5 w-5 text-brand shrink-0" />
                      <div className="min-w-0">
                        <p
                          className="text-xs font-semibold text-text-primary truncate"
                          title={existingDoc.original_name}
                        >
                          {existingDoc.original_name}
                        </p>
                        <p className="text-[11px] text-text-secondary font-mono">
                          {formatFileSize(existingDoc.file_size_bytes)} • {existingDoc.uploaded_by}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewDoc(existingDoc)}
                        className="h-8 px-2.5 text-xs gap-1.5 text-text-secondary hover:text-text-primary cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Preview</span>
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleDownloadExisting}
                        disabled={isDownloading}
                        className="h-8 px-2.5 text-xs gap-1.5 text-text-secondary hover:text-text-primary cursor-pointer"
                      >
                        {isDownloading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                        ) : (
                          <Download className="h-3.5 w-3.5" />
                        )}
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>

                  {/* Verification Notes */}
                  {existingDoc.verification_notes && (
                    <div className="rounded-lg bg-surface-alt p-3 text-xs text-text-secondary flex items-start gap-2">
                      <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <span>{existingDoc.verification_notes}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsReplacingMode(true)}
                      className="gap-2 cursor-pointer text-xs"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Upload Replacement Version
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate({ to: "/documents" })}
                      className="text-xs text-text-secondary cursor-pointer"
                    >
                      Back to Document Registry
                    </Button>
                  </div>
                </div>
              )}

              {/* Upload Dropzone Container (When not uploaded OR when replacing) */}
              {(!existingDoc || isReplacingMode) && (
                <div className="space-y-4">
                  {isReplacingMode && (
                    <div className="flex items-center justify-between rounded-xl bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 text-xs text-blue-900 dark:text-blue-200">
                      <span className="font-semibold">Replacing active {taxonomyDoc?.label}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsReplacingMode(false);
                          setStagedFile(null);
                        }}
                        className="h-6 px-2 text-[11px] hover:bg-blue-500/20 cursor-pointer"
                      >
                        Cancel Replacement
                      </Button>
                    </div>
                  )}

                  {/* Drag & Drop Target Box */}
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all cursor-pointer select-none",
                      isDraggingOver
                        ? "border-brand bg-brand/10 ring-4 ring-brand/20 shadow-md"
                        : "border-border-c bg-surface hover:border-brand/40 hover:bg-brand/2",
                      stagedFile && "border-solid border-brand/60 bg-brand/3",
                    )}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept={ACCEPTED_FILE_FORMATS_STRING}
                      disabled={isUploading}
                      className="hidden"
                      tabIndex={-1}
                    />

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-xs mb-3">
                      <Upload className="h-6 w-6" />
                    </div>

                    <p className="text-sm font-bold text-text-primary">
                      {isDraggingOver
                        ? "Drop file here to stage upload…"
                        : `Click to browse or drag & drop ${taxonomyDoc?.label}`}
                    </p>

                    <p className="mt-1 text-xs text-text-secondary font-mono">
                      {UPLOAD_CONSTRAINTS_LABEL}
                    </p>
                  </div>

                  {/* Staged File Preview Card */}
                  {stagedFile && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-brand/30 bg-surface p-4 shadow-xs flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-xs font-bold text-text-primary truncate font-mono"
                            title={stagedFile.name}
                          >
                            {stagedFile.name}
                          </p>
                          <p className="text-[11px] text-text-secondary font-mono">
                            {formatFileSize(stagedFile.size)} • Ready to upload
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            setStagedFile(null);
                          }}
                          disabled={isUploading}
                          aria-label="Remove staged file"
                          className="h-8 w-8 text-text-secondary hover:text-destructive cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Rejection / Inline Error Notification */}
                  {rejectionReason && (
                    <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 flex items-start gap-3 text-xs text-text-primary">
                      <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-destructive">Upload rejected by server</p>
                        <p className="leading-relaxed">{rejectionReason}</p>
                        <p className="text-[11px] text-text-secondary pt-1">
                          Tip: Ensure document text is uncropped, high-contrast, and orientation is
                          correct.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Primary Upload Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <Button
                      type="button"
                      onClick={handleSubmitUpload}
                      disabled={!stagedFile || isUploading}
                      className="gap-2 cursor-pointer font-semibold shadow-xs"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          <span>Ingesting & Verifying…</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          <span>
                            {existingDoc && isReplacingMode
                              ? "Confirm & Replace Document"
                              : "Upload & Verify Document"}
                          </span>
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        if (isReplacingMode) {
                          setIsReplacingMode(false);
                          setStagedFile(null);
                        } else {
                          navigate({ to: "/documents" });
                        }
                      }}
                      disabled={isUploading}
                      className="text-xs text-text-secondary cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Contextual Guidance & Compliance Sidebar */}
            <aside className="lg:col-span-4 space-y-4">
              {/* Guidance Information */}
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  <span>Document Intelligence</span>
                </div>

                <div className="space-y-3 text-xs text-text-secondary">
                  <div>
                    <span className="font-semibold text-text-primary block">
                      What SpotLite answers with this:
                    </span>
                    <p className="mt-0.5 leading-relaxed">{category?.answers}</p>
                  </div>

                  <div className="border-t border-border/50 pt-2.5">
                    <span className="font-semibold text-text-primary block">Executive Feeds:</span>
                    <p className="mt-0.5 leading-relaxed text-brand font-medium">
                      {category?.feeds}
                    </p>
                  </div>

                  {taxonomyDoc?.reference && (
                    <div className="border-t border-border/50 pt-2.5">
                      <span className="font-semibold text-text-primary block">
                        Compliance Reference:
                      </span>
                      <p className="mt-0.5 font-mono text-[11px]">{taxonomyDoc.reference}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security & Confidentiality Guarantee */}
              <div className="rounded-2xl border border-border bg-surface-alt/50 p-4 shadow-2xs space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5 font-semibold text-text-primary text-[11px]">
                  <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Zero-Data Retention for Raw OCR</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  All uploads are encrypted via AES-256 in transit and at rest. Strict role-based
                  access gates prevent unauthorized viewing.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Untouched Document Preview Modal */}
      <DocumentPreviewModal
        open={Boolean(previewDoc)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewDoc(null);
        }}
        document={previewDoc}
      />
    </main>
  );
}
