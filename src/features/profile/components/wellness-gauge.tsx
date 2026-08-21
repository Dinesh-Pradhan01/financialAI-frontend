import { useCountUp } from "@/shared/lib/use-count-up";
import type { SubScore } from "@/shared/data/rohan";
import { cn } from "@/shared/lib/utils";

function scoreColor(v: number): string {
  if (v <= 40) return "var(--severity-high)";
  if (v <= 70) return "var(--severity-moderate)";
  return "var(--success)";
}

export function WellnessGauge({
  score,
  trend,
  subscores,
  size = 168,
}: {
  score: number;
  trend?: string;
  subscores: SubScore[];
  size?: number;
}) {
  const v = useCountUp(score);
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);
  const color = scoreColor(score);
  const label = score >= 71 ? "Good" : score >= 41 ? "Improving" : "Needs work";
  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:items-stretch md:gap-8">
      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="oklch(1 0 0 / 0.18)"
            strokeWidth={12}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            fill="none"
            style={{ transition: "stroke-dashoffset 200ms linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-on-brand">
          <span className="font-display text-5xl font-bold leading-none font-num">{v}</span>
          <span className="mt-1 text-xs opacity-80">/ 100 · {label}</span>
          {trend && <span className="mt-1 text-[11px] text-success">▲ {trend} this month</span>}
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1">
        {subscores.map((s) => (
          <SubBar key={s.key} item={s} />
        ))}
      </div>
    </div>
  );
}

function SubBar({ item }: { item: SubScore }) {
  const color = scoreColor(item.value);
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
      <span className="w-20 text-xs font-medium text-on-brand/90">{item.label}</span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${item.value}%`, background: color }}
        />
      </div>
      <span
        className={cn(
          "w-9 text-right font-num text-xs text-on-brand",
          item.value < 60 && "opacity-90",
        )}
      >
        {item.value}
        {item.trend === "up" && <span className="ml-1 text-success">▲</span>}
        {item.trend === "down" && <span className="ml-1 text-severity-moderate">↓</span>}
      </span>
    </div>
  );
}

export function WellnessSubScoreCard({ items }: { items: SubScore[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((s) => (
        <div key={s.key} className="card-spot p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium">{s.label}</span>
            <span className="font-num text-sm">
              {s.value}
              {s.trend === "up" && <span className="ml-1 text-success">▲</span>}
              {s.trend === "down" && <span className="ml-1 text-severity-high">▼</span>}
            </span>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-surface-alt">
            <div
              className="h-full rounded-full"
              style={{ width: `${s.value}%`, background: scoreColor(s.value) }}
            />
          </div>
          {s.note && <p className="mt-1.5 text-xs text-text-secondary">{s.note}</p>}
        </div>
      ))}
    </div>
  );
}
