import React from "react";
import { Info, HelpCircle, ShieldCheck, UserCheck, Calendar, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { formatDocumentDate } from "../lib/documentPresentation";
import { cn } from "@/shared/lib/utils";

export interface DocumentInfoPopoverProps {
  mode: "guidance" | "metadata";
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
  mode,
  guidance,
  metadata,
  className,
  triggerClassName,
}: DocumentInfoPopoverProps) {
  if (mode === "guidance" && !guidance?.why && !guidance?.equivalents) {
    return null;
  }

  const isGuidance = mode === "guidance";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={
            isGuidance
              ? "View filing requirements and guidance"
              : "View upload metadata and audit details"
          }
          title={
            isGuidance
              ? "Filing guidance & accepted alternatives"
              : "Upload attribution & verification details"
          }
          className={cn(
            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-text-tertiary hover:bg-surface-alt hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring select-none",
            triggerClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {isGuidance ? (
            <HelpCircle className="h-3.5 w-3.5 text-text-tertiary hover:text-brand" />
          ) : (
            <Info className="h-3.5 w-3.5 text-text-tertiary hover:text-brand" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        className={cn(
          "w-72 sm:w-80 text-xs p-3.5 shadow-lg bg-surface border border-border rounded-xl space-y-2.5 z-50",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {isGuidance ? (
          /* Guidance Content Mode */
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 border-b border-border/60 pb-1.5">
              <HelpCircle className="h-4 w-4 text-brand shrink-0" />
              <h5 className="font-semibold text-xs text-text-primary">
                Filing Guidance
              </h5>
            </div>

            {guidance?.why && (
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  Why we need this
                </span>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  {guidance.why}
                </p>
              </div>
            )}

            {guidance?.equivalents && (
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  Also accepted
                </span>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  {guidance.equivalents}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Metadata Content Mode */
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 border-b border-border/60 pb-1.5">
              <Info className="h-4 w-4 text-brand shrink-0" />
              <h5 className="font-semibold text-xs text-text-primary">
                Document Details
              </h5>
            </div>

            <div className="space-y-1.5 text-[11px]">
              {/* Uploaded By */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-text-tertiary flex items-center gap-1 shrink-0">
                  <UserCheck className="h-3 w-3" /> Uploaded by
                </span>
                <span className="font-medium text-text-primary text-right">
                  {metadata?.uploadedBy !== null && metadata?.uploadedBy !== undefined
                    ? typeof metadata.uploadedBy === "number"
                      ? `User #${metadata.uploadedBy}`
                      : metadata.uploadedBy
                    : "System / Onboarding"}
                </span>
              </div>

              {/* Uploaded On */}
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

              {/* Quality Score */}
              {metadata?.qualityScore !== null && metadata?.qualityScore !== undefined && (
                <div className="flex items-start justify-between gap-2">
                  <span className="text-text-tertiary flex items-center gap-1 shrink-0">
                    <ShieldCheck className="h-3 w-3 text-success" /> Quality score
                  </span>
                  <span className="font-mono font-semibold text-text-primary text-right">
                    {metadata.qualityScore}% (Automated)
                  </span>
                </div>
              )}

              {/* Verification Notes */}
              {metadata?.verificationNotes && (
                <div className="space-y-0.5 pt-1 border-t border-border/40">
                  <span className="text-[10px] font-semibold text-text-tertiary uppercase">
                    Verification notes
                  </span>
                  <p className="text-text-secondary text-[11px] leading-relaxed break-words bg-surface-alt/40 p-2 rounded-lg border border-border/40">
                    {metadata.verificationNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
