import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { cfoApi } from "@/shared/lib/cfoAxios";
import { queryKeys } from "@/shared/lib/queryKeys";
import type {
  CompanyProfileResponse as CompanyProfile,
  CompanyPublicRating as CompanyRating,
  CompanyPublicRatingResponse,
  CompanyNewsResponse as CompanyNews,
  IndustryLeaderResponse as IndustryLeader,
  CompanyDocumentResponse as CompanyDocument,
} from "@/shared/types/api";

export type { CompanyProfile, CompanyRating, CompanyNews, IndustryLeader, CompanyDocument, CompanyPublicRatingResponse };

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
    queryFn: async (): Promise<CompanyRating> => {
      const res = await api.get<CompanyPublicRatingResponse>("/api/company/public-rating");
      if (res.status !== "Success" || !res.content) {
        throw new Error(res.Error || "Failed to fetch public rating");
      }
      return res.content;
    },
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
      // Uploading documents might change the rating
      await queryClient.invalidateQueries({ queryKey: queryKeys.company.rating() });
    },
  });
};

export const useDeleteCompanyDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/business/onboarding/documents/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
      await queryClient.invalidateQueries({ queryKey: queryKeys.company.rating() });
    },
  });
};

import type {
  GeneralInfoResponse,
  LeadershipInfoResponse,
  FinancialInfoResponse,
} from "@/shared/types/api";

export interface OnboardingStatusResponse {
  business_id: string | null;
  current_step: number;
  completion_percentage: number;
  onboarding_completed: boolean;
  verification_status: string;
  general_info?: (GeneralInfoResponse & Record<string, any>) | null;
  leadership_info?: (LeadershipInfoResponse & Record<string, any>) | null;
  financial_info?: (FinancialInfoResponse & Record<string, any>) | null;
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

export interface ClientItem {
  id: string;
  name: string;
  revenue: number;
  category?: string;
}

/**
 * Hook to retrieve the company's top clients sorted by revenue.
 */
export const useTopClients = (options?: QueryHookOptions) => {
  return useQuery({
    queryKey: ["dashboard", "top-clients"],
    queryFn: async (): Promise<ClientItem[]> => {
      try {
        const res = await cfoApi.get("/clients", { params: { size: 100 } });
        const rawList =
          res.data?.data?.items ??
          res.data?.items ??
          (Array.isArray(res.data) ? res.data : []);
        if (!Array.isArray(rawList)) return [];
        return rawList.map((item: Record<string, unknown>, idx: number) => ({
          id: String(item.client_id || item.id || `client-${idx}`),
          name: String(item.client_name || item.name || item.clientName || "Unnamed Client"),
          revenue: Number(item.revenue) || 0,
          category: item.category ? String(item.category) : undefined,
        }));
      } catch {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
};

export interface CompetitorItem {
  id: string;
  name: string;
  location?: string | null;
  services?: string | null;
  overlap_summary?: string | null;
  description?: string | null;
  market_cap?: string | null;
  website?: string | null;
}

export interface CompetitorsResult {
  competitors: CompetitorItem[];
  type?: "structured" | "unstructured" | string;
  rawText?: string;
  isFallback?: boolean;
}

/**
 * Shared query options for competitors.
 * Exported for queryClient.prefetchQuery so Business 360 can prefetch
 * into the identical cache slot before the user opens the tab.
 */
export const competitorsQueryOptions = queryOptions({
  queryKey: queryKeys.company.competitors(),
  queryFn: async (): Promise<CompetitorsResult> => {
    const res = await api.get<any>("/api/company/get-competitors");

    if (!res || res.status === "Failed - Error occured") {
      throw new Error(res?.detail || res?.message || "Failed to retrieve market competitors");
    }

    const type = res.type || (Array.isArray(res) ? "structured" : "unstructured");
    const rawContent = res.content !== undefined ? res.content : res;
    const isFallback = Boolean(res.is_fallback);

    const items: CompetitorItem[] = [];
    let rawText: string | undefined = undefined;
    let parsedPayload: any = rawContent;

    if (typeof rawContent === "string") {
      rawText = rawContent;
      const cleanedStr = rawContent.trim();
      let extractedJson: any = null;

      // 1. Try markdown code block ```json ... ```
      const codeBlockMatch = cleanedStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (codeBlockMatch) {
        try {
          extractedJson = JSON.parse(codeBlockMatch[1].trim());
        } catch {}
      }

      // 2. Try direct JSON parse
      if (!extractedJson) {
        try {
          extractedJson = JSON.parse(cleanedStr);
        } catch {}
      }

      // 3. Try finding outermost array [ ... ]
      if (!extractedJson) {
        const firstBracket = cleanedStr.indexOf("[");
        const lastBracket = cleanedStr.lastIndexOf("]");
        if (firstBracket !== -1 && lastBracket > firstBracket) {
          try {
            extractedJson = JSON.parse(cleanedStr.substring(firstBracket, lastBracket + 1));
          } catch {}
        }
      }

      // 4. Try finding outermost object { ... }
      if (!extractedJson) {
        const firstBrace = cleanedStr.indexOf("{");
        const lastBrace = cleanedStr.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          try {
            extractedJson = JSON.parse(cleanedStr.substring(firstBrace, lastBrace + 1));
          } catch {}
        }
      }

      if (extractedJson) {
        parsedPayload = extractedJson;
      }
    }

    const normalizeItem = (entry: Record<string, any>, idx: number): CompetitorItem => {
      const name =
        entry["company name"] ||
        entry.company_name ||
        entry.name ||
        entry.companyName ||
        `Competitor ${idx + 1}`;
      const location =
        entry.location ||
        entry.city ||
        entry.headquarters ||
        entry.hq ||
        null;
      const services =
        entry.services ||
        entry.service ||
        entry.offerings ||
        entry.products ||
        null;
      const overlap =
        entry["overlap summary"] ||
        entry.overlap_summary ||
        entry.overlapSummary ||
        entry.description ||
        entry.summary ||
        null;
      const marketCap =
        entry["market cap"] ||
        entry.market_cap ||
        entry.marketCap ||
        null;
      const website =
        entry.website ||
        entry.url ||
        entry.official_website ||
        entry.website_url ||
        null;

      return {
        id: String(entry.id || `comp-${idx + 1}`),
        name: String(name),
        location: location ? String(location) : null,
        services: services ? String(services) : null,
        overlap_summary: overlap ? String(overlap) : null,
        description: overlap ? String(overlap) : services ? String(services) : "",
        market_cap: marketCap ? String(marketCap) : null,
        website: website ? String(website) : null,
      };
    };

    if (Array.isArray(parsedPayload)) {
      parsedPayload.forEach((entry, idx) => {
        if (entry && typeof entry === "object") {
          items.push(normalizeItem(entry, idx));
        }
      });
    } else if (parsedPayload && typeof parsedPayload === "object") {
      if (Array.isArray(parsedPayload.competitors)) {
        parsedPayload.competitors.forEach((entry: any, idx: number) => {
          if (entry && typeof entry === "object") {
            items.push(normalizeItem(entry, idx));
          }
        });
      } else if (parsedPayload["company name"] || parsedPayload.company_name || parsedPayload.name) {
        items.push(normalizeItem(parsedPayload, 0));
      } else {
        const values = Object.values(parsedPayload);
        if (values.length > 0 && typeof values[0] === "object" && values[0] !== null) {
          values.forEach((entry: any, idx: number) => {
            if (entry && typeof entry === "object") {
              items.push(normalizeItem(entry, idx));
            }
          });
        }
      }
    }

    return {
      competitors: items,
      type,
      rawText,
      isFallback,
    };
  },
  staleTime: 5 * 60 * 1000,
  retry: (failureCount, error: unknown) => {
    if (isSetupRequiredError(error)) return false;
    return failureCount < 2;
  },
});

/**
 * Hook to retrieve AI-generated market competitors from backend /company/get-competitors route.
 */
export const useCompetitors = (options?: QueryHookOptions) => {
  return useQuery({
    ...competitorsQueryOptions,
    enabled: options?.enabled ?? true,
  });
};

