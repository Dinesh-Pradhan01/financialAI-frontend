import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompanyRating, isSetupRequiredError } from '@/hooks/useCompanyAPI';
import { Star, ShieldCheck, FileCheck2, Activity, RefreshCw, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

interface Props {
  hasProfile?: boolean;
}

export const CompanyRatingCard = ({ hasProfile = true }: Props) => {
  const { data, isLoading, isError, error, refetch, isFetching } = useCompanyRating({
    enabled: hasProfile,
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-primary';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-primary';
  };

  return (
    <Card className="h-[450px] flex flex-col border border-border/70 shadow-sm bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg font-bold tracking-tight">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Company Rating
          </div>
          {hasProfile && !isLoading && (
            <button 
              onClick={() => refetch()} 
              disabled={isFetching}
              className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
              title="Refresh Rating"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        {isLoading || (hasProfile && isFetching && !data) ? (
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-12 w-24" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : !hasProfile || (isError && isSetupRequiredError(error)) ? (
          /* State: Setup Required (Expected empty state) */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full my-auto">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Star className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h3 className="font-bold text-base text-foreground">Score Unlocks with Profile</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Complete your company profile and upload verification documents to compute your Business C360 score.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.dispatchEvent(new CustomEvent("open-onboarding"))}
              className="rounded-pill text-xs font-semibold gap-1.5 cursor-pointer mt-1"
            >
              Complete Setup <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        ) : isError || !data ? (
          /* State: Genuine API failure */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3.5 h-full my-auto">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-foreground">Could not load rating</h3>
              <p className="text-xs text-muted-foreground">Server error while calculating score.</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => refetch()} className="cursor-pointer">
              Try again
            </Button>
          </div>
        ) : (
          /* State: Ready */
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-5">
              <div className={`relative flex items-center justify-center w-18 h-18 rounded-full border-4 border-primary/20`}>
                <span className={`text-2xl font-extrabold font-num ${getScoreColor(data.overall)}`}>
                  {data.overall}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Out of 100</h3>
                <p className="text-xs text-muted-foreground">SpotLite composite rating</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium flex items-center gap-1.5 text-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Verification
                  </span>
                  <span className="font-bold font-num">{data.verification}/100</span>
                </div>
                <Progress value={data.verification} className="h-2" indicatorColor={getProgressColor(data.verification)} />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium flex items-center gap-1.5 text-foreground">
                    <FileCheck2 className="w-4 h-4 text-primary" /> Documents
                  </span>
                  <span className="font-bold font-num">{data.documents}/100</span>
                </div>
                <Progress value={data.documents} className="h-2" indicatorColor={getProgressColor(data.documents)} />
              </div>

              <div className="space-y-1.5 opacity-60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium flex items-center gap-1.5 text-muted-foreground">
                    <Activity className="w-4 h-4" /> Financial Health
                  </span>
                  <span className="text-[10px] border px-1.5 py-0.5 rounded text-muted-foreground bg-muted font-medium">Coming Soon</span>
                </div>
                <Progress value={0} className="h-2 bg-muted/50" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
