// Agentic-layer demo data: the 5-agent roster, activity log, life events,
// next-best-product scores, notifications and the guided-tour script.
// Kept separate from rohan.ts to keep the customer dataset focused.

import { FileSearch, Brain, Lightbulb, Send, GraduationCap, type LucideIcon } from "lucide-react";

export type AgentKey = "extraction" | "intelligence" | "reasoning" | "interaction" | "learning";

export interface AgentMeta {
  key: AgentKey;
  label: string;
  short: string;
  tagline: string;
  icon: LucideIcon;
}

export const agents: AgentMeta[] = [
  {
    key: "extraction",
    label: "Extraction Agent",
    short: "Extract",
    tagline: "Reads statements into your financial graph",
    icon: FileSearch,
  },
  {
    key: "intelligence",
    label: "Intelligence Agent",
    short: "Understand",
    tagline: "Builds your 360, scores and personas",
    icon: Brain,
  },
  {
    key: "reasoning",
    label: "Reasoning Agent",
    short: "Reason",
    tagline: "Finds opportunities, risks and life events",
    icon: Lightbulb,
  },
  {
    key: "interaction",
    label: "Interaction Agent",
    short: "Act",
    tagline: "Picks the best time, channel and message",
    icon: Send,
  },
  {
    key: "learning",
    label: "Learning Agent",
    short: "Learn",
    tagline: "Learns from every response you give",
    icon: GraduationCap,
  },
];

export const agentByKey = (k: AgentKey) => agents.find((a) => a.key === k)!;

export interface AgentEvent {
  id: string;
  agent: AgentKey;
  text: string;
  time: string;
  highlight?: boolean;
}

// What the analysis run looked at, surfaced everywhere as "Reasoned from ...".
export const evidenceBase = {
  transactions: 3412,
  banks: 6,
  months: 12,
};

// "Overnight run" — the precise, timestamped log of what the agents did
// while the customer slept. Ends on a "ready for you" beat.
export const agentActivity: AgentEvent[] = [
  {
    id: "a1",
    agent: "extraction",
    text: "Parsed 4 bank statements across SBI, HDFC and ICICI",
    time: "02:11",
  },
  {
    id: "a2",
    agent: "extraction",
    text: "Merged 6 duplicate UPI entries seen in two statements",
    time: "02:12",
  },
  {
    id: "a3",
    agent: "intelligence",
    text: "Rebuilt your Customer 360 from 3,412 transactions",
    time: "02:14",
  },
  {
    id: "a4",
    agent: "reasoning",
    text: "Detected a salary increase of 22% three months ago",
    time: "02:15",
    highlight: true,
  },
  {
    id: "a5",
    agent: "reasoning",
    text: "Found a ₹20,000 Fixed Deposit opportunity in idle cash",
    time: "02:16",
    highlight: true,
  },
  {
    id: "a6",
    agent: "reasoning",
    text: "Raised Home Loan confidence to 92% on 12 months of rent",
    time: "02:17",
  },
  {
    id: "a7",
    agent: "interaction",
    text: "Re-ranked your recommendations by money on the table",
    time: "02:18",
  },
  {
    id: "a8",
    agent: "learning",
    text: "Scheduled the FD nudge for Tue 7 PM, your best window",
    time: "02:19",
  },
  {
    id: "a9",
    agent: "interaction",
    text: "Everything is ready for you.",
    time: "02:20",
    highlight: true,
  },
];

export interface LifeEvent {
  id: string;
  iconKey: string;
  title: string;
  detail: string;
  signal: string;
  confidence: number; // %
  action?: { label: string; triggerId: string };
}

export const lifeEvents: LifeEvent[] = [
  {
    id: "promotion",
    iconKey: "promotion",
    title: "Likely promotion / raise",
    detail: "Your salary credit rose 22% three months ago and has held steady since.",
    signal: "Salary ₹1,55,000 → ₹1,90,000 in Jan",
    confidence: 86,
    action: { label: "Put the raise to work", triggerId: "sip" },
  },
  {
    id: "intl-travel",
    iconKey: "travel",
    title: "Frequent international travel",
    detail: "Five foreign-currency transactions and ₹5L of airline spend in 12 months.",
    signal: "FX spends in AED, GBP · ₹5,00,000 airlines",
    confidence: 91,
    action: { label: "See Travel Card", triggerId: "travel-card" },
  },
  {
    id: "rent-city",
    iconKey: "home",
    title: "Long-term renter",
    detail: "₹60,000 rent to the same beneficiary for 12 straight months, home-loan ready.",
    signal: "12 × ₹60,000 rent debits",
    confidence: 95,
    action: { label: "See Home Loan", triggerId: "home-loan" },
  },
];

export interface NextBestProduct {
  product: string;
  iconKey: string;
  score: number; // opportunity score %
  agent: AgentKey; // which agent would drive this next
  triggerId?: string;
}

// "What Spotlite would do next" — each move attributed to the agent behind it.
export const nextBestProducts: NextBestProduct[] = [
  { product: "Fixed Deposit", iconKey: "fd", score: 96, agent: "reasoning", triggerId: "fd" },
  {
    product: "Travel Credit Card",
    iconKey: "card",
    score: 91,
    agent: "interaction",
    triggerId: "travel-card",
  },
  { product: "Home Loan", iconKey: "home", score: 82, agent: "reasoning", triggerId: "home-loan" },
  {
    product: "Mutual Fund SIP",
    iconKey: "sip",
    score: 74,
    agent: "intelligence",
    triggerId: "sip",
  },
  {
    product: "Health Insurance",
    iconKey: "insurance",
    score: 62,
    agent: "reasoning",
    triggerId: "insurance",
  },
  { product: "Personal Loan", iconKey: "ploan", score: 18, agent: "learning" },
];

export interface NotificationItem {
  id: string;
  agent: AgentKey;
  title: string;
  body: string;
  time: string;
}

export const seedNotifications: NotificationItem[] = [
  {
    id: "n1",
    agent: "reasoning",
    title: "₹1,17,000 found overnight",
    body: "3 new Spotlights are ready for you.",
    time: "2h ago",
  },
  {
    id: "n2",
    agent: "reasoning",
    title: "New life event detected",
    body: "Frequent international travel, a Travel Card could pay you back.",
    time: "2h ago",
  },
  {
    id: "n3",
    agent: "interaction",
    title: "Best time to act",
    body: "Tue 7 PM is your highest-response window for the FD nudge.",
    time: "5h ago",
  },
];

// ── Guided tour script ──────────────────────────────────────────────
export type TourPhase = "Understand" | "Reason" | "Act" | "Learn";

export interface TourStep {
  id: string;
  to: string;
  params?: Record<string, string>;
  phase: TourPhase;
  agent?: AgentKey;
  title: string;
  body: string;
}

export const tourSteps: TourStep[] = [
  {
    id: "why",
    to: "/home",
    phase: "Understand",
    title: "Meet Spotlite",
    body: "Your bank only sees what you do inside its walls. Spotlite reads your whole financial life across every bank and acts on it.",
  },
  {
    id: "upload",
    to: "/upload",
    phase: "Understand",
    agent: "extraction",
    title: "1. Understand: bring everything in",
    body: "Rohan dropped in a year of statements from SBI, HDFC and ICICI. The Extraction Agent turns them into one Unified Financial Graph.",
  },
  {
    id: "score",
    to: "/home",
    phase: "Understand",
    agent: "intelligence",
    title: "A complete, scored picture",
    body: "The Intelligence Agent builds a Customer 360 and a Financial Wellness Score, richer than any single bank's view.",
  },
  {
    id: "personas",
    to: "/wrapped",
    phase: "Understand",
    agent: "intelligence",
    title: "Who is this person?",
    body: "Spotify-Wrapped-style personas make the data instantly human: Big-Time Traveller, High Spender, and more.",
  },
  {
    id: "spending",
    to: "/spending",
    phase: "Reason",
    agent: "reasoning",
    title: "2. Reason: connect the dots",
    body: "₹5L on airlines is 32% of spend. The Reasoning Agent links that pattern to a missed-rewards opportunity.",
  },
  {
    id: "spotlights",
    to: "/spotlights",
    phase: "Reason",
    agent: "reasoning",
    title: "Spotlights: money you're leaving on the table",
    body: "Not generic ads, quantified blind spots: ₹20k idle in savings, ₹50k missed card rewards, rent that could be a ₹3 Cr asset.",
  },
  {
    id: "detail",
    to: "/spotlights/$id",
    params: { id: "home-loan" },
    phase: "Reason",
    agent: "reasoning",
    title: "The agent shows its work",
    body: "Every Spotlight comes with the signals, the math and a confidence score, reasoning before acting.",
  },
  {
    id: "apply",
    to: "/spotlights/$id/apply",
    params: { id: "fd" },
    phase: "Act",
    agent: "interaction",
    title: "3. Act: one tap, the right moment",
    body: "The Interaction Agent routes Rohan straight into the SBI product at the best time on the best channel.",
  },
  {
    id: "coach",
    to: "/coach",
    phase: "Act",
    agent: "interaction",
    title: "Talk to your money",
    body: "Ask anything in plain language. 'Can I buy a ₹70L house?' gets a real, reasoned answer.",
  },
  {
    id: "learn",
    to: "/agents",
    phase: "Learn",
    agent: "learning",
    title: "4. Learn: it gets smarter",
    body: "Every open, apply and snooze feeds the Learning Agent, so the next nudge is better timed and more relevant.",
  },
];

export const timeframeFactors: Record<string, number> = {
  "3M": 0.25,
  "6M": 0.5,
  "12M": 1,
};

export const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
];

export const channels = ["WhatsApp", "App notification", "Email", "SMS"];

// ── Section explainers ──────────────────────────────────────────────
// Reusable, agent-attributed "why is this here?" copy for the ExplainTip.
export interface SectionExplain {
  agent: AgentKey;
  title?: string;
  text: string;
  evidence?: string;
}

export const explainers: Record<string, SectionExplain> = {
  aiTimeline: {
    agent: "learning",
    title: "How this runs overnight",
    text: "Each night the five agents re-read your statements, rebuild your Customer 360 and re-rank opportunities, so the morning brief is always current.",
    evidence: "Last run 02:11–02:20 · 9 steps across 5 agents",
  },
  spotlights: {
    agent: "reasoning",
    title: "How Spotlights are chosen",
    text: "I rank every detected opportunity, risk and missed reward by the rupee value on the table, then keep only the ones with strong evidence.",
    evidence: "Reasoned from 3,412 transactions across 6 banks",
  },
  financialDNA: {
    agent: "intelligence",
    title: "How your DNA is built",
    text: "Each trait is scored 0–100 from real behaviour, spend categories, balances, investments and recurring patterns, not a survey.",
    evidence: "Derived from 12 months of categorised spend",
  },
  financialStory: {
    agent: "reasoning",
    title: "How the story is written",
    text: "I stitch the year into a timeline by detecting the moments that changed your finances: a raise, new travel, rising rent, growing savings.",
    evidence: "5 life beats detected from statement patterns",
  },
  monthChanges: {
    agent: "intelligence",
    title: "What's being compared",
    text: "I compare this month against your trailing average for each category, then flag the moves big enough to matter.",
    evidence: "This month vs trailing 3-month average",
  },
  blindSpots: {
    agent: "reasoning",
    title: "How leakage is measured",
    text: "For each area I estimate how much value is quietly leaking, idle cash, missed rewards, unclaimed tax, and size the bar to the rupees at stake.",
    evidence: "₹1,17,000 of leakage identified in total",
  },
  agentMarketplace: {
    agent: "interaction",
    title: "How the score is set",
    text: "The opportunity score blends rupee impact, your eligibility and how well the product fits your behaviour. Higher means act sooner.",
    evidence: "Ranked across SBI's eligible product set",
  },
  financialFuture: {
    agent: "reasoning",
    title: "How these projections work",
    text: "I project two paths from your actual rent, balance and salary, one if nothing changes, one if you act, using conservative growth assumptions.",
    evidence: "10-year horizon · 5% inflation, 8.4% loan rate",
  },
  lifeEvents: {
    agent: "reasoning",
    title: "How life events are inferred",
    text: "Sustained changes in salary credits, FX usage or recurring debits signal a real life event, each carries its own confidence.",
    evidence: "Inferred from recurring transaction patterns",
  },
  relationship: {
    agent: "intelligence",
    title: "How relationship health is scored",
    text: "Stars reflect how active and central each bank is, salary, cards, deposits and recency, so you can see where your money truly lives.",
    evidence: "Across 4 banking relationships",
  },
  walletShare: {
    agent: "intelligence",
    title: "What wallet share means",
    text: "The split shows how much of your money sits with SBI versus outside. Consolidating external balances can unlock better rates and rewards.",
    evidence: "₹18,00,000 currently held outside SBI",
  },
  cashflow: {
    agent: "intelligence",
    title: "How cash flow is built",
    text: "Income and expenses are auto-categorised from credits and debits across every account, then netted to your monthly disposable.",
    evidence: "Monthly averages from 12 months of statements",
  },
  wellness: {
    agent: "intelligence",
    title: "How the score is computed",
    text: "Six pillars, savings, liquidity, debt, investment, insurance and risk, are scored from your data and weighted into one 0–100 number.",
    evidence: "Recomputed nightly from your Customer 360",
  },
  personas: {
    agent: "intelligence",
    title: "How personas are matched",
    text: "I match your behaviour against population segments; the percentage is how strongly you resemble that persona versus your city peers.",
    evidence: "Benchmarked against your city and income band",
  },
  netWorth: {
    agent: "intelligence",
    title: "How net worth is estimated",
    text: "Assets across banks, investments and retirement are summed, then liabilities like loans are subtracted, all from detected balances.",
    evidence: "Estimated from balances across 6 accounts",
  },
  creditScore: {
    agent: "intelligence",
    title: "What this reflects",
    text: "An indicative score from repayment history, credit utilisation and account age. It shapes which products you pre-qualify for.",
    evidence: "Indicative · refreshed from bureau-style signals",
  },
  goals: {
    agent: "reasoning",
    title: "How goals are tracked",
    text: "I map your stated goals to the balances and cash flow needed to hit them, then show how close you are and what would close the gap.",
    evidence: "Tracked against current savings and disposable",
  },
  spendingDonut: {
    agent: "intelligence",
    title: "How spend is categorised",
    text: "Every debit is classified into a category by merchant and pattern, then aggregated, so a single airline or grocery view is always complete.",
    evidence: "Auto-categorised across 6 banks",
  },
  balanceTrend: {
    agent: "reasoning",
    title: "Why this matters",
    text: "Your net balance has climbed steadily, the more it grows idle in savings, the stronger the case for a Fixed Deposit.",
    evidence: "12-month net-balance trend",
  },
};

// ── Financial DNA ───────────────────────────────────────────────────
// Visual trait fingerprint, replaces flat persona badges.
export interface DnaTrait {
  trait: string;
  value: number; // 0-100
  driver: string; // what in the data shaped this trait
}

export const financialDNA: DnaTrait[] = [
  { trait: "Explorer", value: 92, driver: "₹5L airline spend · FX in AED & GBP" },
  { trait: "Saver", value: 64, driver: "37% savings rate · ₹18L balance" },
  { trait: "Investor", value: 52, driver: "Equity tilt rising, but no active SIP" },
  { trait: "Luxury", value: 74, driver: "Premium dining · ₹2.1L MacBook" },
  { trait: "Family", value: 28, driver: "No dependents or family debits detected" },
  { trait: "Risk Appetite", value: 46, driver: "Idle cash high, equity exposure moderate" },
];

// ── Financial Story ─────────────────────────────────────────────────
// A chronological narrative of the year, not a chart.
export interface StoryBeat {
  month: string;
  title: string;
  detail?: string;
  iconKey?: string;
}

export const financialStory: StoryBeat[] = [
  {
    month: "January",
    title: "Salary increased 22%",
    detail: "Your credit jumped to ₹1,90,000 and held.",
    iconKey: "promotion",
  },
  {
    month: "February",
    title: "International travel began",
    detail: "First FX spends in AED and GBP.",
    iconKey: "travel",
  },
  {
    month: "April",
    title: "Rent crossed ₹60,000",
    detail: "12 straight months to the same beneficiary.",
    iconKey: "home",
  },
  {
    month: "June",
    title: "Savings crossed ₹18,00,000",
    detail: "Idle balance growing every month.",
    iconKey: "fd",
  },
  {
    month: "Today",
    title: "Three major opportunities detected",
    detail: "₹1,17,000 waiting to be claimed.",
    iconKey: "sparkles",
  },
];

// ── What changed since last month ───────────────────────────────────
export interface MonthChange {
  label: string;
  delta: string;
  direction: "up" | "down" | "flat";
}

export const monthChanges: MonthChange[] = [
  { label: "Savings", delta: "+8%", direction: "up" },
  { label: "Salary", delta: "+22%", direction: "up" },
  { label: "Travel", delta: "+4 flights", direction: "up" },
  { label: "Fuel", delta: "-12%", direction: "down" },
  { label: "Dining", delta: "+18%", direction: "up" },
  { label: "Investment", delta: "No change", direction: "flat" },
];

// FD confidence climb, shown as the headline "what changed" beat.
export const fdConfidenceShift = { from: 72, to: 96 };

// ── Blind Spot meter ────────────────────────────────────────────────
// value = how much value is leaking (higher = bigger blind spot).
export interface BlindSpot {
  label: string;
  value: number; // 0-100 leakage
  note: string; // rupee quantifier for what is leaking
}

export const blindSpots: BlindSpot[] = [
  { label: "Savings", value: 90, note: "₹20k/yr idle" },
  { label: "Insurance", value: 80, note: "₹42k exposed" },
  { label: "Credit Rewards", value: 72, note: "₹50k missed" },
  { label: "Housing", value: 64, note: "₹7.2L rent/yr" },
  { label: "Investments", value: 58, note: "₹2L idle" },
  { label: "Tax", value: 50, note: "₹38k unclaimed" },
];

// ── Financial Future ────────────────────────────────────────────────
export interface FutureLine {
  label: string;
  value: string;
}

export const financialFuture = {
  years: 10,
  ifNothing: {
    title: "If nothing changes",
    lines: <FutureLine[]>[
      { label: "Rent paid", value: "₹1.03 Cr" },
      { label: "Assets built", value: "₹0" },
    ],
  },
  ifAct: {
    title: "If you take the Home Loan",
    lines: <FutureLine[]>[
      { label: "Property value", value: "₹3 Cr" },
      { label: "Equity built", value: "₹1.6 Cr" },
    ],
  },
};

// ── Money Wrapped ───────────────────────────────────────────────────
export interface WrappedStat {
  label: string;
  value: string;
  caption?: string;
}

export const wrapped = {
  year: 2026,
  stats: <WrappedStat[]>[
    { label: "You spent", value: "₹22.4L", caption: "across 6 banks" },
    { label: "You travelled", value: "14 times", caption: "top 8% in your city" },
    { label: "You ordered", value: "122 Swiggys", caption: "₹62,400 on food" },
    { label: "You watched", value: "38 movies", caption: "Netflix, Prime, BookMyShow" },
    { label: "You saved", value: "₹9.3L", caption: "37% savings rate" },
    { label: "You left behind", value: "₹1.17L", caption: "Spotlite found it all" },
    { label: "Most expensive month", value: "December", caption: "festive + travel" },
    { label: "Biggest purchase", value: "MacBook", caption: "₹2,12,000 on Croma" },
    { label: "Financial age", value: "29", caption: "5 years younger than you" },
    { label: "Top persona", value: "Explorer", caption: "92% match" },
  ],
};
