import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";

export type FinancialsViewTab = "quarterly" | "annual";

interface PeriodTabsProps {
  value: FinancialsViewTab;
  onValueChange: (value: FinancialsViewTab) => void;
  className?: string;
}

/**
 * PeriodTabs
 *
 * Accessible tab switcher for Quarterly vs Annual financials.
 * Reuses shared Tabs component backed by Radix UI:
 * - WAI-ARIA role="tablist"
 * - Roving tabindex
 * - Arrow-key navigation & Home/End support
 * - State synchronized with the URL search param (?view=quarterly|annual)
 */
export const PeriodTabs: React.FC<PeriodTabsProps> = React.memo(function PeriodTabs({
  value,
  onValueChange,
  className,
}) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Tabs
        value={value}
        onValueChange={(val) => onValueChange(val as FinancialsViewTab)}
        className="w-full sm:w-auto"
      >
        <TabsList className="grid grid-cols-2 w-full sm:w-64 bg-surface-alt border border-border-c p-1 rounded-lg">
          <TabsTrigger
            value="quarterly"
            className="text-xs font-semibold data-[state=active]:bg-surface data-[state=active]:text-text-primary data-[state=active]:shadow-2xs rounded-md"
          >
            Quarterly
          </TabsTrigger>
          <TabsTrigger
            value="annual"
            className="text-xs font-semibold data-[state=active]:bg-surface data-[state=active]:text-text-primary data-[state=active]:shadow-2xs rounded-md"
          >
            Annual
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
});
