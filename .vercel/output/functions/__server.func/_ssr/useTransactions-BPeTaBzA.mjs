import { n as api } from "./api-XLUwYDya.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTransactions-BPeTaBzA.js
/**
* Builds a clean query string omitting null, undefined, or empty values.
*/
function buildQueryString(params = {}) {
	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) if (value !== void 0 && value !== null && value !== "") searchParams.append(key, String(value));
	const str = searchParams.toString();
	return str ? `?${str}` : "";
}
/**
* Fetch business-scoped transactions with filtering, search, and pagination.
*/
async function fetchTransactions(params = {}) {
	const qs = buildQueryString(params);
	return api.get(`/api/transactions${qs}`);
}
/**
* Fetch all uploaded transaction/bank statement documents for the user's business.
*/
async function fetchDocuments() {
	return api.get("/api/transactions/documents");
}
/**
* Fetch parsed statement details, account info, and extracted transaction ledger by document ID.
*/
async function fetchExtractedStatement(documentId) {
	return api.get(`/api/transactions/documents/${documentId}/extracted`);
}
/**
* Manually update an existing transaction's category, classification, or narration.
*/
async function updateTransaction(transactionId, data) {
	return api.put(`/api/transactions/${transactionId}`, data);
}
/**
* Retrigger processing and extraction for a failed or stuck statement document.
*/
async function reprocessDocument(documentId) {
	return api.post(`/api/transactions/documents/${documentId}/reprocess`);
}
var SPENDING_QUERY_KEYS = {
	transactions: (params) => ["transactions", params ?? {}],
	documents: () => ["transaction-documents"],
	extracted: (documentId) => ["extracted-statement", documentId]
};
/**
* Primary hook for fetching paginated and filtered transactions.
* Keeps raw transactions in TanStack Query cache.
*/
function useTransactions(params = {}) {
	return useQuery({
		queryKey: SPENDING_QUERY_KEYS.transactions(params),
		queryFn: () => fetchTransactions(params),
		staleTime: 60 * 1e3
	});
}
/**
* Hook for fetching uploaded statement documents.
*/
function useTransactionDocuments() {
	return useQuery({
		queryKey: SPENDING_QUERY_KEYS.documents(),
		queryFn: () => fetchDocuments(),
		staleTime: 30 * 1e3
	});
}
/**
* Hook for fetching parsed statement metadata and full extracted transaction ledger.
*/
function useExtractedStatement(documentId) {
	return useQuery({
		queryKey: SPENDING_QUERY_KEYS.extracted(documentId ?? ""),
		queryFn: () => fetchExtractedStatement(documentId),
		enabled: Boolean(documentId),
		staleTime: 60 * 1e3
	});
}
/**
* Mutation for editing a transaction inline (category, classification, narration).
* Implements optimistic cache updates with rollback on error.
*/
function useUpdateTransaction(documentId) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ transactionId, data }) => updateTransaction(transactionId, data),
		onMutate: async ({ transactionId, data }) => {
			await queryClient.cancelQueries({ queryKey: ["transactions"] });
			if (documentId) await queryClient.cancelQueries({ queryKey: SPENDING_QUERY_KEYS.extracted(documentId) });
			const previousTransactions = queryClient.getQueriesData({ queryKey: ["transactions"] });
			const previousExtracted = documentId ? queryClient.getQueryData(SPENDING_QUERY_KEYS.extracted(documentId)) : void 0;
			queryClient.setQueriesData({ queryKey: ["transactions"] }, (old) => {
				if (!old) return old;
				return {
					...old,
					transactions: old.transactions.map((t) => t.id === transactionId ? {
						...t,
						...data.category ? { category: data.category } : {},
						...data.classification ? { classification: data.classification } : {},
						...data.narration ? { narration: data.narration } : {},
						...data.category_id !== void 0 ? { category_id: data.category_id } : {},
						...data.merchant_id !== void 0 ? { merchant_id: data.merchant_id } : {}
					} : t)
				};
			});
			if (documentId) queryClient.setQueryData(SPENDING_QUERY_KEYS.extracted(documentId), (old) => {
				if (!old) return old;
				return {
					...old,
					transactions: old.transactions.map((t) => t.id === transactionId ? {
						...t,
						...data.category ? { category: data.category } : {},
						...data.classification ? { classification: data.classification } : {},
						...data.narration ? { narration: data.narration } : {}
					} : t)
				};
			});
			return {
				previousTransactions,
				previousExtracted
			};
		},
		onError: (_err, _variables, context) => {
			if (context?.previousTransactions) for (const [queryKey, data] of context.previousTransactions) queryClient.setQueryData(queryKey, data);
			if (documentId && context?.previousExtracted) queryClient.setQueryData(SPENDING_QUERY_KEYS.extracted(documentId), context.previousExtracted);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			if (documentId) queryClient.invalidateQueries({ queryKey: SPENDING_QUERY_KEYS.extracted(documentId) });
		}
	});
}
/**
* Mutation to trigger background reprocessing of a failed statement document.
*/
function useReprocessDocument() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (documentId) => reprocessDocument(documentId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SPENDING_QUERY_KEYS.documents() });
		}
	});
}
//#endregion
export { useUpdateTransaction as a, useTransactions as i, useReprocessDocument as n, useTransactionDocuments as r, useExtractedStatement as t };
