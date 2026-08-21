import { useState, useMemo, useEffect } from "react";
import { Search, FileText, Loader2, CheckSquare, Square } from "lucide-react";
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
import { Checkbox } from "@/shared/components/ui/checkbox";
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import type { CompanyDocument } from "@/shared/types/api";

export interface PackageDocumentPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allDocuments: CompanyDocument[];
  alreadyInPackage?: string[];
  onConfirm: (selectedDocIds: string[]) => void;
  isSubmitting: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
}

export function PackageDocumentPicker({
  open,
  onOpenChange,
  allDocuments,
  alreadyInPackage = [],
  onConfirm,
  isSubmitting,
  title = "Select Documents",
  description = "Choose documents to include in this package.",
  confirmLabel = "Add Documents",
}: PackageDocumentPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  // Filter out documents that are already members of this package
  const availableDocs = useMemo(() => {
    return allDocuments.filter((doc) => !alreadyInPackage.includes(doc.id));
  }, [allDocuments, alreadyInPackage]);

  // Client-side text search filter
  const filteredDocs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return availableDocs;
    return availableDocs.filter(
      (doc) =>
        doc.original_name.toLowerCase().includes(query) ||
        doc.document_type.toLowerCase().includes(query)
    );
  }, [availableDocs, searchQuery]);

  // Reset selection and query when opening the picker
  useEffect(() => {
    if (open) {
      setSelectedDocIds([]);
      setSearchQuery("");
    }
  }, [open]);

  const toggleSelectDoc = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedDocIds.length === filteredDocs.length && filteredDocs.length > 0) {
      setSelectedDocIds([]);
    } else {
      setSelectedDocIds(filteredDocs.map((d) => d.id));
    }
  };

  const handleConfirm = () => {
    if (selectedDocIds.length === 0) return;
    onConfirm(selectedDocIds);
  };

  const isAllSelected =
    filteredDocs.length > 0 && selectedDocIds.length === filteredDocs.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Search input & Select All bar */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by file name or document type..."
              className="pl-9 text-sm"
            />
          </div>

          {availableDocs.length > 0 && (
            <div className="flex items-center justify-between text-xs text-text-secondary px-1">
              <span>
                {selectedDocIds.length} of {availableDocs.length} selected
              </span>
              {filteredDocs.length > 0 && (
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="flex items-center gap-1 font-medium text-brand hover:underline cursor-pointer"
                >
                  {isAllSelected ? (
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
          )}
        </div>

        {/* Document List (Scrollable) */}
        <div className="flex-1 overflow-y-auto max-h-[340px] rounded-xl border border-border/80 divide-y divide-border/60 bg-surface-alt/20 my-2">
          {availableDocs.length === 0 ? (
            <div className="p-8 text-center text-xs text-text-secondary">
              No available documents to add. All uploaded documents are already in this package or none have been uploaded yet.
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="p-8 text-center text-xs text-text-secondary">
              No documents matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredDocs.map((doc) => {
              const isChecked = selectedDocIds.includes(doc.id);

              return (
                <div
                  key={doc.id}
                  onClick={() => toggleSelectDoc(doc.id)}
                  className={`flex items-center justify-between gap-3 p-3 text-xs transition-colors cursor-pointer ${
                    isChecked
                      ? "bg-brand/5 hover:bg-brand/10"
                      : "hover:bg-surface-alt/50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggleSelectDoc(doc.id)}
                      onClick={(e) => e.stopPropagation()}
                    />

                    <FileText className="h-4 w-4 shrink-0 text-brand" />

                    <div className="min-w-0 flex-1">
                      <p
                        className="font-medium text-text-primary truncate"
                        title={doc.original_name}
                      >
                        {doc.original_name}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-text-secondary font-mono">
                        <span className="capitalize">
                          {doc.document_type.replace(/[-_]/g, " ")}
                        </span>
                        <span>• {(doc.file_size_bytes / 1024).toFixed(0)} KB</span>
                      </div>
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

        {/* Footer */}
        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting || selectedDocIds.length === 0}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Saving…
              </>
            ) : (
              `${confirmLabel} (${selectedDocIds.length})`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
