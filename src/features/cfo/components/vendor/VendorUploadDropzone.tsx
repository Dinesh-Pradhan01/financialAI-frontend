import React, { useCallback, useState } from "react";
import { UploadCloud, BriefcaseBusiness, Loader2, AlertTriangle, FileX, FileSpreadsheet } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useVendorUpload } from "../../hooks/useVendor";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { setVendorPreview, setVendorStep, discardVendorPreview } from "@/shared/store/slices/cfoSlice";
import { VendorManualEntryGrid } from "./VendorManualEntryGrid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";

export function VendorUploadDropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [invalidTemplate, setInvalidTemplate] = useState<{
    missing: string[];
    unsupported: string[];
  } | null>(null);

  const uploadMutation = useVendorUpload();
  const dispatch = useAppDispatch();
  const backendPreview = useAppSelector((state) => state.cfo.vendor.backendPreview);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const processFile = useCallback(
    (file: File) => {
      setUploadError(null);
      setInvalidTemplate(null);
      setProgress(0);

      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        setUploadError("Please upload a valid Excel file (.xlsx or .xls)");
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        setUploadError("File is too large. Max size is 20MB.");
        return;
      }

      uploadMutation.mutate(
        {
          file,
          onProgress: (e) => {
            if (e.total) {
              // Cap progress at 80% while file is transferring, remaining 20% is for backend processing
              setProgress(Math.min(80, Math.round((e.loaded * 100) / e.total)));
            }
          },
        },
        {
          onSuccess: (res) => {
            setProgress(100);
            const resData = res.data;
            const data = resData?.data || resData;
            const rawRecords = Array.isArray(data.records) ? data.records : [];
            const autoFixedRowIds = new Set<string>();
            const records = rawRecords.map((r: any, idx: number) => {
              const contractType = r.contractType || r.contract_type || "";
              const isSub =
                String(contractType).toLowerCase().includes("sub") ||
                String(r.frequency || "").toLowerCase().includes("sub") ||
                String(r.recurring || "").toLowerCase() === "true" ||
                String(r.recurring || "").toLowerCase() === "yes" ||
                String(r.recurring || "") === "1";

              const contractVal = Number(r.contractValue ?? r.contract_value ?? 0);
              let monthlyCostVal = r.monthlyCost ?? r.monthly_cost ?? r.cost;

              // If monthly cost is missing and it's subscription: contract_value / 12
              if (
                (monthlyCostVal === "" ||
                  monthlyCostVal == null ||
                  Number(monthlyCostVal) === 0 ||
                  isNaN(Number(monthlyCostVal))) &&
                isSub &&
                contractVal > 0
              ) {
                monthlyCostVal = Math.round((contractVal / 12) * 100) / 100;
                autoFixedRowIds.add(String(r.rowId || `row_${idx + 1}`));
              }

              return {
                ...r,
                vendorId: r.vendorId || r.vendor_id || "",
                vendorName: r.vendorName || r.vendor_name || "",
                vendor_id: r.vendor_id || r.vendorId || "",
                vendor_name: r.vendor_name || r.vendorName || "",
                contractId: r.contractId || r.contract_id || "",
                contract_id: r.contract_id || r.contractId || "",
                registrationNumber: r.registrationNumber || r.registration_number || "",
                taxId: r.taxId || r.tax_id || "",
                primaryContactName: r.primaryContactName || r.primary_contact_name || "",
                postalCode: r.postalCode || r.postal_code || "",
                contractStartDate: r.contractStartDate || r.contract_start_date || "",
                contractEndDate: r.contractEndDate || r.contract_end_date || "",
                contractType,
                contract_type: contractType,
                contractValue: contractVal || r.contractValue || r.contract_value || "",
                contract_value: contractVal || r.contract_value || r.contractValue || "",
                monthlyCost: monthlyCostVal ?? "",
                monthly_cost: monthlyCostVal ?? "",
                cost: monthlyCostVal ?? "",
                paymentTerms: r.paymentTerms || r.payment_terms || "",
                paymentType: r.paymentType || r.payment_type || "",
                bankName: r.bankName || r.bank_name || "",
                accountNumber: r.accountNumber || r.account_number || "",
                ifscCode: r.ifscCode || r.ifsc_code || "",
                swiftCode: r.swiftCode || r.swift_code || "",
                status: r.status || "Active",
              };
            });

            const rawSummary = data.summary || data.validation;
            const rawIssues = Array.isArray(rawSummary?.issues) ? rawSummary.issues : [];
            const filteredIssues = rawIssues.filter((issue: any) => {
              if (autoFixedRowIds.has(String(issue.rowId))) {
                const f = String(issue.field || "").toLowerCase().replace(/_/g, "");
                if (f.includes("monthly") || f.includes("cost")) return false;
              }
              return true;
            });
            const remainingErrorRowIds = (
              Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : []
            ).filter((rId: string) => {
              return filteredIssues.some(
                (issue: any) => String(issue.rowId) === String(rId) && issue.severity === "error",
              );
            });

            const summary = {
              validVendors: records.length - remainingErrorRowIds.length,
              warnings: filteredIssues.filter((i: any) => i.severity === "warning").length,
              errors: filteredIssues.filter((i: any) => i.severity === "error").length,
              issues: filteredIssues,
              errorRowIds: remainingErrorRowIds,
              warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
              duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
              missingRequiredFields: remainingErrorRowIds.length,
            };
            dispatch(
              setVendorPreview({
                ...data,
                records,
                summary,
                validation: summary,
              }),
            );
            
            // Wait briefly for the progress bar to show 100% before transitioning
            setTimeout(() => {
              dispatch(setVendorStep("preview"));
            }, 600);
          },
          onError: (err: unknown) => {
            const axiosErr = err as {
              response?: {
                status?: number;
                data?: {
                  detail?: {
                    message?: string;
                    missing_columns?: string[];
                    unsupported_columns?: string[];
                  } | string;
                  message?: string;
                };
              };
              message?: string;
            };

            const detail = axiosErr.response?.data?.detail;
            if (typeof detail === "object" && detail !== null) {
              const missing = detail.missing_columns || [];
              const unsupported = detail.unsupported_columns || [];
              if (missing.length > 0 || unsupported.length > 0) {
                setInvalidTemplate({ missing, unsupported });
                return;
              }
            }

            const errorMsg =
              typeof detail === "string"
                ? detail
                : axiosErr.response?.data?.message ||
                  axiosErr.message ||
                  "An error occurred while uploading the file.";
            setUploadError(errorMsg);
          },
        },
      );
    },
    [uploadMutation, dispatch],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    },
    [processFile],
  );

  const isUploading = uploadMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Existing draft alert */}
      {backendPreview && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-violet-500/20 bg-violet-500/5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">You have a draft preview available</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Continue working on your previously validated vendor dataset.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => dispatch(discardVendorPreview())}
              className="flex-1 sm:flex-none inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition"
            >
              Discard
            </button>
            <button
              onClick={() => dispatch(setVendorStep("preview"))}
              className="flex-1 sm:flex-none inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition"
            >
              Resume Preview
            </button>
          </div>
        </div>
      )}

      {/* Dropzone Container */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-surface hover:bg-surface-alt",
          isUploading && "pointer-events-none opacity-80",
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
          <BriefcaseBusiness className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-bold text-foreground">Drop your Vendor Excel file here</h3>
        <p className="mt-2 text-sm text-text-secondary text-center max-w-sm">
          Supports .xlsx and .xls formats up to 20MB. Make sure your file matches the required
          template structure.
        </p>

        {uploadError && (
          <div className="mt-6 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span>{uploadError}</span>
          </div>
        )}

        {isUploading ? (
          <div className="mt-8 w-full max-w-sm space-y-3">
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-foreground flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Uploading...
              </span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <input
              type="file"
              id="file-upload-vendor"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={(e) => {
                if (e.target.files?.[0]) processFile(e.target.files[0]);
              }}
            />
            <label
              htmlFor="file-upload-vendor"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-brand hover:bg-primary-hover transition cursor-pointer"
            >
              <UploadCloud className="mr-2 h-5 w-5" />
              Browse Files
            </label>
          </div>
        )}
      </div>

      <div className="my-10 flex items-center gap-4">
        <div className="h-px bg-border flex-1" />
        <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          OR
        </span>
        <div className="h-px bg-border flex-1" />
      </div>

      <VendorManualEntryGrid />

      {/* Invalid Template Dialog */}
      <Dialog open={!!invalidTemplate} onOpenChange={() => setInvalidTemplate(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <FileX className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center text-xl">Invalid Template</DialogTitle>
            <DialogDescription className="text-center">
              The uploaded file doesn't match the required format.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 space-y-4 text-sm">
            {invalidTemplate?.missing && invalidTemplate.missing.length > 0 && (
              <div>
                <p className="font-semibold text-foreground flex items-center gap-1.5 mb-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                    !
                  </span>
                  Missing Required Columns:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {invalidTemplate.missing.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-border bg-surface-alt px-2 py-1 text-xs text-text-secondary"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {invalidTemplate?.unsupported && invalidTemplate.unsupported.length > 0 && (
              <div>
                <p className="font-semibold text-foreground flex items-center gap-1.5 mb-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white">
                    ?
                  </span>
                  Unrecognized Columns:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {invalidTemplate.unsupported.map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-border bg-surface-alt px-2 py-1 text-xs text-text-secondary"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-between">
            <button
              onClick={() => {
                alert("Downloading template...");
              }}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-text-secondary hover:bg-surface-alt transition"
            >
              Download Template
            </button>
            <button
              onClick={() => setInvalidTemplate(null)}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-brand transition hover:bg-primary-hover"
            >
              Upload Another
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
