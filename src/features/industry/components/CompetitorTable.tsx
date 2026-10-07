import React, { useMemo } from "react";
import { Info } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { CompetitorRowViewModel } from "../types/industry";
import { CompetitorRow } from "./CompetitorRow";

interface CompetitorTableProps {
  competitors: CompetitorRowViewModel[];
  generatedAt?: string | null;
  className?: string;
}

/**
 * Formats a raw timestamp or ISO string into a concise human-readable date.
 */
function formatProvenanceDate(dateStr?: string | null): string {
  if (!dateStr) return "recently";
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return dateStr;
  }
}

/**
 * CompetitorTable
 *
 * Semantic, accessible table presenting peer competitors sorted by overlap rank.
 *
 * Specification:
 * - Semantic <table> with accessible <caption>
 * - Column headers with scope="col" (Company, Overlap, Overview, Actions)
 * - Horizontal overflow container to protect layout on narrower viewports
 * - Sorted by overlapRank ascending
 * - Provenance footnote displaying overlap_source and generated_at
 */
export const CompetitorTable: React.FC<CompetitorTableProps> = React.memo(function CompetitorTable({
  competitors,
  generatedAt,
  className,
}) {
  // Ensure sorted order by overlapRank
  const sortedCompetitors = useMemo(() => {
    return [...competitors].sort((a, b) => a.overlapRank - b.overlapRank);
  }, [competitors]);

  // Derive provenance source summary
  const sourceLabel = useMemo(() => {
    const sources = Array.from(
      new Set(
        sortedCompetitors
          .map((c) => c.overlapSource)
          .filter((s): s is NonNullable<typeof s> => Boolean(s && s.trim())),
      ),
    );
    if (sources.length === 0) return "Curated Analysis";
    return sources
      .map((s) => s.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase()))
      .join(", ");
  }, [sortedCompetitors]);

  const formattedGeneratedAt = formatProvenanceDate(generatedAt);

  return (
    <div className={cn("space-y-3", className)}>
      {/* Table Scope Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Ranked Peers
          </span>
          <span className="inline-flex items-center rounded-full bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 text-xs font-semibold text-brand-primary font-mono">
            {sortedCompetitors.length} Companies
          </span>
        </div>

        <div className="text-xs text-text-tertiary hidden sm:flex items-center gap-1.5">
          <span>Select any row to view complete financial statements</span>
        </div>
      </div>

      {/* Table Container with native horizontal scroll */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Competitor comparison table"
        className="overflow-x-auto rounded-xl border border-border-c bg-surface shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        <table className="w-full text-left border-collapse min-w-2xl">
          <caption className="sr-only">
            Competitors and peer overlap analysis ranked by business alignment
          </caption>

          <thead>
            <tr className="border-b border-border-c bg-surface-alt/50">
              <th
                scope="col"
                className="py-3 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary w-1/3"
              >
                Company
              </th>
              <th
                scope="col"
                className="py-3 px-3 sm:px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary w-1/6"
              >
                Overlap
              </th>
              <th
                scope="col"
                className="py-3 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary w-1/2"
              >
                Overview
              </th>
              <th scope="col" aria-label="Actions" className="py-3 px-4 sm:px-6 text-right w-12">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border-c">
            {sortedCompetitors.map((item) => (
              <CompetitorRow key={item.companyId ?? item.companyName} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Provenance Footnote */}
      <footer className="flex items-center gap-2 px-1 text-xs text-text-tertiary">
        <Info className="h-3.5 w-3.5 shrink-0 text-text-tertiary" aria-hidden="true" />
        <span>
          Source: <strong className="font-medium text-text-secondary">{sourceLabel}</strong> ·
          Generated on {formattedGeneratedAt}
        </span>
      </footer>
    </div>
  );
});
