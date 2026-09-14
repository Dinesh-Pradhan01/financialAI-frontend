import { cfoApi } from "@/shared/lib/cfoAxios";
import type { AxiosProgressEvent } from "axios";
import type { VendorRecord, VendorPreviewResponse } from "../types/vendor";

function sanitizeVendorRecord(r: any) {
  if (!r || typeof r !== "object") return r;
  const clean = { ...r };

  // 1. Date fields: convert empty strings to null so Pydantic date parser doesn't fail with 422
  const dateFields = [
    "contract_start_date",
    "contract_end_date",
    "renewal_date",
    "contractStartDate",
    "contractEndDate",
    "renewalDate",
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

  // 2. Boolean fields: recurring
  if (clean.recurring !== undefined) {
    if (typeof clean.recurring === "string") {
      const lower = clean.recurring.trim().toLowerCase();
      if (lower === "yes" || lower === "true" || lower === "1") {
        clean.recurring = true;
      } else if (lower === "no" || lower === "false" || lower === "0") {
        clean.recurring = false;
      } else {
        clean.recurring = null;
      }
    } else if (typeof clean.recurring !== "boolean") {
      clean.recurring = null;
    }
  }

  // 3. Numeric fields
  const numFields = [
    "contract_value",
    "contractValue",
    "monthly_cost",
    "monthlyCost",
    "cost",
    "base_cost",
    "support_cost",
    "maintenance_cost",
    "hosting_cost",
    "cloud_cost",
    "miscellaneous_cost",
    "tax_percentage",
    "discount",
    "expected_billing",
  ];
  for (const field of numFields) {
    if (clean[field] !== undefined && clean[field] !== null) {
      if (typeof clean[field] === "string") {
        const cleaned = clean[field].replace(/[$₹€£,\s]/g, "").trim();
        clean[field] = cleaned === "" ? null : Number.isNaN(Number(cleaned)) ? null : Number(cleaned);
      }
    }
  }

  // 4. Sync and auto-calculate monthly cost
  const monthlyVal = clean.monthly_cost ?? clean.monthlyCost ?? clean.cost;
  const contractVal = clean.contract_value ?? clean.contractValue;
  const contractTypeStr = String(clean.contract_type || clean.contractType || "").toLowerCase();
  const frequencyStr = String(clean.frequency || "").toLowerCase();
  const isSubscription =
    contractTypeStr.includes("sub") ||
    frequencyStr.includes("sub") ||
    clean.recurring === true ||
    String(clean.recurring || "").toLowerCase() === "true" ||
    String(clean.recurring || "").toLowerCase() === "yes";

  if ((monthlyVal == null || monthlyVal === 0 || Number.isNaN(monthlyVal)) && isSubscription && contractVal > 0) {
    const autoMonthly = Math.round((Number(contractVal) / 12) * 100) / 100;
    clean.monthly_cost = autoMonthly;
    clean.monthlyCost = autoMonthly;
    clean.cost = autoMonthly;
  } else if (monthlyVal != null) {
    clean.monthly_cost = monthlyVal;
    clean.monthlyCost = monthlyVal;
  }

  if (clean.contract_value != null && clean.contractValue == null) {
    clean.contractValue = clean.contract_value;
  }
  if (clean.contractValue != null && clean.contract_value == null) {
    clean.contract_value = clean.contractValue;
  }

  // 5. Ensure contract_id is set
  if (!clean.contract_id && clean.contractId) {
    clean.contract_id = clean.contractId;
  }
  if (!clean.contract_id && clean.vendor_id) {
    clean.contract_id = `CTR-${clean.vendor_id}`;
  }

  return clean;
}

function sanitizeVendorPayload(payload: any) {
  if (!payload || typeof payload !== "object") return payload;

  if (Array.isArray(payload)) {
    return payload.map(sanitizeVendorRecord);
  }

  const copy = { ...payload };
  if (Array.isArray(copy.records)) {
    copy.records = copy.records.map(sanitizeVendorRecord);
  }
  return copy;
}

export const vendorApi = {
  uploadExcel: (file: File, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    return cfoApi.post("/vendors/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  },

  previewManual: (data: VendorRecord[]) => {
    return cfoApi.post("/vendors/manual", sanitizeVendorPayload(data));
  },

  importVendors: (previewData: VendorPreviewResponse ) => {
    return cfoApi.post("/vendors/import", sanitizeVendorPayload(previewData));
  },

  getAll: (params?: {
    page?: number;
    size?: number;
    skip?: number;
    limit?: number;
    search?: string;
    industry?: string;
    status?: string;
    recurring?: boolean;
    currency?: string;
    contract_type?: string;
    payment_type?: string;
  }) => {
    const queryParams: any = { ...params };
    if (queryParams.page !== undefined && queryParams.size !== undefined) {
      queryParams.skip = (queryParams.page - 1) * queryParams.size;
      queryParams.limit = queryParams.size;
      delete queryParams.page;
      delete queryParams.size;
    }
    return cfoApi.get("/vendors", { params: queryParams });
  },

  getById: (id: string) => {
    return cfoApi.get(`/vendors/${id}`);
  },

  updateVendor: (id: string, patch: Partial<VendorRecord>) => {
    return cfoApi.put(`/vendors/${id}`, sanitizeVendorRecord(patch));
  },

  deleteVendor: (id: string) => {
    return cfoApi.delete(`/vendors/${id}`);
  },

  uploadAgreement: (
    uploadId: string,
    rowId: string,
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    return cfoApi.post(`/vendors/preview/${uploadId}/row/${rowId}/agreement`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  },

  extractAgreement: (uploadId: string, rowId: string) => {
    return cfoApi.post(`/vendors/preview/${uploadId}/row/${rowId}/agreement/extract`);
  },

  getAgreementExtraction: (uploadId: string, rowId: string) => {
    return cfoApi.get(`/vendors/preview/${uploadId}/row/${rowId}/agreement/extraction`);
  },

  getAgreementFileUrl: (uploadId: string, rowId: string) => {
    return `/api/v1/cfo/vendors/preview/${uploadId}/row/${rowId}/agreement/file`;
  },
};
