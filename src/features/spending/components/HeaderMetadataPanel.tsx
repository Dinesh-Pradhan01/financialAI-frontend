import { useState } from "react";
import { Landmark, Calendar, Info, TrendingUp, TrendingDown, Copy, Check } from "lucide-react";
import { formatINR } from "@/shared/lib/format";
import type { HeaderMetadataResponse } from "../types/intelligence";
import { cn } from "@/shared/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/shared/components/ui/tooltip";

interface HeaderMetadataPanelProps {
  metadata: HeaderMetadataResponse;
  documentsCount?: number;
  className?: string;
}

export function HeaderMetadataPanel({
  metadata,
  documentsCount = 1,
  className,
}: HeaderMetadataPanelProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!metadata) return null;

  const handleCopy = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1600);
  };

  const isNetPositive = metadata.closing_balance >= metadata.opening_balance;
  const deltaAmount = metadata.closing_balance - metadata.opening_balance;

  return (
    <TooltipProvider delayDuration={150}>
      <section className={cn("space-y-2", className)} aria-labelledby="statement-metadata-heading">
        <div className="card-spot p-5 rounded-2xl border border-border/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20 shrink-0">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h3 id="statement-metadata-heading" className="font-display text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-1.5 flex-wrap">
                  <span>{metadata.bank_name}</span>
                  <span className="text-text-secondary/60 font-sans">·</span>
                  <span className="font-mono">{metadata.account_number}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => handleCopy(metadata.account_number, "acc")}
                        className="p-1 rounded-md text-text-secondary/60 hover:text-foreground hover:bg-surface-alt transition-colors cursor-pointer"
                        aria-label="Copy account number"
                      >
                        {copiedKey === "acc" ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs font-sans">
                      {copiedKey === "acc" ? "Copied account number!" : "Copy account number"}
                    </TooltipContent>
                  </Tooltip>
                </h3>
                <p className="text-xs text-text-secondary mt-0.5 leading-normal">
                  {metadata.account_holder_name} · <span className="capitalize">{metadata.account_type}</span>
                </p>
              </div>
            </div>

          {/* Opening and Closing balances */}
          <div className="flex items-center justify-around sm:justify-start gap-4 sm:gap-6 bg-brand/[0.03] dark:bg-brand/[0.08] px-4 py-2.5 rounded-xl border border-brand/15 dark:border-brand/25 w-full sm:w-auto">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary/80 font-mono">
                Opening Bal
              </p>
              <p className="font-num text-sm sm:text-base font-bold text-foreground tabular-nums mt-0.5">
                {formatINR(metadata.opening_balance)}
              </p>
            </div>
            <div className="h-7 w-px bg-border/80" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary/80 font-mono">
                Closing Bal
              </p>
              <p className="font-num text-sm sm:text-base font-bold text-foreground tabular-nums mt-0.5">
                {formatINR(metadata.closing_balance)}
              </p>
            </div>
          </div>
        </div>

        {/* Metadata Details Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 text-xs text-text-secondary">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-text-secondary/80 font-mono block">
              Branch & IFSC
            </span>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-medium text-foreground truncate block">
                {metadata.ifsc_code_branch}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => handleCopy(metadata.ifsc_code_branch, "ifsc")}
                    className="p-1 rounded-md text-text-secondary/60 hover:text-foreground hover:bg-surface-alt transition-colors cursor-pointer shrink-0"
                    aria-label="Copy branch and IFSC code"
                  >
                    {copiedKey === "ifsc" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs font-sans">
                  {copiedKey === "ifsc" ? "Copied branch & IFSC!" : "Copy branch & IFSC"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="space-y-1 min-w-0">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-text-secondary/80 font-mono block">
              Statement Coverage
            </span>
            <span className="font-medium text-foreground inline-flex items-center gap-1.5 font-mono text-[11px]">
              <Calendar className="h-3.5 w-3.5 text-brand shrink-0" />
              <span className="truncate">{metadata.statement_coverage_period}</span>
            </span>
          </div>

          <div className="space-y-1 min-w-0">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-text-secondary/80 font-mono block">
              Net Statement Delta
            </span>
            <div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-num text-xs sm:text-sm font-bold tabular-nums px-2 py-0.5 rounded-md border",
                  isNetPositive
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
                )}
              >
                {isNetPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 shrink-0" />
                )}
                {formatINR(deltaAmount, { sign: true })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Defensive disclaimer for multi-statement accounts */}
      {documentsCount > 1 && (
        <div className="flex items-center gap-1.5 px-1 text-xs text-text-secondary">
          <Info className="h-3.5 w-3.5 text-text-secondary/70 shrink-0" />
          <span>
            Showing details from your earliest statement on file — see Statements below for other accounts.
          </span>
        </div>
      )}
    </section>
    </TooltipProvider>
  );
}
