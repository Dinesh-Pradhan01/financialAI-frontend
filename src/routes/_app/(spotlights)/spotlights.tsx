import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSpotlite } from "@/features/spotlights/hooks/useSpotlite";
import { SpotliteTier1Grid } from "@/features/spotlights/components/spotlite-tier1-grid";
import { SpotliteTier2Grid } from "@/features/spotlights/components/spotlite-tier2-grid";
import { SpotliteLLMIntelligence } from "@/features/spotlights/components/spotlite-llm-intelligence";
import { SpotliteVendorAnalytics } from "@/features/spotlights/components/spotlite-vendor-analytics";
import { SpotliteClientAnalytics } from "@/features/spotlights/components/spotlite-client-analytics";
import { AgentNarration } from "@/features/agents/components/agent-narration";
import { Zap, Sparkles, BarChart3, Brain, Building2, Users } from "lucide-react";

export const Route = createFileRoute("/_app/(spotlights)/spotlights")({
  head: () => ({
    meta: [
      { title: "Spotlite Executive Intelligence · Spotlite" },
      {
        name: "description",
        content: "Spotlite deterministic metrics engine, Vendor/Client Analytics, and LLM-augmented AI executive intelligence.",
      },
    ],
  }),
  component: Spotlights,
});

type TabKey = "tier1" | "tier2" | "vendors" | "clients" | "llm";

function Spotlights() {
  const [activeTab, setActiveTab] = useState<TabKey>("tier1");
  const { tier1, tier2, llm, loading, error, askCfo } = useSpotlite();

  return (
    <div className="px-4 py-6 md:px-10 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
              <Zap size={20} className="fill-current" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                SpotLite <span className="text-brand">Executive Intelligence</span>
              </h1>
              <p className="text-xs text-text-secondary">
                Deterministic Rules Engine (Sections A–I) + Vendor & Client Analytics + LLM AI Layer
              </p>
            </div>
          </div>
        </div>

        {/* TAB CONTROL BAR */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-surface-alt p-1 border border-border/60 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("tier1")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              activeTab === "tier1" || activeTab === "tier2" || activeTab === "llm"
                ? "bg-surface text-brand shadow-xs"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Zap size={14} /> Tier 1 Front Page & LLM Intelligence
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("vendors")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              activeTab === "vendors"
                ? "bg-surface text-violet-600 dark:text-violet-400 shadow-xs"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Building2 size={14} /> Vendor Analytics
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              activeTab === "clients"
                ? "bg-surface text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Users size={14} /> Client Analytics
          </button>
        </div>
      </header>

      {/* AI AGENT NARRATION BANNER */}
      <AgentNarration agent="reasoning">
        {(activeTab === "tier1" || activeTab === "tier2" || activeTab === "llm") &&
          "Tier 1 Executive Front Page & LLM Intelligence: Operating Cushion, Payroll Rigidity, Vendor Overbilling, Surplus Idle Cash, Executive AI Brief, BEC Fraud Detector, and Anomaly Materiality Triage."}
        {activeTab === "vendors" &&
          "Vendor Analytics Section: Radial Vendor Network Graph, Others Unclassified Debits Module, Fixed vs. Variable Opex Breakdown, Vendor Concentration Index, and Overbilling Exposure."}
        {activeTab === "clients" &&
          "Client Analytics Section: Radial Client Network Graph, Counterparty Concentration Risk Radar, 12-Month Revenue Matrix, DSO Drift, and Account Churn Scanner."}
      </AgentNarration>

      {/* OFFLINE / LIVE BADGE */}
      {error && (
        <div className="rounded-xl bg-amber-500/10 p-3 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between">
          <span>ℹ️ {error}</span>
          <span className="font-bold">Authoritative Nimbus Baseline Loaded</span>
        </div>
      )}

      {/* ACTIVE TAB CONTENT */}
      {(activeTab === "tier1" || activeTab === "tier2" || activeTab === "llm") && (
        <SpotliteTier1Grid metrics={tier1} tier2Metrics={tier2} llmInsights={llm} />
      )}
      {activeTab === "vendors" && <SpotliteVendorAnalytics />}
      {activeTab === "clients" && <SpotliteClientAnalytics />}
    </div>
  );
}

