import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface DocumentProgressRingProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function DocumentProgressRing({
  completed,
  total,
  size = 36,
  strokeWidth = 3.5,
  className,
}: DocumentProgressRingProps) {
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (percent / 100) * circumference;
  const isComplete = completed >= total && total > 0;

  // Mount draw-in: start at full-empty (circumference) then animate to target.
  // Skipped when prefers-reduced-motion is set — ring just appears at its final value.
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
  const [strokeDashoffset, setStrokeDashoffset] = useState(
    prefersReduced ? targetOffset : circumference,
  );
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      // Subsequent data changes: just update to new target (CSS transition handles it).
      setStrokeDashoffset(targetOffset);
      return;
    }
    hasMounted.current = true;
    if (prefersReduced) {
      setStrokeDashoffset(targetOffset);
      return;
    }
    // Two-frame rAF: first frame sets the initial (empty) state into the DOM,
    // second frame triggers the CSS transition to the target value.
    const raf1 = requestAnimationFrame(() => {
      setStrokeDashoffset(circumference);
      const raf2 = requestAnimationFrame(() => {
        setStrokeDashoffset(targetOffset);
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [targetOffset, circumference, prefersReduced]);

  return (
    <div
      className={cn("relative flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border-c)"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-70"
        />
        {/* Active Progress Ring — CSS transition drives both mount draw-in and data changes */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isComplete ? "var(--success)" : "var(--brand-primary)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          className="transition-all duration-700 ease-out"
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {isComplete ? (
          <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
        ) : (
          <span className="text-[10px] font-bold font-mono text-text-primary">{percent}%</span>
        )}
      </div>
    </div>
  );
}
