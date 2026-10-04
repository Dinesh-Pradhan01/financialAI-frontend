import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { LOADING_STAGES } from "../lib/developmentsPresentation";

/**
 * Skeleton loader for developments feed.
 *
 * Mirrors the exact two-column layout of DevelopmentRow.
 * Features a polite screen-reader status announcement that cycles through
 * non-synthetic loading progression stages as latency increases.
 */
export const DevelopmentsSkeleton: React.FC = () => {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LOADING_STAGES.forEach((stage, idx) => {
      if (idx > 0 && stage.afterMs > 0) {
        const t = setTimeout(() => {
          setStageIndex(idx);
        }, stage.afterMs);
        timers.push(t);
      }
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const currentStageText = LOADING_STAGES[stageIndex]?.text ?? LOADING_STAGES[0].text;

  return (
    <div aria-busy="true" aria-label="Loading developments" className="space-y-6">
      {/* Live Narrative Status Announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="flex items-center gap-2.5 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-xs text-text-secondary"
      >
        <Loader2 className="h-4 w-4 animate-spin text-brand shrink-0" aria-hidden="true" />
        <span className="font-medium text-text-primary">{currentStageText}</span>
      </div>

      {/* Column Headers Skeleton (desktop only) */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 pb-2 border-b border-border/60">
        <div className="md:col-span-3">
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="md:col-span-2">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* 3 Skeleton Rows */}
      <div className="divide-y divide-border/60">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 py-5 sm:py-6 items-start"
          >
            {/* Left Column Skeleton (~60%) */}
            <div className="md:col-span-3 space-y-3">
              <Skeleton className="h-5 w-28 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-11/12" />
                <Skeleton className="h-5 w-4/5" />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>

            {/* Right Column Skeleton (~40%) */}
            <div className="md:col-span-2">
              <div className="rounded-xl border border-border/60 bg-surface-alt/40 p-4 space-y-2.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
