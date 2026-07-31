import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ExtractionHub, DocumentInfo } from "@/components/spotlite/extraction-hub";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Transactions · Spotlite" },
      { name: "description", content: "Upload and extract transaction data." },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  const nav = useNavigate();

  const { data: documents = [], refetch } = useQuery({
    queryKey: ["statements"],
    queryFn: () => api.get<DocumentInfo[]>("/api/statements"),
  });

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6 py-8">
      <Link to="/home" className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>
      <div className="mt-6">
        <ExtractionHub 
          documents={documents} 
          onDocumentsChange={refetch} 
        />
      </div>
    </div>
  );
}
