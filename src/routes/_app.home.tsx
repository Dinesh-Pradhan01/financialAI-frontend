import { createFileRoute } from "@tanstack/react-router";
import { BusinessC360Page } from "@/components/dashboard/business-c360/BusinessC360Page";

export const Route = createFileRoute("/_app/home")({
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
