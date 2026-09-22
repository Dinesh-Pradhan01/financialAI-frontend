import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatINR } from "@/shared/lib/format";
import type { TemporalPatternsResponse } from "../types/intelligence";
import { ArrowDown, CalendarDays, Clock, Activity } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useReducedMotion } from "framer-motion";

interface TemporalPatternsSectionProps {
  data: TemporalPatternsResponse;
  className?: string;
}

export function TemporalPatternsSection({
  data,
  className,
}: TemporalPatternsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!data) return null;

  const {
    day_of_month_distribution = [],
    month_end_liquidity_dips = [],
    day_of_week_spend = [],
  } = data;

  const maxWeekdaySpend = Math.max(
    ...day_of_week_spend.map((d) => d.spend_volume),
    1,
  );

  return (
    <section className={cn("space-y-4", className)} aria-labelledby="temporal-patterns-heading">
      <div>
        <h2
          id="temporal-patterns-heading"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground text-balance"
        >
          Time-Based & Temporal Spend Cyclicality
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-0.5 leading-relaxed">
          Intra-month velocity, payroll liquidity dips, and day-of-week expense concentrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* Sub-Visual 1: Day of Month Inflow vs Outflow Distribution */}
        <div className="card-spot p-5 rounded-2xl flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground tracking-tight">Day-of-Month Phasing</h3>
              </div>
              <span className="text-[11px] font-mono text-text-secondary">In vs Out</span>
            </div>
            <p className="text-xs text-text-secondary mb-3 leading-normal">
              Cumulative cash velocity grouped across calendar day brackets.
            </p>

            <div className="h-48 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={day_of_month_distribution}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis
                    dataKey="day_range"
                    tick={{ fontSize: 9, fill: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
                    tickLine={false}
                    axisLine={{ stroke: "var(--border)" }}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => formatINR(v, { compact: true })}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const item = day_of_month_distribution.find((d) => d.day_range === label);
                      return (
                        <div className="rounded-xl border border-border bg-surface p-3 shadow-e2 text-xs font-mono tabular-nums">
                          <p className="font-bold text-foreground mb-1 font-sans">{label}</p>
                          <p className="text-emerald-600 dark:text-emerald-400 font-medium">In: {formatINR(payload[0]?.value as number)}</p>
                          <p className="text-rose-600 dark:text-rose-400 font-medium">Out: {formatINR(payload[1]?.value as number)}</p>
                          {item?.dominant_activity && (
                            <p className="text-text-secondary mt-1 text-[11px] border-t border-border/40 pt-1 font-sans leading-tight">
                              {item.dominant_activity}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="cumulative_inflows"
                    name="Inflows"
                    fill="#10B981"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={!shouldReduceMotion}
                    animationDuration={500}
                    animationEasing="ease-out"
                  />
                  <Bar
                    dataKey="cumulative_outflows"
                    name="Outflows"
                    fill="#F43F5E"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={!shouldReduceMotion}
                    animationDuration={500}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-text-secondary pt-3 mt-2 border-t border-border/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" /> Inflows
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#F43F5E]" /> Outflows
            </span>
          </div>
        </div>

        {/* Sub-Visual 2: Month-End Liquidity Dips (List, NOT a chart) */}
        <div className="card-spot p-5 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground tracking-tight">Month-End Liquidity Dips</h3>
              </div>
              <span className="text-[11px] font-mono text-text-secondary">Disbursements</span>
            </div>
            <p className="text-xs text-text-secondary mb-3 leading-normal">
              Account balance compression on final disbursement days.
            </p>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 flex-1">
              {month_end_liquidity_dips.length === 0 ? (
                <p className="text-xs text-text-secondary text-center py-6">No liquidity dips recorded.</p>
              ) : (
                month_end_liquidity_dips.map((dip, idx) => (
                  <div
                    key={`${dip.month}-${idx}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-alt/60 border border-border/50 text-xs hover:bg-surface-alt transition-colors duration-150"
                  >
                    <div>
                      <span className="font-semibold text-foreground font-mono text-xs sm:text-sm">{dip.month}</span>
                      <span className="text-[11px] font-mono text-text-secondary ml-1.5 font-medium">
                        ({dip.disbursement_day})
                      </span>
                      <p className="text-xs font-mono mt-0.5 tabular-nums text-text-secondary">
                        <span>{formatINR(dip.pre_payout_balance, { compact: true })}</span>
                        <span className="mx-1 text-text-secondary/60">→</span>
                        <span className="font-semibold text-foreground">{formatINR(dip.post_payout_balance, { compact: true })}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-0.5 font-num font-bold text-rose-700 dark:text-rose-400 text-xs bg-rose-500/10 px-2 py-1 rounded-md border border-rose-500/20 tabular-nums">
                        <ArrowDown className="h-3 w-3" />
                        {formatINR(dip.instant_liquidity_dip, { compact: true })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <p className="text-[11px] text-text-secondary font-mono text-center pt-3 mt-2 border-t border-border/50">
            Instant liquidity draw on month-end close
          </p>
        </div>

        {/* Sub-Visual 3: Day-of-Week Spend Cyclicality */}
        <div className="card-spot p-5 rounded-2xl flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground tracking-tight">Day-of-Week Cyclicality</h3>
              </div>
              <span className="text-[11px] font-mono text-text-secondary">Mon – Sun</span>
            </div>
            <p className="text-xs text-text-secondary mb-3 leading-normal">
              Distribution of debit volume by weekday.
            </p>

            <div className="h-48 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={day_of_week_spend}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis
                    dataKey="day_of_week"
                    tick={{ fontSize: 9, fill: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
                    tickLine={false}
                    axisLine={{ stroke: "var(--border)" }}
                    tickFormatter={(d) => d.slice(0, 3)}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => formatINR(v, { compact: true })}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const day = day_of_week_spend.find((d) => d.day_of_week === label);
                      return (
                        <div className="rounded-xl border border-border bg-surface p-2.5 shadow-e2 text-xs font-mono tabular-nums">
                          <p className="font-bold text-foreground font-sans">{label}</p>
                          <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">
                            {formatINR(payload[0]?.value as number)}
                          </p>
                          <p className="text-text-secondary text-[11px] font-sans">
                            {day?.outflow_share_pct}% of total outflows
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="spend_volume"
                    name="Spend Volume"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={!shouldReduceMotion}
                    animationDuration={500}
                    animationEasing="ease-out"
                  >
                    {day_of_week_spend.map((entry) => (
                      <Cell
                        key={entry.day_of_week}
                        fill={entry.spend_volume === maxWeekdaySpend ? "#4F46E5" : "#818CF8"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-[11px] text-text-secondary font-mono text-center pt-3 mt-2 border-t border-border/50">
            Peak activity days for scheduled vendor transfers
          </p>
        </div>
      </div>
    </section>
  );
}
