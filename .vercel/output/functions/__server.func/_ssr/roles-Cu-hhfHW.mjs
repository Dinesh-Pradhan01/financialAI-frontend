//#region node_modules/.nitro/vite/services/ssr/assets/roles-Cu-hhfHW.js
/**
* Canonical list of privileged executive roles that have access to
* User Management, Team Invitation, and Governance administration.
*/
var PRIVILEGED_TEAM_ROLES = ["ceo", "admin"];
/**
* Checks if a given role string qualifies as a privileged CEO or Admin.
*
* Rules:
* - "ceo" / "admin" (case-insensitive) -> true
* - "user", "cfo", "hr", missing (null/undefined), unknown -> false
*/
function isCeoOrAdmin(role) {
	if (!role || typeof role !== "string") return false;
	const normalized = role.trim().toLowerCase();
	return PRIVILEGED_TEAM_ROLES.includes(normalized);
}
/**
* Checks if a user has HR capabilities.
* CEOs and Admins have access to everything, including all HR operations.
*/
function canAccessHR(role) {
	if (!role || typeof role !== "string") return false;
	return role.trim().toLowerCase() === "hr" || isCeoOrAdmin(role);
}
/**
* Checks if a user has CFO capabilities.
* CEOs and Admins have access to everything, including all CFO operations.
*/
function canAccessCFO(role) {
	if (!role || typeof role !== "string") return false;
	return role.trim().toLowerCase() === "cfo" || isCeoOrAdmin(role);
}
/**
* Checks if a user can perform HR operations.
* Defaults to canAccessHR (allowing CEO & Admin).
*/
function isHR(role) {
	return canAccessHR(role);
}
/**
* Checks if a user can perform CFO operations.
* Defaults to canAccessCFO (allowing CEO & Admin).
*/
function isCFO(role) {
	return canAccessCFO(role);
}
/**
* Checks if a role is strictly an HR specialist (not CEO/Admin).
* Used for restrictions that apply specifically to standalone HR accounts.
*/
function isStrictHR(role) {
	if (!role || typeof role !== "string") return false;
	return role.trim().toLowerCase() === "hr";
}
/**
* Checks if a role is strictly a CFO specialist (not CEO/Admin).
* Used for restrictions that apply specifically to standalone CFO accounts.
*/
function isStrictCFO(role) {
	if (!role || typeof role !== "string") return false;
	return role.trim().toLowerCase() === "cfo";
}
//#endregion
export { isHR as a, isCeoOrAdmin as i, canAccessHR as n, isStrictCFO as o, isCFO as r, isStrictHR as s, canAccessCFO as t };
