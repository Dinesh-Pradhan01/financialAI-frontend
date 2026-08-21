import { createFileRoute } from "@tanstack/react-router";
import { BusinessC360Page } from "@/features/dashboard/components/BusinessC360Page";

export const Route = createFileRoute("/_app/(dashboard)/home")({
  head: () => ({
    meta: [
      { title: "Business C360 · Spotlite" },
      {
        name: "description",
        content: "Your business financial intelligence hub.",
      },
    ],
  }),
  component: BusinessC360Page,
});
