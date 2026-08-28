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
    return (
      <Badge
        variant="outline"
        title={sourceStatus ?? "Required"}
        className={cn(
          "text-[11px] font-semibold gap-1 shrink-0 select-none",
          "bg-brand/10 text-brand border-brand/30",
          className,
        )}
      >
        <span className="text-destructive font-bold text-xs leading-none">*</span>
        Required
      </Badge>
    );
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
