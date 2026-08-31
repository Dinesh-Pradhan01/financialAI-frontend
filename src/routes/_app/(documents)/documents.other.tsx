import { createFileRoute } from "@tanstack/react-router";
import { OtherDocumentsPage } from "@/features/documents/components/OtherDocumentsPage";

export const Route = createFileRoute("/_app/(documents)/documents/other")({
  head: () => ({
    meta: [
      { title: "Other Documents · Spotlite" },
      {
        name: "description",
        content: "Upload and manage miscellaneous documents that do not belong to predefined categories.",
      },
    ],
  }),
  component: OtherDocumentsPage,
});
