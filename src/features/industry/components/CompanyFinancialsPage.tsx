import React, { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Database, RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { useCompanyFinancials } from "../hooks/useCompanyFinancials";
import { useCompetitors } from "../hooks/useCompetitors";
import { OverlapBadge } from "./OverlapBadge";
import { KeyMetricCards } from "./KeyMetricCards";
import { AnchorBenchmarkStrip } from "./AnchorBenchmarkStrip";
import { PeriodTabs, type FinancialsViewTab } from "./PeriodTabs";
import { FinancialsTable } from "./FinancialsTable";
import {
  CompanyFinancialsSkeleton,
  IndustryErrorState,
  IndustryNotFoundState,
  IndustryFinancialsUnavailableState,
  AnnualUnavailablePanel,
} from "./IndustryStates";

interface CompanyFinancialsPageProps {
  companyId: number;
  activeView?: FinancialsViewTab;
  onViewChange?: (view: FinancialsViewTab) => void;
  className?: string;
}

/**
 * Formats ISO date into short month and year (e.g. "Jun 2026").
 */
function formatAsOfDate(asOf?: string | null): string | null {
  if (!asOf) return null;
  try {
    const d = new Date(asOf);
    if (Number.isNaN(d.getTime())) return asOf;
    return new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric" }).format(d);
  } catch {
    return asOf;
  }
}

/**
 * CompanyFinancialsPage
 *
 * Detailed financials view for a single peer competitor (/industry/$companyId).
 *
 * Features:
 * - Breadcrumb / back link "Industry View"
 * - Focus management: focus moves to h1 on page arrival
 * - h1 with company name and ticker
 * - OverlapBadge
 * - Metadata line (latest period, as of date, source, fiscal year-end note)
 * - "Demo data" badge when source is fixtures mode
 * - 4 Key Financial Metric Cards (INR crore or %, plain-word basis, em dash for nulls, no 0s)
 * - Accessible PeriodTabs (Quarterly | Annual, URL-synced)
 * - FinancialsTable with sticky first column, positive costs, window toggle, and null footnotes
 * - Annual tab unavailable explanatory panel
 * - Financials unavailable state (e.g. Allied Digital)
 * - NotFound state for unknown IDs or 404s
 * - Heading order: h1 -> h2 (no skips)
 */
export const CompanyFinancialsPage: React.FC<CompanyFinancialsPageProps> = ({
  companyId,
  activeView = "quarterly",
  onViewChange,
  className,
}) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  // Focus management: move focus to h1 on arrival
  useEffect(() => {
    h1Ref.current?.focus();
  }, [companyId]);

  // Fetch competitors to validate existence and resolve company metadata
  const {
    data: competitorsData,
    isLoading: isCompetitorsLoading,
    isError: isCompetitorsError,
  } = useCompetitors();

  // Matched competitor in the intelligence list
  const matchedCompetitor = competitorsData?.competitors.find((c) => c.companyId === companyId);

  // Fetch financials
  const {
    data,
    isLoading: isFinancialsLoading,
    isFetching,
    isError: isFinancialsError,
    error,
    refetch,
  } = useCompanyFinancials(companyId, {
    companyName: matchedCompetitor?.companyName,
    ticker: matchedCompetitor?.ticker,
    overlapLevel: matchedCompetitor?.overlapLevel,
    overlapSummary: matchedCompetitor?.overlapSummary,
  });

  const isLoading = (isCompetitorsLoading && !competitorsData) || (isFinancialsLoading && !data);

  // Check 404 / NotFound condition
  const isNotFound =
    (!isCompetitorsLoading && competitorsData && !matchedCompetitor) ||
    (error as { status?: number; kind?: string })?.status === 404 ||
    (error as { status?: number; kind?: string })?.kind === "not_found";

  if (isNotFound) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24">
        <nav aria-label="Breadcrumb">
          <Link
            to="/industry"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Industry View</span>
          </Link>
        </nav>
        <IndustryNotFoundState companyId={companyId} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24">
        <CompanyFinancialsSkeleton />
      </div>
    );
  }

  if (isFinancialsError && !data) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24">
        <nav aria-label="Breadcrumb">
          <Link
            to="/industry"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Industry View</span>
          </Link>
        </nav>
        <IndustryErrorState error={error} onRetry={() => refetch()} isRetrying={isFetching} />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Unavailable financials state (e.g. Allied Digital)
  if (data.financialStatus === "unavailable") {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24">
        <nav aria-label="Breadcrumb">
          <Link
            to="/industry"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Industry View</span>
          </Link>
        </nav>

        {/* Company Header */}
        <header className="border-b border-border-c pb-5 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1
              ref={h1Ref}
              tabIndex={-1}
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary focus:outline-none"
            >
              {data.companyName ?? matchedCompetitor?.companyName ?? `Company #${companyId}`}
            </h1>
            {data.overlapLevel && <OverlapBadge level={data.overlapLevel} />}
          </div>
        </header>

        <IndustryFinancialsUnavailableState
          companyName={data.companyName ?? matchedCompetitor?.companyName}
          reasonDisplay={data.reasonDisplay}
        />
      </div>
    );
  }

  // Meta line formatting
  const asOfFormatted = formatAsOfDate(data.asOf);
  const metaParts: string[] = [];
  if (data.latestPeriod) metaParts.push(`Latest period ${data.latestPeriod}`);
  if (asOfFormatted) metaParts.push(`Data as of ${asOfFormatted}`);
  if (data.meta.source) metaParts.push(`Source: ${data.meta.source}`);
  if (data.meta.fiscal_year_end_assumed) metaParts.push("Fiscal year-end assumed March");

  const metaLine = metaParts.join(" · ");

  return (
    <div className={cn("w-full max-w-7xl mx-auto space-y-7 p-4 md:p-6 pb-24", className)}>
      {/* 1. Breadcrumb / Back Link */}
      <nav aria-label="Breadcrumb">
        <Link
          to="/industry"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs"
        >
          <ChevronLeft
            className="h-4 w-4 transition-transform motion-reduce:transition-none group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            aria-hidden="true"
          />
          <span>Industry View</span>
        </Link>
      </nav>

      {/* 2. Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border-c pb-5">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1
              ref={h1Ref}
              tabIndex={-1}
              className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary focus:outline-none"
            >
              {data.companyName ?? `Company #${companyId}`}
              {data.ticker && (
                <span className="ml-2 font-mono text-base sm:text-lg font-medium text-text-tertiary">
                  ({data.ticker})
                </span>
              )}
            </h1>

            {data.overlapLevel && <OverlapBadge level={data.overlapLevel} />}

            {/* "Demo data" badge when source is fixtures */}
            {data.isFixture && (
              <span
                data-testid="demo-data-badge"
                className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt border border-border-c px-2.5 py-0.5 text-xs font-semibold text-text-secondary select-none shadow-2xs"
                title="Rendering contract fixtures (VITE_INDUSTRY_DATA_SOURCE=fixtures)"
              >
                <Database className="h-3 w-3 text-brand-primary" aria-hidden="true" />
                <span>Demo data</span>
              </span>
            )}

            {isFetching && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 text-xs font-medium text-brand-primary animate-pulse motion-reduce:animate-none">
                <RefreshCw
                  className="h-3 w-3 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <span>Refreshing…</span>
              </span>
            )}
          </div>

          {/* Institutional metadata line */}
          {metaLine && <p className="text-xs text-text-secondary leading-relaxed">{metaLine}</p>}
        </div>

        {/* Refresh button */}
        <div className="self-start shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
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

      {/* 2.5 Anchor Benchmark Baseline Context */}
      <AnchorBenchmarkStrip
        anchor={competitorsData?.anchor}
        competitorName={
          data.companyName ?? matchedCompetitor?.companyName ?? `Company #${companyId}`
        }
        ticker={data.ticker ?? matchedCompetitor?.ticker}
        overlapLevel={data.overlapLevel ?? matchedCompetitor?.overlapLevel}
        overlapRank={matchedCompetitor?.overlapRank}
        totalCompetitors={competitorsData?.competitors.length}
      />

      {/* 3. Section 1: Key Financial Metric Cards */}
      <KeyMetricCards metrics={data.keyMetrics} />

      {/* 4. Section 2: Financial Statements (Quarterly & Annual Tabs) */}
      <section aria-labelledby="financial-statements-heading" className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-c pb-3">
          <h2
            id="financial-statements-heading"
            className="text-xs font-semibold uppercase tracking-wider text-text-tertiary"
          >
            Financial Statements
          </h2>

          {/* Period Tabs */}
          <PeriodTabs
            value={activeView}
            onValueChange={(newView) => {
              if (onViewChange) {
                onViewChange(newView);
              }
            }}
          />
        </div>

        {/* Tab Content Display */}
        {activeView === "quarterly" ? (
          <FinancialsTable
            periods={data.rawQuarterlyPeriods}
            isAnnual={false}
            companyName={data.companyName ?? matchedCompetitor?.companyName}
          />
        ) : /* Annual Tab */
        data.annualStatus === "unavailable" ? (
          <AnnualUnavailablePanel reasonDisplay={data.reasonDisplay} />
        ) : (
          <FinancialsTable
            periods={data.rawAnnualPeriods}
            isAnnual={true}
            companyName={data.companyName ?? matchedCompetitor?.companyName}
          />
        )}
      </section>
    </div>
  );
};
