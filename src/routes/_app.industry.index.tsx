import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { competitorsQueryOptions } from "@/features/industry/hooks/useCompetitors";
import { IndustryPage } from "@/features/industry/components/IndustryPage";

const industrySearchSchema = z.object({
  demo: z.string().optional(),
  sector_name: z.string().optional(),
});

export const Route = createFileRoute("/_app/industry/")({
  validateSearch: (search: Record<string, unknown>) => industrySearchSchema.parse(search),
  loader: async ({ context }: { context: { queryClient: QueryClient } }) => {
    await context.queryClient.ensureQueryData(competitorsQueryOptions());
  },
  head: () => ({
    meta: [
      { title: "Industry View · Spotlite" },
      {
        name: "description",
        content: "Competitors and peer financial intelligence.",
      },
    ],
  }),
  component: IndustryPage,
});
