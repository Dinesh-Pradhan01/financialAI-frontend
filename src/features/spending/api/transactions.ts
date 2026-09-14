import { api } from "@/shared/lib/api";
import type {
  Transaction,
  TransactionListResponse,
  TransactionQueryParams,
  TransactionUpdateRequest,
  DocumentResponse,
  ExtractedStatementResponse,
} from "../types/transaction";

/**
 * Builds a clean query string omitting null, undefined, or empty values.
 */
function buildQueryString(params: TransactionQueryParams = {}): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  }
  const str = searchParams.toString();
  return str ? `?${str}` : "";
}

/**
 * Fetch business-scoped transactions with filtering, search, and pagination.
 */
export async function fetchTransactions(
  params: TransactionQueryParams = {},
): Promise<TransactionListResponse> {
  const qs = buildQueryString(params);
  return api.get<TransactionListResponse>(`/api/transactions${qs}`);
}

/**
 * Fetch all uploaded transaction/bank statement documents for the user's business.
 */
export async function fetchDocuments(): Promise<DocumentResponse[]> {
  return api.get<DocumentResponse[]>("/api/transactions/documents");
}

/**
 * Fetch parsed statement details, account info, and extracted transaction ledger by document ID.
 */
export async function fetchExtractedStatement(
  documentId: string,
): Promise<ExtractedStatementResponse> {
  return api.get<ExtractedStatementResponse>(
    `/api/transactions/documents/${documentId}/extracted`,
  );
}

/**
 * Manually update an existing transaction's category, classification, or narration.
 */
export async function updateTransaction(
  transactionId: string,
  data: TransactionUpdateRequest,
): Promise<Transaction> {
  return api.put<Transaction>(`/api/transactions/${transactionId}`, data);
}

/**
 * Retrigger processing and extraction for a failed or stuck statement document.
 */
export async function reprocessDocument(
  documentId: string,
): Promise<DocumentResponse> {
  return api.post<DocumentResponse>(
    `/api/transactions/documents/${documentId}/reprocess`,
  );
}
