import React from "react";
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
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const isComplete = completed >= total && total > 0;

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
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-70"
        />
        {/* Active Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isComplete ? "var(--color-success)" : "var(--color-brand)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {isComplete ? (
          <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
        ) : (
          <span className="text-[10px] font-bold font-mono text-text-primary">
            {percent}%
          </span>
        )}
      </div>
    </div>
  );
}
