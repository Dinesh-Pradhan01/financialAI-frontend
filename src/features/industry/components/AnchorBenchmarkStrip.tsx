import React, { useState, useCallback } from "react";
import { Building2, Layers, Copy, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { AnchorViewModel, OverlapLevel } from "../types/industry";
import { OverlapBadge } from "./OverlapBadge";

interface AnchorBenchmarkStripProps {
  anchor?: AnchorViewModel;
  competitorName: string;
  ticker?: string | null;
  overlapLevel?: OverlapLevel | null;
  overlapRank?: number | null;
  totalCompetitors?: number;
  className?: string;
}

/**
 * AnchorBenchmarkStrip
 *
 * Persistent comparative benchmark context rendered at the top of the
 * competitor financials view (/industry/$companyId).
 *
 * Resolves the primary heuristic gap (Recognition Rather Than Recall):
 * Keeps the anchor tenant's operating identity, sector, and comparative alignment
 * anchored on-screen so executives never have to retain baseline numbers in working memory.
 */
export const AnchorBenchmarkStrip: React.FC<AnchorBenchmarkStripProps> = ({
  anchor,
  competitorName,
  ticker,
  overlapLevel,
  overlapRank,
  totalCompetitors,
  className,
}) => {
  const [copiedCin, setCopiedCin] = useState(false);

  const handleCopyCin = useCallback(() => {
    if (anchor?.cin && typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(anchor.cin).then(() => {
        setCopiedCin(true);
        setTimeout(() => setCopiedCin(false), 2000);
      });
    }
  }, [anchor?.cin]);

  if (!anchor) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Comparative benchmark baseline"
      className={cn(
        "rounded-xl border border-border-c bg-surface-alt/40 p-3.5 sm:p-4 shadow-2xs space-y-3",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Anchor Identity */}
        <div className="flex items-start sm:items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-border-c text-brand-primary shadow-2xs">
            <Building2 className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                Your Company · Benchmark Baseline
              </span>
              {anchor.cin && (
                <div className="flex items-center gap-1 border-l border-border-c pl-2">
                  <span className="font-mono text-xs text-text-tertiary select-all">
                    CIN: {anchor.cin}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCin}
                    aria-label={`Copy CIN ${anchor.cin}`}
                    title="Copy CIN to clipboard"
                    className="inline-flex items-center rounded px-1 py-0.5 text-xs text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer"
                  >
                    {copiedCin ? (
                      <Check className="h-3 w-3 text-severity-low" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3 w-3" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}
            </div>
            <p className="font-display text-sm font-bold text-text-primary truncate">
              {anchor.companyName}
            </p>
          </div>
        </div>

        {/* Alignment summary */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
          {overlapLevel && <OverlapBadge level={overlapLevel} />}
          {overlapRank != null && (
            <span className="inline-flex items-center rounded-full bg-surface border border-border-c px-2.5 py-0.5 text-xs font-medium text-text-secondary">
              Rank #{overlapRank}
              {totalCompetitors ? ` of ${totalCompetitors}` : ""}
            </span>
          )}
        </div>
      </div>

      {/* Comparative Context Subtext */}
      <div className="border-t border-border-c/60 pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-secondary leading-relaxed">
        <p className="flex items-center gap-1.5 min-w-0">
          <Layers className="h-3.5 w-3.5 shrink-0 text-text-tertiary" aria-hidden="true" />
          <span>
            Benchmarking <strong className="text-text-primary font-medium">{competitorName}</strong>
            {ticker ? ` (${ticker})` : ""} against your baseline in{" "}
            <span className="text-text-primary">{anchor.industry}</span>.
          </span>
        </p>
        <span className="text-text-tertiary shrink-0">
          {anchor.listingStatus === "unlisted"
            ? "Anchor is unlisted private entity"
            : "Anchor company"}
        </span>
      </div>
    </aside>
  );
};
