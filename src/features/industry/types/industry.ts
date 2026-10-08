/**
 * Industry & Competitors Domain Types (Industry v2)
 *
 * Implements the contract specified in STANDING BRIEF: Industry View redesign.
 * Defines both API DTO contracts and frontend ViewModels.
 */

// ---------------------------------------------------------------------------
// Shared Primitive Enums & Literals
// ---------------------------------------------------------------------------

export type CompetitorsDataStatus = "ready" | "generating" | "none";

export type OverlapLevel = "Very High" | "High" | "Moderate High" | "Moderate";

export type OverlapSource = "curated" | "ai_assessed";

export type ListingStatus = "unlisted" | "listed";

export type FinancialStatus = "available" | "unavailable";

export type AnnualStatus = "ok" | "unavailable";

export type FinancialBasis = "reported" | "rolled_up";

export type FinancialUnit = "INR_CR";

// ---------------------------------------------------------------------------
// API Contract DTOs: Competitors List
// ---------------------------------------------------------------------------

export interface AnchorCompanyDTO {
  company_name: string;
  cin: string | null;
  industry: string;
  description: string;
  listing_status: ListingStatus;
  financial_status: FinancialStatus;
  reason: string | null;
}

export interface CompetitorItemDTO {
  company_id: number;
  company_name: string;
  ticker: string;
  overlap_level: OverlapLevel;
  overlap_rank: number;
  overlap_summary: string;
  overlap_source: OverlapSource;
  has_financials: boolean;
  latest_period: string | null;
}

export interface CompetitorsResponseDTO {
  status: CompetitorsDataStatus;
  generated_at: string | null;
  anchor: AnchorCompanyDTO;
  competitors: CompetitorItemDTO[];
}

// ---------------------------------------------------------------------------
// API Contract DTOs: Competitor Financials
// ---------------------------------------------------------------------------

export interface MetricValueDTO {
  value: number | null;
  period_label: string | null;
  basis: string | null;
}

export interface KeyMetricsDTO {
  ttm_revenue: MetricValueDTO;
  latest_quarter_revenue: MetricValueDTO;
  expenditure_to_revenue_pct: MetricValueDTO;
  net_profit_margin_pct: MetricValueDTO;
}

export interface FinancialPeriodRowDTO {
  period_label: string;
  period_end: string | null;
  revenue: number | null;
  other_income: number | null;
  total_income: number | null;
  expenditure: number | null;
  interest: number | null;
  operating_profit: number | null;
  net_profit: number | null;
  opm_pct: number | null;
  npm_pct: number | null;
}

export interface AnnualFinancialRowDTO extends FinancialPeriodRowDTO {
  basis: FinancialBasis;
}

export interface FinancialMetaDTO {
  source: string;
  fiscal_year_end: number | null;
  fiscal_year_end_assumed: boolean;
  quarters_available: number;
}

export interface CompanyFinancialsResponseDTO {
  company_id: number;
  company_name?: string | null;
  ticker?: string | null;
  as_of: string | null;
  latest_period: string | null;
  unit: FinancialUnit;
  financial_status: FinancialStatus;
  reason: string | null;
  key_metrics: KeyMetricsDTO;
  quarterly: FinancialPeriodRowDTO[];
  annual: AnnualFinancialRowDTO[];
  annual_status: AnnualStatus;
  meta: FinancialMetaDTO;
}

// ---------------------------------------------------------------------------
// Frontend ViewModels
// ---------------------------------------------------------------------------

export interface CompetitorRowViewModel {
  companyId: number;
  companyName: string;
  ticker: string;
  overlapLevel: OverlapLevel;
  overlapRank: number;
  overlapSummary: string;
  overlapSource: OverlapSource;
  hasFinancials: boolean;
  latestPeriod: string | null;
  href: string;
}

export interface AnchorViewModel {
  companyName: string;
  cin: string | null;
  industry: string;
  description: string;
  listingStatus: ListingStatus;
  financialStatus: FinancialStatus;
  reason: string | null;
  reasonDisplay: string | null;
}

export interface CompetitorsListViewModel {
  status: CompetitorsDataStatus;
  generatedAt: string | null;
  isFixture: boolean;
  anchor: AnchorViewModel;
  competitors: CompetitorRowViewModel[];
}

export interface MetricCardViewModel {
  id:
    | "ttm_revenue"
    | "latest_quarter_revenue"
    | "expenditure_to_revenue_pct"
    | "net_profit_margin_pct";
  label: string;
  formattedValue: string;
  numericValue: number | null;
  periodLabel: string | null;
  basis: string | null;
  helperText?: string;
  isPercentage: boolean;
}

export interface FinancialRowConfig {
  key: keyof Omit<FinancialPeriodRowDTO, "period_label" | "period_end">;
  label: string;
  isPercentage: boolean;
  isSubdued?: boolean;
}

export interface FinancialTableRowViewModel {
  key: string;
  label: string;
  isPercentage: boolean;
  valuesByPeriod: Record<string, string>;
  rawValuesByPeriod: Record<string, number | null>;
  allNullAcrossShown: boolean;
}

export interface FinancialTableViewModel {
  periodLabels: string[]; // latest first, max 5 shown
  rows: FinancialTableRowViewModel[];
  hiddenRowNames: string[];
}

export interface CompanyFinancialsViewModel {
  companyId: number;
  companyName: string | null;
  ticker: string | null;
  overlapLevel: OverlapLevel | null;
  overlapSummary: string | null;
  isFixture: boolean;
  asOf: string | null;
  latestPeriod: string | null;
  unit: FinancialUnit;
  unitLabel: string;
  financialStatus: FinancialStatus;
  reason: string | null;
  reasonDisplay: string | null;
  keyMetrics: {
    ttmRevenue: MetricCardViewModel;
    latestQuarterRevenue: MetricCardViewModel;
    expenditureToRevenue: MetricCardViewModel;
    netProfitMargin: MetricCardViewModel;
  };
  quarterlyTable: FinancialTableViewModel;
  annualTable: FinancialTableViewModel;
  rawQuarterlyPeriods: FinancialPeriodRowDTO[];
  rawAnnualPeriods: FinancialPeriodRowDTO[];
  annualStatus: AnnualStatus;
  meta: FinancialMetaDTO;
}
