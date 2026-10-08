import { describe, it, expect } from "vitest";
import {
  FIXTURE_COMPETITORS_RESPONSE,
  FIXTURE_FINANCIALS_ADITYA,
  FIXTURE_FINANCIALS_ALLIED,
  FIXTURE_FINANCIALS_BLACK_BOX,
  FIXTURE_FINANCIALS_DLINK,
  FIXTURE_FINANCIALS_RASHI,
  getFixtureCompanyFinancials,
} from "./competitorsFixtures";
import {
  CompetitorsResponseSchema,
  CompanyFinancialsResponseSchema,
} from "../schemas/industrySchemas";

describe("fixturesReconciliation", () => {
  describe("Zod contract schema compliance", () => {
    it("validates the competitors list fixture against CompetitorsResponseSchema", () => {
      const parsed = CompetitorsResponseSchema.safeParse(FIXTURE_COMPETITORS_RESPONSE);
      expect(parsed.success).toBe(true);
    });

    it("validates all company financials fixtures against CompanyFinancialsResponseSchema", () => {
      const fixtures = [
        FIXTURE_FINANCIALS_ADITYA,
        FIXTURE_FINANCIALS_ALLIED,
        FIXTURE_FINANCIALS_BLACK_BOX,
        FIXTURE_FINANCIALS_DLINK,
        FIXTURE_FINANCIALS_RASHI,
      ];

      for (const fix of fixtures) {
        const parsed = CompanyFinancialsResponseSchema.safeParse(fix);
        if (!parsed.success) {
          console.error(
            `Schema validation failed for company ${fix.company_id}:`,
            parsed.error.format(),
          );
        }
        expect(parsed.success).toBe(true);
      }
    });
  });

  describe("Anchor company integrity", () => {
    it("contains VL ACCESS with unlisted status and unavailable financials", () => {
      const anchor = FIXTURE_COMPETITORS_RESPONSE.anchor;
      expect(anchor.company_name).toBe("VL ACCESS INDIA PRIVATE LIMITED");
      expect(anchor.cin).toBe("U52392OR2007PTC009194");
      expect(anchor.listing_status).toBe("unlisted");
      expect(anchor.financial_status).toBe("unavailable");
      expect(anchor.reason).toBe("unlisted_private_company");
    });
  });

  describe("Competitors list ordering and wireframe specifications", () => {
    it("lists exactly 5 competitors in wireframe order with curated overlap", () => {
      const comps = FIXTURE_COMPETITORS_RESPONSE.competitors;
      expect(comps).toHaveLength(5);

      expect(comps[0].company_name).toBe("Aditya Infotech");
      expect(comps[0].overlap_level).toBe("Very High");
      expect(comps[0].has_financials).toBe(true);

      expect(comps[1].company_name).toBe("Allied Digital");
      expect(comps[1].overlap_level).toBe("Very High");
      expect(comps[1].has_financials).toBe(false);

      expect(comps[2].company_name).toBe("Black Box");
      expect(comps[2].overlap_level).toBe("High");
      expect(comps[2].has_financials).toBe(true);

      expect(comps[3].company_name).toBe("D-Link India");
      expect(comps[3].overlap_level).toBe("Moderate High");
      expect(comps[3].has_financials).toBe(true);

      expect(comps[4].company_name).toBe("Rashi Peripherals");
      expect(comps[4].overlap_level).toBe("Moderate");
      expect(comps[4].has_financials).toBe(true);
    });
  });

  describe("Financial figures and reconciliation", () => {
    describe("Aditya Infotech (2213)", () => {
      it("has 5 quarters, 1 rolled-up FY26, and null other income & interest", () => {
        const data = FIXTURE_FINANCIALS_ADITYA;
        expect(data.quarterly).toHaveLength(5);
        expect(data.annual).toHaveLength(1);
        expect(data.annual[0].period_label).toBe("FY26");
        expect(data.annual[0].basis).toBe("rolled_up");

        for (const q of data.quarterly) {
          expect(q.other_income).toBeNull();
          expect(q.interest).toBeNull();
          // Total income equals revenue when other income is null
          expect(q.total_income).toBe(q.revenue);
          // OPM% reconciles with operating_profit / revenue
          if (q.revenue && q.operating_profit) {
            const expectedOpm = Number(((q.operating_profit / q.revenue) * 100).toFixed(2));
            expect(q.opm_pct).toBe(expectedOpm);
          }
          // NPM% reconciles with net_profit / revenue
          if (q.revenue && q.net_profit) {
            const expectedNpm = Number(((q.net_profit / q.revenue) * 100).toFixed(2));
            expect(q.npm_pct).toBe(expectedNpm);
          }
        }

        // TTM is the sum of latest 4 quarters: 1422 + 1350 + 1280 + 1210 = 5262.00
        expect(data.key_metrics.ttm_revenue.value).toBe(5262.0);
      });
    });

    describe("Allied Digital (900001)", () => {
      it("has unavailable status, no financials loaded reason, and empty period lists", () => {
        const data = FIXTURE_FINANCIALS_ALLIED;
        expect(data.financial_status).toBe("unavailable");
        expect(data.reason).toBe("no_financials_loaded");
        expect(data.quarterly).toEqual([]);
        expect(data.annual).toEqual([]);
        expect(data.annual_status).toBe("unavailable");
        expect(data.key_metrics.ttm_revenue.value).toBeNull();
      });
    });

    describe("Black Box (2276) gap handling", () => {
      it("has gap in quarters resulting in null TTM and unavailable annual status", () => {
        const data = FIXTURE_FINANCIALS_BLACK_BOX;
        expect(data.quarterly).toHaveLength(5);
        expect(data.annual).toEqual([]);
        expect(data.annual_status).toBe("unavailable");
        expect(data.reason).toBe("gap_in_quarters");

        // Because of the gap, TTM and net margin metrics are null
        expect(data.key_metrics.ttm_revenue.value).toBeNull();
        expect(data.key_metrics.net_profit_margin_pct.value).toBeNull();

        // But latest quarter revenue is present
        expect(data.key_metrics.latest_quarter_revenue.value).toBe(410.0);
        expect(data.key_metrics.expenditure_to_revenue_pct.value).toBeDefined();
      });
    });

    describe("D-Link India (1779)", () => {
      it("has 13 quarters, reported annuals FY24-FY26, and populated other income", () => {
        const data = FIXTURE_FINANCIALS_DLINK;
        expect(data.quarterly).toHaveLength(13);
        expect(data.annual).toHaveLength(3);

        for (const a of data.annual) {
          expect(a.basis).toBe("reported");
        }

        // Other income is present and interest is null
        expect(data.quarterly[0].other_income).toBe(5.0);
        expect(data.quarterly[0].interest).toBeNull();
        // Total income equals revenue + other_income
        expect(data.quarterly[0].total_income).toBe(462.0);

        // TTM equals sum of latest 4 quarters: 457 + 440 + 425 + 410 = 1732.00
        expect(data.key_metrics.ttm_revenue.value).toBe(1732.0);
      });
    });

    describe("Rashi Peripherals (1776)", () => {
      it("has 13 quarters and rolled-up annual basis", () => {
        const data = FIXTURE_FINANCIALS_RASHI;
        expect(data.quarterly).toHaveLength(13);
        expect(data.annual).toHaveLength(3);

        for (const a of data.annual) {
          expect(a.basis).toBe("rolled_up");
        }

        // Other income and interest are null
        expect(data.quarterly[0].other_income).toBeNull();
        expect(data.quarterly[0].interest).toBeNull();

        // TTM sum of latest 4 quarters: 5102 + 4850 + 4620 + 4400 = 18972.00
        expect(data.key_metrics.ttm_revenue.value).toBe(18972.0);
      });
    });

    describe("Fallback for unknown company ID", () => {
      it("returns safe unavailable object for unseeded company ID", () => {
        const fallback = getFixtureCompanyFinancials(999999);
        expect(fallback.company_id).toBe(999999);
        expect(fallback.financial_status).toBe("unavailable");
        expect(fallback.reason).toBe("no_financials_loaded");
        expect(fallback.quarterly).toEqual([]);
      });
    });
  });
});
