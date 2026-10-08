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

/**
 * Checks if a user has HR capabilities.
 * CEOs and Admins have access to everything, including all HR operations.
 */
export function canAccessHR(role: string | null | undefined): boolean {
  if (!role || typeof role !== "string") return false;
  const normalized = role.trim().toLowerCase();
  return normalized === "hr" || isCeoOrAdmin(role);
}

/**
 * Checks if a user has CFO capabilities.
 * CEOs and Admins have access to everything, including all CFO operations.
 */
export function canAccessCFO(role: string | null | undefined): boolean {
  if (!role || typeof role !== "string") return false;
  const normalized = role.trim().toLowerCase();
  return normalized === "cfo" || isCeoOrAdmin(role);
}

/**
 * Checks if a user can perform HR operations.
 * Defaults to canAccessHR (allowing CEO & Admin).
 */
export function isHR(role: string | null | undefined): boolean {
  return canAccessHR(role);
}

/**
 * Checks if a user can perform CFO operations.
 * Defaults to canAccessCFO (allowing CEO & Admin).
 */
export function isCFO(role: string | null | undefined): boolean {
  return canAccessCFO(role);
}

/**
 * Checks if a role is strictly an HR specialist (not CEO/Admin).
 * Used for restrictions that apply specifically to standalone HR accounts.
 */
export function isStrictHR(role: string | null | undefined): boolean {
  if (!role || typeof role !== "string") return false;
  return role.trim().toLowerCase() === "hr";
}

/**
 * Checks if a role is strictly a CFO specialist (not CEO/Admin).
 * Used for restrictions that apply specifically to standalone CFO accounts.
 */
export function isStrictCFO(role: string | null | undefined): boolean {
  if (!role || typeof role !== "string") return false;
  return role.trim().toLowerCase() === "cfo";
}

