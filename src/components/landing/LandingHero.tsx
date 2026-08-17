import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#f0f6fe] via-[#f8fbff] to-background pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-12"
    >
      {/* Subtle background mesh grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-6">
          {/* Hero Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6"
          >
            <motion.div variants={fadeUp} className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-[11px] font-semibold text-primary shadow-xs backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Workforce & Financial Intelligence</span>
              <span className="text-blue-300">|</span>
              <span className="text-muted-foreground font-medium">
                For High-Growth CFOs & CEOs
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-[34px] xl:text-[38px] lg:leading-[1.18]">
              One unified view of your company's{" "}
              <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                financial health
              </span>{" "}
              and workforce risk.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-lg">
              SpotLite continuously connects bank statements, verified HR
              rosters, and market indicators — turning raw transactions into
              real-time executive dashboards, peer benchmarks, and anomaly
              alerts your leadership can act on immediately.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div variants={fadeUp} className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4.5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
                >
                  Request a Demo
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
              <a
                href="#modules"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-white px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:border-slate-300"
              >
                Explore 5 Modules
              </a>
            </motion.div>

            {/* Hero Trust Points */}
            <motion.div variants={fadeUp} className="mt-4 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-[11px] font-semibold text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Role-based access (CEO, CFO, HR)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Live in 6 weeks or less</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>SOC-2 & Bank-Grade Security</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right: Interactive Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-xl border border-slate-200/90 bg-white p-4 sm:p-4.5 shadow-lg shadow-blue-900/8">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between border-b border-border pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-primary font-bold">
                    <Activity size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Executive Overview
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Sync
                      </span>
                    </div>
                    <h2 className="text-sm sm:text-base font-bold text-foreground">
                      Apex Technologies India Pvt. Ltd.
                    </h2>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                    Headcount
                  </span>
                  <p className="text-xs font-bold text-foreground font-mono">
                    342 Verified
                  </p>
                </div>
              </div>

              {/* Top Row KPIs */}
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                  <span className="text-[10px] font-semibold text-muted-foreground">
                    Cash Runway
                  </span>
                  <p className="text-sm font-extrabold text-foreground font-mono">
                    18.4 mo
                  </p>
                  <span className="text-[10px] font-bold text-emerald-600">
                    +2.1 vs Plan
                  </span>
                </div>
                <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                  <span className="text-[10px] font-semibold text-muted-foreground">
                    Monthly Burn
                  </span>
                  <p className="text-sm font-extrabold text-foreground font-mono">
                    ₹42.8L
                  </p>
                  <span className="text-[10px] font-bold text-slate-500">
                    -4.2% MoM
                  </span>
                </div>
                <div className="rounded-lg bg-blue-50/70 p-2 border border-blue-100">
                  <span className="text-[10px] font-bold text-primary">
                    Health Index
                  </span>
                  <p className="text-sm font-extrabold text-primary font-mono">
                    84 / 100
                  </p>
                  <span className="text-[10px] font-bold text-blue-700">
                    Top Quartile
                  </span>
                </div>
              </div>

              {/* Anomaly Radar Live Alert */}
              <div className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50/70 p-2.5">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    size={14}
                    className="text-amber-600 mt-0.5 shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-900">
                        Anomaly Radar: Vendor Price Spike Detected
                      </span>
                      <span className="text-[9px] font-bold uppercase rounded bg-amber-200 px-1 py-0.2 text-amber-900">
                        High Priority
                      </span>
                    </div>
                    <p className="text-[10px] text-amber-800 mt-0.5">
                      Cloud infra invoices jumped +38% MoM without corresponding
                      headcount growth. Estimated leakage: ₹3.2L/month.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Benchmarking Row */}
              <div className="mt-2.5 rounded-lg border border-border bg-slate-50/50 p-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-muted-foreground flex items-center gap-1">
                    <TrendingUp size={12} className="text-primary" />
                    Salary vs Peer Benchmark (IT Mid-tier)
                  </span>
                  <span className="font-bold text-emerald-600 text-[10px]">
                    Optimized (P50)
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-primary"
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
