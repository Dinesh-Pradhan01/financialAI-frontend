import { useState, useRef, useEffect } from "react";
import {
  Package as PackageIcon,
  Pencil,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
  X,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
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
import { DocumentQualityBadge } from "./DocumentQualityBadge";
import type { PackageResponse } from "@/shared/types/api";

export interface PackageCardProps {
  package: PackageResponse;
  onRename: (newName: string) => void;
  onDisband: () => void;
  onRemoveDocument: (docId: string) => void;
  onAddDocuments: () => void;
  isRenaming: boolean;
  isDisbanding: boolean;
}

export function PackageCard({
  package: pkg,
  onRename,
  onDisband,
  onRemoveDocument,
  onAddDocuments,
  isRenaming,
  isDisbanding,
}: PackageCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(pkg.name);
  const [isExpanded, setIsExpanded] = useState(true);
  const [disbandDialogOpen, setDisbandDialogOpen] = useState(false);
  const [removingDocId, setRemovingDocId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNameInput(pkg.name);
  }, [pkg.name]);

  useEffect(() => {
    if (isEditingName) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditingName]);

  const handleNameSubmit = () => {
    const trimmed = nameInput.trim();
    if (trimmed && trimmed !== pkg.name) {
      onRename(trimmed);
    } else {
      setNameInput(pkg.name);
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setNameInput(pkg.name);
      setIsEditingName(false);
    }
  };

  const handleRemoveDoc = (docId: string) => {
    setRemovingDocId(docId);
    onRemoveDocument(docId);
  };

  // Reset removingDocId once doc is removed
  useEffect(() => {
    if (removingDocId && !pkg.documents.some((d) => d.id === removingDocId)) {
      setRemovingDocId(null);
    }
  }, [pkg.documents, removingDocId]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs transition-all space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <PackageIcon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-1.5 max-w-sm">
                <Input
                  ref={inputRef}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onBlur={handleNameSubmit}
                  onKeyDown={handleKeyDown}
                  disabled={isRenaming}
                  className="h-8 text-sm font-semibold"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleNameSubmit}
                  disabled={isRenaming || !nameInput.trim()}
                  className="h-8 w-8 text-success hover:text-success hover:bg-success/10 shrink-0"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-base text-text-primary truncate">
                  {pkg.name}
                </h3>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsEditingName(true)}
                  title="Rename package"
                  className="h-6 w-6 text-text-secondary hover:text-text-primary"
                >
                  {isRenaming ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Pencil className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Badge
                  variant="secondary"
                  className="text-[11px] font-medium text-text-secondary px-2 py-0.5"
                >
                  {pkg.documents.length} {pkg.documents.length === 1 ? "document" : "documents"}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddDocuments}
            className="h-8 text-xs font-semibold gap-1.5 border-border-c hover:border-brand/40"
          >
            <Plus className="h-3.5 w-3.5 text-brand" /> Add documents
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setDisbandDialogOpen(true)}
            disabled={isDisbanding}
            className="h-8 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
          >
            {isDisbanding ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Disband
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="h-8 w-8 text-text-secondary hover:text-text-primary ml-1"
            title={isExpanded ? "Collapse documents" : "Expand documents"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Expandable Document List */}
      {isExpanded && (
        <div className="border-t border-border pt-3 space-y-2">
          {pkg.documents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 p-4 text-center text-xs text-text-secondary">
              No documents in this package yet. Click &quot;Add documents&quot; above to bundle files.
            </div>
          ) : (
            <div className="grid gap-2">
              {pkg.documents.map((doc) => {
                const isItemRemoving = removingDocId === doc.id;

                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-surface-alt/30 p-2.5 px-3 hover:bg-surface-alt/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <FileText className="h-4 w-4 shrink-0 text-brand" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="font-medium text-xs text-text-primary truncate max-w-[200px] sm:max-w-[280px]"
                            title={doc.original_name}
                          >
                            {doc.original_name}
                          </span>
                          <span className="text-[11px] text-text-secondary capitalize font-mono">
                            • {doc.document_type.replace(/[-_]/g, " ")}
                          </span>
                          <span className="text-[11px] text-text-secondary font-mono">
                            • {(doc.file_size_bytes / 1024).toFixed(0)} KB
                          </span>
                        </div>
                      </div>
                      <DocumentQualityBadge document={doc} />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      title="Remove from package"
                      disabled={isItemRemoving}
                      onClick={() => handleRemoveDoc(doc.id)}
                      className="h-7 w-7 text-text-secondary hover:text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      {isItemRemoving ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Disband Confirmation Dialog */}
      <AlertDialog
        open={disbandDialogOpen}
        onOpenChange={setDisbandDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disband {pkg.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disband this package? This removes the package bundle,
              but keeps all its documents safe in your Documents list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDisbanding}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDisband();
                setDisbandDialogOpen(false);
              }}
              disabled={isDisbanding}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDisbanding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Disbanding…
                </>
              ) : (
                "Disband Package"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
