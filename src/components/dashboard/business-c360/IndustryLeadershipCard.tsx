import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useIndustryLeaders } from '@/hooks/useCompanyAPI';
import { Trophy, TrendingUp, BarChart3 } from 'lucide-react';

export const IndustryLeadershipCard = () => {
  const { data, isLoading, isError, refetch } = useIndustryLeaders();

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="h-full bg-red-500/10 border-red-500/20">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full">
          <Trophy className="w-12 h-12 text-red-400" />
          <div className="space-y-1">
            <h3 className="font-medium">Failed to load ranking</h3>
            <p className="text-sm text-muted-foreground">We couldn't fetch the industry leadership board.</p>
          </div>
          <button onClick={() => refetch()} className="text-sm text-blue-500 hover:underline">
            Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-none shadow-lg bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-yellow-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Industry Leadership
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((leader, index) => (
            <div key={leader.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-border">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/30' :
                  index === 1 ? 'bg-gray-300/20 text-gray-500 border border-gray-300/30' :
                  index === 2 ? 'bg-amber-600/20 text-amber-700 border border-amber-600/30' :
                  'bg-background text-muted-foreground'
                }`}>
                  #{index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{leader.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <TrendingUp className="w-3 h-3" />
                    Top Tier
                  </div>
                </div>
              </div>
              {leader.market_cap && (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Est. Value</span>
                  <span className="font-semibold text-sm">{leader.market_cap}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
