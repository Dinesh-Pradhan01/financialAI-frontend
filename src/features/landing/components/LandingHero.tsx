import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_DATA, ROLES, SANDBOX_ROLES_DATA, type Currency } from "../data/landing-data";
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

const ROLE_THEMES: Record<
  "ceo" | "cfo" | "hr" | "coo",
  {
    iconBox: string;
    pillBg: string;
    accent: string;
    badgeText: string;
  }
> = {
  ceo: {
    iconBox: "bg-primary/10 text-primary border-primary/20",
    pillBg: "bg-primary/10 border-primary/20 text-primary",
    accent: "text-primary",
    badgeText: "Enterprise Command",
  },
  cfo: {
    iconBox: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    pillBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    accent: "text-emerald-600 dark:text-emerald-400",
    badgeText: "Fiscal Oversight",
  },
  hr: {
    iconBox: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    pillBg: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400",
    accent: "text-purple-600 dark:text-purple-400",
    badgeText: "Workforce Analytics",
  },
  coo: {
    iconBox: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
    pillBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-700 dark:text-cyan-400",
    accent: "text-cyan-700 dark:text-cyan-400",
    badgeText: "Operations Velocity",
  },
};

export function LandingHero({ currency, onOpenSandbox }: LandingHeroProps) {
  const [activeHeroRole, setActiveHeroRole] = useState<"ceo" | "cfo" | "hr" | "coo">("ceo");
  const data = HERO_DATA[currency];
  const roleItem = ROLES.find((r) => r.id === activeHeroRole) || ROLES[0];
  const sandboxData = SANDBOX_ROLES_DATA[activeHeroRole] || SANDBOX_ROLES_DATA.ceo;
  const activeTheme = ROLE_THEMES[activeHeroRole];

  return (
    <section
      id="platform"
      className="relative overflow-hidden border-b border-border bg-linear-to-b from-blue-50/40 via-surface/60 to-background py-8 sm:py-10 lg:py-12 xl:py-14"
    >
      {/* Radiant ambient atmospheric color glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/12 -z-10 h-80 w-80 rounded-full bg-blue-500/6 blur-3xl pointer-events-none" />

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
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary shadow-2xs backdrop-blur-xs"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-bold">Financial & Workforce Intelligence</span>
                <span className="text-primary/30">|</span>
                <span className="text-text-secondary font-medium">For MSME Founders & CFOs</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] xl:text-[3rem] font-bold tracking-[-0.02em] text-foreground leading-[1.18] text-balance"
              >
                Your business leaves signals,{" "}
                <span className="text-primary">SpotLite connects them.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-sm sm:text-base leading-relaxed text-text-secondary max-w-[56ch]"
              >
                SpotLite brings together your company's financial, workforce, and market data turning scattered signals into clear insights, benchmarks, and alerts that help leadership understand what's happening and make better decisions, faster.
              </motion.p>

              {/* Standardized Hero CTAs */}
              <motion.div
                variants={fadeUp}
                className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold tracking-[-0.005em] text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/35 active:scale-[0.98] w-full sm:w-auto group border border-primary/40"
                  >
                    <span>Book Executive Demo</span>
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </motion.div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => onOpenSandbox?.(activeHeroRole)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-surface/90 px-5 py-3 text-sm font-semibold tracking-[-0.005em] text-foreground shadow-xs transition-all hover:bg-primary/5 hover:border-primary/35 hover:text-primary w-full sm:w-auto cursor-pointer group"
                >
                  <Sparkles
                    size={15}
                    className="text-primary group-hover:rotate-12 transition-transform duration-300"
                  />
                  <span>Launch 60s Live Sandbox</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Hero Trust Points */}
            <motion.div
              variants={fadeUp}
              className="pt-2 flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs sm:text-sm font-medium text-text-secondary border-t border-border/70"
            >
              <div className="flex items-center gap-2 pt-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 size={12} />
                </span>
                <span>Role-scoped access (CEO, CFO, HR, COO)</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 size={12} />
                </span>
                <span>Multi-bank OCR auto-reconciliation</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 size={12} />
                </span>
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
            <div className="rounded-2xl border border-border/80 bg-surface/95 backdrop-blur-xs p-4 sm:p-5 shadow-xl shadow-primary/[0.06] flex flex-col justify-between space-y-3 sm:space-y-3.5 ring-1 ring-primary/5">
              {/* In-Situ Persona Selector Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                    Interactive Role:
                  </span>
                  <div className="flex items-center gap-1 bg-surface-alt p-0.5 rounded-lg border border-border/40">
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
                              className="absolute inset-0 rounded-md bg-surface shadow-2xs border border-border/40"
                              transition={{ type: "spring", stiffness: 420, damping: 32 }}
                            />
                          )}
                          <span
                            className={cn(
                              "relative z-10 transition-colors",
                              isSelected
                                ? "text-primary font-bold"
                                : "text-text-secondary hover:text-foreground",
                            )}
                          >
                            {r.role.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-mono shrink-0">
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
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl font-bold shadow-xs border transition-colors",
                        activeTheme.iconBox,
                      )}
                    >
                      <roleItem.icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]">
                          {roleItem.role} Workspace
                        </h2>
                        <span
                          className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full border font-mono",
                            activeTheme.pillBg,
                          )}
                        >
                          {activeTheme.badgeText}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-secondary font-normal">
                        {sandboxData.targetFocus}
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider block">
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
                  {roleItem.previewKpis.map((kpi) => {
                    const isAlert = kpi.status === "alert";
                    const isGood = kpi.status === "good";

                    return (
                      <div
                        key={kpi.label}
                        className={cn(
                          "rounded-xl p-2.5 sm:p-3 border transition-colors",
                          isAlert && "bg-amber-500/5 border-amber-500/25 hover:bg-amber-500/10",
                          isGood && "bg-emerald-500/5 border-emerald-500/25 hover:bg-emerald-500/10",
                          !isAlert && !isGood && "bg-surface-alt/70 border-border/60 hover:bg-surface-alt",
                        )}
                      >
                        <span
                          className={cn(
                            "text-[10px] sm:text-[11px] font-semibold truncate block",
                            isAlert
                              ? "text-amber-800 dark:text-amber-400"
                              : isGood
                                ? "text-emerald-800 dark:text-emerald-400"
                                : "text-text-secondary",
                          )}
                        >
                          {kpi.label}
                        </span>
                        <p className="text-sm sm:text-lg font-bold text-foreground font-mono tabular-nums mt-0.5 tracking-tight">
                          {currency === "INR" ? kpi.valueINR : kpi.valueUSD}
                        </p>
                        <span
                          className={cn(
                            "text-[10px] sm:text-[11px] font-semibold mt-0.5 block truncate",
                            isAlert
                              ? "text-amber-700 dark:text-amber-400"
                              : isGood
                                ? "text-emerald-700 dark:text-emerald-400"
                                : "text-text-secondary",
                          )}
                        >
                          {kpi.trend}
                        </span>
                      </div>
                    );
                  })}
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
                  className="rounded-xl border border-amber-500/30 bg-amber-500/[0.08] dark:bg-amber-500/[0.12] p-3 sm:p-3.5 shadow-2xs"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                      <AlertTriangle size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 truncate">
                          {sandboxData.step2.anomalyTitle}
                        </span>
                        <span className="text-[10px] font-bold uppercase rounded-md bg-amber-500/20 px-2 py-0.5 text-amber-900 dark:text-amber-200 shrink-0 font-mono border border-amber-500/25">
                          {sandboxData.step2.severity}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-amber-900/90 dark:text-amber-300/90 mt-0.5 leading-relaxed line-clamp-2 font-medium">
                        {currency === "INR"
                          ? sandboxData.step2.descriptionINR
                          : sandboxData.step2.descriptionUSD}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Interactive Sandbox Launch Strip */}
              <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/[0.08] via-primary/[0.04] to-primary/[0.08] p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-xs font-semibold text-primary truncate">
                    Test OCR & Copilot for {roleItem.role}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => onOpenSandbox?.(activeHeroRole)}
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-xs shadow-primary/20 hover:bg-primary-hover transition-all cursor-pointer shrink-0"
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
