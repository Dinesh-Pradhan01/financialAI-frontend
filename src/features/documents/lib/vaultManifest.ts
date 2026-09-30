import {
  Award,
  Building2,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  Landmark,
  PieChart,
  Receipt,
  Scale,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  DOCUMENT_CATEGORIES,
  ALL_TAXONOMY_DOCUMENTS,
  type TaxonomyDocument,
} from "./documentTaxonomy";

export type VaultSectionId =
  | "regulatory"
  | "contracts"
  | "certifications"
  | "financial-statements"
  | "invoices";

export type SubCategoryKind = "checklist" | "list" | "external";

export interface VaultSubCategory {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  kind: SubCategoryKind;
  /** Original category slug if this subcategory maps to a docx category */
  legacyCategoryId?: string;
  /** Category sent to POST /api/company/documents */
  targetBackendCategory?: string;
  /** For kind="list", the single document_type that files under this list take */
  documentType?: string;
  /** For kind="checklist", the taxonomy documents belonging to this subcategory */
  documents?: TaxonomyDocument[];
  /** For kind="external", URL route to navigate to */
  externalRoute?: string;
  /** For kind="external", badge text shown */
  externalBadge?: string;
  icon?: LucideIcon;
}

export interface VaultSectionTheme {
  accent: "cobalt" | "indigo" | "amber" | "emerald" | "cyan";
  /** Icon container styling */
  iconContainer: string;
  /** Section number tag styling */
  sectionTag: string;
  /** Active subcategory tab / navigation indicator */
  activeTab: string;
  /** Subtle gradient background tint for card / header banner */
  gradientSurface: string;
  /** Hover border color */
  hoverBorder: string;
  /** Accent dot color for punch-list and search */
  dotColor: string;
  /** Accent text color for titles on hover */
  accentText: string;
}

export interface VaultSection {
  id: VaultSectionId;
  number: number;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  subCategories: VaultSubCategory[];
  theme: VaultSectionTheme;
}

// ---------------------------------------------------------------------------
// 4 New Virtual Document Types (All Optional)
// ---------------------------------------------------------------------------

export const NEW_DOCUMENT_TYPES: TaxonomyDocument[] = [
  {
    key: "client_contract",
    label: "Client Contract",
    requirement: "optional",
    sourceStatus: "Recommended",
    detail: "Executed client contracts, service agreements, MSAs, and work orders.",
    reference: null,
    categoryId: "contracts_ip_legal",
  },
  {
    key: "vendor_contract",
    label: "Vendor Contract",
    requirement: "optional",
    sourceStatus: "Recommended",
    detail: "Executed vendor contracts, supplier SLAs, and procurement agreements.",
    reference: null,
    categoryId: "contracts_ip_legal",
  },
  {
    key: "sales_invoice",
    label: "Sales Invoice",
    requirement: "optional",
    sourceStatus: "Recommended",
    detail: "Client-facing tax invoices, billing statements, and credit notes.",
    reference: null,
    categoryId: "invoices",
  },
  {
    key: "purchase_invoice",
    label: "Purchase Invoice",
    requirement: "optional",
    sourceStatus: "Recommended",
    detail: "Vendor invoices, supplier bills, and payment receipts.",
    reference: null,
    categoryId: "invoices",
  },
];

const NEW_DOCUMENTS_BY_KEY = new Map<string, TaxonomyDocument>(
  NEW_DOCUMENT_TYPES.map((doc) => [doc.key, doc]),
);

export function getNewDocumentType(key: string | null | undefined): TaxonomyDocument | null {
  if (!key) return null;
  return NEW_DOCUMENTS_BY_KEY.get(key) ?? null;
}

// ---------------------------------------------------------------------------
// Category 4 Decomposition: 19 docs -> 7 Annual + 6 Other Financial + 6 Bank
// ---------------------------------------------------------------------------

const cat4 = DOCUMENT_CATEGORIES.find((c) => c.id === "financial_banking");
const cat4Docs = cat4?.documents ?? [];

const BANK_DOC_KEYS = new Set([
  "bank_statements", // Required
  "bank_reconciliation",
  "cash_balance_burn",
  "cash_flow_statement",
  "debt_schedules",
  "contingent_liabilities_schedule",
]);

const ANNUAL_STMT_KEYS = new Set([
  "audited_financial_statements",
  "profit_loss_statement",
  "balance_sheet",
  "trial_balance_gl",
  "monthly_mis",
  "budget_vs_actual",
  "financial_model",
]);

const OTHER_FINANCIAL_KEYS = new Set([
  "receivables_payables_ageing",
  "revenue_evidence",
  "inventory_register",
  "payroll_summary",
  "fixed_asset_register",
  "related_party_schedule",
]);

const bankDocumentsList: TaxonomyDocument[] = cat4Docs.filter((doc) => BANK_DOC_KEYS.has(doc.key));

const annualFinancialStatementsList: TaxonomyDocument[] = cat4Docs.filter((doc) =>
  ANNUAL_STMT_KEYS.has(doc.key),
);

const otherFinancialRecordsList: TaxonomyDocument[] = cat4Docs.filter((doc) =>
  OTHER_FINANCIAL_KEYS.has(doc.key),
);

// Other original categories
const cat1 = DOCUMENT_CATEGORIES.find((c) => c.id === "identity_kyb_authority");
const cat2 = DOCUMENT_CATEGORIES.find((c) => c.id === "registration_legal_structure");
const cat3 = DOCUMENT_CATEGORIES.find((c) => c.id === "tax_statutory_compliance");
const cat5 = DOCUMENT_CATEGORIES.find((c) => c.id === "licenses_permits_approvals");
const cat6 = DOCUMENT_CATEGORIES.find((c) => c.id === "certifications_assurance");
const cat7 = DOCUMENT_CATEGORIES.find((c) => c.id === "ownership_governance_capital");
const cat8 = DOCUMENT_CATEGORIES.find((c) => c.id === "contracts_ip_legal");

// ---------------------------------------------------------------------------
// 7 Top-Level Vault Sections
// ---------------------------------------------------------------------------

export const VAULT_SECTIONS: VaultSection[] = [
  {
    id: "regulatory",
    number: 1,
    label: "Regulatory",
    shortLabel: "Regulatory",
    description: "Statutory identification, constitutional filings, tax compliance, and licenses.",
    icon: ShieldCheck,
    subCategories: [
      {
        id: "identity_kyb_authority",
        label: "Identity & Authority",
        shortLabel: "Identity",
        description:
          cat1?.answers ?? "Who is the entity, who is acting for it, and who is authorized?",
        kind: "checklist",
        legacyCategoryId: "identity_kyb_authority",
        targetBackendCategory: "identity_kyb_authority",
        documents: cat1?.documents ?? [],
        icon: Fingerprint,
      },
      {
        id: "registration_legal_structure",
        label: "Registration & Legal Structure",
        shortLabel: "Registration",
        description: cat2?.answers ?? "Does the entity legally exist and how is it constituted?",
        kind: "checklist",
        legacyCategoryId: "registration_legal_structure",
        targetBackendCategory: "registration_legal_structure",
        documents: cat2?.documents ?? [],
        icon: Building2,
      },
      {
        id: "tax_statutory_compliance",
        label: "Tax & Statutory Compliance",
        shortLabel: "Tax & Statutory",
        description: cat3?.answers ?? "Is the entity registered for taxes and filing on time?",
        kind: "checklist",
        legacyCategoryId: "tax_statutory_compliance",
        targetBackendCategory: "tax_statutory_compliance",
        documents: cat3?.documents ?? [],
        icon: Scale,
      },
      {
        id: "licenses_permits_approvals",
        label: "Licenses & Permits",
        shortLabel: "Licenses",
        description:
          cat5?.answers ?? "What operational, sector-specific and statutory permits are held?",
        kind: "checklist",
        legacyCategoryId: "licenses_permits_approvals",
        targetBackendCategory: "licenses_permits_approvals",
        documents: cat5?.documents ?? [],
        icon: FileSpreadsheet,
      },
      {
        id: "ownership_governance_capital",
        label: "Ownership & Capital Structure",
        shortLabel: "Ownership",
        description:
          cat7?.answers ?? "Who owns the entity, what instruments exist, and how is it governed?",
        kind: "checklist",
        legacyCategoryId: "ownership_governance_capital",
        targetBackendCategory: "ownership_governance_capital",
        documents: cat7?.documents ?? [],
        icon: PieChart,
      },
    ],
    theme: {
      accent: "cobalt",
      iconContainer: "bg-brand/10 text-brand border-brand/20",
      sectionTag: "bg-brand/10 text-brand border-brand/20",
      activeTab: "bg-brand text-on-brand border-brand shadow-xs",
      gradientSurface: "from-brand/6 via-surface to-surface",
      hoverBorder: "hover:border-brand/40",
      dotColor: "bg-brand",
      accentText: "text-brand",
    },
  },
  {
    id: "contracts",
    number: 2,
    label: "Contracts",
    shortLabel: "Contracts",
    description: "Executed client agreements, supplier SLAs, and material intellectual property.",
    icon: ScrollText,
    subCategories: [
      {
        id: "client_contracts",
        label: "Client Contracts",
        shortLabel: "Client",
        description:
          "Customer agreements, MSAs, statements of work, and enterprise service contracts.",
        kind: "list",
        documentType: "client_contract",
        targetBackendCategory: "contracts_ip_legal",
        icon: ScrollText,
      },
      {
        id: "vendor_contracts",
        label: "Vendor Contracts",
        shortLabel: "Vendor",
        description:
          "Vendor agreements, supplier SLAs, procurement contracts, and partner arrangements.",
        kind: "list",
        documentType: "vendor_contract",
        targetBackendCategory: "contracts_ip_legal",
        icon: ScrollText,
      },
      {
        id: "contracts_ip_legal",
        label: "Legal & IP Records",
        shortLabel: "Legal & IP",
        description:
          cat8?.answers ?? "What contractual commitments, IP assets and dispute risks exist?",
        kind: "checklist",
        legacyCategoryId: "contracts_ip_legal",
        targetBackendCategory: "contracts_ip_legal",
        documents: cat8?.documents ?? [],
        icon: FileText,
      },
    ],
    theme: {
      accent: "indigo",
      iconContainer: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20",
      sectionTag: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20",
      activeTab: "bg-brand-secondary text-white border-brand-secondary shadow-xs",
      gradientSurface: "from-brand-secondary/6 via-surface to-surface",
      hoverBorder: "hover:border-brand-secondary/40",
      dotColor: "bg-brand-secondary",
      accentText: "text-brand-secondary",
    },
  },
  {
    id: "certifications",
    number: 3,
    label: "Certifications",
    shortLabel: "Certifications",
    description: "Quality management accreditations, security standards, and ESG credentials.",
    icon: Award,
    subCategories: [
      {
        id: "certifications_assurance",
        label: "Certifications & Accreditations",
        shortLabel: "Certifications",
        description:
          cat6?.answers ?? "What quality, security, and sustainability standards are certified?",
        kind: "checklist",
        legacyCategoryId: "certifications_assurance",
        targetBackendCategory: "certifications_assurance",
        documents: cat6?.documents ?? [],
        icon: Award,
      },
    ],
    theme: {
      accent: "amber",
      iconContainer:
        "bg-severity-moderate/15 text-amber-800 dark:text-amber-300 border-severity-moderate/30",
      sectionTag:
        "bg-severity-moderate/15 text-amber-800 dark:text-amber-300 border-severity-moderate/30",
      activeTab: "bg-amber-600 text-white border-amber-600 shadow-xs",
      gradientSurface: "from-severity-moderate/8 via-surface to-surface",
      hoverBorder: "hover:border-severity-moderate/50",
      dotColor: "bg-amber-500",
      accentText: "text-amber-700 dark:text-amber-400",
    },
  },
  {
    id: "financial-statements",
    number: 4,
    label: "Financial & Banking Statements",
    shortLabel: "Financials",
    description:
      "Audited accounts, management statements, bank records, cash-flow evidence, and reconciliation files.",
    icon: FileSpreadsheet,
    subCategories: [
      {
        id: "annual_financial_statements",
        label: "Annual Financial Statements",
        shortLabel: "Annual Statements",
        description:
          "Statutory audited financials, balance sheets, profit & loss statements, and budgets.",
        kind: "checklist",
        legacyCategoryId: "financial_banking",
        targetBackendCategory: "financial_banking",
        documents: annualFinancialStatementsList,
        icon: FileSpreadsheet,
      },
      {
        id: "other_financial_records",
        label: "Other Financial Records",
        shortLabel: "Other Records",
        description:
          "Ageing schedules, fixed asset register, payroll records, and related party disclosures.",
        kind: "checklist",
        legacyCategoryId: "financial_banking",
        targetBackendCategory: "financial_banking",
        documents: otherFinancialRecordsList,
        icon: FileText,
      },
      {
        id: "bank_statements_external",
        label: "Bank Statements",
        shortLabel: "Bank Statements",
        description:
          "Continuous bank statement feeds and transactional data parsed in the Statements module.",
        kind: "external",
        externalRoute: "/spending/statements",
        externalBadge: "Statements Module",
        icon: Landmark,
      },
      {
        id: "bank_documents_checklist",
        label: "Bank & Cash Documents",
        shortLabel: "Bank Documents",
        description:
          "Statutory bank statements, cash-burn summaries, debt schedules, and reconciliation files.",
        kind: "checklist",
        legacyCategoryId: "financial_banking",
        targetBackendCategory: "financial_banking",
        documents: bankDocumentsList,
        icon: FileSpreadsheet,
      },
    ],
    theme: {
      accent: "emerald",
      iconContainer: "bg-success/15 text-emerald-800 dark:text-emerald-300 border-success/30",
      sectionTag: "bg-success/12 text-emerald-800 dark:text-emerald-300 border-success/30",
      activeTab: "bg-emerald-600 text-white border-emerald-600 shadow-xs",
      gradientSurface: "from-success/7 via-surface to-surface",
      hoverBorder: "hover:border-success/50",
      dotColor: "bg-success",
      accentText: "text-emerald-700 dark:text-emerald-400",
    },
  },
  {
    id: "invoices",
    number: 5,
    label: "Invoices",
    shortLabel: "Invoices",
    description:
      "Issued customer invoices and received supplier bills for tax and reconciliation tracking.",
    icon: Receipt,
    subCategories: [
      {
        id: "sales_invoices",
        label: "Sales Invoices",
        shortLabel: "Sales",
        description: "Issued client invoices, billing records, and receivable documentation.",
        kind: "list",
        documentType: "sales_invoice",
        targetBackendCategory: "invoices",
        icon: Receipt,
      },
      {
        id: "purchase_invoices",
        label: "Purchase Invoices",
        shortLabel: "Purchase",
        description: "Vendor bills, supplier invoices, payable claims, and expense vouchers.",
        kind: "list",
        documentType: "purchase_invoice",
        targetBackendCategory: "invoices",
        icon: Receipt,
      },
    ],
    theme: {
      accent: "cyan",
      iconContainer: "bg-severity-low/12 text-blue-700 dark:text-blue-300 border-severity-low/30",
      sectionTag: "bg-severity-low/10 text-blue-700 dark:text-blue-300 border-severity-low/30",
      activeTab: "bg-blue-600 text-white border-blue-600 shadow-xs",
      gradientSurface: "from-severity-low/6 via-surface to-surface",
      hoverBorder: "hover:border-severity-low/50",
      dotColor: "bg-severity-low",
      accentText: "text-severity-low",
    },
  },
];

// Flat lists and lookups
export const ALL_VAULT_DOCUMENTS: TaxonomyDocument[] = [
  ...ALL_TAXONOMY_DOCUMENTS,
  ...NEW_DOCUMENT_TYPES,
];

const SECTIONS_BY_ID = new Map<VaultSectionId, VaultSection>(
  VAULT_SECTIONS.map((sec) => [sec.id, sec]),
);

export function getSection(sectionId: string | null | undefined): VaultSection | null {
  if (!sectionId) return null;
  return SECTIONS_BY_ID.get(sectionId as VaultSectionId) ?? null;
}

/**
 * Returns the primary VaultSection for a document key (all 87 taxonomy keys + 4 new types).
 */
export function getSectionForDocument(documentKey: string | null | undefined): VaultSection | null {
  if (!documentKey) return null;

  if (documentKey === "client_contract" || documentKey === "vendor_contract") {
    return SECTIONS_BY_ID.get("contracts") ?? null;
  }
  if (documentKey === "sales_invoice" || documentKey === "purchase_invoice") {
    return SECTIONS_BY_ID.get("invoices") ?? null;
  }

  if (
    BANK_DOC_KEYS.has(documentKey) ||
    ANNUAL_STMT_KEYS.has(documentKey) ||
    OTHER_FINANCIAL_KEYS.has(documentKey)
  ) {
    return SECTIONS_BY_ID.get("financial-statements") ?? null;
  }

  for (const section of VAULT_SECTIONS) {
    for (const sub of section.subCategories) {
      if (sub.documents?.some((doc) => doc.key === documentKey)) {
        return section;
      }
    }
  }

  return null;
}

/**
 * Returns the section and subcategory IDs for a document key.
 */
export function getSubCategoryForDocument(
  documentKey: string | null | undefined,
): { sectionId: VaultSectionId; subId: string } | null {
  if (!documentKey) return null;

  if (documentKey === "client_contract") {
    return { sectionId: "contracts", subId: "client_contracts" };
  }
  if (documentKey === "vendor_contract") {
    return { sectionId: "contracts", subId: "vendor_contracts" };
  }
  if (documentKey === "sales_invoice") {
    return { sectionId: "invoices", subId: "sales_invoices" };
  }
  if (documentKey === "purchase_invoice") {
    return { sectionId: "invoices", subId: "purchase_invoices" };
  }

  for (const section of VAULT_SECTIONS) {
    for (const sub of section.subCategories) {
      if (sub.documents?.some((doc) => doc.key === documentKey)) {
        return { sectionId: section.id, subId: sub.id };
      }
    }
  }

  return null;
}

/**
 * Returns the primary VaultSection for an old 1-8 category ID.
 */
export function getSectionForCategory(categoryId: string | null | undefined): VaultSection | null {
  if (!categoryId) return null;

  switch (categoryId) {
    case "identity_kyb_authority":
    case "registration_legal_structure":
    case "tax_statutory_compliance":
    case "licenses_permits_approvals":
    case "licenses_permits":
    case "ownership_governance_capital":
    case "ownership_capital_governance":
      return SECTIONS_BY_ID.get("regulatory") ?? null;

    case "contracts_ip_legal":
      return SECTIONS_BY_ID.get("contracts") ?? null;

    case "certifications_assurance":
    case "certifications_accreditations":
      return SECTIONS_BY_ID.get("certifications") ?? null;

    case "financial_banking":
      return SECTIONS_BY_ID.get("financial-statements") ?? null;

    case "invoices":
      return SECTIONS_BY_ID.get("invoices") ?? null;

    default:
      return null;
  }
}

/**
 * Redirect resolution: Maps legacy 8 category slugs to new section + subcategory query param.
 */
export function legacyCategoryToRoute(categoryId: string): {
  sectionId: VaultSectionId;
  sub?: string;
} | null {
  switch (categoryId) {
    case "identity_kyb_authority":
      return { sectionId: "regulatory", sub: "identity_kyb_authority" };
    case "registration_legal_structure":
      return { sectionId: "regulatory", sub: "registration_legal_structure" };
    case "tax_statutory_compliance":
      return { sectionId: "regulatory", sub: "tax_statutory_compliance" };
    case "financial_banking":
      return { sectionId: "financial-statements", sub: "annual_financial_statements" };
    case "licenses_permits_approvals":
    case "licenses_permits":
      return { sectionId: "regulatory", sub: "licenses_permits_approvals" };
    case "certifications_assurance":
    case "certifications_accreditations":
      return { sectionId: "certifications", sub: "certifications_assurance" };
    case "ownership_governance_capital":
    case "ownership_capital_governance":
      return { sectionId: "regulatory", sub: "ownership_governance_capital" };
    case "contracts_ip_legal":
      return { sectionId: "contracts", sub: "contracts_ip_legal" };
    default:
      return null;
  }
}

/**
 * Resolve display label and metadata for any document type (taxonomy or 4 new types).
 */
export function resolveDocumentMetadata(typeKey: string | null | undefined): {
  label: string;
  requirement: "required" | "optional";
  detail: string;
} {
  if (!typeKey) {
    return {
      label: "Custom Document",
      requirement: "optional",
      detail: "Uploaded file",
    };
  }

  const newDoc = getNewDocumentType(typeKey);
  if (newDoc) {
    return {
      label: newDoc.label,
      requirement: newDoc.requirement,
      detail: newDoc.detail,
    };
  }

  const taxDoc = ALL_TAXONOMY_DOCUMENTS.find((d) => d.key === typeKey);
  if (taxDoc) {
    return {
      label: taxDoc.label,
      requirement: taxDoc.requirement,
      detail: taxDoc.detail,
    };
  }

  return {
    label: typeKey.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    requirement: "optional",
    detail: "Uploaded file",
  };
}
