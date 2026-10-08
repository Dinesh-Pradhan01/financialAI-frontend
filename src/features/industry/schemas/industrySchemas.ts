/**
 * Runtime Zod Schemas for Industry Contracts
 *
 * Enforces contract integrity at runtime.
 * When in "api" mode, malformed or legacy responses fail validation
 * and produce a typed unexpected response error.
 */

import { z } from "zod";

export const OverlapLevelSchema = z.enum(["Very High", "High", "Moderate High", "Moderate"]);

export const OverlapSourceSchema = z.enum(["curated", "ai_assessed"]);

export const ListingStatusSchema = z.enum(["unlisted", "listed"]);

export const FinancialStatusSchema = z.enum(["available", "unavailable"]);

export const AnnualStatusSchema = z.enum(["ok", "unavailable"]);

export const FinancialBasisSchema = z.enum(["reported", "rolled_up"]);

export const FinancialUnitSchema = z.literal("INR_CR");

export const CompetitorsDataStatusSchema = z.enum(["ready", "generating", "none"]);

// ---------------------------------------------------------------------------
// Competitors List Schema
// ---------------------------------------------------------------------------

export const AnchorCompanySchema = z.object({
  company_name: z.string().min(1),
  cin: z.string().nullable(),
  industry: z.string(),
  description: z.string(),
  listing_status: ListingStatusSchema,
  financial_status: FinancialStatusSchema,
  reason: z.string().nullable(),
});

export const CompetitorItemSchema = z.object({
  company_id: z.number().int(),
  company_name: z.string().min(1),
  ticker: z.string().min(1),
  overlap_level: OverlapLevelSchema,
  overlap_rank: z.number().int(),
  overlap_summary: z.string(),
  overlap_source: OverlapSourceSchema,
  has_financials: z.boolean(),
  latest_period: z.string().nullable(),
});

export const CompetitorsResponseSchema = z.object({
  status: CompetitorsDataStatusSchema,
  generated_at: z.string().nullable(),
  anchor: AnchorCompanySchema,
  competitors: z.array(CompetitorItemSchema),
});

// ---------------------------------------------------------------------------
// Company Financials Schema
// ---------------------------------------------------------------------------

export const MetricValueSchema = z.object({
  value: z.number().nullable(),
  period_label: z.string().nullable(),
  basis: z.string().nullable(),
});

export const KeyMetricsSchema = z.object({
  ttm_revenue: MetricValueSchema,
  latest_quarter_revenue: MetricValueSchema,
  expenditure_to_revenue_pct: MetricValueSchema,
  net_profit_margin_pct: MetricValueSchema,
});

export const FinancialPeriodRowSchema = z.object({
  period_label: z.string(),
  period_end: z.string().nullable(),
  revenue: z.number().nullable(),
  other_income: z.number().nullable(),
  total_income: z.number().nullable(),
  expenditure: z.number().nullable(),
  interest: z.number().nullable(),
  operating_profit: z.number().nullable(),
  net_profit: z.number().nullable(),
  opm_pct: z.number().nullable(),
  npm_pct: z.number().nullable(),
});

export const AnnualFinancialRowSchema = FinancialPeriodRowSchema.extend({
  basis: FinancialBasisSchema,
});

export const FinancialMetaSchema = z.object({
  source: z.string(),
  fiscal_year_end: z.number().nullable(),
  fiscal_year_end_assumed: z.boolean(),
  quarters_available: z.number().int(),
});

export const CompanyFinancialsResponseSchema = z.object({
  company_id: z.number().int(),
  company_name: z.string().nullable().optional(),
  ticker: z.string().nullable().optional(),
  as_of: z.string().nullable(),
  latest_period: z.string().nullable(),
  unit: FinancialUnitSchema,
  financial_status: FinancialStatusSchema,
  reason: z.string().nullable(),
  key_metrics: KeyMetricsSchema,
  quarterly: z.array(FinancialPeriodRowSchema),
  annual: z.array(AnnualFinancialRowSchema),
  annual_status: AnnualStatusSchema,
  meta: FinancialMetaSchema,
});
