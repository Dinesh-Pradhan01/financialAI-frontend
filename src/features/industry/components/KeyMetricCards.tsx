import React from "react";
import { cn } from "@/shared/lib/utils";
import type { CompanyFinancialsViewModel, MetricCardViewModel } from "../types/industry";
import { EM_DASH } from "../presentation/industryPresentation";

interface KeyMetricCardsProps {
  metrics: CompanyFinancialsViewModel["keyMetrics"];
  className?: string;
}

/**
 * Returns formatted display value and accessible caption for a key metric card.
 *
 * Rules:
 * - If value is null: shows em dash ("—") and caption "Not available".
 * - Never shows 0 for unknown.
 * - Formatted with currency (INR crore) or percentage.
 * - Plain English basis captions (e.g. "Last four quarters, rolled up").
 */
function getMetricDisplay(metric: MetricCardViewModel): {
  displayValue: string;
  caption: string;
} {
  if (metric.numericValue === null || Number.isNaN(metric.numericValue)) {
    return {
      displayValue: EM_DASH,
      caption: "Not available",
    };
  }

  // Value formatting
  let displayValue: string;
  if (metric.isPercentage) {
    displayValue = metric.formattedValue; // e.g. "92.40%"
  } else {
    displayValue = `₹${metric.formattedValue} Cr.`; // e.g. "₹1,151.84 Cr."
  }

  // Plain-words basis and period caption
  let caption: string;
  if (metric.id === "ttm_revenue") {
    if (metric.basis === "rolled_up" || metric.basis === "rolled_up_4q") {
      caption = "Last four quarters, rolled up";
    } else if (metric.basis === "reported") {
      caption = metric.periodLabel ? `${metric.periodLabel} (Reported)` : "Audited reported";
    } else {
      caption = metric.periodLabel ?? "Trailing Twelve Months";
    }
  } else if (metric.id === "latest_quarter_revenue") {
    caption = metric.periodLabel ? `${metric.periodLabel} (Reported)` : "Latest reported quarter";
  } else if (metric.id === "expenditure_to_revenue_pct") {
    caption = metric.periodLabel
      ? `${metric.periodLabel} · Operating efficiency`
      : "Operating efficiency ratio";
  } else if (metric.id === "net_profit_margin_pct") {
    caption = metric.periodLabel
      ? `${metric.periodLabel} · Net profit margin`
      : "Net profit margin";
  } else {
    caption = metric.periodLabel ?? "";
  }

  return { displayValue, caption };
}

/**
 * KeyMetricCards
 *
 * Renders the 4 key institutional financial metric cards:
 * 1. TTM Revenue
 * 2. Latest Quarter Revenue
 * 3. Expenditure / Revenue
 * 4. Net Profit Margin
 */
import { BarChart3, Clock, PieChart, TrendingUp, type LucideIcon } from "lucide-react";

const METRIC_ICONS: Record<string, LucideIcon> = {
  ttm_revenue: BarChart3,
  latest_quarter_revenue: Clock,
  expenditure_to_revenue_pct: PieChart,
  net_profit_margin_pct: TrendingUp,
};

export const KeyMetricCards: React.FC<KeyMetricCardsProps> = React.memo(function KeyMetricCards({
  metrics,
  className,
}) {
  const cards: MetricCardViewModel[] = [
    metrics.ttmRevenue,
    metrics.latestQuarterRevenue,
    metrics.expenditureToRevenue,
    metrics.netProfitMargin,
  ];

  return (
    <section aria-labelledby="key-metrics-heading" className={cn("space-y-3", className)}>
      <h2
        id="key-metrics-heading"
        className="text-xs font-semibold uppercase tracking-wider text-text-tertiary"
      >
        Key Financial Metrics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const { displayValue, caption } = getMetricDisplay(card);
          const Icon = METRIC_ICONS[card.id] ?? BarChart3;

          return (
            <div
              key={card.id}
              className="min-w-0 rounded-xl border border-border-c bg-surface p-4 sm:p-5 shadow-2xs space-y-2 hover:shadow-xs hover:border-border-c/80 transition-all duration-200 ease-out motion-reduce:transition-none"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary truncate">
                  {card.label}
                </span>
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-alt border border-border-c/60 text-text-tertiary"
                  aria-hidden="true"
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                {displayValue}
              </div>

              <p className="text-xs text-text-secondary leading-normal">{caption}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
});
