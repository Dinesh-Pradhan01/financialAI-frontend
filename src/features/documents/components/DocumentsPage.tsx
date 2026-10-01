import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  FolderLock,
  Loader2,
  AlertCircle,
  FilePlus2,
  Search,
  X,
  ChevronRight,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useDocuments } from "../hooks/useDocuments";
import { formatFileSize } from "../lib/documentPresentation";
import {
  REQUIRED_DOCUMENT_COUNT,
  ALL_TAXONOMY_DOCUMENTS,
  isUnmappedDocumentType,
} from "../lib/documentTaxonomy";
import {
  VAULT_SECTIONS,
  ALL_VAULT_DOCUMENTS,
  getSectionForDocument,
  type VaultSection,
} from "../lib/vaultManifest";
import { DocumentsWhyWeNeedGuide } from "./DocumentsWhyWeNeedGuide";
import { DocumentsViewToggle, type DocumentsView } from "./DocumentsViewToggle";
import { DocumentRegistrySection } from "./DocumentRegistrySection";
import { PackagesSection } from "./PackagesSection";
import { DocumentProgressRing } from "./DocumentProgressRing";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
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

/** Card stagger variants used for each vault section card. */
const cardVariants: Variants = {
  hidden: (custom?: { i: number; reduced?: boolean | null }) => ({
    opacity: 0,
    y: custom?.reduced ? 0 : 8,
  }),
  visible: (custom?: { i: number; reduced?: boolean | null }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.reduced ? 0.15 : 0.28,
      delay: custom?.reduced ? 0 : Math.min(0.2, (custom?.i ?? 0) * 0.04),
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function DocumentsPage() {
  const navigate = useNavigate();
  const { data: documents = [], isLoading, isError, error, refetch, isFetching } = useDocuments();
  const [activeView, setActiveView] = useState<DocumentsView>("vault");
  const [searchQuery, setSearchQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  // ---------------------------------------------------------------------------
  // Global Compliance Telemetry (Identical 17-document formula)
  // ---------------------------------------------------------------------------

  const uploadedTypeKeys = useMemo(
    () => new Set(documents.map((doc) => doc.document_type)),
    [documents],
  );

  const requiredDocuments = useMemo(
    () => ALL_TAXONOMY_DOCUMENTS.filter((doc) => doc.requirement === "required"),
    [],
  );

  const pendingRequiredDocuments = useMemo(
    () => requiredDocuments.filter((doc) => !uploadedTypeKeys.has(doc.key)),
    [requiredDocuments, uploadedTypeKeys],
  );

  const requiredCompletedTotal = requiredDocuments.length - pendingRequiredDocuments.length;

  const compliancePercentage = Math.min(
    100,
    Math.round((requiredCompletedTotal / REQUIRED_DOCUMENT_COUNT) * 100),
  );

  const totalBytes = useMemo(
    () => documents.reduce((sum, doc) => sum + (doc.file_size_bytes || 0), 0),
    [documents],
  );

  const otherDocuments = useMemo(
    () => documents.filter((doc) => isUnmappedDocumentType(doc.document_type)),
    [documents],
  );

  // ---------------------------------------------------------------------------
  // Precomputed Search Index
  // ---------------------------------------------------------------------------

  const searchIndex = useMemo(() => {
    return ALL_VAULT_DOCUMENTS.map((doc) => {
      const section = getSectionForDocument(doc.key);
      const isUploaded = uploadedTypeKeys.has(doc.key);
      return {
        doc,
        section,
        isUploaded,
        searchText: `${doc.label} ${doc.key} ${doc.detail} ${doc.reference ?? ""} ${
          section?.label ?? ""
        }`.toLowerCase(),
      };
    });
  }, [uploadedTypeKeys]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((item) => item.searchText.includes(q)).slice(0, 10);
  }, [searchIndex, searchQuery]);

  // ---------------------------------------------------------------------------
  // Section Metrics
  // ---------------------------------------------------------------------------

  const sectionMetrics = useMemo(() => {
    return VAULT_SECTIONS.map((section) => {
      const checklistDocs = section.subCategories.flatMap((sc) => sc.documents ?? []);
      const reqDocs = checklistDocs.filter((d) => d.requirement === "required");

      // Count checklist uploads
      const checklistCompleted = checklistDocs.filter((d) => uploadedTypeKeys.has(d.key)).length;

      // Count list uploads
      const listTypes = section.subCategories
        .filter((sc) => sc.kind === "list" && sc.documentType)
        .map((sc) => sc.documentType as string);
      const listCompleted = documents.filter((d) => listTypes.includes(d.document_type)).length;

      const total = checklistDocs.length + (listTypes.length > 0 ? listCompleted : 0);
      const completed = checklistCompleted + listCompleted;
      const requiredTotal = reqDocs.length;
      const requiredCompleted = reqDocs.filter((d) => uploadedTypeKeys.has(d.key)).length;

      return {
        section,
        total,
        completed,
        requiredTotal,
        requiredCompleted,
      };
    });
  }, [uploadedTypeKeys, documents]);

  // ---------------------------------------------------------------------------
  // Loading & Error States
  // ---------------------------------------------------------------------------

  if (isLoading && documents.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-8">
        <div className="space-y-2 border-b border-border-c pb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
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
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-c/80 pb-6"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-2xs mt-0.5">
            <FolderLock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-text-primary tracking-tight">
              Documents Vault
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              Restructured executive repository for statutory compliance, contracts, financial
              statements, and operational records.
            </p>
          </div>
        </div>

        {/* Glanceable Executive Compliance Pill */}
        <div
          className={cn(
            "flex items-center gap-3 border rounded-2xl p-3 sm:px-4 shadow-xs self-start md:self-auto transition-all",
            compliancePercentage === 100
              ? "bg-linear-to-br from-success/8 via-surface to-surface border-success/30"
              : "bg-surface border-border-c/80",
          )}
        >
          <div className="space-y-1 min-w-35">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-text-secondary">Statutory Compliance</span>
              <span
                className={cn(
                  "font-bold font-num tabular-nums",
                  compliancePercentage === 100 ? "text-success" : "text-brand",
                )}
              >
                {compliancePercentage}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-alt border border-border-c/50">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  compliancePercentage === 100 ? "bg-success" : "bg-brand",
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

          <div className="h-8 w-px bg-border-c/80" />

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <DocumentsViewToggle activeView={activeView} onChange={setActiveView} />

          {/* Search Input across Vault */}
          {activeView === "vault" && (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
              <Input
                type="text"
                placeholder="Search vault documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-8 h-9 text-xs rounded-xl bg-surface border-border-c"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Search Results Dropdown/Panel */}
        {activeView === "vault" && searchQuery.trim().length > 0 && (
          <div className="rounded-2xl border border-brand/30 bg-surface p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-text-primary">
                Search Results ({searchResults.length})
              </span>
              <span className="text-[11px] text-text-secondary">for "{searchQuery}"</span>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-6 text-center space-y-2">
                <p className="text-xs text-text-secondary">
                  No matching documents found in the vault catalog for "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-brand hover:underline cursor-pointer"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              <div className="divide-y divide-border-c/60">
                {searchResults.map(({ doc, section, isUploaded }) => (
                  <div
                    key={doc.key}
                    onClick={() => {
                      if (section) {
                        void navigate({
                          to: "/documents/$sectionId",
                          params: { sectionId: section.id },
                        });
                      }
                    }}
                    className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-surface-alt/50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-text-primary flex items-center gap-1">
                          <span>{doc.label}</span>
                          {doc.requirement === "required" && (
                            <span
                              className="text-destructive font-bold text-xs leading-none select-none"
                              title="Required"
                            >
                              *
                            </span>
                          )}
                        </span>
                        {isUploaded && (
                          <span className="text-[10px] font-semibold text-success bg-success/15 px-1.5 py-0.2 rounded border border-success/25">
                            Uploaded
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-text-secondary truncate mt-0.5 max-w-lg">
                        {doc.detail}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-1.5 shrink-0 text-xs font-semibold px-2 py-0.5 rounded-md border",
                        section
                          ? section.theme.sectionTag
                          : "text-brand border-brand/20 bg-brand/5",
                      )}
                    >
                      <span>{section?.shortLabel ?? "Vault"}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          {activeView === "vault" ? (
            <motion.div
              key="vault"
              id="documents-view-panel-vault"
              role="tabpanel"
              aria-labelledby="documents-view-tab-vault"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Statutory Readiness Punch-List or 100% Cleared Milestone */}
              {pendingRequiredDocuments.length > 0 ? (
                <div className="rounded-2xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                        <FolderLock className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-text-primary tracking-tight">
                          Statutory Readiness Punch-List
                        </h2>
                        <p className="text-xs text-text-secondary">
                          {requiredCompletedTotal} of {REQUIRED_DOCUMENT_COUNT} mandatory filings on
                          record. Fulfill these to clear regulatory and banking checkpoints.
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 font-mono tabular-nums bg-severity-moderate/15 border border-severity-moderate/30 px-2.5 py-1 rounded-lg self-start sm:self-auto flex items-center gap-1.5 shadow-2xs">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      {pendingRequiredDocuments.length} Required Action
                      {pendingRequiredDocuments.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 pt-1">
                    {pendingRequiredDocuments.slice(0, 6).map((reqDoc, index) => {
                      const sec = getSectionForDocument(reqDoc.key);
                      return (
                        <motion.div
                          key={reqDoc.key}
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.22,
                            delay: shouldReduceMotion ? 0 : index * 0.03,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            if (sec) {
                              void navigate({
                                to: "/documents/$sectionId",
                                params: { sectionId: sec.id },
                              });
                            }
                          }}
                          onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && sec) {
                              e.preventDefault();
                              void navigate({
                                to: "/documents/$sectionId",
                                params: { sectionId: sec.id },
                              });
                            }
                          }}
                          className={cn(
                            "flex items-center justify-between gap-3 p-3 rounded-xl border border-border-c/90 bg-surface hover:bg-surface-alt/60 transition-all cursor-pointer group shadow-2xs",
                            sec?.theme.hoverBorder,
                          )}
                        >
                          <div className="min-w-0 flex-1 flex items-start gap-2.5">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full shrink-0 mt-1.5 ring-2 ring-surface",
                                sec?.theme.dotColor ?? "bg-brand",
                              )}
                            />
                            <div className="min-w-0 flex-1">
                              <span
                                className={cn(
                                  "text-xs font-semibold text-text-primary truncate block transition-colors",
                                  sec
                                    ? `group-hover:${sec.theme.accentText}`
                                    : "group-hover:text-brand",
                                )}
                              >
                                {reqDoc.label}
                              </span>
                              <span className="text-[10px] text-text-tertiary">
                                {sec?.shortLabel ?? "Vault"} · Mandatory
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            className={cn(
                              "h-3.5 w-3.5 text-text-tertiary shrink-0 transition-transform group-hover:translate-x-0.5",
                              sec
                                ? `group-hover:${sec.theme.accentText}`
                                : "group-hover:text-brand",
                            )}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-success/30 bg-linear-to-br from-success/8 via-surface to-surface p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success border border-success/30 shadow-2xs mt-0.5">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base font-bold text-text-primary tracking-tight">
                          Statutory Readiness: 100% Cleared
                        </h2>
                        <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/25">
                          Audit Ready
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary max-w-xl leading-relaxed">
                        All 17 mandatory statutory filings are verified on record. Your company has
                        complete regulatory gating clearance for loan sanctions, bank audits, and
                        investor due diligence.
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => setActiveView("packages")}
                    className="gap-2 cursor-pointer bg-brand hover:bg-brand/90 text-white shrink-0 self-start sm:self-auto shadow-xs"
                  >
                    <span>Create Due Diligence Pack</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              {/* The 5 Vault Sections */}
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-bold text-text-primary tracking-tight">
                      Vault Sections
                    </h2>
                    <p className="text-xs text-text-secondary mt-0.5 mb-2">
                      Organized repository of statutory, contractual, financial, and operational
                      records.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {sectionMetrics.map((metric, index) => {
                    const sec = metric.section;
                    const Icon = sec.icon;
                    const hasReq = metric.requiredTotal > 0;
                    const isComplete = hasReq && metric.requiredCompleted >= metric.requiredTotal;

                    return (
                      <motion.div
                        key={sec.id}
                        custom={{ i: index, reduced: shouldReduceMotion }}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          navigate({
                            to: "/documents/$sectionId",
                            params: { sectionId: sec.id },
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            void navigate({
                              to: "/documents/$sectionId",
                              params: { sectionId: sec.id },
                            });
                          }
                        }}
                        className={cn(
                          "rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer shadow-xs select-none flex flex-col justify-between gap-3.5 group relative overflow-hidden min-h-40",
                          isComplete
                            ? "border-success/35 bg-linear-to-br from-success/8 via-surface to-surface hover:border-success/50 hover:shadow-md"
                            : cn(
                                "border-border-c/90 bg-linear-to-br",
                                sec.theme.gradientSurface,
                                sec.theme.hoverBorder,
                                "hover:shadow-md",
                              ),
                        )}
                      >
                        {/* Top: Icon + Section Label + Badges */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-2xs group-hover:scale-105 transition-transform duration-200 border",
                                isComplete
                                  ? "bg-success/15 text-success border-success/30"
                                  : sec.theme.iconContainer,
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span
                                  className={cn(
                                    "text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-md border",
                                    sec.theme.sectionTag,
                                  )}
                                >
                                  Section {sec.number}
                                </span>
                              </div>
                              <h3
                                className={cn(
                                  "font-bold text-sm text-text-primary tracking-tight truncate transition-colors mt-0.5",
                                  `group-hover:${sec.theme.accentText}`,
                                )}
                              >
                                {sec.label}
                              </h3>
                            </div>
                          </div>

                          {/* Progress Ring for checklist sections with required items */}
                          {hasReq && (
                            <DocumentProgressRing
                              completed={metric.requiredCompleted}
                              total={metric.requiredTotal}
                              size={34}
                              strokeWidth={3}
                            />
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                          {sec.description}
                        </p>

                        <div className="space-y-2 pt-1 border-t border-border-c/60">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-text-secondary font-mono">
                              <span className="font-semibold text-text-primary font-num tabular-nums">
                                {metric.completed}
                              </span>{" "}
                              on record
                            </span>
                            <div
                              className={cn(
                                "flex items-center gap-0.5 font-semibold text-text-secondary transition-colors",
                                `group-hover:${sec.theme.accentText}`,
                              )}
                            >
                              <span>Open Vault</span>
                              <ChevronRight className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* 8th Card: Other Documents */}
                  <motion.div
                    custom={{ i: sectionMetrics.length, reduced: shouldReduceMotion }}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate({ to: "/documents/other" })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        void navigate({ to: "/documents/other" });
                      }
                    }}
                    className="rounded-2xl border border-border-c bg-surface p-4 sm:p-5 hover:border-brand/30 hover:bg-surface-alt/30 transition-all duration-200 cursor-pointer shadow-xs select-none flex flex-col justify-between gap-3.5 group relative"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-brand border border-border-c group-hover:scale-105 transition-transform duration-200">
                          <FilePlus2 className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-1.5 py-0.2 rounded bg-surface-alt text-text-secondary border border-border-c">
                            Auxiliary
                          </span>
                          <h3 className="font-bold text-sm text-text-primary tracking-tight group-hover:text-brand transition-colors mt-0.5">
                            Other Documents
                          </h3>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border-c">
                        {otherDocuments.length} files
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed">
                      Custom and miscellaneous documents that do not map to statutory categories.
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border-c/60">
                      <span className="text-text-secondary">Custom uploads</span>
                      <div className="flex items-center gap-0.5 font-semibold text-text-secondary group-hover:text-brand transition-colors">
                        <span>Open</span>
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <DocumentsWhyWeNeedGuide />
              </section>
            </motion.div>
          ) : activeView === "registry" ? (
            <motion.div
              key="registry"
              id="documents-view-panel-registry"
              role="tabpanel"
              aria-labelledby="documents-view-tab-registry"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
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
