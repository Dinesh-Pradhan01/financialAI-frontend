import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Dn as ChartColumn, Sn as ChevronLeft, T as Table, _ as TriangleAlert, b as Trash2, en as EllipsisVertical, o as Users } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, r as DialogDescription, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { g as Link, v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as isCFO } from "./roles-Cu-hhfHW.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as AccessRestrictedScreen } from "./AccessRestrictedScreen-DxTGrBZi.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { n as cfoKeys } from "./cfoAxios-sGO5vNpk.mjs";
import { t as clientApi } from "./clientApi-kVDjKSAc.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BmxB5i3Q.mjs";
import { t as Checkbox } from "./input-RnTFYsbl.mjs";
import { t as SpotliteClientAnalytics } from "./spotlite-client-analytics-BRL6DtmF.mjs";
import { a as DropdownMenuTrigger, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-Bug9VbBS.mjs";
import { n as StatusBadge, r as exportToExcel, t as DirectoryToolbar } from "./exportUtils-Bj7Un0L-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cfo_.clients-ByryilMI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getClientRowKey(clientId, category) {
	return `${clientId}:::${category}`;
}
function parseClientRowKey(key) {
	const parts = key.split(":::");
	return {
		clientId: parts[0] || "",
		category: parts[1] || ""
	};
}
function useClientDirectory(initialFilters) {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(initialFilters?.page ?? 1);
	const [size, setSize] = (0, import_react.useState)(initialFilters?.size ?? 50);
	const [search, setSearch] = (0, import_react.useState)(initialFilters?.search ?? "");
	const [category, setCategory] = (0, import_react.useState)(initialFilters?.category ?? "");
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
			category: category || void 0,
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
		category,
		industry,
		status,
		recurring,
		contractType,
		currency
	]);
	const query = useQuery({
		queryKey: cfoKeys.clients.all(queryParams),
		queryFn: async () => {
			const res = await clientApi.getAll(queryParams);
			const data = res?.data?.data ?? res?.data ?? {};
			let items = data.items ?? data.clients ?? data.records ?? (Array.isArray(data) ? data : []);
			if (search.trim()) {
				const q = search.trim().toLowerCase();
				items = items.filter((c) => (c.client_name || c.clientName || "").toLowerCase().includes(q) || (c.client_id || c.clientId || "").toLowerCase().includes(q) || (c.contract_id || c.contractId || "").toLowerCase().includes(q) || (c.legal_name || c.legalName || "").toLowerCase().includes(q));
			}
			if (category) items = items.filter((c) => c.category === category);
			if (industry) items = items.filter((c) => c.industry === industry);
			if (status) items = items.filter((c) => c.status === status);
			if (recurring === "true") items = items.filter((c) => {
				const val = String(c.recurring || "").toLowerCase();
				return val === "yes" || val === "true" || val === "1";
			});
			else if (recurring === "false") items = items.filter((c) => {
				const val = String(c.recurring || "").toLowerCase();
				return val === "no" || val === "false" || val === "0";
			});
			return {
				items,
				total: Number(data.total ?? items.length),
				page: Number(data.page ?? page),
				size: Number(data.size ?? size)
			};
		},
		placeholderData: (previousData) => previousData
	});
	const updateMutation = useMutation({
		mutationFn: async ({ clientId, category, patch }) => {
			return clientApi.updateClient(clientId, category, patch);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
			queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		}
	});
	const deleteMutation = useMutation({
		mutationFn: async ({ clientId, category }) => {
			return clientApi.deleteClient(clientId, category);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
			queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		}
	});
	const saveBatch = async (dirtyMap) => {
		const entries = Object.entries(dirtyMap);
		if (entries.length === 0) return;
		let successCount = 0;
		let errorCount = 0;
		for (const [key, patch] of entries) {
			const { clientId, category: rowCategory } = parseClientRowKey(key);
			const targetCategory = (patch.category || rowCategory).trim();
			try {
				await clientApi.updateClient(clientId, targetCategory, patch);
				successCount++;
			} catch (err) {
				errorCount++;
			}
		}
		queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
		queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		if (errorCount === 0) toast.success(`Successfully saved ${successCount} client record${successCount > 1 ? "s" : ""}.`);
		else toast.error(`Saved ${successCount} records, but ${errorCount} failed.`);
	};
	const deleteBatch = async (keys) => {
		if (keys.length === 0) return;
		let successCount = 0;
		let errorCount = 0;
		for (const key of keys) {
			const { clientId, category: rowCategory } = parseClientRowKey(key);
			try {
				await clientApi.deleteClient(clientId, rowCategory);
				successCount++;
			} catch (err) {
				errorCount++;
			}
		}
		queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
		queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
		if (errorCount === 0) toast.success(`Deleted ${successCount} client record${successCount > 1 ? "s" : ""}.`);
		else toast.error(`Deleted ${successCount} records, but ${errorCount} failed.`);
	};
	return {
		clients: query.data?.items ?? [],
		total: query.data?.total ?? 0,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		page,
		setPage,
		size,
		setSize,
		search,
		setSearch,
		category,
		setCategory,
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
		updateMutation,
		deleteMutation,
		saveBatch,
		deleteBatch,
		refetch: query.refetch
	};
}
var CATEGORIES = [
	"All Categories",
	"Consulting",
	"Software / SaaS",
	"IT Services",
	"Financial Services",
	"Logistics",
	"Marketing",
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
var EXPORT_COLUMNS = [
	{
		header: "Client ID",
		key: "client_id",
		width: 16
	},
	{
		header: "Client Name",
		key: "client_name",
		width: 24
	},
	{
		header: "Category",
		key: "category",
		width: 18
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
		header: "Revenue",
		key: "revenue",
		width: 16,
		type: "number"
	},
	{
		header: "Contract Value",
		key: "contract_value",
		width: 16,
		type: "number"
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
	}
];
function ClientDirectoryPage() {
	const searchParams = useSearch({ strict: false });
	const { clients, total, isLoading, isFetching, page, setPage, size, setSize, search, setSearch, category, setCategory, industry, setIndustry, status, setStatus, recurring, setRecurring, contractType, setContractType, updateMutation, deleteMutation, saveBatch, deleteBatch, refetch } = useClientDirectory({
		page: searchParams.page ? Number(searchParams.page) : 1,
		size: searchParams.size ? Number(searchParams.size) : 50,
		search: searchParams.search,
		category: searchParams.category,
		industry: searchParams.industry,
		status: searchParams.status,
		recurring: searchParams.recurring
	});
	const [viewMode, setViewMode] = (0, import_react.useState)("analytics");
	const [selectedKeys, setSelectedKeys] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [isEditMode, setIsEditMode] = (0, import_react.useState)(false);
	const [dirtyMap, setDirtyMap] = (0, import_react.useState)({});
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isExporting, setIsExporting] = (0, import_react.useState)(false);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [bulkDeleteOpen, setBulkDeleteOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSelectedKeys(/* @__PURE__ */ new Set());
	}, [
		page,
		size,
		search,
		category,
		industry,
		status,
		recurring
	]);
	const handleSelectAll = (checked) => {
		if (checked) setSelectedKeys(new Set(clients.map((c) => getClientRowKey(c.client_id || c.clientId || "", c.category || ""))));
		else setSelectedKeys(/* @__PURE__ */ new Set());
	};
	const handleSelectOne = (rowKey, checked) => {
		setSelectedKeys((prev) => {
			const next = new Set(prev);
			if (checked) next.add(rowKey);
			else next.delete(rowKey);
			return next;
		});
	};
	const isAllSelected = clients.length > 0 && clients.every((c) => selectedKeys.has(getClientRowKey(c.client_id || c.clientId || "", c.category || "")));
	const handleFieldChange = (rowKey, field, value) => {
		setDirtyMap((prev) => ({
			...prev,
			[rowKey]: {
				...prev[rowKey],
				[field]: value
			}
		}));
	};
	const handleSave = async () => {
		try {
			setIsSaving(true);
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
	const handleExport = async () => {
		try {
			setIsExporting(true);
			await exportToExcel({
				data: clients.map((c) => ({
					...c,
					client_id: c.client_id || c.clientId,
					client_name: c.client_name || c.clientName,
					contract_id: c.contract_id || c.contractId,
					contract_value: c.contract_value || c.contractValue,
					bank_name: c.bank_name || c.bankName,
					account_number: c.account_number || c.accountNumber,
					ifsc_code: c.ifsc_code || c.ifscCode
				})),
				columns: EXPORT_COLUMNS,
				filename: `client_portfolio_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}`,
				title: "Client Portfolio"
			});
		} finally {
			setIsExporting(false);
		}
	};
	const handleDeleteSingleConfirm = async () => {
		if (!deleteTarget) return;
		try {
			await deleteMutation.mutateAsync({
				clientId: deleteTarget.clientId,
				category: deleteTarget.category
			});
			setDeleteTarget(null);
		} catch {}
	};
	const handleBulkDeleteConfirm = async () => {
		try {
			await deleteBatch(Array.from(selectedKeys));
			setSelectedKeys(/* @__PURE__ */ new Set());
			setBulkDeleteOpen(false);
		} catch {}
	};
	const dirtyCount = Object.keys(dirtyMap).length;
	const totalPages = Math.max(1, Math.ceil(total / size));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto p-4 md:p-6 pb-24 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cfo",
						className: "flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface hover:bg-surface-alt transition text-text-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 border border-indigo-500/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-xl font-bold tracking-tight text-foreground",
								children: "Client Directory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "text-xs px-2 py-0.5 bg-surface-alt",
								children: [
									total,
									" ",
									total === 1 ? "Client" : "Clients"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-text-secondary text-xs mt-0.5 pl-0.5",
						children: "Manage client portfolio, revenue agreements, and billing schedules."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex rounded-lg border border-border bg-surface p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setViewMode("analytics"),
							className: cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all", viewMode === "analytics" ? "bg-blue-600 text-white shadow-xs" : "text-text-secondary hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3.5 w-3.5" }), "Analytics"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setViewMode("table"),
							className: cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all", viewMode === "table" ? "bg-blue-600 text-white shadow-xs" : "text-text-secondary hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { className: "h-3.5 w-3.5" }), "Table"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cfo/client/upload",
						className: "inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition",
						children: "Import Clients"
					})]
				})]
			}),
			viewMode === "analytics" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteClientAnalytics, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DirectoryToolbar, {
					searchPlaceholder: "Search clients by ID, name, or contract...",
					search,
					onSearchChange: setSearch,
					isEditMode,
					onToggleEdit: () => setIsEditMode(true),
					onSave: handleSave,
					onCancel: handleCancel,
					isSaving,
					dirtyCount,
					onExport: handleExport,
					isExporting,
					selectedCount: selectedKeys.size,
					onBulkDelete: () => setBulkDeleteOpen(true),
					onRefresh: refetch,
					isRefreshing: isFetching,
					totalRecords: total,
					filters: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: category || "All Categories",
							onValueChange: (val) => setCategory(val === "All Categories" ? "" : val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs w-36 bg-surface border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Category" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: cat,
								className: "text-xs",
								children: cat
							}, cat)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status || "All Statuses",
							onValueChange: (val) => setStatus(val === "All Statuses" ? "" : val),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs w-32 bg-surface border-border/80",
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
								className: "h-9 text-xs w-36 bg-surface border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Recurrence" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: RECURRING_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: opt.value,
								className: "text-xs",
								children: opt.label
							}, opt.value)) })]
						})
					] })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-border shadow-xs overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-alt text-[11px] font-semibold text-text-secondary border-b border-border sticky top-0 z-10 uppercase tracking-wider",
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
									children: "Client ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Client Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Contract ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 whitespace-nowrap",
									children: "Revenue (Inflow)"
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
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" })
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
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4 mx-auto" })
									})
								]
							}, i)) : clients.length > 0 ? clients.map((client) => {
								const clientId = String(client.client_id || client.clientId || "");
								const categoryVal = String(client.category || "");
								const rowKey = getClientRowKey(clientId, categoryVal);
								const isSelected = selectedKeys.has(rowKey);
								const dirtyRow = dirtyMap[rowKey] || {};
								const isRowDirty = Object.keys(dirtyRow).length > 0;
								const clientName = dirtyRow.client_name ?? dirtyRow.clientName ?? client.client_name ?? client.clientName ?? "";
								const revenueVal = dirtyRow.revenue ?? client.revenue ?? 0;
								const statusVal = dirtyRow.status ?? client.status ?? "Active";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: cn("hover:bg-surface-alt/60 transition group", isSelected && "bg-primary/5 hover:bg-primary/10", isRowDirty && "bg-amber-500/5"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: isSelected,
												onCheckedChange: (c) => handleSelectOne(rowKey, !!c),
												"aria-label": `Select ${clientName}`
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap font-mono font-medium text-foreground",
											children: clientId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap font-medium text-foreground",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: clientName,
												onChange: (e) => handleFieldChange(rowKey, "client_name", e.target.value),
												className: "h-7 w-48 rounded border border-border bg-surface px-2 text-xs focus:border-primary focus:outline-none"
											}) : clientName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-md border border-border bg-surface-alt px-2 py-0.5 font-medium text-text-secondary",
												children: categoryVal
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap text-text-secondary font-mono",
											children: client.contract_id || client.contractId || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap font-medium text-emerald-600",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												value: revenueVal,
												onChange: (e) => handleFieldChange(rowKey, "revenue", Number(e.target.value)),
												className: "h-7 w-28 rounded border border-border bg-surface px-2 text-xs focus:border-primary focus:outline-none"
											}) : `₹${Number(revenueVal).toLocaleString("en-IN")}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap",
											children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: statusVal,
												onChange: (e) => handleFieldChange(rowKey, "status", e.target.value),
												className: "h-7 rounded border border-border bg-surface px-1 text-xs focus:border-primary focus:outline-none",
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
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: statusVal })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap text-text-secondary",
											children: String(client.recurring || "").toLowerCase() === "yes" || String(client.recurring || "").toLowerCase() === "true" || String(client.recurring || "") === "1" ? "Recurring" : "One-off"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap text-text-secondary",
											children: client.contract_type || client.contractType || "Fixed Price"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-surface-alt text-text-tertiary hover:text-foreground transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" })
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
												align: "end",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
													onClick: () => {
														setIsEditMode(true);
													},
													children: "Edit Client"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
													onClick: () => setDeleteTarget({
														clientId,
														category: categoryVal,
														name: clientName
													}),
													className: "text-destructive focus:text-destructive",
													children: "Delete Client"
												})]
											})] })
										})
									]
								}, rowKey);
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								colSpan: 10,
								className: "px-4 py-12 text-center text-text-secondary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: "No clients found"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-secondary mt-1",
									children: "Try modifying your search query or filters."
								})]
							}) })
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border bg-surface text-xs text-text-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"Showing ",
						(page - 1) * size + 1,
						" to ",
						Math.min(page * size, total),
						" of ",
						total,
						" records"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								disabled: page <= 1,
								onClick: () => setPage(page - 1),
								className: "h-8 text-xs",
								children: "Previous"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-2 font-medium text-foreground",
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
								disabled: page >= totalPages,
								onClick: () => setPage(page + 1),
								className: "h-8 text-xs",
								children: "Next"
							})
						]
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!deleteTarget,
				onOpenChange: () => setDeleteTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6 text-destructive" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-center text-xl",
							children: "Delete Client?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-center",
							children: [
								"Are you sure you want to delete",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: deleteTarget?.name
								}),
								" (",
								deleteTarget?.clientId,
								", Category: ",
								deleteTarget?.category,
								")? This action cannot be undone."
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setDeleteTarget(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: handleDeleteSingleConfirm,
							disabled: deleteMutation.isPending,
							children: deleteMutation.isPending ? "Deleting..." : "Confirm Delete"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: bulkDeleteOpen,
				onOpenChange: setBulkDeleteOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-6 w-6 text-destructive" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-center text-xl",
							children: [
								"Delete ",
								selectedKeys.size,
								" Selected Clients?"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-center",
							children: [
								"You are about to delete ",
								selectedKeys.size,
								" client records matching their respective business keys. This action cannot be undone."
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setBulkDeleteOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: handleBulkDeleteConfirm,
							children: "Confirm Bulk Delete"
						})]
					})]
				})
			})
		]
	});
}
function CFOClientsRouteComponent() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading client directory…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isCFO(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessRestrictedScreen, {
		title: "Access Restricted",
		description: "CFO Operations is strictly restricted to Chief Financial Officers (CFO).",
		currentRole: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientDirectoryPage, {});
}
//#endregion
export { CFOClientsRouteComponent as component };
