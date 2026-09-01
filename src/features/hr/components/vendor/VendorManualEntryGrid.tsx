import React, { useState } from "react";
import { Plus, ArrowRight, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { useVendorManualPreview } from "../../hooks/useVendor";
import { useAppDispatch } from "@/shared/store";
import { setVendorPreview, setVendorStep } from "@/shared/store/slices/hrSlice";
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
    upload_id: previewData?.upload_id,
    schema_def: previewData?.schema_def,
    records,
    summary,
    validation: summary,
    file_meta: { name: "Manual Entry" },
  };
}


export function VendorManualEntryGrid() {
  const [rows, setRows] = useState<Partial<VendorRecord>[]>([generateEmptyRow()]);

  const dispatch = useAppDispatch();
  const previewMutation = useVendorManualPreview();

  const handleAddRow = () => {
    setRows([...rows, generateEmptyRow()]);
  };

  const handleDeleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof VendorRecord, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const handleProceed = () => {
    // Filter out completely empty rows
    const validRows = rows.filter((r) => r.vendorId || r.vendorName || r.email);
    if (validRows.length === 0) {
      toast.error("Please fill in at least one row before proceeding.");
      return;
    }

    // Attach row IDs and format fields with snake_case aliases for backend validation schema
    const rowsForBackend = validRows.map((r, idx) => {
      const rowId = r.rowId || `manual-${shortId()}`;
      const sourceRow = idx + 1;
      const contractId = r.contractId || (r as any).contract_id || (r.vendorId ? `CTR-${r.vendorId}` : `CTR-${shortId()}`);
      return {
        ...r,
        rowId,
        sourceRow,
        vendor_id: r.vendorId || (r as any).vendor_id || "",
        vendor_name: r.vendorName || (r as any).vendor_name || "",
        contract_id: contractId,
        contractId: contractId,
        registration_number: r.registrationNumber || (r as any).registration_number || "",
        tax_id: r.taxId || (r as any).tax_id || "",
        industry: r.industry || "",
        primary_contact_name: r.primaryContactName || (r as any).primary_contact_name || "",
        email: r.email || "",
        phone: r.phone || "",
        website: r.website || "",
        address: r.address || "",
        city: r.city || "",
        state: r.state || "",
        country: r.country || "",
        postal_code: r.postalCode || (r as any).postal_code || "",
        contract_start_date: r.contractStartDate || (r as any).contract_start_date || "",
        contract_end_date: r.contractEndDate || (r as any).contract_end_date || "",
        contract_type: r.contractType || (r as any).contract_type || "",
        currency: r.currency || "",
        payment_terms: r.paymentTerms || (r as any).payment_terms || "",
        payment_type: r.paymentType || (r as any).payment_type || "",
        bank_name: r.bankName || (r as any).bank_name || "",
        account_number: r.accountNumber || (r as any).account_number || "",
        ifsc_code: r.ifscCode || (r as any).ifsc_code || "",
        swift_code: r.swiftCode || (r as any).swift_code || "",
        status: r.status || "Active",
        recurring: r.recurring || "",
      };
    });

    previewMutation.mutate(rowsForBackend as unknown as VendorRecord[], {
      onSuccess: (res) => {
        const rawPayload = (res as { data?: unknown })?.data ?? res;
        const normalized = normalizeManualPreviewResponse(rawPayload, rowsForBackend as unknown as VendorRecord[]);
        dispatch(setVendorPreview(normalized));
        dispatch(setVendorStep("preview"));
      },
      onError: (err: unknown) => {
        const msg =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data
            ?.message ??
          (err as { message?: string })?.message ??
          "Failed to preview manual entry data.";

        const rowsWithIds2 = rowsForBackend as unknown as VendorRecord[];

        const localNormalized: VendorPreviewResponse = {
          records: rowsWithIds2,
          validation: {
            validVendors: rowsWithIds2.length,
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
        dispatch(setVendorPreview(localNormalized));
        dispatch(setVendorStep("preview"));
      },
    });
  };

  const hasData = rows.some((r) => r.vendorId || r.vendorName || r.email);

  return (
    <Card className="overflow-hidden border-border/80 shadow-xs">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-alt/50">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Manual Entry</h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Add vendors directly without an Excel file
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
            className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3.5 text-xs font-semibold text-white shadow-brand transition hover:bg-primary-hover disabled:opacity-50"
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
              <th className="px-4 py-2.5 font-semibold min-w-32.5">
                Vendor ID <span className="text-destructive">*</span>
              </th>
              <th className="px-4 py-2.5 font-semibold min-w-45">
                Vendor Name <span className="text-destructive">*</span>
              </th>
              <th className="px-4 py-2.5 font-semibold min-w-35">
                Contract ID <span className="text-destructive">*</span>
              </th>
              <th className="px-4 py-2.5 font-semibold min-w-50">
                Email <span className="text-destructive">*</span>
              </th>
              <th className="px-4 py-2.5 font-semibold min-w-35">Industry</th>
              <th className="px-4 py-2.5 font-semibold min-w-40">Contract Type</th>
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
                    value={row.vendorId || ""}
                    onChange={(e) => handleChange(i, "vendorId", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="VEN001"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.vendorName || ""}
                    onChange={(e) => handleChange(i, "vendorName", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="Acme Corp"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.contractId || ""}
                    onChange={(e) => handleChange(i, "contractId", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="CTR-001"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="email"
                    value={row.email || ""}
                    onChange={(e) => handleChange(i, "email", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="info@acme.com"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.industry || ""}
                    onChange={(e) => handleChange(i, "industry", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="Software"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={row.contractType || ""}
                    onChange={(e) => handleChange(i, "contractType", e.target.value)}
                    className="w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm"
                    placeholder="Annual"
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
