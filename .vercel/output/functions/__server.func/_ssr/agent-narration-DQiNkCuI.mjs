import { t as cn } from "./utils-BkRapwZn.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles } from "../_libs/lucide-react.mjs";
import { t as agentByKey } from "./agentic-C_EsON0v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agent-narration-DQiNkCuI.js
var import_jsx_runtime = require_jsx_runtime();
/** Small pill that attributes something to one of the five agents. */
function AgentBadge({ agent, className }) {
	const a = agentByKey(agent);
	const Icon = a.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-pill bg-brand-secondary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-secondary", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "h-3 w-3",
			strokeWidth: 2.3
		}), a.label]
	});
}
/** Ambient per-screen narration banner — the agent "speaking first". */
function AgentNarration({ agent, children, className }) {
	const a = agentByKey(agent);
	const Icon = a.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-start gap-3 rounded-2xl border border-brand-secondary/15 bg-brand-secondary/[0.06] px-4 py-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-on-brand",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-3.5 w-3.5",
				strokeWidth: 2.2
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm leading-snug text-text-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-semibold text-brand-secondary",
					children: [a.label, ":"]
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-text-secondary",
					children
				})
			]
		})]
	});
}
/** Confidence bar used on trigger detail. */
function ConfidenceMeter({ value }) {
	const color = value >= 85 ? "var(--success)" : value >= 70 ? "var(--severity-moderate)" : "var(--severity-low)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 text-xs font-medium text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-brand-secondary" }), " Confidence"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-2 flex-1 overflow-hidden rounded-full bg-surface-alt",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full transition-all",
					style: {
						width: `${value}%`,
						background: color
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-num text-sm font-semibold",
				style: { color },
				children: [value, "%"]
			})
		]
	});
}
//#endregion
export { AgentNarration as n, ConfidenceMeter as r, AgentBadge as t };
