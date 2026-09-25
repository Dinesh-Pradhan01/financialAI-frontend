import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSpotlite } from "@/features/spotlights/hooks/useSpotlite";
import { SpotliteTier1Grid } from "@/features/spotlights/components/spotlite-tier1-grid";
import { SpotliteTier2Grid } from "@/features/spotlights/components/spotlite-tier2-grid";
import { SpotliteLLMIntelligence } from "@/features/spotlights/components/spotlite-llm-intelligence";
import { SpotliteVendorAnalytics } from "@/features/spotlights/components/spotlite-vendor-analytics";
import { SpotliteClientAnalytics } from "@/features/spotlights/components/spotlite-client-analytics";
import { AgentNarration } from "@/features/agents/components/agent-narration";
import {
  Zap,
  Sparkles,
  BarChart3,
  Brain,
  Building2,
  Users,
  DollarSign,
  ShieldAlert,
  TrendingUp,
  Layers,
  PiggyBank,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { formatINR } from "@/shared/lib/format";
import { Card } from "@/shared/components/ui/card";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

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

const TABS: Array<{
  id: TabKey;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  colorClass: string;
  borderClass: string;
}> = [
  {
    id: "tier1",
    label: "Front Page",
    icon: Zap,
    colorClass: "text-amber-700 dark:text-amber-300",
    borderClass: "border-amber-500/30",
  },
  {
    id: "tier2",
    label: "Tier 2 Ops",
    icon: BarChart3,
    colorClass: "text-sky-700 dark:text-sky-300",
    borderClass: "border-sky-500/30",
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: Building2,
    colorClass: "text-violet-700 dark:text-violet-300",
    borderClass: "border-violet-500/30",
  },
  {
    id: "clients",
    label: "Clients",
    icon: Users,
    colorClass: "text-emerald-700 dark:text-emerald-300",
    borderClass: "border-emerald-500/30",
  },
  {
    id: "llm",
    label: "AI Audit",
    icon: Brain,
    colorClass: "text-brand",
    borderClass: "border-brand/30",
  },
];

function Spotlights() {
  const [activeTab, setActiveTab] = useState<TabKey>("tier1");
  const { tier1, tier2, llm, loading, error, askCfo } = useSpotlite();
  const shouldReduceMotion = useReducedMotion();

  const kpiItemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

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
                SpotLights
              </h1>
            </div>
          </div>
        </div>

        {/* ACCESSIBLE TAB CONTROL BAR WITH FLUID SLIDING PILL */}
        <div
          role="tablist"
          aria-label="Spotlights intelligence sections"
          className="flex flex-wrap items-center gap-1 rounded-xl bg-surface-alt p-1 border border-border/60 self-start md:self-auto relative"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer z-10 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-1",
                  isActive
                    ? tab.colorClass
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {isActive && (
                  shouldReduceMotion ? (
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg bg-surface shadow-xs border -z-10",
                        tab.borderClass
                      )}
                    />
                  ) : (
                    <motion.div
                      layoutId="spotlight-active-tab-indicator"
                      className={cn(
                        "absolute inset-0 rounded-lg bg-surface shadow-xs border -z-10",
                        tab.borderClass
                      )}
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )
                )}
                <Icon size={14} className={isActive && tab.id === "tier1" ? "fill-current" : ""} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ── EXECUTIVE MACRO-KPI SUMMARY STRIP ───────────────────────────────── */}
      <motion.div
        variants={
          shouldReduceMotion
            ? undefined
            : {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07 },
                },
              }
        }
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* KPI 1: Total Recoverable Cash */}
        <motion.div
          variants={shouldReduceMotion ? undefined : kpiItemVariants}
          whileHover={shouldReduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 h-full border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface shadow-xs space-y-1.5 transition hover:shadow-md hover:border-emerald-500/50">
            <div className="flex items-center justify-between text-xs text-emerald-800/90 dark:text-emerald-300/90 font-medium">
              <span>Recoverable Cash Outliers</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <DollarSign size={16} />
              </div>
            </div>
            <div className="font-num tabular-nums text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              +{formatINR(tier1.vendor_overbilling_detector.annualized_recoverable_cash)}
            </div>
            <div className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 font-medium">
              {tier1.vendor_overbilling_detector.vendor_name} rate overbilling
            </div>
          </Card>
        </motion.div>

        {/* KPI 2: Break-Even Rupee Cushion */}
        <motion.div
          variants={shouldReduceMotion ? undefined : kpiItemVariants}
          whileHover={shouldReduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 h-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-surface to-surface dark:from-cyan-950/25 dark:via-surface dark:to-surface shadow-xs space-y-1.5 transition hover:shadow-md hover:border-cyan-500/50">
            <div className="flex items-center justify-between text-xs text-cyan-800/90 dark:text-cyan-300/90 font-medium">
              <span>Break-Even Cushion</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="font-num tabular-nums text-2xl font-bold text-cyan-700 dark:text-cyan-300">
              +{formatINR(tier1.room_above_break_even.monthly_rupee_cushion)} / mo
            </div>
            <div className="text-[11px] text-cyan-800/80 dark:text-cyan-200/80 font-medium">
              {Number(tier1.room_above_break_even.operating_margin_pct).toFixed(1)}% operating margin above break-even
            </div>
          </Card>
        </motion.div>

        {/* KPI 3: Liquid Surplus Cash */}
        <motion.div
          variants={shouldReduceMotion ? undefined : kpiItemVariants}
          whileHover={shouldReduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 h-full border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-surface to-surface dark:from-teal-950/25 dark:via-surface dark:to-surface shadow-xs space-y-1.5 transition hover:shadow-md hover:border-teal-500/50">
            <div className="flex items-center justify-between text-xs text-teal-800/90 dark:text-teal-300/90 font-medium">
              <span>Deployable Liquid Surplus</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                <PiggyBank size={16} />
              </div>
            </div>
            <div className="font-num tabular-nums text-2xl font-bold text-teal-700 dark:text-teal-300">
              +{formatINR(tier1.idle_cash_forfeited_income.idle_cash_surplus, { compact: true })}
            </div>
            <div className="text-[11px] text-teal-800/80 dark:text-teal-200/80 font-medium">
              Surplus cash above {formatINR(tier1.idle_cash_forfeited_income.three_month_safety_reserve, { compact: true })} safety buffer
            </div>
          </Card>
        </motion.div>

        {/* KPI 4: Active Critical Risk Signals */}
        <motion.div
          variants={shouldReduceMotion ? undefined : kpiItemVariants}
          whileHover={shouldReduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }}
        >
          <Card className="p-4 h-full border-2 border-rose-500/40 bg-gradient-to-br from-rose-500/15 via-surface to-surface dark:from-rose-950/30 dark:via-surface dark:to-surface shadow-xs space-y-1.5 transition hover:shadow-md hover:border-rose-500/60">
            <div className="flex items-center justify-between text-xs text-rose-800/90 dark:text-rose-200/90 font-bold">
              <span>Security &amp; Fraud Exposures</span>
              <motion.div
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
                transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40"
              >
                <ShieldAlert size={16} />
              </motion.div>
            </div>
            <div className="font-num tabular-nums text-2xl font-black text-rose-600 dark:text-rose-400">
              {llm.capability6_payment_redirection_drift_detector.length} Active Alert
            </div>
            <div className="text-[11px] text-rose-800/90 dark:text-rose-200/90 font-medium">
              BEC Bank IFSC Drift detected on pending transfers
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* AI AGENT NARRATION BANNER */}
      <AgentNarration agent="reasoning">
        {activeTab === "tier1" &&
          "Live rules engine. 4 deterministic spotlights computed from 1,420 ledger transactions."}
        {activeTab === "tier2" &&
          "Supporting context metrics. Answer follow-up questions without changing the headline story."}
        {activeTab === "vendors" &&
          "Vendor spend segmentation, concentration risk, and overbilling exposure mapped to 5 active vendors."}
        {activeTab === "clients" &&
          "7-client revenue matrix, counterparty concentration risk, and DSO payment drift intelligence."}
        {activeTab === "llm" &&
          "AI synthesis layer over verified numbers. Capabilities 3, 5, 6, and 9."}
      </AgentNarration>

      {/* OFFLINE / LIVE BADGE */}
      {error && (
        <div className="rounded-xl bg-amber-500/10 p-3 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <AlertCircle size={14} className="shrink-0 text-amber-600 dark:text-amber-400" />
            {error}
          </span>
          <span className="font-bold">Authoritative Nimbus Baseline Loaded</span>
        </div>
      )}

      {/* ACTIVE TAB CONTENT */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="focus-visible:outline-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === "tier1" && (
              <SpotliteTier1Grid metrics={tier1} tier2Metrics={tier2} llmInsights={llm} />
            )}
            {activeTab === "tier2" && <SpotliteTier2Grid metrics={tier2} />}
            {activeTab === "vendors" && <SpotliteVendorAnalytics />}
            {activeTab === "clients" && <SpotliteClientAnalytics />}
            {activeTab === "llm" && (
              <SpotliteLLMIntelligence
                insights={llm}
                onAskCfo={askCfo}
                onSelectTab={() => setActiveTab("tier1")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
