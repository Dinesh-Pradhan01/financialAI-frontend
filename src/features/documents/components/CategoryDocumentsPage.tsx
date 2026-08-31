import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Upload,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import {
  useDocuments,
  useUploadDocument,
  useReplaceDocument,
  useDeleteDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import {
  getDocumentCategory,
  type DocumentCategory,
  type TaxonomyDocument,
} from "../lib/documentTaxonomy";
import { buildUploadFormData } from "../lib/uploadHelpers";
import { DocumentRequirementRow, type DocumentRowBusyState } from "./DocumentRequirementRow";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { ReplaceDocumentDialog } from "./ReplaceDocumentDialog";
import { Button } from "@/shared/components/ui/button";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { cn } from "@/shared/lib/utils";
import type { CompanyDocument } from "@/shared/types/api";

export interface CategoryDocumentsPageProps {
  categoryId: string;
}

export function CategoryDocumentsPage({ categoryId }: CategoryDocumentsPageProps) {
  const navigate = useNavigate();
  const { data: documents = [], isLoading } = useDocuments();
  const uploadMutation = useUploadDocument();
  const replaceMutation = useReplaceDocument();
  const deleteMutation = useDeleteDocument();

  const [rowBusy, setRowBusy] = useState<Record<string, DocumentRowBusyState>>({});
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);
  const [replacingTarget, setReplacingTarget] = useState<{
    document: CompanyDocument;
    row: TaxonomyDocument;
    stagedFile?: File;
  } | null>(null);

  const category: DocumentCategory | null = getDocumentCategory(categoryId);

  const patchRow = (key: string, patch: Partial<DocumentRowBusyState>) =>
    setRowBusy((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  const allDocumentsByType = useMemo(() => {
    const map = new Map<string, CompanyDocument[]>();
    for (const document of documents) {
      const list = map.get(document.document_type) ?? [];
      list.push(document);
      map.set(document.document_type, list);
    }
    return map;
  }, [documents]);

  const rows = useMemo(() => {
    const raw = category?.documents ?? [];
    return [...raw].sort((a, b) => {
      const aReq = a.requirement === "required" ? 1 : 0;
      const bReq = b.requirement === "required" ? 1 : 0;
      return bReq - aReq;
    });
  }, [category]);

  const uploadedCount = rows.filter((row) => allDocumentsByType.has(row.key)).length;
  const totalCount = rows.length;
  const percent = totalCount > 0 ? Math.round((uploadedCount / totalCount) * 100) : 0;

  const requiredRows = rows.filter((row) => row.requirement === "required");
  const requiredUploaded = requiredRows.filter((row) => allDocumentsByType.has(row.key)).length;
  const allRequiredDone = requiredRows.length > 0 && requiredUploaded === requiredRows.length;

  const handleUpload = (file: File, row: TaxonomyDocument) => {
    if (!category) return;
    patchRow(row.key, { isUploading: true, rejectionReason: null });

    const formData = buildUploadFormData(file, {
      documentType: row.key,
      documentCategory: category.id,
    });

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(`Uploaded ${file.name}.`);
        patchRow(row.key, { isUploading: false });
      },
      onError: (error) => {
        const message = getApiErrorMessage(error, "Upload failed");
        patchRow(row.key, { isUploading: false, rejectionReason: message });
        toast.error(message);
      },
    });
  };

  const handleReplace = (file: File, row: TaxonomyDocument, docId: string) => {
    patchRow(row.key, { isReplacing: true, rejectionReason: null });

    const formData = new FormData();
    formData.append("file", file);

    replaceMutation.mutate(
      { docId, formData },
      {
        onSuccess: () => {
          toast.success(`Replaced with ${file.name}.`);
          patchRow(row.key, { isReplacing: false });
        },
        onError: (error) => {
          const message = getApiErrorMessage(error, "Replacement failed");
          patchRow(row.key, { isReplacing: false, rejectionReason: message });
          toast.error(message);
        },
      },
    );
  };

  const handleDelete = (row: TaxonomyDocument, document: CompanyDocument) => {
    patchRow(row.key, { isDeleting: true });
    deleteMutation.mutate(document.id, {
      onSuccess: () => {
        toast.success(`Deleted ${document.original_name}.`);
        patchRow(row.key, { isDeleting: false });
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error, "Failed to delete document"));
        patchRow(row.key, { isDeleting: false });
      },
    });
  };

  const handleDownload = async (row: TaxonomyDocument, document: CompanyDocument) => {
    patchRow(row.key, { isDownloading: true });
    try {
      await downloadDocument(document.id, document.original_name);
      toast.success(`Downloaded ${document.original_name}.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Download failed"));
    } finally {
      patchRow(row.key, { isDownloading: false });
    }
  };

  if (!isLoading && !category) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary mb-4 shadow-xs">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">Category Not Found</h1>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          The requested document category <code className="rounded bg-surface-alt px-1.5 py-0.5 font-mono text-xs text-brand font-semibold">"{categoryId}"</code> does not exist.
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
            <span>Category {category?.number} of 8</span>
          </div>
        </nav>

        {/* Category Header Banner */}
        <header className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-2xs mt-0.5">
              <CategoryIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border">
                  Category {category?.number}
                </span>
                <span className="text-xs text-text-secondary font-mono">
                  <span className="tabular-nums font-semibold text-text-primary">{uploadedCount}</span> of <span className="tabular-nums">{totalCount}</span> uploaded
                </span>
              </div>
              <h1 className="mt-1 text-lg sm:text-xl font-bold font-display text-text-primary tracking-tight">
                {category?.label}
              </h1>
              <p className="mt-1 text-xs text-text-secondary leading-relaxed max-w-2xl">
                {category?.answers}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] uppercase font-mono text-text-secondary font-bold">Category Completion</p>
              <p className="text-base sm:text-lg font-bold font-mono text-brand tabular-nums">
                {percent}%
              </p>
            </div>
          </div>
        </header>

        {/* Category Guidance Notes */}
        {category?.note && (
          <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 dark:bg-blue-950/20 p-3.5 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
            <Info className="h-4 w-4 shrink-0 text-brand mt-0.5" />
            <p className="leading-relaxed">{category.note}</p>
          </div>
        )}

        {/* Document Requirements List */}
        <section aria-label="Required and Optional Documents" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider text-[11px]">
              Document Checklist & Upload Slots
            </h2>
            <span className="text-xs text-text-secondary">
              Upload or replace documents directly in each category slot
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {rows.map((row, index) => {
              const matchingDocs = allDocumentsByType.get(row.key) ?? [];
              const document = matchingDocs[0] ?? null;

              return (
                <motion.div
                  key={row.key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: Math.min(index, 8) * 0.03,
                  }}
                  className="h-full flex flex-col"
                >
                  <DocumentRequirementRow
                    taxonomyDocument={row}
                    detailLabel={category?.detailLabel ?? "Applies to"}
                    document={document}
                    instanceCount={matchingDocs.length}
                    busy={rowBusy[row.key]}
                    onUpload={(file) => handleUpload(file, row)}
                    onRequestReplace={(stagedFile) =>
                      document && setReplacingTarget({ document, row, stagedFile })
                    }
                    onReplace={(file) => document && handleReplace(file, row, document.id)}
                    onDelete={() => document && handleDelete(row, document)}
                    onPreview={() => document && setPreviewDoc(document)}
                    onDownload={() => document && handleDownload(row, document)}
                    onDismissRejection={() => patchRow(row.key, { rejectionReason: null })}
                    className="h-full flex flex-col justify-between"
                  />
                </motion.div>
              );
            })}
          </div>

          {allRequiredDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4 flex items-start gap-3 mt-4 shadow-xs"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mt-0.5">
                <CheckCircle2 aria-hidden="true" className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-xs text-text-primary">
                  Every required document in this category is on record.
                </p>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Optional documents here still strengthen verification and scoring where they apply to your entity.
                </p>
              </div>
            </motion.div>
          )}
        </section>
      </div>

      {/* Untouched Document Preview Modal */}
      <DocumentPreviewModal
        open={Boolean(previewDoc)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewDoc(null);
        }}
        document={previewDoc}
      />

      {/* Untouched Document Replace Dialog */}
      <ReplaceDocumentDialog
        open={Boolean(replacingTarget)}
        onOpenChange={(open) => {
          if (!open) setReplacingTarget(null);
        }}
        targetDocument={replacingTarget?.document ?? null}
        targetLabel={replacingTarget?.row.label}
        initialFile={replacingTarget?.stagedFile ?? null}
        isReplacing={Boolean(replacingTarget && rowBusy[replacingTarget.row.key]?.isReplacing)}
        onConfirmReplace={(file) => {
          if (replacingTarget) {
            handleReplace(file, replacingTarget.row, replacingTarget.document.id);
            setReplacingTarget(null);
          }
        }}
      />
    </main>
  );
}
