export interface VendorRecord {
  rowId: string;
  sourceRow: number;

  // Basic Details
  vendorId: string;
  vendorName: string;
  registrationNumber: string;
  taxId: string;
  industry: string;

  // Contact
  primaryContactName: string;
  email: string;
  phone: string;
  website: string;

  // Address
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  // Contract
  contractId: string;
  contractStartDate: string;
  contractEndDate: string;
  contractType: string;

  // Financial
  currency: string;
  paymentTerms: string;
  paymentType: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  swiftCode: string;

  // Status
  status: string;
  recurring: string; // 'Yes' or 'No' string from excel, often parsed to boolean later

  isBlank: boolean;
  [key: string]: any;
}

export type VendorValidationSeverity = "error" | "warning";

export interface VendorValidationIssue {
  id: string;
  severity: VendorValidationSeverity;
  code: string;
  message: string;
  rowId?: string;
  sourceRow?: number;
  field?: keyof VendorRecord;
}

export interface VendorValidationSummary {
  validVendors: number;
  warnings: number;
  errors: number;
  issues: VendorValidationIssue[];
  errorRowIds: string[];
  warningRowIds: string[];
  duplicateIds: number;
  missingRequiredFields: number;
}

export interface VendorPreviewResponse {
  upload_id?: string;
  schema_def?: any;
  records?: VendorRecord[];
  summary?: VendorValidationSummary;
  validation?: VendorValidationSummary;
  file_meta?: {
    name?: string;
    size?: number;
  };
}

// VendorFilters lives in shared/types/hr.ts (so Redux slice can import it
// without a shared→features circular dependency). Re-export here for convenience.
export type { VendorFilters } from "@/shared/types/hr";
