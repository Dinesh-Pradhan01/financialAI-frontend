export interface ClientRecord {
  rowId: string;
  sourceRow: number;

  // Identity & Business Key
  clientId: string;
  client_id?: string;
  clientName: string;
  client_name?: string;
  category: string;

  // Organization & Legal
  legalName?: string;
  legal_name?: string;
  industry?: string;

  // Contract
  contractId?: string;
  contract_id?: string;
  contractType?: string;
  contract_type?: string;
  contractStartDate?: string;
  contract_start_date?: string;
  contractEndDate?: string;
  contract_end_date?: string;

  // Financial (Revenue replaces monthly_cost)
  revenue: number | string;
  contractValue: number | string;
  contract_value?: number | string;
  currency?: string;
  paymentType?: string;
  payment_type?: string;
  frequency: string;
  recurring?: string; // 'Yes' | 'No' or boolean representation

  // Banking
  bankName: string;
  bank_name?: string;
  accountHolderName: string;
  account_holder_name?: string;
  accountNumber: string;
  account_number?: string;
  ifscCode: string;
  ifsc_code?: string;

  // Status & Meta
  status: string;
  isBlank?: boolean;
  validation_status?: "valid" | "invalid";
  validation_errors?: string[];
  action?: "INSERT" | "UPDATE" | "REJECT" | "SKIP";

  [key: string]: any;
}

export type ClientValidationSeverity = "error" | "warning";

export interface ClientValidationIssue {
  id: string;
  severity: ClientValidationSeverity;
  code: string;
  message: string;
  rowId?: string;
  sourceRow?: number;
  field?: keyof ClientRecord | string;
}

export interface ClientValidationSummary {
  validClients: number;
  warnings: number;
  errors: number;
  issues: ClientValidationIssue[];
  errorRowIds: string[];
  warningRowIds: string[];
  duplicateIds: number;
  missingRequiredFields: number;
}

export interface ClientPreviewResponse {
  upload_id?: string;
  schema_def?: any;
  records?: ClientRecord[];
  summary?: ClientValidationSummary;
  validation?: ClientValidationSummary;
  file_meta?: {
    name?: string;
    size?: number;
  };
}

export interface ClientFilters {
  search: string;
  category: string;
  industry: string;
  status: string;
  recurring: string;
  contractType: string;
  paymentType: string;
}
