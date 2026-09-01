import { hrApi } from "@/shared/lib/hrAxios";
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
        const trimmed = clean[field].trim();
        clean[field] = trimmed === "" ? null : isNaN(Number(trimmed)) ? null : Number(trimmed);
      }
    }
  }

  // 4. Ensure contract_id is set
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
    return hrApi.post("/vendors/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  },

  previewManual: (data: VendorRecord[]) => {
    return hrApi.post("/vendors/manual", sanitizeVendorPayload(data));
  },

  importVendors: (previewData: VendorPreviewResponse | unknown) => {
    return hrApi.post("/vendors/import", sanitizeVendorPayload(previewData));
  },

  getAll: (params?: {
    page?: number;
    size?: number;
    search?: string;
    industry?: string;
    status?: string;
  }) => {
    return hrApi.get("/vendors", { params });
  },
};
