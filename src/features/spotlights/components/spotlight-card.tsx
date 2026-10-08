import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Lightbulb } from "lucide-react";
import type { Severity, Spotlight } from "@/shared/data/rohan";
import { cn } from "@/shared/lib/utils";
import { IconChip } from "@/shared/lib/icons";
import { ConfidenceMeter } from "@/features/agents/components/agent-narration";
import { evidenceBase } from "@/shared/data/agentic";
import { useAppSelector } from "@/shared/store";
import { selectIsApplied } from "@/shared/store/selectors";

const sevMap: Record<Severity, { dot: string; label: string; text: string }> = {
  high: { dot: "bg-severity-high", label: "High", text: "text-severity-high" },
  moderate: { dot: "bg-severity-moderate", label: "Moderate", text: "text-severity-moderate" },
  low: { dot: "bg-severity-low", label: "Low", text: "text-severity-low" },
};

/** Tiny "● High" severity accent, used instead of loud colored borders. */
export function SeverityBadge({ severity }: { severity: Severity }) {
  const s = sevMap[severity];
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-text-secondary">
      <span className={cn("h-2 w-2 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

function MiniSeries({ series }: { series: { label: string; value: number }[] }) {
  const max = Math.max(...series.map((s) => s.value), 1);
  return (
    <div className="flex items-end gap-2">
      {series.map((p, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-md bg-brand/80"
            style={{ height: `${Math.max(12, (p.value / max) * 44)}px` }}
          />
          <span className="text-[10px] text-text-secondary">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * One Spotlight in the feed: big number first, a single sentence, a tiny
 * severity dot, and reasoning tucked behind a "Why?" disclosure.
 */
export function SpotlightCard({ spotlight }: { spotlight: Spotlight }) {
  const applied = useAppSelector(selectIsApplied(spotlight.id));
  const [open, setOpen] = useState(false);
  const confidence =
    spotlight.confidence ??
    (spotlight.severity === "high" ? 94 : spotlight.severity === "moderate" ? 82 : 68);
  const action = spotlight.amountLabel === "could-earn" ? "Apply" : "Fix";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("card-spot p-5 transition hover:shadow-e2", applied && "opacity-80")}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <IconChip keyName={spotlight.id} size="md" />
          <p className="text-sm font-medium text-text-secondary">{spotlight.product}</p>
        </div>
        <SeverityBadge severity={spotlight.severity} />
      </div>

      <p className="mt-3 font-display text-4xl font-bold leading-none text-text-primary font-num">
        {spotlight.bigValue}
      </p>
      <p className="mt-1.5 text-xs uppercase tracking-wider text-text-secondary">
        {spotlight.bigCaption}
      </p>

      <p className="mt-3 text-sm leading-snug text-text-primary text-balance">
        {spotlight.oneLiner}
      </p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="why"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 rounded-xl bg-surface-alt/70 p-4">
              <ul className="space-y-1.5">
                {spotlight.signals.map((sig, i) => (
                  <li key={i} className="flex gap-2 text-xs text-text-secondary">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-text-secondary">
                Reasoned from{" "}
                <span className="font-num font-semibold text-text-primary">
                  {evidenceBase.transactions.toLocaleString("en-IN")}
                </span>{" "}
                transactions, {evidenceBase.banks} banks, {evidenceBase.months} months.
              </p>
              {spotlight.miniSeries && <MiniSeries series={spotlight.miniSeries} />}
              <ConfidenceMeter value={confidence} />
              {spotlight.confidenceReason && (
                <p className="text-[11px] text-text-secondary">{spotlight.confidenceReason}</p>
              )}
              {spotlight.insight && (
                <p className="flex items-start gap-2 rounded-lg tint-brand px-3 py-2 text-xs text-text-primary">
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" />
                  {spotlight.insight}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        {applied ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
            <Check className="h-3.5 w-3.5" /> Applied
          </span>
        ) : (
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary transition hover:text-text-primary"
          >
            <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} />
            {open ? "Hide reasoning" : "Why?"}
          </button>
        )}
        {!applied && (
          <Link
            to="/spotlights/$id/apply"
            params={{ id: spotlight.id }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand transition hover:gap-1.5"
          >
            {action} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
