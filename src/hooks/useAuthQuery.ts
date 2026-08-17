import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { BackendUser } from "@/contexts/AuthContext";

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => api.get<BackendUser>("/api/auth/me"),
    staleTime: 5 * 60 * 1000,
    enabled,
  });
};
