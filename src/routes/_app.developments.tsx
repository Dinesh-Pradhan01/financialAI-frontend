import { createFileRoute } from "@tanstack/react-router";
import { DevelopmentsPage } from "@/features/developments/components/DevelopmentsPage";

export const Route = createFileRoute("/_app/developments")({
  head: () => ({
    meta: [
      { title: "Developments | SpotLite" },
      {
        name: "description",
        content: "Company developments, news intelligence, and market opportunities.",
      },
    ],
  }),
  component: DevelopmentsPage,
});
