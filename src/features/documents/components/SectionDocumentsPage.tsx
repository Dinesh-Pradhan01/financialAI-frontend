import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  Upload,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
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
import { useStatements } from "@/shared/hooks/useStatements";
import {
  getSection,
  VAULT_SECTIONS,
  type VaultSection,
  type VaultSubCategory,
} from "../lib/vaultManifest";
import { buildUploadFormData } from "../lib/uploadHelpers";
import { DocumentRequirementRow, type DocumentRowBusyState } from "./DocumentRequirementRow";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { ReplaceDocumentDialog } from "./ReplaceDocumentDialog";
import { DocumentListSection } from "./DocumentListSection";
import { DocumentProgressRing } from "./DocumentProgressRing";
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
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { cn } from "@/shared/lib/utils";
import type { CompanyDocument } from "@/shared/types/api";
import type { TaxonomyDocument } from "../lib/documentTaxonomy";

export interface SectionDocumentsPageProps {
  sectionId: string;
  initialSubId?: string;
}

export function SectionDocumentsPage({ sectionId, initialSubId }: SectionDocumentsPageProps) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { data: documents = [], isLoading } = useDocuments();
  const statementsQuery = useStatements();

  const uploadMutation = useUploadDocument();
  const replaceMutation = useReplaceDocument();
  const deleteMutation = useDeleteDocument();

  const section: VaultSection | null = getSection(sectionId);

  // Subcategory selection
  const validSubCategories = useMemo(() => section?.subCategories ?? [], [section]);
  const defaultSubId = validSubCategories[0]?.id;
  const [activeSubId, setActiveSubId] = useState<string>(() => {
    if (initialSubId && validSubCategories.some((sc) => sc.id === initialSubId)) {
      return initialSubId;
    }
    return defaultSubId || "";
  });

  useEffect(() => {
    if (initialSubId && validSubCategories.some((sc) => sc.id === initialSubId)) {
      setActiveSubId(initialSubId);
    } else if (defaultSubId && !validSubCategories.some((sc) => sc.id === activeSubId)) {
      setActiveSubId(defaultSubId);
    }
  }, [initialSubId, defaultSubId, validSubCategories, activeSubId]);

  const activeSub: VaultSubCategory | undefined = validSubCategories.find(
    (sc) => sc.id === activeSubId,
  );

  const handleSubChange = (subId: string) => {
    setActiveSubId(subId);
    void navigate({
      to: "/documents/$sectionId",
      params: { sectionId },
      search: { sub: subId },
      replace: true,
    });
  };

  const [rowBusy, setRowBusy] = useState<Record<string, DocumentRowBusyState>>({});
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);
  const [replacingTarget, setReplacingTarget] = useState<{
    document: CompanyDocument;
    row: TaxonomyDocument;
    stagedFile?: File;
  } | null>(null);
  const [docToDelete, setDocToDelete] = useState<{
    document: CompanyDocument;
    rowName: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const patchRow = (key: string, patch: Partial<DocumentRowBusyState>) =>
    setRowBusy((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));

  // Map of documents by document_type
  const allDocumentsByType = useMemo(() => {
    const map = new Map<string, CompanyDocument[]>();
    for (const document of documents) {
      const list = map.get(document.document_type) ?? [];
      list.push(document);
      map.set(document.document_type, list);
    }
    return map;
  }, [documents]);

  // Section telemetry
  const sectionTelemetry = useMemo(() => {
    if (!section) return { totalDocs: 0, uploadedDocs: 0, reqTotal: 0, reqUploaded: 0 };

    const checklistDocs = section.subCategories.flatMap((sc) => sc.documents ?? []);
    const reqDocs = checklistDocs.filter((d) => d.requirement === "required");

    const totalDocs = checklistDocs.length;
    const uploadedDocs = checklistDocs.filter((d) => allDocumentsByType.has(d.key)).length;
    const reqTotal = reqDocs.length;
    const reqUploaded = reqDocs.filter((d) => allDocumentsByType.has(d.key)).length;

    return { totalDocs, uploadedDocs, reqTotal, reqUploaded };
  }, [section, allDocumentsByType]);

  // Subcategory rows (for checklist)
  const checklistRows = useMemo(() => {
    if (!activeSub || activeSub.kind !== "checklist" || !activeSub.documents) return [];
    return [...activeSub.documents].sort((a, b) => {
      const aReq = a.requirement === "required" ? 1 : 0;
      const bReq = b.requirement === "required" ? 1 : 0;
      return bReq - aReq;
    });
  }, [activeSub]);

  // Checklist upload action
  const handleUpload = (file: File, row: TaxonomyDocument) => {
    if (!activeSub) return;
    patchRow(row.key, { isUploading: true, rejectionReason: null, verifyingMessage: null });

    const timerId = window.setTimeout(() => {
      patchRow(row.key, { verifyingMessage: "Still verifying... this can take up to a minute" });
    }, 20_000);

    const targetCategory =
      activeSub.targetBackendCategory || row.categoryId || "identity_kyb_authority";

    const formData = buildUploadFormData(file, {
      documentType: row.key,
      documentCategory: targetCategory,
    });

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        window.clearTimeout(timerId);
        toast.success(`Recorded "${file.name}" for ${row.label}.`, {
          description: "Compliance telemetry and registry updated.",
        });
        patchRow(row.key, { isUploading: false, verifyingMessage: null });
      },
      onError: (error) => {
        window.clearTimeout(timerId);
        let message = getApiErrorMessage(error, "Upload failed");
        if (
          message.toLowerCase().includes("already exists") ||
          message.toLowerCase().includes("duplicate") ||
          message.toLowerCase().includes("hash")
        ) {
          message = "A document with identical content has already been uploaded.";
        }
        patchRow(row.key, { isUploading: false, verifyingMessage: null, rejectionReason: message });
        toast.error(message);
      },
    });
  };

  // Checklist replace action
  const handleConfirmReplace = async (file: File) => {
    if (!replacingTarget) return;
    const { document, row } = replacingTarget;
    patchRow(row.key, { isReplacing: true, rejectionReason: null, verifyingMessage: null });

    const timerId = window.setTimeout(() => {
      patchRow(row.key, { verifyingMessage: "Still verifying... this can take up to a minute" });
    }, 20_000);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await replaceMutation.mutateAsync({ docId: document.id, formData });
      window.clearTimeout(timerId);
      toast.success(`Replaced "${row.label}" with ${file.name}.`, {
        description: "Audit trail and document record updated.",
      });
      patchRow(row.key, { isReplacing: false, verifyingMessage: null });
      setReplacingTarget(null);
    } catch (error) {
      window.clearTimeout(timerId);
      let message = getApiErrorMessage(error, "Replacement failed");
      if (
        message.toLowerCase().includes("already exists") ||
        message.toLowerCase().includes("duplicate") ||
        message.toLowerCase().includes("hash")
      ) {
        message = "A document with identical content has already been uploaded.";
      }
      patchRow(row.key, { isReplacing: false, verifyingMessage: null, rejectionReason: message });
      toast.error(message);
    }
  };

  // Checklist delete action with confirmation
  const confirmDelete = async () => {
    if (!docToDelete) return;
    setIsDeleting(true);
    try {
      await deleteMutation.mutateAsync(docToDelete.document.id);
      toast.success(`Deleted ${docToDelete.document.original_name}.`);
      setDocToDelete(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete document"));
    } finally {
      setIsDeleting(false);
    }
  };

  // Checklist download action
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

  if (!isLoading && !section) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border-c text-text-secondary mb-4 shadow-xs">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h1 className="font-display text-xl font-bold text-text-primary">
          Vault Section Not Found
        </h1>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          The requested section{" "}
          <code className="rounded bg-surface-alt px-1.5 py-0.5 font-mono text-xs text-brand font-semibold">
            "{sectionId}"
          </code>{" "}
          does not exist in the documents vault.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={() => navigate({ to: "/documents" })}
            className="gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Documents Vault
          </Button>
        </div>
      </div>
    );
  }

  const SectionIcon = section?.icon ?? FileText;

  return (
    <main className="min-h-[calc(100vh-4rem)] pb-16 pt-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-6">
        {/* 1. Breadcrumb + Section Switcher */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
          <Link
            to="/documents"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Documents Vault</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-text-secondary font-mono">
            <span>
              Section {section?.number} of {VAULT_SECTIONS.length}
            </span>
          </div>
        </nav>

        {/* 2. Section Header Banner */}
        <header
          className={cn(
            "rounded-2xl border border-border-c bg-linear-to-br p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4",
            section?.theme.gradientSurface ?? "from-brand/6 via-surface to-surface",
          )}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-2xs mt-0.5 border",
                section?.theme.iconContainer ?? "bg-brand/10 text-brand border-brand/20",
              )}
            >
              <SectionIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    "text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full border",
                    section?.theme.sectionTag ??
                      "bg-surface-alt text-text-secondary border-border-c",
                  )}
                >
                  Section {section?.number}
                </span>
                {sectionTelemetry.totalDocs > 0 && (
                  <span className="text-xs text-text-secondary font-mono">
                    <span className="tabular-nums font-semibold text-text-primary">
                      {sectionTelemetry.uploadedDocs}
                    </span>{" "}
                    of <span className="tabular-nums">{sectionTelemetry.totalDocs}</span> uploaded
                  </span>
                )}
              </div>
              <h1 className="mt-1 text-lg sm:text-xl font-bold font-display text-text-primary tracking-tight">
                {section?.label}
              </h1>
              <p className="mt-1 text-xs text-text-secondary leading-relaxed max-w-2xl">
                {section?.description}
              </p>
            </div>
          </div>

          {/* Section Progress Ring (if section has required documents) */}
          {sectionTelemetry.reqTotal > 0 && (
            <div
              className={cn(
                "flex items-center gap-3 border rounded-xl px-4 py-2.5 self-start sm:self-auto shrink-0 transition-all",
                sectionTelemetry.reqUploaded >= sectionTelemetry.reqTotal
                  ? "border-success/35 bg-success/8 shadow-2xs"
                  : "border-border-c/80 bg-surface-alt/40",
              )}
            >
              <DocumentProgressRing
                completed={sectionTelemetry.reqUploaded}
                total={sectionTelemetry.reqTotal}
                size={40}
                strokeWidth={4}
              />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider block">
                    Statutory Gating
                  </span>
                  {sectionTelemetry.reqUploaded >= sectionTelemetry.reqTotal && (
                    <span className="text-[9px] font-bold font-mono text-success uppercase px-1.5 py-0.2 rounded-full bg-success/15 border border-success/25">
                      Cleared
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-bold font-mono",
                    sectionTelemetry.reqUploaded >= sectionTelemetry.reqTotal
                      ? "text-success"
                      : "text-text-primary",
                  )}
                >
                  {sectionTelemetry.reqUploaded} of {sectionTelemetry.reqTotal} required
                </span>
              </div>
            </div>
          )}
        </header>

        {/* 3. Subcategories Segmented Control Tabs */}
        {validSubCategories.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-border-c/70">
            {validSubCategories.map((sub) => {
              const isActive = sub.id === activeSubId;
              const SubIcon = sub.icon ?? FileText;

              let badgeInfo = "";
              if (sub.kind === "checklist" && sub.documents) {
                const uploaded = sub.documents.filter((d) => allDocumentsByType.has(d.key)).length;
                badgeInfo = `${uploaded}/${sub.documents.length}`;
              } else if (sub.kind === "list" && sub.documentType) {
                const count = allDocumentsByType.get(sub.documentType)?.length ?? 0;
                badgeInfo = String(count);
              } else if (sub.kind === "external") {
                badgeInfo = "Live";
              }

              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleSubChange(sub.id)}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border",
                    isActive
                      ? (section?.theme.activeTab ??
                          "bg-brand text-on-brand border-brand shadow-xs")
                      : "bg-surface text-text-secondary border-border-c hover:text-text-primary hover:border-border-c/90 hover:bg-surface-alt/50",
                  )}
                >
                  <SubIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>{sub.label}</span>
                  {badgeInfo && (
                    <span
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-surface-alt text-text-secondary border border-border-c",
                      )}
                    >
                      {badgeInfo}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 4. Active Subcategory Content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSubId}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeSub?.kind === "list" ? (
              <DocumentListSection subCategory={activeSub} documents={documents} />
            ) : activeSub?.kind === "external" ? (
              (() => {
                const ActiveSubIcon = activeSub.icon ?? FileText;
                return (
                  <div className="rounded-2xl border border-border-c bg-surface p-8 shadow-xs space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20">
                            {activeSub.externalBadge || "External Integration"}
                          </span>
                          {statementsQuery.data && (
                            <span className="text-xs text-text-secondary font-mono">
                              {statementsQuery.data.length} parsed statements on record
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold font-display text-text-primary">
                          {activeSub.label}
                        </h2>
                        <p className="text-xs text-text-secondary max-w-xl leading-relaxed">
                          {activeSub.description}
                        </p>
                      </div>

                      <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20">
                        <ActiveSubIcon className="h-8 w-8" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border-c/70 bg-surface-alt/40 flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-xs font-semibold text-text-primary">
                          Continuous Banking Reconciliation
                        </p>
                        <p className="text-[11px] text-text-secondary">
                          Access multi-account transaction parsing, OCR extraction, and balance
                          reconciliation.
                        </p>
                      </div>
                      <Button asChild className="gap-2 cursor-pointer">
                        <Link to={activeSub.externalRoute || "/spending/statements"}>
                          <span>Open Statements Module</span>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })()
            ) : (
              /* Checklist Subcategory */
              <div className="space-y-4">
                {activeSub?.description && (
                  <div className="rounded-xl border border-border-c/80 bg-surface-alt/50 p-3.5 text-xs text-text-secondary flex items-start gap-2.5">
                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <p>{activeSub.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {checklistRows.map((row) => {
                    const uploadedList = allDocumentsByType.get(row.key) ?? [];
                    const latestDoc = uploadedList[0] ?? null;
                    const busy = rowBusy[row.key] ?? {};

                    return (
                      <DocumentRequirementRow
                        key={row.key}
                        taxonomyDocument={row}
                        detailLabel="Applies to"
                        document={latestDoc}
                        instanceCount={uploadedList.length}
                        busy={busy}
                        onUpload={(file) => handleUpload(file, row)}
                        onRequestReplace={(stagedFile) => {
                          if (latestDoc) {
                            setReplacingTarget({
                              document: latestDoc,
                              row,
                              stagedFile,
                            });
                          }
                        }}
                        onDelete={() => {
                          if (latestDoc) {
                            setDocToDelete({
                              document: latestDoc,
                              rowName: row.label,
                            });
                          }
                        }}
                        onPreview={() => {
                          if (latestDoc) setPreviewDoc(latestDoc);
                        }}
                        onDownload={() => {
                          if (latestDoc) void handleDownload(row, latestDoc);
                        }}
                        onDismissRejection={() => {
                          patchRow(row.key, { rejectionReason: null });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={Boolean(docToDelete)}
        onOpenChange={(open) => !open && setDocToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{" "}
              <strong className="text-text-primary">
                {docToDelete?.document.original_name ?? docToDelete?.rowName}
              </strong>
              ? This action cannot be undone and will remove the file from compliance records.
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

      {/* Replace Document Dialog */}
      {replacingTarget && (
        <ReplaceDocumentDialog
          open={Boolean(replacingTarget)}
          onOpenChange={(open) => !open && setReplacingTarget(null)}
          targetDocument={replacingTarget.document}
          targetLabel={replacingTarget.row.label}
          initialFile={replacingTarget.stagedFile}
          isReplacing={rowBusy[replacingTarget.row.key]?.isReplacing}
          onConfirmReplace={handleConfirmReplace}
        />
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <DocumentPreviewModal
          document={previewDoc}
          open={Boolean(previewDoc)}
          onOpenChange={(open) => !open && setPreviewDoc(null)}
        />
      )}
    </main>
  );
}
