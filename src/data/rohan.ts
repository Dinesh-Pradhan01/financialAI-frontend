// Static demo data for the "Rohan" synthetic customer.
// Sourced from SPOTLITE_BLUEPRINT.md (figures) and SPOTLITE_UI_DESIGN.md (screens).

export type Severity = "high" | "moderate" | "low";

export interface SubScore {
  key: string;
  label: string;
  value: number; // 0-100
  trend?: "up" | "down" | "flat";
  note?: string;
}

export interface Persona {
  id: string;
  icon: string;
  label: string;
  match: number; // %
  blurb: string;
  rank: number;
}

export interface BankRelationship {
  id: string;
  bank: string;
  product: string;
  account: string;
  held: string;
  color: string; // tailwind text color class for the dot
  external: boolean;
}

export interface SpendCategory {
  id: string;
  icon: string;
  label: string;
  amount: number;
  share: number; // %
}

export interface Merchant {
  rank: number;
  name: string;
  amount: number;
}

export interface Transaction {
  date: string;
  merchant: string;
  amount: number;
  source: string;
}

// A "Spotlight" is one AI-discovered opportunity, risk or missed value.
export type SpotlightBucket = "lost" | "wealth" | "risk";

export interface Spotlight {
  id: string;
  severity: Severity;
  bucket: SpotlightBucket; // feed section: money lost / wealth to create / risk
  productIcon: string;
  product: string;
  headline: string; // e.g. "Lost ₹20,000 in 6 months"
  amount: number; // signed; negative = lost/missed
  amountLabel: "lost" | "missed" | "could-earn" | "could-save";
  // Feed presentation (number-first, one sentence)
  bigValue: string; // dominant figure, e.g. "₹50,000"
  bigCaption: string; // what the figure is, e.g. "Potential rewards"
  oneLiner: string; // a single premium sentence
  why: string; // one-line why
  facts: string; // supporting one-liner
  confidence?: number; // reasoning-agent confidence %
  confidenceReason?: string; // "Confidence rose because ..."
  insight?: string; // the "this didn't exist 3 months ago" AI note
  miniSeries?: { label: string; value: number }[]; // tiny growth/timeline visual
  // Detail screen
  signals: string[];
  reasoning: string[];
  recommendation: { product: string; copy: string };
  channel: { label: string; when: string };
  // Optional projection
  projection?: {
    left: { label: string; amount: number };
    right: { label: string; amount: number };
  };
}

export const rohan = {
  name: "Rohan Sharma",
  greeting: "Rohan",
  age: 34,
  gender: "M",
  city: "Bengaluru",
  occupation: "Salaried · IT",
  wellness: 81,
  wellnessTrend: "+4",
  totalFound: 117000, // ₹1,17,000

  // Customer 360 — identity & relationship snapshot
  identity: {
    memberSince: "2014",
    relationshipYears: 11,
    segment: "Salaried · Wealth-eligible",
    relationshipManager: "Priya Nair",
    branch: "SBI Koramangala, Bengaluru",
    kyc: "Verified",
    pan: "ABCxx1F",
    mobile: "+91 ·····43210",
    email: "rohan.s@···mail.com",
    employer: "IT Services (Tier-1)",
    maritalStatus: "Single",
    dependents: 0,
    creditScore: 782,
    creditBand: "Excellent",
    riskProfile: "Moderate-Aggressive",
    financialAge: 29,
  },

  // Net worth, estimated from detected balances across banks
  netWorth: {
    total: 3170000,
    changePct: 18,
    assets: [
      { label: "Bank balances", amount: 2000000, note: "across 3 banks" },
      { label: "Investments (equity, MF)", amount: 650000, note: "rising equity tilt" },
      { label: "EPF / retirement", amount: 840000, note: "auto-contributed" },
    ],
    liabilities: [{ label: "Personal loan (Bajaj)", amount: 320000, note: "EMI ₹11,200/mo" }],
  },

  // Goals tracked against current savings and disposable
  goals: [
    {
      id: "home",
      label: "Buy a home",
      target: "₹70L",
      progress: 64,
      status: "On track",
      note: "₹14L down-payment gap remaining",
    },
    {
      id: "retire",
      label: "Retire by 55",
      target: "₹6 Cr corpus",
      progress: 48,
      status: "Needs a SIP",
      note: "A ₹15k SIP pulls this from 58 to 55",
    },
    {
      id: "emergency",
      label: "Emergency fund",
      target: "6 months",
      progress: 100,
      status: "Done",
      note: "₹20L liquid buffer in place",
    },
  ],

  // Per-section AI insights surfaced on the profile
  insights: {
    cashflow:
      "Your 37% savings rate is in the top 15% for ₹2L+ earners in Bengaluru, yet ₹2L sits idle each month.",
    wellness:
      "Two gaps, no health cover and idle cash, cap your score at 81. Fixing both lifts it to ~88.",
    relationship:
      "62% of your money is with SBI. ₹18L parked in external banks could be consolidated for better rates.",
    netWorth: "Net worth is up an estimated 18% this year on salary growth and a shrinking loan.",
    personas:
      "Your Explorer and Luxury traits are unusually high for your income band, travel and lifestyle dominate.",
    credit: "A 782 score pre-qualifies you for SBI's premium travel card and a home loan at ~8.4%.",
  },

  summary: [
    "High Spender",
    "High Earner",
    "Frequent Traveller",
    "High Restaurant Visitor",
    "High Stock Exposure",
  ],

  subscores: <SubScore[]>[
    { key: "savings", label: "Savings", value: 85, trend: "up", note: "Healthy savings rate." },
    { key: "liquidity", label: "Liquidity", value: 72, note: "Comfortable buffer for 4 months." },
    {
      key: "debt",
      label: "Debt",
      value: 91,
      trend: "up",
      note: "Debt ratio 22%, very healthy.",
    },
    {
      key: "investment",
      label: "Investment",
      value: 66,
      note: "Idle cash & under-invested in equity.",
    },
    {
      key: "insurance",
      label: "Insurance",
      value: 58,
      trend: "down",
      note: "No health cover detected.",
    },
    { key: "risk", label: "Risk", value: 74, note: "Diversification could improve." },
  ],

  personas: <Persona[]>[
    {
      id: "spender",
      icon: "shop",
      label: "High Spender",
      match: 88,
      blurb: "Top 12% in your city",
      rank: 1,
    },
    {
      id: "traveller",
      icon: "travel",
      label: "Big-Time Traveller",
      match: 92,
      blurb: "Top 8% of travellers · ₹5,00,000 on flights",
      rank: 2,
    },
    {
      id: "movie",
      icon: "movies",
      label: "Movie Buff",
      match: 81,
      blurb: "Netflix + Prime + BookMyShow",
      rank: 3,
    },
    {
      id: "card",
      icon: "card",
      label: "Credit-Card Collector",
      match: 76,
      blurb: "3 active cards across banks",
      rank: 4,
    },
    {
      id: "investor",
      icon: "invest",
      label: "Investment Explorer",
      match: 71,
      blurb: "SIPs growing, equity tilt rising",
      rank: 5,
    },
  ],

  cashflow: {
    income: 210000,
    incomeBreakdown: [
      { label: "Salary", amount: 190000 },
      { label: "Interest", amount: 20000 },
    ],
    expenses: 132000,
    expenseBreakdown: [
      { label: "Rent", amount: 60000 },
      { label: "Lifestyle", amount: 48000 },
      { label: "Utilities", amount: 24000 },
    ],
    disposable: 78000,
    savingsRate: 37,
    debtRatio: 22,
    idleCash: 1800000,
  },

  banks: <BankRelationship[]>[
    {
      id: "sbi-sav",
      bank: "SBI",
      product: "Savings",
      account: "····3421",
      held: "SBI",
      color: "bg-[#1F2A7A]",
      external: false,
    },
    {
      id: "hdfc-sav",
      bank: "HDFC",
      product: "Savings",
      account: "····8890",
      held: "HDFC",
      color: "bg-[#D32F2F]",
      external: true,
    },
    {
      id: "icici-sav",
      bank: "ICICI",
      product: "Savings",
      account: "····2210",
      held: "ICICI",
      color: "bg-[#F58220]",
      external: true,
    },
    {
      id: "sbi-card",
      bank: "SBI",
      product: "Credit Card",
      account: "····7712",
      held: "SBI",
      color: "bg-[#1F2A7A]",
      external: false,
    },
    {
      id: "homeloan",
      bank: "N/A",
      product: "Home Loan",
      account: "N.A.",
      held: "N/A",
      color: "bg-neutral-400",
      external: false,
    },
    {
      id: "ploan",
      bank: "Bajaj Finserv",
      product: "Personal Loan",
      account: "····5582",
      held: "Bajaj Finserv",
      color: "bg-[#0066B2]",
      external: true,
    },
  ],

  categories: <SpendCategory[]>[
    { id: "airlines", icon: "air", label: "Airlines", amount: 500000, share: 32 },
    { id: "fuel", icon: "fuel", label: "Fuel", amount: 24000, share: 18 },
    { id: "restaurant", icon: "dining", label: "Restaurant", amount: 96000, share: 12 },
    { id: "grocery", icon: "grocery", label: "Grocery", amount: 72000, share: 10 },
    { id: "lifestyle", icon: "lifestyle", label: "Lifestyle", amount: 120000, share: 8 },
    { id: "movies", icon: "movies", label: "Movies", amount: 14000, share: 3 },
    { id: "rail", icon: "rail", label: "Railway", amount: 8000, share: 1 },
  ],

  topMerchants: <Merchant[]>[
    { rank: 1, name: "Amazon", amount: 10000 },
    { rank: 2, name: "Flipkart", amount: 9000 },
    { rank: 3, name: "Swiggy", amount: 5000 },
    { rank: 4, name: "Netflix", amount: 1200 },
    { rank: 5, name: "BookMyShow", amount: 980 },
  ],

  transactionsByCategory: <Record<string, Transaction[]>>{
    airlines: [
      { date: "12 Mar", merchant: "IndiGo 6E", amount: 42300, source: "SBI ····3421" },
      { date: "28 Feb", merchant: "Air India", amount: 38900, source: "HDFC ····8890" },
      { date: "15 Feb", merchant: "MakeMyTrip", amount: 61200, source: "SBI Card" },
      { date: "02 Jan", merchant: "Vistara UK", amount: 54900, source: "HDFC ····8890" },
      { date: "18 Dec", merchant: "Emirates EK", amount: 89400, source: "SBI Card" },
      { date: "09 Nov", merchant: "Cleartrip", amount: 31700, source: "SBI ····3421" },
    ],
    restaurant: [
      { date: "20 Mar", merchant: "Swiggy", amount: 542, source: "SBI ····3421" },
      { date: "18 Mar", merchant: "Zomato", amount: 890, source: "SBI Card" },
      { date: "15 Mar", merchant: "Toit Brewpub", amount: 3200, source: "HDFC ····8890" },
      { date: "08 Mar", merchant: "Swiggy", amount: 620, source: "SBI ····3421" },
      { date: "02 Mar", merchant: "Truffles", amount: 1450, source: "SBI Card" },
    ],
    movies: [
      { date: "22 Mar", merchant: "BookMyShow · PVR", amount: 980, source: "SBI Card" },
      { date: "11 Mar", merchant: "Netflix", amount: 649, source: "SBI ····3421" },
      { date: "11 Mar", merchant: "Prime Video", amount: 299, source: "SBI ····3421" },
      { date: "01 Mar", merchant: "Spotify", amount: 119, source: "SBI ····3421" },
    ],
    fuel: [
      { date: "24 Mar", merchant: "Indian Oil", amount: 3200, source: "SBI Card" },
      { date: "12 Mar", merchant: "HP Petrol Pump", amount: 2800, source: "HDFC ····8890" },
      { date: "28 Feb", merchant: "Shell", amount: 3500, source: "SBI Card" },
      { date: "14 Feb", merchant: "Bharat Petroleum", amount: 2600, source: "SBI ····3421" },
    ],
    grocery: [
      { date: "21 Mar", merchant: "BigBasket", amount: 4200, source: "SBI ····3421" },
      { date: "14 Mar", merchant: "Zepto", amount: 1850, source: "SBI Card" },
      { date: "07 Mar", merchant: "DMart", amount: 5600, source: "HDFC ····8890" },
      { date: "01 Mar", merchant: "Blinkit", amount: 1240, source: "SBI ····3421" },
    ],
    lifestyle: [
      { date: "19 Mar", merchant: "Amazon", amount: 8900, source: "SBI Card" },
      { date: "10 Mar", merchant: "Flipkart", amount: 6400, source: "HDFC ····8890" },
      { date: "03 Mar", merchant: "Myntra", amount: 4100, source: "SBI Card" },
      { date: "25 Feb", merchant: "Croma", amount: 22000, source: "SBI Card" },
    ],
    rail: [
      { date: "16 Mar", merchant: "IRCTC", amount: 2400, source: "SBI ····3421" },
      { date: "05 Feb", merchant: "IRCTC", amount: 1850, source: "SBI ····3421" },
    ],
  },

  // 12-month monthly net-balance trend (for the spending screen)
  monthlyTrend: [42, 48, 55, 51, 62, 70, 76, 81, 88, 93, 98, 105],

  spotlights: <Spotlight[]>[
    {
      id: "fd",
      severity: "high",
      bucket: "lost",
      productIcon: "fd",
      product: "Fixed Deposit",
      headline: "You lost ₹20,000 in 6 months",
      amount: -20000,
      amountLabel: "lost",
      bigValue: "₹20,000",
      bigCaption: "Interest already missed",
      oneLiner: "Your idle cash should be working harder.",
      why: "Money sat idle in your savings account.",
      facts: "Avg balance ₹18,00,000 · Savings 3% · FD 7%",
      confidence: 96,
      confidenceReason: "Confidence rose as your balance kept growing.",
      insight: "This opportunity grew with you. Your balance is up 28% in six months.",
      miniSeries: [
        { label: "Jan", value: 14 },
        { label: "Mar", value: 16 },
        { label: "Jun", value: 18 },
      ],
      signals: [
        "Average savings balance ₹18,00,000 for 6 months",
        "Balance has been growing every month",
        "No FD opened in this period",
      ],
      reasoning: [
        "Your savings account pays roughly 3% p.a.",
        "An SBI Fixed Deposit at the same tenure pays ~7% p.a.",
        "Delta on ₹18L = ~₹72,000/year; over the last 6 months you've missed ~₹20,000.",
      ],
      recommendation: {
        product: "SBI Fixed Deposit",
        copy: "Open a 2-year cumulative FD on ₹12L to lock the higher rate.",
      },
      channel: { label: "WhatsApp", when: "Best: Tue 7 PM" },
    },
    {
      id: "travel-card",
      severity: "high",
      bucket: "lost",
      productIcon: "card",
      product: "Travel Credit Card",
      headline: "You missed ₹50,000 in rewards",
      amount: -50000,
      amountLabel: "missed",
      bigValue: "₹50,000",
      bigCaption: "Rewards left behind",
      oneLiner: "Your travel spending deserves a better card.",
      why: "₹5,00,000 of air travel was paid on non-reward cards.",
      facts: "Earned ₹14,000 · Could have earned ₹61,000",
      confidence: 93,
      confidenceReason: "Confidence increased because travel spend rose 22%.",
      insight: "New this quarter. Your airline spend jumped 22%.",
      miniSeries: [
        { label: "Q1", value: 3 },
        { label: "Q2", value: 4 },
        { label: "Q3", value: 7 },
      ],
      signals: [
        "₹5,00,000 spent on airlines in the last 12 months",
        "Most flights paid on HDFC debit / non-reward cards",
        "No travel/forex card in wallet",
      ],
      reasoning: [
        "Best-in-class travel cards earn 6× points on airlines and hotels.",
        "Your existing cards earned ₹14,000 in points; an SBI Travel Card would have earned ~₹61,000.",
        "Delta: ₹47,000–₹50,000 missed in the last year alone.",
      ],
      recommendation: {
        product: "SBI Travel Credit Card",
        copy: "Pre-approved based on your salary and existing SBI Card history.",
      },
      channel: { label: "App notification", when: "Best: Sat 11 AM" },
    },
    {
      id: "home-loan",
      severity: "moderate",
      bucket: "wealth",
      productIcon: "home",
      product: "Home Loan",
      headline: "Turn ₹1 Cr of rent into a ₹3 Cr asset",
      amount: -47000,
      amountLabel: "could-earn",
      bigValue: "₹3 Cr",
      bigCaption: "Asset you could build",
      oneLiner: "You are paying rent like a homeowner.",
      why: "₹60,000/month rent for 12 months, that's ₹7.2L/yr with zero asset.",
      facts: "₹1 Cr loan · EMI ~₹1,00,000 · 10 yr tenure",
      confidence: 82,
      confidenceReason: "12 months of consistent rent and a stable salary.",
      insight: "12 straight months of rent made this possible.",
      signals: [
        "Rent debit of ₹60,000/mo for 12 consecutive months",
        "Stable salary ₹1,90,000/mo with growing balance",
        "No existing home loan detected",
      ],
      reasoning: [
        "₹60,000 × 12 = ₹7,20,000/yr in rent with zero asset created.",
        "With ~5% inflation, 10 years of rent is approximately ₹1 Cr with no asset built.",
        "A ₹1 Cr home loan, EMI ~₹1,00,000, builds an asset worth ~₹3 Cr in the same period.",
      ],
      recommendation: {
        product: "SBI Home Loan",
        copy: "Indicative rate 8.4%. Based on your profile, you qualify.",
      },
      channel: { label: "WhatsApp", when: "Best: Sat 11 AM" },
      projection: {
        left: { label: "Rent path · ₹1 Cr spent", amount: 10000000 },
        right: { label: "Home-loan path · ₹3 Cr asset", amount: 30000000 },
      },
    },
    {
      id: "sip",
      severity: "moderate",
      bucket: "wealth",
      productIcon: "sip",
      product: "Mutual Fund SIP",
      headline: "₹2L idle → ₹1.3 Cr potential",
      amount: 13000000,
      amountLabel: "could-earn",
      bigValue: "₹1.3 Cr",
      bigCaption: "Wealth you could create",
      oneLiner: "Small monthly investments compound into crores.",
      why: "Start a ₹15,000/mo SIP from idle cash.",
      facts: "20-yr projection at 12% CAGR",
      confidence: 74,
      confidenceReason: "Your disposable income comfortably covers the SIP.",
      insight: "Your raise freed up enough to start without feeling it.",
      signals: ["₹2,00,000 idle across savings accounts", "No active SIP detected in your name"],
      reasoning: [
        "₹15,000/mo SIP for 20 years at 12% CAGR ≈ ₹1.3 Cr.",
        "Same money sitting in savings: ≈ ₹54 lakh.",
      ],
      recommendation: {
        product: "SBI Mutual Fund · Bluechip",
        copy: "Auto-debit ₹15,000 on the 5th of every month.",
      },
      channel: { label: "App notification", when: "Best: Mon 9 AM" },
    },
    {
      id: "tax",
      severity: "low",
      bucket: "lost",
      productIcon: "tax",
      product: "Tax Optimization",
      headline: "Save ₹38,000 in tax",
      amount: -38000,
      amountLabel: "could-save",
      bigValue: "₹38,000",
      bigCaption: "Tax you can save",
      oneLiner: "You are leaving tax breaks on the table.",
      why: "Your 80C, NPS and ELSS limits are unused.",
      facts: "Old regime · 30% bracket",
      confidence: 70,
      confidenceReason: "Based on your declared regime and missing 80C entries.",
      insight: "The window closes on March 31.",
      signals: ["No 80C investment recorded", "No NPS contribution", "Filing under old regime"],
      reasoning: [
        "Fully using 80C (₹1.5L), NPS 80CCD(1B) (₹50k) and health 80D saves ~₹38,000 at 30% slab.",
      ],
      recommendation: {
        product: "SBI ELSS + NPS Tier 1",
        copy: "Single-window setup before March 31.",
      },
      channel: { label: "Email", when: "Best: Sun 10 AM" },
    },
    {
      id: "insurance",
      severity: "low",
      bucket: "risk",
      productIcon: "insurance",
      product: "Health Insurance",
      headline: "No health cover detected",
      amount: 0,
      amountLabel: "could-save",
      bigValue: "₹42,000",
      bigCaption: "Medical risk uncovered",
      oneLiner: "One hospital bill could undo a year of savings.",
      why: "High medical spend last year, but no policy in place.",
      facts: "₹42,000 OOP medical · 0 cover",
      confidence: 65,
      confidenceReason: "No premium debits found across any account.",
      insight: "Flagged after ₹42,000 of out-of-pocket medical spend.",
      signals: [
        "₹42,000 out-of-pocket hospital spend in 12 months",
        "No premium debits matching health insurance",
      ],
      reasoning: [
        "A ₹10L family floater costs ~₹14,000/yr at your age band.",
        "A single hospitalisation can be ₹2L+ while uninsured.",
      ],
      recommendation: {
        product: "SBI Life · Health Cover ₹10L",
        copy: "Pre-approved no-medical option available.",
      },
      channel: { label: "WhatsApp", when: "Best: Wed 8 PM" },
    },
  ],
};

export const spotlightById = (id: string) => rohan.spotlights.find((t) => t.id === id);

// ── Banking Relationship Health ─────────────────────────────────────
// Per-bank summary for the relationship map and wallet-share view.
export interface BankHealth {
  bank: string;
  stars: number; // 1-5 strength of relationship
  role: string; // Primary / Savings / Dormant / Loan
  tags: string[];
  color: string; // tailwind bg color class for the dot
  external: boolean;
}

export const relationshipHealth: BankHealth[] = [
  {
    bank: "SBI",
    stars: 5,
    role: "Primary",
    tags: ["Salary", "Credit Card", "FD"],
    color: "bg-[#1F2A7A]",
    external: false,
  },
  {
    bank: "ICICI",
    stars: 3,
    role: "Savings",
    tags: ["Savings"],
    color: "bg-[#F58220]",
    external: true,
  },
  {
    bank: "HDFC",
    stars: 2,
    role: "Dormant",
    tags: ["Savings"],
    color: "bg-[#D32F2F]",
    external: true,
  },
  {
    bank: "Bajaj Finserv",
    stars: 2,
    role: "Loan",
    tags: ["Personal Loan"],
    color: "bg-[#0066B2]",
    external: true,
  },
];

export const walletShare = {
  sbi: 62,
  external: 38,
  potentialMigration: 1800000, // ₹18 lakh held outside SBI
};

// Coach: intent → scripted answer
export interface CoachAnswer {
  kind: "stat" | "yesno" | "list";
  title: string;
  primary?: string; // big number / verdict
  caption?: string;
  bars?: number[]; // sparkline values
  bullets?: string[];
  link?: { label: string; to: string; params?: Record<string, string> };
}

export const coachSuggestions = [
  "How much did I spend on Swiggy?",
  "How much rent did I pay last year?",
  "Can I buy a ₹70 lakh house?",
  "Where am I wasting money?",
  "Can I save ₹20k every month?",
  "Which credit card is best for me?",
  "Why is my score only 81?",
  "Can I retire at 55?",
  "Which subscription should I cancel?",
];

export function answerForQuestion(q: string): CoachAnswer {
  const s = q.toLowerCase();
  if (s.includes("swiggy") || s.includes("food")) {
    return {
      kind: "stat",
      title: "Swiggy · last 12 months",
      primary: "₹62,400",
      caption: "That's ₹5,200/mo · 14% of your food spend.",
      bars: [3, 5, 4, 6, 4, 7, 5, 6, 5, 8, 6, 7],
      link: {
        label: "See all food spend",
        to: "/spending/$category",
        params: { category: "restaurant" },
      },
    };
  }
  if (s.includes("rent")) {
    return {
      kind: "stat",
      title: "Rent · last 12 months",
      primary: "₹7,20,000",
      caption: "₹60,000/mo, paid to the same beneficiary for 12 months.",
      bars: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      link: {
        label: "See Home Loan opportunity",
        to: "/spotlights/$id",
        params: { id: "home-loan" },
      },
    };
  }
  if (s.includes("70") || s.includes("house") || s.includes("home")) {
    return {
      kind: "yesno",
      title: "Can I buy a ₹70 lakh house?",
      primary: "Yes, with stretch",
      caption: "You qualify for a ₹56L loan at ~8.4% (EMI ~₹48k). You'd need a ₹14L down-payment.",
      bullets: [
        "Eligibility: ₹56,00,000",
        "Your liquid: ₹20,00,000",
        "Gap: ₹14,00,000 (or stretch tenure to 25y)",
      ],
      link: { label: "Explore Home Loan", to: "/spotlights/$id", params: { id: "home-loan" } },
    };
  }
  if (s.includes("waste") || s.includes("wasting")) {
    return {
      kind: "list",
      title: "Where you're leaving money",
      bullets: [
        "₹20,000: idle savings (FD opportunity)",
        "₹50,000: non-reward card spend (Travel Card)",
        "₹38,000: unused 80C / NPS tax breaks",
      ],
      link: { label: "Fix the biggest one", to: "/spotlights/$id", params: { id: "fd" } },
    };
  }
  if (s.includes("20k") || s.includes("save")) {
    return {
      kind: "yesno",
      title: "Can you save ₹20,000/month?",
      primary: "Yes, and then some",
      caption:
        "Your disposable income is ₹78,000/mo. Auto-debiting ₹20k as SIP on the 5th leaves ₹58k for spending.",
      bars: [78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78],
      link: { label: "Start a SIP", to: "/spotlights/$id", params: { id: "sip" } },
    };
  }
  if (s.includes("card") || s.includes("credit")) {
    return {
      kind: "list",
      title: "Best card for you",
      bullets: [
        "Travel-heavy spender (₹5L/yr) -> SBI Travel Card (6x airline points)",
        "Subscriptions stack -> Entertainment Card (5x streaming)",
        "Pick one: extra rewards ≈ ₹47,000/yr",
      ],
      link: {
        label: "Apply for Travel Card",
        to: "/spotlights/$id",
        params: { id: "travel-card" },
      },
    };
  }
  if (s.includes("score") || s.includes("81")) {
    return {
      kind: "list",
      title: "Why your Wellness Score is 81",
      primary: "81 / 100",
      caption: "Strong on debt and savings, held back by two gaps.",
      bullets: [
        "Insurance 58: no health cover detected",
        "Investment 66: ₹2L idle, no active SIP",
        "Acting on either lifts your score by 2 to 4 points",
      ],
      link: { label: "See what to fix", to: "/spotlights/$id", params: { id: "insurance" } },
    };
  }
  if (s.includes("retire") || s.includes("55")) {
    return {
      kind: "yesno",
      title: "Can you retire at 55?",
      primary: "On track, with one change",
      caption:
        "At ₹78,000/mo saved you reach a comfortable corpus by 58. A ₹15,000 SIP pulls that to 55.",
      bars: [40, 48, 57, 66, 75, 84, 92, 100, 100, 100, 100, 100],
      link: { label: "Start the SIP", to: "/spotlights/$id", params: { id: "sip" } },
    };
  }
  if (s.includes("zomato")) {
    return {
      kind: "stat",
      title: "Zomato · last 12 months",
      primary: "₹18,900",
      caption: "That's ₹1,575/mo across 96 orders.",
      bars: [4, 3, 5, 4, 6, 5, 4, 6, 5, 7, 6, 8],
      link: {
        label: "See all food spend",
        to: "/spending/$category",
        params: { category: "restaurant" },
      },
    };
  }
  if (s.includes("subscription") || s.includes("cancel")) {
    return {
      kind: "list",
      title: "Subscriptions you could trim",
      caption: "You pay for 3 streaming services with overlapping content.",
      bullets: [
        "Netflix ₹649/mo, watched 38 times",
        "Prime Video ₹299/mo, watched 9 times",
        "Spotify ₹119/mo, used daily, keep this one",
      ],
      link: {
        label: "See entertainment spend",
        to: "/spending/$category",
        params: { category: "movies" },
      },
    };
  }
  return {
    kind: "stat",
    title: "Spotlite",
    primary: "I'm still learning that one",
    caption: "Try one of the suggested questions; those have full answers wired in.",
  };
}
