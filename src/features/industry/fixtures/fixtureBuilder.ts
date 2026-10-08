/**
 * Fixture Data Builder
 *
 * Reconciles derived financial values:
 * - total_income = revenue + other_income
 * - opm_pct = ((operating_profit ?? (revenue - expenditure)) / revenue) * 100
 * - npm_pct = (net_profit / revenue) * 100
 * - ttm_revenue = sum of revenue across 4 strictly consecutive quarters
 */

import type {
  FinancialPeriodRowDTO,
  AnnualFinancialRowDTO,
  FinancialBasis,
  KeyMetricsDTO,
} from "../types/industry";

export interface PeriodRowInput {
  period_label: string;
  period_end: string | null;
  revenue: number | null;
  other_income?: number | null;
  expenditure?: number | null;
  interest?: number | null;
  operating_profit?: number | null;
  net_profit?: number | null;
}

export interface AnnualRowInput extends PeriodRowInput {
  basis: FinancialBasis;
}

/**
 * Builds a single quarterly or period row ensuring mathematical consistency.
 */
export function buildFinancialPeriodRow(input: PeriodRowInput): FinancialPeriodRowDTO {
  const {
    period_label,
    period_end,
    revenue,
    other_income = null,
    expenditure = null,
    interest = null,
    operating_profit: explicitOpProfit = null,
    net_profit = null,
  } = input;

  let total_income: number | null = null;
  if (revenue !== null) {
    total_income = other_income !== null ? Number((revenue + other_income).toFixed(2)) : revenue;
  }

  // Operating profit: use explicit if provided, else compute from revenue - expenditure
  let operating_profit = explicitOpProfit;
  if (operating_profit === null && revenue !== null && expenditure !== null) {
    operating_profit = Number((revenue - expenditure).toFixed(2));
  }

  // OPM%: (operating_profit / revenue) * 100
  let opm_pct: number | null = null;
  if (revenue !== null && revenue !== 0 && operating_profit !== null) {
    opm_pct = Number(((operating_profit / revenue) * 100).toFixed(2));
  }

  // NPM%: (net_profit / revenue) * 100
  let npm_pct: number | null = null;
  if (revenue !== null && revenue !== 0 && net_profit !== null) {
    npm_pct = Number(((net_profit / revenue) * 100).toFixed(2));
  }

  return {
    period_label,
    period_end,
    revenue,
    other_income,
    total_income,
    expenditure,
    interest,
    operating_profit,
    net_profit,
    opm_pct,
    npm_pct,
  };
}

/**
 * Builds an annual financial row with basis attribution.
 */
export function buildAnnualFinancialRow(input: AnnualRowInput): AnnualFinancialRowDTO {
  const baseRow = buildFinancialPeriodRow(input);
  return {
    ...baseRow,
    basis: input.basis,
  };
}

/**
 * Computes KeyMetrics from quarterly rows.
 *
 * Rules:
 * - Quarters are expected latest-first.
 * - hasGap: If there is a missing quarter among the latest 4, TTM and annual margin are null.
 */
export function buildKeyMetricsFromQuarters(
  quartersLatestFirst: FinancialPeriodRowDTO[],
  options: { hasGap?: boolean; latestPeriodLabel?: string } = {},
): KeyMetricsDTO {
  if (quartersLatestFirst.length === 0) {
    return {
      ttm_revenue: { value: null, period_label: null, basis: null },
      latest_quarter_revenue: { value: null, period_label: null, basis: null },
      expenditure_to_revenue_pct: { value: null, period_label: null, basis: null },
      net_profit_margin_pct: { value: null, period_label: null, basis: null },
    };
  }

  const latestQtr = quartersLatestFirst[0];
  const { hasGap = false, latestPeriodLabel = latestQtr.period_label } = options;

  // Latest Quarter Revenue
  const latest_quarter_revenue = {
    value: latestQtr.revenue,
    period_label: latestPeriodLabel,
    basis: "reported",
  };

  // Expenditure to Revenue % (Latest Quarter)
  let expToRevVal: number | null = null;
  if (latestQtr.revenue !== null && latestQtr.revenue !== 0 && latestQtr.expenditure !== null) {
    expToRevVal = Number(((latestQtr.expenditure / latestQtr.revenue) * 100).toFixed(2));
  }
  const expenditure_to_revenue_pct = {
    value: expToRevVal,
    period_label: latestPeriodLabel,
    basis: "latest_quarter",
  };

  // If there's a chronological gap in the latest 4 quarters or fewer than 4 quarters exist:
  if (hasGap || quartersLatestFirst.length < 4) {
    return {
      ttm_revenue: { value: null, period_label: null, basis: null },
      latest_quarter_revenue,
      expenditure_to_revenue_pct,
      net_profit_margin_pct: { value: null, period_label: null, basis: null },
    };
  }

  // Strictly 4 consecutive quarters for TTM
  const last4 = quartersLatestFirst.slice(0, 4);
  const ttmRevSum = last4.reduce((sum, q) => sum + (q.revenue ?? 0), 0);
  const ttmNetProfitSum = last4.reduce((sum, q) => sum + (q.net_profit ?? 0), 0);

  const ttm_revenue = {
    value: Number(ttmRevSum.toFixed(2)),
    period_label: "TTM",
    basis: "rolled_up_4q",
  };

  let ttmNpmVal: number | null = null;
  if (ttmRevSum > 0) {
    ttmNpmVal = Number(((ttmNetProfitSum / ttmRevSum) * 100).toFixed(2));
  }

  const net_profit_margin_pct = {
    value: ttmNpmVal,
    period_label: "TTM",
    basis: "rolled_up_4q",
  };

  return {
    ttm_revenue,
    latest_quarter_revenue,
    expenditure_to_revenue_pct,
    net_profit_margin_pct,
  };
}
