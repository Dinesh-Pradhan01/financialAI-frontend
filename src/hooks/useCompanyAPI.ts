import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface CompanyProfile {
  company_name: string;
  industry: string;
  business_type: string;
  business_category: string;
  gst?: string;
  pan: string;
  website?: string;
  summary?: string;
  registered_address: string;
  contact_person?: string;
  email: string;
  phone: string;
  udyam_number?: string;
}

export interface IndustryLeader {
  id: number;
  name: string;
  market_cap?: string;
}

export interface CompanyRating {
  overall: number;
  verification: number;
  documents: number;
  compliance?: number;
  financial_health?: number;
}

export interface CompanyNews {
  id: number;
  headline: string;
  source: string;
  date: string;
  summary: string;
}

export interface AIViewResponse {
  markdown_content: string;
}

export interface CompanyDocument {
  id: string;
  document_type: string;
  document_category: string;
  filename: string;
  original_name: string;
  file_size_bytes: number;
  mime_type: string;
  upload_status: string;
}

// Hooks

export const useCompanyProfile = () => {
  return useQuery({
    queryKey: ["company", "profile"],
    queryFn: () => api.get<CompanyProfile>("/api/company/profile"),
  });
};

export const useIndustryLeaders = () => {
  return useQuery({
    queryKey: ["company", "industry-leaders"],
    queryFn: () => api.get<IndustryLeader[]>("/api/company/industry-leaders"),
  });
};

export const useCompanyRating = () => {
  return useQuery({
    queryKey: ["company", "rating"],
    queryFn: () => api.get<CompanyRating>("/api/company/rating"),
  });
};

export const useCompanyNews = () => {
  return useQuery({
    queryKey: ["company", "news"],
    queryFn: () => api.get<CompanyNews[]>("/api/company/news"),
  });
};

export const useCompanyAIView = () => {
  return useQuery({
    queryKey: ["company", "ai-view"],
    queryFn: () => api.post<AIViewResponse>("/api/company/ai-view"),
  });
};

export const useCompanyDocuments = () => {
  return useQuery({
    queryKey: ["company", "documents"],
    queryFn: () => api.get<CompanyDocument[]>("/api/company/documents"),
  });
};

export const useUploadCompanyDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => api.upload<CompanyDocument>("/api/company/documents", formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", "documents"] });
      // Uploading documents might change the rating
      queryClient.invalidateQueries({ queryKey: ["company", "rating"] });
    },
  });
};

export const useDeleteCompanyDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/company/documents/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", "documents"] });
      queryClient.invalidateQueries({ queryKey: ["company", "rating"] });
    },
  });
};
