import React, { useState } from "react";
import { AlertTriangle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useAppDispatch } from "@/shared/store";
import { setEmployeeFocusedRow } from "@/shared/store/slices/hrSlice";
import type { ValidationIssue } from "../../types/employee";

export function EmployeeValidationPanel({ issues }: { issues: ValidationIssue[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();

  if (!issues || issues.length === 0) return null;

  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");

  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-surface-alt hover:bg-surface-alt/80 transition"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-xs font-bold text-destructive">
              {errors.length}
            </span>
            <span className="text-sm font-semibold text-foreground">Errors</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-600">
              {warnings.length}
            </span>
            <span className="text-sm font-semibold text-foreground">Warnings</span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-text-secondary" />
        ) : (
          <ChevronDown className="h-5 w-5 text-text-secondary" />
        )}
      </button>

      {isOpen && (
        <div className="divide-y divide-border max-h-[300px] overflow-y-auto p-2">
          {errors.map((err, i) => (
            <IssueRow
              key={`err-${i}`}
              issue={err}
              onReview={() => err.rowId && dispatch(setEmployeeFocusedRow(err.rowId))}
            />
          ))}
          {warnings.map((warn, i) => (
            <IssueRow
              key={`warn-${i}`}
              issue={warn}
              onReview={() => warn.rowId && dispatch(setEmployeeFocusedRow(warn.rowId))}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function IssueRow({ issue, onReview }: { issue: ValidationIssue; onReview: () => void }) {
  const isError = issue.severity === "error";
  return (
    <div className="flex items-start justify-between gap-4 p-3 hover:bg-surface-alt/50 rounded-lg transition">
      <div className="flex items-start gap-3">
        {isError ? (
          <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        )}
        <div>
          <p className="text-sm font-medium text-foreground">{issue.message}</p>
          <p className="text-xs text-text-secondary mt-0.5">
            Row {issue.sourceRow} {issue.field ? `• Column: ${issue.field}` : ""}
          </p>
        </div>
      </div>
      <button
        onClick={onReview}
        className="shrink-0 rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition"
      >
        Review
      </button>
    </div>
  );
}
