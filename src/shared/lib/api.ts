import { getIdToken } from "@/shared/firebase/auth";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

// When VITE_API_BASE_URL is set to empty (""), we use relative paths so
// the Vite dev-server proxy forwards /api/* to the FastAPI backend on the
// same origin. This avoids cross-origin cookie issues in development.
// In production, set VITE_API_BASE_URL to the absolute backend URL.
const _rawBase = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL: string =
  _rawBase !== undefined && _rawBase !== null
    ? _rawBase          // could be "" (proxy mode) or "https://api.example.com"
    : "http://127.0.0.1:8000"; // local fallback when env var is missing entirely


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
export async function fetchAPI<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { headers: extraHeaders = {}, useFirebaseToken = false, ...init } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  // Only attach Firebase token when explicitly requested (e.g. for /sync)
  if (useFirebaseToken) {
    const token = await getIdToken(/* forceRefresh */ false);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    credentials: "include", // Essential for sending/receiving session cookies
    ...init,
    headers,
  });

  // Handle non-JSON (204 No Content, etc.)
  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const isAuthPage =
        currentPath.startsWith("/login") ||
        currentPath.startsWith("/signup") ||
        currentPath.startsWith("/verify-email") ||
        currentPath.startsWith("/accept-invite") ||
        currentPath === "/";
      if (!isAuthPage && !path.includes("/api/auth/")) {
        window.location.href = "/login";
      }
    }

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
    method: "POST" | "PUT" = "POST"
  ): Promise<T> => {
    const url = `${API_BASE_URL}${path}`;
    const response = await fetch(url, {
      method,
      credentials: "include",
      body: formData,
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
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
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
