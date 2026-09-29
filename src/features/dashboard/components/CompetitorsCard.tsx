import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Target } from "lucide-react";
import { useCompetitors, type CompetitorItem } from "../hooks/useCompanyAPI";

interface CompetitorsCardProps {
  hasProfile?: boolean;
}

export const CompetitorsCard: React.FC<CompetitorsCardProps> = ({ hasProfile = true }) => {
  const { data: competitors = [], isLoading } = useCompetitors({
    enabled: hasProfile,
  });

  return (
    <Card className="h-112.5 flex flex-col border border-border/70 shadow-sm bg-card">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold tracking-tight font-display text-foreground">
              Competitors
            </CardTitle>
            <p className="text-xs text-text-tertiary mt-0.5 font-medium">
              Sector peer benchmarking and market cap comparison
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between p-5 overflow-hidden">
        {isLoading ? (
          <div className="space-y-3 pt-2">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        ) : competitors.length > 0 ? (
          /* List register of competitors */
          <div className="space-y-2.5 overflow-y-auto custom-scrollbar pr-1">
            {competitors.map((item: CompetitorItem) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-surface-alt/40 border border-border/60 hover:border-purple-500/30 hover:bg-surface-alt/70 hover:-translate-y-0.5 transition-all duration-200 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-foreground font-display truncate">{item.name}</h4>
                  {item.market_cap && (
                    <span className="text-[10px] font-num tabular-nums px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 font-medium">
                      {item.market_cap}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Clearly labelled empty state as instructed in Step 8 & 0C */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 h-full my-auto">
            <div className="w-13 h-13 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-xs">
              <h3 className="font-bold text-base text-foreground">Competitor insights — launching soon</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automated peer tracking and market positioning will populate here once enabled in the intelligence pipeline.
              </p>
            </div>
          </div>
        )}

        {/* Footer noting external source */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-text-tertiary">
          <span>External synthesis</span>
          <span>Subject to change</span>
        </div>
      </CardContent>
    </Card>
  );
};
