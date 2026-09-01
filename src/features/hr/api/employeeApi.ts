import { hrApi } from "@/shared/lib/hrAxios";
import type { AxiosProgressEvent } from "axios";
import type { EmployeeRecord, EmployeePreviewResponse } from "../types/employee";

function sanitizeEmployeeRecord(r: any) {
  if (!r || typeof r !== "object") return r;
  const clean = { ...r };

  // 1. Date fields: convert empty strings to null so Pydantic date parser doesn't fail with 422
  const dateFields = [
    "date_of_birth",
    "joining_date",
    "salary_payment_date",
    "dateOfBirth",
    "joiningDate",
    "salaryPaymentDate",
  ];
  for (const field of dateFields) {
    if (clean[field] !== undefined) {
      if (typeof clean[field] === "string") {
        const trimmed = clean[field].trim();
        clean[field] = trimmed === "" ? null : trimmed;
      } else if (!clean[field]) {
        clean[field] = null;
      }
    }
  }

  // 2. Numeric fields
  const numFields = [
    "salary",
    "previous_salary",
    "previousSalary",
    "hike_percentage",
    "salaryHikePercent",
    "gross_salary",
    "grossSalary",
    "net_salary",
    "netSalary",
    "ctc",
  ];
  for (const field of numFields) {
    if (clean[field] !== undefined && clean[field] !== null) {
      if (typeof clean[field] === "string") {
        const trimmed = clean[field].trim();
        if (trimmed === "") {
          clean[field] = null;
        }
      }
    }
  }

  return clean;
}

function sanitizeEmployeePayload(payload: any) {
  if (!payload || typeof payload !== "object") return payload;

  if (Array.isArray(payload)) {
    return payload.map(sanitizeEmployeeRecord);
  }

  const copy = { ...payload };
  if (Array.isArray(copy.records)) {
    copy.records = copy.records.map(sanitizeEmployeeRecord);
  }
  return copy;
}

export const employeeApi = {
  uploadExcel: (file: File, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    return hrApi.post("/employees/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  },

  previewManual: (data: EmployeeRecord[]) => {
    return hrApi.post("/employees/manual", sanitizeEmployeePayload(data));
  },

  importEmployees: (previewData: EmployeePreviewResponse | unknown) => {
    return hrApi.post("/employees/import", sanitizeEmployeePayload(previewData));
  },

  getAll: (params?: {
    page?: number;
    size?: number;
    search?: string;
    department?: string;
    status?: string;
    employment_type?: string;
  }) => {
    return hrApi.get("/employees", { params });
  },
};
