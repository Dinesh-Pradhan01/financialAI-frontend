import { n as api } from "./api-XLUwYDya.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { n as queryOptions, r as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useDevelopments-DWlwTKEO.js
var DevelopmentsError = class DevelopmentsError extends Error {
	kind;
	status;
	constructor(kind, message, options) {
		super(message);
		this.name = "DevelopmentsError";
		this.kind = kind;
		this.status = options?.status;
		if (options?.cause !== void 0) this.cause = options.cause;
		Object.setPrototypeOf(this, DevelopmentsError.prototype);
	}
};
function isDevelopmentsError(error) {
	if (error instanceof DevelopmentsError) return true;
	return typeof error === "object" && error !== null && "kind" in error && typeof error.kind === "string" && [
		"timeout",
		"not_found",
		"invalid",
		"upstream",
		"unknown"
	].includes(error.kind);
}
var DEFAULT_DEVELOPMENT_PARAMS = {
	days: 30,
	limit: 10
};
var CLIENT_TIMEOUT_MS = 12e4;
/**
* Builds the URL path for company developments.
* This is the ONLY place that knows the URL shape.
* If backend later migrates to a session-scoped URL (e.g. /api/v1/developments),
* modify only this function.
*/
function buildDevelopmentsUrl(businessId, params = DEFAULT_DEVELOPMENT_PARAMS) {
	const searchParams = new URLSearchParams({
		days: String(params.days),
		limit: String(params.limit)
	});
	return `/api/v1/developments/${encodeURIComponent(businessId)}?${searchParams.toString()}`;
}
/**
* Classifies an unknown fetch / HTTP error into a typed DevelopmentsError.
*/
function classifyDevelopmentsError(error, timedOut = false) {
	if (isDevelopmentsError(error)) return error;
	const status = error?.status;
	const errorName = error?.name;
	const message = error?.message || "An unknown error occurred while fetching developments";
	if (timedOut || errorName === "AbortError" || errorName === "TimeoutError" || status === 408 || status === 504) return new DevelopmentsError("timeout", "Developments request timed out after 60s. Upstream search took longer than expected.", {
		status,
		cause: error
	});
	if (status === 404) return new DevelopmentsError("not_found", "Company was not found or onboarding profile data is missing.", {
		status,
		cause: error
	});
	if (status === 422 || status === 400) return new DevelopmentsError("invalid", "Invalid request parameters or company ID.", {
		status,
		cause: error
	});
	if (status === 503 || typeof status === "number" && status >= 500 && status < 600) return new DevelopmentsError("upstream", "Developments service or upstream provider is temporarily unavailable.", {
		status,
		cause: error
	});
	return new DevelopmentsError("unknown", message, {
		status,
		cause: error
	});
}
/**
* Fetches developments for a given company.
*
* Implements a standalone 60s client timeout via an internal AbortController.
* This request is NOT tied to TanStack Query's cancellation signal: if the user
* navigates away from the tab or page, the request completes in the background
* and populates the TanStack Query memory cache.
*/
async function fetchDevelopments(businessId, params = DEFAULT_DEVELOPMENT_PARAMS, opts) {
	const controller = new AbortController();
	let timedOut = false;
	const timer = setTimeout(() => {
		timedOut = true;
		controller.abort(new DOMException("Request timed out after 60s", "TimeoutError"));
	}, CLIENT_TIMEOUT_MS);
	if (opts?.signal) if (opts.signal.aborted) controller.abort(opts.signal.reason);
	else opts.signal.addEventListener("abort", () => controller.abort(opts.signal?.reason), { once: true });
	try {
		const url = buildDevelopmentsUrl(businessId, params);
		return await api.get(url, { signal: controller.signal });
	} catch (error) {
		throw classifyDevelopmentsError(error, timedOut);
	} finally {
		clearTimeout(timer);
	}
}
var NAMED_HTML_ENTITIES = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: " ",
	rsquo: "’",
	lsquo: "‘",
	rdquo: "”",
	ldquo: "“",
	ndash: "–",
	mdash: "—",
	hellip: "…"
};
/**
* Pure single-pass HTML entity decoder.
* Supports numeric decimal (&#39;), numeric hex (&#x27;), and standard named entities.
* No DOM dependency, safe in any JavaScript / SSR environment.
*/
function decodeHtmlEntities(input) {
	if (typeof input !== "string" || !input) return "";
	return input.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (match, entity) => {
		if (entity.startsWith("#x") || entity.startsWith("#X")) {
			const code = Number.parseInt(entity.slice(2), 16);
			return !Number.isNaN(code) && code >= 0 && code <= 1114111 ? String.fromCodePoint(code) : match;
		}
		if (entity.startsWith("#")) {
			const code = Number.parseInt(entity.slice(1), 10);
			return !Number.isNaN(code) && code >= 0 && code <= 1114111 ? String.fromCodePoint(code) : match;
		}
		const lower = entity.toLowerCase();
		return Object.prototype.hasOwnProperty.call(NAMED_HTML_ENTITIES, lower) ? NAMED_HTML_ENTITIES[lower] : match;
	});
}
/**
* Normalises a string by decoding entities, lowercasing, and stripping all non-alphanumerics.
*/
function normalizeAlphanumeric(str) {
	if (typeof str !== "string") return "";
	return decodeHtmlEntities(str).toLowerCase().replace(/[^a-z0-9]/g, "");
}
/**
* Cleans a development title:
* 1. Decodes HTML entities.
* 2. Strips a trailing " - {source_name}" ONLY when it matches the item's source_name exactly (case-insensitive, trimmed).
* Never strips anything else.
*/
function cleanTitle(rawTitle, sourceName) {
	const decoded = decodeHtmlEntities(rawTitle).trim();
	const source = typeof sourceName === "string" ? sourceName.trim() : "";
	if (!source) return decoded;
	const suffix = ` - ${source}`.toLowerCase();
	if (decoded.toLowerCase().endsWith(suffix)) return decoded.slice(0, decoded.length - suffix.length).trim();
	return decoded;
}
/**
* Extracts detail text from summary.
* Returns decoded summary ONLY if it is NOT equal to, or a prefix/suffix variant of,
* the normalised title (with or without the source name).
* Current live backend responses send duplicate summaries, resulting in null detail.
* Genuinely distinct summaries will render automatically.
* Never uses `what_happened`.
*/
function extractDetail(summary, rawTitle, cleanedTitle) {
	if (typeof summary !== "string") return null;
	const decodedSummary = decodeHtmlEntities(summary).trim();
	if (!decodedSummary) return null;
	const summaryNorm = normalizeAlphanumeric(decodedSummary);
	if (!summaryNorm) return null;
	const rawTitleNorm = normalizeAlphanumeric(rawTitle);
	const cleanedTitleNorm = normalizeAlphanumeric(cleanedTitle);
	const isDuplicateVariant = (titleNorm) => {
		if (!titleNorm) return false;
		if (summaryNorm === titleNorm) return true;
		if (summaryNorm.startsWith(titleNorm) || titleNorm.startsWith(summaryNorm)) return true;
		if (summaryNorm.endsWith(titleNorm) || titleNorm.endsWith(summaryNorm)) return true;
		return false;
	};
	if (isDuplicateVariant(rawTitleNorm) || isDuplicateVariant(cleanedTitleNorm)) return null;
	return decodedSummary;
}
/**
* Decodes HTML entities in implication, trims whitespace, and maps empty to null.
* Never alters text quality or adds synthetic prose.
*/
function extractImplication(implication) {
	if (typeof implication !== "string") return null;
	const decoded = decodeHtmlEntities(implication).trim();
	return decoded.length > 0 ? decoded : null;
}
/**
* Builds "City, State" / "City" / "State" strictly from non-null item.city and item.state.
* Never derived from location object or company context.
*/
function extractLocation(city, state) {
	const c = typeof city === "string" ? city.trim() : "";
	const s = typeof state === "string" ? state.trim() : "";
	if (c && s) return `${c}, ${s}`;
	if (c) return c;
	if (s) return s;
	return null;
}
/**
* Generates a stable unique React key for a development item.
* Prefers item.id; otherwise creates a deterministic composite of source + published_at + title slice,
* guaranteeing uniqueness within the list by appending a collision counter if needed.
*/
function generateItemKey(item, seenKeys, index) {
	let baseKey;
	if (typeof item.id === "string" && item.id.trim().length > 0) baseKey = item.id.trim();
	else {
		baseKey = `${normalizeAlphanumeric(item.source_name)}_${typeof item.published_at === "string" ? item.published_at.trim() : ""}_${normalizeAlphanumeric(item.title).slice(0, 32)}`;
		if (!baseKey || baseKey === "__") baseKey = `item_${index}`;
	}
	const occurrences = seenKeys.get(baseKey) || 0;
	seenKeys.set(baseKey, occurrences + 1);
	return occurrences === 0 ? baseKey : `${baseKey}_${occurrences}`;
}
/**
* Validates status value. Accepts only "active" | "closing_soon" | "expired".
* Unknown values map to null with a dev-only console warning.
*/
function extractStatus(status) {
	if (typeof status !== "string") return null;
	const s = status.trim().toLowerCase();
	if (s === "active" || s === "closing_soon" || s === "expired") return s;
	return null;
}
/**
* Validates closing_date string. Passes through only if it parses as a valid date.
*/
function extractClosingDate(closingDate) {
	if (typeof closingDate !== "string") return null;
	const trimmed = closingDate.trim();
	if (!trimmed) return null;
	const timestamp = Date.parse(trimmed);
	if (Number.isNaN(timestamp)) return null;
	return trimmed;
}
/**
* Validates published_at string. Passes through only if it parses as a valid date.
*/
function extractPublishedAt(publishedAt) {
	if (typeof publishedAt !== "string") return null;
	const trimmed = publishedAt.trim();
	if (!trimmed) return null;
	const timestamp = Date.parse(trimmed);
	if (Number.isNaN(timestamp)) return null;
	return trimmed;
}
/**
* Maps relevance strictly to "high" | "medium" | "low" | null.
* Does NOT derive relevance from the numeric score.
*/
function extractRelevance(relevance) {
	if (typeof relevance !== "string") return null;
	const lower = relevance.trim().toLowerCase();
	if (lower === "high" || lower === "medium" || lower === "low") return lower;
	return null;
}
/**
* Clamps relevance_score to 0..1 range.
*/
function extractRelevanceScore(score) {
	if (typeof score === "number" && !Number.isNaN(score)) return Math.max(0, Math.min(1, score));
	return 0;
}
/**
* Stably sorts development items: relevanceScore descending, then publishedAt descending (nulls last).
*/
function sortDevelopmentItems(items) {
	return [...items].sort((a, b) => {
		if (b.relevanceScore !== a.relevanceScore) return b.relevanceScore - a.relevanceScore;
		if (a.publishedAt && b.publishedAt) {
			const timeA = Date.parse(a.publishedAt);
			const timeB = Date.parse(b.publishedAt);
			if (!Number.isNaN(timeA) && !Number.isNaN(timeB)) return timeB - timeA;
		}
		if (a.publishedAt && !b.publishedAt) return -1;
		if (!a.publishedAt && b.publishedAt) return 1;
		return 0;
	});
}
/**
* Pure mapper converting raw backend DTO to frontend DevelopmentsViewModel.
* Defensive against missing items, null fields, and future schema evolutions.
*/
function mapDevelopmentsResponse(dto) {
	const data = dto && typeof dto === "object" ? dto : {};
	const companyName = typeof data.company?.name === "string" ? data.company.name.trim() : "";
	const retrievedAt = typeof data.retrieved_at === "string" ? data.retrieved_at.trim() : "";
	const sources = Array.isArray(data.sources) ? data.sources.filter((s) => typeof s === "string" && s.trim().length > 0) : [];
	const degraded = data.degraded === true;
	const rawItems = Array.isArray(data.items) ? data.items : [];
	const seenKeys = /* @__PURE__ */ new Map();
	return {
		companyName,
		retrievedAt,
		sources,
		degraded,
		items: sortDevelopmentItems(rawItems.map((item, index) => {
			const raw = item && typeof item === "object" ? item : {};
			const title = cleanTitle(raw.title, raw.source_name);
			const detail = extractDetail(raw.summary, raw.title, title);
			const implication = extractImplication(raw.implication);
			const sourceName = typeof raw.source_name === "string" ? raw.source_name.trim() : "";
			const sourceUrl = typeof raw.source_url === "string" && raw.source_url.trim().length > 0 ? raw.source_url.trim() : null;
			const publishedAt = extractPublishedAt(raw.published_at);
			const relevance = extractRelevance(raw.relevance);
			const relevanceScore = extractRelevanceScore(raw.relevance_score);
			const location = extractLocation(raw.city, raw.state);
			const closingDate = extractClosingDate(raw.closing_date);
			const status = extractStatus(raw.status);
			return {
				key: generateItemKey(raw, seenKeys, index),
				title,
				detail,
				implication,
				sourceName,
				sourceUrl,
				publishedAt,
				relevance,
				relevanceScore,
				location,
				closingDate,
				status
			};
		}))
	};
}
/**
* Shared query options for Developments.
* Exposed so downstream components (e.g., Business360Page) can prefetch
* before the user navigates.
*/
function developmentsQueryOptions(businessId, params = DEFAULT_DEVELOPMENT_PARAMS) {
	return queryOptions({
		queryKey: [
			"developments",
			businessId,
			params
		],
		queryFn: async ({ signal }) => {
			return mapDevelopmentsResponse(await fetchDevelopments(businessId, params, { signal }));
		},
		staleTime: 300 * 1e3,
		retry: (failureCount, error) => {
			if (error?.kind === "not_found") return false;
			return failureCount < 2;
		}
	});
}
/**
* Primary React hook for the Developments view.
*/
function useDevelopments() {
	const { user } = useAuth();
	const businessId = user?.business_id;
	return {
		...useQuery(businessId ? developmentsQueryOptions(businessId) : {
			queryKey: ["developments", "none"],
			enabled: false
		}),
		needsCompany: !businessId
	};
}
//#endregion
export { isDevelopmentsError as n, useDevelopments as r, developmentsQueryOptions as t };
