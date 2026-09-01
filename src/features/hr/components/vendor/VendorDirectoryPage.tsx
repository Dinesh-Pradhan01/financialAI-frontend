import { useState, useEffect } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { Building2, ChevronLeft, Trash2, MoreVertical, AlertTriangle } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useVendorDirectory } from "../../hooks/useVendorDirectory";
import { DirectoryToolbar } from "../shared/DirectoryToolbar";
import { StatusBadge } from "../shared/StatusBadge";
import { exportToExcel, ExportColumn } from "../shared/exportUtils";
import { cn } from "@/shared/lib/utils";
import type { VendorRecord } from "../../types/vendor";

const INDUSTRIES = [
  "All Industries",
  "Software / SaaS",
  "IT Services",
  "Consulting",
  "Marketing & Advertising",
  "Financial Services",
  "Logistics",
  "Facilities",
  "Hardware",
  "Telecommunications",
  "Legal",
  "Other",
];

const STATUSES = ["All Statuses", "Active", "Inactive", "Expired", "Pending"];

const RECURRING_OPTIONS = [
  { label: "All Recurrence", value: "all" },
  { label: "Recurring Only", value: "true" },
  { label: "One-off Only", value: "false" },
];

const CONTRACT_TYPES = [
  "All Contract Types",
  "Fixed Price",
  "Time & Material",
  "Retainer",
  "Milestone",
  "Subscription",
];

const EXPORT_COLUMNS: ExportColumn[] = [
  { header: "Vendor ID", key: "vendor_id", width: 16 },
  { header: "Vendor Name", key: "vendor_name", width: 24 },
  { header: "Contract ID", key: "contract_id", width: 18 },
  { header: "Industry", key: "industry", width: 20 },
  { header: "Status", key: "status", width: 14 },
  { header: "Recurring", key: "recurring", width: 14, type: "boolean" },
  { header: "Contract Type", key: "contract_type", width: 18 },
  { header: "Currency", key: "currency", width: 12 },
  { header: "Contract Value", key: "contract_value", width: 16, type: "number" },
  { header: "Start Date", key: "contract_start_date", width: 16, type: "date" },
  { header: "End Date", key: "contract_end_date", width: 16, type: "date" },
  { header: "Renewal Date", key: "renewal_date", width: 16, type: "date" },
  { header: "GST Number", key: "gst_number", width: 18 },
  { header: "PAN Number", key: "pan_number", width: 16 },
  { header: "Contact Name", key: "primary_contact_name", width: 20 },
  { header: "Email", key: "email", width: 26 },
  { header: "Phone", key: "phone", width: 16 },
];

function getDaysUntilExpiry(endDateStr?: string | null): number | null {
  if (!endDateStr) return null;
  try {
    const end = new Date(endDateStr);
    if (isNaN(end.getTime())) return null;
    const now = new Date();
    const diffMs = end.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  } catch {
    return null;
  }
}

export function VendorDirectoryPage() {
  const searchParams: any = (useSearch as any)({ strict: false }) || {};

  const {
    vendors,
    total,
    isLoading,
    isFetching,
    page,
    setPage,
    size,
    setSize,
    search,
    setSearch,
    industry,
    setIndustry,
    status,
    setStatus,
    recurring,
    setRecurring,
    contractType,
    setContractType,
    refetch,
    saveBatch,
    deleteBatch,
  } = useVendorDirectory({
    status: searchParams.status,
    industry: searchParams.industry,
    recurring: searchParams.recurring,
    search: searchParams.search,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [dirtyMap, setDirtyMap] = useState<Record<string, Partial<VendorRecord>>>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  // Keyboard shortcut for edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        setIsEditMode(true);
      } else if (e.key === "Escape" && isEditMode) {
        e.preventDefault();
        handleCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditMode]);

  const dirtyCount = Object.keys(dirtyMap).length;

  const handleCellChange = (id: string, field: string, val: any) => {
    setDirtyMap((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: val,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveBatch(dirtyMap);
      setDirtyMap({});
      setIsEditMode(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setDirtyMap({});
    setIsEditMode(false);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(vendors.map((v: any) => v.id || v.vendor_id || v.vendorId));
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const dataToExport = vendors.map((ven: any) => ({
        ...ven,
        vendor_id: ven.vendor_id || ven.vendorId,
        vendor_name: ven.vendor_name || ven.vendorName,
        contract_id: ven.contract_id || ven.contractId,
        contract_type: ven.contract_type || ven.contractType,
        contract_start_date: ven.contract_start_date || ven.contractStartDate,
        contract_end_date: ven.contract_end_date || ven.contractEndDate,
        renewal_date: ven.renewal_date || ven.renewalDate,
        gst_number: ven.gst_number || ven.gstNumber,
        pan_number: ven.pan_number || ven.panNumber,
        primary_contact_name: ven.primary_contact_name || ven.primaryContactName,
      }));

      await exportToExcel({
        filename: `Vendor_Directory_${new Date().toISOString().split("T")[0]}`,
        title: "Spotlite Vendor Directory Master",
        sheetName: "Vendors",
        columns: EXPORT_COLUMNS,
        data: dataToExport,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (singleDeleteId) {
      await deleteBatch([singleDeleteId]);
      setSingleDeleteId(null);
    } else if (selectedIds.size > 0) {
      await deleteBatch(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
    setDeleteConfirmOpen(false);
  };

  const totalPages = Math.ceil(total / size) || 1;
  const isAllSelected = vendors.length > 0 && selectedIds.size === vendors.length;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              to="/hr"
              className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-foreground transition-colors group"
            >
              <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to Overview
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 border border-violet-500/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Vendor Directory
                </h1>
                <Badge
                  variant="outline"
                  className="bg-violet-500/5 text-violet-600 border-violet-500/20 font-mono text-[11px] font-bold tabular-nums px-2 py-0.5"
                >
                  {total.toLocaleString()} records
                </Badge>
              </div>
              <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                Centralized partner master with contract durations, recurrence, and financial
                classifications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toolbar & Filters ────────────────────────────────────────────── */}
      <Card className="border-border/80 p-4 shadow-xs">
        <DirectoryToolbar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by vendor name, ID, contract..."
          isEditMode={isEditMode}
          onToggleEdit={() => setIsEditMode(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
          dirtyCount={dirtyCount}
          onExport={handleExport}
          isExporting={isExporting}
          selectedCount={selectedIds.size}
          onBulkDelete={() => setDeleteConfirmOpen(true)}
          onRefresh={refetch}
          isRefreshing={isFetching}
          totalRecords={total}
          filters={
            <>
              {/* Industry Filter */}
              <Select
                value={industry || "All Industries"}
                onValueChange={(val) => setIndustry(val === "All Industries" ? "" : val)}
              >
                <SelectTrigger className="h-9 text-xs w-37.5 bg-surface border-border/80">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind} className="text-xs">
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                value={status || "All Statuses"}
                onValueChange={(val) => setStatus(val === "All Statuses" ? "" : val)}
              >
                <SelectTrigger className="h-9 text-xs w-32.5 bg-surface border-border/80">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((st) => (
                    <SelectItem key={st} value={st} className="text-xs">
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Recurrence Filter */}
              <Select
                value={recurring || "all"}
                onValueChange={(val) => setRecurring(val === "all" ? "" : val)}
              >
                <SelectTrigger className="h-9 text-xs w-35 bg-surface border-border/80">
                  <SelectValue placeholder="Recurrence" />
                </SelectTrigger>
                <SelectContent>
                  {RECURRING_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Contract Type Filter */}
              <Select
                value={contractType || "All Contract Types"}
                onValueChange={(val) => setContractType(val === "All Contract Types" ? "" : val)}
              >
                <SelectTrigger className="h-9 text-xs w-37.5 bg-surface border-border/80">
                  <SelectValue placeholder="Contract Type" />
                </SelectTrigger>
                <SelectContent>
                  {CONTRACT_TYPES.map((ct) => (
                    <SelectItem key={ct} value={ct} className="text-xs">
                      {ct}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          }
        />
      </Card>

      {/* ── Table Container ──────────────────────────────────────────────── */}
      <Card className="border-border/80 shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-surface-alt/80 text-[11px] font-semibold text-text-secondary border-b border-border sticky top-0 z-10 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 w-10 whitespace-nowrap">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(c) => handleSelectAll(!!c)}
                    aria-label="Select all"
                  />
                </th>
                <th className="px-4 py-3 whitespace-nowrap">Vendor ID</th>
                <th className="px-4 py-3 whitespace-nowrap">Vendor Name</th>
                <th className="px-4 py-3 whitespace-nowrap">Contract ID</th>
                <th className="px-4 py-3 whitespace-nowrap">Industry</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap">Recurrence</th>
                <th className="px-4 py-3 whitespace-nowrap">Contract Type</th>
                <th className="px-4 py-3 whitespace-nowrap">Currency</th>
                <th className="px-4 py-3 whitespace-nowrap">End Date / Expiry</th>
                <th className="px-4 py-3 w-12 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-4 rounded" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-4 mx-auto" />
                    </td>
                  </tr>
                ))
              ) : vendors.length > 0 ? (
                vendors.map((ven: any) => {
                  const venId = ven.id || ven.vendor_id || ven.vendorId || ven.rowId;
                  const isSelected = selectedIds.has(venId);

                  const displayVenId = ven.vendor_id ?? ven.vendorId ?? "";
                  const displayName = ven.vendor_name ?? ven.vendorName ?? "";
                  const displayContractId = ven.contract_id ?? ven.contractId ?? "";
                  const displayIndustry = ven.industry ?? "";
                  const displayStatus = ven.status ?? "Active";
                  const isRecurring =
                    ven.recurring === true ||
                    ven.recurring === "true" ||
                    ven.recurring === "Yes" ||
                    ven.recurring === "1";
                  const displayContractType =
                    ven.contract_type ?? ven.contractType ?? "Fixed Price";
                  const displayCurrency = ven.currency ?? "INR";
                  const displayEndDate = ven.contract_end_date ?? ven.contractEndDate ?? "";

                  const daysUntilExpiry = getDaysUntilExpiry(displayEndDate);
                  const isExpiringSoon =
                    daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 30;
                  const isExpired = daysUntilExpiry !== null && daysUntilExpiry < 0;

                  return (
                    <tr
                      key={venId}
                      className={cn(
                        "transition-colors hover:bg-surface-alt/50",
                        isSelected && "bg-violet-500/5 hover:bg-violet-500/10",
                      )}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(c) => handleSelectRow(venId, !!c)}
                          aria-label={`Select ${displayName}`}
                        />
                      </td>

                      {/* Vendor ID */}
                      <td className="px-4 py-2.5 font-mono font-medium text-foreground whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayVenId}
                            onChange={(e) => handleCellChange(venId, "vendor_id", e.target.value)}
                            className="min-w-30 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          />
                        ) : (
                          displayVenId || "—"
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-4 py-2.5 font-semibold text-foreground whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayName}
                            onChange={(e) => handleCellChange(venId, "vendor_name", e.target.value)}
                            className="min-w-50 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-[10px] font-bold text-violet-600">
                              {displayName.charAt(0) || "V"}
                            </div>
                            <span className="whitespace-nowrap">{displayName || "—"}</span>
                          </div>
                        )}
                      </td>

                      {/* Contract ID */}
                      <td className="px-4 py-2.5 font-mono text-xs text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayContractId}
                            onChange={(e) => handleCellChange(venId, "contract_id", e.target.value)}
                            className="min-w-35 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          />
                        ) : (
                          displayContractId || "—"
                        )}
                      </td>

                      {/* Industry */}
                      <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayIndustry}
                            onChange={(e) => handleCellChange(venId, "industry", e.target.value)}
                            className="min-w-40 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          />
                        ) : (
                          displayIndustry || "—"
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        {isEditMode ? (
                          <select
                            defaultValue={displayStatus}
                            onChange={(e) => handleCellChange(venId, "status", e.target.value)}
                            className="min-w-27.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Expired">Expired</option>
                          </select>
                        ) : (
                          <StatusBadge status={displayStatus} />
                        )}
                      </td>

                      {/* Recurrence */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        {isEditMode ? (
                          <select
                            defaultValue={isRecurring ? "true" : "false"}
                            onChange={(e) =>
                              handleCellChange(venId, "recurring", e.target.value === "true")
                            }
                            className="min-w-27.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          >
                            <option value="true">Recurring</option>
                            <option value="false">One-off</option>
                          </select>
                        ) : (
                          <StatusBadge status={isRecurring ? "recurring" : "one-off"} />
                        )}
                      </td>

                      {/* Contract Type */}
                      <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayContractType}
                            onChange={(e) =>
                              handleCellChange(venId, "contract_type", e.target.value)
                            }
                            className="min-w-35 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          />
                        ) : (
                          displayContractType || "—"
                        )}
                      </td>

                      {/* Currency */}
                      <td className="px-4 py-2.5 font-mono text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayCurrency}
                            onChange={(e) => handleCellChange(venId, "currency", e.target.value)}
                            className="min-w-22.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          />
                        ) : (
                          displayCurrency || "—"
                        )}
                      </td>

                      {/* End Date / Expiry */}
                      <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="date"
                            defaultValue={displayEndDate}
                            onChange={(e) =>
                              handleCellChange(venId, "contract_end_date", e.target.value)
                            }
                            className="min-w-37.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
                          />
                        ) : (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>{displayEndDate || "—"}</span>
                            {isExpiringSoon && (
                              <Badge
                                variant="outline"
                                className="bg-amber-500/10 text-amber-600 border-amber-500/30 text-[10px] px-1.5 py-0 font-semibold gap-1 whitespace-nowrap"
                              >
                                <AlertTriangle className="h-2.5 w-2.5" />
                                {daysUntilExpiry}d left
                              </Badge>
                            )}
                            {isExpired && (
                              <Badge
                                variant="outline"
                                className="bg-rose-500/10 text-rose-600 border-rose-500/30 text-[10px] px-1.5 py-0 font-semibold whitespace-nowrap"
                              >
                                Expired
                              </Badge>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2.5 text-center whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-text-tertiary hover:text-foreground"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem
                              onClick={() => {
                                setSingleDeleteId(venId);
                                setDeleteConfirmOpen(true);
                              }}
                              className="text-destructive focus:text-destructive text-xs gap-2"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary mb-3">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">No vendors found</h3>
                      <p className="text-xs text-text-secondary mt-1 text-center">
                        {search || industry || status || recurring || contractType
                          ? "No records match your active filter criteria. Try resetting filters."
                          : "Upload your vendor portfolio sheet to populate the directory."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ─────────────────────────────────────────── */}
        {total > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border bg-surface-alt/40 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <span>
                Showing {(page - 1) * size + 1}–{Math.min(page * size, total)} of {total} vendors
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span>Rows per page:</span>
                <Select value={String(size)} onValueChange={(val) => setSize(Number(val))}>
                  <SelectTrigger className="h-7 w-16 text-xs bg-surface border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="h-7 px-2.5 text-xs border-border"
                >
                  Previous
                </Button>
                <span className="text-xs px-2 font-medium">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="h-7 px-2.5 text-xs border-border"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* ── Delete Confirmation Modal ────────────────────────────────────── */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground">
              {singleDeleteId ? "Delete Vendor Record" : "Delete Selected Records"}
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary mt-1">
              {singleDeleteId
                ? "Are you sure you want to delete this vendor record? This action will soft-delete the record from the database."
                : `Are you sure you want to delete ${selectedIds.size} selected vendor record${selectedIds.size > 1 ? "s" : ""}?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmOpen(false)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmDelete}
              className="text-xs font-semibold"
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
