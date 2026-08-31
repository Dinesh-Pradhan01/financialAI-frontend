import React, { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileText, Shield, FileCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogPortal,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { useUploadDocument } from "../hooks/useDocuments";
import { KNOWN_DOCUMENT_SLOTS, type DocumentSlot } from "../lib/documentGuidance";
import { formatFileSize } from "../lib/documentPresentation";
import {
  buildUploadFormData,
  suggestLabelFromFilename,
  UPLOAD_CONSTRAINTS_LABEL,
} from "../lib/uploadHelpers";

export interface CategorizeUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | null;
  pendingRequiredSlots: DocumentSlot[];
  pendingRecommendedSlots: DocumentSlot[];
  onUploadComplete: () => void;
}

type CategoryType = "required" | "recommended" | "custom";

export function CategorizeUploadDialog({
  open,
  onOpenChange,
  file,
  pendingRequiredSlots,
  pendingRecommendedSlots,
  onUploadComplete,
}: CategorizeUploadDialogProps) {
  const uploadMutation = useUploadDocument();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("required");
  const [selectedSlotKey, setSelectedSlotKey] = useState<string>("");
  const [customLabel, setCustomLabel] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  // Initialize or reset selections whenever a new file is staged
  useEffect(() => {
    if (file) {
      setCustomLabel(suggestLabelFromFilename(file.name));
      if (pendingRequiredSlots.length > 0) {
        setSelectedCategory("required");
        setSelectedSlotKey(pendingRequiredSlots[0].typeKey);
      } else if (pendingRecommendedSlots.length > 0) {
        setSelectedCategory("recommended");
        setSelectedSlotKey(pendingRecommendedSlots[0].typeKey);
      } else {
        setSelectedCategory("custom");
      }
    }
  }, [file, pendingRequiredSlots, pendingRecommendedSlots]);

  // When changing category, auto-pick first available slot
  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
    if (category === "required" && pendingRequiredSlots.length > 0) {
      setSelectedSlotKey(pendingRequiredSlots[0].typeKey);
    } else if (category === "recommended" && pendingRecommendedSlots.length > 0) {
      setSelectedSlotKey(pendingRecommendedSlots[0].typeKey);
    }
  };

  const isSubmitDisabled = () => {
    if (!file || isUploading) return true;
    if (selectedCategory === "required") {
      return !selectedSlotKey || pendingRequiredSlots.length === 0;
    }
    if (selectedCategory === "recommended") {
      return !selectedSlotKey || pendingRecommendedSlots.length === 0;
    }
    if (selectedCategory === "custom") {
      return !customLabel.trim();
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    let documentType = "";
    let documentCategory = "";

    if (selectedCategory === "required") {
      const slot = KNOWN_DOCUMENT_SLOTS.find((s) => s.typeKey === selectedSlotKey);
      if (!slot) return;
      documentType = slot.typeKey;
      documentCategory = slot.category;
    } else if (selectedCategory === "recommended") {
      const slot = KNOWN_DOCUMENT_SLOTS.find((s) => s.typeKey === selectedSlotKey);
      if (!slot) return;
      documentType = slot.typeKey;
      documentCategory = slot.category;
    } else {
      if (!customLabel.trim()) return;
      documentType = customLabel.trim();
      documentCategory = "custom";
    }

    setIsUploading(true);
    try {
      const formData = buildUploadFormData(file, {
        documentType,
        documentCategory,
      });

      await uploadMutation.mutateAsync(formData);
      toast.success(`Uploaded ${file.name} successfully.`);
      onUploadComplete();
      onOpenChange(false);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Failed to upload document"));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* Backdrop overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Modal Header */}
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-display text-text-primary flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Upload className="h-4 w-4" />
              </div>
              Categorize Document
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary mt-0.5">
              Select where this document belongs or give it a custom label.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. File chip preview */}
            {file && (
              <div className="rounded-xl border border-border bg-surface-alt/40 p-3 text-xs flex items-center justify-between gap-3 min-w-0 w-full overflow-hidden">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <FileText className="h-4 w-4 text-brand shrink-0" />
                  <span
                    className="font-medium truncate text-text-primary block min-w-0"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                </div>
                <span className="text-text-secondary font-mono text-[11px] shrink-0">
                  {formatFileSize(file.size)}
                </span>
              </div>
            )}

            {/* 2. Category selection cards */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-text-primary">
                Category
              </Label>
              <div className="grid grid-cols-3 gap-2.5">
                {/* Required Card */}
                <motion.button
                  type="button"
                  whileHover={pendingRequiredSlots.length > 0 ? { y: -1 } : {}}
                  whileTap={pendingRequiredSlots.length > 0 ? { scale: 0.98 } : {}}
                  disabled={pendingRequiredSlots.length === 0}
                  onClick={() => handleCategorySelect("required")}
                  className={cn(
                    "flex flex-col p-3 rounded-xl border text-left transition relative select-none",
                    pendingRequiredSlots.length === 0
                      ? "opacity-50 cursor-not-allowed border-border/50 bg-surface-alt/40"
                      : selectedCategory === "required"
                      ? "border-brand bg-brand/5 ring-2 ring-brand/20 cursor-pointer shadow-xs"
                      : "border-border-c bg-surface hover:border-brand/40 cursor-pointer"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-xs text-text-primary">
                      Required
                    </span>
                    <Shield
                      className={cn(
                        "h-4 w-4",
                        selectedCategory === "required"
                          ? "text-brand"
                          : "text-text-secondary"
                      )}
                    />
                  </div>
                  <span className="text-[10px] text-text-secondary font-medium">
                    {pendingRequiredSlots.length > 0
                      ? `${pendingRequiredSlots.length} pending`
                      : "All uploaded"}
                  </span>
                </motion.button>

                {/* Recommended Card */}
                <motion.button
                  type="button"
                  whileHover={pendingRecommendedSlots.length > 0 ? { y: -1 } : {}}
                  whileTap={pendingRecommendedSlots.length > 0 ? { scale: 0.98 } : {}}
                  disabled={pendingRecommendedSlots.length === 0}
                  onClick={() => handleCategorySelect("recommended")}
                  className={cn(
                    "flex flex-col p-3 rounded-xl border text-left transition relative select-none",
                    pendingRecommendedSlots.length === 0
                      ? "opacity-50 cursor-not-allowed border-border/50 bg-surface-alt/40"
                      : selectedCategory === "recommended"
                      ? "border-brand bg-brand/5 ring-2 ring-brand/20 cursor-pointer shadow-xs"
                      : "border-border-c bg-surface hover:border-brand/40 cursor-pointer"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-xs text-text-primary">
                      Recommended
                    </span>
                    <FileCheck
                      className={cn(
                        "h-4 w-4",
                        selectedCategory === "recommended"
                          ? "text-brand"
                          : "text-text-secondary"
                      )}
                    />
                  </div>
                  <span className="text-[10px] text-text-secondary font-medium">
                    {pendingRecommendedSlots.length > 0
                      ? `${pendingRecommendedSlots.length} pending`
                      : "All uploaded"}
                  </span>
                </motion.button>

                {/* Custom Card */}
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategorySelect("custom")}
                  className={cn(
                    "flex flex-col p-3 rounded-xl border text-left transition cursor-pointer select-none",
                    selectedCategory === "custom"
                      ? "border-brand bg-brand/5 ring-2 ring-brand/20 shadow-xs"
                      : "border-border-c bg-surface hover:border-brand/40"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-xs text-text-primary">
                      Custom
                    </span>
                    <FileText
                      className={cn(
                        "h-4 w-4",
                        selectedCategory === "custom"
                          ? "text-brand"
                          : "text-text-secondary"
                      )}
                    />
                  </div>
                  <span className="text-[10px] text-text-secondary font-medium">
                    Custom label
                  </span>
                </motion.button>
              </div>
            </div>

            {/* 3. Conditional second step with animated transition */}
            <AnimatePresence mode="wait">
              {selectedCategory === "required" && (
                <motion.div
                  key="required-step"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-2"
                >
                  <Label className="text-xs font-semibold text-text-primary">
                    Select Required Filing Slot <span className="text-destructive">*</span>
                  </Label>
                  {pendingRequiredSlots.length === 0 ? (
                    <div className="rounded-xl border border-border-c bg-surface-alt/30 p-3.5 text-center text-xs text-text-secondary">
                      All required corporate filings are already uploaded.
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {pendingRequiredSlots.map((slot) => {
                        const isSelected = selectedSlotKey === slot.typeKey;
                        return (
                          <div
                            key={slot.typeKey}
                            onClick={() => setSelectedSlotKey(slot.typeKey)}
                            className={cn(
                              "p-2.5 rounded-xl border text-xs flex items-center justify-between transition cursor-pointer select-none",
                              isSelected
                                ? "border-brand bg-brand/5 ring-1 ring-brand/30 font-medium"
                                : "border-border-c bg-surface hover:border-brand/30"
                            )}
                          >
                            <div className="space-y-0.5 pr-2">
                              <p className="font-semibold text-xs text-text-primary">
                                {slot.label}
                              </p>
                              <p className="text-[11px] text-text-secondary leading-tight">
                                {slot.description}
                              </p>
                            </div>
                            <input
                              type="radio"
                              name="requiredSlotChoice"
                              checked={isSelected}
                              onChange={() => setSelectedSlotKey(slot.typeKey)}
                              className="text-brand focus:ring-brand shrink-0 cursor-pointer"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {selectedCategory === "recommended" && (
                <motion.div
                  key="recommended-step"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-2"
                >
                  <Label className="text-xs font-semibold text-text-primary">
                    Select Recommended Document Slot <span className="text-destructive">*</span>
                  </Label>
                  {pendingRecommendedSlots.length === 0 ? (
                    <div className="rounded-xl border border-border-c bg-surface-alt/30 p-3.5 text-center text-xs text-text-secondary">
                      All recommended corporate documents are already uploaded.
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-[36vh] overflow-y-auto pr-1">
                      {pendingRecommendedSlots.map((slot) => {
                        const isSelected = selectedSlotKey === slot.typeKey;
                        return (
                          <div
                            key={slot.typeKey}
                            onClick={() => setSelectedSlotKey(slot.typeKey)}
                            className={cn(
                              "p-2.5 rounded-xl border text-xs flex items-center justify-between transition cursor-pointer select-none",
                              isSelected
                                ? "border-brand bg-brand/5 ring-1 ring-brand/30 font-medium"
                                : "border-border-c bg-surface hover:border-brand/30"
                            )}
                          >
                            <div className="space-y-0.5 pr-2">
                              <p className="font-semibold text-xs text-text-primary">
                                {slot.label}
                              </p>
                              <p className="text-[11px] text-text-secondary leading-tight">
                                {slot.description}
                              </p>
                            </div>
                            <input
                              type="radio"
                              name="recommendedSlotChoice"
                              checked={isSelected}
                              onChange={() => setSelectedSlotKey(slot.typeKey)}
                              className="text-brand focus:ring-brand shrink-0 cursor-pointer"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {selectedCategory === "custom" && (
                <motion.div
                  key="custom-step"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-1.5"
                >
                  <Label
                    htmlFor="custom-doc-input-label"
                    className="text-xs font-semibold text-text-primary"
                  >
                    Document Type / Label <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="custom-doc-input-label"
                    required
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="e.g. Board Resolution, Trade License, Audit Report"
                    className="text-sm bg-surface"
                    disabled={isUploading}
                  />
                  <p className="text-[11px] text-text-tertiary font-mono pt-0.5">
                    {UPLOAD_CONSTRAINTS_LABEL}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 4. Footer actions */}
            <DialogFooter className="pt-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitDisabled()}
                className="bg-brand text-white hover:bg-brand/90 font-semibold text-xs gap-1.5 shadow-xs cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" /> Upload Document
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
