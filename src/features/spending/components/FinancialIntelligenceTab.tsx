import { useSpendingReport } from "../hooks/useSpendingReport";
import { IntelligenceSkeleton } from "./IntelligenceSkeleton";
import { HeaderMetadataPanel } from "./HeaderMetadataPanel";
import { ExecutiveSummaryGrid } from "./ExecutiveSummaryGrid";
import { MacroCashFlowSection } from "./MacroCashFlowSection";
import { ChannelDistributionSection } from "./ChannelDistributionSection";
import { TemporalPatternsSection } from "./TemporalPatternsSection";
import { EfficiencyProjectionsSection } from "./EfficiencyProjectionsSection";
import { AnomaliesOutliersSection } from "./AnomaliesOutliersSection";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface FinancialIntelligenceTabProps {
  isActive: boolean;
  documentsCount?: number;
}

export function FinancialIntelligenceTab({
  isActive,
  documentsCount = 1,
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
      {/* 1. Header Metadata Panel */}
      <HeaderMetadataPanel
        metadata={data.section_1_header_metadata}
        documentsCount={documentsCount}
      />

      {/* 2. Executive Scorecard */}
      <ExecutiveSummaryGrid items={data.executive_summary} />

      {/* 3. Macro Cash Flow & Liquidity Diagnostics */}
      <MacroCashFlowSection data={data.section_2_macro_cash_flow} />

      {/* 4. Channel & Payment Method Distribution */}
      <ChannelDistributionSection data={data.section_4_channel_distribution} />

      {/* 5. Temporal Patterns & Cyclicality */}
      <TemporalPatternsSection data={data.section_3_temporal_patterns} />

      {/* 6. Efficiency & Projections */}
      <EfficiencyProjectionsSection data={data.section_6_efficiency_projections} />

      {/* 7. Anomalies & Outliers */}
      <AnomaliesOutliersSection data={data.section_5_anomaly_risk} />
    </div>
  );
}
