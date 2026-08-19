import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { monthChanges, fdConfidenceShift, type MonthChange } from "@/shared/data/agentic";
import { cn } from "@/shared/lib/utils";

function ChangeIcon({ direction }: { direction: MonthChange["direction"] }) {
  if (direction === "up") return <ArrowUp className="h-3.5 w-3.5 text-success" />;
  if (direction === "down") return <ArrowDown className="h-3.5 w-3.5 text-severity-high" />;
  return <Minus className="h-3.5 w-3.5 text-text-secondary" />;
}

/** "What changed since last month?" — the monthly re-engagement hook. */
export function MonthChanges({ className }: { className?: string }) {
  return (
    <div className={cn("card-spot p-5", className)}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
        {monthChanges.map((c) => (
          <div key={c.label} className="flex flex-col gap-0.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 font-num text-sm font-semibold",
                c.direction === "up" && "text-success",
                c.direction === "down" && "text-severity-high",
                c.direction === "flat" && "text-text-secondary",
              )}
            >
              <ChangeIcon direction={c.direction} />
              {c.delta}
            </span>
            <span className="text-xs text-text-secondary">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 rounded-xl tint-brand px-4 py-3">
        <span className="shrink-0 text-sm font-medium">FD opportunity confidence</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/60">
          <div
            className="h-full rounded-full bg-success"
            style={{ width: `${fdConfidenceShift.to}%` }}
          />
        </div>
        <span className="shrink-0 font-num text-sm font-semibold">
          <span className="text-text-secondary">{fdConfidenceShift.from}</span>
          <ArrowUp className="mx-1 inline h-3.5 w-3.5 text-success" />
          <span className="text-success">{fdConfidenceShift.to}</span>
        </span>
      </div>
    </div>
  );
}
