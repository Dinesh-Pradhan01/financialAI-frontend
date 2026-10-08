import { useMemo } from "react";
import { formatINR } from "@/shared/lib/format";
import type { ChannelDistributionResponse } from "../types/intelligence";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/shared/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface ChannelDistributionSectionProps {
  data: ChannelDistributionResponse;
  className?: string;
}

function getChannelStyle(channelName: string) {
  const name = (channelName || "").toLowerCase();
  if (name.includes("rtgs")) {
    return {
      bar: "bg-blue-600 dark:bg-blue-500",
      dot: "bg-blue-600 dark:bg-blue-400",
      badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    };
  }
  if (name.includes("neft")) {
    return {
      bar: "bg-teal-600 dark:bg-teal-500",
      dot: "bg-teal-600 dark:bg-teal-400",
      badge: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
    };
  }
  if (name.includes("upi")) {
    return {
      bar: "bg-indigo-600 dark:bg-indigo-500",
      dot: "bg-indigo-600 dark:bg-indigo-400",
      badge: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
    };
  }
  if (name.includes("card") || name.includes("pos")) {
    return {
      bar: "bg-amber-600 dark:bg-amber-500",
      dot: "bg-amber-600 dark:bg-amber-400",
      badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    };
  }
  if (name.includes("auto") || name.includes("ach") || name.includes("mandate") || name.includes("standing")) {
    return {
      bar: "bg-purple-600 dark:bg-purple-500",
      dot: "bg-purple-600 dark:bg-purple-400",
      badge: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
    };
  }
  return {
    bar: "bg-slate-500 dark:bg-slate-400",
    dot: "bg-slate-500 dark:bg-slate-400",
    badge: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
  };
}

export function ChannelDistributionSection({
  data,
  className,
}: ChannelDistributionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!data || !data.channels) return null;

  const sortedChannels = useMemo(() => {
    return [...data.channels].sort((a, b) => b.total_volume - a.total_volume);
  }, [data.channels]);

  const maxVolume = useMemo(() => {
    return Math.max(...sortedChannels.map((c) => c.total_volume), 1);
  }, [sortedChannels]);

  return (
    <TooltipProvider delayDuration={150}>
      <section
        className={cn("card-spot p-5 rounded-2xl space-y-4", className)}
        aria-labelledby="channel-distribution-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-1">
          <div>
            <h2
              id="channel-distribution-heading"
              className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground text-balance"
            >
              Transaction Channel & Payment Method Distribution
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-0.5 leading-relaxed">
              Outflow allocation across interbank settlement rails and payment instruments.
            </p>
          </div>
          <div className="text-xs font-mono text-text-secondary whitespace-nowrap self-start sm:self-auto">
            Total Outflow:{" "}
            <span className="font-num font-bold text-foreground">
              {formatINR(data.total_volume)}
            </span>{" "}
            · {data.total_transactions} txns
          </div>
        </div>

        {sortedChannels.length === 0 ? (
          <p className="text-xs text-text-secondary text-center py-6">
            No payment channel transactions recorded for this statement history.
          </p>
        ) : (
          <div className="space-y-4 pt-2">
            {sortedChannels.map((ch, idx) => {
              const barWidthPct = Math.max(3, Math.min(100, (ch.total_volume / maxVolume) * 100));
            const style = getChannelStyle(ch.payment_channel);

            return (
              <div key={ch.payment_channel} className="space-y-1.5 group">
                <div className="flex flex-wrap sm:flex-nowrap items-baseline sm:items-center justify-between gap-1 sm:gap-4 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={cn("h-2 w-2 rounded-full shrink-0", style.dot)} />
                    <span className="font-semibold text-xs sm:text-sm text-foreground tracking-tight truncate">
                      {ch.payment_channel}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="text-text-secondary/60 hover:text-text-secondary cursor-help p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded shrink-0"
                          aria-label={`Description for ${ch.payment_channel}`}
                        >
                          <HelpCircle className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs font-medium max-w-xs leading-relaxed">
                        {ch.description || "Banking payment rail"}
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-num tabular-nums text-xs sm:text-sm shrink-0">
                    <span className="font-bold text-foreground">
                      {formatINR(ch.total_volume)}
                    </span>
                    <span className="text-text-secondary text-xs">
                      · {ch.transaction_count} {ch.transaction_count === 1 ? "txn" : "txns"}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border tabular-nums",
                        style.badge,
                      )}
                    >
                      {ch.share_of_outflows_pct}%
                    </span>
                  </div>
                </div>

                {/* Proportional Horizontal Bar Track */}
                <div className="h-2.5 w-full rounded-full bg-surface-alt/70 overflow-hidden border border-border/40 p-0.5">
                  <motion.div
                    className={cn(
                      "h-full rounded-full group-hover:opacity-90",
                      style.bar,
                    )}
                    initial={shouldReduceMotion ? false : { width: 0 }}
                    animate={{ width: `${barWidthPct}%` }}
                    transition={{
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                      delay: shouldReduceMotion ? 0 : Math.min(idx * 0.04, 0.25),
                    }}
                    role="progressbar"
                    aria-valuenow={ch.total_volume}
                    aria-valuemin={0}
                    aria-valuemax={maxVolume}
                    aria-label={`${ch.payment_channel}: ${formatINR(ch.total_volume)}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
    </TooltipProvider>
  );
}
