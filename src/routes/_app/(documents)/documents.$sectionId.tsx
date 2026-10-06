import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { normalizeCategory } from "@/features/documents/lib/categoryNormalizer";

const sectionSearchSchema = z.object({
  sub: z.string().optional(),
});

export const Route = createFileRoute("/_app/(documents)/documents/$sectionId")({
  validateSearch: (search: Record<string, unknown>) => sectionSearchSchema.parse(search),
  beforeLoad: ({ params, search }) => {
    // If sub-parameter is present, use it for exact category resolution
    let targetCategory: string;
    if (search.sub) {
      targetCategory = normalizeCategory(search.sub);
    } else if (params.sectionId === "regulatory") {
      // Legacy "regulatory" section encompassed multiple categories; default to "all"
      targetCategory = "all";
    } else {
      targetCategory = normalizeCategory(params.sectionId);
    }

    throw redirect({
      to: "/documents",
      search: {
        category: targetCategory === "all" ? undefined : targetCategory,
        view: "grouped",
      },
    });
  },
  component: () => null,
});
