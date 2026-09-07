import React, { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  FolderLock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FilePlus2,
} from "lucide-react";
import { useDocuments } from "../hooks/useDocuments";
import { formatFileSize } from "../lib/documentPresentation";
import {
  DOCUMENT_CATEGORIES,
  REQUIRED_DOCUMENT_COUNT,
  isUnmappedDocumentType,
} from "../lib/documentTaxonomy";
import { DocumentCategorySummaryCard } from "./DocumentCategorySummaryCard";
import { DocumentCategoryNavTabs } from "./DocumentCategoryNavTabs";
import { DocumentsWhyWeNeedGuide } from "./DocumentsWhyWeNeedGuide";
import { DocumentsViewToggle, type DocumentsView } from "./DocumentsViewToggle";
import { DocumentRegistrySection } from "./DocumentRegistrySection";
import { PackagesSection } from "./PackagesSection";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { cn } from "@/shared/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function DocumentsPage() {
  const navigate = useNavigate();
  const { data: documents = [], isLoading, isError, error, refetch, isFetching } = useDocuments();
  const [activeView, setActiveView] = useState<DocumentsView>("registry");

  // ---------------------------------------------------------------------------
  // Per-Category Metrics & Telemetry
  // ---------------------------------------------------------------------------

  const uploadedTypeKeys = useMemo(
    () => new Set(documents.map((doc) => doc.document_type)),
    [documents],
  );

  const categoryMetrics = useMemo(() => {
    const list = DOCUMENT_CATEGORIES.map((category) => {
      const requiredRows = category.documents.filter((doc) => doc.requirement === "required");

      return {
        category,
        completed: category.documents.filter((doc) => uploadedTypeKeys.has(doc.key)).length,
        total: category.documents.length,
        requiredCompleted: requiredRows.filter((doc) => uploadedTypeKeys.has(doc.key)).length,
        requiredTotal: requiredRows.length,
      };
    });

    // Move all categories with required documents to the top, preserving category number ordering
    return [...list].sort((a, b) => {
      const aHasReq = a.requiredTotal > 0 ? 1 : 0;
      const bHasReq = b.requiredTotal > 0 ? 1 : 0;
      if (bHasReq !== aHasReq) return bHasReq - aHasReq;
      return a.category.number - b.category.number;
    });
  }, [uploadedTypeKeys]);

  const requiredCompletedTotal = useMemo(
    () => categoryMetrics.reduce((sum, metric) => sum + metric.requiredCompleted, 0),
    [categoryMetrics],
  );

  const compliancePercentage = Math.min(
    100,
    Math.round((requiredCompletedTotal / REQUIRED_DOCUMENT_COUNT) * 100),
  );

  const totalBytes = useMemo(
    () => documents.reduce((sum, doc) => sum + (doc.file_size_bytes || 0), 0),
    [documents],
  );

  /** Documents the taxonomy does not name — reviewable outside the checklist. */
  const otherDocuments = useMemo(
    () => documents.filter((doc) => isUnmappedDocumentType(doc.document_type)),
    [documents],
  );


  // ---------------------------------------------------------------------------
  // Loading & Error States
  // ---------------------------------------------------------------------------

  if (isLoading && documents.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-8">
        <div className="space-y-2 border-b border-border pb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {DOCUMENT_CATEGORIES.map((category) => (
            <Skeleton key={category.id} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-8">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
          <h2 className="text-lg font-bold text-text-primary">Failed to load documents</h2>
          <p className="text-xs text-text-secondary">
            {getApiErrorMessage(error, "An unexpected network error occurred.")}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-2 cursor-pointer"
          >
            {isFetching && <Loader2 className="h-4 w-4 animate-spin" />} Retry loading
          </Button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Main Page Render
  // ---------------------------------------------------------------------------

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-7"
    >
      {/* 1. Page Heading + Glanceable Compliance Telemetry */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-6"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-2xs mt-0.5">
            <FolderLock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-text-primary tracking-tight">
              Documents
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              Upload, verify, and manage statutory filings, compliance certificates, and audit
              records.
            </p>
          </div>
        </div>

        {/* Glanceable Executive Compliance Pill */}
        <div
          className={cn(
            "flex items-center gap-3 border rounded-2xl p-3 sm:px-4 shadow-xs self-start md:self-auto transition-all",
            compliancePercentage === 100
              ? "bg-linear-to-br from-emerald-500/6 via-surface to-surface border-emerald-500/30"
              : "bg-surface border-border/80",
          )}
        >
          <div className="space-y-1 min-w-35">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-text-secondary">Statutory Compliance</span>
              <span
                className={cn(
                  "font-bold font-num tabular-nums",
                  compliancePercentage === 100
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-brand",
                )}
              >
                {compliancePercentage}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-alt border border-border/50">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  compliancePercentage === 100 ? "bg-emerald-500" : "bg-brand",
                )}
                style={{ width: `${compliancePercentage}%` }}
              />
            </div>
            <p className="text-[10px] text-text-secondary font-mono">
              <span className="font-semibold text-text-primary font-num tabular-nums">
                {requiredCompletedTotal}
              </span>{" "}
              of{" "}
              <span className="font-semibold font-num tabular-nums">{REQUIRED_DOCUMENT_COUNT}</span>{" "}
              required on record
            </p>
          </div>

          <div className="h-8 w-px bg-border/80" />

          <div className="text-right">
            <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider block">
              Active Vault
            </span>
            <span className="text-sm font-bold font-num tabular-nums text-text-primary">
              {documents.length} {documents.length === 1 ? "File" : "Files"}
            </span>
            <span className="text-[10px] text-text-secondary block font-mono tabular-nums">
              {formatFileSize(totalBytes)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 2. Main Content Sections */}
      <motion.div variants={itemVariants} className="space-y-8">
        {/* Top-Level View Switcher */}
        <div className="flex items-center justify-between gap-3">
          <DocumentsViewToggle
            activeView={activeView}
            onChange={setActiveView}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {activeView === "registry" ? (
            <motion.div
              key="registry"
              id="documents-view-panel-registry"
              role="tabpanel"
              aria-labelledby="documents-view-tab-registry"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {/* Section 1: Categories */}
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-bold text-text-primary tracking-tight">
                      Document Categories
                    </h2>
                    <p className="text-xs text-text-secondary mt-0.5 mb-2">
                      Open a category to view and upload its statutory requirements.
                    </p>
                    {/* Quick-jump tabs for all 8 categories + Other Documents */}
                    <DocumentCategoryNavTabs otherDocumentsCount={otherDocuments.length} />
                  </div>

                  {compliancePercentage === 100 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/25">
                      <CheckCircle2 className="h-3.5 w-3.5" /> All Statutory Requirements Fulfilled
                    </span>
                  )}
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryMetrics.map((metric) => (
                    <DocumentCategorySummaryCard
                      key={metric.category.id}
                      label={metric.category.shortLabel}
                      completed={metric.completed}
                      total={metric.total}
                      requiredCompleted={metric.requiredCompleted}
                      requiredTotal={metric.requiredTotal}
                      icon={metric.category.icon}
                      onManage={() =>
                        navigate({
                          to: "/documents/$categoryId",
                          params: { categoryId: metric.category.id },
                        })
                      }
                    />
                  ))}

                  {/* 9th Category Card: Other Documents */}
                  <DocumentCategorySummaryCard
                    label="Other Documents"
                    completed={otherDocuments.length}
                    icon={FilePlus2}
                    hideProgress
                    subLabel={`${otherDocuments.length} uploaded`}
                    badgeLabel="Custom"
                    description="Auxiliary & custom records"
                    onManage={() => navigate({ to: "/documents/other" })}
                  />
                </div>

                <DocumentsWhyWeNeedGuide />
              </section>

              {/* Section 2: Document Registry */}
              <DocumentRegistrySection documents={documents} />
            </motion.div>
          ) : (
            <motion.div
              key="packages"
              id="documents-view-panel-packages"
              role="tabpanel"
              aria-labelledby="documents-view-tab-packages"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <PackagesSection documents={documents} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
