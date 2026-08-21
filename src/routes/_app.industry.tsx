import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { IndustryDashboard } from "@/features/industry/components/IndustryDashboard";

const industrySearchSchema = z.object({
  sector_name: z.string().optional(),
});

export const Route = createFileRoute("/_app/industry")({
  validateSearch: (search) => industrySearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Industry Analysis · Spotlite" },
      {
        name: "description",
        content: "Benchmarking and sector performance overview.",
      },
    ],
  }),
  component: IndustryDashboard,
});
