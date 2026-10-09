import { t as cfoApi } from "./cfoAxios-sGO5vNpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clientApi-kVDjKSAc.js
/**
* Sanitizes a client record before transmission to the backend,
* ensuring Pydantic models receive nulls rather than empty strings for dates and numbers.
*/
function sanitizeClientRecord(r) {
	if (!r || typeof r !== "object") return r;
	const clean = { ...r };
	for (const field of [
		"contract_start_date",
		"contract_end_date",
		"contractStartDate",
		"contractEndDate"
	]) if (clean[field] !== void 0) {
		if (typeof clean[field] === "string") {
			const trimmed = clean[field].trim();
			clean[field] = trimmed === "" ? null : trimmed;
		} else if (!clean[field]) clean[field] = null;
	}
	for (const field of [
		"revenue",
		"contract_value",
		"contractValue"
	]) if (clean[field] !== void 0 && clean[field] !== null) {
		if (typeof clean[field] === "string") {
			const trimmed = clean[field].trim();
			clean[field] = trimmed === "" ? null : Number.isNaN(Number(trimmed)) ? null : Number(trimmed);
		}
	}
	if (!clean.client_id && clean.clientId) clean.client_id = clean.clientId;
	if (!clean.client_name && clean.clientName) clean.client_name = clean.clientName;
	if (!clean.contract_id && clean.contractId) clean.contract_id = clean.contractId;
	if (!clean.contract_id && clean.client_id) clean.contract_id = `CTR-${clean.client_id}`;
	if (!clean.contract_value && clean.contractValue !== void 0) clean.contract_value = clean.contractValue;
	if (!clean.contract_type && clean.contractType) clean.contract_type = clean.contractType;
	if (!clean.payment_type && clean.paymentType) clean.payment_type = clean.paymentType;
	if (!clean.bank_name && clean.bankName) clean.bank_name = clean.bankName;
	if (!clean.account_holder_name && clean.accountHolderName) clean.account_holder_name = clean.accountHolderName;
	if (!clean.account_number && clean.accountNumber) clean.account_number = clean.accountNumber;
	if (!clean.ifsc_code && clean.ifscCode) clean.ifsc_code = clean.ifscCode;
	if (!clean.legal_name && clean.legalName) clean.legal_name = clean.legalName;
	return clean;
}
function sanitizeClientPayload(payload) {
	if (!payload || typeof payload !== "object") return payload;
	if (Array.isArray(payload)) return payload.map(sanitizeClientRecord);
	const copy = { ...payload };
	if (Array.isArray(copy.records)) copy.records = copy.records.map(sanitizeClientRecord);
	return copy;
}
/**
* Normalizes an individual raw record from either Excel upload (nested under normalized_data)
* or manual/preview endpoints (already flat) into a consistent ClientRecord.
*/
function normalizeClientRecord(item, idx) {
	const base = item.normalized_data ? { ...item.normalized_data } : { ...item };
	const clientId = String(base.clientId || base.client_id || `CLI-${idx + 1}`).trim();
	const clientName = String(base.clientName || base.client_name || "").trim();
	const category = String(base.category || "Consulting").trim();
	const contractId = String(base.contractId || base.contract_id || `CTR-${clientId}`).trim();
	const rowId = String(item.rowId || base.rowId || item.row || idx + 1);
	const sourceRow = item.source_row || item.sourceRow || item.row || idx + 1;
	const rawErrors = item.validation_errors || base.validation_errors || [];
	const validation_errors = Array.isArray(rawErrors) ? rawErrors.map((e) => typeof e === "string" ? e : e?.message || JSON.stringify(e)) : [];
	const validation_status = item.validation_status || base.validation_status || (validation_errors.length > 0 ? "invalid" : "valid");
	const action = item.action || base.action || (validation_status === "valid" ? "INSERT" : "REJECT");
	return {
		...base,
		rowId,
		sourceRow,
		clientId,
		client_id: clientId,
		clientName,
		client_name: clientName,
		category,
		contractId,
		contract_id: contractId,
		legalName: base.legalName || base.legal_name || "",
		legal_name: base.legal_name || base.legalName || "",
		industry: base.industry || "Other",
		contractType: base.contractType || base.contract_type || "Fixed Price",
		contract_type: base.contract_type || base.contractType || "Fixed Price",
		contractStartDate: base.contractStartDate || base.contract_start_date || "",
		contract_start_date: base.contract_start_date || base.contractStartDate || "",
		contractEndDate: base.contractEndDate || base.contract_end_date || "",
		contract_end_date: base.contract_end_date || base.contractEndDate || "",
		revenue: base.revenue !== void 0 && base.revenue !== null ? base.revenue : 0,
		contractValue: base.contractValue !== void 0 && base.contractValue !== null ? base.contractValue : base.contract_value ?? 0,
		contract_value: base.contract_value !== void 0 && base.contract_value !== null ? base.contract_value : base.contractValue ?? 0,
		currency: base.currency || "INR",
		paymentType: base.paymentType || base.payment_type || "Bank Transfer",
		payment_type: base.payment_type || base.paymentType || "Bank Transfer",
		frequency: base.frequency || "Monthly",
		recurring: base.recurring !== void 0 ? String(base.recurring) : "No",
		bankName: base.bankName || base.bank_name || "",
		bank_name: base.bank_name || base.bankName || "",
		accountHolderName: base.accountHolderName || base.account_holder_name || "",
		account_holder_name: base.account_holder_name || base.accountHolderName || "",
		accountNumber: base.accountNumber || base.account_number || "",
		account_number: base.account_number || base.accountNumber || "",
		ifscCode: base.ifscCode || base.ifsc_code || "",
		ifsc_code: base.ifsc_code || base.ifscCode || "",
		status: base.status || "Active",
		validation_status,
		validation_errors,
		action,
		isBlank: false
	};
}
/**
* Normalizes backend response from upload, manual entry, or preview into a standard ClientPreviewResponse.
*/
function normalizeClientPreviewResponse(raw, fallbackRecords) {
	let previewData = raw;
	if (raw && typeof raw === "object" && raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) previewData = raw.data;
	const records = (Array.isArray(previewData?.records) ? previewData.records : Array.isArray(fallbackRecords) ? fallbackRecords : []).map((item, idx) => normalizeClientRecord(item, idx));
	const issues = [];
	const errorRowIds = [];
	records.forEach((r) => {
		if (r.validation_errors && r.validation_errors.length > 0) {
			errorRowIds.push(r.rowId);
			r.validation_errors.forEach((msg, errIdx) => {
				issues.push({
					id: `err-${r.rowId}-${errIdx}`,
					severity: "error",
					code: "VALIDATION_ERROR",
					message: msg,
					rowId: r.rowId,
					sourceRow: r.sourceRow
				});
			});
		}
	});
	const rawSummary = previewData?.summary || previewData?.validation;
	const validCount = typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : typeof rawSummary?.validClients === "number" ? rawSummary.validClients : records.filter((r) => r.validation_status === "valid").length;
	const errorCount = typeof rawSummary?.errors === "number" ? rawSummary.errors : errorRowIds.length;
	const summary = {
		validClients: validCount,
		warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
		errors: errorCount,
		issues: Array.isArray(rawSummary?.issues) && rawSummary.issues.length > 0 ? rawSummary.issues : issues,
		errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : errorRowIds,
		warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
		duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
		missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0
	};
	return {
		upload_id: previewData?.upload_id || `preview-${Date.now()}`,
		schema_def: previewData?.schema_def || null,
		records,
		summary,
		validation: summary,
		file_meta: previewData?.file_meta
	};
}
var clientApi = {
	uploadExcel: (file, onUploadProgress) => {
		const formData = new FormData();
		formData.append("file", file);
		return cfoApi.post("/clients/upload", formData, {
			headers: { "Content-Type": "multipart/form-data" },
			onUploadProgress
		});
	},
	previewManual: (data) => {
		return cfoApi.post("/clients/manual", sanitizeClientPayload(data));
	},
	previewClients: (data) => {
		return cfoApi.post("/clients/preview", sanitizeClientPayload(data));
	},
	importClients: (previewData) => {
		return cfoApi.post("/clients/import", sanitizeClientPayload(previewData));
	},
	getAll: (params) => {
		const queryParams = { ...params };
		if (queryParams.page !== void 0 && queryParams.size !== void 0) {
			queryParams.skip = (queryParams.page - 1) * queryParams.size;
			queryParams.limit = queryParams.size;
		}
		return cfoApi.get("/clients", { params: queryParams });
	},
	getById: (clientId, category) => {
		return cfoApi.get(`/clients/${encodeURIComponent(clientId)}`, { params: category ? { category } : void 0 });
	},
	updateClient: (clientId, category, patch) => {
		return cfoApi.put(`/clients/${encodeURIComponent(clientId)}`, sanitizeClientRecord({
			...patch,
			category
		}), { params: { category } });
	},
	deleteClient: (clientId, category) => {
		return cfoApi.delete(`/clients/${encodeURIComponent(clientId)}`, { params: { category } });
	},
	getHistory: () => {
		return cfoApi.get("/clients/dashboard/history");
	},
	getHistoryPreview: (uploadId) => {
		return cfoApi.get(`/clients/dashboard/history/${encodeURIComponent(uploadId)}/preview`);
	},
	uploadAgreement: (uploadId, rowId, file, onUploadProgress) => {
		const formData = new FormData();
		formData.append("file", file);
		return cfoApi.post(`/clients/preview/${uploadId}/row/${rowId}/agreement`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
			onUploadProgress
		});
	},
	extractAgreement: (uploadId, rowId) => {
		return cfoApi.post(`/clients/preview/${uploadId}/row/${rowId}/agreement/extract`);
	},
	getAgreementExtraction: (uploadId, rowId) => {
		return cfoApi.get(`/clients/preview/${uploadId}/row/${rowId}/agreement/extraction`);
	},
	getAgreementFileUrl: (uploadId, rowId) => {
		return `/api/v1/cfo/clients/preview/${uploadId}/row/${rowId}/agreement/file`;
	}
};
//#endregion
export { normalizeClientPreviewResponse as n, clientApi as t };
