import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { RELEVANCE_META } from "../lib/developmentsPresentation";
import type { DevelopmentRelevance } from "../types/developments";

interface RelevanceBadgeProps {
  relevance: DevelopmentRelevance | null;
  className?: string;
}

/**
 * Accessible badge indicating relevance level (High, Medium, Low).
 * Colour is carried by the icon, background tint, and border.
 * The label itself remains on the high-contrast text token (`text-text-primary`)
 * to ensure full WCAG AA compliance across both light and dark modes.
 */
export const RelevanceBadge: React.FC<RelevanceBadgeProps> = React.memo(function RelevanceBadge({
  relevance,
  className,
}) {
  if (!relevance || !RELEVANCE_META[relevance]) {
    return null;
  }

  const meta = RELEVANCE_META[relevance];
  const Icon = meta.icon;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold select-none border transition-colors cursor-help focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-1",
              meta.tint,
              meta.border,
              meta.labelColor,
              className,
            )}
          >
            <Icon className={cn("h-3.5 w-3.5 shrink-0", meta.iconColor)} aria-hidden="true" />
            <span>{meta.label}</span>
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
          {meta.description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
