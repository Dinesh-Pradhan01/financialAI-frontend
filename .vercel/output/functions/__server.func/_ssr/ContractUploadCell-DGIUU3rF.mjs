import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Cn as ChevronDown, Ht as FileUp, K as RotateCw, Qt as ExternalLink, Ut as FileText, _n as CircleAlert, b as Trash2, gn as CircleCheck, wn as Check, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { B as setVendorRowAgreement, E as setClientRowAgreement, Q as useAppSelector, Z as useAppDispatch, a as applyClientExtractedData, s as applyVendorExtractedData } from "./store-i6pKH_iX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as vendorApi } from "./vendorApi-C2s6RChe.mjs";
import { t as clientApi } from "./clientApi-kVDjKSAc.mjs";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-ChRg7xbO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ContractUploadCell-DGIUU3rF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContractUploadCell({ entityType, uploadId, rowId, record, readOnly = false }) {
	const dispatch = useAppDispatch();
	const fileInputRef = (0, import_react.useRef)(null);
	const agreementState = useAppSelector((state) => {
		if (entityType === "vendor") return state.cfo?.vendor?.agreements?.[rowId];
		else return state.cfo?.client?.agreements?.[rowId];
	}) || { status: "none" };
	const [uploadProgress, setUploadProgress] = (0, import_react.useState)(0);
	const [isPopoverOpen, setIsPopoverOpen] = (0, import_react.useState)(false);
	const api = entityType === "vendor" ? vendorApi : clientApi;
	const updateAgreementState = (0, import_react.useCallback)((patch) => {
		if (entityType === "vendor") dispatch(setVendorRowAgreement({
			rowId,
			agreement: patch
		}));
		else dispatch(setClientRowAgreement({
			rowId,
			agreement: patch
		}));
	}, [
		dispatch,
		entityType,
		rowId
	]);
	const handleOpenFileDialog = () => {
		if (readOnly) return;
		if (!uploadId) {
			toast.error("Upload staging record required. Please upload the file first.");
			return;
		}
		fileInputRef.current?.click();
	};
	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!(file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))) {
			toast.error("Only PDF files are supported for contract agreements.");
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}
		if (file.size > 20 * 1024 * 1024) {
			toast.error("File exceeds 20MB limit.");
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}
		if (!uploadId) {
			toast.error("Missing upload ID for staging.");
			return;
		}
		try {
			updateAgreementState({
				status: "uploading",
				fileName: file.name,
				error: void 0,
				isApplied: false
			});
			setUploadProgress(10);
			const data = (await api.uploadAgreement(uploadId, rowId, file, (event) => {
				if (event.total) setUploadProgress(Math.round(event.loaded * 100 / event.total));
			})).data?.data;
			updateAgreementState({
				status: "uploaded",
				fileName: data?.file_name || file.name,
				documentId: data?.document_id,
				error: void 0
			});
			toast.success("Contract agreement attached. Click 'Extract' to process terms.");
		} catch (err) {
			const msg = err?.response?.data?.message || err?.message || "Failed to upload contract agreement.";
			updateAgreementState({
				status: "failed",
				error: msg
			});
			toast.error(msg);
		} finally {
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};
	const handleTriggerExtract = async (e) => {
		if (e) e.stopPropagation();
		if (readOnly || !uploadId) return;
		try {
			updateAgreementState({
				status: "processing",
				error: void 0
			});
			await api.extractAgreement(uploadId, rowId);
			toast.info("Extracting contract agreement terms with AI...");
		} catch (err) {
			const msg = err?.response?.data?.message || err?.message || "Failed to trigger agreement extraction.";
			updateAgreementState({
				status: "failed",
				error: msg
			});
			toast.error(msg);
		}
	};
	(0, import_react.useEffect)(() => {
		if (agreementState.status !== "processing" || !uploadId) return;
		let attempts = 0;
		const maxAttempts = 30;
		const timer = setInterval(async () => {
			attempts += 1;
			try {
				const data = (await api.getAgreementExtraction(uploadId, rowId)).data?.data;
				const status = data?.status?.toUpperCase();
				if (status === "EXTRACTED" || status === "COMPLETED") {
					clearInterval(timer);
					updateAgreementState({
						status: "extracted",
						extractedData: data.extracted_data,
						fieldConfidence: data.field_confidence,
						fileName: data.file_name || agreementState.fileName,
						error: void 0
					});
					toast.success("Contract terms extracted successfully!");
				} else if (status === "EXTRACTION_FAILED" || status === "FAILED") {
					clearInterval(timer);
					updateAgreementState({
						status: "failed",
						error: data?.error_message || "Extraction encountered an error."
					});
					toast.error("Contract extraction failed.");
				} else if (attempts >= maxAttempts) {
					clearInterval(timer);
					updateAgreementState({
						status: "failed",
						error: "Extraction timed out. You can retry."
					});
					toast.error("Extraction timed out.");
				}
			} catch (err) {
				if (attempts >= maxAttempts) {
					clearInterval(timer);
					updateAgreementState({
						status: "failed",
						error: "Failed checking extraction status."
					});
				}
			}
		}, 2e3);
		return () => clearInterval(timer);
	}, [
		agreementState.status,
		agreementState.fileName,
		api,
		rowId,
		updateAgreementState,
		uploadId
	]);
	const handleApplyExtracted = () => {
		if (!agreementState.extractedData) return;
		if (entityType === "vendor") dispatch(applyVendorExtractedData({
			rowId,
			extracted: agreementState.extractedData
		}));
		else dispatch(applyClientExtractedData({
			rowId,
			extracted: agreementState.extractedData
		}));
		setIsPopoverOpen(false);
		toast.success("Extracted agreement terms applied to row. You can Undo if needed.");
	};
	const handleViewPdf = () => {
		if (!uploadId) return;
		const url = api.getAgreementFileUrl(uploadId, rowId);
		window.open(url, "_blank");
	};
	const handleRemoveAgreement = (e) => {
		e.stopPropagation();
		updateAgreementState({
			status: "none",
			fileName: void 0,
			documentId: void 0,
			extractedData: void 0,
			fieldConfidence: void 0,
			isApplied: false,
			error: void 0
		});
		setIsPopoverOpen(false);
		toast.info("Agreement unattached.");
	};
	const avgConfidence = agreementState.fieldConfidence ? Math.round(Object.values(agreementState.fieldConfidence).reduce((a, b) => a + b, 0) / Object.values(agreementState.fieldConfidence).length * 100) : 95;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 min-w-[160px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				ref: fileInputRef,
				accept: ".pdf,application/pdf",
				className: "hidden",
				onChange: handleFileChange
			}),
			agreementState.status === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: handleOpenFileDialog,
				disabled: readOnly || !uploadId,
				className: cn("group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer", "border border-border/80 bg-surface/80 hover:bg-surface-alt hover:border-primary/40 text-text-secondary hover:text-foreground shadow-2xs hover:shadow-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", "disabled:opacity-40 disabled:cursor-not-allowed"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "h-3.5 w-3.5 text-text-tertiary group-hover:text-primary transition-colors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Attach PDF" })]
			}),
			agreementState.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/5 border border-primary/20 text-primary animate-pulse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: ["Uploading ", uploadProgress > 0 ? `${uploadProgress}%` : "..."]
				})]
			}),
			agreementState.status === "uploaded" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group/cell flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center rounded-lg border border-border/80 bg-surface shadow-2xs hover:border-border transition-all duration-150 overflow-hidden divide-x divide-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleViewPdf,
						className: "inline-flex items-center gap-1.5 px-2 py-1 text-xs text-foreground hover:text-primary transition-colors max-w-[125px] group/doc cursor-pointer",
						title: `Click to view ${agreementState.fileName || "agreement.pdf"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-4 w-4 shrink-0 items-center justify-center rounded bg-rose-500/10 text-rose-600 dark:text-rose-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-2.5 w-2.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-medium text-[11.5px] text-text-secondary group-hover/doc:text-foreground",
							children: agreementState.fileName || "agreement.pdf"
						})]
					}), !readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleTriggerExtract,
						className: "inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all duration-150 cursor-pointer",
						title: "Extract contract agreement details with Spotlite AI",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Extract" })]
					})]
				}), !readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleRemoveAgreement,
					className: "inline-flex items-center justify-center h-6 w-6 rounded-md text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition-colors opacity-40 hover:opacity-100 group-hover/cell:opacity-80 shrink-0 cursor-pointer",
					title: "Remove document",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
				})]
			}),
			agreementState.status === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/8 border border-primary/20 text-primary animate-pulse shadow-2xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-primary animate-spin" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Extracting terms…" })
				]
			}),
			agreementState.status === "extracted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group/cell flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					open: isPopoverOpen,
					onOpenChange: setIsPopoverOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: cn("group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer border shadow-2xs", agreementState.isApplied ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40" : "bg-primary/10 border-primary/25 text-primary hover:bg-primary/15 hover:border-primary/35"),
							children: [
								agreementState.isApplied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 shrink-0 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: agreementState.isApplied ? "Applied" : "Terms Ready"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[10px] opacity-75 tabular-nums",
									children: [
										"(",
										avgConfidence,
										"%)"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 opacity-60 group-hover:opacity-100 transition-transform duration-150 group-data-[state=open]:rotate-180" })
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						className: "w-84 p-4 shadow-xl border border-border bg-surface text-foreground rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border pb-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold truncate max-w-[160px]",
											title: agreementState.fileName,
											children: agreementState.fileName || "Contract Agreement"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("text-[10px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0", avgConfidence >= 90 ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20" : "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20"),
										children: [avgConfidence, "% Match"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold text-text-tertiary uppercase tracking-wider",
										children: "Extracted Contract Terms"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2 bg-surface-alt/50 p-2.5 rounded-lg border border-border/80",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-text-tertiary",
												children: "Contract Value"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-semibold font-mono text-xs text-foreground mt-0.5",
												children: [
													agreementState.extractedData?.currency || "INR",
													" ",
													agreementState.extractedData?.contract_value != null ? Number(agreementState.extractedData.contract_value).toLocaleString() : "—"
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-text-tertiary",
												children: "Contract Type"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-xs text-foreground mt-0.5",
												children: agreementState.extractedData?.contract_type || "—"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-text-tertiary",
												children: "Start Date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-xs text-foreground mt-0.5",
												children: agreementState.extractedData?.contract_start_date || "—"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-text-tertiary",
												children: "End Date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-xs text-foreground mt-0.5",
												children: agreementState.extractedData?.contract_end_date || "—"
											})] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 pt-2 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleViewPdf,
										className: "inline-flex items-center gap-1 text-[11px] font-medium text-text-secondary hover:text-foreground transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View PDF" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [!readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: handleTriggerExtract,
											className: "inline-flex items-center gap-1 text-[11px] font-medium text-text-tertiary hover:text-foreground px-2 py-1 rounded-md transition-colors cursor-pointer",
											title: "Re-run AI extraction",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Re-extract" })]
										}), !readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleApplyExtracted,
											disabled: agreementState.isApplied,
											className: cn("inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer", agreementState.isApplied ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 cursor-default" : "bg-primary text-primary-foreground hover:bg-primary-hover active:scale-95"),
											children: agreementState.isApplied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Applied" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Apply to Row" })] })
										})]
									})]
								})
							]
						})
					})]
				}), !readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleRemoveAgreement,
					className: "inline-flex items-center justify-center h-6 w-6 rounded-md text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition-colors opacity-40 hover:opacity-100 group-hover/cell:opacity-80 shrink-0 cursor-pointer",
					title: "Remove agreement",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
				})]
			}),
			agreementState.status === "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group/cell flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-destructive/30 bg-destructive/8 text-destructive text-xs font-medium shadow-2xs",
						title: agreementState.error || "Extraction failed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 text-destructive shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate max-w-[80px]",
							children: "Failed"
						})]
					}),
					!readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleTriggerExtract,
						className: "inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-surface hover:bg-surface-alt border border-border text-foreground transition-colors shadow-2xs cursor-pointer",
						title: "Retry extraction",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retry" })]
					}),
					!readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleRemoveAgreement,
						className: "inline-flex items-center justify-center h-6 w-6 rounded-md text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition-colors opacity-50 hover:opacity-100 group-hover/cell:opacity-80 shrink-0 cursor-pointer",
						title: "Remove failed agreement",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
					})
				]
			})
		]
	});
}
//#endregion
export { ContractUploadCell as t };
