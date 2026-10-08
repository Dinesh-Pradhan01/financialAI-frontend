import React, { useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { CompetitorRowViewModel } from "../types/industry";
import { OverlapBadge } from "./OverlapBadge";
import { companyFinancialsQueryOptions } from "../hooks/useCompanyFinancials";

interface CompetitorRowProps {
  item: CompetitorRowViewModel;
  className?: string;
}

/**
 * CompetitorRow
 *
 * Table row representing a single competitor in the Industry View list.
 *
 * Interaction & Accessibility Rules:
 * - When `hasFinancials: true`:
 *   - Stretched link on company name making entire row clickable.
 *   - Hover tint (`hover:bg-surface-alt/60`) and focus-within ring.
 *   - Trailing `ChevronRight` (aria-hidden).
 *   - Accessible name: "View financials for {companyName}".
 *   - Query prefetch on hover/focus for instantaneous navigation.
 * - When `hasFinancials: false` (e.g. Allied Digital):
 *   - Muted text colors.
 *   - Unclickable (no link, cursor-default).
 *   - "Financials unavailable" badge tag.
 *   - No trailing chevron.
 */
export const CompetitorRow: React.FC<CompetitorRowProps> = React.memo(function CompetitorRow({
  item,
  className,
}) {
  const queryClient = useQueryClient();

  const handlePrefetch = useCallback(() => {
    if (item.hasFinancials && item.companyId) {
      queryClient.prefetchQuery(companyFinancialsQueryOptions(item.companyId));
    }
  }, [item.hasFinancials, item.companyId, queryClient]);

  return (
    <tr
      className={cn(
        "relative border-b border-border-c transition-colors duration-150 motion-reduce:transition-none",
        item.hasFinancials
          ? "group hover:bg-surface-alt/70 focus-within:bg-surface-alt/70 focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-inset"
          : "bg-surface-alt/25 cursor-default opacity-85",
        className,
      )}
    >
      {/* 1. Company Name & Ticker */}
      <th scope="row" className="py-4 px-4 sm:px-6 align-top font-normal text-left">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            {item.hasFinancials ? (
              <Link
                to={item.href as string}
                preload="intent"
                onMouseEnter={handlePrefetch}
                onFocus={handlePrefetch}
                aria-label={`View financials for ${item.companyName}`}
                className="font-display font-semibold text-sm sm:text-base text-text-primary group-hover:text-brand-primary transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 after:absolute after:inset-0 rounded-xs"
              >
                {item.companyName}
              </Link>
            ) : (
              <span className="font-display font-semibold text-sm sm:text-base text-text-secondary select-none">
                {item.companyName}
              </span>
            )}

            {item.ticker && (
              <span className="inline-flex items-center rounded-sm bg-surface-alt border border-border-c px-2 py-0.5 font-mono text-xs font-semibold text-text-secondary uppercase tracking-wider">
                {item.ticker}
              </span>
            )}
          </div>

          {/* Status notice when financials are missing */}
          {!item.hasFinancials && (
            <div className="pt-0.5">
              <span className="inline-flex items-center rounded-full bg-surface-alt border border-border-c px-2 py-0.5 text-xs text-text-tertiary font-medium">
                Financials unavailable
              </span>
            </div>
          )}
        </div>
      </th>

      {/* 2. Overlap Level Badge */}
      <td className="py-4 px-3 sm:px-4 align-top whitespace-nowrap">
        <div className="relative z-10 inline-block">
          <OverlapBadge level={item.overlapLevel} interactive={!item.hasFinancials} />
        </div>
      </td>

      {/* 3. Overlap Overview / Summary */}
      <td className="py-4 px-4 sm:px-6 align-top">
        <p
          className={cn(
            "text-xs sm:text-sm leading-relaxed max-w-2xl",
            item.hasFinancials ? "text-text-secondary" : "text-text-tertiary",
          )}
        >
          {item.overlapSummary}
        </p>
      </td>

      {/* 4. Trailing Action / Chevron */}
      <td className="py-4 px-4 sm:px-6 align-top text-right whitespace-nowrap w-12">
        {item.hasFinancials ? (
          <div className="flex items-center justify-end h-full pt-1">
            <ChevronRight
              className="h-4 w-4 text-text-tertiary group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-150 motion-reduce:group-hover:translate-x-0 motion-reduce:transition-none shrink-0"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </td>
    </tr>
  );
});
