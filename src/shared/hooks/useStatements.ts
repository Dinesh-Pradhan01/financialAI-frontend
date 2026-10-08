import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import type { DocumentInfo } from "@/shared/types/documents";

export const useStatements = () => {
  return useQuery({
    queryKey: queryKeys.statements.all(),
    queryFn: async () => {
      try {
        return await api.get<DocumentInfo[]>("/api/statements");
      } catch (err: unknown) {
        // Graceful fallback to transactions documents endpoint if /api/statements returns 404
        const maybeError = err as { response?: { status?: number }; status?: number };
        if (maybeError?.response?.status === 404 || maybeError?.status === 404) {
          return await api.get<DocumentInfo[]>("/api/transactions/documents");
        }
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
};
