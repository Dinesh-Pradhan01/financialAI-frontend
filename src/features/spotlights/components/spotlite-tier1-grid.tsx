import React from "react";
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
} from "lucide-react";
import { SpotliteSpendingInsights } from "@/features/spending/components/SpotliteSpendingInsights";

interface Props {
  metrics: Tier1Metrics;
  tier2Metrics?: Tier2Metrics;
  llmInsights?: LLMInsights;
}

export function SpotliteTier1Grid({ metrics, tier2Metrics, llmInsights }: Props) {
  const { tier2: fetchedTier2, llm: fetchedLlm } = useSpotlite();

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
            Tier 1 — Executive Front Page & LLM Intelligence
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Board-ready executive brief, opportunities & risks, capability signals, and deterministic rules engine cards.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand self-start sm:self-auto">
          <CheckCircle2 size={14} /> Deterministic Source of Truth + LLM AI
        </span>
      </div>

      {/* ── 1. EXECUTIVE BRIEF FIRST (CAPABILITY 9) ───────────────────────── */}
      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-white shadow-xs">
              <Brain size={18} />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              Executive Brief (Board Summary)
            </h3>
          </div>
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
            Capability 9 — AI Synthesis
          </span>
        </div>
        <p className="text-xs leading-relaxed text-text-secondary whitespace-pre-line rounded-xl bg-surface/80 p-4 border border-border/50">
          {llm.capability9_executive_brief}
        </p>
      </div>

      {/* ── 2. OPPORTUNITY AND RISK BELOW IT ─────────────────────────────── */}
      <SpotliteSpendingInsights />

      {/* ── 3. CAPABILITIES 5, 6, AND 3 ─────────────────────────────────── */}
      <div className="space-y-6 pt-2 border-t border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              AI Risk Detection Capabilities (5, 6 & 3)
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Contract lapse scanner, payment-redirection BEC drift detector, and anomaly triage.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
            <Sparkles size={14} /> Signal Scanners
          </span>
        </div>

        {/* DUAL GRID: CAPABILITY 6 (BEC FRAUD) & CAPABILITY 5 (CONTRACT LAPSE) */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* CAPABILITY 6 — BEC FRAUD DRIFT DETECTOR */}
          <div className="rounded-2xl border-2 border-rose-500/40 bg-rose-500/5 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                <ShieldAlert size={16} /> Capability 6 — Highest-Severity Fraud Signal
              </span>
              <span className="rounded-full bg-rose-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                BEC Risk
              </span>
            </div>

            <h4 className="font-display text-base font-bold text-foreground">
              Payment-Redirection Bank Identity Drift
            </h4>

            {llm.capability6_payment_redirection_drift_detector.map((item, idx) => (
              <div key={idx} className="rounded-xl bg-surface p-4 border border-border/60 space-y-2">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-foreground">{item.counterparty}</span>
                  <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                    IFSC Changed
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-md bg-surface-alt p-2">
                    <span className="text-text-tertiary block text-[9px]">Historical Baseline</span>
                    <span className="font-mono font-medium text-text-secondary">{item.historical_bank_ifsc}</span>
                  </div>
                  <div className="rounded-md bg-rose-500/10 p-2 border border-rose-500/20">
                    <span className="text-rose-700 dark:text-rose-300 block text-[9px]">Recent Settlement</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{item.recent_remitting_ifsc}</span>
                  </div>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">{item.detection_narrative}</p>
              </div>
            ))}
          </div>

          {/* CAPABILITY 5 — CONTRACT LAPSE SCANNER */}
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <AlertTriangle size={16} /> Capability 5 — Legal Exposure Scanner
              </span>
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                Expired Terms
              </span>
            </div>

            <h4 className="font-display text-base font-bold text-foreground">
              Contract Lapse & Legal Exposure Scan
            </h4>

            {llm.capability5_contract_lapse_scanner.map((item, idx) => (
              <div key={idx} className="rounded-xl bg-surface p-3.5 border border-border/60 space-y-1.5">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-foreground">{item.counterparty} ({item.type})</span>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    Expired {item.end_date}
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">{item.legal_exposure_finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CAPABILITY 3 — ANOMALIES & MATERIALITY TRIAGE */}
        <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                <FileCheck2 size={18} />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-foreground">
                  Capability 3 — Anomaly Materiality Triage ($Z$-Score Outliers)
                </h4>
                <p className="text-[11px] text-text-tertiary">
                  Filters expected noise from statistical z-score flags using context raw tests can&apos;t see.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
              Capability 3
            </span>
          </div>

          <div className="space-y-3">
            {llm.capability3_anomaly_materiality_triage.map((item, idx) => (
              <div key={idx} className="rounded-xl bg-surface-alt p-4 border border-border/50 flex flex-col md:flex-row justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-foreground">{item.vendor}</span>
                    <span className="text-text-tertiary">({item.category})</span>
                    <span className="font-mono text-[10px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      Z = {item.raw_z_score.toFixed(2)}σ
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.human_triage_explanation}</p>
                </div>
                <div className="self-start">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    item.materiality.includes("CRITICAL")
                      ? "bg-rose-500 text-white"
                      : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                  }`}>
                    {item.materiality}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. OTHER THINGS (HEADLINE EXECUTIVE IMPACT CARDS) ─────────────── */}
      <div className="space-y-4 pt-4 border-t border-border/60">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Deterministic Financial Rules Engine Cards
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Core quantitative metrics computed directly from statement ledgers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* CARD 1: ROOM ABOVE BREAK-EVEN */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface p-6 shadow-xs transition hover:shadow-md hover:border-brand/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                  Profitability & Margin Protection
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                  Room Above Break-Even Revenue
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <TrendingUp size={14} /> Margin: {formatPct(be.operating_margin_pct, 1)}
              </span>
            </div>

            <div className="my-5 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-text-secondary">Monthly Rupee Cushion</span>
                <span className="font-num text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatINR(be.monthly_rupee_cushion)}
                </span>
              </div>

              {/* Visual Bar Gauge */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-text-tertiary">
                  <span>Break-Even: {formatINR(be.break_even_monthly_revenue, { compact: true })}</span>
                  <span>Current Revenue: {formatINR(be.current_monthly_revenue, { compact: true })}</span>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-surface-alt border border-border/40">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (be.break_even_monthly_revenue / be.current_monthly_revenue) * 100)}%`,
                    }}
                  />
                  <div
                    className="absolute top-0 bottom-0 bg-brand/80 transition-all duration-500"
                    style={{
                      left: `${Math.min(100, (be.break_even_monthly_revenue / be.current_monthly_revenue) * 100)}%`,
                      right: "0%",
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="rounded-xl bg-surface-alt p-3 text-xs leading-relaxed text-text-secondary border border-border/50">
              💡 {be.executive_insight}
            </p>
          </div>

          {/* CARD 2: COST STRUCTURE FLEXIBILITY / PAYROLL RIGIDITY */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface p-6 shadow-xs transition hover:shadow-md hover:border-purple-500/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                  Cost Elasticity & Rigidity Check
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                  Cost Structure Flexibility
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/10 px-2.5 py-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                <AlertTriangle size={14} /> Zero Elasticity
              </span>
            </div>

            <div className="my-5 flex items-center justify-between gap-4 rounded-xl bg-surface-alt p-4 border border-border/50">
              <div>
                <span className="text-xs text-text-tertiary font-medium block">Payroll % of Revenue</span>
                <span className="font-num text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                  {formatPct(rigidity.payroll_as_pct_revenue, 1)}
                </span>
                <span className="text-[11px] text-text-secondary block mt-0.5">
                  {formatINR(rigidity.payroll_monthly_amount)} / month
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  {rigidity.consecutive_flat_months} Months Flat
                </span>
                <span className="text-[11px] text-text-tertiary block mt-1">High Cost Rigidity</span>
              </div>
            </div>

            <p className="rounded-xl bg-surface-alt p-3 text-xs leading-relaxed text-text-secondary border border-border/50">
              ⚖️ {rigidity.executive_insight}
            </p>
          </div>

          {/* CARD 3: REAL-MONEY VENDOR OVERBILLING DETECTOR */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-rose-500/40 bg-rose-500/5 p-6 shadow-xs transition hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Single Highest "Act On This Now" Recoverable Cash Item
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                  Vendor Contract Rate Overbilling
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-xs animate-pulse">
                <DollarSign size={14} /> Immediate Action
              </span>
            </div>

            <div className="my-4 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-text-primary">{overbill.vendor_name}</span>
                <span className="font-num text-xl font-black text-rose-600 dark:text-rose-400">
                  +{formatINR(overbill.monthly_overbill_amount)} / mo
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-surface p-2.5 border border-border/60">
                  <span className="text-text-tertiary block text-[10px]">Contracted Rate</span>
                  <span className="font-semibold text-text-primary">{formatINR(overbill.contracted_monthly_rate)}</span>
                </div>
                <div className="rounded-lg bg-surface p-2.5 border border-border/60">
                  <span className="text-text-tertiary block text-[10px]">Actual Billed</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">{formatINR(overbill.avg_actual_monthly_billed)}</span>
                </div>
              </div>

              <div className="rounded-xl bg-rose-500/10 p-3 text-center border border-rose-500/20">
                <span className="text-xs text-rose-700 dark:text-rose-300 font-medium block">Annual Recoverable Cash</span>
                <span className="font-num text-xl font-extrabold text-rose-600 dark:text-rose-400">
                  {formatINR(overbill.annualized_recoverable_cash)} / year
                </span>
              </div>
            </div>

            <p className="rounded-xl bg-surface/80 p-3 text-xs leading-relaxed text-text-secondary border border-border/50">
              🔍 {overbill.executive_insight}
            </p>
          </div>

          {/* CARD 4: IDLE CASH REFRAMED AS FORFEITED INCOME */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface p-6 shadow-xs transition hover:shadow-md hover:border-emerald-500/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                  Treasury Optimization & Lost Yield
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                  Idle Cash Reframed as Forfeited Income
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <PiggyBank size={14} /> Actionable Surplus
              </span>
            </div>

            <div className="my-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-surface-alt p-3 border border-border/50">
                  <span className="text-[10px] text-text-tertiary block font-medium">3-Month Safety Reserve</span>
                  <span className="font-num text-sm font-bold text-text-primary">
                    {formatINR(idle.three_month_safety_reserve, { compact: true })}
                  </span>
                </div>
                <div className="rounded-xl bg-emerald-500/10 p-3 border border-emerald-500/20">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 block font-medium">Idle Surplus Cash</span>
                  <span className="font-num text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatINR(idle.idle_cash_surplus, { compact: true })}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-surface-alt p-3 border border-border/50">
                <span className="text-xs text-text-secondary font-medium">Annualized Lost Interest (6.5% Yield)</span>
                <span className="font-num text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                  ~{formatINR(idle.annualized_unearned_interest)} / yr
                </span>
              </div>
            </div>

            <p className="rounded-xl bg-surface-alt p-3 text-xs leading-relaxed text-text-secondary border border-border/50">
              💰 {idle.executive_insight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
