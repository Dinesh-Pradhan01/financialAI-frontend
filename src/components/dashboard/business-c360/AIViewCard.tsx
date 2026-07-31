import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompanyAIView } from '@/hooks/useCompanyAPI';
import { Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Simple markdown to HTML renderer to avoid package dependency issues
const renderMarkdown = (markdown: string) => {
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />');
  
  return `<p>${html}</p>`;
};

export const AIViewCard = () => {
  const { data, isLoading, isError, refetch, isFetching } = useCompanyAIView();

  return (
    <Card className="h-[450px] flex flex-col border-indigo-500/20 shadow-lg bg-gradient-to-br from-indigo-500/5 via-card to-purple-500/5">
      <CardHeader className="border-b border-indigo-500/10 bg-indigo-500/5 pb-4">
        <CardTitle className="flex items-center justify-between text-xl text-indigo-600 dark:text-indigo-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            SpotLite AI View
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => refetch()} 
              className="p-1.5 rounded-md hover:bg-indigo-500/10 transition-colors"
              title="Refresh AI View"
            >
              <RefreshCw className={`w-4 h-4 text-indigo-500 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
            <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
              Powered by Gemini
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex-1 overflow-y-auto custom-scrollbar">
        {isLoading || isFetching ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <div className="pt-4 space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ) : isError || !data ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
            <BrainCircuit className="w-12 h-12 text-red-400" />
            <div className="space-y-1">
              <h3 className="font-medium">Failed to generate AI insights</h3>
              <p className="text-sm text-muted-foreground">SpotLite AI couldn't analyze the company right now.</p>
            </div>
            <button onClick={() => refetch()} className="text-sm text-indigo-500 hover:underline">
              Try again
            </button>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none 
                          prose-h1:text-xl prose-h1:font-bold prose-h1:mb-4
                          prose-h2:text-lg prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-indigo-600 dark:prose-h2:text-indigo-400
                          prose-h3:text-base prose-h3:font-medium
                          prose-p:text-muted-foreground prose-p:leading-relaxed
                          prose-li:text-muted-foreground
                          pr-2">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(data.markdown_content) }} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
