import React, { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { setVendorFilters, setVendorStep, undoVendorEdit } from "@/shared/store/slices/cfoSlice";
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
  const rawBackendPreview = useAppSelector((state) => state.cfo.vendor.backendPreview);
  const pastPreviews = useAppSelector((state) => state.cfo.vendor.pastPreviews);
  const backendPreview = rawBackendPreview as VendorPreviewResponse | null;
  const filters = useAppSelector((state) => state.cfo.vendor.filters);
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
    issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
    errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
    warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
    duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
    missingRequiredFields:
      typeof rawSummary?.missingRequiredFields === "number"
        ? rawSummary.missingRequiredFields
        : 0,
  };

  const industries = useMemo(() => {
    const set = new Set<string>();
    records.forEach((r) => {
      if (r.industry) set.add(r.industry);
    });
    return Array.from(set);
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          (r.vendorName || "").toLowerCase().includes(q) ||
          (r.vendorId || "").toLowerCase().includes(q) ||
          (r.contractId || "").toLowerCase().includes(q) ||
          (r.email || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.industry && r.industry !== filters.industry) {
        return false;
      }
      if (filters.status && r.status !== filters.status) {
        return false;
      }
      return true;
    });
  }, [records, filters]);

  const errorRowIds = useMemo(() => new Set(validation.errorRowIds || []), [validation.errorRowIds]);
  const warningRowIds = useMemo(
    () => new Set(validation.warningRowIds || []),
    [validation.warningRowIds],
  );

  return (
    <div className="space-y-6">
      {/* Undo banner */}
      {pastPreviews.length > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-violet-500/10 border border-violet-500/20 px-4 py-2.5">
          <span className="text-xs text-violet-700 font-medium">
            You have unsaved changes in this session.
          </span>
          <button
            onClick={() => dispatch(undoVendorEdit())}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-800 transition"
          >
            <Undo2 className="h-3.5 w-3.5" />
            Undo Last Edit
          </button>
        </div>
      )}

      {/* Validation Panel */}
      {validation.issues && validation.issues.length > 0 && (
        <VendorValidationPanel issues={validation.issues} />
      )}

      {/* Filters Bar */}
      <Card className="p-4 border-border shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search in preview records..."
              value={filters.search}
              onChange={(e) => dispatch(setVendorFilters({ ...filters, search: e.target.value }))}
              className="w-full pl-9 pr-4 py-2 bg-surface-alt/50 border border-border rounded-xl text-xs outline-none focus:border-violet-500 transition"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={filters.industry}
              onChange={(e) => dispatch(setVendorFilters({ ...filters, industry: e.target.value }))}
              className="h-9 px-3 bg-surface-alt/50 border border-border rounded-xl text-xs outline-none focus:border-violet-500"
            >
              <option value="">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => dispatch(setVendorFilters({ ...filters, status: e.target.value }))}
              className="h-9 px-3 bg-surface-alt/50 border border-border rounded-xl text-xs outline-none focus:border-violet-500"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="h-9 px-4 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10 text-xs font-semibold transition shrink-0">
                  Re-upload
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Start Over?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will discard all current preview records and manual edits. You will return
                    to the upload screen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => dispatch(setVendorStep("upload"))}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Discard &amp; Upload
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>

      {/* Preview Table */}
      <VendorPreviewTable
        vendors={filteredRecords}
        errorRowIds={errorRowIds}
        warningRowIds={warningRowIds}
        schemaDef={backendPreview?.schema_def}
      />

      {/* Sticky footer for submit */}
      {backendPreview && (
        <VendorStickyFooter
          recordCount={records.length}
          errorCount={validation.errors}
          backendPreview={backendPreview}
        />
      )}
    </div>
  );
}
