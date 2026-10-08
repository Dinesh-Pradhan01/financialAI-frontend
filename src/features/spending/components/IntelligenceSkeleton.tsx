import { Skeleton } from "@/shared/components/ui/skeleton";
import { Sparkles, Loader2 } from "lucide-react";

export function IntelligenceSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 mt-4" aria-busy="true" aria-label="Synthesizing financial intelligence data">
      {/* Informative Synthesis Banner */}
      <div className="card-spot p-4 sm:p-5 rounded-2xl border border-brand/20 bg-brand/[0.03] dark:bg-brand/[0.06] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shrink-0">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-foreground tracking-tight">
              Synthesizing Multi-Statement Financial Intelligence…
            </p>
            <p className="text-[11px] sm:text-xs text-text-secondary mt-0.5 leading-normal">
              Aggregating multi-account cash flow velocity, liquidity runways, and payment settlement rails.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-brand font-medium shrink-0">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Crunching statements</span>
        </div>
      </div>

      {/* Header Metadata Skeleton */}
      <div className="card-spot p-5 rounded-2xl border border-border/80 animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-28 rounded-xl" />
            <Skeleton className="h-8 w-28 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Executive Summary Scorecard Grid Skeleton */}
      <div>
        <Skeleton className="h-5 w-44 mb-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card-spot p-4 flex flex-col justify-between space-y-3 rounded-2xl">
              <div className="space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          ))}
        </div>
      </div>

      {/* Macro Cash Flow Skeleton (Combo Chart + KPI Strip) */}
      <div className="card-spot p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Chart area */}
        <div className="h-64 rounded-xl bg-surface-alt/40 flex items-end justify-between p-4 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full flex items-end justify-center gap-1 h-3/4">
                <Skeleton className="w-1/3 h-4/5 rounded-t" />
                <Skeleton className="w-1/3 h-3/5 rounded-t" />
              </div>
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5 pt-4 border-t border-border/50">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1 p-2">
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Channel Distribution Skeleton */}
      <div className="card-spot p-5 rounded-2xl">
        <Skeleton className="h-5 w-48 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3.5 w-28" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
