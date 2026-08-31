import { motion } from "framer-motion";
import {
  UserCheck,
  Clock,
  AlertCircle,
  Users,
  AlertTriangle,
  RotateCw,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { useTeamInvites } from "../hooks/useTeamInvites";
import { getApiErrorMessage } from "@/shared/lib/apiError";

export interface TeamStatsBarProps {
  className?: string;
}

export function TeamStatsBar({ className }: TeamStatsBarProps) {
  const { data: invites = [], isLoading, isError, error, refetch, isFetching } = useTeamInvites();

  // Compute stats directly from the source-of-truth invite list
  const acceptedCount = invites.filter((i) => i.status === "accepted").length;
  const pendingCount = invites.filter((i) => i.status === "pending").length;
  const expiredCount = invites.filter((i) => i.status === "expired").length;

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4", className)}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/80 bg-surface p-4 sm:p-5 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-xl" />
            </div>
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-7 w-14 rounded-md" />
              <Skeleton className="h-3.5 w-32 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-destructive/30 bg-destructive/5 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left",
          className
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-destructive">Unable to load team statistics</h4>
            <p className="text-xs text-text-secondary line-clamp-1">
              {getApiErrorMessage(error, "Failed to retrieve executive invitations.")}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="shrink-0 gap-1.5 border-destructive/30 hover:bg-destructive/10 text-destructive text-xs"
        >
          <RotateCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
          <span>Retry</span>
        </Button>
      </div>
    );
  }

  const statCards = [
    {
      id: "accepted",
      label: "Accepted Members",
      count: acceptedCount,
      subtext: acceptedCount === 1 ? "1 active executive" : `${acceptedCount} active executives`,
      icon: UserCheck,
      iconColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      ambient: "from-emerald-500/20",
    },
    {
      id: "pending",
      label: "Pending Invites",
      count: pendingCount,
      subtext: pendingCount === 1 ? "1 awaiting activation" : `${pendingCount} awaiting activation`,
      icon: Clock,
      iconColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      ambient: "from-amber-500/20",
    },
    {
      id: "expired",
      label: "Expired Invites",
      count: expiredCount,
      subtext: expiredCount > 0 ? "Requires resend" : "All links valid",
      icon: AlertCircle,
      iconColor:
        expiredCount > 0
          ? "bg-red-500/10 text-red-500 border-red-500/20"
          : "bg-surface-alt text-text-tertiary border-border/60",
      ambient: expiredCount > 0 ? "from-red-500/20" : "from-zinc-500/20",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4", className)}>
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-surface via-surface to-surface-alt/20 p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-brand/30 hover:shadow-sm group text-left"
            )}
          >
            {/* Subtle ambient light */}
            <div
              className={cn(
                "absolute inset-0 pointer-events-none bg-linear-to-br via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300",
                card.ambient
              )}
            />

            <div className="relative z-10 space-y-3">
              {/* Header: Title + Icon */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {card.label}
                </span>
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105 shadow-2xs",
                    card.iconColor
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Metric & Subtext */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight font-num">
                    {card.count}
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                  {card.subtext}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
