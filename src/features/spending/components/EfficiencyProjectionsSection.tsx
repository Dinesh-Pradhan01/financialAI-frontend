import { formatINR } from "@/shared/lib/format";
import type { EfficiencyProjectionsResponse } from "../types/intelligence";
import { cn } from "@/shared/lib/utils";
import { Gauge, TrendingUp } from "lucide-react";

interface EfficiencyProjectionsSectionProps {
  data: EfficiencyProjectionsResponse;
  className?: string;
}

export function EfficiencyProjectionsSection({
  data,
  className,
}: EfficiencyProjectionsSectionProps) {
  if (!data) return null;

  const { operational_efficiency, projections } = data;

  const efficiencyMetrics = [
    {
      label: "Inflow-to-Outflow Ratio",
      value: `${operational_efficiency.inflow_to_outflow_ratio.toFixed(2)}x`,
      subtext: "Total credits / debits multiplier",
      statusLabel: operational_efficiency.inflow_to_outflow_ratio >= 1.0 ? "Net Positive" : "Deficit Burn",
      valueColor: operational_efficiency.inflow_to_outflow_ratio >= 1.0
        ? "text-emerald-700 dark:text-emerald-400"
        : "text-rose-700 dark:text-rose-400",
      badgeColor: operational_efficiency.inflow_to_outflow_ratio >= 1.0
        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
        : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    },
    {
      label: "Cost-to-Income Ratio",
      value: `${operational_efficiency.cost_to_income_ratio_pct}%`,
      subtext: "Debits consumed per credit rupee",
      statusLabel: operational_efficiency.cost_to_income_ratio_pct <= 85 ? "Optimal" : "High Burn",
      valueColor: operational_efficiency.cost_to_income_ratio_pct <= 85
        ? "text-foreground"
        : "text-amber-700 dark:text-amber-400",
      badgeColor: operational_efficiency.cost_to_income_ratio_pct <= 85
        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
        : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    },
    {
      label: "Net Cash Margin Proxy",
      value: `${operational_efficiency.net_cash_margin_proxy_pct}%`,
      subtext: "Effective free cash generation margin",
      statusLabel: operational_efficiency.net_cash_margin_proxy_pct >= 15 ? "Healthy" : "Compressed",
      valueColor: operational_efficiency.net_cash_margin_proxy_pct >= 15
        ? "text-emerald-700 dark:text-emerald-400"
        : "text-amber-700 dark:text-amber-400",
      badgeColor: operational_efficiency.net_cash_margin_proxy_pct >= 15
        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
        : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    },
  ];

  const projectionMetrics = [
    {
      label: "Annualized Inflow Run-Rate",
      value: formatINR(projections.annualized_inflow_run_rate, { compact: true }),
      fullValue: formatINR(projections.annualized_inflow_run_rate),
      subtext: "12-month revenue pacing",
      valueColor: "text-emerald-700 dark:text-emerald-400",
      badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
      badgeText: "Credits",
    },
    {
      label: "Annualized Outflow Run-Rate",
      value: formatINR(projections.annualized_outflow_run_rate, { compact: true }),
      fullValue: formatINR(projections.annualized_outflow_run_rate),
      subtext: "12-month burn pacing",
      valueColor: "text-foreground",
      badgeColor: "bg-surface-alt text-text-secondary border-border/50",
      badgeText: "Debits",
    },
    {
      label: "Projected Next Month Cash",
      value: formatINR(projections.projected_next_month_ending_balance, { compact: true }),
      fullValue: formatINR(projections.projected_next_month_ending_balance),
      subtext: "Forecasted closing balance",
      valueColor: "text-blue-700 dark:text-blue-400",
      badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
      badgeText: "Forecast",
    },
  ];

  return (
    <section className={cn("space-y-4", className)} aria-labelledby="efficiency-projections-heading">
      <div>
        <h2
          id="efficiency-projections-heading"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground text-balance"
        >
          Financial Efficiency & Run-Rate Projections
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-0.5 leading-relaxed">
          Operating margin proxies and forward annualized capital projections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* Card 1: Operational Efficiency */}
        <div className="card-spot p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
              <Gauge className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">Operational Efficiency Ratios</h3>
              <p className="text-xs text-text-secondary">Conversion and margin metrics</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {efficiencyMetrics.map((m) => (
              <div
                key={m.label}
                className="bg-surface-alt/60 p-3.5 sm:p-4 rounded-xl border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 hover:bg-surface-alt transition-colors min-w-0"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-foreground tracking-tight">
                      {m.label}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-mono font-semibold px-2 py-0.5 rounded border shrink-0",
                        m.badgeColor,
                      )}
                    >
                      {m.statusLabel}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5 leading-normal">
                    {m.subtext}
                  </p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-num text-lg sm:text-xl font-bold tabular-nums tracking-tight", m.valueColor)}>
                    {m.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Annualized Projections */}
        <div className="card-spot p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">Annualized Run-Rate Projections</h3>
              <p className="text-xs text-text-secondary">Extrapolated forward trajectory</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {projectionMetrics.map((p) => (
              <div
                key={p.label}
                className="bg-surface-alt/60 p-3.5 sm:p-4 rounded-xl border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 hover:bg-surface-alt transition-colors min-w-0"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-semibold text-foreground tracking-tight">
                      {p.label}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-mono font-semibold px-2 py-0.5 rounded border shrink-0",
                        p.badgeColor,
                      )}
                    >
                      {p.badgeText}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5 leading-normal">
                    {p.subtext}
                  </p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-num text-lg sm:text-xl font-bold tabular-nums tracking-tight", p.valueColor)}>
                    {p.value}
                  </span>
                  {p.fullValue && p.fullValue !== p.value && (
                    <span className="text-[11px] font-mono text-text-secondary block mt-0.5">
                      {p.fullValue}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
