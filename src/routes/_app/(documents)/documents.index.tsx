import { createFileRoute } from "@tanstack/react-router";
import { DocumentsPage } from "@/features/documents/components/DocumentsPage";

export const Route = createFileRoute("/_app/(documents)/documents/")({
  head: () => ({
    meta: [
      { title: "Documents · Spotlite" },
      { name: "description", content: "Upload, verify, and manage company documents." },
    ],
  }),
  component: DocumentsPage,
});
