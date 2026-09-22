import React, { useMemo, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { EditableCell } from "./EditableCell";
import { formatHeaderName, getVisibleFields } from "./previewTableUtils";

export interface CustomTableColumn<T = any> {
  id: string;
  header: string;
  width?: string;
  className?: string;
  position?: "start" | "end";
  renderCell: (record: T, rowId: string, isFocused: boolean) => React.ReactNode;
}

export interface DynamicPreviewTableProps {
  records: Array<{ rowId: string; [key: string]: any }>;
  errorRowIds: Set<string>;
  warningRowIds: Set<string>;
  schemaDef?: any;
  focusedRowId: string | null;
  onClearFocusedRow: () => void;
  onUpdateField: (rowId: string, field: string, value: string) => void;
  onAddRow: () => void;
  emptyMessage?: string;
  addRowLabel?: string;
  readOnly?: boolean;
  customColumns?: CustomTableColumn[];
}

export function DynamicPreviewTable({
  records,
  errorRowIds,
  warningRowIds,
  schemaDef,
  focusedRowId,
  onClearFocusedRow,
  onUpdateField,
  onAddRow,
  emptyMessage = "No records match the current filters.",
  addRowLabel = "Add Row",
  readOnly = false,
  customColumns,
}: DynamicPreviewTableProps) {
  const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});

  const visibleFields = useMemo(() => {
    return getVisibleFields(schemaDef, records);
  }, [schemaDef, records]);

  const startCustomColumns = useMemo(
    () => (customColumns || []).filter((c) => c.position === "start"),
    [customColumns],
  );
  const endCustomColumns = useMemo(
    () => (customColumns || []).filter((c) => c.position !== "start"),
    [customColumns],
  );
  const totalColumnCount = visibleFields.length + startCustomColumns.length + endCustomColumns.length;

  useEffect(() => {
    if (focusedRowId && rowRefs.current[focusedRowId]) {
      rowRefs.current[focusedRowId]?.scrollIntoView({ behavior: "smooth", block: "center" });

      const timer = setTimeout(() => {
        onClearFocusedRow();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [focusedRowId, onClearFocusedRow]);

  if (!visibleFields.length && !customColumns?.length) {
    return (
      <div className="w-full p-8 text-center text-muted-foreground border border-border rounded-xl bg-surface">
        No schema or columns available to display.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
      <table className="w-full text-xs text-left border-collapse">
        <thead className="bg-surface-alt/80 text-[11px] font-semibold text-text-secondary border-b border-border sticky top-0 z-10 uppercase tracking-wider">
          <tr>
            {startCustomColumns.map((col) => (
              <th
                key={`head-custom-${col.id}`}
                className={cn("px-4 py-3 font-semibold whitespace-nowrap", col.className)}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
            {visibleFields.map((field: any, colIdx: number) => (
              <th key={`head-${field.name || colIdx}-${colIdx}`} className="px-4 py-3 font-semibold whitespace-nowrap">
                {formatHeaderName(field.name)}
                {field.required && !readOnly && <span className="text-destructive font-bold ml-1">*</span>}
              </th>
            ))}
            {endCustomColumns.map((col) => (
              <th
                key={`head-custom-${col.id}`}
                className={cn("px-4 py-3 font-semibold whitespace-nowrap", col.className)}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {records.length > 0 ? (
            records.map((rec, index) => {
              const rowId = String(rec.rowId || rec.id || rec._id || `row-${index}`);
              const isError = errorRowIds.has(rowId);
              const isWarning = warningRowIds.has(rowId);
              const isFocused = focusedRowId === rowId;

              return (
                <tr
                  key={`row-${rowId}-${index}`}
                  ref={(el) => {
                    rowRefs.current[rowId] = el;
                  }}
                  className={cn(
                    "transition-colors",
                    !readOnly && "hover:bg-surface-alt/50",
                    isError && !readOnly
                      ? "bg-destructive/5 hover:bg-destructive/10"
                      : isWarning && !readOnly
                        ? "bg-amber-500/5 hover:bg-amber-500/10"
                        : "bg-transparent",
                    isFocused && "ring-2 ring-inset ring-primary bg-primary/5",
                  )}
                >
                  {startCustomColumns.map((col) => (
                    <td key={`cell-custom-${rowId}-${col.id}`} className="px-3 py-1 whitespace-nowrap">
                      {col.renderCell(rec, rowId, isFocused)}
                    </td>
                  ))}
                  {visibleFields.map((field: any, colIdx: number) => {
                    const camelCaseName = field.name.replace(/_([a-z])/g, (_: string, g: string) => g.toUpperCase());
                    const snakeCaseName = field.name.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
                    const rawVal = rec[field.name] ?? rec[camelCaseName] ?? rec[snakeCaseName];
                    const val = rawVal != null ? String(rawVal) : "";
                    return (
                      <td key={`cell-${rowId}-${field.name || colIdx}-${colIdx}`} className="px-2 py-0.5">
                        <EditableCell
                          value={val}
                          fieldConfig={field}
                          rowId={rowId}
                          onUpdate={onUpdateField}
                          readOnly={readOnly}
                          className={cn(
                            field.name.toLowerCase().includes("id") && "font-medium",
                            field.type === "number" && "font-mono text-xs",
                          )}
                        />
                      </td>
                    );
                  })}
                  {endCustomColumns.map((col) => (
                    <td key={`cell-custom-${rowId}-${col.id}`} className="px-3 py-1 whitespace-nowrap">
                      {col.renderCell(rec, rowId, isFocused)}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={totalColumnCount} className="px-4 py-8 text-center text-muted-foreground">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
        {!readOnly && (
          <tfoot className="bg-surface/50 border-t border-border">
            <tr>
              <td colSpan={totalColumnCount} className="px-4 py-3">
                <button
                  onClick={onAddRow}
                  className="inline-flex items-center justify-center text-xs font-semibold text-primary hover:text-primary-hover transition gap-1.5 tracking-tight"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {addRowLabel}
                </button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
