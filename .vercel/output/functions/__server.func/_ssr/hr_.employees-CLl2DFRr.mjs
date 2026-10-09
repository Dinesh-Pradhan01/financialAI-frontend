import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Sn as ChevronLeft, b as Trash2, en as EllipsisVertical, o as Users } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { g as Link, v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as isHR } from "./roles-Cu-hhfHW.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as queryKeys } from "./queryKeys-DHNOxYVt.mjs";
import { t as AccessRestrictedScreen } from "./AccessRestrictedScreen-DxTGrBZi.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BmxB5i3Q.mjs";
import { t as Checkbox } from "./input-RnTFYsbl.mjs";
import { a as DropdownMenuTrigger, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-Bug9VbBS.mjs";
import { n as StatusBadge, r as exportToExcel, t as DirectoryToolbar } from "./exportUtils-Bj7Un0L-.mjs";
import { t as employeeApi } from "./employeeApi-pOPj55l0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hr_.employees-CLl2DFRr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useEmployeeDirectory(initialFilters) {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(initialFilters?.page ?? 1);
	const [size, setSize] = (0, import_react.useState)(initialFilters?.size ?? 50);
	const [search, setSearch] = (0, import_react.useState)(initialFilters?.search ?? "");
	const [department, setDepartment] = (0, import_react.useState)(initialFilters?.department ?? "");
	const [status, setStatus] = (0, import_react.useState)(initialFilters?.status ?? "");
	const [employmentType, setEmploymentType] = (0, import_react.useState)(initialFilters?.employmentType ?? "");
	const queryParams = (0, import_react.useMemo)(() => ({
		page,
		size,
		search: search.trim() || void 0,
		department: department || void 0,
		status: status || void 0,
		employment_type: employmentType || void 0
	}), [
		page,
		size,
		search,
		department,
		status,
		employmentType
	]);
	const query = useQuery({
		queryKey: queryKeys.hr.employees.all(queryParams),
		queryFn: async () => {
			const res = await employeeApi.getAll(queryParams);
			const data = res?.data?.data ?? res?.data ?? {};
			return {
				items: data.items ?? data.employees ?? data.records ?? (Array.isArray(data) ? data : []),
				total: Number(data.total ?? data.totalCount ?? data.count ?? 0),
				page: Number(data.page ?? page),
				size: Number(data.size ?? size)
			};
		},
		placeholderData: (previousData) => previousData
	});
	const updateMutation = useMutation({
		mutationFn: async ({ id, patch }) => {
			return employeeApi.updateEmployee(id, patch);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
			queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.employee() });
		}
	});
	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			return employeeApi.deleteEmployee(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
			queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.employee() });
		}
	});
	const saveBatch = async (dirtyMap) => {
		const entries = Object.entries(dirtyMap);
		if (entries.length === 0) return;
		let successCount = 0;
		let errorCount = 0;
		for (const [id, patch] of entries) try {
			await employeeApi.updateEmployee(id, patch);
			successCount++;
		} catch (err) {
			errorCount++;
		}
		queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
		queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.employee() });
		if (errorCount === 0) toast.success(`Successfully saved ${successCount} record${successCount > 1 ? "s" : ""}.`);
		else toast.error(`Saved ${successCount} records, but ${errorCount} failed.`);
	};
	const deleteBatch = async (ids) => {
		if (ids.length === 0) return;
		let successCount = 0;
		let errorCount = 0;
		for (const id of ids) try {
			await employeeApi.deleteEmployee(id);
			successCount++;
		} catch (err) {
			errorCount++;
		}
		queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
		queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.employee() });
		if (errorCount === 0) toast.success(`Deleted ${successCount} employee record${successCount > 1 ? "s" : ""}.`);
		else toast.error(`Deleted ${successCount} records, but ${errorCount} failed.`);
	};
	return {
		employees: query.data?.items ?? [],
		total: query.data?.total ?? 0,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		page,
		setPage,
		size,
		setSize,
		search,
		setSearch,
		department,
		setDepartment,
		status,
		setStatus,
		employmentType,
		setEmploymentType,
		refetch: query.refetch,
		updateMutation,
		deleteMutation,
		saveBatch,
		deleteBatch
	};
}
var DEPARTMENTS = [
	"All Departments",
	"Engineering",
	"Product",
	"Sales",
	"Marketing",
	"Finance",
	"Human Resources",
	"Operations",
	"Legal",
	"Customer Support"
];
var STATUSES = [
	"All Statuses",
	"Active",
	"Inactive",
	"Notice Period",
	"Resigned"
];
var EMPLOYMENT_TYPES = [
	"All Types",
	"Full Time",
	"Part Time",
	"Contract",
	"Intern"
];
var EXPORT_COLUMNS = [
	{
		header: "Employee ID",
		key: "employee_id",
		width: 16
	},
	{
		header: "Employee Name",
		key: "employee_name",
		width: 24
	},
	{
		header: "Email",
		key: "email",
		width: 28
	},
	{
		header: "Phone",
		key: "phone",
		width: 16
	},
	{
		header: "Department",
		key: "department",
		width: 18
	},
	{
		header: "Designation",
		key: "designation",
		width: 22
	},
	{
		header: "Status",
		key: "status",
		width: 14
	},
	{
		header: "Employment Type",
		key: "employment_type",
		width: 18
	},
	{
		header: "Salary",
		key: "salary",
		width: 16,
		type: "number"
	},
	{
		header: "Joining Date",
		key: "joining_date",
		width: 16,
		type: "date"
	},
	{
		header: "PAN",
		key: "pan",
		width: 16
	},
	{
		header: "Aadhaar",
		key: "aadhaar",
		width: 18
	},
	{
		header: "Bank Name",
		key: "bank_name",
		width: 20
	},
	{
		header: "Account Number",
		key: "account_number",
		width: 20
	},
	{
		header: "IFSC Code",
		key: "ifsc_code",
		width: 16
	},
	{
		header: "Payment Mode",
		key: "payment_mode",
		width: 16
	}
];
function formatDateOnly(val) {
	if (!val) return "";
	if (typeof val === "string") {
		const trimmed = val.trim();
		if (!trimmed) return "";
		if (trimmed.includes(" ")) return trimmed.split(" ")[0];
		if (trimmed.includes("T")) return trimmed.split("T")[0];
		return trimmed;
	}
	if (val instanceof Date && !Number.isNaN(val.getTime())) return val.toISOString().split("T")[0];
	return String(val);
}
function EmployeeDirectoryPage() {
	const searchParams = useSearch({ strict: false }) || {};
	const { employees, total, isLoading, isFetching, page, setPage, size, setSize, search, setSearch, department, setDepartment, status, setStatus, employmentType, setEmploymentType, refetch, saveBatch, deleteBatch } = useEmployeeDirectory({
		status: searchParams.status,
		department: searchParams.department,
		search: searchParams.search
	});
	const [isEditMode, setIsEditMode] = (0, import_react.useState)(false);
	const [dirtyMap, setDirtyMap] = (0, import_react.useState)({});
	const [selectedIds, setSelectedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isExporting, setIsExporting] = (0, import_react.useState)(false);
	const [deleteConfirmOpen, setDeleteConfirmOpen] = (0, import_react.useState)(false);
	const [singleDeleteId, setSingleDeleteId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
			if (e.key === "e" || e.key === "E") {
				e.preventDefault();
				setIsEditMode(true);
			} else if (e.key === "Escape" && isEditMode) {
				e.preventDefault();
				handleCancel();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isEditMode]);
	const dirtyCount = Object.keys(dirtyMap).length;
	const handleCellChange = (id, field, val) => {
		setDirtyMap((prev) => ({
			...prev,
			[id]: {
				...prev[id] || {},
				[field]: val
			}
		}));
	};
	const handleSave = async () => {
		setIsSaving(true);
		try {
			await saveBatch(dirtyMap);
			setDirtyMap({});
			setIsEditMode(false);
		} finally {
			setIsSaving(false);
		}
	};
	const handleCancel = () => {
		setDirtyMap({});
		setIsEditMode(false);
	};
	const handleSelectAll = (checked) => {
		if (checked) setSelectedIds(new Set(employees.map((e) => e.id || e.employee_id || e.employeeId)));
		else setSelectedIds(/* @__PURE__ */ new Set());
	};
	const handleSelectRow = (id, checked) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (checked) next.add(id);
			else next.delete(id);
			return next;
		});
	};
	const handleExport = async () => {
		setIsExporting(true);
		try {
			const dataToExport = employees.map((emp) => ({
				...emp,
				employee_id: emp.employee_id || emp.employeeId,
				employee_name: emp.employee_name || emp.employeeName,
				joining_date: formatDateOnly(emp.joining_date || emp.joiningDate),
				employment_type: emp.employment_type || emp.employmentType,
				payment_mode: emp.payment_mode || emp.paymentMode,
				account_number: emp.account_number || emp.accountNumber,
				ifsc_code: emp.ifsc_code || emp.ifscCode,
				bank_name: emp.bank_name || emp.bankName
			}));
			await exportToExcel({
				filename: `Employee_Directory_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}`,
				title: "Spotlite Employee Directory Master",
				sheetName: "Employees",
				creator: "Spotlite HR Operations",
				columns: EXPORT_COLUMNS,
				data: dataToExport
			});
		} finally {
			setIsExporting(false);
		}
	};
	const handleConfirmDelete = async () => {
		if (singleDeleteId) {
			await deleteBatch([singleDeleteId]);
			setSingleDeleteId(null);
		} else if (selectedIds.size > 0) {
			await deleteBatch(Array.from(selectedIds));
			setSelectedIds(/* @__PURE__ */ new Set());
		}
		setDeleteConfirmOpen(false);
	};
	const totalPages = Math.ceil(total / size) || 1;
	const isAllSelected = employees.length > 0 && selectedIds.size === employees.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/hr",
							className: "inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-foreground transition-colors group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" }), "Back to Overview"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold tracking-tight text-foreground",
								children: "Employee Directory"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "bg-primary/5 text-primary border-primary/20 font-mono text-[11px] font-bold tabular-nums px-2 py-0.5",
								children: [total.toLocaleString(), " records"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-text-secondary text-xs mt-0.5 leading-relaxed",
							children: "Comprehensive directory of workforce records, designations, and payment details."
						})] })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/80 p-4 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DirectoryToolbar, {
					search,
					onSearchChange: setSearch,
					searchPlaceholder: "Search by name, ID, email...",
					isEditMode,
					onToggleEdit: () => setIsEditMode(true),
					onSave: handleSave,
					onCancel: handleCancel,
					isSaving,
					dirtyCount,
					onExport: handleExport,
					isExporting,
					selectedCount: selectedIds.size,
					onBulkDelete: () => setDeleteConfirmOpen(true),
					onRefresh: refetch,
					isRefreshing: isFetching,
					totalRecords: total,
					filters: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: department || "All Departments",
							onValueChange: (val) => setDepartment(val === "All Departments" ? "" : val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs w-37.5 bg-surface border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Department" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEPARTMENTS.map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: dept,
								className: "text-xs",
								children: dept
							}, dept)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status || "All Statuses",
							onValueChange: (val) => setStatus(val === "All Statuses" ? "" : val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs w-32.5 bg-surface border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STATUSES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: st,
								className: "text-xs",
								children: st
							}, st)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: employmentType || "All Types",
							onValueChange: (val) => setEmploymentType(val === "All Types" ? "" : val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs w-32.5 bg-surface border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Type" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: EMPLOYMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: t,
								className: "text-xs",
								children: t
							}, t)) })]
						})
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-border/80 shadow-xs overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-alt/80 text-[11px] font-semibold text-text-secondary border-b border-border sticky top-0 z-10 uppercase tracking-wider",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 w-10 whitespace-nowrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: isAllSelected,
										onCheckedChange: (c) => handleSelectAll(!!c),
										"aria-label": "Select all"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Employee ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Department"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Designation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap text-right",
									children: "Salary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Payment Mode"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Joining Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 w-12 text-center whitespace-nowrap",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: isLoading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "animate-pulse",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4 rounded" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-20" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-32" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-28" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-16 rounded-full" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-20" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-16 ml-auto" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-20" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-20" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4 mx-auto" })
									})
								]
							}, i)) : employees.length > 0 ? employees.map((emp) => {
								const empId = emp.id || emp.employee_id || emp.employeeId || emp.rowId;
								const isSelected = selectedIds.has(empId);
								dirtyMap[empId];
								const displayEmpId = emp.employee_id ?? emp.employeeId ?? "";
								const displayName = emp.employee_name ?? emp.employeeName ?? "";
								const displayDept = emp.department ?? "";
								const displayDesig = emp.designation ?? "";
								const displayStatus = emp.status ?? "Active";
								const displayType = emp.employment_type ?? emp.employmentType ?? "Full Time";
								const displaySalary = emp.salary ?? "";
								const displayPaymentMode = emp.payment_mode ?? emp.paymentMode ?? "";
								const displayJoiningDate = formatDateOnly(emp.joining_date ?? emp.joiningDate);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: cn("transition-colors hover:bg-surface-alt/50", isSelected && "bg-primary/5 hover:bg-primary/10"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: isSelected,
												onCheckedChange: (c) => handleSelectRow(empId, !!c),
												"aria-label": `Select ${displayName}`
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-mono font-medium text-foreground whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayEmpId,
												onChange: (e) => handleCellChange(empId, "employee_id", e.target.value),
												className: "min-w-30 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
											}) : displayEmpId || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-semibold text-foreground whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayName,
												onChange: (e) => handleCellChange(empId, "employee_name", e.target.value),
												className: "min-w-45 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
											}) : displayName || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayDept,
												onChange: (e) => handleCellChange(empId, "department", e.target.value),
												className: "min-w-35 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
											}) : displayDept || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayDesig,
												onChange: (e) => handleCellChange(empId, "designation", e.target.value),
												className: "min-w-40 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
											}) : displayDesig || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												defaultValue: displayStatus,
												onChange: (e) => handleCellChange(empId, "status", e.target.value),
												className: "min-w-27.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary",
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
														value: "Notice Period",
														children: "Notice Period"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Resigned",
														children: "Resigned"
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: displayStatus })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayType,
												onChange: (e) => handleCellChange(empId, "employment_type", e.target.value),
												className: "min-w-30 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
											}) : displayType || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-mono text-right text-foreground whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												defaultValue: displaySalary,
												onChange: (e) => handleCellChange(empId, "salary", e.target.value),
												className: "min-w-30 text-right bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
											}) : displaySalary ? !Number.isNaN(Number(displaySalary)) ? `₹${Number(displaySalary).toLocaleString("en-IN")}` : displaySalary : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayPaymentMode,
												onChange: (e) => handleCellChange(empId, "payment_mode", e.target.value),
												className: "min-w-32.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
											}) : displayPaymentMode || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												defaultValue: displayJoiningDate,
												onChange: (e) => handleCellChange(empId, "joining_date", e.target.value),
												className: "min-w-35 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-primary"
											}) : displayJoiningDate || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-center whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													className: "h-7 w-7 p-0 text-text-tertiary hover:text-foreground",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" })
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
												align: "end",
												className: "w-32",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
													onClick: () => {
														setSingleDeleteId(empId);
														setDeleteConfirmOpen(true);
													},
													className: "text-destructive focus:text-destructive text-xs gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Delete"]
												})
											})] })
										})
									]
								}, empId);
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 11,
								className: "px-4 py-16 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center max-w-sm mx-auto",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold text-foreground",
											children: "No employees found"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-text-secondary mt-1 text-center",
											children: search || department || status || employmentType ? "No records match your active filter criteria. Try resetting filters." : "Upload your employee master sheet to populate the directory."
										})
									]
								})
							}) })
						})]
					})
				}), total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border bg-surface-alt/40 text-xs text-text-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Showing ",
							(page - 1) * size + 1,
							"–",
							Math.min(page * size, total),
							" of ",
							total,
							" employees"
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rows per page:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: String(size),
								onValueChange: (val) => setSize(Number(val)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-7 w-16 text-xs bg-surface border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "10",
										children: "10"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "25",
										children: "25"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "50",
										children: "50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "100",
										children: "100"
									})
								] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setPage((p) => Math.max(1, p - 1)),
									disabled: page <= 1,
									className: "h-7 px-2.5 text-xs border-border",
									children: "Previous"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs px-2 font-medium",
									children: [
										"Page ",
										page,
										" of ",
										totalPages
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
									disabled: page >= totalPages,
									className: "h-7 px-2.5 text-xs border-border",
									children: "Next"
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: deleteConfirmOpen,
				onOpenChange: setDeleteConfirmOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-base font-bold text-foreground",
						children: singleDeleteId ? "Delete Employee Record" : "Delete Selected Records"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-text-secondary mt-1",
						children: singleDeleteId ? "Are you sure you want to delete this employee record? This action will soft-delete the record from the database." : `Are you sure you want to delete ${selectedIds.size} selected employee record${selectedIds.size > 1 ? "s" : ""}?`
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:gap-0 mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setDeleteConfirmOpen(false),
							className: "text-xs font-semibold",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "sm",
							onClick: handleConfirmDelete,
							className: "text-xs font-semibold",
							children: "Confirm Delete"
						})]
					})]
				})
			})
		]
	});
}
function HREmployeesRouteComponent() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading employee directory…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isHR(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessRestrictedScreen, {
		title: "Access Restricted",
		description: "Employee Directory is strictly restricted to Human Resources (HR) personnel.",
		currentRole: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeDirectoryPage, {});
}
//#endregion
export { HREmployeesRouteComponent as component };
