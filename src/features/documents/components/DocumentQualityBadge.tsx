import { Badge } from "@/shared/components/ui/badge";
import { ShieldCheck, AlertTriangle, HelpCircle } from "lucide-react";
import type { CompanyDocument } from "@/shared/types/api";

export interface DocumentQualityBadgeProps {
  document: CompanyDocument;
}

export function DocumentQualityBadge({ document }: DocumentQualityBadgeProps) {
  if (document.quality_score === null) {
    return (
      <Badge
        variant="outline"
        className="bg-muted/50 text-muted-foreground border-border/60 text-[11px] font-medium gap-1"
      >
        <HelpCircle className="h-3 w-3" />
        Not checked
      </Badge>
    );
  }

  if (document.is_verified) {
    return (
      <Badge
        variant="outline"
        className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[11px] font-semibold gap-1"
      >
        <ShieldCheck className="h-3 w-3" />
        Verified
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[11px] font-semibold gap-1"
    >
      <AlertTriangle className="h-3 w-3" />
      Needs attention
    </Badge>
  );
}
