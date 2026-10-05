import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useCompanyRating, isSetupRequiredError } from "../hooks/useCompanyAPI";
import { RefreshCw, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/shared/lib/utils";

interface Props {
  hasProfile?: boolean;
}

export const CompanyRatingCard = ({ hasProfile = true }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } = useCompanyRating({
    enabled: hasProfile,
  });

  const formatSourceName = (src: string) => {
    const map: Record<string, string> = {
      glassdoor: "Glassdoor",
      ambitionbox: "AmbitionBox",
      crisil: "CRISIL",
      justdial: "Justdial",
      finology: "Finology",
    };
    return map[src.toLowerCase()] || src.charAt(0).toUpperCase() + src.slice(1);
  };

  const overallScore =
    typeof data?.overall_score === "number"
      ? data.overall_score
      : typeof (data as any)?.overall === "number"
      ? (data as any).overall / 20
      : Number(data?.overall_score) || 0;

  const overallGrade = data?.overall_grade?.trim() || "—";
  const sources = Array.isArray(data?.sources) ? data.sources : [];

  const getGradeBadgeStyle = () => {
    return "bg-card text-foreground border-border/80";
  };

  const dimensions = data
    ? [
        {
          key: "employee_experience" as const,
          label: "Employee Experience",
          score: typeof data.employee_experience === "number" ? data.employee_experience : 0,
        },
        {
          key: "creditworthiness" as const,
          label: "Creditworthiness",
          score: typeof data.creditworthiness === "number" ? data.creditworthiness : 0,
        },
        {
          key: "client_satisfaction" as const,
          label: "Client Satisfaction",
          score: typeof data.client_satisfaction === "number" ? data.client_satisfaction : 0,
        },
        {
          key: "stock_quality" as const,
          label: "Stock Quality",
          score: typeof data.stock_quality === "number" ? data.stock_quality : 0,
        },
      ]
    : [];

  const maxScore = dimensions.length > 0 ? Math.max(...dimensions.map((d) => d.score)) : 0;

  return (
    <Card className="h-112.5 flex flex-col border border-border/80 shadow-2xs bg-card rounded-xl">
      {/* ── 1. HEADER ──────────────────────────────────────────────────────── */}
      <CardHeader className="pb-3 pt-5 px-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold tracking-tight font-display text-foreground">
              Reputation
            </CardTitle>
            <p className="text-xs text-text-tertiary mt-0.5 font-medium">
              Public reputation & external market synthesis
            </p>
          </div>
          {hasProfile && !isLoading && (
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="text-text-tertiary hover:text-foreground hover:bg-surface-alt p-1.5 rounded-md transition-all active:scale-90 cursor-pointer disabled:opacity-40"
              title="Refresh public rating synthesis"
              aria-label="Refresh public rating synthesis"
            >
              <RefreshCw
                className={cn(
                  "w-3.5 h-3.5 transition-transform",
                  isFetching && "animate-spin text-primary"
                )}
              />
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between px-5 sm:px-6 pb-5 pt-0">
        {isLoading || (hasProfile && isFetching && !data) ? (
          /* State: Loading Skeleton */
          <div className="flex-1 flex flex-col justify-between space-y-4 pt-1">
            {/* Summary skeleton */}
            <div className="p-3.5 rounded-lg bg-surface-alt/40 border border-border/50 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-7 w-28" />
              </div>
              <div className="space-y-1.5 text-right">
                <Skeleton className="h-2.5 w-16 ml-auto" />
                <Skeleton className="h-7 w-12 ml-auto rounded" />
              </div>
            </div>

            {/* Scorecard rows skeleton */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center pb-1">
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="h-2.5 w-16" />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="py-2 flex items-center justify-between gap-3">
                  <Skeleton className="h-3.5 w-32" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-1.5 w-24 rounded-xs" />
                    <Skeleton className="h-3.5 w-12" />
                  </div>
                </div>
              ))}
            </div>

            {/* Evidence skeleton */}
            <div className="pt-3 border-t border-border/40 space-y-2 mt-auto">
              <Skeleton className="h-2.5 w-24" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-5 w-14 rounded-md" />
              </div>
            </div>
          </div>
        ) : !hasProfile || (isError && isSetupRequiredError(error)) ? (
          /* State: Setup Required */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full my-auto">
            <div className="w-12 h-12 rounded-xl bg-surface-alt border border-border/70 text-text-secondary flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-text-secondary" />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h3 className="font-bold text-sm text-foreground">Score Unlocks with Profile</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Complete company setup and statutory registration to generate your external rating scorecard.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate({ to: "/onboarding" })}
              className="rounded-lg text-xs font-semibold gap-1.5 cursor-pointer mt-1 hover:border-primary/40 hover:bg-primary/5"
            >
              Complete Setup <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        ) : isError || !data ? (
          /* State: API Error */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3.5 h-full my-auto">
            <div className="w-11 h-11 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-foreground">Unable to Load Scorecard</h3>
              <p className="text-xs text-muted-foreground">Server error while retrieving external market synthesis.</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => refetch()}
              className="cursor-pointer text-xs"
            >
              Retry Calculation
            </Button>
          </div>
        ) : (
          /* State: Ready — Structured Analytical Scorecard */
          <div className="flex-1 flex flex-col justify-between space-y-4 pt-1">
            {/* ── 2. EXECUTIVE RATING SUMMARY (CONCLUSION) ────────────────── */}
            <div className="p-3.5 rounded-lg bg-surface-alt/40 border border-border/60 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary font-mono block">
                  Overall Score
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold font-mono tracking-tight tabular-nums text-foreground">
                    {overallScore.toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-text-tertiary font-medium">
                    / 5.0
                  </span>
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary font-mono block">
                  Rating Grade
                </span>
                <div
                  className={cn(
                    "inline-flex items-center justify-center px-3 py-1 rounded shadow-2xs border font-mono font-bold tracking-wider text-sm",
                    getGradeBadgeStyle()
                  )}
                >
                  {overallGrade}
                </div>
              </div>
            </div>

            {/* ── 3. RATING PROFILE (STRUCTURED SCORECARD) ───────────────── */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-text-tertiary px-1 pb-1">
                <span>Rating Profile</span>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block font-mono text-[9px] text-text-tertiary">
                    Scale (0 — 5)
                  </span>
                  <span className="w-14 text-right font-mono">Score</span>
                </div>
              </div>

              <div className="divide-y divide-border/40 border-y border-border/60">
                {dimensions.map((dim) => {
                  const scoreVal = typeof dim.score === "number" ? dim.score : 0;
                  const isTop = scoreVal === maxScore && maxScore > 0;

                  return (
                    <div
                      key={dim.key}
                      className="group/row py-2.5 px-1.5 -mx-1 rounded-md flex items-center justify-between gap-3 hover:bg-primary/[0.03] transition-colors"
                    >
                      <div className="min-w-0 flex-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-foreground block truncate group-hover/row:text-primary transition-colors">
                          {dim.label}
                        </span>
                        {isTop && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-primary/10 text-primary font-medium tracking-tight uppercase shrink-0">
                            Leading
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* 5-Unit Discrete Analytical Micro-Scale */}
                        <div
                          className="w-20 sm:w-28 flex items-center gap-1"
                          aria-label={`${dim.label} score ${scoreVal.toFixed(1)} out of 5`}
                          role="meter"
                          aria-valuenow={scoreVal}
                          aria-valuemin={0}
                          aria-valuemax={5}
                        >
                          {[1, 2, 3, 4, 5].map((step) => {
                            const stepFill = Math.min(
                              Math.max((scoreVal - (step - 1)) * 100, 0),
                              100
                            );
                            return (
                              <div
                                key={step}
                                className="flex-1 h-1 bg-border/60 rounded-xs overflow-hidden"
                              >
                                <div
                                  className={cn(
                                    "h-full transition-all duration-300",
                                    isTop
                                      ? "bg-primary group-hover/row:bg-primary-hi"
                                      : "bg-primary/80 group-hover/row:bg-primary"
                                  )}
                                  style={{ width: `${stepFill}%` }}
                                />
                              </div>
                            );
                          })}
                        </div>

                        {/* Exact Tabular Mono Score Column */}
                        <div className="w-14 text-right font-mono tabular-nums text-xs font-semibold text-foreground group-hover/row:text-primary transition-colors">
                          {scoreVal.toFixed(1)}
                          <span className="text-[10px] font-normal text-text-tertiary ml-0.5">
                            /5.0
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── 4. EXTERNAL EVIDENCE (PROVENANCE) ───────────────────────── */}
            {sources.length > 0 && (
              <div className="pt-3 border-t border-border/50 space-y-1.5 mt-auto">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                  <span>External Evidence</span>
                  <span className="font-mono text-[9px] font-normal lowercase tracking-normal">
                    {sources.length} sources synthesized
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary font-medium leading-relaxed">
                  {sources.map((src, idx) => (
                    <React.Fragment key={src}>
                      <span className="text-foreground/90 font-medium">
                        {formatSourceName(src)}
                      </span>
                      {idx < sources.length - 1 && (
                        <span className="text-text-tertiary mx-1.5 select-none font-normal">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
