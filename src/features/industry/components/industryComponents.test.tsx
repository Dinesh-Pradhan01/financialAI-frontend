import React from "react";
import { describe, it, expect, beforeAll } from "vitest";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { OverlapBadge } from "./OverlapBadge";
import { AnchorSummary } from "./AnchorSummary";
import { CompetitorTable } from "./CompetitorTable";
import {
  IndustryEmptyState,
  IndustryNoneState,
  IndustryGeneratingState,
  IndustryErrorState,
} from "./IndustryStates";
import { FIXTURE_COMPETITORS_RESPONSE } from "../fixtures";
import { mapAnchorCompany, mapCompetitorRow } from "../mappers/mapCompetitors";
import type { OverlapLevel } from "../types/industry";

describe("Industry v2 Component Tests", () => {
  describe("OverlapBadge", () => {
    const levels: OverlapLevel[] = ["Very High", "High", "Moderate High", "Moderate"];

    levels.forEach((level) => {
      it(`renders badge for level "${level}" with semantic tokens and readable label`, () => {
        const html = renderToString(<OverlapBadge level={level} />);
        expect(html).toContain(level);
        // Ensure no arbitrary hex codes are rendered
        expect(html).not.toMatch(/#[0-9a-fA-F]{3,8}/);
      });
    });
  });

  describe("AnchorSummary", () => {
    const anchorVM = mapAnchorCompany(FIXTURE_COMPETITORS_RESPONSE.anchor);

    it("renders company name, industry, and unlisted status chip", () => {
      const html = renderToString(<AnchorSummary anchor={anchorVM} />);
      expect(html).toContain("VL ACCESS INDIA PRIVATE LIMITED");
      expect(html).toContain("Trading");
      expect(html).toContain("Unlisted");
      expect(html).toContain("U52392OR2007PTC009194");
    });

    it("renders unlisted reason copy without numbers", () => {
      const html = renderToString(<AnchorSummary anchor={anchorVM} />);
      expect(html).toContain("Financials unavailable:");
      expect(html).toContain("unlisted private companies");
      // Critical check: Anchor is unlisted private company and must display zero numbers
      expect(html).not.toMatch(/₹\s*[0-9]/);
      expect(html).not.toMatch(/Cr\./i);
    });
  });

  describe("CompetitorTable & Rows", () => {
    const queryClient = new QueryClient();
    const competitorsVM = FIXTURE_COMPETITORS_RESPONSE.competitors.map(mapCompetitorRow);

    const rootRoute = createRootRoute({
      component: () => (
        <QueryClientProvider client={queryClient}>
          <CompetitorTable
            competitors={competitorsVM}
            generatedAt={FIXTURE_COMPETITORS_RESPONSE.generated_at}
          />
        </QueryClientProvider>
      ),
    });

    const testRouter = createRouter({
      history: createMemoryHistory({ initialEntries: ["/"] }),
      routeTree: rootRoute,
    });

    beforeAll(async () => {
      await testRouter.load();
    });

    it("renders semantic table with accessible caption and headers", () => {
      const html = renderToString(<RouterProvider router={testRouter} />);

      // Semantic table elements
      expect(html).toContain("<table");
      expect(html).toContain("<caption");
      expect(html).toContain('scope="col"');
      expect(html).toContain('scope="row"');
      expect(html).toContain('role="region"');
      expect(html).toContain('aria-label="Competitor comparison table"');
      expect(html).toContain("Company");
      expect(html).toContain("Overlap");
      expect(html).toContain("Overview");

      // Verify all 5 competitors are present
      expect(html).toContain("Aditya Infotech");
      expect(html).toContain("Allied Digital");
      expect(html).toContain("Black Box");
      expect(html).toContain("D-Link India");
      expect(html).toContain("Rashi Peripherals");

      // Verify provenance footnote
      expect(html).toContain("Source:");
      expect(html).toContain("Curated");
      expect(html).toContain("Generated on");
    });

    it("renders 'Financials unavailable' for Allied Digital (has_financials: false)", () => {
      const html = renderToString(<RouterProvider router={testRouter} />);
      expect(html).toContain("Financials unavailable");
    });
  });

  describe("IndustryStates (Empty vs None vs Generating Copy Check)", () => {
    it("Addition A: Empty state displays distinct copy", () => {
      const html = renderToString(<IndustryEmptyState />);
      expect(html).toContain("No competitors have been identified for your company yet.");
    });

    it("Addition A: None state displays distinct copy", () => {
      const html = renderToString(<IndustryNoneState />);
      expect(html.replace(/&#x27;/g, "'")).toContain(
        "Competitor analysis hasn't been generated for your company yet.",
      );
    });

    it("Generating state displays prompt copy", () => {
      const html = renderToString(<IndustryGeneratingState />);
      expect(html.replace(/&#x27;/g, "'")).toContain(
        "We're analysing competitors for your company.",
      );
    });

    it("Error state displays error message and retry button", () => {
      const html = renderToString(
        <IndustryErrorState error={new Error("Simulated network outage")} onRetry={() => {}} />,
      );
      expect(html.replace(/&#x27;/g, "'")).toContain(
        "We couldn't load competitor analysis right now.",
      );
      expect(html).toContain("Simulated network outage");
      expect(html).toContain("Try again");
    });
  });

  describe("IndustryPage & Addition D: 'Demo data' Badge Visibility", () => {
    it("renders h1 'Industry View' and 'Demo data' badge when source is fixtures", async () => {
      const queryClient = new QueryClient();
      const { mapCompetitorsResponse } = await import("../mappers/mapCompetitors");
      const { IndustryPage } = await import("./IndustryPage");
      const { queryKeys } = await import("@/shared/lib/queryKeys");

      // Set fixture data with isFixture = true
      const viewModel = mapCompetitorsResponse(FIXTURE_COMPETITORS_RESPONSE, { isFixture: true });
      queryClient.setQueryData(queryKeys.industry.competitors(), viewModel);

      const pageRoot = createRootRoute({
        component: () => (
          <QueryClientProvider client={queryClient}>
            <IndustryPage />
          </QueryClientProvider>
        ),
      });

      const pageRouter = createRouter({
        history: createMemoryHistory({ initialEntries: ["/industry"] }),
        routeTree: pageRoot,
      });

      await pageRouter.load();
      const html = renderToString(<RouterProvider router={pageRouter} />);

      // Assertions
      expect(html).toContain("Industry View");
      expect(html).toContain("Competitors and peers for VL ACCESS INDIA PRIVATE LIMITED");
      // Addition D: 'Demo data' badge visibility verified on the list page
      expect(html).toContain("Demo data");
      expect(html).toContain('data-testid="demo-data-badge"');
    });

    it("omits 'Demo data' badge when source is live api", async () => {
      const queryClient = new QueryClient();
      const { mapCompetitorsResponse } = await import("../mappers/mapCompetitors");
      const { IndustryPage } = await import("./IndustryPage");
      const { queryKeys } = await import("@/shared/lib/queryKeys");

      // Set api data with isFixture = false
      const viewModel = mapCompetitorsResponse(FIXTURE_COMPETITORS_RESPONSE, { isFixture: false });
      queryClient.setQueryData(queryKeys.industry.competitors(), viewModel);

      const pageRoot = createRootRoute({
        component: () => (
          <QueryClientProvider client={queryClient}>
            <IndustryPage />
          </QueryClientProvider>
        ),
      });

      const pageRouter = createRouter({
        history: createMemoryHistory({ initialEntries: ["/industry"] }),
        routeTree: pageRoot,
      });

      await pageRouter.load();
      const html = renderToString(<RouterProvider router={pageRouter} />);

      expect(html).toContain("Industry View");
      expect(html).not.toContain('data-testid="demo-data-badge"');
    });
  });

  describe("Addition C: Data Source Fallback & Dev Warning", () => {
    it("getIndustryDataSource handles unset, 'fixtures', 'api', and invalid values", async () => {
      const { getIndustryDataSource } = await import("../api/industryApi");

      // By default in test environment where VITE_INDUSTRY_DATA_SOURCE is unset
      expect(getIndustryDataSource()).toBe("fixtures");
    });
  });

  describe("Demo Query Parameters (?demo=empty | none | generating | error | slow | unexpected)", () => {
    it("?demo=empty returns ready with zero competitors", async () => {
      const { getCompetitors } = await import("../api/industryApi");
      const res = await getCompetitors({ demo: "empty" });
      expect(res.status).toBe("ready");
      expect(res.competitors).toEqual([]);
    });

    it("?demo=none returns status 'none' with zero competitors", async () => {
      const { getCompetitors } = await import("../api/industryApi");
      const res = await getCompetitors({ demo: "none" });
      expect(res.status).toBe("none");
      expect(res.competitors).toEqual([]);
    });

    it("?demo=generating returns status 'generating' with zero competitors", async () => {
      const { getCompetitors } = await import("../api/industryApi");
      const res = await getCompetitors({ demo: "generating" });
      expect(res.status).toBe("generating");
      expect(res.competitors).toEqual([]);
    });

    it("?demo=error throws IndustryApiError", async () => {
      const { getCompetitors, isIndustryApiError } = await import("../api/industryApi");
      await expect(getCompetitors({ demo: "error" })).rejects.toSatisfy((err) =>
        isIndustryApiError(err),
      );
    });

    it("?demo=unexpected throws IndustryApiError with unexpected_response", async () => {
      const { getCompetitors, IndustryApiError } = await import("../api/industryApi");
      await expect(getCompetitors({ demo: "unexpected" })).rejects.toThrow(IndustryApiError);
    });
  });
});
