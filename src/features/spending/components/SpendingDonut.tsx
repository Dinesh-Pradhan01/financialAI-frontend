import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatINR } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";
import type { CategoryAggregate } from "../types/transaction";
import {
  prepareLegendData,
  type PreparedLegendItem,
} from "../lib/categoryLabels";

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
  categories: CategoryAggregate[];
  total: number;
}

export function SpendingDonut({ categories, total }: SpendingDonutProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isOtherExpanded, setIsOtherExpanded] = useState(false);

  // Phase D1: Data shaping with category label mapping and Top 6 + Other bucketing
  const items = useMemo(() => {
    return prepareLegendData(categories, total, SPENDING_COLORS);
  }, [categories, total]);

  // Defensive filter: remove any non-Other row that renders 0%
  const visibleItems = useMemo(() => {
    return items.filter((item) => item.isOther || item.share > 0);
  }, [items]);

  // Donut SVG geometry
  const size = 200;
  const strokeWidth = 26;
  const radius = 70;
  const half = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Track accumulator for stroke dash offset
  let offsetAccumulator = 0;

  const activeItem = activeIdx !== null ? visibleItems[activeIdx] : null;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Donut Chart with Hover/Tap Segment Interactivity & Floating Tooltip */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Floating Tooltip above donut on segment hover/tap */}
        {activeItem && (
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-xl bg-surface border border-border shadow-e2 flex items-center gap-2 text-xs pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
            role="tooltip"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: activeItem.color }}
            />
            <span className="font-semibold text-foreground">{activeItem.label}</span>
            <span className="text-text-secondary tabular-nums">{formatINR(activeItem.amount)}</span>
            <span className="font-num font-bold text-foreground">({activeItem.shareFormatted})</span>
          </div>
        )}

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          role="img"
          aria-label="Spending distribution by category"
        >
          <title>Spending distribution by category</title>
          {/* Background track circle */}
          <circle
            cx={half}
            cy={half}
            r={radius}
            stroke="var(--surface-alt)"
            strokeWidth={strokeWidth}
            fill="none"
            aria-hidden="true"
          />

          {visibleItems.length === 0 || total === 0 ? (
            <circle
              cx={half}
              cy={half}
              r={radius}
              stroke="var(--border)"
              strokeWidth={strokeWidth}
              fill="none"
              aria-hidden="true"
            />
          ) : (
            visibleItems.map((item, i) => {
              const portion = total > 0 ? Math.max(0, item.amount) / total : 0;
              const dash = circumference * portion;
              const offset = -circumference * offsetAccumulator;
              offsetAccumulator += portion;

              const isHighlighted = activeIdx === i;
              const isDimmed = activeIdx !== null && activeIdx !== i;

              return (
                <circle
                  key={`${item.id}-${i}`}
                  cx={half}
                  cy={half}
                  r={radius}
                  stroke={item.color}
                  strokeWidth={isHighlighted ? strokeWidth + 4 : strokeWidth}
                  fill="none"
                  strokeDasharray={`${dash} ${Math.max(0, circumference - dash)}`}
                  strokeDashoffset={offset}
                  strokeLinecap="butt"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    opacity: isDimmed ? 0.35 : 1,
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onClick={() => setActiveIdx((prev) => (prev === i ? null : i))}
                  aria-label={`${item.label}: ${formatINR(item.amount)} (${item.shareFormatted})`}
                >
                  <title>
                    {item.label}: {formatINR(item.amount)} ({item.shareFormatted})
                  </title>
                </circle>
              );
            })
          )}
        </svg>

        {/* Center Label: dynamically reflects active hovered segment or overall total */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4"
          aria-hidden="true"
        >
          {activeItem ? (
            <>
              <p className="font-display text-xl font-bold font-num text-foreground truncate max-w-[130px]">
                {formatINR(activeItem.amount, { compact: true })}
              </p>
              <p className="text-[0.7rem] text-text-secondary truncate max-w-[130px] font-medium leading-tight mt-0.5">
                {activeItem.label}
              </p>
              <p className="text-[0.7rem] font-bold text-foreground mt-0.5 font-num">
                {activeItem.shareFormatted} of spend
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl font-bold font-num text-foreground">
                {formatINR(total, { compact: true })}
              </p>
              <p className="text-xs text-text-secondary">total spend</p>
            </>
          )}
        </div>
      </div>

      {/* Phase D2: Structured Legend with Visual Hierarchy & Expandable Other Row */}
      {visibleItems.length > 0 ? (
        <div className="w-full flex flex-col gap-1.5 text-xs">
          {visibleItems.map((item, i) => {
            const isTopTier = i < 3;
            const isItemActive = activeIdx === i;

            return (
              <div key={`${item.id}-${i}`} className="flex flex-col">
                <div
                  className={cn(
                    "flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer select-none",
                    isItemActive
                      ? "bg-surface-alt/90 shadow-xs"
                      : "hover:bg-surface-alt/50",
                    item.isOther && "text-text-secondary hover:text-foreground",
                  )}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onClick={() => {
                    if (item.isOther) {
                      setIsOtherExpanded((prev) => !prev);
                    } else {
                      setActiveIdx((prev) => (prev === i ? null : i));
                    }
                  }}
                  role={item.isOther ? "button" : undefined}
                  tabIndex={item.isOther ? 0 : undefined}
                  aria-expanded={item.isOther ? isOtherExpanded : undefined}
                  onKeyDown={
                    item.isOther
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsOtherExpanded((prev) => !prev);
                          }
                        }
                      : undefined
                  }
                >
                  {/* Left: Color dot + Mapped Category Label */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform"
                      style={{
                        background: item.color,
                        transform: isItemActive ? "scale(1.2)" : "scale(1)",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "truncate text-foreground",
                        isTopTier ? "font-semibold" : "font-normal",
                        item.isOther && "text-text-secondary hover:text-foreground",
                      )}
                      title={item.label}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Right: Amount + Percentage */}
                  <div className="flex items-center gap-3 shrink-0 tabular-nums">
                    <span
                      className={cn(
                        "text-foreground",
                        isTopTier ? "font-semibold" : "font-normal",
                        item.isOther && "text-text-secondary",
                      )}
                    >
                      {formatINR(item.amount)}
                    </span>
                    <span
                      className={cn(
                        "min-w-[2.5rem] text-right font-num",
                        isTopTier
                          ? "font-bold text-foreground"
                          : "font-medium text-text-secondary",
                        item.isOther && "text-text-secondary",
                      )}
                    >
                      {item.shareFormatted}
                    </span>
                    {item.isOther && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-text-secondary transition-transform duration-200",
                          isOtherExpanded && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                {/* Inline Expandable Accordion for Bucketed Subcategories */}
                <AnimatePresence initial={false}>
                  {item.isOther && isOtherExpanded && item.subItems && (
                    <motion.div
                      key="subcategories-accordion"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 mb-1.5 ml-5 pl-3 border-l-2 border-border/60 flex flex-col gap-1.5 text-[0.75rem] text-text-secondary">
                        {item.subItems.map((sub, sIdx) => (
                          <div
                            key={`${sub.id}-${sIdx}`}
                            className="flex items-center justify-between gap-3 py-0.5 pr-2.5 hover:text-foreground transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span
                                className="h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ background: sub.color }}
                                aria-hidden="true"
                              />
                              <span className="truncate" title={sub.label}>
                                {sub.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 tabular-nums">
                              <span>{formatINR(sub.amount)}</span>
                              <span className="min-w-[2.5rem] text-right font-num font-medium">
                                {sub.shareFormatted}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-text-secondary text-center py-4">
          No categorized expense data available for this range
        </p>
      )}
    </div>
  );
}

