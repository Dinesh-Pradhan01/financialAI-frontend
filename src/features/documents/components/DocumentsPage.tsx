import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Search,
  X,
  Loader2,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import {
  useDocuments,
  useReplaceDocument,
  useDeleteDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import { useUploadQueue } from "../hooks/useUploadQueue";
import {
  filterAndSortDocuments,
  groupDocumentsByHierarchy,
  calculateRepositoryMetrics,
  getRepositoryStructureOverview,
} from "../lib/presentationModel";
import { ORDERED_TOP_LEVEL_DOMAINS } from "../lib/categoryNormalizer";
import { DocumentCard } from "./DocumentCard";
import { DocumentRegistrySection } from "./DocumentRegistrySection";
import { PackagesSection } from "./PackagesSection";
import { DocumentsViewToggle, type DocumentsView } from "./DocumentsViewToggle";
import { UploadDocumentModal } from "./UploadDocumentModal";
import { UploadActivityMonitor } from "./UploadActivityMonitor";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { ReplaceDocumentDialog } from "./ReplaceDocumentDialog";
import { CreatePackageDialog } from "./CreatePackageDialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
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

// Threshold for Section 10 rule 5: domains with <= 6 total documents expand all groups by default
const COMPACT_DOMAIN_EXPANSION_THRESHOLD = 6;

export function DocumentsPage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as {
    category?: string;
    sub?: string;
    view?: string;
    q?: string;
  };

  const { data: documents = [], isLoading, isError, error, refetch, isFetching } = useDocuments();

  const replaceMutation = useReplaceDocument();
  const deleteMutation = useDeleteDocument();
  const uploadQueue = useUploadQueue();

  // ---------------------------------------------------------------------------
  // URL State & Local Discovery State (Section 12A)
  // ---------------------------------------------------------------------------

  const activeCategory = (searchParams?.category as string) || "all";
  const activeView: DocumentsView =
    searchParams?.view === "table"
      ? "table"
      : searchParams?.view === "packages"
        ? "packages"
        : "grouped";

  const [searchQuery, setSearchQuery] = useState(searchParams?.q || "");
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  // Modals & Overlays
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);
  const [docToReplace, setDocToReplace] = useState<CompanyDocument | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [docToDelete, setDocToDelete] = useState<CompanyDocument | null>(null);
  const [targetDocForPackage, setTargetDocForPackage] = useState<CompanyDocument | null>(null);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);

  // Accordion Header button refs for accessibility focus restoration (Section 12B)
  const headerButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Explicit subcategory expansion/collapse state (true = open, false = closed, undefined = default)
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (searchParams?.sub) {
      initial[searchParams.sub] = true;
    }
    return initial;
  });

  // Keep expanded state in sync when URL search param `sub` changes
  useEffect(() => {
    if (searchParams?.sub) {
      setOpenSubcategories((prev) => ({
        ...prev,
        [searchParams.sub!]: true,
      }));
    }
  }, [searchParams?.sub]);

  // Synchronize search query parameter with URL
  useEffect(() => {
    if (searchParams?.q !== undefined && searchParams.q !== searchQuery) {
      setSearchQuery(searchParams.q);
    }
  }, [searchParams?.q]);

  const handleCategoryChange = (newCategory: string, newSub?: string) => {
    void navigate({
      to: "/documents",
      search: {
        category: newCategory === "all" ? undefined : newCategory,
        sub: newSub || undefined,
        view: searchParams?.view as any,
        q: searchQuery.trim() || undefined,
      },
      replace: true,
    });
  };

  const handleViewChange = (newView: DocumentsView) => {
    void navigate({
      to: "/documents",
      search: {
        category: searchParams?.category,
        sub: searchParams?.sub,
        view: newView === "grouped" ? undefined : (newView as "table" | "packages"),
        q: searchQuery.trim() || undefined,
      },
      replace: true,
    });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    void navigate({
      to: "/documents",
      search: {
        category: searchParams?.category,
        sub: searchParams?.sub,
        view: searchParams?.view as any,
        q: val.trim() || undefined,
      },
      replace: true,
    });
  };

  // ---------------------------------------------------------------------------
  // Derived Metrics & Filtered Data
  // ---------------------------------------------------------------------------

  const metrics = useMemo(() => calculateRepositoryMetrics(documents), [documents]);

  const filteredDocuments = useMemo(() => {
    return filterAndSortDocuments(documents, {
      categoryFilter: activeView === "grouped" ? activeCategory : "all",
      searchQuery,
      sortOrder: "newest",
    });
  }, [documents, activeCategory, searchQuery, activeView]);

  const hierarchicalSections = useMemo(() => {
    return groupDocumentsByHierarchy(filteredDocuments);
  }, [filteredDocuments]);

  // Structural Overview for Section 8 ("All" view)
  const overviewStructure = useMemo(() => {
    return getRepositoryStructureOverview(documents);
  }, [documents]);

  // Domain counts across entire repository using authoritative vault placement
  const domainTelemetry = useMemo(() => {
    const map = new Map<
      string,
      { count: number; missingRequired: number; needsAttention: number }
    >();

    for (const row of overviewStructure) {
      map.set(row.domain.id, {
        count: row.totalDocuments,
        missingRequired: row.missingRequiredCount,
        needsAttention: row.needsAttentionCount,
      });
    }

    return map;
  }, [overviewStructure]);

  // ---------------------------------------------------------------------------
  // Subcategory Accordion Expansion Rules (Section 10)
  // ---------------------------------------------------------------------------

  const isSubcategoryExpanded = (
    subId: string,
    domainSubcategories: { category: { id: string }; documents: CompanyDocument[] }[],
    domainDocCount: number,
  ): boolean => {
    // 1. Explicit user toggle takes absolute precedence
    if (openSubcategories[subId] !== undefined) {
      return openSubcategories[subId];
    }

    // 2. If search is active: auto-expand all groups with matches (Section 12)
    if (searchQuery.trim().length > 0) {
      const group = domainSubcategories.find((s) => s.category.id === subId);
      return Boolean(group && group.documents.length > 0);
    }

    // 3. If URL specified `sub`
    if (searchParams?.sub === subId) {
      return true;
    }

    // 4. Section 10 Rule 5: If domain has <= 6 documents, expand all subcategories with documents
    if (domainDocCount <= COMPACT_DOMAIN_EXPANSION_THRESHOLD) {
      const group = domainSubcategories.find((s) => s.category.id === subId);
      return Boolean(group && group.documents.length > 0);
    }

    // 5. Section 10 Rule 4: If domain has > 6 documents and no manual state, expand only first subcategory with documents
    const firstPopulated = domainSubcategories.find((s) => s.documents.length > 0);
    return firstPopulated?.category.id === subId;
  };

  const toggleSubcategory = (subId: string, isCurrentlyExpanded: boolean) => {
    const nextState = !isCurrentlyExpanded;

    setOpenSubcategories((prev) => ({
      ...prev,
      [subId]: nextState,
    }));

    if (!nextState) {
      // Accessibility: if focus was inside the collapsed area, move focus to header button (Section 12B)
      const btn = headerButtonRefs.current.get(subId);
      if (btn && btn.parentElement?.contains(document.activeElement)) {
        btn.focus();
      }
      if (searchParams?.sub === subId) {
        handleCategoryChange(activeCategory, undefined);
      }
    } else {
      handleCategoryChange(activeCategory, subId);
    }
  };

  const handleToggleAllSubcategories = (
    subcategories: { category: { id: string }; documents: CompanyDocument[] }[],
    expand: boolean,
  ) => {
    setOpenSubcategories((prev) => {
      const next = { ...prev };
      for (const item of subcategories) {
        next[item.category.id] = expand;
      }
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // Action Handlers
  // ---------------------------------------------------------------------------

  const handleDownload = async (doc: CompanyDocument) => {
    try {
      setDownloadingDocId(doc.id);
      await downloadDocument(doc.id, doc.original_name);
      toast.success(`Downloaded ${doc.original_name}`);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to download document"));
    } finally {
      setDownloadingDocId(null);
    }
  };

  const handleReplaceSubmit = async (file: File) => {
    if (!docToReplace) return;
    setIsReplacing(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", docToReplace.document_type);
    formData.append("document_category", docToReplace.document_category);

    try {
      await replaceMutation.mutateAsync({ docId: docToReplace.id, formData });
      toast.success(`Replaced "${docToReplace.original_name}" with "${file.name}"`);
      setDocToReplace(null);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to replace document"));
    } finally {
      setIsReplacing(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!docToDelete) return;
    const target = docToDelete;
    setDocToDelete(null);

    try {
      await deleteMutation.mutateAsync(target.id);
      toast.success(`Archived "${target.original_name}"`, {
        description: "Corporate evidence unlinked from active vault. Audit history preserved.",
      });
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to archive document"));
    }
  };

  const handleUploadFile = (
    file: File,
    options?: { documentCategory?: string; documentType?: string },
  ) => {
    uploadQueue.enqueue([file], {
      documentCategory: options?.documentCategory || "",
      documentType: options?.documentType || "",
    });
  };

  const handleAddToPackage = (doc: CompanyDocument) => {
    setTargetDocForPackage(doc);
    setIsPackageDialogOpen(true);
  };

  const handleOpenOrScrollActivity = () => {
    const el = document.getElementById("upload-activity-monitor");
    if (el && uploadQueue.items.length > 0) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setIsUploadOpen(true);
    }
  };

  // ---------------------------------------------------------------------------
  // Loading & Error States
  // ---------------------------------------------------------------------------

  if (isLoading && documents.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8">
        <div className="space-y-2 border-b border-border-c pb-6">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-8">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
          <h2 className="text-lg font-bold text-text-primary">Failed to load repository</h2>
          <p className="text-xs text-text-secondary">
            {getApiErrorMessage(
              error,
              "An unexpected network error occurred while loading documents.",
            )}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-2 cursor-pointer rounded-xl border-border-c"
          >
            {isFetching && <Loader2 className="h-4 w-4 animate-spin" />} Retry connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-7">
      {/* 1. Header & Lean Repository Telemetry Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-c/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-text-primary tracking-tight">
            Documents
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Authoritative corporate documentary evidence vault.
          </p>
        </div>

        {/* Header Actions & Compact Repository Telemetry */}
        <div className="flex flex-wrap items-center gap-3">
          {uploadQueue.hasActiveJobs && (
            <button
              type="button"
              onClick={handleOpenOrScrollActivity}
              className="flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 hover:bg-brand/15 px-3 py-1.5 text-xs text-brand font-semibold shadow-2xs transition-colors cursor-pointer animate-pulse"
              title="Upload in progress — click to view status"
            >
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>
                {uploadQueue.isUploading ? "Uploading" : "Processing"} (
                {uploadQueue.totalActiveJobs} active)
              </span>
            </button>
          )}

          {uploadQueue.failedCount > 0 && !uploadQueue.hasActiveJobs && (
            <button
              type="button"
              onClick={handleOpenOrScrollActivity}
              className="flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 hover:bg-destructive/15 px-2.5 py-1.5 text-xs text-destructive font-semibold cursor-pointer"
              title="Click to view error details"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{uploadQueue.failedCount} failed</span>
            </button>
          )}

          <div
            title={`${metrics.verifiedCount} of ${metrics.totalCount} documents verified • ${metrics.reviewedPercentage}% vault audit readiness`}
            className="inline-flex items-center gap-2.5 rounded-full border border-border-c/90 bg-surface pl-3 pr-1.5 py-1 shadow-2xs hover:border-brand/30 transition-all select-none"
          >
            {/* Verified over Total */}
            <div className="flex items-center gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5 text-text-tertiary" />
              <span className="font-semibold text-text-primary tabular-nums">
                {metrics.verifiedCount}
              </span>
              <span className="text-text-secondary font-medium">
                /{metrics.totalCount} Verified
              </span>
            </div>

            {/* Vertical Hairline Divider */}
            <div className="h-3.5 w-px bg-border-c/80" aria-hidden="true" />

            {/* Readiness Chip */}
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors",
                metrics.reviewedPercentage >= 80
                  ? "bg-success/12 text-success border-success/30"
                  : "bg-brand/10 text-brand border-brand/25",
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span className="font-semibold tabular-nums">
                {metrics.reviewedPercentage}% Ready
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="h-9 px-4 rounded-xl bg-brand hover:bg-brand/90 text-white shadow-xs cursor-pointer gap-2 text-xs font-semibold"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Upload Document</span>
          </Button>
        </div>
      </div>

      {/* 2. Discovery Bar: Search, Category Pills, View Mode Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Real-Time Search Input (Displayed for Grouped and Table views) */}
          {activeView !== "packages" ? (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
              <Input
                type="text"
                placeholder={
                  activeView === "table"
                    ? "Search table records…"
                    : activeCategory === "all"
                      ? "Search across all domains…"
                      : "Search within this domain…"
                }
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-8.5 pr-8 h-9 text-xs rounded-xl bg-surface border-border-c shadow-2xs"
                aria-label="Search documents"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary cursor-pointer p-0.5"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div />
          )}

          {/* View Mode Switcher (Grouped | Table | Packages) */}
          <DocumentsViewToggle activeView={activeView} onChange={handleViewChange} />
        </div>

        {/* Semantic Top-Level Domain Navigation (Section 7 & 9A) — ONLY SHOWN IN GROUPED VIEW */}
        {activeView === "grouped" && (
          <div
            role="tablist"
            aria-label="Document Domains"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer border flex items-center gap-1.5 motion-reduce:transform-none",
                activeCategory === "all"
                  ? "bg-brand text-white border-brand shadow-xs"
                  : "bg-surface text-text-secondary border-border-c/80 hover:border-brand/40 hover:text-text-primary",
              )}
            >
              <span>All</span>
              <span
                className={cn(
                  "font-mono text-xs tabular-nums",
                  activeCategory === "all" ? "text-white/80" : "text-text-tertiary",
                )}
              >
                {documents.length}
              </span>
            </button>

            {ORDERED_TOP_LEVEL_DOMAINS.map((domain) => {
              const tel = domainTelemetry.get(domain.id) || {
                count: 0,
                missingRequired: 0,
                needsAttention: 0,
              };
              const count = tel.count;
              const isSelected = activeCategory === domain.id;
              const Icon = domain.icon;

              // Hide miscellaneous if completely empty
              if (domain.id === "miscellaneous" && count === 0 && !isSelected) return null;

              return (
                <button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(domain.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer border motion-reduce:transform-none",
                    isSelected
                      ? "bg-brand text-white border-brand shadow-xs"
                      : "bg-surface text-text-secondary border-border-c/80 hover:border-brand/40 hover:text-text-primary",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3 w-3 shrink-0",
                      isSelected ? "text-white" : "text-text-tertiary",
                    )}
                  />
                  <span>{domain.shortLabel}</span>
                  <span
                    className={cn(
                      "font-mono text-xs tabular-nums",
                      isSelected ? "text-white/80" : "text-text-tertiary",
                    )}
                  >
                    {count}
                  </span>

                  {/* Attention Indicator on Domain Tabs */}
                  {tel.needsAttention > 0 && (
                    <span
                      title={`${tel.needsAttention} document unverified or needs review`}
                      className={cn(
                        "flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full",
                        isSelected
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-brand/10 text-brand border border-brand/20",
                      )}
                    >
                      <HelpCircle className="h-2.5 w-2.5" />
                      <span className="sr-only">needs attention:</span>
                      <span>{tel.needsAttention}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2.5 Upload Pipeline & Queue Activity Monitor */}
      <div id="upload-activity-monitor">
        <UploadActivityMonitor
          queue={uploadQueue}
          onOpenUploadModal={() => setIsUploadOpen(true)}
        />
      </div>

      {/* 3. Primary Document Canvas */}
      {documents.length === 0 ? (
        /* Empty State A: Entirely Empty Repository */
        <div className="rounded-2xl border border-dashed border-border-c bg-surface/70 p-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20 shadow-2xs">
            <UploadCloud className="h-6 w-6" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-base font-bold text-text-primary tracking-tight">
              No documents in repository yet
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Upload your company's incorporation filings, statutory compliance documents, and
              commercial agreements to establish your documentary evidence vault.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="rounded-xl bg-brand hover:bg-brand/90 text-white text-xs h-9 px-4 font-semibold shadow-xs cursor-pointer gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Upload Your First Document</span>
          </Button>
        </div>
      ) : filteredDocuments.length === 0 && searchQuery ? (
        /* Empty State B: Search Query returned zero matches */
        <div className="rounded-2xl border border-dashed border-border-c bg-surface/70 p-10 text-center space-y-3">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-surface-alt text-text-tertiary border border-border-c">
            <Search className="h-5 w-5" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h2 className="text-sm font-bold text-text-primary">
              No documents matching &ldquo;{searchQuery}&rdquo;
            </h2>
            <p className="text-xs text-text-secondary">
              Try searching by a different filename, document type, or clear the search query to
              restore the repository view.
            </p>
          </div>
          <div className="pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleSearchChange("")}
              className="text-xs h-8 rounded-xl border-border-c cursor-pointer"
            >
              Clear Search Query
            </Button>
          </div>
        </div>
      ) : (
        /* Primary Presentation Canvas by View Mode */
        <div>
          {/* Mode 1: Grouped View (Section 8: "All" Overview vs. Section 9/10: Domain-Focused Collapsible View) */}
          {activeView === "grouped" && (
            <div>
              {/* SUB-VIEW 1A: SECTION 8 — "ALL" COMPACT REPOSITORY OVERVIEW (When category === 'all' and no active search) */}
              {activeCategory === "all" && !searchQuery.trim() ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border-c pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-text-primary tracking-tight">
                        Repository Structure Overview
                      </h2>
                      <p className="text-xs text-text-secondary">
                        Comprehensive evidence distribution across 5 corporate domains. Select any
                        section to inspect documentary files.
                      </p>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-text-secondary bg-surface-alt px-2.5 py-1 rounded-lg border border-border-c/60">
                      {documents.length} Total {documents.length === 1 ? "Document" : "Documents"}
                    </span>
                  </div>

                  {/* High-Density Overview Domain Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {overviewStructure.map((row) => {
                      const DomainIcon = row.domain.icon;
                      return (
                        <div
                          key={row.domain.id}
                          className="rounded-2xl border border-border-c/90 bg-surface p-5 shadow-2xs hover:border-brand/40 transition-colors flex flex-col justify-between space-y-4"
                        >
                          <div>
                            {/* Domain Header */}
                            <div className="flex items-start justify-between gap-3 border-b border-border-c/60 pb-3">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20 text-brand">
                                  <DomainIcon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <button
                                    type="button"
                                    onClick={() => handleCategoryChange(row.domain.id)}
                                    className="text-sm font-bold text-text-primary hover:text-brand text-left cursor-pointer truncate flex items-center gap-1.5"
                                  >
                                    <span>{row.domain.label}</span>
                                    <ArrowRight className="h-3 w-3 opacity-60" />
                                  </button>
                                  <p className="text-xs text-text-tertiary line-clamp-1">
                                    {row.domain.description}
                                  </p>
                                </div>
                              </div>

                              <span className="text-xs font-mono tabular-nums font-semibold text-text-primary bg-surface-alt px-2 py-0.5 rounded-md border border-border-c/60 shrink-0">
                                {row.totalDocuments} {row.totalDocuments === 1 ? "file" : "files"}
                              </span>
                            </div>

                            {/* Subcategories Breakdown Table */}
                            <div className="pt-3 space-y-1.5">
                              {row.subcategories.map((sub) => {
                                const needsAttention = sub.needsAttentionCount > 0;
                                return (
                                  <button
                                    key={sub.category.id}
                                    type="button"
                                    onClick={() =>
                                      handleCategoryChange(row.domain.id, sub.category.id)
                                    }
                                    className="w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-surface-alt transition-colors text-left cursor-pointer group"
                                  >
                                    <span className="text-text-secondary group-hover:text-text-primary font-medium truncate">
                                      {sub.category.label}
                                    </span>
                                    <div className="flex items-center gap-2 shrink-0">
                                      {needsAttention && (
                                        <span
                                          title={`${sub.needsAttentionCount} document needs verification`}
                                          className="flex items-center gap-1 text-xs text-brand font-medium bg-brand/10 px-2 py-0.5 rounded-full border border-brand/20"
                                        >
                                          <HelpCircle className="h-2.5 w-2.5" />
                                          <span>Needs review</span>
                                        </span>
                                      )}
                                      <span className="font-mono text-text-tertiary tabular-nums">
                                        {sub.documentCount}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Action Footer */}
                          <div className="pt-2 border-t border-border-c/50 flex items-center justify-between">
                            <span className="text-xs text-text-tertiary">
                              {row.totalDocuments > 0
                                ? "Vault active & indexed"
                                : "No documents uploaded"}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCategoryChange(row.domain.id)}
                              className="text-xs h-7 gap-1 text-brand hover:text-brand hover:bg-brand/10 cursor-pointer"
                            >
                              <span>Explore Domain</span>
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* SUB-VIEW 1B: SECTION 9 & 10 — SELECTED DOMAIN OR SEARCH-FILTERED ACCORDION VIEW */
                <div className="space-y-8">
                  {/* When focused on a specific domain, show Domain Focus Header */}
                  {activeCategory !== "all" && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-c pb-4">
                      <div>
                        <h2 className="text-base font-bold text-text-primary tracking-tight">
                          {ORDERED_TOP_LEVEL_DOMAINS.find((d) => d.id === activeCategory)
                            ?.label || "Domain Repository"}
                        </h2>
                        <p className="text-xs text-text-secondary hidden sm:block">
                          {
                            ORDERED_TOP_LEVEL_DOMAINS.find((d) => d.id === activeCategory)
                              ?.description
                          }
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {hierarchicalSections[0]?.subcategories.length > 1 && (
                          <div className="flex items-center gap-1 text-xs mr-1">
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleAllSubcategories(
                                  hierarchicalSections[0].subcategories,
                                  true,
                                )
                              }
                              className="text-xs text-text-tertiary hover:text-brand font-medium px-2 py-0.5 rounded-md hover:bg-surface-alt transition-colors cursor-pointer"
                            >
                              Expand all
                            </button>
                            <span className="text-border-c/80" aria-hidden="true">
                              •
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleAllSubcategories(
                                  hierarchicalSections[0].subcategories,
                                  false,
                                )
                              }
                              className="text-xs text-text-tertiary hover:text-brand font-medium px-2 py-0.5 rounded-md hover:bg-surface-alt transition-colors cursor-pointer"
                            >
                              Collapse all
                            </button>
                          </div>
                        )}
                        <span className="text-xs font-mono tabular-nums text-text-secondary bg-surface-alt px-2.5 py-1 rounded-lg border border-border-c/60">
                          {filteredDocuments.length}{" "}
                          {filteredDocuments.length === 1 ? "document" : "documents"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Search query notice across All */}
                  {activeCategory === "all" && searchQuery.trim() && (
                    <div className="flex items-center justify-between text-xs text-text-secondary border-b border-border-c pb-2">
                      <p>
                        Showing search results for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                        across all repository domains:
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSearchChange("")}
                        className="text-brand hover:underline font-medium cursor-pointer"
                      >
                        Reset search
                      </button>
                    </div>
                  )}

                  {/* Render Domain Sections */}
                  {hierarchicalSections.map(({ domain, subcategories, totalDocuments }) => {
                    const DomainIcon = domain.icon;
                    return (
                      <section key={domain.id} className="space-y-4">
                        {/* Domain Title (Shown when searching across All) */}
                        {activeCategory === "all" && (
                          <div className="flex items-center gap-2.5 border-b border-border-c/70 pb-2">
                            <DomainIcon className="h-4 w-4 text-brand" />
                            <h3 className="text-sm font-bold text-text-primary">{domain.label}</h3>
                            <span className="text-xs font-mono tabular-nums text-text-tertiary">
                              ({totalDocuments} {totalDocuments === 1 ? "match" : "matches"})
                            </span>
                          </div>
                        )}

                        {/* Collapsible Subcategory Accordions (Section 10) */}
                        <div className="space-y-3">
                          {subcategories.map(
                            ({
                              category,
                              documents: subDocs,
                              missingRequiredCount,
                              needsAttentionCount,
                            }) => {
                              const CategoryIcon = category.icon;
                              const isExpanded = isSubcategoryExpanded(
                                category.id,
                                subcategories,
                                totalDocuments,
                              );
                              const sectionRegionId = `sub-content-${category.id}`;

                              return (
                                <div
                                  key={category.id}
                                  className="rounded-2xl border border-border-c/80 bg-surface/90 shadow-2xs overflow-hidden transition-all duration-200"
                                >
                                  {/* Accessible Subcategory Accordion Header Button (Section 10 & 12B) */}
                                  <button
                                    type="button"
                                    ref={(el) => {
                                      if (el) headerButtonRefs.current.set(category.id, el);
                                      else headerButtonRefs.current.delete(category.id);
                                    }}
                                    id={`sub-header-${category.id}`}
                                    aria-expanded={isExpanded}
                                    aria-controls={sectionRegionId}
                                    onClick={() => toggleSubcategory(category.id, isExpanded)}
                                    className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer hover:bg-surface-alt/70 active:bg-surface-alt transition-colors select-none"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className="text-text-tertiary">
                                        <ChevronDown
                                          className={cn(
                                            "h-4 w-4 transition-transform duration-250 ease-out motion-reduce:transition-none",
                                            !isExpanded && "-rotate-90",
                                          )}
                                        />
                                      </div>
                                      <CategoryIcon className="h-4 w-4 text-brand shrink-0" />
                                      <span className="text-xs font-bold text-text-primary truncate">
                                        {category.label}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2.5 shrink-0">
                                      {needsAttentionCount > 0 && (
                                        <span
                                          title={`${needsAttentionCount} document needs verification review`}
                                          className="flex items-center gap-1 text-xs font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full border border-brand/20"
                                        >
                                          <HelpCircle className="h-2.5 w-2.5" />
                                          <span>Needs review</span>
                                        </span>
                                      )}

                                      <span className="font-mono text-xs text-text-tertiary tabular-nums bg-surface-alt px-2 py-0.5 rounded border border-border-c/60">
                                        {subDocs.length} {subDocs.length === 1 ? "file" : "files"}
                                      </span>
                                    </div>
                                  </button>

                                  {/* Accordion Content Panel (Rendered only when expanded) */}
                                  <AnimatePresence initial={false}>
                                    {isExpanded && (
                                      <motion.div
                                        key={`sub-motion-${category.id}`}
                                        id={sectionRegionId}
                                        role="region"
                                        aria-labelledby={`sub-header-${category.id}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden border-t border-border-c/50 bg-surface"
                                      >
                                        <div className="p-4 pt-1">
                                          {subDocs.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2">
                                          {subDocs.map((doc) => (
                                            <DocumentCard
                                              key={doc.id}
                                              document={doc}
                                              isDownloading={downloadingDocId === doc.id}
                                              onPreview={(d) => setPreviewDoc(d)}
                                              onDownload={handleDownload}
                                              onReplace={(d) => setDocToReplace(d)}
                                              onDelete={(d) => setDocToDelete(d)}
                                              onAddToPackage={handleAddToPackage}
                                            />
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="py-6 px-4 rounded-xl border border-dashed border-border-c/90 bg-surface-alt/30 text-center space-y-2.5 my-1">
                                          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border-c/80 text-brand shadow-2xs">
                                            <CategoryIcon className="h-4 w-4" />
                                          </div>
                                          <div className="space-y-0.5">
                                            <p className="text-xs font-semibold text-text-primary">
                                              No {category.label.toLowerCase()} uploaded yet
                                            </p>
                                            <p className="text-xs text-text-tertiary">
                                              Upload statutory files to complete evidence coverage for this section.
                                            </p>
                                          </div>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsUploadOpen(true)}
                                            className="h-7 text-xs px-3 rounded-lg border-border-c hover:border-brand/40 text-brand hover:bg-brand/5 cursor-pointer gap-1.5"
                                          >
                                            <UploadCloud className="h-3.5 w-3.5" />
                                            <span>Upload {category.shortLabel || category.label}</span>
                                          </Button>
                                        </div>
                                      )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Table View */}
          {activeView === "table" && (
            <DocumentRegistrySection
              documents={filteredDocuments}
              onPreviewDocument={(d) => setPreviewDoc(d)}
            />
          )}

          {/* Mode 3: Packages View */}
          {activeView === "packages" && <PackagesSection documents={documents} />}
        </div>
      )}

      {/* 4. Unified Upload Modal (Centralized Dropzone & Processing) */}
      <UploadDocumentModal
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUpload={handleUploadFile}
        activeUploads={uploadQueue.items}
        onCancelUpload={uploadQueue.cancel}
      />

      {/* 5. Document Preview Modal */}
      <DocumentPreviewModal
        document={previewDoc}
        open={Boolean(previewDoc)}
        onOpenChange={(open) => !open && setPreviewDoc(null)}
        onReplaceDocument={(doc) => {
          setPreviewDoc(null);
          setDocToReplace(doc);
        }}
      />

      {/* 6. Document Replace Dialog */}
      <ReplaceDocumentDialog
        targetDocument={docToReplace}
        open={Boolean(docToReplace)}
        onOpenChange={(open) => !open && setDocToReplace(null)}
        onConfirmReplace={handleReplaceSubmit}
        isReplacing={isReplacing}
      />

      {/* 7. Create/Add to Package Dialog */}
      <CreatePackageDialog
        documents={documents}
        initialSelectedDocIds={targetDocForPackage ? [targetDocForPackage.id] : []}
        open={isPackageDialogOpen}
        onOpenChange={setIsPackageDialogOpen}
      />

      {/* 8. Archive Confirmation Dialog */}
      <AlertDialog
        open={Boolean(docToDelete)}
        onOpenChange={(open) => !open && setDocToDelete(null)}
      >
        <AlertDialogContent className="rounded-2xl border-border-c bg-surface">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-text-primary">
              Archive Document from Vault
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-text-secondary leading-relaxed">
              Are you sure you want to archive &ldquo;{docToDelete?.original_name}&rdquo;? This will
              unlink the file from active vault indexing and packages while maintaining an institutional
              audit log of corporate records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs rounded-xl border-border-c cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="text-xs rounded-xl bg-destructive hover:bg-destructive/90 text-white cursor-pointer font-semibold"
            >
              Archive Document
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
