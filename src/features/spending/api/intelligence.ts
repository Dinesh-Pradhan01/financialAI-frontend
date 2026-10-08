import { api } from "@/shared/lib/api";
import type { SpendingFullReport } from "../types/intelligence";

/**
 * Fetch the comprehensive financial intelligence spending analytics report.
 * Invokes GET /api/v1/spending/report with optional business_id scoping.
 */
export async function fetchSpendingReport(
  businessId?: string,
): Promise<SpendingFullReport> {
  const qs = businessId ? `?business_id=${encodeURIComponent(businessId)}` : "";
  try {
    return await api.get<SpendingFullReport>(`/api/v1/analysis/overview${qs}`);
  } catch (err) {
    return api.get<SpendingFullReport>(`/api/v1/spending/report${qs}`);
  }
}
