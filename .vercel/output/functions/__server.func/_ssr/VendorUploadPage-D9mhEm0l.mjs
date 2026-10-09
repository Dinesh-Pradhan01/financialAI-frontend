import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Cn as ChevronDown, Gn as ArrowRight, Kn as ArrowLeft, Pn as BriefcaseBusiness, Q as Plus, U as Search, Vt as FileX, Wt as FileSpreadsheet, _ as TriangleAlert, _n as CircleAlert, b as Trash2, bn as ChevronUp, gn as CircleCheck, h as Undo2, sn as CloudUpload, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { L as setVendorFilters, Q as useAppSelector, R as setVendorFocusedRow, V as setVendorStep, Z as useAppDispatch, d as discardVendorPreview, q as undoVendorEdit, x as resetVendor, z as setVendorPreview } from "./store-i6pKH_iX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { t as vendorApi } from "./vendorApi-C2s6RChe.mjs";
import { t as VendorPreviewTable } from "./VendorPreviewTable-DHN3S-da.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-D6uS5Rlr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VendorUploadPage-D9mhEm0l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useVendorUpload() {
	return useMutation({ mutationFn: ({ file, onProgress }) => {
		return vendorApi.uploadExcel(file, onProgress);
	} });
}
function useVendorManualPreview() {
	return useMutation({ mutationFn: (data) => vendorApi.previewManual(data) });
}
function useVendorImport() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (previewData) => vendorApi.importVendors(previewData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["cfo", "vendors"] });
		}
	});
}
/** Simple short-ID generator – no extra dependency required. */
function shortId() {
	return Math.random().toString(36).slice(2, 8);
}
function generateEmptyRow() {
	return {
		vendorId: "",
		vendorName: "",
		email: "",
		industry: "",
		contractId: "",
		status: "Active",
		contractType: ""
	};
}
function normalizeManualPreviewResponse(raw, userRows) {
	let previewData = raw;
	if (raw && typeof raw === "object" && raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) previewData = raw.data;
	const records = (Array.isArray(previewData?.records) && previewData.records.length > 0 ? previewData.records : userRows).map((r) => ({
		...r,
		vendorId: r.vendorId || r.vendor_id || "",
		vendorName: r.vendorName || r.vendor_name || "",
		vendor_id: r.vendor_id || r.vendorId || "",
		vendor_name: r.vendor_name || r.vendorName || "",
		contractId: r.contractId || r.contract_id || "",
		contract_id: r.contract_id || r.contractId || "",
		registrationNumber: r.registrationNumber || r.registration_number || "",
		taxId: r.taxId || r.tax_id || "",
		primaryContactName: r.primaryContactName || r.primary_contact_name || "",
		postalCode: r.postalCode || r.postal_code || "",
		contractStartDate: r.contractStartDate || r.contract_start_date || "",
		contractEndDate: r.contractEndDate || r.contract_end_date || "",
		contractType: r.contractType || r.contract_type || "",
		paymentTerms: r.paymentTerms || r.payment_terms || "",
		paymentType: r.paymentType || r.payment_type || "",
		bankName: r.bankName || r.bank_name || "",
		accountNumber: r.accountNumber || r.account_number || "",
		ifscCode: r.ifscCode || r.ifsc_code || "",
		swiftCode: r.swiftCode || r.swift_code || "",
		status: r.status || "Active"
	}));
	const rawSummary = previewData?.summary || previewData?.validation;
	const summary = {
		validVendors: typeof rawSummary?.validVendors === "number" ? rawSummary.validVendors : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
		warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
		errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
		issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
		errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
		warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
		duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
		missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0
	};
	return {
		...previewData,
		records,
		summary,
		validation: summary
	};
}
function VendorManualEntryGrid() {
	const dispatch = useAppDispatch();
	const manualPreviewMutation = useVendorManualPreview();
	const [rows, setRows] = (0, import_react.useState)([
		{
			...generateEmptyRow(),
			_rowKey: shortId()
		},
		{
			...generateEmptyRow(),
			_rowKey: shortId()
		},
		{
			...generateEmptyRow(),
			_rowKey: shortId()
		}
	]);
	const handleAddRow = () => {
		setRows((prev) => [...prev, {
			...generateEmptyRow(),
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
				...field === "vendorId" ? { vendor_id: value } : {},
				...field === "vendorName" ? { vendor_name: value } : {},
				...field === "contractId" ? { contract_id: value } : {},
				...field === "contractType" ? { contract_type: value } : {}
			};
		}));
	};
	const handleProceed = async () => {
		const filledRows = rows.filter((r) => r.vendorId?.trim() || r.vendorName?.trim() || r.email?.trim() || r.industry?.trim() || r.contractId?.trim());
		if (filledRows.length === 0) {
			toast.error("Please fill in at least one row before proceeding.");
			return;
		}
		const payload = filledRows.map((r, i) => {
			const vId = r.vendorId?.trim() || `VEN-M-${i + 1}`;
			const cId = r.contractId?.trim() || `CTR-${vId}`;
			return {
				rowId: `manual_${i + 1}`,
				sourceRow: i + 1,
				vendorId: vId,
				vendor_id: vId,
				vendorName: r.vendorName?.trim() || "",
				vendor_name: r.vendorName?.trim() || "",
				email: r.email?.trim() || "",
				industry: r.industry?.trim() || "Technology",
				contractId: cId,
				contract_id: cId,
				status: r.status || "Active",
				contractType: r.contractType?.trim() || "Fixed Price",
				contract_type: r.contractType?.trim() || "Fixed Price",
				registrationNumber: "",
				taxId: "",
				primaryContactName: "",
				phone: "",
				website: "",
				address: "",
				city: "",
				state: "",
				country: "India",
				postalCode: "",
				contractStartDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				contractEndDate: "",
				currency: "INR",
				paymentTerms: "Net 30",
				paymentType: "Bank Transfer",
				bankName: "",
				accountNumber: "",
				ifscCode: "",
				swiftCode: "",
				recurring: "No",
				isBlank: false
			};
		});
		try {
			dispatch(setVendorPreview(normalizeManualPreviewResponse((await manualPreviewMutation.mutateAsync(payload)).data, payload)));
			dispatch(setVendorStep("preview"));
		} catch (err) {
			toast.error(err?.response?.data?.message || err?.message || "Failed to validate manual records. Continuing with raw data.");
			dispatch(setVendorPreview({
				records: payload,
				summary: {
					validVendors: payload.length,
					warnings: 0,
					errors: 0,
					issues: [],
					errorRowIds: [],
					warningRowIds: [],
					duplicateIds: 0,
					missingRequiredFields: 0
				}
			}));
			dispatch(setVendorStep("preview"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-bold text-foreground",
					children: "Manual Fast Entry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-text-secondary mt-0.5",
					children: "Quickly paste or type multiple vendor rows directly."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleAddRow,
					className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-alt hover:text-foreground transition shadow-2xs cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "Add Row"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/80 shadow-xs overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-alt/70 text-[11px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 w-10 text-center",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 min-w-32.5",
									children: "Vendor ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 min-w-45",
									children: "Vendor Name *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 min-w-45",
									children: "Email *"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 min-w-35",
									children: "Industry"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 min-w-32.5",
									children: "Contract ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 min-w-27.5",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2.5 min-w-32.5",
									children: "Contract Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-2 py-2.5 w-10 text-center" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: rows.map((row, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-surface-alt/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-center text-text-tertiary font-mono text-[11px]",
										children: idx + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "e.g. VEN-001",
											value: row.vendorId || "",
											onChange: (e) => handleChange(row._rowKey, "vendorId", e.target.value),
											className: "w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Acme Corp",
											value: row.vendorName || "",
											onChange: (e) => handleChange(row._rowKey, "vendorName", e.target.value),
											className: "w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											placeholder: "billing@acme.com",
											value: row.email || "",
											onChange: (e) => handleChange(row._rowKey, "email", e.target.value),
											className: "w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "e.g. SaaS",
											value: row.industry || "",
											onChange: (e) => handleChange(row._rowKey, "industry", e.target.value),
											className: "w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "CTR-001",
											value: row.contractId || "",
											onChange: (e) => handleChange(row._rowKey, "contractId", e.target.value),
											className: "w-full bg-surface border border-border/80 rounded px-2.5 py-1 text-xs outline-none focus:border-violet-500 transition"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: row.status || "Active",
											onChange: (e) => handleChange(row._rowKey, "status", e.target.value),
											className: "w-full bg-surface border border-border/80 rounded px-2 py-1 text-xs outline-none focus:border-violet-500 transition",
											children: [
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
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: row.contractType || "Fixed Price",
											onChange: (e) => handleChange(row._rowKey, "contractType", e.target.value),
											className: "w-full bg-surface border border-border/80 rounded px-2 py-1 text-xs outline-none focus:border-violet-500 transition",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Fixed Price",
													children: "Fixed Price"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Time & Material",
													children: "Time & Material"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Retainer",
													children: "Retainer"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Subscription",
													children: "Subscription"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1.5 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleRemoveRow(row._rowKey),
											disabled: rows.length <= 1,
											className: "text-text-tertiary hover:text-destructive transition disabled:opacity-30 disabled:cursor-not-allowed p-1 rounded",
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
					className: "inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition disabled:opacity-50 cursor-pointer",
					children: manualPreviewMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-3.5 w-3.5 animate-spin" }), "Validating Rows..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Proceed to Validation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-3.5 w-3.5" })] })
				})
			})
		]
	});
}
function VendorUploadDropzone() {
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [uploadError, setUploadError] = (0, import_react.useState)(null);
	const [invalidTemplate, setInvalidTemplate] = (0, import_react.useState)(null);
	const uploadMutation = useVendorUpload();
	const dispatch = useAppDispatch();
	const backendPreview = useAppSelector((state) => state.cfo.vendor.backendPreview);
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
				const resData = res.data;
				const data = resData?.data || resData;
				const rawRecords = Array.isArray(data.records) ? data.records : [];
				const autoFixedRowIds = /* @__PURE__ */ new Set();
				const records = rawRecords.map((r, idx) => {
					const contractType = r.contractType || r.contract_type || "";
					const isSub = String(contractType).toLowerCase().includes("sub") || String(r.frequency || "").toLowerCase().includes("sub") || String(r.recurring || "").toLowerCase() === "true" || String(r.recurring || "").toLowerCase() === "yes" || String(r.recurring || "") === "1";
					const contractVal = Number(r.contractValue ?? r.contract_value ?? 0);
					let monthlyCostVal = r.monthlyCost ?? r.monthly_cost ?? r.cost;
					if ((monthlyCostVal === "" || monthlyCostVal == null || Number(monthlyCostVal) === 0 || Number.isNaN(Number(monthlyCostVal))) && isSub && contractVal > 0) {
						monthlyCostVal = Math.round(contractVal / 12 * 100) / 100;
						autoFixedRowIds.add(String(r.rowId || `row_${idx + 1}`));
					}
					return {
						...r,
						vendorId: r.vendorId || r.vendor_id || "",
						vendorName: r.vendorName || r.vendor_name || "",
						vendor_id: r.vendor_id || r.vendorId || "",
						vendor_name: r.vendor_name || r.vendorName || "",
						contractId: r.contractId || r.contract_id || "",
						contract_id: r.contract_id || r.contractId || "",
						registrationNumber: r.registrationNumber || r.registration_number || "",
						taxId: r.taxId || r.tax_id || "",
						primaryContactName: r.primaryContactName || r.primary_contact_name || "",
						postalCode: r.postalCode || r.postal_code || "",
						contractStartDate: r.contractStartDate || r.contract_start_date || "",
						contractEndDate: r.contractEndDate || r.contract_end_date || "",
						contractType,
						contract_type: contractType,
						contractValue: contractVal || r.contractValue || r.contract_value || "",
						contract_value: contractVal || r.contract_value || r.contractValue || "",
						monthlyCost: monthlyCostVal ?? "",
						monthly_cost: monthlyCostVal ?? "",
						cost: monthlyCostVal ?? "",
						paymentTerms: r.paymentTerms || r.payment_terms || "",
						paymentType: r.paymentType || r.payment_type || "",
						bankName: r.bankName || r.bank_name || "",
						accountNumber: r.accountNumber || r.account_number || "",
						ifscCode: r.ifscCode || r.ifsc_code || "",
						swiftCode: r.swiftCode || r.swift_code || "",
						status: r.status || "Active"
					};
				});
				const rawSummary = data.summary || data.validation;
				const filteredIssues = (Array.isArray(rawSummary?.issues) ? rawSummary.issues : []).filter((issue) => {
					if (autoFixedRowIds.has(String(issue.rowId))) {
						const f = String(issue.field || "").toLowerCase().replace(/_/g, "");
						if (f.includes("monthly") || f.includes("cost")) return false;
					}
					return true;
				});
				const remainingErrorRowIds = (Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : []).filter((rId) => {
					return filteredIssues.some((issue) => String(issue.rowId) === String(rId) && issue.severity === "error");
				});
				const summary = {
					validVendors: records.length - remainingErrorRowIds.length,
					warnings: filteredIssues.filter((i) => i.severity === "warning").length,
					errors: filteredIssues.filter((i) => i.severity === "error").length,
					issues: filteredIssues,
					errorRowIds: remainingErrorRowIds,
					warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
					duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
					missingRequiredFields: remainingErrorRowIds.length
				};
				dispatch(setVendorPreview({
					...data,
					records,
					summary,
					validation: summary
				}));
				setTimeout(() => {
					dispatch(setVendorStep("preview"));
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
				className: "flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-violet-500/20 bg-violet-500/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground",
						children: "You have a draft preview available"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: "Continue working on your previously validated vendor dataset."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch(discardVendorPreview()),
						className: "flex-1 sm:flex-none inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition",
						children: "Discard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch(setVendorStep("preview")),
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
						className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold text-foreground",
						children: "Drop your Vendor Excel file here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-text-secondary text-center max-w-sm",
						children: "Supports .xlsx and .xls formats up to 20MB. Make sure your file matches the required template structure."
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
							id: "file-upload-vendor",
							className: "hidden",
							accept: ".xlsx,.xls",
							onChange: (e) => {
								if (e.target.files?.[0]) processFile(e.target.files[0]);
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "file-upload-vendor",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorManualEntryGrid, {}),
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
								children: "The uploaded file doesn't match the required format."
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
									alert("Downloading template...");
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
function VendorValidationPanel({ issues }) {
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
					if (issue.rowId) dispatch(setVendorFocusedRow(issue.rowId));
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
					if (issue.rowId) dispatch(setVendorFocusedRow(issue.rowId));
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
function VendorStickyFooter({ recordCount, errorCount, backendPreview }) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const importMutation = useVendorImport();
	const [showSuccess, setShowSuccess] = (0, import_react.useState)(false);
	const [isRevalidating, setIsRevalidating] = (0, import_react.useState)(false);
	const handleCancel = () => {
		dispatch(resetVendor());
		navigate({ to: "/cfo" });
	};
	const handleImport = async () => {
		if (!backendPreview || !backendPreview.records) return;
		try {
			setIsRevalidating(true);
			const resData = (await vendorApi.previewManual(backendPreview.records)).data;
			const data = resData?.data || resData;
			const records = (Array.isArray(data.records) ? data.records : []).map((r) => ({
				...r,
				vendorId: r.vendorId || r.vendor_id || "",
				vendorName: r.vendorName || r.vendor_name || "",
				contractId: r.contractId || r.contract_id || "",
				status: r.status || "Active",
				monthlyCost: r.monthlyCost ?? r.monthly_cost ?? "",
				monthly_cost: r.monthly_cost ?? r.monthlyCost ?? ""
			}));
			const rawSummary = data.summary || data.validation;
			const summary = {
				validVendors: typeof rawSummary?.validVendors === "number" ? rawSummary.validVendors : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
				warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
				errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
				issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
				errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
				warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
				duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
				missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0
			};
			const freshPreview = {
				...data,
				records,
				summary,
				validation: summary
			};
			dispatch(setVendorPreview(freshPreview));
			if (freshPreview.summary.errors > 0) {
				toast.error(`Found ${freshPreview.summary.errors} errors during validation. Please fix them.`);
				setIsRevalidating(false);
				return;
			}
			importMutation.mutate(freshPreview, {
				onSuccess: () => {
					setShowSuccess(true);
				},
				onError: (err) => {
					const msg = err?.response?.data?.detail || err?.response?.data?.message || err?.message || "Import failed due to a server error. Your data is safe — please try again.";
					toast.error(msg, { duration: 6e3 });
				},
				onSettled: () => {
					setIsRevalidating(false);
				}
			});
		} catch (e) {
			toast.error(e?.message || "Failed to reach the server. Your data is safe — please try again.", { duration: 6e3 });
			setIsRevalidating(false);
		}
	};
	const hasErrors = errorCount > 0;
	const isPending = importMutation.isPending || isRevalidating;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky bottom-6 z-30 mx-auto w-full max-w-4xl bg-surface/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl mt-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center sm:text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold text-foreground",
					children: [recordCount, " vendors ready"]
				}), hasErrors ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-destructive font-medium mt-0.5",
					children: [
						"Resolve ",
						errorCount,
						" errors before importing"
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary mt-0.5",
					children: "All validations passed"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 w-full sm:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleCancel,
					className: "flex-1 sm:flex-none inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-text-secondary hover:bg-surface-alt transition shadow-sm",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleImport,
					disabled: hasErrors || isPending,
					className: "flex-1 sm:flex-none inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-white shadow-brand transition hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed",
					children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Importing..."] }) : "Import Data"
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: showSuccess,
		onOpenChange: (open) => {
			if (!open) {
				setShowSuccess(false);
				handleCancel();
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-sm text-center p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-2xl font-bold",
						children: "Import Successful!"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "my-4 text-text-secondary text-sm",
					children: [
						"Successfully imported ",
						recordCount,
						" vendor records into the system."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleCancel,
					className: "w-full inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-brand transition hover:bg-primary-hover",
					children: "Done"
				})
			]
		})
	})] });
}
function VendorPreviewStep() {
	const dispatch = useAppDispatch();
	const rawBackendPreview = useAppSelector((state) => state.cfo.vendor.backendPreview);
	const pastPreviews = useAppSelector((state) => state.cfo.vendor.pastPreviews);
	const backendPreview = rawBackendPreview;
	const filters = useAppSelector((state) => state.cfo.vendor.filters);
	const records = (0, import_react.useMemo)(() => backendPreview?.records || [], [backendPreview?.records]);
	const rawSummary = backendPreview?.summary || backendPreview?.validation;
	const validation = {
		validVendors: typeof rawSummary?.validVendors === "number" ? rawSummary.validVendors : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
		errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
		warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
		issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
		errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
		warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
		duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
		missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0
	};
	const industries = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		records.forEach((r) => {
			if (r.industry) set.add(r.industry);
		});
		return Array.from(set);
	}, [records]);
	const filteredRecords = (0, import_react.useMemo)(() => {
		return records.filter((r) => {
			if (filters.search) {
				const q = filters.search.toLowerCase();
				if (!((r.vendorName || "").toLowerCase().includes(q) || (r.vendorId || "").toLowerCase().includes(q) || (r.contractId || "").toLowerCase().includes(q) || (r.email || "").toLowerCase().includes(q))) return false;
			}
			if (filters.industry && r.industry !== filters.industry) return false;
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
				className: "flex items-center justify-between rounded-xl bg-violet-500/10 border border-violet-500/20 px-4 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-violet-700 font-medium",
					children: "You have unsaved changes in this session."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => dispatch(undoVendorEdit()),
					className: "inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-800 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "h-3.5 w-3.5" }), "Undo Last Edit"]
				})]
			}),
			validation.issues && validation.issues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorValidationPanel, { issues: validation.issues }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4 border-border shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search in preview records...",
							value: filters.search,
							onChange: (e) => dispatch(setVendorFilters({
								...filters,
								search: e.target.value
							})),
							className: "w-full pl-9 pr-4 py-2 bg-surface-alt/50 border border-border rounded-xl text-xs outline-none focus:border-violet-500 transition"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 w-full sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filters.industry,
								onChange: (e) => dispatch(setVendorFilters({
									...filters,
									industry: e.target.value
								})),
								className: "h-9 px-3 bg-surface-alt/50 border border-border rounded-xl text-xs outline-none focus:border-violet-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "All Industries"
								}), industries.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: ind,
									children: ind
								}, ind))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filters.status,
								onChange: (e) => dispatch(setVendorFilters({
									...filters,
									status: e.target.value
								})),
								className: "h-9 px-3 bg-surface-alt/50 border border-border rounded-xl text-xs outline-none focus:border-violet-500",
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
									className: "h-9 px-4 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10 text-xs font-semibold transition shrink-0",
									children: "Re-upload"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Start Over?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This will discard all current preview records and manual edits. You will return to the upload screen." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
								onClick: () => dispatch(setVendorStep("upload")),
								className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
								children: "Discard & Upload"
							})] })] })] })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorPreviewTable, {
				vendors: filteredRecords,
				errorRowIds,
				warningRowIds,
				schemaDef: backendPreview?.schema_def
			}),
			backendPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorStickyFooter, {
				recordCount: records.length,
				errorCount: validation.errors,
				backendPreview
			})
		]
	});
}
function VendorUploadPage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const step = useAppSelector((state) => state.cfo.vendor.step);
	const handleBack = () => {
		if (step === "preview") dispatch(setVendorStep("upload"));
		else {
			dispatch(resetVendor());
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
				children: "Upload Vendor Portfolio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-text-secondary mt-0.5 text-xs sm:text-sm leading-relaxed",
				children: "Import your vendor master data via Excel or manual entry."
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorUploadDropzone, {})
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorPreviewStep, {})
				}, "preview")]
			})
		})]
	});
}
//#endregion
export { VendorUploadPage as t };
