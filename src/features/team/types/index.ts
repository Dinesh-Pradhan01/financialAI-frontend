export type TeamInviteRole = "cfo" | "hr";

export type TeamInviteStatus =
  | "pending"
  | "accepted"
  | "expired"
  | "revoked"
  | "removed";

/**
 * Core team invite entity representing a member invitation record.
 * Matches backend database model and GET /api/auth/invites response items.
 */
export interface TeamInvite {
  id: string;
  email: string;
  full_name?: string | null;
  role: TeamInviteRole | string;
  status: TeamInviteStatus;
  invite_token?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
  updated_at?: string | null;
  business_id?: string | null;
}

/**
 * Payload for POST /api/auth/invite
 */
export interface SendInvitePayload {
  email: string;
  role: TeamInviteRole | string;
  full_name?: string | null;
}

/**
 * Response for POST /api/auth/invite
 */
export interface SendInviteResponse {
  message?: string;
  invite_link?: string;
  invite_token?: string;
  invite?: TeamInvite;
}

/**
 * Response for POST /api/business/onboarding/resend-invite/{invite_id}
 */
export interface ResendInviteResponse {
  status: string;
  message: string;
}

/**
 * Response for DELETE /api/auth/invite/{invite_id}
 */
export interface RevokeInviteResponse {
  id: string;
  email: string;
  full_name?: string | null;
  role: TeamInviteRole | string;
  status: TeamInviteStatus;
  invite_token?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
  updated_at?: string | null;
  message: string;
}

/**
 * Response for POST /api/auth/invite/{invite_id}/remove
 */
export interface RemoveMemberResponse {
  id: string;
  email: string;
  full_name?: string | null;
  role: TeamInviteRole | string;
  status: TeamInviteStatus;
  invite_token?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
  updated_at?: string | null;
  message: string;
}
