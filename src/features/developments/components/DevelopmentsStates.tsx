import React from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Clock, FileQuestion, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { isDevelopmentsError } from "../types/developments";

interface DevelopmentsNeedsCompanyProps {
  className?: string;
}

export const DevelopmentsNeedsCompanyState: React.FC<DevelopmentsNeedsCompanyProps> = ({
  className,
}) => {
  return (
    <div
      role="region"
      aria-label="Profile setup required"
      className={`rounded-2xl border border-brand/20 bg-linear-to-b from-brand/5 to-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs ${className ?? ""}`}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20">
        <Sparkles className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Complete your company profile to see developments.
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          SpotLite scans live public news and signals to identify market opportunities and
          regulatory developments tailored specifically to your business.
        </p>
      </div>

      <div className="pt-2">
        <Button asChild className="gap-2 cursor-pointer font-semibold shadow-xs">
          <Link to="/onboarding">
            <span>Complete Business Setup</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

interface DevelopmentsEmptyStateProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const DevelopmentsEmptyState: React.FC<DevelopmentsEmptyStateProps> = ({
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div
      role="region"
      aria-label="No developments found"
      className="rounded-2xl border border-border/80 bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary border border-border/60">
        <FileQuestion className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
          No relevant developments found in the last 30 days.
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          This can also happen when sources are temporarily unavailable.
        </p>
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="gap-2 cursor-pointer text-xs font-semibold"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          <span>Refresh developments</span>
        </Button>
      </div>
    </div>
  );
};

interface DevelopmentsErrorStateProps {
  error: unknown;
  onRetry: () => void;
  isRetrying?: boolean;
}

export const DevelopmentsErrorState: React.FC<DevelopmentsErrorStateProps> = ({
  error,
  onRetry,
  isRetrying = false,
}) => {
  const kind = isDevelopmentsError(error) ? error.kind : "unknown";

  let title = "We couldn't load developments right now.";
  let description =
    "We encountered an unexpected issue while retrieving recent public developments. Please try again.";
  let Icon = AlertCircle;

  if (kind === "timeout") {
    title = "This is taking longer than expected.";
    description =
      "The upstream search took longer than usual to retrieve and rank developments. Please try again.";
    Icon = Clock;
  } else if (kind === "not_found") {
    title = "We couldn't find your company profile.";
    description =
      "We were unable to locate your company profile in our intelligence database. Please check your setup.";
    Icon = AlertCircle;
  }

  return (
    <div
      role="alert"
      className="rounded-2xl border border-border/80 bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          disabled={isRetrying}
          className="gap-2 cursor-pointer text-xs font-semibold"
        >
          <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} aria-hidden="true" />
          <span>Try again</span>
        </Button>
      </div>
    </div>
  );
};
