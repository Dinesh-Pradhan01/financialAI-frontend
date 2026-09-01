import { createFileRoute } from "@tanstack/react-router";
import { HRDashboardPage } from "@/features/hr/components/HRDashboardPage";

export const Route = createFileRoute("/_app/(hr)/hr")({
  head: () => ({
    meta: [{ title: "HR Operations Center · Spotlite" }],
  }),
  component: HRDashboardPage,
});
