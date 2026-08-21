import { useMemo } from "react";
import { DonutChart } from "@/shared/components/charts/DonutChart";
import { formatINR } from "@/shared/lib/format";
import type { rohan } from "@/shared/data/rohan";

const SPENDING_COLORS = [
  "var(--brand-primary)",
  "var(--brand-secondary)",
  "var(--severity-moderate)",
  "var(--success)",
  "var(--severity-low)",
  "var(--severity-high)",
  "var(--brand-primary-hi)",
];

interface SpendingDonutProps {
  categories: typeof rohan.categories;
  total: number;
}

export function SpendingDonut({ categories, total }: SpendingDonutProps) {
  const segments = useMemo(
    () =>
      categories.map((cat, i) => ({
        label: cat.label,
        value: cat.amount,
        color: SPENDING_COLORS[i % SPENDING_COLORS.length],
      })),
    [categories],
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <DonutChart
        segments={segments}
        size={200}
        strokeWidth={26}
        radius={70}
        centerLabel={
          <>
            <p className="font-display text-2xl font-bold font-num">
              {formatINR(total, { compact: true })}
            </p>
            <p className="text-xs text-text-secondary">total spend</p>
          </>
        }
      />
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        {categories.map((cat, i) => (
          <div key={cat.id} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: SPENDING_COLORS[i % SPENDING_COLORS.length] }}
            />
            <span className="flex-1 truncate">{cat.label}</span>
            <span className="font-num text-text-secondary">{cat.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
