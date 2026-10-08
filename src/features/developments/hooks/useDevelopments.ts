import { useQuery, queryOptions } from "@tanstack/react-query";
import { useAuth } from "@/shared/contexts/AuthContext";
import { fetchDevelopments, DEFAULT_DEVELOPMENT_PARAMS } from "../api/developmentsApi";
import { mapDevelopmentsResponse } from "../lib/mapDevelopments";
import type {
  DevelopmentQueryParams,
  DevelopmentsViewModel,
  DevelopmentsError
} from "../types/developments";

/**
 * Shared query options for Developments.
 * Exposed so downstream components (e.g., Business360Page) can prefetch
 * before the user navigates.
 */
export function developmentsQueryOptions(
  businessId: string,
  params: DevelopmentQueryParams = DEFAULT_DEVELOPMENT_PARAMS
) {
  return queryOptions({
    queryKey: ["developments", businessId, params],
    queryFn: async ({ signal }): Promise<DevelopmentsViewModel> => {
      const dto = await fetchDevelopments(businessId, params, { signal });
      return mapDevelopmentsResponse(dto);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry if the company was simply not found
      if ((error as DevelopmentsError)?.kind === "not_found") return false;
      return failureCount < 2;
    },
  });
}

/**
 * Primary React hook for the Developments view.
 */
export function useDevelopments() {
  const { user } = useAuth();
  const businessId = user?.business_id;

  const query = useQuery<DevelopmentsViewModel, DevelopmentsError>(
    businessId
      ? developmentsQueryOptions(businessId)
      : { queryKey: ["developments", "none"], enabled: false } as any
  );

  return {
    ...query,
    needsCompany: !businessId,
  };
}
