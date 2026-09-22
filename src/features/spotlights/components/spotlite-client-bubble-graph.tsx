import React, { useState, useEffect } from "react";
import { formatINR, formatPct } from "@/shared/lib/format";
import {
  Building2,
  Users,
  Sparkles,
  ArrowUpRight,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  CreditCard,
  DollarSign,
  Layers,
  Search,
  Brain,
  Calendar,
  Hash,
  Award,
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

export interface TransactionRecord {
  transaction_id: string;
  date: string;
  invoice_ref: string;
  narration: string;
  amount: number;
  transaction_type: string;
  payment_status: string;
  payment_method: string;
  dso_drift_days: number;
}

export interface ClientBubbleNode {
  client_id: string;
  client_name: string;
  category: string;
  annual_contract_value: number;
  monthly_revenue: number;
  revenue_share_pct: number;
  bubble_diameter_px: number;
  status: string;
  color: string;
  dso_median_days: number;
  start_date?: string;
  contract_number?: string;
  rfm_segment?: string;
  project_summary?: string;
  monthly_trend?: Array<{ month: string; val: number }>;
  ai_relationship_summary?: string;
  transaction_count: number;
  transactions: TransactionRecord[];
}

export interface CompanyHubNode {
  company_id: string;
  company_name: string;
  subtitle: string;
  total_portfolio_acv: number;
  active_clients_count: number;
  hub_diameter_px: number;
  color: string;
}

export function SpotliteClientBubbleGraph() {
  const [hub, setHub] = useState<CompanyHubNode | null>(null);
  const [bubbles, setBubbles] = useState<ClientBubbleNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedClient, setSelectedClient] = useState<ClientBubbleNode | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchBubbleData() {
      try {
        setLoading(true);
        let res = await fetch(`${API_BASE}/api/v1/analysis/clients/bubble`);
        if (!res.ok) {
          res = await fetch(`${API_BASE}/api/v1/spotlite/clients/bubble`);
        }
        const json = await res.json();
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
    subtitle: "My Corporate Entity",
    total_portfolio_acv: 30640000,
    active_clients_count: 7,
  };

  const clientList = bubbles.length > 0 ? bubbles : [
    {
      client_id: "CLI-001",
      client_name: "Technova Solutions",
      category: "Software / SaaS",
      annual_contract_value: 6240000,
      monthly_revenue: 520000,
      revenue_share_pct: 20.35,
      bubble_diameter_px: 125,
      status: "Active",
      color: "#3b82f6",
      dso_median_days: 8,
      transaction_count: 6,
      transactions: [
        { transaction_id: "TXN-0601", date: "2026-06-15", invoice_ref: "INV-2026-06-01", narration: "Monthly SLA Revenue Payment", amount: 520000, transaction_type: "Credit (Inflow)", payment_status: "Settled", payment_method: "NEFT Bank Transfer", dso_drift_days: 8 },
        { transaction_id: "TXN-0501", date: "2026-05-14", invoice_ref: "INV-2026-05-01", narration: "Monthly SLA Revenue Payment", amount: 520000, transaction_type: "Credit (Inflow)", payment_status: "Settled", payment_method: "NEFT Bank Transfer", dso_drift_days: 8 }
      ]
    },
    {
      client_id: "CLI-002",
      client_name: "GlobalRetail Logistics",
      category: "Logistics",
      annual_contract_value: 5700000,
      monthly_revenue: 475000,
      revenue_share_pct: 18.59,
      bubble_diameter_px: 110,
      status: "Active",
      color: "#10b981",
      dso_median_days: 12,
      transaction_count: 6,
      transactions: [
        { transaction_id: "TXN-0602", date: "2026-06-14", invoice_ref: "INV-2026-06-02", narration: "Freight Retainer Settlement", amount: 475000, transaction_type: "Credit (Inflow)", payment_status: "Settled", payment_method: "RTGS Transfer", dso_drift_days: 12 }
      ]
    },
    {
      client_id: "CLI-003",
      client_name: "Apex Financials",
      category: "Financial Services",
      annual_contract_value: 4600000,
      monthly_revenue: 383333,
      revenue_share_pct: 15.07,
      bubble_diameter_px: 95,
      status: "Contract Expired",
      color: "#f59e0b",
      dso_median_days: 10,
      transaction_count: 6,
      transactions: [
        { transaction_id: "TXN-0603", date: "2026-06-12", invoice_ref: "INV-2026-06-03", narration: "Advisory Services Fee", amount: 383333, transaction_type: "Credit (Inflow)", payment_status: "Settled", payment_method: "NEFT Transfer", dso_drift_days: 10 }
      ]
    },
    {
      client_id: "CLI-004",
      client_name: "Zenith Enterprises",
      category: "Consulting",
      annual_contract_value: 4200000,
      monthly_revenue: 350000,
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
      annual_contract_value: 3700000,
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
      annual_contract_value: 3200000,
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
      annual_contract_value: 3000000,
      monthly_revenue: 250000,
      revenue_share_pct: 9.79,
      bubble_diameter_px: 62,
      status: "Active",
      color: "#64748b",
      dso_median_days: 14,
      transaction_count: 6,
      transactions: []
    }
  ];

  // Radial geometry calculation for placing bubbles around My Company center
  const centerPos = { x: 380, y: 260 };
  const orbitRadius = 185;

  const positions = clientList.map((client, index) => {
    const angle = (index / clientList.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerPos.x + orbitRadius * Math.cos(angle);
    const y = centerPos.y + orbitRadius * Math.sin(angle);
    return { ...client, x, y, angle };
  });

  const handleBubbleClick = (client: ClientBubbleNode) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  const filteredTransactions = (selectedClient?.transactions || []).filter((tx) =>
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
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Layers size={16} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">
                Counterparty Client Revenue Bubble Ecosystem
              </h3>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Radial node diagram: Center = <strong>{centerCompany.company_name}</strong>. Node diameter scales by annual revenue (ACV). Click any bubble to view full transaction ledger.
            </p>
          </div>
          <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20 text-xs px-2.5 py-1 self-start sm:self-auto font-mono">
            <Sparkles size={12} className="mr-1.5" /> Interactive Radial Engine
          </Badge>
        </div>

        {/* CANVAS SVG RADIAL NETWORK GRAPH */}
        <div className="relative w-full overflow-x-auto flex justify-center py-4">
          <svg viewBox="0 0 760 520" className="w-full max-w-3xl h-auto min-w-[650px] select-none">
            <defs>
              {/* Radial Gradient Glow for Center Hub */}
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </radialGradient>
              {/* Pulse Animated Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
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

            {/* Connecting Beams from Central Hub to Client Bubbles */}
            {positions.map((node) => (
              <g key={`beam-${node.client_id}`}>
                <line
                  x1={centerPos.x}
                  y1={centerPos.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={node.color}
                  strokeWidth={Math.max(1.5, node.revenue_share_pct / 5)}
                  strokeOpacity="0.45"
                  strokeDasharray="6 3"
                />
              </g>
            ))}

            {/* CENTER HUB: MY COMPANY */}
            <g transform={`translate(${centerPos.x}, ${centerPos.y})`} className="cursor-pointer group">
              {/* Outer Glow Halo */}
              <circle r="85" fill="url(#centerGlow)" className="animate-pulse" />
              {/* Center Circle */}
              <circle
                r="65"
                fill="#6366f1"
                className="shadow-lg transition-transform duration-300 group-hover:scale-105"
                filter="url(#glow)"
              />
              <circle r="60" fill="none" stroke="#818cf8" strokeWidth="2.5" />
              {/* Center Label Content */}
              <text y="-18" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                MY COMPANY
              </text>
              <text y="-2" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                {centerCompany.company_name}
              </text>
              <text y="16" textAnchor="middle" fill="#e0e7ff" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                {formatINR(centerCompany.total_portfolio_acv)}
              </text>
              <text y="30" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontFamily="sans-serif">
                {centerCompany.active_clients_count} Active Clients
              </text>
            </g>

            {/* RADIAL CLIENT BUBBLE NODES */}
            {positions.map((node) => {
              const radius = node.bubble_diameter_px / 2;
              return (
                <g
                  key={node.client_id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => handleBubbleClick(node)}
                  className="cursor-pointer group transition-transform duration-300 hover:scale-110"
                >
                  {/* Subtle outer stroke ring */}
                  <circle
                    r={radius + 4}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    className="group-hover:stroke-opacity-100 transition"
                  />
                  {/* Main Bubble Body */}
                  <circle
                    r={radius}
                    fill={node.color}
                    fillOpacity="0.88"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="drop-shadow-md group-hover:fill-opacity-100 transition"
                  />

                  {/* Client Name Label */}
                  <text
                    y={radius > 35 ? "-6" : "0"}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={radius > 45 ? "11" : "9"}
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    className="pointer-events-none drop-shadow-sm"
                  >
                    {node.client_name.length > 14
                      ? node.client_name.split(" ")[0]
                      : node.client_name}
                  </text>

                  {/* Revenue Share & Value Sub-label */}
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
                      {formatINR(node.annual_contract_value)}
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
                      ({node.revenue_share_pct.toFixed(1)}%)
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* BOTTOM INSTRUCTION BAR */}
        <div className="flex flex-wrap items-center justify-between text-xs text-text-secondary border-t border-border/60 pt-3 mt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#3b82f6]" /> Top Revenue (&gt;20%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#10b981]" /> Core Client (15-20%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#f59e0b]" /> Contract Alert
            </span>
          </div>
          <span className="text-[11px] text-text-tertiary">
            💡 <strong>Pro Tip:</strong> Click any client bubble to view itemized transaction ledger records.
          </span>
        </div>
      </Card>

      {/* ── TRANSACTION LEDGER MODAL DIALOG ───────────────────────────────── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-6 border-border">
          <DialogHeader className="border-b border-border/60 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm shadow-sm"
                  style={{ backgroundColor: selectedClient?.color || "#3b82f6" }}
                >
                  {selectedClient?.client_name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <DialogTitle className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                    {selectedClient?.client_name}
                    <Badge variant="outline" className="text-xs bg-surface-alt">
                      {selectedClient?.category}
                    </Badge>
                  </DialogTitle>
                  <p className="text-xs text-text-secondary">
                    Counterparty Client ID: <span className="font-mono font-semibold">{selectedClient?.client_id}</span> | Status:{" "}
                    <span className="font-semibold text-foreground">{selectedClient?.status}</span>
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
                  {selectedClient?.transaction_count || selectedClient?.transactions.length || 0}
                </div>
                <span className="text-[9px] text-text-secondary block">Settled Transactions</span>
              </div>

              {/* CARD 2: $ (BILLED AMOUNT / MONTHLY) */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-1 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 block tracking-wider">
                  $ (Monthly Billed)
                </span>
                <div className="font-num text-xl font-black text-emerald-600 dark:text-emerald-400">
                  {formatINR(selectedClient?.monthly_revenue || 0)}
                </div>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 block font-semibold">
                  {selectedClient?.revenue_share_pct.toFixed(1)}% Share
                </span>
              </div>
            </div>

            {/* ROW 2: TREND (MINI MONTHLY REVENUE CHART) */}
            <div className="rounded-xl border border-border/80 bg-surface p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Monthly Inflow Revenue Trend</span>
                <span className="text-[10px] text-text-tertiary font-mono">6-Month Trajectory</span>
              </div>
              <div className="h-28 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedClient?.monthly_trend || [
                    { month: 'Jan', val: selectedClient?.monthly_revenue || 500000 },
                    { month: 'Feb', val: selectedClient?.monthly_revenue || 500000 },
                    { month: 'Mar', val: selectedClient?.monthly_revenue || 500000 },
                    { month: 'Apr', val: selectedClient?.monthly_revenue || 500000 },
                    { month: 'May', val: selectedClient?.monthly_revenue || 500000 },
                    { month: 'Jun', val: selectedClient?.monthly_revenue || 500000 }
                  ]}>
                    <defs>
                      <linearGradient id="clientTrendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip formatter={(v: any) => [formatINR(Number(v)), "Inflow Revenue"]} />
                    <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} fill="url(#clientTrendGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ROW 3: 3 INFO CARDS (START DATE, ACTIVE, CONTRACT#) */}
            <div className="grid grid-cols-3 gap-3">
              {/* START DATE */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Start Date</span>
                <span className="font-mono text-xs font-bold text-foreground block">
                  {selectedClient?.start_date || "2024-01-15"}
                </span>
              </div>

              {/* ACTIVE STATUS */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Status</span>
                <span className="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {selectedClient?.status || "Active"}
                </span>
              </div>

              {/* CONTRACT# */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-0.5">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Contract#</span>
                <span className="font-mono text-xs font-bold text-foreground block truncate" title={selectedClient?.contract_number}>
                  {selectedClient?.contract_number || "CTR-2024-8891"}
                </span>
              </div>
            </div>

            {/* ROW 4: 2 INFO CARDS (CONTRACT$, PROJECT SUMMARY) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* CONTRACT$ (ANNUAL VALUE) */}
              <div className="rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Contract$ (ACV)</span>
                <div className="font-num text-base font-extrabold text-foreground">
                  {formatINR(selectedClient?.annual_contract_value || 0)}
                </div>
                <span className="text-[9px] text-text-tertiary block">Annual Contract Value</span>
              </div>

              {/* PROJECT SUMMARY */}
              <div className="sm:col-span-2 rounded-xl border border-border bg-surface-alt/60 p-3 space-y-1">
                <span className="text-[10px] font-bold text-text-tertiary uppercase block">Project Summary</span>
                <p className="text-xs text-text-secondary leading-normal font-medium">
                  {selectedClient?.project_summary || "Enterprise SaaS Infrastructure & Core Cloud Logistics Platform Integration."}
                </p>
              </div>
            </div>

            {/* ROW 5: RELATIONSHIP ANALYSIS BY AI */}
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500 text-white shadow-xs">
                    <Brain size={14} />
                  </div>
                  <h4 className="font-display text-xs font-bold text-foreground">
                    Relationship Analysis by AI
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  AI Relationship Health
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed rounded-xl bg-surface/80 p-3 border border-border/50">
                🤖 {selectedClient?.ai_relationship_summary || `${selectedClient?.client_name} is a key anchor client with clean payment history (${selectedClient?.dso_median_days} days median DSO) and high account retention probability.`}
              </p>
            </div>

          {/* SEARCH & TRANSACTION TABLE */}
          <div className="space-y-3 flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-2.5 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search invoice reference, narration, method..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface border border-border/80 rounded-lg outline-none focus:border-brand"
                />
              </div>
              <span className="text-xs text-text-secondary font-mono">
                {filteredTransactions.length} Transactions
              </span>
            </div>

            <div className="overflow-y-auto border border-border rounded-xl flex-1">
              <table className="w-full text-xs text-left">
                <thead className="bg-surface-alt text-[11px] font-semibold text-text-secondary uppercase sticky top-0 border-b border-border z-10">
                  <tr>
                    <th className="px-3 py-2.5">Txn ID</th>
                    <th className="px-3 py-2.5">Date</th>
                    <th className="px-3 py-2.5">Invoice Ref</th>
                    <th className="px-3 py-2.5">Narration</th>
                    <th className="px-3 py-2.5">Amount</th>
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
                      <td className="px-3 py-2.5 font-medium text-foreground">{tx.narration}</td>
                      <td className="px-3 py-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {formatINR(tx.amount)}
                      </td>
                      <td className="px-3 py-2.5 text-text-secondary">{tx.payment_method}</td>
                      <td className="px-3 py-2.5">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold">
                          {tx.payment_status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-text-secondary">
                        No transactions found for this search filter.
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
