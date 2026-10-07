/**
 * Presentation Helpers & Design Tokens for Industry v2
 *
 * Adheres strictly to DESIGN.md:
 * - Zero arbitrary Tailwind values
 * - Semantic design tokens only
 * - Meaning carried by text and icons, not colour alone
 * - Standard Indian number formatting with tabular mono numerals
 * - Null values strictly rendered as em dash ("—")
 */

import { SignalHigh, SignalMedium, SignalLow, type LucideIcon } from "lucide-react";
import type { OverlapLevel, FinancialRowConfig, FinancialBasis } from "../types/industry";

// ---------------------------------------------------------------------------
// Constants & Unit Captions
// ---------------------------------------------------------------------------

export const FINANCIAL_UNIT_CAPTION = "All figures in ₹ Cr.";
export const EM_DASH = "—";
export const DISPLAY_COSTS_AS_POSITIVE = true;

// ---------------------------------------------------------------------------
// Number & Financial Formatters
// ---------------------------------------------------------------------------

export interface FormatFinancialOptions {
  /** If true, appends '%' suffix. */
  isPercentage?: boolean;
  /** Decimal places (default: 2). */
  digits?: number;
  /** If true, prepends currency sign (₹). */
  showCurrency?: boolean;
}

/**
 * Formats a nullable financial value with Indian (en-IN) number grouping.
 *
 * Rules:
 * - null / undefined / NaN -> strictly "—" (em dash).
 * - Never fabricates 0 when null.
 * - Respects negative signs cleanly: -₹12.50 or -12.50% or -12.50.
 * - Always 2 decimal places by default for currency/percentage precision.
 */
export function formatFinancialValue(
  value: number | null | undefined,
  options: FormatFinancialOptions = {},
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return EM_DASH;
  }

  const { isPercentage = false, digits = 2, showCurrency = false } = options;
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // Format with standard en-IN grouping (e.g. 12,34,567.89)
  const formatter = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  const formattedAbs = formatter.format(absValue);

  if (isPercentage) {
    return isNegative ? `-${formattedAbs}%` : `${formattedAbs}%`;
  }

  if (showCurrency) {
    return isNegative ? `-₹${formattedAbs}` : `₹${formattedAbs}`;
  }

  return isNegative ? `-${formattedAbs}` : formattedAbs;
}

// ---------------------------------------------------------------------------
// Overlap Level Metadata & Design Tokens
// ---------------------------------------------------------------------------

export interface OverlapLevelMeta {
  readonly level: OverlapLevel;
  readonly rankOrder: number;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly tintClass: string;
  readonly borderClass: string;
  readonly textClass: string;
  readonly badgeClasses: string;
  readonly description: string;
}

export const OVERLAP_LEVEL_META: Record<OverlapLevel, OverlapLevelMeta> = {
  "Very High": {
    level: "Very High",
    rankOrder: 1,
    label: "Very High Overlap",
    icon: SignalHigh,
    tintClass: "bg-brand-primary/10",
    borderClass: "border-brand-primary/30",
    textClass: "text-brand-primary",
    badgeClasses: "bg-brand-primary/10 border-brand-primary/30 text-brand-primary",
    description:
      "Direct competitor sharing identical product categories, business models, and primary buyer segments.",
  },
  High: {
    level: "High",
    rankOrder: 2,
    label: "High Overlap",
    icon: SignalHigh,
    tintClass: "bg-severity-low/15",
    borderClass: "border-severity-low/30",
    textClass: "text-severity-low",
    badgeClasses: "bg-severity-low/15 border-severity-low/30 text-severity-low",
    description:
      "Substantial product catalog or customer market overlap with minor operational differences.",
  },
  "Moderate High": {
    level: "Moderate High",
    rankOrder: 3,
    label: "Moderate High Overlap",
    icon: SignalMedium,
    tintClass: "bg-severity-moderate/15",
    borderClass: "border-severity-moderate/30",
    textClass: "text-severity-moderate",
    badgeClasses: "bg-severity-moderate/15 border-severity-moderate/30 text-severity-moderate",
    description:
      "Partial overlap in wholesale hardware distribution with distinct specialization or service components.",
  },
  Moderate: {
    level: "Moderate",
    rankOrder: 4,
    label: "Moderate Overlap",
    icon: SignalLow,
    tintClass: "bg-surface-alt",
    borderClass: "border-border-c",
    textClass: "text-text-secondary",
    badgeClasses: "bg-surface-alt border-border-c text-text-secondary",
    description:
      "Adjacent industry peer operating within broader technology and electronics distribution.",
  },
};

/**
 * Compares two overlap levels for sorting. (Lower order = higher overlap).
 */
export function compareOverlapLevels(a: OverlapLevel, b: OverlapLevel): number {
  return OVERLAP_LEVEL_META[a].rankOrder - OVERLAP_LEVEL_META[b].rankOrder;
}

// ---------------------------------------------------------------------------
// Table Row Configuration
// ---------------------------------------------------------------------------

export const FINANCIAL_TABLE_ROW_CONFIGS: readonly FinancialRowConfig[] = [
  { key: "revenue", label: "Revenue", isPercentage: false },
  { key: "other_income", label: "Other Income", isPercentage: false },
  { key: "total_income", label: "Total Income", isPercentage: false },
  { key: "expenditure", label: "Expenditure", isPercentage: false },
  { key: "interest", label: "Interest", isPercentage: false },
  { key: "operating_profit", label: "Operating Profit", isPercentage: false },
  { key: "net_profit", label: "Net Profit", isPercentage: false },
  { key: "opm_pct", label: "OPM %", isPercentage: true },
  { key: "npm_pct", label: "NPM %", isPercentage: true },
] as const;

// ---------------------------------------------------------------------------
// Copy Maps (Reason Codes & Basis)
// ---------------------------------------------------------------------------

export const REASON_CODE_COPY_MAP: Record<string, string> = {
  unlisted_private_company:
    "Financial data is not publicly reported for unlisted private companies.",
  no_financials_loaded: "Financial statements are currently not loaded for this entity.",
  gap_in_quarters:
    "Insufficient consecutive quarterly records to compute reliable annual roll-ups.",
  non_reporting_entity: "Company is not subject to public quarterly reporting requirements.",
};

/**
 * Returns human-readable explanation copy for a machine reason code.
 */
export function getReasonDisplayCopy(reason: string | null | undefined): string | null {
  if (!reason) return null;
  const normalized = reason.trim().toLowerCase();
  if (REASON_CODE_COPY_MAP[normalized]) {
    return REASON_CODE_COPY_MAP[normalized];
  }
  // Fallback: convert snake_case to readable sentence
  const formatted = reason.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  return `${formatted}.`;
}

export const BASIS_COPY_MAP: Record<FinancialBasis, string> = {
  reported: "Audited reported figures",
  rolled_up: "Computed sum of 4 quarters",
};

/**
 * Returns descriptive copy for annual figures basis.
 */
export function getBasisDisplayCopy(basis: string | null | undefined): string {
  if (!basis) return "";
  if (basis in BASIS_COPY_MAP) {
    return BASIS_COPY_MAP[basis as FinancialBasis];
  }
  return basis;
}
