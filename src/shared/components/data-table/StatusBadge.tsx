import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

interface StatusBadgeProps {
  status?: string | null;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (!status) {
    return (
      <Badge variant="outline" className={cn("text-[10px] font-mono font-medium text-text-tertiary", className)}>
        —
      </Badge>
    );
  }

  const s = status.trim().toLowerCase();

  let style = "bg-surface-alt text-text-secondary border-border/80";

  if (s === "active") {
    style = "bg-teal-500/10 text-teal-600 border-teal-500/20";
  } else if (s === "inactive") {
    style = "bg-rose-500/10 text-rose-600 border-rose-500/20";
  } else if (s === "notice period" || s === "notice_period" || s === "pending") {
    style = "bg-amber-500/10 text-amber-600 border-amber-500/20";
  } else if (s === "resigned" || s === "terminated" || s === "expired") {
    style = "bg-slate-500/10 text-slate-600 border-slate-500/20";
  } else if (s === "recurring") {
    style = "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
  } else if (s === "one-off" || s === "non-recurring") {
    style = "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }

  return (
    <Badge
      variant="outline"
      className={cn("px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md", style, className)}
    >
      {status}
    </Badge>
  );
}
