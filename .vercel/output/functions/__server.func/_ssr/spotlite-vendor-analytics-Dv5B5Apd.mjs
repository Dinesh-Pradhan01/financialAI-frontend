import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Fn as Brain, Mn as Building2, Ot as Layers, T as Table, U as Search, Ut as FileText, _ as TriangleAlert, nn as DollarSign, pt as Network, z as ShieldAlert } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-CmBWGYZD.mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { t as Skeleton } from "./skeleton-DKEeCsGh.mjs";
import { t as Card } from "./card-DTjlUu6U.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { n as formatPct, t as formatINR } from "./format-B9luOE0k.mjs";
import { a as Area, i as XAxis, l as ResponsiveContainer, r as YAxis, t as AreaChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spotlite-vendor-analytics-Dv5B5Apd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SpotliteVendorBubbleGraph() {
	const [hub, setHub] = (0, import_react.useState)(null);
	const [bubbles, setBubbles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedVendor, setSelectedVendor] = (0, import_react.useState)(null);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [viewMode, setViewMode] = (0, import_react.useState)("graph");
	(0, import_react.useEffect)(() => {
		async function fetchBubbleData() {
			try {
				setLoading(true);
				let json;
				try {
					json = await api.get("/api/v1/analysis/vendors/bubble");
				} catch (err) {
					json = await api.get("/api/v1/spotlite/vendors/bubble");
				}
				if (json?.success && json?.data) {
					setHub(json.data.center_company);
					setBubbles(json.data.vendor_bubbles || []);
				}
			} catch (err) {
				console.warn("Using baseline vendor bubble fallback state", err);
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
		subtitle: "Central Corporate Entity",
		total_monthly_vendor_spend: 1075e3,
		monitored_vendors_count: 5
	};
	const vendorList = bubbles.length > 0 ? bubbles : [
		{
			vendor_id: "VEN-001",
			vendor_name: "AWS Infrastructure",
			category: "Cloud Infrastructure",
			cost_classification: "Fixed Opex",
			monthly_spend: 245e3,
			contracted_monthly_rate: 22e4,
			spend_share_pct: 22.8,
			bubble_diameter_px: 115,
			status: "Active SLA",
			color: "#8b5cf6",
			transaction_count: 3,
			is_others: false,
			start_date: "2023-01-10",
			contract_number: "VCTR-2023-1109",
			vendor_summary: "Enterprise AWS Cloud Infrastructure, EC2, S3, & Relational Database SLA Hosting.",
			monthly_trend: [
				{
					month: "Jan",
					val: 24e4
				},
				{
					month: "Feb",
					val: 242e3
				},
				{
					month: "Mar",
					val: 245e3
				},
				{
					month: "Apr",
					val: 241e3
				},
				{
					month: "May",
					val: 243e3
				},
				{
					month: "Jun",
					val: 245e3
				}
			],
			ai_relationship_summary: "AWS Infrastructure is a primary cloud provider with high fixed OPEX share (22.8%). Active SLA compliance with predictable monthly disbursements.",
			transactions: [{
				transaction_id: "TXN-V01",
				date: "2026-06-14",
				invoice_ref: "V-INV-0601",
				narration: "Cloud Hosting Monthly Disbursement",
				amount: 245e3,
				transaction_type: "Debit (Outflow)",
				payment_status: "Settled",
				payment_method: "NEFT Transfer"
			}]
		},
		{
			vendor_id: "VEN-002",
			vendor_name: "WeWork Office Space",
			category: "Building Maintenance",
			cost_classification: "Fixed Opex",
			monthly_spend: 28e4,
			contracted_monthly_rate: 28e4,
			spend_share_pct: 26,
			bubble_diameter_px: 125,
			status: "Active SLA",
			color: "#6366f1",
			transaction_count: 3,
			is_others: false,
			start_date: "2022-11-01",
			contract_number: "VCTR-2022-4402",
			vendor_summary: "Corporate Head Office Facilities, Shared Workspace Leases, & Amenities.",
			monthly_trend: [
				{
					month: "Jan",
					val: 28e4
				},
				{
					month: "Feb",
					val: 28e4
				},
				{
					month: "Mar",
					val: 28e4
				},
				{
					month: "Apr",
					val: 28e4
				},
				{
					month: "May",
					val: 28e4
				},
				{
					month: "Jun",
					val: 28e4
				}
			],
			ai_relationship_summary: "WeWork Office Space is a fixed monthly lease commitment with 100% contract compliance and zero variance drift.",
			transactions: [{
				transaction_id: "TXN-V02",
				date: "2026-06-10",
				invoice_ref: "V-INV-0602",
				narration: "Office Rent Settlement",
				amount: 28e4,
				transaction_type: "Debit (Outflow)",
				payment_status: "Settled",
				payment_method: "RTGS Transfer"
			}]
		},
		{
			vendor_id: "VEN-003",
			vendor_name: "Office Depot Supplies",
			category: "Office Supplies",
			cost_classification: "Variable Opex",
			monthly_spend: 185e3,
			contracted_monthly_rate: 1e5,
			spend_share_pct: 17.2,
			bubble_diameter_px: 95,
			status: "Overbilling Alert (+85%)",
			color: "#f43f5e",
			transaction_count: 3,
			is_others: false,
			start_date: "2024-02-15",
			contract_number: "VCTR-2024-0091",
			vendor_summary: "Stationery, Office Printing Supplies, Ergonomic Consumables & Sundry Admin Items.",
			monthly_trend: [
				{
					month: "Jan",
					val: 1e5
				},
				{
					month: "Feb",
					val: 12e4
				},
				{
					month: "Mar",
					val: 14e4
				},
				{
					month: "Apr",
					val: 16e4
				},
				{
					month: "May",
					val: 175e3
				},
				{
					month: "Jun",
					val: 185e3
				}
			],
			ai_relationship_summary: "🚨 High Anomaly Alert: Monthly billing has surged +85% over contracted rates (₹1.85L vs ₹1.00L contract). Recommended immediate audit on unapproved purchase orders.",
			transactions: [{
				transaction_id: "TXN-V03",
				date: "2026-06-08",
				invoice_ref: "V-INV-0603",
				narration: "Sundry Supplies Billed Charge",
				amount: 185e3,
				transaction_type: "Debit (Outflow)",
				payment_status: "Settled",
				payment_method: "UPI Auto Payment",
				is_overbilling: true
			}]
		},
		{
			vendor_id: "VEN-004",
			vendor_name: "Blue Dart Express",
			category: "Courier Services",
			cost_classification: "Variable Opex",
			monthly_spend: 155e3,
			contracted_monthly_rate: 15e4,
			spend_share_pct: 14.4,
			bubble_diameter_px: 85,
			status: "Active SLA",
			color: "#0ea5e9",
			transaction_count: 3,
			is_others: false,
			start_date: "2023-06-20",
			contract_number: "VCTR-2023-7721",
			vendor_summary: "Domestic Logistics, Priority Document Express & Freight Courier Distribution.",
			monthly_trend: [
				{
					month: "Jan",
					val: 15e4
				},
				{
					month: "Feb",
					val: 152e3
				},
				{
					month: "Mar",
					val: 148e3
				},
				{
					month: "Apr",
					val: 151e3
				},
				{
					month: "May",
					val: 153e3
				},
				{
					month: "Jun",
					val: 155e3
				}
			],
			ai_relationship_summary: "Blue Dart Express exhibits stable logistics volume with minimal +3.3% variance against contracted rate limits.",
			transactions: []
		},
		{
			vendor_id: "VEN-OTHERS",
			vendor_name: "Others (Unclassified Debits)",
			category: "General Overhead / Unmapped",
			cost_classification: "Unclassified Debits",
			monthly_spend: 21e4,
			contracted_monthly_rate: 0,
			spend_share_pct: 19.5,
			bubble_diameter_px: 102,
			status: "Unmapped Debits",
			color: "#94a3b8",
			transaction_count: 4,
			is_others: true,
			start_date: "Continuous",
			contract_number: "UNMAPPED-DEBITS",
			vendor_summary: "Aggregated unmapped debit entries including bank charges, IMPS/NEFT transfers, and petty cash reimbursements.",
			monthly_trend: [
				{
					month: "Jan",
					val: 19e4
				},
				{
					month: "Feb",
					val: 2e5
				},
				{
					month: "Mar",
					val: 205e3
				},
				{
					month: "Apr",
					val: 198e3
				},
				{
					month: "May",
					val: 215e3
				},
				{
					month: "Jun",
					val: 21e4
				}
			],
			ai_relationship_summary: "⚠️ Attention Required: 19.5% of total monthly vendor spend is unclassified. Auto-classification rules recommended to map recurring bank narrations.",
			transactions: [
				{
					transaction_id: "TXN-OTH-06",
					date: "2026-06-20",
					invoice_ref: "REF-UNMAPPED-06",
					narration: "IMPS/OUT/MISC DEBIT/BANK CHARGES/REF1009",
					amount: 45e3,
					transaction_type: "Debit (Outflow)",
					payment_status: "Settled",
					payment_method: "IMPS Direct Transfer",
					is_unmapped_vendor: true
				},
				{
					transaction_id: "TXN-OTH-05",
					date: "2026-05-18",
					invoice_ref: "REF-UNMAPPED-05",
					narration: "UPI/OUT/MISC SUNDRY SUPPLIES/REF9921",
					amount: 65e3,
					transaction_type: "Debit (Outflow)",
					payment_status: "Settled",
					payment_method: "UPI Auto Payment",
					is_unmapped_vendor: true
				},
				{
					transaction_id: "TXN-OTH-04",
					date: "2026-04-14",
					invoice_ref: "REF-UNMAPPED-04",
					narration: "NEFT/OUT/UNREGISTERED COUNTERPARTY DEBIT",
					amount: 5e4,
					transaction_type: "Debit (Outflow)",
					payment_status: "Settled",
					payment_method: "NEFT Bank Transfer",
					is_unmapped_vendor: true
				},
				{
					transaction_id: "TXN-OTH-03",
					date: "2026-03-10",
					invoice_ref: "REF-UNMAPPED-03",
					narration: "RTGS/OUT/PETTY CASH REIMBURSEMENT",
					amount: 5e4,
					transaction_type: "Debit (Outflow)",
					payment_status: "Settled",
					payment_method: "RTGS Direct Transfer",
					is_unmapped_vendor: true
				}
			]
		}
	];
	const centerPos = {
		x: 380,
		y: 260
	};
	const orbitRadius = 185;
	const positions = vendorList.map((vendor, index) => {
		const angle = index / vendorList.length * 2 * Math.PI - Math.PI / 2;
		const x = centerPos.x + orbitRadius * Math.cos(angle);
		const y = centerPos.y + orbitRadius * Math.sin(angle);
		return {
			...vendor,
			x,
			y,
			angle
		};
	});
	const handleBubbleClick = (vendor) => {
		setSelectedVendor(vendor);
		setModalOpen(true);
	};
	const filteredTransactions = (selectedVendor?.transactions || []).filter((tx) => searchTerm ? tx.invoice_ref.toLowerCase().includes(searchTerm.toLowerCase()) || tx.narration.toLowerCase().includes(searchTerm.toLowerCase()) || tx.payment_method.toLowerCase().includes(searchTerm.toLowerCase()) : true);
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-bold text-foreground",
							children: "Vendor Spend Network"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-text-secondary mt-0.5",
						children: [
							"Radial node diagram: Center = ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: centerCompany.company_name }),
							". Node diameter scales by monthly spend. Dedicated ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Others" }),
							" node tracks unclassified debits."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 p-1 bg-surface-alt rounded-lg border border-border/60",
							role: "group",
							"aria-label": "Vendor View Options",
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
						"aria-label": `Interactive radial vendor network graph with ${vendorList.length} vendor nodes revolving around ${centerCompany.company_name}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
                  @keyframes vendorBeamFlow {
                    to { stroke-dashoffset: -18; }
                  }
                  .animate-vendor-beam {
                    animation: vendorBeamFlow 2s linear infinite;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .animate-vendor-beam {
                      animation: none !important;
                    }
                  }
                ` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
									id: "vendorCenterGlow",
									cx: "50%",
									cy: "50%",
									r: "50%",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "#8b5cf6",
										stopOpacity: "0.35"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "#8b5cf6",
										stopOpacity: "0"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
									id: "vendorGlow",
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
								strokeWidth: Math.max(1.5, node.spend_share_pct / 5),
								strokeOpacity: "0.45",
								strokeDasharray: node.is_others ? "3 3" : "6 3",
								className: "animate-vendor-beam"
							}) }, `beam-${node.vendor_id}`)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${centerPos.x}, ${centerPos.y})`,
								className: "cursor-default group",
								tabIndex: 0,
								role: "region",
								"aria-label": `Central corporate entity: ${centerCompany.company_name}, total monthly vendor spend ${formatINR(centerCompany.total_monthly_vendor_spend)}, with ${centerCompany.monitored_vendors_count} monitored debits`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: "85",
										fill: "url(#vendorCenterGlow)",
										className: "opacity-75 group-hover:opacity-100 transition-opacity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: "65",
										fill: "#8b5cf6",
										className: "shadow-lg transition-transform duration-300 group-hover:scale-105",
										filter: "url(#vendorGlow)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										r: "60",
										fill: "none",
										stroke: "#a78bfa",
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
										y: "16",
										textAnchor: "middle",
										fill: "#f3e8ff",
										fontSize: "10",
										fontWeight: "600",
										fontFamily: "sans-serif",
										children: [formatINR(centerCompany.total_monthly_vendor_spend), " / mo"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
										y: "30",
										textAnchor: "middle",
										fill: "#ddd6fe",
										fontSize: "9",
										fontFamily: "sans-serif",
										children: [centerCompany.monitored_vendors_count, " Monitored Debits"]
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
									"aria-label": `View ledger for ${node.vendor_name}, monthly spend ${formatINR(node.monthly_spend)}, spend share ${node.spend_share_pct.toFixed(1)}%`,
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
											children: node.is_others ? "OTHERS" : node.vendor_name.length > 14 ? node.vendor_name.split(" ")[0] : node.vendor_name
										}),
										radius > 30 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
											y: "10",
											textAnchor: "middle",
											fill: "#ffffff",
											fontSize: "9",
											fontWeight: "600",
											fontFamily: "monospace",
											className: "pointer-events-none opacity-90",
											children: formatINR(node.monthly_spend)
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
												node.spend_share_pct.toFixed(1),
												"%)"
											]
										})
									]
								}, node.vendor_id);
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
										children: "Vendor / Debit Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3",
										children: "Classification"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-right",
										children: "Monthly Spend"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-right",
										children: "Contracted Rate"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-right",
										children: "Spend Share"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3",
										children: "Audit Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-4 py-3 text-center",
										children: "Action"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/40",
								children: vendorList.map((vendor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-surface-alt/50 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-semibold text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-2.5 w-2.5 rounded-full shrink-0",
													style: { backgroundColor: vendor.color }
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: vendor.vendor_name })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-text-secondary",
											children: vendor.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "bg-surface text-text-secondary text-[10px]",
												children: vendor.cost_classification
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-num tabular-nums font-bold text-foreground text-right",
											children: formatINR(vendor.monthly_spend)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-num tabular-nums text-text-secondary text-right",
											children: vendor.contracted_monthly_rate > 0 ? formatINR(vendor.contracted_monthly_rate) : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-4 py-3 font-num tabular-nums font-semibold text-foreground text-right",
											children: [vendor.spend_share_pct.toFixed(1), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: vendor.status.includes("Overbilling") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[10px] font-bold",
												children: "🚨 Overbill (+85%)"
											}) : vendor.is_others ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] font-bold",
												children: "⚠️ Unclassified"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]",
												children: vendor.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleBubbleClick(vendor),
												className: "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-brand/10 text-brand hover:bg-brand/20 transition-colors focus:ring-2 focus:ring-brand focus:outline-hidden",
												"aria-label": `Inspect transactions for ${vendor.vendor_name}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 12 }), " Inspect Details"]
											})
										})
									]
								}, vendor.vendor_id))
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-[#8b5cf6]" }), " Fixed Opex"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-[#0ea5e9]" }), " Variable Opex"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-[#f43f5e]" }), " Overbilling Risk"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-[#94a3b8]" }), " Others (Unclassified Debits)"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-text-tertiary",
						children: [
							"💡 ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Keyboard Support:" }),
							" Tab through nodes and press ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "px-1 py-0.5 rounded bg-surface border border-border text-[10px] font-mono",
								children: "Enter"
							}),
							" to inspect transaction details."
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: modalOpen,
			onOpenChange: setModalOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-6 border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "border-b border-border/60 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm shadow-sm",
								style: { backgroundColor: selectedVendor?.color || "#8b5cf6" },
								children: selectedVendor?.is_others ? "OTH" : selectedVendor?.vendor_name.substring(0, 2).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								className: "font-display text-lg font-bold text-foreground flex items-center gap-2",
								children: [selectedVendor?.vendor_name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-xs bg-surface-alt",
									children: selectedVendor?.category
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-secondary",
								children: [
									"Vendor ID: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-semibold",
										children: selectedVendor?.vendor_id
									}),
									" | Classification:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: selectedVendor?.cost_classification
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
										children: selectedVendor?.transaction_count || selectedVendor?.transactions.length || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-text-secondary block",
										children: "Settled Debit Transactions"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 space-y-1 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300 block tracking-wider",
										children: "$ (Monthly Spend)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-num text-xl font-black text-rose-600 dark:text-rose-400",
										children: formatINR(selectedVendor?.monthly_spend || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[9px] text-rose-600 dark:text-rose-400 block font-semibold",
										children: [selectedVendor?.spend_share_pct.toFixed(1), "% OPEX Share"]
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
									children: "Monthly Outflow Spend Trend"
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
										data: selectedVendor?.monthly_trend || [
											{
												month: "Jan",
												val: selectedVendor?.monthly_spend || 2e5
											},
											{
												month: "Feb",
												val: selectedVendor?.monthly_spend || 2e5
											},
											{
												month: "Mar",
												val: selectedVendor?.monthly_spend || 2e5
											},
											{
												month: "Apr",
												val: selectedVendor?.monthly_spend || 2e5
											},
											{
												month: "May",
												val: selectedVendor?.monthly_spend || 2e5
											},
											{
												month: "Jun",
												val: selectedVendor?.monthly_spend || 2e5
											}
										],
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "vendorTrendGrad",
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "5%",
													stopColor: "#f43f5e",
													stopOpacity: .4
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "95%",
													stopColor: "#f43f5e",
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
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => [formatINR(Number(v)), "Outflow Spend"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "val",
												stroke: "#f43f5e",
												strokeWidth: 2,
												fill: "url(#vendorTrendGrad)"
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
										children: selectedVendor?.start_date || "2023-01-10"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-text-tertiary uppercase block",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-block rounded-md px-2 py-0.5 text-[10px] font-bold border ${selectedVendor?.status.includes("Overbilling") ? "bg-rose-500/10 text-rose-600 border-rose-500/20" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"}`,
										children: selectedVendor?.status || "Active SLA"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-text-tertiary uppercase block",
										children: "Contract#"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold text-foreground block truncate",
										title: selectedVendor?.contract_number,
										children: selectedVendor?.contract_number || "VCTR-2023-1109"
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
										children: "Contracted Rate"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-num text-base font-extrabold text-foreground",
										children: selectedVendor?.contracted_monthly_rate ? formatINR(selectedVendor.contracted_monthly_rate) : "N/A (Unmapped)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-text-tertiary block",
										children: "Monthly Baseline Rate"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2 rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-text-tertiary uppercase block",
									children: "Vendor Scope & Summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-secondary leading-normal font-medium",
									children: selectedVendor?.vendor_summary || "Enterprise Cloud Infrastructure, EC2, S3, & Database Hosting SLA Contract."
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
										children: "Vendor Risk & Relationship Analysis by AI"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20",
									children: "AI Vendor Intelligence"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-secondary leading-relaxed rounded-xl bg-surface/80 p-3 border border-border/50",
								children: ["🤖 ", selectedVendor?.ai_relationship_summary || `${selectedVendor?.vendor_name} is a key vendor counterparty accounting for ${selectedVendor?.spend_share_pct.toFixed(1)}% of total monthly OPEX.`]
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
										placeholder: "Search invoice ref, narration, payment method...",
										value: searchTerm,
										onChange: (e) => setSearchTerm(e.target.value),
										className: "w-full pl-9 pr-3 py-1.5 text-xs bg-surface border border-border/80 rounded-lg outline-none focus:border-brand"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-text-secondary font-mono",
									children: [filteredTransactions.length, " Debits Found"]
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
												children: "Reference / Ref #"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Narration"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-3 py-2.5",
												children: "Debit Amount"
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
													className: "px-3 py-2.5 font-medium text-foreground max-w-xs truncate",
													title: tx.narration,
													children: tx.narration
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 font-mono font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap",
													children: formatINR(tx.amount)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5 text-text-secondary",
													children: tx.payment_method
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2.5",
													children: tx.is_overbilling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "bg-rose-500/10 text-rose-600 border-rose-500/20 text-[10px] font-bold",
														children: "🚨 Billed +85% Over Contract"
													}) : tx.is_unmapped_vendor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "bg-slate-500/10 text-slate-600 border-slate-500/20 text-[10px]",
														children: "Unmapped Debit"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														variant: "outline",
														className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold",
														children: tx.payment_status
													})
												})
											]
										}, idx)), filteredTransactions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 7,
											className: "px-4 py-8 text-center text-text-secondary",
											children: "No debit transactions match this filter."
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
function SpotliteVendorAnalytics() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function fetchVendorAnalytics() {
			try {
				setLoading(true);
				let json;
				try {
					json = await api.get("/api/v1/analysis/vendors/analytics");
				} catch (err) {
					json = await api.get("/api/v1/spotlite/vendors/analytics");
				}
				if (json?.success && json?.data) setData(json.data);
				else setError("Failed to fetch live vendor metrics");
			} catch (err) {
				console.warn("Using baseline vendor metrics state", err);
				setError("Offline mode. Displaying baseline metrics.");
			} finally {
				setLoading(false);
			}
		}
		fetchVendorAnalytics();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-64 rounded-lg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
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
	const summary = data?.summary || {};
	const rawVendorList = data?.vendor_directory_and_metrics || data?.vendor_table || [];
	const vendorList = rawVendorList.length > 0 ? rawVendorList.map((v) => ({
		vendor_id: v.vendor_id || v.id || "VEN-001",
		name: v.name || v.vendor_name || "Vendor",
		category: v.category || "General Overhead",
		cost_classification: v.cost_classification || "Fixed Opex",
		avg_actual_monthly_billed: v.avg_actual_monthly_billed ?? v.avg_actual_monthly ?? v.monthly_spend ?? 0,
		contracted_monthly_rate: v.contracted_monthly_rate ?? 0,
		is_overbilling: v.is_overbilling ?? false,
		monthly_overbill_amount: v.monthly_overbill_amount ?? 0,
		note: v.note || ""
	})) : [
		{
			vendor_id: "VEN-001",
			name: "AWS Infrastructure",
			category: "Cloud Infrastructure",
			cost_classification: "Fixed Opex",
			avg_actual_monthly_billed: 245e3,
			contracted_monthly_rate: 22e4,
			is_overbilling: false,
			monthly_overbill_amount: 0,
			note: "Usage scaled with volume"
		},
		{
			vendor_id: "VEN-002",
			name: "Office Depot Supplies",
			category: "Office Supplies",
			cost_classification: "Variable Opex",
			avg_actual_monthly_billed: 185e3,
			contracted_monthly_rate: 1e5,
			is_overbilling: true,
			monthly_overbill_amount: 85e3,
			note: "Billed +85% above contracted rate"
		},
		{
			vendor_id: "VEN-003",
			name: "WeWork Office Space",
			category: "Building Maintenance",
			cost_classification: "Fixed Opex",
			avg_actual_monthly_billed: 28e4,
			contracted_monthly_rate: 28e4,
			is_overbilling: false,
			monthly_overbill_amount: 0,
			note: "Exact match to contract terms"
		},
		{
			vendor_id: "VEN-004",
			name: "Blue Dart Express",
			category: "Courier Services",
			cost_classification: "Variable Opex",
			avg_actual_monthly_billed: 155e3,
			contracted_monthly_rate: 15e4,
			is_overbilling: false,
			monthly_overbill_amount: 0,
			note: "Minor variable freight fluctuation"
		},
		{
			vendor_id: "VEN-OTHERS",
			name: "Others (Unclassified Debits)",
			category: "General Overhead / Unmapped",
			cost_classification: "Unclassified Debits",
			avg_actual_monthly_billed: 21e4,
			contracted_monthly_rate: 0,
			is_overbilling: false,
			monthly_overbill_amount: 0,
			note: "Unmapped debits & banking charges without vendor tags"
		}
	];
	const totalVendors = summary.total_vendors_monitored ?? summary.total_vendors ?? vendorList.length;
	const totalMonthlySpend = summary.total_monthly_vendor_spend ?? summary.fixed_debits_total ?? 865e3;
	const fixedMonthly = summary.fixed_opex_monthly ?? 525e3;
	const fixedPct = summary.fixed_opex_pct ?? summary.fixed_debits_pct ?? 60.69;
	const varMonthly = summary.variable_opex_monthly ?? 34e4;
	const varPct = summary.variable_opex_pct ?? summary.variable_debits_pct ?? 39.31;
	const top2Conc = summary.top2_vendor_concentration_pct ?? summary.top3_vendor_spend_pct ?? 60.7;
	const top1Conc = summary.top1_vendor_spend_pct ?? 32.5;
	const fixedVendors = vendorList.filter((v) => (v.cost_classification || "").toLowerCase().includes("fixed"));
	const totalFixedAmt = fixedVendors.reduce((sum, v) => sum + v.avg_actual_monthly_billed, 0) || fixedMonthly || 1;
	fixedVendors.length > 0 && fixedVendors.map((v) => ({
		category: v.category || v.name,
		amount: v.avg_actual_monthly_billed,
		pct: Number((v.avg_actual_monthly_billed / totalFixedAmt * 100).toFixed(1))
	}));
	const varVendors = vendorList.filter((v) => (v.cost_classification || "").toLowerCase().includes("variable"));
	const totalVarAmt = varVendors.reduce((sum, v) => sum + v.avg_actual_monthly_billed, 0) || varMonthly || 1;
	varVendors.length > 0 && varVendors.map((v) => ({
		category: v.category || v.name,
		amount: v.avg_actual_monthly_billed,
		pct: Number((v.avg_actual_monthly_billed / totalVarAmt * 100).toFixed(1))
	}));
	const overbillingAnomalies = data?.vendor_overbilling_anomalies || vendorList.filter((v) => v.is_overbilling);
	const annualOverbill = (overbillingAnomalies.reduce((sum, v) => sum + (v.monthly_overbill_amount || v.avg_actual_monthly_billed - v.contracted_monthly_rate || 85e3), 0) || 85e3) * 12;
	overbillingAnomalies[0]?.name;
	const singleDependencies = data?.single_vendor_dependency_risks || [{
		category: "Cloud Infrastructure",
		sole_supplier: "AWS Infrastructure",
		risk_level: "HIGH_DEPENDENCY"
	}, {
		category: "Office Supplies",
		sole_supplier: "Office Depot Supplies",
		risk_level: "OVERBILLING_RISK"
	}];
	const overbillCount = overbillingAnomalies.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 18 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold text-foreground",
						children: "Vendor Analytics & Debits Classification"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-text-secondary mt-0.5",
					children: [
						totalVendors,
						" active vendors tracked. ",
						overbillCount,
						" overbilling ",
						overbillCount === 1 ? "anomaly" : "anomalies",
						" flagged."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "bg-violet-500/10 text-violet-600 border-violet-500/20 text-xs px-2.5 py-1 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						size: 12,
						className: "mr-1"
					}), " Deterministic Vendor Intelligence"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteVendorBubbleGraph, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 border-border/80 bg-surface shadow-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Monitored Vendors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
									size: 16,
									className: "text-violet-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-num tabular-nums text-2xl font-bold text-foreground",
								children: [totalVendors, " Active"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-text-secondary",
								children: [
									formatINR(totalMonthlySpend, { compact: true }),
									"/mo total · ",
									formatINR(fixedMonthly, { compact: true }),
									" fixed · ",
									formatINR(varMonthly, { compact: true }),
									" variable"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 border-border/80 bg-surface shadow-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fixed vs Variable Ratio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
									size: 16,
									className: "text-brand"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-num tabular-nums text-2xl font-bold text-foreground",
								children: [
									fixedPct.toFixed(0),
									"% : ",
									varPct.toFixed(0),
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-text-secondary",
								children: [
									"Fixed Opex: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: formatINR(fixedMonthly)
									}),
									"/mo"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 border-border/80 bg-surface shadow-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Top 2 Vendor Concentration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
									size: 16,
									className: "text-amber-500"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-num tabular-nums text-2xl font-bold text-amber-600 dark:text-amber-400",
								children: formatPct(top2Conc, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-text-secondary",
								children: ["Top 1 Share: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: formatPct(top1Conc, 1)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 border-2 border-rose-500/30 bg-rose-500/5 shadow-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Overbilling Cash Exposure" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 16 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-num tabular-nums text-2xl font-black text-rose-600 dark:text-rose-400",
								children: [formatINR(annualOverbill), " / yr"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-rose-700 dark:text-rose-300 font-medium",
								children: [
									overbillCount,
									" overbilling ",
									overbillCount === 1 ? "vendor" : "vendors",
									" detected. View table below."
								]
							})
						]
					})
				]
			}),
			singleDependencies.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4 border border-amber-500/30 bg-amber-500/5 shadow-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						size: 16,
						className: "text-amber-600 dark:text-amber-400 shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-amber-700 dark:text-amber-300",
							children: "Single Supplier Dependency Risk:"
						}),
						" ",
						singleDependencies[0].sole_supplier || singleDependencies[0].vendor,
						" is sole supplier for ",
						singleDependencies[0].category,
						"."
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 border-border/80 bg-surface shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold text-foreground",
						children: "All Vendors"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-text-secondary",
						children: [vendorList.length, " vendors tracked"]
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
									children: "Vendor Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5",
									children: "Classification"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5 text-right",
									children: "Monthly Spend"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									className: "px-4 py-2.5",
									children: "Status / Flag"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: vendorList.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-surface-alt/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-semibold text-foreground",
										children: row.name || row.vendor_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-text-secondary",
										children: row.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "bg-surface text-text-secondary text-[10px]",
											children: row.cost_classification || "Fixed Opex"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-num tabular-nums font-bold text-foreground text-right",
										children: formatINR(row.avg_actual_monthly_billed || row.monthly_spend || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: row.is_overbilling || row.flag ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "outline",
											className: "bg-rose-500/10 text-rose-600 border-rose-500/20 text-[10px] font-bold",
											children: ["🚨 ", row.note || (row.contracted_monthly_rate > 0 && row.avg_actual_monthly_billed > row.contracted_monthly_rate ? `Billed +${((row.avg_actual_monthly_billed - row.contracted_monthly_rate) / row.contracted_monthly_rate * 100).toFixed(0)}% Above Contract` : "Rate Discrepancy Detected")]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]",
											children: "Active SLA"
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
export { SpotliteVendorAnalytics as t };
