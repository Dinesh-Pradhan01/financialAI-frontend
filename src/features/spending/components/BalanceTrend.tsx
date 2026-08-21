import { formatINR } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";

interface BalanceTrendProps {
  values: number[];
  className?: string;
}

export function BalanceTrend({ values, className }: BalanceTrendProps) {
  const max = Math.max(...values, 1);
  const last = values.length - 1;

  return (
    <div className={cn("mt-4", className)}>
      <div className="flex h-36 items-end gap-1.5">
        {values.map((v, i) => {
          const isLast = i === last;
          return (
            <div
              key={i}
              className="group relative flex h-full flex-1 flex-col items-center justify-end"
            >
              <span
                className={cn(
                  "mb-1 font-num text-[0.625rem] text-text-secondary transition-opacity",
                  isLast ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                )}
              >
                {formatINR(v * 1000, { compact: true })}
              </span>
              <div
                className={cn(
                  "w-full rounded-t-md transition-all",
                  isLast ? "bg-brand" : "bg-brand/35 group-hover:bg-brand/60",
                )}
                style={{ height: `${Math.max(6, (v / max) * 100)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between font-num text-[0.625rem] text-text-secondary">
        <span>{formatINR(values[0] * 1000, { compact: true })}</span>
        <span>{formatINR(values[last] * 1000, { compact: true })} now</span>
      </div>
    </div>
  );
}
