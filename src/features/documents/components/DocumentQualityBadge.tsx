import { Badge } from "@/shared/components/ui/badge";
import { ShieldCheck, HelpCircle, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { getQualityPresentation } from "../lib/documentPresentation";
import type { CompanyDocument } from "@/shared/types/api";

export interface DocumentQualityBadgeProps {
  document: CompanyDocument;
  showTooltip?: boolean;
}

export function DocumentQualityBadge({
  document,
  showTooltip = true,
}: DocumentQualityBadgeProps) {
  const quality = getQualityPresentation(document);
  const notes = document.verification_notes?.trim() || null;

  const badgeElement =
    quality.status === "passed" ? (
      <Badge
        variant="outline"
        className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[11px] font-semibold gap-1 shrink-0 select-none"
      >
        <ShieldCheck className="h-3 w-3" />
        {quality.label}
        {notes && <Info className="h-2.5 w-2.5 opacity-70 ml-0.5" />}
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="bg-muted/50 text-muted-foreground border-border/60 text-[11px] font-medium gap-1 shrink-0 select-none"
      >
        <HelpCircle className="h-3 w-3" />
        {quality.label}
        {notes && <Info className="h-2.5 w-2.5 opacity-70 ml-0.5" />}
      </Badge>
    );

  if (showTooltip && notes) {
    return (
      <Popover>
        <PopoverTrigger
          asChild
          className="cursor-pointer focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none rounded-md"
        >
          <button
            type="button"
            className="inline-flex items-center gap-1 p-0 border-0 bg-transparent text-left"
            aria-label={`${quality.label} - View verification details`}
            title="Click or tap to view verification details"
          >
            {badgeElement}
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="center"
          className="max-w-xs text-xs p-3 shadow-md bg-surface border border-border"
        >
          <div className="space-y-1.5">
            <p className="font-semibold text-xs flex items-center gap-1.5 text-text-primary">
              <Info className="h-3.5 w-3.5 text-brand shrink-0" />
              Verification Details
            </p>
            <p className="text-text-secondary leading-relaxed text-[11px] break-words">
              {notes}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return badgeElement;
}
