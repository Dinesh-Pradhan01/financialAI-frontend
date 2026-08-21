import React from "react";
import { cn } from "@/shared/lib/utils";

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  radius?: number;
  centerLabel?: React.ReactNode;
  className?: string;
  trackColor?: string;
}

export function DonutChart({
  segments,
  size = 200,
  strokeWidth = 26,
  radius,
  centerLabel,
  className,
  trackColor = "var(--surface-alt)",
}: DonutChartProps) {
  const half = size / 2;
  const r = radius ?? Math.round((size - strokeWidth) / 2 - (size >= 180 ? 17 : 7));
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
  const circumference = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={half}
          cy={half}
          r={r}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {segments.map((seg, i) => {
          const portion = total > 0 ? Math.max(0, seg.value) / total : 0;
          const dash = circumference * portion;
          const offset = -circumference * acc;
          acc += portion;

          return (
            <circle
              key={seg.label || i}
              cx={half}
              cy={half}
              r={r}
              stroke={seg.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
      {centerLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {centerLabel}
        </div>
      )}
    </div>
  );
}
