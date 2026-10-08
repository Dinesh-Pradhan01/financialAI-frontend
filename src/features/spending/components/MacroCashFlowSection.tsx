import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatINR } from "@/shared/lib/format";
import type { MacroCashFlowResponse } from "../types/intelligence";
import { cn } from "@/shared/lib/utils";
import { useReducedMotion } from "framer-motion";

interface MacroCashFlowSectionProps {
  data: MacroCashFlowResponse;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

function CashFlowTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/80 bg-surface p-3.5 shadow-e2 text-xs">
      <p className="font-semibold text-foreground mb-2 pb-1.5 border-b border-border/50 font-mono">
        Month: {label}
      </p>
      <div className="space-y-1.5 font-num tabular-nums">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-foreground">
              {formatINR(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MacroCashFlowSection({ data, className }: MacroCashFlowSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!data) return null;

  const { monthly_cash_flow_trajectory = [], liquidity_diagnostics } = data;

  const runwayMonths = liquidity_diagnostics.cash_runway_months;
  const isHealthyRunway = runwayMonths >= 3;
  const isWarningRunway = runwayMonths < 1.5;

  const retentionPct = liquidity_diagnostics.cash_conversion_retention_pct;
  const isPositiveRetention = retentionPct > 0;

  const idleCash = liquidity_diagnostics.idle_cash_available;
  const hasIdleCash = idleCash > 0;

  const diagnostics = [
    {
      label: "Monthly Outflow Burn",
      value: formatINR(liquidity_diagnostics.avg_monthly_outflow_burn, { compact: true }),
      fullValue: formatINR(liquidity_diagnostics.avg_monthly_outflow_burn),
      subtext: "Average monthly outflow",
      valueColor: "text-foreground",
    },
    {
      label: "Cash Runway",
      value: `${runwayMonths} mo`,
      fullValue: `${runwayMonths} months`,
      subtext: isHealthyRunway ? "Strong runway" : isWarningRunway ? "Low liquidity" : "Adequate buffer",
      valueColor: isHealthyRunway
        ? "text-emerald-700 dark:text-emerald-400"
        : isWarningRunway
          ? "text-rose-700 dark:text-rose-400"
          : "text-amber-700 dark:text-amber-400",
    },
    {
      label: "Liquidity Buffer",
      value: `${liquidity_diagnostics.liquidity_buffer_ratio}x`,
      fullValue: `${liquidity_diagnostics.liquidity_buffer_ratio}x buffer`,
      subtext: "Closing bal / peak burn",
      valueColor: "text-blue-700 dark:text-blue-400",
    },
    {
      label: "3-Month Safety Reserve",
      value: formatINR(liquidity_diagnostics.safety_reserve_3_month, { compact: true }),
      fullValue: formatINR(liquidity_diagnostics.safety_reserve_3_month),
      subtext: "Target emergency buffer",
      valueColor: "text-indigo-700 dark:text-indigo-400",
    },
    {
      label: "Idle Cash Reserves",
      value: formatINR(idleCash, { compact: true }),
      fullValue: formatINR(idleCash),
      subtext: hasIdleCash ? "Deployable surplus" : "Zero surplus",
      valueColor: hasIdleCash
        ? "text-emerald-700 dark:text-emerald-400"
        : "text-text-secondary",
    },
    {
      label: "Cash Retention",
      value: `${retentionPct}%`,
      fullValue: `${retentionPct}% retention`,
      subtext: isPositiveRetention ? "Net positive capture" : "Deficit conversion",
      valueColor: isPositiveRetention
        ? "text-emerald-700 dark:text-emerald-400"
        : "text-rose-700 dark:text-rose-400",
    },
  ];

  return (
    <section className={cn("card-spot p-5 rounded-2xl space-y-6", className)} aria-labelledby="macro-cash-flow-heading">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <h2
            id="macro-cash-flow-heading"
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground text-balance"
          >
            Macro Cash Flow & Liquidity Trajectory
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5 leading-relaxed">
            Dual-stream monthly credit inflows vs debit outflows with ending cash balance trajectory.
          </p>
        </div>
        <span className="text-xs font-mono text-text-secondary">
          {monthly_cash_flow_trajectory.length} months trajectory
        </span>
      </div>

      {/* Primary Chart Area */}
      <div className="h-64 sm:h-72 md:h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={monthly_cash_flow_trajectory}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.65} />
              </linearGradient>
              <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#F43F5E" stopOpacity={0.65} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.6} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              yAxisId="bars"
              tick={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatINR(v, { compact: true })}
            />
            <YAxis
              yAxisId="line"
              orientation="right"
              hide={true}
            />
            <Tooltip content={<CashFlowTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: "12px", fontSize: "11px", fontWeight: 500 }}
            />
            <Bar
              yAxisId="bars"
              dataKey="inflow_credits"
              name="Inflow (Credits)"
              fill="url(#inflowGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              isAnimationActive={!shouldReduceMotion}
              animationDuration={550}
              animationEasing="ease-out"
            />
            <Bar
              yAxisId="bars"
              dataKey="outflow_debits"
              name="Outflow (Debits)"
              fill="url(#outflowGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              isAnimationActive={!shouldReduceMotion}
              animationDuration={550}
              animationEasing="ease-out"
            />
            <Line
              yAxisId="line"
              type="monotone"
              dataKey="ending_balance"
              name="Ending Cash Balance"
              stroke="#6366F1"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#6366F1", strokeWidth: 1, stroke: "#ffffff" }}
              activeDot={{ r: 5 }}
              isAnimationActive={!shouldReduceMotion}
              animationDuration={650}
              animationEasing="ease-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Liquidity Diagnostics KPI Strip */}
      <div className="border-t border-border/60 pt-5 mt-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary/80 font-mono mb-3">
          Liquidity Diagnostics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {diagnostics.map((d) => (
            <div
              key={d.label}
              className="bg-surface-alt/60 p-3 rounded-xl border border-border/50 hover:bg-surface-alt transition-colors flex flex-col justify-between min-w-0"
              title={`${d.label}: ${d.fullValue}`}
            >
              <p className="text-[11px] font-medium uppercase tracking-wider text-text-secondary/80 font-mono truncate block">
                {d.label}
              </p>
              <p className={cn("font-num text-base sm:text-lg font-bold tabular-nums mt-1.5 block", d.valueColor)}>
                {d.value}
              </p>
              <p className="text-[11px] text-text-secondary/80 mt-0.5 truncate block">
                {d.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
