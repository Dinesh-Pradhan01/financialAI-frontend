/**
 * Backend API Contract & View-Model Types for the Developments Domain
 *
 * Real backend contract verified via live re-audit of GET /api/v1/developments/{company_id}.
 * Raw response object (NOT wrapped in {success, data}).
 */

// ---------------------------------------------------------------------------
// Backend DTO Types
// ---------------------------------------------------------------------------

export interface DevelopmentCompanyDTO {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  business_category: string | null;
}

export interface DevelopmentItemDTO {
  /** Article title. May end with " - {source_name}" and may contain HTML entities. */
  title: string;
  /** Article summary from upstream. Currently duplicate of title in live backend. */
  summary: string | null;
  /** Duplicate of summary in live backend; ignored in v1. */
  what_happened: string | null;
  /** Actionable business implication. Render exactly as provided. */
  implication: string | null;
  /** Publisher or feed source name. */
  source_name: string;
  /** Google News redirect URL or direct article URL. */
  source_url: string | null;
  /** ISO 8601 UTC timestamp. */
  published_at: string | null;
  /** Relevance to the target company (NOT priority). */
  relevance: "high" | "medium" | "low" | null;
  /** Relevance score 0..1 computed by backend TF/IDF ranking. */
  relevance_score: number;
  /** City extracted by backend rules (~70-80% null). */
  city: string | null;
  /** State extracted by backend rules (~70-80% null). */
  state: string | null;

  // Ignored in v1 per contract specification
  category?: string | null;
  development_type?: string;
  event_type?: string;
  opportunity_type?: string;
  opportunity_relevance?: string;
  business_opportunity_score?: number;
  location?: { city?: string | null; state?: string | null } | null;
  source?: { name?: string | null; url?: string | null } | null;

  // Optional fields for future backend extensibility (not sent by backend yet)
  id?: string;
  closing_date?: string | null;
  status?: string | null;
}

export interface DevelopmentResponseDTO {
  company: DevelopmentCompanyDTO;
  /** Not rendered in frontend v1 */
  company_context: Record<string, unknown> | null;
  /** ISO 8601 UTC timestamp of retrieval */
  retrieved_at: string;
  /** Upstream feed sources used, e.g. ["Google News RSS"] */
  sources: string[];
  /** Retrieved and ranked development items */
  items: DevelopmentItemDTO[];
  /** Future backend extensibility flag (not sent by backend yet) */
  degraded?: boolean;
}

// ---------------------------------------------------------------------------
// View-Model Types
// ---------------------------------------------------------------------------

export type DevelopmentRelevance = "high" | "medium" | "low";

export type DevelopmentStatus = "active" | "closing_soon" | "expired";

export interface DevelopmentViewModel {
  key: string;
  title: string;
  detail: string | null;
  implication: string | null;
  sourceName: string;
  sourceUrl: string | null;
  publishedAt: string | null;
  relevance: DevelopmentRelevance | null;
  relevanceScore: number;
  location: string | null;
  closingDate: string | null;
  status: DevelopmentStatus | null;
}

export interface DevelopmentsViewModel {
  companyName: string;
  retrievedAt: string;
  sources: string[];
  degraded: boolean;
  items: DevelopmentViewModel[];
}

export interface DevelopmentQueryParams {
  days: number;
  limit: number;
}

// ---------------------------------------------------------------------------
// Error Classification Types
// ---------------------------------------------------------------------------

export type DevelopmentErrorKind = "timeout" | "not_found" | "invalid" | "upstream" | "unknown";

export class DevelopmentsError extends Error {
  readonly kind: DevelopmentErrorKind;
  readonly status?: number;

  constructor(
    kind: DevelopmentErrorKind,
    message: string,
    options?: { status?: number; cause?: unknown },
  ) {
    super(message);
    this.name = "DevelopmentsError";
    this.kind = kind;
    this.status = options?.status;
    if (options?.cause !== undefined) {
      this.cause = options.cause;
    }
    Object.setPrototypeOf(this, DevelopmentsError.prototype);
  }
}

export function isDevelopmentsError(error: unknown): error is DevelopmentsError {
  if (error instanceof DevelopmentsError) {
    return true;
  }
  return (
    typeof error === "object" &&
    error !== null &&
    "kind" in error &&
    typeof (error as { kind: unknown }).kind === "string" &&
    ["timeout", "not_found", "invalid", "upstream", "unknown"].includes(
      (error as { kind: string }).kind,
    )
  );
}
