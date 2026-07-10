import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock,
  Bot,
  ArrowRight,
  Trash2,
  FileSearch,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types matching backend response shapes
// ---------------------------------------------------------------------------

export interface DocumentInfo {
  id: string;
  person_id?: string;
  filename: string;
  original_name: string;
  hash_md5: string;
  file_size_bytes: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  error_message?: string | null;
  created_at: string;
  updated_at: string;
}

interface ExtractedData {
  document: DocumentInfo;
  account: {
    bank_name: string;
    account_holder_name: string;
    account_number: string;
    account_type: string;
  } | null;
  transactions: unknown[];
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ExtractionHub({
  personId,
  documents,
  onDocumentsChange,
}: {
  personId?: string;
  documents: DocumentInfo[];
  onDocumentsChange: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [extractedCache, setExtractedCache] = useState<
    Record<string, ExtractedData>
  >({});

  // Poll for documents that are still processing
  useEffect(() => {
    const processing = documents.filter(
      (d) => d.status === "PENDING" || d.status === "PROCESSING"
    );
    if (processing.length === 0) return;

    const interval = setInterval(() => {
      onDocumentsChange();
    }, 3000);

    return () => clearInterval(interval);
  }, [documents, onDocumentsChange]);

  // Fetch extracted data for completed documents
  useEffect(() => {
    const completed = documents.filter(
      (d) => d.status === "COMPLETED" && !extractedCache[d.id]
    );
    completed.forEach(async (doc) => {
      try {
        const data = await api.get<ExtractedData>(
          `/api/statements/${doc.id}/extracted`
        );
        setExtractedCache((prev) => ({ ...prev, [doc.id]: data }));
      } catch {
        // Silently ignore — user can view manually
      }
    });
  }, [documents, extractedCache]);

  const handleUpload = useCallback(
    async (files: FileList | File[]) => {
      const fileArr = Array.from(files);
      if (fileArr.length === 0) return;

      setUploading(true);
      let successCount = 0;
      let errorCount = 0;

      for (const file of fileArr) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          if (personId) {
            formData.append("person_id", personId);
          }

          // Use upload endpoint with query param for person_id
          const url = personId
            ? `/api/statements/upload?person_id=${personId}`
            : "/api/statements/upload";

          await api.upload<DocumentInfo>(url, formData);
          successCount++;
        } catch (err: any) {
          errorCount++;
          const msg = err?.message || "Upload failed";
          toast.error(`${file.name}: ${msg}`);
        }
      }

      if (successCount > 0) {
        toast.success(
          `${successCount} statement${successCount > 1 ? "s" : ""} uploaded & processed!`
        );
        onDocumentsChange();
      }
      if (errorCount > 0 && successCount === 0) {
        toast.error("All uploads failed. Please try again.");
      }

      setUploading(false);
    },
    [personId, onDocumentsChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleUpload(e.dataTransfer.files);
    },
    [handleUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleUpload(e.target.files);
        e.target.value = "";
      }
    },
    [handleUpload]
  );

  const handleDelete = useCallback(
    async (docId: string) => {
      try {
        await api.delete(`/api/statements/${docId}`);
        toast.success("Statement deleted.");
        onDocumentsChange();
        setExtractedCache((prev) => {
          const next = { ...prev };
          delete next[docId];
          return next;
        });
      } catch {
        toast.error("Failed to delete statement.");
      }
    },
    [onDocumentsChange]
  );

  const completedDocs = documents.filter((d) => d.status === "COMPLETED");
  const processingDocs = documents.filter(
    (d) => d.status === "PENDING" || d.status === "PROCESSING"
  );
  const failedDocs = documents.filter((d) => d.status === "FAILED");

  return (
    <section className="card-spot overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-on-brand">
            <FileSearch className="h-3.5 w-3.5" />
          </span>
          Document Extraction
        </h2>
        <div className="flex items-center gap-2">
          {documents.length > 0 && (
            <span className="rounded-pill bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
              {completedDocs.length} extracted
            </span>
          )}
          <Link
            to="/agents"
            className="inline-flex items-center gap-1.5 rounded-pill bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand ring-1 ring-inset ring-brand/20 transition hover:bg-brand/15"
          >
            <Bot className="h-3.5 w-3.5" />
            View agents
          </Link>
        </div>
      </div>

      <div className="p-5">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Upload zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200",
              dragging
                ? "border-brand bg-brand/5 ring-2 ring-brand/30 scale-[1.01]"
                : "border-border hover:border-brand/40 hover:bg-surface-alt/50",
              uploading && "pointer-events-none opacity-60"
            )}
          >
            {uploading ? (
              <>
                <div className="relative">
                  <Loader2 className="h-10 w-10 animate-spin text-brand" />
                </div>
                <p className="text-sm font-medium text-text-primary">
                  Processing statement…
                </p>
                <p className="text-xs text-text-secondary">
                  AI is extracting bank data
                </p>
              </>
            ) : (
              <>
                <div className="rounded-2xl bg-brand/10 p-3">
                  <Upload className="h-8 w-8 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    Drop your bank statement
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    PDF format · Max 20MB
                  </p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1 rounded-pill border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-alt"
                >
                  Browse files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </>
            )}
          </div>

          {/* Documents list */}
          <div className="min-h-[180px]">
            {documents.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-surface-alt/50 px-4 py-8 text-center">
                <FileText className="h-8 w-8 text-text-secondary/40" />
                <p className="mt-3 text-sm font-medium text-text-secondary">
                  No statements yet
                </p>
                <p className="mt-1 text-xs text-text-secondary/80">
                  Upload a bank statement PDF to see your financial data come
                  alive
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Your statements ({documents.length})
                </p>
                <ul className="max-h-[280px] space-y-1.5 overflow-y-auto pr-1">
                  {documents.map((doc) => (
                    <DocumentRow
                      key={doc.id}
                      doc={doc}
                      extracted={extractedCache[doc.id]}
                      onDelete={handleDelete}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Extraction summary bar */}
        {completedDocs.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-surface-alt px-4 py-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-success">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {completedDocs.length} statement
              {completedDocs.length > 1 ? "s" : ""} extracted
            </span>
            {processingDocs.length > 0 && (
              <span className="flex items-center gap-1.5 font-medium text-brand">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {processingDocs.length} processing
              </span>
            )}
            {failedDocs.length > 0 && (
              <span className="flex items-center gap-1.5 font-medium text-danger">
                <AlertCircle className="h-3.5 w-3.5" />
                {failedDocs.length} failed
              </span>
            )}
            {/* Bank summary from extracted data */}
            {Object.values(extractedCache).length > 0 && (
              <span className="ml-auto text-text-secondary">
                Banks:{" "}
                {Array.from(
                  new Set(
                    Object.values(extractedCache)
                      .filter((e) => e.account)
                      .map((e) => e.account!.bank_name)
                  )
                ).join(" · ")}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Document row
// ---------------------------------------------------------------------------

function DocumentRow({
  doc,
  extracted,
  onDelete,
}: {
  doc: DocumentInfo;
  extracted?: ExtractedData;
  onDelete: (id: string) => void;
}) {
  const statusConfig = {
    PENDING: {
      icon: Clock,
      label: "Pending",
      color: "text-text-secondary",
      bg: "bg-surface-alt",
    },
    PROCESSING: {
      icon: Loader2,
      label: "Extracting…",
      color: "text-brand",
      bg: "bg-brand/10",
    },
    COMPLETED: {
      icon: CheckCircle2,
      label: "Extracted",
      color: "text-success",
      bg: "bg-success/10",
    },
    FAILED: {
      icon: AlertCircle,
      label: "Failed",
      color: "text-danger",
      bg: "bg-danger/10",
    },
  };

  const st = statusConfig[doc.status];
  const StIcon = st.icon;
  const isSpinning = doc.status === "PROCESSING" || doc.status === "PENDING";

  return (
    <li className="group flex items-center gap-3 rounded-xl bg-surface px-3 py-2.5 ring-1 ring-inset ring-border/60 transition hover:ring-border">
      {/* Status icon */}
      <span className={cn("shrink-0 rounded-lg p-1.5", st.bg)}>
        <StIcon
          className={cn(
            "h-4 w-4",
            st.color,
            isSpinning && "animate-spin"
          )}
        />
      </span>

      {/* File info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">
          {doc.original_name}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-text-secondary">
          <span className={cn("font-medium", st.color)}>{st.label}</span>
          {extracted?.account && (
            <>
              <span>·</span>
              <span className="font-medium">
                {extracted.account.bank_name}
              </span>
              <span>·</span>
              <span>
                {extracted.transactions.length} txns
              </span>
            </>
          )}
          {!extracted && doc.status === "COMPLETED" && (
            <>
              <span>·</span>
              <span>Ready</span>
            </>
          )}
          {doc.error_message && (
            <>
              <span>·</span>
              <span className="text-danger truncate max-w-[200px]">{doc.error_message}</span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
        {doc.status === "FAILED" && (
          <button
            onClick={async () => {
              try {
                await api.post(`/api/statements/${doc.id}/reprocess`);
                toast.success("Reprocessing started…");
              } catch {
                toast.error("Reprocess failed.");
              }
            }}
            className="rounded-lg p-1.5 text-text-secondary transition hover:bg-surface-alt hover:text-brand"
            title="Reprocess"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          onClick={() => onDelete(doc.id)}
          className="rounded-lg p-1.5 text-text-secondary transition hover:bg-danger/10 hover:text-danger"
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  );
}
