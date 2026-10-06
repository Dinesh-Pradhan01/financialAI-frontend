import { describe, it, expect } from "vitest";
import {
  normalizeCategory,
  getCanonicalCategory,
  getDomainForCategory,
} from "./categoryNormalizer";
import { resolveVaultPlacement } from "./vaultManifest";

describe("categoryNormalizer and vaultManifest single-source resolution", () => {
  describe("The 7 Uploaded User Documents Resolution", () => {
    it("resolves tier2_test_category_4_mis (monthly_mis, cat 4) to Financials", () => {
      const placement = resolveVaultPlacement(4, "monthly_mis");
      expect(placement.sectionId).toBe("financial-statements");
      expect(placement.subCategoryId).toBe("annual_financial_statements");
      expect(placement.section.shortLabel).toBe("Financials");
    });

    it("resolves Vendor_Agreement_V-001_TechNova_MSA (trial_balance_gl, cat 4) to Financials", () => {
      const placement = resolveVaultPlacement(4, "trial_balance_gl");
      expect(placement.sectionId).toBe("financial-statements");
      expect(placement.subCategoryId).toBe("annual_financial_statements");
      expect(placement.section.shortLabel).toBe("Financials");
    });

    it("resolves tier2_test_category_8_contract (master_service_agreement, cat 8) to Contracts", () => {
      const placement = resolveVaultPlacement(8, "client_contract");
      expect(placement.sectionId).toBe("contracts");
      expect(placement.section.label).toBe("Contracts");
    });

    it("resolves tier2_test_category_5_license (municipal_trade_license, cat 5) to Regulatory", () => {
      const placement = resolveVaultPlacement(5, "municipal_trade_license");
      expect(placement.sectionId).toBe("regulatory");
      expect(placement.subCategoryId).toBe("licenses_permits_approvals");
    });

    it("resolves tier2_test_category_7_captable (capitalization_table, cat 7) to Regulatory", () => {
      const placement = resolveVaultPlacement(7, "capitalization_table");
      expect(placement.sectionId).toBe("regulatory");
      expect(placement.subCategoryId).toBe("ownership_governance_capital");
    });

    it("resolves demo_business_registration_proof_2 (certificate_incorporation, cat 2) to Regulatory", () => {
      const placement = resolveVaultPlacement(2, "certificate_incorporation");
      expect(placement.sectionId).toBe("regulatory");
      expect(placement.subCategoryId).toBe("registration_legal_structure");
    });

    it("resolves demo_business_pan_2 (business_pan, cat 1) to Regulatory", () => {
      const placement = resolveVaultPlacement(1, "business_pan");
      expect(placement.sectionId).toBe("regulatory");
      expect(placement.subCategoryId).toBe("identity_kyb_authority");
    });
  });

  describe("Backend Classifier Category Strings", () => {
    it("normalizes 'Identity, KYB & Authority' to identity_kyb_authority", () => {
      expect(normalizeCategory("Identity, KYB & Authority")).toBe("identity_kyb_authority");
    });

    it("normalizes 'Registration, Legal Structure & Government Recognition' to registration_legal_structure", () => {
      expect(
        normalizeCategory("Registration, Legal Structure & Government Recognition"),
      ).toBe("registration_legal_structure");
    });

    it("normalizes 'Tax & Statutory Compliance' to tax_statutory_compliance", () => {
      expect(normalizeCategory("Tax & Statutory Compliance")).toBe("tax_statutory_compliance");
    });

    it("normalizes 'Financial & Banking' to financial-statements subcategory", () => {
      const placement = resolveVaultPlacement("Financial & Banking");
      expect(placement.sectionId).toBe("financial-statements");
    });

    it("normalizes 'Licenses, Permits & Regulatory Approvals' to licenses_permits_approvals", () => {
      expect(normalizeCategory("Licenses, Permits & Regulatory Approvals")).toBe("licenses_permits_approvals");
    });

    it("normalizes 'Certifications, Accreditations & Independent Assurance' to certifications_assurance", () => {
      expect(
        normalizeCategory("Certifications, Accreditations & Independent Assurance"),
      ).toBe("certifications_assurance");
    });

    it("normalizes 'Ownership, Governance & Capital' to ownership_governance_capital", () => {
      expect(normalizeCategory("Ownership, Governance & Capital")).toBe("ownership_governance_capital");
    });

    it("normalizes 'Contracts, IP & Legal Obligations' to contracts_ip_legal", () => {
      expect(normalizeCategory("Contracts, IP & Legal Obligations")).toBe("contracts_ip_legal");
    });

    it("normalizes 'Others / Unclassified' to others_unclassified", () => {
      expect(normalizeCategory("Others / Unclassified")).toBe("others_unclassified");
    });
  });

  describe("Numeric Classifier IDs", () => {
    it("maps 1..9 to appropriate canonical categories", () => {
      expect(normalizeCategory(1)).toBe("identity_kyb_authority");
      expect(normalizeCategory(2)).toBe("registration_legal_structure");
      expect(normalizeCategory(3)).toBe("tax_statutory_compliance");
      expect(resolveVaultPlacement(4).sectionId).toBe("financial-statements");
      expect(normalizeCategory(5)).toBe("licenses_permits_approvals");
      expect(normalizeCategory(6)).toBe("certifications_assurance");
      expect(normalizeCategory(7)).toBe("ownership_governance_capital");
      expect(normalizeCategory(8)).toBe("contracts_ip_legal");
      expect(normalizeCategory(9)).toBe("others_unclassified");
    });

    it("maps out-of-range numbers to others_unclassified", () => {
      expect(normalizeCategory(0)).toBe("others_unclassified");
      expect(normalizeCategory(99)).toBe("others_unclassified");
    });
  });

  describe("Legacy Slugs", () => {
    it("normalizes legacy frontend taxonomy slugs", () => {
      expect(normalizeCategory("identity_kyb_authority")).toBe("identity_kyb_authority");
      expect(normalizeCategory("registration_legal_structure")).toBe("registration_legal_structure");
      expect(normalizeCategory("tax_statutory_compliance")).toBe("tax_statutory_compliance");
      expect(resolveVaultPlacement("financial_banking").sectionId).toBe("financial-statements");
      expect(normalizeCategory("licenses_permits_approvals")).toBe("licenses_permits_approvals");
      expect(normalizeCategory("certifications_assurance")).toBe("certifications_assurance");
      expect(normalizeCategory("ownership_governance_capital")).toBe("ownership_governance_capital");
      expect(normalizeCategory("contracts_ip_legal")).toBe("contracts_ip_legal");
      expect(normalizeCategory("other")).toBe("others_unclassified");
    });
  });

  describe("Unknown and Null Safety", () => {
    it("never drops null, undefined, or empty values", () => {
      expect(normalizeCategory(null)).toBe("others_unclassified");
      expect(normalizeCategory(undefined)).toBe("others_unclassified");
      expect(normalizeCategory("")).toBe("others_unclassified");
      expect(normalizeCategory("   ")).toBe("others_unclassified");
      expect(normalizeCategory("random_unknown_slug_xyz")).toBe("others_unclassified");
    });
  });

  describe("getCanonicalCategory", () => {
    it("returns full config object with label and icon", () => {
      const config = getCanonicalCategory("Tax & Statutory Compliance");
      expect(config.id).toBe("tax_statutory_compliance");
      expect(config.domainId).toBe("regulatory");
      expect(config.label).toBe("Tax & Statutory Compliance");
      expect(config.number).toBeGreaterThan(0);
    });
  });

  describe("getDomainForCategory", () => {
    it("maps identity_kyb_authority to regulatory domain", () => {
      const domain = getDomainForCategory("identity_kyb_authority");
      expect(domain.id).toBe("regulatory");
      expect(domain.canonicalCategoryIds).toContain("identity_kyb_authority");
      expect(domain.canonicalCategoryIds).toContain("registration_legal_structure");
      expect(domain.canonicalCategoryIds).toContain("ownership_governance_capital");
    });

    it("maps tax_statutory_compliance to regulatory domain", () => {
      const domain = getDomainForCategory("tax_statutory_compliance");
      expect(domain.id).toBe("regulatory");
    });

    it("maps certifications_assurance to certifications domain", () => {
      const domain = getDomainForCategory("certifications_assurance");
      expect(domain.id).toBe("certifications");
    });

    it("maps contracts_ip_legal to contracts domain", () => {
      const domain = getDomainForCategory("contracts_ip_legal");
      expect(domain.id).toBe("contracts");
    });
  });
});
