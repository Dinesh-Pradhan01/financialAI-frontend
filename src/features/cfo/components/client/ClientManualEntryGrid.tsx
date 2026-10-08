import React, { useState } from "react";
import { Plus, ArrowRight, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { useClientManualPreview } from "../../hooks/useClient";
import { useAppDispatch } from "@/shared/store";
import { setClientPreview, setClientStep } from "@/shared/store/slices/cfoSlice";
import { normalizeClientPreviewResponse } from "../../api/clientApi";
import type { ClientRecord } from "../../types/client";
import { toast } from "sonner";

function shortId(): string {
  return Math.random().toString(36).slice(2, 8);
}

function generateEmptyClientRow(): Partial<ClientRecord> {
  return {
    clientId: "",
    clientName: "",
    category: "Consulting",
    revenue: "",
    contractValue: "",
    contractId: "",
    frequency: "Monthly",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    status: "Active",
  };
}

export function ClientManualEntryGrid() {
  const dispatch = useAppDispatch();
  const manualPreviewMutation = useClientManualPreview();

  const [rows, setRows] = useState<(Partial<ClientRecord> & { _rowKey: string })[]>([
    { ...generateEmptyClientRow(), _rowKey: shortId() },
    { ...generateEmptyClientRow(), _rowKey: shortId() },
    { ...generateEmptyClientRow(), _rowKey: shortId() },
  ]);

  const handleAddRow = () => {
    setRows((prev) => [...prev, { ...generateEmptyClientRow(), _rowKey: shortId() }]);
  };

  const handleRemoveRow = (key: string) => {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r._rowKey !== key) : prev));
  };

  const handleChange = (key: string, field: keyof ClientRecord, value: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r._rowKey !== key) return r;
        return {
          ...r,
          [field]: value,
          ...(field === "clientId" ? { client_id: value } : {}),
          ...(field === "clientName" ? { client_name: value } : {}),
          ...(field === "contractId" ? { contract_id: value } : {}),
          ...(field === "contractValue" ? { contract_value: value } : {}),
          ...(field === "bankName" ? { bank_name: value } : {}),
          ...(field === "accountHolderName" ? { account_holder_name: value } : {}),
          ...(field === "accountNumber" ? { account_number: value } : {}),
          ...(field === "ifscCode" ? { ifsc_code: value } : {}),
        };
      }),
    );
  };

  const handleProceed = async () => {
    const filledRows = rows.filter(
      (r) =>
        r.clientId?.trim() ||
        r.clientName?.trim() ||
        r.contractId?.trim() ||
        r.bankName?.trim() ||
        r.revenue !== "" ||
        r.contractValue !== "",
    );

    if (filledRows.length === 0) {
      toast.error("Please enter at least one client record before proceeding.");
      return;
    }

    const payload: ClientRecord[] = filledRows.map((r, i) => {
      const cId = r.clientId?.trim() || `CLI-M-${i + 1}`;
      const contractId = r.contractId?.trim() || `CTR-${cId}`;
      const cName = r.clientName?.trim() || "";
      const cat = r.category?.trim() || "Consulting";
      const revNum = Number(r.revenue) || 0;
      const valNum = Number(r.contractValue) || revNum * 12;

      return {
        rowId: `manual_${i + 1}`,
        sourceRow: i + 1,
        clientId: cId,
        client_id: cId,
        clientName: cName,
        client_name: cName,
        category: cat,
        contractId,
        contract_id: contractId,
        revenue: revNum,
        contractValue: valNum,
        contract_value: valNum,
        frequency: r.frequency?.trim() || "Monthly",
        bankName: r.bankName?.trim() || "",
        bank_name: r.bankName?.trim() || "",
        accountHolderName: r.accountHolderName?.trim() || cName,
        account_holder_name: r.accountHolderName?.trim() || cName,
        accountNumber: r.accountNumber?.trim() || "",
        account_number: r.accountNumber?.trim() || "",
        ifscCode: (r.ifscCode?.trim() || "").toUpperCase(),
        ifsc_code: (r.ifscCode?.trim() || "").toUpperCase(),
        status: r.status || "Active",
        legalName: cName,
        legal_name: cName,
        industry: "Other",
        contractType: "Fixed Price",
        contract_type: "Fixed Price",
        contractStartDate: new Date().toISOString().split("T")[0],
        contractEndDate: "",
        currency: "INR",
        paymentType: "Bank Transfer",
        payment_type: "Bank Transfer",
        recurring: "Yes",
        isBlank: false,
      };
    });

    try {
      const res = await manualPreviewMutation.mutateAsync(payload);
      const normalized = normalizeClientPreviewResponse(res.data, payload);
      dispatch(setClientPreview(normalized));
      dispatch(setClientStep("preview"));
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Validation warning on manual records. Loaded into preview for editing.",
      );
      const fallback = normalizeClientPreviewResponse({ records: payload }, payload);
      dispatch(setClientPreview(fallback));
      dispatch(setClientStep("preview"));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-foreground">Or Enter Clients Manually</h4>
          <p className="text-xs text-text-secondary">
            Provide client details, billing parameters, and banking information.
          </p>
        </div>
        <button
          onClick={handleAddRow}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Row
        </button>
      </div>

      <Card className="border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-surface-alt border-b border-border text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              <tr>
                <th className="px-3 py-2.5">Client ID *</th>
                <th className="px-3 py-2.5">Client Name *</th>
                <th className="px-3 py-2.5">Category *</th>
                <th className="px-3 py-2.5">Revenue *</th>
                <th className="px-3 py-2.5">Contract Value *</th>
                <th className="px-3 py-2.5">Bank Name *</th>
                <th className="px-3 py-2.5">Account Number *</th>
                <th className="px-3 py-2.5">IFSC Code *</th>
                <th className="px-3 py-2.5 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row._rowKey} className="hover:bg-surface-alt/50 transition">
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="CLI-001"
                      value={row.clientId || ""}
                      onChange={(e) => handleChange(row._rowKey, "clientId", e.target.value)}
                      className="h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={row.clientName || ""}
                      onChange={(e) => handleChange(row._rowKey, "clientName", e.target.value)}
                      className="h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="p-2">
                    <select
                      value={row.category || "Consulting"}
                      onChange={(e) => handleChange(row._rowKey, "category", e.target.value)}
                      className="h-8 w-full rounded-md border border-border bg-surface px-2 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="Consulting">Consulting</option>
                      <option value="Software / SaaS">Software / SaaS</option>
                      <option value="IT Services">IT Services</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Legal">Legal</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      placeholder="50000"
                      value={row.revenue !== undefined ? row.revenue : ""}
                      onChange={(e) => handleChange(row._rowKey, "revenue", e.target.value)}
                      className="h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      placeholder="600000"
                      value={row.contractValue !== undefined ? row.contractValue : ""}
                      onChange={(e) => handleChange(row._rowKey, "contractValue", e.target.value)}
                      className="h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="HDFC Bank"
                      value={row.bankName || ""}
                      onChange={(e) => handleChange(row._rowKey, "bankName", e.target.value)}
                      className="h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="50100123456789"
                      value={row.accountNumber || ""}
                      onChange={(e) => handleChange(row._rowKey, "accountNumber", e.target.value)}
                      className="h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      placeholder="HDFC0001234"
                      value={row.ifscCode || ""}
                      onChange={(e) => handleChange(row._rowKey, "ifscCode", e.target.value.toUpperCase())}
                      className="h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground uppercase focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleRemoveRow(row._rowKey)}
                      disabled={rows.length <= 1}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary hover:bg-destructive/10 hover:text-destructive transition disabled:opacity-30 disabled:cursor-not-allowed mx-auto"
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
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition disabled:opacity-50"
        >
          {manualPreviewMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Validating...
            </>
          ) : (
            <>
              Proceed to Preview
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
