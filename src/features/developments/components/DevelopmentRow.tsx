import React from "react";
import { ExternalLink, MapPin, Sparkles, Clock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { DevelopmentViewModel } from "../types/developments";
import { formatPublished, formatClosingDate, STATUS_META } from "../lib/developmentsPresentation";
import { RelevanceBadge } from "./RelevanceBadge";

interface DevelopmentRowProps {
  item: DevelopmentViewModel;
}

/**
 * Single development row in the developments feed.
 *
 * Layout:
 * - Two-column on md+ (left: ~60% col-span-3, right: ~40% col-span-2).
 * - Stacks on mobile with an inline "Implication" indicator.
 * - Memoized to prevent unnecessary re-renders in list updates.
 */
export const DevelopmentRow: React.FC<DevelopmentRowProps> = React.memo(function DevelopmentRow({
  item,
}) {
  const published = formatPublished(item.publishedAt);
  const closingFormatted = formatClosingDate(item.closingDate);
  const statusMeta = item.status ? STATUS_META[item.status] : null;

  return (
    <li className="list-none">
      <article
        aria-labelledby={`dev-title-${item.key}`}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 py-5 sm:py-6 items-start"
      >
        {/* Left Column: Development Content (~60% on md+) */}
        <div className="md:col-span-3 space-y-3">
          {/* Top row: Relevance Badge and optional chips */}
          <div className="flex flex-wrap items-center gap-2">
            <RelevanceBadge relevance={item.relevance} />

            {statusMeta && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border",
                  statusMeta.tint,
                  statusMeta.border,
                  statusMeta.labelColor,
                )}
              >
                <statusMeta.icon
                  className={cn("h-3 w-3", statusMeta.iconColor)}
                  aria-hidden="true"
                />
                <span>{statusMeta.label}</span>
              </span>
            )}

            {closingFormatted && (
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-secondary border border-border/60">
                <Clock className="h-3 w-3 text-text-tertiary" aria-hidden="true" />
                <span>Closes {closingFormatted}</span>
              </span>
            )}
          </div>

          {/* Headline */}
          <h2
            id={`dev-title-${item.key}`}
            className="font-display text-base md:text-lg font-semibold text-foreground tracking-tight leading-snug break-words"
          >
            {item.title}
          </h2>

          {/* Optional distinct detail text (null for current live duplicates) */}
          {item.detail && (
            <p className="text-sm text-text-secondary leading-relaxed break-words">{item.detail}</p>
          )}

          {/* Metadata row: Source, Published date, Location */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-tertiary pt-0.5">
            {/* Source Link */}
            {item.sourceName && (
              <span className="inline-flex items-center gap-1 font-medium">
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-text-secondary hover:text-brand transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
                  >
                    <span className="break-words">{item.sourceName}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="text-text-secondary break-words">{item.sourceName}</span>
                )}
              </span>
            )}

            {/* Published Date */}
            {published && (
              <>
                <span className="select-none text-border-c" aria-hidden="true">
                  ·
                </span>
                <time
                  dateTime={item.publishedAt ?? undefined}
                  title={published.absolute}
                  className="hover:text-text-secondary transition-colors cursor-default"
                >
                  {published.relative}
                </time>
              </>
            )}

            {/* Location */}
            {item.location && (
              <>
                <span className="select-none text-border-c" aria-hidden="true">
                  ·
                </span>
                <span className="inline-flex items-center gap-1 text-text-tertiary">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span>{item.location}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Implication Card (~40% on md+) */}
        <div className="md:col-span-2 mt-1 md:mt-0">
          <div className="rounded-xl border border-border/60 bg-surface-alt/40 p-4 space-y-2 h-full flex flex-col justify-start">
            {/* Mobile-only section label */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary uppercase tracking-wider md:hidden">
              <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              <span>Implication</span>
            </div>

            {item.implication ? (
              <p className="text-sm text-text-primary leading-relaxed break-words">
                {item.implication}
              </p>
            ) : (
              <p className="text-sm text-text-tertiary italic leading-relaxed">
                No implication was provided for this development.
              </p>
            )}
          </div>
        </div>
      </article>
    </li>
  );
});
