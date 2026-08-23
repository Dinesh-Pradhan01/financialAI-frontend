import { motion } from "framer-motion";
import { ChevronRight, FileText, Shield, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { DocumentProgressRing } from "./DocumentProgressRing";

export interface DocumentCategorySummaryCardProps {
  label: string;
  completed: number;
  total: number;
  onManage: () => void;
  variant: "required" | "recommended";
  className?: string;
}

export function DocumentCategorySummaryCard({
  label,
  completed,
  total,
  onManage,
  variant,
  className,
}: DocumentCategorySummaryCardProps) {
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const isComplete = completed >= total && total > 0;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.2 }}
      onClick={onManage}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onManage();
        }
      }}
      className={cn(
        "rounded-2xl border p-5 transition-all duration-200 cursor-pointer shadow-xs select-none flex items-center justify-between gap-4 group relative overflow-hidden",
        isComplete && variant === "required"
          ? "border-success/40 bg-gradient-to-br from-success/[0.06] via-surface to-surface hover:border-success/60 hover:shadow-md"
          : "border-border-c bg-gradient-to-br from-surface via-surface to-surface-alt/20 hover:border-brand/40 hover:bg-surface-alt/30 hover:shadow-md",
        className
      )}
    >
      {/* Subtle ambient light highlight */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100",
          isComplete && variant === "required"
            ? "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-success/[0.08] via-transparent to-transparent"
            : "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand/[0.06] via-transparent to-transparent"
        )}
      />

      {/* Left: Progress Ring + Content */}
      <div className="flex items-center gap-4 min-w-0 flex-1 relative z-10">
        <DocumentProgressRing
          completed={completed}
          total={total}
          size={48}
          strokeWidth={4.5}
        />

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-text-primary tracking-tight">
              {label} Documents
            </h3>
            {isComplete && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 text-success font-semibold text-[10px]">
                <CheckCircle2 className="h-3 w-3" /> Complete
              </span>
            )}
          </div>

          <p
            className={cn(
              "text-xs font-semibold font-num flex items-center gap-1.5",
              isComplete ? "text-success" : "text-brand"
            )}
          >
            <span>{percent}% Completed</span>
            <span className="text-text-tertiary font-normal font-mono text-[11px]">
              • {completed} of {total} uploaded
            </span>
          </p>

          <div className="flex items-center gap-1 text-[11px] font-medium text-text-secondary group-hover:text-brand pt-0.5 transition-colors">
            <span>Manage documents</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Right: Decorative Icon Badge */}
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 shadow-2xs relative z-10",
          isComplete && variant === "required"
            ? "bg-success/15 text-success"
            : "bg-brand/10 text-brand"
        )}
      >
        {variant === "required" ? (
          <Shield className="h-5 w-5" />
        ) : (
          <FileText className="h-5 w-5" />
        )}
      </div>
    </motion.div>
  );
}
