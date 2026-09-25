export type B2BSeverity = "high" | "moderate" | "low";

export interface B2BRemediationConfig {
  type: "dispute" | "remittance-hold" | "contract-renewal" | "treasury-sweep" | "elasticity-plan" | "receivables-hedging";
  title: string;
  actionLabel: string;
  description: string;
  defaultValues?: Record<string, number | string>;
}

export interface B2BSpotlight {
  id: string;
  title: string;
  entityName: string;
  category: string;
  severity: B2BSeverity;
  bigValue: string;
  bigCaption: string;
  oneLiner: string;
  amountLabel: "recoverable" | "at-risk" | "forfeited" | "cushion" | "concentration";
  signals: string[];
  reasoning: string[];
  confidence: number;
  confidenceReason?: string;
  evidenceBase: {
    transactions: number;
    banks: number;
    months: number;
    period: string;
  };
  remediation: B2BRemediationConfig;
  ledgerDetails?: {
    label: string;
    value: string;
  }[];
}

export const b2bSpotlights: B2BSpotlight[] = [
  {
    id: "vendor-overbilling",
    title: "Contracted Rate Elevation Overbilling — Office Depot Supplies",
    entityName: "Office Depot Supplies",
    category: "Vendor Audit & Leakage Control",
    severity: "high",
    bigValue: "₹10,20,000 / yr",
    bigCaption: "ANNUALIZED RECOVERABLE OVERCHARGE (₹85,000 / MO)",
    oneLiner: "Office Depot has consistently billed ~85% above contracted monthly rate across 6 consecutive months without authorized contract amendments.",
    amountLabel: "recoverable",
    signals: [
      "Vendor contract filed under Master Services Agreement dated 15 Jan 2024 stipulates baseline fee of ₹1,00,000/mo.",
      "Bank statement debits reflect 6 consecutive monthly disbursements averaging ₹1,85,000/mo via NEFT/RTGS.",
      "Monthly variance sits at an exact unaddressed premium of ₹85,000/mo.",
      "Cumulative 6-month recoverable leak totals ₹5,10,000; annualized projection totals ₹10,20,000.",
    ],
    reasoning: [
      "Calculated: Monthly Actual Billed (₹1,85,000) - Master Agreement Base (₹1,00,000) = ₹85,000/mo overcharge.",
      "Verified against bank statement transaction narrations 'NEFT-OUT/OFFICE-DEPOT-OCT' through 'NEFT-OUT/OFFICE-DEPOT-MAR'.",
      "No change-order or supplemental procurement addendum exists in Document Vault to justify rate escalation.",
      "Statistically flagged as an unmonitored operational cost creep under Capability 1 (Semantic Reconciliation).",
    ],
    confidence: 96,
    confidenceReason: "100% matched against signed master contract in Document Vault and 6 cleared bank statement disbursements.",
    evidenceBase: {
      transactions: 1420,
      banks: 3,
      months: 12,
      period: "Apr 2025 – Mar 2026",
    },
    remediation: {
      type: "dispute",
      title: "Formal Vendor Dispute & Credit Note Demand",
      actionLabel: "Draft Vendor Dispute",
      description: "Generate a legally grounded contract reconciliation notice demanding an immediate ₹5,10,000 credit note or invoice reduction.",
      defaultValues: {
        contractBase: 100000,
        actualBilled: 185000,
        monthsClaimed: 6,
      },
    },
    ledgerDetails: [
      { label: "Master Contract Baseline", value: "₹1,00,000 / mo" },
      { label: "Actual 6-Mo Average Billed", value: "₹1,85,000 / mo" },
      { label: "Unaddressed Monthly Leak", value: "-₹85,000 / mo" },
      { label: "Cumulative 6-Month Overbill", value: "-₹5,10,000" },
      { label: "Disbursement Channel", value: "HDFC Current Account ····8921" },
    ],
  },
  {
    id: "bec-fraud-risk",
    title: "BEC Fraud Risk & Bank IFSC Identity Drift — GlobalRetail Logistics",
    entityName: "GlobalRetail Logistics",
    category: "Financial Security & Fraud Detection",
    severity: "high",
    bigValue: "₹6,80,000",
    bigCaption: "OUTBOUND REMITTANCE AT RISK (UNVERIFIED IFSC DRIFT)",
    oneLiner: "Counterparty payment instruction changed from verified historical bank (HDFC0001234) to an unrecognized branch (SBIN0009876), indicating potential Business Email Compromise.",
    amountLabel: "at-risk",
    signals: [
      "Historical baseline of 18 successful settlements remitted to HDFC Bank (IFSC: HDFC0001234).",
      "Most recent invoice remittance advice redirected destination to State Bank of India (IFSC: SBIN0009876).",
      "No corporate signatory verification or board resolution accompanied the banking change request.",
      "Pending batch run includes ₹6,80,000 outbound remittance scheduled within the next 48 hours.",
    ],
    reasoning: [
      "Payment Redirection Drift Detector (Capability 6) flagged high-confidence counterparty IFSC divergence.",
      "Cross-referenced historical GSTIN beneficiary accounts; new remitting IFSC does not match registered GST filings.",
      "Matches known Business Email Compromise (BEC) account takeover attack signature.",
      "Immediate remittance hold recommended until dual-factor voice verification with CFO of GlobalRetail Logistics.",
    ],
    confidence: 98,
    confidenceReason: "Deterministic bank branch code drift detected with zero prior transaction history on new IFSC.",
    evidenceBase: {
      transactions: 1420,
      banks: 3,
      months: 12,
      period: "Apr 2025 – Mar 2026",
    },
    remediation: {
      type: "remittance-hold",
      title: "Beneficiary Freeze & Bank Authentication",
      actionLabel: "Place Remittance Hold",
      description: "Immediately freeze outbound transfers to SBIN0009876 and dispatch security authentication ticket to counterparty treasury.",
      defaultValues: {
        pendingTransfer: 680000,
        historicalIfsc: "HDFC0001234",
        driftIfsc: "SBIN0009876",
      },
    },
    ledgerDetails: [
      { label: "Beneficiary Entity", value: "GlobalRetail Logistics Pvt Ltd" },
      { label: "Historical IFSC Baseline", value: "HDFC0001234 (Verified)" },
      { label: "Recent Remitting IFSC", value: "SBIN0009876 (Unverified Drift)" },
      { label: "Pending Wire Amount", value: "₹6,80,000" },
      { label: "Risk Classification", value: "P0 Critical Account Takeover Signal" },
    ],
  },
  {
    id: "contract-lapse",
    title: "Expired SLA Contract Exposure — Apex Cloud Infrastructure",
    entityName: "Apex Cloud Infrastructure",
    category: "Legal & Procurement Compliance",
    severity: "moderate",
    bigValue: "₹14,50,000 / yr",
    bigCaption: "UNPROTECTED OUTFLOW SPEND (EXPIRED SLA TERMS)",
    oneLiner: "Disbursements are actively flowing to Apex Cloud under a master agreement that lapsed on 15 Feb 2026, leaving pricing terms and uptime guarantees legally unbound.",
    amountLabel: "at-risk",
    signals: [
      "Master Cloud Hosting Agreement expired on 15 Feb 2026.",
      "Monthly cloud debits continue at ₹1,20,833/mo without binding SLA or pricing lock.",
      "Lack of renewal leaves company exposed to unannounced rate hikes and zero compensation for service downtime.",
    ],
    reasoning: [
      "Contract Lapse Scanner (Capability 5) compared bank debit continuity against expiry dates in Document Vault.",
      "Operating in post-term continuation mode removes favorable volume discount protections.",
      "Renewal renegotiation presents an opportunity to capture a 5–10% multi-year discount.",
    ],
    confidence: 94,
    confidenceReason: "Document Vault contract record verified with definitive expiry date.",
    evidenceBase: {
      transactions: 1420,
      banks: 3,
      months: 12,
      period: "Apr 2025 – Mar 2026",
    },
    remediation: {
      type: "contract-renewal",
      title: "Contract Renewal & Rate Lock Term Sheet",
      actionLabel: "Schedule Legal Renewal",
      description: "Initiate formal procurement renewal with Apex Cloud, locking in current rates with an updated 12/24-month SLA.",
      defaultValues: {
        currentAnnualSpend: 1450000,
        targetDiscountPct: 7.5,
      },
    },
    ledgerDetails: [
      { label: "Counterparty", value: "Apex Cloud Infrastructure Ltd" },
      { label: "Agreement Expiration Date", value: "15 Feb 2026 (Lapsed)" },
      { label: "Current Monthly Outflow", value: "-₹1,20,833 / mo" },
      { label: "Annualized Exposure", value: "-₹14,50,000 / yr" },
      { label: "Recommended Action", value: "Execute 24-Month Master Renewal Addendum" },
    ],
  },
  {
    id: "idle-cash-optimization",
    title: "Treasury Yield Optimization — Surplus Idle Cash Deployment",
    entityName: "Corporate Treasury",
    category: "Working Capital & Treasury Yield",
    severity: "moderate",
    bigValue: "+₹1,96,950 / yr",
    bigCaption: "FORFEITED ANNUAL TREASURY INTEREST (SURPLUS CASH)",
    oneLiner: "Holding ₹30.30L in zero-interest current accounts above the mandatory 3-month operating reserve forfeits ~₹1.97L annually in overnight/liquid fund yields.",
    amountLabel: "forfeited",
    signals: [
      "Total liquid cash reserves across 3 current accounts stand at ₹43,80,000.",
      "Mandatory 3-month safety operating buffer (payroll + fixed opex) equals ₹13,50,000.",
      "Surplus liquid cash of ₹30,30,000 sits idle with zero return.",
      "Deploying surplus in automated overnight/liquid funds yields 6.50% p.a. with T+1 liquidity.",
    ],
    reasoning: [
      "Calculated: Latest Cash Balance (₹43.80L) - 3-Month Safety Buffer (₹13.50L) = ₹30.30L Surplus.",
      "Reframed via Capability 7: ₹30,30,000 × 6.50% assumed yield = ₹1,96,950/year in unearned treasury revenue.",
      "Preserves 100% of working capital requirements while generating low-risk passive balance sheet yield.",
    ],
    confidence: 99,
    confidenceReason: "Deterministic current account ledger balances matched with monthly OPEX run-rate.",
    evidenceBase: {
      transactions: 1420,
      banks: 3,
      months: 12,
      period: "Apr 2025 – Mar 2026",
    },
    remediation: {
      type: "treasury-sweep",
      title: "Liquid Fund Automated Sweep Setup",
      actionLabel: "Configure Treasury Sweep",
      description: "Simulate and establish an automated sweep rule linking current accounts to overnight/liquid funds above the safety reserve.",
      defaultValues: {
        surplusCash: 3030000,
        yieldRate: 6.5,
      },
    },
    ledgerDetails: [
      { label: "Total Cash Across Accounts", value: "₹43,80,000" },
      { label: "3-Month Safety Buffer", value: "₹13,50,000" },
      { label: "Deployable Surplus Cash", value: "+₹30,30,000" },
      { label: "Benchmark Treasury Yield", value: "6.50% p.a." },
      { label: "Estimated Annual Income", value: "+₹1,96,950 / yr" },
    ],
  },
  {
    id: "payroll-rigidity",
    title: "Structural Operating Rigidity — Inflexible Payroll Ratio",
    entityName: "Workforce & Operations",
    category: "Cost Structure & Margin Elasticity",
    severity: "moderate",
    bigValue: "52.45% of Rev",
    bigCaption: "ZERO COST ELASTICITY ACROSS 6 STRAIGHT MONTHS",
    oneLiner: "Fixed monthly payroll at ₹13.40L/mo represents 52.45% of revenue with 0% elasticity, leaving operating margins highly vulnerable during quarterly revenue dips.",
    amountLabel: "at-risk",
    signals: [
      "Monthly headcount compensation sits completely flat at ₹13,40,000 for 6 consecutive months.",
      "Zero variable compensation or performance-linked component exists in baseline cost structure.",
      "A 15% revenue drop would compress operating margin from 17.8% down to 2.8%.",
    ],
    reasoning: [
      "Cost Structure Elasticity Engine (Capability 4) measures ratio of fixed payroll to fluctuating revenue.",
      "In contrast to high-performing industry benchmarks where 15–20% of compensation is variable, Nimbus carries 100% fixed commitments.",
    ],
    confidence: 91,
    confidenceReason: "Consistent payroll disbursement ledger records matched against monthly cash inflows.",
    evidenceBase: {
      transactions: 1420,
      banks: 3,
      months: 12,
      period: "Apr 2025 – Mar 2026",
    },
    remediation: {
      type: "elasticity-plan",
      title: "Variable Compensation & Staffing Elasticity Plan",
      actionLabel: "Model Cost Elasticity",
      description: "Model transition of future compensation increments into performance-linked incentives to introduce downside margin protection.",
      defaultValues: {
        monthlyPayroll: 1340000,
        fixedPct: 100,
      },
    },
    ledgerDetails: [
      { label: "Monthly Headcount Outflow", value: "-₹13,40,000 / mo" },
      { label: "Payroll as % of Revenue", value: "52.45%" },
      { label: "Consecutive Flat Months", value: "6 Months" },
      { label: "Downside Margin Shock", value: "17.8% → 2.8% on -15% Revenue" },
      { label: "Industry Benchmark Elasticity", value: "15–20% Variable Component" },
    ],
  },
  {
    id: "client-concentration",
    title: "Counterparty Concentration Radar — Technova Solutions",
    entityName: "Technova Solutions",
    category: "Receivables Concentration & Stress Test",
    severity: "high",
    bigValue: "20.35% Share",
    bigCaption: "SINGLE-CLIENT REVENUE DEPENDENCY (TOP 1 COUNTERPARTY)",
    oneLiner: "Top-1 client Technova Solutions contributes 20.35% of total inflow (Top-3 = 54.01%). Client churn would cause cash runway to drop from infinite to finite 98 months.",
    amountLabel: "concentration",
    signals: [
      "Technova Solutions accounted for ₹5,20,000 of monthly revenue (20.35% of total).",
      "Top-3 clients combine for 54.01% of company receivables.",
      "Plausible Shock Cash Runway engine reveals finite 98.2 month survival if Technova churns without opex reduction.",
    ],
    reasoning: [
      "Herfindahl-Hirschman Concentration Index (HHI) for client receivables is 0.185, signaling moderate-to-high concentration risk.",
      "Credit risk mitigation through invoice discounting or trade credit insurance recommended.",
    ],
    confidence: 97,
    confidenceReason: "12-month client billing and receipt records verified across multi-bank collections ledger.",
    evidenceBase: {
      transactions: 1420,
      banks: 3,
      months: 12,
      period: "Apr 2025 – Mar 2026",
    },
    remediation: {
      type: "receivables-hedging",
      title: "Trade Credit Protection & Client Diversification",
      actionLabel: "Explore Receivables Insurance",
      description: "Evaluate trade credit insurance and establish proactive payment milestones to de-risk high-volume receivables.",
      defaultValues: {
        clientRevenue: 520000,
        sharePct: 20.35,
      },
    },
    ledgerDetails: [
      { label: "Top-1 Client Counterparty", value: "Technova Solutions Pvt Ltd" },
      { label: "Monthly Revenue Contribution", value: "+₹5,20,000 / mo" },
      { label: "Share of Total Top-Line", value: "20.35%" },
      { label: "Stressed Cash Runway", value: "98.2 Months (Finite)" },
      { label: "Receivables HHI Index", value: "0.185 (Concentrated)" },
    ],
  },
];

export function getB2BSpotlightById(id: string): B2BSpotlight | undefined {
  return b2bSpotlights.find((s) => s.id === id);
}
