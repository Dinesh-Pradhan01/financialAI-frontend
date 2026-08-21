/**
 * Backend API Contract Types
 *
 * Generated TypeScript interfaces mirroring backend Pydantic models,
 * database schemas, and request/response shapes.
 */

// ---------------------------------------------------------------------------
// Error & Validation Types
// ---------------------------------------------------------------------------

export interface ValidationErrorDetail {
  type: string;
  loc: (string | number)[];
  msg: string;
  input: unknown;
}

export interface ApiErrorResponse {
  detail: string | ValidationErrorDetail[];
}

// ---------------------------------------------------------------------------
// Auth & User Types
// ---------------------------------------------------------------------------

export interface UserResponse {
  id: string;
  email: string;
  role: string | null;
  email_verified: boolean;
  business_id: string | null;
  profile_completed: boolean;
  full_name: string | null;
}

// ---------------------------------------------------------------------------
// Team Invites
// ---------------------------------------------------------------------------

export interface TeamInviteResponseSchema {
  id: string;
  business_id?: string;
  email: string;
  role: string;
  token?: string;
  status: string;
  created_at?: string;
  expires_at?: string | null;
}

export interface InviteRecord {
  id: string;
  email: string;
  full_name?: string | null;
  role: string;
  status: string;
  invite_token?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
}

export interface InviteSendPayload {
  email: string;
  role: string;
  full_name?: string | null;
}

export interface InviteSendResponse {
  message?: string;
  invite_link?: string;
  invite_token?: string;
  invite?: InviteRecord | TeamInviteResponseSchema;
}

export interface InviteVerifyResponse {
  id: string;
  email: string;
  full_name?: string | null;
  role: string;
  company_name?: string | null;
  business_id?: string | null;
  expires_at?: string | null;
  status?: string;
}

// ---------------------------------------------------------------------------
// Business Onboarding - Save Payloads (Request Schemas)
// ---------------------------------------------------------------------------

export interface GeneralInfoSaveSchema {
  company_name: string;
  business_category: string;
  business_type: string;
  cin?: string | null;
  gstin?: string | null;
  business_pan: string;
  udyam_number?: string | null;
  date_of_incorporation?: string | null;
  registered_address: string;
  operational_address?: string | null;
  state: string;
  city: string;
  pincode: string;
  website?: string | null;
  official_email: string;
  official_phone: string;
}

export interface LeadershipInfoSaveSchema {
  founder_ceo_name?: string | null;
  founder_ceo_email?: string | null;
  founder_ceo_phone?: string | null;
  founder_ceo_designation?: string | null;
  number_of_employees?: string | null;
  number_of_branches?: string | null;
  business_model?: string | null;
  primary_product_service?: string | null;
  business_description?: string | null;
  cfo_name?: string | null;
  cfo_email?: string | null;
  cfo_phone?: string | null;
  cfo_designation?: string | null;
  invite_cfo?: boolean;
  hr_name?: string | null;
  hr_email?: string | null;
  hr_phone?: string | null;
  hr_designation?: string | null;
  invite_hr?: boolean;
}

export interface FinancialInfoSaveSchema {
  primary_bank?: string | null;
  number_of_accounts?: number;
  has_business_loan?: boolean | null;
  has_business_credit_card?: boolean | null;
  accounting_software?: string | null;
  digital_payment_methods?: string[];
}

// ---------------------------------------------------------------------------
// Business Onboarding - Response Shapes
// ---------------------------------------------------------------------------

export interface GeneralInfoResponse {
  company_name: string;
  business_category: string;
  business_type: string;
  cin: string | null;
  gstin: string | null;
  business_pan: string;
  udyam_number: string | null;
  date_of_incorporation: string | null;
  registered_address: string;
  operational_address: string | null;
  state: string;
  city: string;
  pincode: string;
  website: string | null;
  official_email: string;
  official_phone: string;
}

export interface LeadershipInfoResponse {
  founder_ceo_name: string | null;
  founder_ceo_email: string | null;
  founder_ceo_phone: string | null;
  founder_ceo_designation: string | null;
  number_of_employees: string | null;
  number_of_branches: string | null;
  business_model: string | null;
  primary_product_service: string | null;
  business_description: string | null;
  cfo_name: string | null;
  cfo_email: string | null;
  cfo_phone: string | null;
  cfo_designation: string | null;
  invite_cfo: boolean;
  hr_name: string | null;
  hr_email: string | null;
  hr_phone: string | null;
  hr_designation: string | null;
  invite_hr: boolean;
}

export interface FinancialInfoResponse {
  primary_bank: string | null;
  number_of_accounts: number;
  has_business_loan: boolean | null;
  has_business_credit_card: boolean | null;
  accounting_software: string | null;
  digital_payment_methods: string[];
}

export interface CompanyDocumentResponse {
  id: string;
  business_id?: string;
  document_type: string;
  document_category: string;
  filename: string;
  original_name: string;
  file_size_bytes: number;
  mime_type?: string | null;
  upload_status: string;
  quality_score?: number | null;
  is_verified?: boolean;
  verification_notes?: string | null;
  /**
   * Will be null for documents uploaded during onboarding — backend does not populate this field on that route yet. Always handle null.
   */
  uploaded_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

export type CompanyDocument = CompanyDocumentResponse;

// ---------------------------------------------------------------------------
// Package Types
// ---------------------------------------------------------------------------

export interface PackageResponse {
  id: string;
  name: string;
  created_by: number | null;
  created_at: string;
  updated_at: string;
  documents: CompanyDocument[];
}

export interface PackageRequest {
  name: string;
  document_ids?: string[] | null;
}

export interface PackageDocumentUpdate {
  document_ids: string[];
}

export interface BusinessOnboardingFullResponse {
  business_id: string;
  status: string;
  completion_percentage: number;
  general_info: GeneralInfoResponse | null;
  leadership_info: LeadershipInfoResponse | null;
  financial_info: FinancialInfoResponse | null;
  documents: CompanyDocumentResponse[];
  team_invites: TeamInviteResponseSchema[];
}

// ---------------------------------------------------------------------------
// Company & Dashboard Responses
// ---------------------------------------------------------------------------

export interface CompanyProfileResponse {
  id?: string;
  business_id?: string;
  company_name: string;
  industry: string;
  business_type: string;
  business_category: string;
  gst?: string | null;
  pan: string;
  website?: string | null;
  summary?: string | null;
  registered_address: string;
  contact_person?: string | null;
  email: string;
  phone: string;
  udyam_number?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyRatingResponse {
  overall: number;
  verification: number;
  documents: number;
  compliance?: number | null;
  financial_health?: number | null;
}

export interface CompanyNewsResponse {
  id: number | string;
  headline: string;
  source: string;
  date: string;
  summary: string;
  url?: string | null;
}

export interface IndustryLeaderResponse {
  id: number | string;
  name: string;
  market_cap?: string | null;
  revenue?: string | null;
}

// ---------------------------------------------------------------------------
// Statements, Accounts & Transactions
// ---------------------------------------------------------------------------

export interface DocumentResponse {
  id: string;
  person_id?: string | null;
  business_id?: string | null;
  filename: string;
  original_name: string;
  hash_md5: string;
  file_size_bytes: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | string;
  error_message?: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Note: account_type exists in DB schema but is omitted in this response shape.
 */
export interface AccountResponse {
  id: string;
  document_id?: string | null;
  bank_name: string;
  account_number_mask: string;
  current_balance?: number | null;
  currency: string;
  created_at?: string;
}

export interface TransactionResponse {
  id: string;
  account_id?: string | null;
  date: string;
  description: string;
  amount: number;
  transaction_type: "DEBIT" | "CREDIT" | string;
  category?: string | null;
  balance_after?: number | null;
}

export interface TransactionListResponse {
  items: TransactionResponse[];
  total: number;
  page?: number;
  page_size?: number;
  total_pages?: number;
}

export interface ExtractedStatementResponse {
  document_id: string;
  status: string;
  accounts: AccountResponse[];
  transactions: TransactionResponse[];
  summary?: {
    total_debits?: number;
    total_credits?: number;
    net_cash_flow?: number;
    period_start?: string | null;
    period_end?: string | null;
  } | null;
}
