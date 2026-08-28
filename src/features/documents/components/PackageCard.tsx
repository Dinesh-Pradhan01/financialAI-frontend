import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
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
import { formatFileSize } from "../lib/documentPresentation";
import type { PackageResponse } from "@/shared/types/api";

export interface PackageCardProps {
  package: PackageResponse;
  onRename: (newName: string) => void;
  onDisband: () => void;
  onRemoveDocuments: (docIds: string[]) => void;
  onAddDocuments: () => void;
  isRenaming: boolean;
  isDisbanding: boolean;
  isRemoving?: boolean;
}

export function PackageCard({
  package: pkg,
  onRename,
  onDisband,
  onRemoveDocuments,
  onAddDocuments,
  isRenaming,
  isDisbanding,
  isRemoving = false,
}: PackageCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(pkg.name);
  const [isExpanded, setIsExpanded] = useState(true);
  const [disbandDialogOpen, setDisbandDialogOpen] = useState(false);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [pendingRemovalDocIds, setPendingRemovalDocIds] = useState<string[] | null>(null);
  const [removingSingleDocId, setRemovingSingleDocId] = useState<string | null>(null);

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

  // Clean up selectedDocIds when documents change
  useEffect(() => {
    setSelectedDocIds((prev) =>
      prev.filter((id) => pkg.documents.some((d) => d.id === id))
    );
    if (removingSingleDocId && !pkg.documents.some((d) => d.id === removingSingleDocId)) {
      setRemovingSingleDocId(null);
    }
    if (pendingRemovalDocIds) {
      const valid = pendingRemovalDocIds.filter((id) => pkg.documents.some((d) => d.id === id));
      if (valid.length === 0) {
        setPendingRemovalDocIds(null);
      }
    }
  }, [pkg.documents, removingSingleDocId, pendingRemovalDocIds]);

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

  const toggleSelectDoc = (docId: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const handleSelectAllToggle = () => {
    if (selectedDocIds.length === pkg.documents.length) {
      setSelectedDocIds([]);
    } else {
      setSelectedDocIds(pkg.documents.map((d) => d.id));
    }
  };

  const handleRemoveSingle = (docId: string) => {
    setPendingRemovalDocIds([docId]);
  };

  const handleBulkRemove = () => {
    if (selectedDocIds.length === 0) return;
    setPendingRemovalDocIds(selectedDocIds);
  };

  const handleConfirmRemoval = () => {
    if (!pendingRemovalDocIds || pendingRemovalDocIds.length === 0) return;
    const idsToRemove = [...pendingRemovalDocIds];
    if (idsToRemove.length === 1) {
      setRemovingSingleDocId(idsToRemove[0]);
    }
    onRemoveDocuments(idsToRemove);
    setSelectedDocIds((prev) => prev.filter((id) => !idsToRemove.includes(id)));
    setPendingRemovalDocIds(null);
  };

  const isAllSelected =
    pkg.documents.length > 0 && selectedDocIds.length === pkg.documents.length;

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
              <div className="flex items-center gap-2 max-w-sm">
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
                  aria-label="Save package name"
                  title="Save package name"
                  className="h-8 w-8 text-success hover:text-success hover:bg-success/10 shrink-0"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-base text-text-primary tracking-tight truncate">
                  {pkg.name}
                </h3>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsEditingName(true)}
                  aria-label={`Rename package ${pkg.name}`}
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
                  className="text-[11px] font-semibold text-text-secondary px-2 py-0.5 tabular-nums"
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
            aria-label={isExpanded ? "Collapse package documents" : "Expand package documents"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Document List */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden pt-2 border-t border-border/60 space-y-3"
          >
            {pkg.documents.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/80 p-6 text-center bg-surface-alt/20">
                <FileText className="mx-auto h-6 w-6 text-text-tertiary mb-1" />
                <p className="text-xs font-medium text-text-secondary">No documents in this package yet</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onAddDocuments}
                  className="mt-2 text-xs font-semibold gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> Add documents
                </Button>
              </div>
            ) : (
              <>
                {/* Batch Actions Toolbar */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleSelectAllToggle}
                      className="h-7 text-xs text-text-secondary hover:text-text-primary gap-1 px-2 font-medium cursor-pointer"
                    >
                      {isAllSelected ? (
                        <>
                          <CheckSquare className="h-3.5 w-3.5 text-brand" /> Deselect all
                        </>
                      ) : (
                        <>
                          <Square className="h-3.5 w-3.5" /> Select all
                        </>
                      )}
                    </Button>
                    {selectedDocIds.length > 0 && (
                      <span className="text-[11px] text-text-secondary font-medium tabular-nums">
                        ({selectedDocIds.length} of {pkg.documents.length} selected)
                      </span>
                    )}
                  </div>

                  <AnimatePresence>
                    {selectedDocIds.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isRemoving}
                          onClick={handleBulkRemove}
                          className="h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive gap-1.5 font-semibold cursor-pointer"
                        >
                          {isRemoving ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          Remove {selectedDocIds.length}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid gap-2">
                  {pkg.documents.map((doc) => {
                    const isItemRemoving =
                      removingSingleDocId === doc.id || (isRemoving && selectedDocIds.includes(doc.id));
                    const isChecked = selectedDocIds.includes(doc.id);

                    return (
                      <div
                        key={doc.id}
                        className={`flex items-center justify-between gap-3 rounded-xl border border-border/60 p-2.5 px-3 transition-colors ${
                          isChecked ? "bg-brand/5 border-brand/40" : "bg-surface-alt/30 hover:bg-surface-alt/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => toggleSelectDoc(doc.id)}
                            aria-label={`Select ${doc.original_name}`}
                            className="mr-1"
                          />
                          <FileText className="h-4 w-4 shrink-0 text-brand" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span
                                className="font-medium text-text-primary truncate max-w-[180px] sm:max-w-[280px]"
                                title={doc.original_name}
                              >
                                {doc.original_name}
                              </span>
                              <span className="text-[11px] text-text-secondary capitalize font-mono">
                                • {doc.document_type.replace(/[-_]/g, " ")}
                              </span>
                              <span className="text-[11px] text-text-secondary font-mono tabular-nums">
                                • {formatFileSize(doc.file_size_bytes)}
                              </span>
                            </div>
                          </div>
                          <DocumentQualityBadge document={doc} />
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Remove ${doc.original_name} from package ${pkg.name}`}
                          title="Remove from package"
                          disabled={isItemRemoving}
                          onClick={() => handleRemoveSingle(doc.id)}
                          className="h-7 w-7 text-text-secondary hover:text-destructive hover:bg-destructive/10 shrink-0 cursor-pointer"
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
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disband Confirmation Dialog */}
      <AlertDialog open={disbandDialogOpen} onOpenChange={setDisbandDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disband {pkg.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the package bundle, but keeps all its documents safe in your
              Documents list. No files will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDisbanding}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDisband}
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

      {/* Removal Confirmation Dialog */}
      <AlertDialog
        open={Boolean(pendingRemovalDocIds && pendingRemovalDocIds.length > 0)}
        onOpenChange={(open) => {
          if (!open) setPendingRemovalDocIds(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingRemovalDocIds?.length === 1
                ? `Remove Document from ${pkg.name}?`
                : `Remove ${pendingRemovalDocIds?.length} Documents from ${pkg.name}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This removes the selected {pendingRemovalDocIds?.length === 1 ? "document" : "documents"} from this package. The documents themselves will remain in your Documents list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemoval}
              disabled={isRemoving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRemoving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Removing…
                </>
              ) : (
                "Remove from Package"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
