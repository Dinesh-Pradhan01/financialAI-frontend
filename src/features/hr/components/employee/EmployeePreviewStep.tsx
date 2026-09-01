import React, { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { setEmployeeFilters, setEmployeeStep } from "@/shared/store/slices/hrSlice";
import { EmployeePreviewTable } from "./EmployeePreviewTable";
import { EmployeeValidationPanel } from "./EmployeeValidationPanel";
import { EmployeeStickyFooter } from "./EmployeeStickyFooter";
import { Card } from "@/shared/components/ui/card";
import { Search, Undo2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { undoEmployeeEdit } from "@/shared/store/slices/hrSlice";
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
  EmployeeRecord,
  ValidationSummary,
  EmployeePreviewResponse,
} from "../../types/employee";

export function EmployeePreviewStep() {
  const dispatch = useAppDispatch();
  const rawBackendPreview = useAppSelector((state) => state.hr.employee.backendPreview);
  const pastPreviews = useAppSelector((state) => state.hr.employee.pastPreviews);
  const backendPreview = rawBackendPreview as EmployeePreviewResponse | null;
  const filters = useAppSelector((state) => state.hr.employee.filters);

  const records = useMemo<EmployeeRecord[]>(
    () => backendPreview?.records || [],
    [backendPreview?.records],
  );
  const rawSummary = (backendPreview?.summary || backendPreview?.validation) as any;
  const validation: ValidationSummary = {
    validEmployees: typeof rawSummary?.validEmployees === "number" ? rawSummary.validEmployees : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
    errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
    warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
    duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
    issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
    errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
    warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
    missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0,
  };

  // Reconstruct Sets because they are not serializable in Redux
  const errorRowIds = new Set<string>(validation.errorRowIds || []);
  const warningRowIds = new Set<string>(validation.warningRowIds || []);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const name = r.employeeName || (r as any).employee_name || "";
      const id = r.employeeId || (r as any).employee_id || "";
      if (
        filters.search &&
        !name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !id.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.department && r.department !== filters.department) return false;
      if (filters.status && r.status !== filters.status) return false;
      return true;
    });
  }, [records, filters]);

  const uniqueDepartments = useMemo(
    () => Array.from(new Set(records.map((r) => r.department).filter(Boolean))),
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
            onClick={() => dispatch(undoEmployeeEdit())}
            disabled={pastPreviews.length === 0}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Undo2 className="h-3.5 w-3.5 mr-1.5" />
            Undo
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white shadow-brand transition hover:bg-primary-hover"
              >
                Upload New File
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md bg-surface border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground text-base font-semibold">
                  Overwrite Current Data?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-text-secondary pt-1">
                  Uploading a new file will overwrite current data completely. Do you wish to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row items-center justify-end gap-3 mt-4">
                <AlertDialogAction
                  onClick={() => dispatch(setEmployeeStep("upload"))}
                  className="bg-transparent border border-border text-text-secondary hover:bg-surface-alt hover:text-foreground shadow-none font-medium text-xs h-9 px-4 rounded-lg"
                >
                  Continue
                </AlertDialogAction>
                <AlertDialogCancel
                  className="bg-primary text-white hover:bg-primary-hover border-0 mt-0 font-semibold text-xs h-9 px-5 rounded-lg shadow-sm"
                >
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
          value={validation.validEmployees}
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
      {validation.issues?.length > 0 && <EmployeeValidationPanel issues={validation.issues} />}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={filters.search}
            onChange={(e) => dispatch(setEmployeeFilters({ ...filters, search: e.target.value }))}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
        <select
          value={filters.department}
          onChange={(e) => dispatch(setEmployeeFilters({ ...filters, department: e.target.value }))}
          className="h-10 px-3 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) => dispatch(setEmployeeFilters({ ...filters, status: e.target.value }))}
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
      <EmployeePreviewTable
        employees={filteredRecords}
        errorRowIds={errorRowIds}
        warningRowIds={warningRowIds}
      />

      <EmployeeStickyFooter
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
