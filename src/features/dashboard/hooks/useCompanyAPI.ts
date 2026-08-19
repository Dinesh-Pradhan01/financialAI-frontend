import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import type {
  CompanyProfileResponse as CompanyProfile,
  CompanyRatingResponse as CompanyRating,
  CompanyNewsResponse as CompanyNews,
  IndustryLeaderResponse as IndustryLeader,
  CompanyDocumentResponse as CompanyDocument,
} from "@/shared/types/api";

export type {
  CompanyProfile,
  CompanyRating,
  CompanyNews,
  IndustryLeader,
  CompanyDocument,
};

export interface AIViewResponse {
  markdown_content: string;
}

/**
 * Utility function to distinguish expected "setup required" (404) states
 * from genuine backend / network failures (500, 502, network offline, etc.).
 */
export function isSetupRequiredError(error: unknown): boolean {
  if (!error) return false;
  const status = (error as { status?: number })?.status;
  if (status === 404) return true;
  const msg = (error as Error)?.message?.toLowerCase() || "";
  return msg.includes("404") || msg.includes("not found") || msg.includes("profile not found");
}

interface QueryHookOptions {
  enabled?: boolean;
}

// Hooks

export const useCompanyProfile = (options?: QueryHookOptions) => {
  return useQuery({
    queryKey: queryKeys.company.profile(),
    queryFn: () => api.get<CompanyProfile>("/api/company/profile"),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error: unknown) => {
      // Don't retry 404s (profile not created yet)
      if (isSetupRequiredError(error)) return false;
      return failureCount < 2;
    },
  });
};

export const useIndustryLeaders = (options?: QueryHookOptions) => {
  return useQuery({
    queryKey: queryKeys.company.industryLeaders(),
    queryFn: () => api.get<IndustryLeader[]>("/api/company/industry-leaders"),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error: unknown) => {
      if (isSetupRequiredError(error)) return false;
      return failureCount < 2;
    },
  });
};

export const useCompanyRating = (options?: QueryHookOptions) => {
  return useQuery({
    queryKey: queryKeys.company.rating(),
    queryFn: () => api.get<CompanyRating>("/api/company/rating"),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error: unknown) => {
      if (isSetupRequiredError(error)) return false;
      return failureCount < 2;
    },
  });
};

export const useCompanyNews = (options?: QueryHookOptions) => {
  return useQuery({
    queryKey: queryKeys.company.news(),
    queryFn: () => api.get<CompanyNews[]>("/api/company/news"),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error: unknown) => {
      if (isSetupRequiredError(error)) return false;
      return failureCount < 2;
    },
  });
};

export const useCompanyAIView = (options?: QueryHookOptions) => {
  return useQuery({
    queryKey: queryKeys.company.aiView(),
    queryFn: () => api.post<AIViewResponse>("/api/company/ai-view"),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error: unknown) => {
      if (isSetupRequiredError(error)) return false;
      return failureCount < 1;
    },
  });
};

export const useCompanyDocuments = (options?: QueryHookOptions) => {
  return useQuery({
    queryKey: queryKeys.company.documents(),
    queryFn: () => api.get<CompanyDocument[]>("/api/company/documents"),
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error: unknown) => {
      if (isSetupRequiredError(error)) return false;
      return failureCount < 2;
    },
  });
};

export const useUploadCompanyDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) =>
      api.upload<CompanyDocument>("/api/company/documents", formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
      // Uploading documents might change the rating
      queryClient.invalidateQueries({ queryKey: queryKeys.company.rating() });
    },
  });
};

export const useDeleteCompanyDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/business/onboarding/documents/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
      queryClient.invalidateQueries({ queryKey: queryKeys.company.rating() });
    },
  });
};

export interface OnboardingStatusResponse {
  business_id: string | null;
  current_step: number;
  completion_percentage: number;
  onboarding_completed: boolean;
  verification_status: string;
  general_info?: Record<string, unknown> | null;
  leadership_info?: Record<string, unknown> | null;
  financial_info?: Record<string, unknown> | null;
  documents?: unknown[];
}

export const useOnboardingStatus = (options?: QueryHookOptions) => {
  return useQuery({
    queryKey: ["business", "onboarding", "me"],
    queryFn: () => api.get<OnboardingStatusResponse>("/api/business/onboarding/me"),
    staleTime: 30 * 1000,
    enabled: options?.enabled ?? true,
    retry: false,
  });
};

