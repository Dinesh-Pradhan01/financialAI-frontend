import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import type { CompanyDocument, PackageResponse, PackageRequest } from "@/shared/types/api";
import {
  applyDeleteDocumentOptimistic,
  applyReplaceDocumentOptimistic,
} from "../lib/optimisticTransforms";

// ---------------------------------------------------------------------------
// Document Hooks
// ---------------------------------------------------------------------------

/**
 * List all company documents. Reuses the existing queryKeys.company.documents() key.
 */
export const useDocuments = () => {
  return useQuery({
    queryKey: queryKeys.company.documents(),
    queryFn: () => api.get<CompanyDocument[]>("/api/company/documents"),
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Upload a new company document.
 */
export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      api.upload<CompanyDocument>("/api/company/documents", formData),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.company.documents() });
      queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
      queryClient.refetchQueries({ queryKey: queryKeys.company.rating() });
    },
  });
};

/**
 * Replace an existing company document (PUT /api/company/documents/{doc_id})
 * with optimistic UI timestamp touch and multi-key cancellation.
 */
export const useReplaceDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ docId, formData }: { docId: string; formData: FormData }) =>
      api.upload<CompanyDocument>(`/api/company/documents/${docId}`, formData, "PUT"),
    onMutate: async ({ docId }) => {
      // Cancel all affected queries to prevent in-flight GETs from stomping optimistic state
      await queryClient.cancelQueries({ queryKey: queryKeys.company.documents() });
      await queryClient.cancelQueries({ queryKey: queryKeys.company.packages() });
      await queryClient.cancelQueries({ queryKey: queryKeys.company.rating() });

      const previousDocuments = queryClient.getQueryData<CompanyDocument[]>(
        queryKeys.company.documents(),
      );

      // Optimistically update updated_at timestamp on the replacing document
      queryClient.setQueryData<CompanyDocument[]>(queryKeys.company.documents(), (old = []) =>
        applyReplaceDocumentOptimistic(old, docId),
      );

      return { previousDocuments };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousDocuments) {
        queryClient.setQueryData(queryKeys.company.documents(), context.previousDocuments);
      }
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.company.documents() });
      queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
      queryClient.refetchQueries({ queryKey: queryKeys.company.rating() });
    },
  });
};

/**
 * Delete a company document (DELETE /api/company/documents/{doc_id})
 * with instant optimistic row removal and multi-key cancellation.
 */
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (docId: string) => api.delete(`/api/company/documents/${docId}`),
    onMutate: async (docId: string) => {
      // Cancel all affected queries to prevent in-flight GETs from stomping optimistic state
      await queryClient.cancelQueries({ queryKey: queryKeys.company.documents() });
      await queryClient.cancelQueries({ queryKey: queryKeys.company.packages() });
      await queryClient.cancelQueries({ queryKey: queryKeys.company.rating() });

      const previousDocuments = queryClient.getQueryData<CompanyDocument[]>(
        queryKeys.company.documents(),
      );

      // Instantly remove document from cache
      queryClient.setQueryData<CompanyDocument[]>(queryKeys.company.documents(), (old = []) =>
        applyDeleteDocumentOptimistic(old, docId),
      );

      return { previousDocuments };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousDocuments) {
        queryClient.setQueryData(queryKeys.company.documents(), context.previousDocuments);
      }
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.company.documents() });
      queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
      queryClient.refetchQueries({ queryKey: queryKeys.company.rating() });
    },
  });
};

/**
 * Download a document file as a binary blob and trigger browser download.
 */
export async function downloadDocument(docId: string, filename: string): Promise<void> {
  const blob = await api.download(`/api/company/documents/${docId}/download`);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Package Hooks (Immediate Refetch - Full Optimistic Updates Deferred)
// ---------------------------------------------------------------------------

/**
 * List all company packages.
 */
export const usePackages = () => {
  return useQuery({
    queryKey: queryKeys.company.packages(),
    queryFn: () => api.get<PackageResponse[]>("/api/company/packages"),
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Create a new document package.
 */
export const useCreatePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PackageRequest) =>
      api.post<PackageResponse>("/api/company/packages", payload),
    onSettled: () => {
      // Immediate refetch (partial improvement; full optimistic deferred)
      queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
    },
  });
};

/**
 * Rename an existing package.
 */
export const useRenamePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pkgId, name }: { pkgId: string; name: string }) =>
      api.patch<PackageResponse>(`/api/company/packages/${pkgId}`, { name }),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
    },
  });
};

/**
 * Disband / delete an entire package.
 */
export const useDisbandPackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pkgId: string) => api.delete(`/api/company/packages/${pkgId}`),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
    },
  });
};

/**
 * Add documents to a package.
 */
export const useAddDocumentsToPackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pkgId, documentIds }: { pkgId: string; documentIds: string[] }) =>
      api.post<PackageResponse>(`/api/company/packages/${pkgId}/documents`, {
        document_ids: documentIds,
      }),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
    },
  });
};

/**
 * Remove documents from a package.
 */
export const useRemoveDocumentsFromPackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pkgId, documentIds }: { pkgId: string; documentIds: string[] }) =>
      api.delete(`/api/company/packages/${pkgId}/documents`, {
        body: JSON.stringify({ document_ids: documentIds }),
      }),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.company.packages() });
    },
  });
};
