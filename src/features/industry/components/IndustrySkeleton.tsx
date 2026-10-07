import React from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface IndustrySkeletonProps {
  className?: string;
}

/**
 * IndustrySkeleton
 *
 * Tabular skeleton loader for Industry View.
 * Matches the layout of AnchorSummary and CompetitorTable precisely.
 *
 * Accessibility:
 * - role="status" and aria-live="polite"
 * - aria-busy="true"
 */
export const IndustrySkeleton: React.FC<IndustrySkeletonProps> = ({ className }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading competitor intelligence"
      className={`space-y-6 ${className ?? ""}`}
    >
      {/* Live Narrative Status Announcement */}
      <div className="flex items-center gap-2.5 rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-3 text-xs text-text-secondary">
        <Loader2
          className="h-4 w-4 animate-spin motion-reduce:animate-none text-brand-primary shrink-0"
          aria-hidden="true"
        />
        <span className="font-medium text-text-primary">Loading peer competitor analysis…</span>
      </div>

      {/* Anchor Context Bar Skeleton */}
      <div className="rounded-xl border border-border-c bg-surface p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-6 w-56 sm:w-72" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-8 w-full sm:w-2/3 rounded-lg" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto rounded-xl border border-border-c bg-surface">
        <table className="w-full text-left border-collapse min-w-2xl">
          <thead>
            <tr className="border-b border-border-c bg-surface-alt/50">
              <th className="py-3 px-4 sm:px-6 w-1/3">
                <Skeleton className="h-4 w-20" />
              </th>
              <th className="py-3 px-3 sm:px-4 w-1/6">
                <Skeleton className="h-4 w-16" />
              </th>
              <th className="py-3 px-4 sm:px-6 w-1/2">
                <Skeleton className="h-4 w-24" />
              </th>
              <th className="py-3 px-4 sm:px-6 w-12 text-right">
                <Skeleton className="h-4 w-4 ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-c">
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className="border-b border-border-c">
                {/* Company Name */}
                <td className="py-4 px-4 sm:px-6 align-top">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-36 sm:w-44" />
                      <Skeleton className="h-4 w-12 rounded-sm" />
                    </div>
                  </div>
                </td>

                {/* Overlap Badge */}
                <td className="py-4 px-3 sm:px-4 align-top">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </td>

                {/* Overview Text */}
                <td className="py-4 px-4 sm:px-6 align-top">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </td>

                {/* Trailing Chevron */}
                <td className="py-4 px-4 sm:px-6 align-top text-right">
                  <Skeleton className="h-4 w-4 ml-auto rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
