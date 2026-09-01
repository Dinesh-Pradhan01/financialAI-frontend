import React, { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { setVendorFilters, setVendorStep, undoVendorEdit } from "@/shared/store/slices/hrSlice";
import { VendorPreviewTable } from "./VendorPreviewTable";
import { VendorValidationPanel } from "./VendorValidationPanel";
import { VendorStickyFooter } from "./VendorStickyFooter";
import { Card } from "@/shared/components/ui/card";
import { Search, Undo2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import type {
  VendorRecord,
  VendorValidationSummary,
  VendorPreviewResponse,
} from "../../types/vendor";

export function VendorPreviewStep() {
  const dispatch = useAppDispatch();
  const rawBackendPreview = useAppSelector((state) => state.hr.vendor.backendPreview);
  const pastPreviews = useAppSelector((state) => state.hr.vendor.pastPreviews);
  const backendPreview = rawBackendPreview as VendorPreviewResponse | null;
  const filters = useAppSelector((state) => state.hr.vendor.filters);
  const records = useMemo<VendorRecord[]>(
    () => backendPreview?.records || [],
    [backendPreview?.records],
  );
  const rawSummary = (backendPreview?.summary || backendPreview?.validation) as any;
  const validation: VendorValidationSummary = {
    validVendors:
      typeof rawSummary?.validVendors === "number"
        ? rawSummary.validVendors
        : typeof rawSummary?.validRecords === "number"
          ? rawSummary.validRecords
          : records.length,
    errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
    warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
    duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
    issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
    errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
    warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
    missingRequiredFields:
      typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0,
  };

  const errorRowIds = new Set<string>(validation.errorRowIds || []);
  const warningRowIds = new Set<string>(validation.warningRowIds || []);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const name = r.vendorName || (r as any).vendor_name || "";
      const id = r.vendorId || (r as any).vendor_id || "";
      if (
        filters.search &&
        !name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !id.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.industry && r.industry !== filters.industry) return false;
      if (filters.status && r.status !== filters.status) return false;
      return true;
    });
  }, [records, filters]);

  const uniqueIndustries = useMemo(
    () => Array.from(new Set(records.map((r) => r.industry).filter(Boolean))),
    [records],
  );
  const uniqueStatuses = useMemo(
    () => Array.from(new Set(records.map((r) => r.status).filter(Boolean))),
    [records],
  );

  if (!backendPreview) return null;

  return (
    <div className="space-y-6">
      {/* Upload Summary */}
      <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-border shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {backendPreview.file_meta?.name || "Manual Entry Data"}
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {records.length} records ready for review.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(undoVendorEdit())}
            disabled={pastPreviews.length === 0}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Undo2 className="h-3.5 w-3.5 mr-1.5" />
            Undo
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white shadow-brand transition hover:bg-primary-hover">
                Upload New File
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md bg-surface border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground text-base font-semibold">
                  Overwrite Current Data?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-text-secondary pt-1">
                  Uploading a new file will overwrite current data completely. Do you wish to
                  continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row items-center justify-end gap-3 mt-4">
                <AlertDialogAction
                  onClick={() => dispatch(setVendorStep("upload"))}
                  className="bg-transparent border border-border text-text-secondary hover:bg-surface-alt hover:text-foreground shadow-none font-medium text-xs h-9 px-4 rounded-lg"
                >
                  Continue
                </AlertDialogAction>
                <AlertDialogCancel className="bg-primary text-white hover:bg-transparent hover:text-primary  border-2 border-primary mt-0 font-semibold text-xs h-9 px-5 rounded-lg shadow-brand">
                  No
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Valid"
          value={validation.validVendors}
          tone="text-emerald-600 bg-emerald-50 border-emerald-100"
        />
        <StatCard
          label="Errors"
          value={validation.errors}
          tone="text-destructive bg-destructive/10 border-destructive/20"
        />
        <StatCard
          label="Warnings"
          value={validation.warnings}
          tone="text-amber-600 bg-amber-50 border-amber-100"
        />
        <StatCard
          label="Duplicates"
          value={validation.duplicateIds}
          tone="text-slate-600 bg-slate-50 border-slate-200"
        />
      </div>

      {/* Validation Panel */}
      {validation.issues?.length > 0 && <VendorValidationPanel issues={validation.issues} />}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={filters.search}
            onChange={(e) => dispatch(setVendorFilters({ ...filters, search: e.target.value }))}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
        <select
          value={filters.industry}
          onChange={(e) => dispatch(setVendorFilters({ ...filters, industry: e.target.value }))}
          className="h-10 px-3 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Industries</option>
          {uniqueIndustries.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) => dispatch(setVendorFilters({ ...filters, status: e.target.value }))}
          className="h-10 px-3 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Statuses</option>
          {uniqueStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <VendorPreviewTable
        vendors={filteredRecords}
        errorRowIds={errorRowIds}
        warningRowIds={warningRowIds}
      />

      <VendorStickyFooter
        recordCount={records.length}
        errorCount={validation.errors}
        backendPreview={backendPreview}
      />
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-4 rounded-xl border", tone)}>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-80">
        {label}
      </span>
    </div>
  );
}
