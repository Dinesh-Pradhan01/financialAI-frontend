import { o as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-BkRapwZn.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Mn as Building2, Y as RefreshCw, an as Copy, jt as Info, rn as Database, wn as Check, wt as LoaderCircle, xn as ChevronRight } from "./_libs/lucide-react.mjs";
import { t as Button } from "./_ssr/button-Ct7_2QlC.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as motion, t as useReducedMotion } from "./_libs/framer-motion.mjs";
import { t as Skeleton } from "./_ssr/skeleton-DKEeCsGh.mjs";
import { a as useQueryClient } from "./_libs/tanstack__react-query.mjs";
import { o as useCompetitors, r as companyFinancialsQueryOptions } from "./_ssr/useCompanyFinancials-Df2wMmnb.mjs";
import { i as IndustryErrorState, l as OverlapBadge, o as IndustryGeneratingState, r as IndustryEmptyState, s as IndustryNoneState } from "./_ssr/IndustryStates-DaNRiypi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.industry.index-O9Evi-rE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* AnchorSummary
*
* Slim context bar placed directly above the competitor list.
* Identifies the anchor tenant company (e.g. VL ACCESS INDIA PRIVATE LIMITED).
*
* Adheres strictly to the specification:
* - Company name
* - Industry
* - One-line description
* - "Unlisted" status chip
* - CIN with interactive one-click copy affordance
* - Reason for no financials ("Financials unavailable: unlisted private company")
* - NO NUMBERS (the anchor company is unlisted and has no public numbers)
*/
var AnchorSummary = import_react.memo(function AnchorSummary({ anchor, className }) {
	const [copiedCin, setCopiedCin] = (0, import_react.useState)(false);
	const handleCopyCin = (0, import_react.useCallback)(() => {
		if (anchor?.cin && typeof navigator !== "undefined" && navigator.clipboard?.writeText) navigator.clipboard.writeText(anchor.cin).then(() => {
			setCopiedCin(true);
			setTimeout(() => setCopiedCin(false), 2e3);
		});
	}, [anchor?.cin]);
	if (!anchor) return null;
	const listingLabel = anchor.listingStatus === "unlisted" ? "Unlisted" : anchor.listingStatus === "listed" ? "Listed" : anchor.listingStatus;
	const reasonText = anchor.reasonDisplay ? anchor.reasonDisplay.replace(/\.$/, "") : "unlisted private company";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Anchor Company Context",
		className: cn("rounded-xl border border-border-c bg-surface p-4 sm:p-5 shadow-2xs space-y-3 transition-shadow duration-200 hover:shadow-xs", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-2xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-bold text-text-primary tracking-tight",
							children: anchor.companyName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-surface-alt border border-border-c px-2.5 py-0.5 text-xs font-medium text-text-secondary",
							children: listingLabel
						}),
						anchor.industry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-brand-primary/5 border border-brand-primary/20 px-2.5 py-0.5 text-xs font-medium text-brand-primary",
							children: anchor.industry
						})
					]
				}), anchor.cin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-mono text-text-tertiary tracking-wider select-all",
						children: ["CIN: ", anchor.cin]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleCopyCin,
						"aria-label": `Copy CIN ${anchor.cin}`,
						title: "Copy CIN to clipboard",
						className: "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-mono text-text-tertiary hover:text-text-primary hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
						children: copiedCin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "h-3 w-3 text-severity-low",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-severity-low font-medium text-xs",
							children: "Copied"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							className: "h-3 w-3",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Copy CIN"
						})] })
					})]
				})]
			}),
			anchor.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs sm:text-sm text-text-secondary leading-relaxed max-w-4xl",
				children: anchor.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-lg bg-surface-alt/60 border border-border-c/60 px-3 py-1.5 text-xs text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					className: "h-3.5 w-3.5 text-text-tertiary shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "leading-normal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "font-semibold text-text-primary",
							children: "Financials unavailable:"
						}),
						" ",
						reasonText
					]
				})]
			})
		]
	});
});
/**
* CompetitorRow
*
* Table row representing a single competitor in the Industry View list.
*
* Interaction & Accessibility Rules:
* - When `hasFinancials: true`:
*   - Stretched link on company name making entire row clickable.
*   - Hover tint (`hover:bg-surface-alt/60`) and focus-within ring.
*   - Trailing `ChevronRight` (aria-hidden).
*   - Accessible name: "View financials for {companyName}".
*   - Query prefetch on hover/focus for instantaneous navigation.
* - When `hasFinancials: false` (e.g. Allied Digital):
*   - Muted text colors.
*   - Unclickable (no link, cursor-default).
*   - "Financials unavailable" badge tag.
*   - No trailing chevron.
*/
var CompetitorRow = import_react.memo(function CompetitorRow({ item, className }) {
	const queryClient = useQueryClient();
	const handlePrefetch = (0, import_react.useCallback)(() => {
		if (item.hasFinancials && item.companyId) queryClient.prefetchQuery(companyFinancialsQueryOptions(item.companyId));
	}, [
		item.hasFinancials,
		item.companyId,
		queryClient
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: cn("relative border-b border-border-c transition-colors duration-150 motion-reduce:transition-none", item.hasFinancials ? "group hover:bg-surface-alt/70 focus-within:bg-surface-alt/70 focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-inset" : "bg-surface-alt/25 cursor-default opacity-85", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				scope: "row",
				className: "py-4 px-4 sm:px-6 align-top font-normal text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [item.hasFinancials ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.href,
							preload: "intent",
							onMouseEnter: handlePrefetch,
							onFocus: handlePrefetch,
							"aria-label": `View financials for ${item.companyName}`,
							className: "font-display font-semibold text-sm sm:text-base text-text-primary group-hover:text-brand-primary transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 after:absolute after:inset-0 rounded-xs",
							children: item.companyName
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display font-semibold text-sm sm:text-base text-text-secondary select-none",
							children: item.companyName
						}), item.ticker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-sm bg-surface-alt border border-border-c px-2 py-0.5 font-mono text-xs font-semibold text-text-secondary uppercase tracking-wider",
							children: item.ticker
						})]
					}), !item.hasFinancials && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-0.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-surface-alt border border-border-c px-2 py-0.5 text-xs text-text-tertiary font-medium",
							children: "Financials unavailable"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-4 px-3 sm:px-4 align-top whitespace-nowrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 inline-block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlapBadge, {
						level: item.overlapLevel,
						interactive: !item.hasFinancials
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-4 px-4 sm:px-6 align-top",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-xs sm:text-sm leading-relaxed max-w-2xl", item.hasFinancials ? "text-text-secondary" : "text-text-tertiary"),
					children: item.overlapSummary
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-4 px-4 sm:px-6 align-top text-right whitespace-nowrap w-12",
				children: item.hasFinancials ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-end h-full pt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						className: "h-4 w-4 text-text-tertiary group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-150 motion-reduce:group-hover:translate-x-0 motion-reduce:transition-none shrink-0",
						"aria-hidden": "true"
					})
				}) : null
			})
		]
	});
});
/**
* Formats a raw timestamp or ISO string into a concise human-readable date.
*/
function formatProvenanceDate(dateStr) {
	if (!dateStr) return "recently";
	try {
		const d = new Date(dateStr);
		if (Number.isNaN(d.getTime())) return dateStr;
		return new Intl.DateTimeFormat("en-IN", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}).format(d);
	} catch {
		return dateStr;
	}
}
/**
* CompetitorTable
*
* Semantic, accessible table presenting peer competitors sorted by overlap rank.
*
* Specification:
* - Semantic <table> with accessible <caption>
* - Column headers with scope="col" (Company, Overlap, Overview, Actions)
* - Horizontal overflow container to protect layout on narrower viewports
* - Sorted by overlapRank ascending
* - Provenance footnote displaying overlap_source and generated_at
*/
var CompetitorTable = import_react.memo(function CompetitorTable({ competitors, generatedAt, className }) {
	const sortedCompetitors = (0, import_react.useMemo)(() => {
		return [...competitors].sort((a, b) => a.overlapRank - b.overlapRank);
	}, [competitors]);
	const sourceLabel = (0, import_react.useMemo)(() => {
		const sources = Array.from(new Set(sortedCompetitors.map((c) => c.overlapSource).filter((s) => Boolean(s && s.trim()))));
		if (sources.length === 0) return "Curated Analysis";
		return sources.map((s) => s.replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())).join(", ");
	}, [sortedCompetitors]);
	const formattedGeneratedAt = formatProvenanceDate(generatedAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase tracking-wider text-text-tertiary",
						children: "Ranked Peers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center rounded-full bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 text-xs font-semibold text-brand-primary font-mono",
						children: [sortedCompetitors.length, " Companies"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-text-tertiary hidden sm:flex items-center gap-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Select any row to view complete financial statements" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				tabIndex: 0,
				role: "region",
				"aria-label": "Competitor comparison table",
				className: "overflow-x-auto rounded-xl border border-border-c bg-surface shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left border-collapse min-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
							className: "sr-only",
							children: "Competitors and peer overlap analysis ranked by business alignment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border-c bg-surface-alt/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "py-3 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary w-1/3",
									children: "Company"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "py-3 px-3 sm:px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary w-1/6",
									children: "Overlap"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "py-3 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary w-1/2",
									children: "Overview"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									"aria-label": "Actions",
									className: "py-3 px-4 sm:px-6 text-right w-12",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Actions"
									})
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border-c",
							children: sortedCompetitors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompetitorRow, { item }, item.companyId ?? item.companyName))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex items-center gap-2 px-1 text-xs text-text-tertiary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					className: "h-3.5 w-3.5 shrink-0 text-text-tertiary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Source: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "font-medium text-text-secondary",
						children: sourceLabel
					}),
					" · Generated on ",
					formattedGeneratedAt
				] })]
			})
		]
	});
});
/**
* IndustrySkeleton
*
* Tabular skeleton loader for Industry View.
* Matches the layout of AnchorSummary and CompetitorTable precisely.
*
* Accessibility:
* - role="status" and aria-live="polite"
* - aria-busy="true"
*/
var IndustrySkeleton = ({ className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		"aria-busy": "true",
		"aria-label": "Loading competitor intelligence",
		className: `space-y-6 ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-3 text-xs text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "h-4 w-4 animate-spin motion-reduce:animate-none text-brand-primary shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-text-primary",
					children: "Loading peer competitor analysis…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border-c bg-surface p-4 sm:p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-7 rounded-lg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-56 sm:w-72" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-16 rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-20 rounded-full" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-48" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-11/12" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-full sm:w-2/3 rounded-lg" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border-c bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left border-collapse min-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border-c bg-surface-alt/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4 sm:px-6 w-1/3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-20" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-3 sm:px-4 w-1/6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-16" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4 sm:px-6 w-1/2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4 sm:px-6 w-12 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4 ml-auto" })
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border-c",
						children: Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border-c",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-4 sm:px-6 align-top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-36 sm:w-44" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-12 rounded-sm" })]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-3 sm:px-4 align-top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-24 rounded-full" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-4 sm:px-6 align-top",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4/5" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 px-4 sm:px-6 align-top text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4 ml-auto rounded-full" })
								})
							]
						}, idx))
					})]
				})
			})
		]
	});
};
/**
* IndustryPage
*
* Primary list page for Industry View (/industry).
* Presents the anchor company context and its ranked peer competitors.
*
* Features:
* - h1 "Industry View"
* - Subtitle "Competitors and peers for {anchor.company_name}"
* - "Demo data" badge displayed when source is fixtures mode
* - Slim AnchorSummary context bar with zero numbers
* - Semantic, accessible CompetitorTable sorted by overlap rank
* - Distinct handling of status: "ready" (with empty array), "none", "generating", "error"
*/
var IndustryPage = () => {
	const { data, isLoading, isFetching, isError, error, refetch } = useCompetitors();
	const shouldReduceMotion = useReducedMotion();
	const fadeInVariants = {
		hidden: {
			opacity: 0,
			y: shouldReduceMotion ? 0 : 6
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? .15 : .25,
				ease: [
					.16,
					1,
					.3,
					1
				]
			}
		}
	};
	const anchorName = data?.anchor?.companyName?.trim();
	const subtitle = anchorName ? `Competitors and peers for ${anchorName}` : "Competitors and peers";
	const isFixture = data?.isFixture ?? false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border-c pb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							id: "industry-heading",
							className: "font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary",
							children: "Industry View"
						}),
						isFixture && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-testid": "demo-data-badge",
							className: "inline-flex items-center gap-1.5 rounded-full bg-surface-alt border border-border-c px-2.5 py-0.5 text-xs font-semibold text-text-secondary select-none shadow-2xs",
							title: "Rendering local contract fixtures (VITE_INDUSTRY_DATA_SOURCE=fixtures)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
								className: "h-3 w-3 text-brand-primary",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Demo data" })]
						}),
						isFetching && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 text-xs font-medium text-brand-primary animate-pulse motion-reduce:animate-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								className: "h-3 w-3 animate-spin motion-reduce:animate-none",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refreshing…" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary leading-relaxed",
					children: subtitle
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 self-start shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => refetch(),
					disabled: isFetching,
					"aria-label": "Refresh competitor analysis",
					className: "gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: `h-3.5 w-3.5 ${isFetching ? "animate-spin motion-reduce:animate-none" : ""}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh" })]
				})
			})]
		}), isLoading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustrySkeleton, {}) : isError && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryErrorState, {
			error,
			onRetry: () => refetch(),
			isRetrying: isFetching
		}) : data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			variants: fadeInVariants,
			initial: "hidden",
			animate: "show",
			className: "space-y-6",
			children: [data.anchor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnchorSummary, { anchor: data.anchor }), data.status === "generating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryGeneratingState, {
				onRefresh: () => refetch(),
				isRefreshing: isFetching
			}) : data.status === "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryNoneState, {
				onRefresh: () => refetch(),
				isRefreshing: isFetching
			}) : data.status === "ready" && data.competitors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryEmptyState, {
				onRefresh: () => refetch(),
				isRefreshing: isFetching
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-labelledby": "industry-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompetitorTable, {
					competitors: data.competitors,
					generatedAt: data.generatedAt
				})
			})]
		}) : null]
	});
};
var SplitComponent = IndustryPage;
//#endregion
export { SplitComponent as component };
