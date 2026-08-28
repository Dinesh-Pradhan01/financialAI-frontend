import {
  Award,
  Banknote,
  Building2,
  Fingerprint,
  PieChart,
  Receipt,
  Scale,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

/**
 * SpotLite document taxonomy — 8 categories.
 *
 * Transcribed verbatim from `SpotLite-Category-selection-v2-verified.docx`
 * ("Verified India-focused version | 25 August 2026"), which is the single
 * source of truth. Do not add documents or categories that are not in that
 * document; if a new requirement appears, update the docx first.
 *
 * Two fields exist purely to keep this file auditable against the source:
 * `sourceStatus` holds the docx's Status cell verbatim, and `reference` holds
 * its Reference marker. Neither is used for logic beyond deriving
 * `requirement`, so a reviewer can diff this file against the docx directly.
 */

/** What the UI badges. The docx has 8 distinct status strings; see `deriveRequirement`. */
export type DocumentRequirement = "required" | "optional";

export interface TaxonomyDocument {
  /**
   * Stable slug sent to the backend as `document_type`. Six keys are inherited
   * from the previous `KNOWN_DOCUMENT_SLOTS` taxonomy so that already-uploaded
   * documents keep resolving to a row instead of orphaning — see
   * `LEGACY_TYPE_KEYS` below. Never rename a key that has shipped.
   */
  key: string;
  /** Document name, verbatim from the docx. */
  label: string;
  /** Badge shown on the row. Derived from `sourceStatus`. */
  requirement: DocumentRequirement;
  /**
   * The docx "Status" cell, verbatim. `null` for categories 5 and 6, which have
   * no Status column in the source at all.
   */
  sourceStatus: string | null;
  /**
   * One line of row-level guidance, verbatim from the docx. Which column this
   * came from depends on the category — see `DocumentCategory.detailLabel`.
   */
  detail: string;
  /** Reference marker from the docx (e.g. "R9"). `null` where the source has "—". */
  reference: string | null;
  /** Category id, denormalised on for flat lookups. Set by `DOCUMENT_CATEGORIES`. */
  categoryId?: string;
}

export interface DocumentCategory {
  /** Slug sent to the backend as `document_category`. */
  id: string;
  /** Category number from the docx, 1–8. Drives display order. */
  number: number;
  /** Full category name, verbatim from the docx. */
  label: string;
  /** Shortened name for the summary card, where the full name does not fit. */
  shortLabel: string;
  /** The docx "What it answers" cell. */
  answers: string;
  /** The docx "SpotLite feeds" cell. */
  feeds: string;
  /** Header for the `detail` field, since categories 5 and 6 use a different source column. */
  detailLabel: string;
  icon: LucideIcon;
  /** Classification rule carried in the docx for this category, where one exists. */
  note?: string;
  documents: TaxonomyDocument[];
}

/**
 * Status → badge mapping.
 *
 * The brief pinned three cases: "Required" → Required, and both "Required if
 * applicable" and "Recommended" → Optional. The docx contains five further
 * conditional strings ("Required if exists", "Required if material", etc.).
 * All of them share the shape of "Required if applicable" — a requirement
 * gated on a triggering condition — and the docx's own Applicability-rules
 * table groups them together as conditional. So the rule is: only an
 * unconditional "Required" blocks completion; every conditional or
 * recommended status is Optional.
 *
 * Consequence, called out because it is load-bearing: categories 3, 5, 6 and 8
 * contain zero unconditional Required documents, so completion gating rests on
 * 17 documents across categories 1, 2, 4 and 7.
 */
function deriveRequirement(sourceStatus: string | null): DocumentRequirement {
  if (sourceStatus === "Required") return "required";
  return "optional";
}

/** Builds a document row, deriving `requirement` so the two can never drift. */
function doc(
  key: string,
  label: string,
  sourceStatus: string | null,
  detail: string,
  reference: string | null = null,
): TaxonomyDocument {
  return {
    key,
    label,
    requirement: deriveRequirement(sourceStatus),
    sourceStatus,
    detail,
    reference,
  };
}

/**
 * Type keys carried over from the retired `mandatory | optional | recommended`
 * taxonomy. Kept so historical uploads still resolve to a row. If you ever need
 * to migrate them, this is the list to migrate.
 */
export const LEGACY_TYPE_KEYS = [
  "business_pan",
  "registration_proof",
  "address_proof",
  "cancelled_cheque",
  "udyam_certificate",
  "gst_certificate",
] as const;

/** `document_category` value used for uploads that do not map to a taxonomy row. */
export const OTHER_DOCUMENT_CATEGORY_ID = "other";

const CATEGORIES: DocumentCategory[] = [
  {
    id: "identity_kyb_authority",
    number: 1,
    label: "Identity, KYB & Authority",
    shortLabel: "Identity & Authority",
    answers: "Who is the entity, who is acting for it, and who is authorized?",
    feeds: "KYB, entity/signatory verification, fraud/AML signals",
    detailLabel: "Applies to",
    icon: Fingerprint,
    documents: [
      doc(
        "business_pan",
        "Business PAN",
        "Required",
        "All Indian entities where PAN is applicable",
        "R9",
      ),
      doc(
        "registration_proof",
        "Registered entity name + registration identifier (CIN / LLPIN / registration number, as applicable)",
        "Required",
        "Registered entities",
        "R9",
      ),
      doc(
        "address_proof",
        "Business address proof",
        "Required",
        "Entity where address verification is required",
      ),
      doc(
        "cancelled_cheque",
        "Bank account ownership / verification evidence",
        "Required",
        "Operating entities with a business bank account",
      ),
      doc(
        "signatory_identity_proof",
        "Authorized signatory identity proof",
        "Required",
        "Where a signatory acts for the entity",
      ),
      doc(
        "signatory_address_proof",
        "Authorized signatory address proof",
        "Recommended",
        "Where required by the verification workflow",
      ),
      doc(
        "authority_evidence",
        "Authority evidence: board resolution / partner authorization / power of attorney / equivalent",
        "Required",
        "Where authority is not self-evident from constitutional records",
        "R1",
      ),
      doc(
        "udyam_certificate",
        "Udyam Registration Certificate",
        "Recommended",
        "MSME seeking or holding Udyam registration",
        "R10",
      ),
    ],
  },
  {
    id: "registration_legal_structure",
    number: 2,
    label: "Registration, Legal Structure & Government Recognition",
    shortLabel: "Registration & Structure",
    answers:
      "Does the entity legally exist, how is it constituted, and what government recognitions does it hold?",
    feeds: "Legal-existence checks, entity-risk scoring, eligibility signals",
    detailLabel: "Applies to",
    icon: Building2,
    note: "Constitutional documents are entity-type specific — a company will never hold an LLP Agreement, and an LLP will never hold an MOA. Upload the ones that match how your entity is constituted.",
    documents: [
      doc(
        "certificate_of_incorporation",
        "Certificate of Incorporation / Registration",
        "Required",
        "Companies, LLPs and other registered entities",
        "R1",
      ),
      doc(
        "moa_aoa",
        "Memorandum of Association (MOA) & Articles of Association (AOA)",
        "Required",
        "Companies",
        "R1",
      ),
      doc("llp_agreement", "LLP Agreement", "Required", "LLPs", "R1"),
      doc("partnership_deed", "Partnership Deed", "Required", "Partnership firms", "R1"),
      doc(
        "trust_society_instrument",
        "Trust Deed / Society registration certificate / governing instrument",
        "Required",
        "Trusts, societies and similar entities",
        "R1",
      ),
      doc(
        "sole_proprietorship_evidence",
        "Sole proprietorship existence evidence / declaration",
        "Required",
        "Sole proprietorships",
      ),
      doc(
        "dpiit_startup_recognition",
        "DPIIT Startup Recognition Certificate",
        "Recommended",
        "Recognised startups",
        "R7",
      ),
      doc(
        "import_export_code",
        "Import-Export Code (IEC)",
        "Required if applicable",
        "Entities importing/exporting unless specifically exempt",
        "R6",
      ),
    ],
  },
  {
    id: "tax_statutory_compliance",
    number: 3,
    label: "Tax & Statutory Compliance",
    shortLabel: "Tax & Statutory",
    answers: "Is the entity meeting recurring tax, corporate and statutory obligations?",
    feeds: "Compliance status, filing gaps, statutory-risk signals",
    detailLabel: "Applies to",
    icon: Receipt,
    documents: [
      doc(
        "gst_certificate",
        "GST Registration Certificate",
        "Required if applicable",
        "GST-registered / required-to-register entities",
        "R2",
      ),
      doc(
        "gst_returns",
        "GST returns: applicable GSTR-1, GSTR-3B and other applicable returns",
        "Required if applicable",
        "GST-registered entities according to applicable return obligations",
        "R2",
      ),
      doc(
        "income_tax_return",
        "Income Tax Return (latest filed)",
        "Required if filed / applicable",
        "Entities with filing obligation",
        "R9",
      ),
      doc(
        "tds_returns_challans",
        "TDS returns and challans",
        "Required if applicable",
        "Entities with applicable TDS obligations",
        "R9",
      ),
      doc(
        "roc_annual_filings",
        "ROC annual filings: AOC-4, MGT-7/MGT-7A or applicable filings",
        "Required if applicable",
        "Companies according to legal filing obligations",
        "R1",
      ),
      doc(
        "epf_compliance",
        "EPF registration and compliance evidence",
        "Required if applicable",
        "Covered establishments",
        "R8",
      ),
      doc(
        "esic_compliance",
        "ESIC registration and compliance evidence",
        "Required if applicable",
        "Covered establishments",
        "R11",
      ),
      doc(
        "professional_tax",
        "Professional Tax registration / returns",
        "Required if applicable",
        "Entities in applicable states",
      ),
      doc(
        "tax_statutory_notices",
        "Material tax / statutory notices, demands, orders or assessments",
        "Required if exists",
        "Entities with such proceedings",
        "R9",
      ),
    ],
  },
  {
    id: "financial_banking",
    number: 4,
    label: "Financial & Banking",
    shortLabel: "Financial & Banking",
    answers: "What do cash, performance, liabilities and financial records say?",
    feeds: "Burn, runway, revenue quality, reconciliation, obligation signals",
    detailLabel: "Applies to",
    icon: Banknote,
    documents: [
      doc(
        "bank_statements",
        "Bank statements for operating accounts",
        "Required",
        "Operating entities",
      ),
      doc(
        "trial_balance_gl",
        "Trial Balance & General Ledger",
        "Recommended",
        "Entities maintaining formal books",
      ),
      doc("profit_loss_statement", "Profit & Loss Statement", "Recommended", "Operating entities"),
      doc(
        "balance_sheet",
        "Balance Sheet / financial position statement",
        "Recommended",
        "Entities maintaining formal financial statements",
      ),
      doc(
        "cash_flow_statement",
        "Cash-flow statement",
        "Recommended",
        "Entities where available / required",
      ),
      doc(
        "cash_balance_burn",
        "Current cash balance & burn summary",
        "Recommended",
        "Cash-consuming / venture-backed / growth entities",
      ),
      doc(
        "bank_reconciliation",
        "Bank reconciliation statements",
        "Recommended",
        "Entities with material banking activity",
      ),
      doc(
        "receivables_payables_ageing",
        "Receivables & payables ageing",
        "Recommended",
        "Entities with material credit sales / purchases",
      ),
      doc(
        "revenue_evidence",
        "Revenue evidence: sales register / invoice register / revenue reconciliation",
        "Recommended",
        "Revenue-generating entities",
      ),
      doc(
        "inventory_register",
        "Inventory register / ageing",
        "Required if material",
        "Inventory-holding entities",
      ),
      doc(
        "payroll_summary",
        "Payroll / people-cost summary",
        "Recommended",
        "Entities with employees or material contractor costs",
      ),
      doc(
        "fixed_asset_register",
        "Fixed asset register & depreciation schedule",
        "Required if material",
        "Entities with depreciable fixed assets",
      ),
      doc(
        "debt_schedules",
        "Debt, shareholder-loan and repayment schedules",
        "Required if exists",
        "Entities with borrowings or shareholder/founder loans",
      ),
      doc(
        "related_party_schedule",
        "Related-party transaction schedule",
        "Required if material / applicable",
        "Entities with related-party transactions",
        "R1",
      ),
      doc(
        "audited_financial_statements",
        "Audited financial statements",
        "Required where legally required; otherwise recommended when available",
        "Entities subject to audit or with audited accounts",
        "R1",
      ),
      doc(
        "monthly_mis",
        "Monthly MIS / management accounts",
        "Recommended",
        "Entities with management/investor reporting",
      ),
      doc(
        "budget_vs_actual",
        "Budget-vs-Actual reports",
        "Recommended",
        "Entities using formal budgeting",
      ),
      doc(
        "financial_model",
        "Financial model / use-of-funds statement",
        "Recommended",
        "Fundraising or funded entities",
      ),
      doc(
        "contingent_liabilities_schedule",
        "Contingent liabilities / guarantees / material provisions schedule",
        "Required if material",
        "Entities with material contingent obligations",
      ),
    ],
  },
  {
    id: "licenses_permits_approvals",
    number: 5,
    label: "Licenses, Permits & Regulatory Approvals",
    shortLabel: "Licenses & Permits",
    answers: "Is the entity legally permitted to conduct its specific activities?",
    feeds: "Operating-legality and regulatory-risk flags",
    detailLabel: "Approvals to capture",
    icon: ScrollText,
    note: "Grouped by business activity — upload the approvals that match what your entity actually does. The source document does not assign a required/optional status to these rows, so all are Optional.",
    documents: [
      doc(
        "license_retail",
        "Retail / physical commerce",
        null,
        "Trade / municipal permissions where applicable; sector/product-specific approvals",
        "State/local",
      ),
      doc(
        "license_ecommerce",
        "E-commerce / marketplace",
        null,
        "Applicable sector/product approvals; marketplace agreements and brand authorization belong in Category 8",
      ),
      doc(
        "license_manufacturing",
        "Manufacturing",
        null,
        "Factory approvals/licences, pollution-control consents, fire approvals and other activity-specific permissions",
        "State/CPCB/SPCB",
      ),
      doc(
        "license_food_hospitality",
        "Food & Hospitality",
        null,
        "Applicable FSSAI registration or licence; local health/trade/fire permissions as applicable",
        "R5",
      ),
      doc(
        "license_healthcare",
        "Healthcare",
        null,
        "Activity-specific establishment, drug/pharmacy, professional, biomedical-waste, device/radiation and other applicable approvals",
        "Sector/state",
      ),
      doc(
        "license_education",
        "Education",
        null,
        "Applicable institution registration, affiliation and regulator approvals",
        "Sector/state",
      ),
      doc(
        "license_construction_realestate",
        "Construction & Real Estate",
        null,
        "Contractor/labour registrations, RERA and fire/building approvals where applicable",
        "Sector/state",
      ),
      doc(
        "license_logistics_transport",
        "Logistics & Transportation",
        null,
        "Activity-specific carrier/vehicle/transport permits and registrations; insurance evidence may also be captured as operational evidence",
        "Sector/state",
      ),
      doc(
        "license_software_saas_it",
        "Software / SaaS / IT Services",
        null,
        "No generic IT licence; capture activity-specific approvals where the service is regulated",
      ),
      doc(
        "license_fintech_lending",
        "Fintech Lending",
        null,
        "Applicable RBI/regulatory status and arrangements based on the actual regulated activity and operating model",
        "R3",
      ),
      doc(
        "license_fintech_payments",
        "Fintech Payments",
        null,
        "Applicable RBI authorisation / bank or regulated-partner arrangements based on the actual operating model",
        "R3",
      ),
      doc(
        "license_fintech_regulated_other",
        "Fintech Insurance / Securities / Investments / Account Aggregation / other",
        null,
        "Applicable IRDAI / SEBI / RBI or other regulator approvals based on the activity",
        "R3",
      ),
      doc(
        "license_professional_services",
        "Professional Services",
        null,
        "Profession-specific registrations/licences where required; professional tax belongs in Category 3",
        "Sector/state",
      ),
      doc(
        "license_other_activity",
        "Other",
        null,
        "Industry-specific licence / permit / approval with free-text activity and document upload",
      ),
    ],
  },
  {
    id: "certifications_assurance",
    number: 6,
    label: "Certifications, Accreditations & Independent Assurance",
    shortLabel: "Certifications",
    answers: "Has an independent body validated relevant quality, security or sector standards?",
    feeds: "Trust, assurance, partner/investor-readiness signals",
    detailLabel: "Certification / assurance",
    icon: Award,
    note: "Regulatory approvals, professional registrations and government recognitions do not belong here — they live in Registration & Structure or Licenses & Permits. The source document does not assign a required/optional status to these rows, so all are Optional.",
    documents: [
      doc(
        "cert_manufacturing_quality",
        "Manufacturing / Quality",
        null,
        "ISO 9001 or relevant sector standards",
        "R12",
      ),
      doc(
        "cert_information_security",
        "Technology / Information Security",
        null,
        "ISO/IEC 27001, SOC 2 report or other independent assurance where held",
        "R12",
      ),
      doc(
        "cert_healthcare",
        "Healthcare",
        null,
        "NABH or relevant accreditation where held",
        "R13",
      ),
      doc(
        "cert_food",
        "Food",
        null,
        "Relevant voluntary quality / safety certifications where held",
      ),
      doc(
        "cert_universal",
        "Universal",
        null,
        "ISO or sector-specific certifications/accreditations relevant to the business",
        "R12",
      ),
    ],
  },
  {
    id: "ownership_governance_capital",
    number: 7,
    label: "Ownership, Governance & Capital",
    shortLabel: "Ownership & Capital",
    answers: "Who owns and controls the entity and how is capital structured?",
    feeds: "Dilution, control, governance and beneficial-ownership signals",
    detailLabel: "Applies to",
    icon: PieChart,
    note: "Beneficial ownership does not use a universal 25% threshold. For Companies Act reporting-company SBO rules the MCA framework applies the statutory test, including not less than 10% rights/entitlements or significant influence/control; other AML regimes may use different thresholds.",
    documents: [
      doc(
        "cap_table",
        "Current cap table",
        "Required",
        "Companies / entities with an equity or capital ownership structure",
        "R1",
      ),
      doc(
        "partner_contribution_schedule",
        "Partner contribution / ownership schedule",
        "Required",
        "Partnerships / LLPs",
        "R1",
      ),
      doc(
        "trustee_beneficiary_structure",
        "Trustee / beneficiary / governing ownership structure",
        "Required",
        "Trusts and similar entities where applicable",
      ),
      doc(
        "founder_promoter_ownership",
        "Founder / promoter ownership evidence",
        "Required",
        "Entities with founders/promoters or equivalent controlling persons",
      ),
      doc(
        "share_certificates_allotment",
        "Share certificates / allotment / issue records",
        "Required if applicable",
        "Companies issuing shares or other relevant instruments",
        "R1",
      ),
      doc(
        "register_of_members",
        "Register of members / shareholders",
        "Required if applicable",
        "Companies",
        "R1",
      ),
      doc(
        "esop_scheme_register",
        "ESOP / employee equity scheme, grant register & vesting schedule",
        "Required if exists",
        "Entities with employee equity arrangements",
        "R1",
      ),
      doc(
        "beneficial_ownership_sbo",
        "Beneficial ownership / SBO declarations and filings",
        "Required if applicable",
        "Reporting companies and other entities subject to applicable beneficial-ownership regimes",
        "R4",
      ),
      doc(
        "capital_action_resolutions",
        "Board / shareholder / partner resolutions approving material capital actions",
        "Required if applicable",
        "Entity according to constitutional/legal requirements",
        "R1",
      ),
      doc(
        "investment_agreements",
        "Share subscription / shareholders / investment agreements",
        "Required if exists",
        "Entities that have entered such agreements",
      ),
      doc(
        "convertible_instruments",
        "Convertible instruments: SAFE-equivalent, convertible notes, CCPS, CCDs, warrants or similar instruments",
        "Required if exists",
        "Entities that have issued such instruments",
        "R3",
      ),
      doc(
        "valuation_reports",
        "Valuation reports / certificates",
        "Required if applicable",
        "Transactions requiring or supported by valuation",
        "R3",
      ),
      doc(
        "foreign_investment_filings",
        "Foreign investment reporting and related filings: FC-GPR, FC-TRS, LLP-I/LLP-II, CN, FLA or other applicable filings",
        "Required if applicable",
        "Entities with relevant foreign investment transactions",
        "R3",
      ),
    ],
  },
  {
    id: "contracts_ip_legal",
    number: 8,
    label: "Contracts, IP & Legal Obligations",
    shortLabel: "Contracts & IP",
    answers: "What material rights, commitments, liabilities and disputes affect the entity?",
    feeds: "Contractual-risk, IP ownership and contingent-liability signals",
    detailLabel: "Applies to",
    icon: Scale,
    documents: [
      doc(
        "founder_agreements_ip_assignment",
        "Founder agreements and founder IP assignment / assignment chain",
        "Required if exists",
        "Entities with founder-created IP or founder agreements",
      ),
      doc(
        "employment_consultant_agreements",
        "Employment and consultant agreements with IP/confidentiality terms",
        "Recommended",
        "Entities with employees/consultants",
      ),
      doc(
        "customer_contracts",
        "Customer contracts / master service agreements / order forms",
        "Required if material",
        "Contract-revenue entities",
      ),
      doc(
        "vendor_contracts",
        "Vendor / supplier contracts",
        "Required if material",
        "Entities with material supplier commitments",
      ),
      doc(
        "financing_security_agreements",
        "Loan / financing / security / guarantee agreements",
        "Required if exists",
        "Entities with such obligations",
      ),
      doc(
        "lease_agreements",
        "Lease / rent agreements for material premises",
        "Required if material",
        "Entities with material leased premises",
      ),
      doc(
        "ip_registrations",
        "IP registrations and evidence of ownership/licensing",
        "Required if material",
        "Entities with registered or material IP",
      ),
      doc(
        "ip_certificates",
        "Trademark / patent / copyright / design certificates and licences",
        "Required if exists",
        "Entities holding or licensing such rights",
      ),
      doc(
        "litigation_proceedings",
        "Material litigation / arbitration / regulatory proceedings",
        "Required if exists",
        "Entities involved in such proceedings",
      ),
      doc(
        "notices_orders_settlements",
        "Show-cause notices, regulatory notices, court orders and settlement agreements",
        "Required if exists",
        "Entities with such matters",
      ),
      doc(
        "indemnities_contingent_obligations",
        "Material indemnities and contingent contractual obligations",
        "Required if material",
        "Entities with such commitments",
      ),
    ],
  },
];

/** The taxonomy, ordered by category number, with `categoryId` denormalised onto each row. */
export const DOCUMENT_CATEGORIES: DocumentCategory[] = CATEGORIES.map((category) => ({
  ...category,
  documents: category.documents.map((document) => ({
    ...document,
    categoryId: category.id,
  })),
}));

/** Every taxonomy row, flattened. */
export const ALL_TAXONOMY_DOCUMENTS: TaxonomyDocument[] = DOCUMENT_CATEGORIES.flatMap(
  (category) => category.documents,
);

const DOCUMENTS_BY_KEY = new Map(
  ALL_TAXONOMY_DOCUMENTS.map((document) => [document.key, document]),
);

const CATEGORIES_BY_ID = new Map(DOCUMENT_CATEGORIES.map((category) => [category.id, category]));

export function getTaxonomyDocument(typeKey: string | null | undefined): TaxonomyDocument | null {
  if (!typeKey) return null;
  return DOCUMENTS_BY_KEY.get(typeKey) ?? null;
}

export function getDocumentCategory(
  categoryId: string | null | undefined,
): DocumentCategory | null {
  if (!categoryId) return null;
  return CATEGORIES_BY_ID.get(categoryId) ?? null;
}

/** True when a `document_type` is not one of the taxonomy rows. */
export function isUnmappedDocumentType(typeKey: string | null | undefined) {
  return !typeKey || !DOCUMENTS_BY_KEY.has(typeKey);
}

/** Required rows across the whole taxonomy — the set that gates completion. */
export const REQUIRED_DOCUMENT_COUNT = ALL_TAXONOMY_DOCUMENTS.filter(
  (document) => document.requirement === "required",
).length;
