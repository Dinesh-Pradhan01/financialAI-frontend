import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { At as Landmark, Jn as Activity, R as ShieldCheck, gn as CircleCheck, o as Users, t as Zap } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthHeroPanel-tH7ddIqi.js
var import_jsx_runtime = require_jsx_runtime();
function AuthHeroPanel({ role, companyName }) {
	const normalizedRole = role?.toLowerCase();
	let badgeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-blue-400" });
	let badgeText = "Executive Financial & Workforce Layer";
	let heading = "Unified clarity for leadership teams.";
	let description = "Real-time anomaly radar, cross-bank reconciliation, and verified workforce risk intelligence for CEOs, CFOs, and HR leaders.";
	let features = [
		"SOC 2 Type II Certified & DPDP Act 2023 Compliant",
		"Bank-grade 256-bit AES encryption at rest & in transit",
		"Autonomous anomaly radar & predictive cash runways"
	];
	let cardTitle = "Live Executive Radar";
	let cardStats = "342 Verified Headcount · ₹0 Ghost Payroll Leakage · 18.4 mo Runway";
	if (normalizedRole === "cfo") {
		badgeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-3.5 w-3.5 text-emerald-400" });
		badgeText = "Chief Financial Officer Workspace";
		heading = companyName ? `Lead financial strategy at ${companyName}.` : "Financial precision & executive liquidity.";
		description = "Autonomous multi-bank reconciliation, AI cash flow forecasting, and spend anomaly radar tailored for Chief Financial Officers.";
		features = [
			"Automated cross-bank reconciliation & predictive runway modeling",
			"Vendor expense anomaly radar & unauthorized spend drift alerts",
			"Statutory tax, GST & audit-ready compliance vault"
		];
		cardTitle = "CFO Liquidity & Capital Radar";
		cardStats = "₹1.84 Cr Monthly Burn · 18.4 mo Runway · Zero Spend Drift";
	} else if (normalizedRole === "hr") {
		badgeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 text-purple-400" });
		badgeText = "Human Resources & People Ops Workspace";
		heading = companyName ? `Lead workforce operations at ${companyName}.` : "Verified workforce & payroll clarity.";
		description = "Eliminate payroll leakage, automate statutory workforce compliance, and benchmark talent velocity across departments.";
		features = [
			"Ghost employee payroll detection & direct bank account verification",
			"Automated EPF, ESIC, and labor statutory compliance tracking",
			"Department headcount velocity & talent benchmark radar"
		];
		cardTitle = "HR Workforce Intelligence";
		cardStats = "342 Verified Headcount · 100% Statutory Compliance · ₹0 Leakage";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative hidden flex-col justify-between bg-[#061229] py-10 lg:py-14 pr-10 lg:pr-14 pl-12 lg:pl-20 text-white md:flex select-none overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-y-0 left-0 w-12 sm:w-16 lg:w-20 h-full z-20 pointer-events-none hidden md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 100 1000",
					preserveAspectRatio: "none",
					className: "h-full w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 0 0 \n               L 40 0 \n               C 15 350, 65 650, 30 1000 \n               L 0 1000 Z",
						fill: "#ffffff"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "relative z-10 flex items-center gap-2.5 group w-fit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-transform group-hover:scale-105",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
						size: 20,
						className: "fill-current text-white"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xl font-extrabold tracking-tight text-white",
						children: ["Spot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-blue-400",
							children: "Lite"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[0.5625rem] font-bold uppercase tracking-widest text-blue-300/80 -mt-1",
						children: "Intelligence"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 max-w-md my-auto py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 backdrop-blur-xs mb-5",
						children: [badgeIcon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: badgeText })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white",
						children: heading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3.5 text-sm sm:text-base text-slate-300 leading-relaxed",
						children: description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3 text-xs sm:text-sm text-slate-200",
						children: features.map((feat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: feat })]
						}, idx))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-lg shadow-black/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
									size: 16,
									className: "text-emerald-400"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-slate-200",
									children: cardTitle
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.625rem] font-bold text-emerald-400 border border-emerald-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }), "Active"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-300 mt-2 font-medium",
							children: cardStats
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enterprise-grade security · 99.99% SLA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 SpotLite Inc." })]
			})
		]
	});
}
//#endregion
export { AuthHeroPanel as t };
