import {
  Info,
  HelpCircle,
  ShieldCheck,
  UserCheck,
  Calendar,
  FileText,
  Layers,
  FileCheck2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { formatDocumentDate, formatFileSize } from "../lib/documentPresentation";
import { getDocumentExplanation, isMultiInstanceDocumentType } from "../lib/documentExplanations";
import { cn } from "@/shared/lib/utils";
import type { TaxonomyDocument } from "../lib/documentTaxonomy";

export interface DocumentInfoPopoverProps {
  mode?: "guidance" | "metadata" | "all" | "taxonomy";
  taxonomyDocument?: TaxonomyDocument | null;
  detailLabel?: string;
  instanceCount?: number;
  guidance?: {
    why?: string;
    equivalents?: string;
  };
  metadata?: {
    uploadedBy?: string | number | null;
    uploadedAt?: string | null;
    qualityScore?: number | null;
    verificationNotes?: string | null;
    originalName?: string;
    fileSizeBytes?: number;
    documentType?: string;
  };
  className?: string;
  triggerClassName?: string;
}

export function DocumentInfoPopover({
  mode = "all",
  taxonomyDocument,
  detailLabel = "Applies to",
  instanceCount,
  guidance,
  metadata,
  className,
  triggerClassName,
}: DocumentInfoPopoverProps) {
  const docKey = taxonomyDocument?.key || metadata?.documentType;
  const explanation = getDocumentExplanation(docKey);
  const isMultiInstance = isMultiInstanceDocumentType(docKey);

  const hasTaxonomy = Boolean(taxonomyDocument);
  const hasExplanation = Boolean(explanation);
  const hasGuidance = Boolean(guidance?.why || guidance?.equivalents);
  const hasMetadata = Boolean(
    metadata?.uploadedAt ||
      metadata?.originalName ||
      (metadata?.qualityScore !== undefined && metadata?.qualityScore !== null) ||
      metadata?.verificationNotes
  );

  if (!hasTaxonomy && !hasExplanation && !hasGuidance && !hasMetadata) {
    return null;
  }

  const isGuidanceOnly = mode === "guidance" && !hasTaxonomy && !hasMetadata && !hasExplanation;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="View document information, purpose, and filing requirements"
          title="Document details & purpose"
          className={cn(
            "inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full text-text-tertiary hover:bg-brand/10 hover:text-brand transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring select-none",
            triggerClassName,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {isGuidanceOnly ? (
            <HelpCircle className="h-3.5 w-3.5 text-text-tertiary hover:text-brand" />
          ) : (
            <Info className="h-3.5 w-3.5 text-text-tertiary hover:text-brand" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        sideOffset={6}
        collisionPadding={16}
        className={cn(
          "w-80 sm:w-92 text-xs p-4 shadow-xl bg-surface border border-border rounded-2xl z-50",
          "max-h-[min(78vh,500px)] overflow-y-auto overscroll-contain space-y-3",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-border/70 pb-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
            <Info className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="font-bold text-xs text-text-primary tracking-tight truncate">
              {taxonomyDocument?.label ?? metadata?.originalName ?? "Document Information"}
            </h5>
          </div>
        </div>

        {/* 1. FILE METADATA SECTION (First Priority when available) */}
        {hasMetadata && (
          <div className="space-y-2 rounded-xl bg-surface-alt/60 p-3 border border-border/70">
            <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-1.5">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="h-3.5 w-3.5 text-emerald-500" />
                Active File Metadata
              </span>
              {metadata?.qualityScore !== null && metadata?.qualityScore !== undefined && (
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <ShieldCheck className="h-3 w-3" />
                  {metadata.qualityScore}% Quality
                </span>
              )}
            </div>

            <div className="space-y-1.5 text-[11px]">
              {metadata?.originalName && (
                <div className="flex items-start justify-between gap-2">
                  <span className="text-text-tertiary flex items-center gap-1 shrink-0">
                    <FileText className="h-3 w-3" /> File
                  </span>
                  <span
                    className="font-medium text-text-primary text-right truncate max-w-42.5"
                    title={metadata.originalName}
                  >
                    {metadata.originalName}
                  </span>
                </div>
              )}

              {metadata?.fileSizeBytes !== undefined && (
                <div className="flex items-start justify-between gap-2">
                  <span className="text-text-tertiary">Size</span>
                  <span className="font-mono text-text-secondary">
                    {formatFileSize(metadata.fileSizeBytes)}
                  </span>
                </div>
              )}

              {metadata?.uploadedAt && (
                <div className="flex items-start justify-between gap-2">
                  <span className="text-text-tertiary flex items-center gap-1 shrink-0">
                    <Calendar className="h-3 w-3" /> Uploaded on
                  </span>
                  <span className="font-mono text-text-secondary text-right">
                    {formatDocumentDate(metadata.uploadedAt)}
                  </span>
                </div>
              )}

              {metadata?.uploadedBy !== undefined && metadata?.uploadedBy !== null && (
                <div className="flex items-start justify-between gap-2">
                  <span className="text-text-tertiary flex items-center gap-1 shrink-0">
                    <UserCheck className="h-3 w-3" /> Uploaded by
                  </span>
                  <span className="font-medium text-text-primary text-right">
                    {typeof metadata.uploadedBy === "number"
                      ? `User #${metadata.uploadedBy}`
                      : metadata.uploadedBy || "System"}
                  </span>
                </div>
              )}

              {metadata?.verificationNotes && (
                <div className="space-y-1 pt-1.5 border-t border-border/40">
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">
                    Verification Notes
                  </span>
                  <p className="text-text-secondary text-[11px] leading-relaxed wrap-break-word bg-surface p-2 rounded-lg border border-border/50">
                    {metadata.verificationNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. ABOUT THE FILE / EXPLANATION SECTION */}
        {explanation && (
          <div className="space-y-2 text-[11px]">
            <div className="space-y-1 bg-surface-alt/40 p-2.5 rounded-xl border border-border/50">
              <span className="text-[10px] font-bold text-brand uppercase tracking-wider block">
                What is this document?
              </span>
              <p className="text-text-primary leading-relaxed">
                {explanation.whatIsIt}
              </p>
            </div>

            <div className="space-y-1 bg-surface-alt/40 p-2.5 rounded-xl border border-border/50">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                Why is it needed?
              </span>
              <p className="text-text-secondary leading-relaxed">
                {explanation.whyNeeded}
              </p>
            </div>
          </div>
        )}

        {/* Multi-Instance Guidance & Counts */}
        {instanceCount !== undefined && instanceCount > 1 ? (
          <div className="bg-brand/5 border border-brand/20 p-2.5 rounded-xl text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[10px] text-brand uppercase tracking-wider">
              <Layers className="h-3 w-3" />
              <span>Multiple Records ({instanceCount} Files)</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              You have {instanceCount} files on record for this slot. View and manage all files in the Document Registry tab.
            </p>
          </div>
        ) : isMultiInstance ? (
          <div className="bg-surface-alt/40 border border-border/50 p-2.5 rounded-xl text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[10px] text-text-tertiary uppercase tracking-wider">
              <Layers className="h-3 w-3" />
              <span>Multiple Accounts / Periods</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              If you have multiple accounts or periods, you can upload a combined PDF here, or manage files in the Document Registry.
            </p>
          </div>
        ) : null}

        {/* Applicability & Requirement Scope */}
        {taxonomyDocument && (
          <div className="space-y-1.5 text-[11px] pt-0.5 border-t border-border/50">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-semibold text-text-tertiary uppercase">
                {detailLabel}
              </span>
              <span className="text-text-primary font-medium text-right text-[11px]">
                {taxonomyDocument.detail}
              </span>
            </div>

            {taxonomyDocument.sourceStatus && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[10px] font-semibold text-text-tertiary uppercase">
                  Status
                </span>
                <span className="font-semibold text-text-primary">
                  {taxonomyDocument.sourceStatus}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Extra Guidance Details (if provided) */}
        {guidance?.why && !explanation && (
          <div className="space-y-0.5 text-[11px]">
            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
              Why SpotLite needs this
            </span>
            <p className="text-text-secondary leading-relaxed">
              {guidance.why}
            </p>
          </div>
        )}

        {guidance?.equivalents && (
          <div className="space-y-0.5 text-[11px]">
            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
              Accepted Alternatives
            </span>
            <p className="text-text-secondary leading-relaxed">
              {guidance.equivalents}
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
