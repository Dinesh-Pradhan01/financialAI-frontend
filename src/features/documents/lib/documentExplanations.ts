/**
 * Plain-English explanations for all SpotLite taxonomy documents.
 * Provides direct, non-jargon answers for:
 * 1. What the document is (whatIsIt)
 * 2. Why it is needed / what purpose it serves (whyNeeded)
 */

export interface DocumentExplanation {
  whatIsIt: string;
  whyNeeded: string;
}

export const DOCUMENT_EXPLANATIONS: Record<string, DocumentExplanation> = {
  // ---------------------------------------------------------------------------
  // Category 1: Identity, KYB & Authority
  // ---------------------------------------------------------------------------
  business_pan: {
    whatIsIt:
      "10-digit Permanent Account Number card issued by the Income Tax Department to the business entity.",
    whyNeeded:
      "Primary tax identity of your company used for KYB verification, bank linking, and tax reporting.",
  },
  registration_proof: {
    whatIsIt:
      "Official government document showing your business registration number (CIN, LLPIN, or state registration).",
    whyNeeded:
      "Verifies the legal existence and registered identity of your business with regulatory authorities.",
  },
  address_proof: {
    whatIsIt:
      "Utility bill, property tax receipt, or registered lease agreement in the entity's name.",
    whyNeeded: "Confirms the registered and operational physical address of your business.",
  },
  cancelled_cheque: {
    whatIsIt:
      "A personalized cancelled cheque leaf or bank passbook showing account number, account holder name, and IFSC.",
    whyNeeded:
      "Verifies bank account ownership for payouts, direct debits, and financial reconciliation.",
  },
  signatory_identity_proof: {
    whatIsIt:
      "Government photo ID (PAN, Passport, Aadhaar, Voter ID) of the authorized director or partner.",
    whyNeeded:
      "Validates the identity of the person legally acting and signing agreements on behalf of the entity.",
  },
  signatory_address_proof: {
    whatIsIt: "Address proof (Aadhaar, Passport, Utility Bill) of the authorized signatory.",
    whyNeeded:
      "Fulfills RBI KYC guidelines for personal background verification of controlling persons.",
  },
  authority_evidence: {
    whatIsIt:
      "Board resolution, partner authorization letter, or power of attorney empowering the signatory.",
    whyNeeded:
      "Proves that the signatory is legally authorized to execute contracts and operate accounts for the business.",
  },
  udyam_certificate: {
    whatIsIt:
      "Government registration certificate for Micro, Small, and Medium Enterprises (MSMEs).",
    whyNeeded:
      "Unlocks government MSME priority lending, interest subsidies, and statutory payment protection.",
  },

  // ---------------------------------------------------------------------------
  // Category 2: Registration, Legal Structure & Government Recognition
  // ---------------------------------------------------------------------------
  certificate_of_incorporation: {
    whatIsIt:
      "Official certificate issued by the Registrar of Companies (ROC/MCA) upon company formation.",
    whyNeeded:
      "Conclusively proves the legal formation date, registration number, and corporate status.",
  },
  moa_aoa: {
    whatIsIt:
      "Constitutional charter defining business scope (MOA) and internal governance rules/powers (AOA).",
    whyNeeded:
      "Establishes business objectives, capital limits, and management powers for banks and investors.",
  },
  llp_agreement: {
    whatIsIt:
      "Formal agreement between LLP partners governing profit-sharing, capital contributions, and roles.",
    whyNeeded: "Verifies partnership terms, rights, and decision-making authority for LLPs.",
  },
  partnership_deed: {
    whatIsIt:
      "Written contract among partners detailing capital, profit ratios, and operational responsibilities.",
    whyNeeded: "Legal proof of the partnership structure and operational terms.",
  },
  trust_society_instrument: {
    whatIsIt:
      "Registered Trust Deed, Society Registration Certificate, or Bye-laws for non-profit entities.",
    whyNeeded:
      "Verifies governing trustees, objectives, and legal operational framework for trusts/societies.",
  },
  sole_proprietorship_evidence: {
    whatIsIt:
      "Shop & Establishment license, GST certificate, or CA declaration for individual proprietorships.",
    whyNeeded: "Proves the existence and trade activity of an unincorporated individual business.",
  },
  dpiit_startup_recognition: {
    whatIsIt:
      "Startup India certificate issued by the Department for Promotion of Industry and Internal Trade (DPIIT).",
    whyNeeded:
      "Unlocks startup income tax exemptions, patent fast-tracking, and government procurement benefits.",
  },
  import_export_code: {
    whatIsIt:
      "10-digit DGFT registration required for businesses importing or exporting goods and services.",
    whyNeeded:
      "Mandatory for cross-border trade transactions, customs clearance, and foreign remittances.",
  },

  // ---------------------------------------------------------------------------
  // Category 3: Tax & Statutory Compliance
  // ---------------------------------------------------------------------------
  gst_certificate: {
    whatIsIt:
      "Form GST REG-06 showing the 15-digit GSTIN, principal place of business, and business type.",
    whyNeeded:
      "Verifies indirect tax registration status and enables automated GST input credit flow.",
  },
  gst_returns: {
    whatIsIt: "Periodic sales (GSTR-1) and monthly summary tax return filings (GSTR-3B).",
    whyNeeded: "Cross-checks sales authenticity, monthly turnover, and statutory tax compliance.",
  },
  income_tax_return: {
    whatIsIt:
      "Annual ITR acknowledgement (ITR-5/ITR-6/ITR-V) and computation of income filed with the tax department.",
    whyNeeded:
      "Confirms declared annual profits, taxable income history, and tax compliance track record.",
  },
  tds_returns_challans: {
    whatIsIt: "Quarterly TDS return receipts (Form 24Q, 26Q) and payment challans.",
    whyNeeded:
      "Verifies compliance with tax withholding on vendor payments, salaries, and contractor fees.",
  },
  roc_annual_filings: {
    whatIsIt:
      "Annual MCA returns including financial statements (AOC-4) and annual return (MGT-7/7A).",
    whyNeeded:
      "Proves active corporate compliance standing with the Ministry of Corporate Affairs.",
  },
  epf_compliance: {
    whatIsIt:
      "Employees' Provident Fund registration code and monthly Electronic Challan cum Return (ECR) receipts.",
    whyNeeded: "Verifies employee retirement benefit compliance and workforce headcount.",
  },
  esic_compliance: {
    whatIsIt:
      "Employees' State Insurance Corporation registration and monthly contribution payment challans.",
    whyNeeded: "Confirms mandatory medical insurance compliance for eligible employees.",
  },
  professional_tax: {
    whatIsIt: "State-level Professional Tax registration (PTRC/PTEC) and payment acknowledgements.",
    whyNeeded: "Proves municipal and state employment tax compliance where applicable.",
  },
  tax_statutory_notices: {
    whatIsIt:
      "Official notices, assessment orders, or disputed demands from Income Tax, GST, or MCA authorities.",
    whyNeeded:
      "Quantifies potential statutory liabilities, disputed claims, and legal risk exposure.",
  },

  // ---------------------------------------------------------------------------
  // Category 4: Financial & Banking
  // ---------------------------------------------------------------------------
  bank_statements: {
    whatIsIt:
      "Transaction statements covering the last 6 to 12 months for active business bank accounts.",
    whyNeeded:
      "Powers AI cash flow intelligence, monitors real-time liquidity, and detects revenue trends.",
  },
  trial_balance_gl: {
    whatIsIt:
      "Full ledger summary listing all closing debit and credit balances across ledger accounts.",
    whyNeeded:
      "Provides granular accounting visibility into operating expenses, assets, and liabilities.",
  },
  profit_loss_statement: {
    whatIsIt:
      "Financial report showing total revenues, gross margins, operating expenses, and net profit.",
    whyNeeded:
      "Assesses operational profitability, unit economics, and cost management efficiency.",
  },
  balance_sheet: {
    whatIsIt:
      "Snapshot of the company's financial health, listing total assets, liabilities, and shareholder equity.",
    whyNeeded: "Evaluates net worth, solvency, working capital adequacy, and capital leverage.",
  },
  cash_flow_statement: {
    whatIsIt:
      "Statement tracking cash inflows and outflows from operating, investing, and financing activities.",
    whyNeeded: "Shows actual cash generation capability separate from accounting accruals.",
  },
  cash_balance_burn: {
    whatIsIt:
      "Summary of available liquid cash balances versus monthly net operating expenditure (burn rate).",
    whyNeeded:
      "Calculates runway in months and highlights upcoming liquidity gaps or working capital needs.",
  },
  bank_reconciliation: {
    whatIsIt: "Statement matching ledger bank accounts against actual bank statement balances.",
    whyNeeded: "Identifies uncredited cheques, timing differences, and bookkeeping discrepancies.",
  },
  receivables_payables_ageing: {
    whatIsIt: "Time-bucketed breakdown of pending customer invoices and unpaid vendor dues.",
    whyNeeded: "Analyzes debtor collection efficiency and working capital lockup.",
  },
  revenue_evidence: {
    whatIsIt: "Monthly sales ledger, billing register, or invoice dump with customer breakdown.",
    whyNeeded:
      "Validates genuine customer demand, recurring contracts, and top-line revenue growth.",
  },
  inventory_register: {
    whatIsIt:
      "Stock summary listing raw materials, work-in-progress, finished goods, and stock turnover.",
    whyNeeded: "Assesses inventory holding costs, obsolescence risk, and working capital cycle.",
  },
  payroll_summary: {
    whatIsIt:
      "Monthly employee salary sheet, contractor costs, and total team headcount expenditure.",
    whyNeeded: "Tracks human capital burn and compensation obligations.",
  },
  fixed_asset_register: {
    whatIsIt: "Schedule of physical equipment, machinery, IT assets, and depreciation schedules.",
    whyNeeded: "Verifies book value of physical collateral and capital expenditure investments.",
  },
  debt_schedules: {
    whatIsIt:
      "Summary of active term loans, credit lines, founder loans, interest rates, and EMI schedules.",
    whyNeeded: "Tracks debt service coverage ratio (DSCR) and upcoming repayment obligations.",
  },
  related_party_schedule: {
    whatIsIt:
      "Schedule of all transactions with directors, promoters, key management, or sister companies.",
    whyNeeded: "Ensures arms-length pricing compliance and flags corporate governance risks.",
  },
  audited_financial_statements: {
    whatIsIt: "CA-certified annual Balance Sheet, P&L, notes to accounts, and Auditor's Report.",
    whyNeeded:
      "The gold standard of verified financial truth for bank loans, credit ratings, and investor diligence.",
  },
  monthly_mis: {
    whatIsIt:
      "Monthly management information system reports tracking KPIs, departmental budgets, and unit metrics.",
    whyNeeded: "Provides executive operational visibility between annual audit cycles.",
  },
  budget_vs_actual: {
    whatIsIt:
      "Variance analysis comparing budgeted revenue/costs against realized financial performance.",
    whyNeeded: "Evaluates financial planning accuracy and operational discipline.",
  },
  financial_model: {
    whatIsIt:
      "Forward-looking financial projections, unit economics model, and planned capital deployment schedule.",
    whyNeeded:
      "Demonstrates growth projections and capital efficiency to equity investors and lenders.",
  },
  contingent_liabilities_schedule: {
    whatIsIt:
      "List of potential liabilities like bank guarantees, letters of credit, and disputed claims.",
    whyNeeded: "Reveals hidden commitments that could impact future solvency.",
  },

  // ---------------------------------------------------------------------------
  // Category 5: Licenses, Permits & Regulatory Approvals
  // ---------------------------------------------------------------------------
  license_retail: {
    whatIsIt:
      "Municipal trade license, shop & establishment registration, and local commercial permissions.",
    whyNeeded:
      "Verifies the legal right to operate physical retail, wholesale, or commercial premises.",
  },
  license_ecommerce: {
    whatIsIt:
      "E-commerce declarations, marketplace seller agreements, and digital trade permissions.",
    whyNeeded: "Confirms regulatory compliance and platform authorization for online commerce.",
  },
  license_manufacturing: {
    whatIsIt:
      "Factory license, State/Central Pollution Control Board consent (CTE/CTO), and Fire NOC.",
    whyNeeded:
      "Mandatory for legal manufacturing operations, environmental clearances, and workplace safety.",
  },
  license_food_hospitality: {
    whatIsIt: "FSSAI Food Safety Registration/License and municipal health trade clearances.",
    whyNeeded:
      "Mandatory statutory clearance to manufacture, process, package, or serve food products.",
  },
  license_healthcare: {
    whatIsIt:
      "Drug license, clinical establishment registration, pharmacy permit, or bio-waste clearance.",
    whyNeeded:
      "Mandatory regulatory compliance for hospitals, clinics, pharmacies, and medical devices.",
  },
  license_education: {
    whatIsIt:
      "School/institution registration, regulatory affiliation certificates, and board approvals.",
    whyNeeded: "Validates accredited academic recognition and operational authority.",
  },
  license_construction_realestate: {
    whatIsIt: "RERA project/agent registration, contractor license, and building plan approvals.",
    whyNeeded:
      "Mandatory for developing, advertising, selling, and executing real estate projects.",
  },
  license_logistics_transport: {
    whatIsIt:
      "Commercial carrier permits, national transport authorizations, and fleet transit registrations.",
    whyNeeded: "Authorizes commercial goods transport, freight logistics, and interstate transit.",
  },
  license_software_saas_it: {
    whatIsIt:
      "IT service provider registrations, telecom/OSP registrations, or data compliance certificates.",
    whyNeeded: "Proves compliance for specialized data, telecom, or government IT contracts.",
  },
  license_fintech_lending: {
    whatIsIt:
      "RBI NBFC Certificate of Registration, digital lending partner agreements, or FLDG arrangements.",
    whyNeeded:
      "Mandatory regulatory compliance for originating, underwriting, or servicing credit.",
  },
  license_fintech_payments: {
    whatIsIt:
      "RBI Payment Aggregator/Gateway authorization or regulated banking partnership agreement.",
    whyNeeded: "Required for holding, routing, or processing digital merchant payments.",
  },
  license_fintech_regulated_other: {
    whatIsIt:
      "SEBI intermediary registration, IRDAI insurance license, or Account Aggregator authorization.",
    whyNeeded:
      "Legal authorization to broker securities, distribute insurance, or aggregate financial data.",
  },
  license_professional_services: {
    whatIsIt:
      "Professional practice license from statutory bodies (ICAI, Bar Council, Medical Council, COA).",
    whyNeeded:
      "Validates accredited professional credentials to offer specialized advisory services.",
  },
  license_other_activity: {
    whatIsIt:
      "Sector-specific commercial license, municipal clearance, or regulatory consent for niche domains.",
    whyNeeded: "Proves operational legality for specialized business activities.",
  },

  // ---------------------------------------------------------------------------
  // Category 6: Certifications, Accreditations & Independent Assurance
  // ---------------------------------------------------------------------------
  cert_manufacturing_quality: {
    whatIsIt:
      "ISO 9001 (Quality Management) or relevant sector standard certification (BIS, CE, GMP).",
    whyNeeded: "Demonstrates international product quality standards and supplier reliability.",
  },
  cert_information_security: {
    whatIsIt:
      "ISO/IEC 27001, SOC 2 Type II audit report, or CERT-In security assessment certificate.",
    whyNeeded: "Proves data security, cloud infrastructure safety, and enterprise trust.",
  },
  cert_healthcare: {
    whatIsIt:
      "NABH hospital accreditation, NABL diagnostic lab accreditation, or ISO 13485 medical standard.",
    whyNeeded: "Validates high clinical standards, patient safety, and testing accuracy.",
  },
  cert_food: {
    whatIsIt: "HACCP, ISO 22000, Organic India, AGMARK, or Halal certification.",
    whyNeeded: "Provides verified quality assurance for food safety and export readiness.",
  },
  cert_universal: {
    whatIsIt:
      "Independent industry accreditation, ISO environmental standard (ISO 14001), or ESG rating.",
    whyNeeded:
      "Strengthens credibility and qualifies the entity for institutional vendor onboarding.",
  },

  // ---------------------------------------------------------------------------
  // Category 7: Ownership, Governance & Capital
  // ---------------------------------------------------------------------------
  cap_table: {
    whatIsIt:
      "Detailed cap table showing equity ownership, share classes, founder holdings, and option pools.",
    whyNeeded: "Provides definitive clarity on company ownership, voting control, and dilution.",
  },
  partner_contribution_schedule: {
    whatIsIt:
      "Statement of partner capital accounts, profit-sharing ratios, and partner loans for LLPs/firms.",
    whyNeeded: "Verifies internal capital ownership and partner equity distribution.",
  },
  trustee_beneficiary_structure: {
    whatIsIt: "Legal register of trust settlors, active trustees, and designated beneficiaries.",
    whyNeeded: "Confirms fiduciary control and beneficial asset ownership.",
  },
  founder_promoter_ownership: {
    whatIsIt: "Demat holding statement, share certificates, or founder ownership records.",
    whyNeeded: "Verifies controlling equity stake and promoter skin-in-the-game.",
  },
  share_certificates_allotment: {
    whatIsIt: "Form PAS-3 return of allotment, board allotment records, and share certificates.",
    whyNeeded: "Statutory proof of equity issuance and capital inflow.",
  },
  register_of_members: {
    whatIsIt:
      "Statutory register of shareholders maintained under Section 88 of the Companies Act.",
    whyNeeded: "Conclusive legal record of equity membership, voting rights, and share transfers.",
  },
  esop_scheme_register: {
    whatIsIt: "Employee Stock Option Plan document, grant register, and vesting schedules.",
    whyNeeded: "Tracks employee equity commitments, exercised options, and reserved option pools.",
  },
  beneficial_ownership_sbo: {
    whatIsIt: "Form BEN-2 filings and declarations identifying Significant Beneficial Owners.",
    whyNeeded:
      "Mandatory corporate transparency compliance identifying ultimate individual owners.",
  },
  capital_action_resolutions: {
    whatIsIt:
      "Shareholder & Board resolutions approving fundraises, bonus shares, rights issues, or buybacks.",
    whyNeeded:
      "Verifies corporate legal validity behind capital restructuring and share issuances.",
  },
  investment_agreements: {
    whatIsIt: "Shareholders Agreement (SHA), Share Subscription Agreement (SSA), or Term Sheets.",
    whyNeeded:
      "Outlines investor rights, liquidation preferences, reserved matters, and board seats.",
  },
  convertible_instruments: {
    whatIsIt:
      "Terms for CCPS, CCDs, iSAFE, convertible notes, or warrants with conversion valuation formulas.",
    whyNeeded: "Identifies future equity dilution triggers and investor payback rights.",
  },
  valuation_reports: {
    whatIsIt:
      "Valuation certificate from a Registered Valuer or Merchant Banker (Rule 11UA / DCF method).",
    whyNeeded: "Complies with Income Tax and FEMA pricing regulations for issuing shares.",
  },
  foreign_investment_filings: {
    whatIsIt:
      "RBI FIRMS reporting (FC-GPR, FC-TRS) and Annual FLA return for foreign direct investment.",
    whyNeeded:
      "Mandatory FEMA compliance confirming lawful receipt and transfer of foreign capital.",
  },

  // ---------------------------------------------------------------------------
  // Category 8: Contracts, IP & Legal Obligations
  // ---------------------------------------------------------------------------
  founder_agreements_ip_assignment: {
    whatIsIt:
      "Founder agreement containing explicit intellectual property assignment of code and designs to the company.",
    whyNeeded:
      "Guarantees that the business entity legally owns all its software, technology, and branding.",
  },
  employment_consultant_agreements: {
    whatIsIt:
      "Standard employment & consultant contracts with confidentiality (NDA) and IP assignment terms.",
    whyNeeded:
      "Protects proprietary assets, trade secrets, and prevents employee intellectual property disputes.",
  },
  customer_contracts: {
    whatIsIt:
      "Master Services Agreements (MSAs), client contracts, and high-value customer purchase orders.",
    whyNeeded:
      "Validates recurring commercial revenues, payment milestones, and customer contract terms.",
  },
  vendor_contracts: {
    whatIsIt:
      "Key supplier agreements, cloud infrastructure contracts, and vendor service level agreements.",
    whyNeeded: "Evaluates operational dependencies, minimum commitments, and supplier risk.",
  },
  financing_security_agreements: {
    whatIsIt:
      "Loan sanction letters, hypothecation deeds, mortgage agreements, and personal guarantee deeds.",
    whyNeeded: "Discloses pledged business assets, bank charges, and loan repayment terms.",
  },
  lease_agreements: {
    whatIsIt:
      "Registered commercial lease or rent agreement for offices, factories, or storage facilities.",
    whyNeeded:
      "Confirms premises tenure, monthly rent obligations, and physical location security.",
  },
  ip_registrations: {
    whatIsIt: "Registered trademark, patent, copyright, or industrial design certificates.",
    whyNeeded:
      "Proves exclusive statutory ownership and legal monopoly over company brands and inventions.",
  },
  ip_certificates: {
    whatIsIt:
      "Trademark registry extracts, patent grant deeds, or software license grant certificates.",
    whyNeeded:
      "Protects proprietary technology and core brand assets against unauthorized infringement.",
  },
  litigation_proceedings: {
    whatIsIt:
      "Court petitions, arbitration claims, or commercial dispute notices involving the business.",
    whyNeeded: "Quantifies potential legal exposure, dispute risks, and financial liability.",
  },
  notices_orders_settlements: {
    whatIsIt:
      "Regulatory show-cause notices, tribunal orders, or signed legal settlement agreements.",
    whyNeeded: "Discloses regulatory compliance proceedings and finalized legal settlement terms.",
  },
  indemnities_contingent_obligations: {
    whatIsIt: "Cross-guarantees, supplier indemnities, or performance bonds issued by the company.",
    whyNeeded:
      "Highlights contingent financial risks that could create future balance sheet obligations.",
  },
};

/**
 * Document types that commonly hold multiple files in practice
 * (e.g., across multiple bank accounts, periods, tranches, or contracts).
 */
export const MULTI_INSTANCE_DOCUMENT_KEYS = new Set([
  "bank_statements",
  "gst_returns",
  "tds_returns_challans",
  "customer_contracts",
  "vendor_contracts",
  "share_certificates_allotment",
  "audited_financial_statements",
  "debt_schedules",
  "lease_agreements",
  "monthly_mis",
  "budget_vs_actual",
  "tax_statutory_notices",
  "litigation_proceedings",
  "notices_orders_settlements",
]);

export function isMultiInstanceDocumentType(key: string | null | undefined): boolean {
  if (!key) return false;
  return MULTI_INSTANCE_DOCUMENT_KEYS.has(key);
}

/**
 * Returns the plain-English explanation for a document type key.
 */
export function getDocumentExplanation(key: string | null | undefined): DocumentExplanation | null {
  if (!key) return null;
  return DOCUMENT_EXPLANATIONS[key] ?? null;
}
