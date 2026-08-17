import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
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
