import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Database, RefreshCw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCompetitors } from "../hooks/useCompetitors";
import { AnchorSummary } from "./AnchorSummary";
import { CompetitorTable } from "./CompetitorTable";
import { IndustrySkeleton } from "./IndustrySkeleton";
import {
  IndustryEmptyState,
  IndustryGeneratingState,
  IndustryNoneState,
  IndustryErrorState,
} from "./IndustryStates";

/**
 * IndustryPage
 *
 * Primary list page for Industry View (/industry).
 * Presents the anchor company context and its ranked peer competitors.
 *
 * Features:
 * - h1 "Industry View"
 * - Subtitle "Competitors and peers for {anchor.company_name}"
 * - "Demo data" badge displayed when source is fixtures mode
 * - Slim AnchorSummary context bar with zero numbers
 * - Semantic, accessible CompetitorTable sorted by overlap rank
 * - Distinct handling of status: "ready" (with empty array), "none", "generating", "error"
 */
export const IndustryPage: React.FC = () => {
  const { data, isLoading, isFetching, isError, error, refetch } = useCompetitors();
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.25,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Header copy
  const anchorName = data?.anchor?.companyName?.trim();
  const subtitle = anchorName ? `Competitors and peers for ${anchorName}` : "Competitors and peers";

  // Check if fixtures mode is active
  const isFixture = data?.isFixture ?? false;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24">
      {/* 1. Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border-c pb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1
              id="industry-heading"
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary"
            >
              Industry View
            </h1>

            {/* "Demo data" badge (verified per Addition D) */}
            {isFixture && (
              <span
                data-testid="demo-data-badge"
                className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt border border-border-c px-2.5 py-0.5 text-xs font-semibold text-text-secondary select-none shadow-2xs"
                title="Rendering local contract fixtures (VITE_INDUSTRY_DATA_SOURCE=fixtures)"
              >
                <Database className="h-3 w-3 text-brand-primary" aria-hidden="true" />
                <span>Demo data</span>
              </span>
            )}

            {/* Background fetching indicator */}
            {isFetching && data && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 text-xs font-medium text-brand-primary animate-pulse motion-reduce:animate-none">
                <RefreshCw
                  className="h-3 w-3 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <span>Refreshing…</span>
              </span>
            )}
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">{subtitle}</p>
        </div>

        {/* Header Action: Refresh */}
        <div className="flex items-center gap-2 self-start shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Refresh competitor analysis"
            className="gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isFetching ? "animate-spin motion-reduce:animate-none" : ""}`}
              aria-hidden="true"
            />
            <span>Refresh</span>
          </Button>
        </div>
      </header>

      {/* 2. Content Routing based on state */}
      {isLoading && !data ? (
        <IndustrySkeleton />
      ) : isError && !data ? (
        <IndustryErrorState error={error} onRetry={() => refetch()} isRetrying={isFetching} />
      ) : data ? (
        <motion.div variants={fadeInVariants} initial="hidden" animate="show" className="space-y-6">
          {/* Always show Anchor context summary if present */}
          {data.anchor && <AnchorSummary anchor={data.anchor} />}

          {/* Body Content based on status & competitor count */}
          {data.status === "generating" ? (
            <IndustryGeneratingState onRefresh={() => refetch()} isRefreshing={isFetching} />
          ) : data.status === "none" ? (
            <IndustryNoneState onRefresh={() => refetch()} isRefreshing={isFetching} />
          ) : data.status === "ready" && data.competitors.length === 0 ? (
            <IndustryEmptyState onRefresh={() => refetch()} isRefreshing={isFetching} />
          ) : (
            <section aria-labelledby="industry-heading">
              <CompetitorTable competitors={data.competitors} generatedAt={data.generatedAt} />
            </section>
          )}
        </motion.div>
      ) : null}
    </div>
  );
};
