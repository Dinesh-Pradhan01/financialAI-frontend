import { At as Landmark, G as Scale, It as Folder, Mn as Building2, R as ShieldCheck, Tn as ChartPie, Ut as FileText, Vn as Award, W as ScrollText, Wt as FileSpreadsheet, X as Receipt, zn as Banknote, zt as FingerprintPattern } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoryNormalizer-CSNT55UY.js
/**
* Status → badge mapping.
*
* The brief pinned three cases: "Required" → Required, and both "Required if
* applicable" and "Recommended" → Optional. The docx contains five further
* conditional strings ("Required if exists", "Required if material", etc.).
* All of them share the shape of "Required if applicable" a requirement
* gated on a triggering condition and the docx's own Applicability-rules
* table groups them together as conditional. So the rule is: only an
* unconditional "Required" blocks completion; every conditional or
* recommended status is Optional.
*
* Consequence, called out because it is load-bearing: categories 3, 5, 6 and 8
* contain zero unconditional Required documents, so completion gating rests on
* 17 documents across categories 1, 2, 4 and 7.
*/
function deriveRequirement(sourceStatus) {
	if (sourceStatus === "Required") return "required";
	return "optional";
}
/** Builds a document row, deriving `requirement` so the two can never drift. */
function doc(key, label, sourceStatus, detail, reference = null) {
	return {
		key,
		label,
		requirement: deriveRequirement(sourceStatus),
		sourceStatus,
		detail,
		reference
	};
}
/** The taxonomy, ordered by category number, with `categoryId` denormalised onto each row. */
var DOCUMENT_CATEGORIES = [
	{
		id: "identity_kyb_authority",
		number: 1,
		label: "Identity, KYB & Authority",
		shortLabel: "Identity & Authority",
		answers: "Who is the entity, who is acting for it, and who is authorized?",
		feeds: "KYB, entity/signatory verification, fraud/AML signals",
		detailLabel: "Applies to",
		icon: FingerprintPattern,
		documents: [
			doc("business_pan", "Business PAN", "Required", "All Indian entities where PAN is applicable", "R9"),
			doc("registration_proof", "Registered entity name + registration identifier (CIN / LLPIN / registration number, as applicable)", "Required", "Registered entities", "R9"),
			doc("address_proof", "Business address proof", "Required", "Entity where address verification is required"),
			doc("cancelled_cheque", "Bank account ownership / verification evidence", "Required", "Operating entities with a business bank account"),
			doc("signatory_identity_proof", "Authorized signatory identity proof", "Required", "Where a signatory acts for the entity"),
			doc("signatory_address_proof", "Authorized signatory address proof", "Recommended", "Where required by the verification workflow"),
			doc("authority_evidence", "Authority evidence: board resolution / partner authorization / power of attorney / equivalent", "Required", "Where authority is not self-evident from constitutional records", "R1"),
			doc("udyam_certificate", "Udyam Registration Certificate", "Recommended", "MSME seeking or holding Udyam registration", "R10")
		]
	},
	{
		id: "registration_legal_structure",
		number: 2,
		label: "Registration, Legal Structure & Government Recognition",
		shortLabel: "Registration & Structure",
		answers: "Does the entity legally exist, how is it constituted, and what government recognitions does it hold?",
		feeds: "Legal-existence checks, entity-risk scoring, eligibility signals",
		detailLabel: "Applies to",
		icon: Building2,
		note: "Constitutional documents are entity-type specific a company will never hold an LLP Agreement, and an LLP will never hold an MOA. Upload the ones that match how your entity is constituted.",
		documents: [
			doc("certificate_of_incorporation", "Certificate of Incorporation / Registration", "Required", "Companies, LLPs and other registered entities", "R1"),
			doc("moa_aoa", "Memorandum of Association (MOA) & Articles of Association (AOA)", "Required", "Companies", "R1"),
			doc("llp_agreement", "LLP Agreement", "Required", "LLPs", "R1"),
			doc("partnership_deed", "Partnership Deed", "Required", "Partnership firms", "R1"),
			doc("trust_society_instrument", "Trust Deed / Society registration certificate / governing instrument", "Required", "Trusts, societies and similar entities", "R1"),
			doc("sole_proprietorship_evidence", "Sole proprietorship existence evidence / declaration", "Required", "Sole proprietorships"),
			doc("dpiit_startup_recognition", "DPIIT Startup Recognition Certificate", "Recommended", "Recognised startups", "R7"),
			doc("import_export_code", "Import-Export Code (IEC)", "Required if applicable", "Entities importing/exporting unless specifically exempt", "R6")
		]
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
			doc("gst_certificate", "GST Registration Certificate", "Required if applicable", "GST-registered / required-to-register entities", "R2"),
			doc("gst_returns", "GST returns: applicable GSTR-1, GSTR-3B and other applicable returns", "Required if applicable", "GST-registered entities according to applicable return obligations", "R2"),
			doc("income_tax_return", "Income Tax Return (latest filed)", "Required if filed / applicable", "Entities with filing obligation", "R9"),
			doc("tds_returns_challans", "TDS returns and challans", "Required if applicable", "Entities with applicable TDS obligations", "R9"),
			doc("roc_annual_filings", "ROC annual filings: AOC-4, MGT-7/MGT-7A or applicable filings", "Required if applicable", "Companies according to legal filing obligations", "R1"),
			doc("epf_compliance", "EPF registration and compliance evidence", "Required if applicable", "Covered establishments", "R8"),
			doc("esic_compliance", "ESIC registration and compliance evidence", "Required if applicable", "Covered establishments", "R11"),
			doc("professional_tax", "Professional Tax registration / returns", "Required if applicable", "Entities in applicable states"),
			doc("tax_statutory_notices", "Material tax / statutory notices, demands, orders or assessments", "Required if exists", "Entities with such proceedings", "R9")
		]
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
			doc("bank_statements", "Bank statements for operating accounts", "Required", "Operating entities"),
			doc("trial_balance_gl", "Trial Balance & General Ledger", "Recommended", "Entities maintaining formal books"),
			doc("profit_loss_statement", "Profit & Loss Statement", "Recommended", "Operating entities"),
			doc("balance_sheet", "Balance Sheet / financial position statement", "Recommended", "Entities maintaining formal financial statements"),
			doc("cash_flow_statement", "Cash-flow statement", "Recommended", "Entities where available / required"),
			doc("cash_balance_burn", "Current cash balance & burn summary", "Recommended", "Cash-consuming / venture-backed / growth entities"),
			doc("bank_reconciliation", "Bank reconciliation statements", "Recommended", "Entities with material banking activity"),
			doc("receivables_payables_ageing", "Receivables & payables ageing", "Recommended", "Entities with material credit sales / purchases"),
			doc("revenue_evidence", "Revenue evidence: sales register / invoice register / revenue reconciliation", "Recommended", "Revenue-generating entities"),
			doc("inventory_register", "Inventory register / ageing", "Required if material", "Inventory-holding entities"),
			doc("payroll_summary", "Payroll / people-cost summary", "Recommended", "Entities with employees or material contractor costs"),
			doc("fixed_asset_register", "Fixed asset register & depreciation schedule", "Required if material", "Entities with depreciable fixed assets"),
			doc("debt_schedules", "Debt, shareholder-loan and repayment schedules", "Required if exists", "Entities with borrowings or shareholder/founder loans"),
			doc("related_party_schedule", "Related-party transaction schedule", "Required if material / applicable", "Entities with related-party transactions", "R1"),
			doc("audited_financial_statements", "Audited financial statements", "Required where legally required; otherwise recommended when available", "Entities subject to audit or with audited accounts", "R1"),
			doc("monthly_mis", "Monthly MIS / management accounts", "Recommended", "Entities with management/investor reporting"),
			doc("budget_vs_actual", "Budget-vs-Actual reports", "Recommended", "Entities using formal budgeting"),
			doc("financial_model", "Financial model / use-of-funds statement", "Recommended", "Fundraising or funded entities"),
			doc("contingent_liabilities_schedule", "Contingent liabilities / guarantees / material provisions schedule", "Required if material", "Entities with material contingent obligations")
		]
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
		note: "Grouped by business activity upload the approvals that match what your entity actually does. The source document does not assign a required/optional status to these rows, so all are Optional.",
		documents: [
			doc("license_retail", "Retail / physical commerce", null, "Trade / municipal permissions where applicable; sector/product-specific approvals", "State/local"),
			doc("license_ecommerce", "E-commerce / marketplace", null, "Applicable sector/product approvals; marketplace agreements and brand authorization belong in Category 8"),
			doc("license_manufacturing", "Manufacturing", null, "Factory approvals/licences, pollution-control consents, fire approvals and other activity-specific permissions", "State/CPCB/SPCB"),
			doc("license_food_hospitality", "Food & Hospitality", null, "Applicable FSSAI registration or licence; local health/trade/fire permissions as applicable", "R5"),
			doc("license_healthcare", "Healthcare", null, "Activity-specific establishment, drug/pharmacy, professional, biomedical-waste, device/radiation and other applicable approvals", "Sector/state"),
			doc("license_education", "Education", null, "Applicable institution registration, affiliation and regulator approvals", "Sector/state"),
			doc("license_construction_realestate", "Construction & Real Estate", null, "Contractor/labour registrations, RERA and fire/building approvals where applicable", "Sector/state"),
			doc("license_logistics_transport", "Logistics & Transportation", null, "Activity-specific carrier/vehicle/transport permits and registrations; insurance evidence may also be captured as operational evidence", "Sector/state"),
			doc("license_software_saas_it", "Software / SaaS / IT Services", null, "No generic IT licence; capture activity-specific approvals where the service is regulated"),
			doc("license_fintech_lending", "Fintech Lending", null, "Applicable RBI/regulatory status and arrangements based on the actual regulated activity and operating model", "R3"),
			doc("license_fintech_payments", "Fintech Payments", null, "Applicable RBI authorisation / bank or regulated-partner arrangements based on the actual operating model", "R3"),
			doc("license_fintech_regulated_other", "Fintech Insurance / Securities / Investments / Account Aggregation / other", null, "Applicable IRDAI / SEBI / RBI or other regulator approvals based on the activity", "R3"),
			doc("license_professional_services", "Professional Services", null, "Profession-specific registrations/licences where required; professional tax belongs in Category 3", "Sector/state"),
			doc("license_other_activity", "Other", null, "Industry-specific licence / permit / approval with free-text activity and document upload")
		]
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
		note: "Regulatory approvals, professional registrations and government recognitions do not belong here they live in Registration & Structure or Licenses & Permits. The source document does not assign a required/optional status to these rows, so all are Optional.",
		documents: [
			doc("cert_manufacturing_quality", "Manufacturing / Quality", null, "ISO 9001 or relevant sector standards", "R12"),
			doc("cert_information_security", "Technology / Information Security", null, "ISO/IEC 27001, SOC 2 report or other independent assurance where held", "R12"),
			doc("cert_healthcare", "Healthcare", null, "NABH or relevant accreditation where held", "R13"),
			doc("cert_food", "Food", null, "Relevant voluntary quality / safety certifications where held"),
			doc("cert_universal", "Universal", null, "ISO or sector-specific certifications/accreditations relevant to the business", "R12")
		]
	},
	{
		id: "ownership_governance_capital",
		number: 7,
		label: "Ownership, Governance & Capital",
		shortLabel: "Ownership & Capital",
		answers: "Who owns and controls the entity and how is capital structured?",
		feeds: "Dilution, control, governance and beneficial-ownership signals",
		detailLabel: "Applies to",
		icon: ChartPie,
		note: "Beneficial ownership does not use a universal 25% threshold. For Companies Act reporting-company SBO rules the MCA framework applies the statutory test, including not less than 10% rights/entitlements or significant influence/control; other AML regimes may use different thresholds.",
		documents: [
			doc("cap_table", "Current cap table", "Required", "Companies / entities with an equity or capital ownership structure", "R1"),
			doc("partner_contribution_schedule", "Partner contribution / ownership schedule", "Required", "Partnerships / LLPs", "R1"),
			doc("trustee_beneficiary_structure", "Trustee / beneficiary / governing ownership structure", "Required", "Trusts and similar entities where applicable"),
			doc("founder_promoter_ownership", "Founder / promoter ownership evidence", "Required", "Entities with founders/promoters or equivalent controlling persons"),
			doc("share_certificates_allotment", "Share certificates / allotment / issue records", "Required if applicable", "Companies issuing shares or other relevant instruments", "R1"),
			doc("register_of_members", "Register of members / shareholders", "Required if applicable", "Companies", "R1"),
			doc("esop_scheme_register", "ESOP / employee equity scheme, grant register & vesting schedule", "Required if exists", "Entities with employee equity arrangements", "R1"),
			doc("beneficial_ownership_sbo", "Beneficial ownership / SBO declarations and filings", "Required if applicable", "Reporting companies and other entities subject to applicable beneficial-ownership regimes", "R4"),
			doc("capital_action_resolutions", "Board / shareholder / partner resolutions approving material capital actions", "Required if applicable", "Entity according to constitutional/legal requirements", "R1"),
			doc("investment_agreements", "Share subscription / shareholders / investment agreements", "Required if exists", "Entities that have entered such agreements"),
			doc("convertible_instruments", "Convertible instruments: SAFE-equivalent, convertible notes, CCPS, CCDs, warrants or similar instruments", "Required if exists", "Entities that have issued such instruments", "R3"),
			doc("valuation_reports", "Valuation reports / certificates", "Required if applicable", "Transactions requiring or supported by valuation", "R3"),
			doc("foreign_investment_filings", "Foreign investment reporting and related filings: FC-GPR, FC-TRS, LLP-I/LLP-II, CN, FLA or other applicable filings", "Required if applicable", "Entities with relevant foreign investment transactions", "R3")
		]
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
			doc("founder_agreements_ip_assignment", "Founder agreements and founder IP assignment / assignment chain", "Required if exists", "Entities with founder-created IP or founder agreements"),
			doc("employment_consultant_agreements", "Employment and consultant agreements with IP/confidentiality terms", "Recommended", "Entities with employees/consultants"),
			doc("customer_contracts", "Customer contracts / master service agreements / order forms", "Required if material", "Contract-revenue entities"),
			doc("vendor_contracts", "Vendor / supplier contracts", "Required if material", "Entities with material supplier commitments"),
			doc("financing_security_agreements", "Loan / financing / security / guarantee agreements", "Required if exists", "Entities with such obligations"),
			doc("lease_agreements", "Lease / rent agreements for material premises", "Required if material", "Entities with material leased premises"),
			doc("ip_registrations", "IP registrations and evidence of ownership/licensing", "Required if material", "Entities with registered or material IP"),
			doc("ip_certificates", "Trademark / patent / copyright / design certificates and licences", "Required if exists", "Entities holding or licensing such rights"),
			doc("litigation_proceedings", "Material litigation / arbitration / regulatory proceedings", "Required if exists", "Entities involved in such proceedings"),
			doc("notices_orders_settlements", "Show-cause notices, regulatory notices, court orders and settlement agreements", "Required if exists", "Entities with such matters"),
			doc("indemnities_contingent_obligations", "Material indemnities and contingent contractual obligations", "Required if material", "Entities with such commitments")
		]
	}
].map((category) => ({
	...category,
	documents: category.documents.map((document) => ({
		...document,
		categoryId: category.id
	}))
}));
/** Every taxonomy row, flattened. */
var ALL_TAXONOMY_DOCUMENTS = DOCUMENT_CATEGORIES.flatMap((category) => category.documents);
var DOCUMENTS_BY_KEY = new Map(ALL_TAXONOMY_DOCUMENTS.map((document) => [document.key, document]));
new Map(DOCUMENT_CATEGORIES.map((category) => [category.id, category]));
function getTaxonomyDocument(typeKey) {
	if (!typeKey) return null;
	return DOCUMENTS_BY_KEY.get(typeKey) ?? null;
}
ALL_TAXONOMY_DOCUMENTS.filter((document) => document.requirement === "required").length;
var NEW_DOCUMENT_TYPES = [
	{
		key: "client_contract",
		label: "Client Contract",
		requirement: "optional",
		sourceStatus: "Recommended",
		detail: "Executed client contracts, service agreements, MSAs, and work orders.",
		reference: null,
		categoryId: "contracts_ip_legal"
	},
	{
		key: "vendor_contract",
		label: "Vendor Contract",
		requirement: "optional",
		sourceStatus: "Recommended",
		detail: "Executed vendor contracts, supplier SLAs, and procurement agreements.",
		reference: null,
		categoryId: "contracts_ip_legal"
	},
	{
		key: "sales_invoice",
		label: "Sales Invoice",
		requirement: "optional",
		sourceStatus: "Recommended",
		detail: "Client-facing tax invoices, billing statements, and credit notes.",
		reference: null,
		categoryId: "invoices"
	},
	{
		key: "purchase_invoice",
		label: "Purchase Invoice",
		requirement: "optional",
		sourceStatus: "Recommended",
		detail: "Vendor invoices, supplier bills, and payment receipts.",
		reference: null,
		categoryId: "invoices"
	}
];
new Map(NEW_DOCUMENT_TYPES.map((doc) => [doc.key, doc]));
var cat4Docs = DOCUMENT_CATEGORIES.find((c) => c.id === "financial_banking")?.documents ?? [];
var BANK_DOC_KEYS = new Set([
	"bank_statements",
	"bank_reconciliation",
	"cash_balance_burn",
	"cash_flow_statement",
	"debt_schedules",
	"contingent_liabilities_schedule"
]);
var ANNUAL_STMT_KEYS = new Set([
	"audited_financial_statements",
	"profit_loss_statement",
	"balance_sheet",
	"trial_balance_gl",
	"monthly_mis",
	"budget_vs_actual",
	"financial_model"
]);
var OTHER_FINANCIAL_KEYS = new Set([
	"receivables_payables_ageing",
	"revenue_evidence",
	"inventory_register",
	"payroll_summary",
	"fixed_asset_register",
	"related_party_schedule"
]);
var bankDocumentsList = cat4Docs.filter((doc) => BANK_DOC_KEYS.has(doc.key));
var annualFinancialStatementsList = cat4Docs.filter((doc) => ANNUAL_STMT_KEYS.has(doc.key));
var otherFinancialRecordsList = cat4Docs.filter((doc) => OTHER_FINANCIAL_KEYS.has(doc.key));
var cat1 = DOCUMENT_CATEGORIES.find((c) => c.id === "identity_kyb_authority");
var cat2 = DOCUMENT_CATEGORIES.find((c) => c.id === "registration_legal_structure");
var cat3 = DOCUMENT_CATEGORIES.find((c) => c.id === "tax_statutory_compliance");
var cat5 = DOCUMENT_CATEGORIES.find((c) => c.id === "licenses_permits_approvals");
var cat6 = DOCUMENT_CATEGORIES.find((c) => c.id === "certifications_assurance");
var cat7 = DOCUMENT_CATEGORIES.find((c) => c.id === "ownership_governance_capital");
var cat8 = DOCUMENT_CATEGORIES.find((c) => c.id === "contracts_ip_legal");
var VAULT_SECTIONS = [
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
				description: cat1?.answers ?? "Who is the entity, who is acting for it, and who is authorized?",
				kind: "checklist",
				legacyCategoryId: "identity_kyb_authority",
				targetBackendCategory: "identity_kyb_authority",
				documents: cat1?.documents ?? [],
				icon: FingerprintPattern
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
				icon: Building2
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
				icon: Scale
			},
			{
				id: "licenses_permits_approvals",
				label: "Licenses & Permits",
				shortLabel: "Licenses",
				description: cat5?.answers ?? "What operational, sector-specific and statutory permits are held?",
				kind: "checklist",
				legacyCategoryId: "licenses_permits_approvals",
				targetBackendCategory: "licenses_permits_approvals",
				documents: cat5?.documents ?? [],
				icon: FileSpreadsheet
			},
			{
				id: "ownership_governance_capital",
				label: "Ownership & Capital Structure",
				shortLabel: "Ownership",
				description: cat7?.answers ?? "Who owns the entity, what instruments exist, and how is it governed?",
				kind: "checklist",
				legacyCategoryId: "ownership_governance_capital",
				targetBackendCategory: "ownership_governance_capital",
				documents: cat7?.documents ?? [],
				icon: ChartPie
			}
		],
		theme: {
			accent: "cobalt",
			iconContainer: "bg-brand/10 text-brand border-brand/20",
			sectionTag: "bg-brand/10 text-brand border-brand/20",
			activeTab: "bg-brand text-on-brand border-brand shadow-xs",
			gradientSurface: "from-brand/6 via-surface to-surface",
			hoverBorder: "hover:border-brand/40",
			dotColor: "bg-brand",
			accentText: "text-brand"
		}
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
				description: "Customer agreements, MSAs, statements of work, and enterprise service contracts.",
				kind: "list",
				documentType: "client_contract",
				targetBackendCategory: "contracts_ip_legal",
				icon: ScrollText
			},
			{
				id: "vendor_contracts",
				label: "Vendor Contracts",
				shortLabel: "Vendor",
				description: "Vendor agreements, supplier SLAs, procurement contracts, and partner arrangements.",
				kind: "list",
				documentType: "vendor_contract",
				targetBackendCategory: "contracts_ip_legal",
				icon: ScrollText
			},
			{
				id: "contracts_ip_legal",
				label: "Legal & IP Records",
				shortLabel: "Legal & IP",
				description: cat8?.answers ?? "What contractual commitments, IP assets and dispute risks exist?",
				kind: "checklist",
				legacyCategoryId: "contracts_ip_legal",
				targetBackendCategory: "contracts_ip_legal",
				documents: cat8?.documents ?? [],
				icon: FileText
			}
		],
		theme: {
			accent: "indigo",
			iconContainer: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20",
			sectionTag: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20",
			activeTab: "bg-brand-secondary text-white border-brand-secondary shadow-xs",
			gradientSurface: "from-brand-secondary/6 via-surface to-surface",
			hoverBorder: "hover:border-brand-secondary/40",
			dotColor: "bg-brand-secondary",
			accentText: "text-brand-secondary"
		}
	},
	{
		id: "certifications",
		number: 3,
		label: "Certifications",
		shortLabel: "Certifications",
		description: "Quality management accreditations, security standards, and ESG credentials.",
		icon: Award,
		subCategories: [{
			id: "certifications_assurance",
			label: "Certifications & Accreditations",
			shortLabel: "Certifications",
			description: cat6?.answers ?? "What quality, security, and sustainability standards are certified?",
			kind: "checklist",
			legacyCategoryId: "certifications_assurance",
			targetBackendCategory: "certifications_assurance",
			documents: cat6?.documents ?? [],
			icon: Award
		}],
		theme: {
			accent: "amber",
			iconContainer: "bg-severity-moderate/15 text-amber-800 dark:text-amber-300 border-severity-moderate/30",
			sectionTag: "bg-severity-moderate/15 text-amber-800 dark:text-amber-300 border-severity-moderate/30",
			activeTab: "bg-amber-600 text-white border-amber-600 shadow-xs",
			gradientSurface: "from-severity-moderate/8 via-surface to-surface",
			hoverBorder: "hover:border-severity-moderate/50",
			dotColor: "bg-amber-500",
			accentText: "text-amber-700 dark:text-amber-400"
		}
	},
	{
		id: "financial-statements",
		number: 4,
		label: "Financial & Banking Statements",
		shortLabel: "Financials",
		description: "Audited accounts, management statements, bank records, cash-flow evidence, and reconciliation files.",
		icon: FileSpreadsheet,
		subCategories: [
			{
				id: "annual_financial_statements",
				label: "Annual Financial Statements",
				shortLabel: "Annual Statements",
				description: "Statutory audited financials, balance sheets, profit & loss statements, and budgets.",
				kind: "checklist",
				legacyCategoryId: "financial_banking",
				targetBackendCategory: "financial_banking",
				documents: annualFinancialStatementsList,
				icon: FileSpreadsheet
			},
			{
				id: "other_financial_records",
				label: "Other Financial Records",
				shortLabel: "Other Records",
				description: "Ageing schedules, fixed asset register, payroll records, and related party disclosures.",
				kind: "checklist",
				legacyCategoryId: "financial_banking",
				targetBackendCategory: "financial_banking",
				documents: otherFinancialRecordsList,
				icon: FileText
			},
			{
				id: "bank_statements_external",
				label: "Bank Statements",
				shortLabel: "Bank Statements",
				description: "Continuous bank statement feeds and transactional data parsed in the Statements module.",
				kind: "external",
				externalRoute: "/spending/statements",
				externalBadge: "Statements Module",
				icon: Landmark
			},
			{
				id: "bank_documents_checklist",
				label: "Bank & Cash Documents",
				shortLabel: "Bank Documents",
				description: "Statutory bank statements, cash-burn summaries, debt schedules, and reconciliation files.",
				kind: "checklist",
				legacyCategoryId: "financial_banking",
				targetBackendCategory: "financial_banking",
				documents: bankDocumentsList,
				icon: FileSpreadsheet
			}
		],
		theme: {
			accent: "emerald",
			iconContainer: "bg-success/15 text-emerald-800 dark:text-emerald-300 border-success/30",
			sectionTag: "bg-success/12 text-emerald-800 dark:text-emerald-300 border-success/30",
			activeTab: "bg-emerald-600 text-white border-emerald-600 shadow-xs",
			gradientSurface: "from-success/7 via-surface to-surface",
			hoverBorder: "hover:border-success/50",
			dotColor: "bg-success",
			accentText: "text-emerald-700 dark:text-emerald-400"
		}
	},
	{
		id: "invoices",
		number: 5,
		label: "Invoices",
		shortLabel: "Invoices",
		description: "Issued customer invoices and received supplier bills for tax and reconciliation tracking.",
		icon: Receipt,
		subCategories: [{
			id: "sales_invoices",
			label: "Sales Invoices",
			shortLabel: "Sales",
			description: "Issued client invoices, billing records, and receivable documentation.",
			kind: "list",
			documentType: "sales_invoice",
			targetBackendCategory: "invoices",
			icon: Receipt
		}, {
			id: "purchase_invoices",
			label: "Purchase Invoices",
			shortLabel: "Purchase",
			description: "Vendor bills, supplier invoices, payable claims, and expense vouchers.",
			kind: "list",
			documentType: "purchase_invoice",
			targetBackendCategory: "invoices",
			icon: Receipt
		}],
		theme: {
			accent: "cyan",
			iconContainer: "bg-severity-low/12 text-blue-700 dark:text-blue-300 border-severity-low/30",
			sectionTag: "bg-severity-low/10 text-blue-700 dark:text-blue-300 border-severity-low/30",
			activeTab: "bg-blue-600 text-white border-blue-600 shadow-xs",
			gradientSurface: "from-severity-low/6 via-surface to-surface",
			hoverBorder: "hover:border-severity-low/50",
			dotColor: "bg-severity-low",
			accentText: "text-severity-low"
		}
	}
];
var ALL_VAULT_DOCUMENTS = [...ALL_TAXONOMY_DOCUMENTS, ...NEW_DOCUMENT_TYPES];
var SECTIONS_BY_ID = new Map(VAULT_SECTIONS.map((sec) => [sec.id, sec]));
/**
* Returns the section and subcategory IDs for a document key.
*/
function getSubCategoryForDocument(documentKey) {
	if (!documentKey) return null;
	if (documentKey === "client_contract") return {
		sectionId: "contracts",
		subId: "client_contracts"
	};
	if (documentKey === "vendor_contract") return {
		sectionId: "contracts",
		subId: "vendor_contracts"
	};
	if (documentKey === "sales_invoice") return {
		sectionId: "invoices",
		subId: "sales_invoices"
	};
	if (documentKey === "purchase_invoice") return {
		sectionId: "invoices",
		subId: "purchase_invoices"
	};
	for (const section of VAULT_SECTIONS) for (const sub of section.subCategories) if (sub.documents?.some((doc) => doc.key === documentKey)) return {
		sectionId: section.id,
		subId: sub.id
	};
	return null;
}
var SUBCATEGORIES_BY_ID = /* @__PURE__ */ new Map();
for (const sec of VAULT_SECTIONS) for (const sub of sec.subCategories) SUBCATEGORIES_BY_ID.set(sub.id, sub);
/**
* Returns the primary VaultSection for an old 1-8 category ID.
*/
function getSectionForCategory(categoryId) {
	if (!categoryId) return null;
	switch (categoryId) {
		case "identity_kyb_authority":
		case "registration_legal_structure":
		case "tax_statutory_compliance":
		case "licenses_permits_approvals":
		case "licenses_permits":
		case "ownership_governance_capital":
		case "ownership_capital_governance": return SECTIONS_BY_ID.get("regulatory") ?? null;
		case "contracts_ip_legal": return SECTIONS_BY_ID.get("contracts") ?? null;
		case "certifications_assurance":
		case "certifications_accreditations": return SECTIONS_BY_ID.get("certifications") ?? null;
		case "financial_banking": return SECTIONS_BY_ID.get("financial-statements") ?? null;
		case "invoices": return SECTIONS_BY_ID.get("invoices") ?? null;
		default: return null;
	}
}
var MISC_SECTION = {
	id: "miscellaneous",
	number: 6,
	label: "Supporting & Miscellaneous",
	shortLabel: "Other",
	description: "Supporting documentation, miscellaneous records, and unclassified uploads.",
	icon: Folder,
	subCategories: [{
		id: "others_unclassified",
		label: "Others / Unclassified",
		shortLabel: "Unclassified",
		description: "Supporting documentation, miscellaneous records, and unclassified uploads.",
		kind: "checklist",
		icon: Folder
	}],
	theme: {
		accent: "cobalt",
		iconContainer: "bg-surface-alt text-text-secondary border-border-c",
		sectionTag: "bg-surface-alt text-text-secondary border-border-c",
		activeTab: "bg-surface text-text-primary border-border-c shadow-xs",
		gradientSurface: "from-surface-alt/10 via-surface to-surface",
		hoverBorder: "hover:border-border-c",
		dotColor: "bg-text-tertiary",
		accentText: "text-text-secondary"
	}
};
var TAXONOMY_LOOKUP_MAP = /* @__PURE__ */ new Map();
for (const doc of ALL_VAULT_DOCUMENTS) {
	TAXONOMY_LOOKUP_MAP.set(doc.key.toLowerCase(), doc.key);
	TAXONOMY_LOOKUP_MAP.set(doc.label.toLowerCase(), doc.key);
	const cleanLabel = doc.label.toLowerCase().replace(/[^a-z0-9]/g, "");
	TAXONOMY_LOOKUP_MAP.set(cleanLabel, doc.key);
	const cleanKey = doc.key.toLowerCase().replace(/[^a-z0-9]/g, "");
	TAXONOMY_LOOKUP_MAP.set(cleanKey, doc.key);
}
/**
* Authoritative vault placement resolver.
* Maps ANY document by (category, documentType) into its exact VaultSection and VaultSubCategory.
* Single source of truth across the application.
*/
function resolveVaultPlacement(category, documentType) {
	if (documentType) {
		const rawDt = documentType.trim().toLowerCase();
		const cleanDt = rawDt.replace(/[^a-z0-9]/g, "");
		const matchedKey = TAXONOMY_LOOKUP_MAP.get(rawDt) || TAXONOMY_LOOKUP_MAP.get(cleanDt);
		if (matchedKey) {
			const subInfo = getSubCategoryForDocument(matchedKey);
			if (subInfo) {
				const sec = SECTIONS_BY_ID.get(subInfo.sectionId);
				if (sec) {
					const sub = sec.subCategories.find((s) => s.id === subInfo.subId);
					if (sub) return {
						sectionId: sec.id,
						subCategoryId: sub.id,
						section: sec,
						subCategory: sub
					};
				}
			}
		}
	}
	let normalizedCat = "";
	if (typeof category === "number") switch (category) {
		case 1:
			normalizedCat = "identity_kyb_authority";
			break;
		case 2:
			normalizedCat = "registration_legal_structure";
			break;
		case 3:
			normalizedCat = "tax_statutory_compliance";
			break;
		case 4:
			normalizedCat = "financial_banking";
			break;
		case 5:
			normalizedCat = "licenses_permits_approvals";
			break;
		case 6:
			normalizedCat = "certifications_assurance";
			break;
		case 7:
			normalizedCat = "ownership_governance_capital";
			break;
		case 8:
			normalizedCat = "contracts_ip_legal";
			break;
		default:
			normalizedCat = "others_unclassified";
			break;
	}
	else if (category) {
		const raw = category.trim().toLowerCase();
		if (raw.includes("identity") || raw.includes("kyb") || raw.includes("authority")) normalizedCat = "identity_kyb_authority";
		else if (raw.includes("registration") || raw.includes("incorporation") || raw.includes("recognition")) normalizedCat = "registration_legal_structure";
		else if (raw.includes("tax") || raw.includes("statutory") || raw.includes("gst")) normalizedCat = "tax_statutory_compliance";
		else if (raw.includes("financial") || raw.includes("banking") || raw.includes("statement")) normalizedCat = "financial_banking";
		else if (raw.includes("license") || raw.includes("permit") || raw.includes("approval")) normalizedCat = "licenses_permits_approvals";
		else if (raw.includes("certification") || raw.includes("accreditation") || raw.includes("assurance")) normalizedCat = "certifications_assurance";
		else if (raw.includes("ownership") || raw.includes("capital") || raw.includes("governance")) normalizedCat = "ownership_governance_capital";
		else if (raw.includes("contract") || raw.includes("obligation") || raw.includes(" ip") || raw === "ip") normalizedCat = "contracts_ip_legal";
		else if (raw.includes("invoice")) normalizedCat = "invoices";
	}
	if (normalizedCat) {
		const sec = getSectionForCategory(normalizedCat);
		if (sec) {
			const sub = sec.subCategories.find((s) => s.id === normalizedCat || s.legacyCategoryId === normalizedCat) || sec.subCategories.find((s) => s.targetBackendCategory === normalizedCat) || sec.subCategories[0];
			return {
				sectionId: sec.id,
				subCategoryId: sub.id,
				section: sec,
				subCategory: sub
			};
		}
	}
	return {
		sectionId: "miscellaneous",
		subCategoryId: "others_unclassified",
		section: MISC_SECTION,
		subCategory: MISC_SECTION.subCategories[0]
	};
}
var allSections = [...VAULT_SECTIONS, MISC_SECTION];
var domainMap = /* @__PURE__ */ new Map();
var categoryMap = /* @__PURE__ */ new Map();
var orderedDomains = [];
var orderedCategories = [];
var catNumber = 1;
for (const section of allSections) {
	const catIds = [];
	for (const sub of section.subCategories) {
		if (sub.kind === "external") continue;
		const catConfig = {
			id: sub.id,
			domainId: section.id,
			number: catNumber++,
			label: sub.label,
			shortLabel: sub.shortLabel,
			description: sub.description,
			icon: sub.icon || section.icon
		};
		categoryMap.set(sub.id, catConfig);
		if (sub.legacyCategoryId && !categoryMap.has(sub.legacyCategoryId)) categoryMap.set(sub.legacyCategoryId, catConfig);
		if (sub.targetBackendCategory && !categoryMap.has(sub.targetBackendCategory)) categoryMap.set(sub.targetBackendCategory, catConfig);
		orderedCategories.push(catConfig);
		catIds.push(sub.id);
	}
	const domainConfig = {
		id: section.id,
		label: section.label,
		shortLabel: section.shortLabel,
		description: section.description,
		icon: section.icon,
		canonicalCategoryIds: catIds
	};
	domainMap.set(section.id, domainConfig);
	orderedDomains.push(domainConfig);
}
Object.fromEntries(domainMap);
var CANONICAL_CATEGORIES = Object.fromEntries(categoryMap);
var ORDERED_TOP_LEVEL_DOMAINS = orderedDomains;
var ORDERED_CANONICAL_CATEGORIES = orderedCategories;
function getDomainForCategory(categoryId) {
	const cat = categoryMap.get(categoryId);
	if (cat && domainMap.has(cat.domainId)) return domainMap.get(cat.domainId);
	return domainMap.get("miscellaneous");
}
/**
* Normalizes any category string/number and optional documentType into
* the authoritative subcategory ID from vaultManifest.
*/
function normalizeCategory(category, documentType) {
	return resolveVaultPlacement(category, documentType).subCategoryId;
}
/**
* Resolves the CanonicalCategoryConfig object for any document
* using vaultManifest as the single source of truth.
*/
function getCanonicalCategory(category, documentType) {
	const placement = resolveVaultPlacement(category, documentType);
	const existing = categoryMap.get(placement.subCategoryId);
	if (existing) return existing;
	return {
		id: placement.subCategory.id,
		domainId: placement.section.id,
		number: 99,
		label: placement.subCategory.label,
		shortLabel: placement.subCategory.shortLabel,
		description: placement.subCategory.description,
		icon: placement.subCategory.icon || placement.section.icon
	};
}
//#endregion
export { getDomainForCategory as a, resolveVaultPlacement as c, getCanonicalCategory as i, ORDERED_CANONICAL_CATEGORIES as n, getTaxonomyDocument as o, ORDERED_TOP_LEVEL_DOMAINS as r, normalizeCategory as s, CANONICAL_CATEGORIES as t };
