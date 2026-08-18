import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useIndustryLeaders, isSetupRequiredError } from '@/hooks/useCompanyAPI';
import { Trophy, TrendingUp, AlertCircle, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

interface Props {
  hasProfile?: boolean;
}

export const IndustryLeadershipCard = ({ hasProfile = true }: Props) => {
  const { data, isLoading, isError, error, refetch, isFetching } = useIndustryLeaders({
    enabled: hasProfile,
  });

  if (isLoading) {
    return (
      <Card className="h-full border border-border/70 shadow-sm">
        <CardHeader>
          <Skeleton className="h-6 w-44" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  // State: Setup Required / Profile missing (Expected first-time state)
  if (!hasProfile || (isError && isSetupRequiredError(error))) {
    return (
      <Card className="h-full border border-border/70 shadow-sm bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 bg-amber-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Trophy className="w-5 h-5 text-amber-500" />
            Industry Leadership
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-xl bg-muted/40 border border-border/50 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Industry benchmarking unlocks with profile setup</h4>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-xl">
                  We'll automatically benchmark your business against top tier industry competitors once your company category is defined.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.dispatchEvent(new CustomEvent("open-onboarding"))}
              className="rounded-pill text-xs font-semibold gap-1.5 cursor-pointer shrink-0"
            >
              Complete Profile <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // State: Genuine system/API failure
  if (isError || !data) {
    return (
      <Card className="h-full border border-destructive/30 bg-destructive/5 shadow-sm">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 text-left gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-destructive/10 rounded-xl shrink-0 text-destructive">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Could not load industry leadership board</h3>
              <p className="text-sm text-muted-foreground">
                We couldn't retrieve the industry ranking at this time.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // State: Ready / Data populated
  return (
    <Card className="h-full border border-border/70 shadow-sm bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-yellow-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <Trophy className="w-5 h-5 text-amber-500" />
          Industry Leadership
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((leader, index) => (
            <div key={leader.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors border border-border/40 hover:border-border">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                  index === 0 ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30' :
                  index === 1 ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700' :
                  index === 2 ? 'bg-amber-700/20 text-amber-800 dark:text-amber-300 border border-amber-700/30' :
                  'bg-background text-muted-foreground'
                }`}>
                  #{index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{leader.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    Top Tier
                  </div>
                </div>
              </div>
              {leader.market_cap && (
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Est. Market Value</span>
                  <span className="font-bold text-sm font-num">{leader.market_cap}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
