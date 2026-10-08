import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { EmployeeFilters } from "@/shared/types/hr";
import type { EmployeePreviewResponse } from "@/features/hr/types/employee";

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
} = hrSlice.actions;

export default hrSlice.reducer;
