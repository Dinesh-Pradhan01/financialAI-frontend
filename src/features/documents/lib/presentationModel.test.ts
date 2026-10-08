import { describe, it, expect } from "vitest";
import {
  formatDocumentType,
  formatFileSize,
  formatDocumentDate,
  filterAndSortDocuments,
  groupDocumentsByCategory,
  groupDocumentsByHierarchy,
  calculateRepositoryMetrics,
} from "./presentationModel";
import type { CompanyDocument } from "@/shared/types/api";

const mockDocs: CompanyDocument[] = [
  {
    id: "doc-1",
    original_name: "pan_card_incorporation.pdf",
    filename: "internal_1.pdf",
    document_type: "business_pan",
    document_category: "Identity, KYB & Authority",
    file_size_bytes: 1024 * 500, // 500 KB
    upload_status: "completed",
    quality_score: 95,
    is_verified: true,
    verification_notes: "Matched against ITD",
    uploaded_by: 1,
    created_at: "2026-09-01T10:00:00Z",
    updated_at: "2026-09-01T10:00:00Z",
  },
  {
    id: "doc-2",
    original_name: "gstr3b_aug_2026.pdf",
    filename: "internal_2.pdf",
    document_type: "GSTR-3B",
    document_category: "Tax & Statutory Compliance",
    file_size_bytes: 1024 * 1024 * 2.5, // 2.5 MB
    upload_status: "completed",
    quality_score: 90,
    is_verified: true,
    verification_notes: "Valid filing",
    uploaded_by: 1,
    created_at: "2026-09-10T12:00:00Z",
    updated_at: "2026-09-10T12:00:00Z",
  },
  {
    id: "doc-3",
    original_name: "draft_agreement.docx",
    filename: "internal_3.docx",
    document_type: "Unknown",
    document_category: "Others / Unclassified",
    file_size_bytes: 1024 * 80, // 80 KB
    upload_status: "completed",
    quality_score: null,
    is_verified: false,
    verification_notes: null,
    uploaded_by: 1,
    created_at: "2026-08-15T08:00:00Z",
    updated_at: "2026-08-15T08:00:00Z",
  },
];

describe("presentationModel", () => {
  describe("formatDocumentType", () => {
    it("formats known taxonomy document types", () => {
      expect(formatDocumentType("business_pan")).toBe("Business PAN");
    });

    it("formats free-form strings nicely", () => {
      expect(formatDocumentType("board_resolution_sept")).toBe("Board Resolution Sept");
    });

    it("falls back gracefully for unknown/empty values", () => {
      expect(formatDocumentType("Unknown")).toBe("Unclassified Document");
      expect(formatDocumentType("")).toBe("Unclassified Document");
      expect(formatDocumentType(null)).toBe("Unclassified Document");
    });
  });

  describe("formatFileSize", () => {
    it("formats bytes accurately", () => {
      expect(formatFileSize(0)).toBe("0 B");
      expect(formatFileSize(512)).toBe("512 B");
      expect(formatFileSize(1024 * 500)).toBe("500.0 KB");
      expect(formatFileSize(1024 * 1024 * 2.5)).toBe("2.5 MB");
    });
  });

  describe("formatDocumentDate", () => {
    it("formats ISO dates", () => {
      expect(formatDocumentDate("2026-09-01T10:00:00Z")).toContain("Sep");
      expect(formatDocumentDate("2026-09-01T10:00:00Z")).toContain("2026");
    });

    it("returns dash for invalid or missing dates", () => {
      expect(formatDocumentDate(null)).toBe("—");
      expect(formatDocumentDate("invalid-date")).toBe("—");
    });
  });

  describe("filterAndSortDocuments", () => {
    it("filters by subcategory", () => {
      const taxDocs = filterAndSortDocuments(mockDocs, { categoryFilter: "tax_statutory_compliance" });
      expect(taxDocs.length).toBe(1);
      expect(taxDocs[0].id).toBe("doc-2");
    });

    it("filters by vault section domain", () => {
      const regDocs = filterAndSortDocuments(mockDocs, { categoryFilter: "regulatory" });
      // Both doc-1 (identity) and doc-2 (tax) belong to regulatory in vaultManifest!
      expect(regDocs.length).toBe(2);
      expect(regDocs.map((d) => d.id)).toContain("doc-1");
      expect(regDocs.map((d) => d.id)).toContain("doc-2");
    });

    it("filters by search query matching original_name", () => {
      const results = filterAndSortDocuments(mockDocs, { searchQuery: "gstr3b" });
      expect(results.length).toBe(1);
      expect(results[0].id).toBe("doc-2");
    });

    it("sorts by newest first by default", () => {
      const results = filterAndSortDocuments(mockDocs, { sortOrder: "newest" });
      expect(results[0].id).toBe("doc-2"); // Sep 10
      expect(results[1].id).toBe("doc-1"); // Sep 1
      expect(results[2].id).toBe("doc-3"); // Aug 15
    });
  });

  describe("groupDocumentsByHierarchy", () => {
    it("groups documents into populated domains and subcategories with zero empty slots", () => {
      const hierarchy = groupDocumentsByHierarchy(mockDocs);
      // Domains populated: regulatory (doc-1 & doc-2), miscellaneous (doc-3)
      expect(hierarchy.length).toBe(2);
      expect(hierarchy.map((h) => h.domain.id)).toEqual([
        "regulatory",
        "miscellaneous",
      ]);

      const reg = hierarchy[0];
      expect(reg.totalDocuments).toBe(2);
      expect(reg.subcategories.length).toBe(2);
      expect(reg.subcategories[0].category.id).toBe("identity_kyb_authority");
      expect(reg.subcategories[0].documents[0].id).toBe("doc-1");
      expect(reg.subcategories[1].category.id).toBe("tax_statutory_compliance");
      expect(reg.subcategories[1].documents[0].id).toBe("doc-2");
    });

    it("returns empty array when no documents exist", () => {
      expect(groupDocumentsByHierarchy([])).toEqual([]);
    });
  });

  describe("groupDocumentsByCategory", () => {
    it("groups documents into populated categories only", () => {
      const groups = groupDocumentsByCategory(mockDocs);
      expect(groups.length).toBe(3);
      expect(groups.map((g) => g.category.id)).toEqual([
        "identity_kyb_authority",
        "tax_statutory_compliance",
        "others_unclassified",
      ]);
      expect(groups[0].documents.length).toBe(1);
    });

    it("returns empty array when no documents exist", () => {
      expect(groupDocumentsByCategory([])).toEqual([]);
    });
  });

  describe("calculateRepositoryMetrics", () => {
    it("calculates totals and verification percentages accurately", () => {
      const metrics = calculateRepositoryMetrics(mockDocs);
      expect(metrics.totalCount).toBe(3);
      expect(metrics.verifiedCount).toBe(2);
      expect(metrics.reviewedPercentage).toBe(67); // 2/3 = 66.6% -> 67%
      expect(metrics.totalBytes).toBeGreaterThan(0);
    });

    it("handles empty repository gracefully", () => {
      const metrics = calculateRepositoryMetrics([]);
      expect(metrics.totalCount).toBe(0);
      expect(metrics.verifiedCount).toBe(0);
      expect(metrics.reviewedPercentage).toBe(0);
    });
  });
});
