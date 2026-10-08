import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Info, RefreshCw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useDevelopments } from "../hooks/useDevelopments";
import {
  EXPLAINER_TEXT,
  RELEVANCE_LEGEND,
  formatLastUpdated,
} from "../lib/developmentsPresentation";
import { DevelopmentRow } from "./DevelopmentRow";
import { DevelopmentsSkeleton } from "./DevelopmentsSkeleton";
import {
  DevelopmentsEmptyState,
  DevelopmentsErrorState,
  DevelopmentsNeedsCompanyState,
} from "./DevelopmentsStates";

/**
 * Developments intelligence page.
 * Displays ranked public market developments and AI business implications.
 */
export const DevelopmentsPage: React.FC = () => {
  const { data, isLoading, isFetching, isError, error, refetch, needsCompany } = useDevelopments();

  const shouldReduceMotion = useReducedMotion();

  // ---------------------------------------------------------------------------
  // Motion Stagger Variants
  // ---------------------------------------------------------------------------

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // ---------------------------------------------------------------------------
  // Derived Header Strings
  // ---------------------------------------------------------------------------

  const companyName = data?.companyName?.trim();
  const subtitle = companyName
    ? `Recent public developments relevant to ${companyName}`
    : "Recent public developments";

  const sourcesList = data?.sources?.length ? `Source: ${data.sources.join(", ")}` : null;

  const lastUpdated = formatLastUpdated(data?.retrievedAt);

  // ---------------------------------------------------------------------------
  // View Rendering
  // ---------------------------------------------------------------------------

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 p-4 md:p-6 pb-24">
      {/* 1. Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-3">
            <h1
              id="developments-heading"
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground"
            >
              Developments
            </h1>
            {isFetching && data && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-xs font-medium text-brand animate-pulse">
                <RefreshCw className="h-3 w-3 animate-spin" aria-hidden="true" />
                <span>Refreshing…</span>
              </span>
            )}
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">{subtitle}</p>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-text-tertiary pt-0.5">
            <span>Last 30 days · up to 10 items</span>
            {sourcesList && (
              <>
                <span className="select-none text-border-c" aria-hidden="true">
                  ·
                </span>
                <span>{sourcesList}</span>
              </>
            )}
            {lastUpdated && (
              <>
                <span className="select-none text-border-c" aria-hidden="true">
                  ·
                </span>
                <span title={lastUpdated.absolute} className="cursor-default">
                  {lastUpdated.relative}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Refresh Action Button */}
        <div className="flex items-center gap-2 self-start">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Refresh developments"
            className="gap-2 cursor-pointer text-xs font-semibold shrink-0"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            <span>Refresh</span>
          </Button>
        </div>
      </header>

      {/* 2. Degraded Source Notice (Wired for future backend extensibility) */}
      {data?.degraded && (
        <div
          role="status"
          className="rounded-xl border border-severity-moderate/30 bg-severity-moderate/10 px-4 py-3 text-xs text-text-primary flex items-center gap-2"
        >
          <Info className="h-4 w-4 text-severity-moderate shrink-0" aria-hidden="true" />
          <span>Some sources were unavailable, so these results may be incomplete.</span>
        </div>
      )}

      {/* 3. Content States */}
      {needsCompany ? (
        <DevelopmentsNeedsCompanyState />
      ) : isLoading && !data ? (
        <DevelopmentsSkeleton />
      ) : isError && !data ? (
        <DevelopmentsErrorState error={error} onRetry={() => refetch()} isRetrying={isFetching} />
      ) : data && data.items.length === 0 ? (
        <DevelopmentsEmptyState onRefresh={() => refetch()} isRefreshing={isFetching} />
      ) : data && data.items.length > 0 ? (
        <section aria-labelledby="developments-heading" className="space-y-4">
          {/* Column Header Row (Desktop only) */}
          <div className="hidden md:grid md:grid-cols-5 gap-4 md:gap-6 pb-2.5 border-b border-border/80 text-xs font-bold uppercase tracking-wider text-text-tertiary select-none">
            <div className="md:col-span-3">Development</div>
            <div className="md:col-span-2">Implication</div>
          </div>

          {/* Developments List */}
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-border/60"
          >
            {data.items.map((item) => (
              <motion.div key={item.key} variants={itemVariants}>
                <DevelopmentRow item={item} />
              </motion.div>
            ))}
          </motion.ul>

          {/* Footnote & Legend */}
          <footer className="rounded-2xl border border-border/60 bg-surface-alt/30 p-5 space-y-3.5 text-xs text-text-secondary mt-10">
            <div className="flex items-start gap-2.5">
              <Info className="h-4 w-4 text-text-tertiary shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed text-text-secondary">{EXPLAINER_TEXT}</p>
            </div>

            <div className="border-t border-border/40 pt-3 flex flex-wrap gap-x-6 gap-y-2">
              {RELEVANCE_LEGEND.map((legend) => (
                <div key={legend.relevance} className="flex items-center gap-1.5 text-xs">
                  <span className="font-semibold text-text-primary">{legend.label}:</span>
                  <span className="text-text-secondary">{legend.description}</span>
                </div>
              ))}
            </div>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
