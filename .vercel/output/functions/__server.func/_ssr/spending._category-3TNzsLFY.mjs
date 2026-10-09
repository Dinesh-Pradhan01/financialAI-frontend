import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Kn as ArrowLeft, X as Receipt, Y as RefreshCw, _n as CircleAlert } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as useAppSelector } from "./store-i6pKH_iX.mjs";
import { s as selectTimeframe } from "./selectors-CqEsKQIY.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { t as formatINR } from "./format-B9luOE0k.mjs";
import { t as IconChip } from "./icons-2Ya6Jeu5.mjs";
import { t as Route } from "./spending._category-_vx1l2jU.mjs";
import { i as useTransactions } from "./useTransactions-BPeTaBzA.mjs";
import { c as isExpense, i as cleanMerchantName, o as getCategoryIconKey, s as getDateRangeForTimeframe, t as aggregateByCategory } from "./aggregate-CgEIa98b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spending._category-3TNzsLFY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryDetail() {
	const { category } = Route.useParams();
	const timeframe = useAppSelector(selectTimeframe);
	const { date_from, date_to } = (0, import_react.useMemo)(() => getDateRangeForTimeframe(timeframe), [timeframe]);
	const { data, isLoading, isError, error, refetch } = useTransactions({
		date_from,
		date_to,
		classification: "expense",
		limit: 1e3
	});
	const allTransactions = data?.transactions ?? [];
	const categories = (0, import_react.useMemo)(() => aggregateByCategory(allTransactions), [allTransactions]);
	const cat = (0, import_react.useMemo)(() => categories.find((c) => c.id.toLowerCase() === category.toLowerCase() || c.label.toLowerCase() === category.toLowerCase()), [categories, category]);
	const txns = (0, import_react.useMemo)(() => allTransactions.filter((t) => {
		if (!isExpense(t)) return false;
		return getCategoryIconKey(t.category).toLowerCase() === category.toLowerCase() || t.category.toLowerCase() === category.toLowerCase();
	}), [allTransactions, category]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-6 md:px-10 max-w-4xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-24" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-12 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-28" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-spot divide-y divide-border/60 p-2",
				children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-32" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-20" })]
				}, i))
			})
		]
	});
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-12 max-w-lg mx-auto text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold text-foreground",
				children: "Failed to Load Category Details"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-secondary mt-1",
				children: error instanceof Error ? error.message : "Unable to fetch category transactions."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => refetch(),
				variant: "outline",
				className: "mt-4 inline-flex items-center gap-2 rounded-xl text-xs font-semibold cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), " Retry"]
			})
		]
	});
	if (!cat && txns.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary mb-4 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-8 w-8 text-brand" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-bold text-foreground",
				children: "Category Not Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-text-secondary leading-relaxed",
				children: [
					"The spending category",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
						className: "rounded bg-surface-alt px-1.5 py-0.5 font-mono text-xs text-brand font-semibold",
						children: [
							"\"",
							category,
							"\""
						]
					}),
					" ",
					"has no recorded transactions in the selected ",
					timeframe,
					" window."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/spending",
					className: "inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-brand hover:opacity-95 transition cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to Spending Overview"]
				})
			})
		]
	});
	const categoryLabel = cat?.label ?? category.charAt(0).toUpperCase() + category.slice(1);
	const categoryTotal = cat?.amount ?? txns.reduce((sum, t) => sum + (Number(t.debit_amount) || 0), 0);
	const categoryShare = cat?.share ?? 0;
	const categoryIconKey = cat?.id ?? getCategoryIconKey(category);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-6 md:px-10 max-w-5xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/spending",
				className: "inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-foreground transition-colors mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Spending Overview"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-2 flex items-center gap-4 bg-surface p-6 rounded-2xl border border-border/80 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconChip, {
					keyName: categoryIconKey,
					size: "lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold",
								children: categoryLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[0.65rem] font-medium text-text-secondary px-2 py-0.5 rounded-pill bg-surface-alt border border-border/60",
								children: [timeframe, " Range"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-num text-2xl font-bold text-foreground",
							children: formatINR(categoryTotal)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-text-secondary mt-0.5",
							children: [
								categoryShare,
								"% of all spend · ",
								txns.length,
								" ",
								txns.length === 1 ? "transaction" : "transactions"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: "Transaction Ledger"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-text-secondary",
						children: [txns.length, " records"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-spot divide-y divide-border/60 overflow-hidden",
					children: txns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-8 text-center text-sm text-text-secondary",
						children: "No individual transactions found for this category in the selected timeframe."
					}) : txns.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-surface-alt/40 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold truncate text-foreground",
								children: cleanMerchantName(t.narration)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-secondary truncate mt-0.5",
								children: [
									t.transaction_date,
									" · ",
									t.narration
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-num text-sm font-bold text-foreground",
								children: formatINR(t.debit_amount)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.65rem] font-medium text-text-secondary",
								children: t.reference_number || t.utr_upi_ref || "Direct Debit"
							})]
						})]
					}, t.id))
				})]
			})
		]
	});
}
//#endregion
export { CategoryDetail as component };
