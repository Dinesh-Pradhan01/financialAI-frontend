import React, { useState, useMemo, useCallback } from "react";
import { ChevronDown, ChevronUp, Info, Download, Copy, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import type {
  FinancialPeriodRowDTO,
  AnnualFinancialRowDTO,
  FinancialTableRowViewModel,
} from "../types/industry";
import { buildFinancialTableViewModel } from "../mappers/mapFinancials";
import { EM_DASH } from "../presentation/industryPresentation";

interface FinancialsTableProps {
  periods: (FinancialPeriodRowDTO | AnnualFinancialRowDTO)[];
  isAnnual?: boolean;
  companyName?: string;
  className?: string;
}

/**
 * Generates an Excel-friendly CSV with UTF-8 BOM.
 */
function generateFinancialsCSV(periodLabels: string[], rows: FinancialTableRowViewModel[]): string {
  const bom = "\uFEFF";
  const header = ["Metric", ...periodLabels].map((h) => `"${h.replace(/"/g, '""')}"`).join(",");
  const body = rows.map((r) => {
    const cells = [
      `"${r.label.replace(/"/g, '""')}"`,
      ...periodLabels.map((p) => {
        const val = r.valuesByPeriod[p] ?? "—";
        return `"${val.replace(/"/g, '""')}"`;
      }),
    ];
    return cells.join(",");
  });
  return bom + [header, ...body].join("\r\n");
}

/**
 * Generates tab-separated values (TSV) for direct paste into Excel or Google Sheets.
 */
function generateFinancialsTSV(periodLabels: string[], rows: FinancialTableRowViewModel[]): string {
  const header = ["Metric", ...periodLabels].join("\t");
  const body = rows.map((r) => {
    const cells = [r.label, ...periodLabels.map((p) => r.valuesByPeriod[p] ?? "—")];
    return cells.join("\t");
  });
  return [header, ...body].join("\r\n");
}

/**
 * FinancialsTable
 *
 * Institutional financial statement data table.
 *
 * Requirements:
 * - Caption: "₹ in crore"
 * - First column (metric label) is sticky on horizontal scroll.
 * - Header row uses design system token colors.
 * - Latest 5 periods shown by default with a "Show all N periods" toggle.
 * - Right-aligned tabular numerals (font-mono tabular-nums).
 * - Rows driven by FINANCIAL_TABLE_ROW_CONFIGS.
 * - Rows null across all shown periods are hidden, and a footnote lists them:
 *   "Not reported in the available data: Other income, Interest"
 * - Costs display as positive numbers via DISPLAY_COSTS_AS_POSITIVE.
 * - Annual basis ("Reported" / "Rolled up from quarters") shown per column header and legend.
 * - Institutional utilities: Export to CSV and Copy Table (TSV) for spreadsheets.
 * - Accessible scroll container region with keyboard navigation support.
 */
export const FinancialsTable: React.FC<FinancialsTableProps> = React.memo(function FinancialsTable({
  periods,
  isAnnual = false,
  companyName,
  className,
}) {
  const totalPeriodsCount = periods.length;
  const hasMoreThanFive = totalPeriodsCount > 5;

  const [showAllPeriods, setShowAllPeriods] = useState(false);
  const [copied, setCopied] = useState(false);

  // Build view model based on active window (5 or all)
  const tableData = useMemo(() => {
    const maxPeriods = showAllPeriods ? 0 : 5;
    return buildFinancialTableViewModel(periods, { maxPeriods });
  }, [periods, showAllPeriods]);

  // Fast lookup for period basis in annual statements
  const periodBasisMap = useMemo(() => {
    const map: Record<string, string | null> = {};
    for (const p of periods) {
      map[p.period_label] = "basis" in p && p.basis ? p.basis : null;
    }
    return map;
  }, [periods]);

  const handleCopyTable = useCallback(() => {
    const tsv = generateFinancialsTSV(tableData.periodLabels, tableData.rows);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(tsv).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [tableData]);

  const handleExportCSV = useCallback(() => {
    const csv = generateFinancialsCSV(tableData.periodLabels, tableData.rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeName = (companyName || "financials").replace(/[^a-zA-Z0-9_-]/g, "_");
    link.download = `${safeName}_${isAnnual ? "annual" : "quarterly"}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [tableData, isAnnual, companyName]);

  if (totalPeriodsCount === 0) {
    return (
      <div className="rounded-xl border border-border-c bg-surface p-8 text-center text-xs text-text-secondary">
        No financial statement periods are available for this company.
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Table Utility Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="text-xs text-text-tertiary">
          Denomination: <span className="font-semibold text-text-secondary">₹ in crore</span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyTable}
            aria-label="Copy table data to clipboard for Excel or Google Sheets"
            className="gap-1.5 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-severity-low" aria-hidden="true" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-text-tertiary" aria-hidden="true" />
                <span>Copy Table</span>
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            aria-label="Export financial statement table as CSV"
            className="gap-1.5 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            <Download className="h-3.5 w-3.5 text-text-tertiary" aria-hidden="true" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Table Container with native horizontal scroll */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Financial statements table"
        className="overflow-x-auto rounded-xl border border-border-c bg-surface shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        <table className="w-full text-left border-collapse min-w-2xl">
          <caption className="py-2.5 px-4 text-left text-xs font-semibold text-text-tertiary border-b border-border-c bg-surface-alt/30">
            Financial statements (₹ in crore)
          </caption>

          <thead>
            <tr className="border-b border-border-c bg-surface-alt/60">
              {/* 1. First Column (Sticky Metric Label) */}
              <th
                scope="col"
                className="sticky left-0 z-20 bg-surface-alt/90 backdrop-blur-xs py-3 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary text-left border-r border-border-c w-56 sm:w-64 shrink-0 shadow-xs"
              >
                Metric
              </th>

              {/* 2. Dynamic Period Columns (Latest First) */}
              {tableData.periodLabels.map((periodLabel) => {
                const basis = isAnnual ? periodBasisMap[periodLabel] : null;

                return (
                  <th
                    key={periodLabel}
                    scope="col"
                    className="py-3 px-4 text-xs font-semibold text-text-secondary text-right whitespace-nowrap min-w-32"
                  >
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-mono text-text-primary text-xs tracking-tight">
                        {periodLabel}
                      </span>
                      {basis && (
                        <span className="text-xs uppercase font-mono tracking-wider text-text-tertiary">
                          {basis === "reported" ? "Reported" : "Rolled up"}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-border-c">
            {tableData.rows.map((row) => (
              <tr
                key={row.key}
                className={cn(
                  "group transition-colors motion-reduce:transition-none hover:bg-surface-alt/40",
                  row.isPercentage ? "bg-surface-alt/10" : "",
                )}
              >
                {/* Sticky Metric Name */}
                <th
                  scope="row"
                  className={cn(
                    "sticky left-0 z-10 py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-text-primary text-left border-r border-border-c whitespace-nowrap shadow-xs transition-colors motion-reduce:transition-none group-hover:bg-surface-alt/40",
                    row.isPercentage ? "bg-surface-alt/10" : "bg-surface",
                  )}
                >
                  {row.label}
                </th>

                {/* Period Values */}
                {tableData.periodLabels.map((periodLabel) => {
                  const formatted = row.valuesByPeriod[periodLabel] ?? EM_DASH;
                  const isDash = formatted === EM_DASH;

                  return (
                    <td
                      key={periodLabel}
                      className={cn(
                        "py-3 px-4 font-mono tabular-nums text-xs sm:text-sm text-right whitespace-nowrap",
                        isDash ? "text-text-tertiary" : "text-text-primary",
                      )}
                    >
                      {formatted}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controls, Footnotes & Basis Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 pt-1 text-xs text-text-tertiary">
        <div className="space-y-1">
          {/* Hidden Rows Footnote */}
          {tableData.hiddenRowNames.length > 0 && (
            <p className="flex items-center gap-1.5 text-text-secondary">
              <Info className="h-3.5 w-3.5 shrink-0 text-text-tertiary" aria-hidden="true" />
              <span>
                <strong>Not reported in the available data:</strong>{" "}
                {tableData.hiddenRowNames.join(", ")}
              </span>
            </p>
          )}

          {/* Annual Basis Legend */}
          {isAnnual && (
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-text-tertiary">
              <span>
                <strong className="text-text-secondary">Reported:</strong> Audited reported figures
              </span>
              <span>
                <strong className="text-text-secondary">Rolled up:</strong> Computed sum of 4
                quarters
              </span>
            </p>
          )}
        </div>

        {/* Show All / Show Latest 5 Toggle */}
        {hasMoreThanFive && (
          <div className="self-start sm:self-auto shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAllPeriods((prev) => !prev)}
              className="gap-1.5 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              {showAllPeriods ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Show latest 5 periods</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Show all {totalPeriodsCount} periods</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});
