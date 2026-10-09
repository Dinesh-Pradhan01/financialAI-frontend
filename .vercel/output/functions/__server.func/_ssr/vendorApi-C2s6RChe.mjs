import { t as cfoApi } from "./cfoAxios-sGO5vNpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendorApi-C2s6RChe.js
function sanitizeVendorRecord(r) {
	if (!r || typeof r !== "object") return r;
	const clean = { ...r };
	for (const field of [
		"contract_start_date",
		"contract_end_date",
		"renewal_date",
		"contractStartDate",
		"contractEndDate",
		"renewalDate"
	]) if (clean[field] !== void 0) {
		if (typeof clean[field] === "string") {
			const trimmed = clean[field].trim();
			clean[field] = trimmed === "" ? null : trimmed;
		} else if (!clean[field]) clean[field] = null;
	}
	if (clean.recurring !== void 0) {
		if (typeof clean.recurring === "string") {
			const lower = clean.recurring.trim().toLowerCase();
			if (lower === "yes" || lower === "true" || lower === "1") clean.recurring = true;
			else if (lower === "no" || lower === "false" || lower === "0") clean.recurring = false;
			else clean.recurring = null;
		} else if (typeof clean.recurring !== "boolean") clean.recurring = null;
	}
	for (const field of [
		"contract_value",
		"contractValue",
		"monthly_cost",
		"monthlyCost",
		"cost",
		"base_cost",
		"support_cost",
		"maintenance_cost",
		"hosting_cost",
		"cloud_cost",
		"miscellaneous_cost",
		"tax_percentage",
		"discount",
		"expected_billing"
	]) if (clean[field] !== void 0 && clean[field] !== null) {
		if (typeof clean[field] === "string") {
			const cleaned = clean[field].replace(/[$₹€£,\s]/g, "").trim();
			clean[field] = cleaned === "" ? null : Number.isNaN(Number(cleaned)) ? null : Number(cleaned);
		}
	}
	const monthlyVal = clean.monthly_cost ?? clean.monthlyCost ?? clean.cost;
	const contractVal = clean.contract_value ?? clean.contractValue;
	const contractTypeStr = String(clean.contract_type || clean.contractType || "").toLowerCase();
	const frequencyStr = String(clean.frequency || "").toLowerCase();
	const isSubscription = contractTypeStr.includes("sub") || frequencyStr.includes("sub") || clean.recurring === true || String(clean.recurring || "").toLowerCase() === "true" || String(clean.recurring || "").toLowerCase() === "yes";
	if ((monthlyVal == null || monthlyVal === 0 || Number.isNaN(monthlyVal)) && isSubscription && contractVal > 0) {
		const autoMonthly = Math.round(Number(contractVal) / 12 * 100) / 100;
		clean.monthly_cost = autoMonthly;
		clean.monthlyCost = autoMonthly;
		clean.cost = autoMonthly;
	} else if (monthlyVal != null) {
		clean.monthly_cost = monthlyVal;
		clean.monthlyCost = monthlyVal;
	}
	if (clean.contract_value != null && clean.contractValue == null) clean.contractValue = clean.contract_value;
	if (clean.contractValue != null && clean.contract_value == null) clean.contract_value = clean.contractValue;
	if (!clean.contract_id && clean.contractId) clean.contract_id = clean.contractId;
	if (!clean.contract_id && clean.vendor_id) clean.contract_id = `CTR-${clean.vendor_id}`;
	return clean;
}
function sanitizeVendorPayload(payload) {
	if (!payload || typeof payload !== "object") return payload;
	if (Array.isArray(payload)) return payload.map(sanitizeVendorRecord);
	const copy = { ...payload };
	if (Array.isArray(copy.records)) copy.records = copy.records.map(sanitizeVendorRecord);
	return copy;
}
var vendorApi = {
	uploadExcel: (file, onUploadProgress) => {
		const formData = new FormData();
		formData.append("file", file);
		return cfoApi.post("/vendors/upload", formData, {
			headers: { "Content-Type": "multipart/form-data" },
			onUploadProgress
		});
	},
	previewManual: (data) => {
		return cfoApi.post("/vendors/manual", sanitizeVendorPayload(data));
	},
	importVendors: (previewData) => {
		return cfoApi.post("/vendors/import", sanitizeVendorPayload(previewData));
	},
	getAll: (params) => {
		const queryParams = { ...params };
		if (queryParams.page !== void 0 && queryParams.size !== void 0) {
			queryParams.skip = (queryParams.page - 1) * queryParams.size;
			queryParams.limit = queryParams.size;
			delete queryParams.page;
			delete queryParams.size;
		}
		return cfoApi.get("/vendors", { params: queryParams });
	},
	getById: (id) => {
		return cfoApi.get(`/vendors/${id}`);
	},
	updateVendor: (id, patch) => {
		return cfoApi.put(`/vendors/${id}`, sanitizeVendorRecord(patch));
	},
	deleteVendor: (id) => {
		return cfoApi.delete(`/vendors/${id}`);
	},
	uploadAgreement: (uploadId, rowId, file, onUploadProgress) => {
		const formData = new FormData();
		formData.append("file", file);
		return cfoApi.post(`/vendors/preview/${uploadId}/row/${rowId}/agreement`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
			onUploadProgress
		});
	},
	extractAgreement: (uploadId, rowId) => {
		return cfoApi.post(`/vendors/preview/${uploadId}/row/${rowId}/agreement/extract`);
	},
	getAgreementExtraction: (uploadId, rowId) => {
		return cfoApi.get(`/vendors/preview/${uploadId}/row/${rowId}/agreement/extraction`);
	},
	getAgreementFileUrl: (uploadId, rowId) => {
		return `/api/v1/cfo/vendors/preview/${uploadId}/row/${rowId}/agreement/file`;
	}
};
//#endregion
export { vendorApi as t };
