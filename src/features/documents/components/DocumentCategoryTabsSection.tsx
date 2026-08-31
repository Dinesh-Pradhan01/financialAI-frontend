import React, { useMemo, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ExternalLink, FilePlus2, Info } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import {
  DOCUMENT_CATEGORIES,
  type DocumentCategory,
  type TaxonomyDocument,
} from "../lib/documentTaxonomy";
import { buildUploadFormData } from "../lib/uploadHelpers";
import {
  useUploadDocument,
  useReplaceDocument,
  useDeleteDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import { DocumentRequirementRow, type DocumentRowBusyState } from "./DocumentRequirementRow";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { ReplaceDocumentDialog } from "./ReplaceDocumentDialog";
import type { CompanyDocument } from "@/shared/types/api";

export interface DocumentCategoryTabsSectionProps {
  documents: CompanyDocument[];
  otherDocuments: CompanyDocument[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
}

export function DocumentCategoryTabsSection({
  documents,
  otherDocuments,
  activeTab: controlledTab,
  onTabChange: setControlledTab,
  className,
}: DocumentCategoryTabsSectionProps) {
  const [internalTab, setInternalTab] = useState<string>("identity_kyb_authority");
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;
  const setActiveTab = (tab: string) => {
    if (setControlledTab) setControlledTab(tab);
    else setInternalTab(tab);
  };

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

  const tabsListRef = useRef<HTMLDivElement>(null);

  const patchRow = (key: string, patch: Partial<DocumentRowBusyState>) =>
    setRowBusy((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  // Index documents by type for quick slot matching
  const allDocumentsByType = useMemo(() => {
    const map = new Map<string, CompanyDocument[]>();
    for (const document of documents) {
      const list = map.get(document.document_type) ?? [];
      list.push(document);
      map.set(document.document_type, list);
    }
    return map;
  }, [documents]);

  // Per-category metrics for tabs badges
  const categoryStatsMap = useMemo(() => {
    const stats: Record<
      string,
      {
        completed: number;
        total: number;
        requiredCompleted: number;
        requiredTotal: number;
        percent: number;
        allRequiredDone: boolean;
      }
    > = {};

    for (const cat of DOCUMENT_CATEGORIES) {
      const rows = cat.documents;
      const uploaded = rows.filter((r) => allDocumentsByType.has(r.key)).length;
      const total = rows.length;
      const reqRows = rows.filter((r) => r.requirement === "required");
      const reqUploaded = reqRows.filter((r) => allDocumentsByType.has(r.key)).length;
      const percent = total > 0 ? Math.round((uploaded / total) * 100) : 0;
      const allRequiredDone = reqRows.length > 0 && reqUploaded === reqRows.length;

      stats[cat.id] = {
        completed: uploaded,
        total,
        requiredCompleted: reqUploaded,
        requiredTotal: reqRows.length,
        percent,
        allRequiredDone,
      };
    }
    return stats;
  }, [allDocumentsByType]);

  // Upload handler for a taxonomy slot
  const handleUpload = (file: File, row: TaxonomyDocument, category: DocumentCategory) => {
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

  // Replace handler
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

  // Delete handler
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

  // Download handler
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

  return (
    <section id="category-tabs-section" className={cn("space-y-4 pt-2 scroll-mt-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-text-primary tracking-tight flex items-center gap-2">
            <span>Statutory Checklists & Document Uploads</span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Switch between statutory categories to upload specific requirements, or use the Other
            Documents tab for general files.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        {/* Horizontal scrollable tab triggers bar */}
        <div className="relative group/tabs">
          <TabsList
            ref={tabsListRef}
            className="flex items-center justify-start gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 rounded-xl border border-border/80 bg-surface-alt/40 backdrop-blur-xs w-full h-auto"
          >
            {DOCUMENT_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const stats = categoryStatsMap[category.id] ?? {
                completed: 0,
                total: category.documents.length,
                allRequiredDone: false,
                requiredTotal: 0,
              };

              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all border border-transparent cursor-pointer",
                    "data-[state=active]:bg-surface data-[state=active]:text-text-primary data-[state=active]:shadow-xs data-[state=active]:border-border/90 data-[state=active]:font-semibold",
                    "text-text-secondary hover:text-text-primary hover:bg-surface/50",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate max-w-32.5 sm:max-w-40">{category.shortLabel}</span>
                  <span
                    className={cn(
                      "text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded-full border",
                      stats.allRequiredDone
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 font-bold"
                        : stats.completed > 0
                          ? "bg-brand/10 text-brand border-brand/20 font-semibold"
                          : "bg-surface-alt text-text-tertiary border-border/60",
                    )}
                  >
                    {stats.completed}/{stats.total}
                  </span>
                </TabsTrigger>
              );
            })}

            {/* 9th Tab: Other Document Upload */}
            <TabsTrigger
              value="other"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all border border-transparent cursor-pointer",
                "data-[state=active]:bg-surface data-[state=active]:text-text-primary data-[state=active]:shadow-xs data-[state=active]:border-border/90 data-[state=active]:font-semibold",
                "text-text-secondary hover:text-text-primary hover:bg-surface/50",
              )}
            >
              <FilePlus2 className="h-3.5 w-3.5 shrink-0 text-brand" />
              <span>Other Documents</span>
              <span
                className={cn(
                  "text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded-full border",
                  otherDocuments.length > 0
                    ? "bg-brand/10 text-brand border-brand/20 font-semibold"
                    : "bg-surface-alt text-text-tertiary border-border/60",
                )}
              >
                {otherDocuments.length}
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 8 Categories Content */}
        {DOCUMENT_CATEGORIES.map((category) => {
          const CategoryIcon = category.icon;
          const stats = categoryStatsMap[category.id];
          const rows = [...category.documents].sort((a, b) => {
            const aReq = a.requirement === "required" ? 1 : 0;
            const bReq = b.requirement === "required" ? 1 : 0;
            return bReq - aReq;
          });

          return (
            <TabsContent
              key={category.id}
              value={category.id}
              className="mt-0 focus-visible:outline-none space-y-4"
            >
              {/* Category Header Card */}
              <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-2xs mt-0.5">
                    <CategoryIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border">
                        Category {category.number} of 8
                      </span>
                      <span className="text-xs text-text-secondary font-mono">
                        <span className="tabular-nums font-semibold text-text-primary">
                          {stats?.completed ?? 0}
                        </span>{" "}
                        of <span className="tabular-nums">{stats?.total ?? rows.length}</span>{" "}
                        uploaded
                      </span>
                      {stats?.requiredTotal ? (
                        <span className="text-[11px] text-text-secondary font-mono">
                          •{" "}
                          <span className="font-semibold text-text-primary tabular-nums">
                            {stats.requiredCompleted}/{stats.requiredTotal}
                          </span>{" "}
                          required
                          <span className="text-destructive font-bold ml-0.5">*</span>
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-1 text-base sm:text-lg font-bold font-display text-text-primary tracking-tight">
                      {category.label}
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary leading-relaxed max-w-2xl">
                      {category.answers}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3 self-start sm:self-center">
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-mono text-text-secondary font-bold">
                      Completion
                    </p>
                    <p
                      className={cn(
                        "text-base font-bold font-mono tabular-nums",
                        stats?.percent === 100 ? "text-success" : "text-brand",
                      )}
                    >
                      {stats?.percent ?? 0}%
                    </p>
                  </div>

                  <Link
                    to="/documents/$categoryId"
                    params={{ categoryId: category.id }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-c bg-surface-alt/50 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors"
                  >
                    <span>Full View</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Category Guidance Note if present */}
              {category.note && (
                <div className="rounded-xl border border-border-c bg-surface-alt/40 p-3 text-xs text-text-secondary flex items-start gap-2.5">
                  <Info aria-hidden="true" className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                  <p className="leading-relaxed text-[11px]">{category.note}</p>
                </div>
              )}

              {/* Category Document Slots Grid */}
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
                        delay: Math.min(index, 6) * 0.03,
                      }}
                      className="h-full flex flex-col"
                    >
                      <DocumentRequirementRow
                        taxonomyDocument={row}
                        detailLabel={category.detailLabel}
                        document={document}
                        instanceCount={matchingDocs.length}
                        busy={rowBusy[row.key]}
                        onUpload={(file) => handleUpload(file, row, category)}
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

              {/* Category Complete Banner */}
              {stats?.allRequiredDone && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/6 p-4 flex items-start gap-3 mt-3 shadow-xs">
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
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Preview Modal for Tab Document Slots */}
      <DocumentPreviewModal
        open={Boolean(previewDoc)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewDoc(null);
        }}
        document={previewDoc}
      />

      {/* Replace Confirmation Modal for Tab Document Slots */}
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
    </section>
  );
}
