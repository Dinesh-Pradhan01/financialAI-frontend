import { useState, useEffect } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { Users, ChevronLeft, Trash2, MoreVertical } from "lucide-react";
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
import { useEmployeeDirectory } from "../../hooks/useEmployeeDirectory";
import { DirectoryToolbar } from "../shared/DirectoryToolbar";
import { StatusBadge } from "../shared/StatusBadge";
import { exportToExcel, ExportColumn } from "../shared/exportUtils";
import { cn } from "@/shared/lib/utils";
import type { EmployeeRecord } from "../../types/employee";

const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Product",
  "Sales",
  "Marketing",
  "Finance",
  "Human Resources",
  "Operations",
  "Legal",
  "Customer Support",
];

const STATUSES = ["All Statuses", "Active", "Inactive", "Notice Period", "Resigned"];

const EMPLOYMENT_TYPES = ["All Types", "Full Time", "Part Time", "Contract", "Intern"];

const EXPORT_COLUMNS: ExportColumn[] = [
  { header: "Employee ID", key: "employee_id", width: 16 },
  { header: "Employee Name", key: "employee_name", width: 24 },
  { header: "Email", key: "email", width: 28 },
  { header: "Phone", key: "phone", width: 16 },
  { header: "Department", key: "department", width: 18 },
  { header: "Designation", key: "designation", width: 22 },
  { header: "Status", key: "status", width: 14 },
  { header: "Employment Type", key: "employment_type", width: 18 },
  { header: "Salary", key: "salary", width: 16, type: "number" },
  { header: "Joining Date", key: "joining_date", width: 16, type: "date" },
  { header: "PAN", key: "pan", width: 16 },
  { header: "Aadhaar", key: "aadhaar", width: 18 },
  { header: "Bank Name", key: "bank_name", width: 20 },
  { header: "Account Number", key: "account_number", width: 20 },
  { header: "IFSC Code", key: "ifsc_code", width: 16 },
  { header: "Payment Mode", key: "payment_mode", width: 16 },
];

export function EmployeeDirectoryPage() {
  // Read search params if TanStack router supports it
  const searchParams: any = (useSearch as any)({ strict: false }) || {};

  const {
    employees,
    total,
    isLoading,
    isFetching,
    page,
    setPage,
    size,
    setSize,
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
    employmentType,
    setEmploymentType,
    refetch,
    saveBatch,
    deleteBatch,
  } = useEmployeeDirectory({
    status: searchParams.status,
    department: searchParams.department,
    search: searchParams.search,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [dirtyMap, setDirtyMap] = useState<Record<string, Partial<EmployeeRecord>>>({});
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

  const handleCellChange = (id: string, field: string, val: string) => {
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
      const allIds = new Set(employees.map((e: any) => e.id || e.employee_id || e.employeeId));
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
      // Map data with fallback keys
      const dataToExport = employees.map((emp: any) => ({
        ...emp,
        employee_id: emp.employee_id || emp.employeeId,
        employee_name: emp.employee_name || emp.employeeName,
        joining_date: emp.joining_date || emp.joiningDate,
        employment_type: emp.employment_type || emp.employmentType,
        payment_mode: emp.payment_mode || emp.paymentMode,
        account_number: emp.account_number || emp.accountNumber,
        ifsc_code: emp.ifsc_code || emp.ifscCode,
        bank_name: emp.bank_name || emp.bankName,
      }));

      await exportToExcel({
        filename: `Employee_Directory_${new Date().toISOString().split("T")[0]}`,
        title: "Spotlite Employee Directory Master",
        sheetName: "Employees",
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
  const isAllSelected = employees.length > 0 && selectedIds.size === employees.length;

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Employee Directory
                </h1>
                <Badge
                  variant="outline"
                  className="bg-primary/5 text-primary border-primary/20 font-mono text-[11px] font-bold tabular-nums px-2 py-0.5"
                >
                  {total.toLocaleString()} records
                </Badge>
              </div>
              <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                Comprehensive directory of workforce records, designations, and payment details.
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
          searchPlaceholder="Search by name, ID, email..."
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
              {/* Department Filter */}
              <Select
                value={department || "All Departments"}
                onValueChange={(val) => setDepartment(val === "All Departments" ? "" : val)}
              >
                <SelectTrigger className="h-9 text-xs w-37.5 bg-surface border-border/80">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept} className="text-xs">
                      {dept}
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

              {/* Employment Type Filter */}
              <Select
                value={employmentType || "All Types"}
                onValueChange={(val) => setEmploymentType(val === "All Types" ? "" : val)}
              >
                <SelectTrigger className="h-9 text-xs w-32.5 bg-surface border-border/80">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_TYPES.map((t) => (
                    <SelectItem key={t} value={t} className="text-xs">
                      {t}
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
                <th className="px-4 py-3 whitespace-nowrap">Employee ID</th>
                <th className="px-4 py-3 whitespace-nowrap">Name</th>
                <th className="px-4 py-3 whitespace-nowrap">Department</th>
                <th className="px-4 py-3 whitespace-nowrap">Designation</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap">Type</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Salary</th>
                <th className="px-4 py-3 whitespace-nowrap">Payment Mode</th>
                <th className="px-4 py-3 whitespace-nowrap">Joining Date</th>
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
                      <Skeleton className="h-4 w-16 ml-auto" />
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
              ) : employees.length > 0 ? (
                employees.map((emp: any) => {
                  const empId = emp.id || emp.employee_id || emp.employeeId || emp.rowId;
                  const isSelected = selectedIds.has(empId);
                  const dirtyFields = dirtyMap[empId] || {};

                  const displayEmpId = emp.employee_id ?? emp.employeeId ?? "";
                  const displayName = emp.employee_name ?? emp.employeeName ?? "";
                  const displayDept = emp.department ?? "";
                  const displayDesig = emp.designation ?? "";
                  const displayStatus = emp.status ?? "Active";
                  const displayType = emp.employment_type ?? emp.employmentType ?? "Full Time";
                  const displaySalary = emp.salary ?? "";
                  const displayPaymentMode = emp.payment_mode ?? emp.paymentMode ?? "";
                  const displayJoiningDate = emp.joining_date ?? emp.joiningDate ?? "";

                  return (
                    <tr
                      key={empId}
                      className={cn(
                        "transition-colors hover:bg-surface-alt/50",
                        isSelected && "bg-primary/5 hover:bg-primary/10",
                      )}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(c) => handleSelectRow(empId, !!c)}
                          aria-label={`Select ${displayName}`}
                        />
                      </td>

                      {/* Employee ID */}
                      <td className="px-4 py-2.5 font-mono font-medium text-foreground whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayEmpId}
                            onChange={(e) => handleCellChange(empId, "employee_id", e.target.value)}
                            className="min-w-30 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          />
                        ) : (
                          displayEmpId || "—"
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-4 py-2.5 font-semibold text-foreground whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayName}
                            onChange={(e) =>
                              handleCellChange(empId, "employee_name", e.target.value)
                            }
                            className="min-w-45 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          />
                        ) : (
                          displayName || "—"
                        )}
                      </td>

                      {/* Department */}
                      <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayDept}
                            onChange={(e) => handleCellChange(empId, "department", e.target.value)}
                            className="min-w-35 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          />
                        ) : (
                          displayDept || "—"
                        )}
                      </td>

                      {/* Designation */}
                      <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayDesig}
                            onChange={(e) => handleCellChange(empId, "designation", e.target.value)}
                            className="min-w-40 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          />
                        ) : (
                          displayDesig || "—"
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        {isEditMode ? (
                          <select
                            defaultValue={displayStatus}
                            onChange={(e) => handleCellChange(empId, "status", e.target.value)}
                            className="min-w-27.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Notice Period">Notice Period</option>
                            <option value="Resigned">Resigned</option>
                          </select>
                        ) : (
                          <StatusBadge status={displayStatus} />
                        )}
                      </td>

                      {/* Type */}
                      <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayType}
                            onChange={(e) =>
                              handleCellChange(empId, "employment_type", e.target.value)
                            }
                            className="min-w-30 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          />
                        ) : (
                          displayType || "—"
                        )}
                      </td>

                      {/* Salary */}
                      <td className="px-4 py-2.5 font-mono text-right text-foreground whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="number"
                            defaultValue={displaySalary}
                            onChange={(e) => handleCellChange(empId, "salary", e.target.value)}
                            className="min-w-30 text-right bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          />
                        ) : displaySalary ? (
                          !isNaN(Number(displaySalary)) ? (
                            `₹${Number(displaySalary).toLocaleString("en-IN")}`
                          ) : (
                            displaySalary
                          )
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* Payment Mode */}
                      <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="text"
                            defaultValue={displayPaymentMode}
                            onChange={(e) =>
                              handleCellChange(empId, "payment_mode", e.target.value)
                            }
                            className="min-w-32.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          />
                        ) : (
                          displayPaymentMode || "—"
                        )}
                      </td>

                      {/* Joining Date */}
                      <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                        {isEditMode ? (
                          <input
                            type="date"
                            defaultValue={displayJoiningDate}
                            onChange={(e) =>
                              handleCellChange(empId, "joining_date", e.target.value)
                            }
                            className="min-w-35 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
                          />
                        ) : (
                          displayJoiningDate || "—"
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
                                setSingleDeleteId(empId);
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
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">No employees found</h3>
                      <p className="text-xs text-text-secondary mt-1 text-center">
                        {search || department || status || employmentType
                          ? "No records match your active filter criteria. Try resetting filters."
                          : "Upload your employee master sheet to populate the directory."}
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
                Showing {(page - 1) * size + 1}–{Math.min(page * size, total)} of {total} employees
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
              {singleDeleteId ? "Delete Employee Record" : "Delete Selected Records"}
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary mt-1">
              {singleDeleteId
                ? "Are you sure you want to delete this employee record? This action will soft-delete the record from the database."
                : `Are you sure you want to delete ${selectedIds.size} selected employee record${selectedIds.size > 1 ? "s" : ""}?`}
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
