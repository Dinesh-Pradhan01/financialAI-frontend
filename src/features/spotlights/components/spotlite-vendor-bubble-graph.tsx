import React, { useState, useEffect } from "react";
import { formatINR, formatPct } from "@/shared/lib/format";
import {
  Building2,
  Sparkles,
  Layers,
  Search,
  AlertTriangle,
  Receipt,
  Layers3,
  Brain,
  Table,
  Network,
  FileText,
} from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export interface VendorTransactionRecord {
  transaction_id: string;
  date: string;
  invoice_ref: string;
  narration: string;
  amount: number;
  transaction_type: string;
  payment_status: string;
  payment_method: string;
  is_overbilling?: boolean;
  is_unmapped_vendor?: boolean;
}

export interface VendorBubbleNode {
  vendor_id: string;
  vendor_name: string;
  category: string;
  cost_classification: string;
  monthly_spend: number;
  contracted_monthly_rate: number;
  spend_share_pct: number;
  bubble_diameter_px: number;
  status: string;
  color: string;
  transaction_count: number;
  is_others?: boolean;
  start_date?: string;
  contract_number?: string;
  vendor_summary?: string;
  monthly_trend?: { month: string; val: number }[];
  ai_relationship_summary?: string;
  transactions: VendorTransactionRecord[];
}

export interface VendorCompanyHubNode {
  company_id: string;
  company_name: string;
  subtitle: string;
  total_monthly_vendor_spend: number;
  monitored_vendors_count: number;
  hub_diameter_px: number;
  color: string;
}

export function SpotliteVendorBubbleGraph() {
  const [hub, setHub] = useState<VendorCompanyHubNode | null>(null);
  const [bubbles, setBubbles] = useState<VendorBubbleNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVendor, setSelectedVendor] = useState<VendorBubbleNode | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"graph" | "table">("graph");

  useEffect(() => {
    async function fetchBubbleData() {
      try {
        setLoading(true);
        let res = await fetch(`${API_BASE}/api/v1/analysis/vendors/bubble`);
        if (!res.ok) {
          res = await fetch(`${API_BASE}/api/v1/spotlite/vendors/bubble`);
        }
        const json = await res.json();
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

  if (loading) {
    return (
      <Card className="p-8 border-border/80 bg-surface shadow-xs space-y-4 text-center">
        <Skeleton className="h-10 w-72 mx-auto rounded-lg" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </Card>
    );
  }

  const centerCompany = hub || {
    company_name: "Nimbus Logistics",
    subtitle: "Central Corporate Entity",
    total_monthly_vendor_spend: 1075000,
    monitored_vendors_count: 5,
  };

  const vendorList = bubbles.length > 0 ? bubbles : [
    {
      vendor_id: "VEN-001",
      vendor_name: "AWS Infrastructure",
      category: "Cloud Infrastructure",
      cost_classification: "Fixed Opex",
      monthly_spend: 245000,
      contracted_monthly_rate: 220000,
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
        { month: 'Jan', val: 240000 },
        { month: 'Feb', val: 242000 },
        { month: 'Mar', val: 245000 },
        { month: 'Apr', val: 241000 },
        { month: 'May', val: 243000 },
        { month: 'Jun', val: 245000 }
      ],
      ai_relationship_summary: "AWS Infrastructure is a primary cloud provider with high fixed OPEX share (22.8%). Active SLA compliance with predictable monthly disbursements.",
      transactions: [
        { transaction_id: "TXN-V01", date: "2026-06-14", invoice_ref: "V-INV-0601", narration: "Cloud Hosting Monthly Disbursement", amount: 245000, transaction_type: "Debit (Outflow)", payment_status: "Settled", payment_method: "NEFT Transfer" }
      ]
    },
    {
      vendor_id: "VEN-002",
      vendor_name: "WeWork Office Space",
      category: "Building Maintenance",
      cost_classification: "Fixed Opex",
      monthly_spend: 280000,
      contracted_monthly_rate: 280000,
      spend_share_pct: 26.0,
      bubble_diameter_px: 125,
      status: "Active SLA",
      color: "#6366f1",
      transaction_count: 3,
      is_others: false,
      start_date: "2022-11-01",
      contract_number: "VCTR-2022-4402",
      vendor_summary: "Corporate Head Office Facilities, Shared Workspace Leases, & Amenities.",
      monthly_trend: [
        { month: 'Jan', val: 280000 },
        { month: 'Feb', val: 280000 },
        { month: 'Mar', val: 280000 },
        { month: 'Apr', val: 280000 },
        { month: 'May', val: 280000 },
        { month: 'Jun', val: 280000 }
      ],
      ai_relationship_summary: "WeWork Office Space is a fixed monthly lease commitment with 100% contract compliance and zero variance drift.",
      transactions: [
        { transaction_id: "TXN-V02", date: "2026-06-10", invoice_ref: "V-INV-0602", narration: "Office Rent Settlement", amount: 280000, transaction_type: "Debit (Outflow)", payment_status: "Settled", payment_method: "RTGS Transfer" }
      ]
    },
    {
      vendor_id: "VEN-003",
      vendor_name: "Office Depot Supplies",
      category: "Office Supplies",
      cost_classification: "Variable Opex",
      monthly_spend: 185000,
      contracted_monthly_rate: 100000,
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
        { month: 'Jan', val: 100000 },
        { month: 'Feb', val: 120000 },
        { month: 'Mar', val: 140000 },
        { month: 'Apr', val: 160000 },
        { month: 'May', val: 175000 },
        { month: 'Jun', val: 185000 }
      ],
      ai_relationship_summary: "🚨 High Anomaly Alert: Monthly billing has surged +85% over contracted rates (₹1.85L vs ₹1.00L contract). Recommended immediate audit on unapproved purchase orders.",
      transactions: [
        { transaction_id: "TXN-V03", date: "2026-06-08", invoice_ref: "V-INV-0603", narration: "Sundry Supplies Billed Charge", amount: 185000, transaction_type: "Debit (Outflow)", payment_status: "Settled", payment_method: "UPI Auto Payment", is_overbilling: true }
      ]
    },
    {
      vendor_id: "VEN-004",
      vendor_name: "Blue Dart Express",
      category: "Courier Services",
      cost_classification: "Variable Opex",
      monthly_spend: 155000,
      contracted_monthly_rate: 150000,
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
        { month: 'Jan', val: 150000 },
        { month: 'Feb', val: 152000 },
        { month: 'Mar', val: 148000 },
        { month: 'Apr', val: 151000 },
        { month: 'May', val: 153000 },
        { month: 'Jun', val: 155000 }
      ],
      ai_relationship_summary: "Blue Dart Express exhibits stable logistics volume with minimal +3.3% variance against contracted rate limits.",
      transactions: []
    },
    {
      vendor_id: "VEN-OTHERS",
      vendor_name: "Others (Unclassified Debits)",
      category: "General Overhead / Unmapped",
      cost_classification: "Unclassified Debits",
      monthly_spend: 210000,
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
        { month: 'Jan', val: 190000 },
        { month: 'Feb', val: 200000 },
        { month: 'Mar', val: 205000 },
        { month: 'Apr', val: 198000 },
        { month: 'May', val: 215000 },
        { month: 'Jun', val: 210000 }
      ],
      ai_relationship_summary: "⚠️ Attention Required: 19.5% of total monthly vendor spend is unclassified. Auto-classification rules recommended to map recurring bank narrations.",
      transactions: [
        { transaction_id: "TXN-OTH-06", date: "2026-06-20", invoice_ref: "REF-UNMAPPED-06", narration: "IMPS/OUT/MISC DEBIT/BANK CHARGES/REF1009", amount: 45000, transaction_type: "Debit (Outflow)", payment_status: "Settled", payment_method: "IMPS Direct Transfer", is_unmapped_vendor: true },
        { transaction_id: "TXN-OTH-05", date: "2026-05-18", invoice_ref: "REF-UNMAPPED-05", narration: "UPI/OUT/MISC SUNDRY SUPPLIES/REF9921", amount: 65000, transaction_type: "Debit (Outflow)", payment_status: "Settled", payment_method: "UPI Auto Payment", is_unmapped_vendor: true },
        { transaction_id: "TXN-OTH-04", date: "2026-04-14", invoice_ref: "REF-UNMAPPED-04", narration: "NEFT/OUT/UNREGISTERED COUNTERPARTY DEBIT", amount: 50000, transaction_type: "Debit (Outflow)", payment_status: "Settled", payment_method: "NEFT Bank Transfer", is_unmapped_vendor: true },
        { transaction_id: "TXN-OTH-03", date: "2026-03-10", invoice_ref: "REF-UNMAPPED-03", narration: "RTGS/OUT/PETTY CASH REIMBURSEMENT", amount: 50000, transaction_type: "Debit (Outflow)", payment_status: "Settled", payment_method: "RTGS Direct Transfer", is_unmapped_vendor: true }
      ]
    }
  ];

  // Radial geometry positioning
  const centerPos = { x: 380, y: 260 };
  const orbitRadius = 185;

  const positions = vendorList.map((vendor, index) => {
    const angle = (index / vendorList.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerPos.x + orbitRadius * Math.cos(angle);
    const y = centerPos.y + orbitRadius * Math.sin(angle);
    return { ...vendor, x, y, angle };
  });

  const handleBubbleClick = (vendor: VendorBubbleNode) => {
    setSelectedVendor(vendor);
    setModalOpen(true);
  };

  const filteredTransactions = (selectedVendor?.transactions || []).filter((tx) =>
    searchTerm
      ? tx.invoice_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  return (
    <div className="space-y-4">
      {/* GRAPH CONTAINER CARD */}
      <Card className="p-6 border-border/80 bg-gradient-to-b from-surface to-surface-alt/40 shadow-sm relative overflow-hidden">
        {/* TOP BAR OVERLAY */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 z-10 relative">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand border border-brand/20">
                <Building2 size={16} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                Vendor Spend Network
              </h3>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Radial node diagram: Center = <strong>{centerCompany.company_name}</strong>. Node diameter scales by monthly spend. Dedicated <strong>Others</strong> node tracks unclassified debits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* ACCESSIBLE VIEW SWITCHER */}
            <div className="flex items-center gap-1 p-1 bg-surface-alt rounded-lg border border-border/60" role="group" aria-label="Vendor View Options">
              <button
                type="button"
                onClick={() => setViewMode("graph")}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  viewMode === "graph"
                    ? "bg-surface text-foreground shadow-xs"
                    : "text-text-secondary hover:text-foreground"
                }`}
                aria-pressed={viewMode === "graph"}
              >
                <Network size={13} /> Radial Graph
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  viewMode === "table"
                    ? "bg-surface text-foreground shadow-xs"
                    : "text-text-secondary hover:text-foreground"
                }`}
                aria-pressed={viewMode === "table"}
              >
                <Table size={13} /> Table View
              </button>
            </div>
          </div>
        </div>

        {/* CONDITIONAL RENDERING: GRAPH OR TABLE */}
        {viewMode === "graph" ? (
          <div className="relative w-full overflow-x-auto flex justify-center py-4">
            <svg
              viewBox="0 0 760 520"
              className="w-full max-w-3xl h-auto select-none aspect-76/52"
              role="img"
              aria-label={`Interactive radial vendor network graph with ${vendorList.length} vendor nodes revolving around ${centerCompany.company_name}`}
            >
              <defs>
                <style>{`
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
                `}</style>
                <radialGradient id="vendorCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </radialGradient>
                <filter id="vendorGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Orbit Background Circle */}
              <circle
                cx={centerPos.x}
                cy={centerPos.y}
                r={orbitRadius}
                fill="none"
                stroke="currentColor"
                className="text-border/60"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />

              {/* Connecting Beams */}
              {positions.map((node) => (
                <g key={`beam-${node.vendor_id}`}>
                  <line
                    x1={centerPos.x}
                    y1={centerPos.y}
                    x2={node.x}
                    y2={node.y}
                    stroke={node.color}
                    strokeWidth={Math.max(1.5, node.spend_share_pct / 5)}
                    strokeOpacity="0.45"
                    strokeDasharray={node.is_others ? "3 3" : "6 3"}
                    className="animate-vendor-beam"
                  />
                </g>
              ))}

              {/* CENTER HUB: MY COMPANY */}
              <g
                transform={`translate(${centerPos.x}, ${centerPos.y})`}
                className="cursor-default group"
                tabIndex={0}
                role="region"
                aria-label={`Central corporate entity: ${centerCompany.company_name}, total monthly vendor spend ${formatINR(centerCompany.total_monthly_vendor_spend)}, with ${centerCompany.monitored_vendors_count} monitored debits`}
              >
                <circle r="85" fill="url(#vendorCenterGlow)" className="opacity-75 group-hover:opacity-100 transition-opacity" />
                <circle
                  r="65"
                  fill="#8b5cf6"
                  className="shadow-lg transition-transform duration-300 group-hover:scale-105"
                  filter="url(#vendorGlow)"
                />
                <circle r="60" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
                <text y="-18" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  MY COMPANY
                </text>
                <text y="-2" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                  {centerCompany.company_name}
                </text>
                <text y="16" textAnchor="middle" fill="#f3e8ff" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                  {formatINR(centerCompany.total_monthly_vendor_spend)} / mo
                </text>
                <text y="30" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontFamily="sans-serif">
                  {centerCompany.monitored_vendors_count} Monitored Debits
                </text>
              </g>

              {/* RADIAL VENDOR BUBBLE NODES */}
              {positions.map((node) => {
                const radius = node.bubble_diameter_px / 2;
                return (
                  <g
                    key={node.vendor_id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => handleBubbleClick(node)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleBubbleClick(node);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ledger for ${node.vendor_name}, monthly spend ${formatINR(node.monthly_spend)}, spend share ${node.spend_share_pct.toFixed(1)}%`}
                    className="cursor-pointer group transition-transform duration-300 hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  >
                    <circle
                      r={radius + 4}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                      className="group-hover:stroke-opacity-100 transition"
                    />
                    <circle
                      r={radius}
                      fill={node.color}
                      fillOpacity="0.88"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="drop-shadow-md group-hover:fill-opacity-100 transition"
                    />

                    <text
                      y={radius > 35 ? "-6" : "0"}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={radius > 45 ? "11" : "9"}
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      className="pointer-events-none drop-shadow-sm"
                    >
                      {node.is_others
                        ? "OTHERS"
                        : node.vendor_name.length > 14
                        ? node.vendor_name.split(" ")[0]
                        : node.vendor_name}
                    </text>

                    {radius > 30 && (
                      <text
                        y="10"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="monospace"
                        className="pointer-events-none opacity-90"
                      >
                        {formatINR(node.monthly_spend)}
                      </text>
                    )}
                    {radius > 40 && (
                      <text
                        y="22"
                        textAnchor="middle"
                        fill="#e2e8f0"
                        fontSize="8"
                        fontFamily="sans-serif"
                        className="pointer-events-none opacity-80"
                      >
                        ({node.spend_share_pct.toFixed(1)}%)
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          /* ACCESSIBLE TABULAR VIEW */
          <div className="py-2">
            <div className="overflow-x-auto rounded-xl border border-border/70 bg-surface">
              <table className="w-full text-xs text-left" role="table">
                <thead className="bg-surface-alt text-[11px] font-semibold text-text-secondary uppercase border-b border-border/60">
                  <tr>
                    <th scope="col" className="px-4 py-3">Vendor / Debit Name</th>
                    <th scope="col" className="px-4 py-3">Category</th>
                    <th scope="col" className="px-4 py-3">Classification</th>
                    <th scope="col" className="px-4 py-3 text-right">Monthly Spend</th>
                    <th scope="col" className="px-4 py-3 text-right">Contracted Rate</th>
                    <th scope="col" className="px-4 py-3 text-right">Spend Share</th>
                    <th scope="col" className="px-4 py-3">Audit Status</th>
                    <th scope="col" className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {vendorList.map((vendor) => (
                    <tr key={vendor.vendor_id} className="hover:bg-surface-alt/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: vendor.color }}
                          />
                          <span>{vendor.vendor_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{vendor.category}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="bg-surface text-text-secondary text-[10px]">
                          {vendor.cost_classification}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-num tabular-nums font-bold text-foreground text-right">
                        {formatINR(vendor.monthly_spend)}
                      </td>
                      <td className="px-4 py-3 font-num tabular-nums text-text-secondary text-right">
                        {vendor.contracted_monthly_rate > 0 ? formatINR(vendor.contracted_monthly_rate) : "—"}
                      </td>
                      <td className="px-4 py-3 font-num tabular-nums font-semibold text-foreground text-right">
                        {vendor.spend_share_pct.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3">
                        {vendor.status.includes("Overbilling") ? (
                          <Badge variant="outline" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[10px] font-bold">
                            🚨 Overbill (+85%)
                          </Badge>
                        ) : vendor.is_others ? (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] font-bold">
                            ⚠️ Unclassified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                            {vendor.status}
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleBubbleClick(vendor)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-brand/10 text-brand hover:bg-brand/20 transition-colors focus:ring-2 focus:ring-brand focus:outline-hidden"
                          aria-label={`Inspect transactions for ${vendor.vendor_name}`}
                        >
                          <FileText size={12} /> Inspect Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BOTTOM LEGEND & TIP BAR */}
        <div className="flex flex-wrap items-center justify-between text-xs text-text-secondary border-t border-border/60 pt-3 mt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#8b5cf6]" /> Fixed Opex
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#0ea5e9]" /> Variable Opex
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#f43f5e]" /> Overbilling Risk
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#94a3b8]" /> Others (Unclassified Debits)
            </span>
          </div>
          <span className="text-[11px] text-text-tertiary">
            💡 <strong>Keyboard Support:</strong> Tab through nodes and press <kbd className="px-1 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">Enter</kbd> to inspect transaction details.
          </span>
        </div>
      </Card>

      {/* ── TRANSACTION LEDGER MODAL DIALOG ───────────────────────────────── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-6 border-border">
          <DialogHeader className="border-b border-border/60 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm shadow-sm"
                  style={{ backgroundColor: selectedVendor?.color || "#8b5cf6" }}
                >
                  {selectedVendor?.is_others ? "OTH" : selectedVendor?.vendor_name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <DialogTitle className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                    {selectedVendor?.vendor_name}
                    <Badge variant="outline" className="text-xs bg-surface-alt">
                      {selectedVendor?.category}
                    </Badge>
                  </DialogTitle>
                  <p className="text-xs text-text-secondary">
                    Vendor ID: <span className="font-mono font-semibold">{selectedVendor?.vendor_id}</span> | Classification:{" "}
                    <span className="font-semibold text-foreground">{selectedVendor?.cost_classification}</span>
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* WIREFRAME CONTAINER (SCROLLABLE SIDE PANEL CONTENT BODY) */}
          <div className="space-y-4 my-3 overflow-y-auto max-h-[72vh] pr-1">
            {/* ROW 1: 2 KPI CARDS (#, $) */}
            <div className="grid grid-cols-2 gap-3">
              {/* CARD 1: # (TXN COUNT) */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1 text-center">
                <span className="text-[10px] uppercase font-bold text-text-tertiary block tracking-wider">
                  # (Txn Count)
                </span>
                <div className="font-num text-xl font-extrabold text-foreground">
                  {selectedVendor?.transaction_count || selectedVendor?.transactions.length || 0}
                </div>
                <span className="text-[9px] text-text-secondary block">Settled Debit Transactions</span>
              </div>

              {/* CARD 2: $ (MONTHLY SPEND) */}
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 space-y-1 text-center">
                <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300 block tracking-wider">
                  $ (Monthly Spend)
                </span>
                <div className="font-num text-xl font-black text-rose-600 dark:text-rose-400">
                  {formatINR(selectedVendor?.monthly_spend || 0)}
                </div>
                <span className="text-[9px] text-rose-600 dark:text-rose-400 block font-semibold">
                  {selectedVendor?.spend_share_pct.toFixed(1)}% OPEX Share
                </span>
              </div>
            </div>

            {/* ROW 2: TREND (MINI MONTHLY SPEND CHART) */}
            <div className="rounded-xl border border-border/80 bg-surface p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Monthly Outflow Spend Trend</span>
                <span className="text-[10px] text-text-tertiary font-mono">6-Month Trajectory</span>
              </div>
              <div className="h-28 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedVendor?.monthly_trend || [
                    { month: 'Jan', val: selectedVendor?.monthly_spend || 200000 },
                    { month: 'Feb', val: selectedVendor?.monthly_spend || 200000 },
                    { month: 'Mar', val: selectedVendor?.monthly_spend || 200000 },
                    { month: 'Apr', val: selectedVendor?.monthly_spend || 200000 },
                    { month: 'May', val: selectedVendor?.monthly_spend || 200000 },
                    { month: 'Jun', val: selectedVendor?.monthly_spend || 200000 }
                  ]}>
                    <defs>
                      <linearGradient id="vendorTrendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip formatter={(v: any) => [formatINR(Number(v)), "Outflow Spend"]} />
                    <Area type="monotone" dataKey="val" stroke="#f43f5e" strokeWidth={2} fill="url(#vendorTrendGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ROW 3: 3 INFO CARDS (START DATE, ACTIVE STATUS, CONTRACT#) */}
            <div className="grid grid-cols-3 gap-3">
              {/* START DATE */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Start Date</span>
                <span className="font-mono text-xs font-bold text-foreground block">
                  {selectedVendor?.start_date || "2023-01-10"}
                </span>
              </div>

              {/* ACTIVE STATUS */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Status</span>
                <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                  selectedVendor?.status.includes("Overbilling")
                    ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                }`}>
                  {selectedVendor?.status || "Active SLA"}
                </span>
              </div>

              {/* CONTRACT# */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Contract#</span>
                <span className="font-mono text-xs font-bold text-foreground block truncate" title={selectedVendor?.contract_number}>
                  {selectedVendor?.contract_number || "VCTR-2023-1109"}
                </span>
              </div>
            </div>

            {/* ROW 4: 2 INFO CARDS (CONTRACTED RATE, VENDOR SUMMARY) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* CONTRACTED RATE */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Contracted Rate</span>
                <div className="font-num text-base font-extrabold text-foreground">
                  {selectedVendor?.contracted_monthly_rate ? formatINR(selectedVendor.contracted_monthly_rate) : "N/A (Unmapped)"}
                </div>
                <span className="text-[9px] text-text-tertiary block">Monthly Baseline Rate</span>
              </div>

              {/* VENDOR SUMMARY */}
              <div className="sm:col-span-2 rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Vendor Scope & Summary</span>
                <p className="text-xs text-text-secondary leading-normal font-medium">
                  {selectedVendor?.vendor_summary || "Enterprise Cloud Infrastructure, EC2, S3, & Database Hosting SLA Contract."}
                </p>
              </div>
            </div>

            {/* ROW 5: RELATIONSHIP & RISK ANALYSIS BY AI */}
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500 text-white shadow-xs">
                    <Brain size={14} />
                  </div>
                  <h4 className="font-display text-xs font-bold text-foreground">
                    Vendor Risk & Relationship Analysis by AI
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  AI Vendor Intelligence
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed rounded-xl bg-surface/80 p-3 border border-border/50">
                🤖 {selectedVendor?.ai_relationship_summary || `${selectedVendor?.vendor_name} is a key vendor counterparty accounting for ${selectedVendor?.spend_share_pct.toFixed(1)}% of total monthly OPEX.`}
              </p>
            </div>

          {/* SEARCH & TRANSACTION TABLE */}
          <div className="space-y-3 flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-2.5 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search invoice ref, narration, payment method..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface border border-border/80 rounded-lg outline-none focus:border-brand"
                />
              </div>
              <span className="text-xs text-text-secondary font-mono">
                {filteredTransactions.length} Debits Found
              </span>
            </div>

            <div className="overflow-y-auto border border-border rounded-xl flex-1">
              <table className="w-full text-xs text-left">
                <thead className="bg-surface-alt text-[11px] font-semibold text-text-secondary uppercase sticky top-0 border-b border-border z-10">
                  <tr>
                    <th className="px-3 py-2.5">Txn ID</th>
                    <th className="px-3 py-2.5">Date</th>
                    <th className="px-3 py-2.5">Reference / Ref #</th>
                    <th className="px-3 py-2.5">Narration</th>
                    <th className="px-3 py-2.5">Debit Amount</th>
                    <th className="px-3 py-2.5">Payment Method</th>
                    <th className="px-3 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredTransactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-surface-alt/50 transition">
                      <td className="px-3 py-2.5 font-mono font-medium text-foreground">{tx.transaction_id}</td>
                      <td className="px-3 py-2.5 text-text-secondary whitespace-nowrap">{tx.date}</td>
                      <td className="px-3 py-2.5 font-mono text-text-secondary">{tx.invoice_ref}</td>
                      <td className="px-3 py-2.5 font-medium text-foreground max-w-xs truncate" title={tx.narration}>
                        {tx.narration}
                      </td>
                      <td className="px-3 py-2.5 font-mono font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap">
                        {formatINR(tx.amount)}
                      </td>
                      <td className="px-3 py-2.5 text-text-secondary">{tx.payment_method}</td>
                      <td className="px-3 py-2.5">
                        {tx.is_overbilling ? (
                          <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-[10px] font-bold">
                            🚨 Billed +85% Over Contract
                          </Badge>
                        ) : tx.is_unmapped_vendor ? (
                          <Badge variant="outline" className="bg-slate-500/10 text-slate-600 border-slate-500/20 text-[10px]">
                            Unmapped Debit
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold">
                            {tx.payment_status}
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-text-secondary">
                        No debit transactions match this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
      </Dialog>
    </div>
  );
}
