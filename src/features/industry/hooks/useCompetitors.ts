/**
 * Hook: useCompetitors
 *
 * TanStack Query hook for fetching the competitor list.
 * Cache parameters:
 * - staleTime: 5 minutes
 * - retry: false on 401/404, max 1 otherwise
 */

import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/queryKeys";
import { getCompetitors } from "../api/industryApi";
import { mapCompetitorsResponse } from "../mappers/mapCompetitors";
import type { CompetitorsListViewModel } from "../types/industry";

export const competitorsQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.industry.competitors(),
    queryFn: async ({ signal }): Promise<CompetitorsListViewModel> => {
      const raw = await getCompetitors({ signal });
      return mapCompetitorsResponse(raw);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: unknown) => {
      const status = (error as { status?: number })?.status;
      if (status === 401 || status === 404) {
        return false;
      }
      return failureCount < 1;
    },
  });

export function useCompetitors() {
  return useQuery(competitorsQueryOptions());
}
