import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { DocumentRequirement } from "../lib/documentTaxonomy";

export interface DocumentRequirementBadgeProps {
  requirement: DocumentRequirement;
  /** The source document's verbatim status, surfaced as a tooltip for auditability. */
  sourceStatus?: string | null;
  className?: string;
}

/**
 * Required reads as a badge; Optional reads as a quiet indicator. The asymmetry is
 * deliberate — Required is the only status that blocks completion, so it is the
 * only one that earns visual weight. Most of the taxonomy is Optional, and giving
 * 70 rows an equally loud badge would flatten the signal.
 */
export function DocumentRequirementBadge({
  requirement,
  sourceStatus,
  className,
}: DocumentRequirementBadgeProps) {
  if (requirement === "required") {
    return null;
  }

  return (
    <span
      title={sourceStatus ?? "Optional"}
      className={cn(
        "text-[11px] font-medium text-text-secondary/90 px-2 py-0.5 rounded-md bg-surface-alt/60 border border-border/50 shrink-0 select-none",
        className,
      )}
    >
      Optional
    </span>
  );
}
