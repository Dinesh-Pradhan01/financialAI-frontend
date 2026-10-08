import React from "react";
import {
  AlertCircle,
  Clock,
  FileQuestion,
  Loader2,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface StateProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
}

/**
 * State A: status === "ready" with empty competitors array
 * Distinct copy per Addition A: "No competitors have been identified for your company yet."
 */
export const IndustryEmptyState: React.FC<StateProps> = ({
  onRefresh,
  isRefreshing = false,
  className,
}) => {
  return (
    <div
      role="region"
      aria-label="No competitors identified"
      className={`rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary border border-border-c/60">
        <Users className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary">
          No competitors have been identified for your company yet.
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          We could not find any close peer companies matching your industry category and scale at
          this time.
        </p>
      </div>

      {onRefresh && (
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin motion-reduce:animate-none" : ""}`}
              aria-hidden="true"
            />
            <span>Check again</span>
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * State B: status === "none"
 * Distinct copy per Addition A: "Competitor analysis hasn't been generated for your company yet."
 */
export const IndustryNoneState: React.FC<StateProps> = ({
  onRefresh,
  isRefreshing = false,
  className,
}) => {
  return (
    <div
      role="region"
      aria-label="Competitor analysis not generated"
      className={`rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
        <Clock className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary">
          Competitor analysis hasn't been generated for your company yet.
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          Automated peer discovery runs periodically. Check back shortly once the engine processes
          your company profile.
        </p>
      </div>

      {onRefresh && (
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin motion-reduce:animate-none" : ""}`}
              aria-hidden="true"
            />
            <span>Refresh status</span>
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * State C: status === "generating"
 * Prompt copy: "We're analysing competitors for your company."
 */
export const IndustryGeneratingState: React.FC<StateProps> = ({
  onRefresh,
  isRefreshing = false,
  className,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Generating competitor analysis"
      className={`rounded-2xl border border-brand-primary/20 bg-linear-to-b from-brand-primary/5 to-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
        <Loader2
          className="h-7 w-7 animate-spin motion-reduce:animate-none text-brand-primary"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary">
          We're analysing competitors for your company.
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          Our intelligence pipeline is identifying and ranking peers based on product catalog and
          market overlap. This usually takes less than a minute.
        </p>
      </div>

      {onRefresh && (
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin motion-reduce:animate-none" : ""}`}
              aria-hidden="true"
            />
            <span>Check progress</span>
          </Button>
        </div>
      )}
    </div>
  );
};

interface IndustryErrorStateProps {
  error: unknown;
  onRetry: () => void;
  isRetrying?: boolean;
  className?: string;
}

/**
 * State D: Error state
 */
export const IndustryErrorState: React.FC<IndustryErrorStateProps> = ({
  error,
  onRetry,
  isRetrying = false,
  className,
}) => {
  const errorMessage =
    error instanceof Error ? error.message : "An unexpected network or service error occurred.";

  return (
    <div
      role="alert"
      className={`rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
        <AlertCircle className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary">
          We couldn't load competitor analysis right now.
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          {errorMessage}
        </p>
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          disabled={isRetrying}
          className="gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRetrying ? "animate-spin motion-reduce:animate-none" : ""}`}
            aria-hidden="true"
          />
          <span>Try again</span>
        </Button>
      </div>
    </div>
  );
};

interface NotFoundStateProps {
  companyId?: number | string;
  className?: string;
}

/**
 * State E: Unknown company ID or 404
 * Requirement: NotFound state with a back link (do not fall through to a blank page).
 */
export const IndustryNotFoundState: React.FC<NotFoundStateProps> = ({ companyId, className }) => {
  return (
    <div
      role="region"
      aria-label="Company not found"
      className={`rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary border border-border-c/60">
        <FileQuestion className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary">
          Company Not Found
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          {companyId
            ? `The company with ID ${companyId} was not found in your competitor intelligence list.`
            : "The requested company does not exist in your competitor intelligence list."}
        </p>
      </div>

      <div className="pt-2">
        <Button
          asChild
          variant="outline"
          className="gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          <a href="/industry">
            <span>Back to Industry View</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

interface FinancialsUnavailableProps {
  companyName?: string | null;
  reasonDisplay?: string | null;
  className?: string;
}

/**
 * State F: Financials Unavailable state (financial_status: "unavailable")
 * E.g. Allied Digital (900001): reason-code copy, no cards or table.
 */
export const IndustryFinancialsUnavailableState: React.FC<FinancialsUnavailableProps> = ({
  companyName,
  reasonDisplay,
  className,
}) => {
  const fallbackReason = "Financial statements are currently not loaded for this entity.";
  const displayCopy = reasonDisplay || fallbackReason;

  return (
    <div
      role="region"
      aria-label="Financials unavailable"
      className={`rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary border border-border-c/60">
        <AlertCircle className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary">
          Financials Unavailable
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          {companyName ? `${companyName}: ` : ""}
          {displayCopy}
        </p>
      </div>

      <div className="pt-2">
        <Button
          asChild
          variant="outline"
          className="gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          <a href="/industry">
            <span>Back to Industry View</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

interface AnnualUnavailablePanelProps {
  reasonDisplay?: string | null;
  className?: string;
}

/**
 * State G: Explanatory panel when Annual tab is unavailable (e.g. Black Box: gap_in_quarters).
 */
export const AnnualUnavailablePanel: React.FC<AnnualUnavailablePanelProps> = ({
  reasonDisplay,
  className,
}) => {
  const message =
    reasonDisplay ||
    "Insufficient consecutive quarterly records to compute reliable annual roll-ups.";

  return (
    <div
      role="region"
      aria-label="Annual financials unavailable"
      className={`rounded-xl border border-border-c bg-surface-alt/40 p-6 sm:p-8 text-center max-w-lg mx-auto space-y-3 ${className ?? ""}`}
    >
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-text-tertiary border border-border-c">
        <Clock className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-display text-base font-semibold text-text-primary">
        Annual Figures Unavailable
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{message}</p>
    </div>
  );
};

/**
 * State H: Skeleton for CompanyFinancialsPage
 */
export const CompanyFinancialsSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading company financials"
      className="space-y-7"
    >
      {/* Back Link Skeleton */}
      <div className="h-4 w-28 bg-surface-alt animate-pulse motion-reduce:animate-none rounded" />

      {/* Header Skeleton */}
      <div className="space-y-3 border-b border-border-c pb-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-8 w-64 sm:w-80 bg-surface-alt animate-pulse motion-reduce:animate-none rounded-lg" />
          <div className="h-6 w-28 bg-surface-alt animate-pulse motion-reduce:animate-none rounded-full" />
        </div>
        <div className="h-4 w-96 max-w-full bg-surface-alt animate-pulse motion-reduce:animate-none rounded" />
      </div>

      {/* 4 Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border-c bg-surface p-4 sm:p-5 space-y-2.5"
          >
            <div className="h-3.5 w-24 bg-surface-alt animate-pulse motion-reduce:animate-none rounded" />
            <div className="h-7 w-32 bg-surface-alt animate-pulse motion-reduce:animate-none rounded" />
            <div className="h-3 w-40 bg-surface-alt animate-pulse motion-reduce:animate-none rounded" />
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="h-9 w-64 bg-surface-alt animate-pulse motion-reduce:animate-none rounded-lg" />

      {/* Table Skeleton */}
      <div className="rounded-xl border border-border-c bg-surface h-72 animate-pulse motion-reduce:animate-none" />
    </div>
  );
};
