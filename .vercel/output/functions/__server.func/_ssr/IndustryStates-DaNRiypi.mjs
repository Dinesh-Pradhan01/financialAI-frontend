import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Kt as FileQuestionMark, Y as RefreshCw, _n as CircleAlert, cn as Clock, o as Users, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-CHW56Nnu.mjs";
import { t as OVERLAP_LEVEL_META } from "./useCompanyFinancials-Df2wMmnb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/IndustryStates-DaNRiypi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SEGMENT_COUNT = {
	"Very High": 4,
	High: 3,
	"Moderate High": 2,
	Moderate: 1
};
var SEGMENT_COLOR = {
	"Very High": "bg-brand-primary",
	High: "bg-severity-low",
	"Moderate High": "bg-severity-moderate",
	Moderate: "bg-text-secondary"
};
/**
* OverlapBadge
*
* Accessible badge indicating competitor overlap level:
* - Very High (4/4 alignment)
* - High (3/4 alignment)
* - Moderate High (2/4 alignment)
* - Moderate (1/4 alignment)
*
* Adheres strictly to DESIGN.md tokens:
* - Zero arbitrary tailwind colors
* - Accessible contrast across themes
* - Meaning conveyed via both icon glyph and readable text label (not color alone)
* - Interactive tooltip with visual alignment meter for instant executive comprehension
*/
var OverlapBadge = import_react.memo(function OverlapBadge({ level, className, showIcon = true, interactive = true }) {
	const meta = OVERLAP_LEVEL_META[level];
	if (!meta) return null;
	const Icon = meta.icon;
	const segments = SEGMENT_COUNT[level] ?? 1;
	const segmentFillClass = SEGMENT_COLOR[level] ?? "bg-brand-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 150,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				tabIndex: interactive ? 0 : -1,
				"aria-label": `${meta.label}: ${meta.description}`,
				className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold select-none border transition-all duration-150 shrink-0", interactive ? "cursor-help hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-1" : "cursor-default", meta.tintClass, meta.borderClass, meta.textClass, className),
				children: [showIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: cn("h-3.5 w-3.5 shrink-0", meta.textClass),
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: level })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
			side: "top",
			className: "max-w-xs text-xs leading-relaxed p-3 shadow-md border border-border-c bg-surface",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-text-primary text-xs",
						children: meta.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs font-medium text-text-tertiary",
						children: [segments, "/4 alignment"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 my-1.5",
					"aria-hidden": "true",
					children: [
						1,
						2,
						3,
						4
					].map((step) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1.5 flex-1 rounded-full transition-colors", step <= segments ? segmentFillClass : "bg-surface-alt border border-border-c") }, step);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-text-secondary text-xs leading-normal mt-1",
					children: meta.description
				})
			]
		})] })
	});
});
/**
* State A: status === "ready" with empty competitors array
* Distinct copy per Addition A: "No competitors have been identified for your company yet."
*/
var IndustryEmptyState = ({ onRefresh, isRefreshing = false, className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "region",
		"aria-label": "No competitors identified",
		className: `rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary border border-border-c/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary",
					children: "No competitors have been identified for your company yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: "We could not find any close peer companies matching your industry category and scale at this time."
				})]
			}),
			onRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: onRefresh,
					disabled: isRefreshing,
					className: "gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: `h-4 w-4 ${isRefreshing ? "animate-spin motion-reduce:animate-none" : ""}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Check again" })]
				})
			})
		]
	});
};
/**
* State B: status === "none"
* Distinct copy per Addition A: "Competitor analysis hasn't been generated for your company yet."
*/
var IndustryNoneState = ({ onRefresh, isRefreshing = false, className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "region",
		"aria-label": "Competitor analysis not generated",
		className: `rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary",
					children: "Competitor analysis hasn't been generated for your company yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: "Automated peer discovery runs periodically. Check back shortly once the engine processes your company profile."
				})]
			}),
			onRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: onRefresh,
					disabled: isRefreshing,
					className: "gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: `h-4 w-4 ${isRefreshing ? "animate-spin motion-reduce:animate-none" : ""}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh status" })]
				})
			})
		]
	});
};
/**
* State C: status === "generating"
* Prompt copy: "We're analysing competitors for your company."
*/
var IndustryGeneratingState = ({ onRefresh, isRefreshing = false, className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		"aria-label": "Generating competitor analysis",
		className: `rounded-2xl border border-brand-primary/20 bg-linear-to-b from-brand-primary/5 to-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "h-7 w-7 animate-spin motion-reduce:animate-none text-brand-primary",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary",
					children: "We're analysing competitors for your company."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: "Our intelligence pipeline is identifying and ranking peers based on product catalog and market overlap. This usually takes less than a minute."
				})]
			}),
			onRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: onRefresh,
					disabled: isRefreshing,
					className: "gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: `h-4 w-4 ${isRefreshing ? "animate-spin motion-reduce:animate-none" : ""}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Check progress" })]
				})
			})
		]
	});
};
/**
* State D: Error state
*/
var IndustryErrorState = ({ error, onRetry, isRetrying = false, className }) => {
	const errorMessage = error instanceof Error ? error.message : "An unexpected network or service error occurred.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: `rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary",
					children: "We couldn't load competitor analysis right now."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: errorMessage
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: onRetry,
					disabled: isRetrying,
					className: "gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: `h-4 w-4 ${isRetrying ? "animate-spin motion-reduce:animate-none" : ""}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Try again" })]
				})
			})
		]
	});
};
/**
* State E: Unknown company ID or 404
* Requirement: NotFound state with a back link (do not fall through to a blank page).
*/
var IndustryNotFoundState = ({ companyId, className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "region",
		"aria-label": "Company not found",
		className: `rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary border border-border-c/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileQuestionMark, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary",
					children: "Company Not Found"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: companyId ? `The company with ID ${companyId} was not found in your competitor intelligence list.` : "The requested company does not exist in your competitor intelligence list."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/industry",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Industry View" })
					})
				})
			})
		]
	});
};
/**
* State F: Financials Unavailable state (financial_status: "unavailable")
* E.g. Allied Digital (900001): reason-code copy, no cards or table.
*/
var IndustryFinancialsUnavailableState = ({ companyName, reasonDisplay, className }) => {
	const displayCopy = reasonDisplay || "Financial statements are currently not loaded for this entity.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "region",
		"aria-label": "Financials unavailable",
		className: `rounded-2xl border border-border-c bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-2xs ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary border border-border-c/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-text-primary",
					children: "Financials Unavailable"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: [companyName ? `${companyName}: ` : "", displayCopy]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/industry",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Industry View" })
					})
				})
			})
		]
	});
};
/**
* State G: Explanatory panel when Annual tab is unavailable (e.g. Black Box: gap_in_quarters).
*/
var AnnualUnavailablePanel = ({ reasonDisplay, className }) => {
	const message = reasonDisplay || "Insufficient consecutive quarterly records to compute reliable annual roll-ups.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "region",
		"aria-label": "Annual financials unavailable",
		className: `rounded-xl border border-border-c bg-surface-alt/40 p-6 sm:p-8 text-center max-w-lg mx-auto space-y-3 ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-text-tertiary border border-border-c",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
					className: "h-5 w-5",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-semibold text-text-primary",
				children: "Annual Figures Unavailable"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-text-secondary leading-relaxed",
				children: message
			})
		]
	});
};
/**
* State H: Skeleton for CompanyFinancialsPage
*/
var CompanyFinancialsSkeleton = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		"aria-busy": "true",
		"aria-label": "Loading company financials",
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-28 bg-surface-alt animate-pulse motion-reduce:animate-none rounded" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 border-b border-border-c pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-64 sm:w-80 bg-surface-alt animate-pulse motion-reduce:animate-none rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-28 bg-surface-alt animate-pulse motion-reduce:animate-none rounded-full" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-96 max-w-full bg-surface-alt animate-pulse motion-reduce:animate-none rounded" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border-c bg-surface p-4 sm:p-5 space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-24 bg-surface-alt animate-pulse motion-reduce:animate-none rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-32 bg-surface-alt animate-pulse motion-reduce:animate-none rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-40 bg-surface-alt animate-pulse motion-reduce:animate-none rounded" })
					]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-64 bg-surface-alt animate-pulse motion-reduce:animate-none rounded-lg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-xl border border-border-c bg-surface h-72 animate-pulse motion-reduce:animate-none" })
		]
	});
};
//#endregion
export { IndustryFinancialsUnavailableState as a, IndustryNotFoundState as c, IndustryErrorState as i, OverlapBadge as l, CompanyFinancialsSkeleton as n, IndustryGeneratingState as o, IndustryEmptyState as r, IndustryNoneState as s, AnnualUnavailablePanel as t };
