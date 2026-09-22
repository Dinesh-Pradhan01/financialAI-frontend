import React from "react";
import { formatINR, formatPct } from "@/shared/lib/format";
import { Tier2Metrics } from "../hooks/useSpotlite";
import {
  Users,
  Calendar,
  BarChart2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Props {
  metrics: Tier2Metrics;
}

export function SpotliteTier2Grid({ metrics }: Props) {
  const {
    client_payment_drift: drift,
    workforce_ratios: workforce,
    weekly_spend_cyclicality: cyclicality,
    efficiency_ratios: efficiency,
  } = metrics;

  const dayOfWeekList = Object.entries(cyclicality.day_of_week_breakdown);
  const maxDaySpend = Math.max(...dayOfWeekList.map(([, v]) => v));

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">
          Tier 2 — Useful Context & Operational Analytics
        </h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Secondary supporting metrics that answer follow-up CEO questions without burying the lead story.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* CARD 1: CLIENT PAYMENT DRIFT */}
        <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <Clock size={16} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                Client Payment Drift & DSO Risk
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Zero Drift (Healthy)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 text-text-tertiary">
                  <th className="pb-2 font-medium">Client Counterparty</th>
                  <th className="pb-2 font-medium text-center">Median Pay Day</th>
                  <th className="pb-2 font-medium text-center">Std Dev</th>
                  <th className="pb-2 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {Object.entries(drift.clients).map(([clientName, info]) => (
                  <tr key={clientName} className="hover:bg-surface-alt/50">
                    <td className="py-2.5 font-semibold text-foreground">{clientName}</td>
                    <td className="py-2.5 text-center font-num text-text-secondary">Day {info.median_payment_day}</td>
                    <td className="py-2.5 text-center font-num text-text-tertiary">±{info.std_dev_days} days</td>
                    <td className="py-2.5 text-right font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 size={12} /> {info.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-secondary rounded-xl bg-surface-alt p-3 border border-border/50">
            ℹ️ {drift.summary}
          </p>
        </div>

        {/* CARD 2: WORKFORCE RATIOS */}
        <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
                <Users size={16} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                Workforce Efficiency Ratios
              </h3>
            </div>
            <span className="text-xs font-semibold text-text-secondary bg-surface-alt px-2.5 py-1 rounded-full border border-border/50">
              {workforce.headcount} Employees
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="rounded-xl bg-surface-alt p-4 border border-border/50">
              <span className="text-xs text-text-tertiary font-medium block">Revenue Per Employee</span>
              <span className="font-num text-xl font-extrabold text-indigo-600 dark:text-indigo-400 block mt-1">
                {formatINR(workforce.revenue_per_employee_monthly)} / mo
              </span>
            </div>
            <div className="rounded-xl bg-surface-alt p-4 border border-border/50">
              <span className="text-xs text-text-tertiary font-medium block">Payroll / Fixed Opex Ratio</span>
              <span className="font-num text-xl font-extrabold text-foreground block mt-1">
                {workforce.payroll_to_fixed_opex_ratio.toFixed(2)}x
              </span>
            </div>
          </div>

          <p className="text-xs text-text-secondary rounded-xl bg-surface-alt p-3 border border-border/50">
            👥 {workforce.summary}
          </p>
        </div>

        {/* CARD 3: WEEKLY SPEND CYCLICALITY */}
        <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                <Calendar size={16} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                Weekly Spend Cyclicality
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
              Peak: {cyclicality.peak_discretionary_day}
            </span>
          </div>

          <div className="space-y-2 my-3">
            {dayOfWeekList.map(([day, amount]) => (
              <div key={day} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-text-secondary">{day}</span>
                  <span className="font-num font-semibold text-foreground">{formatINR(amount)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      day === "Saturday" ? "bg-amber-500" : "bg-brand/60"
                    }`}
                    style={{ width: `${(amount / maxDaySpend) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-text-secondary rounded-xl bg-surface-alt p-3 border border-border/50">
            🗓️ {cyclicality.summary}
          </p>
        </div>

        {/* CARD 4: EFFICIENCY RATIOS */}
        <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <BarChart2 size={16} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                Financial Efficiency Ratios
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Healthy Unit Economics
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="rounded-xl bg-surface-alt p-4 border border-border/50">
              <span className="text-xs text-text-tertiary font-medium block">Revenue Per ₹ Opex</span>
              <span className="font-num text-xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1">
                ₹{efficiency.revenue_per_rupee_opex.toFixed(2)}
              </span>
            </div>
            <div className="rounded-xl bg-surface-alt p-4 border border-border/50">
              <span className="text-xs text-text-tertiary font-medium block">Cost-to-Income Ratio</span>
              <span className="font-num text-xl font-extrabold text-foreground block mt-1">
                {formatPct(efficiency.cost_to_income_ratio_pct, 1)}
              </span>
            </div>
          </div>

          <p className="text-xs text-text-secondary rounded-xl bg-surface-alt p-3 border border-border/50">
            📊 {efficiency.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
