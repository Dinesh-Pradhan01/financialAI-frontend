import { useState, useEffect } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { Users, ChevronLeft, Trash2, MoreVertical, AlertTriangle, BarChart3, Table as TableIcon } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { SpotliteClientAnalytics } from "@/features/spotlights/components/spotlite-client-analytics";

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
import { useClientDirectory, getClientRowKey, parseClientRowKey } from "../../hooks/useClientDirectory";
import { DirectoryToolbar } from "@/shared/components/data-table/DirectoryToolbar";
import { StatusBadge } from "@/shared/components/data-table/StatusBadge";
import { exportToExcel, ExportColumn } from "@/shared/components/data-table/exportUtils";
import { cn } from "@/shared/lib/utils";
import type { ClientRecord } from "../../types/client";

const CATEGORIES = [
  "All Categories",
  "Consulting",
  "Software / SaaS",
  "IT Services",
  "Financial Services",
  "Logistics",
  "Marketing",
  "Legal",
  "Other",
];

const INDUSTRIES = [
  "All Industries",
  "Technology",
  "Healthcare",
  "Financial Services",
  "Retail & E-commerce",
  "Manufacturing",
  "Education",
  "Media & Entertainment",
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
  { header: "Client ID", key: "client_id", width: 16 },
  { header: "Client Name", key: "client_name", width: 24 },
  { header: "Category", key: "category", width: 18 },
  { header: "Contract ID", key: "contract_id", width: 18 },
  { header: "Industry", key: "industry", width: 20 },
  { header: "Status", key: "status", width: 14 },
  { header: "Revenue", key: "revenue", width: 16, type: "number" },
  { header: "Contract Value", key: "contract_value", width: 16, type: "number" },
  { header: "Recurring", key: "recurring", width: 14, type: "boolean" },
  { header: "Contract Type", key: "contract_type", width: 18 },
  { header: "Currency", key: "currency", width: 12 },
  { header: "Start Date", key: "contract_start_date", width: 16, type: "date" },
  { header: "End Date", key: "contract_end_date", width: 16, type: "date" },
  { header: "Bank Name", key: "bank_name", width: 20 },
  { header: "Account Number", key: "account_number", width: 20 },
  { header: "IFSC Code", key: "ifsc_code", width: 16 },
];

export function ClientDirectoryPage() {
  const searchParams: any = useSearch({ strict: false });

  const {
    clients,
    total,
    isLoading,
    isFetching,
    page,
    setPage,
    size,
    setSize,
    search,
    setSearch,
    category,
    setCategory,
    industry,
    setIndustry,
    status,
    setStatus,
    recurring,
    setRecurring,
    contractType,
    setContractType,
    updateMutation,
    deleteMutation,
    saveBatch,
    deleteBatch,
    refetch,
  } = useClientDirectory({
    page: searchParams.page ? Number(searchParams.page) : 1,
    size: searchParams.size ? Number(searchParams.size) : 50,
    search: searchParams.search,
    category: searchParams.category,
    industry: searchParams.industry,
    status: searchParams.status,
    recurring: searchParams.recurring,
  });

  const [viewMode, setViewMode] = useState<"analytics" | "table">("analytics");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isEditMode, setIsEditMode] = useState(false);
  const [dirtyMap, setDirtyMap] = useState<Record<string, Partial<ClientRecord>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);


  // Single delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<{ clientId: string; category: string; name: string } | null>(null);
  // Bulk delete confirmation dialog state
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  // Sync state to URL if desired
  useEffect(() => {
    setSelectedKeys(new Set());
  }, [page, size, search, category, industry, status, recurring]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(
        clients.map((c) => getClientRowKey(c.client_id || c.clientId || "", c.category || "")),
      );
      setSelectedKeys(allKeys);
    } else {
      setSelectedKeys(new Set());
    }
  };

  const handleSelectOne = (rowKey: string, checked: boolean) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (checked) next.add(rowKey);
      else next.delete(rowKey);
      return next;
    });
  };

  const isAllSelected =
    clients.length > 0 &&
    clients.every((c) =>
      selectedKeys.has(getClientRowKey(c.client_id || c.clientId || "", c.category || "")),
    );

  const handleFieldChange = (
    rowKey: string,
    field: keyof ClientRecord,
    value: any,
  ) => {
    setDirtyMap((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
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

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportToExcel({
        data: clients.map((c) => ({
          ...c,
          client_id: c.client_id || c.clientId,
          client_name: c.client_name || c.clientName,
          contract_id: c.contract_id || c.contractId,
          contract_value: c.contract_value || c.contractValue,
          bank_name: c.bank_name || c.bankName,
          account_number: c.account_number || c.accountNumber,
          ifsc_code: c.ifsc_code || c.ifscCode,
        })),
        columns: EXPORT_COLUMNS,
        filename: `client_portfolio_${new Date().toISOString().split("T")[0]}`,
        title: "Client Portfolio",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteSingleConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync({
        clientId: deleteTarget.clientId,
        category: deleteTarget.category,
      });
      setDeleteTarget(null);
    } catch {
      // Handled by mutation
    }
  };

  const handleBulkDeleteConfirm = async () => {
    try {
      await deleteBatch(Array.from(selectedKeys));
      setSelectedKeys(new Set());
      setBulkDeleteOpen(false);
    } catch {
      // Handled by batch delete
    }
  };

  const dirtyCount = Object.keys(dirtyMap).length;
  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 pb-24 space-y-6">
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/cfo"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface hover:bg-surface-alt transition text-text-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                <Users className="h-4 w-4" />
              </div>
              <h1 className="font-display text-xl font-bold tracking-tight text-foreground">
                Client Directory
              </h1>
              <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-surface-alt">
                {total} {total === 1 ? "Client" : "Clients"}
              </Badge>
            </div>
            <p className="text-text-secondary text-xs mt-0.5 pl-0.5">
              Manage client portfolio, revenue agreements, and billing schedules.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-surface p-1">
            <button
              onClick={() => setViewMode("analytics")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                viewMode === "analytics"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-text-secondary hover:text-foreground"
              )}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              Analytics
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-text-secondary hover:text-foreground"
              )}
            >
              <TableIcon className="h-3.5 w-3.5" />
              Table
            </button>
          </div>
          <Link
            to="/cfo/client/upload"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition"
          >
            Import Clients
          </Link>
        </div>
      </div>

      {/* ── View Content ────────────────────────────────────────────────── */}
      {viewMode === "analytics" ? (
        <SpotliteClientAnalytics />
      ) : (
        <>
          {/* ── Toolbar ────────────────────────────────────────────────────── */}
          <Card className="border-border shadow-xs">

        <DirectoryToolbar
          searchPlaceholder="Search clients by ID, name, or contract..."
          search={search}
          onSearchChange={setSearch}
          isEditMode={isEditMode}
          onToggleEdit={() => setIsEditMode(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
          dirtyCount={dirtyCount}
          onExport={handleExport}
          isExporting={isExporting}
          selectedCount={selectedKeys.size}
          onBulkDelete={() => setBulkDeleteOpen(true)}
          onRefresh={refetch}
          isRefreshing={isFetching}
          totalRecords={total}
          filters={
            <>
              {/* Category Filter */}
              <Select
                value={category || "All Categories"}
                onValueChange={(val) => setCategory(val === "All Categories" ? "" : val)}
              >
                <SelectTrigger className="h-9 text-xs w-36 bg-surface border-border/80">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-xs">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                value={status || "All Statuses"}
                onValueChange={(val) => setStatus(val === "All Statuses" ? "" : val)}
              >
                <SelectTrigger className="h-9 text-xs w-32 bg-surface border-border/80">
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
                <SelectTrigger className="h-9 text-xs w-36 bg-surface border-border/80">
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
            </>
          }
        />
      </Card>

      {/* ── Table Container ──────────────────────────────────────────────── */}
      <Card className="border-border shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-surface-alt text-[11px] font-semibold text-text-secondary border-b border-border sticky top-0 z-10 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 w-10 whitespace-nowrap">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(c) => handleSelectAll(!!c)}
                    aria-label="Select all"
                  />
                </th>
                <th className="px-4 py-3 whitespace-nowrap">Client ID</th>
                <th className="px-4 py-3 whitespace-nowrap">Client Name</th>
                <th className="px-4 py-3 whitespace-nowrap">Category</th>
                <th className="px-4 py-3 whitespace-nowrap">Contract ID</th>
                <th className="px-4 py-3 whitespace-nowrap">Revenue (Inflow)</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap">Recurrence</th>
                <th className="px-4 py-3 whitespace-nowrap">Contract Type</th>
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
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton className="h-4 w-24" />
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
                      <Skeleton className="h-4 w-4 mx-auto" />
                    </td>
                  </tr>
                ))
              ) : clients.length > 0 ? (
                clients.map((client) => {
                  const clientId = String(client.client_id || client.clientId || "");
                  const categoryVal = String(client.category || "");
                  const rowKey = getClientRowKey(clientId, categoryVal);
                  const isSelected = selectedKeys.has(rowKey);
                  const dirtyRow = dirtyMap[rowKey] || {};
                  const isRowDirty = Object.keys(dirtyRow).length > 0;

                  const clientName = dirtyRow.client_name ?? dirtyRow.clientName ?? client.client_name ?? client.clientName ?? "";
                  const revenueVal = dirtyRow.revenue ?? client.revenue ?? 0;
                  const statusVal = dirtyRow.status ?? client.status ?? "Active";

                  return (
                    <tr
                      key={rowKey}
                      className={cn(
                        "hover:bg-surface-alt/60 transition group",
                        isSelected && "bg-primary/5 hover:bg-primary/10",
                        isRowDirty && "bg-amber-500/5",
                      )}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(c) => handleSelectOne(rowKey, !!c)}
                          aria-label={`Select ${clientName}`}
                        />
                      </td>

                      {/* Client ID */}
                      <td className="px-4 py-3 whitespace-nowrap font-mono font-medium text-foreground">
                        {clientId}
                      </td>

                      {/* Client Name */}
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-foreground">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={clientName}
                            onChange={(e) => handleFieldChange(rowKey, "client_name", e.target.value)}
                            className="h-7 w-48 rounded border border-border bg-surface px-2 text-xs focus:border-primary focus:outline-none"
                          />
                        ) : (
                          clientName
                        )}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="rounded-md border border-border bg-surface-alt px-2 py-0.5 font-medium text-text-secondary">
                          {categoryVal}
                        </span>
                      </td>

                      {/* Contract ID */}
                      <td className="px-4 py-3 whitespace-nowrap text-text-secondary font-mono">
                        {client.contract_id || client.contractId || "—"}
                      </td>

                      {/* Revenue */}
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-emerald-600">
                        {isEditMode ? (
                          <input
                            type="number"
                            value={revenueVal}
                            onChange={(e) => handleFieldChange(rowKey, "revenue", Number(e.target.value))}
                            className="h-7 w-28 rounded border border-border bg-surface px-2 text-xs focus:border-primary focus:outline-none"
                          />
                        ) : (
                          `₹${Number(revenueVal).toLocaleString("en-IN")}`
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {isEditMode ? (
                          <select
                            value={statusVal}
                            onChange={(e) => handleFieldChange(rowKey, "status", e.target.value)}
                            className="h-7 rounded border border-border bg-surface px-1 text-xs focus:border-primary focus:outline-none"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Expired">Expired</option>
                          </select>
                        ) : (
                          <StatusBadge status={statusVal} />
                        )}
                      </td>

                      {/* Recurrence */}
                      <td className="px-4 py-3 whitespace-nowrap text-text-secondary">
                        {String(client.recurring || "").toLowerCase() === "yes" ||
                        String(client.recurring || "").toLowerCase() === "true" ||
                        String(client.recurring || "") === "1"
                          ? "Recurring"
                          : "One-off"}
                      </td>

                      {/* Contract Type */}
                      <td className="px-4 py-3 whitespace-nowrap text-text-secondary">
                        {client.contract_type || client.contractType || "Fixed Price"}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-surface-alt text-text-tertiary hover:text-foreground transition">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setIsEditMode(true);
                              }}
                            >
                              Edit Client
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setDeleteTarget({
                                  clientId,
                                  category: categoryVal,
                                  name: clientName,
                                })
                              }
                              className="text-destructive focus:text-destructive"
                            >
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-text-secondary">
                    <p className="text-sm font-semibold text-foreground">No clients found</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Try modifying your search query or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border bg-surface text-xs text-text-secondary">
          <div>
            Showing {(page - 1) * size + 1} to {Math.min(page * size, total)} of {total} records
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="h-8 text-xs"
            >
              Previous
            </Button>
            <span className="px-2 font-medium text-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="h-8 text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
        </>
      )}



      {/* Single Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center text-xl">Delete Client?</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">{deleteTarget?.name}</span> (
              {deleteTarget?.clientId}, Category: {deleteTarget?.category})? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSingleConfirm}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center text-xl">
              Delete {selectedKeys.size} Selected Clients?
            </DialogTitle>
            <DialogDescription className="text-center">
              You are about to delete {selectedKeys.size} client records matching their respective
              business keys. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setBulkDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDeleteConfirm}>
              Confirm Bulk Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
