import { useState, useRef } from "react";
import {
  FolderLock,
  Download,
  Trash2,
  RefreshCw,
  Plus,
  Upload,
  Loader2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import {
  useDocuments,
  useUploadDocument,
  useReplaceDocument,
  useDeleteDocument,
  downloadDocument,
} from "../hooks/useDocuments";
import { KNOWN_DOCUMENT_SLOTS } from "../lib/documentGuidance";
import { DocumentUploadCard } from "./DocumentUploadCard";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { PackagesSection } from "./PackagesSection";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Progress } from "@/shared/components/ui/progress";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/shared/components/ui/alert-dialog";
import type { CompanyDocument } from "@/shared/types/api";

export function DocumentsPage() {
  const {
    data: documents = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDocuments();

  const uploadMutation = useUploadDocument();
  const replaceMutation = useReplaceDocument();
  const deleteMutation = useDeleteDocument();

  // Per-slot busy states for known document cards
  const [uploadingTypeKey, setUploadingTypeKey] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

  // Table row busy states & actions
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);
  const [replacingDocId, setReplacingDocId] = useState<string | null>(null);
  const [docToDelete, setDocToDelete] = useState<CompanyDocument | null>(null);

  // Custom document upload dialog state
  const [customUploadOpen, setCustomUploadOpen] = useState(false);
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customDocType, setCustomDocType] = useState("");
  const [customUploading, setCustomUploading] = useState(false);

  const customFileInputRef = useRef<HTMLInputElement>(null);
  const tableReplaceInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------------------------------------
  // Handlers for Known Document Slots
  // ---------------------------------------------------------------------------

  const handleSlotUpload = (
    file: File,
    typeKey: string,
    category: string,
    existingDoc: CompanyDocument | null
  ) => {
    setUploadingTypeKey(typeKey);

    if (existingDoc) {
      const formData = new FormData();
      formData.append("file", file);
      replaceMutation.mutate(
        { docId: existingDoc.id, formData },
        {
          onSuccess: () => {
            toast.success(`Replaced ${file.name} successfully.`);
            setUploadingTypeKey(null);
          },
          onError: (err) => {
            toast.error(getApiErrorMessage(err, "Upload failed"));
            setUploadingTypeKey(null);
          },
        }
      );
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("document_type", typeKey);
      formData.append("document_category", category);
      uploadMutation.mutate(formData, {
        onSuccess: () => {
          toast.success(`Uploaded ${file.name} successfully.`);
          setUploadingTypeKey(null);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Upload failed"));
          setUploadingTypeKey(null);
        },
      });
    }
  };

  const handleSlotDelete = (docId: string, label: string) => {
    setDeletingDocId(docId);
    deleteMutation.mutate(docId, {
      onSuccess: () => {
        toast.success(`Deleted ${label}.`);
        setDeletingDocId(null);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "Delete failed"));
        setDeletingDocId(null);
      },
    });
  };

  // ---------------------------------------------------------------------------
  // Handlers for Custom / Other Documents
  // ---------------------------------------------------------------------------

  const handleCustomFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomFile(file);
      // Clean filename as default type suggestion
      const suggestedType = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setCustomDocType(suggestedType);
      setCustomUploadOpen(true);
      e.target.value = "";
    }
  };

  const handleCustomUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFile) return;

    setCustomUploading(true);
    const formData = new FormData();
    formData.append("file", customFile);
    formData.append(
      "document_type",
      customDocType.trim() || customFile.name.split(".")[0]
    );
    formData.append("document_category", "custom");

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(`Uploaded ${customFile.name} successfully.`);
        setCustomUploadOpen(false);
        setCustomFile(null);
        setCustomDocType("");
        setCustomUploading(false);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "Upload failed"));
        setCustomUploading(false);
      },
    });
  };

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

  const handleTableReplaceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (replacingDocId && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
      e.target.value = "";
    }
  };

  const handleConfirmDelete = () => {
    if (!docToDelete) return;
    setDeletingDocId(docToDelete.id);
    deleteMutation.mutate(docToDelete.id, {
      onSuccess: () => {
        toast.success("Document deleted successfully.");
        setDocToDelete(null);
        setDeletingDocId(null);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "Failed to delete document"));
        setDeletingDocId(null);
      },
    });
  };

  // Filter out documents matching known slots for the "Other Documents" table
  const otherDocuments = documents.filter(
    (d) => !KNOWN_DOCUMENT_SLOTS.some((slot) => slot.typeKey === d.document_type)
  );

  // Mandatory documents completion metrics
  const mandatorySlots = KNOWN_DOCUMENT_SLOTS.filter(
    (s) => s.category === "mandatory"
  );
  const uploadedMandatoryCount = mandatorySlots.filter((slot) =>
    documents.some((d) => d.document_type === slot.typeKey)
  ).length;
  const totalMandatoryCount = mandatorySlots.length;
  const mandatoryProgressPercent =
    totalMandatoryCount > 0
      ? Math.round((uploadedMandatoryCount / totalMandatoryCount) * 100)
      : 0;

  // ---------------------------------------------------------------------------
  // Loading State
  // ---------------------------------------------------------------------------

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-10">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Error State
  // ---------------------------------------------------------------------------

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-text-primary tracking-tight">
            Documents
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage corporate documents, compliance certificates, and statutory records.
          </p>
        </div>

        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Failed to load documents</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            {getApiErrorMessage(error, "We encountered an error while fetching your company documents.")}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-2 gap-2"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Main Page Render
  // ---------------------------------------------------------------------------

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-10">
      {/* 1. Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-text-primary tracking-tight flex items-center gap-2.5">
            <FolderLock className="h-6 w-6 text-brand" />
            Documents
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Upload, verify, and manage your company statutory filings, compliance certificates, and executive vault records.
          </p>
        </div>
      </div>

      {/* 2. Required & Recommended Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-text-primary">
              Required & Recommended Documents
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Standard corporate documents required for MSME verification, credit profiling, and rating.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-surface border border-border/70 rounded-xl px-3.5 py-2 shadow-2xs shrink-0 self-start sm:self-auto">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4 text-xs font-semibold text-text-primary">
                <span>
                  {uploadedMandatoryCount} of {totalMandatoryCount} required uploaded
                </span>
                <span className="font-mono text-text-secondary text-[11px]">
                  {mandatoryProgressPercent}%
                </span>
              </div>
              <Progress value={mandatoryProgressPercent} className="h-1.5 w-40" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {KNOWN_DOCUMENT_SLOTS.map((slot) => {
            const matchingDoc =
              documents.find((d) => d.document_type === slot.typeKey) || null;

            return (
              <DocumentUploadCard
                key={slot.typeKey}
                label={slot.label}
                description={slot.description}
                document={matchingDoc}
                isUploading={uploadingTypeKey === slot.typeKey}
                isDeleting={Boolean(matchingDoc && deletingDocId === matchingDoc.id)}
                onUpload={(file) =>
                  handleSlotUpload(file, slot.typeKey, slot.category, matchingDoc)
                }
                onDelete={() => {
                  if (matchingDoc) {
                    handleSlotDelete(matchingDoc.id, slot.label);
                  }
                }}
              />
            );
          })}
        </div>
      </section>

      {/* 3. Other Documents Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-text-primary">
              Other Documents
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Additional contracts, licenses, board resolutions, and miscellaneous files.
            </p>
          </div>

          <div>
            <input
              type="file"
              ref={customFileInputRef}
              onChange={handleCustomFileSelect}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => customFileInputRef.current?.click()}
              className="gap-1.5 text-xs font-semibold"
            >
              <Plus className="h-4 w-4" /> Upload document
            </Button>
          </div>
        </div>

        {otherDocuments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-surface/50">
            <FileText className="mx-auto h-8 w-8 text-text-tertiary mb-2" />
            <p className="text-sm font-medium text-text-secondary">
              No other documents uploaded yet
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              Upload custom contracts, board resolutions, or trade licenses.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-alt/50 hover:bg-surface-alt/50">
                  <TableHead className="font-semibold text-xs">Name</TableHead>
                  <TableHead className="font-semibold text-xs">Type</TableHead>
                  <TableHead className="font-semibold text-xs">Size</TableHead>
                  <TableHead className="font-semibold text-xs">Quality</TableHead>
                  <TableHead className="font-semibold text-xs">Uploaded</TableHead>
                  <TableHead className="font-semibold text-xs text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {otherDocuments.map((doc) => {
                  const isRowDownloading = downloadingDocId === doc.id;
                  const isRowDeleting = deletingDocId === doc.id;

                  const formattedDate = doc.created_at
                    ? new Date(doc.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <TableRow key={doc.id} className="hover:bg-surface-alt/30 transition-colors">
                      <TableCell className="font-medium text-sm">
                        <div className="flex items-center gap-2.5 max-w-[260px]">
                          <FileText className="h-4 w-4 shrink-0 text-brand" />
                          <span className="truncate" title={doc.original_name}>
                            {doc.original_name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs text-text-secondary capitalize">
                        {doc.document_type.replace(/[-_]/g, " ")}
                      </TableCell>

                      <TableCell className="text-xs text-text-secondary font-mono">
                        {(doc.file_size_bytes / 1024).toFixed(0)} KB
                      </TableCell>

                      <TableCell>
                        <DocumentQualityBadge document={doc} />
                      </TableCell>

                      <TableCell className="text-xs text-text-secondary">
                        {formattedDate}
                      </TableCell>

                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Download document"
                            disabled={isRowDownloading || isRowDeleting}
                            onClick={() => handleDownload(doc)}
                            className="h-8 w-8 text-text-secondary hover:text-text-primary"
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
                            disabled={isRowDownloading || isRowDeleting}
                            onClick={() => {
                              setReplacingDocId(doc.id);
                              tableReplaceInputRef.current?.click();
                            }}
                            className="h-8 w-8 text-text-secondary hover:text-text-primary"
                          >
                            <Upload className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete document"
                            disabled={isRowDownloading || isRowDeleting}
                            onClick={() => setDocToDelete(doc)}
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
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

      {/* 4. Packages Section */}
      <PackagesSection documents={documents} />

      {/* Hidden file input for table row replacement */}
      <input
        type="file"
        ref={tableReplaceInputRef}
        onChange={handleTableReplaceSelect}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
      />

      {/* Custom Upload Dialog */}
      <Dialog open={customUploadOpen} onOpenChange={setCustomUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Custom Document</DialogTitle>
            <DialogDescription>
              Specify the document type or label to classify this document.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCustomUploadSubmit} className="space-y-4 py-2">
            {customFile && (
              <div className="rounded-xl border border-border bg-surface-alt/40 p-3 text-xs flex items-center justify-between gap-3 min-w-0 w-full overflow-hidden">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FileText className="h-4 w-4 text-brand shrink-0" />
                  <span className="font-medium truncate text-text-primary block min-w-0" title={customFile.name}>
                    {customFile.name}
                  </span>
                </div>
                <span className="text-text-secondary shrink-0 font-mono text-[11px] whitespace-nowrap">
                  {(customFile.size / 1024).toFixed(0)} KB
                </span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="custom-doc-type" className="text-xs font-semibold">
                Document Type / Label <span className="text-destructive">*</span>
              </Label>
              <Input
                id="custom-doc-type"
                required
                value={customDocType}
                onChange={(e) => setCustomDocType(e.target.value)}
                placeholder="e.g. Board Resolution, Audit Report 2025"
                className="text-sm"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCustomUploadOpen(false);
                  setCustomFile(null);
                }}
                disabled={customUploading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={customUploading || !customDocType.trim()}>
                {customUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Uploading…
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog for Custom Table Rows */}
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
            <AlertDialogCancel disabled={Boolean(deletingDocId)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={Boolean(deletingDocId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
    </div>
  );
}
