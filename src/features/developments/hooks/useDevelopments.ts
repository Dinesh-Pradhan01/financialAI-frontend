import { queryOptions, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/shared/contexts/AuthContext";
import { queryKeys } from "@/shared/lib/queryKeys";
import { fetchDevelopments } from "../api/developmentsApi";
import { mapDevelopmentsResponse } from "../lib/mapDevelopments";
import type { DevelopmentsViewModel } from "../types/developments";
import { isSetupRequiredError } from "@/features/dashboard/hooks/useCompanyAPI";

export { isSetupRequiredError };

/**
 * TanStack Query options for developments.
 * Cache configuration:
 * - staleTime: 30 min (developments are long-tail news, expensive to re-scrape)
 * - gcTime: 60 min
 * - refetchOnMount / WindowFocus / Reconnect: false
 * - retry: false (avoids spamming backend / upstream circuit breaker on error)
 */
export const developmentsQueryOptions = (businessId?: string | null) =>
  queryOptions({
    queryKey: queryKeys.developments.list(businessId, { days: 30, limit: 10 }),
    queryFn: async (): Promise<DevelopmentsViewModel> => {
      if (!businessId) {
        throw new Error("business_id is required to fetch developments");
      }
      const raw = await fetchDevelopments(businessId, { days: 30, limit: 10 });
      return mapDevelopmentsResponse(raw);
    },
    enabled: Boolean(businessId),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

/**
 * Pinned Deloitte company UUID for development testing:
 * Verified in live backend captures: "84840060-25b4-4550-9e3c-f840d857c697".
 */
export const DELOITTE_COMPANY_ID = "84840060-25b4-4550-9e3c-f840d857c697";

/**
 * Hook to retrieve developments for the company.
 * Temporarily pinned to query Deloitte ("84840060-25b4-4550-9e3c-f840d857c697")
 * so real backend intelligence is always displayed in development.
 *
 * Supports an optional overrideBusinessId parameter for testing or explicit tenant scoping.
 */
export function useDevelopments(overrideBusinessId?: string | null) {
  // Pin specifically to Deloitte for development as requested
  const businessId = overrideBusinessId ?? DELOITTE_COMPANY_ID;
  const needsCompany = !businessId;

  const query = useQuery(developmentsQueryOptions(businessId));

  const isSetupRequired =
    needsCompany || (Boolean(query.error) && isSetupRequiredError(query.error));

  return {
    ...query,
    businessId,
    needsCompany,
    isSetupRequired,
  };
}
