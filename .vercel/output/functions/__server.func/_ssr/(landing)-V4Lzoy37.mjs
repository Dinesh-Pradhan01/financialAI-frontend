import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, d as Content, p as Overlay, u as Close } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, An as Calculator, At as Landmark, D as Star, Dn as ChartColumn, Gn as ArrowRight, H as Send, In as Bot, Jn as Activity, Mn as Building2, Ot as Layers, Pt as Globe, R as ShieldCheck, Wt as FileSpreadsheet, Xt as Eye, Y as RefreshCw, _ as TriangleAlert, _t as Menu, d as UserPlus, gn as CircleCheck, m as Upload, n as X, o as Users, pt as Network, q as RotateCcw, t as Zap, vn as ChevronsRight, wn as Check, xn as ChevronRight, yn as ChevronsLeft } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, o as DialogPortal, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/(landing)-V4Lzoy37.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LandingCTA({ onOpenArchitecture, onOpenSandbox }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "demo",
		className: "bg-[#071329] py-10 sm:py-12 lg:py-14 text-white overflow-hidden relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-5xl 2xl:max-w-6xl px-4 text-center sm:px-6 lg:px-8 2xl:px-12 relative z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: { duration: .45 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white leading-[1.15] text-balance",
						children: "See SpotLite in action with your own ledger data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2.5 max-w-[58ch] text-sm sm:text-base leading-relaxed text-blue-100/90 text-balance",
						children: "Our financial engineers will walk you through a live, customized demonstration based on your industry, transaction volume, and headcount priorities with zero obligation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							whileTap: { scale: .98 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/signup",
								className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold tracking-[-0.005em] text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover active:scale-[0.98] w-full sm:w-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Executive Demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onOpenArchitecture,
							className: "inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold tracking-[-0.005em] text-white transition-all hover:bg-white/10 w-full sm:w-auto cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Architecture Specs" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs font-normal text-blue-200/80",
						children: "No long-term contracts · Bank-grade data encryption · Live in days"
					})
				]
			})
		})
	});
}
function LandingFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-[#050c1b] text-slate-400",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl 2xl:max-w-360 gap-8 lg:gap-10 px-4 py-10 lg:py-12 sm:px-6 lg:grid-cols-5 lg:px-8 2xl:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white font-bold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
									size: 20,
									className: "fill-current text-white"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xl font-bold font-display tracking-tight text-white",
								children: ["Spot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Lite"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-sm sm:text-base leading-relaxed text-slate-300",
							children: "The workforce & financial intelligence platform designed for fast-growing companies. Automate payroll audits, eliminate ghost payments, and align leadership."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs sm:text-sm font-semibold text-slate-200 font-mono",
								children: "All Systems Operational · 99.99% Uptime"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-wider text-slate-200 font-display",
					children: "Platform"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-xs sm:text-sm font-normal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#modules",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Customer 360"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#modules",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Industry Benchmarking"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#modules",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Opportunity Radar"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#modules",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Risk & Fraud Engine"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#modules",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "HR & Payroll Ledger"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#modules",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "SpotLite AI Copilot"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-wider text-slate-200 font-display",
					children: "Company"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-xs sm:text-sm font-normal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "About Us"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Leadership"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Careers (We're Hiring)"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Security & Trust"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Press & Media"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-wider text-slate-200 font-display",
					children: "Resources"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-xs sm:text-sm font-normal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Documentation"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "API Reference"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Customer Stories"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Payroll Audit Guide"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "text-slate-300 hover:text-white transition-colors",
							children: "Contact Support"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl 2xl:max-w-360 flex-col gap-3 px-4 py-4 sm:py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 2xl:px-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 SpotLite Technologies Inc. All rights reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-slate-200 transition-colors",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-slate-200 transition-colors",
							children: "Terms of Service"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-slate-200 transition-colors",
							children: "Security Disclosures"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-slate-200 transition-colors",
							children: "Cookie Preferences"
						})
					]
				})]
			})
		})]
	});
}
var NAV_LINKS = [
	{
		name: "Platform",
		href: "#platform"
	},
	{
		name: "Modules",
		href: "#modules"
	},
	{
		name: "Roles",
		href: "#roles"
	},
	{
		name: "How It Works",
		href: "#how-it-works"
	},
	{
		name: "Pricing",
		href: "#pricing"
	},
	{
		name: "Security",
		href: "#security"
	}
];
var HERO_DATA = {
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
		anomalyDesc: "Cloud infra invoices jumped +38% MoM without corresponding headcount growth. Estimated leakage: ₹3.2L/month.",
		benchmarkLabel: "Salary vs Peer Benchmark (IT Mid-tier India)",
		benchmarkStatus: "Optimized (P50)",
		copilotQuery: "> \"What is our runway if we hire 12 senior engineers in Q3?\"",
		copilotAnswer: "\"Based on current ₹42.8L monthly burn, runway adjusts from 18.4 to 14.1 months with ₹8.4L payroll delta.\""
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
		anomalyDesc: "Cloud infra invoices jumped +38% MoM without corresponding headcount growth. Estimated leakage: $3,900/month.",
		benchmarkLabel: "Salary vs Peer Benchmark (SaaS Mid-market US)",
		benchmarkStatus: "Optimized (P50)",
		copilotQuery: "> \"What is our runway if we hire 12 senior engineers in Q3?\"",
		copilotAnswer: "\"Based on current $52.4K monthly burn, runway adjusts from 18.4 to 14.1 months with $10.2K payroll delta.\""
	}
};
var STATS_DATA = {
	INR: [
		{
			value: "500+",
			label: "Companies Profiled",
			detail: "Across India & Emerging Tech Hubs"
		},
		{
			value: "₹31,000 Cr+",
			label: "Transactions Audited",
			detail: "Real-time bank & GST ledger audit"
		},
		{
			value: "99.4%",
			label: "Role Clarity Score",
			detail: "Zero unauthorized access"
		},
		{
			value: "65%",
			label: "Faster Review Cycles",
			detail: "From weeks to hours"
		}
	],
	USD: [
		{
			value: "500+",
			label: "Companies Profiled",
			detail: "Across US, UK & APAC"
		},
		{
			value: "$3.8B+",
			label: "Transactions Audited",
			detail: "Real-time cross-bank ledger audit"
		},
		{
			value: "99.4%",
			label: "Role Clarity Score",
			detail: "Zero unauthorized access"
		},
		{
			value: "65%",
			label: "Faster Review Cycles",
			detail: "From weeks to hours"
		}
	]
};
var MODULES = [
	{
		id: "c360",
		icon: Building2,
		tag: "Intelligence",
		title: "Customer 360",
		headline: "Unified Operational & Entity Baseline",
		description: "Synthesizes external corporate records, banking relationships, leadership changes, and credit ratings into one executive dashboard.",
		bullets: [
			"Company overview & executive leadership graph",
			"Public sentiment, credit ratings & regulatory filings",
			"AI-driven competitor reputation and stability scoring"
		],
		sampleMetric: {
			label: "Entity Health Index",
			value: "84 / 100",
			subtext: "Top 15% across operating peers",
			badge: "Healthy"
		}
	},
	{
		id: "benchmark",
		icon: ChartColumn,
		tag: "Benchmarking",
		title: "Industry & Policies",
		headline: "Peer Performance & Macroeconomic Comparisons",
		description: "Benchmark your operating margin, payroll efficiency, and working capital cycle against verified industry leaders in your sector.",
		bullets: [
			"Top 10 peer operational performance leaderboard",
			"Macroeconomic index & EBITDA margin comparables",
			"Live regulatory compliance & policy changes feed"
		],
		sampleMetric: {
			label: "Working Capital Cycle",
			value: "38 Days",
			subtext: "12 days faster than sector median (50d)",
			badge: "Outperforming"
		}
	},
	{
		id: "radar",
		icon: Network,
		tag: "Optimization",
		title: "Opportunity Radar",
		headline: "Capital Savings & Payment Terms Engine",
		description: "Continuously scans transaction logs to surface hidden cash flow improvements, duplicate SaaS tools, and supplier discount opportunities.",
		bullets: [
			"Tailored banking and working capital credit lines",
			"Duplicate software & vendor contract consolidation",
			"Early payment dynamic discount opportunities"
		],
		sampleMetric: {
			label: "Identified Annual Savings",
			value: "₹18.6 Lakhs",
			subtext: "Across 4 redundant vendor subscriptions",
			badge: "High Impact"
		}
	},
	{
		id: "risk",
		icon: TriangleAlert,
		tag: "Risk & Fraud",
		title: "Risk Engine",
		headline: "Continuous Anomaly & Compliance Watchdog",
		description: "Automated surveillance across payroll, vendor payments, and bank accounts to catch off-contract payments, ghost entries, and price spikes.",
		bullets: [
			"Ghost employee & payroll roster mismatch alerts",
			"Unapproved vendor & off-contract disbursements",
			"Sudden spend velocity spikes & duplicate invoice flags"
		],
		sampleMetric: {
			label: "Active Risk Alerts",
			value: "1 High, 2 Medium",
			subtext: "Zero critical leaks in last 30 days",
			badge: "Monitored"
		}
	},
	{
		id: "ledger",
		icon: Users,
		tag: "Governance",
		title: "HR & Payroll Ledger",
		headline: "Authoritative Headcount & Vendor Registry",
		description: "Provides verified roster verification, contractor tracking, and compensation breakdowns feeding directly into executive risk models.",
		bullets: [
			"Real-time synchronized employee roster with PAN/tax IDs",
			"Verified vendor database with statutory compliance records",
			"Direct feed into automated Risk & Opportunity models"
		],
		sampleMetric: {
			label: "Verified Roster Match",
			value: "100%",
			subtext: "342 of 342 records verified with bank disbursals",
			badge: "Reconciled"
		}
	}
];
var ROLES = [
	{
		id: "ceo",
		icon: Landmark,
		role: "CEO & Board",
		access: "Full Governance",
		subtitle: "Complete Organizational Command",
		description: "High-level strategic visibility across all modules with real-time risk alerts, industry positioning, and exportable board packs.",
		bullets: [
			"Consolidated executive health score with critical risk alerts",
			"Peer operational leaderboard & competitive market position",
			"Macro cash runway forecasts & cross-department approvals"
		],
		highlightBadge: "Full Executive Admin",
		previewKpis: [
			{
				label: "Company Health",
				valueINR: "84 / 100",
				valueUSD: "84 / 100",
				trend: "Top Quartile",
				status: "good"
			},
			{
				label: "Cash Runway",
				valueINR: "18.4 mo",
				valueUSD: "18.4 mo",
				trend: "+2.1 mo vs Plan",
				status: "good"
			},
			{
				label: "Open Risks",
				valueINR: "1 Flag",
				valueUSD: "1 Flag",
				trend: "Vendor price spike",
				status: "alert"
			}
		],
		primaryAction: "Explore CEO View"
	},
	{
		id: "cfo",
		icon: Calculator,
		role: "CFO & Finance",
		access: "Financial Operations",
		subtitle: "Ledgers, Statements & Runway",
		description: "Automated statement ingestion, OCR reconciliation, cash burn tracking, vendor spend velocity, and bank-grade audit logs.",
		bullets: [
			"Multi-bank statement OCR ingestion & automated reconciliation",
			"Departmental budget vs actuals tracking with velocity alerts",
			"Cash runway projections & working capital optimization"
		],
		highlightBadge: "Finance Workspace",
		previewKpis: [
			{
				label: "Monthly Burn",
				valueINR: "₹42.8L",
				valueUSD: "$52.4K",
				trend: "-4.2% MoM",
				status: "good"
			},
			{
				label: "Identified Leakage",
				valueINR: "₹3.2L/mo",
				valueUSD: "$3.9K/mo",
				trend: "Cloud infra spike",
				status: "alert"
			},
			{
				label: "Reconciliation",
				valueINR: "99.8%",
				valueUSD: "99.8%",
				trend: "Auto-cleared",
				status: "good"
			}
		],
		primaryAction: "Explore CFO View"
	},
	{
		id: "hr",
		icon: UserPlus,
		role: "HR & People",
		access: "People & Headcount",
		subtitle: "Workforce Costs & Verified Rosters",
		description: "Maintains the official employee rosters, contractor records, verified vendor IDs, and compensation compliance feeds.",
		bullets: [
			"Headcount database with statutory tax ID validation",
			"Approved vendor registry & contractor compliance records",
			"Direct feed into anomaly risk prevention & payroll variance"
		],
		highlightBadge: "People Workspace",
		previewKpis: [
			{
				label: "Verified Headcount",
				valueINR: "342 Active",
				valueUSD: "342 Active",
				trend: "+14 QTD",
				status: "good"
			},
			{
				label: "Payroll Variance",
				valueINR: "0.2%",
				valueUSD: "0.2%",
				trend: "Within normal limits",
				status: "good"
			},
			{
				label: "Compliance Status",
				valueINR: "100% Up to Date",
				valueUSD: "100% Up to Date",
				trend: "All filings verified",
				status: "good"
			}
		],
		primaryAction: "Explore HR View"
	},
	{
		id: "coo",
		icon: Network,
		role: "COO & Operations",
		access: "Operations & Vendors",
		subtitle: "Vendor Velocity & SaaS Efficiency",
		description: "Cross-departmental vendor spend tracking, duplicate software detection, SLA verification, and working capital cycle alerts.",
		bullets: [
			"Continuous vendor price surge & duplicate SaaS detection",
			"Automated contract renewal & payment terms tracking",
			"Working capital runway & supplier credit optimization"
		],
		highlightBadge: "Ops Workspace",
		previewKpis: [
			{
				label: "Vendor Sprawl",
				valueINR: "4 Duplicates",
				valueUSD: "4 Duplicates",
				trend: "₹18.6L potential savings",
				status: "alert"
			},
			{
				label: "Cash Cycle",
				valueINR: "38 Days",
				valueUSD: "38 Days",
				trend: "12d faster than peers",
				status: "good"
			},
			{
				label: "Active Contracts",
				valueINR: "48 Monitored",
				valueUSD: "48 Monitored",
				trend: "100% SLA compliant",
				status: "good"
			}
		],
		primaryAction: "Explore COO View"
	}
];
var SANDBOX_ROLES_DATA = {
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
			sourcesList: [
				"HDFC Primary Current A/c",
				"SBI Operational A/c",
				"ICICI Reserve Line",
				"Razorpay Inflow"
			]
		},
		step2: {
			anomalyTitle: "Runway Sensitivity Alert: Q3 Burn Acceleration",
			severity: "High",
			descriptionINR: "Net burn increased +11% MoM due to unbudgeted vendor price hikes, compressing projected runway from 18.4 to 15.2 months.",
			descriptionUSD: "Net burn increased +11% MoM due to unbudgeted vendor price hikes, compressing projected runway from 18.4 to 15.2 months.",
			quantifiedLeakageINR: "₹3.20 Lakhs / month",
			quantifiedLeakageUSD: "$3,900 / month",
			recommendation: "Enforce 14-day vendor contract renegotiation protocol to restore 18+ month target runway.",
			actionLabel: "Lock Runway Preservation Protocol",
			actionDoneText: "Runway preservation plan generated and distributed to finance leadership."
		},
		step3: {
			presetPrompts: [
				"What happens to our runway if we hire 12 engineers in Q3?",
				"How does our EBITDA margin compare to top decile peers?",
				"What are our 3 highest ROI capital optimization levers?"
			],
			qaINR: {
				"What happens to our runway if we hire 12 engineers in Q3?": {
					summary: "Runway adjusts from 18.4 to 14.1 months (-4.3 months) with ₹8.4L monthly payroll delta.",
					reasoning: [
						"Current cash reserves stand at ₹3.84 Cr with ₹42.8L/mo baseline burn.",
						"12 senior engineers add ₹8.40L/mo in salary + statutory benefits (PF, Gratuity, ESI).",
						"Breakeven on this cohort requires +₹12.2L incremental ARR by Month 5."
					],
					impactDelta: "Runway: 18.4mo → 14.1mo (₹8.4L/mo added burn)",
					action: "Recommendation: Stagger hiring into 2 tranches (6 in Jul, 6 in Sep) to protect 16+ mo runway."
				},
				"How does our EBITDA margin compare to top decile peers?": {
					summary: "Your 18.2% EBITDA margin ranks at the 68th percentile (peer median is 16.4%, top decile is 24.1%).",
					reasoning: [
						"Gross margins are healthy at 74.2% (Top 15% in Mid-tier IT/SaaS).",
						"Sales & marketing efficiency is high (CAC payback: 7.8 months vs peer avg 11.2 months).",
						"General & Admin expenses are 4.2% higher than top decile due to unmanaged SaaS sprawl."
					],
					impactDelta: "Potential +₹18.6L annual EBITDA expansion via G&A optimization",
					action: "Recommendation: Execute SaaS consolidation to reach top 15% EBITDA benchmark (21.5%)."
				},
				"What are our 3 highest ROI capital optimization levers?": {
					summary: "Identified ₹28.4L annual capital unlock across 3 high-confidence levers.",
					reasoning: [
						"1. Cloud Infrastructure & SaaS tool consolidation: ₹18.6L/year.",
						"2. Negotiate 45-day payment terms on top 3 vendor contracts: ₹6.8L working capital unlock.",
						"3. Shift idle ₹1.2 Cr treasury cash to automated high-yield overnight sweep: ₹3.0L interest yield."
					],
					impactDelta: "+₹28.4L annualized bottom-line impact",
					action: "Recommendation: Auto-generate CFO execution board for these 3 workstreams."
				}
			},
			qaUSD: {
				"What happens to our runway if we hire 12 engineers in Q3?": {
					summary: "Runway adjusts from 18.4 to 14.1 months (-4.3 months) with $10.2K monthly payroll delta.",
					reasoning: [
						"Current cash reserves stand at $4.62M with $52.4K/mo baseline burn.",
						"12 senior engineers add $10.2K/mo in fully loaded payroll and benefits.",
						"Breakeven on this cohort requires +$15K incremental MRR by Month 5."
					],
					impactDelta: "Runway: 18.4mo → 14.1mo ($10.2K/mo added burn)",
					action: "Recommendation: Stagger hiring into 2 tranches (6 in Jul, 6 in Sep) to protect 16+ mo runway."
				},
				"How does our EBITDA margin compare to top decile peers?": {
					summary: "Your 18.2% EBITDA margin ranks at the 68th percentile (peer median is 16.4%, top decile is 24.1%).",
					reasoning: [
						"Gross margins are healthy at 74.2% (Top 15% in Mid-tier SaaS).",
						"Sales & marketing efficiency is high (CAC payback: 7.8 months vs peer avg 11.2 months).",
						"General & Admin expenses are 4.2% higher than top decile due to unmanaged SaaS sprawl."
					],
					impactDelta: "Potential +$22.5K annual EBITDA expansion via G&A optimization",
					action: "Recommendation: Execute SaaS consolidation to reach top 15% EBITDA benchmark (21.5%)."
				},
				"What are our 3 highest ROI capital optimization levers?": {
					summary: "Identified $34.2K annual capital unlock across 3 high-confidence levers.",
					reasoning: [
						"1. Cloud Infrastructure & SaaS tool consolidation: $22.5K/year.",
						"2. Negotiate 45-day payment terms on top 3 vendor contracts: $8.2K working capital unlock.",
						"3. Shift idle treasury cash to automated high-yield overnight sweep: $3.5K interest yield."
					],
					impactDelta: "+$34.2K annualized bottom-line impact",
					action: "Recommendation: Auto-generate CFO execution board for these 3 workstreams."
				}
			}
		}
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
			sourcesList: [
				"HDFC Current A/c",
				"SBI Operating A/c",
				"Axis Escrow A/c",
				"GST 2B Portal"
			]
		},
		step2: {
			anomalyTitle: "Multi-Bank OCR Flag: Off-Contract Duplicate Vendor Disbursement",
			severity: "Critical",
			descriptionINR: "Detected 2 duplicate disbursements of ₹1.45L paid to a secondary marketing agency account across HDFC and Axis portals within 48 hours.",
			descriptionUSD: "Detected 2 duplicate disbursements of $1,750 paid to a secondary marketing agency account across 2 bank portals within 48 hours.",
			quantifiedLeakageINR: "₹1.45 Lakhs (Duplicate)",
			quantifiedLeakageUSD: "$1,750 (Duplicate)",
			recommendation: "Automate cross-bank deduplication block and issue clawback request to vendor.",
			actionLabel: "Issue Immediate Clawback Notice",
			actionDoneText: "Clawback notice generated with transaction audit hashes and emailed to vendor."
		},
		step3: {
			presetPrompts: [
				"Reconcile HDFC vs SBI cash balances and flag variances",
				"Summarize active GST/tax input credit mismatches",
				"Analyze monthly burn trend and vendor payment velocity"
			],
			qaINR: {
				"Reconcile HDFC vs SBI cash balances and flag variances": {
					summary: "Multi-bank reconciliation complete: 4,890 transactions matched with ₹0 unexplained variance.",
					reasoning: [
						"HDFC Current Balance: ₹3.42 Cr (Verified against bank API hash).",
						"SBI Operating Balance: ₹1.28 Cr (Payroll & statutory tax accounts cleared).",
						"Axis Escrow: ₹42.0L (Client advance holdbacks reconciled)."
					],
					impactDelta: "99.9% automated reconciliation match rate",
					action: "Recommendation: Auto-export reconciliation certificate for statutory audit file."
				},
				"Summarize active GST/tax input credit mismatches": {
					summary: "Found ₹82,400 in unclaimed ITC due to vendor filing delay in GSTR-2B.",
					reasoning: ["3 vendors (Cloud hosting, Office lease, Legal retainers) have not uploaded GSTR-1 for previous month.", "All invoice e-way bills and TDS deductions are strictly verified on our ledger."],
					impactDelta: "₹82,400 ITC eligible for recovery upon vendor filing",
					action: "Recommendation: Trigger automated vendor reminder with GSTR-2B discrepancy report."
				},
				"Analyze monthly burn trend and vendor payment velocity": {
					summary: "Current monthly burn is ₹42.8L (-4.2% MoM). Vendor spend velocity is normalized except Cloud Infra.",
					reasoning: [
						"Payroll: ₹28.2L (65.9% of total burn, consistent with target).",
						"Direct Vendor Spends: ₹10.4L (AWS + SaaS + Marketing).",
						"Statutory & G&A: ₹4.2L."
					],
					impactDelta: "Net burn savings of ₹1.8L achieved compared to prior quarter baseline",
					action: "Recommendation: Set automated velocity alert threshold at +15% per vendor per month."
				}
			},
			qaUSD: {
				"Reconcile HDFC vs SBI cash balances and flag variances": {
					summary: "Multi-bank reconciliation complete: 4,890 transactions matched with $0 unexplained variance.",
					reasoning: [
						"Chase Operating Balance: $4.12M (Verified against bank API hash).",
						"BofA Reserve Balance: $1.54M (Payroll & statutory tax accounts cleared).",
						"SVB Escrow: $520K (Client advance holdbacks reconciled)."
					],
					impactDelta: "99.9% automated reconciliation match rate",
					action: "Recommendation: Auto-export reconciliation certificate for statutory audit file."
				},
				"Summarize active GST/tax input credit mismatches": {
					summary: "Found $9,800 in unapplied sales tax credits due to vendor 1099 filing delays.",
					reasoning: ["3 vendors have not confirmed W-9/1099 compliance certificates.", "All invoices and wire confirmations are verified on our ledger."],
					impactDelta: "$9,800 tax credit eligible for resolution",
					action: "Recommendation: Trigger automated compliance reminder to vendor accounting."
				},
				"Analyze monthly burn trend and vendor payment velocity": {
					summary: "Current monthly burn is $52.4K (-4.2% MoM). Vendor spend velocity is within 3% tolerance.",
					reasoning: [
						"Payroll: $34.5K (65.8% of total burn).",
						"Direct Vendor Spends: $12.8K (AWS + SaaS + Marketing).",
						"Statutory & G&A: $5.1K."
					],
					impactDelta: "Net burn savings of $2.2K achieved compared to prior quarter baseline",
					action: "Recommendation: Set automated velocity alert threshold at +15% per vendor per month."
				}
			}
		}
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
			sourcesList: [
				"Darwinbox HRIS",
				"HDFC Salary Disbursal Feed",
				"EPFO Portal",
				"TDS Form 24Q"
			]
		},
		step2: {
			anomalyTitle: "People Risk Radar: Off-Roster Contractor Invoice Discrepancy",
			severity: "High",
			descriptionINR: "Received an unverified invoice of ₹64,000 for 'QA Contractor Services' not linked to any approved requisition in HR roster.",
			descriptionUSD: "Received an unverified invoice of $780 for 'QA Contractor Services' not linked to any approved requisition in HR roster.",
			quantifiedLeakageINR: "₹64,000 (Unverified Requisition)",
			quantifiedLeakageUSD: "$780 (Unverified Requisition)",
			recommendation: "Hold disbursement until hiring manager approves SOW and compliance documents are submitted.",
			actionLabel: "Place Requisition On Hold",
			actionDoneText: "Disbursal blocked. Automated verification link sent to hiring manager."
		},
		step3: {
			presetPrompts: [
				"Audit headcount growth vs payroll budget for Engineering",
				"Compare our senior developer salaries against India P50/P75 market benchmark",
				"Check statutory PF/ESI/TDS compliance status across all 342 employees"
			],
			qaINR: {
				"Audit headcount growth vs payroll budget for Engineering": {
					summary: "Engineering headcount is 184 (Budget: 190). Payroll is ₹15.8L/mo (₹1.1L below planned budget).",
					reasoning: [
						"14 new hires onboarded in Q1 with zero ghost-entry or duplicate PAN records.",
						"Average time-to-productivity: 18 days (Industry benchmark: 26 days).",
						"Contractor-to-full-time ratio is optimal at 12%."
					],
					impactDelta: "Payroll variance: +0.2% (Within safe green band)",
					action: "Recommendation: Reallocate remaining ₹1.1L surplus to Q3 retention & bonus pool."
				},
				"Compare our senior developer salaries against India P50/P75 market benchmark": {
					summary: "Senior Engineering salaries are at the 52nd percentile (P50: ₹24L-28L CTC; SpotLite avg: ₹26.2L).",
					reasoning: [
						"Compensation is highly competitive and prevents key employee attrition.",
						"ESOP grant participation is 64% across senior ICs.",
						"Sales compensation has 8% higher variable component than market average."
					],
					impactDelta: "Retention risk score: Low (94% retention rate over last 12 months)",
					action: "Recommendation: Maintain current compensation bands for upcoming appraisal cycle."
				},
				"Check statutory PF/ESI/TDS compliance status across all 342 employees": {
					summary: "100% compliant: All PF/ESI remittances and TDS 24Q deduplication verified against bank records.",
					reasoning: ["342 of 342 active employee PAN cards validated via NSDL verification.", "EPFO electronic challan receipt generated and cross-matched with bank debit."],
					impactDelta: "Zero statutory penalties or audit flags",
					action: "Recommendation: Auto-archive compliance report for quarterly board review."
				}
			},
			qaUSD: {
				"Audit headcount growth vs payroll budget for Engineering": {
					summary: "Engineering headcount is 184 (Budget: 190). Payroll is $22.4K/mo ($1.4K below budget).",
					reasoning: [
						"14 new hires onboarded in Q1 with zero compliance flags.",
						"Average ramp time: 18 days (Benchmark: 26 days).",
						"Contractor ratio is optimal at 12%."
					],
					impactDelta: "Payroll variance: +0.2% (Within safe green band)",
					action: "Recommendation: Reallocate remaining surplus to Q3 retention bonus pool."
				},
				"Compare our senior developer salaries against India P50/P75 market benchmark": {
					summary: "Senior Engineering salaries are at the 52nd percentile (Market median: $140K; SpotLite avg: $143K).",
					reasoning: ["Compensation is competitive and prevents key employee attrition.", "Equity grant participation is 64% across senior ICs."],
					impactDelta: "Retention risk score: Low (94% retention rate)",
					action: "Recommendation: Maintain current compensation bands for upcoming cycle."
				},
				"Check statutory PF/ESI/TDS compliance status across all 342 employees": {
					summary: "100% compliant: All payroll tax withholdings and W-2 records cross-matched with bank debits.",
					reasoning: ["342 employee tax filings and direct deposit verifications cleared.", "Zero payroll audit flags or tax discrepancies."],
					impactDelta: "Zero statutory penalties or audit flags",
					action: "Recommendation: Auto-archive compliance report for quarterly board review."
				}
			}
		}
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
			sourcesList: [
				"AWS Billing Console",
				"Google Workspace",
				"Zoho Books",
				"Vendor Contract Vault"
			]
		},
		step2: {
			anomalyTitle: "Vendor Opportunity Radar: 4 Duplicate SaaS Subscriptions Detected",
			severity: "Optimization",
			descriptionINR: "Found 4 overlapping project management & analytics licenses (Asana + Monday.com + Mixpanel + Amplitude) billed across marketing and product teams.",
			descriptionUSD: "Found 4 overlapping project management & analytics licenses (Asana + Monday.com + Mixpanel + Amplitude) billed across marketing and product teams.",
			quantifiedLeakageINR: "₹18.6 Lakhs / year",
			quantifiedLeakageUSD: "$22.5K / year",
			recommendation: "Consolidate onto single enterprise license and eliminate 18 unused seat allocations.",
			actionLabel: "Generate Tool Consolidation Plan",
			actionDoneText: "Consolidation plan created: Assigned to IT admin with 18 identified orphan seats."
		},
		step3: {
			presetPrompts: [
				"Identify our top 5 vendor contracts up for renewal in next 60 days",
				"Benchmark our working capital cash conversion cycle vs industry peers",
				"Detect untracked auto-renewing software subscriptions"
			],
			qaINR: {
				"Identify our top 5 vendor contracts up for renewal in next 60 days": {
					summary: "5 contracts up for renewal totalling ₹24.2L. 2 have dynamic early-payment discounts.",
					reasoning: [
						"1. AWS Cloud Enterprise: ₹11.6L/mo (Eligible for 18% savings with 1-yr Savings Plan).",
						"2. Salesforce CRM: ₹4.8L/yr (12 unused seats identified).",
						"3. Office Lease Bangalore: ₹5.2L/mo (Terms locked until Dec 2026)."
					],
					impactDelta: "Estimated negotiable savings: ₹4.8L upon contract renewal",
					action: "Recommendation: Send pre-negotiation terms 30 days ahead of renewal date."
				},
				"Benchmark our working capital cash conversion cycle vs industry peers": {
					summary: "Your cash cycle is 38 days (12 days faster than peer sector median of 50 days).",
					reasoning: [
						"Days Sales Outstanding (DSO): 34 days (High collection efficiency).",
						"Days Payable Outstanding (DPO): 42 days (Favorable credit terms).",
						"Working capital buffer: ₹1.4 Cr in liquid reserves."
					],
					impactDelta: "Top Decile Working Capital efficiency score",
					action: "Recommendation: Keep DSO below 40-day target to ensure uninterrupted runway."
				},
				"Detect untracked auto-renewing software subscriptions": {
					summary: "Found 6 auto-renewing micro-subscriptions (₹34,000/mo) billed on corporate credit cards.",
					reasoning: ["Include unused Figma seats, expired Zoom webinars, and duplicate AI translation APIs.", "Cards have auto-debit enabled without procurement PO approval."],
					impactDelta: "₹4.08 Lakhs annual recurring savings",
					action: "Recommendation: Issue virtual single-use cards with hard spend limits for SaaS tools."
				}
			},
			qaUSD: {
				"Identify our top 5 vendor contracts up for renewal in next 60 days": {
					summary: "5 contracts up for renewal totalling $29.5K. 2 have dynamic early-payment discounts.",
					reasoning: [
						"1. AWS Cloud Enterprise: $14.1K/mo (Eligible for 18% savings with 1-yr Savings Plan).",
						"2. Salesforce CRM: $5.8K/yr (12 unused seats identified).",
						"3. Office Lease: $6.2K/mo (Terms locked until Dec 2026)."
					],
					impactDelta: "Estimated negotiable savings: $5.8K upon renewal",
					action: "Recommendation: Send pre-negotiation terms 30 days ahead of renewal date."
				},
				"Benchmark our working capital cash conversion cycle vs industry peers": {
					summary: "Your cash cycle is 38 days (12 days faster than peer median of 50 days).",
					reasoning: [
						"Days Sales Outstanding (DSO): 34 days.",
						"Days Payable Outstanding (DPO): 42 days.",
						"Working capital buffer: $1.68M in liquid reserves."
					],
					impactDelta: "Top Decile Working Capital efficiency score",
					action: "Recommendation: Keep DSO below 40-day target."
				},
				"Detect untracked auto-renewing software subscriptions": {
					summary: "Found 6 auto-renewing micro-subscriptions ($410/mo) billed on corporate cards.",
					reasoning: ["Include unused design seats, expired webinars, and duplicate API keys.", "Cards have auto-debit enabled without procurement PO."],
					impactDelta: "$4.92K annual recurring savings",
					action: "Recommendation: Issue virtual single-use cards with hard spend limits."
				}
			}
		}
	}
};
var STEPS = [
	{
		step: "01",
		title: "Connect Data Sources",
		description: "Securely connect your bank statements (SBI, HDFC, ICICI, etc.), ERP feeds, and HR payroll rosters in minutes via encrypted protocols.",
		badge: "15 min setup"
	},
	{
		step: "02",
		title: "Continuous Automated Audit",
		description: "SpotLite continuously reconciles every transaction against verified employee lists, approved vendor rosters, and market intelligence.",
		badge: "Continuous AI audit"
	},
	{
		step: "03",
		title: "Act with Executive Clarity",
		description: "Leadership teams receive role-scoped dashboards, instant risk notifications, and exportable board packs with quantified next steps.",
		badge: "Real-time dashboards"
	}
];
var TESTIMONIALS = [
	{
		quote: "SpotLite gave our board real-time visibility into working capital and headcount burn. We closed our Series A diligence in record time with verified ledger health metrics.",
		name: "Rajan Mehta",
		title: "Chief Executive Officer",
		company: "Nexora Technologies",
		industry: "Fintech & SaaS",
		metric: "40% faster diligence",
		initials: "RM",
		badgeColor: "bg-blue-600",
		verifiedLabel: "Verified Customer · 280 Employees"
	},
	{
		quote: "We cut monthly reconciliation time by 65% and caught an unauthorized ₹3.2L recurring vendor surge in our first week. Our finance team now focuses on capital strategy.",
		name: "Sarah Okonkwo",
		title: "Chief Financial Officer",
		company: "Pinnacle Logistics",
		industry: "Supply Chain & Retail",
		metric: "65% time saved",
		initials: "SO",
		badgeColor: "bg-indigo-600",
		verifiedLabel: "Verified Customer · Multi-Entity"
	},
	{
		quote: "The transition from messy spreadsheets to SpotLite was effortless. Our leadership team finally has verified numbers we can stand behind in every board review.",
		name: "Priya Sharma",
		title: "Head of Operations & Finance",
		company: "Verity Healthcare",
		industry: "Healthtech",
		metric: "100% audit clarity",
		initials: "PS",
		badgeColor: "bg-emerald-600",
		verifiedLabel: "Verified Customer · 450 Headcount"
	}
];
var PLANS = [
	{
		plan: "Essentials",
		priceINR: {
			annual: "₹3,990",
			monthly: "₹4,990"
		},
		priceUSD: {
			annual: "$490",
			monthly: "$590"
		},
		description: "For growing businesses seeking automated bank reconciliation, payroll audit, and core executive visibility.",
		highlight: false,
		badge: null,
		features: [
			"Up to 250 active employees / contractors",
			"Multi-bank statement OCR ingestion",
			"Automated risk & anomaly detection",
			"Executive Customer 360 overview dashboard",
			"Standard CSV & PDF executive reports",
			"Email & in-app support"
		]
	},
	{
		plan: "Professional",
		priceINR: {
			annual: "₹9,990",
			monthly: "₹12,490"
		},
		priceUSD: {
			annual: "$1,250",
			monthly: "$1,490"
		},
		description: "For scaling enterprises requiring cross-departmental intelligence, peer benchmarking, and AI reasoning.",
		highlight: true,
		badge: "Recommended for Scale",
		features: [
			"Up to 2,000 employees / multiple entities",
			"Full access to all 5 intelligence modules",
			"SpotLite AI Instant Financial Copilot",
			"Role-partitioned permissions (CEO, CFO, HR)",
			"Industry peer benchmarking leaderboard",
			"ERP & accounting software sync (Tally, Zoho, QuickBooks)",
			"Dedicated Customer Success Manager"
		]
	},
	{
		plan: "Enterprise",
		priceINR: {
			annual: "Custom",
			monthly: "Custom"
		},
		priceUSD: {
			annual: "Custom",
			monthly: "Custom"
		},
		description: "For large organisations needing bespoke ERP integrations, custom ML risk rules, and multi-country compliance.",
		highlight: false,
		badge: "Custom Scale",
		features: [
			"Unlimited headcount & multi-currency support",
			"Custom ERP/GL & HRIS bidirectional sync",
			"Automated executive board-deck generator",
			"Custom machine learning anomaly rules",
			"Dedicated security engineer & custom SLA (99.99%)",
			"SOC 2 Type II compliance reports & NDA"
		]
	}
];
var SECURITY_BADGES = [
	{
		title: "SOC 2 Type II Certified",
		desc: "Rigorous third-party security & privacy audits"
	},
	{
		title: "256-Bit AES Encryption",
		desc: "End-to-end data encryption in transit and at rest"
	},
	{
		title: "Role-Based Access Control",
		desc: "Strict cryptographic data partitioning across roles"
	},
	{
		title: "ISO 27001 & GDPR Ready",
		desc: "Strict adherence to international data governance"
	}
];
function LandingHeader({ mobileOpen, setMobileOpen, currency, setCurrency, onOpenSandbox }) {
	const [activeSection, setActiveSection] = (0, import_react.useState)("platform");
	(0, import_react.useEffect)(() => {
		const sectionIds = [
			"platform",
			"modules",
			"roles",
			"how-it-works",
			"pricing",
			"security"
		];
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 120;
			for (let i = sectionIds.length - 1; i >= 0; i--) {
				const id = sectionIds[i];
				const element = document.getElementById(id);
				if (element) {
					if (scrollPosition >= element.offsetTop) {
						setActiveSection(id);
						break;
					}
				}
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 w-full border-b border-border/80 bg-white/95 backdrop-blur-md transition-all",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 lg:h-18 max-w-7xl 2xl:max-w-360 items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#platform",
					className: "flex items-center gap-2.5 group shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/25 transition-transform group-hover:scale-105",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
							size: 20,
							className: "fill-current text-white"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xl font-bold font-display tracking-tight text-foreground",
							children: ["Spot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Lite"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.625rem] font-bold uppercase tracking-widest text-slate-500 -mt-1 font-mono",
							children: "Intelligence"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-5 xl:gap-7 lg:flex",
					children: NAV_LINKS.map((link) => {
						const isActive = activeSection === link.href.replace("#", "");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: link.href,
							className: cn("text-sm font-medium tracking-normal transition-all relative py-1", isActive ? "text-primary font-bold" : "text-slate-600 hover:text-foreground"),
							children: [link.name, isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" })]
						}, link.name);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-3 sm:gap-3.5 sm:flex shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center rounded-lg border border-border-c bg-surface-alt/70 p-0.5 text-xs font-mono font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCurrency("INR"),
								className: cn("rounded-md px-2.5 py-1 text-xs transition-all cursor-pointer", currency === "INR" ? "bg-surface text-primary font-bold shadow-2xs" : "text-slate-500 hover:text-foreground"),
								title: "Switch to Indian Rupee (₹ INR)",
								children: "₹ INR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCurrency("USD"),
								className: cn("rounded-md px-2.5 py-1 text-xs transition-all cursor-pointer", currency === "USD" ? "bg-surface text-primary font-bold shadow-2xs" : "text-slate-500 hover:text-foreground"),
								title: "Switch to US Dollars ($ USD)",
								children: "$ USD"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-sm font-medium text-slate-600 px-2.5 py-1.5 transition-colors hover:text-foreground",
							children: "Sign In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/signup",
							className: "inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-semibold tracking-[-0.005em] text-white shadow-xs shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-md hover:shadow-primary/35 active:scale-[0.98]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Executive Demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex items-center rounded-lg border border-border-c bg-surface-alt/70 p-0.5 text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setCurrency(currency === "INR" ? "USD" : "INR"),
							className: "px-2 py-1 font-bold text-primary flex items-center gap-1 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 12 }), currency]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted cursor-pointer",
						onClick: () => setMobileOpen((v) => !v),
						"aria-label": "Toggle navigation",
						children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
					})]
				})
			]
		}), mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border bg-white px-6 py-5 shadow-xl lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: link.href,
					onClick: () => setMobileOpen(false),
					className: "text-sm font-semibold text-foreground hover:text-primary py-1",
					children: link.name
				}, link.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-col gap-2 pt-4 border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground font-semibold",
								children: "Display Currency"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center rounded-lg border border-border bg-surface-alt p-0.5 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCurrency("INR"),
									className: cn("px-2.5 py-1 rounded text-xs", currency === "INR" ? "bg-white font-bold text-primary shadow-xs" : "text-muted-foreground"),
									children: "₹ INR"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCurrency("USD"),
									className: cn("px-2.5 py-1 rounded text-xs", currency === "USD" ? "bg-white font-bold text-primary shadow-xs" : "text-muted-foreground"),
									children: "$ USD"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setMobileOpen(false),
							className: "rounded-lg border border-border py-2.5 text-center text-sm font-semibold text-foreground hover:bg-muted",
							children: "Sign In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							onClick: () => setMobileOpen(false),
							className: "rounded-lg bg-primary py-2.5 text-center text-sm font-bold text-white shadow-md shadow-primary/25",
							children: "Book Executive Demo"
						})
					]
				})]
			})
		})]
	});
}
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 16
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: .45 }
	}
};
var staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: .08,
			delayChildren: .04
		}
	}
};
var ROLE_THEMES = {
	ceo: {
		iconBox: "bg-primary/10 text-primary border-primary/20",
		pillBg: "bg-primary/10 border-primary/20 text-primary",
		accent: "text-primary",
		badgeText: "Enterprise Command"
	},
	cfo: {
		iconBox: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
		pillBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
		accent: "text-emerald-600 dark:text-emerald-400",
		badgeText: "Fiscal Oversight"
	},
	hr: {
		iconBox: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
		pillBg: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400",
		accent: "text-purple-600 dark:text-purple-400",
		badgeText: "Workforce Analytics"
	},
	coo: {
		iconBox: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
		pillBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-700 dark:text-cyan-400",
		accent: "text-cyan-700 dark:text-cyan-400",
		badgeText: "Operations Velocity"
	}
};
function LandingHero({ currency, onOpenSandbox }) {
	const [activeHeroRole, setActiveHeroRole] = (0, import_react.useState)("ceo");
	const data = HERO_DATA[currency];
	const roleItem = ROLES.find((r) => r.id === activeHeroRole) || ROLES[0];
	const sandboxData = SANDBOX_ROLES_DATA[activeHeroRole] || SANDBOX_ROLES_DATA.ceo;
	const activeTheme = ROLE_THEMES[activeHeroRole];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "platform",
		className: "relative overflow-hidden border-b border-border bg-linear-to-b from-blue-50/40 via-surface/60 to-background py-8 sm:py-10 lg:py-12 xl:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/3 left-1/12 -z-10 h-80 w-80 rounded-full bg-blue-500/6 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: staggerContainer,
						initial: "hidden",
						animate: "visible",
						className: "flex flex-col justify-center lg:col-span-6 space-y-4 sm:space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								variants: fadeUp,
								className: "mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary shadow-2xs backdrop-blur-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-2 w-2 rounded-full bg-primary animate-pulse" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Financial & Workforce Intelligence"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary/30",
										children: "|"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-text-secondary font-medium",
										children: "For MSME Founders & CFOs"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
								variants: fadeUp,
								className: "font-display text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] xl:text-[3rem] font-bold tracking-[-0.02em] text-foreground leading-[1.18] text-balance",
								children: [
									"Your business leaves signals,",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "SpotLite connects them."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								variants: fadeUp,
								className: "mt-4 text-sm sm:text-base leading-relaxed text-text-secondary max-w-[56ch]",
								children: "SpotLite brings together your company's financial, workforce, and market data turning scattered signals into clear insights, benchmarks, and alerts that help leadership understand what's happening and make better decisions, faster."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								variants: fadeUp,
								className: "mt-5 flex flex-col gap-3 sm:flex-row sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									whileTap: { scale: .98 },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/signup",
										className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold tracking-[-0.005em] text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/35 active:scale-[0.98] w-full sm:w-auto group border border-primary/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Executive Demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											size: 15,
											className: "transition-transform duration-200 group-hover:translate-x-0.5"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileTap: { scale: .98 },
									type: "button",
									onClick: () => onOpenSandbox?.(activeHeroRole),
									className: "inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-surface/90 px-5 py-3 text-sm font-semibold tracking-[-0.005em] text-foreground shadow-xs transition-all hover:bg-primary/5 hover:border-primary/35 hover:text-primary w-full sm:w-auto cursor-pointer group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										size: 15,
										className: "text-primary group-hover:rotate-12 transition-transform duration-300"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Launch 60s Live Sandbox" })]
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: fadeUp,
							className: "pt-2 flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs sm:text-sm font-medium text-text-secondary border-t border-border/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Role-scoped access (CEO, CFO, HR, COO)" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Multi-bank OCR auto-reconciliation" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SOC-2 & Bank-Grade Security" })]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 16,
							scale: .98
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						transition: {
							duration: .5,
							delay: .1,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						className: "flex flex-col justify-center lg:col-span-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/80 bg-surface/95 backdrop-blur-xs p-4 sm:p-5 shadow-xl shadow-primary/6 flex flex-col justify-between space-y-3 sm:space-y-3.5 ring-1 ring-primary/5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider text-text-tertiary",
											children: "Interactive Role:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1 bg-surface-alt p-0.5 rounded-lg border border-border/40",
											children: ROLES.map((r) => {
												const isSelected = r.id === activeHeroRole;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => setActiveHeroRole(r.id),
													className: "relative px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer select-none",
													children: [isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
														layoutId: "activeHeroRolePill",
														className: "absolute inset-0 rounded-md bg-surface shadow-2xs border border-border/40",
														transition: {
															type: "spring",
															stiffness: 420,
															damping: 32
														}
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("relative z-10 transition-colors", isSelected ? "text-primary font-bold" : "text-text-secondary hover:text-foreground"),
														children: r.role.split(" ")[0]
													})]
												}, r.id);
											})
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 3
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -3
										},
										transition: {
											duration: .18,
											ease: [
												.16,
												1,
												.3,
												1
											]
										},
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: cn("flex h-9 w-9 items-center justify-center rounded-xl font-bold shadow-xs border transition-colors", activeTheme.iconBox),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(roleItem.icon, { size: 18 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
													className: "text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]",
													children: [roleItem.role, " Workspace"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono", activeTheme.pillBg),
													children: activeTheme.badgeText
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-text-secondary font-normal",
												children: sandboxData.targetFocus
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right hidden sm:block",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold text-text-tertiary uppercase tracking-wider block",
												children: "Headcount"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs sm:text-sm font-bold text-foreground font-mono tabular-nums",
												children: data.headcount
											})]
										})]
									}, activeHeroRole)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											y: 4,
											filter: "blur(2px)"
										},
										animate: {
											opacity: 1,
											y: 0,
											filter: "blur(0px)"
										},
										exit: {
											opacity: 0,
											y: -4,
											filter: "blur(2px)"
										},
										transition: {
											duration: .22,
											ease: [
												.16,
												1,
												.3,
												1
											]
										},
										className: "grid grid-cols-3 gap-2 sm:gap-2.5",
										children: roleItem.previewKpis.map((kpi) => {
											const isAlert = kpi.status === "alert";
											const isGood = kpi.status === "good";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: cn("rounded-xl p-2.5 sm:p-3 border transition-colors", isAlert && "bg-amber-500/5 border-amber-500/25 hover:bg-amber-500/10", isGood && "bg-emerald-500/5 border-emerald-500/25 hover:bg-emerald-500/10", !isAlert && !isGood && "bg-surface-alt/70 border-border/60 hover:bg-surface-alt"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("text-[10px] sm:text-[11px] font-semibold truncate block", isAlert ? "text-amber-800 dark:text-amber-400" : isGood ? "text-emerald-800 dark:text-emerald-400" : "text-text-secondary"),
														children: kpi.label
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm sm:text-lg font-bold text-foreground font-mono tabular-nums mt-0.5 tracking-tight",
														children: currency === "INR" ? kpi.valueINR : kpi.valueUSD
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("text-[10px] sm:text-[11px] font-semibold mt-0.5 block truncate", isAlert ? "text-amber-700 dark:text-amber-400" : isGood ? "text-emerald-700 dark:text-emerald-400" : "text-text-secondary"),
														children: kpi.trend
													})
												]
											}, kpi.label);
										})
									}, activeHeroRole)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											y: 4
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -4
										},
										transition: {
											duration: .2,
											ease: [
												.16,
												1,
												.3,
												1
											]
										},
										className: "rounded-xl border border-amber-500/30 bg-amber-500/8 dark:bg-amber-500/12 p-3 sm:p-3.5 shadow-2xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0 mt-0.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 truncate",
														children: sandboxData.step2.anomalyTitle
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold uppercase rounded-md bg-amber-500/20 px-2 py-0.5 text-amber-900 dark:text-amber-200 shrink-0 font-mono border border-amber-500/25",
														children: sandboxData.step2.severity
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] sm:text-xs text-amber-900/90 dark:text-amber-300/90 mt-0.5 leading-relaxed line-clamp-2 font-medium",
													children: currency === "INR" ? sandboxData.step2.descriptionINR : sandboxData.step2.descriptionUSD
												})]
											})]
										})
									}, activeHeroRole)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-primary/20 bg-linear-to-r from-primary/8 via-primary/4 to-primary/8 p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-2xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-semibold text-primary truncate",
											children: ["Test OCR & Copilot for ", roleItem.role]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										whileHover: { scale: 1.02 },
										whileTap: { scale: .97 },
										type: "button",
										onClick: () => onOpenSandbox?.(activeHeroRole),
										className: "inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-xs shadow-primary/20 hover:bg-primary-hover transition-all cursor-pointer shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Launch 60s Tour" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 13 })]
									})]
								})
							]
						})
					})]
				})
			})
		]
	});
}
function LandingHowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how-it-works",
		className: "bg-[#f8fafc] py-10 sm:py-12 lg:py-14 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 15
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: { duration: .45 },
				className: "text-center max-w-3xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance",
					children: "From raw transaction records to executive clarity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[60ch] mx-auto text-balance",
					children: "Deploy SpotLite in three simple steps without disrupting existing accounting software, ERP systems, or banking workflows."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 sm:mt-8 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden lg:block absolute top-11 left-14 right-14 h-0.5 bg-linear-to-r from-primary/20 via-primary/40 to-primary/20 z-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: "hidden",
					whileInView: "visible",
					viewport: {
						once: true,
						margin: "-40px"
					},
					variants: {
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: .12 }
						}
					},
					className: "grid gap-5 lg:gap-6 lg:grid-cols-3 relative z-10",
					children: STEPS.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: {
							hidden: {
								opacity: 0,
								y: 16
							},
							visible: {
								opacity: 1,
								y: 0,
								transition: { duration: .45 }
							}
						},
						className: "relative rounded-2xl border border-border-c bg-white p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 transform-gpu flex flex-col justify-between h-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm sm:text-base font-bold text-white font-mono tabular-nums shadow-xs",
									children: step.step
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-primary border border-blue-100 font-mono",
									children: step.badge
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3.5 text-base sm:text-lg font-bold font-display tracking-[-0.015em] text-foreground",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs sm:text-sm leading-relaxed text-slate-600",
								children: step.description
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-2.5 border-t border-border-c flex items-center gap-2 text-xs font-semibold text-primary font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								size: 14,
								className: "text-emerald-600"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Step ",
								idx + 1,
								" of 3"
							] })]
						})]
					}, step.step))
				})]
			})]
		})
	});
}
function LandingModules({ currency, onOpenModuleSpecs, onOpenSandbox }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)("c360");
	const activeModule = MODULES.find((m) => m.id === activeTab) || MODULES[0];
	const copilotData = HERO_DATA[currency];
	const scrollRef = (0, import_react.useRef)(null);
	const [canScrollLeft, setCanScrollLeft] = (0, import_react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, import_react.useState)(false);
	const checkScroll = (0, import_react.useCallback)(() => {
		const el = scrollRef.current;
		if (!el) return;
		const hasMoreRight = el.scrollWidth - el.clientWidth - el.scrollLeft > 3;
		const hasMoreLeft = el.scrollLeft > 3;
		setCanScrollRight((prev) => prev !== hasMoreRight ? hasMoreRight : prev);
		setCanScrollLeft((prev) => prev !== hasMoreLeft ? hasMoreLeft : prev);
	}, []);
	(0, import_react.useEffect)(() => {
		if (activeTab && scrollRef.current) {
			const timeoutId = setTimeout(() => {
				if (!scrollRef.current) return;
				const activeElement = scrollRef.current.querySelector(`[data-module-id="${activeTab}"]`);
				if (activeElement) {
					const container = scrollRef.current;
					const leftOffset = activeElement.offsetLeft - container.offsetLeft;
					const rightOffset = leftOffset + activeElement.offsetWidth;
					const visibleLeft = container.scrollLeft;
					const visibleRight = container.scrollLeft + container.clientWidth;
					if (leftOffset < visibleLeft + 30) container.scrollTo({
						left: Math.max(0, leftOffset - 30),
						behavior: "smooth"
					});
					else if (rightOffset > visibleRight - 30) container.scrollTo({
						left: rightOffset - container.clientWidth + 30,
						behavior: "smooth"
					});
				}
			}, 50);
			return () => clearTimeout(timeoutId);
		}
	}, [activeTab]);
	const handleScrollLeft = () => {
		const el = scrollRef.current;
		if (!el) return;
		const step = Math.max(200, Math.floor(el.clientWidth * .6));
		el.scrollBy({
			left: -step,
			behavior: "smooth"
		});
	};
	const handleScrollRight = () => {
		const el = scrollRef.current;
		if (!el) return;
		const step = Math.max(200, Math.floor(el.clientWidth * .6));
		el.scrollBy({
			left: step,
			behavior: "smooth"
		});
	};
	(0, import_react.useEffect)(() => {
		const el = scrollRef.current;
		if (!el) return;
		checkScroll();
		el.addEventListener("scroll", checkScroll, { passive: true });
		window.addEventListener("resize", checkScroll);
		let resizeObserver = null;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => checkScroll());
			resizeObserver.observe(el);
		}
		return () => {
			el.removeEventListener("scroll", checkScroll);
			window.removeEventListener("resize", checkScroll);
			resizeObserver?.disconnect();
		};
	}, [checkScroll]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "modules",
		className: "bg-[#f8fafc] py-10 sm:py-12 lg:py-14 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 15
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: { duration: .45 },
				className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance",
					children: "Five modules. One shared financial data ledger."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 max-w-[64ch] text-sm sm:text-base text-slate-600 leading-relaxed text-balance",
					children: "Each module answers a distinct executive question while drawing from the exact same reconciled multi-bank transactions and HR rosters."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 md:mt-0 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border-c bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							size: 14,
							className: "text-primary"
						}), " Powered by SpotLite Core AI"]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 sm:mt-8 rounded-3xl border border-border-c bg-white p-4 sm:p-6 lg:p-7 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative border-b border-border-c",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: scrollRef,
							className: "flex items-center gap-2 overflow-x-auto pb-2.5 no-scrollbar scroll-smooth",
							children: [MODULES.map((mod) => {
								const Icon = mod.icon;
								const isActive = mod.id === activeTab;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									"data-module-id": mod.id,
									type: "button",
									onClick: () => setActiveTab(mod.id),
									className: "relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold tracking-[-0.005em] transition-colors whitespace-nowrap cursor-pointer select-none shrink-0",
									children: [
										isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											layoutId: "activeModuleTabPill",
											className: "absolute inset-0 rounded-xl bg-primary shadow-xs",
											transition: {
												type: "spring",
												stiffness: 420,
												damping: 32
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											size: 15,
											className: cn("relative z-10 transition-colors", isActive ? "text-white" : "text-primary")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("relative z-10 transition-colors", isActive ? "text-white font-bold" : "text-slate-600 hover:text-foreground"),
											children: mod.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("relative z-10 text-[10px] uppercase font-bold tracking-wider rounded px-1.5 py-0.5 font-mono transition-colors", isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"),
											children: mod.tag
										})
									]
								}, mod.id);
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"data-module-id": "copilot",
								type: "button",
								onClick: () => setActiveTab("copilot"),
								className: "relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold tracking-[-0.005em] transition-colors whitespace-nowrap cursor-pointer select-none shrink-0",
								children: [
									activeTab === "copilot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										layoutId: "activeModuleTabPill",
										className: "absolute inset-0 rounded-xl bg-linear-to-r from-blue-900 to-primary shadow-xs",
										transition: {
											type: "spring",
											stiffness: 420,
											damping: 32
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
										size: 15,
										className: cn("relative z-10 transition-colors", activeTab === "copilot" ? "text-white" : "text-primary")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("relative z-10 transition-colors", activeTab === "copilot" ? "text-white font-bold" : "text-primary"),
										children: "AI Financial Copilot"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("relative z-10 text-[10px] uppercase font-mono rounded px-1.5 py-0.5 font-bold transition-colors", activeTab === "copilot" ? "bg-emerald-400/30 text-emerald-200" : "bg-emerald-500/20 text-emerald-800"),
										children: "Agentic"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("pointer-events-none absolute left-0 top-0 bottom-2.5 w-16 sm:w-20", "flex items-center justify-start pl-0.5", "bg-linear-to-r from-white via-white/90 to-transparent", "transition-opacity duration-300 ease-out z-20", canScrollLeft ? "opacity-100" : "opacity-0"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleScrollLeft,
								"aria-label": "Scroll modules left",
								tabIndex: canScrollLeft ? 0 : -1,
								className: cn("flex items-center justify-center h-7 w-7 rounded-full bg-white border border-border-c shadow-sm text-slate-500 hover:text-foreground hover:border-slate-300 active:scale-90 transition-all", canScrollLeft ? "pointer-events-auto cursor-pointer" : "pointer-events-none", "animate-scroll-hint-left motion-reduce:animate-none"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "h-4 w-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("pointer-events-none absolute right-0 top-0 bottom-2.5 w-16 sm:w-20", "flex items-center justify-end pr-0.5", "bg-linear-to-l from-white via-white/90 to-transparent", "transition-opacity duration-300 ease-out z-20", canScrollRight ? "opacity-100" : "opacity-0"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleScrollRight,
								"aria-label": "Scroll modules right",
								tabIndex: canScrollRight ? 0 : -1,
								className: cn("flex items-center justify-center h-7 w-7 rounded-full bg-white border border-border-c shadow-sm text-slate-500 hover:text-foreground hover:border-slate-300 active:scale-90 transition-all", canScrollRight ? "pointer-events-auto cursor-pointer" : "pointer-events-none", "animate-scroll-hint motion-reduce:animate-none"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "h-4 w-4" })
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 sm:mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: activeTab === "copilot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -8
							},
							transition: {
								duration: .22,
								ease: [
									.16,
									1,
									.3,
									1
								]
							},
							className: "grid lg:grid-cols-12 gap-6 lg:gap-8 items-center rounded-2xl bg-linear-to-br from-blue-950 via-primary to-blue-900 p-5 sm:p-7 lg:p-8 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-7 space-y-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200 border border-white/15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 14 }), " Natural-Language Financial Reasoning"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl sm:text-2xl font-bold font-display text-white tracking-tight leading-tight text-balance",
										children: "Ask your financial ledger anything in plain English"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-[56ch]",
										children: "SpotLite AI is trained strictly on your uploaded bank statements, GST ledgers, and verified payroll rosters. Answers include exact audit traces back to source documents."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2 flex flex-wrap items-center gap-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
											whileHover: { scale: 1.01 },
											whileTap: { scale: .98 },
											type: "button",
											onClick: onOpenSandbox,
											className: "inline-flex items-center gap-2 rounded-xl bg-white px-4.5 py-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] text-primary shadow-md hover:bg-slate-100 transition-all cursor-pointer group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Try Sample Prompts in Sandbox" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
												size: 14,
												className: "transition-transform duration-200 group-hover:translate-x-0.5"
											})]
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-white/20 bg-black/30 p-4 sm:p-5 text-xs sm:text-sm text-blue-100 font-mono space-y-3 backdrop-blur-sm shadow-xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-blue-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: "SpotLite Copilot v2.4"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-emerald-400 font-semibold",
												children: "● Reconciled"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-emerald-300 leading-relaxed",
											children: copilotData.copilotQuery
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-lg bg-white/5 p-3 font-sans text-xs sm:text-[13px] text-white/95 border border-white/10 leading-relaxed font-normal",
											children: copilotData.copilotAnswer
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-blue-200/80 font-sans",
											children: "Audit Source: Bank Statements (HDFC #4910, SBI #0021) • Payroll Roster v3.4"
										})
									]
								})
							})]
						}, "copilot-tab") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -8
							},
							transition: {
								duration: .22,
								ease: [
									.16,
									1,
									.3,
									1
								]
							},
							className: "grid lg:grid-cols-12 gap-8 items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-7 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-primary font-mono uppercase tracking-wider",
											children: activeModule.tag
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg sm:text-xl lg:text-2xl font-bold font-display tracking-tight text-foreground mt-3 leading-snug",
											children: activeModule.headline
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-[56ch]",
											children: activeModule.description
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-500",
											children: "Core Module Deliverables"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-2.5",
											children: activeModule.bullets.map((bullet) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
													size: 16,
													className: "mt-0.5 shrink-0 text-primary"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bullet })]
											}, bullet))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => onOpenModuleSpecs?.(activeModule.id),
											className: "inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline cursor-pointer tracking-[-0.005em]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"View complete ",
												activeModule.title,
												" technical specifications"
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border-c bg-surface-alt/40 p-5 sm:p-6 space-y-4 shadow-2xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-border-c pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
													size: 16,
													className: "text-primary"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold uppercase tracking-wider text-slate-500",
													children: "Operational Output Simulation"
												})]
											}), activeModule.sampleMetric.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200 font-mono",
												children: activeModule.sampleMetric.badge
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border-c bg-surface p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-slate-500 font-semibold uppercase tracking-wider",
													children: activeModule.sampleMetric.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xl sm:text-2xl font-bold font-mono tabular-nums text-foreground mt-1 tracking-tight",
													children: activeModule.sampleMetric.value
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-slate-500 mt-1",
													children: activeModule.sampleMetric.subtext
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-500",
												children: "Reconciliation Frequency:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-primary font-mono",
												children: "Continuous (Automated)"
											})]
										})
									]
								})
							})]
						}, activeModule.id)
					})
				})]
			})]
		})
	});
}
function LandingPricing({ billingCycle, setBillingCycle, currency, setCurrency, onOpenSandbox }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "bg-[#f8fafc] py-10 sm:py-12 lg:py-14 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 15
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: { duration: .45 },
				className: "text-center max-w-3xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance",
						children: "Predictable plans scaled to your business"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[60ch] mx-auto text-balance",
						children: "No hidden per-seat fees or OCR transaction penalties. Deploy across your entire executive table."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center rounded-full border border-border-c bg-white p-1 shadow-2xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setBillingCycle("annual"),
								className: "relative rounded-full px-3.5 py-1 text-xs font-semibold tracking-[-0.005em] transition-colors cursor-pointer select-none",
								children: [billingCycle === "annual" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: "activeBillingCyclePill",
									className: "absolute inset-0 rounded-full bg-primary shadow-xs",
									transition: {
										type: "spring",
										stiffness: 450,
										damping: 35
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("relative z-10 transition-colors", billingCycle === "annual" ? "text-white font-bold" : "text-slate-600 hover:text-foreground"),
									children: "Annual Billing (Save 20%)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setBillingCycle("monthly"),
								className: "relative rounded-full px-3.5 py-1 text-xs font-semibold tracking-[-0.005em] transition-colors cursor-pointer select-none",
								children: [billingCycle === "monthly" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: "activeBillingCyclePill",
									className: "absolute inset-0 rounded-full bg-primary shadow-xs",
									transition: {
										type: "spring",
										stiffness: 450,
										damping: 35
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("relative z-10 transition-colors", billingCycle === "monthly" ? "text-white font-bold" : "text-slate-600 hover:text-foreground"),
									children: "Monthly"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center rounded-full border border-border-c bg-white p-1 shadow-2xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCurrency("INR"),
								className: "relative rounded-full px-3 py-1 text-xs font-bold font-mono transition-colors cursor-pointer select-none",
								children: [currency === "INR" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: "activeCurrencyPill",
									className: "absolute inset-0 rounded-full bg-primary shadow-xs",
									transition: {
										type: "spring",
										stiffness: 450,
										damping: 35
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("relative z-10 transition-colors", currency === "INR" ? "text-white" : "text-slate-600 hover:text-foreground"),
									children: "₹ INR"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCurrency("USD"),
								className: "relative rounded-full px-3 py-1 text-xs font-bold font-mono transition-colors cursor-pointer select-none",
								children: [currency === "USD" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: "activeCurrencyPill",
									className: "absolute inset-0 rounded-full bg-primary shadow-xs",
									transition: {
										type: "spring",
										stiffness: 450,
										damping: 35
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("relative z-10 transition-colors", currency === "USD" ? "text-white" : "text-slate-600 hover:text-foreground"),
									children: "$ USD"
								})]
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: "hidden",
				whileInView: "visible",
				viewport: {
					once: true,
					margin: "-40px"
				},
				variants: {
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: { staggerChildren: .1 }
					}
				},
				className: "mt-7 sm:mt-8 grid gap-5 lg:gap-6 lg:grid-cols-3 items-stretch",
				children: PLANS.map((plan) => {
					const rawPrice = currency === "INR" ? plan.priceINR[billingCycle] : plan.priceUSD[billingCycle];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						variants: {
							hidden: {
								opacity: 0,
								y: 16
							},
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: .45,
									ease: [
										.16,
										1,
										.3,
										1
									]
								}
							}
						},
						whileHover: {
							y: -4,
							transition: { duration: .2 }
						},
						className: cn("relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-200 h-full transform-gpu", plan.highlight ? "border-primary bg-linear-to-b from-[#0a1b38] to-[#071329] text-white shadow-2xl shadow-blue-900/30 lg:scale-[1.02]" : "border-border-c bg-white shadow-xs hover:border-slate-300 hover:shadow-md"),
						children: [
							plan.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[11px] font-bold text-white shadow-sm uppercase tracking-wider font-mono",
								children: plan.badge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg sm:text-xl font-bold font-display tracking-[-0.015em]",
										children: plan.plan
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("mt-1.5 text-xs sm:text-sm leading-relaxed min-h-9", plan.highlight ? "text-slate-300" : "text-slate-600"),
									children: plan.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3.5 flex items-baseline gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										initial: {
											opacity: 0,
											y: -4
										},
										animate: {
											opacity: 1,
											y: 0
										},
										transition: { duration: .18 },
										className: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-mono tabular-nums",
										children: rawPrice
									}, `${rawPrice}-${currency}-${billingCycle}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-xs font-normal", plan.highlight ? "text-slate-300" : "text-slate-500"),
										children: rawPrice === "Custom" ? "/ tailored to volume" : `/ month, billed ${billingCycle}`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("my-3.5 border-t", plan.highlight ? "border-white/10" : "border-border-c") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-[11px] font-bold uppercase tracking-wider", plan.highlight ? "text-blue-300 font-mono" : "text-slate-500 font-mono"),
									children: "Included Capabilities"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2.5 space-y-2",
									children: plan.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: cn("flex items-start gap-2 text-xs sm:text-sm font-medium leading-relaxed", plan.highlight ? "text-slate-200" : "text-slate-700"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											size: 14,
											className: cn("mt-0.5 shrink-0", plan.highlight ? "text-emerald-400" : "text-primary")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: feature })]
									}, feature))
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 pt-3",
								children: plan.plan === "Essentials" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: onOpenSandbox,
									className: "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border-c bg-surface-alt px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] text-foreground transition-all hover:bg-slate-200 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore Live Sandbox" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										size: 14,
										className: "text-primary"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/signup",
									className: cn("inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] shadow-md transition-all", plan.highlight ? "bg-primary text-white hover:bg-primary-hover shadow-primary/25" : "bg-primary text-white hover:bg-primary-hover shadow-primary/20"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Executive Demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
								})
							})
						]
					}, plan.plan);
				})
			})]
		})
	});
}
function LandingRoles({ currency, onOpenRolePreview }) {
	const [activeRoleIndex, setActiveRoleIndex] = (0, import_react.useState)(0);
	const selectedRole = ROLES[activeRoleIndex] || ROLES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "roles",
		className: "border-b border-border bg-white py-10 sm:py-12 lg:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 15
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: { duration: .45 },
				className: "text-center max-w-3xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance",
					children: "Tailored views for your entire executive table"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[62ch] mx-auto text-balance",
					children: "Data is strictly partitioned by role. Each leader sees the exact operational metrics, alerts, and levers they need without data security friction."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 sm:mt-8 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-5 space-y-2.5",
					children: ROLES.map((item, index) => {
						const Icon = item.icon;
						const isSelected = index === activeRoleIndex;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "button",
							tabIndex: 0,
							onClick: () => setActiveRoleIndex(index),
							onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && setActiveRoleIndex(index),
							className: "relative w-full text-left rounded-2xl border p-3.5 sm:p-4 transition-colors cursor-pointer select-none border-border-c bg-[#f8fafc] hover:bg-white overflow-hidden",
							children: [isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "activeRoleCardHighlight",
								className: "absolute inset-0 border border-primary bg-blue-50/60 shadow-md ring-1 ring-primary/30 rounded-2xl z-0",
								transition: {
									type: "spring",
									stiffness: 420,
									damping: 32
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors shadow-2xs", isSelected ? "bg-primary text-white" : "bg-white text-primary border border-border-c"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]",
											children: item.role
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-semibold text-slate-500",
											children: item.access
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full px-2 py-0.5 text-[10px] font-bold font-mono shrink-0 transition-colors", isSelected ? "bg-primary text-white" : "bg-slate-200/70 text-slate-700"),
										children: item.highlightBadge
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed",
									children: item.subtitle
								})]
							})]
						}, item.role);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .98,
								filter: "blur(2px)"
							},
							animate: {
								opacity: 1,
								scale: 1,
								filter: "blur(0px)"
							},
							exit: {
								opacity: 0,
								scale: .98,
								filter: "blur(2px)"
							},
							transition: {
								duration: .22,
								ease: [
									.16,
									1,
									.3,
									1
								]
							},
							className: "rounded-3xl border border-border-c bg-[#f8fafc] p-5 sm:p-6 lg:p-7 shadow-sm space-y-4 sm:space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border-c pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(selectedRole.icon, { size: 18 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]",
											children: [selectedRole.role, " Live Workspace Snapshot"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-500 font-normal",
											children: selectedRole.subtitle
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200 font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 13 }), " Partitioned View"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3",
									children: selectedRole.previewKpis.map((kpi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border-c bg-white p-3 shadow-2xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider",
												children: kpi.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-base sm:text-lg font-bold font-mono tabular-nums text-foreground mt-0.5 tracking-tight",
												children: currency === "INR" ? kpi.valueINR : kpi.valueUSD
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `text-[10px] sm:text-[11px] font-semibold mt-0.5 ${kpi.status === "alert" ? "text-amber-600" : kpi.status === "good" ? "text-emerald-600" : "text-slate-500"}`,
												children: kpi.trend
											})
										]
									}, kpi.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold uppercase tracking-wider text-slate-500",
										children: "Role-Gated Permissions & Capabilities"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: selectedRole.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5 rounded-xl border border-border-c bg-white p-2.5 text-xs font-medium text-slate-700 shadow-2xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
												size: 15,
												className: "text-primary shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
										}, b))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										whileHover: { scale: 1.01 },
										whileTap: { scale: .98 },
										type: "button",
										onClick: () => onOpenRolePreview?.(selectedRole.id),
										className: "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4.5 py-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] text-white shadow-xs hover:bg-primary-hover transition-all cursor-pointer group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
											size: 15,
											className: "group-hover:scale-110 transition-transform duration-200"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Launch Interactive ",
											selectedRole.role,
											" Preview"
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-slate-500 hidden sm:inline",
										children: "No credentials required"
									})]
								})
							]
						}, selectedRole.id)
					})
				})]
			})]
		})
	});
}
function LandingSecurity() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "security",
		className: "border-y border-border bg-white py-10 sm:py-12 lg:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .98
				},
				whileInView: {
					opacity: 1,
					scale: 1
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: { duration: .5 },
				className: "rounded-3xl border border-blue-100 bg-[#f0f6fe] p-6 sm:p-8 lg:p-9 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl sm:text-2xl lg:text-3xl font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance",
							children: "Enterprise governance without compromise"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600 max-w-[54ch]",
							children: "We treat your financial and payroll records with strict defense-in-depth isolation, multi-tenant database partitioning, and automated compliance auditing."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: "hidden",
						whileInView: "visible",
						viewport: { once: true },
						variants: {
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: { staggerChildren: .1 }
							}
						},
						className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4",
						children: SECURITY_BADGES.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: {
								hidden: {
									opacity: 0,
									y: 15
								},
								visible: {
									opacity: 1,
									y: 0,
									transition: { duration: .45 }
								}
							},
							className: "rounded-2xl border border-white bg-white/80 p-3.5 sm:p-4 shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									size: 16,
									className: "text-emerald-600 shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm font-bold font-display text-foreground tracking-[-0.01em]",
									children: badge.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-slate-600 leading-relaxed",
								children: badge.desc
							})]
						}, badge.title))
					})]
				})
			})
		})
	});
}
function LandingStats({ currency }) {
	const stats = STATS_DATA[currency];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-white py-6 sm:py-8 lg:py-9",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: "hidden",
				whileInView: "visible",
				viewport: {
					once: true,
					margin: "-40px"
				},
				variants: {
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: { staggerChildren: .08 }
					}
				},
				className: "grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4",
				children: stats.map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: {
						hidden: {
							opacity: 0,
							y: 12
						},
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: .4 }
						}
					},
					className: `flex flex-col ${i !== 0 ? "md:border-l md:border-border-c md:pl-4 sm:pl-6 lg:pl-8" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary font-mono tabular-nums",
							children: stat.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]",
							children: stat.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed",
							children: stat.detail
						})
					]
				}, stat.label))
			})
		})
	});
}
function LandingTestimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-white py-10 sm:py-12 lg:py-14 border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 15
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: { duration: .45 },
				className: "text-center max-w-3xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance",
					children: "Trusted by finance & operations leaders across sectors"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[58ch] mx-auto text-balance",
					children: "Proven ROI, multi-bank reconciliation certainty, and actionable capital visibility from day one."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: "hidden",
				whileInView: "visible",
				viewport: {
					once: true,
					margin: "-40px"
				},
				variants: {
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: { staggerChildren: .08 }
					}
				},
				className: "mt-6 sm:mt-8 grid gap-5 lg:gap-6 lg:grid-cols-3",
				children: TESTIMONIALS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
					variants: {
						hidden: {
							opacity: 0,
							y: 16
						},
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: .45 }
						}
					},
					className: "flex flex-col justify-between rounded-2xl border border-border-c bg-[#f8fafc] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 transform-gpu relative overflow-hidden h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 text-amber-500",
							children: [
								0,
								1,
								2,
								3,
								4
							].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								size: 14,
								fill: "currentColor"
							}, star))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 font-mono",
							children: item.metric
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs sm:text-sm leading-relaxed text-slate-800 font-normal",
							children: [
								"\"",
								item.quote,
								"\""
							]
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 border-t border-border-c pt-3 space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.badgeColor} text-xs font-bold text-white font-mono shadow-2xs`,
								children: item.initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm font-bold font-display text-foreground",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-slate-500",
								children: [
									item.title,
									",",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-slate-700",
										children: item.company
									})
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium bg-emerald-50/70 px-2 py-0.5 rounded border border-emerald-200/50 w-fit font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 11 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.verifiedLabel })]
						})]
					})]
				}, item.name))
			})]
		})
	});
}
function LandingInteractiveSandbox({ currency, initialRole = "ceo", onClose, isEmbedded = false }) {
	const [activePersonaId, setActivePersonaId] = (0, import_react.useState)([
		"ceo",
		"cfo",
		"hr",
		"coo"
	].includes(initialRole) ? initialRole : "ceo");
	(0, import_react.useEffect)(() => {
		if ([
			"ceo",
			"cfo",
			"hr",
			"coo"
		].includes(initialRole)) setActivePersonaId(initialRole);
	}, [initialRole]);
	const persona = SANDBOX_ROLES_DATA[activePersonaId] || SANDBOX_ROLES_DATA.ceo;
	const [step, setStep] = (0, import_react.useState)(1);
	const [isParsingOcr, setIsParsingOcr] = (0, import_react.useState)(false);
	const [ocrCompleted, setOcrCompleted] = (0, import_react.useState)(false);
	const [extractedCount, setExtractedCount] = (0, import_react.useState)(0);
	const [actionSimulated, setActionSimulated] = (0, import_react.useState)(false);
	const [customInput, setCustomInput] = (0, import_react.useState)("");
	const [selectedPrompt, setSelectedPrompt] = (0, import_react.useState)(persona.step3.presetPrompts[0]);
	const [isCopilotThinking, setIsCopilotThinking] = (0, import_react.useState)(false);
	const handlePersonaChange = (newPersonaId) => {
		setActivePersonaId(newPersonaId);
		setOcrCompleted(false);
		setIsParsingOcr(false);
		setActionSimulated(false);
		const newPersona = SANDBOX_ROLES_DATA[newPersonaId];
		setSelectedPrompt(newPersona.step3.presetPrompts[0]);
		setCustomInput("");
	};
	const handleStartOcr = () => {
		setIsParsingOcr(true);
		setExtractedCount(0);
		const target = persona.step1.transactionCount;
		const interval = setInterval(() => {
			setExtractedCount((prev) => {
				const next = prev + Math.floor(target / 8);
				if (next >= target) {
					clearInterval(interval);
					setIsParsingOcr(false);
					setOcrCompleted(true);
					return target;
				}
				return next;
			});
		}, 120);
	};
	const handleRunQuery = (queryText) => {
		setSelectedPrompt(queryText);
		setIsCopilotThinking(true);
		setTimeout(() => {
			setIsCopilotThinking(false);
		}, 550);
	};
	const handleCustomSubmit = (e) => {
		e.preventDefault();
		if (!customInput.trim()) return;
		handleRunQuery(customInput.trim());
		setCustomInput("");
	};
	const currentResponse = (currency === "INR" ? persona.step3.qaINR : persona.step3.qaUSD)[selectedPrompt] || {
		summary: `Based on your ${currency === "INR" ? "₹3.84 Cr" : "$4.62M"} operating ledger, SpotLite verified cash flow trends and flagged 1 high-priority optimization.`,
		reasoning: [
			`Data verified across ${persona.step1.sourcesList.join(", ")}.`,
			`Statutory compliance and vendor ledger integrity confirmed.`,
			`Working capital impact calculated with 99.8% reconciliation certainty.`
		],
		impactDelta: currency === "INR" ? "Optimized: +₹4.2L monthly liquidity" : "Optimized: +$5.1K monthly liquidity",
		action: "Recommendation: Review detailed transaction log and export audit schedule."
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-6", isEmbedded ? "p-4 sm:p-6" : ""),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border-c bg-surface p-4 sm:p-5 shadow-2xs space-y-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-2 w-2 rounded-full bg-primary animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-primary font-mono",
								children: "Interactive Multi-Role Sandbox"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg sm:text-xl font-bold font-display tracking-tight text-foreground mt-0.5",
							children: "Select your role to test SpotLite in 60 seconds"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-slate-500",
								children: "Currency:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-primary border border-blue-200",
								children: currency === "INR" ? "INR (₹) India" : "USD ($) Global"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1",
						children: ROLES.map((r) => {
							const Icon = r.icon;
							const isSelected = r.id === activePersonaId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handlePersonaChange(r.id),
								className: cn("flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer select-none", isSelected ? "border-primary bg-primary text-white shadow-xs" : "border-border-c bg-[#f8fafc] text-foreground hover:bg-white hover:border-slate-300"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors", isSelected ? "bg-white/20 text-white" : "bg-white text-primary border border-border-c"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold font-display truncate",
										children: r.role
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-[10px] font-mono truncate", isSelected ? "text-blue-100" : "text-slate-500"),
										children: r.highlightBadge
									})]
								})]
							}, r.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-border-c",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 truncate",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [persona.roleName, " Mode:"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: persona.targetFocus
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-[11px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200",
							children: "Real Sandbox Telemetry"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-border-c pb-3",
				children: [
					{
						num: 1,
						label: "1. Ingest & Reconcile"
					},
					{
						num: 2,
						label: "2. Anomaly Watchdog"
					},
					{
						num: 3,
						label: "3. AI Financial Copilot"
					},
					{
						num: 4,
						label: "4. Activation"
					}
				].map((s) => {
					const isCurrent = step === s.num;
					const isPast = step > s.num;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setStep(s.num),
						className: cn("flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl text-left transition-all cursor-pointer", isCurrent ? "bg-primary/10 border border-primary/30 text-primary font-bold shadow-2xs font-mono" : isPast ? "bg-emerald-50/80 text-emerald-800 font-semibold font-mono" : "text-slate-500 hover:bg-slate-100/60 font-mono"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold font-mono", isCurrent ? "bg-primary text-white" : isPast ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"),
								children: isPast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 12 }) : s.num
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs truncate hidden sm:inline",
								children: s.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs truncate sm:hidden",
								children: ["Step ", s.num]
							})
						]
					}, s.num);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-95",
				children: [
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border-c bg-white p-5 sm:p-6 shadow-2xs space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-primary font-mono",
										children: "Step 1 of 3: Data Ingestion Engine"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-base sm:text-lg font-bold font-display tracking-[-0.015em] text-foreground mt-0.5",
										children: "Connect & Reconcile Multi-Bank Statements"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-slate-500 hidden sm:inline",
										children: "Zero manual data entry"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-dashed border-primary/40 bg-blue-50/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { size: 24 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-bold font-display text-foreground",
											children: currency === "INR" ? persona.step1.fileTitleINR : persona.step1.fileTitleUSD
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-slate-500 mt-0.5",
											children: [
												persona.step1.subtitle,
												" • ",
												persona.step1.fileSize
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										onClick: handleStartOcr,
										disabled: isParsingOcr,
										className: "w-full sm:w-auto text-xs font-semibold tracking-[-0.005em] gap-2 cursor-pointer shrink-0",
										children: isParsingOcr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
											size: 14,
											className: "animate-spin"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Parsing OCR…" })] }) : ocrCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											size: 14,
											className: "text-emerald-400"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Re-Run OCR Parse" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Test Live Ingestion" })] })
									})]
								}),
								isParsingOcr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-blue-200 bg-blue-50/70 p-4 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs font-bold text-primary font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
												size: 13,
												className: "animate-spin"
											}), "Ingesting and extracting statement records…"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											extractedCount,
											" / ",
											persona.step1.transactionCount,
											" txns"
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 w-full overflow-hidden rounded-full bg-blue-200/60",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-primary transition-all duration-150",
											style: { width: `${Math.min(100, extractedCount / persona.step1.transactionCount * 100)}%` }
										})
									})]
								}),
								ocrCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										scale: .98
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									className: "rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-950",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
												size: 18,
												className: "text-emerald-600 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Automated Cross-Bank Reconciliation Succeeded" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white font-mono",
											children: [persona.step1.matchRate, " Match"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-white p-2.5 border border-emerald-100",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] font-semibold text-slate-500 uppercase tracking-wider",
													children: "Transactions Parsed"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-bold font-mono tabular-nums text-foreground mt-0.5",
													children: persona.step1.transactionCount.toLocaleString()
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-white p-2.5 border border-emerald-100",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] font-semibold text-slate-500 uppercase tracking-wider",
													children: "Reconciled Balance"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-bold font-mono tabular-nums text-foreground mt-0.5",
													children: currency === "INR" ? persona.step1.clearedBalanceINR : persona.step1.clearedBalanceUSD
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-white p-2.5 border border-emerald-100 col-span-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] font-semibold text-slate-500 uppercase tracking-wider",
													children: "Institutions Reconciled"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-semibold text-slate-700 mt-0.5 truncate font-mono",
													children: persona.step1.sourcesList.join(" • ")
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-border-c font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 font-sans",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
											size: 14,
											className: "text-emerald-600"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "256-bit TLS encrypted bank statement ingestion" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Step 1 of 3" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => setStep(2),
								className: "text-xs font-semibold tracking-[-0.005em] gap-1.5 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Proceed to Step 2: Anomaly Watchdog" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })]
							})
						})]
					}, "step1"),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border-c bg-white p-5 sm:p-6 shadow-2xs space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-amber-600 font-mono",
										children: "Step 2 of 3: Risk & Opportunity Radar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-base sm:text-lg font-bold font-display tracking-[-0.015em] text-foreground mt-0.5",
										children: "Proactive Blind Spot Detection"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-amber-100 text-amber-900 px-2.5 py-0.5 text-xs font-bold border border-amber-200 font-mono",
										children: [persona.step2.severity, " Severity Flag"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-amber-300 bg-amber-50/70 p-4 sm:p-5 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-2xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 20 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
													className: "text-sm sm:text-base font-bold font-display text-amber-950",
													children: persona.step2.anomalyTitle
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-amber-900 leading-relaxed font-normal",
													children: currency === "INR" ? persona.step2.descriptionINR : persona.step2.descriptionUSD
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-amber-200 bg-white/80 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-semibold text-slate-500 uppercase tracking-wider",
												children: "Identified Financial Leakage / Variance"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-base sm:text-lg font-bold font-mono tabular-nums text-amber-950 mt-0.5 tracking-tight",
												children: currency === "INR" ? persona.step2.quantifiedLeakageINR : persona.step2.quantifiedLeakageUSD
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "sm",
												variant: actionSimulated ? "outline" : "default",
												onClick: () => setActionSimulated(true),
												className: cn("text-xs font-semibold tracking-[-0.005em] gap-1.5 cursor-pointer", actionSimulated ? "border-emerald-300 text-emerald-800 bg-emerald-50 font-bold" : ""),
												children: actionSimulated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													size: 14,
													className: "text-emerald-600"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Action Executed" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: persona.step2.actionLabel })] })
											})]
										}),
										actionSimulated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												height: 0
											},
											animate: {
												opacity: 1,
												height: "auto"
											},
											className: "text-xs font-medium text-emerald-900 bg-emerald-100/70 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
												size: 14,
												className: "text-emerald-700 shrink-0"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: persona.step2.actionDoneText })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border-c bg-[#f8fafc] p-3.5 text-xs text-foreground space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-primary font-display",
										children: "Executive Action Recommendation:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-600 leading-relaxed font-normal",
										children: persona.step2.recommendation
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								type: "button",
								onClick: () => setStep(1),
								className: "text-xs font-semibold cursor-pointer",
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => setStep(3),
								className: "text-xs font-semibold tracking-[-0.005em] gap-1.5 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Proceed to Step 3: AI Copilot Q&A" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })]
							})]
						})]
					}, "step2"),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-blue-900 bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 p-5 sm:p-6 text-white shadow-md space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-white/10 pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, {
												size: 20,
												className: "text-emerald-400"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold uppercase tracking-wider text-blue-300 font-mono",
											children: "Step 3 of 3: Conversational Intelligence"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm sm:text-base font-bold font-display text-white mt-0.5 tracking-tight",
											children: "SpotLite AI Copilot Reasoning Sandbox"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] font-mono text-blue-300 bg-white/10 px-2.5 py-1 rounded-full",
										children: ["Persona: ", persona.roleName]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-blue-200 font-semibold",
										children: "Try role-curated executive queries:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5",
										children: persona.step3.presetPrompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleRunQuery(prompt),
											className: cn("rounded-lg px-3 py-1.5 text-xs text-left transition-all cursor-pointer font-medium", selectedPrompt === prompt ? "bg-primary text-white font-bold shadow-xs ring-1 ring-white/30" : "bg-white/10 text-blue-100 hover:bg-white/20 border border-white/10"),
											children: prompt
										}, prompt))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleCustomSubmit,
									className: "flex gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: customInput,
										onChange: (e) => setCustomInput(e.target.value),
										placeholder: `Ask custom question as ${persona.roleName} (e.g. "What is our burn multiple?")...`,
										className: "flex-1 rounded-xl border border-white/20 bg-black/40 px-3.5 py-2 text-xs text-white placeholder:text-blue-300/60 focus:border-primary focus:outline-none font-sans"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										size: "sm",
										disabled: !customInput.trim(),
										className: "text-xs font-semibold tracking-[-0.005em] gap-1 cursor-pointer shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Ask AI"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-white/15 bg-black/60 p-4 space-y-3 font-sans",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs font-mono text-emerald-400 border-b border-white/10 pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: `> "${selectedPrompt}"` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-blue-300 font-sans",
											children: "99.8% Confidence"
										})]
									}), isCopilotThinking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5 text-blue-200 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
											size: 15,
											className: "animate-spin text-primary"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-normal",
											children: "SpotLite AI synthesizing multi-bank statements & industry benchmarks…"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-white font-medium leading-relaxed",
												children: currentResponse.summary
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-1.5 pl-2 border-l border-primary/60",
												children: currentResponse.reasoning.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-slate-300 leading-relaxed text-[11px] font-normal",
													children: ["• ", r]
												}, i))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 text-[11px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono font-bold text-emerald-400 tabular-nums",
													children: currentResponse.impactDelta
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-blue-200 italic font-normal",
													children: currentResponse.action
												})]
											})
										]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								type: "button",
								onClick: () => setStep(2),
								className: "text-xs font-semibold cursor-pointer",
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => setStep(4),
								className: "text-xs font-semibold tracking-[-0.005em] gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Complete Tour & Launch Workspace" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 })]
							})]
						})]
					}, "step3"),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						className: "space-y-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-emerald-200 bg-linear-to-b from-emerald-50/90 to-white p-6 sm:p-8 text-center shadow-xs space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 32 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-md mx-auto space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xl sm:text-2xl font-bold font-display tracking-tight text-foreground",
										children: "You've experienced the SpotLite Advantage!"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs sm:text-sm text-slate-600 leading-relaxed",
										children: [
											"In under 60 seconds, you tested multi-bank statement OCR reconciliation, proactive anomaly watchdogs, and conversational financial reasoning as ",
											persona.roleName,
											"."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-2 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-primary/30 bg-white p-4 shadow-xs space-y-3 flex flex-col justify-between h-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold font-mono text-primary uppercase tracking-wider",
												children: "Fastest Path to Value"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
												className: "text-sm font-bold font-display text-foreground mt-2",
												children: "Launch Free Workspace with Sample Data"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-600 mt-1 leading-relaxed",
												children: "Start exploring your pre-populated executive dashboard immediately. Zero credit card needed."
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											className: "w-full text-xs font-semibold tracking-[-0.005em] gap-1.5 mt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/signup",
												onClick: onClose,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start Instant Setup" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border-c bg-white p-4 shadow-xs space-y-3 flex flex-col justify-between h-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider",
												children: "Tailored Consultation"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
												className: "text-sm font-bold font-display text-foreground mt-2",
												children: "Book 1-on-1 Executive Walkthrough"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-600 mt-1 leading-relaxed",
												children: "Walk through custom bank integrations and enterprise governance with our product specialist."
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											variant: "outline",
											className: "w-full text-xs font-semibold tracking-[-0.005em] gap-1.5 mt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/signup",
												onClick: onClose,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Schedule 15m Demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setStep(1);
											setOcrCompleted(false);
											setActionSimulated(false);
										},
										className: "inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-foreground cursor-pointer transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Re-test with another executive persona" })]
									})
								})
							]
						})
					}, "step4")
				]
			})
		]
	});
}
function LandingPreviewModal({ preview, onClose, currency, onSelectRoleInSandbox }) {
	if (!preview) return null;
	const selectedRole = preview.type === "role" ? ROLES.find((r) => r.id === preview.roleId) : null;
	const selectedModule = preview.type === "module" ? MODULES.find((m) => m.id === preview.moduleId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(preview),
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
			className: cn("fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] sm:w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-5 sm:p-7 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[90vh] overflow-y-auto", preview.type === "sandbox" ? "max-w-4xl" : "max-w-3xl"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Close"
					})]
				}),
				preview.type === "role" && selectedRole && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(selectedRole.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold font-mono text-primary",
									children: selectedRole.highlightBadge
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-slate-500",
									children: selectedRole.access
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								className: "text-xl font-bold font-display text-foreground mt-1",
								children: [selectedRole.role, " Workspace Preview"]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed",
							children: selectedRole.description
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border-c bg-surface-alt/40 p-4 sm:p-5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase tracking-wider text-slate-500",
									children: "Role-Scoped Executive Metrics"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }), "Live Partition"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
								children: selectedRole.previewKpis.map((kpi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border-c bg-surface p-3.5 shadow-2xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-semibold text-slate-500 uppercase tracking-wider",
											children: kpi.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg sm:text-xl font-bold font-mono tabular-nums text-foreground mt-1 tracking-tight",
											children: currency === "INR" ? kpi.valueINR : kpi.valueUSD
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-[11px] font-semibold mt-1 ${kpi.status === "alert" ? "text-amber-600" : kpi.status === "good" ? "text-emerald-600" : "text-slate-500"}`,
											children: kpi.trend
										})
									]
								}, kpi.label))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-slate-500",
								children: "Key Role Capabilities"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-1",
								children: selectedRole.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 rounded-lg border border-border-c bg-surface p-2.5 text-xs sm:text-sm font-medium text-slate-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
								}, b))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0 pt-2 border-t border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: onClose,
								className: "text-xs font-semibold",
								children: "Close Preview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "text-xs font-semibold tracking-[-0.005em] gap-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/signup",
									onClick: onClose,
									children: ["Book Executive Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							})]
						})
					]
				}),
				preview.type === "module" && selectedModule && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(selectedModule.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold font-mono text-primary uppercase tracking-wider",
								children: selectedModule.tag
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								className: "text-xl font-bold font-display text-foreground mt-1",
								children: [selectedModule.title, " Specifications"]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed",
							children: selectedModule.description
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border-c bg-surface-alt/40 p-4 sm:p-5 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-slate-500",
								children: "Operational Output & Sample Telemetry"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl border border-border-c bg-surface p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-500 font-semibold uppercase tracking-wider",
										children: selectedModule.sampleMetric.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl font-bold font-mono tabular-nums text-foreground mt-0.5 tracking-tight",
										children: selectedModule.sampleMetric.value
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-500 mt-0.5",
										children: selectedModule.sampleMetric.subtext
									})
								] }), selectedModule.sampleMetric.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-bold font-mono text-primary border border-primary/20",
									children: selectedModule.sampleMetric.badge
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-slate-500",
								children: "Data Pipeline & Features"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: selectedModule.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5 rounded-lg border border-border-c bg-surface p-3 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
								}, b))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0 pt-2 border-t border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: onClose,
								className: "text-xs font-semibold",
								children: "Close Specs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "text-xs font-semibold tracking-[-0.005em] gap-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/signup",
									onClick: onClose,
									children: ["Book Executive Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							})]
						})
					]
				}),
				preview.type === "architecture" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold font-mono text-emerald-800 uppercase tracking-wider",
								children: "Enterprise Grade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-xl font-bold font-display text-foreground mt-1",
								children: "SpotLite Architecture & Security Model"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed",
							children: "How SpotLite securely ingests, tokenizes, and processes high-volume corporate financial data."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border-c bg-surface-alt/30 p-4 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground",
											children: "1. Bank Statement OCR & Tokenization"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono bg-blue-100 text-primary px-2 py-0.5 rounded font-bold",
											children: "AES-256 GCM"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-600 leading-relaxed",
										children: "Direct integration with SBI, HDFC, ICICI, and custom CSV/PDF uploads with automated PII redaction."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border-c bg-surface-alt/30 p-4 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground",
											children: "2. Continuous Ledger Reconciliation"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold",
											children: "Zero-Knowledge"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-600 leading-relaxed",
										children: "Matches transaction flows against approved vendor lists and HR employee tax IDs."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border-c bg-surface-alt/30 p-4 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground",
											children: "3. Role-Scoped Intelligence Delivery"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold",
											children: "RBAC Partitioning"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-600 leading-relaxed",
										children: "Each executive receives only authorized telemetry (CEO, CFO, HR Director, Ops Lead)."
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-emerald-950",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: "SOC2 Type II & ISO 27001 Certified Infrastructure"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-emerald-800 mt-0.5 leading-relaxed",
									children: "Data residency in Indian data centers (MeitY empaneled) or US-East regions with zero model retraining on client financial records."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0 pt-2 border-t border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: onClose,
								className: "text-xs font-semibold",
								children: "Close"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "text-xs font-semibold tracking-[-0.005em] gap-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/signup",
									onClick: onClose,
									children: ["Book Executive Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							})]
						})
					]
				}),
				preview.type === "sandbox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingInteractiveSandbox, {
					currency,
					initialRole: preview.roleId || "ceo",
					onClose
				})
			]
		})] })
	});
}
function LandingPage() {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [billingCycle, setBillingCycle] = (0, import_react.useState)("annual");
	const [currency, setCurrency] = (0, import_react.useState)(() => {
		try {
			const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			if (tz.includes("Calcutta") || tz.includes("Kolkata") || navigator.language === "en-IN") return "INR";
		} catch {}
		return "INR";
	});
	const [showActivationBar, setShowActivationBar] = (0, import_react.useState)(() => {
		try {
			return localStorage.getItem("spotlite_landing_tour_seen") !== "true";
		} catch {
			return true;
		}
	});
	const dismissActivationBar = () => {
		setShowActivationBar(false);
		try {
			localStorage.setItem("spotlite_landing_tour_seen", "true");
		} catch {}
	};
	const [previewModal, setPreviewModal] = (0, import_react.useState)(null);
	const handleOpenRolePreview = (roleId) => {
		setPreviewModal({
			type: "sandbox",
			roleId
		});
	};
	const handleOpenModuleSpecs = (moduleId) => {
		setPreviewModal({
			type: "module",
			moduleId
		});
	};
	const handleOpenArchitecture = () => {
		setPreviewModal({ type: "architecture" });
	};
	const handleOpenSandbox = (roleId) => {
		setPreviewModal({
			type: "sandbox",
			roleId: typeof roleId === "string" ? roleId : void 0
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary",
		children: [
			showActivationBar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-primary text-white px-4 py-2 text-xs font-medium flex items-center justify-between gap-3 relative z-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex items-center gap-2 flex-wrap justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tracking-tight",
							children: "Interactive Demo: Test SpotLite's multi-bank OCR audit & AI Copilot in 60 seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => handleOpenSandbox(),
							className: "inline-flex items-center gap-1 rounded-md bg-white text-primary px-2.5 py-0.5 text-xs font-semibold tracking-[-0.005em] hover:bg-blue-50 transition-colors cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Launch 60s Tour" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: dismissActivationBar,
					className: "text-white/80 hover:text-white cursor-pointer p-0.5 rounded",
					title: "Dismiss announcement",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHeader, {
				mobileOpen,
				setMobileOpen,
				currency,
				setCurrency,
				onOpenSandbox: handleOpenSandbox
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHero, {
					currency,
					onOpenSandbox: handleOpenSandbox
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingStats, { currency }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingModules, {
					currency,
					onOpenModuleSpecs: handleOpenModuleSpecs,
					onOpenSandbox: handleOpenSandbox
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingRoles, {
					currency,
					onOpenRolePreview: handleOpenRolePreview
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHowItWorks, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingTestimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPricing, {
					billingCycle,
					setBillingCycle,
					currency,
					setCurrency,
					onOpenSandbox: handleOpenSandbox
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingSecurity, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingCTA, {
					onOpenArchitecture: handleOpenArchitecture,
					onOpenSandbox: handleOpenSandbox
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPreviewModal, {
				preview: previewModal,
				onClose: () => setPreviewModal(null),
				currency
			})
		]
	});
}
var SplitComponent = LandingPage;
//#endregion
export { SplitComponent as component };
