import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { B as Share2, Gn as ArrowRight, Kn as ArrowLeft, z as ShieldAlert } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as wrapped } from "./agentic-C_EsON0v.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { i as rohan } from "./rohan-BsoI7WdA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as isStrictHR } from "./roles-Cu-hhfHW.mjs";
import { n as iconFor } from "./icons-2Ya6Jeu5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wrapped-C-6Q7anl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonaStoryCard({ persona, accent }) {
	const { icon: Icon } = iconFor(persona.id);
	const circumference = 2 * Math.PI * 22;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 text-on-brand shadow-e2",
		style: { background: accent ?? "var(--brand-gradient)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/15 blur-2xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-[0.2em] opacity-80",
						children: [
							"Your #",
							persona.rank,
							" persona"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 backdrop-blur",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-12 w-12",
							strokeWidth: 1.8
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 font-display text-3xl font-bold uppercase tracking-tight",
						children: persona.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xs text-base opacity-90",
						children: persona.blurb
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs opacity-70",
					children: "match"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-4xl font-bold font-num",
					children: [persona.match, "%"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: 56,
					height: 56,
					className: "-rotate-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: 28,
						cy: 28,
						r: 22,
						stroke: "rgba(255,255,255,0.25)",
						strokeWidth: 5,
						fill: "none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: 28,
						cy: 28,
						r: 22,
						stroke: "white",
						strokeWidth: 5,
						strokeLinecap: "round",
						fill: "none",
						strokeDasharray: circumference,
						strokeDashoffset: circumference * (1 - persona.match / 100)
					})]
				})]
			})
		]
	});
}
var accents = [
	"linear-gradient(135deg, oklch(0.3 0.1 269), oklch(0.35 0.1 276))",
	"linear-gradient(135deg, oklch(0.29 0.09 258), oklch(0.34 0.09 270))",
	"linear-gradient(135deg, oklch(0.31 0.08 245), oklch(0.35 0.1 260))",
	"linear-gradient(135deg, oklch(0.3 0.11 278), oklch(0.34 0.11 288))",
	"linear-gradient(135deg, oklch(0.3 0.09 230), oklch(0.34 0.1 245))"
];
function Wrapped() {
	const { user } = useAuth();
	if (isStrictHR(user?.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-16 text-center space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold font-display text-text-primary tracking-tight",
						children: "Access Restricted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-text-secondary leading-relaxed",
						children: "Money Wrapped is restricted for HR role accounts."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-mono text-text-tertiary",
						children: [
							"Current signed-in role:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-text-secondary uppercase",
								children: user?.role || "HR"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/hr",
					className: "inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-brand hover:opacity-90 transition cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Go to HR Operations"]
				})
			})
		]
	});
	const [idx, setIdx] = (0, import_react.useState)(0);
	const persona = rohan.personas[idx];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-6 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/home",
				className: "flex items-center gap-2 text-sm text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Home"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-2xl font-bold",
				children: "Money Wrapped"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-text-secondary",
				children: "Your top 5 personas, this year."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 md:grid-cols-[420px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-3/4 max-w-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonaStoryCard, {
							persona,
							accent: accents[idx % accents.length]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIdx((i) => Math.max(0, i - 1)),
								disabled: idx === 0,
								className: "rounded-full border border-border bg-surface p-2 disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								children: rohan.personas.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-brand" : "w-1.5 bg-border"}` }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIdx((i) => Math.min(rohan.personas.length - 1, i + 1)),
								disabled: idx === rohan.personas.length - 1,
								className: "rounded-full border border-border bg-surface p-2 disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-lg font-semibold",
							children: [
								"Your ",
								wrapped.year,
								", wrapped"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-3",
							children: wrapped.stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: s.label,
								value: s.value,
								caption: s.caption
							}, s.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toast.success("Wrapped card ready", { description: `Your "${persona.label}" card was saved to share.` }),
							className: "mt-2 inline-flex items-center gap-2 rounded-pill bg-brand px-4 py-2 text-sm font-semibold text-on-brand shadow-brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " Share my Wrapped"]
						})
					]
				})]
			})
		]
	});
}
function Stat({ label, value, caption }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-spot p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-wider text-text-secondary",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-bold font-num",
				children: value
			}),
			caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-secondary",
				children: caption
			})
		]
	});
}
//#endregion
export { Wrapped as component };
