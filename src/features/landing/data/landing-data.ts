import {
  AlertTriangle,
  BarChart3,
  Building2,
  Calculator,
  Landmark,
  Network,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface RoleItem {
  icon: LucideIcon;
  role: string;
  access: string;
  subtitle: string;
  description: string;
  bullets: string[];
  highlightBadge: string;
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
  metric: string;
  initials: string;
  badgeColor: string;
}

export interface PlanItem {
  plan: string;
  price: string;
  billing: string;
  description: string;
  cta: string;
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

export const STATS: StatItem[] = [
  {
    value: "500+",
    label: "Companies profiled",
    detail: "Across US, UK & APAC",
  },
  {
    value: "$3.8B+",
    label: "Transactions analysed",
    detail: "Real-time ledger audit",
  },
  {
    value: "99.4%",
    label: "Role clarity score",
    detail: "Zero unauthorized access",
  },
  {
    value: "65%",
    label: "Faster review cycles",
    detail: "From weeks to hours",
  },
];

export const MODULES: ModuleItem[] = [
  {
    icon: Building2,
    tag: "Intelligence",
    title: "Customer 360",
    description:
      "Complete external intelligence and operational baseline for your company in one unified view.",
    bullets: [
      "Company overview & executive leadership graph",
      "Public sentiment, credit ratings & industry news",
      "AI-driven competitor reputation scoring",
    ],
  },
  {
    icon: BarChart3,
    tag: "Benchmarking",
    title: "Industry & Policies",
    description:
      "Benchmark your operating efficiency against top-decile leaders in your market segment.",
    bullets: [
      "Top 5-10 peer operational leaderboard",
      "Macroeconomic index & margin comparables",
      "Live regulatory compliance & policy feed",
    ],
  },
  {
    icon: Network,
    tag: "Optimization",
    title: "Opportunity Radar",
    description:
      "Surface immediate cash flow improvements and contract optimizations hidden in transaction logs.",
    bullets: [
      "Tailored banking and working capital products",
      "Duplicate SaaS & vendor spend consolidation",
      "High-value payment terms renegotiation signals",
    ],
  },
  {
    icon: AlertTriangle,
    tag: "Risk & Fraud",
    title: "Risk Engine",
    description:
      "Continuous real-time anomaly detection across payroll, procurement, and banking ledgers.",
    bullets: [
      "Ghost employee & payroll mismatch alerts",
      "Unapproved vendor & off-contract payments",
      "Sudden spend velocity spikes & duplicate invoices",
    ],
  },
  {
    icon: Users,
    tag: "Governance",
    title: "HR & Payroll Ledger",
    description:
      "The authoritative source of truth for headcount costs, verified vendors, and contractor rosters.",
    bullets: [
      "Real-time synchronized employee roster",
      "Verified vendor database with tax IDs",
      "Direct feed into automated Risk & Opportunity models",
    ],
  },
];

export const ROLES: RoleItem[] = [
  {
    icon: Landmark,
    role: "CEO",
    access: "Full Governance",
    subtitle: "Complete organizational command",
    description:
      "Full visibility across all five modules with top-level executive alerts and macro trends.",
    bullets: [
      "Executive overview with risk & opportunity alerts",
      "Full peer leaderboard & market positioning",
      "Macro health score & cross-department approvals",
    ],
    highlightBadge: "Full Platform Admin",
  },
  {
    icon: Calculator,
    role: "CFO",
    access: "Financial Operations",
    subtitle: "Ledgers, statements & runway",
    description:
      "Statement ingestion, cash runway projections, spend velocity, and automated reconciliation.",
    bullets: [
      "Bank statement upload & OCR reconciliation",
      "Departmental budget vs actuals tracking",
      "Customer 360 & Industry benchmark (view access)",
    ],
    highlightBadge: "Finance Workspace",
  },
  {
    icon: UserPlus,
    role: "HR Leadership",
    access: "People & Headcount",
    subtitle: "Workforce costs & verified vendors",
    description:
      "Maintains official employee rosters, contractor records, and payroll verification feeds.",
    bullets: [
      "Headcount database & payroll variance logs",
      "Approved vendor registry & compliance records",
      "Direct feed into anomaly risk prevention",
    ],
    highlightBadge: "People Workspace",
  },
];

export const STEPS: StepItem[] = [
  {
    step: "01",
    title: "Connect Data Sources",
    description:
      "Securely connect your bank statements, ERP feeds, and HR payroll rosters in minutes via bank-grade APIs.",
    badge: "15 min setup",
  },
  {
    step: "02",
    title: "Continuous Automated Audit",
    description:
      "SpotLite reconciles every transaction against verified employee lists, approved vendors, and market signals.",
    badge: "Continuous AI audit",
  },
  {
    step: "03",
    title: "Act with Executive Clarity",
    description:
      "Leadership teams receive role-scoped dashboards, instant risk alerts, and exportable board packs.",
    badge: "Real-time dashboards",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "SpotLite gave our board real-time visibility into workforce costs. We closed our last funding round with labour analytics they had never seen before from a management team.",
    name: "Rajan Mehta",
    title: "Chief Executive Officer",
    company: "Nexora Group",
    metric: "40% faster diligence",
    initials: "RM",
    badgeColor: "bg-blue-600",
  },
  {
    quote:
      "We cut payroll processing time by 65% and eliminated three manual reconciliation steps. Our finance team now focuses on strategic analysis rather than fixing data discrepancies.",
    name: "Sarah Okonkwo",
    title: "Chief Financial Officer",
    company: "Pinnacle Logistics",
    metric: "65% time saved",
    initials: "SO",
    badgeColor: "bg-indigo-600",
  },
  {
    quote:
      "The transition from disconnected spreadsheets to SpotLite was seamless. Our HR leadership team finally has the data credibility to drive decisions at the executive table.",
    name: "Priya Sharma",
    title: "Chief People Officer",
    company: "Verity Financial",
    metric: "100% audit clarity",
    initials: "PS",
    badgeColor: "bg-emerald-600",
  },
];

export const PLANS: PlanItem[] = [
  {
    plan: "Essentials",
    price: "$490",
    billing: "billed annually",
    description:
      "For growing businesses seeking automated payroll audit and core financial visibility.",
    cta: "Start Free 14-Day Trial",
    highlight: false,
    badge: null,
    features: [
      "Up to 250 active employees / contractors",
      "Core HR & bank statement reconciliation",
      "Automated risk & anomaly detection",
      "Customer 360 overview dashboard",
      "Standard CSV & PDF board reports",
      "Email & in-app customer support",
    ],
  },
  {
    plan: "Professional",
    price: "$1,250",
    billing: "billed annually",
    description:
      "For scaling enterprises requiring full cross-departmental intelligence and AI insights.",
    cta: "Book a Demo",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 2,000 employees / multiple entities",
      "Full access to all 5 intelligence modules",
      "SpotLite AI Instant Financial Copilot",
      "Custom role permissions (CEO, CFO, HR)",
      "Industry peer benchmarking leaderboard",
      "ERP & accounting software sync (QuickBooks, NetSuite)",
      "Dedicated Customer Success Manager",
    ],
  },
  {
    plan: "Enterprise",
    price: "Custom",
    billing: "tailored to volume",
    description:
      "For global organisations needing bespoke integrations, custom SLAs, and multi-country compliance.",
    cta: "Talk to Sales",
    highlight: false,
    badge: "Custom Scale",
    features: [
      "Unlimited headcount & multi-currency support",
      "Custom ERP/GL & HRIS bidirectional integrations",
      "Automated executive board-deck generator",
      "Custom machine learning risk rules",
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
    desc: "Granular data partitioning across executive roles",
  },
  {
    title: "GDPR & ISO 27001 Ready",
    desc: "Strict adherence to international data governance",
  },
];
