import React, { useState, useCallback } from "react";
import { Building2, Info, Copy, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { AnchorViewModel } from "../types/industry";

interface AnchorSummaryProps {
  anchor?: AnchorViewModel | null;
  className?: string;
}

/**
 * AnchorSummary
 *
 * Slim context bar placed directly above the competitor list.
 * Identifies the anchor tenant company (e.g. VL ACCESS INDIA PRIVATE LIMITED).
 *
 * Adheres strictly to the specification:
 * - Company name
 * - Industry
 * - One-line description
 * - "Unlisted" status chip
 * - CIN with interactive one-click copy affordance
 * - Reason for no financials ("Financials unavailable: unlisted private company")
 * - NO NUMBERS (the anchor company is unlisted and has no public numbers)
 */
export const AnchorSummary: React.FC<AnchorSummaryProps> = React.memo(function AnchorSummary({
  anchor,
  className,
}) {
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

  const listingLabel =
    anchor.listingStatus === "unlisted"
      ? "Unlisted"
      : anchor.listingStatus === "listed"
        ? "Listed"
        : anchor.listingStatus;

  // Reason copy: either formatted reasonDisplay or default
  const reasonText = anchor.reasonDisplay
    ? anchor.reasonDisplay.replace(/\.$/, "")
    : "unlisted private company";

  return (
    <section
      aria-label="Anchor Company Context"
      className={cn(
        "rounded-xl border border-border-c bg-surface p-4 sm:p-5 shadow-2xs space-y-3 transition-shadow duration-200 hover:shadow-xs",
        className,
      )}
    >
      {/* Top row: Company identification, chips & CIN */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-2xs">
            <Building2 className="h-4 w-4" aria-hidden="true" />
          </div>

          <h2 className="font-display text-base font-bold text-text-primary tracking-tight">
            {anchor.companyName}
          </h2>

          {/* Status Chip: Unlisted */}
          <span className="inline-flex items-center rounded-full bg-surface-alt border border-border-c px-2.5 py-0.5 text-xs font-medium text-text-secondary">
            {listingLabel}
          </span>

          {/* Industry Tag */}
          {anchor.industry && (
            <span className="inline-flex items-center rounded-full bg-brand-primary/5 border border-brand-primary/20 px-2.5 py-0.5 text-xs font-medium text-brand-primary">
              {anchor.industry}
            </span>
          )}
        </div>

        {/* CIN Identifier with interactive quick-copy */}
        {anchor.cin && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-mono text-text-tertiary tracking-wider select-all">
              CIN: {anchor.cin}
            </span>
            <button
              type="button"
              onClick={handleCopyCin}
              aria-label={`Copy CIN ${anchor.cin}`}
              title="Copy CIN to clipboard"
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-mono text-text-tertiary hover:text-text-primary hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {copiedCin ? (
                <>
                  <Check className="h-3 w-3 text-severity-low" aria-hidden="true" />
                  <span className="text-severity-low font-medium text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" aria-hidden="true" />
                  <span className="sr-only">Copy CIN</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Middle row: One-line business description */}
      {anchor.description && (
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-4xl">
          {anchor.description}
        </p>
      )}

      {/* Bottom callout: Notice regarding unlisted financials (Zero numbers) */}
      <div className="flex items-center gap-2 rounded-lg bg-surface-alt/60 border border-border-c/60 px-3 py-1.5 text-xs text-text-secondary">
        <Info className="h-3.5 w-3.5 text-text-tertiary shrink-0" aria-hidden="true" />
        <span className="leading-normal">
          <strong className="font-semibold text-text-primary">Financials unavailable:</strong>{" "}
          {reasonText}
        </span>
      </div>
    </section>
  );
});
