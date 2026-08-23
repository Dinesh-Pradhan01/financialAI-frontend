import type { CompanyDocument } from "@/shared/types/api";
import { KNOWN_DOCUMENT_SLOTS } from "./documentGuidance";

export type RequirementType = "Required" | "Recommended" | "Custom";

export type QualityStatus = "not_checked" | "passed";

export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"];
export const ACCEPTED_FILE_FORMATS_STRING = ".pdf,.png,.jpg,.jpeg";
export const ACCEPTED_FILE_FORMATS_LABEL = "PDF, PNG, JPG, JPEG";
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const MAX_FILE_SIZE_LABEL = "Max 10MB";
export const UPLOAD_CONSTRAINTS_LABEL = `${ACCEPTED_FILE_FORMATS_LABEL} • ${MAX_FILE_SIZE_LABEL}`;

export interface DocumentPresentationModel {
  id: string;
  originalName: string;
  documentType: string;
  documentCategory: string;
  requirementType: RequirementType;
  fileSizeBytes: number;
  formattedFileSize: string;
  uploadStatus: string;
  qualityStatus: QualityStatus;
  qualityScore: number | null;
  qualityLabel: string;
  isVerified: boolean;
  verificationNotes: string | null;
  hasVerificationNotes: boolean;
  createdAt?: string;
  updatedAt?: string | null;
  formattedCreatedAt: string;
  formattedUpdatedAt?: string;
  isUpdated: boolean;
  uploadedBy: number | null;
  raw: CompanyDocument;
}

/**
 * Format bytes into clean human-readable size (e.g., "245 KB", "1.2 MB").
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 KB";
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Format ISO date string to localized date (e.g., "21 Aug 2026").
 */
export function formatDocumentDate(dateStr?: string | null): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

/**
 * Check if a document was meaningfully updated/replaced after its creation date.
 */
export function isDocumentUpdated(createdAt?: string | null, updatedAt?: string | null): boolean {
  if (!createdAt || !updatedAt) return false;
  try {
    const created = new Date(createdAt).getTime();
    const updated = new Date(updatedAt).getTime();
    if (isNaN(created) || isNaN(updated)) return false;
    // More than 60 seconds difference indicates an actual replacement/update action
    return updated - created > 60 * 1000;
  } catch {
    return false;
  }
}

/**
 * Categorize a date into a clean chronological period for grouped lists.
 */
export function getChronologicalGroup(dateStr?: string | null): string {
  if (!dateStr) return "Date unavailable";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Date unavailable";
  }
}

/**
 * Map category string or known slot typeKey to user-facing requirement type label.
 */
export function getRequirementType(category?: string, documentType?: string): RequirementType {
  const normalized = category?.toLowerCase();
  if (normalized === "mandatory") return "Required";
  if (normalized === "optional" || normalized === "recommended") return "Recommended";
  if (normalized === "custom") return "Custom";

  // Fallback to known slots lookup
  if (documentType) {
    const slot = KNOWN_DOCUMENT_SLOTS.find((s) => s.typeKey === documentType);
    if (slot) {
      return slot.category === "mandatory" ? "Required" : "Recommended";
    }
  }

  return "Custom";
}

/**
 * Interpret quality status truthfully according to backend invariants.
 *
 * Backend Invariants:
 * - quality_score === null: Text extraction skipped (e.g. image) or AI unavailable -> "Not checked"
 * - quality_score !== null && is_verified === true: Automated AI check passed score threshold (>=50) and ID check -> "Passed quality check"
 * - Stored documents do not persist a false + score state (backend raises HTTP 400 pre-storage).
 */
export function getQualityPresentation(doc: CompanyDocument): {
  status: QualityStatus;
  label: string;
  score: number | null;
} {
  if (doc.quality_score === null || doc.quality_score === undefined) {
    return {
      status: "not_checked",
      label: "Not checked",
      score: null,
    };
  }

  // Persisted documents with quality score passed the automated check
  return {
    status: "passed",
    label: "Passed quality check",
    score: doc.quality_score,
  };
}

/**
 * Adapts raw CompanyDocument into a clean presentation model.
 */
export function toDocumentPresentation(doc: CompanyDocument): DocumentPresentationModel {
  const quality = getQualityPresentation(doc);
  const requirementType = getRequirementType(doc.document_category, doc.document_type);
  const isUpdated = isDocumentUpdated(doc.created_at, doc.updated_at);

  return {
    id: doc.id,
    originalName: doc.original_name,
    documentType: doc.document_type,
    documentCategory: doc.document_category,
    requirementType,
    fileSizeBytes: doc.file_size_bytes,
    formattedFileSize: formatFileSize(doc.file_size_bytes),
    uploadStatus: doc.upload_status || "uploaded",
    qualityStatus: quality.status,
    qualityScore: quality.score,
    qualityLabel: quality.label,
    isVerified: doc.is_verified,
    verificationNotes: doc.verification_notes?.trim() || null,
    hasVerificationNotes: Boolean(doc.verification_notes?.trim()),
    createdAt: doc.created_at,
    updatedAt: doc.updated_at,
    formattedCreatedAt: formatDocumentDate(doc.created_at),
    formattedUpdatedAt: formatDocumentDate(doc.updated_at),
    isUpdated,
    uploadedBy: doc.uploaded_by,
    raw: doc,
  };
}
