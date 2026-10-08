import { Skeleton } from "@/shared/components/ui/skeleton";

export function SpendingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading spending data">
      {/* Agent narration bar skeleton */}
      <div className="h-12 w-full rounded-2xl bg-surface-alt/60 border border-border/60" />

      {/* Two-column overview cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Donut Card Skeleton */}
        <div className="card-spot p-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          {/* Circular donut placeholder */}
          <div className="relative flex items-center justify-center my-2">
            <div className="h-48 w-48 rounded-full border-[22px] border-surface-alt flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          </div>
          {/* Legend 2-column grid */}
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2 mt-4 pt-3 border-t border-border/40">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full shrink-0" />
                <Skeleton className="h-3 flex-1" />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Merchants Skeleton */}
        <div className="card-spot p-5">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <div className="space-y-3 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-3 w-4" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="hidden md:block h-1.5 w-20 rounded-full" />
              </div>
            ))}
          </div>
          <div className="mt-6 h-16 rounded-2xl bg-surface-alt/50 border border-border/40" />
        </div>
      </div>

      {/* Categories Grid Skeleton */}
      <div>
        <Skeleton className="h-5 w-28 mb-3" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card-spot flex flex-col gap-2.5 p-4">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend Skeleton */}
      <div className="card-spot p-5">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <div className="flex h-36 items-end gap-3 mt-4 px-2">
          {[40, 65, 30, 80, 55, 90, 70, 85].map((heightPct, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <Skeleton
                className="w-full rounded-t-md"
                style={{ height: `${heightPct}%` }}
              />
              <Skeleton className="h-2 w-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
