import type { CompanyDocument } from "@/shared/types/api";
import {
  type CanonicalCategoryConfig,
  type TopLevelDomainConfig,
  ORDERED_CANONICAL_CATEGORIES,
  ORDERED_TOP_LEVEL_DOMAINS,
  CANONICAL_CATEGORIES,
  getCanonicalCategory,
} from "./categoryNormalizer";
import { resolveVaultPlacement } from "./vaultManifest";
import { getTaxonomyDocument } from "./documentTaxonomy";

export type SortOrder = "newest" | "oldest" | "name_asc" | "name_desc" | "size_desc";

/**
 * Cleanly format a document type string for display.
 * Falls back to "Unclassified Document" for missing, empty, or unknown values.
 */
export function formatDocumentType(documentType?: string | null): string {
  if (!documentType) return "Unclassified Document";

  const raw = documentType.trim();
  const lower = raw.toLowerCase();
  if (lower === "unknown" || lower === "other" || lower === "unclassified" || lower === "") {
    return "Unclassified Document";
  }

  // Check if known taxonomy document provides an authoritative human-readable label
  const taxonomyDoc = getTaxonomyDocument(raw);
  if (taxonomyDoc?.label) {
    return taxonomyDoc.label;
  }

  // Otherwise format snake_case or kebab-case into Title Case
  return raw
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Formats a file size in bytes to a human-readable string (e.g., "1.2 MB").
 */
export function formatFileSize(bytes?: number | null): string {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes) || bytes <= 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/**
 * Formats an ISO date string into standard executive date format: "12 Oct 2026" (Indian / UK standard).
 */
export function formatDocumentDate(dateStr?: string | null): string {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

/**
 * Derives the financial period / fiscal year (e.g., "FY 2024-25") for a document.
 * Examines filename for explicit fiscal year patterns, and falls back to
 * calculating the Indian Fiscal Year (April 1 - March 31) from filing date.
 */
export function deriveFiscalPeriod(doc: CompanyDocument): string {
  const name = (doc.original_name || "").toUpperCase();

  // 1. Explicit 4-digit fiscal year range: FY 2024-25, FY 2024-2025, 2024-25
  const fyLongMatch = name.match(/FY\s*(20\d\d)[-_/](20)?(\d\d)/i);
  if (fyLongMatch) {
    const startYear = fyLongMatch[1];
    const endYearShort = fyLongMatch[3];
    return `FY ${startYear}-${endYearShort}`;
  }

  // 2. Explicit 2-digit fiscal year: FY 24-25 or FY25
  const fyShortMatch = name.match(/FY\s*(\d\d)[-_/](\d\d)/i);
  if (fyShortMatch) {
    return `FY 20${fyShortMatch[1]}-${fyShortMatch[2]}`;
  }

  const singleFyMatch = name.match(/FY\s*(\d\d)/i);
  if (singleFyMatch) {
    const yr = Number.parseInt(singleFyMatch[1], 10);
    return `FY 20${yr - 1}-${yr}`;
  }

  // 3. Fallback: Indian fiscal year from created_at date (Apr 1 - Mar 31 cycle)
  if (doc.created_at) {
    try {
      const d = new Date(doc.created_at);
      if (!Number.isNaN(d.getTime())) {
        const year = d.getFullYear();
        const month = d.getMonth(); // 0-indexed: 0=Jan, 3=Apr
        // If before April, it belongs to previous FY (e.g., Jan 2026 is FY 2025-26)
        const fyStart = month >= 3 ? year : year - 1;
        const fyEndShort = String((fyStart + 1) % 100).padStart(2, "0");
        return `FY ${fyStart}-${fyEndShort}`;
      }
    } catch {
      // Fallback
    }
  }

  return "FY Current";
}

/**
 * Returns document version tag (e.g. "v1", "v2").
 * Identifies if document has been modified/replaced since creation.
 */
export function getDocumentVersion(doc: CompanyDocument): string {
  if (doc.updated_at && doc.created_at && doc.updated_at !== doc.created_at) {
    return "v2";
  }
  return "v1";
}

/**
 * Filter and sort a collection of documents in memory.
 * Accepts either a top-level domain ID or a canonical category ID.
 */
export function filterAndSortDocuments(
  documents: CompanyDocument[],
  options: {
    categoryFilter?: string; // "all", TopLevelDomainId, or CanonicalCategoryId
    searchQuery?: string;
    sortOrder?: SortOrder;
  } = {},
): CompanyDocument[] {
  const { categoryFilter = "all", searchQuery = "", sortOrder = "newest" } = options;
  const q = searchQuery.trim().toLowerCase();

  const filtered = documents.filter((doc) => {
    // 1. Domain / Category Filter using single-source-of-truth vault placement
    if (categoryFilter !== "all") {
      const placement = resolveVaultPlacement(doc.document_category, doc.document_type);
      const matchesSection = placement.sectionId === categoryFilter;
      const matchesSub = placement.subCategoryId === categoryFilter;

      if (!matchesSection && !matchesSub) {
        return false;
      }
    }

    // 2. Search Query Filter (Searches original_name, document_type, formattedType, and notes)
    if (q) {
      const originalName = (doc.original_name ?? "").toLowerCase();
      const docType = (doc.document_type ?? "").toLowerCase();
      const formattedType = formatDocumentType(doc.document_type).toLowerCase();
      const notes = (doc.verification_notes ?? "").toLowerCase();

      const matchesSearch =
        originalName.includes(q) ||
        docType.includes(q) ||
        formattedType.includes(q) ||
        notes.includes(q);

      if (!matchesSearch) return false;
    }

    return true;
  });

  // 3. Sorting
  return [...filtered].sort((a, b) => {
    switch (sortOrder) {
      case "newest": {
        const timeA = new Date(a.created_at || 0).getTime();
        const timeB = new Date(b.created_at || 0).getTime();
        return timeB - timeA;
      }
      case "oldest": {
        const timeA = new Date(a.created_at || 0).getTime();
        const timeB = new Date(b.created_at || 0).getTime();
        return timeA - timeB;
      }
      case "name_asc": {
        return (a.original_name || "").localeCompare(b.original_name || "");
      }
      case "name_desc": {
        return (b.original_name || "").localeCompare(a.original_name || "");
      }
      case "size_desc": {
        return (b.file_size_bytes || 0) - (a.file_size_bytes || 0);
      }
      default:
        return 0;
    }
  });
}

// ---------------------------------------------------------------------------
// Attention Indicators (Section 9A)
// ---------------------------------------------------------------------------

export interface AttentionSignals {
  missingRequiredCount: number;
  needsAttentionCount: number;
}

/**
 * Calculates attention flags using verification and quality signals.
 */
export function calculateSubcategoryAttention(
  _subCategoryId: string,
  uploadedDocuments: CompanyDocument[],
): AttentionSignals {
  const needsAttentionCount = uploadedDocuments.filter(
    (d) =>
      !d.is_verified ||
      d.upload_status === "failed" ||
      (d.quality_score !== null && d.quality_score < 70),
  ).length;

  return { missingRequiredCount: 0, needsAttentionCount };
}

export interface CategoryGroup {
  category: CanonicalCategoryConfig;
  documents: CompanyDocument[];
}

export interface SubcategoryGroup {
  category: CanonicalCategoryConfig;
  documents: CompanyDocument[];
  missingRequiredCount: number;
  needsAttentionCount: number;
}

export interface DomainGroup {
  domain: TopLevelDomainConfig;
  subcategories: SubcategoryGroup[];
  totalDocuments: number;
  missingRequiredCount: number;
  needsAttentionCount: number;
}

/**
 * Groups documents hierarchically:
 * Top-Level Domain -> Subcategory (Document Family) -> CompanyDocument[]
 *
 * Guarantees zero dropped documents by resolving each file directly
 * through vaultManifest.ts resolveVaultPlacement.
 */
export function groupDocumentsByHierarchy(documents: CompanyDocument[]): DomainGroup[] {
  // Map of sectionId -> Map of subCategoryId -> CompanyDocument[]
  const sectionMap = new Map<string, Map<string, CompanyDocument[]>>();

  for (const doc of documents) {
    const placement = resolveVaultPlacement(doc.document_category, doc.document_type);
    let subMap = sectionMap.get(placement.sectionId);
    if (!subMap) {
      subMap = new Map();
      sectionMap.set(placement.sectionId, subMap);
    }
    const list = subMap.get(placement.subCategoryId);
    if (list) {
      list.push(doc);
    } else {
      subMap.set(placement.subCategoryId, [doc]);
    }
  }

  const domainGroups: DomainGroup[] = [];

  for (const domain of ORDERED_TOP_LEVEL_DOMAINS) {
    const subMap = sectionMap.get(domain.id);
    if (!subMap || subMap.size === 0) continue;

    const subcategories: SubcategoryGroup[] = [];
    let domainTotal = 0;
    let domainMissingRequired = 0;
    let domainNeedsAttention = 0;

    // First preserve canonical subcategory order
    for (const catId of domain.canonicalCategoryIds) {
      const docs = subMap.get(catId);
      if (docs && docs.length > 0) {
        const attention = calculateSubcategoryAttention(catId, docs);
        domainMissingRequired += attention.missingRequiredCount;
        domainNeedsAttention += attention.needsAttentionCount;

        subcategories.push({
          category:
            CANONICAL_CATEGORIES[catId] ||
            getCanonicalCategory(docs[0].document_category, docs[0].document_type),
          documents: docs,
          missingRequiredCount: attention.missingRequiredCount,
          needsAttentionCount: attention.needsAttentionCount,
        });
        domainTotal += docs.length;
      }
    }

    // Also include any subcategories under this section that weren't in canonicalCategoryIds
    for (const [subId, docs] of subMap.entries()) {
      if (!domain.canonicalCategoryIds.includes(subId) && docs.length > 0) {
        const attention = calculateSubcategoryAttention(subId, docs);
        domainMissingRequired += attention.missingRequiredCount;
        domainNeedsAttention += attention.needsAttentionCount;

        subcategories.push({
          category:
            CANONICAL_CATEGORIES[subId] ||
            getCanonicalCategory(docs[0].document_category, docs[0].document_type),
          documents: docs,
          missingRequiredCount: attention.missingRequiredCount,
          needsAttentionCount: attention.needsAttentionCount,
        });
        domainTotal += docs.length;
      }
    }

    if (subcategories.length > 0) {
      domainGroups.push({
        domain,
        subcategories,
        totalDocuments: domainTotal,
        missingRequiredCount: domainMissingRequired,
        needsAttentionCount: domainNeedsAttention,
      });
    }
  }

  return domainGroups;
}

/**
 * Groups documents by canonical category in canonical sort order.
 */
export function groupDocumentsByCategory(documents: CompanyDocument[]): CategoryGroup[] {
  const groupsMap = new Map<string, CompanyDocument[]>();

  for (const doc of documents) {
    const placement = resolveVaultPlacement(doc.document_category, doc.document_type);
    const existing = groupsMap.get(placement.subCategoryId);
    if (existing) {
      existing.push(doc);
    } else {
      groupsMap.set(placement.subCategoryId, [doc]);
    }
  }

  const result: CategoryGroup[] = [];
  for (const catConfig of ORDERED_CANONICAL_CATEGORIES) {
    const docs = groupsMap.get(catConfig.id);
    if (docs && docs.length > 0) {
      result.push({
        category: catConfig,
        documents: docs,
      });
    }
  }

  for (const [subId, docs] of groupsMap.entries()) {
    if (!ORDERED_CANONICAL_CATEGORIES.some((c) => c.id === subId) && docs.length > 0) {
      result.push({
        category:
          CANONICAL_CATEGORIES[subId] ||
          getCanonicalCategory(docs[0].document_category, docs[0].document_type),
        documents: docs,
      });
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Section 8: Compact Repository Structure Overview Model ("All" View)
// ---------------------------------------------------------------------------

export interface OverviewSubcategoryRow {
  category: CanonicalCategoryConfig;
  documentCount: number;
  missingRequiredCount: number;
  needsAttentionCount: number;
}

export interface OverviewDomainRow {
  domain: TopLevelDomainConfig;
  totalDocuments: number;
  missingRequiredCount: number;
  needsAttentionCount: number;
  subcategories: OverviewSubcategoryRow[];
}

/**
 * Generates the compact repository structure overview for Section 8 ("All" view).
 * Returns all top-level domains and their subcategories with document counts and
 * attention indicators.
 */
export function getRepositoryStructureOverview(documents: CompanyDocument[]): OverviewDomainRow[] {
  const sectionMap = new Map<string, Map<string, CompanyDocument[]>>();

  for (const doc of documents) {
    const placement = resolveVaultPlacement(doc.document_category, doc.document_type);
    let subMap = sectionMap.get(placement.sectionId);
    if (!subMap) {
      subMap = new Map();
      sectionMap.set(placement.sectionId, subMap);
    }
    const list = subMap.get(placement.subCategoryId);
    if (list) {
      list.push(doc);
    } else {
      subMap.set(placement.subCategoryId, [doc]);
    }
  }

  const overviewRows: OverviewDomainRow[] = [];

  for (const domain of ORDERED_TOP_LEVEL_DOMAINS) {
    const subMap = sectionMap.get(domain.id);
    const domainDocsCount = subMap
      ? Array.from(subMap.values()).reduce((acc, docs) => acc + docs.length, 0)
      : 0;

    // Miscellaneous fallback domain is only rendered if it actually contains documents
    if (domain.id === "miscellaneous" && domainDocsCount === 0) continue;

    const subcategoryRows: OverviewSubcategoryRow[] = [];
    let domainMissingRequired = 0;
    let domainNeedsAttention = 0;

    for (const catId of domain.canonicalCategoryIds) {
      const docs = subMap?.get(catId) || [];
      const attention = calculateSubcategoryAttention(catId, docs);
      domainMissingRequired += attention.missingRequiredCount;
      domainNeedsAttention += attention.needsAttentionCount;

      const catConfig =
        CANONICAL_CATEGORIES[catId] ||
        getCanonicalCategory(docs[0]?.document_category, docs[0]?.document_type);

      subcategoryRows.push({
        category: catConfig,
        documentCount: docs.length,
        missingRequiredCount: attention.missingRequiredCount,
        needsAttentionCount: attention.needsAttentionCount,
      });
    }

    overviewRows.push({
      domain,
      totalDocuments: domainDocsCount,
      missingRequiredCount: domainMissingRequired,
      needsAttentionCount: domainNeedsAttention,
      subcategories: subcategoryRows,
    });
  }

  return overviewRows;
}

/**
 * Calculates compact repository telemetry from documents array.
 */
export function calculateRepositoryMetrics(documents: CompanyDocument[]) {
  const totalCount = documents.length;
  const verifiedCount = documents.filter((d) => Boolean(d.is_verified)).length;
  const reviewedPercentage = totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0;
  const totalBytes = documents.reduce((acc, d) => acc + (d.file_size_bytes || 0), 0);

  return {
    totalCount,
    verifiedCount,
    reviewedPercentage,
    totalBytes,
    formattedTotalSize: formatFileSize(totalBytes),
  };
}
