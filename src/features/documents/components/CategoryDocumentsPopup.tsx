import React, { useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";
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
import { getApiErrorMessage } from "@/shared/lib/apiError";
import {
  useUploadDocument,
  useReplaceDocument,
  useDeleteDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import { buildUploadFormData } from "../lib/uploadHelpers";
import type { DocumentCategory, TaxonomyDocument } from "../lib/documentTaxonomy";
import { DocumentRequirementRow, type DocumentRowBusyState } from "./DocumentRequirementRow";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { ReplaceDocumentDialog } from "./ReplaceDocumentDialog";
import type { CompanyDocument } from "@/shared/types/api";

export interface CategoryDocumentsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** `null` while no category is selected — the dialog stays closed. */
  category: DocumentCategory | null;
  documents: CompanyDocument[];
}

/**
 * One dialog for any of the eight categories, replacing the former
 * `RequiredDocumentsPopup` / `RecommendedDocumentsPopup` pair. Same visual
 * treatment as those two; only the grouping axis changed.
 *
 * Action state lives in a map keyed on the taxonomy row rather than the page-level
 * scalars the old popups used, so two rows can be busy at once and a spinner can
 * never appear on the wrong row.
 */
export function CategoryDocumentsPopup({
  open,
  onOpenChange,
  category,
  documents,
}: CategoryDocumentsPopupProps) {
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

  const patchRow = (key: string, patch: Partial<DocumentRowBusyState>) =>
    setRowBusy((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  /**
   * First match wins. Several rows are inherently multi-instance in practice —
   * bank statements across accounts, GST returns per period, share certificates
   * per allotment — but the source document does not model instance counts, so
   * this deliberately does not invent one.
   */
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
        // The upload route runs its readability/quality check inline and answers
        // 400 on failure, so this message is the rejection reason.
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

  const CategoryIcon = category?.icon;

  return (
    <>
      <Dialog open={open && Boolean(category)} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 flex flex-col w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] border border-border bg-surface p-5 sm:p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[90vh] sm:max-h-[85vh]">
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none z-10">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>

            <DialogHeader className="shrink-0 pb-3 border-b border-border/60">
              <DialogTitle className="text-lg font-bold font-display text-text-primary flex items-center gap-2.5 pr-8 tracking-tight">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  {CategoryIcon && <CategoryIcon aria-hidden="true" className="h-4 w-4" />}
                </div>
                <span>{category?.label}</span>
              </DialogTitle>
              <DialogDescription className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                {category?.answers}
              </DialogDescription>
              <p className="text-xs text-text-secondary mt-1.5 font-mono">
                <span className="tabular-nums">{uploadedCount}</span> of <span className="tabular-nums">{totalCount}</span> uploaded •{" "}
                <span
                  className={cn(
                    "font-semibold font-num tabular-nums",
                    percent === 100 ? "text-success" : "text-brand",
                  )}
                >
                  {percent}%
                </span>
                {requiredRows.length > 0 && (
                  <>
                    {" • "}
                    <span className="font-semibold font-num text-text-primary tabular-nums">
                      {requiredUploaded}/{requiredRows.length}
                    </span>
                    <span className="text-destructive font-bold ml-0.5" title="Required">*</span>
                  </>
                )}
              </p>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-3">
              {category?.note && (
                <div className="flex items-start gap-2.5 rounded-xl border border-border-c bg-surface-alt p-3">
                  <Info aria-hidden="true" className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                  <p className="text-[11px] text-text-secondary leading-relaxed max-w-prose">{category.note}</p>
                </div>
              )}

              {rows.map((row, index) => {
                const matchingDocs = allDocumentsByType.get(row.key) ?? [];
                const document = matchingDocs[0] ?? null;

                return (
                  <motion.div
                    key={row.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      // Cap the stagger — category 4 has 19 rows and a
                      // per-index delay would take over a second to settle.
                      delay: Math.min(index, 8) * 0.04,
                    }}
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
                    />
                  </motion.div>
                );
              })}

              {allRequiredDone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/6 p-4 flex items-start gap-3 mt-3 shadow-xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mt-0.5">
                    <CheckCircle2 aria-hidden="true" className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-semibold text-xs text-text-primary">
                      Every required document in this category is on record.
                    </p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      Optional documents here still strengthen verification and scoring where they
                      apply to your entity.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <DialogFooter className="pt-3 border-t border-border/60 shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto cursor-pointer"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      <DocumentPreviewModal
        open={Boolean(previewDoc)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewDoc(null);
        }}
        document={previewDoc}
      />

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
    </>
  );
}
