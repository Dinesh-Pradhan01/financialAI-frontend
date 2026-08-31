import { useState } from "react";
import { Plus, Package as PackageIcon, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import {
  usePackages,
  useRenamePackage,
  useDisbandPackage,
  useAddDocumentsToPackage,
  useRemoveDocumentsFromPackage,
} from "../hooks/useDocuments";
import { PackageCard } from "./PackageCard";
import { PackageDocumentPicker } from "./PackageDocumentPicker";
import { CreatePackageDialog } from "./CreatePackageDialog";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import type { CompanyDocument, PackageResponse } from "@/shared/types/api";

export interface PackagesSectionProps {
  documents: CompanyDocument[];
}

export function PackagesSection({ documents }: PackagesSectionProps) {
  const { data: packages = [], isLoading, isError, error } = usePackages();

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

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

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
          onClick={() => setCreateDialogOpen(true)}
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
            onClick={() => setCreateDialogOpen(true)}
            className="gap-1.5 text-xs font-semibold cursor-pointer"
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
      <CreatePackageDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        documents={documents}
      />
    </section>
  );
}
