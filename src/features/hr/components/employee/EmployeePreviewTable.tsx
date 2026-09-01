import React, { useMemo, useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { setEmployeeFocusedRow, updateEmployeeField } from "@/shared/store/slices/hrSlice";
import { cn } from "@/shared/lib/utils";
import type { EmployeeRecord } from "../../types/employee";

function validateEmployeeField(field: string, value: string): string | null {
  if (!value) {
    if (
      field === "employee_id" ||
      field === "employeeId" ||
      field === "employee_name" ||
      field === "employeeName"
    )
      return "Required";
    return null;
  }
  switch (field) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email";
    case "phone":
      return /^\+?[1-9]\d{1,14}$/.test(value) ? null : "Invalid phone";
    case "panNumber":
    case "pan_number":
    case "pan":
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? null : "Invalid PAN";
    case "aadhaarNumber":
    case "aadhaar_number":
    case "aadhaar":
      return /^\d{12}$/.test(value) ? null : "Invalid Aadhaar (12 digits)";
    case "ifscCode":
    case "ifsc_code":
      return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value) ? null : "Invalid IFSC";
    case "salary":
    case "previous_salary":
    case "previousSalary":
      return !isNaN(Number(value)) && Number(value) >= 0 ? null : "Must be >= 0";
    case "hike_percentage":
    case "salaryHikePercent":
      return !isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 100 ? null : "0-100";
    case "joining_date":
    case "joiningDate":
      return new Date(value) <= new Date() ? null : "Cannot be in the future";
    case "account_number":
    case "accountNumber":
      return value.length >= 6 ? null : "Min 6 chars";
  }
  return null;
}

function EditableCell({
  value,
  field,
  rowId,
  className,
}: {
  value: string;
  field: string;
  rowId: string;
  className?: string;
}) {
  const [val, setVal] = useState(value || "");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVal(value || "");
  }, [value]);

  const handleBlur = () => {
    const validationError = validateEmployeeField(field, val);
    setError(validationError);
    if (!validationError && val !== (value || "")) {
      dispatch(updateEmployeeField({ rowId, field, value: val }));
    }
  };

  return (
    <div className="relative group w-full overflow-visible">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        className={cn(
          "w-full bg-transparent border border-transparent rounded px-2.5 py-1.5 outline-none text-foreground transition-colors",
          "focus:border-transparent focus:ring-0 focus:bg-surface-alt/50 focus:font-semibold",
          error && "border-destructive/50 focus:border-destructive text-destructive",
          className,
        )}
        title={error || undefined}
      />
    </div>
  );
}

export function EmployeePreviewTable({
  employees,
  errorRowIds,
  warningRowIds,
}: {
  employees: EmployeeRecord[];
  errorRowIds: Set<string>;
  warningRowIds: Set<string>;
}) {
  const dispatch = useAppDispatch();
  const focusedRowId = useAppSelector((state) => state.hr.employee.focusedRowId);
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});

  useEffect(() => {
    if (focusedRowId && rowRefs.current[focusedRowId]) {
      rowRefs.current[focusedRowId]?.scrollIntoView({ behavior: "smooth", block: "center" });

      const timer = setTimeout(() => {
        dispatch(setEmployeeFocusedRow(null));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [focusedRowId, dispatch]);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-surface-alt/80 text-xs text-text-secondary border-b border-border sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 font-semibold min-w-[120px]">Employee ID</th>
            <th className="px-4 py-3 font-semibold min-w-[220px]">Name</th>
            <th className="px-4 py-3 font-semibold min-w-[200px]">Department</th>
            <th className="px-4 py-3 font-semibold min-w-[200px]">Designation</th>
            <th className="px-4 py-3 font-semibold min-w-[120px]">Status</th>
            <th className="px-4 py-3 font-semibold min-w-[130px]">Salary</th>
            <th className="px-4 py-3 font-semibold min-w-[150px]">Payment Mode</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {employees.length > 0 ? (
            employees.map((emp) => {
              const isError = errorRowIds.has(emp.rowId);
              const isWarning = warningRowIds.has(emp.rowId);
              const isFocused = focusedRowId === emp.rowId;

              return (
                <tr
                  key={emp.rowId}
                  ref={(el) => {
                    rowRefs.current[emp.rowId] = el;
                  }}
                  className={cn(
                    "transition-colors hover:bg-surface-alt/50",
                    isError
                      ? "bg-destructive/5 hover:bg-destructive/10"
                      : isWarning
                        ? "bg-amber-500/5 hover:bg-amber-500/10"
                        : "bg-transparent",
                    isFocused && "ring-2 ring-inset ring-primary bg-primary/5",
                  )}
                >
                  <td className="px-2 py-0.5">
                    <EditableCell value={emp.employeeId || (emp as any).employee_id || ""} field="employeeId" rowId={emp.rowId} className="font-medium" />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={emp.employeeName || (emp as any).employee_name || ""} field="employeeName" rowId={emp.rowId} />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={emp.department || ""} field="department" rowId={emp.rowId} />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={emp.designation || ""} field="designation" rowId={emp.rowId} />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={emp.status || "Active"} field="status" rowId={emp.rowId} />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={String(emp.salary || "")} field="salary" rowId={emp.rowId} className="font-mono text-xs" />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={emp.paymentMode || (emp as any).payment_mode || ""} field="paymentMode" rowId={emp.rowId} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                No employees match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
