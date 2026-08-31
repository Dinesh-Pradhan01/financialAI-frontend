import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HERO_DATA,
  ROLES,
  SANDBOX_ROLES_DATA,
  type Currency,
} from "../data/landing-data";
import { cn } from "@/shared/lib/utils";

interface LandingHeroProps {
  currency: Currency;
  onOpenSandbox?: (roleId?: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export function LandingHero({ currency, onOpenSandbox }: LandingHeroProps) {
  const [activeHeroRole, setActiveHeroRole] = useState<"ceo" | "cfo" | "hr" | "coo">("ceo");
  const data = HERO_DATA[currency];
  const roleItem = ROLES.find((r) => r.id === activeHeroRole) || ROLES[0];
  const sandboxData = SANDBOX_ROLES_DATA[activeHeroRole] || SANDBOX_ROLES_DATA.ceo;

  return (
    <section
      id="platform"
      className="relative overflow-hidden border-b border-border bg-linear-to-b from-[#f0f6fe] via-[#f8fbff] to-background py-8 sm:py-10 lg:py-12 xl:py-14"
    >
      {/* Subtle background mesh grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Hero Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center lg:col-span-6 space-y-4 sm:space-y-5"
          >
            <div>
              <motion.div
                variants={fadeUp}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3 py-1 text-xs font-semibold text-blue-950 shadow-xs backdrop-blur-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-bold">Financial & Workforce Intelligence</span>
                <span className="text-blue-300">|</span>
                <span className="text-blue-800/80 font-medium">For MSME Founders & CFOs</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-2xl sm:text-3xl lg:text-[2.375rem] xl:text-[2.75rem] font-bold tracking-[-0.03em] text-foreground leading-[1.15] text-balance"
              >
                One unified view of your company's{" "}
                <span className="text-primary font-bold">
                  financial health
                </span>{" "}
                and workforce risk.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-[56ch]"
              >
                SpotLite connects bank statements, verified HR rosters, and market indicators — turning
                raw transactions into real-time executive dashboards, peer benchmarks, and anomaly
                alerts your leadership can act on immediately.
              </motion.p>

              {/* Standardized Hero CTAs */}
              <motion.div
                variants={fadeUp}
                className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold tracking-[-0.005em] text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/35 active:scale-[0.98] w-full sm:w-auto group"
                  >
                    <span>Book Executive Demo</span>
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => onOpenSandbox?.(activeHeroRole)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-c bg-white px-5 py-3 text-sm font-semibold tracking-[-0.005em] text-foreground shadow-xs transition-all hover:bg-muted hover:border-slate-300 w-full sm:w-auto cursor-pointer group"
                >
                  <Sparkles size={15} className="text-primary group-hover:rotate-12 transition-transform duration-300" />
                  <span>Launch 60s Live Sandbox</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Hero Trust Points */}
            <motion.div
              variants={fadeUp}
              className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm font-medium text-slate-600 border-t border-blue-100/60"
            >
              <div className="flex items-center gap-1.5 pt-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>Role-scoped access (CEO, CFO, HR, COO)</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>Multi-bank OCR auto-reconciliation</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1.5">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                <span>SOC-2 & Bank-Grade Security</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right: Live Interactive Dashboard Simulation with in-situ Role Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xl shadow-blue-900/6 flex flex-col justify-between space-y-3 sm:space-y-3.5">
              {/* In-Situ Persona Selector Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-c pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Interactive Role:
                  </span>
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                    {ROLES.map((r) => {
                      const isSelected = r.id === activeHeroRole;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setActiveHeroRole(r.id as "ceo" | "cfo" | "hr" | "coo")}
                          className="relative px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer select-none"
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeHeroRolePill"
                              className="absolute inset-0 rounded-md bg-white shadow-2xs"
                              transition={{ type: "spring", stiffness: 420, damping: 32 }}
                            />
                          )}
                          <span
                            className={cn(
                              "relative z-10 transition-colors",
                              isSelected ? "text-primary font-bold" : "text-slate-600 hover:text-foreground",
                            )}
                          >
                            {r.role.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60 font-mono shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Data
                </span>
              </div>

              {/* Dynamic Role Header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroRole}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-primary font-bold shadow-xs">
                      <roleItem.icon size={18} />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]">
                        {roleItem.role} Workspace
                      </h2>
                      <p className="text-[11px] text-slate-500 font-normal">
                        {sandboxData.targetFocus}
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Headcount
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-foreground font-mono tabular-nums">
                      {data.headcount}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Role KPIs */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroRole}
                  initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-3 gap-2 sm:gap-2.5"
                >
                  {roleItem.previewKpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-xl bg-slate-50 p-2.5 sm:p-3 border border-slate-100 transition-colors"
                    >
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 truncate block">
                        {kpi.label}
                      </span>
                      <p className="text-sm sm:text-lg font-bold text-foreground font-mono tabular-nums mt-0.5 tracking-tight">
                        {currency === "INR" ? kpi.valueINR : kpi.valueUSD}
                      </p>
                      <span
                        className={cn(
                          "text-[10px] sm:text-[11px] font-semibold mt-0.5 block truncate",
                          kpi.status === "alert"
                            ? "text-amber-600"
                            : kpi.status === "good"
                              ? "text-emerald-600"
                              : "text-slate-500",
                        )}
                      >
                        {kpi.trend}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Dynamic Anomaly Radar Live Alert */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroRole}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 sm:p-3.5"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-amber-950 truncate">
                          {sandboxData.step2.anomalyTitle}
                        </span>
                        <span className="text-[10px] font-bold uppercase rounded bg-amber-200 px-2 py-0.5 text-amber-900 shrink-0 font-mono">
                          {sandboxData.step2.severity}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-amber-900 mt-0.5 leading-relaxed line-clamp-2">
                        {currency === "INR"
                          ? sandboxData.step2.descriptionINR
                          : sandboxData.step2.descriptionUSD}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Interactive Sandbox Launch Strip */}
              <div className="rounded-xl border border-primary/20 bg-blue-50/60 p-2.5 sm:p-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-primary shrink-0" />
                  <span className="text-xs font-semibold text-primary">
                    Test OCR & Copilot for {roleItem.role}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => onOpenSandbox?.(activeHeroRole)}
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer shrink-0"
                >
                  <span>Launch 60s Tour</span>
                  <ChevronRight size={13} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

