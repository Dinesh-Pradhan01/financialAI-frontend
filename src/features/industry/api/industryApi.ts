/**
 * Industry API Client & Data Source Switch
 *
 * Implements the dual-source architecture:
 * - VITE_INDUSTRY_DATA_SOURCE = "fixtures" (default) | "api"
 * - In "fixtures" mode, returns contract-shaped static fixtures with 300ms skeleton delay.
 * - In "api" mode, queries live backend and validates with Zod runtime schemas.
 * - Demo query parameter support for QA / developer sandboxing:
 *   ?demo=empty | none | generating | error | slow | unexpected
 */

import { api } from "@/shared/lib/api";
import type { CompetitorsResponseDTO, CompanyFinancialsResponseDTO } from "../types/industry";
import {
  CompetitorsResponseSchema,
  CompanyFinancialsResponseSchema,
} from "../schemas/industrySchemas";
import {
  FIXTURE_COMPETITORS_RESPONSE,
  FIXTURE_FINANCIALS_BY_COMPANY_ID,
  getFixtureCompanyFinancials,
} from "../fixtures";

// ---------------------------------------------------------------------------
// Error Handling
// ---------------------------------------------------------------------------

export type IndustryApiErrorKind =
  | "not_found"
  | "unauthorized"
  | "unexpected_response"
  | "network_error"
  | "unknown";

export class IndustryApiError extends Error {
  readonly kind: IndustryApiErrorKind;
  readonly status?: number;
  readonly validationErrors?: unknown;

  constructor(
    kind: IndustryApiErrorKind,
    message: string,
    opts?: { status?: number; validationErrors?: unknown; cause?: unknown },
  ) {
    super(message);
    this.name = "IndustryApiError";
    this.kind = kind;
    this.status = opts?.status;
    this.validationErrors = opts?.validationErrors;
    if (opts?.cause) {
      this.cause = opts?.cause;
    }
  }
}

export function isIndustryApiError(error: unknown): error is IndustryApiError {
  return error instanceof IndustryApiError;
}

// ---------------------------------------------------------------------------
// Configuration & Helpers
// ---------------------------------------------------------------------------

export function getIndustryDataSource(): "fixtures" | "api" {
  const envVal = import.meta.env.VITE_INDUSTRY_DATA_SOURCE;
  if (!envVal || envVal === "fixtures") {
    return "fixtures";
  }
  if (envVal === "api") {
    return "api";
  }
  if (import.meta.env.DEV) {
    console.warn(
      `[Industry V2] Invalid VITE_INDUSTRY_DATA_SOURCE="${envVal}". Expected "fixtures" | "api". Falling back to "fixtures".`,
    );
  }
  return "fixtures";
}

function areDemoControlsAllowed(): boolean {
  return Boolean(import.meta.env.DEV) || import.meta.env.VITE_INDUSTRY_DEMO_CONTROLS === "true";
}

function getDemoParam(overrideParam?: string): string | null {
  if (overrideParam) return overrideParam;
  if (!areDemoControlsAllowed() || typeof window === "undefined") {
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  return params.get("demo");
}

async function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}

// ---------------------------------------------------------------------------
// Fixtures Implementation
// ---------------------------------------------------------------------------

async function getCompetitorsFromFixtures(opts?: {
  signal?: AbortSignal;
  demo?: string;
}): Promise<CompetitorsResponseDTO> {
  const demo = getDemoParam(opts?.demo);

  // Default latency is 300ms so skeletons remain visible
  let latency = 300;
  if (demo === "slow") {
    latency = 1500;
  }

  await sleep(latency, opts?.signal);

  if (demo === "error") {
    throw new IndustryApiError("network_error", "Simulated demo error for competitors query.", {
      status: 500,
    });
  }

  if (demo === "unexpected") {
    // Intentionally invalid structure to trigger runtime schema validation error
    const malformed = {
      status: "invalid_status",
      anchor: null,
      competitors: "not_an_array",
    };
    const parsed = CompetitorsResponseSchema.safeParse(malformed);
    if (!parsed.success) {
      throw new IndustryApiError(
        "unexpected_response",
        "Unexpected response schema from upstream service.",
        { validationErrors: parsed.error.format() },
      );
    }
  }

  if (demo === "empty") {
    return {
      ...FIXTURE_COMPETITORS_RESPONSE,
      status: "ready",
      competitors: [],
    };
  }

  if (demo === "none") {
    return {
      ...FIXTURE_COMPETITORS_RESPONSE,
      status: "none",
      competitors: [],
    };
  }

  if (demo === "generating") {
    return {
      ...FIXTURE_COMPETITORS_RESPONSE,
      status: "generating",
      competitors: [],
    };
  }

  return FIXTURE_COMPETITORS_RESPONSE;
}

async function getCompanyFinancialsFromFixtures(
  companyId: number,
  opts?: { signal?: AbortSignal; demo?: string },
): Promise<CompanyFinancialsResponseDTO> {
  const demo = getDemoParam(opts?.demo);

  let latency = 300;
  if (demo === "slow") {
    latency = 1500;
  }

  await sleep(latency, opts?.signal);

  if (demo === "error") {
    throw new IndustryApiError(
      "network_error",
      `Simulated demo error for company ${companyId} financials.`,
      { status: 500 },
    );
  }

  if (demo === "unexpected") {
    const malformed = {
      company_id: "not-a-number",
      key_metrics: null,
    };
    const parsed = CompanyFinancialsResponseSchema.safeParse(malformed);
    if (!parsed.success) {
      throw new IndustryApiError(
        "unexpected_response",
        "Unexpected financials response schema from upstream service.",
        { validationErrors: parsed.error.format() },
      );
    }
  }

  if (!FIXTURE_FINANCIALS_BY_COMPANY_ID[companyId]) {
    throw new IndustryApiError("not_found", `Financials not found for company ID ${companyId}.`, {
      status: 404,
    });
  }

  return getFixtureCompanyFinancials(companyId);
}

// ---------------------------------------------------------------------------
// Live API Implementation
// ---------------------------------------------------------------------------

async function getCompetitorsFromApi(opts?: {
  signal?: AbortSignal;
}): Promise<CompetitorsResponseDTO> {
  try {
    const raw = await api.get<unknown>("/api/v1/company/competitors", {
      signal: opts?.signal,
    });

    const parsed = CompetitorsResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw new IndustryApiError(
        "unexpected_response",
        "Backend competitors response did not match the required data contract.",
        { validationErrors: parsed.error.format() },
      );
    }

    return parsed.data;
  } catch (error: unknown) {
    if (isIndustryApiError(error)) {
      throw error;
    }

    const status = (error as { status?: number })?.status;
    const errorMessage = (error as { message?: string })?.message;
    if (status === 401) {
      throw new IndustryApiError("unauthorized", "User session expired or unauthorized.", {
        status,
        cause: error,
      });
    }
    if (status === 404) {
      throw new IndustryApiError("not_found", "Competitor records not found.", {
        status,
        cause: error,
      });
    }

    throw new IndustryApiError(
      "network_error",
      errorMessage || "Failed to fetch competitors from backend API.",
      { status, cause: error },
    );
  }
}

async function getCompanyFinancialsFromApi(
  companyId: number,
  opts?: { signal?: AbortSignal },
): Promise<CompanyFinancialsResponseDTO> {
  try {
    const raw = await api.get<unknown>(
      `/api/v1/company/competitors/${encodeURIComponent(companyId)}/financials`,
      { signal: opts?.signal },
    );

    const parsed = CompanyFinancialsResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw new IndustryApiError(
        "unexpected_response",
        `Backend financials for company ${companyId} did not match the required data contract.`,
        { validationErrors: parsed.error.format() },
      );
    }

    return parsed.data;
  } catch (error: unknown) {
    if (isIndustryApiError(error)) {
      throw error;
    }

    const status = (error as { status?: number })?.status;
    const errorMessage = (error as { message?: string })?.message;
    if (status === 401) {
      throw new IndustryApiError("unauthorized", "User session expired or unauthorized.", {
        status,
        cause: error,
      });
    }
    if (status === 404) {
      throw new IndustryApiError("not_found", `Financials not found for company ${companyId}.`, {
        status,
        cause: error,
      });
    }

    throw new IndustryApiError(
      "network_error",
      errorMessage || `Failed to fetch financials for company ${companyId}.`,
      { status, cause: error },
    );
  }
}

// ---------------------------------------------------------------------------
// Canonical Exported API Functions
// ---------------------------------------------------------------------------

/**
 * Fetches the tenant's competitor list.
 * Respects VITE_INDUSTRY_DATA_SOURCE ("fixtures" | "api").
 */
export async function getCompetitors(opts?: {
  signal?: AbortSignal;
  demo?: string;
}): Promise<CompetitorsResponseDTO> {
  const source = getIndustryDataSource();
  if (source === "api") {
    return getCompetitorsFromApi(opts);
  }
  return getCompetitorsFromFixtures(opts);
}

/**
 * Fetches per-company financials.
 * Respects VITE_INDUSTRY_DATA_SOURCE ("fixtures" | "api").
 */
export async function getCompanyFinancials(
  companyId: number,
  opts?: { signal?: AbortSignal; demo?: string },
): Promise<CompanyFinancialsResponseDTO> {
  const source = getIndustryDataSource();
  if (source === "api") {
    return getCompanyFinancialsFromApi(companyId, opts);
  }
  return getCompanyFinancialsFromFixtures(companyId, opts);
}
