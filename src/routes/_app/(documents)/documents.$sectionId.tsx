import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { SectionDocumentsPage } from "@/features/documents/components/SectionDocumentsPage";
import { getSection, legacyCategoryToRoute } from "@/features/documents/lib/vaultManifest";

const sectionSearchSchema = z.object({
  sub: z.string().optional(),
});

export const Route = createFileRoute("/_app/(documents)/documents/$sectionId")({
  validateSearch: (search: Record<string, unknown>) => sectionSearchSchema.parse(search),
  beforeLoad: ({ params, search }) => {
    // If the URL param is a legacy category slug, redirect to its target section and subcategory
    const legacyRedirect = legacyCategoryToRoute(params.sectionId);
    if (legacyRedirect) {
      throw redirect({
        to: "/documents/$sectionId",
        params: { sectionId: legacyRedirect.sectionId },
        search: { sub: legacyRedirect.sub ?? (search as { sub?: string }).sub },
      });
    }
  },
  head: ({ params }) => {
    const section = getSection(params.sectionId);
    const title = section
      ? `${section.label} · Documents · Spotlite`
      : "Section Documents · Spotlite";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: section?.description ?? "Upload and verify statutory company documents.",
        },
      ],
    };
  },
  component: SectionRouteComponent,
});

function SectionRouteComponent() {
  const { sectionId } = Route.useParams();
  const { sub } = Route.useSearch();
  return (
    <SectionDocumentsPage
      key={`${sectionId}-${sub ?? "default"}`}
      sectionId={sectionId}
      initialSubId={sub}
    />
  );
}
