import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Dn as ChartColumn, Mn as Building2, Sn as ChevronLeft, T as Table, _ as TriangleAlert, b as Trash2, en as EllipsisVertical } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { g as Link, v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { n as cfoKeys } from "./cfoAxios-sGO5vNpk.mjs";
import { t as vendorApi } from "./vendorApi-C2s6RChe.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BmxB5i3Q.mjs";
import { t as Checkbox } from "./input-RnTFYsbl.mjs";
import { a as DropdownMenuTrigger, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-Bug9VbBS.mjs";
import { n as StatusBadge, r as exportToExcel, t as DirectoryToolbar } from "./exportUtils-Bj7Un0L-.mjs";
import { t as SpotliteVendorAnalytics } from "./spotlite-vendor-analytics-Dv5B5Apd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VendorDirectoryPage-CTf5JMta.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useVendorDirectory(initialFilters) {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(initialFilters?.page ?? 1);
	const [size, setSize] = (0, import_react.useState)(initialFilters?.size ?? 50);
	const [search, setSearch] = (0, import_react.useState)(initialFilters?.search ?? "");
	const [industry, setIndustry] = (0, import_react.useState)(initialFilters?.industry ?? "");
	const [status, setStatus] = (0, import_react.useState)(initialFilters?.status ?? "");
	const [recurring, setRecurring] = (0, import_react.useState)(initialFilters?.recurring === true ? "true" : initialFilters?.recurring === false ? "false" : typeof initialFilters?.recurring === "string" ? initialFilters.recurring : "");
	const [contractType, setContractType] = (0, import_react.useState)(initialFilters?.contractType ?? "");
	const [currency, setCurrency] = (0, import_react.useState)(initialFilters?.currency ?? "");
	const queryParams = (0, import_react.useMemo)(() => {
		let parsedRecurring = void 0;
		if (recurring === "true" || recurring === "1") parsedRecurring = true;
		else if (recurring === "false" || recurring === "0") parsedRecurring = false;
		return {
			page,
			size,
			search: search.trim() || void 0,
			industry: industry || void 0,
			status: status || void 0,
			recurring: parsedRecurring,
			contract_type: contractType || void 0,
			currency: currency || void 0
		};
	}, [
		page,
		size,
		search,
		industry,
		status,
		recurring,
		contractType,
		currency
	]);
	const query = useQuery({
		queryKey: cfoKeys.vendors.all(queryParams),
		queryFn: async () => {
			const res = await vendorApi.getAll(queryParams);
			const data = res?.data?.data ?? res?.data ?? {};
			return {
				items: data.items ?? data.vendors ?? data.records ?? (Array.isArray(data) ? data : []),
				total: Number(data.total ?? data.totalCount ?? data.count ?? 0),
				page: Number(data.page ?? page),
				size: Number(data.size ?? size)
			};
		},
		placeholderData: (previousData) => previousData
	});
	const updateMutation = useMutation({
		mutationFn: async ({ id, patch }) => {
			return vendorApi.updateVendor(id, patch);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cfo", "vendors"] });
			queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		}
	});
	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			return vendorApi.deleteVendor(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cfo", "vendors"] });
			queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		}
	});
	const saveBatch = async (dirtyMap) => {
		const entries = Object.entries(dirtyMap);
		if (entries.length === 0) return;
		let successCount = 0;
		let errorCount = 0;
		for (const [id, patch] of entries) try {
			await vendorApi.updateVendor(id, patch);
			successCount++;
		} catch (err) {
			errorCount++;
		}
		queryClient.invalidateQueries({ queryKey: ["cfo", "vendors"] });
		queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		if (errorCount === 0) toast.success(`Successfully saved ${successCount} vendor record${successCount > 1 ? "s" : ""}.`);
		else toast.error(`Saved ${successCount} records, but ${errorCount} failed.`);
	};
	const deleteBatch = async (ids) => {
		if (ids.length === 0) return;
		let successCount = 0;
		let errorCount = 0;
		for (const id of ids) try {
			await vendorApi.deleteVendor(id);
			successCount++;
		} catch (err) {
			errorCount++;
		}
		queryClient.invalidateQueries({ queryKey: ["cfo", "vendors"] });
		queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		if (errorCount === 0) toast.success(`Deleted ${successCount} vendor record${successCount > 1 ? "s" : ""}.`);
		else toast.error(`Deleted ${successCount} records, but ${errorCount} failed.`);
	};
	return {
		vendors: query.data?.items ?? [],
		total: query.data?.total ?? 0,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		page,
		setPage,
		size,
		setSize,
		search,
		setSearch,
		industry,
		setIndustry,
		status,
		setStatus,
		recurring,
		setRecurring,
		contractType,
		setContractType,
		currency,
		setCurrency,
		refetch: query.refetch,
		updateMutation,
		deleteMutation,
		saveBatch,
		deleteBatch
	};
}
var INDUSTRIES = [
	"All Industries",
	"Software / SaaS",
	"IT Services",
	"Consulting",
	"Marketing & Advertising",
	"Financial Services",
	"Logistics",
	"Facilities",
	"Hardware",
	"Telecommunications",
	"Legal",
	"Other"
];
var STATUSES = [
	"All Statuses",
	"Active",
	"Inactive",
	"Expired",
	"Pending"
];
var RECURRING_OPTIONS = [
	{
		label: "All Recurrence",
		value: "all"
	},
	{
		label: "Recurring Only",
		value: "true"
	},
	{
		label: "One-off Only",
		value: "false"
	}
];
var CONTRACT_TYPES = [
	"All Contract Types",
	"Fixed Price",
	"Time & Material",
	"Retainer",
	"Milestone",
	"Subscription"
];
var EXPORT_COLUMNS = [
	{
		header: "Vendor ID",
		key: "vendor_id",
		width: 16
	},
	{
		header: "Vendor Name",
		key: "vendor_name",
		width: 24
	},
	{
		header: "Contract ID",
		key: "contract_id",
		width: 18
	},
	{
		header: "Industry",
		key: "industry",
		width: 20
	},
	{
		header: "Status",
		key: "status",
		width: 14
	},
	{
		header: "Recurring",
		key: "recurring",
		width: 14,
		type: "boolean"
	},
	{
		header: "Contract Type",
		key: "contract_type",
		width: 18
	},
	{
		header: "Currency",
		key: "currency",
		width: 12
	},
	{
		header: "Contract Value",
		key: "contract_value",
		width: 16,
		type: "number"
	},
	{
		header: "Start Date",
		key: "contract_start_date",
		width: 16,
		type: "date"
	},
	{
		header: "End Date",
		key: "contract_end_date",
		width: 16,
		type: "date"
	},
	{
		header: "Renewal Date",
		key: "renewal_date",
		width: 16,
		type: "date"
	},
	{
		header: "GST Number",
		key: "gst_number",
		width: 18
	},
	{
		header: "PAN Number",
		key: "pan_number",
		width: 16
	},
	{
		header: "Contact Name",
		key: "primary_contact_name",
		width: 20
	},
	{
		header: "Email",
		key: "email",
		width: 26
	},
	{
		header: "Phone",
		key: "phone",
		width: 16
	}
];
function getDaysUntilExpiry(endDateStr) {
	if (!endDateStr) return null;
	try {
		const end = new Date(endDateStr);
		if (Number.isNaN(end.getTime())) return null;
		const now = /* @__PURE__ */ new Date();
		const diffMs = end.getTime() - now.getTime();
		return Math.ceil(diffMs / (1e3 * 60 * 60 * 24));
	} catch {
		return null;
	}
}
function VendorDirectoryPage() {
	const searchParams = useSearch({ strict: false }) || {};
	const { vendors, total, isLoading, isFetching, page, setPage, size, setSize, search, setSearch, industry, setIndustry, status, setStatus, recurring, setRecurring, contractType, setContractType, refetch, saveBatch, deleteBatch } = useVendorDirectory({
		status: searchParams.status,
		industry: searchParams.industry,
		recurring: searchParams.recurring,
		search: searchParams.search
	});
	const [viewMode, setViewMode] = (0, import_react.useState)("analytics");
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
		if (checked) setSelectedIds(new Set(vendors.map((v) => v.id || v.vendor_id || v.vendorId)));
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
			const dataToExport = vendors.map((ven) => ({
				...ven,
				vendor_id: ven.vendor_id || ven.vendorId,
				vendor_name: ven.vendor_name || ven.vendorName,
				contract_id: ven.contract_id || ven.contractId,
				contract_type: ven.contract_type || ven.contractType,
				contract_start_date: ven.contract_start_date || ven.contractStartDate,
				contract_end_date: ven.contract_end_date || ven.contractEndDate,
				renewal_date: ven.renewal_date || ven.renewalDate,
				gst_number: ven.gst_number || ven.gstNumber,
				pan_number: ven.pan_number || ven.panNumber,
				primary_contact_name: ven.primary_contact_name || ven.primaryContactName
			}));
			await exportToExcel({
				filename: `Vendor_Directory_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}`,
				title: "Spotlite Vendor Directory Master",
				sheetName: "Vendors",
				creator: "Spotlite CFO Operations",
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
	const isAllSelected = vendors.length > 0 && selectedIds.size === vendors.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cfo",
							className: "inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-foreground transition-colors group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" }), "Back to Overview"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 border border-violet-500/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold tracking-tight text-foreground",
								children: "Vendor Directory"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "bg-violet-500/5 text-violet-600 border-violet-500/20 font-mono text-[11px] font-bold tabular-nums px-2 py-0.5",
								children: [total.toLocaleString(), " records"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-text-secondary text-xs mt-0.5 leading-relaxed",
							children: "Centralized partner master with contract durations, recurrence, and financial classifications."
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex rounded-lg border border-border bg-surface p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setViewMode("analytics"),
							className: cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all", viewMode === "analytics" ? "bg-violet-500 text-white shadow-xs" : "text-text-secondary hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3.5 w-3.5" }), "Analytics"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setViewMode("table"),
							className: cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all", viewMode === "table" ? "bg-violet-500 text-white shadow-xs" : "text-text-secondary hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { className: "h-3.5 w-3.5" }), "Table"]
						})]
					})
				})]
			}),
			viewMode === "analytics" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteVendorAnalytics, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border/80 p-4 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DirectoryToolbar, {
					search,
					onSearchChange: setSearch,
					searchPlaceholder: "Search by vendor name, ID, contract...",
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
							value: industry || "All Industries",
							onValueChange: (val) => setIndustry(val === "All Industries" ? "" : val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs w-37.5 bg-surface border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Industry" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: ind,
								className: "text-xs",
								children: ind
							}, ind)) })]
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
							value: recurring || "all",
							onValueChange: (val) => setRecurring(val === "all" ? "" : val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs w-35 bg-surface border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Recurrence" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: RECURRING_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: opt.value,
								className: "text-xs",
								children: opt.label
							}, opt.value)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: contractType || "All Contract Types",
							onValueChange: (val) => setContractType(val === "All Contract Types" ? "" : val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs w-37.5 bg-surface border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Contract Type" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CONTRACT_TYPES.map((ct) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: ct,
								className: "text-xs",
								children: ct
							}, ct)) })]
						})
					] })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
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
									children: "Vendor ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Vendor Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Contract ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Industry"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Recurrence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Contract Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Currency"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "End Date / Expiry"
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
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-20" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-12" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4 mx-auto" })
									})
								]
							}, i)) : vendors.length > 0 ? vendors.map((ven) => {
								const venId = ven.id || ven.vendor_id || ven.vendorId || ven.rowId;
								const isSelected = selectedIds.has(venId);
								const displayVenId = ven.vendor_id ?? ven.vendorId ?? "";
								const displayName = ven.vendor_name ?? ven.vendorName ?? "";
								const displayContractId = ven.contract_id ?? ven.contractId ?? "";
								const displayIndustry = ven.industry ?? "";
								const displayStatus = ven.status ?? "Active";
								const isRecurring = ven.recurring === true || ven.recurring === "true" || ven.recurring === "Yes" || ven.recurring === "1";
								const displayContractType = ven.contract_type ?? ven.contractType ?? "Fixed Price";
								const displayCurrency = ven.currency ?? "INR";
								const displayEndDate = ven.contract_end_date ?? ven.contractEndDate ?? "";
								const daysUntilExpiry = getDaysUntilExpiry(displayEndDate);
								const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 30;
								const isExpired = daysUntilExpiry !== null && daysUntilExpiry < 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: cn("transition-colors hover:bg-surface-alt/50", isSelected && "bg-violet-500/5 hover:bg-violet-500/10"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: isSelected,
												onCheckedChange: (c) => handleSelectRow(venId, !!c),
												"aria-label": `Select ${displayName}`
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-mono font-medium text-foreground whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayVenId,
												onChange: (e) => handleCellChange(venId, "vendor_id", e.target.value),
												className: "min-w-30 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
											}) : displayVenId || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-semibold text-foreground whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayName,
												onChange: (e) => handleCellChange(venId, "vendor_name", e.target.value),
												className: "min-w-50 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
											}) : displayName || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-mono text-xs text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayContractId,
												onChange: (e) => handleCellChange(venId, "contract_id", e.target.value),
												className: "min-w-35 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
											}) : displayContractId || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayIndustry,
												onChange: (e) => handleCellChange(venId, "industry", e.target.value),
												className: "min-w-40 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
											}) : displayIndustry || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												defaultValue: displayStatus,
												onChange: (e) => handleCellChange(venId, "status", e.target.value),
												className: "min-w-27.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500",
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
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Expired",
														children: "Expired"
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: displayStatus })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												defaultValue: isRecurring ? "true" : "false",
												onChange: (e) => handleCellChange(venId, "recurring", e.target.value === "true"),
												className: "min-w-27.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "true",
													children: "Recurring"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "false",
													children: "One-off"
												})]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: isRecurring ? "recurring" : "one-off" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayContractType,
												onChange: (e) => handleCellChange(venId, "contract_type", e.target.value),
												className: "min-w-35 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
											}) : displayContractType || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-mono text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												defaultValue: displayCurrency,
												onChange: (e) => handleCellChange(venId, "currency", e.target.value),
												className: "min-w-22.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
											}) : displayCurrency || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 text-text-secondary whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												defaultValue: displayEndDate,
												onChange: (e) => handleCellChange(venId, "contract_end_date", e.target.value),
												className: "min-w-37.5 bg-surface border border-border rounded px-2 py-1 outline-none text-xs focus:border-violet-500"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 flex-wrap",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: displayEndDate || "—" }),
													isExpiringSoon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														variant: "outline",
														className: "bg-amber-500/10 text-amber-600 border-amber-500/30 text-[10px] px-1.5 py-0 font-semibold gap-1 whitespace-nowrap",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-2.5 w-2.5" }),
															daysUntilExpiry,
															"d left"
														]
													}),
													isExpired && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "bg-rose-500/10 text-rose-600 border-rose-500/30 text-[10px] px-1.5 py-0 font-semibold whitespace-nowrap",
														children: "Expired"
													})
												]
											})
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
														setSingleDeleteId(venId);
														setDeleteConfirmOpen(true);
													},
													className: "text-destructive focus:text-destructive text-xs gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Delete"]
												})
											})] })
										})
									]
								}, venId);
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 11,
								className: "px-4 py-16 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center max-w-sm mx-auto",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold text-foreground",
											children: "No vendors found"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-text-secondary mt-1 text-center",
											children: search || industry || status || recurring || contractType ? "No records match your active filter criteria. Try resetting filters." : "Upload your vendor portfolio sheet to populate the directory."
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
							" ",
							"vendors"
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
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: deleteConfirmOpen,
				onOpenChange: setDeleteConfirmOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-base font-bold text-foreground",
						children: singleDeleteId ? "Delete Vendor Record" : "Delete Selected Records"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-text-secondary mt-1",
						children: singleDeleteId ? "Are you sure you want to delete this vendor record? This action will soft-delete the record from the database." : `Are you sure you want to delete ${selectedIds.size} selected vendor record${selectedIds.size > 1 ? "s" : ""}?`
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
//#endregion
export { VendorDirectoryPage as t };
