import React from "react";
import { Link } from "@tanstack/react-router";
import { formatINR, formatPct } from "@/shared/lib/format";
import { Tier1Metrics, Tier2Metrics, LLMInsights, useSpotlite } from "../hooks/useSpotlite";
import {
  TrendingUp,
  ShieldAlert,
  AlertTriangle,
  DollarSign,
  PiggyBank,
  CheckCircle2,
  Brain,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Layers,
  Lock,
} from "lucide-react";
import { SpotliteSpendingInsights } from "@/features/spending/components/SpotliteSpendingInsights";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  metrics: Tier1Metrics;
  tier2Metrics?: Tier2Metrics;
  llmInsights?: LLMInsights;
}

export function SpotliteTier1Grid({ metrics, tier2Metrics, llmInsights }: Props) {
  const { tier2: fetchedTier2, llm: fetchedLlm } = useSpotlite();
  const shouldReduceMotion = useReducedMotion();

  const tier2 = tier2Metrics || fetchedTier2;
  const llm = llmInsights || fetchedLlm;

  const {
    room_above_break_even: be,
    cost_structure_flexibility: rigidity,
    vendor_overbilling_detector: overbill,
    idle_cash_forfeited_income: idle,
  } = metrics;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Executive Front Page
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Prioritized risk alerts and actionable spotlights.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand self-start sm:self-auto">
          <CheckCircle2 size={14} /> Deterministic Ledger Engine + LLM AI
        </span>
      </div>

      {/* ── 1. EXECUTIVE BRIEF (CAPABILITY 9) ─────────────────────────────── */}
      <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white shadow-xs">
              <Brain size={18} />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              Executive Brief
            </h3>
          </div>
          <span className="text-xs font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20">
            Capability 9 — AI Synthesis
          </span>
        </div>
        <p className="text-xs leading-relaxed text-text-secondary whitespace-pre-line rounded-xl bg-surface/80 p-4 border border-border/50">
          {llm.capability9_executive_brief}
        </p>
      </div>

      {/* ── 2. EXECUTIVE OPPORTUNITIES & RISKS ACTION CENTER ─────────────── */}
      <SpotliteSpendingInsights />

      {/* ── 3. CORE FINANCIAL RULES ENGINE SPOTLIGHT CARDS ────────────────── */}
      <div className="space-y-4 pt-4 border-t border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Spotlights
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              4 spotlights computed from 3 banks · 1,420 transactions.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* CARD 1: ROOM ABOVE BREAK-EVEN */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-surface to-surface dark:from-emerald-950/20 dark:via-surface dark:to-surface p-6 shadow-xs transition hover:shadow-md hover:border-emerald-500/50"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800/80 dark:text-emerald-300/80">
                    Profitability &amp; Solvency Health
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                    Room Above Break-Even Revenue
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <TrendingUp size={14} /> Margin: {formatPct(be.operating_margin_pct, 1)}
                </span>
              </div>

              <div className="my-5 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-text-secondary">Monthly Rupee Cushion</span>
                  <span className="font-num tabular-nums text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    +{formatINR(be.monthly_rupee_cushion)}
                  </span>
                </div>

                {/* Visual Bar Gauge */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium text-text-tertiary font-num tabular-nums">
                    <span>Break-Even: {formatINR(be.break_even_monthly_revenue, { compact: true })}</span>
                    <span>Current Revenue: {formatINR(be.current_monthly_revenue, { compact: true })}</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label="Break-even revenue margin"
                    aria-valuenow={Math.round((be.break_even_monthly_revenue / be.current_monthly_revenue) * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="relative h-3 w-full overflow-hidden rounded-full bg-surface-alt border border-border/40"
                  >
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={shouldReduceMotion ? false : { width: 0 }}
                      animate={{
                        width: `${Math.min(100, (be.break_even_monthly_revenue / be.current_monthly_revenue) * 100)}%`,
                      }}
                      transition={shouldReduceMotion ? undefined : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>

              <p className="rounded-xl bg-surface-alt/70 p-3 text-xs leading-relaxed text-text-secondary border border-border/50">
                {be.executive_insight}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex justify-between items-center text-xs">
              <span className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 font-medium">Deterministic Solvency</span>
              <Link
                to="/spotlights/$id"
                params={{ id: "room-above-break-even" }}
                className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <span>View Break-Even Proof</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

          {/* CARD 2: COST STRUCTURE RIGIDITY */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-surface to-surface dark:from-amber-950/20 dark:via-surface dark:to-surface p-6 shadow-xs transition hover:shadow-md hover:border-amber-500/50"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800/80 dark:text-amber-300/80">
                    Margin Protection &amp; Cost Inelasticity
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                    Payroll &amp; Cost Structure Rigidity
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  <Lock size={14} /> Zero Elasticity
                </span>
              </div>

              <div className="my-5 flex items-center justify-between rounded-xl bg-surface-alt/70 p-4 border border-border/50">
                <div>
                  <span className="text-xs text-text-secondary block font-medium">Fixed Monthly Headcount</span>
                  <span className="font-num tabular-nums text-2xl font-extrabold text-foreground">
                    -{formatINR(rigidity.payroll_monthly_amount)} / mo
                  </span>
                  <span className="text-xs font-semibold text-text-tertiary block mt-0.5 font-num tabular-nums">
                    {formatPct(rigidity.payroll_as_pct_revenue, 1)} of Monthly Revenue
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-500/30 font-num tabular-nums">
                    {rigidity.consecutive_flat_months} Months Flat
                  </span>
                  <span className="text-[11px] text-amber-800/80 dark:text-amber-300/80 block mt-1 font-medium">High Cost Rigidity</span>
                </div>
              </div>

              <p className="rounded-xl bg-surface-alt/70 p-3 text-xs leading-relaxed text-text-secondary border border-border/50">
                {rigidity.executive_insight}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex justify-between items-center text-xs">
              <span className="text-[11px] text-amber-800/80 dark:text-amber-300/80 font-medium">Operating Risk</span>
              <Link
                to="/spotlights/$id"
                params={{ id: "payroll-rigidity" }}
                className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <span>Model Elasticity</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>

          {/* CARD 3: REAL-MONEY VENDOR OVERBILLING DETECTOR */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-rose-500/40 bg-gradient-to-br from-rose-500/10 via-surface to-surface dark:from-rose-950/25 dark:via-surface dark:to-surface p-6 shadow-xs transition hover:shadow-md hover:border-rose-500/60"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Cash Recovery
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                    Vendor Contract Rate Overbilling
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
                  <DollarSign size={14} /> Immediate Action
                </span>
              </div>

              <div className="my-4 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-text-primary">{overbill.vendor_name}</span>
                  <span className="font-num tabular-nums text-xl font-extrabold text-rose-600 dark:text-rose-400">
                    +{formatINR(overbill.monthly_overbill_amount)} / mo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-surface p-2.5 border border-border/60">
                    <span className="text-text-tertiary block text-[10px]">Contracted Rate</span>
                    <span className="font-num tabular-nums font-semibold text-text-primary">
                      {formatINR(overbill.contracted_monthly_rate)}
                    </span>
                  </div>
                  <div className="rounded-lg bg-surface p-2.5 border border-rose-500/30">
                    <span className="text-rose-700 dark:text-rose-300 block text-[10px] font-medium">Actual Billed</span>
                    <span className="font-num tabular-nums font-semibold text-rose-600 dark:text-rose-400">
                      {formatINR(overbill.avg_actual_monthly_billed)}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-rose-500/15 p-3 text-center border border-rose-500/30">
                  <span className="text-xs text-rose-800 dark:text-rose-200 font-semibold block">
                    Annual Recoverable Cash
                  </span>
                  <span className="font-num tabular-nums text-xl font-extrabold text-rose-600 dark:text-rose-400">
                    +{formatINR(overbill.annualized_recoverable_cash)} / year
                  </span>
                </div>
              </div>

              <p className="rounded-xl bg-surface/80 p-3 text-xs leading-relaxed text-text-secondary border border-border/50">
                {overbill.executive_insight}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-500/20 flex justify-between items-center text-xs">
              <Link
                to="/spotlights/$id"
                params={{ id: "vendor-overbilling" }}
                className="text-text-secondary hover:text-foreground font-medium underline"
              >
                Audit Contract Disparity
              </Link>
              <motion.div whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}>
                <Link
                  to="/spotlights/$id/apply"
                  params={{ id: "vendor-overbilling" }}
                  className="inline-flex items-center gap-1 font-bold text-white bg-rose-600 hover:bg-rose-700 px-3.5 py-1.5 rounded-xl shadow-xs transition"
                >
                  <span>Draft Dispute Claim</span>
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* CARD 4: IDLE CASH REFRAMED AS FORFEITED INCOME */}
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/5 via-surface to-surface dark:from-teal-950/20 dark:via-surface dark:to-surface p-6 shadow-xs transition hover:shadow-md hover:border-teal-500/50"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800/80 dark:text-teal-300/80">
                    Yield Optimization
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                    Idle Cash, Lost Income
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-teal-500/10 px-2.5 py-1 text-xs font-bold text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  <PiggyBank size={14} /> Actionable Surplus
                </span>
              </div>

              <div className="my-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-surface-alt/70 p-3 border border-border/50">
                    <span className="text-[10px] text-text-tertiary block font-medium">3-Month Safety Reserve</span>
                    <span className="font-num tabular-nums text-sm font-bold text-text-primary">
                      {formatINR(idle.three_month_safety_reserve, { compact: true })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-teal-500/10 p-3 border border-teal-500/20">
                    <span className="text-[10px] text-teal-700 dark:text-teal-300 block font-medium">
                      Idle Surplus Cash
                    </span>
                    <span className="font-num tabular-nums text-sm font-extrabold text-teal-600 dark:text-teal-400">
                      +{formatINR(idle.idle_cash_surplus, { compact: true })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-teal-500/10 p-3 border border-teal-500/20">
                  <span className="text-xs text-teal-900/80 dark:text-teal-200/80 font-medium">Annual Lost Yield at 6.5%</span>
                  <span className="font-num tabular-nums text-lg font-extrabold text-teal-600 dark:text-teal-400">
                    ~{formatINR(idle.annualized_unearned_interest)} / yr
                  </span>
                </div>
              </div>

              <p className="rounded-xl bg-surface-alt/70 p-3 text-xs leading-relaxed text-text-secondary border border-border/50">
                {idle.executive_insight}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex justify-between items-center text-xs">
              <span className="text-[11px] text-teal-800/80 dark:text-teal-300/80 font-medium">T+1 Overnight Yield</span>
              <motion.div whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}>
                <Link
                  to="/spotlights/$id/apply"
                  params={{ id: "idle-cash-optimization" }}
                  className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <span>Configure Auto-Sweep</span>
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
