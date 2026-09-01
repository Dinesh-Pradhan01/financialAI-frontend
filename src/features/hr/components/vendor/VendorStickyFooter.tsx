import React, { useState } from "react";
import { useAppDispatch } from "@/shared/store";
import { resetVendor, setVendorPreview } from "@/shared/store/slices/hrSlice";
import { useVendorImport } from "../../hooks/useVendor";
import { vendorApi } from "../../api/vendorApi";
import { CheckCircle2, Loader2, Undo2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import type { VendorPreviewResponse } from "../../types/vendor";

export function VendorStickyFooter({
  recordCount,
  errorCount,
  backendPreview,
}: {
  recordCount: number;
  errorCount: number;
  backendPreview: VendorPreviewResponse;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const importMutation = useVendorImport();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);

  const handleCancel = () => {
    dispatch(resetVendor());
    navigate({ to: "/hr" });
  };

  const handleImport = async () => {
    if (!backendPreview || !backendPreview.records) return;
    
    try {
      setIsRevalidating(true);
      const res = await vendorApi.previewManual(backendPreview.records);
      const resData = res.data;
      const data = resData?.data || resData;
      
      const rawRecords = Array.isArray(data.records) ? data.records : [];
      const records = rawRecords.map((r: any) => ({
        ...r,
        vendorId: r.vendorId || r.vendor_id || "",
        vendorName: r.vendorName || r.vendor_name || "",
        contractId: r.contractId || r.contract_id || "",
        status: r.status || "Active",
      }));
      
      const rawSummary = data.summary || data.validation;
      const summary = {
        validVendors: typeof rawSummary?.validVendors === "number" ? rawSummary.validVendors : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
        warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
        errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
        issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
        errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
        warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
        duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
        missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0,
      };

      const freshPreview = {
        ...data,
        records,
        summary,
        validation: summary,
      };
      
      dispatch(setVendorPreview(freshPreview));
      
      if (freshPreview.summary.errors > 0) {
        toast.error(`Found ${freshPreview.summary.errors} errors during validation. Please fix them.`);
        setIsRevalidating(false);
        return;
      }

      importMutation.mutate(freshPreview, {
        onSuccess: () => {
          setShowSuccess(true);
        },
        onError: (err: any) => {
          // Keep user on preview page — do NOT reset or navigate away
          const msg =
            err?.response?.data?.detail ||
            err?.response?.data?.message ||
            err?.message ||
            "Import failed due to a server error. Your data is safe — please try again.";
          toast.error(msg, { duration: 6000 });
        },
        onSettled: () => {
          setIsRevalidating(false);
        },
      });
    } catch (e: any) {
      // Network / pre-flight error — data is still in Redux, do not reset
      toast.error(
        e?.message || "Failed to reach the server. Your data is safe — please try again.",
        { duration: 6000 },
      );
      setIsRevalidating(false);
    }
  };

  const hasErrors = errorCount > 0;
  const isPending = importMutation.isPending || isRevalidating;

  return (
    <>
      <div className="sticky bottom-6 z-30 mx-auto w-full max-w-4xl bg-surface/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl mt-12">
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-foreground">{recordCount} vendors ready</p>
            {hasErrors ? (
              <p className="text-sm text-destructive font-medium mt-0.5">
                Resolve {errorCount} errors before importing
              </p>
            ) : (
              <p className="text-sm text-text-secondary mt-0.5">All validations passed</p>
            )}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCancel}
              className="flex-1 sm:flex-none inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-text-secondary hover:bg-surface-alt transition shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={hasErrors || isPending}
              className="flex-1 sm:flex-none inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-brand transition hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                "Import Data"
              )}
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={showSuccess}
        onOpenChange={(open) => {
          if (!open) {
            setShowSuccess(false);
            handleCancel();
          }
        }}
      >
        <DialogContent className="max-w-sm text-center p-6">
          <DialogHeader className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="text-2xl font-bold">Import Successful!</DialogTitle>
          </DialogHeader>
          <p className="my-4 text-text-secondary text-sm">
            Successfully imported {recordCount} vendor records into the system.
          </p>
          <button
            onClick={handleCancel}
            className="w-full inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-brand transition hover:bg-primary-hover"
          >
            Done
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
