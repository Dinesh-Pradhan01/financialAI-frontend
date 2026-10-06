/**
 * Presentation helpers, constants, and formatting utilities for the Developments domain.
 * Pure logic only. Zero React components.
 */

import {
  CheckCircle2,
  Clock,
  SignalHigh,
  SignalMedium,
  SignalLow,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { DevelopmentRelevance, DevelopmentStatus } from "../types/developments";

// ---------------------------------------------------------------------------
// Relevance Metadata & Tokens
// ---------------------------------------------------------------------------

export interface RelevanceMetaItem {
  readonly label: "High Relevance" | "Medium Relevance" | "Low Relevance";
  readonly iconName: "SignalHigh" | "SignalMedium" | "SignalLow";
  readonly icon: LucideIcon;
  readonly tint: string;
  readonly border: string;
  readonly iconColor: string;
  readonly labelColor: string;
  readonly badgeClasses: string;
  readonly description: string;
}

/**
 * Visual styling and metadata for relevance levels.
 *
 * Accessibility requirement:
 * State colour is carried by the icon, background tint, and border;
 * the label itself stays on a high-contrast text token (`text-text-primary`).
 * Colour is never the sole visual signal.
 */
export const RELEVANCE_META: Record<DevelopmentRelevance, RelevanceMetaItem> = {
  high: {
    label: "High Relevance",
    iconName: "SignalHigh",
    icon: SignalHigh,
    tint: "bg-severity-high/15",
    border: "border-severity-high/30",
    iconColor: "text-severity-high",
    labelColor: "text-text-primary",
    badgeClasses: "bg-severity-high/15 border-severity-high/30 text-text-primary",
    description:
      "High relevance to your company's profile, as scored by SpotLite. This is not a measure of urgency or importance.",
  },
  medium: {
    label: "Medium Relevance",
    iconName: "SignalMedium",
    icon: SignalMedium,
    tint: "bg-severity-moderate/15",
    border: "border-severity-moderate/30",
    iconColor: "text-severity-moderate",
    labelColor: "text-text-primary",
    badgeClasses: "bg-severity-moderate/15 border-severity-moderate/30 text-text-primary",
    description:
      "Medium relevance to your company's sector or operational activities, as scored by SpotLite. This is not a measure of urgency or importance.",
  },
  low: {
    label: "Low Relevance",
    iconName: "SignalLow",
    icon: SignalLow,
    tint: "bg-severity-low/15",
    border: "border-severity-low/30",
    iconColor: "text-severity-low",
    labelColor: "text-text-primary",
    badgeClasses: "bg-severity-low/15 border-severity-low/30 text-text-primary",
    description:
      "Low relevance to your company's profile, representing broader sector developments, as scored by SpotLite. This is not a measure of urgency or importance.",
  },
};

// ---------------------------------------------------------------------------
// Status Metadata (for future extensibility)
// ---------------------------------------------------------------------------

export interface StatusMetaItem {
  readonly label: string;
  readonly icon: LucideIcon;
  readonly tint: string;
  readonly border: string;
  readonly iconColor: string;
  readonly labelColor: string;
  readonly badgeClasses: string;
}

export const STATUS_META: Record<DevelopmentStatus, StatusMetaItem> = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    tint: "bg-success/15",
    border: "border-success/30",
    iconColor: "text-success",
    labelColor: "text-text-primary",
    badgeClasses: "bg-success/15 border-success/30 text-text-primary",
  },
  closing_soon: {
    label: "Closing Soon",
    icon: Clock,
    tint: "bg-severity-moderate/15",
    border: "border-severity-moderate/30",
    iconColor: "text-severity-moderate",
    labelColor: "text-text-primary",
    badgeClasses: "bg-severity-moderate/15 border-severity-moderate/30 text-text-primary",
  },
  expired: {
    label: "Expired",
    icon: XCircle,
    tint: "bg-surface-alt",
    border: "border-border-c",
    iconColor: "text-text-tertiary",
    labelColor: "text-text-secondary",
    badgeClasses: "bg-surface-alt border-border-c text-text-secondary",
  },
};

// ---------------------------------------------------------------------------
// Loading Stages & Footnote
// ---------------------------------------------------------------------------

export interface LoadingStage {
  readonly afterMs: number;
  readonly text: string;
}

/**
 * Progression stages shown during latency-heavy developments requests (26-31s cold).
 * Generic status wording only; no fabricated numbers.
 */
export const LOADING_STAGES: readonly LoadingStage[] = [
  { afterMs: 0, text: "Gathering recent public developments…" },
  { afterMs: 8000, text: "Ranking them by relevance to your company…" },
  { afterMs: 20000, text: "Still working. The first load can take up to a minute." },
] as const;

export const EXPLAINER_TEXT =
  "Implications are automated assessments based on public headlines and your company profile. They do not confirm any opportunity or outcome.";

export interface RelevanceLegendItem {
  readonly relevance: DevelopmentRelevance;
  readonly label: string;
  readonly description: string;
}

export const RELEVANCE_LEGEND: readonly RelevanceLegendItem[] = [
  {
    relevance: "high",
    label: "High Relevance",
    description:
      "Direct alignment with your core business offerings, products, or primary operating geography.",
  },
  {
    relevance: "medium",
    label: "Medium Relevance",
    description:
      "Broader industry or regional shifts that may influence operational or competitive planning.",
  },
  {
    relevance: "low",
    label: "Low Relevance",
    description:
      "Macro developments or peripheral sector events with indirect relationship to your profile.",
  },
] as const;

// ---------------------------------------------------------------------------
// Date & Time Formatting Utilities
// ---------------------------------------------------------------------------

export interface FormattedDate {
  relative: string;
  absolute: string;
}

/**
 * Formats published_at timestamp into relative and absolute strings.
 * Uses native Intl.RelativeTimeFormat and Intl.DateTimeFormat (no external libraries).
 * Future timestamps (clock skew) fall back to the absolute string for both fields.
 * Returns null if input is missing or invalid.
 */
export function formatPublished(iso?: string | null, now: Date = new Date()): FormattedDate | null {
  if (!iso || typeof iso !== "string") return null;
  const trimmed = iso.trim();
  if (!trimmed) return null;

  const timestamp = Date.parse(trimmed);
  if (Number.isNaN(timestamp)) return null;

  const date = new Date(timestamp);
  const absoluteFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const absolute = absoluteFormatter.format(date);

  const diffMs = now.getTime() - date.getTime();

  // Clock skew: future timestamps fall back to the absolute string only
  if (diffMs < 0) {
    return { relative: absolute, absolute };
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

  let relative: string;
  if (diffHours < 1) {
    relative = "today";
  } else if (diffHours < 24) {
    relative = rtf.format(-diffHours, "hour");
  } else if (diffDays < 30) {
    relative = rtf.format(-diffDays, "day");
  } else {
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) {
      relative = rtf.format(-diffMonths, "month");
    } else {
      relative = absolute;
    }
  }

  return { relative, absolute };
}

/**
 * Formats retrieved_at timestamp into "Updated X ago" format.
 * Returns null if input is missing or invalid.
 */
export function formatLastUpdated(
  iso?: string | null,
  now: Date = new Date(),
): FormattedDate | null {
  if (!iso || typeof iso !== "string") return null;
  const trimmed = iso.trim();
  if (!trimmed) return null;

  const timestamp = Date.parse(trimmed);
  if (Number.isNaN(timestamp)) return null;

  const date = new Date(timestamp);
  const absoluteFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const absolute = absoluteFormatter.format(date);

  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) {
    return { relative: `Updated ${absolute}`, absolute };
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let relative: string;
  if (diffMinutes < 1) {
    relative = "Updated just now";
  } else if (diffMinutes < 60) {
    relative = `Updated ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  } else if (diffHours < 24) {
    relative = `Updated ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else {
    relative = `Updated ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  return { relative, absolute };
}

/**
 * Formats closing_date timestamp into a localized short date.
 * Returns null if input is missing or invalid.
 */
export function formatClosingDate(iso?: string | null): string | null {
  if (!iso || typeof iso !== "string") return null;
  const trimmed = iso.trim();
  if (!trimmed) return null;

  const timestamp = Date.parse(trimmed);
  if (Number.isNaN(timestamp)) return null;

  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formatter.format(date);
}
