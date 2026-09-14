/**
 * Spending Feature & Backend Transaction Contract Types
 * Directly reflects the backend schemas defined in app/transaction/schemas.py
 */

export type TransactionClassification = "expense" | "income" | "transfer";
export type TransactionType = "DEBIT" | "CREDIT";

export interface Transaction {
  id: string; // UUID
  document_id: string; // UUID
  account_id: string; // UUID
  business_id: string | null; // UUID | null
  merchant_id: string | null; // UUID | null
  category_id: number | null;
  transaction_date: string; // YYYY-MM-DD
  value_date: string | null; // YYYY-MM-DD | null
  narration: string;
  debit_amount: number;
  credit_amount: number;
  running_balance: number;
  reference_number: string | null;
  utr_upi_ref: string | null;
  cheque_number: string | null;
  category: string;
  raw_category: string | null;
  classification: TransactionClassification | string;
  type: TransactionType | string;
}

export interface TransactionListResponse {
  total: number;
  transactions: Transaction[];
}

export interface TransactionQueryParams {
  skip?: number;
  limit?: number;
  date_from?: string; // YYYY-MM-DD
  date_to?: string; // YYYY-MM-DD
  category?: string;
  category_id?: number;
  classification?: TransactionClassification | string;
  account_id?: string;
  search?: string;
  sort_by?: "transaction_date" | "debit_amount";
  sort_order?: "asc" | "desc";
  business_id?: string;
}

export interface TransactionUpdateRequest {
  category?: string | null;
  category_id?: number | null;
  merchant_id?: string | null;
  narration?: string | null;
  classification?: string | null;
}

// ---------------------------------------------------------------------------
// Document & Statement Schemas (Phase S3)
// ---------------------------------------------------------------------------

export type DocumentStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface DocumentResponse {
  id: string;
  filename: string;
  original_name: string;
  hash_md5: string;
  file_size_bytes: number;
  mime_type: string | null;
  document_type: string;
  status: DocumentStatus;
  error_message: string | null;
  account_id: string | null;
  business_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountResponse {
  id: string;
  business_id: string | null;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  account_type: string;
  currency: string;
  ifsc_code: string | null;
  branch_name: string | null;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface BankStatementDataResponse {
  id: string;
  document_id: string;
  account_id: string | null;
  opening_balance: number;
  closing_balance: number;
  statement_period: string | null;
  statement_month: string | null;
  created_at: string | null;
}

export interface ExtractedStatementResponse {
  document: DocumentResponse;
  account: AccountResponse | null;
  bank_statement_data: BankStatementDataResponse | null;
  transactions: Transaction[];
}

// ---------------------------------------------------------------------------
// Aggregation View Models (Derived via aggregate.ts)
// ---------------------------------------------------------------------------

export interface CategoryAggregate {
  id: string; // sanitized key e.g. "airlines", "software"
  label: string;
  amount: number;
  share: number; // percentage integer or float
  count: number;
}

export interface MerchantAggregate {
  rank: number;
  name: string;
  amount: number;
  count: number;
}

export interface MonthlyTrendAggregate {
  month: string; // e.g. "Jan 2026" or "2026-01"
  total: number;
}
