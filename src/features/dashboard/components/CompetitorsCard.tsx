import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Target,
  RefreshCw,
  AlertCircle,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCompetitors, isSetupRequiredError, type CompetitorItem } from "../hooks/useCompanyAPI";
import { CompetitorDetailDialog } from "./CompetitorDetailDialog";

interface CompetitorsCardProps {
  hasProfile?: boolean;
}

export const CompetitorsCard: React.FC<CompetitorsCardProps> = ({ hasProfile = true }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } = useCompetitors({
    enabled: hasProfile,
  });

  const [selected, setSelected] = useState<CompetitorItem | null>(null);

  const competitors = data?.competitors ?? [];
  const rawText = data?.rawText;
  const isFallback = Boolean(data?.isFallback);

  return (
    <>
      <Card className="h-112.5 flex flex-col border border-border/70 shadow-sm bg-card">
        <CardHeader className="pb-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold tracking-tight font-display text-foreground">
                  Competitors
                </CardTitle>
                <p className="text-xs text-text-tertiary mt-0.5 font-medium">
                  Click any competitor for details and research links
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasProfile && !isLoading && (
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Refresh Competitors"
                  aria-label="Refresh Competitors"
                >
                  <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
                </button>
              )}
              <Badge
                variant="outline"
                className={
                  isFallback
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] font-semibold"
                    : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-[10px] font-semibold flex items-center gap-1"
                }
              >
                {isFallback ? (
                  "Sector Benchmark"
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" /> AI Synthesis
                  </>
                )}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between p-5 overflow-hidden">
          {isLoading || (hasProfile && isFetching && !data) ? (
            <div className="space-y-3 pt-2">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          ) : !hasProfile || (isError && isSetupRequiredError(error)) ? (
            /* State: Setup Required */
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full my-auto">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h3 className="font-bold text-base text-foreground">Competitor Benchmarking</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Complete your business profile to activate automated competitor discovery and market overlap insights.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate({ to: "/onboarding" })}
                className="rounded-pill text-xs font-semibold gap-1.5 cursor-pointer mt-1"
              >
                Complete Profile <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : isError || (!data && !isLoading) ? (
            /* State: Genuine API failure */
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3.5 h-full my-auto">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-semibold text-sm text-foreground">Could not load competitors</h3>
                <p className="text-xs text-muted-foreground">
                  {(error as Error)?.message || "Server error while fetching competitive intelligence."}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => refetch()}
                className="cursor-pointer text-xs"
              >
                Try again
              </Button>
            </div>
          ) : competitors.length > 0 ? (
            /* Clickable competitor list */
            <div className="space-y-2.5 overflow-y-auto custom-scrollbar pr-1">
              {competitors.map((item: CompetitorItem) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item)}
                  className="w-full text-left p-3.5 rounded-xl bg-surface-alt/40 border border-border/60 hover:border-purple-500/30 hover:bg-surface-alt/70 hover:-translate-y-0.5 transition-all duration-200 space-y-2 cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-foreground font-display truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.location && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-text-tertiary px-2 py-0.5 rounded-md bg-muted/50 border border-border/40">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="truncate max-w-28">{item.location}</span>
                        </span>
                      )}
                      {item.market_cap && (
                        <span className="text-[10px] font-num tabular-nums px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 font-medium">
                          {item.market_cap}
                        </span>
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {item.services && (
                    <div className="flex items-start gap-1.5 text-xs text-text-secondary">
                      <Briefcase className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{item.services}</span>
                    </div>
                  )}

                  {(item.overlap_summary || item.description) && (
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {item.overlap_summary || item.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          ) : rawText ? (
            /* Unstructured markdown or text from intelligence feed */
            <div className="overflow-y-auto custom-scrollbar p-3.5 rounded-xl bg-surface-alt/40 border border-border/60 text-xs text-text-secondary leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-foreground font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Competitor Intelligence Analysis</span>
              </div>
              <div className="prose prose-xs dark:prose-invert max-w-none text-xs text-text-secondary">
                <ReactMarkdown>{rawText}</ReactMarkdown>
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 h-full my-auto">
              <div className="w-13 h-13 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-bold text-base text-foreground">No Competitors Identified</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automated peer tracking did not find direct competitors. Click below to refresh the search.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => refetch()}
                className="cursor-pointer text-xs"
              >
                Scan Competitors
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-text-tertiary">
            <span>{isFallback ? "Sector benchmark models" : "AI web competitive intelligence"}</span>
            <span>Click a card to explore</span>
          </div>
        </CardContent>
      </Card>

      <CompetitorDetailDialog
        competitor={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  );
};
