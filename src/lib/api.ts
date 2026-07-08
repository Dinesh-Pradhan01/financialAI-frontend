import { getIdToken } from "../firebase/auth";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FetchOptions extends Omit<RequestInit, "headers"> {
  /** Extra headers merged on top of defaults. */
  headers?: Record<string, string>;
  /** Skip attaching the Authorization header (e.g. for public endpoints). */
  noAuth?: boolean;
}

// ---------------------------------------------------------------------------
// Core helper
// ---------------------------------------------------------------------------

/**
 * Authenticated fetch wrapper.
 *
 * - Automatically attaches `Authorization: Bearer <firebase_id_token>`
 * - Parses JSON responses
 * - Throws on non-2xx responses with the server error detail
 */
export async function fetchAPI<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { headers: extraHeaders = {}, noAuth = false, ...init } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  // Attach auth token unless explicitly skipped
  if (!noAuth) {
    const token = await getIdToken(/* forceRefresh */ false);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...init,
    headers,
  });

  // Handle non-JSON (204 No Content, etc.)
  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body?.detail ??
      body?.message ??
      `API error ${response.status}`;
    const error = new Error(message) as Error & { status: number };
    error.status = response.status;
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

  delete: <T = unknown>(path: string, opts?: FetchOptions) =>
    fetchAPI<T>(path, { ...opts, method: "DELETE" }),
};
