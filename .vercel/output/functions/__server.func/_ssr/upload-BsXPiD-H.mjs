import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Gt as FileSearch, Kn as ArrowLeft, R as ShieldCheck, Y as RefreshCw, _n as CircleAlert, b as Trash2, cn as Clock, gn as CircleCheck, m as Upload, wt as LoaderCircle, xn as ChevronRight } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as queryKeys } from "./queryKeys-DHNOxYVt.mjs";
import { n as isDuplicateError, t as getApiErrorMessage } from "./apiError-ooqyfQTr.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-D6uS5Rlr.mjs";
import { t as StatementDetail } from "./StatementDetail-CoZd9aW0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-BsXPiD-H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useStatements = () => {
	return useQuery({
		queryKey: queryKeys.statements.all(),
		queryFn: async () => {
			try {
				return await api.get("/api/statements");
			} catch (err) {
				const maybeError = err;
				if (maybeError?.response?.status === 404 || maybeError?.status === 404) return await api.get("/api/transactions/documents");
				throw err;
			}
		},
		staleTime: 300 * 1e3
	});
};
function ExtractionHub({ personId, documents, onDocumentsChange }) {
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [extractedCache, setExtractedCache] = (0, import_react.useState)({});
	const [selectedDocumentId, setSelectedDocumentId] = (0, import_react.useState)(null);
	const [documentToDelete, setDocumentToDelete] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const processing = documents.filter((d) => d.status === "PENDING" || d.status === "PROCESSING");
		if (processing.length === 0) return;
		let isMounted = true;
		const interval = setInterval(async () => {
			await Promise.allSettled(processing.map(async (doc) => {
				try {
					const res = await api.get(`/api/statements/${doc.id}/status`);
					if (res && res.status !== doc.status) {}
				} catch {}
			}));
			if (isMounted) onDocumentsChange();
		}, 2500);
		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, [documents, onDocumentsChange]);
	(0, import_react.useEffect)(() => {
		const completed = documents.filter((d) => d.status === "COMPLETED" && !extractedCache[d.id]);
		if (completed.length === 0) return;
		let isMounted = true;
		Promise.allSettled(completed.map(async (doc) => {
			return {
				doc,
				data: await api.get(`/api/statements/${doc.id}/extracted`)
			};
		})).then((results) => {
			if (!isMounted) return;
			const successfulUpdates = {};
			const failedDocs = [];
			results.forEach((result, idx) => {
				if (result.status === "fulfilled") successfulUpdates[result.value.doc.id] = result.value.data;
				else failedDocs.push(completed[idx].original_name);
			});
			if (Object.keys(successfulUpdates).length > 0) setExtractedCache((prev) => ({
				...prev,
				...successfulUpdates
			}));
			if (failedDocs.length > 0) toast.warning("Could not load extraction details", { description: `Failed to retrieve data for: ${failedDocs.join(", ")}` });
		});
		return () => {
			isMounted = false;
		};
	}, [documents, extractedCache]);
	const handleUpload = (0, import_react.useCallback)(async (files) => {
		const fileArr = Array.from(files);
		if (fileArr.length === 0) return;
		setUploading(true);
		let successCount = 0;
		let duplicateCount = 0;
		let errorCount = 0;
		if (fileArr.length > 1) try {
			const formData = new FormData();
			fileArr.forEach((file) => formData.append("files", file));
			if (personId) formData.append("person_id", personId);
			const url = personId ? `/api/statements/upload/bulk?person_id=${personId}` : "/api/statements/upload/bulk";
			await api.upload(url, formData);
			toast.success(`${fileArr.length} statements uploaded successfully!`);
			onDocumentsChange();
			setUploading(false);
			return;
		} catch (bulkErr) {
			console.warn("Bulk upload fallback to individual uploads:", bulkErr);
		}
		for (const file of fileArr) try {
			const formData = new FormData();
			formData.append("file", file);
			if (personId) formData.append("person_id", personId);
			const url = personId ? `/api/statements/upload?person_id=${personId}` : "/api/statements/upload";
			await api.upload(url, formData);
			successCount++;
		} catch (err) {
			if (isDuplicateError(err)) {
				duplicateCount++;
				toast.warning(`Document Already Uploaded`, { description: `"${file.name}" has already been processed previously.` });
			} else {
				errorCount++;
				toast.error(`${file.name}: ${getApiErrorMessage(err, "Upload failed")}`);
			}
		}
		if (successCount > 0) {
			toast.success(`${successCount} statement${successCount > 1 ? "s" : ""} uploaded & queued for extraction!`);
			onDocumentsChange();
		}
		if (errorCount > 0 && successCount === 0 && duplicateCount === 0) toast.error("Upload failed. Please try again with a valid PDF.");
		setUploading(false);
	}, [personId, onDocumentsChange]);
	const handleDrop = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		setDragging(false);
		handleUpload(e.dataTransfer.files);
	}, [handleUpload]);
	const handleFileSelect = (0, import_react.useCallback)((e) => {
		if (e.target.files) {
			handleUpload(e.target.files);
			e.target.value = "";
		}
	}, [handleUpload]);
	const handleDelete = (0, import_react.useCallback)(async (docId) => {
		try {
			await api.delete(`/api/statements/${docId}`);
			toast.success("Statement deleted.");
			onDocumentsChange();
			setExtractedCache((prev) => {
				const next = { ...prev };
				delete next[docId];
				return next;
			});
		} catch {
			toast.error("Failed to delete statement.");
		}
	}, [onDocumentsChange]);
	const completedDocs = documents.filter((d) => d.status === "COMPLETED");
	const processingDocs = documents.filter((d) => d.status === "PENDING" || d.status === "PROCESSING");
	const failedDocs = documents.filter((d) => d.status === "FAILED");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-spot overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 font-display text-base font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-on-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { className: "h-3.5 w-3.5" })
					}), "Document Extraction"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [documents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-pill bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand",
						children: [completedDocs.length, " extracted"]
					}), processingDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-pill bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
							processingDocs.length,
							" processing"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDragging(true);
						},
						onDragLeave: () => setDragging(false),
						onDrop: handleDrop,
						className: cn("flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200", dragging ? "border-brand bg-brand/5 ring-2 ring-brand/30 scale-[1.01]" : "border-border hover:border-brand/40 hover:bg-surface-alt/50", uploading && "pointer-events-none opacity-60"),
						children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-10 w-10 animate-spin text-brand" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-text-primary",
								children: "Processing statement…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-secondary",
								children: "AI is extracting bank data"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl bg-brand/10 p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-8 w-8 text-brand" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-text-primary",
								children: "Drop your bank statement"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-text-secondary",
								children: "PDF format · Max 20MB"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => fileInputRef.current?.click(),
								className: "mt-1 rounded-pill border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-alt",
								children: "Browse files"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInputRef,
								type: "file",
								accept: ".pdf",
								multiple: true,
								className: "hidden",
								onChange: handleFileSelect
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-45",
						children: documents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-full flex-col justify-center rounded-2xl bg-surface-alt/40 p-6 text-left border border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 mb-2.5 text-foreground font-semibold text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-7 w-7 items-center justify-center rounded-xl bg-brand/10 text-brand",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Supported Formats & Banking Ingestion" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-secondary mb-4 leading-relaxed",
									children: "Drop monthly bank statement PDFs to automatically parse ledgers, extract account numbers, and categorize outflows."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-2.5 text-xs text-text-secondary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-brand mt-1.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Supported Banks:" }), " HDFC, SBI, ICICI, Axis, Kotak, Yes Bank, and standard bank PDF statements"] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Automated Field Capture:" }), " Opening & closing balance, dates, descriptions, cheque/ref numbers, and debit/credit splits"] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Bank-Grade Confidentiality:" }), " Data is encrypted at rest and strictly isolated to your business profile"] })]
										})
									]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-text-secondary",
									children: [
										"Recent Extraction Activity (",
										documents.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-text-secondary font-medium",
									children: "Click row to inspect ledger"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "max-h-80 space-y-2 overflow-y-auto pr-1",
								children: documents.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentRow, {
									doc,
									extracted: extractedCache[doc.id],
									onInspect: (id) => setSelectedDocumentId(id),
									onRequestDelete: (id, name) => setDocumentToDelete({
										id,
										name
									})
								}, doc.id))
							})]
						})
					})]
				}), completedDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-surface-alt px-4 py-3 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 font-medium text-success",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }),
								completedDocs.length,
								" statement",
								completedDocs.length > 1 ? "s" : "",
								" extracted"
							]
						}),
						processingDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 font-medium text-brand",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
								processingDocs.length,
								" processing"
							]
						}),
						failedDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 font-medium text-danger",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5" }),
								failedDocs.length,
								" failed"
							]
						}),
						Object.values(extractedCache).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto text-text-secondary",
							children: [
								"Banks:",
								" ",
								Array.from(new Set(Object.values(extractedCache).map((e) => {
									if ("accounts" in e && Array.isArray(e.accounts) && e.accounts.length > 0) return e.accounts[0]?.bank_name;
									if ("account" in e && e.account) return e.account.bank_name;
									return null;
								}).filter((name) => Boolean(name)))).join(" · ") || "Processed"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatementDetail, {
				documentId: selectedDocumentId,
				onClose: () => {
					setSelectedDocumentId(null);
					onDocumentsChange();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!documentToDelete,
				onOpenChange: (open) => !open && setDocumentToDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete Bank Statement?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"Are you sure you want to delete ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: documentToDelete?.name
					}),
					"? All parsed transactions, classifications, and account records associated with this statement will be permanently removed."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						if (documentToDelete) {
							handleDelete(documentToDelete.id);
							setDocumentToDelete(null);
						}
					},
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					children: "Delete Statement"
				})] })] })
			})
		]
	});
}
function DocumentRow({ doc, extracted, onInspect, onRequestDelete }) {
	const st = {
		PENDING: {
			icon: Clock,
			label: "Pending",
			color: "text-text-secondary",
			bg: "bg-surface-alt"
		},
		PROCESSING: {
			icon: LoaderCircle,
			label: "Extracting…",
			color: "text-brand",
			bg: "bg-brand/10"
		},
		COMPLETED: {
			icon: CircleCheck,
			label: "Extracted",
			color: "text-success",
			bg: "bg-success/10"
		},
		FAILED: {
			icon: CircleAlert,
			label: "Failed",
			color: "text-danger",
			bg: "bg-danger/10"
		}
	}[doc.status];
	const StIcon = st.icon;
	const isSpinning = doc.status === "PROCESSING" || doc.status === "PENDING";
	const isAuditAvailable = doc.status === "COMPLETED" || doc.status === "FAILED";
	const primaryAccount = extracted ? "accounts" in extracted && Array.isArray(extracted.accounts) && extracted.accounts.length > 0 ? extracted.accounts[0] : "account" in extracted && extracted.account ? extracted.account : null : null;
	const txCount = extracted && "transactions" in extracted && Array.isArray(extracted.transactions) ? extracted.transactions.length : 0;
	const formattedTime = new Date(doc.created_at).toLocaleString("en-IN", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		onClick: () => {
			if (isAuditAvailable) onInspect?.(doc.id);
		},
		onKeyDown: (e) => {
			if (isAuditAvailable && (e.key === "Enter" || e.key === " ")) {
				e.preventDefault();
				onInspect?.(doc.id);
			}
		},
		role: isAuditAvailable ? "button" : void 0,
		tabIndex: isAuditAvailable ? 0 : void 0,
		className: cn("group flex items-center gap-3 rounded-xl bg-surface px-3.5 py-2.5 ring-1 ring-inset ring-border/60 transition", isAuditAvailable ? "cursor-pointer hover:ring-brand/40 hover:bg-surface-alt/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" : "hover:ring-border"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("shrink-0 rounded-lg p-1.5", st.bg),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StIcon, { className: cn("h-4 w-4", st.color, isSpinning && "animate-spin") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium text-text-primary",
					children: doc.original_name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-secondary mt-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-semibold", st.color),
							children: st.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formattedTime }),
						primaryAccount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: primaryAccount.bank_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [txCount, " txns"]
							})
						] }),
						!primaryAccount && doc.status === "COMPLETED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ready for audit" })] }),
						doc.error_message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger truncate max-w-40",
							title: doc.error_message,
							children: doc.error_message
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-1.5 opacity-80 group-hover:opacity-100 focus-within:opacity-100 transition",
				children: [
					doc.status === "COMPLETED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-brand px-2 py-0.5 rounded-pill bg-brand/10 hover:bg-brand/15 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
					}),
					doc.status === "FAILED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: async (e) => {
							e.stopPropagation();
							try {
								await api.post(`/api/statements/${doc.id}/reprocess`);
								toast.success("Reprocessing started…");
							} catch {
								toast.error("Reprocess failed.");
							}
						},
						className: "rounded-lg p-1.5 text-text-secondary hover:bg-surface-alt hover:text-brand focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none transition cursor-pointer",
						title: "Reprocess statement",
						"aria-label": "Reprocess statement",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: (e) => {
							e.stopPropagation();
							onRequestDelete(doc.id, doc.original_name);
						},
						className: "rounded-lg p-1.5 text-text-secondary hover:bg-danger/10 hover:text-danger focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-danger focus-visible:outline-none transition cursor-pointer",
						title: "Delete statement",
						"aria-label": "Delete statement",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
					})
				]
			})
		]
	});
}
function UploadPage() {
	const { data: documents = [], refetch, isLoading, isError, error } = useStatements();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-screen max-w-5xl px-6 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/home",
			className: "inline-flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Dashboard"]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 flex flex-col items-center justify-center gap-3 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-text-secondary",
				children: "Loading statement extraction hub…"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-4",
			children: [isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-destructive/20 bg-destructive/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-semibold text-foreground",
						children: "Notice: Could not sync existing statements list"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary",
						children: getApiErrorMessage(error, "You can still upload new bank statements below while we reconnect.")
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => refetch(),
					className: "inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-surface px-3 py-1.5 text-xs font-semibold text-foreground border border-border shadow-xs hover:bg-surface-alt transition cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3 w-3" }), "Retry Sync"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtractionHub, {
				documents,
				onDocumentsChange: refetch
			})]
		})]
	});
}
//#endregion
export { UploadPage as component };
