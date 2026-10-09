import { t as hrApi } from "./hrAxios-C-ZGK4yx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employeeApi-pOPj55l0.js
function sanitizeEmployeeRecord(r) {
	if (!r || typeof r !== "object") return r;
	const clean = { ...r };
	for (const field of [
		"date_of_birth",
		"joining_date",
		"salary_payment_date",
		"dateOfBirth",
		"joiningDate",
		"salaryPaymentDate"
	]) if (clean[field] !== void 0) {
		if (typeof clean[field] === "string") {
			const trimmed = clean[field].trim();
			clean[field] = trimmed === "" ? null : trimmed;
		} else if (!clean[field]) clean[field] = null;
	}
	for (const field of [
		"salary",
		"previous_salary",
		"previousSalary",
		"hike_percentage",
		"salaryHikePercent",
		"gross_salary",
		"grossSalary",
		"net_salary",
		"netSalary",
		"ctc"
	]) if (clean[field] !== void 0 && clean[field] !== null) {
		if (typeof clean[field] === "string") {
			if (clean[field].trim() === "") clean[field] = null;
		}
	}
	return clean;
}
function sanitizeEmployeePayload(payload) {
	if (!payload || typeof payload !== "object") return payload;
	if (Array.isArray(payload)) return payload.map(sanitizeEmployeeRecord);
	const copy = { ...payload };
	if (Array.isArray(copy.records)) copy.records = copy.records.map(sanitizeEmployeeRecord);
	return copy;
}
var employeeApi = {
	uploadExcel: (file, onUploadProgress) => {
		const formData = new FormData();
		formData.append("file", file);
		return hrApi.post("/employees/upload", formData, {
			headers: { "Content-Type": "multipart/form-data" },
			onUploadProgress
		});
	},
	previewManual: (data) => {
		return hrApi.post("/employees/manual", sanitizeEmployeePayload(data));
	},
	importEmployees: (previewData) => {
		return hrApi.post("/employees/import", sanitizeEmployeePayload(previewData));
	},
	getAll: (params) => {
		return hrApi.get("/employees", { params });
	},
	getById: (id) => {
		return hrApi.get(`/employees/${id}`);
	},
	updateEmployee: (id, patch) => {
		return hrApi.put(`/employees/${id}`, sanitizeEmployeeRecord(patch));
	},
	deleteEmployee: (id) => {
		return hrApi.delete(`/employees/${id}`);
	}
};
//#endregion
export { employeeApi as t };
