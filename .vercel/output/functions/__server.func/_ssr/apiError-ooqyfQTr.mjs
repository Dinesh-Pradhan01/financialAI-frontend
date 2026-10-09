import { l as ZodError } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/apiError-ooqyfQTr.js
/**
* Normalizes any caught error from an API call, Zod validation, or network exception.
* Handles 422 field arrays, 409 duplicate conflicts, 403 forbidden permissions,
* 401 session expiries, and server exception payloads.
*/
function parseApiError(error, fallbackMessage = "Something went wrong. Please try again.") {
	const fieldErrors = {};
	let status;
	let message = fallbackMessage;
	let detail;
	if (!error) return {
		message,
		fieldErrors,
		isValidationError: false,
		isDuplicate: false,
		isForbidden: false,
		isUnauthorized: false,
		isNotFound: false
	};
	if (error instanceof ZodError) {
		for (const issue of error.issues) {
			const field = String(issue.path[issue.path.length - 1] ?? "");
			if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
		}
		const firstField = Object.keys(fieldErrors)[0];
		return {
			message: firstField ? fieldErrors[firstField] : "Validation failed. Please check form inputs.",
			fieldErrors,
			isValidationError: true,
			isDuplicate: false,
			isForbidden: false,
			isUnauthorized: false,
			isNotFound: false
		};
	}
	if (typeof error === "object" && error !== null) {
		const errObj = error;
		if (typeof errObj.status === "number") status = errObj.status;
		detail = errObj.detail ?? errObj.response?.data?.detail ?? errObj.data?.detail;
		if (typeof errObj.message === "string" && errObj.message) message = errObj.message;
	} else if (typeof error === "string") message = error;
	if (!detail && typeof message === "string" && (message.startsWith("{") || message.startsWith("["))) try {
		const parsed = JSON.parse(message);
		if (parsed && typeof parsed === "object") detail = parsed.detail ?? parsed;
	} catch {}
	if (Array.isArray(detail)) {
		for (const item of detail) if (item && Array.isArray(item.loc)) {
			const field = String(item.loc[item.loc.length - 1]);
			if (field && !fieldErrors[field]) fieldErrors[field] = item.msg;
		}
		const firstField = Object.keys(fieldErrors)[0];
		if (firstField) message = fieldErrors[firstField];
	} else if (typeof detail === "string" && detail.trim().length > 0) message = detail;
	const isValidationError = status === 422 || Object.keys(fieldErrors).length > 0;
	const isDuplicate = status === 409 || message.toLowerCase().includes("already exists") || message.toLowerCase().includes("already uploaded") || message.toLowerCase().includes("duplicate");
	const isForbidden = status === 403 || message.toLowerCase().includes("permission") || message.toLowerCase().includes("forbidden");
	const isUnauthorized = status === 401 || message.toLowerCase().includes("unauthorized") || message.toLowerCase().includes("session expired");
	const isNotFound = status === 404 || message.toLowerCase().includes("not found");
	if (isDuplicate && (!detail || typeof detail !== "string" || detail.length < 5)) message = "This record or document has already been uploaded / created.";
	else if (isForbidden && (!detail || typeof detail !== "string" || detail.length < 5)) message = "You do not have permission to perform this action.";
	else if (isUnauthorized) message = "Your session has expired. Please sign in again.";
	else if (isNotFound && (!detail || typeof detail !== "string" || detail.length < 5)) message = "The requested resource could not be found.";
	return {
		message,
		fieldErrors,
		status,
		detail,
		isValidationError,
		isDuplicate,
		isForbidden,
		isUnauthorized,
		isNotFound
	};
}
/**
* Returns a clean user-facing error message from any caught error.
*/
function getApiErrorMessage(error, fallbackMessage = "Something went wrong. Please try again.") {
	return parseApiError(error, fallbackMessage).message;
}
/**
* Detects if the error corresponds to an HTTP 409 Duplicate Conflict.
*/
function isDuplicateError(error) {
	return parseApiError(error).isDuplicate;
}
//#endregion
export { isDuplicateError as n, parseApiError as r, getApiErrorMessage as t };
