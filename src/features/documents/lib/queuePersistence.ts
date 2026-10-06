import type { CompanyDocument } from "@/shared/types/api";

export type UploadItemStatus =
  | "queued"
  | "uploading"
  | "processing"
  | "done"
  | "error"
  | "cancelled";

export interface PersistedQueueRecord {
  id: string;
  fileName: string;
  fileSize: number;
  documentType?: string;
  documentCategory?: string;
  status: UploadItemStatus;
  stage?: string;
  errorMessage?: string;
  verifyingMessage?: string;
  uncertainClassification?: boolean;
  uploadedDocument?: CompanyDocument;
  createdAt: number;
  isInterrupted?: boolean;
}

const STORAGE_KEY = "spotlight_upload_queue_v1";
const MAX_PERSISTED_RECORDS = 25;

/**
 * Serializes queue metadata to localStorage.
 * Does not store non-serializable File blobs.
 */
export function savePersistedQueue(records: PersistedQueueRecord[]): void {
  if (typeof window === "undefined" || !window.localStorage) return;

  try {
    // Only persist non-cancelled items, capped at the most recent 25 records
    const cleanRecords = records
      .filter((r) => r.status !== "cancelled")
      .slice(-MAX_PERSISTED_RECORDS);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanRecords));
  } catch (err) {
    console.warn("Failed to save upload queue to localStorage:", err);
  }
}

/**
 * Loads persisted queue records on initialization.
 * Any in-flight uploads ('queued', 'uploading', 'processing') from a previous session
 * are marked as interrupted errors since their memory File buffers were discarded.
 */
export function loadPersistedQueue(): PersistedQueueRecord[] {
  if (typeof window === "undefined" || !window.localStorage) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: PersistedQueueRecord[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => {
      // If the browser was closed/reloaded while the job was pending or transmitting:
      if (
        item.status === "queued" ||
        item.status === "uploading" ||
        item.status === "processing"
      ) {
        return {
          ...item,
          status: "error",
          isInterrupted: true,
          stage: "Upload interrupted",
          errorMessage:
            "Upload was interrupted when the browser closed or refreshed. The original file binary is no longer in memory. Please re-upload.",
        };
      }
      return item;
    });
  } catch (err) {
    console.warn("Failed to load upload queue from localStorage:", err);
    return [];
  }
}

/**
 * Clears the persisted queue storage entirely.
 */
export function clearPersistedQueue(): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear upload queue localStorage:", err);
  }
}
