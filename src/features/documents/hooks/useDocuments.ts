import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import type {
  CompanyDocument,
  PackageResponse,
  PackageRequest,
} from "@/shared/types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

/**
 * Upload a file replacement as multipart/form-data with HTTP PUT.
 * Inlined to preserve the exact error-handling and cookie-forwarding contract of api.upload
 * without modifying existing shared api.ts methods.
 */
async function uploadDocumentPut(
  docId: string,
  formData: FormData
): Promise<CompanyDocument> {
  const url = `${API_BASE_URL}/api/company/documents/${docId}`;
  const response = await fetch(url, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (response.status === 204) return undefined as unknown as CompanyDocument;
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = body?.detail ?? body?.message;
    const message =
      typeof detail === "string"
        ? detail
        : detail
        ? JSON.stringify(detail)
        : `API error ${response.status}`;
    const error = new Error(message) as Error & {
      status: number;
      detail?: unknown;
      data?: unknown;
    };
    error.status = response.status;
    error.detail = detail;
    error.data = body;
    throw error;
  }
  return body as CompanyDocument;
}

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
      queryClient.invalidateQueries({ queryKey: queryKeys.company.rating() });
    },
  });
};

/**
 * Replace an existing company document (PUT /api/company/documents/{doc_id}).
 */
export const useReplaceDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ docId, formData }: { docId: string; formData: FormData }) =>
      uploadDocumentPut(docId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
    },
  });
};

/**
 * Delete a company document (DELETE /api/company/documents/{doc_id}).
 */
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (docId: string) =>
      api.delete(`/api/company/documents/${docId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
      queryClient.invalidateQueries({ queryKey: queryKeys.company.rating() });
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
// Package Hooks
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.packages() });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.packages() });
    },
  });
};

/**
 * Disband / delete an entire package.
 */
export const useDisbandPackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pkgId: string) =>
      api.delete(`/api/company/packages/${pkgId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.packages() });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.packages() });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.packages() });
    },
  });
};
