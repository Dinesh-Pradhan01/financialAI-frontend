import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { At as Landmark, On as Calendar, _ as TriangleAlert, gn as CircleCheck, rt as Pen, w as Tag, wn as Check, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { t as formatINR } from "./format-B9luOE0k.mjs";
import { a as useUpdateTransaction, t as useExtractedStatement } from "./useTransactions-BPeTaBzA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatementDetail-CoZd9aW0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COMMON_CATEGORIES = [
	"Software & SaaS",
	"Airlines & Travel",
	"Fuel & Transport",
	"Payroll & Salaries",
	"Utilities & Rent",
	"Marketing & Ads",
	"Professional Fees",
	"Office Supplies",
	"Food & Dining",
	"General Expenses"
];
function StatementDetail({ documentId, onClose }) {
	const { data, isLoading, isError, error } = useExtractedStatement(documentId);
	const updateMutation = useUpdateTransaction(documentId ?? void 0);
	const [editingTxId, setEditingTxId] = (0, import_react.useState)(null);
	const [editCategory, setEditCategory] = (0, import_react.useState)("");
	const [editClassification, setEditClassification] = (0, import_react.useState)("expense");
	const startEdit = (tx) => {
		setEditingTxId(tx.id);
		setEditCategory(tx.category || "General Expenses");
		setEditClassification(tx.classification || "expense");
	};
	const handleSave = async (txId) => {
		try {
			await updateMutation.mutateAsync({
				transactionId: txId,
				data: {
					category: editCategory.trim() || "General Expenses",
					classification: editClassification
				}
			});
			toast.success("Transaction updated successfully");
			setEditingTxId(null);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update transaction");
		}
	};
	const doc = data?.document;
	const account = data?.account;
	const stmtData = data?.bank_statement_data;
	const transactions = data?.transactions ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(documentId),
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden bg-background border border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "p-6 border-b border-border bg-surface/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "font-display text-lg font-bold text-foreground",
								children: doc?.original_name || doc?.filename || "Statement Ledger"
							}),
							doc?.status === "COMPLETED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-pill bg-success/10 text-success px-2 py-0.5 text-[0.65rem] font-semibold border border-success/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Extracted"]
							}),
							doc?.status === "PROCESSING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-pill bg-brand/10 text-brand px-2 py-0.5 text-[0.65rem] font-semibold border border-brand/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), " Processing"]
							}),
							doc?.status === "FAILED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-pill bg-destructive/10 text-destructive px-2 py-0.5 text-[0.65rem] font-semibold border border-destructive/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }), " Failed"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-text-secondary mt-1",
						children: "Parsed document metadata and extracted transactional ledger."
					})] }), stmtData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-right bg-surface px-3 py-1.5 rounded-xl border border-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.65rem] text-text-secondary",
								children: "Opening Bal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-num text-xs font-bold text-foreground",
								children: formatINR(stmtData.opening_balance)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-px bg-border/80" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.65rem] text-text-secondary",
								children: "Closing Bal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-num text-xs font-bold text-foreground",
								children: formatINR(stmtData.closing_balance)
							})] })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-border/40 text-xs text-text-secondary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 font-medium text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-3.5 w-3.5 text-brand" }),
								account?.bank_name || "Unknown Bank",
								" (••••",
								account?.account_number ? account.account_number.slice(-4) : "••••",
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "capitalize",
							children: account?.account_type || "Current Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), stmtData?.statement_period || stmtData?.statement_month || "Full Period"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground font-num",
							children: [transactions.length, " Transactions"]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-6",
				children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-3 border border-border/60 rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-32" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-20" })]
						}, i))
					}),
					isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-8 text-center border border-destructive/20 rounded-xl bg-destructive/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6 text-destructive mx-auto mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: "Failed to load extracted statement"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-secondary mt-1",
								children: error instanceof Error ? error.message : "Document details could not be retrieved."
							})
						]
					}),
					!isLoading && !isError && transactions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-12 text-center border border-dashed border-border rounded-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-foreground",
							children: "No extracted transactions found"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary mt-1",
							children: "This document may still be processing or contained no parseable rows."
						})]
					}),
					!isLoading && !isError && transactions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border border-border rounded-xl overflow-x-auto shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[680px] text-left text-xs border-collapse",
							"aria-label": "Extracted transactions ledger",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "bg-surface-alt/70 border-b border-border text-text-secondary uppercase text-[0.65rem] tracking-wider font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "py-2.5 px-3",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "py-2.5 px-3",
										children: "Narration & Ref"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "py-2.5 px-3",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "py-2.5 px-3",
										children: "Class"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "py-2.5 px-3 text-right",
										children: "Debit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "py-2.5 px-3 text-right",
										children: "Credit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "py-2.5 px-3 text-right",
										children: "Balance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "py-2.5 px-3 text-center",
										children: "Action"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/60 bg-surface",
								children: transactions.map((tx) => {
									const isEditing = editingTxId === tx.id;
									const isDebit = Number(tx.debit_amount) > 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: cn("hover:bg-surface-alt/40 transition-colors", isEditing && "bg-brand/5"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 whitespace-nowrap font-num text-text-secondary",
												children: tx.transaction_date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 px-3 max-w-[200px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium text-foreground truncate",
													title: tx.narration,
													children: tx.narration
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[0.65rem] text-text-secondary truncate mt-0.5",
													children: tx.reference_number || tx.utr_upi_ref || tx.cheque_number || "—"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 px-3 whitespace-nowrap",
												children: [isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: editCategory,
													onChange: (e) => setEditCategory(e.target.value),
													list: `cat-options-${tx.id}`,
													"aria-label": "Edit category for transaction",
													className: "h-7 w-32 rounded border border-border px-2 text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-brand"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-pill bg-surface-alt border border-border px-2 py-0.5 text-[0.65rem] font-medium text-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-2.5 w-2.5 text-text-secondary" }), tx.category || "General"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
													id: `cat-options-${tx.id}`,
													children: COMMON_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c }, c))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 whitespace-nowrap",
												children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: editClassification,
													onChange: (e) => setEditClassification(e.target.value),
													"aria-label": "Edit classification for transaction",
													className: "h-7 rounded border border-border px-1.5 text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-brand",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "expense",
															children: "expense"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "income",
															children: "income"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "transfer",
															children: "transfer"
														})
													]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("capitalize text-[0.65rem] font-semibold px-2 py-0.5 rounded-pill", tx.classification === "expense" ? "text-danger bg-danger/10" : tx.classification === "income" ? "text-success bg-success/10" : "text-brand bg-brand/10"),
													children: tx.classification || "expense"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 whitespace-nowrap text-right font-num font-semibold text-danger",
												children: isDebit ? formatINR(tx.debit_amount) : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 whitespace-nowrap text-right font-num font-semibold text-success",
												children: Number(tx.credit_amount) > 0 ? formatINR(tx.credit_amount) : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 whitespace-nowrap text-right font-num text-text-secondary",
												children: formatINR(tx.running_balance)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 px-3 whitespace-nowrap text-center",
												children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleSave(tx.id),
													disabled: updateMutation.isPending,
													className: "relative inline-flex items-center justify-center h-8 w-8 sm:h-7 sm:w-7 rounded-lg bg-brand text-white hover:opacity-90 transition cursor-pointer before:absolute before:-inset-1.5 before:content-['']",
													title: "Save changes",
													"aria-label": "Save transaction changes",
													children: updateMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 sm:h-3.5 sm:w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 sm:h-3.5 sm:w-3.5" })
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => startEdit(tx),
													className: "relative inline-flex items-center justify-center h-8 w-8 sm:h-7 sm:w-7 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-alt transition cursor-pointer before:absolute before:-inset-1.5 before:content-['']",
													title: "Edit category/classification",
													"aria-label": `Edit transaction from ${tx.transaction_date}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4 sm:h-3.5 sm:w-3.5" })
												})
											})
										]
									}, tx.id);
								})
							})]
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { StatementDetail as t };
