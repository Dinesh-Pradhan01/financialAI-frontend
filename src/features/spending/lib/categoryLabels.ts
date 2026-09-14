import type { CategoryAggregate } from "../types/transaction";

/**
 * CFO-facing display label mappings for raw extraction-pipeline category keys.
 * Applied strictly at render time in presentation layers (legends, tooltips, chart labels).
 * The underlying raw category string is preserved for data keys, APIs, and filtering.
 */
export const CATEGORY_DISPLAY_LABELS: Record<string, string> = {
  // Payroll & Staff
  salary: "Payroll & Staff Compensation",
  salaries: "Payroll & Staff Compensation",
  payroll: "Payroll & Staff Compensation",
  wages: "Wages & Contractor Payouts",

  // Facilities & Real Estate
  rent: "Rent & Facilities",
  "office-rent": "Office Rent",
  utilities: "Utilities",
  electricity: "Electricity",
  water: "Water & Municipal",

  // IT, Infrastructure & Subscriptions
  software: "Software & Tools",
  "software-subscription": "Software Subscriptions",
  subscription: "Subscriptions",
  subscriptions: "Subscriptions",
  "cloud-services": "Cloud Infrastructure",
  hosting: "Web & Server Hosting",
  telecom: "Telecommunications",
  internet: "Internet & Broadband",

  // Office & Admin
  "office-supplies": "Office Supplies",
  supplies: "Office Supplies",
  equipment: "Equipment & Hardware",
  electronics: "Electronics & Devices",
  shipping: "Shipping & Logistics",
  delivery: "Courier & Delivery",

  // Operations & Compliance
  tax: "Taxes & Compliance",
  gst: "GST Payments",
  tds: "TDS Deductions",
  insurance: "Insurance",
  legal: "Legal & Professional Fees",
  "professional-services": "Professional Services",
  "home-services": "Facility Services",

  // Travel & Expenses
  travel: "Business Travel",
  food: "Meals & Food",
  lifestyle: "Lifestyle & Perks",

  // Financial & Banking
  bank_charges: "Bank Charges & Fees",
  interest: "Interest & Finance Fees",
  investment: "Investments",
  transfer: "Inter-account Transfer",

  // Other / Fallback
  other: "Other Expenses",
  uncategorized: "Uncategorized",
};

/**
 * Maps a raw category string to a CFO-friendly display label.
 * Applies Title Case to any category not explicitly mapped.
 */
export function getDisplayCategoryLabel(rawCategory?: string | null): string {
  if (!rawCategory) return "Uncategorized";
  const normalized = rawCategory.trim().toLowerCase();

  if (CATEGORY_DISPLAY_LABELS[normalized]) {
    return CATEGORY_DISPLAY_LABELS[normalized];
  }

  // Title Case fallback for unmapped categories (e.g. "custom-spend" -> "Custom Spend")
  return (
    normalized
      .replace(/[-_]+/g, " ")
      .replace(/\b[a-z]/g, (char) => char.toUpperCase()) || "Uncategorized"
  );
}

export interface PreparedLegendItem {
  id: string;
  rawLabel: string;
  label: string;
  amount: number;
  share: number;
  shareFormatted: string;
  count: number;
  color: string;
  isOther?: boolean;
  subItems?: PreparedLegendItem[];
}

/**
 * Formats a share percentage for display.
 * If an item has an actual expense (amount > 0) but its proportion is under 0.5%
 * (which rounds to 0%), it returns "< 1%" to prevent user confusion.
 */
export function formatShare(share: number, amount: number = 0): string {
  if (amount > 0 && share === 0) {
    return "< 1%";
  }
  return `${share}%`;
}

export const DEFAULT_TOP_N = 6;

/**
 * Shapes category aggregates into presentation-ready legend & chart data:
 * - Preserves descending amount sorting
 * - Keeps top N categories individually
 * - Buckets remaining into synthetic "Other" (if >1 item below threshold)
 * - Returns amount and percentage per row
 * - Defensively removes non-Other 0% rows
 */
export function prepareLegendData(
  categories: CategoryAggregate[],
  total: number,
  colors: string[],
  topN: number = DEFAULT_TOP_N,
): PreparedLegendItem[] {
  if (!categories || categories.length === 0 || total <= 0) {
    return [];
  }

  // 1. Ensure sorted descending by amount
  const sorted = [...categories].sort((a, b) => b.amount - a.amount);

  // 2. Map raw categories to display items with percentage share and formatted share
  const mapped = sorted.map((cat) => {
    const rawLabel = cat.label || "Uncategorized";
    const share = total > 0 ? Math.round((cat.amount / total) * 100) : 0;
    const amount = Math.round(cat.amount);
    return {
      id: cat.id || rawLabel.toLowerCase(),
      rawLabel,
      label: getDisplayCategoryLabel(rawLabel),
      amount,
      share,
      shareFormatted: formatShare(share, amount),
      count: cat.count,
    };
  });

  // 3. Partition into top items vs remaining for bucketing
  // Do not bucket into "Other" if only 1 item would be bucketed and doing so wouldn't reduce row count
  let candidateTop: typeof mapped;
  let remaining: typeof mapped;

  if (mapped.length <= topN + 1) {
    candidateTop = mapped;
    remaining = [];
  } else {
    candidateTop = mapped.slice(0, topN);
    remaining = mapped.slice(topN);
  }

  // 4. Defensive check: filter out any row that would render 0% AND is not part of "Other"
  // Move 0% rows into remaining so their amounts are preserved in "Other"
  const finalTop: typeof mapped = [];
  for (const item of candidateTop) {
    if (item.share > 0) {
      finalTop.push(item);
    } else {
      remaining.push(item);
    }
  }

  const result: PreparedLegendItem[] = [];

  // Assign palette colors to top items
  finalTop.forEach((item, index) => {
    result.push({
      ...item,
      color: colors[index % colors.length],
      isOther: false,
    });
  });

  // 5. Build synthetic "Other" row if remaining items exist
  if (remaining.length > 0) {
    // If only 1 item remained and its share > 0, keep it individually if room allows
    if (remaining.length === 1 && result.length < topN + 1 && remaining[0].share > 0) {
      result.push({
        ...remaining[0],
        color: colors[result.length % colors.length],
        isOther: false,
      });
    } else {
      const otherAmount = remaining.reduce((sum, item) => sum + item.amount, 0);
      const otherCount = remaining.reduce((sum, item) => sum + item.count, 0);
      // Ensure share reflects the true rounded proportion
      const otherShare = total > 0 ? Math.round((otherAmount / total) * 100) : 0;

      const subItems: PreparedLegendItem[] = remaining.map((item, idx) => ({
        ...item,
        color: colors[(finalTop.length + idx) % colors.length] || "var(--text-secondary)",
        isOther: false,
        shareFormatted: formatShare(item.share, item.amount),
      }));

      result.push({
        id: "other",
        rawLabel: "other",
        label: "Other Expenses",
        amount: otherAmount,
        share: otherShare,
        shareFormatted: formatShare(otherShare, otherAmount),
        count: otherCount,
        // Use the next palette color or muted fallback
        color: colors[finalTop.length % colors.length] || "var(--text-secondary)",
        isOther: true,
        subItems,
      });
    }
  }

  return result;
}
