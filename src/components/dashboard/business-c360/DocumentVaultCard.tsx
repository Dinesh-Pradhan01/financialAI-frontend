import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompanyDocuments, useUploadCompanyDocument, useDeleteCompanyDocument } from '@/hooks/useCompanyAPI';
import { FolderLock, FileText, Trash2, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const DocumentVaultCard = () => {
  const { data: documents, isLoading, refetch } = useCompanyDocuments();
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
        // Map 'mandatory' to 'Verification' for better UX, or just add it
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

  return (
    <Card className="h-full border-none shadow-lg bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <FolderLock className="w-5 h-5 text-green-500" />
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
          <Button variant="outline" size="sm" disabled={isUploading}>
            {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((category) => {
            const catDocs = documents?.filter(d => d.document_category === category) || [];
            if (catDocs.length === 0 && category !== 'Other') return null;
            
            return (
              <div key={category} className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{category}</h4>
                {catDocs.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">No documents in this category.</p>
                ) : (
                  <div className="space-y-2">
                    {catDocs.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="p-2 bg-background rounded shadow-sm shrink-0">
                            <FileText className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-medium truncate">{doc.original_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(doc.file_size_bytes / 1024).toFixed(1)} KB • {doc.document_type}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                          onClick={() => deleteMutation.mutate(doc.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
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
