import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompanyRating } from '@/hooks/useCompanyAPI';
import { Star, ShieldCheck, FileCheck2, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const CompanyRatingCard = () => {
  const { data, isLoading, isError, refetch } = useCompanyRating();

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-12 w-24" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="h-full bg-red-500/10 border-red-500/20">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full">
          <Star className="w-12 h-12 text-red-400" />
          <div className="space-y-1">
            <h3 className="font-medium">Failed to load rating</h3>
            <p className="text-sm text-muted-foreground">We couldn't calculate the company rating.</p>
          </div>
          <button onClick={() => refetch()} className="text-sm text-blue-500 hover:underline">
            Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="h-[450px] flex flex-col border-none shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Star className="w-5 h-5 text-purple-500" />
          Company Rating
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-6 mb-8">
          <div className={`relative flex items-center justify-center w-20 h-20 rounded-full border-4 ${
            data.overall >= 80 ? 'border-green-500/20' : data.overall >= 50 ? 'border-yellow-500/20' : 'border-red-500/20'
          }`}>
            <span className={`text-3xl font-bold ${getScoreColor(data.overall)}`}>{data.overall}</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Out of 100</h3>
            <p className="text-sm text-muted-foreground">Based on SpotLite intelligence</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> Verification
              </span>
              <span className="text-sm font-bold">{data.verification}/100</span>
            </div>
            <Progress value={data.verification} className="h-2" indicatorColor={getProgressColor(data.verification)} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-500" /> Documents
              </span>
              <span className="text-sm font-bold">{data.documents}/100</span>
            </div>
            <Progress value={data.documents} className="h-2" indicatorColor={getProgressColor(data.documents)} />
          </div>

          <div className="space-y-2 opacity-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-500" /> Financial Health
              </span>
              <span className="text-xs border px-2 py-0.5 rounded text-muted-foreground bg-muted">Coming Soon</span>
            </div>
            <Progress value={0} className="h-2 bg-muted/50" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
