import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, ShieldAlert, ArrowRight, Copy, CheckCircle2, Building2, Zap, FileText } from "lucide-react";
import { toast } from "sonner";
import { getB2BSpotlightById, b2bSpotlights, type B2BSeverity } from "@/features/spotlights/data/b2bSpotlights";
import { cn } from "@/shared/lib/utils";
import {
  AgentBadge,
  ConfidenceMeter,
  AgentNarration,
} from "@/features/agents/components/agent-narration";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { selectIsApplied } from "@/shared/store/selectors";
import { snoozeTrigger } from "@/shared/store/slices/spotlightsSlice";
import { motion, useReducedMotion } from "framer-motion";

export const Route = createFileRoute("/_app/(spotlights)/spotlights/$id")({
  head: () => ({
    meta: [
      { title: "Spotlight Intelligence Detail · Spotlite" },
      {
        name: "description",
        content: "Deep algorithmic provenance, evidence ledger, and executive remediation workflow.",
      },
    ],
  }),
  component: SpotlightDetail,
});

function SeverityBadge({ severity }: { severity: B2BSeverity }) {
  const map = {
    high: { dot: "bg-rose-500", text: "text-rose-700 dark:text-rose-300", bg: "bg-rose-500/10 border-rose-500/30", label: "High Severity Risk" },
    moderate: { dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-300", bg: "bg-amber-500/10 border-amber-500/30", label: "Moderate Risk" },
    low: { dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-500/10 border-emerald-500/30", label: "Optimized Baseline" },
  };
  const s = map[severity];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold", s.bg, s.text)}>
      <span className={cn("h-2 w-2 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

function SpotlightDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const applied = useAppSelector(selectIsApplied(id));
  const shouldReduceMotion = useReducedMotion();
  
  const spotlight = getB2BSpotlightById(id);

  if (!spotlight) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary shadow-xs">
          <ArrowLeft className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            B2B Spotlight Opportunity Not Found
          </h1>
          <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto">
            The requested spotlight ID &ldquo;{id}&rdquo; is not registered. Choose an active B2B operational spotlight below:
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 text-left max-w-xl mx-auto">
          {b2bSpotlights.map((s) => (
            <Link
              key={s.id}
              to="/spotlights/$id"
              params={{ id: s.id }}
              className="p-3.5 rounded-xl border border-border/80 bg-surface hover:border-brand/40 transition group block"
            >
              <span className="text-[10px] font-bold text-text-tertiary uppercase">{s.category}</span>
              <p className="text-xs font-bold text-foreground group-hover:text-brand mt-0.5">{s.title}</p>
              <p className="font-num tabular-nums text-xs font-bold text-brand mt-1">{s.bigValue}</p>
            </Link>
          ))}
        </div>

        <div className="pt-4 flex justify-center">
          <Link
            to="/spotlights"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-brand hover:opacity-95 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Spotlights Overview
          </Link>
        </div>
      </div>
    );
  }

  function snooze() {
    dispatch(snoozeTrigger(spotlight!.id));
    toast("Spotlight Snoozed", {
      description: `Logged in audit ledger. We'll resurface ${spotlight!.entityName} in the next quarterly review.`,
    });
    nav({ to: "/spotlights" });
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-10 space-y-6">
      {/* BREADCRUMB */}
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <Link to="/spotlights" className="inline-flex items-center gap-1.5 hover:text-foreground transition font-medium">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Spotlights
        </Link>
        <span className="font-semibold text-brand bg-brand/10 px-2.5 py-0.5 rounded-full border border-brand/20">
          {spotlight.category}
        </span>
      </div>

      {/* HEADER HERO */}
      <motion.header
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "rounded-2xl border p-6 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6 transition",
          spotlight.severity === "high"
            ? "border-rose-500/35 bg-gradient-to-br from-rose-500/10 via-surface to-surface dark:from-rose-950/25 dark:via-surface dark:to-surface"
            : spotlight.severity === "moderate"
            ? "border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-surface to-surface dark:from-amber-950/25 dark:via-surface dark:to-surface"
            : "border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface"
        )}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-wider">
            <Building2 size={14} className="text-brand" />
            <span>Target Entity: {spotlight.entityName}</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {spotlight.title}
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
            {spotlight.oneLiner}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <SeverityBadge severity={spotlight.severity} />
          <div
            className={cn(
              "font-num tabular-nums text-3xl font-black tracking-tight",
              spotlight.severity === "high"
                ? "text-rose-600 dark:text-rose-400"
                : spotlight.severity === "moderate"
                ? "text-amber-600 dark:text-amber-400"
                : "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {spotlight.bigValue}
          </div>
          <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider text-left md:text-right">
            {spotlight.bigCaption}
          </div>
        </div>
      </motion.header>

      {/* AGENT NARRATION */}
      <AgentNarration agent="reasoning">
        I cross-referenced {spotlight.evidenceBase.transactions.toLocaleString("en-IN")} transactions across{" "}
        {spotlight.evidenceBase.banks} bank accounts ({spotlight.evidenceBase.period}) to isolate this operational risk. Confidence rating: {spotlight.confidence}%.
      </AgentNarration>

      {/* SECTION 1: SIGNALS NOTICED */}
      <section className="rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
            </div>
            <h2 className="font-display text-base font-bold text-foreground">
              What Spotlite Noticed (Bank &amp; Contract Signals)
            </h2>
          </div>
          <AgentBadge agent="reasoning" />
        </div>

        <ul className="space-y-2.5 text-xs text-text-secondary">
          {spotlight.signals.map((sig, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="leading-relaxed">{sig}</span>
            </li>
          ))}
        </ul>

        <p className="border-t border-border/60 pt-3 text-[11px] text-text-tertiary font-medium">
          Source of Truth: Authoritative bank statement disbursements matched against Document Vault master agreements.
        </p>
      </section>

      {/* SECTION 2: MATHEMATICAL & FINANCIAL REASONING */}
      <section className="rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Zap size={16} />
            </div>
            <h2 className="font-display text-base font-bold text-foreground">
              Mathematical &amp; Algorithmic Provenance
            </h2>
          </div>
          <span className="text-xs font-semibold text-text-tertiary">Deterministic Model</span>
        </div>

        <ul className="space-y-2.5 text-xs text-text-secondary">
          {spotlight.reasoning.map((r, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="font-bold text-brand shrink-0">→</span>
              <span className="leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-border/60 pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">Algorithmic Confidence Score</span>
            <span className="font-num tabular-nums font-bold text-brand">{spotlight.confidence}%</span>
          </div>
          <ConfidenceMeter value={spotlight.confidence} />
          {spotlight.confidenceReason && (
            <p className="text-[11px] text-text-tertiary mt-1">{spotlight.confidenceReason}</p>
          )}
        </div>
      </section>

      {/* SECTION 3: RECONCILIATION LEDGER */}
      {spotlight.ledgerDetails && (
        <section className="rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4">
          <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2">
            <FileText size={16} className="text-brand" /> Reconciliation Evidence Ledger
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left" aria-label="Reconciliation ledger details">
              <thead className="bg-surface-alt text-[11px] font-semibold text-text-secondary uppercase">
                <tr>
                  <th scope="col" className="px-4 py-2.5">Audit Item / Ledger Metric</th>
                  <th scope="col" className="px-4 py-2.5 text-right">Recorded Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {spotlight.ledgerDetails.map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-alt/40 transition">
                    <td className="px-4 py-2.5 font-medium text-foreground">{item.label}</td>
                    <td className="px-4 py-2.5 font-num tabular-nums font-bold text-right text-text-primary">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION 4: EXECUTIVE REMEDIATION ACTION */}
      <section className="rounded-2xl border-2 border-brand/30 bg-brand/5 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-brand uppercase tracking-wider">
              Recommended Remediation
            </span>
            <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
              {spotlight.remediation.title}
            </h3>
          </div>
          {applied && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Check size={14} /> Action Dispatched
            </span>
          )}
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">
          {spotlight.remediation.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-brand/20">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              type="button"
              onClick={() => {
                const memo = `Spotlite Executive Resolution Memo:\n- Spotlight: ${spotlight.title}\n- Target Entity: ${spotlight.entityName}\n- Quantified Exposure: ${spotlight.bigValue}\n- Remediation Action: ${spotlight.remediation.title}\n- Confidence: ${spotlight.confidence}%\nStatus: Queued for CFO & Operations resolution.`;
                navigator.clipboard.writeText(memo);
                toast.success("Executive resolution memo copied to clipboard", {
                  description: "Ready to share with internal finance team or external CA.",
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-surface border border-border text-foreground hover:bg-surface-alt transition cursor-pointer"
            >
              <Copy size={13} /> Copy Audit Memo
            </motion.button>
            <motion.button
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              type="button"
              onClick={snooze}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-foreground transition cursor-pointer"
            >
              <Clock size={13} /> Defer to Q2
            </motion.button>
          </div>

          <motion.div whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}>
            <Link
              to="/spotlights/$id/apply"
              params={{ id: spotlight.id }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-xs shadow-brand hover:opacity-95 transition cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>{spotlight.remediation.actionLabel}</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
