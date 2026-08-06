import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sectorQueryOptions, top5StocksQueryOptions } from "@/hooks/useIndustryAPI";
import { IndustryDashboard } from "@/components/industry/IndustryDashboard";

const industrySearchSchema = z.object({
  sector_name: z.string().default("fast_moving_consumer_goods"),
});

export const Route = createFileRoute("/_app/industry")({
  validateSearch: (search) => industrySearchSchema.parse(search),
  loader: async ({ context: { queryClient }, search }) => {
    const sector_name = search?.sector_name || "fast_moving_consumer_goods";
    await Promise.all([
      queryClient.ensureQueryData(sectorQueryOptions(sector_name)),
      queryClient.ensureQueryData(top5StocksQueryOptions()),
    ]);
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
