import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as cfoKeys, t as cfoApi } from "./cfoAxios-sGO5vNpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCFODashboard-DG5RjGSt.js
function normalizeVendorMetrics(raw) {
	const data = raw?.data?.data ?? raw?.data ?? raw ?? {};
	return {
		totalVendors: Number(data.totalVendors ?? data.total_vendors ?? data.total_records ?? data.total ?? data.count ?? 0) || 0,
		recurringVendors: Number(data.recurringVendors ?? data.recurring_clients ?? data.recurring_vendors ?? data.recurring ?? 0) || 0
	};
}
function normalizeClientMetrics(raw) {
	const data = raw?.data?.data ?? raw?.data ?? raw ?? {};
	return {
		totalClients: Number(data.totalClients ?? data.total_clients ?? data.total_records ?? data.total ?? data.count ?? 0) || 0,
		recurringClients: Number(data.recurringClients ?? data.recurring_clients ?? data.recurring ?? 0) || 0
	};
}
function normalizeHistory(raw) {
	let list = raw?.data?.data ?? raw?.data ?? raw;
	if (list && typeof list === "object" && !Array.isArray(list)) list = list.history ?? list.uploads ?? list.items ?? list.records ?? list.data ?? [];
	if (!Array.isArray(list)) return [];
	return list.map((item) => {
		const rawType = item.upload_type ?? item.uploadType ?? item.type ?? "Vendor";
		const upload_type = typeof rawType === "string" && rawType.toLowerCase().includes("client") ? "Client" : typeof rawType === "string" && rawType.toLowerCase().includes("employee") ? "Employee" : "Vendor";
		const recordCount = Number(item.record_count ?? item.recordCount ?? item.total_records ?? item.records_count ?? item.total_rows ?? (Array.isArray(item.records) ? item.records.length : void 0) ?? item.count ?? 0) || 0;
		return {
			upload_id: String(item.upload_id ?? item.uploadId ?? item.id ?? ""),
			upload_type,
			file_name: String(item.file_name ?? item.fileName ?? item.filename ?? item.source ?? item.name ?? (upload_type === "Client" ? "Client Data" : upload_type === "Employee" ? "Employee Data" : "Vendor Data")),
			record_count: recordCount,
			uploaded_at: String(item.uploaded_at ?? item.uploadedAt ?? item.created_at ?? item.createdAt ?? item.timestamp ?? item.date ?? (/* @__PURE__ */ new Date()).toISOString())
		};
	});
}
function normalizeClientHistory(raw) {
	let list = raw?.data?.data ?? raw?.data ?? raw;
	if (!Array.isArray(list)) list = list?.history ?? list?.items ?? list?.records ?? [];
	if (!Array.isArray(list)) return [];
	return list.map((item) => ({
		upload_id: String(item.upload_id || item.id || ""),
		upload_type: "Client",
		file_name: String(item.source || item.file_name || "Client Portfolio"),
		record_count: Number(item.total_rows ?? item.record_count ?? item.inserted_count ?? 0),
		uploaded_at: String(item.uploaded_at || item.created_at || (/* @__PURE__ */ new Date()).toISOString())
	}));
}
function useCFODashboard() {
	const vendorQ = useQuery({
		queryKey: cfoKeys.dashboard.vendor(),
		queryFn: () => cfoApi.get("/dashboard/vendor")
	});
	const clientMetricsQ = useQuery({
		queryKey: cfoKeys.dashboard.client(),
		queryFn: async () => {
			try {
				return await cfoApi.get("/dashboard/client");
			} catch {
				try {
					const res = await cfoApi.get("/clients", { params: { size: 1e3 } });
					const items = res?.data?.data?.items ?? res?.data?.data ?? [];
					if (Array.isArray(items)) return { data: {
						totalClients: items.length,
						recurringClients: items.filter((c) => {
							const rec = String(c.recurring || "").trim().toLowerCase();
							return rec === "yes" || rec === "true" || rec === "1" || rec === "recurring";
						}).length
					} };
				} catch {}
				return { data: {
					totalClients: 0,
					recurringClients: 0
				} };
			}
		}
	});
	const historyQ = useQuery({
		queryKey: cfoKeys.dashboard.history(),
		queryFn: () => cfoApi.get("/dashboard/history")
	});
	const clientHistoryQ = useQuery({
		queryKey: cfoKeys.clients.history(),
		queryFn: () => cfoApi.get("/clients/dashboard/history")
	});
	const vendorHistory = (historyQ.data ? normalizeHistory(historyQ.data) : []).filter((item) => item.upload_type === "Vendor");
	const clientHistory = clientHistoryQ.data ? normalizeClientHistory(clientHistoryQ.data) : [];
	return {
		vendorMetrics: vendorQ.data ? normalizeVendorMetrics(vendorQ.data) : void 0,
		clientMetrics: clientMetricsQ.data ? normalizeClientMetrics(clientMetricsQ.data) : void 0,
		history: vendorHistory,
		clientHistory,
		isLoading: vendorQ.isLoading || clientMetricsQ.isLoading || historyQ.isLoading || clientHistoryQ.isLoading,
		refetch: () => {
			vendorQ.refetch();
			clientMetricsQ.refetch();
			historyQ.refetch();
			clientHistoryQ.refetch();
		}
	};
}
//#endregion
export { useCFODashboard as t };
