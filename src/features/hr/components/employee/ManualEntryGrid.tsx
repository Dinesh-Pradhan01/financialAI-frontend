import React, { useState } from "react";
import { Plus, ArrowRight, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { useEmployeeManualPreview } from "../../hooks/useEmployee";
import { useAppDispatch } from "@/shared/store";
import { setEmployeePreview, setEmployeeStep } from "@/shared/store/slices/hrSlice";
import type { EmployeeRecord, EmployeePreviewResponse, ValidationSummary } from "../../types/employee";
import { toast } from "sonner";

/** Simple short-ID generator – no extra dependency required. */
function shortId(): string {
  return Math.random().toString(36).slice(2, 8);
}

function generateEmptyRow(): Partial<EmployeeRecord> {
  return {
    employeeId: "",
    employeeName: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    status: "Active",
  };
}

function normalizeManualPreviewResponse(raw: any, userRows: EmployeeRecord[]): EmployeePreviewResponse {
  let previewData = raw;
  
  if (raw && typeof raw === "object" && raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) {
    previewData = raw.data;
  }
  
  const rawRecords = Array.isArray(previewData?.records) && previewData.records.length > 0 ? previewData.records : userRows;
  
  const records = rawRecords.map((r: any) => ({
    ...r,
    employeeId: r.employeeId || r.employee_id || "",
    employeeName: r.employeeName || r.employee_name || "",
    employee_id: r.employee_id || r.employeeId || "",
    employee_name: r.employee_name || r.employeeName || "",
    joiningDate: r.joiningDate || r.joining_date || "",
    dateOfBirth: r.dateOfBirth || r.date_of_birth || "",
    employmentType: r.employmentType || r.employment_type || "",
    previousSalary: r.previousSalary || r.previous_salary || "",
    salaryHikePercent: r.salaryHikePercent || r.hike_percentage || "",
    salaryFrequency: r.salaryFrequency || r.salary_frequency || "",
    panNumber: r.panNumber || r.pan || "",
    aadhaarNumber: r.aadhaarNumber || r.aadhaar || "",
    accountHolderName: r.accountHolderName || r.account_holder_name || "",
    accountNumber: r.accountNumber || r.account_number || "",
    confirmAccountNumber: r.confirmAccountNumber || r.confirm_account_number || "",
    ifscCode: r.ifscCode || r.ifsc_code || "",
    bankName: r.bankName || r.bank_name || "",
    accountType: r.accountType || r.account_type || "",
    paymentMode: r.paymentMode || r.payment_mode || "",
    status: r.status || "Active",
  }));
  
  const rawSummary = previewData?.summary || previewData?.validation;
  const summary: ValidationSummary = {
    validEmployees: typeof rawSummary?.validEmployees === "number" ? rawSummary.validEmployees : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
    warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
    errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
    issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
    errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
    warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
    duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
    missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0,
  };

  return {
    upload_id: previewData?.upload_id,
    schema_def: previewData?.schema_def,
    records,
    summary,
    validation: summary,
    file_meta: { name: "Manual Entry" },
  };
}

export function ManualEntryGrid() {
  const [rows, setRows] = useState<Partial<EmployeeRecord>[]>([generateEmptyRow()]);

  const dispatch = useAppDispatch();
  const previewMutation = useEmployeeManualPreview();

  const handleAddRow = () => {
    setRows([...rows, generateEmptyRow()]);
  };

  const handleDeleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof EmployeeRecord, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const handleProceed = () => {
    // Filter out completely empty rows
    const validRows = rows.filter((r) => r.employeeId || r.employeeName || r.email);
    if (validRows.length === 0) {
      toast.error("Please fill in at least one row before proceeding.");
      return;
    }

    // Attach row IDs and format fields with snake_case aliases for backend validation schema
    const rowsForBackend = validRows.map((r, idx) => {
      const rowId = r.rowId || `manual-${shortId()}`;
      const sourceRow = idx + 1;
      return {
        ...r,
        rowId,
        sourceRow,
        employee_id: r.employeeId || (r as any).employee_id || "",
        employee_name: r.employeeName || (r as any).employee_name || "",
        email: r.email || "",
        phone: r.phone || "",
        gender: r.gender || "",
        date_of_birth: r.dateOfBirth || (r as any).date_of_birth || "",
        joining_date: r.joiningDate || (r as any).joining_date || "",
        department: r.department || "",
        designation: r.designation || "",
        manager: r.manager || "",
        employment_type: r.employmentType || (r as any).employment_type || "",
        status: r.status || "Active",
        salary: r.salary || "",
        previous_salary: r.previousSalary || (r as any).previous_salary || "",
        hike_percentage: r.salaryHikePercent || (r as any).hike_percentage || "",
        salary_frequency: r.salaryFrequency || (r as any).salary_frequency || "",
        pan: r.panNumber || (r as any).pan || "",
        aadhaar: r.aadhaarNumber || (r as any).aadhaar || "",
        address: r.address || "",
        city: r.city || "",
        state: r.state || "",
        country: r.country || "",
        account_holder_name: r.accountHolderName || (r as any).account_holder_name || "",
        account_number: r.accountNumber || (r as any).account_number || "",
        confirm_account_number: r.confirmAccountNumber || (r as any).confirm_account_number || "",
        ifsc_code: r.ifscCode || (r as any).ifsc_code || "",
        bank_name: r.bankName || (r as any).bank_name || "",
        account_type: r.accountType || (r as any).account_type || "",
        payment_mode: r.paymentMode || (r as any).payment_mode || "",
      };
    });

    previewMutation.mutate(rowsForBackend as unknown as EmployeeRecord[], {
      onSuccess: (res) => {
        const rawPayload = (res as { data?: unknown })?.data ?? res;
        const normalized = normalizeManualPreviewResponse(rawPayload, rowsForBackend as unknown as EmployeeRecord[]);
        dispatch(setEmployeePreview(normalized));
        dispatch(setEmployeeStep("preview"));
      },
      onError: (err: unknown) => {
        const msg =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data
            ?.message ??
          (err as { message?: string })?.message ??
          "Failed to preview manual entry data.";

        const rowsWithIds2 = rowsForBackend as unknown as EmployeeRecord[];

        const localNormalized: EmployeePreviewResponse = {
          records: rowsWithIds2,
          validation: {
            validEmployees: rowsWithIds2.length,
            warnings: 0,
            errors: 0,
            issues: [],
            errorRowIds: [],
            warningRowIds: [],
            duplicateIds: 0,
            missingRequiredFields: 0,
          },
          file_meta: { name: "Manual Entry (offline)" },
        };

        toast.warning(`Backend unavailable — showing local preview. (${msg})`);
        dispatch(setEmployeePreview(localNormalized));
        dispatch(setEmployeeStep("preview"));
      },
    });
  };

  const hasData = rows.some((r) => r.employeeId || r.employeeName || r.email);

  return (
    <Card className="overflow-hidden border-border/80 shadow-xs">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-alt/50">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Manual Entry</h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Add employees directly without an Excel file
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleAddRow}
            className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add Row
          </button>
          <button
            onClick={handleProceed}
            disabled={!hasData || previewMutation.isPending}
            className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:opacity-50"
          >
            {previewMutation.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                Preview
                <ArrowRight className="ml-1.5 h-3 w-3" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-surface-alt/40 text-xs text-text-secondary border-b border-border">
            <tr>
              <th className="px-4 py-2.5 font-semibold w-10 text-center text-text-tertiary">#</th>
              <th className="px-4 py-2.5 font-semibold min-w-[130px]">
                Employee ID <span className="text-destructive">*</span>
              </th>
              <th className="px-4 py-2.5 font-semibold min-w-[180px]">
                Full Name <span className="text-destructive">*</span>
              </th>
              <th className="px-4 py-2.5 font-semibold min-w-[200px]">
                Email <span className="text-destructive">*</span>
              </th>
              <th className="px-4 py-2.5 font-semibold min-w-[140px]">Department</th>
              <th className="px-4 py-2.5 font-semibold min-w-[160px]">Designation</th>
              <th className="px-4 py-2.5 font-semibold w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-surface-alt/30 transition-colors group">
                <td className="px-4 py-2 text-center text-xs text-text-tertiary">{i + 1}</td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.employeeId || ""}
                    onChange={(e) => handleChange(i, "employeeId", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="EMP001"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.employeeName || ""}
                    onChange={(e) => handleChange(i, "employeeName", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="John Doe"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="email"
                    value={row.email || ""}
                    onChange={(e) => handleChange(i, "email", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="john@company.com"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.department || ""}
                    onChange={(e) => handleChange(i, "department", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="Engineering"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.designation || ""}
                    onChange={(e) => handleChange(i, "designation", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="Senior Developer"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    onClick={() => handleDeleteRow(i)}
                    disabled={rows.length === 1}
                    className="opacity-0 group-hover:opacity-100 inline-flex h-6 w-6 items-center justify-center rounded-md text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition disabled:opacity-0"
                    title="Remove row"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
