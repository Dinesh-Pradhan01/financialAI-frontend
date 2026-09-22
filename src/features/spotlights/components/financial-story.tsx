import { financialStory } from "@/shared/data/agentic";
import { IconChip } from "@/shared/lib/icons";
import { cn } from "@/shared/lib/utils";

/** A chronological narrative of the year, not a chart. */
export function FinancialStory({ className }: { className?: string }) {
  return (
    <div className={cn("card-spot p-5", className)}>
      <ol className="relative space-y-5 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-border">
        {financialStory.map((beat, i) => {
          const last = i === financialStory.length - 1;
          return (
            <li key={beat.month} className="relative flex gap-4">
              <span className="relative z-10">
                <IconChip keyName={beat.iconKey ?? "sparkles"} size="sm" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                  {beat.month}
                </p>
                <p className={cn("text-sm font-semibold", last && "text-brand")}>{beat.title}</p>
                {beat.detail && <p className="mt-0.5 text-xs text-text-secondary">{beat.detail}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
