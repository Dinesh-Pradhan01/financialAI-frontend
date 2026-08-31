import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useCompanyAIView, isSetupRequiredError } from '../hooks/useCompanyAPI';
import { Sparkles, BrainCircuit, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Link, useNavigate } from '@tanstack/react-router';

interface Props {
  hasProfile?: boolean;
}

export const AIViewCard = ({ hasProfile = true }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } = useCompanyAIView({
    enabled: hasProfile,
  });

  return (
    <Card className="h-112.5 flex flex-col border border-border/70 shadow-sm bg-card overflow-hidden">
      <CardHeader className="border-b border-border/40 pb-3 bg-muted/20">
        <CardTitle className="flex items-center justify-between text-lg font-bold tracking-tight">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            SpotLite AI View
          </div>
          <div className="flex items-center gap-2">
            {hasProfile && !isLoading && (
              <button 
                onClick={() => refetch()} 
                disabled={isFetching}
                className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                title="Refresh AI View"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
              </button>
            )}
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold">
              Powered by Gemini
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-between">
        {isLoading || (hasProfile && isFetching && !data) ? (
          <div className="space-y-3 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <div className="pt-3 space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ) : !hasProfile || (isError && isSetupRequiredError(error)) ? (
          /* State: Setup Required (Expected empty state) */
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full my-auto">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h3 className="font-bold text-base text-foreground">AI Intelligence Synthesis</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                SpotLite AI will generate executive recommendations and business risk analysis once your company profile is active.
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
              <h3 className="font-semibold text-sm text-foreground">Could not generate AI insights</h3>
              <p className="text-xs text-muted-foreground">SpotLite AI service encountered a temporary error.</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => refetch()} className="cursor-pointer">
              Try again
            </Button>
          </div>
        ) : (
          /* State: Ready */
          <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed text-muted-foreground pr-1 space-y-2">
            <ReactMarkdown>{data.markdown_content}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
