/**
 * Canonical list of privileged executive roles that have access to
 * User Management, Team Invitation, and Governance administration.
 */
export const PRIVILEGED_TEAM_ROLES = ["ceo", "admin"] as const;

export type PrivilegedTeamRole = (typeof PRIVILEGED_TEAM_ROLES)[number];

/**
 * Checks if a given role string qualifies as a privileged CEO or Admin.
 *
 * Rules:
 * - "ceo" / "admin" (case-insensitive) -> true
 * - "user", "cfo", "hr", missing (null/undefined), unknown -> false
 */
export function isCeoOrAdmin(role: string | null | undefined): boolean {
  if (!role || typeof role !== "string") return false;
  const normalized = role.trim().toLowerCase();
  return (PRIVILEGED_TEAM_ROLES as readonly string[]).includes(normalized);
}
