/**
 * Typed Contract-Shaped Fixtures for Industry v2
 *
 * Anchor: VL ACCESS INDIA PRIVATE LIMITED (unlisted)
 * Competitors:
 * 1. Aditya Infotech (2213, CPPLUS) - Very High; 5Q to Mar 2026; 1 rolled_up FY26; other_income & interest null.
 * 2. Allied Digital (900001, ADSL) - Very High; has_financials: false; unavailable (no_financials_loaded).
 * 3. Black Box (2276, BBOX) - High; 5Q WITH GAP; TTM & net-margin null; annual unavailable.
 * 4. D-Link India (1779, DLINKINDIA) - Moderate High; 13Q to Jun 2026; reported annual FY24-FY26; other_income present, interest null.
 * 5. Rashi Peripherals (1776, RPTECH) - Moderate; 13Q to Jun 2026; rolled_up annual; other_income & interest null.
 *
 * Source: "Demo data (fixture)"
 */

import type { CompetitorsResponseDTO, CompanyFinancialsResponseDTO } from "../types/industry";
import {
  buildFinancialPeriodRow,
  buildAnnualFinancialRow,
  buildKeyMetricsFromQuarters,
} from "./fixtureBuilder";

export const FIXTURE_SOURCE_LABEL = "Demo data (fixture)";

// ---------------------------------------------------------------------------
// 1. Competitors List Fixture
// ---------------------------------------------------------------------------

export const FIXTURE_COMPETITORS_RESPONSE: CompetitorsResponseDTO = {
  status: "ready",
  generated_at: "2026-10-07T00:00:00Z",
  anchor: {
    company_name: "VL ACCESS INDIA PRIVATE LIMITED",
    cin: "U52392OR2007PTC009194",
    industry: "Trading",
    description:
      "Hardware wholesaler and system integrator providing CCTV cameras, biometric devices, PA systems, and network switches.",
    listing_status: "unlisted",
    financial_status: "unavailable",
    reason: "unlisted_private_company",
  },
  competitors: [
    {
      company_id: 2213,
      company_name: "Aditya Infotech",
      ticker: "CPPLUS",
      overlap_level: "Very High",
      overlap_rank: 1,
      overlap_summary:
        "Direct competitor in CCTV, security surveillance hardware distribution, and enterprise camera integrations.",
      overlap_source: "curated",
      has_financials: true,
      latest_period: "Q4 FY26",
    },

    {
      company_id: 2276,
      company_name: "Black Box",
      ticker: "BBOX",
      overlap_level: "High",
      overlap_rank: 3,
      overlap_summary:
        "Enterprise networking, structured cabling systems, and smart communications hardware deployment.",
      overlap_source: "curated",
      has_financials: true,
      latest_period: "Q4 FY26",
    },
    {
      company_id: 1779,
      company_name: "D-Link India",
      ticker: "DLINKINDIA",
      overlap_level: "Moderate High",
      overlap_rank: 4,
      overlap_summary:
        "Networking products manufacturer and distributor of routers, switches, and commercial wireless systems.",
      overlap_source: "curated",
      has_financials: true,
      latest_period: "Q1 FY27",
    },
    {
      company_id: 1776,
      company_name: "Rashi Peripherals",
      ticker: "RPTECH",
      overlap_level: "Moderate",
      overlap_rank: 5,
      overlap_summary:
        "National distributor for ICT brands, networking components, and surveillance storage devices.",
      overlap_source: "curated",
      has_financials: true,
      latest_period: "Q1 FY27",
    },
  ],
};

// ---------------------------------------------------------------------------
// 2. Individual Competitor Financials Fixtures
// ---------------------------------------------------------------------------

// --- (1) Aditya Infotech (2213): 5 quarters to Mar 2026, 1 rolled-up FY26, other_income & interest null ---
const adityaQuarters = [
  buildFinancialPeriodRow({
    period_label: "Q4 FY26",
    period_end: "2026-03-31",
    revenue: 1422.0,
    expenditure: 1165.0,
    operating_profit: 257.0,
    net_profit: 169.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY26",
    period_end: "2025-12-31",
    revenue: 1350.0,
    expenditure: 1110.0,
    operating_profit: 240.0,
    net_profit: 155.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q2 FY26",
    period_end: "2025-09-30",
    revenue: 1280.0,
    expenditure: 1060.0,
    operating_profit: 220.0,
    net_profit: 140.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q1 FY26",
    period_end: "2025-06-30",
    revenue: 1210.0,
    expenditure: 1015.0,
    operating_profit: 195.0,
    net_profit: 125.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q4 FY25",
    period_end: "2025-03-31",
    revenue: 977.0,
    expenditure: 879.0,
    operating_profit: 98.0,
    net_profit: 55.0,
  }),
];

// FY26 sum: 1422 + 1350 + 1280 + 1210 = 5262.0; exp: 1165 + 1110 + 1060 + 1015 = 4350.0; np: 169 + 155 + 140 + 125 = 589.0
const adityaAnnual = [
  buildAnnualFinancialRow({
    period_label: "FY26",
    period_end: "2026-03-31",
    revenue: 5262.0,
    expenditure: 4350.0,
    operating_profit: 912.0,
    net_profit: 589.0,
    basis: "rolled_up",
  }),
];

export const FIXTURE_FINANCIALS_ADITYA: CompanyFinancialsResponseDTO = {
  company_id: 2213,
  as_of: "2026-03-31",
  latest_period: "Q4 FY26",
  unit: "INR_CR",
  financial_status: "available",
  reason: null,
  key_metrics: buildKeyMetricsFromQuarters(adityaQuarters, { latestPeriodLabel: "Q4 FY26" }),
  quarterly: adityaQuarters,
  annual: adityaAnnual,
  annual_status: "ok",
  meta: {
    source: FIXTURE_SOURCE_LABEL,
    fiscal_year_end: 3,
    fiscal_year_end_assumed: false,
    quarters_available: 5,
  },
};

// --- (2) Allied Digital (900001): fixture-only, unavailable ---
export const FIXTURE_FINANCIALS_ALLIED: CompanyFinancialsResponseDTO = {
  company_id: 900001,
  as_of: null,
  latest_period: null,
  unit: "INR_CR",
  financial_status: "unavailable",
  reason: "no_financials_loaded",
  key_metrics: {
    ttm_revenue: { value: null, period_label: null, basis: null },
    latest_quarter_revenue: { value: null, period_label: null, basis: null },
    expenditure_to_revenue_pct: { value: null, period_label: null, basis: null },
    net_profit_margin_pct: { value: null, period_label: null, basis: null },
  },
  quarterly: [],
  annual: [],
  annual_status: "unavailable",
  meta: {
    source: FIXTURE_SOURCE_LABEL,
    fiscal_year_end: null,
    fiscal_year_end_assumed: true,
    quarters_available: 0,
  },
};

// --- (3) Black Box (2276): 5 quarters WITH GAP (Q4 FY26, Q3 FY26, Q1 FY26, Q4 FY25, Q3 FY25; Q2 FY26 missing) ---
const blackBoxQuartersWithGap = [
  buildFinancialPeriodRow({
    period_label: "Q4 FY26",
    period_end: "2026-03-31",
    revenue: 410.0,
    expenditure: 375.0,
    operating_profit: 35.0,
    net_profit: 22.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY26",
    period_end: "2025-12-31",
    revenue: 395.0,
    expenditure: 362.0,
    operating_profit: 33.0,
    net_profit: 20.0,
  }),
  // GAP: Q2 FY26 (Sep 2025) is deliberately missing
  buildFinancialPeriodRow({
    period_label: "Q1 FY26",
    period_end: "2025-06-30",
    revenue: 380.0,
    expenditure: 350.0,
    operating_profit: 30.0,
    net_profit: 18.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q4 FY25",
    period_end: "2025-03-31",
    revenue: 370.0,
    expenditure: 342.0,
    operating_profit: 28.0,
    net_profit: 16.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY25",
    period_end: "2024-12-31",
    revenue: 360.0,
    expenditure: 335.0,
    operating_profit: 25.0,
    net_profit: 15.0,
  }),
];

export const FIXTURE_FINANCIALS_BLACK_BOX: CompanyFinancialsResponseDTO = {
  company_id: 2276,
  as_of: "2026-03-31",
  latest_period: "Q4 FY26",
  unit: "INR_CR",
  financial_status: "available",
  reason: "gap_in_quarters",
  key_metrics: buildKeyMetricsFromQuarters(blackBoxQuartersWithGap, {
    hasGap: true,
    latestPeriodLabel: "Q4 FY26",
  }),
  quarterly: blackBoxQuartersWithGap,
  annual: [],
  annual_status: "unavailable",
  meta: {
    source: FIXTURE_SOURCE_LABEL,
    fiscal_year_end: 3,
    fiscal_year_end_assumed: true,
    quarters_available: 5,
  },
};

// --- (4) D-Link India (1779): 13 quarters to Jun 2026, reported annual FY24-FY26, other_income present, interest null ---
const dlinkQuarters = [
  buildFinancialPeriodRow({
    period_label: "Q1 FY27",
    period_end: "2026-06-30",
    revenue: 457.0,
    other_income: 5.0,
    expenditure: 422.0,
    operating_profit: 36.56,
    net_profit: 28.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q4 FY26",
    period_end: "2026-03-31",
    revenue: 440.0,
    other_income: 4.0,
    expenditure: 405.0,
    operating_profit: 35.0,
    net_profit: 27.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY26",
    period_end: "2025-12-31",
    revenue: 425.0,
    other_income: 4.0,
    expenditure: 392.0,
    operating_profit: 33.0,
    net_profit: 25.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q2 FY26",
    period_end: "2025-09-30",
    revenue: 410.0,
    other_income: 3.0,
    expenditure: 380.0,
    operating_profit: 30.0,
    net_profit: 23.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q1 FY26",
    period_end: "2025-06-30",
    revenue: 395.0,
    other_income: 3.0,
    expenditure: 368.0,
    operating_profit: 27.0,
    net_profit: 21.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q4 FY25",
    period_end: "2025-03-31",
    revenue: 380.0,
    other_income: 3.0,
    expenditure: 352.0,
    operating_profit: 28.0,
    net_profit: 20.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY25",
    period_end: "2024-12-31",
    revenue: 365.0,
    other_income: 2.0,
    expenditure: 338.0,
    operating_profit: 27.0,
    net_profit: 19.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q2 FY25",
    period_end: "2024-09-30",
    revenue: 350.0,
    other_income: 2.0,
    expenditure: 325.0,
    operating_profit: 25.0,
    net_profit: 18.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q1 FY25",
    period_end: "2024-06-30",
    revenue: 340.0,
    other_income: 2.0,
    expenditure: 315.0,
    operating_profit: 25.0,
    net_profit: 17.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q4 FY24",
    period_end: "2024-03-31",
    revenue: 330.0,
    other_income: 2.0,
    expenditure: 305.0,
    operating_profit: 25.0,
    net_profit: 16.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY24",
    period_end: "2023-12-31",
    revenue: 320.0,
    other_income: 2.0,
    expenditure: 295.0,
    operating_profit: 25.0,
    net_profit: 15.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q2 FY24",
    period_end: "2023-09-30",
    revenue: 310.0,
    other_income: 2.0,
    expenditure: 285.0,
    operating_profit: 25.0,
    net_profit: 14.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q1 FY24",
    period_end: "2023-06-30",
    revenue: 300.0,
    other_income: 3.0,
    expenditure: 273.0,
    operating_profit: 27.0,
    net_profit: 21.0,
  }),
];

const dlinkAnnual = [
  buildAnnualFinancialRow({
    period_label: "FY26",
    period_end: "2026-03-31",
    revenue: 1670.0,
    other_income: 14.0,
    expenditure: 1545.0,
    operating_profit: 125.0,
    net_profit: 96.0,
    basis: "reported",
  }),
  buildAnnualFinancialRow({
    period_label: "FY25",
    period_end: "2025-03-31",
    revenue: 1435.0,
    other_income: 9.0,
    expenditure: 1330.0,
    operating_profit: 105.0,
    net_profit: 74.0,
    basis: "reported",
  }),
  buildAnnualFinancialRow({
    period_label: "FY24",
    period_end: "2024-03-31",
    revenue: 1260.0,
    other_income: 9.0,
    expenditure: 1158.0,
    operating_profit: 102.0,
    net_profit: 66.0,
    basis: "reported",
  }),
];

export const FIXTURE_FINANCIALS_DLINK: CompanyFinancialsResponseDTO = {
  company_id: 1779,
  as_of: "2026-06-30",
  latest_period: "Q1 FY27",
  unit: "INR_CR",
  financial_status: "available",
  reason: null,
  key_metrics: buildKeyMetricsFromQuarters(dlinkQuarters, { latestPeriodLabel: "Q1 FY27" }),
  quarterly: dlinkQuarters,
  annual: dlinkAnnual,
  annual_status: "ok",
  meta: {
    source: FIXTURE_SOURCE_LABEL,
    fiscal_year_end: 3,
    fiscal_year_end_assumed: false,
    quarters_available: 13,
  },
};

// --- (5) Rashi Peripherals (1776): 13 quarters to Jun 2026, rolled_up annual, other_income & interest null ---
const rashiQuarters = [
  buildFinancialPeriodRow({
    period_label: "Q1 FY27",
    period_end: "2026-06-30",
    revenue: 5102.0,
    expenditure: 4947.0,
    operating_profit: 155.0,
    net_profit: 105.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q4 FY26",
    period_end: "2026-03-31",
    revenue: 4850.0,
    expenditure: 4705.0,
    operating_profit: 145.0,
    net_profit: 98.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY26",
    period_end: "2025-12-31",
    revenue: 4620.0,
    expenditure: 4480.0,
    operating_profit: 140.0,
    net_profit: 92.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q2 FY26",
    period_end: "2025-09-30",
    revenue: 4400.0,
    expenditure: 4270.0,
    operating_profit: 130.0,
    net_profit: 85.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q1 FY26",
    period_end: "2025-06-30",
    revenue: 4180.0,
    expenditure: 4055.0,
    operating_profit: 125.0,
    net_profit: 80.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q4 FY25",
    period_end: "2025-03-31",
    revenue: 3950.0,
    expenditure: 3835.0,
    operating_profit: 115.0,
    net_profit: 74.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY25",
    period_end: "2024-12-31",
    revenue: 3750.0,
    expenditure: 3640.0,
    operating_profit: 110.0,
    net_profit: 70.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q2 FY25",
    period_end: "2024-09-30",
    revenue: 3550.0,
    expenditure: 3445.0,
    operating_profit: 105.0,
    net_profit: 65.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q1 FY25",
    period_end: "2024-06-30",
    revenue: 3350.0,
    expenditure: 3250.0,
    operating_profit: 100.0,
    net_profit: 60.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q4 FY24",
    period_end: "2024-03-31",
    revenue: 3100.0,
    expenditure: 3005.0,
    operating_profit: 95.0,
    net_profit: 55.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q3 FY24",
    period_end: "2023-12-31",
    revenue: 2900.0,
    expenditure: 2810.0,
    operating_profit: 90.0,
    net_profit: 52.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q2 FY24",
    period_end: "2023-09-30",
    revenue: 2700.0,
    expenditure: 2615.0,
    operating_profit: 85.0,
    net_profit: 48.0,
  }),
  buildFinancialPeriodRow({
    period_label: "Q1 FY24",
    period_end: "2023-06-30",
    revenue: 2446.0,
    expenditure: 2354.0,
    operating_profit: 92.0,
    net_profit: 50.0,
  }),
];

const rashiAnnual = [
  // FY26 sum: 4850 + 4620 + 4400 + 4180 = 18050.0; exp: 17510.0; op: 540.0; np: 355.0
  buildAnnualFinancialRow({
    period_label: "FY26",
    period_end: "2026-03-31",
    revenue: 18050.0,
    expenditure: 17510.0,
    operating_profit: 540.0,
    net_profit: 355.0,
    basis: "rolled_up",
  }),
  // FY25 sum: 3950 + 3750 + 3550 + 3350 = 14600.0; exp: 14170.0; op: 430.0; np: 269.0
  buildAnnualFinancialRow({
    period_label: "FY25",
    period_end: "2025-03-31",
    revenue: 14600.0,
    expenditure: 14170.0,
    operating_profit: 430.0,
    net_profit: 269.0,
    basis: "rolled_up",
  }),
  // FY24 sum: 3100 + 2900 + 2700 + 2446 = 11146.0; exp: 10784.0; op: 362.0; np: 205.0
  buildAnnualFinancialRow({
    period_label: "FY24",
    period_end: "2024-03-31",
    revenue: 11146.0,
    expenditure: 10784.0,
    operating_profit: 362.0,
    net_profit: 205.0,
    basis: "rolled_up",
  }),
];

export const FIXTURE_FINANCIALS_RASHI: CompanyFinancialsResponseDTO = {
  company_id: 1776,
  as_of: "2026-06-30",
  latest_period: "Q1 FY27",
  unit: "INR_CR",
  financial_status: "available",
  reason: null,
  key_metrics: buildKeyMetricsFromQuarters(rashiQuarters, { latestPeriodLabel: "Q1 FY27" }),
  quarterly: rashiQuarters,
  annual: rashiAnnual,
  annual_status: "ok",
  meta: {
    source: FIXTURE_SOURCE_LABEL,
    fiscal_year_end: 3,
    fiscal_year_end_assumed: false,
    quarters_available: 13,
  },
};

// ---------------------------------------------------------------------------
// 3. Lookup Map
// ---------------------------------------------------------------------------

export const FIXTURE_FINANCIALS_BY_COMPANY_ID: Record<number, CompanyFinancialsResponseDTO> = {
  2213: FIXTURE_FINANCIALS_ADITYA,
  900001: FIXTURE_FINANCIALS_ALLIED,
  2276: FIXTURE_FINANCIALS_BLACK_BOX,
  1779: FIXTURE_FINANCIALS_DLINK,
  1776: FIXTURE_FINANCIALS_RASHI,
};

/**
 * Returns fixture financials for a company, or a safe unavailable fallback if unknown.
 */
export function getFixtureCompanyFinancials(companyId: number): CompanyFinancialsResponseDTO {
  if (FIXTURE_FINANCIALS_BY_COMPANY_ID[companyId]) {
    return FIXTURE_FINANCIALS_BY_COMPANY_ID[companyId];
  }

  return {
    company_id: companyId,
    as_of: null,
    latest_period: null,
    unit: "INR_CR",
    financial_status: "unavailable",
    reason: "no_financials_loaded",
    key_metrics: {
      ttm_revenue: { value: null, period_label: null, basis: null },
      latest_quarter_revenue: { value: null, period_label: null, basis: null },
      expenditure_to_revenue_pct: { value: null, period_label: null, basis: null },
      net_profit_margin_pct: { value: null, period_label: null, basis: null },
    },
    quarterly: [],
    annual: [],
    annual_status: "unavailable",
    meta: {
      source: FIXTURE_SOURCE_LABEL,
      fiscal_year_end: null,
      fiscal_year_end_assumed: true,
      quarters_available: 0,
    },
  };
}
