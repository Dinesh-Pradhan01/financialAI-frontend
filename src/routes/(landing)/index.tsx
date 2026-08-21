import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/features/landing/components/LandingPage";

export const Route = createFileRoute("/(landing)/")({
  head: () => ({
    meta: [
      { title: "SpotLite: Workforce & Financial Intelligence" },
      {
        name: "description",
        content:
          "One unified view of your company's financial health and workforce risk. Connected bank statements, verified HR rosters, and real-time executive intelligence.",
      },
    ],
  }),
  component: LandingPage,
});
