import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as Tags, Fn as Brain, Gn as ArrowRight, Gt as FileSearch, I as Shield, Kn as ArrowLeft, Mn as Building2, Tt as ListChecks, Y as RefreshCw, rn as Database } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as agents } from "./agentic-C_EsON0v.mjs";
import { n as AgentNarration } from "./agent-narration-DQiNkCuI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agents-DfQtnOYP.js
var import_jsx_runtime = require_jsx_runtime();
/** The observe -> think -> act -> learn loop, visualised as the 5 agents. */
function AgentLoop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "card-spot p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-stretch gap-2",
			children: agents.map((a, i) => {
				const Icon = a.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-32 flex-col items-center gap-2 rounded-2xl bg-surface-alt p-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-on-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-5 w-5",
									strokeWidth: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold leading-tight",
								children: a.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] leading-tight text-text-secondary",
								children: a.tagline
							})
						]
					}), i < agents.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 shrink-0 text-text-secondary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 text-xs font-medium text-brand-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), " loops"]
					})]
				}, a.key);
			})
		})
	});
}
var pipelineSteps = [
	{
		icon: FileSearch,
		label: "Upload",
		description: "PDF statement received and validated",
		detail: "Format checks, file integrity, deduplication via MD5 hash"
	},
	{
		icon: Shield,
		label: "Validation",
		description: "Content integrity verified",
		detail: "PDF parsing, page count detection, corruption checks"
	},
	{
		icon: Building2,
		label: "Bank Detection",
		description: "Bank and account type identified",
		detail: "AI-powered detection using statement headers and formatting patterns"
	},
	{
		icon: Brain,
		label: "AI Extraction",
		description: "Gemini 2.5 Flash processes raw data",
		detail: "Large language model reads statement pages, extracts structured financial data"
	},
	{
		icon: ListChecks,
		label: "Transaction Parsing",
		description: "Every transaction parsed and validated",
		detail: "Date, narration, debit/credit, running balance — all cross-checked"
	},
	{
		icon: Tags,
		label: "Categorization",
		description: "Transactions auto-categorized",
		detail: "Merchant detection, category tagging (Food, Travel, Utilities, etc.)"
	},
	{
		icon: Database,
		label: "Storage",
		description: "Data saved to your financial graph",
		detail: "Account, transactions, and metadata stored in PostgreSQL"
	}
];
function Agents() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-6 md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/home",
				className: "flex items-center gap-2 text-sm text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Home"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold",
					children: "Your agents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-text-secondary",
					children: "Spotlite isn't a dashboard you check. It's a team of agents working for you around the clock."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentNarration, {
					agent: "learning",
					children: "We observe → think → act → learn in a loop. Every time you open, apply or snooze, I make the next nudge sharper."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-lg font-semibold",
					children: "The observe → think → act → learn loop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto pb-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentLoop, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: agents.map((a) => {
					const Icon = a.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-spot p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-on-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-semibold",
								children: a.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-text-secondary",
								children: a.tagline
							})
						]
					}, a.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-display text-lg font-semibold",
						children: "Upload & Extraction Pipeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-5 text-sm text-text-secondary",
						children: "Here's exactly what happens when you drop a bank statement into Spotlite — every step, transparent and traceable."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card-spot overflow-hidden p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative",
							children: pipelineSteps.map((step, i) => {
								const StepIcon = step.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative flex gap-4 pb-6 last:pb-0",
									children: [
										!(i === pipelineSteps.length - 1) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-5 top-10 h-[calc(100%-10px)] w-px bg-border" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-on-brand shadow-e1 transition group-hover:scale-105",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIcon, { className: "h-5 w-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1 pt-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "rounded-pill bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand",
														children: ["Step ", i + 1]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-sm font-semibold",
														children: step.label
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-sm text-text-primary",
													children: step.description
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-0.5 text-xs text-text-secondary",
													children: step.detail
												})
											]
										})
									]
								}, step.label);
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-spot mt-6 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold",
					children: "Document Extraction Hub"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-text-secondary",
					children: "View live processing status, statement audit trails, and document history in the extraction workspace."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/upload",
					className: "inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-on-brand shadow-e1 transition hover:opacity-90 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Extraction Hub" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			})
		]
	});
}
//#endregion
export { Agents as component };
