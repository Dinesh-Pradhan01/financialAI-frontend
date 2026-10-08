import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { competitorsQueryOptions } from "@/features/industry/hooks/useCompetitors";
import { companyFinancialsQueryOptions } from "@/features/industry/hooks/useCompanyFinancials";
import { CompanyFinancialsPage, type FinancialsViewTab } from "@/features/industry/components";

const financialsSearchSchema = z.object({
  view: z.enum(["quarterly", "annual"]).default("quarterly"),
  demo: z.string().optional(),
});

export const Route = createFileRoute("/_app/industry/$companyId")({
  validateSearch: (search: Record<string, unknown>) => financialsSearchSchema.parse(search),
  loader: async ({
    context,
    params,
  }: {
    context: { queryClient: QueryClient };
    params: { companyId: string };
  }) => {
    const companyId = Number(params.companyId);
    await Promise.all([
      context.queryClient.ensureQueryData(competitorsQueryOptions()),
      !Number.isNaN(companyId)
        ? context.queryClient.ensureQueryData(companyFinancialsQueryOptions(companyId))
        : Promise.resolve(),
    ]);
  },
  head: () => ({
    meta: [
      { title: "Company Financials · Spotlite" },
      {
        name: "description",
        content: "Peer competitor financial analysis and statements.",
      },
    ],
  }),
  component: CompanyFinancialsRouteComponent,
});

function CompanyFinancialsRouteComponent() {
  const { companyId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const handleViewChange = (newView: FinancialsViewTab) => {
    void navigate({
      to: "/industry/$companyId",
      params: { companyId },
      search: {
        ...search,
        view: newView,
      },
    });
  };

  return (
    <CompanyFinancialsPage
      companyId={Number(companyId)}
      activeView={(search.view ?? "quarterly") as FinancialsViewTab}
      onViewChange={handleViewChange}
    />
  );
}
