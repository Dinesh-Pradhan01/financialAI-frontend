import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { useStatements } from "@/shared/hooks/useStatements";
import { ExtractionHub } from "@/features/agents/components/extraction-hub";
import { getApiErrorMessage } from "@/shared/lib/apiError";

export const Route = createFileRoute("/(onboarding)/upload")({
  head: () => ({
    meta: [
      { title: "Upload Transactions · Spotlite" },
      { name: "description", content: "Upload and extract transaction data." },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  const { data: documents = [], refetch, isLoading, isError, error } = useStatements();

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6 py-8">
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      {isLoading ? (
        <div className="mt-12 flex flex-col items-center justify-center gap-3 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-sm font-medium text-text-secondary">Loading statement extraction hub…</p>
        </div>
      ) : isError ? (
        <div className="mt-8 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-foreground">Failed to load statements</h3>
          <p className="mt-1 text-sm text-text-secondary">
            {getApiErrorMessage(error, "An unexpected error occurred while fetching your bank statements.")}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-surface px-4 py-2 text-xs font-semibold text-foreground border border-border shadow-xs hover:bg-surface-alt transition cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <ExtractionHub 
            documents={documents} 
            onDocumentsChange={refetch} 
          />
        </div>
      )}
    </div>
  );
}
