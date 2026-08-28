import type { CompanyDocument } from "@/shared/types/api";

/**
 * Row-level document status.
 *
 * What the backend can actually reach today, verified against
 * `app/company/document_routes.py` and `app/business/routes.py`:
 *
 * - `upload_status` is hardcoded to the literal `"uploaded"` at every write site
 *   and never transitions, so it carries no information. Do not branch on it.
 * - Verification is **synchronous at upload time**. The AI check runs inside the
 *   upload request; if the document is unreadable or scores below 50 the route
 *   raises HTTP 400 and the record is never persisted
 *   (`document_routes.py:82-83`). Otherwise `is_verified` is set to `True`
 *   (`:88`).
 * - So a *stored* document is `is_verified: true` in the normal case. It is
 *   `false` only when the AI call itself errored and the route fell through to
 *   its default — which is a genuine "not checked yet" state, hence
 *   `pending_review`.
 *
 * The consequence for `rejected`: there is no stored rejected record to render,
 * because rejection is a 400 rather than a row. It is therefore a **transient,
 * client-side** status attached to the row that just failed its own upload, and
 * it does not survive a refresh. Passing it as `transient` is the only way a row
 * enters that state — nothing derives it from server data.
 */
export type DocumentRowStatus =
  | "not_uploaded"
  | "uploading"
  | "pending_review"
  | "verified"
  | "rejected";

export interface DocumentRowState {
  status: DocumentRowStatus;
  /** Human-readable status label for the badge. */
  label: string;
  /** One line explaining the status, for the row's secondary text or a tooltip. */
  hint: string;
}

/** Transient, client-only states a row can be pushed into by its own actions. */
export interface TransientRowState {
  isUploading?: boolean;
  /** Message from the rejecting 400, e.g. the quality score and AI notes. */
  rejectionReason?: string | null;
}

const NOT_UPLOADED: DocumentRowState = {
  status: "not_uploaded",
  label: "Not uploaded",
  hint: "No file on record for this requirement yet.",
};

const UPLOADING: DocumentRowState = {
  status: "uploading",
  label: "Uploading",
  hint: "Checking the file and saving it to your record.",
};

const PENDING_REVIEW: DocumentRowState = {
  status: "pending_review",
  label: "Pending review",
  hint: "Saved, but the automated check did not complete. It will be reviewed.",
};

const VERIFIED: DocumentRowState = {
  status: "verified",
  label: "Verified",
  hint: "Saved and passed the automated readability and quality check.",
};

/**
 * Resolves the status for one taxonomy row.
 *
 * @param document The stored record for this row, or `null` if nothing is uploaded.
 * @param transient Client-side state from this row's own in-flight or failed action.
 */
export function getDocumentRowState(
  document: CompanyDocument | null | undefined,
  transient: TransientRowState = {},
): DocumentRowState {
  if (transient.isUploading) return UPLOADING;

  if (transient.rejectionReason) {
    return {
      status: "rejected",
      label: "Rejected",
      hint: transient.rejectionReason,
    };
  }

  if (!document) return NOT_UPLOADED;

  return document.is_verified ? VERIFIED : PENDING_REVIEW;
}

/** A row counts toward completion once a file is on record, verified or not. */
export function isDocumentSatisfied(document: CompanyDocument | null | undefined): boolean {
  return Boolean(document);
}
