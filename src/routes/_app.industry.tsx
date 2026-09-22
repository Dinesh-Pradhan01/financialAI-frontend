import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sectorQueryOptions, top5StocksQueryOptions } from "@/features/industry/hooks/useIndustryAPI";
import { IndustryDashboard } from "@/features/industry/components/IndustryDashboard";

const industrySearchSchema = z.object({
  sector_name: z.string().optional(),
});

export const Route = createFileRoute("/_app/industry")({
  validateSearch: (search) => industrySearchSchema.parse(search),
  loader: async ({ context: { queryClient }, search }) => {
    if (search?.sector_name) {
      await Promise.all([
        queryClient.ensureQueryData(sectorQueryOptions(search.sector_name)),
        queryClient.ensureQueryData(top5StocksQueryOptions(search.sector_name)),
      ]);
    }
  },
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
