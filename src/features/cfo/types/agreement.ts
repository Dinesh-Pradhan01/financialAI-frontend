export type AgreementStatus =
  | "none"
  | "uploading"
  | "uploaded"
  | "processing"
  | "extracted"
  | "failed";

export interface ExtractedAgreementData {
  contract_start_date?: string | null;
  contract_end_date?: string | null;
  contract_value?: number | null;
  currency?: string | null;
  contract_type?: string | null;
  [key: string]: any;
}

export interface AgreementExtractionResponse {
  status: string;
  document_id?: string;
  file_name?: string;
  extracted_data?: ExtractedAgreementData;
  field_confidence?: Record<string, number>;
  error_message?: string;
}

export interface RowAgreementState {
  status: AgreementStatus;
  fileName?: string;
  documentId?: string;
  extractedData?: ExtractedAgreementData;
  fieldConfidence?: Record<string, number>;
  isApplied?: boolean;
  error?: string;
  progress?: number;
}
