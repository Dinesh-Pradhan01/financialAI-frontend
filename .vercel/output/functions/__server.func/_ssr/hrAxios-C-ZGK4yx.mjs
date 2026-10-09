import { i as getIdToken } from "./api-XLUwYDya.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hrAxios-C-ZGK4yx.js
/**
* hrAxios.ts — Axios instance for HR feature API calls.
*
* Uses a relative baseURL (/api/v1/hr) so requests are forwarded through
* the Vite dev-server proxy to the local FastAPI backend with zero CORS issues.
* In production the proxy is replaced by the real backend domain via the
* reverse-proxy/Vercel rewrite rules.
*
* Token attachment is handled here via an Axios request interceptor so
* individual callers never need to manage auth headers manually.
*/
var hrApi = axios.create({
	baseURL: "/api/v1/hr",
	withCredentials: true,
	timeout: 3e4,
	headers: { "Content-Type": "application/json" }
});
hrApi.interceptors.request.use(async (config) => {
	const token = await getIdToken(false);
	if (token) config.headers.set("Authorization", `Bearer ${token}`);
	return config;
}, (error) => Promise.reject(error));
hrApi.interceptors.response.use((response) => response, async (error) => {
	const originalRequest = error.config;
	if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
		originalRequest._retry = true;
		try {
			const newToken = await getIdToken(true);
			if (newToken) {
				originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
				return hrApi(originalRequest);
			}
		} catch (refreshError) {
			console.error("[hrApi] Token refresh failed", refreshError);
		}
	}
	if (typeof window !== "undefined" && !originalRequest?._suppressToast) {
		const status = error.response?.status;
		const message = (typeof error.response?.data?.detail === "string" ? error.response.data.detail : error.response?.data?.message) || error.message || "An error occurred";
		if (status === 422) {
			const details = error.response?.data?.details ?? error.response?.data?.detail;
			if (Array.isArray(details)) {
				const lines = details.map((d) => {
					const path = d.loc.join(".");
					const m = path.match(/records\.(\d+)\.(.+)/);
					return m ? `Row ${Number(m[1]) + 1}: ${m[2]} — ${d.msg}` : `${path} — ${d.msg}`;
				}).join("\n");
				toast.error(`Validation Error:\n${lines}`, { duration: 6e3 });
			} else toast.error("Validation Error: Please check the data format.");
		} else if (status && status >= 500) toast.error(`Server Error: ${message}`);
		else if (status && status >= 400 && status !== 401 && status !== 404) {
			const errorsList = error.response?.data?.errors;
			if (Array.isArray(errorsList) && errorsList.length > 0) toast.error(`${message}\n\n${errorsList.join("\n")}`, { duration: 8e3 });
			else toast.error(message);
		}
	}
	const detail = error.response?.data?.detail ?? error.response?.data?.message;
	const msg = typeof detail === "string" ? detail : detail ? JSON.stringify(detail) : `API error ${error.response?.status ?? error.message}`;
	const enhancedError = new Error(msg);
	enhancedError.status = error.response?.status;
	enhancedError.detail = detail;
	enhancedError.data = error.response?.data;
	return Promise.reject(enhancedError);
});
//#endregion
export { hrApi as t };
