import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import type { UserResponse } from "@/shared/types/api";

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => api.get<UserResponse>("/api/v1/auth/me"),
    staleTime: 5 * 60 * 1000,
    enabled,
  });
};
