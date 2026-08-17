import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { DocumentInfo } from "@/components/spotlite/extraction-hub";

export const useStatements = () => {
  return useQuery({
    queryKey: queryKeys.statements.all(),
    queryFn: () => api.get<DocumentInfo[]>("/api/statements"),
    staleTime: 5 * 60 * 1000,
  });
};
