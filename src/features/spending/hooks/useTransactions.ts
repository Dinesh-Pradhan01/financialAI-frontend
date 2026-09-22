import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTransactions,
  fetchDocuments,
  fetchExtractedStatement,
  updateTransaction,
  reprocessDocument,
} from "../api/transactions";
import type {
  TransactionQueryParams,
  TransactionListResponse,
  TransactionUpdateRequest,
  ExtractedStatementResponse,
} from "../types/transaction";

export const SPENDING_QUERY_KEYS = {
  transactions: (params?: TransactionQueryParams) =>
    ["transactions", params ?? {}] as const,
  documents: () => ["transaction-documents"] as const,
  extracted: (documentId: string) =>
    ["extracted-statement", documentId] as const,
};

/**
 * Primary hook for fetching paginated and filtered transactions.
 * Keeps raw transactions in TanStack Query cache.
 */
export function useTransactions(params: TransactionQueryParams = {}) {
  return useQuery({
    queryKey: SPENDING_QUERY_KEYS.transactions(params),
    queryFn: () => fetchTransactions(params),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook for fetching uploaded statement documents.
 */
export function useTransactionDocuments() {
  return useQuery({
    queryKey: SPENDING_QUERY_KEYS.documents(),
    queryFn: () => fetchDocuments(),
    staleTime: 30 * 1000,
  });
}

/**
 * Hook for fetching parsed statement metadata and full extracted transaction ledger.
 */
export function useExtractedStatement(documentId: string | null) {
  return useQuery({
    queryKey: SPENDING_QUERY_KEYS.extracted(documentId ?? ""),
    queryFn: () => fetchExtractedStatement(documentId!),
    enabled: Boolean(documentId),
    staleTime: 60 * 1000,
  });
}

/**
 * Mutation for editing a transaction inline (category, classification, narration).
 * Implements optimistic cache updates with rollback on error.
 */
export function useUpdateTransaction(documentId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      transactionId,
      data,
    }: {
      transactionId: string;
      data: TransactionUpdateRequest;
    }) => updateTransaction(transactionId, data),

    onMutate: async ({ transactionId, data }) => {
      // 1. Cancel in-flight queries so they don't overwrite optimistic data
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      if (documentId) {
        await queryClient.cancelQueries({
          queryKey: SPENDING_QUERY_KEYS.extracted(documentId),
        });
      }

      // 2. Snapshot current state for rollback
      const previousTransactions = queryClient.getQueriesData<TransactionListResponse>({
        queryKey: ["transactions"],
      });
      const previousExtracted = documentId
        ? queryClient.getQueryData<ExtractedStatementResponse>(
            SPENDING_QUERY_KEYS.extracted(documentId),
          )
        : undefined;

      // 3. Optimistically update transactions list caches
      queryClient.setQueriesData<TransactionListResponse>(
        { queryKey: ["transactions"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            transactions: old.transactions.map((t) =>
              t.id === transactionId
                ? {
                    ...t,
                    ...(data.category ? { category: data.category } : {}),
                    ...(data.classification
                      ? { classification: data.classification }
                      : {}),
                    ...(data.narration ? { narration: data.narration } : {}),
                    ...(data.category_id !== undefined
                      ? { category_id: data.category_id }
                      : {}),
                    ...(data.merchant_id !== undefined
                      ? { merchant_id: data.merchant_id }
                      : {}),
                  }
                : t,
            ),
          };
        },
      );

      // 4. Optimistically update extracted statement ledger cache if documentId is known
      if (documentId) {
        queryClient.setQueryData<ExtractedStatementResponse>(
          SPENDING_QUERY_KEYS.extracted(documentId),
          (old) => {
            if (!old) return old;
            return {
              ...old,
              transactions: old.transactions.map((t) =>
                t.id === transactionId
                  ? {
                      ...t,
                      ...(data.category ? { category: data.category } : {}),
                      ...(data.classification
                        ? { classification: data.classification }
                        : {}),
                      ...(data.narration ? { narration: data.narration } : {}),
                    }
                  : t,
              ),
            };
          },
        );
      }

      return { previousTransactions, previousExtracted };
    },

    onError: (_err, _variables, context) => {
      // Rollback to snapshots on mutation failure
      if (context?.previousTransactions) {
        for (const [queryKey, data] of context.previousTransactions) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      if (documentId && context?.previousExtracted) {
        queryClient.setQueryData(
          SPENDING_QUERY_KEYS.extracted(documentId),
          context.previousExtracted,
        );
      }
    },

    onSettled: () => {
      // Refetch affected queries after mutation completes or errors
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      if (documentId) {
        queryClient.invalidateQueries({
          queryKey: SPENDING_QUERY_KEYS.extracted(documentId),
        });
      }
    },
  });
}

/**
 * Mutation to trigger background reprocessing of a failed statement document.
 */
export function useReprocessDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) => reprocessDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SPENDING_QUERY_KEYS.documents() });
    },
  });
}
