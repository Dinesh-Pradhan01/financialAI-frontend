import React, { useState } from "react";
import { Plus, ArrowRight, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { useVendorManualPreview } from "../../hooks/useVendor";
import { useAppDispatch } from "@/shared/store";
import { setVendorPreview, setVendorStep } from "@/shared/store/slices/cfoSlice";
import type { VendorRecord, VendorPreviewResponse, VendorValidationSummary } from "../../types/vendor";
import { toast } from "sonner";

/** Simple short-ID generator – no extra dependency required. */
function shortId(): string {
  return Math.random().toString(36).slice(2, 8);
}

function generateEmptyRow(): Partial<VendorRecord> {
  return {
    vendorId: "",
    vendorName: "",
    email: "",
    industry: "",
    contractId: "",
    status: "Active",
    contractType: "",
  };
}

function normalizeManualPreviewResponse(raw: any, userRows: VendorRecord[]): VendorPreviewResponse {
  let previewData = raw;
  
  if (raw && typeof raw === "object" && raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) {
    previewData = raw.data;
  }
  
  const rawRecords = Array.isArray(previewData?.records) && previewData.records.length > 0 ? previewData.records : userRows;
  
  const records = rawRecords.map((r: any) => ({
    ...r,
    vendorId: r.vendorId || r.vendor_id || "",
    vendorName: r.vendorName || r.vendor_name || "",
    vendor_id: r.vendor_id || r.vendorId || "",
    vendor_name: r.vendor_name || r.vendorName || "",
    contractId: r.contractId || r.contract_id || "",
    contract_id: r.contract_id || r.contractId || "",
    registrationNumber: r.registrationNumber || r.registration_number || "",
    taxId: r.taxId || r.tax_id || "",
    primaryContactName: r.primaryContactName || r.primary_contact_name || "",
    postalCode: r.postalCode || r.postal_code || "",
    contractStartDate: r.contractStartDate || r.contract_start_date || "",
    contractEndDate: r.contractEndDate || r.contract_end_date || "",
    contractType: r.contractType || r.contract_type || "",
    paymentTerms: r.paymentTerms || r.payment_terms || "",
    paymentType: r.paymentType || r.payment_type || "",
    bankName: r.bankName || r.bank_name || "",
    accountNumber: r.accountNumber || r.account_number || "",
    ifscCode: r.ifscCode || r.ifsc_code || "",
    swiftCode: r.swiftCode || r.swift_code || "",
    status: r.status || "Active",
  }));

  const rawSummary = previewData?.summary || previewData?.validation;
  const summary: VendorValidationSummary = {
    validVendors: typeof rawSummary?.validVendors === "number" ? rawSummary.validVendors : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
    warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
    errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
    issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
    errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
    warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
    duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
    missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0,
  };

  return {
    ...previewData,
    records,
    summary,
    validation: summary,
  };
}

export function VendorManualEntryGrid() {
  const dispatch = useAppDispatch();
  const manualPreviewMutation = useVendorManualPreview();

  const [rows, setRows] = useState<(Partial<VendorRecord> & { _rowKey: string })[]>([
    { ...generateEmptyRow(), _rowKey: shortId() },
    { ...generateEmptyRow(), _rowKey: shortId() },
    { ...generateEmptyRow(), _rowKey: shortId() },
  ]);

  const handleAddRow = () => {
    setRows((prev) => [...prev, { ...generateEmptyRow(), _rowKey: shortId() }]);
  };

  const handleRemoveRow = (key: string) => {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r._rowKey !== key) : prev));
  };

  const handleChange = (key: string, field: keyof VendorRecord, value: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r._rowKey !== key) return r;
        return {
          ...r,
          [field]: value,
          // Sync camelCase and snake_case equivalents so sanitization and display always work
          ...(field === "vendorId" ? { vendor_id: value } : {}),
          ...(field === "vendorName" ? { vendor_name: value } : {}),
          ...(field === "contractId" ? { contract_id: value } : {}),
          ...(field === "contractType" ? { contract_type: value } : {}),
        };
      }),
    );
  };

  const handleProceed = async () => {
    // Filter out completely empty rows
    const filledRows = rows.filter(
      (r) =>
        r.vendorId?.trim() ||
        r.vendorName?.trim() ||
        r.email?.trim() ||
        r.industry?.trim() ||
        r.contractId?.trim(),
    );

    if (filledRows.length === 0) {
      toast.error("Please fill in at least one row before proceeding.");
      return;
    }

    const payload: VendorRecord[] = filledRows.map((r, i) => {
      const vId = r.vendorId?.trim() || `VEN-M-${i + 1}`;
      const cId = r.contractId?.trim() || `CTR-${vId}`;
      return {
        rowId: `manual_${i + 1}`,
        sourceRow: i + 1,
        vendorId: vId,
        vendor_id: vId,
        vendorName: r.vendorName?.trim() || "",
        vendor_name: r.vendorName?.trim() || "",
        email: r.email?.trim() || "",
        industry: r.industry?.trim() || "Technology",
        contractId: cId,
        contract_id: cId,
        status: r.status || "Active",
        contractType: r.contractType?.trim() || "Fixed Price",
        contract_type: r.contractType?.trim() || "Fixed Price",
        registrationNumber: "",
        taxId: "",
        primaryContactName: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "India",
        postalCode: "",
        contractStartDate: new Date().toISOString().split("T")[0],
        contractEndDate: "",
        currency: "INR",
        paymentTerms: "Net 30",
        paymentType: "Bank Transfer",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        swiftCode: "",
        recurring: "No",
        isBlank: false,
      };
    });

    try {
      const res = await manualPreviewMutation.mutateAsync(payload);
      const normalized = normalizeManualPreviewResponse(res.data, payload);
      dispatch(setVendorPreview(normalized));
      dispatch(setVendorStep("preview"));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to validate manual records. Continuing with raw data.");
      // Fallback: load raw data into preview without blocking the user
      dispatch(
        setVendorPreview({
          records: payload,
          summary: {
            validVendors: payload.length,
            warnings: 0,
            errors: 0,
            issues: [],
            errorRowIds: [],
            warningRowIds: [],
            duplicateIds: 0,
            missingRequiredFields: 0,
          },
        }),
      );
      dispatch(setVendorStep("preview"));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground">Manual Fast Entry</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Quickly paste or type multiple vendor rows directly.
          </p>
        </div>
        <button
          onClick={handleAddRow}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-alt hover:text-foreground transition shadow-2xs cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Row
        </button>
      </div>

      <Card className="border-border/80 shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-surface-alt/70 text-[11px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border">
              <tr>
                <th className="px-3 py-2.5 w-10 text-center">#</th>
                <th className="px-3 py-2.5 min-w-32.5">Vendor ID</th>
                <th className="px-3 py-2.5 min-w-45">Vendor Name *</th>
                <th className="px-3 py-2.5 min-w-45">Email *</th>
                <th className="px-3 py-2.5 min-w-35">Industry</th>
                <th className="px-3 py-2.5 min-w-32.5">Contract ID</th>
                <th className="px-3 py-2.5 min-w-27.5">Status</th>
                <th className="px-3 py-2.5 min-w-32.5">Contract Type</th>
                <th className="px-2 py-2.5 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, idx) => (
                <tr key={row._rowKey} className="hover:bg-surface-alt/30 transition-colors">
                  <td className="px-3 py-2 text-center text-text-tertiary font-mono text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      placeholder="e.g. VEN-001"
                      value={row.vendorId || ""}
                      onChange={(e) => handleChange(row._rowKey, "vendorId", e.target.value)}
                      className="w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={row.vendorName || ""}
                      onChange={(e) => handleChange(row._rowKey, "vendorName", e.target.value)}
                      className="w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="email"
                      placeholder="billing@acme.com"
                      value={row.email || ""}
                      onChange={(e) => handleChange(row._rowKey, "email", e.target.value)}
                      className="w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      placeholder="e.g. SaaS"
                      value={row.industry || ""}
                      onChange={(e) => handleChange(row._rowKey, "industry", e.target.value)}
                      className="w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      placeholder="CTR-001"
                      value={row.contractId || ""}
                      onChange={(e) => handleChange(row._rowKey, "contractId", e.target.value)}
                      className="w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={row.status || "Active"}
                      onChange={(e) => handleChange(row._rowKey, "status", e.target.value)}
                      className="w-full bg-surface border border-border/80 rounded px-2 py-1 text-xs outline-none focus:border-violet-500 transition"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={row.contractType || "Fixed Price"}
                      onChange={(e) => handleChange(row._rowKey, "contractType", e.target.value)}
                      className="w-full bg-surface border border-border/80 rounded px-2 py-1 text-xs outline-none focus:border-violet-500 transition"
                    >
                      <option value="Fixed Price">Fixed Price</option>
                      <option value="Time & Material">Time & Material</option>
                      <option value="Retainer">Retainer</option>
                      <option value="Subscription">Subscription</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <button
                      onClick={() => handleRemoveRow(row._rowKey)}
                      disabled={rows.length <= 1}
                      className="text-text-tertiary hover:text-destructive transition disabled:opacity-30 disabled:cursor-not-allowed p-1 rounded"
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

      <div className="flex justify-end pt-2">
        <button
          onClick={handleProceed}
          disabled={manualPreviewMutation.isPending}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition disabled:opacity-50 cursor-pointer"
        >
          {manualPreviewMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              Validating Rows...
            </>
          ) : (
            <>
              Proceed to Validation
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
