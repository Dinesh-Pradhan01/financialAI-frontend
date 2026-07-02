import { motion } from "framer-motion";
import { blindSpots } from "@/data/agentic";
import { cn } from "@/lib/utils";

function leakColor(value: number) {
  if (value >= 80) return "var(--severity-high)";
  if (value >= 60) return "var(--severity-moderate)";
  return "var(--severity-low)";
}

/** Where value is leaking, biggest blind spots first. */
export function BlindSpotMeter({ className }: { className?: string }) {
  return (
    <div className={cn("card-spot p-4", className)}>
      <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
        {blindSpots.map((b, i) => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[13px] font-medium">{b.label}</span>
              <span
                className="font-num text-xs font-semibold"
                style={{ color: leakColor(b.value) }}
              >
                {b.note}
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-alt">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${b.value}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: leakColor(b.value) }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-border pt-3 text-xs text-text-secondary">
        Longer bars leak more. Savings and Insurance are your biggest blind spots.
      </p>
    </div>
  );
}
