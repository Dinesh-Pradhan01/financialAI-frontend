import { useQuery } from "@tanstack/react-query";
import { fetchSpendingReport } from "../api/intelligence";
import type { SpendingFullReport } from "../types/intelligence";

export interface UseSpendingReportOptions {
  enabled?: boolean;
  businessId?: string;
}

/**
 * Hook for fetching the full financial intelligence spending report.
 * Enabled conditionally (e.g. only when the Financial Intelligence tab is active).
 */
export function useSpendingReport(options: UseSpendingReportOptions = {}) {
  const { enabled = true, businessId } = options;

  return useQuery<SpendingFullReport, Error>({
    queryKey: ["spending-report", businessId ?? "current"],
    queryFn: () => fetchSpendingReport(businessId),
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
}
