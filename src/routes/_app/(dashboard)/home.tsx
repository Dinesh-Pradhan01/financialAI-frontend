import { createFileRoute } from "@tanstack/react-router";
import { Business360Page } from "@/features/dashboard/components/Business360Page";

export const Route = createFileRoute("/_app/(dashboard)/home")({
  head: () => ({
    meta: [
      { title: "Business 360 · Spotlite" },
      {
        name: "description",
        content: "Your business financial intelligence hub.",
      },
    ],
  }),
  component: Business360Page,
});
