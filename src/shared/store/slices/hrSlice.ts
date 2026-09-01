import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { EmployeeFilters, VendorFilters } from "@/shared/types/hr";

export const emptyEmployeeFilters: EmployeeFilters = {
  search: "",
  department: "",
  status: "",
  employmentType: "",
  manager: "",
  bankName: "",
  accountType: "",
  paymentMode: "",
  salaryMin: "",
  salaryMax: "",
  salaryFrequency: "",
};

export const emptyVendorFilters: VendorFilters = {
  search: "",
  industry: "",
  status: "",
  currency: "",
  contractType: "",
  paymentType: "",
};

import type { EmployeePreviewResponse } from "@/features/hr/types/employee";
import type { VendorPreviewResponse } from "@/features/hr/types/vendor";

interface HrState {
  employee: {
    step: "upload" | "preview";
    backendPreview: EmployeePreviewResponse | null;
    pastPreviews: EmployeePreviewResponse[];
    lastValidatedAt: string | null;
    isDirtySinceValidation: boolean;
    filters: EmployeeFilters;
    focusedRowId: string | null;
  };
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

const initialState: HrState = {
  employee: {
    step: "upload",
    backendPreview: null,
    pastPreviews: [],
    lastValidatedAt: null,
    isDirtySinceValidation: false,
    filters: emptyEmployeeFilters,
    focusedRowId: null,
  },
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

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    setEmployeeStep: (state, action: PayloadAction<"upload" | "preview">) => {
      state.employee.step = action.payload;
    },
    setEmployeePreview: (state, action: PayloadAction<EmployeePreviewResponse | null>) => {
      state.employee.backendPreview = action.payload;
      state.employee.lastValidatedAt = action.payload ? new Date().toISOString() : null;
      state.employee.isDirtySinceValidation = false;
      state.employee.pastPreviews = [];
    },
    updateEmployeeField: (
      state,
      action: PayloadAction<{ rowId: string; field: string; value: any }>,
    ) => {
      if (!state.employee.backendPreview || !state.employee.backendPreview.records) return;

      const { rowId, field, value } = action.payload;
      const idx = state.employee.backendPreview.records.findIndex((r) => r.rowId === rowId);
      if (idx === -1) return;

      // Snapshot current state BEFORE mutation as a plain object
      const snapshot = JSON.parse(JSON.stringify(current(state.employee.backendPreview)));
      state.employee.pastPreviews.push(snapshot);
      if (state.employee.pastPreviews.length > 50) state.employee.pastPreviews.shift();

      state.employee.isDirtySinceValidation = true;
      const target = state.employee.backendPreview.records[idx] as any;
      target[field] = value;
      if (field === "employee_name") target.employeeName = value;
      if (field === "employeeName") target.employee_name = value;
      if (field === "employee_id") target.employeeId = value;
      if (field === "employeeId") target.employee_id = value;
      if (field === "payment_mode") target.paymentMode = value;
      if (field === "paymentMode") target.payment_mode = value;
      if (field === "joining_date") target.joiningDate = value;
      if (field === "joiningDate") target.joining_date = value;
      if (field === "previous_salary") target.previousSalary = value;
      if (field === "previousSalary") target.previous_salary = value;
      if (field === "account_number") target.accountNumber = value;
      if (field === "accountNumber") target.account_number = value;
      if (field === "ifsc_code") target.ifscCode = value;
      if (field === "ifscCode") target.ifsc_code = value;
    },
    addEmployeeRow: (state) => {
      if (!state.employee.backendPreview || !state.employee.backendPreview.records) return;
      const snapshot = JSON.parse(JSON.stringify(current(state.employee.backendPreview)));
      state.employee.pastPreviews.push(snapshot);
      if (state.employee.pastPreviews.length > 50) state.employee.pastPreviews.shift();
      state.employee.isDirtySinceValidation = true;

      const newRowId = `row_${Math.random().toString(36).substring(2, 9)}`;
      
      // Initialize an empty record dynamically based on schema_def if available
      const newRecord: any = { rowId: newRowId };
      if (state.employee.backendPreview.schema_def?.fields) {
        state.employee.backendPreview.schema_def.fields.forEach((field: any) => {
          newRecord[field.name] = field.name === "status" ? "Active" : "";
        });
      } else {
        // Fallback if schema_def is missing
        Object.assign(newRecord, {
          employeeId: "",
          employeeName: "",
          department: "",
          designation: "",
          status: "Active",
          salary: "",
          paymentMode: "",
        });
      }

      state.employee.backendPreview.records.push(newRecord);
      
      // Optionally focus the new row
      state.employee.focusedRowId = newRowId;
    },
    undoEmployeeEdit: (state) => {
      if (state.employee.pastPreviews.length > 0) {
        const prev = state.employee.pastPreviews.pop();
        if (prev) state.employee.backendPreview = prev;
      }
    },
    discardEmployeePreview: (state) => {
      state.employee.backendPreview = null;
      state.employee.pastPreviews = [];
      state.employee.lastValidatedAt = null;
      state.employee.isDirtySinceValidation = false;
      state.employee.step = "upload";
    },
    setEmployeeFilters: (state, action: PayloadAction<EmployeeFilters>) => {
      state.employee.filters = action.payload;
    },
    setEmployeeFocusedRow: (state, action: PayloadAction<string | null>) => {
      state.employee.focusedRowId = action.payload;
    },
    resetEmployee: (state) => {
      state.employee = initialState.employee;
    },

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
  setEmployeeStep,
  setEmployeePreview,
  updateEmployeeField,
  addEmployeeRow,
  undoEmployeeEdit,
  discardEmployeePreview,
  setEmployeeFilters,
  setEmployeeFocusedRow,
  resetEmployee,
  setVendorStep,
  setVendorPreview,
  updateVendorField,
  addVendorRow,
  undoVendorEdit,
  discardVendorPreview,
  setVendorFilters,
  setVendorFocusedRow,
  resetVendor,
} = hrSlice.actions;

export default hrSlice.reducer;
