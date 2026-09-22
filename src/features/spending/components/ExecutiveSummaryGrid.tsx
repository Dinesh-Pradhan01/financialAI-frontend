import type { ExecutiveScorecardItem } from "../types/intelligence";
import { cn } from "@/shared/lib/utils";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface ExecutiveSummaryGridProps {
  items: ExecutiveScorecardItem[];
  className?: string;
}

function getModuleColorTheme(moduleName: string, indicator: string) {
  const text = `${moduleName} ${indicator}`.toLowerCase();

  if (
    text.includes("risk") ||
    text.includes("anomal") ||
    text.includes("outlier") ||
    text.includes("spike") ||
    text.includes("duplicate") ||
    text.includes("flagged")
  ) {
    return {
      tag: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
      dot: "bg-amber-500",
      cardHover: "hover:border-amber-500/40",
    };
  }
  if (
    text.includes("efficiency") ||
    text.includes("projection") ||
    text.includes("ratio") ||
    text.includes("margin") ||
    text.includes("cost") ||
    text.includes("retention")
  ) {
    return {
      tag: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
      dot: "bg-emerald-500",
      cardHover: "hover:border-emerald-500/40",
    };
  }
  if (
    text.includes("channel") ||
    text.includes("velocity") ||
    text.includes("payment") ||
    text.includes("transfer")
  ) {
    return {
      tag: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
      dot: "bg-indigo-500",
      cardHover: "hover:border-indigo-500/40",
    };
  }
  // Default to Macro Cash Flow / Liquidity (Brand Cobalt)
  return {
    tag: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    dot: "bg-blue-500",
    cardHover: "hover:border-blue-500/40",
  };
}

export function ExecutiveSummaryGrid({ items, className }: ExecutiveSummaryGridProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!items || items.length === 0) return null;

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: shouldReduceMotion ? 0 : 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.22,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className={cn("space-y-3", className)} aria-labelledby="executive-scorecard-heading">
      <div className="flex items-baseline justify-between">
        <div>
          <h2
            id="executive-scorecard-heading"
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground text-balance"
          >
            Executive Scorecard
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5 leading-relaxed">
            Multi-vector financial health indicators synthesized from statement history.
          </p>
        </div>
        <span className="text-xs font-mono text-text-secondary">
          {items.length} indicators
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
      >
        {items.map((item, idx) => {
          const theme = getModuleColorTheme(item.analytical_module, item.key_indicator);

          return (
            <motion.div
              key={`${item.analytical_module}-${item.key_indicator}-${idx}`}
              variants={itemVariants}
              className={cn(
                "card-spot p-4 sm:p-5 rounded-2xl flex flex-col justify-between gap-2.5 transition-all duration-200 hover:shadow-e2 min-h-[140px]",
                theme.cardHover,
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider font-mono border",
                      theme.tag,
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", theme.dot)} />
                    {item.analytical_module}
                  </span>
                </div>
                <h3
                  className="text-xs sm:text-sm font-semibold text-foreground mt-2 line-clamp-1 tracking-tight"
                  title={item.key_indicator}
                >
                  {item.key_indicator}
                </h3>
              </div>

              <div className="pt-1.5 mt-auto">
                <p className="font-num text-lg sm:text-xl font-bold tracking-tight text-foreground tabular-nums truncate">
                  {item.current_value}
                </p>
                <p
                  className="text-xs text-text-secondary mt-1 leading-relaxed line-clamp-2"
                  title={item.assessment}
                >
                  {item.assessment}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
