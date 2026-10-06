import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  FileText,
  Download,
  Upload,
  Trash2,
  Eye,
  PackagePlus,
  Loader2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import { useReplaceDocument, useDeleteDocument, downloadDocument } from "../hooks/useDocuments";
import { formatFileSize, formatDocumentDate, formatDocumentType } from "../lib/presentationModel";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { DocumentInfoPopover } from "./DocumentInfoPopover";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { ReplaceDocumentDialog } from "./ReplaceDocumentDialog";
import { CreatePackageDialog } from "./CreatePackageDialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
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

export interface DocumentRegistrySectionProps {
  documents: CompanyDocument[];
  initialCategoryFilter?: string;
  initialSearchQuery?: string;
  onPreviewDocument?: (doc: CompanyDocument) => void;
  className?: string;
}

type SortColumn = "name" | "type" | "size" | "date";

export function DocumentRegistrySection({
  documents,
  initialSearchQuery = "",
  onPreviewDocument,
  className,
}: Readonly<DocumentRegistrySectionProps>) {
  const replaceMutation = useReplaceDocument();
  const deleteMutation = useDeleteDocument();

  // Preview Modal State for Document Registry Table
  const [internalPreviewDoc, setInternalPreviewDoc] = useState<CompanyDocument | null>(null);

  // Table State
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);
  const [isCreatePackageOpen, setIsCreatePackageOpen] = useState(false);

  const [sortColumn, setSortColumn] = useState<SortColumn>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [docToReplace, setDocToReplace] = useState<CompanyDocument | null>(null);
  const [isReplacingDoc, setIsReplacingDoc] = useState(false);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [docToDelete, setDocToDelete] = useState<CompanyDocument | null>(null);

  // Sync external search query
  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection(column === "name" || column === "type" ? "asc" : "desc");
    }
  };

  // ---------------------------------------------------------------------------
  // Documents Filtering & Sorting
  // ---------------------------------------------------------------------------

  const filteredDocuments = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const filtered = documents.filter((doc) => {
      // 1. Search query filter
      if (q) {
        const originalName = (doc.original_name ?? "").toLowerCase();
        const docType = (doc.document_type ?? "").toLowerCase();
        const formatted = formatDocumentType(doc.document_type).toLowerCase();
        const notes = (doc.verification_notes ?? "").toLowerCase();

        const matches =
          originalName.includes(q) ||
          docType.includes(q) ||
          formatted.includes(q) ||
          notes.includes(q);

        if (!matches) return false;
      }

      return true;
    });

    // 2. Sorting
    return [...filtered].sort((a, b) => {
      let comp = 0;
      switch (sortColumn) {
        case "name":
          comp = (a.original_name || "").localeCompare(b.original_name || "");
          break;
        case "type":
          comp = formatDocumentType(a.document_type).localeCompare(
            formatDocumentType(b.document_type),
          );
          break;
        case "size":
          comp = (a.file_size_bytes || 0) - (b.file_size_bytes || 0);
          break;
        case "date": {
          const timeA = new Date(a.created_at || 0).getTime();
          const timeB = new Date(b.created_at || 0).getTime();
          comp = timeA - timeB;
          break;
        }
      }
      return sortDirection === "asc" ? comp : -comp;
    });
  }, [documents, searchQuery, sortColumn, sortDirection]);

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
    let failCount = 0;

    try {
      for (const doc of selectedDocs) {
        try {
          await downloadDocument(doc.id, doc.original_name);
          successCount++;
          await new Promise((resolve) => setTimeout(resolve, 350));
        } catch {
          failCount++;
        }
      }

      if (successCount > 0 && failCount === 0) {
        toast.success(`Successfully downloaded ${successCount} documents`);
      } else if (successCount > 0 && failCount > 0) {
        toast.warning(`Downloaded ${successCount} files (${failCount} failed)`);
      } else {
        toast.error("Bulk download failed for selected files");
      }
    } finally {
      setIsBulkDownloading(false);
    }
  };

  const handleReplaceSubmit = async (file: File) => {
    if (!docToReplace) return;

    setIsReplacingDoc(true);
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
      setIsReplacingDoc(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!docToDelete) return;

    const targetDoc = docToDelete;
    setDeletingDocId(targetDoc.id);
    setDocToDelete(null);

    try {
      await deleteMutation.mutateAsync(targetDoc.id);
      setSelectedDocIds((prev) => prev.filter((id) => id !== targetDoc.id));
      toast.success(`Archived "${targetDoc.original_name}"`, {
        description: "Corporate evidence unlinked from active vault. Audit history preserved.",
      });
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to archive document"));
    } finally {
      setDeletingDocId(null);
    }
  };

  const previewTarget = (doc: CompanyDocument) => {
    if (onPreviewDocument) {
      onPreviewDocument(doc);
    } else {
      setInternalPreviewDoc(doc);
    }
  };

  const getSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-3 w-3 text-text-tertiary ml-1" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 text-brand ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 text-brand ml-1" />
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-2xl border border-border-c/90 bg-surface p-4 shadow-2xs space-y-4">
        {/* Table Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-primary tracking-tight">
              Document Registry
            </span>
            <span className="text-xs font-mono tabular-nums text-text-tertiary px-1.5 py-0.5 rounded-md bg-surface-alt border border-border-c/60">
              {filteredDocuments.length} of {documents.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Batch Selection Bar */}
            {selectedDocIds.length > 0 && (
              <div className="flex items-center gap-1.5 bg-brand/8 border border-brand/20 px-2.5 py-1 rounded-xl text-xs">
                <span className="font-semibold text-brand font-mono tabular-nums">
                  {selectedDocIds.length}
                </span>
                <span className="text-text-secondary text-xs">selected</span>

                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isBulkDownloading}
                  onClick={handleBulkDownload}
                  className="h-6 px-2 text-xs font-medium text-brand hover:bg-brand/10 cursor-pointer gap-1"
                >
                  {isBulkDownloading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Download className="h-3 w-3" />
                  )}
                  <span>Export</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreatePackageOpen(true)}
                  className="h-6 px-2 text-xs font-medium text-brand hover:bg-brand/10 cursor-pointer gap-1"
                >
                  <PackagePlus className="h-3 w-3" />
                  <span>Package</span>
                </Button>

                <button
                  type="button"
                  onClick={() => setSelectedDocIds([])}
                  className="text-text-tertiary hover:text-text-primary p-0.5 rounded cursor-pointer ml-0.5"
                  title="Clear selection"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Quick Search */}
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-tertiary" />
              <Input
                type="text"
                placeholder="Search table…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 pr-8 text-xs bg-surface border-border-c rounded-xl"
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
          </div>
        </div>

        {/* Table Content */}
        {documents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border-c p-8 text-center bg-surface-alt/30">
            <FileText className="mx-auto h-8 w-8 text-text-tertiary mb-2" />
            <p className="text-xs font-semibold text-text-primary">No documents in repository</p>
            <p className="text-xs text-text-secondary mt-1">
              Upload documents using the button above to begin establishing your repository.
            </p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border-c p-8 text-center bg-surface-alt/30 space-y-2">
            <FileText className="mx-auto h-8 w-8 text-text-tertiary mb-1" />
            <p className="text-xs font-semibold text-text-primary">No matching records found</p>
            <p className="text-xs text-text-secondary">
              Try adjusting your search query or clearing active filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
              }}
              className="mt-2 text-xs h-7 rounded-lg cursor-pointer"
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border-c/80 overflow-hidden shadow-2xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-alt/60 hover:bg-surface-alt/60 border-b border-border-c/80">
                  <TableHead className="w-10 py-2.5 pl-3.5 pr-2">
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
                  <TableHead
                    className="font-bold text-xs py-2.5 text-text-primary cursor-pointer select-none"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      <span>Document</span>
                      {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="font-bold text-xs py-2.5 text-text-primary cursor-pointer select-none"
                    onClick={() => handleSort("type")}
                  >
                    <div className="flex items-center">
                      <span>Type</span>
                      {getSortIcon("type")}
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-xs py-2.5 text-text-primary">
                    Verification
                  </TableHead>
                  <TableHead
                    className="font-bold text-xs py-2.5 text-text-primary cursor-pointer select-none"
                    onClick={() => handleSort("size")}
                  >
                    <div className="flex items-center">
                      <span>Size</span>
                      {getSortIcon("size")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="font-bold text-xs py-2.5 text-text-primary cursor-pointer select-none"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center">
                      <span>Uploaded</span>
                      {getSortIcon("date")}
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-xs py-2.5 text-text-primary text-right pr-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => {
                  const isSelected = selectedDocIds.includes(doc.id);
                  const isRowDownloading = downloadingDocId === doc.id;
                  const isRowDeleting = deletingDocId === doc.id;
                  const formattedType = formatDocumentType(doc.document_type);

                  return (
                    <TableRow
                      key={doc.id}
                      className={cn(
                        "transition-colors border-b border-border-c/60",
                        isSelected ? "bg-brand/5 hover:bg-brand/8" : "hover:bg-surface-alt/40",
                      )}
                    >
                      <TableCell className="py-2.5 pl-3.5 pr-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelectDoc(doc.id)}
                          aria-label={`Select ${doc.original_name}`}
                        />
                      </TableCell>

                      {/* Name */}
                      <TableCell className="font-medium text-xs py-2.5">
                        <div className="flex items-center gap-2 max-w-xs">
                          <FileText className="h-3.5 w-3.5 shrink-0 text-brand" />
                          <button
                            type="button"
                            onClick={() => previewTarget(doc)}
                            className="truncate text-left text-text-primary hover:text-brand hover:underline font-semibold cursor-pointer"
                            title={doc.original_name}
                          >
                            {doc.original_name}
                          </button>
                        </div>
                      </TableCell>

                      {/* Type */}
                      <TableCell className="text-xs text-text-secondary py-2.5">
                        <span
                          title={formattedType}
                          className="inline-block max-w-[220px] truncate px-2 py-0.5 rounded-md bg-surface-alt border border-border-c/70 text-xs text-text-primary font-medium"
                        >
                          {formattedType}
                        </span>
                      </TableCell>

                      {/* Verification Status */}
                      <TableCell className="py-2.5">
                        <DocumentQualityBadge document={doc} showTooltip={true} />
                      </TableCell>

                      {/* Size */}
                      <TableCell className="text-xs text-text-secondary font-mono tabular-nums py-2.5">
                        {formatFileSize(doc.file_size_bytes)}
                      </TableCell>

                      {/* Upload Date */}
                      <TableCell className="text-xs text-text-secondary py-2.5">
                        <div className="flex items-center gap-1 font-mono tabular-nums text-xs">
                          <span>{formatDocumentDate(doc.created_at)}</span>
                          <DocumentInfoPopover
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

                      {/* Row Actions */}
                      <TableCell className="text-right pr-4 py-2.5">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Preview document"
                            aria-label={`Preview ${doc.original_name}`}
                            disabled={isRowDownloading || isRowDeleting}
                            onClick={() => previewTarget(doc)}
                            className="h-7 w-7 text-text-secondary hover:text-brand hover:bg-brand/10 cursor-pointer rounded-lg"
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
                            className="h-7 w-7 text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer rounded-lg"
                          >
                            {isRowDownloading ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
                            ) : (
                              <Download className="h-3.5 w-3.5" />
                            )}
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            title="versionUpload new "
                            aria-label={`Re-Upload of ${doc.original_name}`}
                            disabled={isRowDownloading || isRowDeleting}
                            onClick={() => setDocToReplace(doc)}
                            className="h-7 w-7 text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer rounded-lg"
                          >
                            <Upload className="h-3.5 w-3.5" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            title="Archive document"
                            aria-label={`Archive ${doc.original_name}`}
                            disabled={isRowDownloading || isRowDeleting}
                            onClick={() => setDocToDelete(doc)}
                            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer rounded-lg"
                          >
                            {isRowDeleting ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-destructive" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
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
      </div>

      {/* Overlays / Modals */}
      <DocumentPreviewModal
        open={Boolean(internalPreviewDoc)}
        onOpenChange={(open) => !open && setInternalPreviewDoc(null)}
        document={internalPreviewDoc}
      />

      <ReplaceDocumentDialog
        open={Boolean(docToReplace)}
        onOpenChange={(open) => !open && setDocToReplace(null)}
        targetDocument={docToReplace}
        targetLabel={docToReplace ? formatDocumentType(docToReplace.document_type) : undefined}
        onConfirmReplace={handleReplaceSubmit}
        isReplacing={isReplacingDoc}
      />

      <CreatePackageDialog
        open={isCreatePackageOpen}
        onOpenChange={setIsCreatePackageOpen}
        initialSelectedDocIds={selectedDocIds}
        documents={documents}
      />

      <AlertDialog
        open={Boolean(docToDelete)}
        onOpenChange={(open) => !open && setDocToDelete(null)}
      >
        <AlertDialogContent className="bg-surface border-border-c">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sm font-bold text-text-primary">
              Archive Document from Vault
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-text-secondary leading-relaxed">
              Are you sure you want to archive{" "}
              <strong className="text-text-primary">{docToDelete?.original_name}</strong>? This will
              unlink the file from active compliance records and packages while maintaining
              institutional audit logs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs h-8 rounded-lg cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="text-xs h-8 rounded-lg bg-destructive hover:bg-destructive/90 text-white cursor-pointer font-semibold"
            >
              Archive Document
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
