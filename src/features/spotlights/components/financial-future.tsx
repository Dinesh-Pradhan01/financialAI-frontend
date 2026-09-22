import { financialFuture } from "@/shared/data/agentic";
import { cn } from "@/shared/lib/utils";

/** "If nothing changes" vs "If you act" — the emotional projection. */
export function FinancialFuture({ className }: { className?: string }) {
  const { years, ifNothing, ifAct } = financialFuture;
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      <FutureColumn data={ifNothing} years={years} tone="neutral" />
      <FutureColumn data={ifAct} years={years} tone="positive" />
    </div>
  );
}

function FutureColumn({
  data,
  years,
  tone,
}: {
  data: { title: string; lines: { label: string; value: string }[] };
  years: number;
  tone: "neutral" | "positive";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        tone === "positive" ? "border-success/30 tint-success" : "border-border bg-surface",
      )}
    >
      <p className="text-[11px] uppercase tracking-wider text-text-secondary">In {years} years</p>
      <p
        className={cn(
          "mt-1 text-sm font-semibold",
          tone === "positive" ? "text-success" : "text-text-primary",
        )}
      >
        {data.title}
      </p>
      <div className="mt-4 space-y-3">
        {data.lines.map((l) => (
          <div key={l.label}>
            <p className="text-xs text-text-secondary">{l.label}</p>
            <p
              className={cn(
                "font-display text-2xl font-bold font-num",
                tone === "positive" ? "text-success" : "text-text-primary",
              )}
            >
              {l.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
