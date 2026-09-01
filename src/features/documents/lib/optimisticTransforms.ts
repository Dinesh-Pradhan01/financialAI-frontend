import type { CompanyDocument } from "@/shared/types/api";

/**
 * Optimistically remove a document by ID from the documents cache.
 */
export function applyDeleteDocumentOptimistic(
  cache: CompanyDocument[],
  docId: string,
): CompanyDocument[] {
  return cache.filter((doc) => doc.id !== docId);
}

/**
 * Optimistically touch the updated_at timestamp on a replacing document.
 */
export function applyReplaceDocumentOptimistic(
  cache: CompanyDocument[],
  docId: string,
): CompanyDocument[] {
  const now = new Date().toISOString();
  return cache.map((doc) =>
    doc.id === docId
      ? {
          ...doc,
          updated_at: now,
        }
      : doc,
  );
}
