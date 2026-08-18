import { Link } from "@tanstack/react-router";
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export function LandingHero() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#f0f6fe] via-[#f8fbff] to-background py-8 sm:py-10 lg:py-14"
    >
      {/* Subtle background mesh grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl 2xl:max-w-[90rem] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Hero Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between lg:col-span-6"
          >
            <div>
              <motion.div
                variants={fadeUp}
                className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs backdrop-blur-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary" />
                <span>Workforce & Financial Intelligence</span>
                <span className="text-blue-300">|</span>
                <span className="text-muted-foreground font-medium">For High-Growth CFOs & CEOs</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.625rem] font-extrabold tracking-tight text-foreground leading-[1.18]"
              >
                One unified view of your company's{" "}
                <span className="bg-linear-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                  financial health
                </span>{" "}
                and workforce risk.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-3.5 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-lg lg:max-w-xl"
              >
                SpotLite continuously connects bank statements, verified HR rosters, and market
                indicators turning raw transactions into real-time executive dashboards, peer
                benchmarks, and anomaly alerts your leadership can act on immediately.
              </motion.p>

              {/* Hero CTAs */}
              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5.5 py-3 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] w-full sm:w-auto"
                  >
                    Request a Demo
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <a
                  href="#modules"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-5.5 py-3 text-sm font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:border-slate-300 w-full sm:w-auto"
                >
                  Explore 5 Modules
                </a>
              </motion.div>
            </div>

            {/* Hero Trust Points */}
            <motion.div
              variants={fadeUp}
              className="mt-6 pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm font-semibold text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Role-based access (CEO, CFO, HR)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Live in 6 weeks or less</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>SOC-2 & Bank-Grade Security</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right: Interactive Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-6.5 shadow-xl shadow-blue-900/6 flex flex-col justify-between">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between border-b border-border pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary font-bold shadow-xs">
                    <Activity size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Executive Overview
                      </p>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Sync
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground mt-0.5">
                      Apex Technologies India Pvt. Ltd.
                    </h2>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Headcount
                  </span>
                  <p className="text-sm sm:text-base font-bold text-foreground font-mono">
                    342 Verified
                  </p>
                </div>
              </div>

              {/* Top Row KPIs */}
              <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-3.5">
                <div className="rounded-xl bg-slate-50 p-3 sm:p-3.5 border border-slate-100">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Cash Runway
                  </span>
                  <p className="text-base sm:text-xl font-extrabold text-foreground font-mono mt-0.5">
                    18.4 mo
                  </p>
                  <span className="text-xs font-bold text-emerald-600 mt-0.5 block">
                    +2.1 vs Plan
                  </span>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 sm:p-3.5 border border-slate-100">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Monthly Burn
                  </span>
                  <p className="text-base sm:text-xl font-extrabold text-foreground font-mono mt-0.5">
                    ₹42.8L
                  </p>
                  <span className="text-xs font-bold text-slate-500 mt-0.5 block">
                    -4.2% MoM
                  </span>
                </div>
                <div className="rounded-xl bg-blue-50/70 p-3 sm:p-3.5 border border-blue-100">
                  <span className="text-xs font-bold text-primary">Health Index</span>
                  <p className="text-base sm:text-xl font-extrabold text-primary font-mono mt-0.5">
                    84 / 100
                  </p>
                  <span className="text-xs font-bold text-blue-700 mt-0.5 block">
                    Top Quartile
                  </span>
                </div>
              </div>

              {/* Anomaly Radar Live Alert */}
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 sm:p-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-amber-950">
                        Anomaly Radar: Vendor Price Spike Detected
                      </span>
                      <span className="text-[0.625rem] sm:text-xs font-bold uppercase rounded bg-amber-200 px-2 py-0.5 text-amber-900">
                        High Priority
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                      Cloud infra invoices jumped +38% MoM without corresponding headcount growth.
                      Estimated leakage: ₹3.2L/month.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Benchmarking Row */}
              <div className="mt-4 rounded-xl border border-border bg-slate-50/70 p-3 sm:p-3.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-primary" />
                    Salary vs Peer Benchmark (IT Mid-tier)
                  </span>
                  <span className="font-bold text-emerald-600 text-xs sm:text-sm">
                    Optimized (P50)
                  </span>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
