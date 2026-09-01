import React, { useState } from "react";
import { AlertTriangle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useAppDispatch } from "@/shared/store";
import { setVendorFocusedRow } from "@/shared/store/slices/hrSlice";
import type { VendorValidationIssue } from "../../types/vendor";

export function VendorValidationPanel({ issues }: { issues: VendorValidationIssue[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();

  if (!issues || issues.length === 0) return null;

  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");

  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 bg-surface-alt hover:bg-surface-alt/80 transition"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10 font-mono text-[11px] font-bold text-destructive tabular-nums">
              {errors.length}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Errors</span>
          </div>
          <div className="h-3.5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 font-mono text-[11px] font-bold text-amber-600 tabular-nums">
              {warnings.length}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Warnings</span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-text-secondary" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        )}
      </button>

      {isOpen && (
        <div className="divide-y divide-border max-h-75 overflow-y-auto p-2">
          {errors.map((err, i) => (
            <IssueRow
              key={`err-${i}`}
              issue={err}
              onReview={() => err.rowId && dispatch(setVendorFocusedRow(err.rowId))}
            />
          ))}
          {warnings.map((warn, i) => (
            <IssueRow
              key={`warn-${i}`}
              issue={warn}
              onReview={() => warn.rowId && dispatch(setVendorFocusedRow(warn.rowId))}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function IssueRow({ issue, onReview }: { issue: VendorValidationIssue; onReview: () => void }) {
  const isError = issue.severity === "error";
  return (
    <div className="flex items-start justify-between gap-4 p-2.5 hover:bg-surface-alt/50 rounded-lg transition">
      <div className="flex items-start gap-2.5">
        {isError ? (
          <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
        )}
        <div>
          <p className="text-xs font-medium text-foreground leading-snug">{issue.message}</p>
          <p className="text-[11px] font-mono text-text-tertiary mt-0.5 tabular-nums">
            Row {issue.sourceRow} {issue.field ? `• Column: ${issue.field}` : ""}
          </p>
        </div>
      </div>
      <button
        onClick={onReview}
        className="shrink-0 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-text-secondary hover:bg-surface-alt hover:text-foreground transition"
      >
        Review
      </button>
    </div>
  );
}
