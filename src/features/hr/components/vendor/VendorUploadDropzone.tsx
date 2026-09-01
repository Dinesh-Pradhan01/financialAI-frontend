import React, { useCallback, useState } from "react";
import { UploadCloud, BriefcaseBusiness, Loader2, AlertTriangle, FileX, FileSpreadsheet } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useVendorUpload } from "../../hooks/useVendor";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { setVendorPreview, setVendorStep, discardVendorPreview } from "@/shared/store/slices/hrSlice";
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
  const backendPreview = useAppSelector((state) => state.hr.vendor.backendPreview);

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
            const records = rawRecords.map((r: any) => ({
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
              contractType: r.contractType || r.contract_type || "",
              paymentTerms: r.paymentTerms || r.payment_terms || "",
              paymentType: r.paymentType || r.payment_type || "",
              bankName: r.bankName || r.bank_name || "",
              accountNumber: r.accountNumber || r.account_number || "",
              ifscCode: r.ifscCode || r.ifsc_code || "",
              swiftCode: r.swiftCode || r.swift_code || "",
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
            dispatch(setVendorPreview({
              ...data,
              records,
              summary,
              validation: summary
            }));
            
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
                  missing_columns?: string[];
                  unsupported_columns?: string[];
                  message?: string;
                };
              };
              message?: string;
            };
            const status = axiosErr.response?.status;
            const data = axiosErr.response?.data;

            if (status === 400 && data?.missing_columns) {
              setInvalidTemplate({
                missing: data.missing_columns || [],
                unsupported: data.unsupported_columns || [],
              });
            } else {
              setUploadError(data?.message || axiosErr.message || "Failed to upload file");
            }
          },
        },
      );
    },
    [dispatch, uploadMutation],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile],
  );

  const isUploading = uploadMutation.isPending;

  return (
    <div className="space-y-6">
      {backendPreview && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Unsaved edits detected</h3>
              <p className="text-xs text-text-secondary mt-0.5">
                You have a pending import for <strong>{(backendPreview as any).file_meta?.name || "manual data"}</strong> with unsaved changes.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => dispatch(discardVendorPreview())}
              className="flex-1 sm:flex-none h-9 px-4 rounded-lg border border-border bg-surface text-xs font-semibold text-text-secondary hover:bg-surface-alt transition"
            >
              Discard
            </button>
            <button
              onClick={() => dispatch(setVendorStep("preview"))}
              className="flex-1 sm:flex-none h-9 px-4 rounded-lg bg-primary text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition"
            >
              Resume Session
            </button>
          </div>
        </div>
      )}

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
