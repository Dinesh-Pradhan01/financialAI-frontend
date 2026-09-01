import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Sparkles,
  Building2,
  BarChart3,
  Network,
  AlertTriangle,
  Users,
  Activity,
  Layers,
} from "lucide-react";
import { MODULES, HERO_DATA, type Currency, type ModuleItem } from "../data/landing-data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface LandingModulesProps {
  currency: Currency;
  onOpenModuleSpecs?: (moduleId: string) => void;
  onOpenSandbox?: () => void;
}

export function LandingModules({
  currency,
  onOpenModuleSpecs,
  onOpenSandbox,
}: LandingModulesProps) {
  const [activeTab, setActiveTab] = useState<string>("c360");
  const activeModule = MODULES.find((m) => m.id === activeTab) || MODULES[0];
  const copilotData = HERO_DATA[currency];

  return (
    <section id="modules" className="bg-[#f8fafc] py-10 sm:py-12 lg:py-14 border-b border-border">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6"
        >
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance">
              Five modules. One shared financial data ledger.
            </h2>
            <p className="mt-2.5 max-w-[64ch] text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
              Each module answers a distinct executive question while drawing from the exact same
              reconciled multi-bank transactions and HR rosters.
            </p>
          </div>
          <div className="mt-1 md:mt-0 shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-c bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs">
              <Sparkles size={14} className="text-primary" /> Powered by SpotLite Core AI
            </span>
          </div>
        </motion.div>

        {/* Tabbed Explorer Container */}
        <div className="mt-6 sm:mt-8 rounded-3xl border border-border-c bg-white p-4 sm:p-6 lg:p-7 shadow-sm">
          {/* Module Selector Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 border-b border-border-c no-scrollbar">
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              const isActive = mod.id === activeTab;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveTab(mod.id)}
                  className="relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold tracking-[-0.005em] transition-colors whitespace-nowrap cursor-pointer select-none shrink-0"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeModuleTabPill"
                      className="absolute inset-0 rounded-xl bg-primary shadow-xs"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <Icon
                    size={15}
                    className={cn(
                      "relative z-10 transition-colors",
                      isActive ? "text-white" : "text-primary",
                    )}
                  />
                  <span
                    className={cn(
                      "relative z-10 transition-colors",
                      isActive ? "text-white font-bold" : "text-slate-600 hover:text-foreground",
                    )}
                  >
                    {mod.title}
                  </span>
                  <span
                    className={cn(
                      "relative z-10 text-[10px] uppercase font-bold tracking-wider rounded px-1.5 py-0.5 font-mono transition-colors",
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {mod.tag}
                  </span>
                </button>
              );
            })}

            {/* 6th Tab: AI Copilot */}
            <button
              type="button"
              onClick={() => setActiveTab("copilot")}
              className="relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold tracking-[-0.005em] transition-colors whitespace-nowrap cursor-pointer select-none shrink-0"
            >
              {activeTab === "copilot" && (
                <motion.div
                  layoutId="activeModuleTabPill"
                  className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-900 to-primary shadow-xs"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <Bot
                size={15}
                className={cn(
                  "relative z-10 transition-colors",
                  activeTab === "copilot" ? "text-white" : "text-primary",
                )}
              />
              <span
                className={cn(
                  "relative z-10 transition-colors",
                  activeTab === "copilot" ? "text-white font-bold" : "text-primary",
                )}
              >
                AI Financial Copilot
              </span>
              <span
                className={cn(
                  "relative z-10 text-[10px] uppercase font-mono rounded px-1.5 py-0.5 font-bold transition-colors",
                  activeTab === "copilot"
                    ? "bg-emerald-400/30 text-emerald-200"
                    : "bg-emerald-500/20 text-emerald-800",
                )}
              >
                Agentic
              </span>
            </button>
          </div>

          {/* Tab Content Display Area */}
          <div className="mt-5 sm:mt-6">
            <AnimatePresence mode="wait">
              {activeTab === "copilot" ? (
                <motion.div
                  key="copilot-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center rounded-2xl bg-linear-to-br from-blue-950 via-primary to-blue-900 p-5 sm:p-7 lg:p-8 text-white"
                >
                  <div className="lg:col-span-7 space-y-3.5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200 border border-white/15">
                      <Bot size={14} /> Natural-Language Financial Reasoning
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight leading-tight text-balance">
                      Ask your financial ledger anything in plain English
                    </h3>
                    <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-[56ch]">
                      SpotLite AI is trained strictly on your uploaded bank statements, GST ledgers,
                      and verified payroll rosters. Answers include exact audit traces back to
                      source documents.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={onOpenSandbox}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4.5 py-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] text-primary shadow-md hover:bg-slate-100 transition-all cursor-pointer group"
                      >
                        <span>Try Sample Prompts in Sandbox</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </motion.button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-white/20 bg-black/30 p-4 sm:p-5 text-xs sm:text-sm text-blue-100 font-mono space-y-3 backdrop-blur-sm shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-blue-300">
                        <span className="font-bold">SpotLite Copilot v2.4</span>
                        <span className="text-emerald-400 font-semibold">● Reconciled</span>
                      </div>
                      <p className="text-emerald-300 leading-relaxed">{copilotData.copilotQuery}</p>
                      <div className="rounded-lg bg-white/5 p-3 font-sans text-xs sm:text-[13px] text-white/95 border border-white/10 leading-relaxed font-normal">
                        {copilotData.copilotAnswer}
                      </div>
                      <p className="text-[11px] text-blue-200/80 font-sans">
                        Audit Source: Bank Statements (HDFC #4910, SBI #0021) • Payroll Roster v3.4
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeModule.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="grid lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Column: Module Description & Capabilities */}
                  <div className="lg:col-span-7 space-y-5">
                    <div>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-primary font-mono uppercase tracking-wider">
                        {activeModule.tag}
                      </span>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-display tracking-tight text-foreground mt-3 leading-snug">
                        {activeModule.headline}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-[56ch]">
                        {activeModule.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Core Module Deliverables
                      </h4>
                      <ul className="space-y-2.5">
                        {activeModule.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed"
                          >
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => onOpenModuleSpecs?.(activeModule.id)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline cursor-pointer tracking-[-0.005em]"
                      >
                        <span>View complete {activeModule.title} technical specifications</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Live Operational Telemetry Simulation */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-border-c bg-surface-alt/40 p-5 sm:p-6 space-y-4 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-border-c pb-3">
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-primary" />
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Operational Output Simulation
                          </span>
                        </div>
                        {activeModule.sampleMetric.badge && (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200 font-mono">
                            {activeModule.sampleMetric.badge}
                          </span>
                        )}
                      </div>

                      <div className="rounded-xl border border-border-c bg-surface p-4">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                          {activeModule.sampleMetric.label}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-foreground mt-1 tracking-tight">
                          {activeModule.sampleMetric.value}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {activeModule.sampleMetric.subtext}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Reconciliation Frequency:</span>
                        <span className="font-bold text-primary font-mono">
                          Continuous (Automated)
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
