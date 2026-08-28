import { useState } from "react";
import { Plus, Package as PackageIcon, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import {
  usePackages,
  useCreatePackage,
  useRenamePackage,
  useDisbandPackage,
  useAddDocumentsToPackage,
  useRemoveDocumentsFromPackage,
} from "../hooks/useDocuments";
import { PackageCard } from "./PackageCard";
import { PackageDocumentPicker } from "./PackageDocumentPicker";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
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
import { Checkbox } from "@/shared/components/ui/checkbox";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { formatFileSize } from "../lib/documentPresentation";
import type { CompanyDocument, PackageResponse } from "@/shared/types/api";

export interface PackagesSectionProps {
  documents: CompanyDocument[];
}

export function PackagesSection({ documents }: PackagesSectionProps) {
  const { data: packages = [], isLoading, isError, error } = usePackages();

  const createPackageMutation = useCreatePackage();
  const renamePackageMutation = useRenamePackage();
  const disbandPackageMutation = useDisbandPackage();
  const addDocsMutation = useAddDocumentsToPackage();
  const removeDocsMutation = useRemoveDocumentsFromPackage();

  // Per-package busy states
  const [renamingPkgId, setRenamingPkgId] = useState<string | null>(null);
  const [disbandingPkgId, setDisbandingPkgId] = useState<string | null>(null);

  // Add documents dialog state (for existing package)
  const [targetPackageForAdd, setTargetPackageForAdd] =
    useState<PackageResponse | null>(null);

  // Create package dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newPackageName, setNewPackageName] = useState("");
  const [createSelectedDocIds, setCreateSelectedDocIds] = useState<string[]>([]);
  const [createSearchQuery, setCreateSearchQuery] = useState("");

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleOpenCreateDialog = () => {
    setNewPackageName("");
    setCreateSelectedDocIds([]);
    setCreateSearchQuery("");
    setCreateDialogOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newPackageName.trim();
    if (!name) return;

    createPackageMutation.mutate(
      { name, document_ids: createSelectedDocIds },
      {
        onSuccess: () => {
          toast.success(`Created package "${name}" successfully.`);
          setCreateDialogOpen(false);
          setNewPackageName("");
          setCreateSelectedDocIds([]);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Failed to create package"));
        },
      }
    );
  };

  const handleRename = (pkgId: string, newName: string) => {
    setRenamingPkgId(pkgId);
    renamePackageMutation.mutate(
      { pkgId, name: newName },
      {
        onSuccess: () => {
          toast.success("Package renamed successfully.");
          setRenamingPkgId(null);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Failed to rename package"));
          setRenamingPkgId(null);
        },
      }
    );
  };

  const handleDisband = (pkg: PackageResponse) => {
    setDisbandingPkgId(pkg.id);
    disbandPackageMutation.mutate(pkg.id, {
      onSuccess: () => {
        toast.success(`Disbanded "${pkg.name}".`);
        setDisbandingPkgId(null);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "Failed to disband package"));
        setDisbandingPkgId(null);
      },
    });
  };

  const handleAddDocsToPackage = (selectedDocIds: string[]) => {
    if (!targetPackageForAdd) return;

    addDocsMutation.mutate(
      { pkgId: targetPackageForAdd.id, documentIds: selectedDocIds },
      {
        onSuccess: () => {
          toast.success(
            `Added ${selectedDocIds.length} document${
              selectedDocIds.length === 1 ? "" : "s"
            } to "${targetPackageForAdd.name}".`
          );
          setTargetPackageForAdd(null);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Failed to add documents to package"));
        },
      }
    );
  };

  const handleRemoveDocsFromPackage = (pkgId: string, docIds: string[]) => {
    if (docIds.length === 0) return;
    removeDocsMutation.mutate(
      { pkgId, documentIds: docIds },
      {
        onSuccess: () => {
          toast.success(
            docIds.length === 1
              ? "Document removed from package."
              : `Removed ${docIds.length} documents from package.`
          );
        },
        onError: (err) => {
          toast.error(
            getApiErrorMessage(err, "Failed to remove documents from package")
          );
        },
      }
    );
  };

  const toggleCreateSelectDoc = (id: string) => {
    setCreateSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  };

  const filteredCreateDocs = documents.filter((doc) => {
    const q = createSearchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      doc.original_name.toLowerCase().includes(q) ||
      doc.document_type.toLowerCase().includes(q)
    );
  });

  // ---------------------------------------------------------------------------
  // Render Loading & Error States
  // ---------------------------------------------------------------------------

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="space-y-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3.5 w-72" />
        </div>
        <div className="grid gap-4">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="space-y-4">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-xs text-destructive flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{getApiErrorMessage(error, "Failed to load document packages.")}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20">
            <PackageIcon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">
              Document Packages
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Organize documents into curated bundles for due diligence, audits, or investor reviews.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleOpenCreateDialog}
          className="gap-1.5 text-xs font-semibold self-start sm:self-auto cursor-pointer hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
        >
          <Plus className="h-3.5 w-3.5 text-brand" /> Create package
        </Button>
      </div>

      {/* Package List or Empty State */}
      {packages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center bg-surface/50 space-y-3">
          <PackageIcon className="mx-auto h-8 w-8 text-text-tertiary" />
          <div>
            <p className="text-sm font-medium text-text-secondary">
              No document packages created yet
            </p>
            <p className="text-xs text-text-tertiary mt-1 max-w-sm mx-auto">
              Bundle documents together for due diligence, tax filings, or lender reviews.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleOpenCreateDialog}
            className="gap-1.5 text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Create first package
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onRename={(newName) => handleRename(pkg.id, newName)}
              onDisband={() => handleDisband(pkg)}
              onRemoveDocuments={(docIds) => handleRemoveDocsFromPackage(pkg.id, docIds)}
              onAddDocuments={() => setTargetPackageForAdd(pkg)}
              isRenaming={renamingPkgId === pkg.id}
              isDisbanding={disbandingPkgId === pkg.id}
              isRemoving={removeDocsMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* Add Documents Dialog (for existing package) */}
      {targetPackageForAdd && (
        <PackageDocumentPicker
          open={Boolean(targetPackageForAdd)}
          onOpenChange={(open) => {
            if (!open) setTargetPackageForAdd(null);
          }}
          allDocuments={documents}
          alreadyInPackage={targetPackageForAdd.documents.map((d) => d.id)}
          onConfirm={handleAddDocsToPackage}
          isSubmitting={addDocsMutation.isPending}
          title={`Add Documents to ${targetPackageForAdd.name}`}
          description="Select from your available company documents to add to this bundle."
          confirmLabel="Add to Package"
        />
      )}

      {/* Create Package Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col p-6">
          <DialogHeader>
            <DialogTitle>Create Document Package</DialogTitle>
            <DialogDescription>
              Group documents together for shared compliance or reporting workflows.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleCreateSubmit}
            className="flex flex-col flex-1 min-h-0 space-y-4 pt-2"
          >
            <div className="space-y-1.5">
              <Label htmlFor="pkg-name" className="text-xs font-semibold">
                Package Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pkg-name"
                required
                value={newPackageName}
                onChange={(e) => setNewPackageName(e.target.value)}
                placeholder="e.g. Audit 2025, Due Diligence, GST Filings"
                className="text-sm"
              />
            </div>

            {documents.length > 0 && (
              <div className="space-y-2 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold">
                    Select Documents (Optional)
                  </Label>
                  <span className="text-[11px] text-text-secondary">
                    {createSelectedDocIds.length} selected
                  </span>
                </div>

                <Input
                  value={createSearchQuery}
                  onChange={(e) => setCreateSearchQuery(e.target.value)}
                  placeholder="Filter documents..."
                  className="h-8 text-xs"
                />

                <div className="flex-1 overflow-y-auto max-h-[220px] rounded-xl border border-border/80 divide-y divide-border/60 bg-surface-alt/20">
                  {filteredCreateDocs.map((doc) => {
                    const isChecked = createSelectedDocIds.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        onClick={() => toggleCreateSelectDoc(doc.id)}
                        className={`flex items-center justify-between gap-3 p-2.5 text-xs transition-colors cursor-pointer ${
                          isChecked ? "bg-brand/5 hover:bg-brand/10" : "hover:bg-surface-alt/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => toggleCreateSelectDoc(doc.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="min-w-0 flex-1">
                            <p
                              className="font-medium text-text-primary truncate"
                              title={doc.original_name}
                            >
                              {doc.original_name}
                            </p>
                            <span className="text-[10px] text-text-secondary capitalize font-mono">
                              {doc.document_type.replace(/[-_]/g, " ")} •{" "}
                              {formatFileSize(doc.file_size_bytes)}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                          <DocumentQualityBadge document={doc} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
                disabled={createPackageMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createPackageMutation.isPending || !newPackageName.trim()}
              >
                {createPackageMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Creating…
                  </>
                ) : (
                  "Create Package"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
