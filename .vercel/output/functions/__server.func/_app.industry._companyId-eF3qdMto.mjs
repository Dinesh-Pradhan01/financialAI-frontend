import { o as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-BkRapwZn.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Cn as ChevronDown, Dn as ChartColumn, Mn as Building2, Ot as Layers, Sn as ChevronLeft, Tn as ChartPie, Y as RefreshCw, an as Copy, bn as ChevronUp, cn as Clock, jt as Info, rn as Database, tn as Download, v as TrendingUp, wn as Check } from "./_libs/lucide-react.mjs";
import { t as Button } from "./_ssr/button-Ct7_2QlC.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as useCompanyFinancials, n as buildFinancialTableViewModel, o as useCompetitors } from "./_ssr/useCompanyFinancials-Df2wMmnb.mjs";
import { t as Route } from "./_app.industry._companyId-BU1hDvJ2.mjs";
import { a as IndustryFinancialsUnavailableState, c as IndustryNotFoundState, i as IndustryErrorState, l as OverlapBadge, n as CompanyFinancialsSkeleton, t as AnnualUnavailablePanel } from "./_ssr/IndustryStates-DaNRiypi.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./_ssr/tabs-B4MsEiig.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.industry._companyId-eF3qdMto.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* AnchorBenchmarkStrip
*
* Persistent comparative benchmark context rendered at the top of the
* competitor financials view (/industry/$companyId).
*
* Resolves the primary heuristic gap (Recognition Rather Than Recall):
* Keeps the anchor tenant's operating identity, sector, and comparative alignment
* anchored on-screen so executives never have to retain baseline numbers in working memory.
*/
var AnchorBenchmarkStrip = ({ anchor, competitorName, ticker, overlapLevel, overlapRank, totalCompetitors, className }) => {
	const [copiedCin, setCopiedCin] = (0, import_react.useState)(false);
	const handleCopyCin = (0, import_react.useCallback)(() => {
		if (anchor?.cin && typeof navigator !== "undefined" && navigator.clipboard?.writeText) navigator.clipboard.writeText(anchor.cin).then(() => {
			setCopiedCin(true);
			setTimeout(() => setCopiedCin(false), 2e3);
		});
	}, [anchor?.cin]);
	if (!anchor) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		role: "region",
		"aria-label": "Comparative benchmark baseline",
		className: cn("rounded-xl border border-border-c bg-surface-alt/40 p-3.5 sm:p-4 shadow-2xs space-y-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start sm:items-center gap-2.5 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-border-c text-brand-primary shadow-2xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-wider text-text-tertiary",
							children: "Your Company · Benchmark Baseline"
						}), anchor.cin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 border-l border-border-c pl-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-text-tertiary select-all",
								children: ["CIN: ", anchor.cin]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleCopyCin,
								"aria-label": `Copy CIN ${anchor.cin}`,
								title: "Copy CIN to clipboard",
								className: "inline-flex items-center rounded px-1 py-0.5 text-xs text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer",
								children: copiedCin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "h-3 w-3 text-severity-low",
									"aria-hidden": "true"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									className: "h-3 w-3",
									"aria-hidden": "true"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-bold text-text-primary truncate",
						children: anchor.companyName
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0",
				children: [overlapLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlapBadge, { level: overlapLevel }), overlapRank != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center rounded-full bg-surface border border-border-c px-2.5 py-0.5 text-xs font-medium text-text-secondary",
					children: [
						"Rank #",
						overlapRank,
						totalCompetitors ? ` of ${totalCompetitors}` : ""
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border-c/60 pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-text-secondary leading-relaxed",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-1.5 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
					className: "h-3.5 w-3.5 shrink-0 text-text-tertiary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Benchmarking ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-text-primary font-medium",
						children: competitorName
					}),
					ticker ? ` (${ticker})` : "",
					" against your baseline in",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-text-primary",
						children: anchor.industry
					}),
					"."
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-text-tertiary shrink-0",
				children: anchor.listingStatus === "unlisted" ? "Anchor is unlisted private entity" : "Anchor company"
			})]
		})]
	});
};
/**
* KeyMetricCards
*
* Renders the 4 key institutional financial metric cards:
* 1. TTM Revenue
* 2. Latest Quarter Revenue
* 3. Expenditure / Revenue
* 4. Net Profit Margin
*/
/**
* Returns formatted display value and accessible caption for a key metric card.
*
* Rules:
* - If value is null: shows em dash ("—") and caption "Not available".
* - Never shows 0 for unknown.
* - Formatted with currency (INR crore) or percentage.
* - Plain English basis captions (e.g. "Last four quarters, rolled up").
*/
function getMetricDisplay(metric) {
	if (metric.numericValue === null || Number.isNaN(metric.numericValue)) return {
		displayValue: "—",
		caption: "Not available"
	};
	let displayValue;
	if (metric.isPercentage) displayValue = metric.formattedValue;
	else displayValue = `₹${metric.formattedValue} Cr.`;
	let caption;
	if (metric.id === "ttm_revenue") if (metric.basis === "rolled_up" || metric.basis === "rolled_up_4q") caption = "Last four quarters, rolled up";
	else if (metric.basis === "reported") caption = metric.periodLabel ? `${metric.periodLabel} (Reported)` : "Audited reported";
	else caption = metric.periodLabel ?? "Trailing Twelve Months";
	else if (metric.id === "latest_quarter_revenue") caption = metric.periodLabel ? `${metric.periodLabel} (Reported)` : "Latest reported quarter";
	else if (metric.id === "expenditure_to_revenue_pct") caption = metric.periodLabel ? `${metric.periodLabel} · Operating efficiency` : "Operating efficiency ratio";
	else if (metric.id === "net_profit_margin_pct") caption = metric.periodLabel ? `${metric.periodLabel} · Net profit margin` : "Net profit margin";
	else caption = metric.periodLabel ?? "";
	return {
		displayValue,
		caption
	};
}
var METRIC_ICONS = {
	ttm_revenue: ChartColumn,
	latest_quarter_revenue: Clock,
	expenditure_to_revenue_pct: ChartPie,
	net_profit_margin_pct: TrendingUp
};
var KeyMetricCards = import_react.memo(function KeyMetricCards({ metrics, className }) {
	const cards = [
		metrics.ttmRevenue,
		metrics.latestQuarterRevenue,
		metrics.expenditureToRevenue,
		metrics.netProfitMargin
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "key-metrics-heading",
		className: cn("space-y-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "key-metrics-heading",
			className: "text-xs font-semibold uppercase tracking-wider text-text-tertiary",
			children: "Key Financial Metrics"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
			children: cards.map((card) => {
				const { displayValue, caption } = getMetricDisplay(card);
				const Icon = METRIC_ICONS[card.id] ?? ChartColumn;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded-xl border border-border-c bg-surface p-4 sm:p-5 shadow-2xs space-y-2 hover:shadow-xs hover:border-border-c/80 transition-all duration-200 ease-out motion-reduce:transition-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-text-tertiary truncate",
								children: card.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-alt border border-border-c/60 text-text-tertiary",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono tabular-nums text-xl sm:text-2xl font-bold text-text-primary tracking-tight",
							children: displayValue
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary leading-normal",
							children: caption
						})
					]
				}, card.id);
			})
		})]
	});
});
/**
* PeriodTabs
*
* Accessible tab switcher for Quarterly vs Annual financials.
* Reuses shared Tabs component backed by Radix UI:
* - WAI-ARIA role="tablist"
* - Roving tabindex
* - Arrow-key navigation & Home/End support
* - State synchronized with the URL search param (?view=quarterly|annual)
*/
var PeriodTabs = import_react.memo(function PeriodTabs({ value, onValueChange, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center justify-between", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
			value,
			onValueChange: (val) => onValueChange(val),
			className: "w-full sm:w-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "grid grid-cols-2 w-full sm:w-64 bg-surface-alt border border-border-c p-1 rounded-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "quarterly",
					className: "text-xs font-semibold data-[state=active]:bg-surface data-[state=active]:text-text-primary data-[state=active]:shadow-2xs rounded-md",
					children: "Quarterly"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "annual",
					className: "text-xs font-semibold data-[state=active]:bg-surface data-[state=active]:text-text-primary data-[state=active]:shadow-2xs rounded-md",
					children: "Annual"
				})]
			})
		})
	});
});
/**
* Generates an Excel-friendly CSV with UTF-8 BOM.
*/
function generateFinancialsCSV(periodLabels, rows) {
	return "﻿" + [["Metric", ...periodLabels].map((h) => `"${h.replace(/"/g, "\"\"")}"`).join(","), ...rows.map((r) => {
		return [`"${r.label.replace(/"/g, "\"\"")}"`, ...periodLabels.map((p) => {
			return `"${(r.valuesByPeriod[p] ?? "—").replace(/"/g, "\"\"")}"`;
		})].join(",");
	})].join("\r\n");
}
/**
* Generates tab-separated values (TSV) for direct paste into Excel or Google Sheets.
*/
function generateFinancialsTSV(periodLabels, rows) {
	return [["Metric", ...periodLabels].join("	"), ...rows.map((r) => {
		return [r.label, ...periodLabels.map((p) => r.valuesByPeriod[p] ?? "—")].join("	");
	})].join("\r\n");
}
/**
* FinancialsTable
*
* Institutional financial statement data table.
*
* Requirements:
* - Caption: "₹ in crore"
* - First column (metric label) is sticky on horizontal scroll.
* - Header row uses design system token colors.
* - Latest 5 periods shown by default with a "Show all N periods" toggle.
* - Right-aligned tabular numerals (font-mono tabular-nums).
* - Rows driven by FINANCIAL_TABLE_ROW_CONFIGS.
* - Rows null across all shown periods are hidden, and a footnote lists them:
*   "Not reported in the available data: Other income, Interest"
* - Costs display as positive numbers via DISPLAY_COSTS_AS_POSITIVE.
* - Annual basis ("Reported" / "Rolled up from quarters") shown per column header and legend.
* - Institutional utilities: Export to CSV and Copy Table (TSV) for spreadsheets.
* - Accessible scroll container region with keyboard navigation support.
*/
var FinancialsTable = import_react.memo(function FinancialsTable({ periods, isAnnual = false, companyName, className }) {
	const totalPeriodsCount = periods.length;
	const hasMoreThanFive = totalPeriodsCount > 5;
	const [showAllPeriods, setShowAllPeriods] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const tableData = (0, import_react.useMemo)(() => {
		return buildFinancialTableViewModel(periods, { maxPeriods: showAllPeriods ? 0 : 5 });
	}, [periods, showAllPeriods]);
	const periodBasisMap = (0, import_react.useMemo)(() => {
		const map = {};
		for (const p of periods) map[p.period_label] = "basis" in p && p.basis ? p.basis : null;
		return map;
	}, [periods]);
	const handleCopyTable = (0, import_react.useCallback)(() => {
		const tsv = generateFinancialsTSV(tableData.periodLabels, tableData.rows);
		if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) navigator.clipboard.writeText(tsv).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		});
	}, [tableData]);
	const handleExportCSV = (0, import_react.useCallback)(() => {
		const csv = generateFinancialsCSV(tableData.periodLabels, tableData.rows);
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${(companyName || "financials").replace(/[^a-zA-Z0-9_-]/g, "_")}_${isAnnual ? "annual" : "quarterly"}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, [
		tableData,
		isAnnual,
		companyName
	]);
	if (totalPeriodsCount === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border-c bg-surface p-8 text-center text-xs text-text-secondary",
		children: "No financial statement periods are available for this company."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-text-tertiary",
					children: ["Denomination: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-text-secondary",
						children: "₹ in crore"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: handleCopyTable,
						"aria-label": "Copy table data to clipboard for Excel or Google Sheets",
						className: "gap-1.5 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
						children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "h-3.5 w-3.5 text-severity-low",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copied!" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							className: "h-3.5 w-3.5 text-text-tertiary",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy Table" })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: handleExportCSV,
						"aria-label": "Export financial statement table as CSV",
						className: "gap-1.5 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							className: "h-3.5 w-3.5 text-text-tertiary",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export CSV" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				tabIndex: 0,
				role: "region",
				"aria-label": "Financial statements table",
				className: "overflow-x-auto rounded-xl border border-border-c bg-surface shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left border-collapse min-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
							className: "py-2.5 px-4 text-left text-xs font-semibold text-text-tertiary border-b border-border-c bg-surface-alt/30",
							children: "Financial statements (₹ in crore)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border-c bg-surface-alt/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "sticky left-0 z-20 bg-surface-alt/90 backdrop-blur-xs py-3 px-4 sm:px-6 text-xs font-semibold uppercase tracking-wider text-text-secondary text-left border-r border-border-c w-56 sm:w-64 shrink-0 shadow-xs",
								children: "Metric"
							}), tableData.periodLabels.map((periodLabel) => {
								const basis = isAnnual ? periodBasisMap[periodLabel] : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "py-3 px-4 text-xs font-semibold text-text-secondary text-right whitespace-nowrap min-w-32",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-end gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-text-primary text-xs tracking-tight",
											children: periodLabel
										}), basis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase font-mono tracking-wider text-text-tertiary",
											children: basis === "reported" ? "Reported" : "Rolled up"
										})]
									})
								}, periodLabel);
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border-c",
							children: tableData.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: cn("group transition-colors motion-reduce:transition-none hover:bg-surface-alt/40", row.isPercentage ? "bg-surface-alt/10" : ""),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "row",
									className: cn("sticky left-0 z-10 py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-text-primary text-left border-r border-border-c whitespace-nowrap shadow-xs transition-colors motion-reduce:transition-none group-hover:bg-surface-alt/40", row.isPercentage ? "bg-surface-alt/10" : "bg-surface"),
									children: row.label
								}), tableData.periodLabels.map((periodLabel) => {
									const formatted = row.valuesByPeriod[periodLabel] ?? "—";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("py-3 px-4 font-mono tabular-nums text-xs sm:text-sm text-right whitespace-nowrap", formatted === "—" ? "text-text-tertiary" : "text-text-primary"),
										children: formatted
									}, periodLabel);
								})]
							}, row.key))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 pt-1 text-xs text-text-tertiary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [tableData.hiddenRowNames.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 text-text-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							className: "h-3.5 w-3.5 shrink-0 text-text-tertiary",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Not reported in the available data:" }),
							" ",
							tableData.hiddenRowNames.join(", ")
						] })]
					}), isAnnual && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-text-tertiary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-text-secondary",
							children: "Reported:"
						}), " Audited reported figures"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-text-secondary",
							children: "Rolled up:"
						}), " Computed sum of 4 quarters"] })]
					})]
				}), hasMoreThanFive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "self-start sm:self-auto shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => setShowAllPeriods((prev) => !prev),
						className: "gap-1.5 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
						children: showAllPeriods ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Show latest 5 periods" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Show all ",
							totalPeriodsCount,
							" periods"
						] })] })
					})
				})]
			})
		]
	});
});
/**
* Formats ISO date into short month and year (e.g. "Jun 2026").
*/
function formatAsOfDate(asOf) {
	if (!asOf) return null;
	try {
		const d = new Date(asOf);
		if (Number.isNaN(d.getTime())) return asOf;
		return new Intl.DateTimeFormat("en-IN", {
			month: "short",
			year: "numeric"
		}).format(d);
	} catch {
		return asOf;
	}
}
/**
* CompanyFinancialsPage
*
* Detailed financials view for a single peer competitor (/industry/$companyId).
*
* Features:
* - Breadcrumb / back link "Industry View"
* - Focus management: focus moves to h1 on page arrival
* - h1 with company name and ticker
* - OverlapBadge
* - Metadata line (latest period, as of date, source, fiscal year-end note)
* - "Demo data" badge when source is fixtures mode
* - 4 Key Financial Metric Cards (INR crore or %, plain-word basis, em dash for nulls, no 0s)
* - Accessible PeriodTabs (Quarterly | Annual, URL-synced)
* - FinancialsTable with sticky first column, positive costs, window toggle, and null footnotes
* - Annual tab unavailable explanatory panel
* - Financials unavailable state (e.g. Allied Digital)
* - NotFound state for unknown IDs or 404s
* - Heading order: h1 -> h2 (no skips)
*/
var CompanyFinancialsPage = ({ companyId, activeView = "quarterly", onViewChange, className }) => {
	const h1Ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		h1Ref.current?.focus();
	}, [companyId]);
	const { data: competitorsData, isLoading: isCompetitorsLoading, isError: isCompetitorsError } = useCompetitors();
	const matchedCompetitor = competitorsData?.competitors.find((c) => c.companyId === companyId);
	const { data, isLoading: isFinancialsLoading, isFetching, isError: isFinancialsError, error, refetch } = useCompanyFinancials(companyId, {
		companyName: matchedCompetitor?.companyName,
		ticker: matchedCompetitor?.ticker,
		overlapLevel: matchedCompetitor?.overlapLevel,
		overlapSummary: matchedCompetitor?.overlapSummary
	});
	const isLoading = isCompetitorsLoading && !competitorsData || isFinancialsLoading && !data;
	if (!isCompetitorsLoading && competitorsData && !matchedCompetitor || error?.status === 404 || error?.kind === "not_found") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Breadcrumb",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/industry",
				className: "inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: "h-4 w-4",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Industry View" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryNotFoundState, { companyId })]
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyFinancialsSkeleton, {})
	});
	if (isFinancialsError && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Breadcrumb",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/industry",
				className: "inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: "h-4 w-4",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Industry View" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryErrorState, {
			error,
			onRetry: () => refetch(),
			isRetrying: isFetching
		})]
	});
	if (!data) return null;
	if (data.financialStatus === "unavailable") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Breadcrumb",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/industry",
					className: "inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Industry View" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border-c pb-5 space-y-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						ref: h1Ref,
						tabIndex: -1,
						className: "font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary focus:outline-none",
						children: data.companyName ?? matchedCompetitor?.companyName ?? `Company #${companyId}`
					}), data.overlapLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlapBadge, { level: data.overlapLevel })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustryFinancialsUnavailableState, {
				companyName: data.companyName ?? matchedCompetitor?.companyName,
				reasonDisplay: data.reasonDisplay
			})
		]
	});
	const asOfFormatted = formatAsOfDate(data.asOf);
	const metaParts = [];
	if (data.latestPeriod) metaParts.push(`Latest period ${data.latestPeriod}`);
	if (asOfFormatted) metaParts.push(`Data as of ${asOfFormatted}`);
	if (data.meta.source) metaParts.push(`Source: ${data.meta.source}`);
	if (data.meta.fiscal_year_end_assumed) metaParts.push("Fiscal year-end assumed March");
	const metaLine = metaParts.join(" · ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("w-full max-w-7xl mx-auto space-y-7 p-4 md:p-6 pb-24", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Breadcrumb",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/industry",
					className: "inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						className: "h-4 w-4 transition-transform motion-reduce:transition-none group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Industry View" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border-c pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								ref: h1Ref,
								tabIndex: -1,
								className: "font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary focus:outline-none",
								children: [data.companyName ?? `Company #${companyId}`, data.ticker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-2 font-mono text-base sm:text-lg font-medium text-text-tertiary",
									children: [
										"(",
										data.ticker,
										")"
									]
								})]
							}),
							data.overlapLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlapBadge, { level: data.overlapLevel }),
							data.isFixture && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-testid": "demo-data-badge",
								className: "inline-flex items-center gap-1.5 rounded-full bg-surface-alt border border-border-c px-2.5 py-0.5 text-xs font-semibold text-text-secondary select-none shadow-2xs",
								title: "Rendering contract fixtures (VITE_INDUSTRY_DATA_SOURCE=fixtures)",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
									className: "h-3 w-3 text-brand-primary",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Demo data" })]
							}),
							isFetching && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 text-xs font-medium text-brand-primary animate-pulse motion-reduce:animate-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
									className: "h-3 w-3 animate-spin motion-reduce:animate-none",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refreshing…" })]
							})
						]
					}), metaLine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary leading-relaxed",
						children: metaLine
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "self-start shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => refetch(),
						disabled: isFetching,
						className: "gap-2 cursor-pointer text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: `h-3.5 w-3.5 ${isFetching ? "animate-spin motion-reduce:animate-none" : ""}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh" })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnchorBenchmarkStrip, {
				anchor: competitorsData?.anchor,
				competitorName: data.companyName ?? matchedCompetitor?.companyName ?? `Company #${companyId}`,
				ticker: data.ticker ?? matchedCompetitor?.ticker,
				overlapLevel: data.overlapLevel ?? matchedCompetitor?.overlapLevel,
				overlapRank: matchedCompetitor?.overlapRank,
				totalCompetitors: competitorsData?.competitors.length
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyMetricCards, { metrics: data.keyMetrics }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "financial-statements-heading",
				className: "space-y-4 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-c pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "financial-statements-heading",
						className: "text-xs font-semibold uppercase tracking-wider text-text-tertiary",
						children: "Financial Statements"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodTabs, {
						value: activeView,
						onValueChange: (newView) => {
							if (onViewChange) onViewChange(newView);
						}
					})]
				}), activeView === "quarterly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialsTable, {
					periods: data.rawQuarterlyPeriods,
					isAnnual: false,
					companyName: data.companyName ?? matchedCompetitor?.companyName
				}) : data.annualStatus === "unavailable" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnualUnavailablePanel, { reasonDisplay: data.reasonDisplay }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialsTable, {
					periods: data.rawAnnualPeriods,
					isAnnual: true,
					companyName: data.companyName ?? matchedCompetitor?.companyName
				})]
			})
		]
	});
};
function CompanyFinancialsRouteComponent() {
	const { companyId } = Route.useParams();
	const search = Route.useSearch();
	const navigate = useNavigate();
	const handleViewChange = (newView) => {
		navigate({
			to: "/industry/$companyId",
			params: { companyId },
			search: {
				...search,
				view: newView
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyFinancialsPage, {
		companyId: Number(companyId),
		activeView: search.view ?? "quarterly",
		onViewChange: handleViewChange
	});
}
//#endregion
export { CompanyFinancialsRouteComponent as component };
