import { useState } from "react";
import { formatINR } from "@/shared/lib/format";
import type { AnomalyRiskResponse } from "../types/intelligence";
import {
  AlertTriangle,
  Copy,
  Check,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AnomaliesOutliersSectionProps {
  data: AnomalyRiskResponse;
  className?: string;
}

export function AnomaliesOutliersSection({
  data,
  className,
}: AnomaliesOutliersSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const handleCopyRef = (ref?: string | null) => {
    if (!ref) return;
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 1600);
  };

  if (!data) return null;

  const {
    statistical_outliers = [],
    duplicate_transactions = [],
    total_outliers_found = 0,
    total_duplicates_found = 0,
  } = data;

  const totalAnomalies = total_outliers_found + total_duplicates_found;
  const INITIAL_LIMIT = 3;

  const initialOutliers = statistical_outliers.slice(0, INITIAL_LIMIT);
  const remainingOutliers = statistical_outliers.slice(INITIAL_LIMIT);

  const initialDuplicates = duplicate_transactions.slice(0, INITIAL_LIMIT);
  const remainingDuplicates = duplicate_transactions.slice(INITIAL_LIMIT);

  const hasMore = totalAnomalies > INITIAL_LIMIT * 2;

  const renderOutlierCard = (item: (typeof statistical_outliers)[number], idx: number) => {
    const zVal = parseFloat(item.z_score.replace(/[^0-9.]/g, "")) || 0;
    const isHighSeverity = zVal >= 3.0;

    return (
      <div
        key={`${item.transaction_date}-${item.amount}-${idx}`}
        className="p-3 rounded-xl bg-surface-alt/60 border border-border/50 space-y-1.5 hover:bg-surface-alt transition-colors"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-foreground truncate" title={item.narration_snippet}>
              {item.narration_snippet}
            </p>
            <p className="font-mono text-[11px] text-text-secondary mt-0.5">
              {item.transaction_date} · {item.domain_category}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-num text-xs sm:text-sm font-bold text-foreground tabular-nums block">
              {formatINR(item.amount)}
            </span>
            <span
              className={cn(
                "inline-flex items-center font-mono text-[11px] font-bold tabular-nums px-1.5 py-0.5 rounded-md border mt-0.5",
                isHighSeverity
                  ? "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
              )}
            >
              {item.z_score}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-border/40 text-text-secondary">
          <span className="font-mono">
            Cat. Avg: <span className="font-num font-medium text-foreground tabular-nums">{formatINR(item.category_average_spend)}</span>
          </span>
          <span className="font-medium text-foreground truncate ml-2 max-w-[55%]">
            {item.assessment}
          </span>
        </div>
      </div>
    );
  };

  const renderDuplicateCard = (dup: (typeof duplicate_transactions)[number], idx: number) => (
    <div
      key={`${dup.transaction_date}-${dup.amount}-${idx}`}
      className="p-3 rounded-xl bg-surface-alt/60 border border-border/50 space-y-1.5 hover:bg-surface-alt transition-colors"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-foreground truncate flex-1 min-w-0" title={dup.narration}>
          {dup.narration}
        </p>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20 shrink-0">
          {dup.duplicate_count}x identical
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] text-text-secondary pt-1.5 border-t border-border/40">
        <div className="flex items-center gap-1.5 font-mono min-w-0">
          <span className="shrink-0">{dup.transaction_date}</span>
          <span className="text-text-secondary/50">·</span>
          {dup.reference_number ? (
            <button
              type="button"
              onClick={() => handleCopyRef(dup.reference_number)}
              className="inline-flex items-center gap-1 text-foreground hover:text-brand transition-colors group/ref cursor-pointer truncate"
              title="Click to copy reference ID / UTR"
              aria-label={`Copy reference ${dup.reference_number}`}
            >
              <span className="truncate">{dup.reference_number}</span>
              {copiedRef === dup.reference_number ? (
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Copy className="h-3 w-3 text-text-secondary/50 group-hover/ref:text-brand shrink-0" />
              )}
            </button>
          ) : (
            <span className="truncate">Direct Debit</span>
          )}
        </div>
        <span className="font-num text-xs sm:text-sm font-bold text-foreground tabular-nums shrink-0 ml-2">
          {formatINR(dup.amount)}
        </span>
      </div>
    </div>
  );

  return (
    <section className={cn("space-y-4", className)} aria-labelledby="anomalies-heading">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <div className="flex items-center gap-2">
            <h2
              id="anomalies-heading"
              className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground text-balance"
            >
              Risk Signals, Anomalies & Outliers
            </h2>
            {totalAnomalies > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-pill bg-rose-500/10 text-rose-700 dark:text-rose-400 px-2 py-0.5 font-mono text-[11px] font-bold border border-rose-500/20">
                <AlertTriangle className="h-3 w-3" /> {totalAnomalies} flagged
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-pill bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 font-mono text-[11px] font-semibold border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3" /> Clean
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5 leading-relaxed max-w-2xl">
            Statistical spend anomalies (&gt;2.0σ variance) and suspected duplicate debits.
          </p>
        </div>
      </div>

      {totalAnomalies === 0 ? (
        <div className="card-spot p-8 sm:p-10 rounded-2xl text-center flex flex-col items-center justify-center space-y-3 border-emerald-500/20 bg-emerald-500/[0.02]">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 ring-4 ring-emerald-500/10 shadow-xs">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">
              Ledger Integrity Verified
            </h3>
            <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
              All debit transactions conform to expected statistical category distributions with zero duplicate payment collisions across statement records.
            </p>
          </div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-surface border border-border/70 text-xs font-mono text-text-secondary shadow-xs mt-1">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <Check className="h-3 w-3" /> 0 Outliers (&gt;2.0σ)
            </span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <Check className="h-3 w-3" /> 0 Duplicate Collisions
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          {/* Sub-section 1: Statistical Category Outliers */}
          <div className="card-spot p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-3 h-full">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">Statistical Spend Outliers</h3>
                </div>
                <span className="font-mono text-[11px] font-medium text-text-secondary tabular-nums">
                  {total_outliers_found} outliers
                </span>
              </div>

              {statistical_outliers.length === 0 ? (
                <p className="text-xs text-text-secondary text-center py-6 flex-1 flex items-center justify-center">No statistical outliers flagged.</p>
              ) : (
                <div className="space-y-2">
                  {initialOutliers.map((item, idx) => renderOutlierCard(item, idx))}

                  <AnimatePresence initial={false}>
                    {isExpanded && remainingOutliers.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-2 overflow-hidden"
                      >
                        {remainingOutliers.map((item, idx) => renderOutlierCard(item, idx + INITIAL_LIMIT))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Sub-section 2: Suspected Duplicate Transactions */}
          <div className="card-spot p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-3 h-full">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Copy className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">Duplicate Debits</h3>
                </div>
                <span className="font-mono text-[11px] font-medium text-text-secondary tabular-nums">
                  {total_duplicates_found} duplicates
                </span>
              </div>

              {duplicate_transactions.length === 0 ? (
                <p className="text-xs text-text-secondary text-center py-6 flex-1 flex items-center justify-center">No duplicate transactions detected.</p>
              ) : (
                <div className="space-y-2">
                  {initialDuplicates.map((dup, idx) => renderDuplicateCard(dup, idx))}

                  <AnimatePresence initial={false}>
                    {isExpanded && remainingDuplicates.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-2 overflow-hidden"
                      >
                        {remainingDuplicates.map((dup, idx) => renderDuplicateCard(dup, idx + INITIAL_LIMIT))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accordion expand toggle for larger anomaly counts */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-pill border border-border/70 bg-surface text-xs font-semibold text-text-secondary hover:text-foreground hover:bg-surface-alt hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer shadow-xs"
          >
            <span>{isExpanded ? "Show fewer anomalies" : `Show all ${totalAnomalies} flagged anomalies`}</span>
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-250 ease-out", isExpanded && "rotate-180")} />
          </button>
        </div>
      )}
    </section>
  );
}
