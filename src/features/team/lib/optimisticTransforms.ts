import type { TeamInvite, SendInvitePayload } from "../types";

/**
 * Optimistically update an invite record to "revoked".
 */
export function applyRevokeOptimistic(
  cache: TeamInvite[],
  inviteId: string
): TeamInvite[] {
  return cache.map((inv) =>
    inv.id === inviteId
      ? {
          ...inv,
          status: "revoked",
          updated_at: new Date().toISOString(),
        }
      : inv
  );
}

/**
 * Optimistically update an accepted member record to "removed".
 */
export function applyRemoveOptimistic(
  cache: TeamInvite[],
  memberId: string
): TeamInvite[] {
  return cache.map((inv) =>
    inv.id === memberId
      ? {
          ...inv,
          status: "removed",
          updated_at: new Date().toISOString(),
        }
      : inv
  );
}

/**
 * Optimistically update an invite record to "pending" upon resend.
 */
export function applyResendOptimistic(
  cache: TeamInvite[],
  inviteId: string
): TeamInvite[] {
  return cache.map((inv) =>
    inv.id === inviteId
      ? {
          ...inv,
          status: "pending",
          updated_at: new Date().toISOString(),
        }
      : inv
  );
}

/**
 * Optimistically append a newly sent invite to the cache.
 */
export function applySendInviteOptimistic(
  cache: TeamInvite[],
  payload: SendInvitePayload,
  tempId: string = `temp-${Date.now()}`
): TeamInvite[] {
  const now = new Date().toISOString();
  const optimisticInvite: TeamInvite = {
    id: tempId,
    email: payload.email,
    full_name: payload.full_name || null,
    role: payload.role,
    status: "pending",
    created_at: now,
    updated_at: now,
    expires_at: null,
  };

  return [optimisticInvite, ...cache];
}
