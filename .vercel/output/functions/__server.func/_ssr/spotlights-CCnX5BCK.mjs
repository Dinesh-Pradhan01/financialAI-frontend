import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Ct as Lock, Dn as ChartColumn, En as ChartNoAxesColumn, Fn as Brain, Gn as ArrowRight, Mn as Building2, On as Calendar, Un as ArrowUpRight, Yt as FileCheckCorner, _ as TriangleAlert, _n as CircleAlert, cn as Clock, et as PiggyBank, gn as CircleCheck, nn as DollarSign, o as Users, t as Zap, v as TrendingUp, z as ShieldAlert } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { n as AgentNarration } from "./agent-narration-DQiNkCuI.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { n as formatPct, t as formatINR } from "./format-B9luOE0k.mjs";
import { t as SpotliteClientAnalytics } from "./spotlite-client-analytics-BRL6DtmF.mjs";
import { t as SpotliteVendorAnalytics } from "./spotlite-vendor-analytics-Dv5B5Apd.mjs";
import { n as useSpotlite, t as SpotliteSpendingInsights } from "./SpotliteSpendingInsights-DrKaOBMq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spotlights-CCnX5BCK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SpotliteTier1Grid({ metrics, tier2Metrics: tier2, llmInsights: llm }) {
	const shouldReduceMotion = useReducedMotion();
	const { room_above_break_even: be, cost_structure_flexibility: rigidity, vendor_overbilling_detector: overbill, idle_cash_forfeited_income: idle } = metrics;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-in fade-in duration-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold text-foreground",
					children: "Executive Front Page"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary mt-0.5",
					children: "Prioritized risk alerts and actionable spotlights."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), " Deterministic Ledger Engine + LLM AI"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/30 bg-brand/5 p-6 shadow-xs space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-bold text-foreground",
							children: "Executive Brief"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20",
						children: "Capability 9 — AI Synthesis"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-text-secondary whitespace-pre-line rounded-xl bg-surface/80 p-4 border border-border/50",
					children: llm.capability9_executive_brief
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteSpendingInsights, {
				tier1: metrics,
				llm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 pt-4 border-t border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold text-foreground",
						children: "Spotlights"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: "4 spotlights computed from 3 banks · 1,420 transactions."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							whileHover: shouldReduceMotion ? void 0 : {
								y: -3,
								transition: {
									duration: .2,
									ease: [
										.16,
										1,
										.3,
										1
									]
								}
							},
							className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/5 via-surface to-surface dark:from-emerald-950/20 dark:via-surface dark:to-surface p-6 shadow-xs transition hover:shadow-md hover:border-emerald-500/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider text-emerald-800/80 dark:text-emerald-300/80",
										children: "Profitability & Solvency Health"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-bold text-foreground mt-0.5",
										children: "Room Above Break-Even Revenue"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 14 }),
											" Margin: ",
											formatPct(be.operating_margin_pct, 1)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-5 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-text-secondary",
											children: "Monthly Rupee Cushion"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num tabular-nums text-2xl font-extrabold text-emerald-600 dark:text-emerald-400",
											children: ["+", formatINR(be.monthly_rupee_cushion)]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-medium text-text-tertiary font-num tabular-nums",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Break-Even: ", formatINR(be.break_even_monthly_revenue, { compact: true })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Current Revenue: ", formatINR(be.current_monthly_revenue, { compact: true })] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											role: "progressbar",
											"aria-label": "Break-even revenue margin",
											"aria-valuenow": Math.round(be.break_even_monthly_revenue / be.current_monthly_revenue * 100),
											"aria-valuemin": 0,
											"aria-valuemax": 100,
											className: "relative h-3 w-full overflow-hidden rounded-full bg-surface-alt border border-border/40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												className: "h-full bg-emerald-500 rounded-full",
												initial: shouldReduceMotion ? false : { width: 0 },
												animate: { width: `${Math.min(100, be.break_even_monthly_revenue / be.current_monthly_revenue * 100)}%` },
												transition: shouldReduceMotion ? void 0 : {
													duration: .75,
													ease: [
														.16,
														1,
														.3,
														1
													]
												}
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-xl bg-surface-alt/70 p-3 text-xs leading-relaxed text-text-secondary border border-border/50",
									children: be.executive_insight
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-3 border-t border-border/40 flex justify-between items-center text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-emerald-800/80 dark:text-emerald-300/80 font-medium",
									children: "Deterministic Solvency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/spotlights/$id",
									params: { id: "room-above-break-even" },
									className: "inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Break-Even Proof" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							whileHover: shouldReduceMotion ? void 0 : {
								y: -3,
								transition: {
									duration: .2,
									ease: [
										.16,
										1,
										.3,
										1
									]
								}
							},
							className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/30 bg-linear-to-br from-amber-500/5 via-surface to-surface dark:from-amber-950/20 dark:via-surface dark:to-surface p-6 shadow-xs transition hover:shadow-md hover:border-amber-500/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider text-amber-800/80 dark:text-amber-300/80",
										children: "Margin Protection & Cost Inelasticity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-bold text-foreground mt-0.5",
										children: "Payroll & Cost Structure Rigidity"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-lg bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 14 }), " Zero Elasticity"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-5 flex items-center justify-between rounded-xl bg-surface-alt/70 p-4 border border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-text-secondary block font-medium",
											children: "Fixed Monthly Headcount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num tabular-nums text-2xl font-extrabold text-foreground",
											children: [
												"-",
												formatINR(rigidity.payroll_monthly_amount),
												" / mo"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-semibold text-text-tertiary block mt-0.5 font-num tabular-nums",
											children: [formatPct(rigidity.payroll_as_pct_revenue, 1), " of Monthly Revenue"]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-500/30 font-num tabular-nums",
											children: [rigidity.consecutive_flat_months, " Months Flat"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-amber-800/80 dark:text-amber-300/80 block mt-1 font-medium",
											children: "High Cost Rigidity"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-xl bg-surface-alt/70 p-3 text-xs leading-relaxed text-text-secondary border border-border/50",
									children: rigidity.executive_insight
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-3 border-t border-border/40 flex justify-between items-center text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-amber-800/80 dark:text-amber-300/80 font-medium",
									children: "Operating Risk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/spotlights/$id",
									params: { id: "payroll-rigidity" },
									className: "inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 hover:underline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Model Elasticity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							whileHover: shouldReduceMotion ? void 0 : {
								y: -3,
								transition: {
									duration: .2,
									ease: [
										.16,
										1,
										.3,
										1
									]
								}
							},
							className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-rose-500/40 bg-linear-to-br from-rose-500/10 via-surface to-surface dark:from-rose-950/25 dark:via-surface dark:to-surface p-6 shadow-xs transition hover:shadow-md hover:border-rose-500/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400",
										children: "Cash Recovery"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-bold text-foreground mt-0.5",
										children: "Vendor Contract Rate Overbilling"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 14 }), " Immediate Action"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-4 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold text-text-primary",
												children: overbill.vendor_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-num tabular-nums text-xl font-extrabold text-rose-600 dark:text-rose-400",
												children: [
													"+",
													formatINR(overbill.monthly_overbill_amount),
													" / mo"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-surface p-2.5 border border-border/60",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-text-tertiary block text-[10px]",
													children: "Contracted Rate"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-num tabular-nums font-semibold text-text-primary",
													children: formatINR(overbill.contracted_monthly_rate)
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg bg-surface p-2.5 border border-rose-500/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-rose-700 dark:text-rose-300 block text-[10px] font-medium",
													children: "Actual Billed"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-num tabular-nums font-semibold text-rose-600 dark:text-rose-400",
													children: formatINR(overbill.avg_actual_monthly_billed)
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl bg-rose-500/15 p-3 text-center border border-rose-500/30",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-rose-800 dark:text-rose-200 font-semibold block",
												children: "Annual Recoverable Cash"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-num tabular-nums text-xl font-extrabold text-rose-600 dark:text-rose-400",
												children: [
													"+",
													formatINR(overbill.annualized_recoverable_cash),
													" / year"
												]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-xl bg-surface/80 p-3 text-xs leading-relaxed text-text-secondary border border-border/50",
									children: overbill.executive_insight
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-3 border-t border-rose-500/20 flex justify-between items-center text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/spotlights/$id",
									params: { id: "vendor-overbilling" },
									className: "text-text-secondary hover:text-foreground font-medium underline",
									children: "Audit Contract Disparity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									whileTap: shouldReduceMotion ? void 0 : { scale: .96 },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/spotlights/$id/apply",
										params: { id: "vendor-overbilling" },
										className: "inline-flex items-center gap-1 font-bold text-white bg-rose-600 hover:bg-rose-700 px-3.5 py-1.5 rounded-xl shadow-xs transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Draft Dispute Claim" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })]
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							whileHover: shouldReduceMotion ? void 0 : {
								y: -3,
								transition: {
									duration: .2,
									ease: [
										.16,
										1,
										.3,
										1
									]
								}
							},
							className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-teal-500/30 bg-linear-to-br from-teal-500/5 via-surface to-surface dark:from-teal-950/20 dark:via-surface dark:to-surface p-6 shadow-xs transition hover:shadow-md hover:border-teal-500/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider text-teal-800/80 dark:text-teal-300/80",
										children: "Yield Optimization"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-bold text-foreground mt-0.5",
										children: "Idle Cash, Lost Income"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-lg bg-teal-500/10 px-2.5 py-1 text-xs font-bold text-teal-600 dark:text-teal-400 border border-teal-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { size: 14 }), " Actionable Surplus"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-4 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl bg-surface-alt/70 p-3 border border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-text-tertiary block font-medium",
												children: "3-Month Safety Reserve"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-num tabular-nums text-sm font-bold text-text-primary",
												children: formatINR(idle.three_month_safety_reserve, { compact: true })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl bg-teal-500/10 p-3 border border-teal-500/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-teal-700 dark:text-teal-300 block font-medium",
												children: "Idle Surplus Cash"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-num tabular-nums text-sm font-extrabold text-teal-600 dark:text-teal-400",
												children: ["+", formatINR(idle.idle_cash_surplus, { compact: true })]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-xl bg-teal-500/10 p-3 border border-teal-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-teal-900/80 dark:text-teal-200/80 font-medium",
											children: "Annual Lost Yield at 6.5%"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num tabular-nums text-lg font-extrabold text-teal-600 dark:text-teal-400",
											children: [
												"~",
												formatINR(idle.annualized_unearned_interest),
												" / yr"
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-xl bg-surface-alt/70 p-3 text-xs leading-relaxed text-text-secondary border border-border/50",
									children: idle.executive_insight
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-3 border-t border-border/40 flex justify-between items-center text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-teal-800/80 dark:text-teal-300/80 font-medium",
									children: "T+1 Overnight Yield"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									whileTap: shouldReduceMotion ? void 0 : { scale: .96 },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/spotlights/$id/apply",
										params: { id: "idle-cash-optimization" },
										className: "inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Configure Auto-Sweep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })]
									})
								})]
							})]
						})
					]
				})]
			})
		]
	});
}
function SpotliteTier2Grid({ metrics }) {
	const { client_payment_drift: drift, workforce_ratios: workforce, weekly_spend_cyclicality: cyclicality, efficiency_ratios: efficiency } = metrics;
	const dayOfWeekList = Object.entries(cyclicality.day_of_week_breakdown);
	const maxDaySpend = Math.max(...dayOfWeekList.map(([, v]) => v));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-bold text-foreground",
			children: "Operational Analytics"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-text-secondary mt-0.5",
			children: "Operational ratios and payment drift patterns."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-base font-bold text-foreground",
									children: "Payment Drift (DSO)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-text-tertiary",
									children: "Industry avg: 30–45 days."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full",
								children: "Zero Drift (Healthy)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								role: "table",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border/60 text-text-tertiary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "pb-2 font-medium",
											children: "Client Account"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "pb-2 font-medium text-center",
											children: "Median Pay Day"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "pb-2 font-medium text-center",
											children: "Std Dev"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											className: "pb-2 font-medium text-right",
											children: "Status"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/40",
									children: Object.entries(drift.clients).map(([clientName, info]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-surface-alt/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 font-semibold text-foreground",
												children: clientName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-2.5 text-center font-num tabular-nums text-text-secondary",
												children: ["Day ", info.median_payment_day]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-2.5 text-center font-num tabular-nums text-text-tertiary",
												children: [
													"±",
													info.std_dev_days,
													" days"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-right font-medium text-emerald-600 dark:text-emerald-400",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }),
														" ",
														info.status
													]
												})
											})
										]
									}, clientName))
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary rounded-xl bg-surface-alt p-3 border border-border/50",
							children: drift.summary
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-base font-bold text-foreground",
									children: "Spend by Weekday"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full",
								children: ["Peak: ", cyclicality.peak_discretionary_day]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 my-3",
							children: dayOfWeekList.map(([day, amount]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-text-secondary",
										children: day
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-num tabular-nums font-semibold text-foreground",
										children: formatINR(amount)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-full rounded-full bg-surface-alt overflow-hidden",
									role: "progressbar",
									"aria-valuenow": amount,
									"aria-valuemin": 0,
									"aria-valuemax": maxDaySpend,
									"aria-label": `${day} spend ${formatINR(amount)}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full transition-all duration-300 ${day === "Saturday" ? "bg-amber-500" : "bg-brand/60"}`,
										style: { width: `${amount / maxDaySpend * 100}%` }
									})
								})]
							}, day))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary rounded-xl bg-surface-alt p-3 border border-border/50",
							children: cyclicality.summary
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full md:col-span-2 rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-base font-bold text-foreground",
									children: "Financial Efficiency"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-text-secondary bg-surface-alt px-2.5 py-1 rounded-full border border-border/50",
									children: [workforce.headcount, " Employees"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full",
									children: "Healthy Unit Economics"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 md:grid-cols-4 gap-3 my-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-surface-alt p-4 border border-border/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-text-tertiary font-medium block",
											children: "Revenue Per Employee"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num tabular-nums text-xl font-extrabold text-indigo-600 dark:text-indigo-400 block mt-1",
											children: [formatINR(workforce.revenue_per_employee_monthly), " / mo"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-text-tertiary block mt-1",
											children: "Healthy baseline revenue."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-surface-alt p-4 border border-border/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-text-tertiary font-medium block",
											children: "Payroll / Fixed Opex Ratio"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num tabular-nums text-xl font-extrabold text-foreground block mt-1",
											children: [workforce.payroll_to_fixed_opex_ratio.toFixed(2), "x"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-text-tertiary block mt-1",
											children: "Healthy if below 70%."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-surface-alt p-4 border border-border/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-text-tertiary font-medium block",
											children: "Revenue Per ₹ Opex"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-num tabular-nums text-xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1",
											children: [efficiency.revenue_per_rupee_opex.toFixed(2), "x"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-text-tertiary block mt-1",
											children: "Above ₹1.40 = healthy unit economics."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-surface-alt p-4 border border-border/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-text-tertiary font-medium block",
											children: "Cost-to-Income Ratio"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-num tabular-nums text-xl font-extrabold text-foreground block mt-1",
											children: formatPct(efficiency.cost_to_income_ratio_pct, 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-text-tertiary block mt-1",
											children: "Lower is better. Industry: 55–65%."
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-3 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-secondary rounded-xl bg-surface-alt p-3 border border-border/50",
								children: workforce.summary
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-secondary rounded-xl bg-surface-alt p-3 border border-border/50",
								children: efficiency.summary
							})]
						})
					]
				})
			]
		})]
	});
}
function formatMateriality(mat) {
	return mat.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}
function SpotliteLLMIntelligence({ insights, onSelectTab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-bold text-foreground",
					children: "AI Intelligence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary mt-0.5",
					children: "AI analysis on top of verified ledger data. 3 active findings across Capabilities 3, 5, and 6."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand border border-brand/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " AI on verified numbers"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/25 bg-brand/5 p-6 shadow-sm space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-bold text-foreground",
							children: "Executive Brief"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20 font-mono",
						children: "Capability 9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface/80 p-4 border border-border/50 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs leading-relaxed text-text-secondary whitespace-pre-line",
						children: [
							"\"",
							insights.capability9_executive_brief ? insights.capability9_executive_brief.slice(0, 280).trim() + "…" : "",
							"\""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: onSelectTab ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelectTab("tier1"),
						className: "text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/50 rounded-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View full brief on Executive Front Page" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 13 })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/spotlights",
						className: "text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/50 rounded-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View full brief on Executive Front Page" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 13 })]
					}) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border-2 border-rose-500/40 bg-rose-500/5 p-6 shadow-sm space-y-4 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 16 }), " Top Fraud Signal"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-rose-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase",
									children: "Capability 6 · BEC Risk"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-base font-bold text-foreground",
								children: "Payment-Redirection Bank Identity Drift"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-text-secondary mt-0.5",
								children: "Bank account IFSC changed since last verified payment."
							})] }),
							insights.capability6_payment_redirection_drift_detector.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-surface p-4 border border-border/60 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-baseline text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: item.counterparty
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] text-rose-600 dark:text-rose-400 font-bold",
											children: "Bank IFSC Changed"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2 text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-md bg-surface-alt p-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-text-tertiary block text-[9px]",
												children: "Historical Baseline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-medium text-text-secondary",
												children: item.historical_bank_ifsc
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-md bg-rose-500/10 p-2 border border-rose-500/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-rose-700 dark:text-rose-300 block text-[9px]",
												children: "Recent Settlement"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-bold text-rose-600 dark:text-rose-400",
												children: item.recent_remitting_ifsc
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-text-secondary leading-relaxed",
										children: item.detection_narrative
									})
								]
							}, idx))
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/spotlights/$id/apply",
						params: { id: "bec-fraud-risk" },
						className: "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Execute Bank Verification & Remittance Hold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 shadow-sm space-y-4 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), " Legal Exposure"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase",
									children: "Capability 5 · Expired Terms"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-base font-bold text-foreground",
								children: "Contract Lapse & Legal Exposure Scan"
							}),
							insights.capability5_contract_lapse_scanner.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-surface p-3.5 border border-border/60 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-baseline text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-foreground",
										children: [
											item.counterparty,
											" (",
											item.type,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-bold text-amber-600 dark:text-amber-400",
										children: ["Expired ", item.end_date]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-text-secondary leading-relaxed",
									children: item.legal_exposure_finding
								})]
							}, idx))
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/spotlights/$id/apply",
						params: { id: "contract-lapse" },
						className: "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Generate SLA Renewal Term Sheet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-bold text-foreground",
							children: "Anomaly Triage"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-text-tertiary",
							children: "(Statistical Outliers) · Distinguishes genuine anomalies from expected spend fluctuations using business context."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20 font-mono",
						children: "Capability 3"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: insights.capability3_anomaly_materiality_triage.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface-alt p-4 border border-border/50 flex flex-col md:flex-row justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: item.vendor
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-text-tertiary",
										children: [
											"(",
											item.category,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-[10px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded",
										children: [
											"Z = ",
											item.raw_z_score.toFixed(2),
											"σ (high outlier)"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-secondary leading-relaxed",
								children: item.human_triage_explanation
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex sm:flex-col items-center sm:items-end gap-2 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-bold px-2.5 py-1 rounded-full ${item.materiality.includes("CRITICAL") ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"}`,
								children: formatMateriality(item.materiality)
							}), item.materiality.includes("CRITICAL") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/spotlights/$id/apply",
								params: { id: "vendor-overbilling" },
								className: "inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500/50 rounded-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Remediate Overbill" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 12 })]
							})]
						})]
					}, idx))
				})]
			})
		]
	});
}
var TABS = [
	{
		id: "tier1",
		label: "Front Page",
		icon: Zap,
		colorClass: "text-amber-700 dark:text-amber-300",
		borderClass: "border-amber-500/30"
	},
	{
		id: "tier2",
		label: "Tier 2 Ops",
		icon: ChartColumn,
		colorClass: "text-sky-700 dark:text-sky-300",
		borderClass: "border-sky-500/30"
	},
	{
		id: "vendors",
		label: "Vendors",
		icon: Building2,
		colorClass: "text-violet-700 dark:text-violet-300",
		borderClass: "border-violet-500/30"
	},
	{
		id: "clients",
		label: "Clients",
		icon: Users,
		colorClass: "text-emerald-700 dark:text-emerald-300",
		borderClass: "border-emerald-500/30"
	},
	{
		id: "llm",
		label: "AI Audit",
		icon: Brain,
		colorClass: "text-brand",
		borderClass: "border-brand/30"
	}
];
function Spotlights() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("tier1");
	const { tier1, tier2, llm, loading, error, askCfo } = useSpotlite();
	const shouldReduceMotion = useReducedMotion();
	const kpiItemVariants = {
		hidden: {
			opacity: 0,
			y: 8
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: .25,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		}
	};
	if (loading || !tier1 || !tier2 || !llm) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-6 md:px-10 max-w-7xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-9 rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-32" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24 rounded-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24 rounded-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24 rounded-lg" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-2xl" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full rounded-2xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2 mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-2xl" })]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-6 md:px-10 max-w-7xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
							size: 20,
							className: "fill-current"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold tracking-tight text-foreground",
						children: "SpotLights"
					}) })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					"aria-label": "Spotlights intelligence sections",
					className: "flex flex-wrap items-center gap-1 rounded-xl bg-surface-alt p-1 border border-border/60 self-start md:self-auto relative",
					children: TABS.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							role: "tab",
							id: `tab-${tab.id}`,
							"aria-controls": `panel-${tab.id}`,
							"aria-selected": isActive,
							tabIndex: isActive ? 0 : -1,
							type: "button",
							onClick: () => setActiveTab(tab.id),
							className: cn("relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer z-10 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-1", isActive ? tab.colorClass : "text-text-secondary hover:text-text-primary"),
							children: [
								isActive && (shouldReduceMotion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 rounded-lg bg-surface shadow-xs border -z-10", tab.borderClass) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: "spotlight-active-tab-indicator",
									className: cn("absolute inset-0 rounded-lg bg-surface shadow-xs border -z-10", tab.borderClass),
									transition: {
										type: "spring",
										stiffness: 500,
										damping: 38
									}
								})),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 14,
									className: isActive && tab.id === "tier1" ? "fill-current" : ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })
							]
						}, tab.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: shouldReduceMotion ? void 0 : {
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: { staggerChildren: .07 }
					}
				},
				initial: shouldReduceMotion ? void 0 : "hidden",
				animate: shouldReduceMotion ? void 0 : "visible",
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: shouldReduceMotion ? void 0 : kpiItemVariants,
						whileHover: shouldReduceMotion ? void 0 : {
							y: -2,
							transition: { duration: .2 }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 h-full border border-emerald-500/30 bg-linear-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface shadow-xs space-y-1.5 transition hover:shadow-md hover:border-emerald-500/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-emerald-800/90 dark:text-emerald-300/90 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recoverable Cash Outliers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 16 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-num tabular-nums text-2xl font-bold text-emerald-600 dark:text-emerald-400",
									children: ["+", formatINR(tier1.vendor_overbilling_detector.annualized_recoverable_cash)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-emerald-800/80 dark:text-emerald-300/80 font-medium",
									children: [tier1.vendor_overbilling_detector.vendor_name, " rate overbilling"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: shouldReduceMotion ? void 0 : kpiItemVariants,
						whileHover: shouldReduceMotion ? void 0 : {
							y: -2,
							transition: { duration: .2 }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 h-full border border-cyan-500/30 bg-linear-to-br from-cyan-500/10 via-surface to-surface dark:from-cyan-950/25 dark:via-surface dark:to-surface shadow-xs space-y-1.5 transition hover:shadow-md hover:border-cyan-500/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-cyan-800/90 dark:text-cyan-300/90 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Break-Even Cushion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 16 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-num tabular-nums text-2xl font-bold text-cyan-700 dark:text-cyan-300",
									children: [
										"+",
										formatINR(tier1.room_above_break_even.monthly_rupee_cushion),
										" / mo"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-cyan-800/80 dark:text-cyan-200/80 font-medium",
									children: [Number(tier1.room_above_break_even.operating_margin_pct).toFixed(1), "% operating margin above break-even"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: shouldReduceMotion ? void 0 : kpiItemVariants,
						whileHover: shouldReduceMotion ? void 0 : {
							y: -2,
							transition: { duration: .2 }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 h-full border border-teal-500/30 bg-linear-to-br from-teal-500/10 via-surface to-surface dark:from-teal-950/25 dark:via-surface dark:to-surface shadow-xs space-y-1.5 transition hover:shadow-md hover:border-teal-500/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-teal-800/90 dark:text-teal-300/90 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Deployable Liquid Surplus" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { size: 16 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-num tabular-nums text-2xl font-bold text-teal-700 dark:text-teal-300",
									children: ["+", formatINR(tier1.idle_cash_forfeited_income.idle_cash_surplus, { compact: true })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-teal-800/80 dark:text-teal-200/80 font-medium",
									children: [
										"Surplus cash above",
										" ",
										formatINR(tier1.idle_cash_forfeited_income.three_month_safety_reserve, { compact: true }),
										" ",
										"safety buffer"
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: shouldReduceMotion ? void 0 : kpiItemVariants,
						whileHover: shouldReduceMotion ? void 0 : {
							y: -2,
							transition: { duration: .2 }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-4 h-full border-2 border-rose-500/40 bg-linear-to-br from-rose-500/15 via-surface to-surface dark:from-rose-950/30 dark:via-surface dark:to-surface shadow-xs space-y-1.5 transition hover:shadow-md hover:border-rose-500/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-rose-800/90 dark:text-rose-200/90 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security & Fraud Exposures" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										animate: shouldReduceMotion ? void 0 : { scale: [
											1,
											1.1,
											1
										] },
										transition: shouldReduceMotion ? void 0 : {
											repeat: Infinity,
											duration: 2.4,
											ease: "easeInOut"
										},
										className: "flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 16 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-num tabular-nums text-2xl font-black text-rose-600 dark:text-rose-400",
									children: [llm.capability6_payment_redirection_drift_detector.length, " Active Alert"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-rose-800/90 dark:text-rose-200/90 font-medium",
									children: "BEC Bank IFSC Drift detected on pending transfers"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AgentNarration, {
				agent: "reasoning",
				children: [
					activeTab === "tier1" && "Live rules engine. 4 deterministic spotlights computed from 1,420 ledger transactions.",
					activeTab === "tier2" && "Supporting context metrics. Answer follow-up questions without changing the headline story.",
					activeTab === "vendors" && "Vendor spend segmentation, concentration risk, and overbilling exposure mapped to 5 active vendors.",
					activeTab === "clients" && "7-client revenue matrix, counterparty concentration risk, and DSO payment drift intelligence.",
					activeTab === "llm" && "AI synthesis layer over verified numbers. Capabilities 3, 5, 6, and 9."
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-amber-500/10 p-3 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						size: 14,
						className: "shrink-0 text-amber-600 dark:text-amber-400"
					}), error]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold",
					children: "Authoritative Nimbus Baseline Loaded"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tabpanel",
				id: `panel-${activeTab}`,
				"aria-labelledby": `tab-${activeTab}`,
				className: "focus-visible:outline-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: shouldReduceMotion ? false : {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: shouldReduceMotion ? void 0 : {
							opacity: 0,
							y: -6
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
						children: [
							activeTab === "tier1" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteTier1Grid, {
								metrics: tier1,
								tier2Metrics: tier2,
								llmInsights: llm
							}),
							activeTab === "tier2" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteTier2Grid, { metrics: tier2 }),
							activeTab === "vendors" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteVendorAnalytics, {}),
							activeTab === "clients" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteClientAnalytics, {}),
							activeTab === "llm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLLMIntelligence, {
								insights: llm,
								onAskCfo: askCfo,
								onSelectTab: () => setActiveTab("tier1")
							})
						]
					}, activeTab)
				})
			})
		]
	});
}
//#endregion
export { Spotlights as component };
