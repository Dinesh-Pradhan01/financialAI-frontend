import React, { useState } from "react";
import {
  useTransactionDocuments,
  useReprocessDocument,
} from "../hooks/useTransactions";
import { StatementDetail } from "./StatementDetail";
import type { DocumentResponse, DocumentStatus } from "../types/transaction";
import {
  Landmark,
  FileText,
  Clock,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  Info,
  UploadCloud,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";

/** Translate raw backend error strings into user-friendly, actionable copy. */
function getFriendlyError(raw: string): string {
  const msg = raw.toLowerCase();
  if (msg.includes("scanned") || msg.includes("image-only") || msg.includes("image only"))
    return "This file is a scanned image PDF. Please download a text-based statement directly from your bank's website or app and upload that instead.";
  if (msg.includes("password") || msg.includes("encrypted"))
    return "This PDF is password-protected. Please unlock or remove the password before uploading.";
  if (msg.includes("corrupt") || msg.includes("parse") || msg.includes("invalid"))
    return "We couldn't read this file. Please try downloading a fresh copy from your bank and upload again.";
  if (msg.includes("timeout") || msg.includes("timed out"))
    return "Processing took too long. Please retry — if the problem persists, try a smaller file.";
  return "We weren't able to extract this statement. Please retry, or try uploading a different PDF from your bank.";
}

export function StatementsList() {
  const { data: documents = [], isLoading, isError, error, refetch } = useTransactionDocuments();
  const reprocessMutation = useReprocessDocument();
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const handleReprocess = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    try {
      await reprocessMutation.mutateAsync(docId);
      toast.success("Statement queued for reprocessing");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to reprocess statement",
      );
    }
  };

  const renderStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-success/10 text-success px-2.5 py-1 text-xs font-semibold border border-success/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Extracted</span>
          </span>
        );
      case "PROCESSING":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand/10 text-brand px-2.5 py-1 text-xs font-semibold border border-brand/20">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Processing</span>
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-destructive/10 text-destructive px-2.5 py-1 text-xs font-semibold border border-destructive/20">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Failed</span>
          </span>
        );
      case "PENDING":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-severity-moderate/10 text-severity-moderate px-2.5 py-1 text-xs font-semibold border border-severity-moderate/20">
            <Clock className="h-3.5 w-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <section className="mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">
            Bank Statements & Ledgers
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Uploaded statement files and extracted transaction batches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-secondary px-2.5 py-1 rounded-pill bg-surface-alt border border-border/60">
            {documents.length} {documents.length === 1 ? "document" : "documents"}
          </span>
          <Link to="/upload">
            <Button
              size="sm"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand text-white text-xs font-semibold px-3 py-1.5 shadow-brand hover:opacity-95 cursor-pointer"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              Upload Statement
            </Button>
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="card-spot p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <Skeleton className="h-6 w-24 rounded-pill" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center shadow-xs">
          <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground">
            Failed to load statement documents
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {error instanceof Error ? error.message : "Could not connect to document service."}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="mt-3 text-xs font-semibold rounded-xl"
          >
            <RefreshCw className="h-3 w-3 mr-1.5" /> Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && documents.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary mb-3 shadow-xs">
            <FileText className="h-6 w-6 text-brand" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            No bank statements uploaded yet
          </h3>
          <p className="text-xs text-text-secondary mt-1 max-w-md mx-auto">
            Upload your PDF bank statements to automatically extract transactions, compute monthly cash flow, and track merchant outlays.
          </p>
          <div className="mt-4 flex justify-center">
            <Link to="/upload">
              <Button
                size="sm"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand text-white text-xs font-semibold px-4 py-2 shadow-brand hover:opacity-95 cursor-pointer"
              >
                <UploadCloud className="h-3.5 w-3.5" />
                Upload Statement
              </Button>
            </Link>
          </div>
        </div>
      )}

      {!isLoading && !isError && documents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {documents.map((doc: DocumentResponse) => {
            const isFailed = doc.status === "FAILED";
            const isProcessing = doc.status === "PROCESSING";

            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDocumentId(doc.id)}
                className={cn(
                  "card-spot p-4 flex flex-col gap-3 transition-all duration-200 cursor-pointer hover:border-brand/40 hover:shadow-e2 group",
                  isFailed && "border-destructive/30 bg-destructive/[0.02]",
                )}
              >
                {/* File & Bank info */}
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-surface-alt flex items-center justify-center shrink-0 border border-border/80 group-hover:scale-105 transition-transform">
                    <Landmark className="h-4 w-4 text-brand" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-brand transition-colors leading-snug">
                      {doc.original_name || doc.filename}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs text-text-secondary">
                      <span>{(doc.file_size_bytes / (1024 * 1024)).toFixed(2)} MB</span>
                      <span>·</span>
                      <span>{doc.created_at.slice(0, 10)}</span>
                    </div>
                  </div>
                </div>

                {/* Status row + actions */}
                <div className="flex items-center justify-between gap-2 mt-auto">
                  {renderStatusBadge(doc.status)}

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Retry button for failed */}
                    {isFailed && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => handleReprocess(e, doc.id)}
                        disabled={reprocessMutation.isPending}
                        className="h-7 text-xs font-semibold rounded-lg text-destructive border-destructive/30 hover:bg-destructive/10"
                        title="Retrigger statement extraction"
                      >
                        <RefreshCw
                          className={cn(
                            "h-3 w-3 mr-1",
                            reprocessMutation.isPending && "animate-spin",
                          )}
                        />
                        Retry
                      </Button>
                    )}

                    {/* Open Ledger arrow */}
                    <div className="flex items-center gap-0.5 text-xs font-medium text-text-secondary group-hover:text-foreground">
                      <span className="hidden sm:inline">Ledger</span>
                      <ChevronRight className="h-3.5 w-3.5 text-text-secondary group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>

                {/* User-friendly error callout */}
                {isFailed && doc.error_message && (
                  <div
                    className="flex items-start gap-2 bg-destructive/8 border border-destructive/20 rounded-xl px-3 py-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Info className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-destructive leading-snug">
                        Couldn't extract this statement
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                        {getFriendlyError(doc.error_message)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Extracted Ledger & Metadata Modal */}
      <StatementDetail
        documentId={selectedDocumentId}
        onClose={() => setSelectedDocumentId(null)}
      />
    </section>
  );
}
