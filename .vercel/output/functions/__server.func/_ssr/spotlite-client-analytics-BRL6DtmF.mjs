import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Dn as ChartColumn, Fn as Brain, On as Calendar, Ot as Layers, T as Table, U as Search, Ut as FileText, cn as Clock, o as Users, pt as Network, v as TrendingUp, z as ShieldAlert } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { n as formatPct, t as formatINR } from "./format-B9luOE0k.mjs";
import { a as Area, d as Legend, i as XAxis, l as ResponsiveContainer, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spotlite-client-analytics-BRL6DtmF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SpotliteClientBubbleGraph() {
	const [hub, setHub] = (0, import_react.useState)(null);
	const [bubbles, setBubbles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedClient, setSelectedClient] = (0, import_react.useState)(null);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [viewMode, setViewMode] = (0, import_react.useState)("graph");
	(0, import_react.useEffect)(() => {
		async function fetchBubbleData() {
			try {
				setLoading(true);
				let json;
				try {
					json = await api.get("/api/v1/analysis/clients/bubble");
				} catch (err) {
					json = await api.get("/api/v1/spotlite/clients/bubble");
				}
				if (json?.success && json?.data) {
					setHub(json.data.center_company);
					setBubbles(json.data.client_bubbles || []);
				}
			} catch (err) {
				console.warn("Using baseline bubble fallback state", err);
			} finally {
				setLoading(false);
			}
		}
		fetchBubbleData();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-8 border-border/80 bg-surface shadow-xs space-y-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-72 mx-auto rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 w-full rounded-2xl" })]
	});
	const centerCompany = hub || {
		company_name: "Nimbus Logistics",
		subtitle: "My Corporate Entity",
		total_portfolio_acv: 3064e4,
		active_clients_count: 7
	};
	const clientList = bubbles.length > 0 ? bubbles : [
		{
			client_id: "CLI-001",
			client_name: "Technova Solutions",
			category: "Software / SaaS",
			annual_contract_value: 624e4,
			monthly_revenue: 52e4,
			revenue_share_pct: 20.35,
			bubble_diameter_px: 125,
			status: "Active",
			color: "#3b82f6",
			dso_median_days: 8,
			transaction_count: 6,
			transactions: [{
				transaction_id: "TXN-0601",
				date: "2026-06-15",
				invoice_ref: "INV-2026-06-01",
				narration: "Monthly SLA Revenue Payment",
				amount: 52e4,
				transaction_type: "Credit (Inflow)",
				payment_status: "Settled",
				payment_method: "NEFT Bank Transfer",
				dso_drift_days: 8
			}, {
				transaction_id: "TXN-0501",
				date: "2026-05-14",
				invoice_ref: "INV-2026-05-01",
				narration: "Monthly SLA Revenue Payment",
				amount: 52e4,
				transaction_type: "Credit (Inflow)",
				payment_status: "Settled",
				payment_method: "NEFT Bank Transfer",
				dso_drift_days: 8
			}]
		},
		{
			client_id: "CLI-002",
			client_name: "GlobalRetail Logistics",
			category: "Logistics",
			annual_contract_value: 57e5,
			monthly_revenue: 475e3,
			revenue_share_pct: 18.59,
			bubble_diameter_px: 110,
			status: "Active",
			color: "#10b981",
			dso_median_days: 12,
			transaction_count: 6,
			transactions: [{
				transaction_id: "TXN-0602",
				date: "2026-06-14",
				invoice_ref: "INV-2026-06-02",
				narration: "Freight Retainer Settlement",
				amount: 475e3,
				transaction_type: "Credit (Inflow)",
				payment_status: "Settled",
				payment_method: "RTGS Transfer",
				dso_drift_days: 12
			}]
		},
		{
			client_id: "CLI-003",
			client_name: "Apex Financials",
			category: "Financial Services",
			annual_contract_value: 46e5,
			monthly_revenue: 383333,
			revenue_share_pct: 15.07,
			bubble_diameter_px: 95,
			status: "Contract Expired",
			color: "#f59e0b",
			dso_median_days: 10,
			transaction_count: 6,
			transactions: [{
				transaction_id: "TXN-0603",
				date: "2026-06-12",
				invoice_ref: "INV-2026-06-03",
				narration: "Advisory Services Fee",
				amount: 383333,
				transaction_type: "Credit (Inflow)",
				payment_status: "Settled",
				payment_method: "NEFT Transfer",
				dso_drift_days: 10
			}]
		},
		{
			client_id: "CLI-004",
			client_name: "Zenith Enterprises",
			category: "Consulting",
			annual_contract_value: 42e5,
			monthly_revenue: 35e4,
			revenue_share_pct: 13.71,
			bubble_diameter_px: 88,
			status: "Active",
			color: "#8b5cf6",
			dso_median_days: 15,
			transaction_count: 6,
			transactions: []
		},
		{
			client_id: "CLI-005",
			client_name: "Horizon Media",
			category: "Marketing",
			annual_contract_value: 37e5,
			monthly_revenue: 308333,
			revenue_share_pct: 12.08,
			bubble_diameter_px: 78,
			status: "Active",
			color: "#ec4899",
			dso_median_days: 7,
			transaction_count: 6,
			transactions: []
		},
		{
			client_id: "CLI-006",
			client_name: "Quantum Tech",
			category: "IT Services",
			annual_contract_value: 32e5,
			monthly_revenue: 266666,
			revenue_share_pct: 10.45,
			bubble_diameter_px: 68,
			status: "Active",
			color: "#06b6d4",
			dso_median_days: 9,
			transaction_count: 6,
			transactions: []
		},
		{
			client_id: "CLI-007",
			client_name: "Vertex Retail",
			category: "Retail",
			annual_contract_value: 3e6,
			monthly_revenue: 25e4,
			revenue_share_pct: 9.79,
			bubble_diameter_px: 62,
			status: "Active",
			color: "#64748b",
			dso_median_days: 14,
			transaction_count: 6,
			transactions: []
		}
	];
	const centerPos = {
		x: 380,
		y: 260
	};
	const orbitRadius = 185;
	const positions = clientList.map((client, index) => {
		const angle = index / clientList.length * 2 * Math.PI - Math.PI / 2;
		const x = centerPos.x + orbitRadius * Math.cos(angle);
		const y = centerPos.y + orbitRadius * Math.sin(angle);
		return {
			...client,
			x,
			y,
			angle
		};
	});
	const handleBubbleClick = (client) => {
		setSelectedClient(client);
		setModalOpen(true);
	};
	const filteredTransactions = (selectedClient?.transactions || []).filter((tx) => searchTerm ? tx.invoice_ref.toLowerCase().includes(searchTerm.toLowerCase()) || tx.narration.toLowerCase().includes(searchTerm.toLowerCase()) || tx.payment_method.toLowerCase().includes(searchTerm.toLowerCase()) : true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 border-border/80 bg-linear-to-b from-surface to-surface-alt/40 shadow-sm relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 z-10 relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand border border-brand/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-bold text-foreground",
							children: "Client Revenue Network"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: [
							"Radial node diagram: Center = ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: centerCompany.company_name }),
							". Node diameter scales by annual revenue (ACV). Select any client to view full ledger."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 p-1 bg-surface-alt rounded-lg border border-border/60",
							role: "group",
							"aria-label": "Client View Options",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setViewMode("graph"),
								className: `flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${viewMode === "graph" ? "bg-surface text-foreground shadow-xs" : "text-text-secondary hover:text-foreground"}`,
								"aria-pressed": viewMode === "graph",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 13 }), " Radial Graph"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setViewMode("table"),
								className: `flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${viewMode === "table" ? "bg-surface text-foreground shadow-xs" : "text-text-secondary hover:text-foreground"}`,
								"aria-pressed": viewMode === "table",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { size: 13 }), " Table View"]
							})]
						})
					})]
				}),
				viewMode === "graph" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative w-full overflow-x-auto flex justify-center py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 760 520",
						className: "w-full max-w-3xl h-auto select-none aspect-76/52",
						role: "img",
						"aria-label": `Interactive radial client network graph with ${clientList.length} client nodes revolving around ${centerCompany.company_name}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
                  @keyframes clientBeamFlow {
                    to { stroke-dashoffset: -18; }
                  }
                  .animate-client-beam {
                    animation: clientBeamFlow 2s linear infinite;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .animate-client-beam {
                      animation: none !important;
                    }
                  }
                ` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
									id: "centerGlow",
									cx: "50%",
									cy: "50%",
									r: "50%",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "#6366f1",
										stopOpacity: "0.35"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "#6366f1",
										stopOpacity: "0"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
									id: "glow",
									x: "-20%",
									y: "-20%",
									width: "140%",
									height: "140%",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
										stdDeviation: "4",
										result: "blur"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feComposite", {
										in: "SourceGraphic",
										in2: "blur",
										operator: "over"
									})]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: centerPos.x,
								cy: centerPos.y,
								r: orbitRadius,
								fill: "none",
								stroke: "currentColor",
								className: "text-border/60",
								strokeDasharray: "4 4",
								strokeWidth: "1.5"
							}),
							positions.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: centerPos.x,
								y1: centerPos.y,
								x2: node.x,
								y2: node.y,
								stroke: node.color,
								strokeWidth: Math.max(1.5, node.revenue_share_pct / 5),
								strokeOpacity: "0.45",
								strokeDasharray: "6 3",
								className: "animate-client-beam"
							}) }, `beam-${node.client_id}`)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${centerPos.x}, ${centerPos.y})`,
								className: "cursor-default group",
								tabIndex: 0,
								role: "region",
								"aria-label": `Central corporate entity: ${centerCompany.company_name}, total ACV ${formatINR(centerCompany.total_portfolio_acv)}, with ${centerCompany.active_clients_count} active clients`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: "85",
										fill: "url(#centerGlow)",
										className: "opacity-75 group-hover:opacity-100 transition-opacity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: "65",
										fill: "#6366f1",
										className: "shadow-lg transition-transform duration-300 group-hover:scale-105",
										filter: "url(#glow)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: "60",
										fill: "none",
										stroke: "#818cf8",
										strokeWidth: "2.5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										y: "-18",
										textAnchor: "middle",
										fill: "#ffffff",
										fontSize: "11",
										fontWeight: "bold",
										fontFamily: "sans-serif",
										children: "MY COMPANY"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										y: "-2",
										textAnchor: "middle",
										fill: "#ffffff",
										fontSize: "13",
										fontWeight: "900",
										fontFamily: "sans-serif",
										children: centerCompany.company_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										y: "16",
										textAnchor: "middle",
										fill: "#e0e7ff",
										fontSize: "10",
										fontWeight: "600",
										fontFamily: "sans-serif",
										children: formatINR(centerCompany.total_portfolio_acv)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
										y: "30",
										textAnchor: "middle",
										fill: "#c7d2fe",
										fontSize: "9",
										fontFamily: "sans-serif",
										children: [centerCompany.active_clients_count, " Active Clients"]
									})
								]
							}),
							positions.map((node) => {
								const radius = node.bubble_diameter_px / 2;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									transform: `translate(${node.x}, ${node.y})`,
									onClick: () => handleBubbleClick(node),
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											handleBubbleClick(node);
										}
									},
									tabIndex: 0,
									role: "button",
									"aria-label": `View ledger for ${node.client_name}, annual value ${formatINR(node.annual_contract_value)}, share ${node.revenue_share_pct.toFixed(1)}%, DSO ${node.dso_median_days} days`,
									className: "cursor-pointer group transition-transform duration-300 hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											r: radius + 4,
											fill: "none",
											stroke: node.color,
											strokeWidth: "1.5",
											strokeOpacity: "0.4",
											className: "group-hover:stroke-opacity-100 transition"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											r: radius,
											fill: node.color,
											fillOpacity: "0.88",
											stroke: "#ffffff",
											strokeWidth: "2",
											className: "drop-shadow-md group-hover:fill-opacity-100 transition"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
											y: radius > 35 ? "-6" : "0",
											textAnchor: "middle",
											fill: "#ffffff",
											fontSize: radius > 45 ? "11" : "9",
											fontWeight: "bold",
											fontFamily: "sans-serif",
											className: "pointer-events-none drop-shadow-sm",
											children: node.client_name.length > 14 ? node.client_name.split(" ")[0] : node.client_name
										}),
										radius > 30 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
											y: "10",
											textAnchor: "middle",
											fill: "#ffffff",
											fontSize: "9",
											fontWeight: "600",
											fontFamily: "monospace",
											className: "pointer-events-none opacity-90",
											children: formatINR(node.annual_contract_value)
										}),
										radius > 40 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
											y: "22",
											textAnchor: "middle",
											fill: "#e2e8f0",
											fontSize: "8",
											fontFamily: "sans-serif",
											className: "pointer-events-none opacity-80",
											children: [
												"(",
												node.revenue_share_pct.toFixed(1),
												"%)"
											]
										})
									]
								}, node.client_id);
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-xl border border-border/70 bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-xs text-left",
							role: "table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-surface-alt text-[11px] font-semibold text-text-secondary uppercase border-b border-border/60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3",
										children: "Client Account"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-right",
										children: "Annual Value (ACV)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-right",
										children: "Monthly Rev"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-right",
										children: "Portfolio Share"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-center",
										children: "Median DSO"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-center",
										children: "Action"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/40",
								children: clientList.map((client) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-surface-alt/50 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-semibold text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-2.5 w-2.5 rounded-full shrink-0",
													style: { backgroundColor: client.color }
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: client.client_name })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-text-secondary",
											children: client.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-num tabular-nums font-bold text-emerald-600 dark:text-emerald-400 text-right",
											children: formatINR(client.annual_contract_value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-num tabular-nums text-text-secondary text-right",
											children: formatINR(client.monthly_revenue)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 font-num tabular-nums font-semibold text-foreground text-right",
											children: [client.revenue_share_pct.toFixed(1), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 font-num tabular-nums text-center text-text-secondary",
											children: ["Day ", client.dso_median_days]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: client.status === "Contract Expired" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] font-bold",
												children: "⚠️ Expired SLA"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]",
												children: "Active"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleBubbleClick(client),
												className: "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-brand/10 text-brand hover:bg-brand/20 transition-colors focus:ring-2 focus:ring-brand focus:outline-hidden",
												"aria-label": `Inspect ledger for ${client.client_name}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 12 }), " Inspect Ledger"]
											})
										})
									]
								}, client.client_id))
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between text-xs text-text-secondary border-t border-border/60 pt-3 mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-[#3b82f6]" }), " Top Revenue (>20%)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-[#10b981]" }), " Core Client (15-20%)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-[#f59e0b]" }), " Contract Alert"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-text-tertiary",
						children: [
							"💡 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Keyboard Support:" }),
							" Tab through nodes and press",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "px-1 py-0.5 rounded bg-surface border border-border text-[10px] font-mono",
								children: "Enter"
							}),
							" ",
							"to inspect transaction details."
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: modalOpen,
			onOpenChange: setModalOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-6 border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "border-b border-border/60 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm shadow-sm",
								style: { backgroundColor: selectedClient?.color || "#3b82f6" },
								children: selectedClient?.client_name.substring(0, 2).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								className: "font-display text-lg font-bold text-foreground flex items-center gap-2",
								children: [selectedClient?.client_name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-xs bg-surface-alt",
									children: selectedClient?.category
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-secondary",
								children: [
									"Counterparty Client ID:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-semibold",
										children: selectedClient?.client_id
									}),
									" | Status:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: selectedClient?.status
									})
								]
							})] })]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 my-3 overflow-y-auto max-h-[72vh] pr-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-bold text-text-tertiary block tracking-wider",
										children: "# (Txn Count)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-num text-xl font-extrabold text-foreground",
										children: selectedClient?.transaction_count || selectedClient?.transactions.length || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-text-secondary block",
										children: "Settled Transactions"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-1 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 block tracking-wider",
										children: "$ (Monthly Billed)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-num text-xl font-black text-emerald-600 dark:text-emerald-400",
										children: formatINR(selectedClient?.monthly_revenue || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[9px] text-emerald-600 dark:text-emerald-400 block font-semibold",
										children: [selectedClient?.revenue_share_pct.toFixed(1), "% Share"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/80 bg-surface p-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-foreground",
									children: "Monthly Inflow Revenue Trend"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-text-tertiary font-mono",
									children: "6-Month Trajectory"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-28 w-full pt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
										data: selectedClient?.monthly_trend || [
											{
												month: "Jan",
												val: selectedClient?.monthly_revenue || 5e5
											},
											{
												month: "Feb",
												val: selectedClient?.monthly_revenue || 5e5
											},
											{
												month: "Mar",
												val: selectedClient?.monthly_revenue || 5e5
											},
											{
												month: "Apr",
												val: selectedClient?.monthly_revenue || 5e5
											},
											{
												month: "May",
												val: selectedClient?.monthly_revenue || 5e5
											},
											{
												month: "Jun",
												val: selectedClient?.monthly_revenue || 5e5
											}
										],
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "clientTrendGrad",
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "5%",
													stopColor: "#10b981",
													stopOpacity: .4
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "95%",
													stopColor: "#10b981",
													stopOpacity: 0
												})]
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "month",
												tick: { fontSize: 10 }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												tick: { fontSize: 9 },
												tickFormatter: (v) => `₹${(v / 1e5).toFixed(1)}L`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => [formatINR(Number(v)), "Inflow Revenue"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "val",
												stroke: "#10b981",
												strokeWidth: 2,
												fill: "url(#clientTrendGrad)"
											})
										]
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-text-tertiary uppercase block",
										children: "Start Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold text-foreground block",
										children: selectedClient?.start_date || "2024-01-15"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-text-tertiary uppercase block",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
										children: selectedClient?.status || "Active"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-text-tertiary uppercase block",
										children: "Contract#"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold text-foreground block truncate",
										title: selectedClient?.contract_number,
										children: selectedClient?.contract_number || "CTR-2024-8891"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-text-tertiary uppercase block",
										children: "Contract$ (ACV)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-num text-base font-extrabold text-foreground",
										children: formatINR(selectedClient?.annual_contract_value || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-text-tertiary block",
										children: "Annual Contract Value"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2 rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-text-tertiary uppercase block",
									children: "Project Summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-secondary leading-normal font-medium",
									children: selectedClient?.project_summary || "Enterprise SaaS Infrastructure & Core Cloud Logistics Platform Integration."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 space-y-2 shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500 text-white shadow-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { size: 14 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display text-xs font-bold text-foreground",
										children: "Relationship Analysis by AI"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20",
									children: "AI Relationship Health"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-secondary leading-relaxed rounded-xl bg-surface/80 p-3 border border-border/50",
								children: [
									"🤖",
									" ",
									selectedClient?.ai_relationship_summary || `${selectedClient?.client_name} is a key anchor client with clean payment history (${selectedClient?.dso_median_days} days median DSO) and high account retention probability.`
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 flex-1 overflow-hidden flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										size: 14,
										className: "absolute left-3 top-2.5 text-text-tertiary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Search invoice reference, narration, method...",
										value: searchTerm,
										onChange: (e) => setSearchTerm(e.target.value),
										className: "w-full pl-9 pr-3 py-1.5 text-xs bg-surface border border-border/80 rounded-lg outline-none focus:border-brand"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-text-secondary font-mono",
									children: [filteredTransactions.length, " Transactions"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-y-auto border border-border rounded-xl flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-xs text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-surface-alt text-[11px] font-semibold text-text-secondary uppercase sticky top-0 border-b border-border z-10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Txn ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Date"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Invoice Ref"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Narration"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Amount"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Payment Method"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Status"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
										className: "divide-y divide-border",
										children: [filteredTransactions.map((tx, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-surface-alt/50 transition",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 font-mono font-medium text-foreground",
													children: tx.transaction_id
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 text-text-secondary whitespace-nowrap",
													children: tx.date
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 font-mono text-text-secondary",
													children: tx.invoice_ref
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 font-medium text-foreground",
													children: tx.narration
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap",
													children: formatINR(tx.amount)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 text-text-secondary",
													children: tx.payment_method
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold",
														children: tx.payment_status
													})
												})
											]
										}, idx)), filteredTransactions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 7,
											className: "px-4 py-8 text-center text-text-secondary",
											children: "No transactions found for this search filter."
										}) })]
									})]
								})
							})]
						})
					]
				})]
			})
		})]
	});
}
var CLIENT_COLORS = [
	"#3b82f6",
	"#10b981",
	"#8b5cf6",
	"#f59e0b",
	"#ec4899",
	"#06b6d4",
	"#64748b"
];
function SpotliteClientAnalytics() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function fetchClientAnalytics() {
			try {
				setLoading(true);
				let res = await fetch(`${API_BASE}/api/v1/analysis/clients/analytics`);
				if (!res.ok) res = await fetch(`${API_BASE}/api/v1/spotlite/clients/analytics`);
				const json = await res.json();
				if (json?.success && json?.data) setData(json.data);
				else setError("Failed to fetch live client metrics");
			} catch (err) {
				console.warn("Using baseline client metrics state", err);
				setError("Offline mode. Displaying baseline metrics.");
			} finally {
				setLoading(false);
			}
		}
		fetchClientAnalytics();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-64 rounded-lg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-xl" })
		]
	});
	const rawSummary = data?.summary || {};
	const summary = {
		annual_contract_value: rawSummary.annualized_revenue_run_rate ?? rawSummary.annual_contract_value ?? 3064e4,
		active_clients: rawSummary.total_clients ?? rawSummary.active_clients ?? 7,
		top1_client_revenue_pct: rawSummary.top1_client_concentration_pct ?? rawSummary.top1_client_revenue_pct ?? 20.35,
		top3_client_revenue_pct: rawSummary.top3_client_concentration_pct ?? rawSummary.top3_client_revenue_pct ?? 54.01,
		client_concentration_index: rawSummary.client_concentration_index ?? .185,
		dso_median_days: rawSummary.dso_median_days ?? 10,
		dso_std_dev_days: rawSummary.dso_std_dev_days ?? .5,
		avg_client_tenure_months: rawSummary.avg_client_tenure_months ?? 28
	};
	let monthly_revenue_matrix = [];
	if (Array.isArray(data?.monthly_revenue_matrix)) monthly_revenue_matrix = data.monthly_revenue_matrix;
	else if (data?.monthly_revenue_matrix && typeof data.monthly_revenue_matrix === "object") {
		const matrixObj = data.monthly_revenue_matrix;
		const clientNames = Object.keys(matrixObj);
		if (clientNames.length > 0) {
			const monthKeys = Object.keys(matrixObj[clientNames[0]]);
			const monthShortNames = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			];
			monthly_revenue_matrix = monthKeys.map((mKey) => {
				let monthLabel = mKey;
				if (mKey.includes("-")) monthLabel = monthShortNames[Number.parseInt(mKey.split("-")[1], 10) - 1] || mKey;
				const row = { month: monthLabel };
				clientNames.forEach((cName) => {
					row[cName] = matrixObj[cName][mKey] || 0;
				});
				return row;
			});
		}
	}
	if (!monthly_revenue_matrix || monthly_revenue_matrix.length === 0) monthly_revenue_matrix = [
		{
			month: "Jan",
			"Technova Solutions": 52e4,
			"GlobalRetail Logistics": 475e3,
			"Apex Financials": 383333,
			"Zenith Enterprises": 35e4,
			"Horizon Media": 308333
		},
		{
			month: "Feb",
			"Technova Solutions": 52e4,
			"GlobalRetail Logistics": 475e3,
			"Apex Financials": 383333,
			"Zenith Enterprises": 35e4,
			"Horizon Media": 308333
		},
		{
			month: "Mar",
			"Technova Solutions": 52e4,
			"GlobalRetail Logistics": 475e3,
			"Apex Financials": 383333,
			"Zenith Enterprises": 35e4,
			"Horizon Media": 308333
		},
		{
			month: "Apr",
			"Technova Solutions": 52e4,
			"GlobalRetail Logistics": 475e3,
			"Apex Financials": 383333,
			"Zenith Enterprises": 35e4,
			"Horizon Media": 308333
		},
		{
			month: "May",
			"Technova Solutions": 52e4,
			"GlobalRetail Logistics": 475e3,
			"Apex Financials": 383333,
			"Zenith Enterprises": 35e4,
			"Horizon Media": 308333
		},
		{
			month: "Jun",
			"Technova Solutions": 52e4,
			"GlobalRetail Logistics": 475e3,
			"Apex Financials": 383333,
			"Zenith Enterprises": 35e4,
			"Horizon Media": 308333
		}
	];
	const rawClientList = data?.client_directory_and_metrics || data?.client_table || [];
	const client_table = rawClientList.length > 0 ? rawClientList.map((c) => ({
		client_id: c.client_id || c.clientId || "CLI-001",
		client_name: c.company_name || c.client_name || c.name || "Client Account",
		acv: c.acv || (c.avg_monthly_revenue ? c.avg_monthly_revenue * 12 : 0) || c.revenue_6mo || 0,
		revenue_share_pct: c.revenue_share_pct ?? c.share_pct ?? 0,
		dso_days: c.payment_drift_median_day ?? c.dso_days ?? 10,
		status: c.status || "Active",
		tenure_months: c.tenure_months ?? 28
	})) : [
		{
			client_id: "CLT-001",
			client_name: "Technova Solutions",
			acv: 624e4,
			revenue_share_pct: 20.35,
			dso_days: 8,
			status: "Active",
			tenure_months: 36
		},
		{
			client_id: "CLT-002",
			client_name: "GlobalRetail Logistics",
			acv: 57e5,
			revenue_share_pct: 18.59,
			dso_days: 12,
			status: "Active",
			tenure_months: 24
		},
		{
			client_id: "CLT-003",
			client_name: "Apex Financials",
			acv: 46e5,
			revenue_share_pct: 15.07,
			dso_days: 10,
			status: "Contract Expired",
			tenure_months: 30
		},
		{
			client_id: "CLT-004",
			client_name: "Zenith Enterprises",
			acv: 42e5,
			revenue_share_pct: 13.71,
			dso_days: 15,
			status: "Active",
			tenure_months: 18
		},
		{
			client_id: "CLT-005",
			client_name: "Horizon Media",
			acv: 37e5,
			revenue_share_pct: 12.08,
			dso_days: 7,
			status: "Active",
			tenure_months: 22
		}
	];
	data?.churn_risk_accounts;
	const clientKeys = monthly_revenue_matrix.length > 0 ? Object.keys(monthly_revenue_matrix[0]).filter((k) => k !== "month") : [];
	const expiredCount = client_table.filter((c) => c.status === "Contract Expired").length || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold text-foreground",
						children: "Client Revenue Matrix & Payment Drift Intelligence"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-text-secondary mt-0.5",
					children: [
						summary.active_clients,
						" clients ·",
						" ",
						formatINR(summary.annual_contract_value, { compact: true }),
						" annual revenue ·",
						" ",
						expiredCount,
						" expired contract flagged."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs px-2.5 py-1 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						size: 12,
						className: "mr-1"
					}), " Client Network"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteClientBubbleGraph, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 border-border/80 bg-surface shadow-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: "Annual Contract Value: Total annualized value of all signed client customer contracts.",
									children: "Annual Contract Value (ACV)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
									size: 16,
									className: "text-emerald-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-num tabular-nums text-2xl font-bold text-emerald-600 dark:text-emerald-400",
								children: formatINR(summary.annual_contract_value || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-text-secondary",
								children: [
									summary.active_clients || 0,
									" active · ",
									expiredCount,
									" expired"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 border-border/80 bg-surface shadow-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Top 1 & Top 3 Concentration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
									size: 16,
									className: "text-brand"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-num tabular-nums text-2xl font-bold text-foreground",
								children: [
									formatPct(summary.top1_client_revenue_pct || 0, 1),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-normal text-text-tertiary",
										children: [
											"(Top 3: ",
											formatPct(summary.top3_client_revenue_pct || 0, 1),
											")"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-text-secondary",
								children: "0.185 — Low Risk (below 0.25 = diversified)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 border-border/80 bg-surface shadow-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment Date Drift (DSO)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									size: 16,
									className: "text-blue-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-num tabular-nums text-2xl font-bold text-foreground",
								children: [
									summary.dso_median_days || 0,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-normal text-text-tertiary",
										children: "days median"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-text-secondary",
								children: [
									"Std Dev:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono font-bold",
										children: [
											"±",
											summary.dso_std_dev_days || 0,
											" days"
										]
									}),
									" (Low Drift)"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 border-border/80 bg-surface shadow-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Average Client Tenure" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
									size: 16,
									className: "text-purple-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-num tabular-nums text-2xl font-bold text-foreground",
								children: [
									summary.avg_client_tenure_months || 0,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-normal text-text-tertiary",
										children: "months"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-text-secondary",
								children: [
									"Average relationship duration across ",
									summary.active_clients || 0,
									" clients."
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 border-border/80 bg-surface shadow-xs space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-border/60 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase tracking-wider text-text-tertiary",
							children: "Revenue Concentration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-bold text-foreground mt-0.5",
							children: "Counterparty Concentration Risk Radar"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-lg bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 14 }), " Dual-Ledger Risk Shape"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary",
									children: "Top 1 Client Share (Technova Solutions)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground",
									children: formatPct(summary.top1_client_revenue_pct || 20.35, 1)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-3 w-full rounded-full bg-surface-alt border border-border/40 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-brand",
									style: { width: `${summary.top1_client_revenue_pct || 20.35}%` }
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary",
									children: "Top 3 Combined Client Share (Technova, GlobalRetail, Apex)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground",
									children: formatPct(summary.top3_client_revenue_pct || 54.01, 1)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-3 w-full rounded-full bg-surface-alt border border-border/40 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-blue-600",
									style: { width: `${summary.top3_client_revenue_pct || 54.01}%` }
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-xl bg-surface-alt p-3.5 text-xs leading-relaxed text-text-secondary border border-border/50",
						children: [
							"🎯 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Counterparty Risk Insight:" }),
							" Top 3 clients generate over 54% of realized annual contract value. Loss of Technova Solutions alone reduces monthly operating cushion by ₹5.2L."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 border-border/80 bg-surface shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border/60 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-sm font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {
							size: 16,
							className: "text-blue-500"
						}), " Client Trailing Monthly Revenue Matrix"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-text-secondary",
						children: "Monthly income breakdown by client account"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "bg-emerald-500/10 text-emerald-600 text-[10px] font-bold",
						children: "₹25.55L / mo (6-mo avg)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: monthly_revenue_matrix,
							margin: {
								top: 10,
								right: 10,
								left: 10,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									opacity: .3
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "month",
									tick: { fontSize: 11 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: { fontSize: 10 },
									tickFormatter: (v) => `₹${(v / 1e5).toFixed(1)}L`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (val) => [formatINR(Number(val)), ""] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
									fontSize: "11px",
									paddingTop: "10px"
								} }),
								clientKeys.slice(0, 5).map((clientName, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: clientName,
									stackId: "a",
									fill: CLIENT_COLORS[idx % CLIENT_COLORS.length]
								}, clientName))
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 border-border/80 bg-surface shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold text-foreground",
						children: "Client Portfolio Directory & ACV"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-text-secondary",
						children: [client_table.length, " Accounts"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-xs text-left",
						role: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-alt text-[11px] font-semibold text-text-secondary uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5",
									children: "Client ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5",
									children: "Client Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5 text-right",
									children: "Annual Contract Value (ACV)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5 text-right",
									children: "Revenue Share %"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5 text-center",
									children: "Payment Days (DSO)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5 text-center",
									children: "Tenure"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5",
									children: "Status"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: client_table.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-surface-alt/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-mono font-medium text-foreground",
										children: row.client_id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-semibold text-foreground",
										children: row.client_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-num tabular-nums font-bold text-emerald-600 dark:text-emerald-400 text-right",
										children: formatINR(row.acv)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-num tabular-nums font-bold text-foreground text-right",
										children: formatPct(row.revenue_share_pct, 1)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 font-num tabular-nums text-center text-text-secondary",
										children: [row.dso_days, " days"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 font-num tabular-nums text-center text-text-secondary",
										children: [row.tenure_months, " mo"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: row.status === "Contract Expired" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px] font-bold",
											children: "⚠️ Expired SLA"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]",
											children: "Active Account"
										})
									})
								]
							}, i))
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { SpotliteClientAnalytics as t };
