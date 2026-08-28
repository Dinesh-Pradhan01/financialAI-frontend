import {
  AlertTriangle,
  BarChart3,
  Building2,
  Calculator,
  Landmark,
  Network,
  UserPlus,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  FileSpreadsheet,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

export type Currency = "INR" | "USD";

export interface NavLinkItem {
  name: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export interface ModuleItem {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  headline: string;
  description: string;
  bullets: string[];
  sampleMetric: {
    label: string;
    value: string;
    subtext: string;
    badge?: string;
  };
}

export interface RoleItem {
  id: string;
  icon: LucideIcon;
  role: string;
  access: string;
  subtitle: string;
  description: string;
  bullets: string[];
  highlightBadge: string;
  previewKpis: Array<{
    label: string;
    valueINR: string;
    valueUSD: string;
    trend: string;
    status: "good" | "alert" | "neutral";
  }>;
  primaryAction: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
  badge: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  metric: string;
  initials: string;
  badgeColor: string;
  verifiedLabel: string;
}

export interface PlanItem {
  plan: string;
  priceINR: {
    annual: string;
    monthly: string;
  };
  priceUSD: {
    annual: string;
    monthly: string;
  };
  description: string;
  highlight: boolean;
  badge: string | null;
  features: string[];
}

export interface SecurityBadgeItem {
  title: string;
  desc: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { name: "Platform", href: "#platform" },
  { name: "Modules", href: "#modules" },
  { name: "Roles", href: "#roles" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Security", href: "#security" },
];

export const HERO_DATA = {
  INR: {
    companyName: "Apex Technologies India Pvt. Ltd.",
    headcount: "342 Verified",
    cashRunway: "18.4 mo",
    cashRunwayDelta: "+2.1 vs Plan",
    monthlyBurn: "₹42.8L",
    monthlyBurnDelta: "-4.2% MoM",
    healthIndex: "84 / 100",
    healthIndexBadge: "Top Quartile",
    anomalyTitle: "Anomaly Radar: Vendor Price Spike Detected",
    anomalyDesc:
      "Cloud infra invoices jumped +38% MoM without corresponding headcount growth. Estimated leakage: ₹3.2L/month.",
    benchmarkLabel: "Salary vs Peer Benchmark (IT Mid-tier India)",
    benchmarkStatus: "Optimized (P50)",
    copilotQuery: '> "What is our runway if we hire 12 senior engineers in Q3?"',
    copilotAnswer:
      '"Based on current ₹42.8L monthly burn, runway adjusts from 18.4 to 14.1 months with ₹8.4L payroll delta."',
  },
  USD: {
    companyName: "Apex Global Technologies Inc.",
    headcount: "342 Verified",
    cashRunway: "18.4 mo",
    cashRunwayDelta: "+2.1 vs Plan",
    monthlyBurn: "$52.4K",
    monthlyBurnDelta: "-4.2% MoM",
    healthIndex: "84 / 100",
    healthIndexBadge: "Top Quartile",
    anomalyTitle: "Anomaly Radar: Vendor Price Spike Detected",
    anomalyDesc:
      "Cloud infra invoices jumped +38% MoM without corresponding headcount growth. Estimated leakage: $3,900/month.",
    benchmarkLabel: "Salary vs Peer Benchmark (SaaS Mid-market US)",
    benchmarkStatus: "Optimized (P50)",
    copilotQuery: '> "What is our runway if we hire 12 senior engineers in Q3?"',
    copilotAnswer:
      '"Based on current $52.4K monthly burn, runway adjusts from 18.4 to 14.1 months with $10.2K payroll delta."',
  },
};

export const STATS_DATA: Record<Currency, StatItem[]> = {
  INR: [
    {
      value: "500+",
      label: "Companies Profiled",
      detail: "Across India & Emerging Tech Hubs",
    },
    {
      value: "₹31,000 Cr+",
      label: "Transactions Audited",
      detail: "Real-time bank & GST ledger audit",
    },
    {
      value: "99.4%",
      label: "Role Clarity Score",
      detail: "Zero unauthorized access",
    },
    {
      value: "65%",
      label: "Faster Review Cycles",
      detail: "From weeks to hours",
    },
  ],
  USD: [
    {
      value: "500+",
      label: "Companies Profiled",
      detail: "Across US, UK & APAC",
    },
    {
      value: "$3.8B+",
      label: "Transactions Audited",
      detail: "Real-time cross-bank ledger audit",
    },
    {
      value: "99.4%",
      label: "Role Clarity Score",
      detail: "Zero unauthorized access",
    },
    {
      value: "65%",
      label: "Faster Review Cycles",
      detail: "From weeks to hours",
    },
  ],
};

export const MODULES: ModuleItem[] = [
  {
    id: "c360",
    icon: Building2,
    tag: "Intelligence",
    title: "Customer 360",
    headline: "Unified Operational & Entity Baseline",
    description:
      "Synthesizes external corporate records, banking relationships, leadership changes, and credit ratings into one executive dashboard.",
    bullets: [
      "Company overview & executive leadership graph",
      "Public sentiment, credit ratings & regulatory filings",
      "AI-driven competitor reputation and stability scoring",
    ],
    sampleMetric: {
      label: "Entity Health Index",
      value: "84 / 100",
      subtext: "Top 15% across operating peers",
      badge: "Healthy",
    },
  },
  {
    id: "benchmark",
    icon: BarChart3,
    tag: "Benchmarking",
    title: "Industry & Policies",
    headline: "Peer Performance & Macroeconomic Comparisons",
    description:
      "Benchmark your operating margin, payroll efficiency, and working capital cycle against verified industry leaders in your sector.",
    bullets: [
      "Top 10 peer operational performance leaderboard",
      "Macroeconomic index & EBITDA margin comparables",
      "Live regulatory compliance & policy changes feed",
    ],
    sampleMetric: {
      label: "Working Capital Cycle",
      value: "38 Days",
      subtext: "12 days faster than sector median (50d)",
      badge: "Outperforming",
    },
  },
  {
    id: "radar",
    icon: Network,
    tag: "Optimization",
    title: "Opportunity Radar",
    headline: "Capital Savings & Payment Terms Engine",
    description:
      "Continuously scans transaction logs to surface hidden cash flow improvements, duplicate SaaS tools, and supplier discount opportunities.",
    bullets: [
      "Tailored banking and working capital credit lines",
      "Duplicate software & vendor contract consolidation",
      "Early payment dynamic discount opportunities",
    ],
    sampleMetric: {
      label: "Identified Annual Savings",
      value: "₹18.6 Lakhs",
      subtext: "Across 4 redundant vendor subscriptions",
      badge: "High Impact",
    },
  },
  {
    id: "risk",
    icon: AlertTriangle,
    tag: "Risk & Fraud",
    title: "Risk Engine",
    headline: "Continuous Anomaly & Compliance Watchdog",
    description:
      "Automated surveillance across payroll, vendor payments, and bank accounts to catch off-contract payments, ghost entries, and price spikes.",
    bullets: [
      "Ghost employee & payroll roster mismatch alerts",
      "Unapproved vendor & off-contract disbursements",
      "Sudden spend velocity spikes & duplicate invoice flags",
    ],
    sampleMetric: {
      label: "Active Risk Alerts",
      value: "1 High, 2 Medium",
      subtext: "Zero critical leaks in last 30 days",
      badge: "Monitored",
    },
  },
  {
    id: "ledger",
    icon: Users,
    tag: "Governance",
    title: "HR & Payroll Ledger",
    headline: "Authoritative Headcount & Vendor Registry",
    description:
      "Provides verified roster verification, contractor tracking, and compensation breakdowns feeding directly into executive risk models.",
    bullets: [
      "Real-time synchronized employee roster with PAN/tax IDs",
      "Verified vendor database with statutory compliance records",
      "Direct feed into automated Risk & Opportunity models",
    ],
    sampleMetric: {
      label: "Verified Roster Match",
      value: "100%",
      subtext: "342 of 342 records verified with bank disbursals",
      badge: "Reconciled",
    },
  },
];

export const ROLES: RoleItem[] = [
  {
    id: "ceo",
    icon: Landmark,
    role: "CEO & Board",
    access: "Full Governance",
    subtitle: "Complete Organizational Command",
    description:
      "High-level strategic visibility across all modules with real-time risk alerts, industry positioning, and exportable board packs.",
    bullets: [
      "Consolidated executive health score with critical risk alerts",
      "Peer operational leaderboard & competitive market position",
      "Macro cash runway forecasts & cross-department approvals",
    ],
    highlightBadge: "Full Executive Admin",
    previewKpis: [
      {
        label: "Company Health",
        valueINR: "84 / 100",
        valueUSD: "84 / 100",
        trend: "Top Quartile",
        status: "good",
      },
      {
        label: "Cash Runway",
        valueINR: "18.4 mo",
        valueUSD: "18.4 mo",
        trend: "+2.1 mo vs Plan",
        status: "good",
      },
      {
        label: "Open Risks",
        valueINR: "1 Flag",
        valueUSD: "1 Flag",
        trend: "Vendor price spike",
        status: "alert",
      },
    ],
    primaryAction: "Explore CEO View",
  },
  {
    id: "cfo",
    icon: Calculator,
    role: "CFO & Finance",
    access: "Financial Operations",
    subtitle: "Ledgers, Statements & Runway",
    description:
      "Automated statement ingestion, OCR reconciliation, cash burn tracking, vendor spend velocity, and bank-grade audit logs.",
    bullets: [
      "Multi-bank statement OCR ingestion & automated reconciliation",
      "Departmental budget vs actuals tracking with velocity alerts",
      "Cash runway projections & working capital optimization",
    ],
    highlightBadge: "Finance Workspace",
    previewKpis: [
      {
        label: "Monthly Burn",
        valueINR: "₹42.8L",
        valueUSD: "$52.4K",
        trend: "-4.2% MoM",
        status: "good",
      },
      {
        label: "Identified Leakage",
        valueINR: "₹3.2L/mo",
        valueUSD: "$3.9K/mo",
        trend: "Cloud infra spike",
        status: "alert",
      },
      {
        label: "Reconciliation",
        valueINR: "99.8%",
        valueUSD: "99.8%",
        trend: "Auto-cleared",
        status: "good",
      },
    ],
    primaryAction: "Explore CFO View",
  },
  {
    id: "hr",
    icon: UserPlus,
    role: "HR & People",
    access: "People & Headcount",
    subtitle: "Workforce Costs & Verified Rosters",
    description:
      "Maintains the official employee rosters, contractor records, verified vendor IDs, and compensation compliance feeds.",
    bullets: [
      "Headcount database with statutory tax ID validation",
      "Approved vendor registry & contractor compliance records",
      "Direct feed into anomaly risk prevention & payroll variance",
    ],
    highlightBadge: "People Workspace",
    previewKpis: [
      {
        label: "Verified Headcount",
        valueINR: "342 Active",
        valueUSD: "342 Active",
        trend: "+14 QTD",
        status: "good",
      },
      {
        label: "Payroll Variance",
        valueINR: "0.2%",
        valueUSD: "0.2%",
        trend: "Within normal limits",
        status: "good",
      },
      {
        label: "Compliance Status",
        valueINR: "100% Up to Date",
        valueUSD: "100% Up to Date",
        trend: "All filings verified",
        status: "good",
      },
    ],
    primaryAction: "Explore HR View",
  },
  {
    id: "coo",
    icon: Network,
    role: "COO & Operations",
    access: "Operations & Vendors",
    subtitle: "Vendor Velocity & SaaS Efficiency",
    description:
      "Cross-departmental vendor spend tracking, duplicate software detection, SLA verification, and working capital cycle alerts.",
    bullets: [
      "Continuous vendor price surge & duplicate SaaS detection",
      "Automated contract renewal & payment terms tracking",
      "Working capital runway & supplier credit optimization",
    ],
    highlightBadge: "Ops Workspace",
    previewKpis: [
      {
        label: "Vendor Sprawl",
        valueINR: "4 Duplicates",
        valueUSD: "4 Duplicates",
        trend: "₹18.6L potential savings",
        status: "alert",
      },
      {
        label: "Cash Cycle",
        valueINR: "38 Days",
        valueUSD: "38 Days",
        trend: "12d faster than peers",
        status: "good",
      },
      {
        label: "Active Contracts",
        valueINR: "48 Monitored",
        valueUSD: "48 Monitored",
        trend: "100% SLA compliant",
        status: "good",
      },
    ],
    primaryAction: "Explore COO View",
  },
];

export interface SandboxPersonaData {
  id: "ceo" | "cfo" | "hr" | "coo";
  roleName: string;
  badge: string;
  icon: LucideIcon;
  targetFocus: string;
  step1: {
    fileTitleINR: string;
    fileTitleUSD: string;
    subtitle: string;
    fileSize: string;
    transactionCount: number;
    matchRate: string;
    clearedBalanceINR: string;
    clearedBalanceUSD: string;
    sourcesList: string[];
  };
  step2: {
    anomalyTitle: string;
    severity: "Critical" | "High" | "Optimization";
    descriptionINR: string;
    descriptionUSD: string;
    quantifiedLeakageINR: string;
    quantifiedLeakageUSD: string;
    recommendation: string;
    actionLabel: string;
    actionDoneText: string;
  };
  step3: {
    presetPrompts: string[];
    qaINR: Record<string, { summary: string; reasoning: string[]; impactDelta: string; action: string }>;
    qaUSD: Record<string, { summary: string; reasoning: string[]; impactDelta: string; action: string }>;
  };
}

export const SANDBOX_ROLES_DATA: Record<"ceo" | "cfo" | "hr" | "coo", SandboxPersonaData> = {
  ceo: {
    id: "ceo",
    roleName: "CEO & Founder",
    badge: "Executive Leadership",
    icon: Landmark,
    targetFocus: "Runway Extension, Capital Efficiency & Board Strategy",
    step1: {
      fileTitleINR: "Apex_India_Consolidated_P&L_SBI_HDFC.pdf",
      fileTitleUSD: "Apex_Global_Consolidated_P&L_Chase_SVB.pdf",
      subtitle: "Multi-entity operating accounts & verified revenue deposits",
      fileSize: "4.8 MB PDF",
      transactionCount: 3412,
      matchRate: "99.8%",
      clearedBalanceINR: "₹3.84 Cr",
      clearedBalanceUSD: "$4.62M",
      sourcesList: ["HDFC Primary Current A/c", "SBI Operational A/c", "ICICI Reserve Line", "Razorpay Inflow"],
    },
    step2: {
      anomalyTitle: "Runway Sensitivity Alert: Q3 Burn Acceleration",
      severity: "High",
      descriptionINR:
        "Net burn increased +11% MoM due to unbudgeted vendor price hikes, compressing projected runway from 18.4 to 15.2 months.",
      descriptionUSD:
        "Net burn increased +11% MoM due to unbudgeted vendor price hikes, compressing projected runway from 18.4 to 15.2 months.",
      quantifiedLeakageINR: "₹3.20 Lakhs / month",
      quantifiedLeakageUSD: "$3,900 / month",
      recommendation:
        "Enforce 14-day vendor contract renegotiation protocol to restore 18+ month target runway.",
      actionLabel: "Lock Runway Preservation Protocol",
      actionDoneText: "Runway preservation plan generated and distributed to finance leadership.",
    },
    step3: {
      presetPrompts: [
        "What happens to our runway if we hire 12 engineers in Q3?",
        "How does our EBITDA margin compare to top decile peers?",
        "What are our 3 highest ROI capital optimization levers?",
      ],
      qaINR: {
        "What happens to our runway if we hire 12 engineers in Q3?": {
          summary: "Runway adjusts from 18.4 to 14.1 months (-4.3 months) with ₹8.4L monthly payroll delta.",
          reasoning: [
            "Current cash reserves stand at ₹3.84 Cr with ₹42.8L/mo baseline burn.",
            "12 senior engineers add ₹8.40L/mo in salary + statutory benefits (PF, Gratuity, ESI).",
            "Breakeven on this cohort requires +₹12.2L incremental ARR by Month 5.",
          ],
          impactDelta: "Runway: 18.4mo → 14.1mo (₹8.4L/mo added burn)",
          action: "Recommendation: Stagger hiring into 2 tranches (6 in Jul, 6 in Sep) to protect 16+ mo runway.",
        },
        "How does our EBITDA margin compare to top decile peers?": {
          summary: "Your 18.2% EBITDA margin ranks at the 68th percentile (peer median is 16.4%, top decile is 24.1%).",
          reasoning: [
            "Gross margins are healthy at 74.2% (Top 15% in Mid-tier IT/SaaS).",
            "Sales & marketing efficiency is high (CAC payback: 7.8 months vs peer avg 11.2 months).",
            "General & Admin expenses are 4.2% higher than top decile due to unmanaged SaaS sprawl.",
          ],
          impactDelta: "Potential +₹18.6L annual EBITDA expansion via G&A optimization",
          action: "Recommendation: Execute SaaS consolidation to reach top 15% EBITDA benchmark (21.5%).",
        },
        "What are our 3 highest ROI capital optimization levers?": {
          summary: "Identified ₹28.4L annual capital unlock across 3 high-confidence levers.",
          reasoning: [
            "1. Cloud Infrastructure & SaaS tool consolidation: ₹18.6L/year.",
            "2. Negotiate 45-day payment terms on top 3 vendor contracts: ₹6.8L working capital unlock.",
            "3. Shift idle ₹1.2 Cr treasury cash to automated high-yield overnight sweep: ₹3.0L interest yield.",
          ],
          impactDelta: "+₹28.4L annualized bottom-line impact",
          action: "Recommendation: Auto-generate CFO execution board for these 3 workstreams.",
        },
      },
      qaUSD: {
        "What happens to our runway if we hire 12 engineers in Q3?": {
          summary: "Runway adjusts from 18.4 to 14.1 months (-4.3 months) with $10.2K monthly payroll delta.",
          reasoning: [
            "Current cash reserves stand at $4.62M with $52.4K/mo baseline burn.",
            "12 senior engineers add $10.2K/mo in fully loaded payroll and benefits.",
            "Breakeven on this cohort requires +$15K incremental MRR by Month 5.",
          ],
          impactDelta: "Runway: 18.4mo → 14.1mo ($10.2K/mo added burn)",
          action: "Recommendation: Stagger hiring into 2 tranches (6 in Jul, 6 in Sep) to protect 16+ mo runway.",
        },
        "How does our EBITDA margin compare to top decile peers?": {
          summary: "Your 18.2% EBITDA margin ranks at the 68th percentile (peer median is 16.4%, top decile is 24.1%).",
          reasoning: [
            "Gross margins are healthy at 74.2% (Top 15% in Mid-tier SaaS).",
            "Sales & marketing efficiency is high (CAC payback: 7.8 months vs peer avg 11.2 months).",
            "General & Admin expenses are 4.2% higher than top decile due to unmanaged SaaS sprawl.",
          ],
          impactDelta: "Potential +$22.5K annual EBITDA expansion via G&A optimization",
          action: "Recommendation: Execute SaaS consolidation to reach top 15% EBITDA benchmark (21.5%).",
        },
        "What are our 3 highest ROI capital optimization levers?": {
          summary: "Identified $34.2K annual capital unlock across 3 high-confidence levers.",
          reasoning: [
            "1. Cloud Infrastructure & SaaS tool consolidation: $22.5K/year.",
            "2. Negotiate 45-day payment terms on top 3 vendor contracts: $8.2K working capital unlock.",
            "3. Shift idle treasury cash to automated high-yield overnight sweep: $3.5K interest yield.",
          ],
          impactDelta: "+$34.2K annualized bottom-line impact",
          action: "Recommendation: Auto-generate CFO execution board for these 3 workstreams.",
        },
      },
    },
  },
  cfo: {
    id: "cfo",
    roleName: "CFO & Finance Director",
    badge: "Financial Operations",
    icon: Calculator,
    targetFocus: "Multi-Bank Reconciliation, OCR Accuracy & Cash Velocity",
    step1: {
      fileTitleINR: "HDFC_SBI_Axis_MultiBank_Ledger_2025.pdf",
      fileTitleUSD: "Chase_BofA_SVB_MultiBank_Ledger_2025.pdf",
      subtitle: "Multi-institution transaction feeds & GST/tax filings",
      fileSize: "6.2 MB PDF",
      transactionCount: 4890,
      matchRate: "99.9%",
      clearedBalanceINR: "₹5.12 Cr",
      clearedBalanceUSD: "$6.18M",
      sourcesList: ["HDFC Current A/c", "SBI Operating A/c", "Axis Escrow A/c", "GST 2B Portal"],
    },
    step2: {
      anomalyTitle: "Multi-Bank OCR Flag: Off-Contract Duplicate Vendor Disbursement",
      severity: "Critical",
      descriptionINR:
        "Detected 2 duplicate disbursements of ₹1.45L paid to a secondary marketing agency account across HDFC and Axis portals within 48 hours.",
      descriptionUSD:
        "Detected 2 duplicate disbursements of $1,750 paid to a secondary marketing agency account across 2 bank portals within 48 hours.",
      quantifiedLeakageINR: "₹1.45 Lakhs (Duplicate)",
      quantifiedLeakageUSD: "$1,750 (Duplicate)",
      recommendation:
        "Automate cross-bank deduplication block and issue clawback request to vendor.",
      actionLabel: "Issue Immediate Clawback Notice",
      actionDoneText: "Clawback notice generated with transaction audit hashes and emailed to vendor.",
    },
    step3: {
      presetPrompts: [
        "Reconcile HDFC vs SBI cash balances and flag variances",
        "Summarize active GST/tax input credit mismatches",
        "Analyze monthly burn trend and vendor payment velocity",
      ],
      qaINR: {
        "Reconcile HDFC vs SBI cash balances and flag variances": {
          summary: "Multi-bank reconciliation complete: 4,890 transactions matched with ₹0 unexplained variance.",
          reasoning: [
            "HDFC Current Balance: ₹3.42 Cr (Verified against bank API hash).",
            "SBI Operating Balance: ₹1.28 Cr (Payroll & statutory tax accounts cleared).",
            "Axis Escrow: ₹42.0L (Client advance holdbacks reconciled).",
          ],
          impactDelta: "99.9% automated reconciliation match rate",
          action: "Recommendation: Auto-export reconciliation certificate for statutory audit file.",
        },
        "Summarize active GST/tax input credit mismatches": {
          summary: "Found ₹82,400 in unclaimed ITC due to vendor filing delay in GSTR-2B.",
          reasoning: [
            "3 vendors (Cloud hosting, Office lease, Legal retainers) have not uploaded GSTR-1 for previous month.",
            "All invoice e-way bills and TDS deductions are strictly verified on our ledger.",
          ],
          impactDelta: "₹82,400 ITC eligible for recovery upon vendor filing",
          action: "Recommendation: Trigger automated vendor reminder with GSTR-2B discrepancy report.",
        },
        "Analyze monthly burn trend and vendor payment velocity": {
          summary: "Current monthly burn is ₹42.8L (-4.2% MoM). Vendor spend velocity is normalized except Cloud Infra.",
          reasoning: [
            "Payroll: ₹28.2L (65.9% of total burn, consistent with target).",
            "Direct Vendor Spends: ₹10.4L (AWS + SaaS + Marketing).",
            "Statutory & G&A: ₹4.2L.",
          ],
          impactDelta: "Net burn savings of ₹1.8L achieved compared to prior quarter baseline",
          action: "Recommendation: Set automated velocity alert threshold at +15% per vendor per month.",
        },
      },
      qaUSD: {
        "Reconcile HDFC vs SBI cash balances and flag variances": {
          summary: "Multi-bank reconciliation complete: 4,890 transactions matched with $0 unexplained variance.",
          reasoning: [
            "Chase Operating Balance: $4.12M (Verified against bank API hash).",
            "BofA Reserve Balance: $1.54M (Payroll & statutory tax accounts cleared).",
            "SVB Escrow: $520K (Client advance holdbacks reconciled).",
          ],
          impactDelta: "99.9% automated reconciliation match rate",
          action: "Recommendation: Auto-export reconciliation certificate for statutory audit file.",
        },
        "Summarize active GST/tax input credit mismatches": {
          summary: "Found $9,800 in unapplied sales tax credits due to vendor 1099 filing delays.",
          reasoning: [
            "3 vendors have not confirmed W-9/1099 compliance certificates.",
            "All invoices and wire confirmations are verified on our ledger.",
          ],
          impactDelta: "$9,800 tax credit eligible for resolution",
          action: "Recommendation: Trigger automated compliance reminder to vendor accounting.",
        },
        "Analyze monthly burn trend and vendor payment velocity": {
          summary: "Current monthly burn is $52.4K (-4.2% MoM). Vendor spend velocity is within 3% tolerance.",
          reasoning: [
            "Payroll: $34.5K (65.8% of total burn).",
            "Direct Vendor Spends: $12.8K (AWS + SaaS + Marketing).",
            "Statutory & G&A: $5.1K.",
          ],
          impactDelta: "Net burn savings of $2.2K achieved compared to prior quarter baseline",
          action: "Recommendation: Set automated velocity alert threshold at +15% per vendor per month.",
        },
      },
    },
  },
  hr: {
    id: "hr",
    roleName: "HR & People Operations",
    badge: "People & Headcount",
    icon: Users,
    targetFocus: "Payroll Audit, Roster Verification & Compensation Parity",
    step1: {
      fileTitleINR: "Apex_India_Verified_Payroll_Roster_Q1.xlsx",
      fileTitleUSD: "Apex_Global_Verified_Payroll_Roster_Q1.xlsx",
      subtitle: "342 Active employee tax IDs, bank disbursals & contractor hours",
      fileSize: "3.4 MB Excel",
      transactionCount: 1026,
      matchRate: "100%",
      clearedBalanceINR: "₹28.2L / mo",
      clearedBalanceUSD: "$34.5K / mo",
      sourcesList: ["Darwinbox HRIS", "HDFC Salary Disbursal Feed", "EPFO Portal", "TDS Form 24Q"],
    },
    step2: {
      anomalyTitle: "People Risk Radar: Off-Roster Contractor Invoice Discrepancy",
      severity: "High",
      descriptionINR:
        "Received an unverified invoice of ₹64,000 for 'QA Contractor Services' not linked to any approved requisition in HR roster.",
      descriptionUSD:
        "Received an unverified invoice of $780 for 'QA Contractor Services' not linked to any approved requisition in HR roster.",
      quantifiedLeakageINR: "₹64,000 (Unverified Requisition)",
      quantifiedLeakageUSD: "$780 (Unverified Requisition)",
      recommendation:
        "Hold disbursement until hiring manager approves SOW and compliance documents are submitted.",
      actionLabel: "Place Requisition On Hold",
      actionDoneText: "Disbursal blocked. Automated verification link sent to hiring manager.",
    },
    step3: {
      presetPrompts: [
        "Audit headcount growth vs payroll budget for Engineering",
        "Compare our senior developer salaries against India P50/P75 market benchmark",
        "Check statutory PF/ESI/TDS compliance status across all 342 employees",
      ],
      qaINR: {
        "Audit headcount growth vs payroll budget for Engineering": {
          summary: "Engineering headcount is 184 (Budget: 190). Payroll is ₹15.8L/mo (₹1.1L below planned budget).",
          reasoning: [
            "14 new hires onboarded in Q1 with zero ghost-entry or duplicate PAN records.",
            "Average time-to-productivity: 18 days (Industry benchmark: 26 days).",
            "Contractor-to-full-time ratio is optimal at 12%.",
          ],
          impactDelta: "Payroll variance: +0.2% (Within safe green band)",
          action: "Recommendation: Reallocate remaining ₹1.1L surplus to Q3 retention & bonus pool.",
        },
        "Compare our senior developer salaries against India P50/P75 market benchmark": {
          summary: "Senior Engineering salaries are at the 52nd percentile (P50: ₹24L-28L CTC; SpotLite avg: ₹26.2L).",
          reasoning: [
            "Compensation is highly competitive and prevents key employee attrition.",
            "ESOP grant participation is 64% across senior ICs.",
            "Sales compensation has 8% higher variable component than market average.",
          ],
          impactDelta: "Retention risk score: Low (94% retention rate over last 12 months)",
          action: "Recommendation: Maintain current compensation bands for upcoming appraisal cycle.",
        },
        "Check statutory PF/ESI/TDS compliance status across all 342 employees": {
          summary: "100% compliant: All PF/ESI remittances and TDS 24Q deduplication verified against bank records.",
          reasoning: [
            "342 of 342 active employee PAN cards validated via NSDL verification.",
            "EPFO electronic challan receipt generated and cross-matched with bank debit.",
          ],
          impactDelta: "Zero statutory penalties or audit flags",
          action: "Recommendation: Auto-archive compliance report for quarterly board review.",
        },
      },
      qaUSD: {
        "Audit headcount growth vs payroll budget for Engineering": {
          summary: "Engineering headcount is 184 (Budget: 190). Payroll is $22.4K/mo ($1.4K below budget).",
          reasoning: [
            "14 new hires onboarded in Q1 with zero compliance flags.",
            "Average ramp time: 18 days (Benchmark: 26 days).",
            "Contractor ratio is optimal at 12%.",
          ],
          impactDelta: "Payroll variance: +0.2% (Within safe green band)",
          action: "Recommendation: Reallocate remaining surplus to Q3 retention bonus pool.",
        },
        "Compare our senior developer salaries against India P50/P75 market benchmark": {
          summary: "Senior Engineering salaries are at the 52nd percentile (Market median: $140K; SpotLite avg: $143K).",
          reasoning: [
            "Compensation is competitive and prevents key employee attrition.",
            "Equity grant participation is 64% across senior ICs.",
          ],
          impactDelta: "Retention risk score: Low (94% retention rate)",
          action: "Recommendation: Maintain current compensation bands for upcoming cycle.",
        },
        "Check statutory PF/ESI/TDS compliance status across all 342 employees": {
          summary: "100% compliant: All payroll tax withholdings and W-2 records cross-matched with bank debits.",
          reasoning: [
            "342 employee tax filings and direct deposit verifications cleared.",
            "Zero payroll audit flags or tax discrepancies.",
          ],
          impactDelta: "Zero statutory penalties or audit flags",
          action: "Recommendation: Auto-archive compliance report for quarterly board review.",
        },
      },
    },
  },
  coo: {
    id: "coo",
    roleName: "COO & Operations Lead",
    badge: "Operations & Vendors",
    icon: Network,
    targetFocus: "Vendor Spend Spikes, Duplicate SaaS & Unit Economics",
    step1: {
      fileTitleINR: "Apex_India_Vendor_Invoices_SaaS_Ledger_2025.pdf",
      fileTitleUSD: "Apex_Global_Vendor_Invoices_SaaS_Ledger_2025.pdf",
      subtitle: "48 Active vendor agreements, cloud contracts & procurement logs",
      fileSize: "5.1 MB PDF",
      transactionCount: 2140,
      matchRate: "99.7%",
      clearedBalanceINR: "₹14.6L / mo",
      clearedBalanceUSD: "$18.2K / mo",
      sourcesList: ["AWS Billing Console", "Google Workspace", "Zoho Books", "Vendor Contract Vault"],
    },
    step2: {
      anomalyTitle: "Vendor Opportunity Radar: 4 Duplicate SaaS Subscriptions Detected",
      severity: "Optimization",
      descriptionINR:
        "Found 4 overlapping project management & analytics licenses (Asana + Monday.com + Mixpanel + Amplitude) billed across marketing and product teams.",
      descriptionUSD:
        "Found 4 overlapping project management & analytics licenses (Asana + Monday.com + Mixpanel + Amplitude) billed across marketing and product teams.",
      quantifiedLeakageINR: "₹18.6 Lakhs / year",
      quantifiedLeakageUSD: "$22.5K / year",
      recommendation:
        "Consolidate onto single enterprise license and eliminate 18 unused seat allocations.",
      actionLabel: "Generate Tool Consolidation Plan",
      actionDoneText: "Consolidation plan created: Assigned to IT admin with 18 identified orphan seats.",
    },
    step3: {
      presetPrompts: [
        "Identify our top 5 vendor contracts up for renewal in next 60 days",
        "Benchmark our working capital cash conversion cycle vs industry peers",
        "Detect untracked auto-renewing software subscriptions",
      ],
      qaINR: {
        "Identify our top 5 vendor contracts up for renewal in next 60 days": {
          summary: "5 contracts up for renewal totalling ₹24.2L. 2 have dynamic early-payment discounts.",
          reasoning: [
            "1. AWS Cloud Enterprise: ₹11.6L/mo (Eligible for 18% savings with 1-yr Savings Plan).",
            "2. Salesforce CRM: ₹4.8L/yr (12 unused seats identified).",
            "3. Office Lease Bangalore: ₹5.2L/mo (Terms locked until Dec 2026).",
          ],
          impactDelta: "Estimated negotiable savings: ₹4.8L upon contract renewal",
          action: "Recommendation: Send pre-negotiation terms 30 days ahead of renewal date.",
        },
        "Benchmark our working capital cash conversion cycle vs industry peers": {
          summary: "Your cash cycle is 38 days (12 days faster than peer sector median of 50 days).",
          reasoning: [
            "Days Sales Outstanding (DSO): 34 days (High collection efficiency).",
            "Days Payable Outstanding (DPO): 42 days (Favorable credit terms).",
            "Working capital buffer: ₹1.4 Cr in liquid reserves.",
          ],
          impactDelta: "Top Decile Working Capital efficiency score",
          action: "Recommendation: Keep DSO below 40-day target to ensure uninterrupted runway.",
        },
        "Detect untracked auto-renewing software subscriptions": {
          summary: "Found 6 auto-renewing micro-subscriptions (₹34,000/mo) billed on corporate credit cards.",
          reasoning: [
            "Include unused Figma seats, expired Zoom webinars, and duplicate AI translation APIs.",
            "Cards have auto-debit enabled without procurement PO approval.",
          ],
          impactDelta: "₹4.08 Lakhs annual recurring savings",
          action: "Recommendation: Issue virtual single-use cards with hard spend limits for SaaS tools.",
        },
      },
      qaUSD: {
        "Identify our top 5 vendor contracts up for renewal in next 60 days": {
          summary: "5 contracts up for renewal totalling $29.5K. 2 have dynamic early-payment discounts.",
          reasoning: [
            "1. AWS Cloud Enterprise: $14.1K/mo (Eligible for 18% savings with 1-yr Savings Plan).",
            "2. Salesforce CRM: $5.8K/yr (12 unused seats identified).",
            "3. Office Lease: $6.2K/mo (Terms locked until Dec 2026).",
          ],
          impactDelta: "Estimated negotiable savings: $5.8K upon renewal",
          action: "Recommendation: Send pre-negotiation terms 30 days ahead of renewal date.",
        },
        "Benchmark our working capital cash conversion cycle vs industry peers": {
          summary: "Your cash cycle is 38 days (12 days faster than peer median of 50 days).",
          reasoning: [
            "Days Sales Outstanding (DSO): 34 days.",
            "Days Payable Outstanding (DPO): 42 days.",
            "Working capital buffer: $1.68M in liquid reserves.",
          ],
          impactDelta: "Top Decile Working Capital efficiency score",
          action: "Recommendation: Keep DSO below 40-day target.",
        },
        "Detect untracked auto-renewing software subscriptions": {
          summary: "Found 6 auto-renewing micro-subscriptions ($410/mo) billed on corporate cards.",
          reasoning: [
            "Include unused design seats, expired webinars, and duplicate API keys.",
            "Cards have auto-debit enabled without procurement PO.",
          ],
          impactDelta: "$4.92K annual recurring savings",
          action: "Recommendation: Issue virtual single-use cards with hard spend limits.",
        },
      },
    },
  },
};

export const STEPS: StepItem[] = [
  {
    step: "01",
    title: "Connect Data Sources",
    description:
      "Securely connect your bank statements (SBI, HDFC, ICICI, etc.), ERP feeds, and HR payroll rosters in minutes via encrypted protocols.",
    badge: "15 min setup",
  },
  {
    step: "02",
    title: "Continuous Automated Audit",
    description:
      "SpotLite continuously reconciles every transaction against verified employee lists, approved vendor rosters, and market intelligence.",
    badge: "Continuous AI audit",
  },
  {
    step: "03",
    title: "Act with Executive Clarity",
    description:
      "Leadership teams receive role-scoped dashboards, instant risk notifications, and exportable board packs with quantified next steps.",
    badge: "Real-time dashboards",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "SpotLite gave our board real-time visibility into working capital and headcount burn. We closed our Series A diligence in record time with verified ledger health metrics.",
    name: "Rajan Mehta",
    title: "Chief Executive Officer",
    company: "Nexora Technologies",
    industry: "Fintech & SaaS",
    metric: "40% faster diligence",
    initials: "RM",
    badgeColor: "bg-blue-600",
    verifiedLabel: "Verified Customer · 280 Employees",
  },
  {
    quote:
      "We cut monthly reconciliation time by 65% and caught an unauthorized ₹3.2L recurring vendor surge in our first week. Our finance team now focuses on capital strategy.",
    name: "Sarah Okonkwo",
    title: "Chief Financial Officer",
    company: "Pinnacle Logistics",
    industry: "Supply Chain & Retail",
    metric: "65% time saved",
    initials: "SO",
    badgeColor: "bg-indigo-600",
    verifiedLabel: "Verified Customer · Multi-Entity",
  },
  {
    quote:
      "The transition from messy spreadsheets to SpotLite was effortless. Our leadership team finally has verified numbers we can stand behind in every board review.",
    name: "Priya Sharma",
    title: "Head of Operations & Finance",
    company: "Verity Healthcare",
    industry: "Healthtech",
    metric: "100% audit clarity",
    initials: "PS",
    badgeColor: "bg-emerald-600",
    verifiedLabel: "Verified Customer · 450 Headcount",
  },
];

export const PLANS: PlanItem[] = [
  {
    plan: "Essentials",
    priceINR: {
      annual: "₹3,990",
      monthly: "₹4,990",
    },
    priceUSD: {
      annual: "$490",
      monthly: "$590",
    },
    description:
      "For growing businesses seeking automated bank reconciliation, payroll audit, and core executive visibility.",
    highlight: false,
    badge: null,
    features: [
      "Up to 250 active employees / contractors",
      "Multi-bank statement OCR ingestion",
      "Automated risk & anomaly detection",
      "Executive Customer 360 overview dashboard",
      "Standard CSV & PDF executive reports",
      "Email & in-app support",
    ],
  },
  {
    plan: "Professional",
    priceINR: {
      annual: "₹9,990",
      monthly: "₹12,490",
    },
    priceUSD: {
      annual: "$1,250",
      monthly: "$1,490",
    },
    description:
      "For scaling enterprises requiring cross-departmental intelligence, peer benchmarking, and AI reasoning.",
    highlight: true,
    badge: "Recommended for Scale",
    features: [
      "Up to 2,000 employees / multiple entities",
      "Full access to all 5 intelligence modules",
      "SpotLite AI Instant Financial Copilot",
      "Role-partitioned permissions (CEO, CFO, HR)",
      "Industry peer benchmarking leaderboard",
      "ERP & accounting software sync (Tally, Zoho, QuickBooks)",
      "Dedicated Customer Success Manager",
    ],
  },
  {
    plan: "Enterprise",
    priceINR: {
      annual: "Custom",
      monthly: "Custom",
    },
    priceUSD: {
      annual: "Custom",
      monthly: "Custom",
    },
    description:
      "For large organisations needing bespoke ERP integrations, custom ML risk rules, and multi-country compliance.",
    highlight: false,
    badge: "Custom Scale",
    features: [
      "Unlimited headcount & multi-currency support",
      "Custom ERP/GL & HRIS bidirectional sync",
      "Automated executive board-deck generator",
      "Custom machine learning anomaly rules",
      "Dedicated security engineer & custom SLA (99.99%)",
      "SOC 2 Type II compliance reports & NDA",
    ],
  },
];

export const SECURITY_BADGES: SecurityBadgeItem[] = [
  {
    title: "SOC 2 Type II Certified",
    desc: "Rigorous third-party security & privacy audits",
  },
  {
    title: "256-Bit AES Encryption",
    desc: "End-to-end data encryption in transit and at rest",
  },
  {
    title: "Role-Based Access Control",
    desc: "Strict cryptographic data partitioning across roles",
  },
  {
    title: "ISO 27001 & GDPR Ready",
    desc: "Strict adherence to international data governance",
  },
];
