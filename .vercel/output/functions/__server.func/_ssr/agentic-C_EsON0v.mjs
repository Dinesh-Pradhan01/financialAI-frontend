import { Dt as Lightbulb, Fn as Brain, Gt as FileSearch, H as Send, Nt as GraduationCap } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agentic-C_EsON0v.js
var agents = [
	{
		key: "extraction",
		label: "Extraction Agent",
		short: "Extract",
		tagline: "Reads statements into your financial graph",
		icon: FileSearch
	},
	{
		key: "intelligence",
		label: "Intelligence Agent",
		short: "Understand",
		tagline: "Builds your 360, scores and personas",
		icon: Brain
	},
	{
		key: "reasoning",
		label: "Reasoning Agent",
		short: "Reason",
		tagline: "Finds opportunities, risks and life events",
		icon: Lightbulb
	},
	{
		key: "interaction",
		label: "Interaction Agent",
		short: "Act",
		tagline: "Picks the best time, channel and message",
		icon: Send
	},
	{
		key: "learning",
		label: "Learning Agent",
		short: "Learn",
		tagline: "Learns from every response you give",
		icon: GraduationCap
	}
];
var agentByKey = (k) => agents.find((a) => a.key === k);
var evidenceBase = {
	transactions: 3412,
	banks: 6,
	months: 12
};
var seedNotifications = [
	{
		id: "n1",
		agent: "reasoning",
		title: "₹1,17,000 found overnight",
		body: "3 new Spotlights are ready for you.",
		time: "2h ago"
	},
	{
		id: "n2",
		agent: "reasoning",
		title: "New life event detected",
		body: "Frequent international travel, a Travel Card could pay you back.",
		time: "2h ago"
	},
	{
		id: "n3",
		agent: "interaction",
		title: "Best time to act",
		body: "Tue 7 PM is your highest-response window for the FD nudge.",
		time: "5h ago"
	}
];
var tourSteps = [
	{
		id: "why",
		to: "/home",
		phase: "Understand",
		title: "Meet Spotlite",
		body: "Your bank only sees what you do inside its walls. Spotlite reads your whole financial life across every bank and acts on it."
	},
	{
		id: "upload",
		to: "/upload",
		phase: "Understand",
		agent: "extraction",
		title: "1. Understand: bring everything in",
		body: "Rohan dropped in a year of statements from SBI, HDFC and ICICI. The Extraction Agent turns them into one Unified Financial Graph."
	},
	{
		id: "score",
		to: "/home",
		phase: "Understand",
		agent: "intelligence",
		title: "A complete, scored picture",
		body: "The Intelligence Agent builds a Customer 360 and a Financial Wellness Score, richer than any single bank's view."
	},
	{
		id: "personas",
		to: "/wrapped",
		phase: "Understand",
		agent: "intelligence",
		title: "Who is this person?",
		body: "Spotify-Wrapped-style personas make the data instantly human: Big-Time Traveller, High Spender, and more."
	},
	{
		id: "spending",
		to: "/spending",
		phase: "Reason",
		agent: "reasoning",
		title: "2. Reason: connect the dots",
		body: "₹5L on airlines is 32% of spend. The Reasoning Agent links that pattern to a missed-rewards opportunity."
	},
	{
		id: "spotlights",
		to: "/spotlights",
		phase: "Reason",
		agent: "reasoning",
		title: "Spotlights: money you're leaving on the table",
		body: "Not generic ads, quantified blind spots: ₹20k idle in savings, ₹50k missed card rewards, rent that could be a ₹3 Cr asset."
	},
	{
		id: "detail",
		to: "/spotlights/$id",
		params: { id: "home-loan" },
		phase: "Reason",
		agent: "reasoning",
		title: "The agent shows its work",
		body: "Every Spotlight comes with the signals, the math and a confidence score, reasoning before acting."
	},
	{
		id: "apply",
		to: "/spotlights/$id/apply",
		params: { id: "fd" },
		phase: "Act",
		agent: "interaction",
		title: "3. Act: one tap, the right moment",
		body: "The Interaction Agent routes Rohan straight into the SBI product at the best time on the best channel."
	},
	{
		id: "coach",
		to: "/coach",
		phase: "Act",
		agent: "interaction",
		title: "Talk to your money",
		body: "Ask anything in plain language. 'Can I buy a ₹70L house?' gets a real, reasoned answer."
	},
	{
		id: "learn",
		to: "/agents",
		phase: "Learn",
		agent: "learning",
		title: "4. Learn: it gets smarter",
		body: "Every open, apply and snooze feeds the Learning Agent, so the next nudge is better timed and more relevant."
	}
];
var languages = [
	{
		code: "en",
		label: "English"
	},
	{
		code: "hi",
		label: "हिन्दी"
	},
	{
		code: "ta",
		label: "தமிழ்"
	},
	{
		code: "te",
		label: "తెలుగు"
	}
];
var channels = [
	"WhatsApp",
	"App notification",
	"Email",
	"SMS"
];
var explainers = {
	aiTimeline: {
		agent: "learning",
		title: "How this runs overnight",
		text: "Each night the five agents re-read your statements, rebuild your Customer 360 and re-rank opportunities, so the morning brief is always current.",
		evidence: "Last run 02:11–02:20 · 9 steps across 5 agents"
	},
	spotlights: {
		agent: "reasoning",
		title: "How Spotlights are chosen",
		text: "I rank every detected opportunity, risk and missed reward by the rupee value on the table, then keep only the ones with strong evidence.",
		evidence: "Reasoned from 3,412 transactions across 6 banks"
	},
	financialDNA: {
		agent: "intelligence",
		title: "How your DNA is built",
		text: "Each trait is scored 0–100 from real behaviour, spend categories, balances, investments and recurring patterns, not a survey.",
		evidence: "Derived from 12 months of categorised spend"
	},
	financialStory: {
		agent: "reasoning",
		title: "How the story is written",
		text: "I stitch the year into a timeline by detecting the moments that changed your finances: a raise, new travel, rising rent, growing savings.",
		evidence: "5 life beats detected from statement patterns"
	},
	monthChanges: {
		agent: "intelligence",
		title: "What's being compared",
		text: "I compare this month against your trailing average for each category, then flag the moves big enough to matter.",
		evidence: "This month vs trailing 3-month average"
	},
	blindSpots: {
		agent: "reasoning",
		title: "How leakage is measured",
		text: "For each area I estimate how much value is quietly leaking, idle cash, missed rewards, unclaimed tax, and size the bar to the rupees at stake.",
		evidence: "₹1,17,000 of leakage identified in total"
	},
	agentMarketplace: {
		agent: "interaction",
		title: "How the score is set",
		text: "The opportunity score blends rupee impact, your eligibility and how well the product fits your behaviour. Higher means act sooner.",
		evidence: "Ranked across SBI's eligible product set"
	},
	financialFuture: {
		agent: "reasoning",
		title: "How these projections work",
		text: "I project two paths from your actual rent, balance and salary, one if nothing changes, one if you act, using conservative growth assumptions.",
		evidence: "10-year horizon · 5% inflation, 8.4% loan rate"
	},
	lifeEvents: {
		agent: "reasoning",
		title: "How life events are inferred",
		text: "Sustained changes in salary credits, FX usage or recurring debits signal a real life event, each carries its own confidence.",
		evidence: "Inferred from recurring transaction patterns"
	},
	relationship: {
		agent: "intelligence",
		title: "How relationship health is scored",
		text: "Stars reflect how active and central each bank is, salary, cards, deposits and recency, so you can see where your money truly lives.",
		evidence: "Across 4 banking relationships"
	},
	walletShare: {
		agent: "intelligence",
		title: "What wallet share means",
		text: "The split shows how much of your money sits with SBI versus outside. Consolidating external balances can unlock better rates and rewards.",
		evidence: "₹18,00,000 currently held outside SBI"
	},
	cashflow: {
		agent: "intelligence",
		title: "How cash flow is built",
		text: "Income and expenses are auto-categorised from credits and debits across every account, then netted to your monthly disposable.",
		evidence: "Monthly averages from 12 months of statements"
	},
	wellness: {
		agent: "intelligence",
		title: "How the score is computed",
		text: "Six pillars, savings, liquidity, debt, investment, insurance and risk, are scored from your data and weighted into one 0–100 number.",
		evidence: "Recomputed nightly from your Customer 360"
	},
	personas: {
		agent: "intelligence",
		title: "How personas are matched",
		text: "I match your behaviour against population segments; the percentage is how strongly you resemble that persona versus your city peers.",
		evidence: "Benchmarked against your city and income band"
	},
	netWorth: {
		agent: "intelligence",
		title: "How net worth is estimated",
		text: "Assets across banks, investments and retirement are summed, then liabilities like loans are subtracted, all from detected balances.",
		evidence: "Estimated from balances across 6 accounts"
	},
	creditScore: {
		agent: "intelligence",
		title: "What this reflects",
		text: "An indicative score from repayment history, credit utilisation and account age. It shapes which products you pre-qualify for.",
		evidence: "Indicative · refreshed from bureau-style signals"
	},
	goals: {
		agent: "reasoning",
		title: "How goals are tracked",
		text: "I map your stated goals to the balances and cash flow needed to hit them, then show how close you are and what would close the gap.",
		evidence: "Tracked against current savings and disposable"
	},
	spendingDonut: {
		agent: "intelligence",
		title: "How spend is categorised",
		text: "Every debit is classified into a category by merchant and pattern, then aggregated, so a single airline or grocery view is always complete.",
		evidence: "Auto-categorised across 6 banks"
	},
	balanceTrend: {
		agent: "reasoning",
		title: "Why this matters",
		text: "Your net balance has climbed steadily, the more it grows idle in savings, the stronger the case for a Fixed Deposit.",
		evidence: "12-month net-balance trend"
	}
};
var financialDNA = [
	{
		trait: "Explorer",
		value: 92,
		driver: "₹5L airline spend · FX in AED & GBP"
	},
	{
		trait: "Saver",
		value: 64,
		driver: "37% savings rate · ₹18L balance"
	},
	{
		trait: "Investor",
		value: 52,
		driver: "Equity tilt rising, but no active SIP"
	},
	{
		trait: "Luxury",
		value: 74,
		driver: "Premium dining · ₹2.1L MacBook"
	},
	{
		trait: "Family",
		value: 28,
		driver: "No dependents or family debits detected"
	},
	{
		trait: "Risk Appetite",
		value: 46,
		driver: "Idle cash high, equity exposure moderate"
	}
];
var wrapped = {
	year: 2026,
	stats: [
		{
			label: "You spent",
			value: "₹22.4L",
			caption: "across 6 banks"
		},
		{
			label: "You travelled",
			value: "14 times",
			caption: "top 8% in your city"
		},
		{
			label: "You ordered",
			value: "122 Swiggys",
			caption: "₹62,400 on food"
		},
		{
			label: "You watched",
			value: "38 movies",
			caption: "Netflix, Prime, BookMyShow"
		},
		{
			label: "You saved",
			value: "₹9.3L",
			caption: "37% savings rate"
		},
		{
			label: "You left behind",
			value: "₹1.17L",
			caption: "Spotlite found it all"
		},
		{
			label: "Most expensive month",
			value: "December",
			caption: "festive + travel"
		},
		{
			label: "Biggest purchase",
			value: "MacBook",
			caption: "₹2,12,000 on Croma"
		},
		{
			label: "Financial age",
			value: "29",
			caption: "5 years younger than you"
		},
		{
			label: "Top persona",
			value: "Explorer",
			caption: "92% match"
		}
	]
};
//#endregion
export { explainers as a, seedNotifications as c, evidenceBase as i, tourSteps as l, agents as n, financialDNA as o, channels as r, languages as s, agentByKey as t, wrapped as u };
