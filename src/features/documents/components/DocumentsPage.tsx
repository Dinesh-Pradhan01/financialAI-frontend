import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  FolderLock,
  Loader2,
  AlertCircle,
  Search,
  X,
  FileText,
  Download,
  Upload,
  Trash2,
  FileSpreadsheet,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Package as PackageIcon,
  LayoutGrid,
  CheckSquare,
} from "lucide-react";
import { toast } from "sonner";
import {
  useDocuments,
  useReplaceDocument,
  useDeleteDocument,
  usePackages,
  downloadDocument,
} from "../hooks/useDocuments";
import { formatFileSize, formatDocumentDate } from "../lib/documentPresentation";
import {
  DOCUMENT_CATEGORIES,
  REQUIRED_DOCUMENT_COUNT,
  getTaxonomyDocument,
  isUnmappedDocumentType,
} from "../lib/documentTaxonomy";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { DocumentInfoPopover } from "./DocumentInfoPopover";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { ReplaceDocumentDialog } from "./ReplaceDocumentDialog";
import { DocumentCategorySummaryCard } from "./DocumentCategorySummaryCard";
import { DocumentsWhyWeNeedGuide } from "./DocumentsWhyWeNeedGuide";
import { CategoryDocumentsPopup } from "./CategoryDocumentsPopup";
import { OtherDocumentsSection } from "./OtherDocumentsSection";
import { PackagesSection } from "./PackagesSection";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/shared/components/ui/table";
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
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { cn } from "@/shared/lib/utils";
import type { CompanyDocument } from "@/shared/types/api";

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
  const { data: documents = [], isLoading, isError, error, refetch, isFetching } = useDocuments();
  const { data: packages = [] } = usePackages();

  const replaceMutation = useReplaceDocument();
  const deleteMutation = useDeleteDocument();

  // Navigation Tab State: "categories" | "registry" | "packages" | "all"
  const [activeTab, setActiveTab] = useState<string>("categories");

  // Which category dialog is open. One id rather than a boolean per category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Preview Modal State for Document Registry Table
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);

  // General Documents Table State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);

  const [docToReplace, setDocToReplace] = useState<CompanyDocument | null>(null);
  const [isReplacingDoc, setIsReplacingDoc] = useState(false);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [docToDelete, setDocToDelete] = useState<CompanyDocument | null>(null);

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

  const selectedCategory = useMemo(
    () => DOCUMENT_CATEGORIES.find((category) => category.id === selectedCategoryId) ?? null,
    [selectedCategoryId],
  );

  /** Documents the taxonomy does not name — reviewable outside the checklist. */
  const otherDocuments = useMemo(
    () => documents.filter((doc) => isUnmappedDocumentType(doc.document_type)),
    [documents],
  );

  // ---------------------------------------------------------------------------
  // General Documents Filtering (Includes ALL documents: required + optional + other)
  // ---------------------------------------------------------------------------

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // 1. Search query filter
      const q = searchQuery.toLowerCase().trim();
      const taxonomyDocument = getTaxonomyDocument(doc.document_type);
      const matchesSearch =
        !q ||
        doc.original_name.toLowerCase().includes(q) ||
        doc.document_type.toLowerCase().includes(q) ||
        Boolean(taxonomyDocument?.label.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // 2. Requirement filter
      if (categoryFilter === "all") return true;
      if (categoryFilter === "other") return !taxonomyDocument;
      if (!taxonomyDocument) return false;
      return taxonomyDocument.requirement === categoryFilter;
    });
  }, [documents, searchQuery, categoryFilter]);

  // Select-All status for currently visible filtered documents
  const isAllFilteredSelected = useMemo(() => {
    if (filteredDocuments.length === 0) return false;
    return filteredDocuments.every((doc) => selectedDocIds.includes(doc.id));
  }, [filteredDocuments, selectedDocIds]);

  const isSomeFilteredSelected = useMemo(() => {
    return filteredDocuments.some((doc) => selectedDocIds.includes(doc.id));
  }, [filteredDocuments, selectedDocIds]);

  const toggleSelectAllFiltered = (checked: boolean) => {
    if (checked) {
      const visibleIds = filteredDocuments.map((d) => d.id);
      setSelectedDocIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    } else {
      const visibleIds = new Set(filteredDocuments.map((d) => d.id));
      setSelectedDocIds((prev) => prev.filter((id) => !visibleIds.has(id)));
    }
  };

  const toggleSelectDoc = (docId: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId],
    );
  };

  // ---------------------------------------------------------------------------
  // Table Row Actions & Bulk Download
  // ---------------------------------------------------------------------------

  const handleDownload = async (doc: CompanyDocument) => {
    try {
      setDownloadingDocId(doc.id);
      await downloadDocument(doc.id, doc.original_name);
      toast.success(`Downloaded ${doc.original_name}`);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Download failed"));
    } finally {
      setDownloadingDocId(null);
    }
  };

  const handleBulkDownload = async () => {
    if (selectedDocIds.length === 0 || isBulkDownloading) return;

    const selectedDocs = documents.filter((d) => selectedDocIds.includes(d.id));
    if (selectedDocs.length === 0) return;

    setIsBulkDownloading(true);
    let successCount = 0;

    try {
      for (const doc of selectedDocs) {
        try {
          await downloadDocument(doc.id, doc.original_name);
          successCount++;
          // Stagger downloads by 350ms to prevent browser download throttling
          await new Promise((resolve) => setTimeout(resolve, 350));
        } catch (err) {
          console.error(`Failed to download ${doc.original_name}:`, err);
        }
      }

      toast.success(
        `Downloaded ${successCount} ${successCount === 1 ? "document" : "documents"} successfully.`,
      );
      setSelectedDocIds([]);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Bulk download encountered an issue"));
    } finally {
      setIsBulkDownloading(false);
    }
  };

  const handleConfirmReplace = (file: File) => {
    if (!docToReplace) return;
    const docId = docToReplace.id;
    const formData = new FormData();
    formData.append("file", file);

    setIsReplacingDoc(true);
    replaceMutation.mutate(
      { docId, formData },
      {
        onSuccess: () => {
          toast.success(`Replaced with ${file.name} successfully.`);
          setDocToReplace(null);
          setIsReplacingDoc(false);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Failed to replace document"));
          setIsReplacingDoc(false);
        },
      },
    );
  };

  const handleConfirmDelete = () => {
    if (!docToDelete) return;
    setDeletingDocId(docToDelete.id);
    deleteMutation.mutate(docToDelete.id, {
      onSuccess: () => {
        toast.success("Document deleted successfully.");
        setSelectedDocIds((prev) => prev.filter((id) => id !== docToDelete.id));
        setDocToDelete(null);
        setDeletingDocId(null);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "Failed to delete document"));
        setDeletingDocId(null);
      },
    });
  };

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
              Upload, verify, and manage statutory filings, compliance certificates, and audit records.
            </p>
          </div>
        </div>

        {/* Glanceable Executive Compliance Pill */}
        <div
          className={cn(
            "flex items-center gap-3 border rounded-2xl p-3 sm:px-4 shadow-xs self-start md:self-auto transition-all",
            compliancePercentage === 100
              ? "bg-gradient-to-br from-emerald-500/[0.06] via-surface to-surface border-emerald-500/30"
              : "bg-surface border-border/80",
          )}
        >
          <div className="space-y-1 min-w-[140px]">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-text-secondary">Statutory Compliance</span>
              <span
                className={cn(
                  "font-bold font-num tabular-nums",
                  compliancePercentage === 100 ? "text-emerald-600 dark:text-emerald-400" : "text-brand",
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
              <span className="font-semibold text-text-primary font-num tabular-nums">{requiredCompletedTotal}</span> of{" "}
              <span className="font-semibold font-num tabular-nums">{REQUIRED_DOCUMENT_COUNT}</span> required on record
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

      {/* 2. Navigation Tabs (Checklist, Registry, Packages, All) */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
            <TabsList className="bg-surface-alt/70 p-1 border border-border/80 rounded-xl h-auto">
              <TabsTrigger
                value="categories"
                className="gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-surface data-[state=active]:text-brand data-[state=active]:shadow-xs"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Categories & Checklist</span>
                <span className="ml-0.5 rounded-full bg-brand/10 text-brand px-1.5 py-0.2 text-[10px] font-mono font-bold tabular-nums">
                  {requiredCompletedTotal}/{REQUIRED_DOCUMENT_COUNT}
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="registry"
                className="gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-surface data-[state=active]:text-brand data-[state=active]:shadow-xs"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Document Registry</span>
                <span className="ml-0.5 rounded-full bg-surface-alt border border-border/80 text-text-secondary px-1.5 py-0.2 text-[10px] font-mono tabular-nums">
                  {documents.length}
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="packages"
                className="gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-surface data-[state=active]:text-brand data-[state=active]:shadow-xs"
              >
                <PackageIcon className="h-3.5 w-3.5" />
                <span>Diligence Packages</span>
                {packages.length > 0 && (
                  <span className="ml-0.5 rounded-full bg-surface-alt border border-border/80 text-text-secondary px-1.5 py-0.2 text-[10px] font-mono tabular-nums">
                    {packages.length}
                  </span>
                )}
              </TabsTrigger>

              <TabsTrigger
                value="all"
                className="gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg data-[state=active]:bg-surface data-[state=active]:text-brand data-[state=active]:shadow-xs"
              >
                <span>All Sections</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Categories & Checklist */}
          <TabsContent value="categories" className="space-y-6 mt-0">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-text-primary tracking-tight">Document Categories</h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Open a category to view and upload its statutory requirements.
                  </p>
                </div>
                {compliancePercentage === 100 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/25">
                    <CheckCircle2 className="h-3.5 w-3.5" /> All Statutory Requirements Fulfilled
                  </span>
                )}
              </div>

              {compliancePercentage === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/[0.08] via-surface to-surface p-4 flex items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-primary tracking-tight">
                        Statutory Vault Audit-Ready
                      </h3>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                        All {REQUIRED_DOCUMENT_COUNT} required corporate filings are verified on record. Your entity is fully primed for underwriting and diligence reviews.
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/25 font-mono">
                    100% Verified
                  </span>
                </motion.div>
              )}

              <div className="grid gap-3.5 sm:grid-cols-2">
                {categoryMetrics.map((metric) => (
                  <DocumentCategorySummaryCard
                    key={metric.category.id}
                    label={metric.category.shortLabel}
                    completed={metric.completed}
                    total={metric.total}
                    requiredCompleted={metric.requiredCompleted}
                    requiredTotal={metric.requiredTotal}
                    icon={metric.category.icon}
                    onManage={() => setSelectedCategoryId(metric.category.id)}
                  />
                ))}
              </div>

              {/* Explanatory Guide */}
              <DocumentsWhyWeNeedGuide />

              {/* Other Documents Escape Hatch */}
              <OtherDocumentsSection documents={otherDocuments} />
            </motion.div>
          </TabsContent>

          {/* TAB 2: Document Registry Table */}
          <TabsContent value="registry" className="space-y-6 mt-0">
            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-text-primary flex items-center gap-2 tracking-tight">
                    <FileSpreadsheet className="h-4.5 w-4.5 text-brand" />
                    Document Registry
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Search, preview, download, and manage all corporate records on file.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Bulk Download Action Bar when items selected */}
                  <AnimatePresence>
                    {selectedDocIds.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-1.5 bg-brand/10 border border-brand/20 rounded-lg px-2.5 py-1 text-xs"
                      >
                        <span className="font-semibold text-brand text-[11px] tabular-nums">
                          {selectedDocIds.length} selected
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isBulkDownloading}
                          onClick={handleBulkDownload}
                          className="h-6 px-2 text-[11px] font-semibold border-brand/30 bg-surface text-brand hover:bg-brand hover:text-white gap-1 cursor-pointer"
                        >
                          {isBulkDownloading ? (
                            <Loader2 className="h-3 w-3 animate-spin text-brand" />
                          ) : (
                            <Download className="h-3 w-3" />
                          )}
                          <span>Download</span>
                        </Button>
                        <button
                          type="button"
                          onClick={() => setSelectedDocIds([])}
                          className="text-text-tertiary hover:text-text-primary p-0.5 rounded cursor-pointer"
                          title="Clear selection"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-52">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-tertiary" />
                    <Input
                      type="text"
                      placeholder="Search documents…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 pl-8 pr-8 text-xs bg-surface border-border-c"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-2.5 text-text-tertiary hover:text-text-primary cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Requirement Filter Pills */}
                  <div className="flex items-center gap-1 bg-surface-alt/50 p-0.5 rounded-lg border border-border/70 text-xs">
                    {(["all", "required", "optional", "other"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={cn(
                          "px-2.5 py-1 rounded-md capitalize font-medium text-[11px] transition-colors cursor-pointer",
                          categoryFilter === cat
                            ? "bg-surface text-text-primary shadow-2xs font-semibold"
                            : "text-text-secondary hover:text-text-primary",
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table Container */}
              {documents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-surface/50">
                  <FileText className="mx-auto h-8 w-8 text-text-tertiary mb-2" />
                  <p className="text-sm font-medium text-text-secondary">No documents uploaded yet</p>
                  <p className="text-xs text-text-tertiary mt-1">
                    Open a category in the Checklist tab to upload your corporate documents.
                  </p>
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-surface/50 space-y-2">
                  <FileText className="mx-auto h-8 w-8 text-text-tertiary mb-1" />
                  <p className="text-sm font-medium text-text-secondary">
                    No documents match your filter
                  </p>
                  <p className="text-xs text-text-tertiary">
                    Try adjusting your search query or switching category filters.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                    }}
                    className="mt-2 text-xs cursor-pointer"
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-surface-alt/40 hover:bg-surface-alt/40">
                          {/* Select All Checkbox */}
                          <TableHead className="w-10 py-3 pl-4 pr-2">
                            <Checkbox
                              checked={
                                isAllFilteredSelected
                                  ? true
                                  : isSomeFilteredSelected
                                    ? "indeterminate"
                                    : false
                              }
                              onCheckedChange={(checked) => toggleSelectAllFiltered(Boolean(checked))}
                              aria-label="Select all visible documents"
                            />
                          </TableHead>
                          <TableHead className="font-semibold text-xs py-3 text-text-secondary min-w-[200px]">Name</TableHead>
                          <TableHead className="font-semibold text-xs py-3 text-text-secondary min-w-[140px]">Type</TableHead>
                          <TableHead className="font-semibold text-xs py-3 text-text-secondary min-w-[80px]">Size</TableHead>
                          <TableHead className="font-semibold text-xs py-3 text-text-secondary min-w-[90px]">Quality</TableHead>
                          <TableHead className="font-semibold text-xs py-3 text-text-secondary min-w-[110px]">Uploaded</TableHead>
                          <TableHead className="font-semibold text-xs py-3 text-right pr-6 text-text-secondary min-w-[120px]">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => {
                        const isSelected = selectedDocIds.includes(doc.id);
                        const isRowDownloading = downloadingDocId === doc.id;
                        const isRowDeleting = deletingDocId === doc.id;
                        const taxonomyDocument = getTaxonomyDocument(doc.document_type);

                        return (
                          <TableRow
                            key={doc.id}
                            className={cn(
                              "transition-colors",
                              isSelected ? "bg-brand/5 hover:bg-brand/10" : "hover:bg-surface-alt/30",
                            )}
                          >
                            {/* Row Checkbox */}
                            <TableCell className="py-3 pl-4 pr-2">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleSelectDoc(doc.id)}
                                aria-label={`Select ${doc.original_name}`}
                              />
                            </TableCell>

                            {/* Name */}
                            <TableCell className="font-medium text-sm py-3">
                              <div className="flex items-center gap-2.5 max-w-[260px]">
                                <FileText className="h-4 w-4 shrink-0 text-brand" />
                                <span className="truncate tracking-tight" title={doc.original_name}>
                                  {doc.original_name}
                                </span>
                              </div>
                            </TableCell>

                            {/* Document Type */}
                            <TableCell className="text-xs text-text-secondary py-3">
                              <span
                                title={doc.document_type}
                                className={cn(
                                  "inline-block max-w-[220px] truncate px-2 py-0.5 rounded-md bg-surface-alt/60 border border-border/60 text-[11px] align-middle",
                                  !taxonomyDocument && "capitalize",
                                )}
                              >
                                {taxonomyDocument?.label ?? doc.document_type.replace(/[-_]/g, " ")}
                              </span>
                            </TableCell>

                            {/* File Size */}
                            <TableCell className="text-xs text-text-secondary font-mono tabular-nums py-3">
                              {formatFileSize(doc.file_size_bytes)}
                            </TableCell>

                            {/* Quality Score */}
                            <TableCell className="py-3">
                              <DocumentQualityBadge document={doc} />
                            </TableCell>

                            {/* Uploaded Date & Metadata Popover */}
                            <TableCell className="text-xs text-text-secondary py-3">
                              <div className="flex items-center gap-1.5 font-mono text-[11px] tabular-nums">
                                <span>{formatDocumentDate(doc.created_at)}</span>
                                <DocumentInfoPopover
                                  taxonomyDocument={taxonomyDocument}
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
                            </TableCell>

                            {/* Actions: Preview, Download, Replace, Delete */}
                            <TableCell className="text-right pr-6 py-3">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* 1. Preview Button */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Preview document"
                                  aria-label={`Preview ${doc.original_name}`}
                                  disabled={isRowDownloading || isRowDeleting}
                                  onClick={() => setPreviewDoc(doc)}
                                  className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>

                                {/* 2. Download Button */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Download document"
                                  aria-label={`Download ${doc.original_name}`}
                                  disabled={isRowDownloading || isRowDeleting}
                                  onClick={() => handleDownload(doc)}
                                  className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                                >
                                  {isRowDownloading ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-brand" />
                                  ) : (
                                    <Download className="h-4 w-4" />
                                  )}
                                </Button>

                                {/* 3. Replace Button */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Replace document"
                                  aria-label={`Replace ${doc.original_name}`}
                                  disabled={isRowDownloading || isRowDeleting}
                                  onClick={() => setDocToReplace(doc)}
                                  className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                                >
                                  <Upload className="h-4 w-4" />
                                </Button>

                                {/* 4. Delete Button */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete document"
                                  aria-label={`Delete ${doc.original_name}`}
                                  disabled={isRowDownloading || isRowDeleting}
                                  onClick={() => setDocToDelete(doc)}
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                                >
                                  {isRowDeleting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  </div>
                </div>
              )}

              {/* Other Documents Integration */}
              <OtherDocumentsSection documents={otherDocuments} />
            </motion.section>
          </TabsContent>

          {/* TAB 3: Diligence Packages */}
          <TabsContent value="packages" className="space-y-6 mt-0">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <PackagesSection documents={documents} />
            </motion.div>
          </TabsContent>

          {/* TAB 4: All Sections View */}
          <TabsContent value="all" className="space-y-9 mt-0">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-9"
            >
              {/* Section 1: Categories */}
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-bold text-text-primary">Document Categories</h2>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Open a category to view and upload its statutory requirements.
                    </p>
                  </div>
                {compliancePercentage === 100 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold border border-success/20">
                    <CheckCircle2 className="h-3.5 w-3.5" /> All Statutory Requirements Fulfilled
                  </span>
                )}
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                {categoryMetrics.map((metric) => (
                  <DocumentCategorySummaryCard
                    key={metric.category.id}
                    label={metric.category.shortLabel}
                    completed={metric.completed}
                    total={metric.total}
                    requiredCompleted={metric.requiredCompleted}
                    requiredTotal={metric.requiredTotal}
                    icon={metric.category.icon}
                    onManage={() => setSelectedCategoryId(metric.category.id)}
                  />
                ))}
              </div>

              <DocumentsWhyWeNeedGuide />
            </section>

            {/* Section 2: Registry */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <FileSpreadsheet className="h-4.5 w-4.5 text-brand" />
                    Document Registry
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Search, preview, download, and manage all corporate records on file.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {selectedDocIds.length > 0 && (
                    <div className="flex items-center gap-1.5 bg-brand/10 border border-brand/20 rounded-lg px-2.5 py-1 text-xs animate-in fade-in-50">
                      <span className="font-semibold text-brand text-[11px]">
                        {selectedDocIds.length} selected
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isBulkDownloading}
                        onClick={handleBulkDownload}
                        className="h-6 px-2 text-[11px] font-semibold border-brand/30 bg-surface text-brand hover:bg-brand hover:text-white gap-1 cursor-pointer"
                      >
                        {isBulkDownloading ? (
                          <Loader2 className="h-3 w-3 animate-spin text-brand" />
                        ) : (
                          <Download className="h-3 w-3" />
                        )}
                        <span>Download</span>
                      </Button>
                      <button
                        type="button"
                        onClick={() => setSelectedDocIds([])}
                        className="text-text-tertiary hover:text-text-primary p-0.5 rounded cursor-pointer"
                        title="Clear selection"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  <div className="relative w-full sm:w-52">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-tertiary" />
                    <Input
                      type="text"
                      placeholder="Search documents…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 pl-8 pr-8 text-xs bg-surface border-border-c"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-2.5 text-text-tertiary hover:text-text-primary cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1 bg-surface-alt/50 p-0.5 rounded-lg border border-border/70 text-xs">
                    {(["all", "required", "optional", "other"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={cn(
                          "px-2.5 py-1 rounded-md capitalize font-medium text-[11px] transition-colors cursor-pointer",
                          categoryFilter === cat
                            ? "bg-surface text-text-primary shadow-2xs font-semibold"
                            : "text-text-secondary hover:text-text-primary",
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table Container */}
              {documents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-surface/50">
                  <FileText className="mx-auto h-8 w-8 text-text-tertiary mb-2" />
                  <p className="text-sm font-medium text-text-secondary">No documents uploaded yet</p>
                  <p className="text-xs text-text-tertiary mt-1">
                    Open a category above to upload its documents.
                  </p>
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-surface/50 space-y-2">
                  <FileText className="mx-auto h-8 w-8 text-text-tertiary mb-1" />
                  <p className="text-sm font-medium text-text-secondary">
                    No documents match your filter
                  </p>
                  <p className="text-xs text-text-tertiary">
                    Try adjusting your search query or switching category filters.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                    }}
                    className="mt-2 text-xs cursor-pointer"
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-xs">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-surface-alt/40 hover:bg-surface-alt/40">
                        <TableHead className="w-10 py-3 pl-4 pr-2">
                          <Checkbox
                            checked={
                              isAllFilteredSelected
                                ? true
                                : isSomeFilteredSelected
                                  ? "indeterminate"
                                  : false
                            }
                            onCheckedChange={(checked) => toggleSelectAllFiltered(Boolean(checked))}
                            aria-label="Select all visible documents"
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-xs py-3">Name</TableHead>
                        <TableHead className="font-semibold text-xs py-3">Type</TableHead>
                        <TableHead className="font-semibold text-xs py-3">Size</TableHead>
                        <TableHead className="font-semibold text-xs py-3">Quality</TableHead>
                        <TableHead className="font-semibold text-xs py-3">Uploaded</TableHead>
                        <TableHead className="font-semibold text-xs py-3 text-right pr-6">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => {
                        const isSelected = selectedDocIds.includes(doc.id);
                        const isRowDownloading = downloadingDocId === doc.id;
                        const isRowDeleting = deletingDocId === doc.id;
                        const taxonomyDocument = getTaxonomyDocument(doc.document_type);

                        return (
                          <TableRow
                            key={doc.id}
                            className={cn(
                              "transition-colors",
                              isSelected ? "bg-brand/5 hover:bg-brand/10" : "hover:bg-surface-alt/30",
                            )}
                          >
                            <TableCell className="py-3 pl-4 pr-2">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleSelectDoc(doc.id)}
                                aria-label={`Select ${doc.original_name}`}
                              />
                            </TableCell>

                            <TableCell className="font-medium text-sm py-3">
                              <div className="flex items-center gap-2.5 max-w-[260px]">
                                <FileText className="h-4 w-4 shrink-0 text-brand" />
                                <span className="truncate" title={doc.original_name}>
                                  {doc.original_name}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell className="text-xs text-text-secondary py-3">
                              <span
                                title={doc.document_type}
                                className={cn(
                                  "inline-block max-w-[220px] truncate px-2 py-0.5 rounded-md bg-surface-alt/60 border border-border/60 text-[11px] align-middle",
                                  !taxonomyDocument && "capitalize",
                                )}
                              >
                                {taxonomyDocument?.label ?? doc.document_type.replace(/[-_]/g, " ")}
                              </span>
                            </TableCell>

                            <TableCell className="text-xs text-text-secondary font-mono py-3">
                              {formatFileSize(doc.file_size_bytes)}
                            </TableCell>

                            <TableCell className="py-3">
                              <DocumentQualityBadge document={doc} />
                            </TableCell>

                            <TableCell className="text-xs text-text-secondary py-3">
                              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                                <span>{formatDocumentDate(doc.created_at)}</span>
                                <DocumentInfoPopover
                                  taxonomyDocument={taxonomyDocument}
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
                            </TableCell>

                            <TableCell className="text-right pr-6 py-3">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Preview document"
                                  aria-label={`Preview ${doc.original_name}`}
                                  disabled={isRowDownloading || isRowDeleting}
                                  onClick={() => setPreviewDoc(doc)}
                                  className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Download document"
                                  aria-label={`Download ${doc.original_name}`}
                                  disabled={isRowDownloading || isRowDeleting}
                                  onClick={() => handleDownload(doc)}
                                  className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                                >
                                  {isRowDownloading ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-brand" />
                                  ) : (
                                    <Download className="h-4 w-4" />
                                  )}
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Replace document"
                                  aria-label={`Replace ${doc.original_name}`}
                                  disabled={isRowDownloading || isRowDeleting}
                                  onClick={() => setDocToReplace(doc)}
                                  className="h-8 w-8 text-text-secondary hover:text-text-primary cursor-pointer"
                                >
                                  <Upload className="h-4 w-4" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete document"
                                  aria-label={`Delete ${doc.original_name}`}
                                  disabled={isRowDownloading || isRowDeleting}
                                  onClick={() => setDocToDelete(doc)}
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                                >
                                  {isRowDeleting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </section>

            {/* Section 3: Other Documents */}
            <OtherDocumentsSection documents={otherDocuments} />

            {/* Section 4: Packages */}
            <PackagesSection documents={documents} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Delete Confirmation Alert Dialog for Table Rows */}
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

      {/* Category Documents Popup — one dialog for whichever category is open */}
      <CategoryDocumentsPopup
        open={Boolean(selectedCategory)}
        onOpenChange={(open) => {
          if (!open) setSelectedCategoryId(null);
        }}
        category={selectedCategory}
        documents={documents}
      />

      {/* Document Preview Modal for Registry Table */}
      <DocumentPreviewModal
        open={Boolean(previewDoc)}
        onOpenChange={(openState) => {
          if (!openState) setPreviewDoc(null);
        }}
        document={previewDoc}
      />

      {/* Document Replace Confirmation Modal for Registry Table */}
      <ReplaceDocumentDialog
        open={Boolean(docToReplace)}
        onOpenChange={(open) => {
          if (!open) setDocToReplace(null);
        }}
        targetDocument={docToReplace}
        isReplacing={isReplacingDoc}
        onConfirmReplace={handleConfirmReplace}
      />
    </motion.div>
  );
}

