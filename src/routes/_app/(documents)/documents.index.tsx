import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { DocumentsPage } from "@/features/documents/components/DocumentsPage";

const documentsSearchSchema = z.object({
  category: z.string().optional(),
  sub: z.string().optional(),
  view: z.enum(["grouped", "table", "packages"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/_app/(documents)/documents/")({
  validateSearch: (search: Record<string, unknown>) => documentsSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Documents · Spotlite" },
      { name: "description", content: "Authoritative corporate documentary evidence vault." },
    ],
  }),
  component: DocumentsPage,
});
