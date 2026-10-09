import { o as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-BkRapwZn.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Gn as ArrowRight, Kt as FileQuestionMark, M as SignalLow, N as SignalHigh, Qt as ExternalLink, Y as RefreshCw, _n as CircleAlert, cn as Clock, dn as CircleX, gn as CircleCheck, j as SignalMedium, jt as Info, vt as MapPin, wt as LoaderCircle } from "./_libs/lucide-react.mjs";
import { t as Button } from "./_ssr/button-Ct7_2QlC.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as motion, t as useReducedMotion } from "./_libs/framer-motion.mjs";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./_ssr/tooltip-CHW56Nnu.mjs";
import { t as Skeleton } from "./_ssr/skeleton-DKEeCsGh.mjs";
import { n as isDevelopmentsError, r as useDevelopments } from "./_ssr/useDevelopments-DWlwTKEO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.developments-BQrnj4Z0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Presentation helpers, constants, and formatting utilities for the Developments domain.
* Pure logic only. Zero React components.
*/
/**
* Visual styling and metadata for relevance levels.
*
* Accessibility requirement:
* State colour is carried by the icon, background tint, and border;
* the label itself stays on a high-contrast text token (`text-text-primary`).
* Colour is never the sole visual signal.
*/
var RELEVANCE_META = {
	high: {
		label: "High Relevance",
		iconName: "SignalHigh",
		icon: SignalHigh,
		tint: "bg-severity-high/15",
		border: "border-severity-high/30",
		iconColor: "text-severity-high",
		labelColor: "text-text-primary",
		badgeClasses: "bg-severity-high/15 border-severity-high/30 text-text-primary",
		description: "High relevance to your company's profile, as scored by SpotLite. This is not a measure of urgency or importance."
	},
	medium: {
		label: "Medium Relevance",
		iconName: "SignalMedium",
		icon: SignalMedium,
		tint: "bg-severity-moderate/15",
		border: "border-severity-moderate/30",
		iconColor: "text-severity-moderate",
		labelColor: "text-text-primary",
		badgeClasses: "bg-severity-moderate/15 border-severity-moderate/30 text-text-primary",
		description: "Medium relevance to your company's sector or operational activities, as scored by SpotLite. This is not a measure of urgency or importance."
	},
	low: {
		label: "Low Relevance",
		iconName: "SignalLow",
		icon: SignalLow,
		tint: "bg-severity-low/15",
		border: "border-severity-low/30",
		iconColor: "text-severity-low",
		labelColor: "text-text-primary",
		badgeClasses: "bg-severity-low/15 border-severity-low/30 text-text-primary",
		description: "Low relevance to your company's profile, representing broader sector developments, as scored by SpotLite. This is not a measure of urgency or importance."
	}
};
var STATUS_META = {
	active: {
		label: "Active",
		icon: CircleCheck,
		tint: "bg-success/15",
		border: "border-success/30",
		iconColor: "text-success",
		labelColor: "text-text-primary",
		badgeClasses: "bg-success/15 border-success/30 text-text-primary"
	},
	closing_soon: {
		label: "Closing Soon",
		icon: Clock,
		tint: "bg-severity-moderate/15",
		border: "border-severity-moderate/30",
		iconColor: "text-severity-moderate",
		labelColor: "text-text-primary",
		badgeClasses: "bg-severity-moderate/15 border-severity-moderate/30 text-text-primary"
	},
	expired: {
		label: "Expired",
		icon: CircleX,
		tint: "bg-surface-alt",
		border: "border-border-c",
		iconColor: "text-text-tertiary",
		labelColor: "text-text-secondary",
		badgeClasses: "bg-surface-alt border-border-c text-text-secondary"
	}
};
/**
* Progression stages shown during latency-heavy developments requests (26-31s cold).
* Generic status wording only; no fabricated numbers.
*/
var LOADING_STAGES = [
	{
		afterMs: 0,
		text: "Gathering recent public developments…"
	},
	{
		afterMs: 8e3,
		text: "Ranking them by relevance to your company…"
	},
	{
		afterMs: 2e4,
		text: "Still working. The first load can take up to a minute."
	}
];
var EXPLAINER_TEXT = "Implications are automated assessments based on public headlines and your company profile. They do not confirm any opportunity or outcome.";
var RELEVANCE_LEGEND = [
	{
		relevance: "high",
		label: "High Relevance",
		description: "Direct alignment with your core business offerings, products, or primary operating geography."
	},
	{
		relevance: "medium",
		label: "Medium Relevance",
		description: "Broader industry or regional shifts that may influence operational or competitive planning."
	},
	{
		relevance: "low",
		label: "Low Relevance",
		description: "Macro developments or peripheral sector events with indirect relationship to your profile."
	}
];
/**
* Formats published_at timestamp into relative and absolute strings.
* Uses native Intl.RelativeTimeFormat and Intl.DateTimeFormat (no external libraries).
* Future timestamps (clock skew) fall back to the absolute string for both fields.
* Returns null if input is missing or invalid.
*/
function formatPublished(iso, now = /* @__PURE__ */ new Date()) {
	if (!iso || typeof iso !== "string") return null;
	const trimmed = iso.trim();
	if (!trimmed) return null;
	const timestamp = Date.parse(trimmed);
	if (Number.isNaN(timestamp)) return null;
	const date = new Date(timestamp);
	const absolute = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(date);
	const diffMs = now.getTime() - date.getTime();
	if (diffMs < 0) return {
		relative: absolute,
		absolute
	};
	const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
	const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
	let relative;
	if (diffHours < 1) relative = "today";
	else if (diffHours < 24) relative = rtf.format(-diffHours, "hour");
	else if (diffDays < 30) relative = rtf.format(-diffDays, "day");
	else {
		const diffMonths = Math.floor(diffDays / 30);
		if (diffMonths < 12) relative = rtf.format(-diffMonths, "month");
		else relative = absolute;
	}
	return {
		relative,
		absolute
	};
}
/**
* Formats retrieved_at timestamp into "Updated X ago" format.
* Returns null if input is missing or invalid.
*/
function formatLastUpdated(iso, now = /* @__PURE__ */ new Date()) {
	if (!iso || typeof iso !== "string") return null;
	const trimmed = iso.trim();
	if (!trimmed) return null;
	const timestamp = Date.parse(trimmed);
	if (Number.isNaN(timestamp)) return null;
	const date = new Date(timestamp);
	const absolute = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit"
	}).format(date);
	const diffMs = now.getTime() - date.getTime();
	if (diffMs < 0) return {
		relative: `Updated ${absolute}`,
		absolute
	};
	const diffMinutes = Math.floor(diffMs / (1e3 * 60));
	const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
	let relative;
	if (diffMinutes < 1) relative = "Updated just now";
	else if (diffMinutes < 60) relative = `Updated ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
	else if (diffHours < 24) relative = `Updated ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
	else relative = `Updated ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
	return {
		relative,
		absolute
	};
}
/**
* Formats closing_date timestamp into a localized short date.
* Returns null if input is missing or invalid.
*/
function formatClosingDate(iso) {
	if (!iso || typeof iso !== "string") return null;
	const trimmed = iso.trim();
	if (!trimmed) return null;
	const timestamp = Date.parse(trimmed);
	if (Number.isNaN(timestamp)) return null;
	const date = new Date(timestamp);
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(date);
}
/**
* Accessible badge indicating relevance level (High, Medium, Low).
* Colour is carried by the icon, background tint, and border.
* The label itself remains on the high-contrast text token (`text-text-primary`)
* to ensure full WCAG AA compliance across both light and dark modes.
*/
var RelevanceBadge = import_react.memo(function RelevanceBadge({ relevance, className }) {
	if (!relevance || !RELEVANCE_META[relevance]) return null;
	const meta = RELEVANCE_META[relevance];
	const Icon = meta.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 200,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				tabIndex: 0,
				className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold select-none border transition-colors cursor-help focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-1", meta.tint, meta.border, meta.labelColor, className),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: cn("h-3.5 w-3.5 shrink-0", meta.iconColor),
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: meta.label })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
			side: "top",
			className: "max-w-xs text-xs leading-relaxed",
			children: meta.description
		})] })
	});
});
/**
* Single development row in the developments feed.
*
* Layout:
* - Two-column on md+ (left: ~60% col-span-3, right: ~40% col-span-2).
* - Stacks on mobile with an inline "Implication" indicator.
* - Memoized to prevent unnecessary re-renders in list updates.
*/
var DevelopmentRow = import_react.memo(function DevelopmentRow({ item }) {
	const published = formatPublished(item.publishedAt);
	const closingFormatted = formatClosingDate(item.closingDate);
	const statusMeta = item.status ? STATUS_META[item.status] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "list-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			"aria-labelledby": `dev-title-${item.key}`,
			className: "grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 py-5 sm:py-6 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-3 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelevanceBadge, { relevance: item.relevance }),
							statusMeta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border", statusMeta.tint, statusMeta.border, statusMeta.labelColor),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(statusMeta.icon, {
									className: cn("h-3 w-3", statusMeta.iconColor),
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: statusMeta.label })]
							}),
							closingFormatted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-secondary border border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									className: "h-3 w-3 text-text-tertiary",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Closes ", closingFormatted] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: `dev-title-${item.key}`,
						className: "font-display text-base md:text-lg font-semibold text-foreground tracking-tight leading-snug break-words",
						children: item.title
					}),
					item.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-text-secondary leading-relaxed break-words",
						children: item.detail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-tertiary pt-0.5",
						children: [
							item.sourceName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex items-center gap-1 font-medium",
								children: item.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: item.sourceUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-1 text-text-secondary hover:text-brand transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "break-words",
											children: item.sourceName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
											className: "h-3 w-3 shrink-0",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: " (opens in a new tab)"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary break-words",
									children: item.sourceName
								})
							}),
							published && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "select-none text-border-c",
								"aria-hidden": "true",
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: item.publishedAt ?? void 0,
								title: published.absolute,
								className: "hover:text-text-secondary transition-colors cursor-default",
								children: published.relative
							})] }),
							item.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "select-none text-border-c",
								"aria-hidden": "true",
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "h-3 w-3 shrink-0",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.location })]
							})] })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-2 mt-1 md:mt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border/60 bg-surface-alt/40 p-4 space-y-2 h-full flex flex-col justify-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs font-semibold text-text-secondary uppercase tracking-wider md:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "h-3.5 w-3.5 text-brand",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Implication" })]
					}), item.implication ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-text-primary leading-relaxed break-words",
						children: item.implication
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-text-tertiary italic leading-relaxed",
						children: "No implication was provided for this development."
					})]
				})
			})]
		})
	});
});
/**
* Skeleton loader for developments feed.
*
* Mirrors the exact two-column layout of DevelopmentRow.
* Features a polite screen-reader status announcement that cycles through
* non-synthetic loading progression stages as latency increases.
*/
var DevelopmentsSkeleton = () => {
	const [stageIndex, setStageIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timers = [];
		LOADING_STAGES.forEach((stage, idx) => {
			if (idx > 0 && stage.afterMs > 0) {
				const t = setTimeout(() => {
					setStageIndex(idx);
				}, stage.afterMs);
				timers.push(t);
			}
		});
		return () => {
			timers.forEach((t) => clearTimeout(t));
		};
	}, []);
	const currentStageText = LOADING_STAGES[stageIndex]?.text ?? LOADING_STAGES[0].text;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-busy": "true",
		"aria-label": "Loading developments",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "true",
				className: "flex items-center gap-2.5 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-xs text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "h-4 w-4 animate-spin text-brand shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-text-primary",
					children: currentStageText
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden md:grid md:grid-cols-5 gap-4 pb-2 border-b border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-28" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border/60",
				children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 py-5 sm:py-6 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-3 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-28 rounded-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-11/12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-4/5" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-20" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-16" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-24" })
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/60 bg-surface-alt/40 p-4 space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-10/12" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4/5" })
							]
						})
					})]
				}, i))
			})
		]
	});
};
var DevelopmentsNeedsCompanyState = ({ className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "region",
		"aria-label": "Profile setup required",
		className: `rounded-2xl border border-brand/20 bg-linear-to-b from-brand/5 to-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground",
					children: "Complete your company profile to see developments."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: "SpotLite scans live public news and signals to identify market opportunities and regulatory developments tailored specifically to your business."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "gap-2 cursor-pointer font-semibold shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/onboarding",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Complete Business Setup" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						})]
					})
				})
			})
		]
	});
};
var DevelopmentsEmptyState = ({ onRefresh, isRefreshing = false }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "region",
		"aria-label": "No developments found",
		className: "rounded-2xl border border-border/80 bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary border border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileQuestionMark, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-foreground",
					children: "No relevant developments found in the last 30 days."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: "This can also happen when sources are temporarily unavailable."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: onRefresh,
					disabled: isRefreshing,
					className: "gap-2 cursor-pointer text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: `h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh developments" })]
				})
			})
		]
	});
};
var DevelopmentsErrorState = ({ error, onRetry, isRetrying = false }) => {
	const kind = isDevelopmentsError(error) ? error.kind : "unknown";
	let title = "We couldn't load developments right now.";
	let description = "We encountered an unexpected issue while retrieving recent public developments. Please try again.";
	let Icon = CircleAlert;
	if (kind === "timeout") {
		title = "This is taking longer than expected.";
		description = "The upstream search took longer than usual to retrieve and rank developments. Please try again.";
		Icon = Clock;
	} else if (kind === "not_found") {
		title = "We couldn't find your company profile.";
		description = "We were unable to locate your company profile in our intelligence database. Please check your setup.";
		Icon = CircleAlert;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: "rounded-2xl border border-border/80 bg-surface p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-7 w-7",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-foreground",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed max-w-md mx-auto",
					children: description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: onRetry,
					disabled: isRetrying,
					className: "gap-2 cursor-pointer text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: `h-4 w-4 ${isRetrying ? "animate-spin" : ""}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Try again" })]
				})
			})
		]
	});
};
/**
* Developments intelligence page.
* Displays ranked public market developments and AI business implications.
*/
var DevelopmentsPage = () => {
	const { data, isLoading, isFetching, isError, error, refetch, needsCompany } = useDevelopments();
	const shouldReduceMotion = useReducedMotion();
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: shouldReduceMotion ? 0 : .05,
				delayChildren: .02
			}
		}
	};
	const itemVariants = {
		hidden: {
			opacity: 0,
			y: shouldReduceMotion ? 0 : 8
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? .15 : .3,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		}
	};
	const companyName = data?.companyName?.trim();
	const subtitle = companyName ? `Recent public developments relevant to ${companyName}` : "Recent public developments";
	const sourcesList = data?.sources?.length ? `Source: ${data.sources.join(", ")}` : null;
	const lastUpdated = formatLastUpdated(data?.retrievedAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-7 p-4 md:p-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/60 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								id: "developments-heading",
								className: "font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground",
								children: "Developments"
							}), isFetching && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-xs font-medium text-brand animate-pulse",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
									className: "h-3 w-3 animate-spin",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refreshing…" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-text-secondary leading-relaxed",
							children: subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-text-tertiary pt-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Last 30 days · up to 10 items" }),
								sourcesList && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "select-none text-border-c",
									"aria-hidden": "true",
									children: "·"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sourcesList })] }),
								lastUpdated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "select-none text-border-c",
									"aria-hidden": "true",
									children: "·"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: lastUpdated.absolute,
									className: "cursor-default",
									children: lastUpdated.relative
								})] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 self-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => refetch(),
						disabled: isFetching,
						"aria-label": "Refresh developments",
						className: "gap-2 cursor-pointer text-xs font-semibold shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: `h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh" })]
					})
				})]
			}),
			data?.degraded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				className: "rounded-xl border border-severity-moderate/30 bg-severity-moderate/10 px-4 py-3 text-xs text-text-primary flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					className: "h-4 w-4 text-severity-moderate shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Some sources were unavailable, so these results may be incomplete." })]
			}),
			needsCompany ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevelopmentsNeedsCompanyState, {}) : isLoading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevelopmentsSkeleton, {}) : isError && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevelopmentsErrorState, {
				error,
				onRetry: () => refetch(),
				isRetrying: isFetching
			}) : data && data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevelopmentsEmptyState, {
				onRefresh: () => refetch(),
				isRefreshing: isFetching
			}) : data && data.items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "developments-heading",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:grid md:grid-cols-5 gap-4 md:gap-6 pb-2.5 border-b border-border/80 text-xs font-bold uppercase tracking-wider text-text-tertiary select-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-3",
							children: "Development"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: "Implication"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ul, {
						variants: containerVariants,
						initial: "hidden",
						animate: "show",
						className: "divide-y divide-border/60",
						children: data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: itemVariants,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevelopmentRow, { item })
						}, item.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "rounded-2xl border border-border/60 bg-surface-alt/30 p-5 space-y-3.5 text-xs text-text-secondary mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								className: "h-4 w-4 text-text-tertiary shrink-0 mt-0.5",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-relaxed text-text-secondary",
								children: EXPLAINER_TEXT
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border/40 pt-3 flex flex-wrap gap-x-6 gap-y-2",
							children: RELEVANCE_LEGEND.map((legend) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-text-primary",
									children: [legend.label, ":"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary",
									children: legend.description
								})]
							}, legend.relevance))
						})]
					})
				]
			}) : null
		]
	});
};
var SplitComponent = DevelopmentsPage;
//#endregion
export { SplitComponent as component };
