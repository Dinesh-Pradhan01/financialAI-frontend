import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { VendorFilters } from "@/shared/types/cfo";
import type { VendorPreviewResponse } from "@/features/cfo/types/vendor";

export const emptyVendorFilters: VendorFilters = {
  search: "",
  industry: "",
  status: "",
  currency: "",
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
} = cfoSlice.actions;

export default cfoSlice.reducer;
