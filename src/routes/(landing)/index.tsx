import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/features/landing/components/LandingPage";

export const Route = createFileRoute("/(landing)/")({
  head: () => ({
    meta: [
      { title: "SpotLite: Workforce & Financial Intelligence" },
      {
        name: "description",
        content:
          "Your business leaves signals. SpotLite connects them. SpotLite brings together your company’s financial, workforce, and market data turning scattered signals into clear insights, benchmarks, and alerts that help leadership understand what’s happening and make better decisions, faster.",
      },
    ],
  }),
  component: LandingPage,
});
