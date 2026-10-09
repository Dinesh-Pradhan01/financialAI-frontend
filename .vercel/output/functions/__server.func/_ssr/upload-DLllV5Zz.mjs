import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Cn as ChevronDown, Gn as ArrowRight, Kn as ArrowLeft, Q as Plus, U as Search, Vt as FileX, Wt as FileSpreadsheet, _ as TriangleAlert, _n as CircleAlert, b as Trash2, bn as ChevronUp, gn as CircleCheck, h as Undo2, o as Users, sn as CloudUpload, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { C as setClientFilters, D as setClientStep, G as undoClientEdit, Q as useAppSelector, T as setClientPreview, Z as useAppDispatch, h as resetClient, l as discardClientPreview, w as setClientFocusedRow } from "./store-i6pKH_iX.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as isCFO } from "./roles-Cu-hhfHW.mjs";
import { a as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as AccessRestrictedScreen } from "./AccessRestrictedScreen-DxTGrBZi.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { n as normalizeClientPreviewResponse, t as clientApi } from "./clientApi-kVDjKSAc.mjs";
import { t as ClientPreviewTable } from "./ClientPreviewTable-BQuJt8fr.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-D6uS5Rlr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-DLllV5Zz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useClientUpload() {
	return useMutation({ mutationFn: ({ file, onProgress }) => {
		return clientApi.uploadExcel(file, onProgress);
	} });
}
function useClientManualPreview() {
	return useMutation({ mutationFn: (data) => clientApi.previewManual(data) });
}
function useClientImport() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (previewData) => clientApi.importClients(previewData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
			queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		}
	});
}
function shortId() {
	return Math.random().toString(36).slice(2, 8);
}
function generateEmptyClientRow() {
	return {
		clientId: "",
		clientName: "",
		category: "Consulting",
		revenue: "",
		contractValue: "",
		contractId: "",
		frequency: "Monthly",
		bankName: "",
		accountHolderName: "",
		accountNumber: "",
		ifscCode: "",
		status: "Active"
	};
}
function ClientManualEntryGrid() {
	const dispatch = useAppDispatch();
	const manualPreviewMutation = useClientManualPreview();
	const [rows, setRows] = (0, import_react.useState)([
		{
			...generateEmptyClientRow(),
			_rowKey: shortId()
		},
		{
			...generateEmptyClientRow(),
			_rowKey: shortId()
		},
		{
			...generateEmptyClientRow(),
			_rowKey: shortId()
		}
	]);
	const handleAddRow = () => {
		setRows((prev) => [...prev, {
			...generateEmptyClientRow(),
			_rowKey: shortId()
		}]);
	};
	const handleRemoveRow = (key) => {
		setRows((prev) => prev.length > 1 ? prev.filter((r) => r._rowKey !== key) : prev);
	};
	const handleChange = (key, field, value) => {
		setRows((prev) => prev.map((r) => {
			if (r._rowKey !== key) return r;
			return {
				...r,
				[field]: value,
				...field === "clientId" ? { client_id: value } : {},
				...field === "clientName" ? { client_name: value } : {},
				...field === "contractId" ? { contract_id: value } : {},
				...field === "contractValue" ? { contract_value: value } : {},
				...field === "bankName" ? { bank_name: value } : {},
				...field === "accountHolderName" ? { account_holder_name: value } : {},
				...field === "accountNumber" ? { account_number: value } : {},
				...field === "ifscCode" ? { ifsc_code: value } : {}
			};
		}));
	};
	const handleProceed = async () => {
		const filledRows = rows.filter((r) => r.clientId?.trim() || r.clientName?.trim() || r.contractId?.trim() || r.bankName?.trim() || r.revenue !== "" || r.contractValue !== "");
		if (filledRows.length === 0) {
			toast.error("Please enter at least one client record before proceeding.");
			return;
		}
		const payload = filledRows.map((r, i) => {
			const cId = r.clientId?.trim() || `CLI-M-${i + 1}`;
			const contractId = r.contractId?.trim() || `CTR-${cId}`;
			const cName = r.clientName?.trim() || "";
			const cat = r.category?.trim() || "Consulting";
			const revNum = Number(r.revenue) || 0;
			const valNum = Number(r.contractValue) || revNum * 12;
			return {
				rowId: `manual_${i + 1}`,
				sourceRow: i + 1,
				clientId: cId,
				client_id: cId,
				clientName: cName,
				client_name: cName,
				category: cat,
				contractId,
				contract_id: contractId,
				revenue: revNum,
				contractValue: valNum,
				contract_value: valNum,
				frequency: r.frequency?.trim() || "Monthly",
				bankName: r.bankName?.trim() || "",
				bank_name: r.bankName?.trim() || "",
				accountHolderName: r.accountHolderName?.trim() || cName,
				account_holder_name: r.accountHolderName?.trim() || cName,
				accountNumber: r.accountNumber?.trim() || "",
				account_number: r.accountNumber?.trim() || "",
				ifscCode: (r.ifscCode?.trim() || "").toUpperCase(),
				ifsc_code: (r.ifscCode?.trim() || "").toUpperCase(),
				status: r.status || "Active",
				legalName: cName,
				legal_name: cName,
				industry: "Other",
				contractType: "Fixed Price",
				contract_type: "Fixed Price",
				contractStartDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				contractEndDate: "",
				currency: "INR",
				paymentType: "Bank Transfer",
				payment_type: "Bank Transfer",
				recurring: "Yes",
				isBlank: false
			};
		});
		try {
			dispatch(setClientPreview(normalizeClientPreviewResponse((await manualPreviewMutation.mutateAsync(payload)).data, payload)));
			dispatch(setClientStep("preview"));
		} catch (err) {
			toast.error(err?.response?.data?.message || err?.message || "Validation warning on manual records. Loaded into preview for editing.");
			dispatch(setClientPreview(normalizeClientPreviewResponse({ records: payload }, payload)));
			dispatch(setClientStep("preview"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-bold text-foreground",
					children: "Or Enter Clients Manually"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary",
					children: "Provide client details, billing parameters, and banking information."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleAddRow,
					className: "inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "Add Row"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border shadow-xs overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-alt border-b border-border text-[11px] font-semibold text-text-secondary uppercase tracking-wider",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Client ID *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Client Name *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Category *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Revenue *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Contract Value *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Bank Name *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "Account Number *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5",
									children: "IFSC Code *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-3 py-2.5 w-10 text-center" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-surface-alt/50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "CLI-001",
											value: row.clientId || "",
											onChange: (e) => handleChange(row._rowKey, "clientId", e.target.value),
											className: "h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Acme Corp",
											value: row.clientName || "",
											onChange: (e) => handleChange(row._rowKey, "clientName", e.target.value),
											className: "h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: row.category || "Consulting",
											onChange: (e) => handleChange(row._rowKey, "category", e.target.value),
											className: "h-8 w-full rounded-md border border-border bg-surface px-2 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Consulting",
													children: "Consulting"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Software / SaaS",
													children: "Software / SaaS"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "IT Services",
													children: "IT Services"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Financial Services",
													children: "Financial Services"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Logistics",
													children: "Logistics"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Marketing",
													children: "Marketing"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Legal",
													children: "Legal"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Other",
													children: "Other"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											placeholder: "50000",
											value: row.revenue !== void 0 ? row.revenue : "",
											onChange: (e) => handleChange(row._rowKey, "revenue", e.target.value),
											className: "h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											placeholder: "600000",
											value: row.contractValue !== void 0 ? row.contractValue : "",
											onChange: (e) => handleChange(row._rowKey, "contractValue", e.target.value),
											className: "h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "HDFC Bank",
											value: row.bankName || "",
											onChange: (e) => handleChange(row._rowKey, "bankName", e.target.value),
											className: "h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "50100123456789",
											value: row.accountNumber || "",
											onChange: (e) => handleChange(row._rowKey, "accountNumber", e.target.value),
											className: "h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "HDFC0001234",
											value: row.ifscCode || "",
											onChange: (e) => handleChange(row._rowKey, "ifscCode", e.target.value.toUpperCase()),
											className: "h-8 w-full rounded-md border border-border bg-surface px-2.5 text-xs text-foreground uppercase focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleRemoveRow(row._rowKey),
											disabled: rows.length <= 1,
											className: "flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary hover:bg-destructive/10 hover:text-destructive transition disabled:opacity-30 disabled:cursor-not-allowed mx-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									})
								]
							}, row._rowKey))
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleProceed,
					disabled: manualPreviewMutation.isPending,
					className: "inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition disabled:opacity-50",
					children: manualPreviewMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Validating..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Proceed to Preview", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
				})
			})
		]
	});
}
function ClientUploadDropzone() {
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [uploadError, setUploadError] = (0, import_react.useState)(null);
	const [invalidTemplate, setInvalidTemplate] = (0, import_react.useState)(null);
	const uploadMutation = useClientUpload();
	const dispatch = useAppDispatch();
	const backendPreview = useAppSelector((state) => state.cfo.client.backendPreview);
	const handleDrag = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
		else if (e.type === "dragleave") setIsDragging(false);
	}, []);
	const processFile = (0, import_react.useCallback)((file) => {
		setUploadError(null);
		setInvalidTemplate(null);
		setProgress(0);
		if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
			setUploadError("Please upload a valid Excel file (.xlsx or .xls)");
			return;
		}
		if (file.size > 20 * 1024 * 1024) {
			setUploadError("File is too large. Max size is 20MB.");
			return;
		}
		uploadMutation.mutate({
			file,
			onProgress: (e) => {
				if (e.total) setProgress(Math.min(80, Math.round(e.loaded * 100 / e.total)));
			}
		}, {
			onSuccess: (res) => {
				setProgress(100);
				dispatch(setClientPreview(normalizeClientPreviewResponse(res.data)));
				setTimeout(() => {
					dispatch(setClientStep("preview"));
				}, 600);
			},
			onError: (err) => {
				const axiosErr = err;
				const detail = axiosErr.response?.data?.detail;
				if (typeof detail === "object" && detail !== null) {
					const missing = detail.missing_columns || [];
					const unsupported = detail.unsupported_columns || [];
					if (missing.length > 0 || unsupported.length > 0) {
						setInvalidTemplate({
							missing,
							unsupported
						});
						return;
					}
				}
				setUploadError(typeof detail === "string" ? detail : axiosErr.response?.data?.message || axiosErr.message || "An error occurred while uploading the file.");
			}
		});
	}, [uploadMutation, dispatch]);
	const handleDrop = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
	}, [processFile]);
	const isUploading = uploadMutation.isPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			backendPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground",
						children: "You have a client draft preview available"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: "Continue working on your previously loaded client dataset."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch(discardClientPreview()),
						className: "flex-1 sm:flex-none inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition",
						children: "Discard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch(setClientStep("preview")),
						className: "flex-1 sm:flex-none inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition",
						children: "Resume Preview"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragEnter: handleDrag,
				onDragLeave: handleDrag,
				onDragOver: handleDrag,
				onDrop: handleDrop,
				className: cn("relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all", isDragging ? "border-primary bg-primary/5" : "border-border bg-surface hover:bg-surface-alt", isUploading && "pointer-events-none opacity-80"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold text-foreground",
						children: "Drop your Client Excel file here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-text-secondary text-center max-w-sm",
						children: "Supports .xlsx and .xls formats up to 20MB. Make sure your file matches the required Client template structure."
					}),
					uploadError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: uploadError })]
					}),
					isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 w-full max-w-sm space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }), "Uploading..."]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-primary",
								children: [progress, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 w-full overflow-hidden rounded-full bg-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-primary transition-all duration-300 ease-out",
								style: { width: `${progress}%` }
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							id: "file-upload-client",
							className: "hidden",
							accept: ".xlsx,.xls",
							onChange: (e) => {
								if (e.target.files?.[0]) processFile(e.target.files[0]);
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "file-upload-client",
							className: "inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-brand hover:bg-primary-hover transition cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mr-2 h-5 w-5" }), "Browse Files"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-10 flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase tracking-widest text-text-tertiary",
						children: "OR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border flex-1" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientManualEntryGrid, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!invalidTemplate,
				onOpenChange: () => setInvalidTemplate(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileX, { className: "h-6 w-6 text-destructive" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-center text-xl",
								children: "Invalid Template"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "text-center",
								children: "The uploaded file doesn't match the required Client format."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-4 space-y-4 text-sm",
							children: [invalidTemplate?.missing && invalidTemplate.missing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold text-foreground flex items-center gap-1.5 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white",
									children: "!"
								}), "Missing Required Columns:"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: invalidTemplate.missing.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md border border-border bg-surface-alt px-2 py-1 text-xs text-text-secondary",
									children: c
								}, c))
							})] }), invalidTemplate?.unsupported && invalidTemplate.unsupported.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold text-foreground flex items-center gap-1.5 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white",
									children: "?"
								}), "Unrecognized Columns:"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: invalidTemplate.unsupported.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md border border-border bg-surface-alt px-2 py-1 text-xs text-text-secondary",
									children: c
								}, c))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									alert("Downloading client template...");
								},
								className: "inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-text-secondary hover:bg-surface-alt transition",
								children: "Download Template"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setInvalidTemplate(null),
								className: "inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-brand transition hover:bg-primary-hover",
								children: "Upload Another"
							})]
						})
					]
				})
			})
		]
	});
}
function ClientValidationPanel({ issues }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(true);
	const dispatch = useAppDispatch();
	if (!issues || issues.length === 0) return null;
	const errors = issues.filter((i) => i.severity === "error");
	const warnings = issues.filter((i) => i.severity === "warning");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface shadow-sm overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setIsOpen(!isOpen),
			className: "w-full flex items-center justify-between p-3.5 bg-surface-alt hover:bg-surface-alt/80 transition",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10 font-mono text-[11px] font-bold text-destructive tabular-nums",
							children: errors.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: "Errors"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-px bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 font-mono text-[11px] font-bold text-amber-600 tabular-nums",
							children: warnings.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: "Warnings"
						})]
					})
				]
			}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4 text-text-secondary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 text-text-secondary" })]
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "divide-y divide-border max-h-75 overflow-y-auto p-2",
			children: [errors.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onClick: () => {
					if (issue.rowId) dispatch(setClientFocusedRow(issue.rowId));
				},
				className: "flex items-start gap-2.5 p-2 rounded-lg hover:bg-destructive/5 transition cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-destructive shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [issue.sourceRow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-destructive/10 text-destructive",
							children: ["Row ", issue.sourceRow]
						}), issue.field && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-foreground",
							children: ["Field: ", String(issue.field)]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: issue.message
					})]
				})]
			}, issue.id)), warnings.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onClick: () => {
					if (issue.rowId) dispatch(setClientFocusedRow(issue.rowId));
				},
				className: "flex items-start gap-2.5 p-2 rounded-lg hover:bg-amber-500/5 transition cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [issue.sourceRow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600",
							children: ["Row ", issue.sourceRow]
						}), issue.field && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-foreground",
							children: ["Field: ", String(issue.field)]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: issue.message
					})]
				})]
			}, issue.id))]
		})]
	});
}
function ClientStickyFooter({ recordCount, errorCount, backendPreview }) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const importMutation = useClientImport();
	const [showSuccess, setShowSuccess] = (0, import_react.useState)(false);
	const [isRevalidating, setIsRevalidating] = (0, import_react.useState)(false);
	const handleCancel = () => {
		dispatch(resetClient());
		navigate({ to: "/cfo" });
	};
	const handleImport = async () => {
		if (!backendPreview || !backendPreview.records) return;
		try {
			setIsRevalidating(true);
			const freshPreview = normalizeClientPreviewResponse((await clientApi.previewClients(backendPreview.records)).data, backendPreview.records);
			dispatch(setClientPreview(freshPreview));
			if (freshPreview.summary && freshPreview.summary.errors > 0) {
				toast.error(`Found ${freshPreview.summary.errors} errors during validation. Please resolve them before importing.`);
				setIsRevalidating(false);
				return;
			}
			importMutation.mutate(freshPreview, {
				onSuccess: () => {
					setShowSuccess(true);
				},
				onError: (err) => {
					const msg = err?.response?.data?.detail || err?.response?.data?.message || err?.message || "Import failed due to a server error. Your data is preserved — please try again.";
					toast.error(msg, { duration: 6e3 });
				},
				onSettled: () => {
					setIsRevalidating(false);
				}
			});
		} catch (err) {
			setIsRevalidating(false);
			toast.error(err?.response?.data?.message || err?.message || "Validation failed prior to import. Please check your data.");
		}
	};
	const isImporting = importMutation.isPending || isRevalidating;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border shadow-lg px-6 py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-semibold text-foreground",
					children: [
						recordCount,
						" Client Record",
						recordCount !== 1 ? "s" : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary",
					children: errorCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-destructive font-medium",
						children: [
							errorCount,
							" error",
							errorCount !== 1 ? "s" : "",
							" require resolution"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-emerald-600 font-medium",
						children: "All records validated and ready"
					})
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleCancel,
					disabled: isImporting,
					className: "inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition disabled:opacity-50",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleImport,
					disabled: isImporting || errorCount > 0 || recordCount === 0,
					className: "inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed gap-2",
					children: [isImporting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), isRevalidating ? "Validating..." : importMutation.isPending ? "Importing..." : `Import ${recordCount} Client${recordCount !== 1 ? "s" : ""}`]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: showSuccess,
		onOpenChange: setShowSuccess,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 text-emerald-600" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-center text-xl",
					children: "Import Complete"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-sm text-text-secondary mt-1",
					children: [
						"Successfully imported ",
						recordCount,
						" client record",
						recordCount !== 1 ? "s" : "",
						" into your portfolio."
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						dispatch(resetClient());
						navigate({ to: "/cfo/clients" });
					},
					className: "w-full inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-brand hover:bg-primary-hover transition",
					children: "View Client Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						dispatch(resetClient());
						setShowSuccess(false);
					},
					className: "w-full inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-text-secondary hover:bg-surface-alt transition",
					children: "Import More Clients"
				})]
			})]
		})
	})] });
}
function ClientPreviewStep() {
	const dispatch = useAppDispatch();
	const rawBackendPreview = useAppSelector((state) => state.cfo.client.backendPreview);
	const pastPreviews = useAppSelector((state) => state.cfo.client.pastPreviews);
	const backendPreview = rawBackendPreview;
	const filters = useAppSelector((state) => state.cfo.client.filters);
	const records = (0, import_react.useMemo)(() => backendPreview?.records || [], [backendPreview?.records]);
	const rawSummary = backendPreview?.summary || backendPreview?.validation;
	const validation = {
		validClients: typeof rawSummary?.validClients === "number" ? rawSummary.validClients : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
		errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
		warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
		issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
		errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
		warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
		duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
		missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0
	};
	const categories = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		records.forEach((r) => {
			if (r.category) set.add(r.category);
		});
		return Array.from(set);
	}, [records]);
	const filteredRecords = (0, import_react.useMemo)(() => {
		return records.filter((r) => {
			if (filters.search) {
				const q = filters.search.toLowerCase();
				if (!((r.clientName || r.client_name || "").toLowerCase().includes(q) || (r.clientId || r.client_id || "").toLowerCase().includes(q) || (r.contractId || r.contract_id || "").toLowerCase().includes(q) || (r.category || "").toLowerCase().includes(q))) return false;
			}
			if (filters.category && r.category !== filters.category) return false;
			if (filters.status && r.status !== filters.status) return false;
			return true;
		});
	}, [records, filters]);
	const errorRowIds = (0, import_react.useMemo)(() => new Set(validation.errorRowIds || []), [validation.errorRowIds]);
	const warningRowIds = (0, import_react.useMemo)(() => new Set(validation.warningRowIds || []), [validation.warningRowIds]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			pastPreviews.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-indigo-700 font-medium",
					children: "You have unsaved changes in this session."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => dispatch(undoClientEdit()),
					className: "inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "h-3.5 w-3.5" }), "Undo edit"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-3 border-border shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search clients by ID, name, category, or contract...",
							value: filters.search,
							onChange: (e) => dispatch(setClientFilters({
								...filters,
								search: e.target.value
							})),
							className: "h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 w-full md:w-auto",
						children: [
							categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filters.category,
								onChange: (e) => dispatch(setClientFilters({
									...filters,
									category: e.target.value
								})),
								className: "h-9 rounded-lg border border-border bg-surface px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "All Categories"
								}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filters.status,
								onChange: (e) => dispatch(setClientFilters({
									...filters,
									status: e.target.value
								})),
								className: "h-9 rounded-lg border border-border bg-surface px-3 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "All Statuses"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Active",
										children: "Active"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Inactive",
										children: "Inactive"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Pending",
										children: "Pending"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "h-9 whitespace-nowrap rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition",
									children: "Re-upload"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Start a new upload?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Any uncommitted changes made in this preview session will be discarded." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
								onClick: () => dispatch(setClientStep("upload")),
								className: "bg-primary text-white hover:bg-primary-hover",
								children: "Continue"
							})] })] })] })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientValidationPanel, { issues: validation.issues }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-surface shadow-xs overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientPreviewTable, {
					clients: filteredRecords,
					errorRowIds,
					warningRowIds
				})
			}),
			backendPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientStickyFooter, {
				recordCount: records.length,
				errorCount: validation.errors,
				backendPreview
			})
		]
	});
}
function ClientUploadPage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const step = useAppSelector((state) => state.cfo.client.step);
	const handleBack = () => {
		if (step === "preview") dispatch(setClientStep("upload"));
		else {
			dispatch(resetClient());
			navigate({ to: "/cfo" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto p-4 md:p-6 pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleBack,
				className: "flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface hover:bg-surface-alt transition text-text-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold tracking-tight text-foreground",
				children: "Upload Client Portfolio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-text-secondary mt-0.5 text-xs sm:text-sm leading-relaxed",
				children: "Import your client master data, revenue agreements, and billing parameters via Excel or manual entry."
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
				mode: "wait",
				children: [step === "upload" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -12
					},
					transition: {
						duration: .24,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientUploadDropzone, {})
				}, "upload"), step === "preview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: -12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: 12
					},
					transition: {
						duration: .24,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientPreviewStep, {})
				}, "preview")]
			})
		})]
	});
}
function CFOClientUploadRouteComponent() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading client upload…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isCFO(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessRestrictedScreen, {
		title: "Access Restricted",
		description: "CFO Operations is strictly restricted to Chief Financial Officers (CFO).",
		currentRole: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientUploadPage, {});
}
//#endregion
export { CFOClientUploadRouteComponent as component };
