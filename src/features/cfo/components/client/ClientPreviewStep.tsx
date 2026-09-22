import React, { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { setClientFilters, setClientStep, undoClientEdit } from "@/shared/store/slices/cfoSlice";
import { ClientPreviewTable } from "./ClientPreviewTable";
import { ClientValidationPanel } from "./ClientValidationPanel";
import { ClientStickyFooter } from "./ClientStickyFooter";
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
  ClientRecord,
  ClientValidationSummary,
  ClientPreviewResponse,
} from "../../types/client";

export function ClientPreviewStep() {
  const dispatch = useAppDispatch();
  const rawBackendPreview = useAppSelector((state) => state.cfo.client.backendPreview);
  const pastPreviews = useAppSelector((state) => state.cfo.client.pastPreviews);
  const backendPreview = rawBackendPreview as ClientPreviewResponse | null;
  const filters = useAppSelector((state) => state.cfo.client.filters);

  const records = useMemo<ClientRecord[]>(
    () => backendPreview?.records || [],
    [backendPreview?.records],
  );

  const rawSummary = (backendPreview?.summary || backendPreview?.validation) as any;
  const validation: ClientValidationSummary = {
    validClients:
      typeof rawSummary?.validClients === "number"
        ? rawSummary.validClients
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

  const categories = useMemo(() => {
    const set = new Set<string>();
    records.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set);
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          (r.clientName || r.client_name || "").toLowerCase().includes(q) ||
          (r.clientId || r.client_id || "").toLowerCase().includes(q) ||
          (r.contractId || r.contract_id || "").toLowerCase().includes(q) ||
          (r.category || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.category && r.category !== filters.category) {
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
        <div className="flex items-center justify-between rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-2.5">
          <span className="text-xs text-indigo-700 font-medium">
            You have unsaved changes in this session.
          </span>
          <button
            onClick={() => dispatch(undoClientEdit())}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition"
          >
            <Undo2 className="h-3.5 w-3.5" />
            Undo edit
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <Card className="p-3 border-border shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search clients by ID, name, category, or contract..."
              value={filters.search}
              onChange={(e) => dispatch(setClientFilters({ ...filters, search: e.target.value }))}
              className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {categories.length > 0 && (
              <select
                value={filters.category}
                onChange={(e) =>
                  dispatch(setClientFilters({ ...filters, category: e.target.value }))
                }
                className="h-9 rounded-lg border border-border bg-surface px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}

            <select
              value={filters.status}
              onChange={(e) =>
                dispatch(setClientFilters({ ...filters, status: e.target.value }))
              }
              className="h-9 rounded-lg border border-border bg-surface px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="h-9 whitespace-nowrap rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition">
                  Re-upload
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Start a new upload?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Any uncommitted changes made in this preview session will be discarded.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => dispatch(setClientStep("upload"))}
                    className="bg-primary text-white hover:bg-primary-hover"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>

      {/* Issues Panel */}
      <ClientValidationPanel issues={validation.issues} />

      {/* Preview Table */}
      <div className="rounded-xl border border-border bg-surface shadow-xs overflow-hidden">
        <ClientPreviewTable
          clients={filteredRecords}
          errorRowIds={errorRowIds}
          warningRowIds={warningRowIds}
        />
      </div>

      {/* Sticky Import Bar */}
      {backendPreview && (
        <ClientStickyFooter
          recordCount={records.length}
          errorCount={validation.errors}
          backendPreview={backendPreview}
        />
      )}
    </div>
  );
}
