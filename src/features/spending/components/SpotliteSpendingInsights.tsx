import React, { useState } from "react";
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
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

export function SpotliteSpendingInsights() {
  const shouldReduceMotion = useReducedMotion();
  const { tier1, llm } = useSpotlite();

  const overbill = tier1.vendor_overbilling_detector;
  const idle = tier1.idle_cash_forfeited_income;
  const rigidity = tier1.cost_structure_flexibility;
  const becAlerts = llm.capability6_payment_redirection_drift_detector;
  const lapseScans = llm.capability5_contract_lapse_scanner;

  const [disputeTriggered, setDisputeTriggered] = useState(false);
  const [becFlagged, setBecFlagged] = useState<Record<number, boolean>>({});
  const [lapseNotified, setLapseNotified] = useState<Record<number, boolean>>({});

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
              Priority Risk Signals & Opportunities
            </h2>
            <p className="text-xs text-text-secondary">
              High-signal recoverable cash items and critical fraud/legal exposures.
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
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Sparkles size={16} />
              </div>
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
            <div className="rounded-xl bg-surface p-4 border border-border/60 space-y-2.5 transition hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <DollarSign size={14} /> Recoverable Overbilled Cash
                </span>
                <span className="font-num tabular-nums text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  +{formatINR(overbill.annualized_recoverable_cash)} / yr
                </span>
              </div>
              <h4 className="text-xs font-bold text-foreground">
                {overbill.vendor_name} · Contract Rate Elevation
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Billed consistently ~85% above contracted monthly rate (
                <span className="font-num tabular-nums">{formatINR(overbill.avg_actual_monthly_billed)}</span>/mo actual vs{" "}
                <span className="font-num tabular-nums">{formatINR(overbill.contracted_monthly_rate)}</span>
                /mo contracted). Represents <strong className="font-semibold text-foreground font-num tabular-nums">{formatINR(overbill.monthly_overbill_amount)}/month</strong> in recoverable unaddressed cash.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border/40 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-text-tertiary font-num tabular-nums">
                    Baseline: {formatINR(overbill.contracted_monthly_rate)}/mo
                  </span>
                  <Link
                    to="/spotlights/$id"
                    params={{ id: "vendor-overbilling" }}
                    className="text-[11px] font-semibold text-brand hover:underline"
                  >
                    Audit Details →
                  </Link>
                </div>
                {disputeTriggered ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={13} /> Dispute Queued
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const text = `Subject: Contract Billing Reconciliation - ${overbill.vendor_name}\n\nDear Accounts Team,\nSpotlite audit has detected an ongoing rate discrepancy on recent invoices.\n- Contracted Baseline Rate: ${formatINR(overbill.contracted_monthly_rate)}/mo\n- Current Average Billed: ${formatINR(overbill.avg_actual_monthly_billed)}/mo\n- Unaddressed Variance: ${formatINR(overbill.monthly_overbill_amount)}/mo excess charge\n\nPlease issue an immediate credit note or adjust upcoming billings accordingly.\n\nThank you,\nFinance & Operations`;
                        navigator.clipboard.writeText(text);
                        toast.success("Vendor dispute letter copied to clipboard", {
                          description: "Ready to email to accounts@vendor.com",
                        });
                      }}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold bg-surface border border-border/80 text-foreground hover:bg-surface-alt transition cursor-pointer shadow-2xs"
                      title="Copy dispute letter to clipboard"
                    >
                      <Copy size={11} /> Copy Letter
                    </button>
                  </div>
                ) : (
                  <motion.button
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    onClick={() => {
                      setDisputeTriggered(true);
                      toast.success("Dispute draft prepared", {
                        description: `Audit memo queued for ${overbill.vendor_name} regarding ${formatINR(overbill.monthly_overbill_amount)}/mo excess charge.`,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition cursor-pointer"
                  >
                    Draft Vendor Dispute
                  </motion.button>
                )}
              </div>
            </div>

            {/* OPPORTUNITY 2: IDLE CASH TREASURY YIELD */}
            <div className="rounded-xl bg-surface p-4 border border-border/60 space-y-2.5 transition hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <PiggyBank size={14} /> Idle Surplus Cash Income
                </span>
                <span className="font-num tabular-nums text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  ~{formatINR(idle.annualized_unearned_interest)} / yr
                </span>
              </div>
              <h4 className="text-xs font-bold text-foreground">
                Treasury Optimization on Surplus Cash
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Holding <strong className="font-semibold text-foreground font-num tabular-nums">{formatINR(idle.idle_cash_surplus, { compact: true })}</strong> in surplus cash above the 3-month safety reserve ({formatINR(idle.three_month_safety_reserve, { compact: true })}). Deploying at 6.5% yield quietly adds ~₹1.97L/year to treasury earnings.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border/40 gap-2">
                <span className="text-[11px] text-text-tertiary">
                  Target: 6.5% p.a. overnight/liquid funds
                </span>
                <Link
                  to="/spotlights/$id"
                  params={{ id: "idle-cash-optimization" }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline"
                >
                  <span>Explore Treasury Options</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: MAJOR RISKS (ROSE/AMBER TINT) */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400">
                <ShieldAlert size={16} />
              </div>
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
              <div key={idx} className="rounded-xl bg-surface p-4 border border-rose-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <ShieldAlert size={14} /> BEC Fraud Redirection Signal
                  </span>
                  <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded uppercase">
                    Critical Risk
                  </span>
                </div>
                <h4 className="text-xs font-bold text-foreground">
                  {bec.counterparty} · Bank IFSC Identity Drift
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Settled remittance from unverified IFSC (<code className="font-mono text-rose-600 dark:text-rose-400 font-bold">{bec.recent_remitting_ifsc}</code>) instead of historical baseline (<code className="font-mono text-foreground font-semibold">{bec.historical_bank_ifsc}</code>). Potential account takeover signal.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-rose-500/20 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-text-tertiary">
                      Severity: High Outflow Risk
                    </span>
                    <Link
                      to="/spotlights/$id"
                      params={{ id: "bec-fraud-risk" }}
                      className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      Audit Proof →
                    </Link>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    onClick={() => {
                      setBecFlagged((prev) => ({ ...prev, [idx]: true }));
                      toast.error("Remittance hold flagged", {
                        description: `Hold placed on outbound payments to ${bec.counterparty} until IFSC ${bec.recent_remitting_ifsc} is authenticated.`,
                      });
                    }}
                    disabled={becFlagged[idx]}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer",
                      becFlagged[idx]
                        ? "bg-rose-500/20 text-rose-700 dark:text-rose-300 cursor-default"
                        : "bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
                    )}
                  >
                    {becFlagged[idx] ? (
                      <>
                        <CheckCircle2 size={13} /> Verification Hold Active
                      </>
                    ) : (
                      <>Place Remittance Hold</>
                    )}
                  </motion.button>
                </div>
              </div>
            ))}

            {/* RISK 2: EXPIRED CONTRACT EXPOSURE */}
            {lapseScans.slice(0, 1).map((item, idx) => (
              <div key={idx} className="rounded-xl bg-surface p-4 border border-amber-500/30 space-y-2.5">
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
                  Payments flowing under agreement expired on <span className="font-num tabular-nums font-semibold">{item.end_date}</span>. Operating without binding pricing terms or legal protection.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-text-tertiary">
                      Lapsed: {item.end_date}
                    </span>
                    <Link
                      to="/spotlights/$id"
                      params={{ id: "contract-lapse" }}
                      className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Audit Exposure →
                    </Link>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    onClick={() => {
                      setLapseNotified((prev) => ({ ...prev, [idx]: true }));
                      toast.info("Legal renewal flagged", {
                        description: `Renewal reminder logged for ${item.counterparty} (${item.type}).`,
                      });
                    }}
                    disabled={lapseNotified[idx]}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer",
                      lapseNotified[idx]
                        ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 cursor-default"
                        : "bg-amber-600 text-white hover:bg-amber-700 shadow-xs"
                    )}
                  >
                    {lapseNotified[idx] ? (
                      <>
                        <CheckCircle2 size={13} /> Renewal Scheduled
                      </>
                    ) : (
                      <>Schedule Renewal</>
                    )}
                  </motion.button>
                </div>
              </div>
            ))}

            {/* RISK 3: STRUCTURAL PAYROLL RIGIDITY */}
            <div className="rounded-xl bg-surface p-4 border border-border/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Lock size={14} className="text-text-secondary" /> Payroll Cost Rigidity
                </span>
                <span className="font-num tabular-nums text-[11px] font-bold bg-surface-alt text-foreground border border-border/80 px-2 py-0.5 rounded">
                  {formatPct(rigidity.payroll_as_pct_revenue, 1)} of Revenue
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Payroll sits flat at <strong className="font-semibold text-foreground font-num tabular-nums">{formatINR(rigidity.payroll_monthly_amount)}/mo</strong> with zero cost elasticity across 6 straight months, creating margin vulnerability during volume dips.
              </p>
              <div className="pt-2 border-t border-border/40 text-right">
                <Link
                  to="/spotlights/$id"
                  params={{ id: "payroll-rigidity" }}
                  className="text-[11px] font-semibold text-brand hover:underline inline-flex items-center gap-1"
                >
                  <span>Model Cost Elasticity</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
