import React, { useState } from "react";
import { AlertTriangle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useAppDispatch } from "@/shared/store";
import { setVendorFocusedRow } from "@/shared/store/slices/cfoSlice";
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
          {errors.map((issue) => (
            <div
              key={issue.id}
              onClick={() => {
                if (issue.rowId) dispatch(setVendorFocusedRow(issue.rowId));
              }}
              className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-destructive/5 transition cursor-pointer"
            >
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {issue.sourceRow && (
                    <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-destructive/10 text-destructive">
                      Row {issue.sourceRow}
                    </span>
                  )}
                  {issue.field && (
                    <span className="text-xs font-semibold text-foreground">
                      Field: {String(issue.field)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">{issue.message}</p>
              </div>
            </div>
          ))}

          {warnings.map((issue) => (
            <div
              key={issue.id}
              onClick={() => {
                if (issue.rowId) dispatch(setVendorFocusedRow(issue.rowId));
              }}
              className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-amber-500/5 transition cursor-pointer"
            >
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {issue.sourceRow && (
                    <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600">
                      Row {issue.sourceRow}
                    </span>
                  )}
                  {issue.field && (
                    <span className="text-xs font-semibold text-foreground">
                      Field: {String(issue.field)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">{issue.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
