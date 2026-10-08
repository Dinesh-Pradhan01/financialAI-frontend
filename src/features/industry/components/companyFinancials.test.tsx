import React from "react";
import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { CompanyFinancialsPage } from "./CompanyFinancialsPage";
import { KeyMetricCards } from "./KeyMetricCards";
import { FinancialsTable } from "./FinancialsTable";
import {
  IndustryNotFoundState,
  IndustryFinancialsUnavailableState,
  AnnualUnavailablePanel,
} from "./IndustryStates";
import {
  FIXTURE_COMPETITORS_RESPONSE,
  FIXTURE_FINANCIALS_BY_COMPANY_ID,
  getFixtureCompanyFinancials,
} from "../fixtures";
import { mapCompanyFinancials } from "../mappers/mapFinancials";
import { mapCompetitorsResponse } from "../mappers/mapCompetitors";
import { queryKeys } from "@/shared/lib/queryKeys";
import { getCompanyFinancials, IndustryApiError, isIndustryApiError } from "../api/industryApi";
import { EM_DASH } from "../presentation/industryPresentation";

/**
 * Strips React 19 SSR comment markers (<!-- -->) so string assertions match clean text.
 */
function clean(html: string): string {
  return html.replace(/<!-- -->/g, "");
}

function createTestPageRouter(companyId: number, activeView: "quarterly" | "annual" = "quarterly") {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // Pre-seed competitors intelligence list
  const competitorsVM = mapCompetitorsResponse(FIXTURE_COMPETITORS_RESPONSE, { isFixture: true });
  queryClient.setQueryData(queryKeys.industry.competitors(), competitorsVM);

  // If known fixture, pre-seed financials
  const rawFinancials = FIXTURE_FINANCIALS_BY_COMPANY_ID[companyId];
  if (rawFinancials) {
    const matched = competitorsVM.competitors.find((c) => c.companyId === companyId);
    const financialsVM = mapCompanyFinancials(rawFinancials, {
      companyName: matched?.companyName,
      ticker: matched?.ticker,
      overlapLevel: matched?.overlapLevel,
      overlapSummary: matched?.overlapSummary,
    });
    queryClient.setQueryData(queryKeys.industry.financials(companyId), financialsVM);
  }

  const rootRoute = createRootRoute({
    component: () => (
      <QueryClientProvider client={queryClient}>
        <CompanyFinancialsPage companyId={companyId} activeView={activeView} />
      </QueryClientProvider>
    ),
  });

  return createRouter({
    history: createMemoryHistory({ initialEntries: [`/industry/${companyId}?view=${activeView}`] }),
    routeTree: rootRoute,
  });
}

describe("Company Financials View (/industry/$companyId) Acceptance Tests", () => {
  describe("1. D-Link India (1779): Full financial profile", () => {
    it("renders header, overlap badge, 4 key metrics, quarterly periods, and toggle button", async () => {
      const router = createTestPageRouter(1779, "quarterly");
      await router.load();
      const html = clean(renderToString(<RouterProvider router={router} />));

      // Company identity & metadata
      expect(html).toContain("D-Link India");
      expect(html).toContain("(DLINKINDIA)");
      expect(html).toContain("Moderate High");
      expect(html).toContain("Latest period Q1 FY27");
      expect(html).toContain("Data as of Jun 2026");
      expect(html).toContain("Demo data");

      // Key metric cards (INR crore and %)
      expect(html).toContain("₹1,732.00 Cr.");
      expect(html).toContain("Last four quarters, rolled up");
      expect(html).toContain("₹457.00 Cr.");
      expect(html).toContain("Q1 FY27 (Reported)");
      expect(html).toContain("92.34%");
      expect(html).toContain("5.95%");

      // Anchor benchmark baseline context
      expect(html).toContain("Your Company · Benchmark Baseline");
      expect(html).toContain("VL ACCESS INDIA PRIVATE LIMITED");
      expect(html).toContain("CIN: U52392OR2007PTC009194");
      expect(html).toContain("Benchmarking");

      // Financials table (quarterly view with latest periods & utility tools)
      expect(html).toContain("₹ in crore");
      expect(html).toContain("Copy Table");
      expect(html).toContain("Export CSV");
      expect(html).toContain('aria-label="Financial statements table"');
      expect(html).toContain("Q1 FY27");
      expect(html).toContain("Q4 FY26");
      expect(html).toContain("Q3 FY26");
      expect(html).toContain("Q2 FY26");
      expect(html).toContain("Q1 FY26");

      // 13 quarters exist -> toggle button must be rendered
      expect(html).toContain("Show all 13 periods");
    });

    it("renders reported annual figures and legend when view is annual", async () => {
      const router = createTestPageRouter(1779, "annual");
      await router.load();
      const html = clean(renderToString(<RouterProvider router={router} />));

      // Annual headers
      expect(html).toContain("FY26");
      expect(html).toContain("FY25");
      expect(html).toContain("FY24");

      // Basis tags and legend
      expect(html).toContain("Reported");
      expect(html).toContain("Audited reported figures");
    });
  });

  describe("2. Rashi Peripherals (1776): Rolled-up annual and hidden row suppression", () => {
    it("renders annual rolled up badges and hides null rows with footnote", async () => {
      const router = createTestPageRouter(1776, "annual");
      await router.load();
      const html = clean(renderToString(<RouterProvider router={router} />));

      expect(html).toContain("Rashi Peripherals");
      expect(html).toContain("(RPTECH)");
      expect(html).toContain("Rolled up");
      expect(html).toContain("Computed sum of 4 quarters");

      // Other Income and Interest are null in Rashi data -> must be hidden from table rows and appear in footnote
      expect(html).toContain("Not reported in the available data:");
      expect(html).toContain("Other Income");
      expect(html).toContain("Interest");
    });
  });

  describe("3. Aditya Infotech (2213): Single annual column", () => {
    it("renders exactly 1 annual column (FY26) with reported basis", async () => {
      const router = createTestPageRouter(2213, "annual");
      await router.load();
      const html = clean(renderToString(<RouterProvider router={router} />));

      expect(html).toContain("Aditya Infotech");
      expect(html).toContain("Very High");
      expect(html).toContain("FY26");
      expect(html).toContain("Reported");

      // Does not render FY25 or FY24 as only 1 annual period is loaded
      expect(html).not.toContain("FY25");
    });
  });

  describe("4. Black Box (2276): Null metrics and annual unavailable panel", () => {
    it("displays em dash for TTM & NPM metrics and shows explanatory panel for annual tab", async () => {
      const router = createTestPageRouter(2276, "annual");
      await router.load();
      const html = clean(renderToString(<RouterProvider router={router} />));

      expect(html).toContain("Black Box");
      expect(html).toContain("(BBOX)");

      // TTM Revenue & Net Profit Margin are null -> must show em dash and "Not available"
      expect(html).toContain(EM_DASH);
      expect(html).toContain("Not available");
      // Never render 0 for unknown
      expect(html).not.toContain("₹0.00 Cr.");
      expect(html).not.toContain("0.00%");

      // Annual status is unavailable -> renders AnnualUnavailablePanel
      expect(html).toContain("Annual Figures Unavailable");
      expect(html).toContain("Insufficient consecutive quarterly records");
      // Must not render an empty table
      expect(html).not.toContain("₹ in crore");
    });
  });

  describe("5. Allied Digital (900001): Financials unavailable state", () => {
    it("renders financials unavailable state without metric cards or statements table", async () => {
      const router = createTestPageRouter(900001, "quarterly");
      await router.load();
      const html = clean(renderToString(<RouterProvider router={router} />));

      expect(html).toContain("Allied Digital");
      expect(html).toContain("Financials Unavailable");
      expect(html).toContain("Financial statements are currently not loaded for this entity.");

      // Must not render metric cards or statements table
      expect(html).not.toContain("Key Financial Metrics");
      expect(html).not.toContain("Financial Statements");
      expect(html).not.toContain("₹ in crore");

      // Back link
      expect(html).toContain("Back to Industry View");
    });
  });

  describe("6. Unknown company ID (e.g. 999999): NotFound state", () => {
    it("renders IndustryNotFoundState with a back link", async () => {
      const router = createTestPageRouter(999999, "quarterly");
      await router.load();
      const html = clean(renderToString(<RouterProvider router={router} />));

      expect(html).toContain("Company Not Found");
      expect(html).toContain("The company with ID 999999 was not found");
      expect(html).toContain("Back to Industry View");
    });
  });

  describe("7. KeyMetricCards formatting unit tests", () => {
    it("never renders 0 for unknown metrics and applies correct unit prefixes/suffixes", () => {
      const rawFinancials = getFixtureCompanyFinancials(2276); // Black box has null TTM & NPM
      const vm = mapCompanyFinancials(rawFinancials);

      const html = clean(renderToString(<KeyMetricCards metrics={vm.keyMetrics} />));

      // Metric labels
      expect(html).toContain("TTM Revenue");
      expect(html).toContain("Latest Quarter Revenue");
      expect(html).toContain("Expenditure / Revenue");
      expect(html).toContain("Net Profit Margin");

      // Known values
      expect(html).toContain("₹410.00 Cr.");
      expect(html).toContain("91.46%");

      // Null values
      expect(html).toContain(EM_DASH);
      expect(html).toContain("Not available");
      expect(html).not.toContain("₹0.00");
    });
  });

  describe("8. FinancialsTable windowing and toggle", () => {
    it("renders toggle button when periods > 5 and toggles windowing", () => {
      const rawFinancials = getFixtureCompanyFinancials(1779); // D-link has 13 quarters
      const periods = rawFinancials.quarterly;

      const htmlDefault = clean(
        renderToString(<FinancialsTable periods={periods} isAnnual={false} />),
      );
      expect(htmlDefault).toContain("Show all 13 periods");
      // Default shows latest 5
      expect(htmlDefault).toContain("Q1 FY27");
      expect(htmlDefault).toContain("Q1 FY26");
      // 6th period is not in the default 5-window
      expect(htmlDefault).not.toContain("Q4 FY25");
    });
  });

  describe("9. Demo parameter handling (?demo=error | unexpected)", () => {
    it("?demo=error throws IndustryApiError with status 500", async () => {
      await expect(getCompanyFinancials(1779, { demo: "error" })).rejects.toSatisfy((err) => {
        return isIndustryApiError(err) && err.status === 500;
      });
    });

    it("?demo=unexpected throws IndustryApiError with unexpected_response", async () => {
      await expect(getCompanyFinancials(1779, { demo: "unexpected" })).rejects.toThrow(
        IndustryApiError,
      );
    });

    it("unknown company ID throws not_found 404 in fixture mode", async () => {
      await expect(getCompanyFinancials(999999)).rejects.toSatisfy((err) => {
        return isIndustryApiError(err) && err.status === 404;
      });
    });
  });
});
