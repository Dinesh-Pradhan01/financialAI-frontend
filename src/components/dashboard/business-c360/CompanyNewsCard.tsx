import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompanyNews } from '@/hooks/useCompanyAPI';
import { Newspaper, ExternalLink, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const CompanyNewsCard = () => {
  const { data, isLoading, isError, refetch, isFetching } = useCompanyNews();

  return (
    <Card className="h-[450px] flex flex-col border-none shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-indigo-500" />
            Company News
          </div>
          <button 
            onClick={() => refetch()} 
            className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="Refresh News"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 px-6 pb-6">
        {isLoading || isFetching ? (
          <div className="space-y-4 pt-4">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        ) : isError || !data ? (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full">
            <Newspaper className="w-12 h-12 text-red-400" />
            <div className="space-y-1">
              <h3 className="font-medium">Failed to load news</h3>
              <p className="text-sm text-muted-foreground">We couldn't fetch the latest company news.</p>
            </div>
            <button onClick={() => refetch()} className="text-sm text-blue-500 hover:underline">
              Try again
            </button>
          </div>
        ) : (
          <div className="space-y-4 h-full overflow-y-auto pr-2 pt-4 custom-scrollbar">
            {data.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground text-sm">
                No recent news found for this company or industry.
              </div>
            ) : (
              data.map((news) => (
                <div key={news.id} className="group p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      {news.source}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{news.date}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
                    {news.headline}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
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
