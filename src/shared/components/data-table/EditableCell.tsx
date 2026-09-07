import React, { useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { validateDynamicField } from "./previewTableUtils";

export interface EditableCellProps {
  value: string;
  fieldConfig: any;
  rowId: string;
  className?: string;
  readOnly?: boolean;
  onUpdate: (rowId: string, field: string, val: string) => void;
}

export function EditableCell({
  value,
  fieldConfig,
  rowId,
  className,
  readOnly,
  onUpdate,
}: EditableCellProps) {
  const [val, setVal] = useState(value || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setVal(value || "");
  }, [value]);

  const handleBlur = () => {
    if (readOnly) return;
    const validationError = validateDynamicField(fieldConfig, val);
    setError(validationError);
    if (!validationError && val !== (value || "")) {
      onUpdate(rowId, fieldConfig.name, val);
    }
  };

  return (
    <div className="relative group w-full overflow-visible">
      <input
        type="text"
        value={val}
        readOnly={readOnly}
        onChange={(e) => !readOnly && setVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        className={cn(
          "w-full bg-transparent border border-transparent rounded px-2.5 py-1.5 outline-none text-foreground transition-colors",
          !readOnly && "focus:border-transparent focus:ring-0 focus:bg-surface-alt/50 focus:font-semibold cursor-text",
          readOnly && "cursor-default text-text-secondary opacity-90",
          error && !readOnly && "border-destructive/50 focus:border-destructive text-destructive",
          className,
        )}
        style={{ minWidth: val ? `${Math.max(val.length + 2, 10)}ch` : undefined }}
        title={error || undefined}
        placeholder={fieldConfig.required && !readOnly ? "Required" : ""}
      />
    </div>
  );
}
