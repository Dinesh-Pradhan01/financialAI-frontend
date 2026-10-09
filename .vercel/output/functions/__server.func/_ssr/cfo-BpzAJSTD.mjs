import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { At as Landmark, Cn as ChevronDown, Mn as Building2, Un as ArrowUpRight, Y as RefreshCw, gn as CircleCheck, hn as CircleDot, o as Users, sn as CloudUpload, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { r as isCFO } from "./roles-Cu-hhfHW.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { t as AccessRestrictedScreen } from "./AccessRestrictedScreen-DxTGrBZi.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { t as cfoApi } from "./cfoAxios-sGO5vNpk.mjs";
import { t as useCFODashboard } from "./useCFODashboard-DG5RjGSt.mjs";
import { t as VendorPreviewTable } from "./VendorPreviewTable-DHN3S-da.mjs";
import { t as ClientPreviewTable } from "./ClientPreviewTable-BQuJt8fr.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cfo-BpzAJSTD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CFOUploadPreviewModal({ uploadId, uploadType = "Vendor", onClose }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (uploadId) {
			setLoading(true);
			const endpoint = uploadType === "Client" ? `/clients/dashboard/history/${uploadId}/preview` : `/dashboard/history/${uploadId}/preview`;
			cfoApi.get(endpoint).then((res) => {
				const payload = res?.data?.data ?? res?.data ?? res;
				const rawRecords = Array.isArray(payload) ? payload : Array.isArray(payload?.records) ? payload.records : Array.isArray(payload?.data) ? payload.data : [];
				if (!rawRecords.length && !payload) {
					setData(null);
					return;
				}
				setData({
					records: rawRecords.map((r, idx) => ({
						...r,
						rowId: r.rowId || r.id || r._id || `hist-${idx}`
					})),
					schema_def: payload?.schema_def || payload?.schemaDef || null
				});
			}).catch((err) => {
				console.error("Failed to load historical vendor preview data", err);
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
				children: uploadType === "Client" ? "Client Upload Preview" : "Vendor Upload Preview"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-auto bg-surface-alt rounded-xl mt-4 border border-border",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center h-full text-text-secondary py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin mb-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-text-secondary",
						children: "Loading historical records..."
					})]
				}) : data?.records?.length ? uploadType === "Client" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientPreviewTable, {
					clients: data.records,
					errorRowIds: emptySet,
					warningRowIds: emptySet,
					schemaDef: data.schema_def,
					readOnly: true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorPreviewTable, {
					vendors: data.records,
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
function CFODashboardPage() {
	const { vendorMetrics, clientMetrics, history, clientHistory, isLoading } = useCFODashboard();
	const [previewItem, setPreviewItem] = (0, import_react.useState)(null);
	const [historyTab, setHistoryTab] = (0, import_react.useState)("all");
	const [isUploadsCollapsed, setIsUploadsCollapsed] = (0, import_react.useState)(false);
	const displayedHistory = (0, import_react.useMemo)(() => {
		let list = [...history || [], ...clientHistory || []];
		list.sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
		if (historyTab === "vendor") return list.filter((i) => i.upload_type === "Vendor");
		if (historyTab === "client") return list.filter((i) => i.upload_type === "Client");
		return list;
	}, [
		history,
		clientHistory,
		historyTab
	]);
	const kpis = [
		{
			label: "Total Vendors",
			value: vendorMetrics?.totalVendors ?? 0,
			href: "/cfo/vendors",
			icon: Building2,
			iconClass: "bg-violet-500/10 text-violet-600 border-violet-500/20",
			ambient: "from-violet-500/8",
			hoverBorder: "hover:border-violet-500/40",
			subtext: "View vendor portfolio"
		},
		{
			label: "Recurring Vendors",
			value: vendorMetrics?.recurringVendors ?? 0,
			href: "/cfo/vendors?recurring=true",
			icon: RefreshCw,
			iconClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
			ambient: "from-indigo-500/8",
			hoverBorder: "hover:border-indigo-500/40",
			subtext: "Filter by recurring contracts"
		},
		{
			label: "Total Clients",
			value: clientMetrics?.totalClients ?? 0,
			href: "/cfo/clients",
			icon: Users,
			iconClass: "bg-blue-500/10 text-blue-600 border-blue-500/20",
			ambient: "from-blue-500/8",
			hoverBorder: "hover:border-blue-500/40",
			subtext: "View client portfolio"
		},
		{
			label: "Recurring Clients",
			value: clientMetrics?.recurringClients ?? 0,
			href: "/cfo/clients?recurring=true",
			icon: RefreshCw,
			iconClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
			ambient: "from-emerald-500/8",
			hoverBorder: "hover:border-emerald-500/40",
			subtext: "Filter by recurring contracts"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 border border-violet-500/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4.5 w-4.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-bold tracking-tight text-foreground",
						children: "CFO Operations"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-text-secondary text-sm pl-0.5",
					children: "Bulk-import and manage vendor and client portfolios, contracts, and revenue schedules through intelligent workflows."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch",
				initial: "initial",
				animate: "animate",
				variants: { animate: STAGGER.container },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, {
					title: "Vendor Management",
					description: "Upload vendor portfolio, review contract information and analyse procurement expenses.",
					href: "/cfo/vendor/upload",
					icon: Building2,
					buttonLabel: "Import Vendors",
					accentClass: "bg-violet-500/10 text-violet-600 border-violet-500/20",
					glowClass: "from-violet-500/12"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, {
					title: "Client Management",
					description: "Upload client portfolio, review revenue agreements, billing schedules, and banking details.",
					href: "/cfo/client/upload",
					icon: Users,
					buttonLabel: "Import Clients",
					accentClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
					glowClass: "from-indigo-500/12"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.section, {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch",
				initial: "initial",
				animate: "animate",
				variants: { animate: STAGGER.container },
				children: kpis.map((kpi) => {
					const Icon = kpi.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: STAGGER.child,
						className: "h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: kpi.href,
							className: "block h-full group select-none cursor-pointer focus:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-surface via-surface to-surface-alt/20 p-4.5 shadow-xs transition-all duration-200 hover:shadow-md", kpi.hoverBorder),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 pointer-events-none bg-linear-to-br via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300", kpi.ambient) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold uppercase tracking-wider text-text-secondary group-hover:text-foreground transition-colors",
												children: kpi.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground tabular-nums",
												children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-1 h-8 w-14 rounded-md" }) : kpi.value.toLocaleString()
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-200 group-hover:scale-110", kpi.iconClass),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[11px] font-medium text-text-tertiary group-hover:text-text-secondary transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: kpi.subtext }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
									})
								]
							})
						})
					}, kpi.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setIsUploadsCollapsed((prev) => !prev),
					className: "group flex items-center gap-2 text-left select-none cursor-pointer focus:outline-none",
					"aria-expanded": !isUploadsCollapsed,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-bold uppercase tracking-wider text-text-secondary group-hover:text-foreground transition-colors",
							children: "Recent Ingestion History"
						}),
						displayedHistory.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs font-medium text-text-tertiary tabular-nums",
							children: [
								"(",
								displayedHistory.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-5 w-5 items-center justify-center rounded-md text-text-tertiary group-hover:bg-surface-alt group-hover:text-text-secondary transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 transition-transform duration-200", isUploadsCollapsed && "-rotate-90") })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 bg-surface-alt/70 p-0.5 rounded-lg border border-border/80 self-start sm:self-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setHistoryTab("all"),
							className: cn("px-2.5 py-1 text-xs font-semibold rounded-md transition", historyTab === "all" ? "bg-surface text-foreground shadow-xs" : "text-text-secondary hover:text-foreground"),
							children: "All"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setHistoryTab("vendor"),
							className: cn("px-2.5 py-1 text-xs font-semibold rounded-md transition", historyTab === "vendor" ? "bg-surface text-foreground shadow-xs" : "text-text-secondary hover:text-foreground"),
							children: "Vendors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setHistoryTab("client"),
							className: cn("px-2.5 py-1 text-xs font-semibold rounded-md transition", historyTab === "client" ? "bg-surface text-foreground shadow-xs" : "text-text-secondary hover:text-foreground"),
							children: "Clients"
						})
					]
				})]
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
						}) : displayedHistory.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border",
							children: displayedHistory.map((item, idx) => {
								const isClient = item.upload_type === "Client";
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
											className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border", isClient ? "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" : "bg-violet-500/10 text-violet-600 border-violet-500/20"),
											children: isClient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-foreground tracking-tight truncate",
													children: item.file_name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: cn("text-[10px] font-bold uppercase tracking-wider shrink-0 h-5 px-1.5", isClient ? "border-indigo-500/30 text-indigo-600 bg-indigo-500/5" : "border-violet-500/30 text-violet-600 bg-violet-500/5"),
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
											onClick: () => setPreviewItem({
												id: item.upload_id,
												type: isClient ? "Client" : "Vendor"
											}),
											className: "inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface-alt hover:text-foreground cursor-pointer",
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
									children: "Import your first vendor or client list to see activity here."
								})
							]
						})
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CFOUploadPreviewModal, {
				uploadId: previewItem?.id ?? null,
				uploadType: previewItem?.type ?? "Vendor",
				onClose: () => setPreviewItem(null)
			})
		]
	});
}
function ModuleCard({ title, description, href, buttonLabel, icon: Icon, accentClass, glowClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: STAGGER.child,
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "group relative overflow-hidden border-border/80 p-6 shadow-xs transition-all duration-200 hover:border-border hover:shadow-sm h-full flex flex-col justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 pointer-events-none bg-linear-to-br via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300", glowClass) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col gap-4 h-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex h-11 w-11 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-200 group-hover:scale-105", accentClass),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base sm:text-lg font-bold text-foreground tracking-tight",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs sm:text-sm leading-relaxed text-text-secondary",
							children: description
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "default",
							className: "h-10 px-5 text-sm font-semibold gap-2 shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: href,
								children: [buttonLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
							})
						})
					})
				]
			})]
		})
	});
}
function CFORouteComponent() {
	const { user, loading } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Loading CFO workspace…",
		subMessage: "SpotLite Executive Intelligence"
	});
	if (!user) return null;
	if (!isCFO(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessRestrictedScreen, {
		title: "Access Restricted",
		description: "CFO Operations is strictly restricted to Chief Financial Officers (CFO).",
		currentRole: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CFODashboardPage, {});
}
//#endregion
export { CFORouteComponent as component };
