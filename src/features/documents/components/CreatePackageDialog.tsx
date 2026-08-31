import React, { useState, useEffect, useMemo, useRef } from "react";
import { Loader2, Package as PackageIcon, Search, CheckSquare, Square } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import { formatFileSize } from "../lib/documentPresentation";
import { useCreatePackage } from "../hooks/useDocuments";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import type { CompanyDocument, PackageResponse } from "@/shared/types/api";

export interface CreatePackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documents: CompanyDocument[];
  initialSelectedDocIds?: string[];
  onSuccess?: (createdPackage: PackageResponse) => void;
}

export function CreatePackageDialog({
  open,
  onOpenChange,
  documents,
  initialSelectedDocIds,
  onSuccess,
}: CreatePackageDialogProps) {
  const createPackageMutation = useCreatePackage();

  const [newPackageName, setNewPackageName] = useState("");
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sync state when dialog opens
  useEffect(() => {
    if (open) {
      setNewPackageName("");
      setSelectedDocIds(initialSelectedDocIds ? [...initialSelectedDocIds] : []);
      setSearchQuery("");
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
  }, [open]);

  const toggleSelectDoc = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  };

  const filteredDocs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter(
      (doc) =>
        doc.original_name.toLowerCase().includes(q) ||
        doc.document_type.toLowerCase().includes(q)
    );
  }, [documents, searchQuery]);

  const toggleSelectAllFiltered = () => {
    if (filteredDocs.length === 0) return;
    const allFilteredSelected = filteredDocs.every((d) => selectedDocIds.includes(d.id));

    if (allFilteredSelected) {
      const filteredIdSet = new Set(filteredDocs.map((d) => d.id));
      setSelectedDocIds((prev) => prev.filter((id) => !filteredIdSet.has(id)));
    } else {
      const newIds = filteredDocs.map((d) => d.id);
      setSelectedDocIds((prev) => Array.from(new Set([...prev, ...newIds])));
    }
  };

  const isAllFilteredSelected =
    filteredDocs.length > 0 && filteredDocs.every((d) => selectedDocIds.includes(d.id));

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newPackageName.trim();
    if (!name) return;

    createPackageMutation.mutate(
      { name, document_ids: selectedDocIds },
      {
        onSuccess: (createdPkg) => {
          toast.success(`Created package "${name}" successfully.`);
          onOpenChange(false);
          onSuccess?.(createdPkg);
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err, "Failed to create package"));
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !createPackageMutation.isPending && onOpenChange(val)}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col p-6">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20">
              <PackageIcon className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold font-display text-text-primary">
                Create Document Package
              </DialogTitle>
              <DialogDescription className="text-xs text-text-secondary mt-0.5">
                Group documents together for due diligence, audit, or lender review workflows.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleCreateSubmit} className="flex flex-col flex-1 min-h-0 space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="pkg-name-input" className="text-xs font-semibold text-text-primary">
              Package Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="pkg-name-input"
              ref={nameInputRef}
              required
              value={newPackageName}
              onChange={(e) => setNewPackageName(e.target.value)}
              placeholder="e.g. Audit 2025, Due Diligence, GST Filings"
              className="text-xs h-9 bg-surface border-border-c"
              disabled={createPackageMutation.isPending}
            />
          </div>

          {documents.length > 0 && (
            <div className="space-y-2 flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-text-primary">
                  Select Documents ({selectedDocIds.length} selected)
                </Label>
                {filteredDocs.length > 0 && (
                  <button
                    type="button"
                    onClick={toggleSelectAllFiltered}
                    className="flex items-center gap-1 text-[11px] font-medium text-brand hover:underline cursor-pointer"
                  >
                    {isAllFilteredSelected ? (
                      <>
                        <CheckSquare className="h-3.5 w-3.5" /> Deselect all
                      </>
                    ) : (
                      <>
                        <Square className="h-3.5 w-3.5" /> Select all filtered
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-text-tertiary" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter documents…"
                  className="h-8 pl-8 text-xs bg-surface border-border-c"
                  disabled={createPackageMutation.isPending}
                />
              </div>

              <div className="flex-1 overflow-y-auto max-h-[220px] rounded-xl border border-border/80 divide-y divide-border/60 bg-surface-alt/20">
                {filteredDocs.length === 0 ? (
                  <div className="p-6 text-center text-xs text-text-secondary">
                    No documents matching &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  filteredDocs.map((doc) => {
                    const isChecked = selectedDocIds.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        onClick={() => toggleSelectDoc(doc.id)}
                        className={`flex items-center justify-between gap-3 p-2.5 text-xs transition-colors cursor-pointer ${
                          isChecked ? "bg-brand/5 hover:bg-brand/10" : "hover:bg-surface-alt/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => toggleSelectDoc(doc.id)}
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
                  })
                )}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={createPackageMutation.isPending}
              className="text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createPackageMutation.isPending || !newPackageName.trim()}
              className="text-xs font-semibold gap-1.5 cursor-pointer bg-brand text-white hover:bg-brand/90"
            >
              {createPackageMutation.isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Creating…</span>
                </>
              ) : (
                <span>
                  Create Package {selectedDocIds.length > 0 ? `(${selectedDocIds.length})` : ""}
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
