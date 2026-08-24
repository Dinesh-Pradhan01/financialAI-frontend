import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useCompanyNews, isSetupRequiredError } from '../hooks/useCompanyAPI';
import { Newspaper, ExternalLink, RefreshCw, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Link, useNavigate } from '@tanstack/react-router';

interface Props {
  hasProfile?: boolean;
}

export const CompanyNewsCard = ({ hasProfile = true }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } = useCompanyNews({
    enabled: hasProfile,
  });

  return (
    <Card className="h-[450px] flex flex-col border border-border/70 shadow-sm bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg font-bold tracking-tight">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Company News
          </div>
          {hasProfile && !isLoading && (
            <button 
              onClick={() => refetch()} 
              disabled={isFetching}
              className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
              title="Refresh News"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 px-6 pb-6 flex flex-col justify-between">
        {isLoading || (hasProfile && isFetching && !data) ? (
          <div className="space-y-4 pt-3">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        ) : !hasProfile || (isError && isSetupRequiredError(error)) ? (
          /* State: Setup Required (Expected empty state) */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full my-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <Newspaper className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h3 className="font-bold text-base text-foreground">Curated Industry News</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Market trends and relevant company news will be aggregated automatically once your industry is configured.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate({ to: "/onboarding" })}
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
              <h3 className="font-semibold text-sm text-foreground">Could not load news</h3>
              <p className="text-xs text-muted-foreground">Server error while fetching news feeds.</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => refetch()} className="cursor-pointer">
              Try again
            </Button>
          </div>
        ) : (
          /* State: Ready */
          <div className="space-y-3 h-full overflow-y-auto pr-1 pt-2 custom-scrollbar">
            {data.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground text-xs my-auto">
                No recent news found for this company or industry.
              </div>
            ) : (
              data.map((news) => (
                <div key={news.id} className="group p-3.5 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <Badge variant="outline" className="text-[10px] font-normal px-2 py-0">
                      {news.source}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{news.date}</span>
                  </div>
                  <h4 className="font-semibold text-xs mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                    {news.headline}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
