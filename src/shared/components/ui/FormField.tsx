import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

// TODO(phase-2): Wire with dynamic schema validation (e.g. Zod / React Hook Form) in later phase

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
  optional?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      isValid,
      optional,
      helperText,
      leftIcon,
      rightElement,
      id,
      className = "",
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, "-") : undefined);

    return (
      <div className="space-y-1.5 text-left w-full">
        <div className="flex justify-between items-center">
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-text-primary tracking-tight"
          >
            {label}{" "}
            {!optional && (required || required === undefined) && (
              <span className="text-destructive font-bold">*</span>
            )}
          </label>
          {optional && (
            <span className="text-[0.6875rem] font-normal text-text-tertiary">
              Optional
            </span>
          )}
        </div>

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-text-secondary">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            required={required}
            className={`w-full rounded-xl border bg-surface py-2.5 text-sm text-foreground outline-none transition-all duration-150 shadow-xs
              ${leftIcon ? "pl-10" : "px-3.5"}
              ${rightElement || isValid || error ? "pr-10" : "pr-3.5"}
              placeholder:text-text-tertiary
              ${
                error
                  ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/15"
                  : isValid
                  ? "border-success/60 focus:border-brand focus:ring-2 focus:ring-brand/15"
                  : "border-border-c focus:border-brand focus:ring-2 focus:ring-brand/15 hover:border-border-c/80"
              } ${className}`}
            {...props}
          />

          {rightElement ? (
            <div className="absolute right-3 flex items-center">{rightElement}</div>
          ) : error ? (
            <AlertCircle className="absolute right-3 h-4 w-4 text-destructive pointer-events-none" />
          ) : isValid ? (
            <CheckCircle2 className="absolute right-3 h-4 w-4 text-success pointer-events-none" />
          ) : null}
        </div>

        {error ? (
          <p className="text-[0.6875rem] font-medium text-destructive flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-[0.6875rem] text-text-secondary mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  isValid?: boolean;
  optional?: boolean;
  helperText?: string;
}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(({ label, error, isValid, optional, helperText, id, className = "", required, ...props }, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, "-") : undefined);

  return (
    <div className="space-y-1.5 text-left w-full">
      <div className="flex justify-between items-center">
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold text-text-primary tracking-tight"
        >
          {label}{" "}
          {!optional && (required || required === undefined) && (
            <span className="text-destructive font-bold">*</span>
          )}
        </label>
        {optional && (
          <span className="text-[0.6875rem] font-normal text-text-tertiary">
            Optional
          </span>
        )}
      </div>

      <div className="relative">
        <textarea
          id={textareaId}
          ref={ref}
          required={required}
          className={`w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-150 resize-none shadow-xs
            placeholder:text-text-tertiary
            ${
              error
                ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/15"
                : isValid
                ? "border-success/60 focus:border-brand focus:ring-2 focus:ring-brand/15"
                : "border-border-c focus:border-brand focus:ring-2 focus:ring-brand/15 hover:border-border-c/80"
            } ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-[0.6875rem] font-medium text-destructive flex items-center gap-1 mt-1">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[0.6875rem] text-text-secondary mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});
FormTextarea.displayName = "FormTextarea";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly (string | SelectOption)[] | (string | SelectOption)[];
  placeholder?: string;
  optional?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export function FormSelect({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  optional,
  required,
  error,
  helperText,
  disabled,
  className = "",
}: FormSelectProps) {
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  return (
    <div className="space-y-1.5 text-left w-full">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-text-primary tracking-tight">
          {label}{" "}
          {!optional && (required || required === undefined) && (
            <span className="text-destructive font-bold">*</span>
          )}
        </label>
        {optional && (
          <span className="text-[0.6875rem] font-normal text-text-tertiary">
            Optional
          </span>
        )}
      </div>

      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={`h-[2.625rem] rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-150 shadow-xs
            ${
              error
                ? "border-destructive focus:ring-destructive/15"
                : "border-border-c focus:ring-brand/15 hover:border-border-c/80"
            } ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border border-border-c bg-surface shadow-e2 max-h-64 z-50">
          {normalizedOptions.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-xs py-2 px-3 focus:bg-surface-alt cursor-pointer rounded-lg font-medium"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error ? (
        <p className="text-[0.6875rem] font-medium text-destructive flex items-center gap-1 mt-1">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[0.6875rem] text-text-secondary mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
