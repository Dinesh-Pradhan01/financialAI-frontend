import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { At as Landmark, E as Store, J as Repeat, X as Receipt, u as UserRound, v as TrendingUp, wn as Check } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { i as evidenceBase, n as agents } from "./agentic-C_EsON0v.mjs";
import { i as rohan } from "./rohan-BsoI7WdA.mjs";
import { t as formatINR } from "./format-B9luOE0k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/processing-COlm0asZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SATELLITES = [
	{
		key: "accounts",
		label: "Accounts",
		icon: Landmark
	},
	{
		key: "income",
		label: "Income",
		icon: TrendingUp
	},
	{
		key: "expenses",
		label: "Expenses",
		icon: Receipt
	},
	{
		key: "merchants",
		label: "Merchants",
		icon: Store
	},
	{
		key: "recurring",
		label: "Recurring",
		icon: Repeat
	}
];
var STEPS = [
	{ text: `Parsing statements across ${evidenceBase.banks} banks` },
	{ text: `Reading ${evidenceBase.transactions.toLocaleString("en-IN")} transactions` },
	{ text: "Merging duplicate UPI entries" },
	{ text: "Building your Unified Financial Graph" },
	{ text: "Scoring wellness and personas" },
	{ text: "Detecting life events and opportunities" }
];
var C = 160;
var R = 112;
var HUB_R = 30;
var RING_C = 2 * Math.PI * HUB_R;
function Processing() {
	const nav = useNavigate();
	const reduce = useReducedMotion();
	const [pct, setPct] = (0, import_react.useState)(6);
	const points = (0, import_react.useMemo)(() => SATELLITES.map((s, i) => {
		const angle = (-90 + i * (360 / SATELLITES.length)) * Math.PI / 180;
		return {
			...s,
			x: C + R * Math.cos(angle),
			y: C + R * Math.sin(angle)
		};
	}), []);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => {
			setPct((p) => Math.min(100, p + (p < 80 ? 2 : 1)));
		}, 70);
		return () => clearInterval(t);
	}, []);
	(0, import_react.useEffect)(() => {
		if (pct >= 100) {
			const t = setTimeout(() => nav({ to: "/home" }), 1100);
			return () => clearTimeout(t);
		}
	}, [pct, nav]);
	const ready = pct >= 100;
	const activeAgent = Math.min(agents.length - 1, Math.floor(pct / 100 * agents.length));
	const stepIdx = ready ? STEPS.length : Math.min(STEPS.length - 1, Math.floor(pct / 100 * STEPS.length));
	const reachedNodes = pct / 100 * SATELLITES.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand px-6 text-on-brand",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "agent-float absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "agent-float absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-secondary/20 blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex w-full max-w-md flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-pill bg-white/12 px-3 py-1 text-[11px] font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-white" }), "Agents at work"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-2xl font-bold leading-tight text-balance",
							children: "Spotlite is reading your financial life"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm opacity-80",
							children: [
								evidenceBase.transactions.toLocaleString("en-IN"),
								" transactions · ",
								evidenceBase.banks,
								" ",
								"banks · ",
								evidenceBase.months,
								" months"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative my-8 aspect-square w-[min(20rem,80vw)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "absolute inset-0 h-full w-full",
							viewBox: "0 0 320 320",
							children: [
								points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.line, {
									x1: C,
									y1: C,
									x2: p.x,
									y2: p.y,
									stroke: "rgba(255,255,255,0.28)",
									strokeWidth: 1.5,
									initial: {
										pathLength: 0,
										opacity: 0
									},
									animate: {
										pathLength: 1,
										opacity: 1
									},
									transition: {
										delay: .2 + i * .12,
										duration: .6,
										ease: "easeOut"
									}
								}, `edge-${p.key}`)),
								!reduce && points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
									r: 2.6,
									fill: "#fff",
									initial: {
										cx: C,
										cy: C,
										opacity: 0
									},
									animate: {
										cx: [C, p.x],
										cy: [C, p.y],
										opacity: [
											0,
											1,
											1,
											0
										]
									},
									transition: {
										duration: 1.5,
										delay: .8 + i * .18,
										repeat: Infinity,
										repeatDelay: .4,
										ease: "easeInOut"
									}
								}, `pulse-${p.key}`)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: C,
									cy: C,
									r: HUB_R,
									fill: "none",
									stroke: "rgba(255,255,255,0.2)",
									strokeWidth: 5
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: C,
									cy: C,
									r: HUB_R,
									fill: "none",
									stroke: "#fff",
									strokeWidth: 5,
									strokeLinecap: "round",
									strokeDasharray: RING_C,
									strokeDashoffset: RING_C * (1 - pct / 100),
									transform: `rotate(-90 ${C} ${C})`,
									style: { transition: "stroke-dashoffset 0.18s linear" }
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								className: "flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur",
								animate: reduce ? {} : { scale: [
									1,
									1.06,
									1
								] },
								transition: {
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										initial: {
											scale: 0,
											opacity: 0
										},
										animate: {
											scale: 1,
											opacity: 1
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											className: "h-6 w-6",
											strokeWidth: 2.6
										})
									}, "check") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										exit: { opacity: 0 },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
											className: "h-6 w-6",
											strokeWidth: 2.2
										})
									}, "user")
								})
							})
						}),
						points.map((p, i) => {
							const active = reachedNodes > i || ready;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "absolute flex w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1",
								style: {
									left: `${p.x / 320 * 100}%`,
									top: `${p.y / 320 * 100}%`
								},
								initial: {
									opacity: 0,
									scale: .6
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								transition: {
									delay: .3 + i * .12,
									duration: .4
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ${active ? "bg-white text-brand shadow-[0_0_16px_rgba(255,255,255,0.55)]" : "bg-white/15 text-white/70"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, {
										className: "h-4 w-4",
										strokeWidth: 2.2
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-medium transition-opacity ${active ? "opacity-100" : "opacity-50"}`,
									children: p.label
								})]
							}, p.key);
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-full items-center justify-between",
					children: agents.map((a, i) => {
						const Icon = a.icon;
						const done = i < activeAgent || ready;
						const current = i === activeAgent && !ready;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ${done ? "bg-white text-brand" : current ? "bg-white/25 text-white ring-2 ring-white/60" : "bg-white/10 text-white/50"} ${current && !reduce ? "pulse-dot" : ""}`,
								children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "h-4 w-4",
									strokeWidth: 2.6
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-4 w-4",
									strokeWidth: 2.1
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-center text-[9px] font-medium leading-tight transition-opacity ${done || current ? "opacity-100" : "opacity-50"}`,
								children: a.short
							})]
						}, a.key);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 h-5 w-full text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -6
							},
							transition: { duration: .25 },
							className: "text-sm font-medium",
							children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Done. Found",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-num font-bold",
									children: formatINR(rohan.totalFound)
								}),
								" for you."
							] }) : STEPS[stepIdx].text
						}, ready ? "done" : stepIdx)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-white",
						style: {
							width: `${pct}%`,
							transition: "width 0.18s linear"
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-num text-xs opacity-80",
					children: [pct, "%"]
				})
			]
		})]
	});
}
//#endregion
export { Processing as component };
