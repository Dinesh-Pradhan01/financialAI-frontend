/**
 * cfoAxios.ts — Axios instance for CFO feature API calls.
 *
 * Uses a relative baseURL (/api/v1/cfo) so requests are forwarded through
 * the Vite dev-server proxy to the local FastAPI backend with zero CORS issues.
 * In production the proxy is replaced by the real backend domain via the
 * reverse-proxy/Vercel rewrite rules.
 *
 * Token attachment is handled here via an Axios request interceptor so
 * individual callers never need to manage auth headers manually.
 */
import axios from "axios";
import { getIdToken } from "@/shared/firebase/auth";
import { toast } from "sonner";

export const cfoApi = axios.create({
  baseURL: "/api/v1/cfo",
  withCredentials: true,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor ───────────────────────────────────────────────────────
cfoApi.interceptors.request.use(
  async (config) => {
    const token = await getIdToken(/* forceRefresh */ false);
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ──────────────────────────────────────────────────────
cfoApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Attempt a single token refresh on 401 before giving up
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await getIdToken(/* forceRefresh */ true);
        if (newToken) {
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
          return cfoApi(originalRequest);
        }
      } catch (refreshError) {
        console.error("[cfoApi] Token refresh failed", refreshError);
      }
    }

    // User-visible error toasts
    if (typeof window !== "undefined" && !originalRequest?._suppressToast) {
      const status = error.response?.status;
      const detail =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.message;
      const message = detail || error.message || "An error occurred";

      if (status === 422) {
        const details = error.response?.data?.details ?? error.response?.data?.detail;
        if (Array.isArray(details)) {
          const lines = details
            .map((d: { loc: (string | number)[]; msg: string }) => {
              const path = d.loc.join(".");
              const m = path.match(/records\.(\d+)\.(.+)/);
              return m ? `Row ${Number(m[1]) + 1}: ${m[2]} — ${d.msg}` : `${path} — ${d.msg}`;
            })
            .join("\n");
          toast.error(`Validation Error:\n${lines}`, { duration: 6000 });
        } else {
          toast.error("Validation Error: Please check the data format.");
        }
      } else if (status && status >= 500) {
        toast.error(`Server Error: ${message}`);
      } else if (status && status >= 400 && status !== 401 && status !== 404) {
        const errorsList = error.response?.data?.errors;
        if (Array.isArray(errorsList) && errorsList.length > 0) {
          toast.error(`${message}\n\n${errorsList.join("\n")}`, { duration: 8000 });
        } else {
          toast.error(message);
        }
      }
    }

    // Normalise to match fetchAPI's error shape so catch blocks work uniformly
    const detail = error.response?.data?.detail ?? error.response?.data?.message;
    const msg =
      typeof detail === "string"
        ? detail
        : detail
          ? JSON.stringify(detail)
          : `API error ${error.response?.status ?? error.message}`;

    const enhancedError = new Error(msg) as Error & {
      status?: number;
      detail?: unknown;
      data?: unknown;
    };
    enhancedError.status = error.response?.status;
    enhancedError.detail = detail;
    enhancedError.data = error.response?.data;

    return Promise.reject(enhancedError);
  },
);
