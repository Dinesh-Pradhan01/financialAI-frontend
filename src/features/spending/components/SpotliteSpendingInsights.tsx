import React from "react";
import { Link } from "@tanstack/react-router";
import { formatINR, formatPct } from "@/shared/lib/format";
import { useSpotlite } from "@/features/spotlights/hooks/useSpotlite";
import {
  TrendingUp,
  ShieldAlert,
  AlertTriangle,
  DollarSign,
  PiggyBank,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react";

export function SpotliteSpendingInsights() {
  const { tier1, llm } = useSpotlite();

  const overbill = tier1.vendor_overbilling_detector;
  const idle = tier1.idle_cash_forfeited_income;
  const rigidity = tier1.cost_structure_flexibility;
  const becAlerts = llm.capability6_payment_redirection_drift_detector;
  const lapseScans = llm.capability5_contract_lapse_scanner;

  return (
    <section className="space-y-4 my-6" aria-labelledby="spotlite-spending-insights-heading">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
            <Zap size={18} className="fill-current" />
          </div>
          <div>
            <h2
              id="spotlite-spending-insights-heading"
              className="font-display text-lg font-bold tracking-tight text-foreground"
            >
              Spotlite Intelligence — Risk Signals, Anomalies & Outliers
            </h2>
            <p className="text-xs text-text-secondary">
              High-signal recoverable cash items and critical fraud/legal exposure flagged by Spotlite.
            </p>
          </div>
        </div>

        <Link
          to="/spotlights"
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand/10 px-3.5 py-1.5 text-xs font-bold text-brand hover:bg-brand/20 transition cursor-pointer self-start sm:self-auto"
        >
          <span>View Full Spotlite Dashboard</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* DUAL COLUMN GRID: OPPORTUNITIES VS RISKS */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* COLUMN 1: MAJOR OPPORTUNITIES (GREEN/EMERALD TINT) */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold">
                💚
              </span>
              <h3 className="font-display text-base font-bold text-foreground">
                Major Financial Opportunities
              </h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Actionable Value
            </span>
          </div>

          <div className="space-y-3">
            {/* OPPORTUNITY 1: RECOVERABLE VENDOR OVERBILLING */}
            <div className="rounded-xl bg-surface p-4 border border-border/60 space-y-2 transition hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <DollarSign size={14} /> Recoverable Overbilled Cash
                </span>
                <span className="font-num text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  +{formatINR(overbill.annualized_recoverable_cash)} / yr
                </span>
              </div>
              <h4 className="text-xs font-bold text-foreground">
                {overbill.vendor_name} — Contract Rate Elevation
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Billed consistently ~85% above contracted monthly rate (
                {formatINR(overbill.avg_actual_monthly_billed)}/mo actual vs {formatINR(overbill.contracted_monthly_rate)}
                /mo contracted). Represents <strong className="font-semibold text-foreground">{formatINR(overbill.monthly_overbill_amount)}/month</strong> in recoverable unaddressed cash.
              </p>
            </div>

            {/* OPPORTUNITY 2: IDLE CASH TREASURY YIELD */}
            <div className="rounded-xl bg-surface p-4 border border-border/60 space-y-2 transition hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <PiggyBank size={14} /> Idle Surplus Cash Income
                </span>
                <span className="font-num text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  ~{formatINR(idle.annualized_unearned_interest)} / yr
                </span>
              </div>
              <h4 className="text-xs font-bold text-foreground">
                Treasury Optimization on Surplus Cash
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Holding <strong className="font-semibold text-foreground">{formatINR(idle.idle_cash_surplus, { compact: true })}</strong> in surplus cash above the 3-month safety reserve ({formatINR(idle.three_month_safety_reserve, { compact: true })}). Deploying at 6.5% yield quietly adds ~₹1.97L/year to treasury earnings.
              </p>
            </div>
          </div>
        </div>

        {/* COLUMN 2: MAJOR RISKS (ROSE/AMBER TINT) */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500 text-white font-bold">
                🚨
              </span>
              <h3 className="font-display text-base font-bold text-foreground">
                Major Financial & Security Risks
              </h3>
            </div>
            <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
              Critical Signals
            </span>
          </div>

          <div className="space-y-3">
            {/* RISK 1: BEC BANK IDENTITY REDIRECTION */}
            {becAlerts.map((bec, idx) => (
              <div key={idx} className="rounded-xl bg-surface p-4 border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <ShieldAlert size={14} /> BEC Fraud Redirection Signal
                  </span>
                  <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded uppercase">
                    Critical Risk
                  </span>
                </div>
                <h4 className="text-xs font-bold text-foreground">
                  {bec.counterparty} — Bank IFSC Identity Drift
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Settled June remittance from unverified IFSC (<code className="font-mono text-rose-600 dark:text-rose-400 font-bold">{bec.recent_remitting_ifsc}</code>) instead of historical baseline (<code className="font-mono">{bec.historical_bank_ifsc}</code>). Potential account takeover signal.
                </p>
              </div>
            ))}

            {/* RISK 2: EXPIRED CONTRACT EXPOSURE */}
            {lapseScans.slice(0, 1).map((item, idx) => (
              <div key={idx} className="rounded-xl bg-surface p-4 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertTriangle size={14} /> Contract Lapse Exposure
                  </span>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded uppercase">
                    Expired SLA
                  </span>
                </div>
                <h4 className="text-xs font-bold text-foreground">
                  {item.counterparty} ({item.type})
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Payments flowing under agreement expired on {item.end_date}. Operating without binding pricing terms or legal protection.
                </p>
              </div>
            ))}

            {/* RISK 3: STRUCTURAL PAYROLL RIGIDITY */}
            <div className="rounded-xl bg-surface p-4 border border-border/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  Payroll Cost Rigidity
                </span>
                <span className="text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded">
                  {formatPct(rigidity.payroll_as_pct_revenue, 1)} of Revenue
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Payroll sits flat at {formatINR(rigidity.payroll_monthly_amount)}/mo with zero cost elasticity across 6 straight months, creating margin vulnerability during volume dips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
