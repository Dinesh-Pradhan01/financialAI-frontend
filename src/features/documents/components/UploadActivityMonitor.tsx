import React, { useState, useRef } from "react";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  RotateCw,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  UploadCloud,
  HelpCircle,
  Trash2,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { formatFileSize, formatDocumentType } from "../lib/presentationModel";
import type { UploadQueueItem, useUploadQueue } from "../hooks/useUploadQueue";
import { cn } from "@/shared/lib/utils";

export interface UploadActivityMonitorProps {
  queue: ReturnType<typeof useUploadQueue>;
  onOpenUploadModal?: () => void;
  className?: string;
}

type TabKey = "all" | "in-progress" | "queued" | "failed" | "completed";

export function UploadActivityMonitor({
  queue,
  onOpenUploadModal,
  className,
}: Readonly<UploadActivityMonitorProps>) {
  const {
    items,
    inProgressItems,
    queuedItems,
    failedItems,
    recentCompleted,
    cancel,
    retry,
    dismissItem,
    clearCompleted,
    clearFailed,
    activeCount,
    queuedCount,
    failedCount,
    completedCount,
    hasActiveJobs,
    hasFailedJobs,
    hasInterruptedJobs,
  } = queue;

  // Collapse / expand state
  const [isExpanded, setIsExpanded] = useState(true);

  // Active tab filter
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    if (failedCount > 0) return "failed";
    if (activeCount > 0) return "in-progress";
    if (queuedCount > 0) return "queued";
    return "all";
  });

  // Hidden file input for re-selecting files on interrupted uploads
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingRetryIdRef = useRef<string | null>(null);

  // If there are zero items in the queue, do not occupy any space
  if (items.length === 0) {
    return null;
  }

  const handleTriggerReupload = (id: string) => {
    pendingRetryIdRef.current = id;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetId = pendingRetryIdRef.current;
    if (file && targetId) {
      retry(targetId, file);
    }
    pendingRetryIdRef.current = null;
  };

  // Determine filtered list based on active tab
  const displayItems: UploadQueueItem[] = (() => {
    switch (activeTab) {
      case "in-progress":
        return inProgressItems;
      case "queued":
        return queuedItems;
      case "failed":
        return failedItems;
      case "completed":
        return recentCompleted;
      case "all":
      default:
        return items;
    }
  })();

  return (
    <section
      aria-label="Upload activity monitor"
      className={cn(
        "rounded-2xl border border-border-c bg-surface shadow-2xs overflow-hidden transition-all duration-200",
        className,
      )}
    >
      {/* Hidden file input for interrupted upload recovery */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFilePicked}
      />

      {/* 1. Header Bar with Status Badges and Accordion Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-surface border-b border-border-c/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            {hasActiveJobs ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : hasFailedJobs ? (
              <AlertCircle className="h-4 w-4 text-destructive" />
            ) : (
              <UploadCloud className="h-4 w-4" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                Upload &amp; Pipeline Activity
              </h2>
              <span className="text-[11px] font-mono tabular-nums text-text-tertiary">
                ({items.length} {items.length === 1 ? "document" : "documents"})
              </span>
            </div>

            <p className="text-[11px] text-text-secondary truncate mt-0.5">
              {hasActiveJobs && (
                <span className="text-brand font-medium">
                  {activeCount > 0 ? "Actively verifying & indexing filings" : "Jobs waiting in queue"}
                </span>
              )}
              {!hasActiveJobs && hasFailedJobs && (
                <span className="text-destructive font-medium">
                  {failedCount} {failedCount === 1 ? "filing needs attention" : "filings need attention"}
                </span>
              )}
              {!hasActiveJobs && !hasFailedJobs && (
                <span className="text-success font-medium">
                  All queued documents verified and recorded
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Controls & Metric Badges */}
        <div className="flex items-center gap-2">
          {/* Quick Clear Buttons */}
          {failedCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFailed}
              className="h-7 px-2 text-[11px] text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
              title="Dismiss all failed entries"
            >
              Clear Failed ({failedCount})
            </Button>
          )}

          {completedCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearCompleted}
              className="h-7 px-2 text-[11px] text-text-tertiary hover:text-text-primary rounded-lg cursor-pointer"
              title="Clear completed logs from list"
            >
              Clear Completed
            </Button>
          )}

          {/* Expand / Collapse Chevron */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="h-7 w-7 p-0 rounded-lg text-text-tertiary hover:text-text-primary cursor-pointer"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse activity monitor" : "Expand activity monitor"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 2. Expanded Body Content */}
      {isExpanded && (
        <div className="space-y-3 p-4 bg-surface-alt/40">
          {/* Interrupted Uploads Persistence Callout */}
          {hasInterruptedJobs && (
            <div className="flex items-start gap-3 rounded-xl border border-severity-moderate/40 bg-severity-moderate/10 p-3 text-xs">
              <AlertCircle className="h-4 w-4 text-severity-moderate shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-text-primary">
                  Previous Upload Session Was Interrupted
                </p>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  The browser was closed or reloaded while transmitting document payloads. Because file
                  binaries are discarded by browsers on reload, click{" "}
                  <strong className="text-text-primary">&ldquo;Re-select &amp; Retry&rdquo;</strong> next to each interrupted
                  document to resume statutory verification.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Filter Tabs */}
          <div className="flex items-center gap-1.5 border-b border-border-c/70 pb-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap",
                activeTab === "all"
                  ? "bg-brand text-white shadow-2xs"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60",
              )}
            >
              <span>All</span>
              <span className="font-mono text-[10px] tabular-nums opacity-80">
                {items.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("in-progress")}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap",
                activeTab === "in-progress"
                  ? "bg-brand text-white shadow-2xs"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60",
              )}
            >
              {activeCount > 0 && <Loader2 className="h-3 w-3 animate-spin shrink-0" />}
              <span>In Progress</span>
              <span className="font-mono text-[10px] tabular-nums opacity-80">
                {activeCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("queued")}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap",
                activeTab === "queued"
                  ? "bg-brand text-white shadow-2xs"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60",
              )}
            >
              <Clock className="h-3 w-3 shrink-0" />
              <span>Queued</span>
              <span className="font-mono text-[10px] tabular-nums opacity-80">
                {queuedCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("failed")}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap",
                activeTab === "failed"
                  ? "bg-destructive text-white shadow-2xs"
                  : failedCount > 0
                    ? "bg-destructive/10 text-destructive border border-destructive/30"
                    : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60",
              )}
            >
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>Failed</span>
              <span className="font-mono text-[10px] tabular-nums opacity-80">
                {failedCount}
              </span>
            </button>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("completed")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap",
                  activeTab === "completed"
                    ? "bg-success text-white shadow-2xs"
                    : "bg-surface text-text-secondary hover:text-text-primary border border-border-c/60",
                )}
              >
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                <span>Ready</span>
                <span className="font-mono text-[10px] tabular-nums opacity-80">
                  {completedCount}
                </span>
              </button>
            )}
          </div>

          {/* List of Tracked Files */}
          {displayItems.length === 0 ? (
            <div className="py-6 text-center text-xs text-text-tertiary">
              No files currently matching the &ldquo;{activeTab}&rdquo; filter.
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {displayItems.map((item, idx) => {
                const isItemUploading = item.status === "uploading";
                const isItemProcessing = item.status === "processing";
                const isItemQueued = item.status === "queued";
                const isItemError = item.status === "error";
                const isItemDone = item.status === "done";

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-3 transition-colors",
                      isItemError
                        ? "border-destructive/30 bg-destructive/5"
                        : isItemProcessing || isItemUploading
                          ? "border-brand/30 bg-brand/5"
                          : isItemDone
                            ? "border-success/30 bg-surface"
                            : "border-border-c/80 bg-surface",
                    )}
                  >
                    {/* Left: File Icon + File Info + Stage Message */}
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-0.5",
                          isItemError
                            ? "bg-destructive/15 text-destructive"
                            : isItemProcessing
                              ? "bg-severity-moderate/15 text-severity-moderate animate-pulse"
                              : isItemUploading
                                ? "bg-brand/15 text-brand"
                                : isItemDone
                                  ? "bg-success/15 text-success"
                                  : "bg-border-c/40 text-text-tertiary",
                        )}
                      >
                        {isItemUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isItemProcessing ? (
                          <Sparkles className="h-4 w-4 animate-pulse" />
                        ) : isItemError ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : isItemDone ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="text-xs font-semibold text-text-primary font-mono truncate max-w-xs sm:max-w-sm"
                            title={item.fileName}
                          >
                            {item.fileName}
                          </span>

                          <span className="text-[10px] font-mono tabular-nums text-text-tertiary">
                            {formatFileSize(item.fileSize)}
                          </span>

                          {item.documentType && (
                            <Badge
                              variant="outline"
                              className="text-[10px] h-4 px-1.5 bg-surface text-text-secondary border-border-c"
                            >
                              {formatDocumentType(item.documentType)}
                            </Badge>
                          )}
                        </div>

                        {/* Stage Progress / Verifying Note */}
                        <div className="text-[11px] leading-snug">
                          {isItemUploading && (
                            <span className="text-brand font-medium">
                              {item.stage || "Uploading binary payload to secure vault…"}
                            </span>
                          )}

                          {isItemProcessing && (
                            <div className="space-y-0.5">
                              <span className="text-brand font-medium flex items-center gap-1.5">
                                <Loader2 className="h-3 w-3 animate-spin shrink-0" />
                                {item.stage || "Classifying document & running statutory verification…"}
                              </span>
                              {item.verifyingMessage && (
                                <p className="text-[10px] text-text-tertiary animate-pulse italic">
                                  {item.verifyingMessage}
                                </p>
                              )}
                            </div>
                          )}

                          {isItemQueued && (
                            <span className="text-text-secondary">
                              Position ({idx + 1}) in queue &bull; Waiting for worker slot&hellip;
                            </span>
                          )}

                          {isItemDone && (
                            <span className="text-success font-medium">
                              Verified &amp; stored in vault
                              {item.uploadedDocument?.document_type && (
                                <span className="text-text-tertiary ml-1 font-normal">
                                  ({formatDocumentType(item.uploadedDocument.document_type)})
                                </span>
                              )}
                            </span>
                          )}

                          {/* Failure Diagnosis */}
                          {isItemError && (
                            <div className="mt-1 rounded-lg border border-destructive/20 bg-destructive/10 p-2 text-destructive space-y-1">
                              <div className="flex items-center gap-1 font-semibold text-[11px]">
                                <AlertCircle className="h-3 w-3 shrink-0" />
                                <span>Problem Diagnosis:</span>
                              </div>
                              <p className="text-[11px] text-text-secondary font-mono leading-relaxed">
                                {item.errorMessage || "Unknown verification or network failure occurred."}
                              </p>
                              {item.errorMessage?.toLowerCase().includes("duplicate") && (
                                <p className="text-[10px] text-text-tertiary italic">
                                  Tip: This file appears to already exist in the corporate vault.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Contextual Action Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      {isItemQueued && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => cancel(item.id)}
                          className="h-7 px-2.5 text-xs text-text-tertiary hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer gap-1"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Cancel</span>
                        </Button>
                      )}

                      {isItemError && (
                        <>
                          {item.isInterrupted ? (
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => handleTriggerReupload(item.id)}
                              className="h-7 px-2.5 text-xs bg-brand hover:bg-brand/90 text-white rounded-lg cursor-pointer gap-1 font-semibold shadow-2xs"
                            >
                              <RotateCw className="h-3 w-3" />
                              <span>Re-select &amp; Retry</span>
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => retry(item.id)}
                              className="h-7 px-2.5 text-xs bg-brand hover:bg-brand/90 text-white rounded-lg cursor-pointer gap-1 font-semibold shadow-2xs"
                            >
                              <RotateCw className="h-3 w-3" />
                              <span>Retry Upload</span>
                            </Button>
                          )}

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissItem(item.id)}
                            className="h-7 w-7 p-0 text-text-tertiary hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
                            title="Dismiss error"
                            aria-label="Dismiss error"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}

                      {isItemDone && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissItem(item.id)}
                          className="h-7 w-7 p-0 text-text-tertiary hover:text-text-primary rounded-lg cursor-pointer"
                          title="Dismiss completed notification"
                          aria-label="Dismiss completed"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
