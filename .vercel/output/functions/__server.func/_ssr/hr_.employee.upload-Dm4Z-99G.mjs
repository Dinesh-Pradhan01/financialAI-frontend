import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Cn as ChevronDown, Gn as ArrowRight, Kn as ArrowLeft, Q as Plus, U as Search, Vt as FileX, Wt as FileSpreadsheet, _ as TriangleAlert, _n as CircleAlert, b as Trash2, bn as ChevronUp, gn as CircleCheck, h as Undo2, sn as CloudUpload, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { A as setEmployeeFocusedRow, K as undoEmployeeEdit, M as setEmployeeStep, Q as useAppSelector, Z as useAppDispatch, g as resetEmployee, j as setEmployeePreview, k as setEmployeeFilters, u as discardEmployeePreview } from "./store-i6pKH_iX.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as isHR } from "./roles-Cu-hhfHW.mjs";
import { a as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as AccessRestrictedScreen } from "./AccessRestrictedScreen-DxTGrBZi.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-D6uS5Rlr.mjs";
import { t as EmployeePreviewTable } from "./EmployeePreviewTable-CmdIM_F4.mjs";
import { t as employeeApi } from "./employeeApi-pOPj55l0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hr_.employee.upload-Dm4Z-99G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useEmployeeUpload() {
	return useMutation({ mutationFn: ({ file, onProgress }) => {
		return employeeApi.uploadExcel(file, onProgress);
	} });
}
function useEmployeeManualPreview() {
	return useMutation({ mutationFn: (data) => employeeApi.previewManual(data) });
}
function useEmployeeImport() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (previewData) => employeeApi.importEmployees(previewData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["hr", "dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
		}
	});
}
/** Simple short-ID generator – no extra dependency required. */
function shortId() {
	return Math.random().toString(36).slice(2, 8);
}
function generateEmptyRow() {
	return {
		employeeId: "",
		employeeName: "",
		email: "",
		department: "",
		designation: "",
		salary: "",
		status: "Active"
	};
}
function normalizeManualPreviewResponse(raw, userRows) {
	let previewData = raw;
	if (raw && typeof raw === "object" && raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) previewData = raw.data;
	const records = (Array.isArray(previewData?.records) && previewData.records.length > 0 ? previewData.records : userRows).map((r) => ({
		...r,
		employeeId: r.employeeId || r.employee_id || "",
		employeeName: r.employeeName || r.employee_name || "",
		employee_id: r.employee_id || r.employeeId || "",
		employee_name: r.employee_name || r.employeeName || "",
		joiningDate: r.joiningDate || r.joining_date || "",
		dateOfBirth: r.dateOfBirth || r.date_of_birth || "",
		employmentType: r.employmentType || r.employment_type || "",
		previousSalary: r.previousSalary || r.previous_salary || "",
		salaryHikePercent: r.salaryHikePercent || r.hike_percentage || "",
		salaryFrequency: r.salaryFrequency || r.salary_frequency || "",
		panNumber: r.panNumber || r.pan || "",
		aadhaarNumber: r.aadhaarNumber || r.aadhaar || "",
		accountHolderName: r.accountHolderName || r.account_holder_name || "",
		accountNumber: r.accountNumber || r.account_number || "",
		confirmAccountNumber: r.confirmAccountNumber || r.confirm_account_number || "",
		ifscCode: r.ifscCode || r.ifsc_code || "",
		bankName: r.bankName || r.bank_name || "",
		accountType: r.accountType || r.account_type || "",
		paymentMode: r.paymentMode || r.payment_mode || "",
		status: r.status || "Active"
	}));
	const rawSummary = previewData?.summary || previewData?.validation;
	const summary = {
		validEmployees: typeof rawSummary?.validEmployees === "number" ? rawSummary.validEmployees : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
		warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
		errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
		issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
		errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
		warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
		duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
		missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0
	};
	return {
		upload_id: previewData?.upload_id,
		schema_def: previewData?.schema_def,
		records,
		summary,
		validation: summary,
		file_meta: { name: "Manual Entry" }
	};
}
function ManualEntryGrid() {
	const [rows, setRows] = (0, import_react.useState)([generateEmptyRow()]);
	const dispatch = useAppDispatch();
	const previewMutation = useEmployeeManualPreview();
	const handleAddRow = () => {
		setRows([...rows, generateEmptyRow()]);
	};
	const handleDeleteRow = (index) => {
		setRows(rows.filter((_, i) => i !== index));
	};
	const handleChange = (index, field, value) => {
		const newRows = [...rows];
		newRows[index] = {
			...newRows[index],
			[field]: value
		};
		setRows(newRows);
	};
	const handleProceed = () => {
		const validRows = rows.filter((r) => r.employeeId || r.employeeName || r.email);
		if (validRows.length === 0) {
			toast.error("Please fill in at least one row before proceeding.");
			return;
		}
		const rowsForBackend = validRows.map((r, idx) => {
			const rowId = r.rowId || `manual-${shortId()}`;
			const sourceRow = idx + 1;
			return {
				...r,
				rowId,
				sourceRow,
				employee_id: r.employeeId || r.employee_id || "",
				employee_name: r.employeeName || r.employee_name || "",
				email: r.email || "",
				phone: r.phone || "",
				gender: r.gender || "",
				date_of_birth: r.dateOfBirth || r.date_of_birth || "",
				joining_date: r.joiningDate || r.joining_date || "",
				department: r.department || "",
				designation: r.designation || "",
				manager: r.manager || "",
				employment_type: r.employmentType || r.employment_type || "",
				status: r.status || "Active",
				salary: r.salary || "",
				previous_salary: r.previousSalary || r.previous_salary || "",
				hike_percentage: r.salaryHikePercent || r.hike_percentage || "",
				salary_frequency: r.salaryFrequency || r.salary_frequency || "",
				pan: r.panNumber || r.pan || "",
				aadhaar: r.aadhaarNumber || r.aadhaar || "",
				address: r.address || "",
				city: r.city || "",
				state: r.state || "",
				country: r.country || "",
				account_holder_name: r.accountHolderName || r.account_holder_name || "",
				account_number: r.accountNumber || r.account_number || "",
				confirm_account_number: r.confirmAccountNumber || r.confirm_account_number || "",
				ifsc_code: r.ifscCode || r.ifsc_code || "",
				bank_name: r.bankName || r.bank_name || "",
				account_type: r.accountType || r.account_type || "",
				payment_mode: r.paymentMode || r.payment_mode || ""
			};
		});
		previewMutation.mutate(rowsForBackend, {
			onSuccess: (res) => {
				dispatch(setEmployeePreview(normalizeManualPreviewResponse(res?.data ?? res, rowsForBackend)));
				dispatch(setEmployeeStep("preview"));
			},
			onError: (err) => {
				const msg = err?.response?.data?.message ?? err?.message ?? "Failed to preview manual entry data.";
				const rowsWithIds2 = rowsForBackend;
				const localNormalized = {
					records: rowsWithIds2,
					validation: {
						validEmployees: rowsWithIds2.length,
						warnings: 0,
						errors: 0,
						issues: [],
						errorRowIds: [],
						warningRowIds: [],
						duplicateIds: 0,
						missingRequiredFields: 0
					},
					file_meta: { name: "Manual Entry (offline)" }
				};
				toast.warning(`Backend unavailable — showing local preview. (${msg})`);
				dispatch(setEmployeePreview(localNormalized));
				dispatch(setEmployeeStep("preview"));
			}
		});
	};
	const hasData = rows.some((r) => r.employeeId || r.employeeName || r.email);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-hidden border-border/80 shadow-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-alt/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold text-foreground",
				children: "Manual Entry"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-secondary mt-0.5",
				children: "Add employees directly without an Excel file"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleAddRow,
					className: "inline-flex h-8 items-center justify-center rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-3.5 w-3.5" }), "Add Row"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleProceed,
					disabled: !hasData || previewMutation.isPending,
					className: "inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:opacity-50",
					children: previewMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Preview", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 h-3 w-3" })] })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-alt/40 text-xs text-text-secondary border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 font-semibold w-10 text-center text-text-tertiary",
							children: "#"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: "px-4 py-2.5 font-semibold min-w-32.5",
							children: ["Employee ID ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: "px-4 py-2.5 font-semibold min-w-45",
							children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: "px-4 py-2.5 font-semibold min-w-50",
							children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 font-semibold min-w-35",
							children: "Department"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 font-semibold min-w-40",
							children: "Designation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2.5 font-semibold w-10" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border",
					children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-surface-alt/30 transition-colors group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2 text-center text-xs text-text-tertiary",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: row.employeeId || "",
									onChange: (e) => handleChange(i, "employeeId", e.target.value),
									className: "w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm",
									placeholder: "EMP001"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: row.employeeName || "",
									onChange: (e) => handleChange(i, "employeeName", e.target.value),
									className: "w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm",
									placeholder: "John Doe"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: row.email || "",
									onChange: (e) => handleChange(i, "email", e.target.value),
									className: "w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm",
									placeholder: "john@company.com"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: row.department || "",
									onChange: (e) => handleChange(i, "department", e.target.value),
									className: "w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm",
									placeholder: "Engineering"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: row.designation || "",
									onChange: (e) => handleChange(i, "designation", e.target.value),
									className: "w-full bg-transparent border-0 outline-none placeholder:text-text-tertiary/50 text-foreground text-sm",
									placeholder: "Senior Developer"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDeleteRow(i),
									disabled: rows.length === 1,
									className: "opacity-0 group-hover:opacity-100 inline-flex h-6 w-6 items-center justify-center rounded-md text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition disabled:opacity-0",
									title: "Remove row",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})
							})
						]
					}, i))
				})]
			})
		})]
	});
}
function EmployeeUploadDropzone() {
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [uploadError, setUploadError] = (0, import_react.useState)(null);
	const [invalidTemplate, setInvalidTemplate] = (0, import_react.useState)(null);
	const uploadMutation = useEmployeeUpload();
	const dispatch = useAppDispatch();
	const backendPreview = useAppSelector((state) => state.hr.employee.backendPreview);
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
				const records = (Array.isArray(data.records) ? data.records : []).map((r) => ({
					...r,
					employeeId: r.employeeId || r.employee_id || "",
					employeeName: r.employeeName || r.employee_name || "",
					employee_id: r.employee_id || r.employeeId || "",
					employee_name: r.employee_name || r.employeeName || "",
					joiningDate: r.joiningDate || r.joining_date || "",
					dateOfBirth: r.dateOfBirth || r.date_of_birth || "",
					employmentType: r.employmentType || r.employment_type || "",
					previousSalary: r.previousSalary || r.previous_salary || "",
					salaryHikePercent: r.salaryHikePercent || r.hike_percentage || "",
					salaryFrequency: r.salaryFrequency || r.salary_frequency || "",
					panNumber: r.panNumber || r.pan || "",
					aadhaarNumber: r.aadhaarNumber || r.aadhaar || "",
					accountHolderName: r.accountHolderName || r.account_holder_name || "",
					accountNumber: r.accountNumber || r.account_number || "",
					confirmAccountNumber: r.confirmAccountNumber || r.confirm_account_number || "",
					ifscCode: r.ifscCode || r.ifsc_code || "",
					bankName: r.bankName || r.bank_name || "",
					accountType: r.accountType || r.account_type || "",
					paymentMode: r.paymentMode || r.payment_mode || "",
					status: r.status || "Active"
				}));
				const rawSummary = data.summary || data.validation;
				const summary = {
					validEmployees: typeof rawSummary?.validEmployees === "number" ? rawSummary.validEmployees : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
					warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
					errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
					issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
					errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
					warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
					duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
					missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0
				};
				dispatch(setEmployeePreview({
					...data,
					records,
					summary,
					validation: summary
				}));
				setTimeout(() => {
					dispatch(setEmployeeStep("preview"));
				}, 600);
			},
			onError: (err) => {
				const axiosErr = err;
				const status = axiosErr.response?.status;
				const data = axiosErr.response?.data;
				if (status === 400 && data?.missing_columns) setInvalidTemplate({
					missing: data.missing_columns || [],
					unsupported: data.unsupported_columns || []
				});
				else setUploadError(data?.message || axiosErr.message || "Failed to upload file");
			}
		});
	}, [dispatch, uploadMutation]);
	const handleDrop = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		const files = e.dataTransfer.files;
		if (files && files.length > 0) processFile(files[0]);
	}, [processFile]);
	const isUploading = uploadMutation.isPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			backendPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-full bg-primary/10 p-2 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-foreground text-sm",
						children: "Unsaved edits detected"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: [
							"You have a pending import for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: backendPreview.file_meta?.name || "manual data" }),
							" with unsaved changes."
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch(discardEmployeePreview()),
						className: "flex-1 sm:flex-none h-9 px-4 rounded-lg border border-border bg-surface text-xs font-semibold text-text-secondary hover:bg-surface-alt transition",
						children: "Discard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => dispatch(setEmployeeStep("preview")),
						className: "flex-1 sm:flex-none h-9 px-4 rounded-lg bg-primary text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition",
						children: "Resume Session"
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold text-foreground",
						children: "Drop your Excel file here"
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
							id: "file-upload",
							className: "hidden",
							accept: ".xlsx,.xls",
							onChange: (e) => {
								if (e.target.files?.[0]) processFile(e.target.files[0]);
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "file-upload",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManualEntryGrid, {}),
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
								className: "inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover",
								children: "Upload Another"
							})]
						})
					]
				})
			})
		]
	});
}
function EmployeeValidationPanel({ issues }) {
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
			children: [errors.map((err, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueRow, {
				issue: err,
				onReview: () => err.rowId && dispatch(setEmployeeFocusedRow(err.rowId))
			}, `err-${i}`)), warnings.map((warn, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueRow, {
				issue: warn,
				onReview: () => warn.rowId && dispatch(setEmployeeFocusedRow(warn.rowId))
			}, `warn-${i}`))]
		})]
	});
}
function IssueRow({ issue, onReview }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4 p-2.5 hover:bg-surface-alt/50 rounded-lg transition",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2.5",
			children: [issue.severity === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-foreground leading-snug",
				children: issue.message
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] font-mono text-text-tertiary mt-0.5 tabular-nums",
				children: [
					"Row ",
					issue.sourceRow,
					" ",
					issue.field ? `• Column: ${issue.field}` : ""
				]
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onReview,
			className: "shrink-0 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-text-secondary hover:bg-surface-alt hover:text-foreground transition",
			children: "Review"
		})]
	});
}
function EmployeeStickyFooter({ recordCount, errorCount, backendPreview }) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const importMutation = useEmployeeImport();
	const [showSuccess, setShowSuccess] = (0, import_react.useState)(false);
	const [isRevalidating, setIsRevalidating] = (0, import_react.useState)(false);
	const handleCancel = () => {
		dispatch(resetEmployee());
		navigate({ to: "/hr" });
	};
	const handleImport = async () => {
		if (!backendPreview || !backendPreview.records) return;
		try {
			setIsRevalidating(true);
			const resData = (await employeeApi.previewManual(backendPreview.records)).data;
			const data = resData?.data || resData;
			const records = (Array.isArray(data.records) ? data.records : []).map((r) => ({
				...r,
				employeeId: r.employeeId || r.employee_id || "",
				firstName: r.firstName || r.first_name || "",
				lastName: r.lastName || r.last_name || "",
				email: r.email || "",
				department: r.department || "",
				status: r.status || "Active"
			}));
			const rawSummary = data.summary || data.validation;
			const summary = {
				validEmployees: typeof rawSummary?.validEmployees === "number" ? rawSummary.validEmployees : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
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
			dispatch(setEmployeePreview(freshPreview));
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
					children: [recordCount, " employees ready"]
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
						" employee records into the system."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleCancel,
					className: "w-full inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover",
					children: "Done"
				})
			]
		})
	})] });
}
function EmployeePreviewStep() {
	const dispatch = useAppDispatch();
	const rawBackendPreview = useAppSelector((state) => state.hr.employee.backendPreview);
	const pastPreviews = useAppSelector((state) => state.hr.employee.pastPreviews);
	const backendPreview = rawBackendPreview;
	const filters = useAppSelector((state) => state.hr.employee.filters);
	const records = (0, import_react.useMemo)(() => backendPreview?.records || [], [backendPreview?.records]);
	const rawSummary = backendPreview?.summary || backendPreview?.validation;
	const validation = {
		validEmployees: typeof rawSummary?.validEmployees === "number" ? rawSummary.validEmployees : typeof rawSummary?.validRecords === "number" ? rawSummary.validRecords : records.length,
		errors: typeof rawSummary?.errors === "number" ? rawSummary.errors : 0,
		warnings: typeof rawSummary?.warnings === "number" ? rawSummary.warnings : 0,
		duplicateIds: typeof rawSummary?.duplicateIds === "number" ? rawSummary.duplicateIds : 0,
		issues: Array.isArray(rawSummary?.issues) ? rawSummary.issues : [],
		errorRowIds: Array.isArray(rawSummary?.errorRowIds) ? rawSummary.errorRowIds : [],
		warningRowIds: Array.isArray(rawSummary?.warningRowIds) ? rawSummary.warningRowIds : [],
		missingRequiredFields: typeof rawSummary?.missingRequiredFields === "number" ? rawSummary.missingRequiredFields : 0
	};
	const errorRowIds = new Set(validation.errorRowIds || []);
	const warningRowIds = new Set(validation.warningRowIds || []);
	const filteredRecords = (0, import_react.useMemo)(() => {
		return records.filter((r) => {
			const name = r.employeeName || r.employee_name || "";
			const id = r.employeeId || r.employee_id || "";
			if (filters.search && !name.toLowerCase().includes(filters.search.toLowerCase()) && !id.toLowerCase().includes(filters.search.toLowerCase())) return false;
			if (filters.department && r.department !== filters.department) return false;
			if (filters.status && r.status !== filters.status) return false;
			return true;
		});
	}, [records, filters]);
	const uniqueDepartments = (0, import_react.useMemo)(() => Array.from(new Set(records.map((r) => r.department).filter(Boolean))), [records]);
	const uniqueStatuses = (0, import_react.useMemo)(() => Array.from(new Set(records.map((r) => r.status).filter(Boolean))), [records]);
	if (!backendPreview) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-foreground",
					children: backendPreview.file_meta?.name || "Manual Entry Data"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-text-secondary mt-1",
					children: [records.length, " records ready for review."]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => dispatch(undoEmployeeEdit()),
						disabled: pastPreviews.length === 0,
						className: "inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition disabled:opacity-50 disabled:cursor-not-allowed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "h-3.5 w-3.5 mr-1.5" }), "Undo"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white shadow-brand transition hover:bg-primary-hover",
							children: "Upload New"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
						className: "max-w-md bg-surface border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
							className: "text-foreground text-base font-semibold",
							children: "Overwrite Current Data?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
							className: "text-sm text-text-secondary pt-1",
							children: "Uploading a new file will overwrite current data completely. Do you wish to continue?"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
							className: "flex-row items-center justify-end gap-3 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
								onClick: () => dispatch(setEmployeeStep("upload")),
								className: "bg-transparent border border-border text-text-secondary hover:bg-surface-alt hover:text-foreground shadow-none font-medium text-xs h-9 px-4 rounded-lg",
								children: "Continue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
								className: "bg-primary text-white hover:bg-primary-hover border-0 mt-0 font-semibold text-xs h-9 px-5 rounded-lg shadow-sm",
								children: "No"
							})]
						})]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total Valid",
						value: validation.validEmployees,
						tone: "text-emerald-600 bg-emerald-50 border-emerald-100"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Errors",
						value: validation.errors,
						tone: "text-destructive bg-destructive/10 border-destructive/20"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Warnings",
						value: validation.warnings,
						tone: "text-amber-600 bg-amber-50 border-amber-100"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Duplicates",
						value: validation.duplicateIds,
						tone: "text-slate-600 bg-slate-50 border-slate-200"
					})
				]
			}),
			validation.issues?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeValidationPanel, { issues: validation.issues }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search by name or ID...",
							value: filters.search,
							onChange: (e) => dispatch(setEmployeeFilters({
								...filters,
								search: e.target.value
							})),
							className: "w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filters.department,
						onChange: (e) => dispatch(setEmployeeFilters({
							...filters,
							department: e.target.value
						})),
						className: "h-10 px-3 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All Departments"
						}), uniqueDepartments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d,
							children: d
						}, d))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filters.status,
						onChange: (e) => dispatch(setEmployeeFilters({
							...filters,
							status: e.target.value
						})),
						className: "h-10 px-3 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All Statuses"
						}), uniqueStatuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeePreviewTable, {
				employees: filteredRecords,
				errorRowIds,
				warningRowIds
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeStickyFooter, {
				recordCount: records.length,
				errorCount: validation.errors,
				backendPreview
			})
		]
	});
}
function StatCard({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center p-4 rounded-xl border", tone),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-2xl font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold uppercase tracking-wider mt-1 opacity-80",
			children: label
		})]
	});
}
function EmployeeUploadPage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const step = useAppSelector((state) => state.hr.employee.step);
	const handleBack = () => {
		if (step === "preview") dispatch(setEmployeeStep("upload"));
		else {
			dispatch(resetEmployee());
			navigate({ to: "/hr" });
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
				children: "Upload Employee List"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-text-secondary mt-0.5 text-xs sm:text-sm leading-relaxed",
				children: "Import your employee master data via Excel or manual entry."
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeUploadDropzone, {})
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeePreviewStep, {})
				}, "preview")]
			})
		})]
	});
}
function HREmployeeUploadRouteComponent() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading employee upload…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isHR(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessRestrictedScreen, {
		title: "Access Restricted",
		description: "Employee Upload is strictly restricted to Human Resources (HR) personnel.",
		currentRole: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeUploadPage, {});
}
//#endregion
export { HREmployeeUploadRouteComponent as component };
