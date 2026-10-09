import { n as api } from "./api-XLUwYDya.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSpendingReport-yTKb3a2k.js
/**
* Fetch the comprehensive financial intelligence spending analytics report.
* Invokes GET /api/v1/spending/report with optional business_id scoping.
*/
async function fetchSpendingReport(businessId) {
	const qs = businessId ? `?business_id=${encodeURIComponent(businessId)}` : "";
	try {
		return await api.get(`/api/v1/analysis/overview${qs}`);
	} catch (err) {
		return api.get(`/api/v1/spending/report${qs}`);
	}
}
/**
* Hook for fetching the full financial intelligence spending report.
* Enabled conditionally (e.g. only when the Financial Intelligence tab is active).
*/
function useSpendingReport(options = {}) {
	const { enabled = true, businessId } = options;
	return useQuery({
		queryKey: ["spending-report", businessId ?? "current"],
		queryFn: () => fetchSpendingReport(businessId),
		enabled,
		staleTime: 120 * 1e3,
		refetchOnWindowFocus: false
	});
}
//#endregion
export { useSpendingReport as t };
