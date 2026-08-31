import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface DocumentCategorySummaryCardProps {
  label: string;
  /** Documents on record in this category. */
  completed: number;
  /** Documents defined for this category by the taxonomy. */
  total?: number;
  /**
   * Required-only progress, where the category has required rows. Four of the
   * eight categories have none, so this is optional and the sub-line is dropped
   * rather than showing a meaningless 0 of 0.
   */
  requiredCompleted?: number;
  requiredTotal?: number;
  icon: LucideIcon;
  onManage: () => void;
  /**
   * If true, progress bar and percent are omitted (used for Other Documents where
   * there is no predefined total or completion criteria).
   */
  hideProgress?: boolean;
  subLabel?: string;
  badgeLabel?: string;
  description?: string;
  className?: string;
}

export function DocumentCategorySummaryCard({
  label,
  completed,
  total = 0,
  requiredCompleted = 0,
  requiredTotal = 0,
  icon: Icon,
  onManage,
  hideProgress = false,
  subLabel,
  badgeLabel,
  description,
  className,
}: DocumentCategorySummaryCardProps) {
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  const hasRequired = requiredTotal > 0;
  /**
   * "Complete" means every *required* document is on record. Optional documents
   * apply conditionally — an entity may legitimately never hold most of them —
   * so gating this on the full count would leave every category permanently
   * incomplete. Categories with no required rows never claim completion.
   */
  const isComplete = !hideProgress && hasRequired && requiredCompleted >= requiredTotal;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${label} — ${completed} ${total > 0 ? `of ${total} ` : ""}uploaded. Manage documents.`}
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
        "rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer shadow-xs select-none flex flex-col justify-between gap-3.5 group relative overflow-hidden min-h-[144px]",
        isComplete
          ? "border-emerald-500/35 bg-gradient-to-br from-emerald-500/[0.08] via-surface to-surface hover:border-emerald-500/50 hover:shadow-md"
          : hasRequired && requiredCompleted > 0
            ? "border-brand/30 bg-gradient-to-br from-brand/[0.05] via-surface to-surface-alt/30 hover:border-brand/40 hover:bg-surface-alt/40 hover:shadow-md"
            : completed > 0
              ? "border-brand/25 bg-gradient-to-br from-brand/[0.03] via-surface to-surface-alt/25 hover:border-brand/35 hover:bg-surface-alt/30 hover:shadow-md"
              : "border-border-c bg-gradient-to-br from-surface via-surface to-surface-alt/25 hover:border-brand/30 hover:bg-surface-alt/30 hover:shadow-md",
        className,
      )}
    >
      {/* Subtle ambient light highlight on hover */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100",
          isComplete
            ? "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-500/[0.08] via-transparent to-transparent"
            : "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand/[0.06] via-transparent to-transparent",
        )}
      />

      {/* Top Row: Icon + Category Label + Status Pill */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 shadow-2xs",
              isComplete
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25"
                : hasRequired
                  ? "bg-brand/10 text-brand border border-brand/20"
                  : completed > 0
                    ? "bg-brand/10 text-brand border border-brand/20"
                    : "bg-surface-alt text-text-secondary border border-border/60",
            )}
          >
            <Icon aria-hidden="true" className="h-4.5 w-4.5" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm text-text-primary tracking-tight truncate group-hover:text-brand transition-colors">
              {label}
            </h3>
            <p className="text-[11px] text-text-secondary font-mono tabular-nums mt-0.5">
              {subLabel ?? (total > 0 ? `${completed} of ${total} uploaded` : `${completed} uploaded`)}
            </p>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="shrink-0 pt-0.5">
          {badgeLabel ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary font-medium text-[10px] border border-border-c">
              {badgeLabel}
            </span>
          ) : isComplete ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px] border border-emerald-500/25">
              <CheckCircle2 aria-hidden="true" className="h-3 w-3" /> Complete
            </span>
          ) : hasRequired ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand/10 text-brand font-semibold text-[10px] border border-brand/20">
              <span className="font-num font-bold tabular-nums">
                {requiredCompleted}/{requiredTotal}
              </span>
              <span className="text-destructive font-bold text-xs leading-none" title="Required">
                *
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary font-medium text-[10px] border border-border-c">
              Optional
            </span>
          )}
        </div>
      </div>

      {/* Bottom Area: Progress Bar or Description + Manage */}
      <div className="space-y-1.5 relative z-10 pt-1">
        {!hideProgress && (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-alt border border-border/50">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-out",
                isComplete ? "bg-success" : "bg-brand",
              )}
              style={{ width: `${percent}%` }}
            />
          </div>
        )}

        {/* Footer Meta Row */}
        <div className="flex items-center justify-between text-[11px] pt-0.5">
          {hideProgress ? (
            <span className="text-[11px] text-text-secondary truncate max-w-[200px]">
              {description ?? "Custom & auxiliary records"}
            </span>
          ) : (
            <span
              className={cn(
                "font-num font-semibold text-xs tabular-nums",
                isComplete ? "text-success" : percent > 0 ? "text-brand" : "text-text-tertiary",
              )}
            >
              {percent}% completed
            </span>
          )}

          <div className="flex items-center gap-0.5 font-semibold text-text-secondary group-hover:text-brand transition-colors text-xs ml-auto">
            <span>Manage</span>
            <ChevronRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
