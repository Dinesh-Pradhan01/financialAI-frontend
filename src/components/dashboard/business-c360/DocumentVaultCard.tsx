import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompanyDocuments, useUploadCompanyDocument, useDeleteCompanyDocument, isSetupRequiredError } from '@/hooks/useCompanyAPI';
import { FolderLock, FileText, Trash2, Plus, Loader2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';

interface Props {
  hasProfile?: boolean;
}

export const DocumentVaultCard = ({ hasProfile = true }: Props) => {
  const { data: documents, isLoading, isError, error, refetch, isFetching } = useCompanyDocuments({
    enabled: hasProfile,
  });
  const uploadMutation = useUploadCompanyDocument();
  const deleteMutation = useDeleteCompanyDocument();
  
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', file.name.split('.')[0]);
    formData.append('document_category', category);

    uploadMutation.mutate(formData, {
      onSettled: () => {
        setIsUploading(false);
        if (e.target) e.target.value = '';
      }
    });
  };

  // Default categories to show even if empty (except Other which shows if empty anyway)
  const defaultCategories = ['Financial', 'Compliance', 'Insurance', 'Verification'];
  
  // Extract any additional categories from the documents (e.g., 'mandatory' from onboarding)
  const allCategories = new Set(defaultCategories);
  if (documents) {
    documents.forEach(doc => {
      if (doc.document_category) {
        if (doc.document_category.toLowerCase() === 'mandatory') {
          doc.document_category = 'Verification';
        } else {
          allCategories.add(doc.document_category);
        }
      }
    });
  }
  allCategories.add('Other');
  
  const categories = Array.from(allCategories);

  if (isLoading) {
    return (
      <Card className="h-full border border-border/70 shadow-sm">
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

  // State: Setup Required (Expected first-time state)
  if (!hasProfile || (isError && isSetupRequiredError(error))) {
    return (
      <Card className="h-full border border-border/70 shadow-sm bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <FolderLock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Document Vault
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-muted/40 border border-border/50 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Secure document storage</h4>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-xl">
                  Upload verification documents, GST/PAN certificates, and statements to enrich your company intelligence.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.dispatchEvent(new CustomEvent("open-onboarding"))}
              className="rounded-pill text-xs font-semibold gap-1.5 cursor-pointer shrink-0"
            >
              Complete Setup <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // State: Genuine API error
  if (isError) {
    return (
      <Card className="h-full border border-destructive/30 bg-destructive/5 shadow-sm">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 text-left gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-destructive/10 rounded-xl shrink-0 text-destructive">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Could not load documents</h3>
              <p className="text-sm text-muted-foreground">
                We encountered an error while loading your vault.
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
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // State: Ready
  return (
    <Card className="h-full border border-border/70 shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <FolderLock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Document Vault
        </CardTitle>
        <div className="relative overflow-hidden">
          <input
            type="file"
            id="vault-upload"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={(e) => handleFileUpload(e, 'Other')}
            disabled={isUploading}
          />
          <Button variant="outline" size="sm" disabled={isUploading} className="cursor-pointer text-xs rounded-pill">
            {isUploading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Plus className="w-3.5 h-3.5 mr-1.5" />}
            Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          {categories.map((category) => {
            const catDocs = documents?.filter(d => d.document_category === category) || [];
            if (catDocs.length === 0 && category !== 'Other') return null;
            
            return (
              <div key={category} className="space-y-2.5">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{category}</h4>
                {catDocs.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic pl-1">No documents in this category.</p>
                ) : (
                  <div className="space-y-2">
                    {catDocs.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="p-2 bg-background rounded shadow-2xs shrink-0">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-medium truncate">{doc.original_name}</p>
                            <p className="text-[11px] text-muted-foreground font-num">
                              {(doc.file_size_bytes / 1024).toFixed(1)} KB • {doc.document_type}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 cursor-pointer h-8 w-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                          onClick={() => deleteMutation.mutate(doc.id)}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending && deleteMutation.variables === doc.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
