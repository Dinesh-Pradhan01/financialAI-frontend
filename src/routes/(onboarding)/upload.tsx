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
          <p className="text-sm font-medium text-text-secondary">
            Loading statement extraction hub…
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {isError && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground">
                    Notice: Could not sync existing statements list
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {getApiErrorMessage(
                      error,
                      "You can still upload new bank statements below while we reconnect.",
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => refetch()}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-surface px-3 py-1.5 text-xs font-semibold text-foreground border border-border shadow-xs hover:bg-surface-alt transition cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
                Retry Sync
              </button>
            </div>
          )}

          <ExtractionHub documents={documents} onDocumentsChange={refetch} />
        </div>
      )}
    </div>
  );
}
