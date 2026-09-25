import { Loader2, Package as PackageIcon } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";

export interface PackageCardSkeletonProps {
  packageName?: string;
  className?: string;
}

export function PackageCardSkeleton({ packageName, className }: PackageCardSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand/30 bg-surface/80 p-5 shadow-xs transition-all space-y-4 animate-pulse",
        className,
      )}
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand border border-brand/20">
            <PackageIcon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {packageName ? (
                <h3 className="font-bold text-base text-text-primary tracking-tight truncate">
                  {packageName}
                </h3>
              ) : (
                <Skeleton className="h-6 w-44 rounded-md" />
              )}

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-xs font-medium border border-brand/20">
                <Loader2 className="h-3 w-3 animate-spin text-brand" />
                <span>Syncing package…</span>
              </span>
            </div>
            <p className="text-[11px] text-text-tertiary mt-0.5">
              Updating vault with new package data…
            </p>
          </div>
        </div>

        {/* Action Controls Skeleton */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      {/* Document placeholders mimicking PackageCard body */}
      <div className="pt-2 border-t border-border/40 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-surface/50">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
            <div className="space-y-1.5 flex-1 min-w-0">
              <Skeleton className="h-3.5 w-48 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full shrink-0" />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-surface/50">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
            <div className="space-y-1.5 flex-1 min-w-0">
              <Skeleton className="h-3.5 w-36 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-3 w-14 rounded" />
              </div>
            </div>
            <Skeleton className="h-5 w-16 rounded-full shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
