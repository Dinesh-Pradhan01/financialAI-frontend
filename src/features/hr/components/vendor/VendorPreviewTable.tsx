import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import { setVendorFocusedRow, updateVendorField } from "@/shared/store/slices/hrSlice";
import { cn } from "@/shared/lib/utils";
import type { VendorRecord } from "../../types/vendor";

function validateVendorField(field: string, value: string): string | null {
  if (!value) {
    if (
      field === "vendor_id" ||
      field === "vendorId" ||
      field === "contract_id" ||
      field === "contractId" ||
      field === "vendor_name" ||
      field === "vendorName"
    )
      return "Required";
    return null;
  }
  switch (field) {
    case "gst_number":
    case "gstNumber":
      return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value) ? null : "Invalid GST";
    case "pan_number":
    case "panNumber":
    case "taxId":
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? null : "Invalid PAN";
    case "cin_number":
    case "cinNumber":
      return /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/.test(value) ? null : "Invalid CIN";
    case "payment_flow":
    case "paymentFlow":
      return ["debit", "credit"].includes(value.toLowerCase()) ? null : "Must be debit or credit";
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
    const validationError = validateVendorField(field, val);
    setError(validationError);
    if (!validationError && val !== (value || "")) {
      dispatch(updateVendorField({ rowId, field, value: val }));
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

export function VendorPreviewTable({
  vendors,
  errorRowIds,
  warningRowIds,
}: {
  vendors: VendorRecord[];
  errorRowIds: Set<string>;
  warningRowIds: Set<string>;
}) {
  const dispatch = useAppDispatch();
  const focusedRowId = useAppSelector((state) => state.hr.vendor.focusedRowId);
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});

  useEffect(() => {
    if (focusedRowId && rowRefs.current[focusedRowId]) {
      rowRefs.current[focusedRowId]?.scrollIntoView({ behavior: "smooth", block: "center" });

      const timer = setTimeout(() => {
        dispatch(setVendorFocusedRow(null));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [focusedRowId, dispatch]);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-surface-alt/80 text-xs text-text-secondary border-b border-border sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 font-semibold min-w-[120px]">Vendor ID</th>
            <th className="px-4 py-3 font-semibold min-w-[220px]">Name</th>
            <th className="px-4 py-3 font-semibold min-w-[140px]">Contract ID</th>
            <th className="px-4 py-3 font-semibold min-w-[220px]">Industry</th>
            <th className="px-4 py-3 font-semibold min-w-[120px]">Status</th>
            <th className="px-4 py-3 font-semibold min-w-[160px]">Contract Type</th>
            <th className="px-4 py-3 font-semibold min-w-[120px]">Currency</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {vendors.length > 0 ? (
            vendors.map((ven) => {
              const isError = errorRowIds.has(ven.rowId);
              const isWarning = warningRowIds.has(ven.rowId);
              const isFocused = focusedRowId === ven.rowId;

              return (
                <tr
                  key={ven.rowId}
                  ref={(el) => {
                    rowRefs.current[ven.rowId] = el;
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
                    <EditableCell value={ven.vendorId || (ven as any).vendor_id || ""} field="vendorId" rowId={ven.rowId} className="font-medium" />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={ven.vendorName || (ven as any).vendor_name || ""} field="vendorName" rowId={ven.rowId} />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={ven.contractId || (ven as any).contract_id || ""} field="contractId" rowId={ven.rowId} className="font-mono text-xs text-text-secondary" />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={ven.industry || ""} field="industry" rowId={ven.rowId} />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={ven.status || "Active"} field="status" rowId={ven.rowId} />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={ven.contractType || (ven as any).contract_type || ""} field="contractType" rowId={ven.rowId} />
                  </td>
                  <td className="px-2 py-0.5">
                    <EditableCell value={ven.currency || ""} field="currency" rowId={ven.rowId} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr key="empty-state">
              <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                No vendors match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
