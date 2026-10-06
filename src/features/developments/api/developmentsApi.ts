import { api } from "@/shared/lib/api";
import {
  type DevelopmentQueryParams,
  type DevelopmentResponseDTO,
  DevelopmentsError,
  isDevelopmentsError,
} from "../types/developments";

export { DevelopmentsError, isDevelopmentsError };

export const DEFAULT_DEVELOPMENT_PARAMS: DevelopmentQueryParams = {
  days: 30,
  limit: 10,
};

const CLIENT_TIMEOUT_MS = 120_000;

/**
 * Builds the URL path for company developments.
 * This is the ONLY place that knows the URL shape.
 * If backend later migrates to a session-scoped URL (e.g. /api/v1/developments),
 * modify only this function.
 */
export function buildDevelopmentsUrl(
  businessId: string,
  params: DevelopmentQueryParams = DEFAULT_DEVELOPMENT_PARAMS,
): string {
  const searchParams = new URLSearchParams({
    days: String(params.days),
    limit: String(params.limit),
  });
  return `/api/v1/developments/${encodeURIComponent(businessId)}?${searchParams.toString()}`;
}

/**
 * Classifies an unknown fetch / HTTP error into a typed DevelopmentsError.
 */
export function classifyDevelopmentsError(error: unknown, timedOut = false): DevelopmentsError {
  if (isDevelopmentsError(error)) {
    return error;
  }

  const status = (error as { status?: number })?.status;
  const errorName = (error as { name?: string })?.name;
  const message =
    (error as Error)?.message || "An unknown error occurred while fetching developments";

  if (
    timedOut ||
    errorName === "AbortError" ||
    errorName === "TimeoutError" ||
    status === 408 ||
    status === 504
  ) {
    return new DevelopmentsError(
      "timeout",
      "Developments request timed out after 60s. Upstream search took longer than expected.",
      { status, cause: error },
    );
  }

  if (status === 404) {
    return new DevelopmentsError(
      "not_found",
      "Company was not found or onboarding profile data is missing.",
      { status, cause: error },
    );
  }

  if (status === 422 || status === 400) {
    return new DevelopmentsError("invalid", "Invalid request parameters or company ID.", {
      status,
      cause: error,
    });
  }

  if (status === 503 || (typeof status === "number" && status >= 500 && status < 600)) {
    return new DevelopmentsError(
      "upstream",
      "Developments service or upstream provider is temporarily unavailable.",
      { status, cause: error },
    );
  }

  return new DevelopmentsError("unknown", message, { status, cause: error });
}

/**
 * Fetches developments for a given company.
 *
 * Implements a standalone 60s client timeout via an internal AbortController.
 * This request is NOT tied to TanStack Query's cancellation signal: if the user
 * navigates away from the tab or page, the request completes in the background
 * and populates the TanStack Query memory cache.
 */
export async function fetchDevelopments(
  businessId: string,
  params: DevelopmentQueryParams = DEFAULT_DEVELOPMENT_PARAMS,
  opts?: { signal?: AbortSignal },
): Promise<DevelopmentResponseDTO> {
  const controller = new AbortController();
  let timedOut = false;

  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort(new DOMException("Request timed out after 60s", "TimeoutError"));
  }, CLIENT_TIMEOUT_MS);

  // If caller explicitly provides an external signal, propagate it
  if (opts?.signal) {
    if (opts.signal.aborted) {
      controller.abort(opts.signal.reason);
    } else {
      opts.signal.addEventListener("abort", () => controller.abort(opts.signal?.reason), {
        once: true,
      });
    }
  }

  try {
    const url = buildDevelopmentsUrl(businessId, params);
    const data = await api.get<DevelopmentResponseDTO>(url, { signal: controller.signal });
    return data;
  } catch (error: unknown) {
    throw classifyDevelopmentsError(error, timedOut);
  } finally {
    clearTimeout(timer);
  }
}
