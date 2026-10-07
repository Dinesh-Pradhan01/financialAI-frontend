/**
 * Hook: useCompanyFinancials
 *
 * TanStack Query hook for fetching competitor financials.
 * Cache parameters:
 * - staleTime: 5 minutes
 * - retry: false on 401/404
 * - Automatic resolution of company name, ticker, and overlap from cached competitors query
 */

import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/queryKeys";
import { getCompanyFinancials } from "../api/industryApi";
import { mapCompanyFinancials, type CompetitorMetadataLookup } from "../mappers/mapFinancials";
import type { CompanyFinancialsViewModel, CompetitorsListViewModel } from "../types/industry";

export const companyFinancialsQueryOptions = (
  companyId: number | null | undefined,
  metadata?: CompetitorMetadataLookup,
) =>
  queryOptions({
    queryKey: queryKeys.industry.financials(companyId ?? 0),
    queryFn: async ({ signal }): Promise<CompanyFinancialsViewModel> => {
      if (!companyId) {
        throw new Error("companyId is required to fetch financials");
      }
      const raw = await getCompanyFinancials(companyId, { signal });
      return mapCompanyFinancials(raw, metadata);
    },
    enabled: Boolean(companyId),
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

export function useCompanyFinancials(
  companyId: number | null | undefined,
  metadataOverride?: CompetitorMetadataLookup,
) {
  const queryClient = useQueryClient();

  // Try to find cached competitor in the competitors query cache
  const cachedCompetitors = queryClient.getQueryData<CompetitorsListViewModel>(
    queryKeys.industry.competitors(),
  );

  const matchedCompetitor = cachedCompetitors?.competitors.find((c) => c.companyId === companyId);

  const resolvedMetadata: CompetitorMetadataLookup = {
    companyName: metadataOverride?.companyName ?? matchedCompetitor?.companyName,
    ticker: metadataOverride?.ticker ?? matchedCompetitor?.ticker,
    overlapLevel: metadataOverride?.overlapLevel ?? matchedCompetitor?.overlapLevel,
    overlapSummary: metadataOverride?.overlapSummary ?? matchedCompetitor?.overlapSummary,
  };

  return useQuery(companyFinancialsQueryOptions(companyId, resolvedMetadata));
}
