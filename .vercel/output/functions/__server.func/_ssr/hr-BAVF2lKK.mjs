import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Cn as ChevronDown, Pn as BriefcaseBusiness, Un as ArrowUpRight, gn as CircleCheck, hn as CircleDot, o as Users, sn as CloudUpload, v as TrendingUp, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { a as isHR } from "./roles-Cu-hhfHW.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as queryKeys } from "./queryKeys-DHNOxYVt.mjs";
import { t as AccessRestrictedScreen } from "./AccessRestrictedScreen-DxTGrBZi.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { t as hrApi } from "./hrAxios-C-ZGK4yx.mjs";
import { t as EmployeePreviewTable } from "./EmployeePreviewTable-CmdIM_F4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hr-BAVF2lKK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var dashboardApi = {
	getEmployeeMetrics: () => hrApi.get("/dashboard/employee"),
	getVendorMetrics: () => hrApi.get("/dashboard/vendor"),
	getHistory: () => hrApi.get("/dashboard/history"),
	getHistoryPreview: (uploadId) => hrApi.get(`/dashboard/history/${uploadId}/preview`)
};
function normalizeEmployeeMetrics(raw) {
	const data = raw?.data?.data ?? raw?.data ?? raw ?? {};
	const totalEmployees = Number(data.totalEmployees ?? data.total_employees ?? data.total_headcount ?? data.total_records ?? data.total ?? data.count ?? 0) || 0;
	return {
		totalEmployees,
		activeEmployees: Number(data.activeEmployees ?? data.active_employees ?? data.active_headcount ?? data.active ?? totalEmployees) || 0
	};
}
function normalizeHistory(raw) {
	let list = raw?.data?.data ?? raw?.data ?? raw;
	if (list && typeof list === "object" && !Array.isArray(list)) list = list.history ?? list.uploads ?? list.items ?? list.records ?? list.data ?? [];
	if (!Array.isArray(list)) return [];
	return list.map((item) => {
		const rawType = item.upload_type ?? item.uploadType ?? item.type ?? "Employee";
		const upload_type = typeof rawType === "string" && rawType.toLowerCase().includes("vendor") ? "Vendor" : "Employee";
		const recordCount = Number(item.record_count ?? item.recordCount ?? item.total_records ?? item.records_count ?? (Array.isArray(item.records) ? item.records.length : void 0) ?? item.count ?? 0) || 0;
		return {
			upload_id: String(item.upload_id ?? item.uploadId ?? item.id ?? ""),
			upload_type,
			file_name: String(item.file_name ?? item.fileName ?? item.filename ?? item.name ?? (upload_type === "Vendor" ? "Vendor Data" : "Employee Data")),
			record_count: recordCount,
			uploaded_at: String(item.uploaded_at ?? item.uploadedAt ?? item.created_at ?? item.createdAt ?? item.timestamp ?? item.date ?? (/* @__PURE__ */ new Date()).toISOString())
		};
	});
}
function useHRDashboard() {
	const employeeQ = useQuery({
		queryKey: queryKeys.hr.dashboard.employee(),
		queryFn: dashboardApi.getEmployeeMetrics
	});
	const historyQ = useQuery({
		queryKey: queryKeys.hr.dashboard.history(),
		queryFn: dashboardApi.getHistory
	});
	const employeeHistory = (historyQ.data ? normalizeHistory(historyQ.data) : []).filter((item) => item.upload_type === "Employee");
	return {
		employeeMetrics: employeeQ.data ? normalizeEmployeeMetrics(employeeQ.data) : void 0,
		history: employeeHistory,
		isLoading: employeeQ.isLoading || historyQ.isLoading
	};
}
function UploadPreviewModal({ uploadId, onClose }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (uploadId) {
			setLoading(true);
			dashboardApi.getHistoryPreview(uploadId).then((res) => {
				const payload = res?.data?.data ?? res?.data ?? res;
				const rawRecords = Array.isArray(payload) ? payload : Array.isArray(payload?.records) ? payload.records : Array.isArray(payload?.data) ? payload.data : [];
				if (!rawRecords.length && !payload) {
					setData(null);
					return;
				}
				const recordsWithRowId = rawRecords.map((r, idx) => ({
					...r,
					rowId: r.rowId || r.id || r._id || `hist-${idx}`
				}));
				setData({
					upload_type: payload?.upload_type || payload?.uploadType || payload?.type || "Employee",
					records: recordsWithRowId,
					schema_def: payload?.schema_def || payload?.schemaDef || null
				});
			}).catch((err) => {
				console.error("Failed to load preview data", err);
				setData(null);
			}).finally(() => {
				setLoading(false);
			});
		} else setData(null);
	}, [uploadId]);
	const emptySet = /* @__PURE__ */ new Set();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!uploadId,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-[85vw] w-full p-6 h-[85vh] flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-lg font-bold tracking-tight text-foreground",
				children: "Upload Preview"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-auto bg-surface-alt rounded-xl mt-4 border border-border",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center h-full text-text-secondary py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin mb-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-text-secondary",
						children: "Loading historical records..."
					})]
				}) : data?.records?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeePreviewTable, {
					employees: data.records,
					errorRowIds: emptySet,
					warningRowIds: emptySet,
					schemaDef: data.schema_def,
					readOnly: true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-20 text-text-tertiary flex items-center justify-center h-full text-xs font-medium",
					children: "No records found for this upload."
				})
			})]
		})
	});
}
var STAGGER = {
	container: { transition: { staggerChildren: .06 } },
	child: {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .22,
			ease: "easeOut"
		}
	}
};
function HRDashboardPage() {
	const { employeeMetrics, history, isLoading } = useHRDashboard();
	const [previewUploadId, setPreviewUploadId] = (0, import_react.useState)(null);
	const [isUploadsCollapsed, setIsUploadsCollapsed] = (0, import_react.useState)(false);
	const kpis = [{
		label: "Total Employees",
		value: employeeMetrics?.totalEmployees ?? 0,
		href: "/hr/employees",
		icon: Users,
		iconClass: "bg-primary/10 text-primary border-primary/20",
		ambient: "from-primary/8",
		hoverBorder: "hover:border-primary/40",
		subtext: "View all employee records"
	}, {
		label: "Active Headcount",
		value: employeeMetrics?.activeEmployees ?? 0,
		href: "/hr/employees?status=Active",
		icon: TrendingUp,
		iconClass: "bg-teal-500/10 text-teal-600 border-teal-500/20",
		ambient: "from-teal-500/8",
		hoverBorder: "hover:border-teal-500/40",
		subtext: "Filter by active status"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, { className: "h-4.5 w-4.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold tracking-tight text-foreground",
						children: "HR Operations"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-text-secondary text-sm pl-0.5",
					children: "Bulk-import and manage employee directory and organizational data through intelligent Excel workflows."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch",
				initial: "initial",
				animate: "animate",
				variants: { animate: STAGGER.container },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-1 lg:col-span-7 xl:col-span-8 h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, {
						title: "Employee Management",
						description: "Upload employee master data, validate records, review information and import employees at scale.",
						href: "/hr/employee/upload",
						icon: Users,
						buttonLabel: "Manage Employees",
						accentClass: "bg-primary/10 text-primary border-primary/20",
						glowClass: "from-primary/12"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-1 lg:col-span-5 xl:col-span-4 flex flex-col gap-3.5 h-full",
					children: kpis.map((kpi) => {
						const Icon = kpi.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: STAGGER.child,
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: kpi.href,
								className: "block h-full group select-none cursor-pointer focus:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-surface via-surface to-surface-alt/20 p-4 sm:p-4.5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-border", kpi.hoverBorder),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 pointer-events-none bg-linear-to-br via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300", kpi.ambient) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold uppercase tracking-wider text-text-secondary group-hover:text-foreground transition-colors",
												children: kpi.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground tabular-nums",
												children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-1 h-8 w-16 rounded-md" }) : kpi.value.toLocaleString()
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-200 group-hover:scale-105", kpi.iconClass),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 mt-3 flex items-center gap-1 text-[11px] font-medium text-text-tertiary group-hover:text-text-secondary transition-colors pt-2.5 border-t border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: kpi.subtext }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
										})
									]
								})
							})
						}, kpi.label);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setIsUploadsCollapsed((prev) => !prev),
					className: "group flex items-center gap-2 text-left select-none cursor-pointer focus:outline-none",
					"aria-expanded": !isUploadsCollapsed,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-bold uppercase tracking-wider text-text-secondary group-hover:text-foreground transition-colors",
							children: "Recent Uploads"
						}),
						history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs font-medium text-text-tertiary tabular-nums",
							children: [
								"(",
								history.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-5 w-5 items-center justify-center rounded-md text-text-tertiary group-hover:bg-surface-alt group-hover:text-text-secondary transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 transition-transform duration-200", isUploadsCollapsed && "-rotate-90") })
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				initial: false,
				children: !isUploadsCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						height: 0
					},
					animate: {
						opacity: 1,
						height: "auto"
					},
					exit: {
						opacity: 0,
						height: 0
					},
					transition: {
						duration: .2,
						ease: "easeInOut"
					},
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/80 shadow-xs overflow-hidden",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border",
							children: [
								1,
								2,
								3
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 px-5 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-9 rounded-xl shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-56" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-20 rounded-lg" })
								]
							}, i))
						}) : history.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border",
							children: history.map((item, idx) => {
								const isEmployee = item.upload_type === "Employee";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
									initial: {
										opacity: 0,
										x: -6
									},
									animate: {
										opacity: 1,
										x: 0
									},
									transition: {
										duration: .2,
										delay: idx * .04
									},
									className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 hover:bg-surface-alt/40 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3.5 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border", isEmployee ? "bg-primary/10 text-primary border-primary/20" : "bg-violet-500/10 text-violet-600 border-violet-500/20"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-foreground tracking-tight truncate",
													children: item.file_name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: cn("text-[10px] font-bold uppercase tracking-wider shrink-0 h-5 px-1.5", isEmployee ? "border-primary/30 text-primary bg-primary/5" : "border-violet-500/30 text-violet-600 bg-violet-500/5"),
													children: item.upload_type
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-text-secondary mt-0.5 tabular-nums",
												children: [
													(item.record_count ?? 0).toLocaleString(),
													" records ·",
													" ",
													item.uploaded_at ? (() => {
														try {
															const d = new Date(item.uploaded_at);
															return Number.isNaN(d.getTime()) ? "Recently" : formatDistanceToNow(d, { addSuffix: true });
														} catch {
															return "Recently";
														}
													})() : "Recently"
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0 pl-13 sm:pl-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-xs text-teal-600 font-medium tracking-tight",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Imported"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setPreviewUploadId(item.upload_id),
											className: "inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface-alt hover:text-foreground",
											children: ["Preview", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" })]
										})]
									})]
								}, item.upload_id || idx);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center py-14 text-center px-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-text-secondary",
									children: "No uploads yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-tertiary mt-1",
									children: "Import your first employee list to see activity here."
								})
							]
						})
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadPreviewModal, {
				uploadId: previewUploadId,
				onClose: () => setPreviewUploadId(null)
			})
		]
	});
}
function ModuleCard({ title, description, href, directoryHref, buttonLabel, directoryLabel, icon: Icon, accentClass, glowClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: STAGGER.child,
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "group relative overflow-hidden border-border/80 p-6 shadow-xs transition-all duration-200 hover:border-border hover:shadow-sm h-full flex flex-col justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 pointer-events-none bg-linear-to-br via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300", glowClass) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col gap-4 h-full justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex h-11 w-11 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-200 group-hover:scale-105", accentClass),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base sm:text-lg font-bold text-foreground tracking-tight",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs sm:text-sm leading-relaxed text-text-secondary",
						children: description
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 pt-2 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "default",
						className: "gap-2 shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: href,
							children: [buttonLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
						})
					}), directoryHref && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "default",
						className: "gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: directoryHref,
							children: directoryLabel || "Directory"
						})
					})]
				})]
			})]
		})
	});
}
function HRRouteComponent() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading HR workspace…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isHR(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessRestrictedScreen, {
		title: "Access Restricted",
		description: "HR Operations is strictly restricted to Human Resources (HR) personnel.",
		currentRole: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HRDashboardPage, {});
}
//#endregion
export { HRRouteComponent as component };
