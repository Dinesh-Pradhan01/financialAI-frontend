import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import type { DocumentInfo } from "@/shared/types/documents";

export const useStatements = () => {
  return useQuery({
    queryKey: queryKeys.statements.all(),
    queryFn: () => api.get<DocumentInfo[]>("/api/statements"),
    staleTime: 5 * 60 * 1000,
  });
};
