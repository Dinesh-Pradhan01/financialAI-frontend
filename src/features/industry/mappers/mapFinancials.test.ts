import { describe, it, expect } from "vitest";
import { buildFinancialTableViewModel, mapCompanyFinancials } from "./mapFinancials";
import type { FinancialPeriodRowDTO, CompanyFinancialsResponseDTO } from "../types/industry";
import { EM_DASH } from "../presentation/industryPresentation";

describe("mapFinancials", () => {
  describe("buildFinancialTableViewModel & hidden-row logic", () => {
    it("returns empty table model when no periods provided", () => {
      const result = buildFinancialTableViewModel([]);
      expect(result.periodLabels).toEqual([]);
      expect(result.rows).toEqual([]);
      expect(result.hiddenRowNames).toEqual([]);
    });

    it("takes maximum 5 latest periods", () => {
      const periods: FinancialPeriodRowDTO[] = Array.from({ length: 8 }, (_, i) => ({
        period_label: `Q${i + 1} FY26`,
        period_end: `2026-0${i + 1}-30`,
        revenue: 100 + i * 10,
        other_income: null,
        total_income: 100 + i * 10,
        expenditure: 80 + i * 5,
        interest: null,
        operating_profit: 20 + i * 5,
        net_profit: 10 + i * 2,
        opm_pct: 20.0,
        npm_pct: 10.0,
      }));

      const result = buildFinancialTableViewModel(periods);
      expect(result.periodLabels).toHaveLength(5);
      expect(result.periodLabels).toEqual(["Q1 FY26", "Q2 FY26", "Q3 FY26", "Q4 FY26", "Q5 FY26"]);
    });

    it("hides rows that are entirely null across all 5 shown periods and returns their names", () => {
      const periods: FinancialPeriodRowDTO[] = [
        {
          period_label: "Q4 FY26",
          period_end: "2026-03-31",
          revenue: 1422.0,
          other_income: null, // all null
          total_income: 1422.0,
          expenditure: 1165.0,
          interest: null, // all null
          operating_profit: 257.0,
          net_profit: 169.0,
          opm_pct: 18.07,
          npm_pct: 11.88,
        },
        {
          period_label: "Q3 FY26",
          period_end: "2025-12-31",
          revenue: 1350.0,
          other_income: null, // all null
          total_income: 1350.0,
          expenditure: 1110.0,
          interest: null, // all null
          operating_profit: 240.0,
          net_profit: 155.0,
          opm_pct: 17.78,
          npm_pct: 11.48,
        },
      ];

      const result = buildFinancialTableViewModel(periods);

      expect(result.hiddenRowNames).toContain("Other Income");
      expect(result.hiddenRowNames).toContain("Interest");

      const rowKeys = result.rows.map((r) => r.key);
      expect(rowKeys).not.toContain("other_income");
      expect(rowKeys).not.toContain("interest");
      expect(rowKeys).toContain("revenue");
      expect(rowKeys).toContain("expenditure");
      expect(rowKeys).toContain("opm_pct");
      expect(rowKeys).toContain("npm_pct");
    });

    it("preserves a row if at least one shown period has a non-null value", () => {
      const periods: FinancialPeriodRowDTO[] = [
        {
          period_label: "Q4 FY26",
          period_end: "2026-03-31",
          revenue: 100.0,
          other_income: null,
          total_income: 100.0,
          expenditure: 80.0,
          interest: 5.0, // non-null in period 1
          operating_profit: 20.0,
          net_profit: 15.0,
          opm_pct: 20.0,
          npm_pct: 15.0,
        },
        {
          period_label: "Q3 FY26",
          period_end: "2025-12-31",
          revenue: 90.0,
          other_income: null, // null in period 2
          total_income: 90.0,
          expenditure: 75.0,
          interest: null, // null in period 2
          operating_profit: 15.0,
          net_profit: 10.0,
          opm_pct: 16.67,
          npm_pct: 11.11,
        },
      ];

      const result = buildFinancialTableViewModel(periods);

      expect(result.hiddenRowNames).toContain("Other Income");
      expect(result.hiddenRowNames).not.toContain("Interest");

      const interestRow = result.rows.find((r) => r.key === "interest");
      expect(interestRow).toBeDefined();
      expect(interestRow?.valuesByPeriod["Q4 FY26"]).toBe("5.00");
      expect(interestRow?.valuesByPeriod["Q3 FY26"]).toBe(EM_DASH);
    });
  });

  describe("mapCompanyFinancials", () => {
    it("maps key metrics cards and resolves cached competitor metadata", () => {
      const mockDTO: CompanyFinancialsResponseDTO = {
        company_id: 1779,
        as_of: "2026-06-30",
        latest_period: "Q1 FY27",
        unit: "INR_CR",
        financial_status: "available",
        reason: null,
        key_metrics: {
          ttm_revenue: { value: 1672.0, period_label: "TTM", basis: "rolled_up_4q" },
          latest_quarter_revenue: { value: 457.0, period_label: "Q1 FY27", basis: "reported" },
          expenditure_to_revenue_pct: {
            value: 92.34,
            period_label: "Q1 FY27",
            basis: "latest_quarter",
          },
          net_profit_margin_pct: { value: 6.4, period_label: "TTM", basis: "rolled_up_4q" },
        },
        quarterly: [],
        annual: [],
        annual_status: "ok",
        meta: {
          source: "Demo data (fixture)",
          fiscal_year_end: 3,
          fiscal_year_end_assumed: false,
          quarters_available: 13,
        },
      };

      const viewModel = mapCompanyFinancials(mockDTO, {
        companyName: "D-Link India",
        ticker: "DLINKINDIA",
        overlapLevel: "Moderate High",
        overlapSummary: "Networking hardware manufacturer",
      });

      expect(viewModel.companyId).toBe(1779);
      expect(viewModel.companyName).toBe("D-Link India");
      expect(viewModel.ticker).toBe("DLINKINDIA");
      expect(viewModel.overlapLevel).toBe("Moderate High");
      expect(viewModel.overlapSummary).toBe("Networking hardware manufacturer");

      // Key metrics
      expect(viewModel.keyMetrics.ttmRevenue.formattedValue).toBe("1,672.00");
      expect(viewModel.keyMetrics.ttmRevenue.periodLabel).toBe("TTM");
      expect(viewModel.keyMetrics.latestQuarterRevenue.formattedValue).toBe("457.00");
      expect(viewModel.keyMetrics.expenditureToRevenue.formattedValue).toBe("92.34%");
      expect(viewModel.keyMetrics.netProfitMargin.formattedValue).toBe("6.40%");
    });

    it("renders em dash for null metric values", () => {
      const mockDTO: CompanyFinancialsResponseDTO = {
        company_id: 2276,
        as_of: "2026-03-31",
        latest_period: "Q4 FY26",
        unit: "INR_CR",
        financial_status: "available",
        reason: "gap_in_quarters",
        key_metrics: {
          ttm_revenue: { value: null, period_label: null, basis: null },
          latest_quarter_revenue: { value: 410.0, period_label: "Q4 FY26", basis: "reported" },
          expenditure_to_revenue_pct: {
            value: 91.46,
            period_label: "Q4 FY26",
            basis: "latest_quarter",
          },
          net_profit_margin_pct: { value: null, period_label: null, basis: null },
        },
        quarterly: [],
        annual: [],
        annual_status: "unavailable",
        meta: {
          source: "Demo data (fixture)",
          fiscal_year_end: 3,
          fiscal_year_end_assumed: true,
          quarters_available: 5,
        },
      };

      const viewModel = mapCompanyFinancials(mockDTO);
      expect(viewModel.keyMetrics.ttmRevenue.formattedValue).toBe(EM_DASH);
      expect(viewModel.keyMetrics.netProfitMargin.formattedValue).toBe(EM_DASH);
      expect(viewModel.keyMetrics.latestQuarterRevenue.formattedValue).toBe("410.00");
      expect(viewModel.annualStatus).toBe("unavailable");
      expect(viewModel.reason).toBe("gap_in_quarters");
      expect(viewModel.reasonDisplay).toContain("Insufficient consecutive quarterly records");
    });
  });
});
