/**
 * Pure data transformation functions for the Developments Domain.
 * No React dependencies.
 */

import type {
  DevelopmentItemDTO,
  DevelopmentRelevance,
  DevelopmentResponseDTO,
  DevelopmentStatus,
  DevelopmentViewModel,
  DevelopmentsViewModel,
} from "../types/developments";

const NAMED_HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201D",
  ldquo: "\u201C",
  ndash: "\u2013",
  mdash: "\u2014",
  hellip: "\u2026",
};

/**
 * Pure single-pass HTML entity decoder.
 * Supports numeric decimal (&#39;), numeric hex (&#x27;), and standard named entities.
 * No DOM dependency, safe in any JavaScript / SSR environment.
 */
export function decodeHtmlEntities(input?: string | null): string {
  if (typeof input !== "string" || !input) return "";

  return input.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const code = parseInt(entity.slice(2), 16);
      return !isNaN(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    if (entity.startsWith("#")) {
      const code = parseInt(entity.slice(1), 10);
      return !isNaN(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    const lower = entity.toLowerCase();
    return Object.prototype.hasOwnProperty.call(NAMED_HTML_ENTITIES, lower)
      ? NAMED_HTML_ENTITIES[lower]
      : match;
  });
}

/**
 * Normalises a string by decoding entities, lowercasing, and stripping all non-alphanumerics.
 */
export function normalizeAlphanumeric(str?: string | null): string {
  if (typeof str !== "string") return "";
  return decodeHtmlEntities(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Cleans a development title:
 * 1. Decodes HTML entities.
 * 2. Strips a trailing " - {source_name}" ONLY when it matches the item's source_name exactly (case-insensitive, trimmed).
 * Never strips anything else.
 */
export function cleanTitle(rawTitle?: string | null, sourceName?: string | null): string {
  const decoded = decodeHtmlEntities(rawTitle).trim();
  const source = typeof sourceName === "string" ? sourceName.trim() : "";
  if (!source) return decoded;

  const suffix = ` - ${source}`.toLowerCase();
  if (decoded.toLowerCase().endsWith(suffix)) {
    return decoded.slice(0, decoded.length - suffix.length).trim();
  }
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
export function extractDetail(
  summary?: string | null,
  rawTitle?: string | null,
  cleanedTitle?: string | null,
): string | null {
  if (typeof summary !== "string") return null;
  const decodedSummary = decodeHtmlEntities(summary).trim();
  if (!decodedSummary) return null;

  const summaryNorm = normalizeAlphanumeric(decodedSummary);
  if (!summaryNorm) return null;

  const rawTitleNorm = normalizeAlphanumeric(rawTitle);
  const cleanedTitleNorm = normalizeAlphanumeric(cleanedTitle);

  const isDuplicateVariant = (titleNorm: string): boolean => {
    if (!titleNorm) return false;
    if (summaryNorm === titleNorm) return true;
    if (summaryNorm.startsWith(titleNorm) || titleNorm.startsWith(summaryNorm)) return true;
    if (summaryNorm.endsWith(titleNorm) || titleNorm.endsWith(summaryNorm)) return true;
    return false;
  };

  if (isDuplicateVariant(rawTitleNorm) || isDuplicateVariant(cleanedTitleNorm)) {
    return null;
  }

  return decodedSummary;
}

/**
 * Decodes HTML entities in implication, trims whitespace, and maps empty to null.
 * Never alters text quality or adds synthetic prose.
 */
export function extractImplication(implication?: string | null): string | null {
  if (typeof implication !== "string") return null;
  const decoded = decodeHtmlEntities(implication).trim();
  return decoded.length > 0 ? decoded : null;
}

/**
 * Builds "City, State" / "City" / "State" strictly from non-null item.city and item.state.
 * Never derived from location object or company context.
 */
export function extractLocation(city?: string | null, state?: string | null): string | null {
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
export function generateItemKey(
  item: Partial<DevelopmentItemDTO>,
  seenKeys: Map<string, number>,
  index: number,
): string {
  let baseKey: string;
  if (typeof item.id === "string" && item.id.trim().length > 0) {
    baseKey = item.id.trim();
  } else {
    const src = normalizeAlphanumeric(item.source_name);
    const pub = typeof item.published_at === "string" ? item.published_at.trim() : "";
    const titleSlice = normalizeAlphanumeric(item.title).slice(0, 32);
    baseKey = `${src}_${pub}_${titleSlice}`;
    if (!baseKey || baseKey === "__") {
      baseKey = `item_${index}`;
    }
  }

  const occurrences = seenKeys.get(baseKey) || 0;
  seenKeys.set(baseKey, occurrences + 1);
  return occurrences === 0 ? baseKey : `${baseKey}_${occurrences}`;
}

/**
 * Validates status value. Accepts only "active" | "closing_soon" | "expired".
 * Unknown values map to null with a dev-only console warning.
 */
export function extractStatus(status?: string | null): DevelopmentStatus | null {
  if (typeof status !== "string") return null;
  const s = status.trim().toLowerCase();
  if (s === "active" || s === "closing_soon" || s === "expired") {
    return s;
  }
  if (import.meta.env?.DEV) {
    console.warn(`[developments] Unknown development status encountered: "${status}"`);
  }
  return null;
}

/**
 * Validates closing_date string. Passes through only if it parses as a valid date.
 */
export function extractClosingDate(closingDate?: string | null): string | null {
  if (typeof closingDate !== "string") return null;
  const trimmed = closingDate.trim();
  if (!trimmed) return null;
  const timestamp = Date.parse(trimmed);
  if (isNaN(timestamp)) return null;
  return trimmed;
}

/**
 * Validates published_at string. Passes through only if it parses as a valid date.
 */
export function extractPublishedAt(publishedAt?: string | null): string | null {
  if (typeof publishedAt !== "string") return null;
  const trimmed = publishedAt.trim();
  if (!trimmed) return null;
  const timestamp = Date.parse(trimmed);
  if (isNaN(timestamp)) return null;
  return trimmed;
}

/**
 * Maps relevance strictly to "high" | "medium" | "low" | null.
 * Does NOT derive relevance from the numeric score.
 */
export function extractRelevance(relevance?: string | null): DevelopmentRelevance | null {
  if (typeof relevance !== "string") return null;
  const lower = relevance.trim().toLowerCase();
  if (lower === "high" || lower === "medium" || lower === "low") {
    return lower;
  }
  return null;
}

/**
 * Clamps relevance_score to 0..1 range.
 */
export function extractRelevanceScore(score?: unknown): number {
  if (typeof score === "number" && !isNaN(score)) {
    return Math.max(0, Math.min(1, score));
  }
  return 0;
}

/**
 * Stably sorts development items: relevanceScore descending, then publishedAt descending (nulls last).
 */
export function sortDevelopmentItems(items: DevelopmentViewModel[]): DevelopmentViewModel[] {
  return [...items].sort((a, b) => {
    // 1. relevanceScore descending
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    // 2. publishedAt descending (nulls last)
    if (a.publishedAt && b.publishedAt) {
      const timeA = Date.parse(a.publishedAt);
      const timeB = Date.parse(b.publishedAt);
      if (!isNaN(timeA) && !isNaN(timeB)) {
        return timeB - timeA;
      }
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
export function mapDevelopmentsResponse(dto: unknown): DevelopmentsViewModel {
  const data = (dto && typeof dto === "object" ? dto : {}) as Partial<DevelopmentResponseDTO>;

  const companyName = typeof data.company?.name === "string" ? data.company.name.trim() : "";
  const retrievedAt = typeof data.retrieved_at === "string" ? data.retrieved_at.trim() : "";
  const sources = Array.isArray(data.sources)
    ? data.sources.filter((s): s is string => typeof s === "string" && s.trim().length > 0)
    : [];
  const degraded = data.degraded === true;

  const rawItems = Array.isArray(data.items) ? data.items : [];
  const seenKeys = new Map<string, number>();

  const mappedItems: DevelopmentViewModel[] = rawItems.map((item, index) => {
    const raw = (item && typeof item === "object" ? item : {}) as Partial<DevelopmentItemDTO>;
    const title = cleanTitle(raw.title, raw.source_name);
    const detail = extractDetail(raw.summary, raw.title, title);
    const implication = extractImplication(raw.implication);
    const sourceName = typeof raw.source_name === "string" ? raw.source_name.trim() : "";
    const sourceUrl =
      typeof raw.source_url === "string" && raw.source_url.trim().length > 0
        ? raw.source_url.trim()
        : null;
    const publishedAt = extractPublishedAt(raw.published_at);
    const relevance = extractRelevance(raw.relevance);
    const relevanceScore = extractRelevanceScore(raw.relevance_score);
    const location = extractLocation(raw.city, raw.state);
    const closingDate = extractClosingDate(raw.closing_date);
    const status = extractStatus(raw.status);
    const key = generateItemKey(raw, seenKeys, index);

    return {
      key,
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
      status,
    };
  });

  const sortedItems = sortDevelopmentItems(mappedItems);

  return {
    companyName,
    retrievedAt,
    sources,
    degraded,
    items: sortedItems,
  };
}
