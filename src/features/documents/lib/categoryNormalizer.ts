/**
 * categoryNormalizer.ts
 *
 * Bridge and helper utilities derived directly from vaultManifest.ts.
 *
 * ARCHITECTURE PRINCIPLE:
 * vaultManifest.ts is the SINGLE source of truth for all vault sections,
 * subcategories, and document placement rules.
 */

import type { LucideIcon } from "lucide-react";
import {
  VAULT_SECTIONS,
  MISC_SECTION,
  resolveVaultPlacement,
  type VaultSectionId,
  type VaultSection,
  type VaultSubCategory,
} from "./vaultManifest";

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------

export type TopLevelDomainId = VaultSectionId | "miscellaneous";
export type CanonicalCategoryId = string;

export interface TopLevelDomainConfig {
  id: TopLevelDomainId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  canonicalCategoryIds: CanonicalCategoryId[];
}

export interface CanonicalCategoryConfig {
  id: CanonicalCategoryId;
  domainId: TopLevelDomainId;
  number: number;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}

// ---------------------------------------------------------------------------
// Single Source Derivation from vaultManifest
// ---------------------------------------------------------------------------

const allSections: VaultSection[] = [...VAULT_SECTIONS, MISC_SECTION];

const domainMap = new Map<TopLevelDomainId, TopLevelDomainConfig>();
const categoryMap = new Map<CanonicalCategoryId, CanonicalCategoryConfig>();
const orderedDomains: TopLevelDomainConfig[] = [];
const orderedCategories: CanonicalCategoryConfig[] = [];

let catNumber = 1;
for (const section of allSections) {
  const catIds: CanonicalCategoryId[] = [];

  for (const sub of section.subCategories) {
    if (sub.kind === "external") continue;

    const catConfig: CanonicalCategoryConfig = {
      id: sub.id,
      domainId: section.id as TopLevelDomainId,
      number: catNumber++,
      label: sub.label,
      shortLabel: sub.shortLabel,
      description: sub.description,
      icon: (sub.icon || section.icon) as LucideIcon,
    };

    categoryMap.set(sub.id, catConfig);
    // Also alias legacyCategoryId and targetBackendCategory for fast lookup
    if (sub.legacyCategoryId && !categoryMap.has(sub.legacyCategoryId)) {
      categoryMap.set(sub.legacyCategoryId, catConfig);
    }
    if (sub.targetBackendCategory && !categoryMap.has(sub.targetBackendCategory)) {
      categoryMap.set(sub.targetBackendCategory, catConfig);
    }

    orderedCategories.push(catConfig);
    catIds.push(sub.id);
  }

  const domainConfig: TopLevelDomainConfig = {
    id: section.id as TopLevelDomainId,
    label: section.label,
    shortLabel: section.shortLabel,
    description: section.description,
    icon: section.icon,
    canonicalCategoryIds: catIds,
  };

  domainMap.set(section.id as TopLevelDomainId, domainConfig);
  orderedDomains.push(domainConfig);
}

export const TOP_LEVEL_DOMAINS = Object.fromEntries(domainMap) as Record<
  TopLevelDomainId,
  TopLevelDomainConfig
>;

export const CANONICAL_CATEGORIES = Object.fromEntries(categoryMap) as Record<
  CanonicalCategoryId,
  CanonicalCategoryConfig
>;

export const ORDERED_TOP_LEVEL_DOMAINS: TopLevelDomainConfig[] = orderedDomains;
export const ORDERED_CANONICAL_CATEGORIES: CanonicalCategoryConfig[] = orderedCategories;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getDomainForCategory(categoryId: string): TopLevelDomainConfig {
  const cat = categoryMap.get(categoryId);
  if (cat && domainMap.has(cat.domainId)) {
    return domainMap.get(cat.domainId)!;
  }
  return domainMap.get("miscellaneous")!;
}

/**
 * Normalizes any category string/number and optional documentType into
 * the authoritative subcategory ID from vaultManifest.
 */
export function normalizeCategory(
  category: string | number | null | undefined,
  documentType?: string | null | undefined,
): string {
  const placement = resolveVaultPlacement(category, documentType);
  return placement.subCategoryId;
}

/**
 * Resolves the CanonicalCategoryConfig object for any document
 * using vaultManifest as the single source of truth.
 */
export function getCanonicalCategory(
  category: string | number | null | undefined,
  documentType?: string | null | undefined,
): CanonicalCategoryConfig {
  const placement = resolveVaultPlacement(category, documentType);
  const existing = categoryMap.get(placement.subCategoryId);
  if (existing) {
    return existing;
  }

  return {
    id: placement.subCategory.id,
    domainId: placement.section.id as TopLevelDomainId,
    number: 99,
    label: placement.subCategory.label,
    shortLabel: placement.subCategory.shortLabel,
    description: placement.subCategory.description,
    icon: (placement.subCategory.icon || placement.section.icon) as LucideIcon,
  };
}
