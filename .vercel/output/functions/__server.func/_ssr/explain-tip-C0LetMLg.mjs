import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { jt as Info } from "../_libs/lucide-react.mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as agentByKey } from "./agentic-C_EsON0v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explain-tip-C0LetMLg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A small agent-attributed "Why?" affordance. Click to reveal a popover that
* explains how Spotlite derived what's on screen, with optional evidence.
* Keeps explainability consistent and unobtrusive across every section.
*/
function ExplainTip({ agent, title = "Why Spotlite shows this", children, evidence, label = "Why?", align = "right", className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const a = agentByKey(agent);
	const Icon = a.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("relative inline-flex", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			"aria-expanded": open,
			"aria-label": title,
			className: cn("inline-flex items-center gap-1 rounded-pill border px-2.5 py-1 text-[11px] font-semibold transition", open ? "border-brand-secondary/40 bg-brand-secondary/10 text-brand-secondary" : "border-border bg-surface text-text-secondary hover:text-text-primary"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-hidden": true,
			tabIndex: -1,
			onClick: () => setOpen(false),
			className: "fixed inset-0 z-30 cursor-default"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -4,
				scale: .98
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: -4,
				scale: .98
			},
			transition: {
				duration: .16,
				ease: "easeOut"
			},
			role: "dialog",
			className: cn("absolute top-full z-40 mt-2 w-72 rounded-2xl border border-border bg-surface p-4 text-left shadow-e2", align === "right" ? "right-0" : "left-0"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-on-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-3 w-3",
							strokeWidth: 2.3
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-brand-secondary",
						children: a.label
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold text-text-primary",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-text-secondary",
					children
				}),
				evidence && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 border-t border-border pt-2 text-[11px] text-text-secondary",
					children: evidence
				})
			]
		})] }) })]
	});
}
//#endregion
export { ExplainTip as t };
