import { getIdToken } from "@/shared/firebase/auth";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

// When VITE_API_BASE_URL is set to empty (""), we use relative paths so
// the Vite dev-server proxy forwards /api/* to the FastAPI backend on the
// same origin. This avoids cross-origin cookie issues in development.
// In production, set VITE_API_BASE_URL to the absolute backend URL.
//
// NOTE: use || not ?? so that an empty string (proxy mode) doesn't
// accidentally fall through to the Railway URL.
const _rawBase =
  (import.meta.env.VITE_API_URL || "") ||
  (import.meta.env.VITE_API_BASE_URL || "");

export const API_BASE_URL: string = _rawBase
  ? _rawBase.replace(/\/+$/, "")  // strip trailing slash
  : "";                            // empty → relative paths → Vite proxy

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FetchOptions extends Omit<RequestInit, "headers"> {
  /** Extra headers merged on top of defaults. */
  headers?: Record<string, string>;
  /** Add Authorization Bearer header. Only needed for /sync now. */
  useFirebaseToken?: boolean;
}

// ---------------------------------------------------------------------------
// Core helper
// ---------------------------------------------------------------------------

/**
 * Authenticated fetch wrapper.
 *
 * - Automatically sends cookies with `credentials: "include"`
 * - Parses JSON responses
 * - Throws on non-2xx responses with the server error detail
 */
export async function fetchAPI<T = unknown>(path: string, options: FetchOptions = {}): Promise<T> {
  const { headers: extraHeaders = {}, useFirebaseToken, ...init } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  // Attach the Firebase token on every request unless explicitly opted out.
  // Opting out (useFirebaseToken: false) is only needed for the logout endpoint
  // which must fire even after the Firebase session is revoked.
  // All other callers get the token automatically — no manual header needed.
  if (useFirebaseToken !== false && !headers["Authorization"]) {
    const token = await getIdToken(/* forceRefresh */ false);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    credentials: "include",
    ...init,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    // NOTE: Do NOT redirect on 401 here. Hard navigations bypass TanStack Router,
    // reset all React state, and re-trigger initializeAuth() — causing redirect loops.
    // Auth redirects are handled exclusively by _app.tsx beforeLoad / useEffect.

    const detail = body?.detail ?? body?.message;
    const message =
      typeof detail === "string"
        ? detail
        : detail
          ? JSON.stringify(detail)
          : `API error ${response.status}`;
    const error = new Error(message) as Error & {
      status: number;
      detail?: unknown;
      data?: unknown;
    };
    error.status = response.status;
    error.detail = detail;
    error.data = body;
    throw error;
  }

  return body as T;
}

// ---------------------------------------------------------------------------
// Convenience methods
// ---------------------------------------------------------------------------

export const api = {
  get: <T = unknown>(path: string, opts?: FetchOptions) =>
    fetchAPI<T>(path, { ...opts, method: "GET" }),

  post: <T = unknown>(path: string, data?: unknown, opts?: FetchOptions) =>
    fetchAPI<T>(path, {
      ...opts,
      method: "POST",
      body: data != null ? JSON.stringify(data) : undefined,
    }),

  put: <T = unknown>(path: string, data?: unknown, opts?: FetchOptions) =>
    fetchAPI<T>(path, {
      ...opts,
      method: "PUT",
      body: data != null ? JSON.stringify(data) : undefined,
    }),

  patch: <T = unknown>(path: string, data?: unknown, opts?: FetchOptions) =>
    fetchAPI<T>(path, {
      ...opts,
      method: "PATCH",
      body: data != null ? JSON.stringify(data) : undefined,
    }),

  delete: <T = unknown>(path: string, opts?: FetchOptions) =>
    fetchAPI<T>(path, { ...opts, method: "DELETE" }),

  /**
   * Upload a file as multipart/form-data.
   * Does NOT set Content-Type (browser sets it with boundary automatically).
   */
  upload: async <T = unknown>(
    path: string,
    formData: FormData,
    method: "POST" | "PUT" = "POST",
    opts?: { timeoutMs?: number; signal?: AbortSignal },
  ): Promise<T> => {
    const url = `${API_BASE_URL}${path}`;

    let timeoutSignal: AbortSignal | undefined;
    if (opts?.timeoutMs && typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) {
      timeoutSignal = AbortSignal.timeout(opts.timeoutMs);
    }

    const signal = opts?.signal ?? timeoutSignal;

    const uploadHeaders: Record<string, string> = {};
    const token = await getIdToken(false);
    if (token) uploadHeaders["Authorization"] = `Bearer ${token}`;

    const response = await fetch(url, {
      method,
      credentials: "include",
      headers: uploadHeaders,
      body: formData,
      signal,
    });

    if (response.status === 204) return undefined as T;
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      const detail = body?.detail ?? body?.message;
      const message =
        typeof detail === "string"
          ? detail
          : detail
            ? JSON.stringify(detail)
            : `API error ${response.status}`;
      const error = new Error(message) as Error & {
        status: number;
        detail?: unknown;
        data?: unknown;
      };
      error.status = response.status;
      error.detail = detail;
      error.data = body;
      throw error;
    }
    return body as T;
  },

  /**
   * Download a binary/blob file from the server.
   */
  download: async (path: string): Promise<Blob> => {
    const url = `${API_BASE_URL}${path}`;
    const dlHeaders: Record<string, string> = {};
    const token = await getIdToken(false);
    if (token) dlHeaders["Authorization"] = `Bearer ${token}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: dlHeaders,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const detail = body?.detail ?? body?.message;
      const message =
        typeof detail === "string"
          ? detail
          : detail
            ? JSON.stringify(detail)
            : `API error ${response.status}`;
      const error = new Error(message) as Error & {
        status: number;
        detail?: unknown;
        data?: unknown;
      };
      error.status = response.status;
      error.detail = detail;
      error.data = body;
      throw error;
    }

    return response.blob();
  },
};
