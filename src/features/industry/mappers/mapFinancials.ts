/**
 * Mapper: Company Financials DTO -> CompanyFinancialsViewModel
 *
 * Implements:
 * - Four key-metric cards
 * - Period column builder (latest first, latest 5 shown)
 * - Table row mapping with en-IN formatting and 2 dp
 * - Hidden row logic: Hides any row that is null across all shown periods and
 *   returns its name for footnote attribution.
 * - Resolution of company name, ticker, and overlap from cached competitor metadata.
 */

import type {
  CompanyFinancialsResponseDTO,
  CompanyFinancialsViewModel,
  FinancialPeriodRowDTO,
  FinancialTableViewModel,
  FinancialTableRowViewModel,
  OverlapLevel,
} from "../types/industry";
import {
  FINANCIAL_TABLE_ROW_CONFIGS,
  formatFinancialValue,
  getReasonDisplayCopy,
  FINANCIAL_UNIT_CAPTION,
  DISPLAY_COSTS_AS_POSITIVE,
} from "../presentation/industryPresentation";
import { getIndustryDataSource } from "../api/industryApi";

export interface CompetitorMetadataLookup {
  companyName?: string;
  ticker?: string;
  overlapLevel?: OverlapLevel;
  overlapSummary?: string;
}

/**
 * Builds a FinancialTableViewModel for a list of period rows (Quarterly or Annual).
 *
 * Requirements:
 * - Latest period first, latest 5 shown by default (or all if specified).
 * - Costs display as positive numbers via DISPLAY_COSTS_AS_POSITIVE.
 * - Hides any row that is null across all shown periods.
 * - Returns the names of all hidden rows for footnote attribution.
 */
export function buildFinancialTableViewModel(
  periods: FinancialPeriodRowDTO[],
  options?: { maxPeriods?: number },
): FinancialTableViewModel {
  const maxPeriods = options?.maxPeriods ?? 5;
  const shownPeriods = maxPeriods > 0 ? periods.slice(0, maxPeriods) : periods;
  const periodLabels = shownPeriods.map((p) => p.period_label);

  if (shownPeriods.length === 0) {
    return {
      periodLabels: [],
      rows: [],
      hiddenRowNames: [],
    };
  }

  const activeRows: FinancialTableRowViewModel[] = [];
  const hiddenRowNames: string[] = [];

  for (const config of FINANCIAL_TABLE_ROW_CONFIGS) {
    const rawValuesByPeriod: Record<string, number | null> = {};
    const valuesByPeriod: Record<string, string> = {};

    let allNull = true;

    for (const period of shownPeriods) {
      const label = period.period_label;
      const rawVal = period[config.key] ?? null;

      let displayRawVal = rawVal;
      if (
        DISPLAY_COSTS_AS_POSITIVE &&
        (config.key === "expenditure" || config.key === "interest") &&
        rawVal !== null
      ) {
        displayRawVal = Math.abs(rawVal);
      }

      rawValuesByPeriod[label] = displayRawVal;
      valuesByPeriod[label] = formatFinancialValue(displayRawVal, {
        isPercentage: config.isPercentage,
        digits: 2,
      });

      if (rawVal !== null) {
        allNull = false;
      }
    }

    if (allNull) {
      hiddenRowNames.push(config.label);
    } else {
      activeRows.push({
        key: config.key,
        label: config.label,
        isPercentage: config.isPercentage,
        valuesByPeriod,
        rawValuesByPeriod,
        allNullAcrossShown: false,
      });
    }
  }

  return {
    periodLabels,
    rows: activeRows,
    hiddenRowNames,
  };
}

/**
 * Maps a CompanyFinancialsResponseDTO to CompanyFinancialsViewModel.
 */
export function mapCompanyFinancials(
  dto: CompanyFinancialsResponseDTO,
  metadata?: CompetitorMetadataLookup,
  options?: { isFixture?: boolean },
): CompanyFinancialsViewModel {
  const isFixture = options?.isFixture ?? getIndustryDataSource() === "fixtures";

  const quarterlyTable = buildFinancialTableViewModel(dto.quarterly);
  const annualTable = buildFinancialTableViewModel(dto.annual);

  const ttmRaw = dto.key_metrics.ttm_revenue;
  const latestQtrRaw = dto.key_metrics.latest_quarter_revenue;
  const expToRevRaw = dto.key_metrics.expenditure_to_revenue_pct;
  const npmRaw = dto.key_metrics.net_profit_margin_pct;

  return {
    companyId: dto.company_id,
    companyName: dto.company_name ?? metadata?.companyName ?? null,
    ticker: dto.ticker ?? metadata?.ticker ?? null,
    overlapLevel: metadata?.overlapLevel ?? null,
    overlapSummary: metadata?.overlapSummary ?? null,
    isFixture,
    asOf: dto.as_of,
    latestPeriod: dto.latest_period,
    unit: dto.unit,
    unitLabel: FINANCIAL_UNIT_CAPTION,
    financialStatus: dto.financial_status,
    reason: dto.reason,
    reasonDisplay: getReasonDisplayCopy(dto.reason),
    keyMetrics: {
      ttmRevenue: {
        id: "ttm_revenue",
        label: "TTM Revenue",
        formattedValue: formatFinancialValue(ttmRaw.value, { digits: 2 }),
        numericValue: ttmRaw.value,
        periodLabel: ttmRaw.period_label,
        basis: ttmRaw.basis,
        helperText: "Sum of latest 4 consecutive quarters in ₹ Cr.",
        isPercentage: false,
      },
      latestQuarterRevenue: {
        id: "latest_quarter_revenue",
        label: "Latest Quarter Revenue",
        formattedValue: formatFinancialValue(latestQtrRaw.value, { digits: 2 }),
        numericValue: latestQtrRaw.value,
        periodLabel: latestQtrRaw.period_label,
        basis: latestQtrRaw.basis,
        helperText: latestQtrRaw.period_label
          ? `Reported for ${latestQtrRaw.period_label}`
          : undefined,
        isPercentage: false,
      },
      expenditureToRevenue: {
        id: "expenditure_to_revenue_pct",
        label: "Expenditure / Revenue",
        formattedValue: formatFinancialValue(expToRevRaw.value, { isPercentage: true, digits: 2 }),
        numericValue: expToRevRaw.value,
        periodLabel: expToRevRaw.period_label,
        basis: expToRevRaw.basis,
        helperText: "Operating efficiency ratio",
        isPercentage: true,
      },
      netProfitMargin: {
        id: "net_profit_margin_pct",
        label: "Net Profit Margin",
        formattedValue: formatFinancialValue(npmRaw.value, { isPercentage: true, digits: 2 }),
        numericValue: npmRaw.value,
        periodLabel: npmRaw.period_label,
        basis: npmRaw.basis,
        helperText: "Net profit as % of revenue",
        isPercentage: true,
      },
    },
    quarterlyTable,
    annualTable,
    rawQuarterlyPeriods: dto.quarterly,
    rawAnnualPeriods: dto.annual,
    annualStatus: dto.annual_status,
    meta: dto.meta,
  };
}
