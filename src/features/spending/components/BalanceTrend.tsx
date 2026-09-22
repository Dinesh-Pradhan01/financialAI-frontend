import { formatINR } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { MonthlyTrendAggregate } from "../types/transaction";

interface BalanceTrendProps {
  values: MonthlyTrendAggregate[] | number[];
  className?: string;
}

export function BalanceTrend({ values, className }: BalanceTrendProps) {
  const shouldReduceMotion = useReducedMotion();
  const normalized: MonthlyTrendAggregate[] = values.map((item, index) =>
    typeof item === "number"
      ? { month: `Month ${index + 1}`, total: item }
      : item,
  );

  if (normalized.length === 0) {
    return (
      <div className={cn("mt-4 flex h-36 items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 text-xs text-text-secondary", className)}>
        No monthly spend history available for this timeframe
      </div>
    );
  }

  const totals = normalized.map((v) => v.total);
  const max = Math.max(...totals, 1);
  const last = normalized.length - 1;

  return (
    <div className={cn("mt-4", className)} role="region" aria-label="Monthly spend balance trend">
      <div className="flex h-36 items-end gap-1 sm:gap-2">
        {normalized.map((item, i) => {
          const isLast = i === last;
          return (
            <div
              key={`${item.month}-${i}`}
              className="group relative flex h-full flex-1 flex-col items-center justify-end"
            >
              <span
                className={cn(
                  "mb-1 whitespace-nowrap font-num text-[0.625rem] text-text-secondary transition-opacity pointer-events-none",
                  isLast ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
                )}
              >
                {formatINR(item.total, { compact: true })}
              </span>
              <motion.div
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${item.month}: ${formatINR(item.total)}`}
                className={cn(
                  "w-full rounded-t-md cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 transition-colors",
                  isLast ? "bg-brand shadow-sm" : "bg-brand/35 hover:bg-brand/60 focus-visible:bg-brand",
                )}
                initial={shouldReduceMotion ? false : { height: 0 }}
                animate={{ height: `${Math.max(8, (item.total / max) * 100)}%` }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                  delay: shouldReduceMotion ? 0 : i * 0.025,
                }}
                title={`${item.month}: ${formatINR(item.total)}`}
              />
              <span className="mt-2 text-[0.6rem] text-text-secondary truncate w-full text-center">
                {item.month.split(" ")[0]}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between font-num text-[0.625rem] text-text-secondary border-t border-border/40 pt-1.5">
        <span>{normalized[0].month}: {formatINR(normalized[0].total, { compact: true })}</span>
        <span>{normalized[last].month}: {formatINR(normalized[last].total, { compact: true })}</span>
      </div>
    </div>
  );
}
