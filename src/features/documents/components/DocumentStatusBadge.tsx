import { CheckCircle2, Clock, Loader2, Minus, XCircle, type LucideIcon } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { DocumentRowState, DocumentRowStatus } from "../lib/documentStatus";

export interface DocumentStatusBadgeProps {
  state: DocumentRowState;
  className?: string;
}

/**
 * Accessibility note on the colour treatment.
 *
 * State colour is carried by the icon, the background tint and the border; the
 * label itself stays on a high-contrast text token. The alternative — colouring
 * the label — cannot reach WCAG AA at this size with the existing palette:
 * `--severity-moderate` (#F59E0B) is 2.15:1 on white and `--destructive`
 * (#EF4444) is 3.75:1, both short of 4.5:1 for an 11px label. Introducing
 * darkened variants would mean new theme tokens, which is out of scope, so the
 * signal is redundant across icon + shape + tint instead and every state keeps a
 * readable label.
 */
const STATUS_STYLES: Record<
  DocumentRowStatus,
  { icon: LucideIcon; tint: string; iconColor: string; labelColor: string; spin?: boolean }
> = {
  not_uploaded: {
    icon: Minus,
    tint: "bg-surface-alt border-border-c",
    iconColor: "text-text-secondary",
    labelColor: "text-text-secondary",
  },
  uploading: {
    icon: Loader2,
    tint: "bg-brand/8 border-brand/25",
    iconColor: "text-brand",
    labelColor: "text-text-primary",
    spin: true,
  },
  pending_review: {
    icon: Clock,
    tint: "bg-brand/8 border-brand/25",
    iconColor: "text-brand",
    labelColor: "text-text-primary",
  },
  verified: {
    icon: CheckCircle2,
    tint: "bg-success/10 border-success/25",
    iconColor: "text-success",
    labelColor: "text-text-primary",
  },
  rejected: {
    icon: XCircle,
    tint: "bg-destructive/10 border-destructive/30",
    iconColor: "text-destructive",
    labelColor: "text-text-primary",
  },
};

export function DocumentStatusBadge({ state, className }: DocumentStatusBadgeProps) {
  if (state.status === "not_uploaded") {
    return null;
  }

  if (state.status === "pending_review") {
    return (
      <span title="Uploaded" className="inline-flex items-center">
        <CheckCircle2
          className={cn("h-4 w-4 text-emerald-700 dark:text-emerald-500", className)}
        />
      </span>
    );
  }

  const style = STATUS_STYLES[state.status];
  const Icon = style.icon;

  return (
    <Badge
      variant="outline"
      title={state.hint}
      className={cn(
        "text-[11px] font-semibold gap-1 shrink-0 select-none",
        style.tint,
        style.labelColor,
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn("h-3 w-3", style.iconColor, style.spin && "animate-spin")}
      />
      {state.label}
    </Badge>
  );
}
