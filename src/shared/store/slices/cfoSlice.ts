import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { VendorFilters } from "@/shared/types/cfo";
import type { VendorPreviewResponse } from "@/features/cfo/types/vendor";
import type { ClientFilters, ClientPreviewResponse } from "@/features/cfo/types/client";
import type { RowAgreementState, ExtractedAgreementData } from "@/features/cfo/types/agreement";

export const emptyVendorFilters: VendorFilters = {
  search: "",
  industry: "",
  status: "",
  currency: "",
  contractType: "",
  paymentType: "",
};

export const emptyClientFilters: ClientFilters = {
  search: "",
  category: "",
  industry: "",
  status: "",
  recurring: "",
  contractType: "",
  paymentType: "",
};

interface CfoState {
  vendor: {
    step: "upload" | "preview";
    backendPreview: VendorPreviewResponse | null;
    pastPreviews: VendorPreviewResponse[];
    lastValidatedAt: string | null;
    isDirtySinceValidation: boolean;
    filters: VendorFilters;
    focusedRowId: string | null;
    agreements: Record<string, RowAgreementState>;
  };
  client: {
    step: "upload" | "preview";
    backendPreview: ClientPreviewResponse | null;
    pastPreviews: ClientPreviewResponse[];
    lastValidatedAt: string | null;
    isDirtySinceValidation: boolean;
    filters: ClientFilters;
    focusedRowId: string | null;
    agreements: Record<string, RowAgreementState>;
  };
}

const initialState: CfoState = {
  vendor: {
    step: "upload",
    backendPreview: null,
    pastPreviews: [],
    lastValidatedAt: null,
    isDirtySinceValidation: false,
    filters: emptyVendorFilters,
    focusedRowId: null,
    agreements: {},
  },
  client: {
    step: "upload",
    backendPreview: null,
    pastPreviews: [],
    lastValidatedAt: null,
    isDirtySinceValidation: false,
    filters: emptyClientFilters,
    focusedRowId: null,
    agreements: {},
  },
};

const cfoSlice = createSlice({
  name: "cfo",
  initialState,
  reducers: {
    setVendorStep: (state, action: PayloadAction<"upload" | "preview">) => {
      state.vendor.step = action.payload;
    },
    setVendorPreview: (state, action: PayloadAction<VendorPreviewResponse | null>) => {
      state.vendor.backendPreview = action.payload;
      state.vendor.lastValidatedAt = action.payload ? new Date().toISOString() : null;
      state.vendor.isDirtySinceValidation = false;
      state.vendor.pastPreviews = [];
    },
    updateVendorField: (
      state,
      action: PayloadAction<{ rowId: string; field: string; value: any }>,
    ) => {
      if (!state.vendor.backendPreview || !state.vendor.backendPreview.records) return;

      const { rowId, field, value } = action.payload;
      const idx = state.vendor.backendPreview.records.findIndex((r) => r.rowId === rowId);
      if (idx === -1) return;

      // Snapshot current state BEFORE mutation as a plain object
      const snapshot = JSON.parse(JSON.stringify(current(state.vendor.backendPreview)));
      state.vendor.pastPreviews.push(snapshot);
      if (state.vendor.pastPreviews.length > 50) state.vendor.pastPreviews.shift();

      state.vendor.isDirtySinceValidation = true;
      const target = state.vendor.backendPreview.records[idx] as any;
      target[field] = value;
      if (field === "vendor_name") target.vendorName = value;
      if (field === "vendorName") target.vendor_name = value;
      if (field === "vendor_id") target.vendorId = value;
      if (field === "vendorId") target.vendor_id = value;
      if (field === "contract_id") target.contractId = value;
      if (field === "contractId") target.contract_id = value;
      if (field === "contract_type") target.contractType = value;
      if (field === "contractType") target.contract_type = value;
      if (field === "gst_number") target.gstNumber = value;
      if (field === "gstNumber") target.gst_number = value;
      if (field === "pan_number") target.panNumber = value;
      if (field === "panNumber") target.pan_number = value;
      if (field === "contract_value") target.contractValue = value;
      if (field === "contractValue") target.contract_value = value;
      if (field === "monthly_cost" || field === "monthlyCost" || field === "cost") {
        target.monthly_cost = value;
        target.monthlyCost = value;
        target.cost = value;
      }

      // Auto-calculate monthly cost for subscription if not provided: contract_value / 12
      const contractTypeStr = String(target.contract_type || target.contractType || "").trim().toLowerCase();
      const frequencyStr = String(target.frequency || "").trim().toLowerCase();
      const recurringStr = String(target.recurring ?? "").trim().toLowerCase();
      const isSubscription =
        contractTypeStr.includes("sub") ||
        frequencyStr.includes("sub") ||
        recurringStr === "true" ||
        recurringStr === "yes" ||
        recurringStr === "1";

      const currentMonthly = target.monthly_cost ?? target.monthlyCost ?? target.cost;
      const contractVal = Number(target.contract_value ?? target.contractValue ?? 0);

      if (
        isSubscription &&
        contractVal > 0 &&
        (currentMonthly === "" ||
          currentMonthly == null ||
          Number(currentMonthly) === 0 ||
          isNaN(Number(currentMonthly)))
      ) {
        const autoMonthlyCost = Math.round((contractVal / 12) * 100) / 100;
        target.monthly_cost = autoMonthlyCost;
        target.monthlyCost = autoMonthlyCost;
        target.cost = autoMonthlyCost;
      }

      // Dynamically clear resolved issues from summary and validation
      const clearIssue = (summaryObj: any, fieldKey: string) => {
        if (!summaryObj || !Array.isArray(summaryObj.issues)) return;
        const normKey = fieldKey.toLowerCase().replace(/_/g, "");
        summaryObj.issues = summaryObj.issues.filter((issue: any) => {
          const isSameRow =
            String(issue.rowId) === String(rowId) ||
            (target.sourceRow != null && String(issue.sourceRow) === String(target.sourceRow));
          if (!isSameRow) return true;
          const issueFieldNorm = String(issue.field || "").toLowerCase().replace(/_/g, "");
          const isMatch =
            issueFieldNorm === normKey ||
            ((normKey.includes("monthly") || normKey.includes("cost")) &&
              (issueFieldNorm.includes("monthly") || issueFieldNorm.includes("cost")));
          return !isMatch;
        });

        const remainingErrors = summaryObj.issues.filter(
          (i: any) =>
            (String(i.rowId) === String(rowId) ||
              (target.sourceRow != null && String(i.sourceRow) === String(target.sourceRow))) &&
            i.severity === "error",
        );

        if (remainingErrors.length === 0 && Array.isArray(summaryObj.errorRowIds)) {
          summaryObj.errorRowIds = summaryObj.errorRowIds.filter(
            (id: string) => String(id) !== String(rowId),
          );
        }

        summaryObj.errors = summaryObj.issues.filter((i: any) => i.severity === "error").length;
        if (
          Array.isArray(state.vendor.backendPreview?.records) &&
          Array.isArray(summaryObj.errorRowIds)
        ) {
          summaryObj.validVendors =
            state.vendor.backendPreview.records.length - summaryObj.errorRowIds.length;
        }
      };

      if (value !== "" && value != null) {
        clearIssue(state.vendor.backendPreview.summary, field);
        clearIssue(state.vendor.backendPreview.validation, field);
      }

      const updatedMonthly = target.monthly_cost ?? target.monthlyCost;
      if (
        updatedMonthly !== "" &&
        updatedMonthly != null &&
        !isNaN(Number(updatedMonthly)) &&
        Number(updatedMonthly) > 0
      ) {
        clearIssue(state.vendor.backendPreview.summary, "monthly_cost");
        clearIssue(state.vendor.backendPreview.validation, "monthly_cost");
      }
    },
    addVendorRow: (state) => {
      if (!state.vendor.backendPreview || !state.vendor.backendPreview.records) return;
      const snapshot = JSON.parse(JSON.stringify(current(state.vendor.backendPreview)));
      state.vendor.pastPreviews.push(snapshot);
      if (state.vendor.pastPreviews.length > 50) state.vendor.pastPreviews.shift();
      state.vendor.isDirtySinceValidation = true;

      const newRowId = `row_${Math.random().toString(36).substring(2, 9)}`;

      // Initialize an empty record dynamically based on schema_def if available
      const newRecord: any = { rowId: newRowId };
      if (state.vendor.backendPreview.schema_def?.fields) {
        state.vendor.backendPreview.schema_def.fields.forEach((field: any) => {
          newRecord[field.name] = field.name === "status" ? "Active" : "";
        });
      } else {
        // Fallback if schema_def is missing
        Object.assign(newRecord, {
          vendorId: "",
          vendorName: "",
          contractId: "",
          industry: "",
          status: "Active",
          contractType: "",
          currency: "",
        });
      }

      state.vendor.backendPreview.records.push(newRecord);

      // Optionally focus the new row
      state.vendor.focusedRowId = newRowId;
    },
    undoVendorEdit: (state) => {
      if (state.vendor.pastPreviews.length > 0) {
        const prev = state.vendor.pastPreviews.pop();
        if (prev) state.vendor.backendPreview = prev;
      }
    },
    discardVendorPreview: (state) => {
      state.vendor.backendPreview = null;
      state.vendor.pastPreviews = [];
      state.vendor.lastValidatedAt = null;
      state.vendor.isDirtySinceValidation = false;
      state.vendor.step = "upload";
    },
    setVendorFilters: (state, action: PayloadAction<VendorFilters>) => {
      state.vendor.filters = action.payload;
    },
    setVendorFocusedRow: (state, action: PayloadAction<string | null>) => {
      state.vendor.focusedRowId = action.payload;
    },
    resetVendor: (state) => {
      state.vendor = initialState.vendor;
    },

    // ── Client Reducers ────────────────────────────────────────────────
    setClientStep: (state, action: PayloadAction<"upload" | "preview">) => {
      state.client.step = action.payload;
    },
    setClientPreview: (state, action: PayloadAction<ClientPreviewResponse | null>) => {
      state.client.backendPreview = action.payload;
      state.client.lastValidatedAt = action.payload ? new Date().toISOString() : null;
      state.client.isDirtySinceValidation = false;
      state.client.pastPreviews = [];
    },
    updateClientField: (
      state,
      action: PayloadAction<{ rowId: string; field: string; value: any }>,
    ) => {
      if (!state.client.backendPreview || !state.client.backendPreview.records) return;

      const { rowId, field, value } = action.payload;
      const idx = state.client.backendPreview.records.findIndex((r) => r.rowId === rowId);
      if (idx === -1) return;

      // Snapshot current state BEFORE mutation as a plain object
      const snapshot = JSON.parse(JSON.stringify(current(state.client.backendPreview)));
      state.client.pastPreviews.push(snapshot);
      if (state.client.pastPreviews.length > 50) state.client.pastPreviews.shift();

      state.client.isDirtySinceValidation = true;
      const target = state.client.backendPreview.records[idx] as any;
      target[field] = value;

      // Sync camelCase <-> snake_case equivalents
      if (field === "client_name") target.clientName = value;
      if (field === "clientName") target.client_name = value;
      if (field === "client_id") target.clientId = value;
      if (field === "clientId") target.client_id = value;
      if (field === "contract_id") target.contractId = value;
      if (field === "contractId") target.contract_id = value;
      if (field === "contract_type") target.contractType = value;
      if (field === "contractType") target.contract_type = value;
      if (field === "contract_value") target.contractValue = value;
      if (field === "contractValue") target.contract_value = value;
      if (field === "legal_name") target.legalName = value;
      if (field === "legalName") target.legal_name = value;
      if (field === "payment_type") target.paymentType = value;
      if (field === "paymentType") target.payment_type = value;
      if (field === "bank_name") target.bankName = value;
      if (field === "bankName") target.bank_name = value;
      if (field === "account_holder_name") target.accountHolderName = value;
      if (field === "accountHolderName") target.account_holder_name = value;
      if (field === "account_number") target.accountNumber = value;
      if (field === "accountNumber") target.account_number = value;
      if (field === "ifsc_code") target.ifscCode = value;
      if (field === "ifscCode") target.ifsc_code = value;
    },
    addClientRow: (state) => {
      if (!state.client.backendPreview || !state.client.backendPreview.records) return;
      const snapshot = JSON.parse(JSON.stringify(current(state.client.backendPreview)));
      state.client.pastPreviews.push(snapshot);
      if (state.client.pastPreviews.length > 50) state.client.pastPreviews.shift();
      state.client.isDirtySinceValidation = true;

      const newRowId = `row_${Math.random().toString(36).substring(2, 9)}`;

      const newRecord: any = {
        rowId: newRowId,
        clientId: "",
        client_id: "",
        clientName: "",
        client_name: "",
        category: "Consulting",
        revenue: 0,
        contractValue: 0,
        contract_value: 0,
        contractId: "",
        contract_id: "",
        industry: "Other",
        status: "Active",
        contractType: "Fixed Price",
        contract_type: "Fixed Price",
        currency: "INR",
        frequency: "Monthly",
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
      };

      if (state.client.backendPreview.schema_def?.fields) {
        state.client.backendPreview.schema_def.fields.forEach((field: any) => {
          if (newRecord[field.name] === undefined) {
            newRecord[field.name] = field.name === "status" ? "Active" : "";
          }
        });
      }

      state.client.backendPreview.records.push(newRecord);
      state.client.focusedRowId = newRowId;
    },
    undoClientEdit: (state) => {
      if (state.client.pastPreviews.length > 0) {
        const prev = state.client.pastPreviews.pop();
        if (prev) state.client.backendPreview = prev;
      }
    },
    discardClientPreview: (state) => {
      state.client.backendPreview = null;
      state.client.pastPreviews = [];
      state.client.lastValidatedAt = null;
      state.client.isDirtySinceValidation = false;
      state.client.step = "upload";
    },
    setClientFilters: (state, action: PayloadAction<ClientFilters>) => {
      state.client.filters = action.payload;
    },
    setClientFocusedRow: (state, action: PayloadAction<string | null>) => {
      state.client.focusedRowId = action.payload;
    },
    resetClient: (state) => {
      state.client = initialState.client;
    },
    setVendorRowAgreement: (
      state,
      action: PayloadAction<{ rowId: string; agreement: Partial<RowAgreementState> }>,
    ) => {
      if (!state.vendor.agreements) state.vendor.agreements = {};
      const { rowId, agreement } = action.payload;
      const currentAgreement = state.vendor.agreements[rowId] || { status: "none" };
      state.vendor.agreements[rowId] = {
        ...currentAgreement,
        ...agreement,
      };
    },
    setClientRowAgreement: (
      state,
      action: PayloadAction<{ rowId: string; agreement: Partial<RowAgreementState> }>,
    ) => {
      if (!state.client.agreements) state.client.agreements = {};
      const { rowId, agreement } = action.payload;
      const currentAgreement = state.client.agreements[rowId] || { status: "none" };
      state.client.agreements[rowId] = {
        ...currentAgreement,
        ...agreement,
      };
    },
    applyVendorExtractedData: (
      state,
      action: PayloadAction<{ rowId: string; extracted: ExtractedAgreementData }>,
    ) => {
      if (!state.vendor.backendPreview || !state.vendor.backendPreview.records) return;
      const { rowId, extracted } = action.payload;
      const idx = state.vendor.backendPreview.records.findIndex((r) => r.rowId === rowId);
      if (idx === -1) return;

      const snapshot = JSON.parse(JSON.stringify(current(state.vendor.backendPreview)));
      state.vendor.pastPreviews.push(snapshot);
      if (state.vendor.pastPreviews.length > 50) state.vendor.pastPreviews.shift();
      state.vendor.isDirtySinceValidation = true;

      const rec = state.vendor.backendPreview.records[idx] as any;
      const backendPreview = state.vendor.backendPreview;

      const clearIssue = (summaryObj: any, fieldKey: string) => {
        if (!summaryObj || !Array.isArray(summaryObj.issues)) return;
        const normKey = fieldKey.toLowerCase().replace(/_/g, "");
        summaryObj.issues = summaryObj.issues.filter((issue: any) => {
          const isSameRow = String(issue.rowId) === String(rowId) || (rec.sourceRow != null && String(issue.sourceRow) === String(rec.sourceRow));
          if (!isSameRow) return true;
          const issueFieldNorm = String(issue.field || "").toLowerCase().replace(/_/g, "");
          const isMatch = issueFieldNorm === normKey || ((normKey.includes("monthly") || normKey.includes("cost")) && (issueFieldNorm.includes("monthly") || issueFieldNorm.includes("cost")));
          return !isMatch;
        });

        const remainingErrors = summaryObj.issues.filter((i: any) => (String(i.rowId) === String(rowId) || (rec.sourceRow != null && String(i.sourceRow) === String(rec.sourceRow))) && i.severity === "error");

        if (remainingErrors.length === 0 && Array.isArray(summaryObj.errorRowIds)) {
          summaryObj.errorRowIds = summaryObj.errorRowIds.filter((id: string) => String(id) !== String(rowId));
        }

        summaryObj.errors = summaryObj.issues.filter((i: any) => i.severity === "error").length;
        if (Array.isArray(backendPreview?.records) && Array.isArray(summaryObj.errorRowIds)) {
          summaryObj.validVendors = backendPreview.records.length - summaryObj.errorRowIds.length;
        }
      };

      const isEmpty = (val: any) => val === undefined || val === null || String(val).trim() === "" || String(val).trim() === "0";

      const extStartDate = extracted.contract_start_date ?? (extracted as any).contractStartDate;
      if (extStartDate != null && isEmpty(rec.contract_start_date) && isEmpty(rec.contractStartDate)) {
        rec.contractStartDate = extStartDate;
        rec.contract_start_date = extStartDate;
        clearIssue(backendPreview.summary, "contract_start_date");
        clearIssue(backendPreview.validation, "contract_start_date");
      }

      const extEndDate = extracted.contract_end_date ?? (extracted as any).contractEndDate;
      if (extEndDate != null && isEmpty(rec.contract_end_date) && isEmpty(rec.contractEndDate)) {
        rec.contractEndDate = extEndDate;
        rec.contract_end_date = extEndDate;
        clearIssue(backendPreview.summary, "contract_end_date");
        clearIssue(backendPreview.validation, "contract_end_date");
      }

      const extValue = extracted.contract_value ?? (extracted as any).contractValue;
      if (extValue != null && isEmpty(rec.contract_value) && isEmpty(rec.contractValue)) {
        rec.contractValue = extValue;
        rec.contract_value = extValue;
        clearIssue(backendPreview.summary, "contract_value");
        clearIssue(backendPreview.validation, "contract_value");
      }

      if (extracted.currency != null && isEmpty(rec.currency)) {
        rec.currency = extracted.currency;
        clearIssue(backendPreview.summary, "currency");
        clearIssue(backendPreview.validation, "currency");
      }

      const extType = extracted.contract_type ?? (extracted as any).contractType;
      if (extType != null && isEmpty(rec.contract_type) && isEmpty(rec.contractType)) {
        rec.contractType = extType;
        rec.contract_type = extType;
        clearIssue(backendPreview.summary, "contract_type");
        clearIssue(backendPreview.validation, "contract_type");
      }

      // Calculate monthly cost dynamically if contract value is updated and it's a subscription
      const contractVal = Number(rec.contract_value ?? rec.contractValue ?? 0);
      const isSub = String(rec.contract_type || rec.contractType || "").toLowerCase().includes("sub") || ["true", "yes", "1"].includes(String(rec.recurring || "").toLowerCase());
      if (isSub && contractVal > 0 && isEmpty(rec.monthly_cost) && isEmpty(rec.monthlyCost)) {
        const autoMonthlyCost = Math.round((contractVal / 12) * 100) / 100;
        rec.monthly_cost = autoMonthlyCost;
        rec.monthlyCost = autoMonthlyCost;
        rec.cost = autoMonthlyCost;
        clearIssue(backendPreview.summary, "monthly_cost");
        clearIssue(backendPreview.validation, "monthly_cost");
      }

      if (Array.isArray(rec.validation_errors)) {
        const issuesForRec = backendPreview.summary?.issues?.filter((i: any) => String(i.rowId) === String(rowId) || (rec.sourceRow != null && String(i.sourceRow) === String(rec.sourceRow))) || [];
        rec.validation_errors = issuesForRec.map((i: any) => i.message);
        rec.validation_status = rec.validation_errors.length > 0 ? "invalid" : "valid";
      }

      if (state.vendor.agreements?.[rowId]) {
        state.vendor.agreements[rowId].isApplied = true;
      }
    },
    applyClientExtractedData: (
      state,
      action: PayloadAction<{ rowId: string; extracted: ExtractedAgreementData }>,
    ) => {
      if (!state.client.backendPreview || !state.client.backendPreview.records) return;
      const { rowId, extracted } = action.payload;
      const idx = state.client.backendPreview.records.findIndex((r) => r.rowId === rowId);
      if (idx === -1) return;

      const snapshot = JSON.parse(JSON.stringify(current(state.client.backendPreview)));
      state.client.pastPreviews.push(snapshot);
      if (state.client.pastPreviews.length > 50) state.client.pastPreviews.shift();
      state.client.isDirtySinceValidation = true;

      const rec = state.client.backendPreview.records[idx] as any;
      const backendPreview = state.client.backendPreview;

      const clearIssue = (summaryObj: any, fieldKey: string) => {
        if (!summaryObj || !Array.isArray(summaryObj.issues)) return;
        const normKey = fieldKey.toLowerCase().replace(/_/g, "");
        summaryObj.issues = summaryObj.issues.filter((issue: any) => {
          const isSameRow = String(issue.rowId) === String(rowId) || (rec.sourceRow != null && String(issue.sourceRow) === String(rec.sourceRow));
          if (!isSameRow) return true;
          const issueFieldNorm = String(issue.field || "").toLowerCase().replace(/_/g, "");
          const isMatch = issueFieldNorm === normKey || ((normKey.includes("monthly") || normKey.includes("cost")) && (issueFieldNorm.includes("monthly") || issueFieldNorm.includes("cost")));
          return !isMatch;
        });

        const remainingErrors = summaryObj.issues.filter((i: any) => (String(i.rowId) === String(rowId) || (rec.sourceRow != null && String(i.sourceRow) === String(rec.sourceRow))) && i.severity === "error");

        if (remainingErrors.length === 0 && Array.isArray(summaryObj.errorRowIds)) {
          summaryObj.errorRowIds = summaryObj.errorRowIds.filter((id: string) => String(id) !== String(rowId));
        }

        summaryObj.errors = summaryObj.issues.filter((i: any) => i.severity === "error").length;
        if (Array.isArray(backendPreview?.records) && Array.isArray(summaryObj.errorRowIds)) {
          summaryObj.validVendors = backendPreview.records.length - summaryObj.errorRowIds.length;
        }
      };

      const isEmpty = (val: any) => val === undefined || val === null || String(val).trim() === "" || String(val).trim() === "0";

      const extStartDate = extracted.contract_start_date ?? (extracted as any).contractStartDate;
      if (extStartDate != null && isEmpty(rec.contract_start_date) && isEmpty(rec.contractStartDate)) {
        rec.contractStartDate = extStartDate;
        rec.contract_start_date = extStartDate;
        clearIssue(backendPreview.summary, "contract_start_date");
        clearIssue(backendPreview.validation, "contract_start_date");
      }

      const extEndDate = extracted.contract_end_date ?? (extracted as any).contractEndDate;
      if (extEndDate != null && isEmpty(rec.contract_end_date) && isEmpty(rec.contractEndDate)) {
        rec.contractEndDate = extEndDate;
        rec.contract_end_date = extEndDate;
        clearIssue(backendPreview.summary, "contract_end_date");
        clearIssue(backendPreview.validation, "contract_end_date");
      }

      const extValue = extracted.contract_value ?? (extracted as any).contractValue;
      if (extValue != null && isEmpty(rec.contract_value) && isEmpty(rec.contractValue)) {
        rec.contractValue = extValue;
        rec.contract_value = extValue;
        clearIssue(backendPreview.summary, "contract_value");
        clearIssue(backendPreview.validation, "contract_value");
      }

      if (extracted.currency != null && isEmpty(rec.currency)) {
        rec.currency = extracted.currency;
        clearIssue(backendPreview.summary, "currency");
        clearIssue(backendPreview.validation, "currency");
      }

      const extType = extracted.contract_type ?? (extracted as any).contractType;
      if (extType != null && isEmpty(rec.contract_type) && isEmpty(rec.contractType)) {
        rec.contractType = extType;
        rec.contract_type = extType;
        clearIssue(backendPreview.summary, "contract_type");
        clearIssue(backendPreview.validation, "contract_type");
      }

      const contractVal = Number(rec.contract_value ?? rec.contractValue ?? 0);
      const isSub = String(rec.contract_type || rec.contractType || "").toLowerCase().includes("sub") || ["true", "yes", "1"].includes(String(rec.recurring || "").toLowerCase());
      if (isSub && contractVal > 0 && isEmpty(rec.monthly_cost) && isEmpty(rec.monthlyCost)) {
        const autoMonthlyCost = Math.round((contractVal / 12) * 100) / 100;
        rec.monthly_cost = autoMonthlyCost;
        rec.monthlyCost = autoMonthlyCost;
        rec.cost = autoMonthlyCost;
        clearIssue(backendPreview.summary, "monthly_cost");
        clearIssue(backendPreview.validation, "monthly_cost");
      }

      if (Array.isArray(rec.validation_errors)) {
        const issuesForRec = backendPreview.summary?.issues?.filter((i: any) => String(i.rowId) === String(rowId) || (rec.sourceRow != null && String(i.sourceRow) === String(rec.sourceRow))) || [];
        rec.validation_errors = issuesForRec.map((i: any) => i.message);
        rec.validation_status = rec.validation_errors.length > 0 ? "invalid" : "valid";
      }

      if (state.client.agreements?.[rowId]) {
        state.client.agreements[rowId].isApplied = true;
      }
    },
  },
});

export const {
  setVendorStep,
  setVendorPreview,
  updateVendorField,
  addVendorRow,
  undoVendorEdit,
  discardVendorPreview,
  setVendorFilters,
  setVendorFocusedRow,
  resetVendor,
  setVendorRowAgreement,
  applyVendorExtractedData,
  setClientStep,
  setClientPreview,
  updateClientField,
  addClientRow,
  undoClientEdit,
  discardClientPreview,
  setClientFilters,
  setClientFocusedRow,
  resetClient,
  setClientRowAgreement,
  applyClientExtractedData,
} = cfoSlice.actions;

export default cfoSlice.reducer;
