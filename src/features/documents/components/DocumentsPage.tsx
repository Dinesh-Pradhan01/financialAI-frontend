import React, { useState, useMemo, useRef } from "react";
import { motion, type Variants } from "framer-motion";
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
  CheckSquare,
} from "lucide-react";
import { toast } from "sonner";
import {
  useDocuments,
  useReplaceDocument,
  useDeleteDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import { KNOWN_DOCUMENT_SLOTS } from "../lib/documentGuidance";
import {
  formatFileSize,
  formatDocumentDate,
} from "../lib/documentPresentation";
import {
  ACCEPTED_FILE_FORMATS_STRING,
  validateFile,
} from "../lib/uploadHelpers";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { DocumentInfoPopover } from "./DocumentInfoPopover";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { DocumentCategorySummaryCard } from "./DocumentCategorySummaryCard";
import { DocumentsWhyWeNeedGuide } from "./DocumentsWhyWeNeedGuide";
import { RequiredDocumentsPopup } from "./RequiredDocumentsPopup";
import { RecommendedDocumentsPopup } from "./RecommendedDocumentsPopup";
import { PackagesSection } from "./PackagesSection";
import { HeroUploadDropzone } from "./HeroUploadDropzone";
import { CategorizeUploadDialog } from "./CategorizeUploadDialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Skeleton } from "@/shared/components/ui/skeleton";
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
  const {
    data: documents = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDocuments();

  const replaceMutation = useReplaceDocument();
  const deleteMutation = useDeleteDocument();

  // Staged upload state for hero dropzone & categorization dialog
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [categorizeDialogOpen, setCategorizeDialogOpen] = useState(false);

  // Popup modal states for Required and Recommended categories
  const [requiredPopupOpen, setRequiredPopupOpen] = useState(false);
  const [recommendedPopupOpen, setRecommendedPopupOpen] = useState(false);

  // Preview Modal State for Document Registry Table
  const [previewDoc, setPreviewDoc] = useState<CompanyDocument | null>(null);

  // General Documents Table State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);

  const [replacingDocId, setReplacingDocId] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [docToDelete, setDocToDelete] = useState<CompanyDocument | null>(null);
  const tableReplaceInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------------------------------------
  // Metrics Computation for Required & Recommended Categories
  // ---------------------------------------------------------------------------

  const mandatorySlots = useMemo(
    () => KNOWN_DOCUMENT_SLOTS.filter((s) => s.category === "mandatory"),
    []
  );
  const uploadedMandatoryCount = useMemo(
    () =>
      mandatorySlots.filter((slot) =>
        documents.some((d) => d.document_type === slot.typeKey)
      ).length,
    [mandatorySlots, documents]
  );
  const totalMandatoryCount = mandatorySlots.length;

  const recommendedSlots = useMemo(
    () =>
      KNOWN_DOCUMENT_SLOTS.filter(
        (s) => s.category === "optional" || s.category === "recommended"
      ),
    []
  );
  const uploadedRecommendedCount = useMemo(
    () =>
      recommendedSlots.filter((slot) =>
        documents.some((d) => d.document_type === slot.typeKey)
      ).length,
    [recommendedSlots, documents]
  );
  const totalRecommendedCount = recommendedSlots.length;

  // Pending slots for CategorizeUploadDialog
  const pendingRequiredSlots = useMemo(
    () =>
      mandatorySlots.filter(
        (slot) => !documents.some((d) => d.document_type === slot.typeKey)
      ),
    [mandatorySlots, documents]
  );

  const pendingRecommendedSlots = useMemo(
    () =>
      recommendedSlots.filter(
        (slot) => !documents.some((d) => d.document_type === slot.typeKey)
      ),
    [recommendedSlots, documents]
  );

  // ---------------------------------------------------------------------------
  // General Documents Filtering (Includes ALL documents: required + recommended + custom)
  // ---------------------------------------------------------------------------

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // 1. Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.original_name.toLowerCase().includes(q) ||
        doc.document_type.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // 2. Category filter
      if (categoryFilter === "all") return true;
      if (categoryFilter === "required") {
        return (
          doc.document_category === "mandatory" ||
          KNOWN_DOCUMENT_SLOTS.some(
            (s) => s.typeKey === doc.document_type && s.category === "mandatory"
          )
        );
      }
      if (categoryFilter === "recommended") {
        return (
          doc.document_category === "optional" ||
          doc.document_category === "recommended" ||
          KNOWN_DOCUMENT_SLOTS.some(
            (s) =>
              s.typeKey === doc.document_type &&
              (s.category === "optional" || s.category === "recommended")
          )
        );
      }
      if (categoryFilter === "custom") {
        return (
          doc.document_category === "custom" ||
          !KNOWN_DOCUMENT_SLOTS.some((s) => s.typeKey === doc.document_type)
        );
      }
      return true;
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
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
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
        `Downloaded ${successCount} ${
          successCount === 1 ? "document" : "documents"
        } successfully.`
      );
      setSelectedDocIds([]);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Bulk download encountered an issue"));
    } finally {
      setIsBulkDownloading(false);
    }
  };

  const handleTableReplaceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (replacingDocId && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = "";

      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(validation.error || "Invalid file. Only PDF files are supported.");
        setReplacingDocId(null);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      setDeletingDocId(replacingDocId); // reuse spinner state
      replaceMutation.mutate(
        { docId: replacingDocId, formData },
        {
          onSuccess: () => {
            toast.success(`Replaced ${file.name} successfully.`);
            setReplacingDocId(null);
            setDeletingDocId(null);
          },
          onError: (err) => {
            toast.error(getApiErrorMessage(err, "Failed to replace document"));
            setReplacingDocId(null);
            setDeletingDocId(null);
          },
        }
      );
    }
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
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 px-8 text-center">
        <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-8">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
          <h2 className="text-lg font-bold text-text-primary">
            Failed to load documents
          </h2>
          <p className="text-xs text-text-secondary">
            {getApiErrorMessage(error, "An unexpected network error occurred.")}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-2"
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
      className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-9"
    >
      {/* 1. Page Heading & Hero Upload Dropzone */}
      <motion.div variants={itemVariants} className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold font-display text-text-primary tracking-tight flex items-center gap-2.5">
            <FolderLock className="h-6 w-6 text-brand" />
            Documents
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Upload, verify, and manage your company statutory filings, compliance certificates, and executive vault records.
          </p>
        </div>

        {/* Hero Dropzone */}
        <HeroUploadDropzone
          onFileSelected={(file) => {
            setStagedFile(file);
            setCategorizeDialogOpen(true);
          }}
        />
      </motion.div>

      {/* 2. Required & Recommended Summary Tiles */}
      <motion.section variants={itemVariants} className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-text-primary">
            Document Categories
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Track mandatory statutory filings and recommended verification documents.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Required Category Summary Tile */}
          <DocumentCategorySummaryCard
            label="Required"
            completed={uploadedMandatoryCount}
            total={totalMandatoryCount}
            variant="required"
            onManage={() => setRequiredPopupOpen(true)}
          />

          {/* Recommended Category Summary Tile */}
          <DocumentCategorySummaryCard
            label="Recommended"
            completed={uploadedRecommendedCount}
            total={totalRecommendedCount}
            variant="recommended"
            onManage={() => setRecommendedPopupOpen(true)}
          />
        </div>

        {/* Expandable Why We Need These Documents Guide */}
        <DocumentsWhyWeNeedGuide />
      </motion.section>

      {/* 3. Document Registry (General Documents Table with Bulk Actions & Preview) */}
      <motion.section variants={itemVariants} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <FileSpreadsheet className="h-4.5 w-4.5 text-brand" />
              Document Registry
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Complete registry of all corporate filings, statutory certificates, and custom documents.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Bulk Download Action Bar when items selected */}
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

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 bg-surface-alt/50 p-0.5 rounded-lg border border-border/70 text-xs">
              {(["all", "required", "recommended", "custom"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "px-2.5 py-1 rounded-md capitalize font-medium text-[11px] transition-colors cursor-pointer",
                    categoryFilter === cat
                      ? "bg-surface text-text-primary shadow-2xs font-semibold"
                      : "text-text-secondary hover:text-text-primary"
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
            <p className="text-sm font-medium text-text-secondary">
              No documents uploaded yet
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              Upload statutory filings or custom records using the upload zone above.
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
                      onCheckedChange={(checked) =>
                        toggleSelectAllFiltered(Boolean(checked))
                      }
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

                  return (
                    <TableRow
                      key={doc.id}
                      className={cn(
                        "transition-colors",
                        isSelected
                          ? "bg-brand/5 hover:bg-brand/10"
                          : "hover:bg-surface-alt/30"
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
                          <span className="truncate" title={doc.original_name}>
                            {doc.original_name}
                          </span>
                        </div>
                      </TableCell>

                      {/* Document Type */}
                      <TableCell className="text-xs text-text-secondary capitalize py-3">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-surface-alt/60 border border-border/60 text-[11px]">
                          {doc.document_type.replace(/[-_]/g, " ")}
                        </span>
                      </TableCell>

                      {/* File Size */}
                      <TableCell className="text-xs text-text-secondary font-mono py-3">
                        {formatFileSize(doc.file_size_bytes)}
                      </TableCell>

                      {/* Quality Score */}
                      <TableCell className="py-3">
                        <DocumentQualityBadge document={doc} />
                      </TableCell>

                      {/* Uploaded Date & Metadata Popover */}
                      <TableCell className="text-xs text-text-secondary py-3">
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <span>{formatDocumentDate(doc.created_at)}</span>
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
                            onClick={() => {
                              setReplacingDocId(doc.id);
                              tableReplaceInputRef.current?.click();
                            }}
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
        )}
      </motion.section>

      {/* 4. Packages Section */}
      <motion.div variants={itemVariants}>
        <PackagesSection documents={documents} />
      </motion.div>

      {/* Hidden file input for table row replacement */}
      <input
        type="file"
        ref={tableReplaceInputRef}
        onChange={handleTableReplaceSelect}
        className="hidden"
        accept={ACCEPTED_FILE_FORMATS_STRING}
      />

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
              <span className="font-semibold text-text-primary">
                {docToDelete?.original_name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={Boolean(deletingDocId)}>
              Cancel
            </AlertDialogCancel>
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

      {/* Categorize Upload Dialog */}
      <CategorizeUploadDialog
        open={categorizeDialogOpen}
        onOpenChange={setCategorizeDialogOpen}
        file={stagedFile}
        pendingRequiredSlots={pendingRequiredSlots}
        pendingRecommendedSlots={pendingRecommendedSlots}
        onUploadComplete={() => {
          setStagedFile(null);
          setCategorizeDialogOpen(false);
        }}
      />

      {/* Required Documents Popup */}
      <RequiredDocumentsPopup
        open={requiredPopupOpen}
        onOpenChange={setRequiredPopupOpen}
        documents={documents}
      />

      {/* Recommended Documents Popup */}
      <RecommendedDocumentsPopup
        open={recommendedPopupOpen}
        onOpenChange={setRecommendedPopupOpen}
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
    </motion.div>
  );
}
