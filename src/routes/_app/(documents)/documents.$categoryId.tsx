import { createFileRoute } from "@tanstack/react-router";
import { CategoryDocumentsPage } from "@/features/documents/components/CategoryDocumentsPage";
import { getDocumentCategory } from "@/features/documents/lib/documentTaxonomy";

export const Route = createFileRoute("/_app/(documents)/documents/$categoryId")({
  head: ({ params }) => {
    const cat = getDocumentCategory(params.categoryId);
    const title = cat ? `${cat.label} · Documents · Spotlite` : "Category Documents · Spotlite";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: cat?.answers ?? "Upload and verify statutory company documents.",
        },
      ],
    };
  },
  component: CategoryRouteComponent,
});

function CategoryRouteComponent() {
  const { categoryId } = Route.useParams();
  return <CategoryDocumentsPage key={categoryId} categoryId={categoryId} />;
}
