import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { OVERLAP_LEVEL_META } from "../presentation/industryPresentation";
import type { OverlapLevel } from "../types/industry";

interface OverlapBadgeProps {
  level: OverlapLevel;
  className?: string;
  showIcon?: boolean;
  interactive?: boolean;
}

const SEGMENT_COUNT: Record<OverlapLevel, number> = {
  "Very High": 4,
  High: 3,
  "Moderate High": 2,
  Moderate: 1,
};

const SEGMENT_COLOR: Record<OverlapLevel, string> = {
  "Very High": "bg-brand-primary",
  High: "bg-severity-low",
  "Moderate High": "bg-severity-moderate",
  Moderate: "bg-text-secondary",
};

/**
 * OverlapBadge
 *
 * Accessible badge indicating competitor overlap level:
 * - Very High (4/4 alignment)
 * - High (3/4 alignment)
 * - Moderate High (2/4 alignment)
 * - Moderate (1/4 alignment)
 *
 * Adheres strictly to DESIGN.md tokens:
 * - Zero arbitrary tailwind colors
 * - Accessible contrast across themes
 * - Meaning conveyed via both icon glyph and readable text label (not color alone)
 * - Interactive tooltip with visual alignment meter for instant executive comprehension
 */
export const OverlapBadge: React.FC<OverlapBadgeProps> = React.memo(function OverlapBadge({
  level,
  className,
  showIcon = true,
  interactive = true,
}) {
  const meta = OVERLAP_LEVEL_META[level];
  if (!meta) {
    return null;
  }

  const Icon = meta.icon;
  const segments = SEGMENT_COUNT[level] ?? 1;
  const segmentFillClass = SEGMENT_COLOR[level] ?? "bg-brand-primary";

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={interactive ? 0 : -1}
            aria-label={`${meta.label}: ${meta.description}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold select-none border transition-all duration-150 shrink-0",
              interactive
                ? "cursor-help hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-1"
                : "cursor-default",
              meta.tintClass,
              meta.borderClass,
              meta.textClass,
              className,
            )}
          >
            {showIcon && (
              <Icon className={cn("h-3.5 w-3.5 shrink-0", meta.textClass)} aria-hidden="true" />
            )}
            <span>{level}</span>
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs text-xs leading-relaxed p-3 shadow-md border border-border-c bg-surface"
        >
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="font-semibold text-text-primary text-xs">{meta.label}</span>
            <span className="font-mono text-xs font-medium text-text-tertiary">
              {segments}/4 alignment
            </span>
          </div>

          {/* Alignment Segment Meter (Delight) */}
          <div className="flex items-center gap-1 my-1.5" aria-hidden="true">
            {[1, 2, 3, 4].map((step) => {
              const filled = step <= segments;
              return (
                <div
                  key={step}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    filled ? segmentFillClass : "bg-surface-alt border border-border-c",
                  )}
                />
              );
            })}
          </div>

          <p className="text-text-secondary text-xs leading-normal mt-1">{meta.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
