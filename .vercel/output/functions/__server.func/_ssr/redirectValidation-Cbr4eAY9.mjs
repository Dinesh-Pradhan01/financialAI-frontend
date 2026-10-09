//#region node_modules/.nitro/vite/services/ssr/assets/redirectValidation-Cbr4eAY9.js
/**
* List of recognized internal route path prefixes in SpotLite.
* Any redirect destination outside this allowlist will default safely to /home.
*/
var ALLOWED_REDIRECT_PREFIXES = [
	"/home",
	"/onboarding",
	"/consent",
	"/upload",
	"/processing",
	"/agents",
	"/coach",
	"/documents",
	"/profile",
	"/wrapped",
	"/settings",
	"/spending",
	"/spotlights",
	"/team",
	"/industry",
	"/accept-invite"
];
/**
* Validates a raw redirect search parameter against open-redirect vectors and unknown paths.
* Returns the sanitized internal path if valid, or fallback path "/home".
*/
function getSafeRedirectPath(rawParam, fallback = "/home") {
	if (!rawParam || typeof rawParam !== "string") return fallback;
	const trimmed = rawParam.trim();
	if (!trimmed) return fallback;
	if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("://")) return fallback;
	if (trimmed.includes("\\") || /[\x00-\x1F\x7F]/.test(trimmed)) return fallback;
	const pathname = trimmed.split("?")[0].split("#")[0];
	if (!ALLOWED_REDIRECT_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return fallback;
	return trimmed;
}
//#endregion
export { getSafeRedirectPath as t };
