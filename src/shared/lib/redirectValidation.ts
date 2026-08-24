/**
 * List of recognized internal route path prefixes in SpotLite.
 * Any redirect destination outside this allowlist will default safely to /home.
 */
export const ALLOWED_REDIRECT_PREFIXES = [
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
  "/accept-invite",
] as const;

/**
 * Validates a raw redirect search parameter against open-redirect vectors and unknown paths.
 * Returns the sanitized internal path if valid, or fallback path "/home".
 */
export function getSafeRedirectPath(
  rawParam: string | undefined | null,
  fallback: string = "/home"
): string {
  if (!rawParam || typeof rawParam !== "string") {
    return fallback;
  }

  const trimmed = rawParam.trim();
  if (!trimmed) {
    return fallback;
  }

  // Reject protocol-relative URLs (e.g. "//malicious.com") or absolute URLs (e.g. "https://", "javascript:")
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("://")) {
    return fallback;
  }

  // Reject control characters or backslashes
  if (trimmed.includes("\\") || /[\x00-\x1F\x7F]/.test(trimmed)) {
    return fallback;
  }

  // Extract the pathname portion before any query params or hashes for prefix checking
  const pathname = trimmed.split("?")[0].split("#")[0];

  // Match against known internal route prefixes
  const isAllowed = ALLOWED_REDIRECT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isAllowed) {
    return fallback;
  }

  return trimmed;
}
