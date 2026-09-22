import { z } from "zod";
import type { ValidationErrorDetail } from "@/shared/types/api";

export interface ParsedApiError {
  /** User-friendly single-string error message suitable for toasts or alert banners */
  message: string;
  /** Field-level errors keyed by property name (for forms) */
  fieldErrors: Record<string, string>;
  /** HTTP status code if available */
  status?: number;
  /** Detailed error object or array from server */
  detail?: unknown;
  /** Flags for common scenarios */
  isValidationError: boolean;
  isDuplicate: boolean;
  isForbidden: boolean;
  isUnauthorized: boolean;
  isNotFound: boolean;
}

/**
 * Normalizes any caught error from an API call, Zod validation, or network exception.
 * Handles 422 field arrays, 409 duplicate conflicts, 403 forbidden permissions,
 * 401 session expiries, and server exception payloads.
 */
export function parseApiError(
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
): ParsedApiError {
  const fieldErrors: Record<string, string> = {};
  let status: number | undefined;
  let message = fallbackMessage;
  let detail: unknown;

  if (!error) {
    return {
      message,
      fieldErrors,
      isValidationError: false,
      isDuplicate: false,
      isForbidden: false,
      isUnauthorized: false,
      isNotFound: false,
    };
  }

  // 1. Check if it's a ZodError (client validation)
  if (error instanceof z.ZodError) {
    for (const issue of error.issues) {
      const field = String(issue.path[issue.path.length - 1] ?? "");
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    const firstField = Object.keys(fieldErrors)[0];
    const firstMsg = firstField
      ? fieldErrors[firstField]
      : "Validation failed. Please check form inputs.";
    return {
      message: firstMsg,
      fieldErrors,
      isValidationError: true,
      isDuplicate: false,
      isForbidden: false,
      isUnauthorized: false,
      isNotFound: false,
    };
  }

  // 2. Extract status and raw details from error object
  if (typeof error === "object" && error !== null) {
    const errObj = error as Record<string, unknown>;
    if (typeof errObj.status === "number") {
      status = errObj.status;
    }
    detail =
      errObj.detail ??
      (errObj.response as { data?: { detail?: unknown } })?.data?.detail ??
      (errObj.data as { detail?: unknown })?.detail;

    // Check message property
    if (typeof errObj.message === "string" && errObj.message) {
      message = errObj.message;
    }
  } else if (typeof error === "string") {
    message = error;
  }

  // 3. Try to parse JSON message if detail wasn't directly found
  if (
    !detail &&
    typeof message === "string" &&
    (message.startsWith("{") || message.startsWith("["))
  ) {
    try {
      const parsed = JSON.parse(message);
      if (parsed && typeof parsed === "object") {
        detail = (parsed as { detail?: unknown }).detail ?? parsed;
      }
    } catch {
      // ignore
    }
  }

  // 4. Handle 422 / Validation errors with detail array
  if (Array.isArray(detail)) {
    for (const item of detail as ValidationErrorDetail[]) {
      if (item && Array.isArray(item.loc)) {
        const field = String(item.loc[item.loc.length - 1]);
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = item.msg;
        }
      }
    }
    const firstField = Object.keys(fieldErrors)[0];
    if (firstField) {
      message = fieldErrors[firstField];
    }
  } else if (typeof detail === "string" && detail.trim().length > 0) {
    message = detail;
  }

  const isValidationError = status === 422 || Object.keys(fieldErrors).length > 0;
  const isDuplicate =
    status === 409 ||
    message.toLowerCase().includes("already exists") ||
    message.toLowerCase().includes("already uploaded") ||
    message.toLowerCase().includes("duplicate");
  const isForbidden =
    status === 403 ||
    message.toLowerCase().includes("permission") ||
    message.toLowerCase().includes("forbidden");
  const isUnauthorized =
    status === 401 ||
    message.toLowerCase().includes("unauthorized") ||
    message.toLowerCase().includes("session expired");
  const isNotFound = status === 404 || message.toLowerCase().includes("not found");

  // Specific tailored messages for standard HTTP error codes when backend message is generic
  if (isDuplicate && (!detail || typeof detail !== "string" || detail.length < 5)) {
    message = "This record or document has already been uploaded / created.";
  } else if (isForbidden && (!detail || typeof detail !== "string" || detail.length < 5)) {
    message = "You do not have permission to perform this action.";
  } else if (isUnauthorized) {
    message = "Your session has expired. Please sign in again.";
  } else if (isNotFound && (!detail || typeof detail !== "string" || detail.length < 5)) {
    message = "The requested resource could not be found.";
  }

  return {
    message,
    fieldErrors,
    status,
    detail,
    isValidationError,
    isDuplicate,
    isForbidden,
    isUnauthorized,
    isNotFound,
  };
}

/**
 * Returns a clean user-facing error message from any caught error.
 */
export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
): string {
  return parseApiError(error, fallbackMessage).message;
}

/**
 * Detects if the error corresponds to an HTTP 409 Duplicate Conflict.
 */
export function isDuplicateError(error: unknown): boolean {
  return parseApiError(error).isDuplicate;
}

/**
 * Detects if the error corresponds to an HTTP 403 Forbidden.
 */
export function isForbiddenError(error: unknown): boolean {
  return parseApiError(error).isForbidden;
}

/**
 * Detects if the error corresponds to an HTTP 401 Unauthorized.
 */
export function isUnauthorizedError(error: unknown): boolean {
  return parseApiError(error).isUnauthorized;
}
