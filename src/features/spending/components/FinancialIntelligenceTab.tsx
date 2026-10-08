import { useSpendingReport } from "../hooks/useSpendingReport";
import { IntelligenceSkeleton } from "./IntelligenceSkeleton";
import { ChannelDistributionSection } from "./ChannelDistributionSection";
import { TemporalPatternsSection } from "./TemporalPatternsSection";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface FinancialIntelligenceTabProps {
  isActive: boolean;
  documentsCount?: number;
}

export function FinancialIntelligenceTab({
  isActive,
}: FinancialIntelligenceTabProps) {
  const { data, isLoading, isError, error, refetch, isFetching } = useSpendingReport({
    enabled: isActive,
  });

  if (isLoading) {
    return <IntelligenceSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center my-6 shadow-xs max-w-xl mx-auto">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-3 shadow-xs">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-foreground text-balance">
          Unable to Synthesize Intelligence Report
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
          {error instanceof Error
            ? error.message
            : "The calculation service timed out while aggregating multi-statement cash trajectories."}
        </p>
        <p className="text-[11px] text-text-secondary/80 mt-2 font-mono">
          Your uploaded statement files and transaction ledgers remain completely safe and uncorrupted.
        </p>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          variant="outline"
          className="mt-5 inline-flex items-center gap-2 rounded-xl text-xs font-semibold cursor-pointer"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
          {isFetching ? "Recalculating Intelligence…" : "Retry Calculation"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 mt-4 animate-in fade-in duration-200">
      {/* 1. Channel & Payment Method Distribution */}
      <ChannelDistributionSection data={data.section_4_channel_distribution} />

      {/* 2. Temporal Patterns & Cyclicality */}
      <TemporalPatternsSection data={data.section_3_temporal_patterns} />
    </div>
  );
}
