import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { queryKeys } from "@/shared/lib/queryKeys";
import type {
  TeamInvite,
  SendInvitePayload,
  SendInviteResponse,
  ResendInviteResponse,
  RevokeInviteResponse,
  RemoveMemberResponse,
} from "../types";
import {
  applyRevokeOptimistic,
  applyRemoveOptimistic,
  applyResendOptimistic,
  applySendInviteOptimistic,
} from "../lib/optimisticTransforms";

// ---------------------------------------------------------------------------
// Endpoint URLs
// ---------------------------------------------------------------------------

export const GET_INVITES_URL = "/api/auth/invites";
export const SEND_INVITE_URL = "/api/auth/invite";

// Canonical resend endpoint
export const RESEND_INVITE_URL = (id: string) =>
  `/api/business/onboarding/resend-invite/${id}`;

export const REVOKE_INVITE_URL = (id: string) => `/api/auth/invite/${id}`;

export const REMOVE_MEMBER_URL = (id: string) => `/api/auth/invite/${id}/remove`;

// ---------------------------------------------------------------------------
// Team Invite Hooks with Optimistic UI Updates
// ---------------------------------------------------------------------------

/**
 * Fetch all team invites for the current company/business.
 */
export const useTeamInvites = () => {
  return useQuery({
    queryKey: queryKeys.team.invites(),
    queryFn: () => api.get<TeamInvite[]>(GET_INVITES_URL),
    staleTime: 60 * 1000,
  });
};

/**
 * Send a new team invite (CFO or HR) with optimistic UI update.
 */
export const useSendInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendInvitePayload) =>
      api.post<SendInviteResponse>(SEND_INVITE_URL, payload),
    onMutate: async (payload: SendInvitePayload) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.team.invites() });
      const previousInvites = queryClient.getQueryData<TeamInvite[]>(
        queryKeys.team.invites()
      );

      queryClient.setQueryData<TeamInvite[]>(
        queryKeys.team.invites(),
        (old = []) => applySendInviteOptimistic(old, payload)
      );

      return { previousInvites };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousInvites) {
        queryClient.setQueryData(
          queryKeys.team.invites(),
          context.previousInvites
        );
      }
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.team.invites() });
    },
  });
};

/**
 * Resend an existing invitation email using the canonical onboarding endpoint.
 */
export const useResendInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) =>
      api.post<ResendInviteResponse>(RESEND_INVITE_URL(inviteId)),
    onMutate: async (inviteId: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.team.invites() });
      const previousInvites = queryClient.getQueryData<TeamInvite[]>(
        queryKeys.team.invites()
      );

      queryClient.setQueryData<TeamInvite[]>(
        queryKeys.team.invites(),
        (old = []) => applyResendOptimistic(old, inviteId)
      );

      return { previousInvites };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousInvites) {
        queryClient.setQueryData(
          queryKeys.team.invites(),
          context.previousInvites
        );
      }
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.team.invites() });
    },
  });
};

/**
 * Revoke a pending team invite with optimistic UI update.
 */
export const useRevokeInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteId: string) =>
      api.delete<RevokeInviteResponse>(REVOKE_INVITE_URL(inviteId)),
    onMutate: async (inviteId: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.team.invites() });
      const previousInvites = queryClient.getQueryData<TeamInvite[]>(
        queryKeys.team.invites()
      );

      queryClient.setQueryData<TeamInvite[]>(
        queryKeys.team.invites(),
        (old = []) => applyRevokeOptimistic(old, inviteId)
      );

      return { previousInvites };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousInvites) {
        queryClient.setQueryData(
          queryKeys.team.invites(),
          context.previousInvites
        );
      }
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.team.invites() });
    },
  });
};

/**
 * Remove an accepted team member (R8-2) with optimistic UI update.
 */
export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) =>
      api.post<RemoveMemberResponse>(REMOVE_MEMBER_URL(memberId)),
    onMutate: async (memberId: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.team.invites() });
      const previousInvites = queryClient.getQueryData<TeamInvite[]>(
        queryKeys.team.invites()
      );

      queryClient.setQueryData<TeamInvite[]>(
        queryKeys.team.invites(),
        (old = []) => applyRemoveOptimistic(old, memberId)
      );

      return { previousInvites };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousInvites) {
        queryClient.setQueryData(
          queryKeys.team.invites(),
          context.previousInvites
        );
      }
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: queryKeys.team.invites() });
    },
  });
};
