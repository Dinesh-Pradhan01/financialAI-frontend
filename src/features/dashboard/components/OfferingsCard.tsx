import React from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Badge } from "@/shared/components/ui/badge";
import { PackageOpen, Sparkles, Layers } from "lucide-react";
import { useOnboardingStatus } from "../hooks/useCompanyAPI";

export const OfferingsCard: React.FC = () => {
  const { data: onboardingData, isLoading } = useOnboardingStatus();

  if (isLoading) {
    return (
      <Card className="h-full border border-border/80 shadow-xs bg-surface p-6 sm:p-8 flex flex-col justify-between">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-16 w-full rounded-xl mt-4" />
        </div>
        <Skeleton className="h-8 w-28 rounded-md mt-6" />
      </Card>
    );
  }

  const leadershipInfo = onboardingData?.leadership_info;
  const primaryProductService = leadershipInfo?.primary_product_service?.trim() || null;
  const businessModel = leadershipInfo?.business_model?.trim() || null;

  const hasOfferings = Boolean(primaryProductService || businessModel);

  return (
    <Card className="h-full border border-border/80 shadow-xs bg-surface flex flex-col justify-between p-6 sm:p-8 group hover:border-border transition-colors">
      <div className="space-y-4">
        {/* Header with Title and Sub-label */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <PackageOpen className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground font-display">
                Offerings
              </CardTitle>
            </div>
            {businessModel && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary font-medium text-xs px-2.5 py-0.5 border border-primary/20"
              >
                {businessModel}
              </Badge>
            )}
          </div>
          <p className="text-xs text-text-tertiary mt-1 font-medium pl-11">
            As declared by the company
          </p>
        </div>

        {/* Content or Empty State */}
        {hasOfferings ? (
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-linear-to-br from-primary/[0.04] via-surface to-surface-alt/40 border border-primary/15 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Primary Products & Services</span>
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {primaryProductService || "General commercial offerings"}
              </p>
            </div>

            {businessModel && (
              <div className="flex items-center gap-2 text-xs text-text-secondary pt-1">
                <Layers className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                <span>Operating Model:</span>
                <span className="font-semibold text-foreground">{businessModel}</span>
              </div>
            )}
          </div>
        ) : (
          /* Empty state: calm hairline container */
          <div className="py-8 px-4 rounded-xl bg-surface-alt/30 border border-border/40 flex flex-col items-center justify-center text-center space-y-2.5 my-auto">
            <PackageOpen className="w-7 h-7 text-text-tertiary/50" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground/80">No offerings added yet</p>
              <p className="text-[11px] text-text-tertiary max-w-xs leading-relaxed">
                Product lines and commercial services can be recorded during onboarding or profile
                review.
              </p>
            </div>
            <Link
              to="/onboarding"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 pt-0.5"
            >
              <span>+ Record Offerings</span>
            </Link>
          </div>
        )}
      </div>

      {/* Footer subtle attribution */}
      <div className="pt-4 border-t border-border/50 text-[11px] text-text-tertiary">
        Curated commercial profile
      </div>
    </Card>
  );
};
