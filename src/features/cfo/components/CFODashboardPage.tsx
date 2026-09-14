import React, { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Building2,
  RefreshCw,
  Landmark,
  UploadCloud,
  ArrowUpRight,
  CircleCheck,
  CircleDot,
  ChevronDown,
  Users,
} from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Badge } from "@/shared/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useCFODashboard } from "../hooks/useCFODashboard";
import { CFOUploadPreviewModal } from "./CFOUploadPreviewModal";
import { cn } from "@/shared/lib/utils";

const STAGGER = {
  container: { transition: { staggerChildren: 0.06 } },
  child: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export function CFODashboardPage() {
  const { vendorMetrics, clientMetrics, history, clientHistory, isLoading } = useCFODashboard();
  const [previewItem, setPreviewItem] = useState<{ id: string; type: "Vendor" | "Client" } | null>(
    null,
  );
  const [historyTab, setHistoryTab] = useState<"all" | "vendor" | "client">("all");
  const [isUploadsCollapsed, setIsUploadsCollapsed] = useState(false);

  const displayedHistory = useMemo(() => {
    let list = [...(history || []), ...(clientHistory || [])];
    list.sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
    if (historyTab === "vendor") return list.filter((i) => i.upload_type === "Vendor");
    if (historyTab === "client") return list.filter((i) => i.upload_type === "Client");
    return list;
  }, [history, clientHistory, historyTab]);

  const kpis = [
    {
      label: "Total Vendors",
      value: vendorMetrics?.totalVendors ?? 0,
      href: "/cfo/vendors",
      icon: Building2,
      iconClass: "bg-violet-500/10 text-violet-600 border-violet-500/20",
      ambient: "from-violet-500/8",
      hoverBorder: "hover:border-violet-500/40",
      subtext: "View vendor portfolio",
    },
    {
      label: "Recurring Vendors",
      value: vendorMetrics?.recurringVendors ?? 0,
      href: "/cfo/vendors?recurring=true",
      icon: RefreshCw,
      iconClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
      ambient: "from-indigo-500/8",
      hoverBorder: "hover:border-indigo-500/40",
      subtext: "Filter by recurring contracts",
    },
    {
      label: "Total Clients",
      value: clientMetrics?.totalClients ?? 0,
      href: "/cfo/clients",
      icon: Users,
      iconClass: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      ambient: "from-blue-500/8",
      hoverBorder: "hover:border-blue-500/40",
      subtext: "View client portfolio",
    },
    {
      label: "Recurring Clients",
      value: clientMetrics?.recurringClients ?? 0,
      href: "/cfo/clients?recurring=true",
      icon: RefreshCw,
      iconClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      ambient: "from-emerald-500/8",
      hoverBorder: "hover:border-emerald-500/40",
      subtext: "Filter by recurring contracts",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 pb-24">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <header className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 border border-violet-500/20">
            <Landmark className="h-4.5 w-4.5" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            CFO Operations
          </h1>
        </div>
        <p className="text-text-secondary text-sm pl-0.5">
          Bulk-import and manage vendor and client portfolios, contracts, and revenue schedules through intelligent workflows.
        </p>
      </header>

      {/* ── Management Modules (Vendor & Client) ─────────────────────────── */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch"
        initial="initial"
        animate="animate"
        variants={{ animate: STAGGER.container }}
      >
        <ModuleCard
          title="Vendor Management"
          description="Upload vendor portfolio, review contract information and analyse procurement expenses."
          href="/cfo/vendor/upload"
          icon={Building2}
          buttonLabel="Import Vendors"
          accentClass="bg-violet-500/10 text-violet-600 border-violet-500/20"
          glowClass="from-violet-500/12"
        />

        <ModuleCard
          title="Client Management"
          description="Upload client portfolio, review revenue agreements, billing schedules, and banking details."
          href="/cfo/client/upload"
          icon={Users}
          buttonLabel="Import Clients"
          accentClass="bg-indigo-500/10 text-indigo-600 border-indigo-500/20"
          glowClass="from-indigo-500/12"
        />
      </motion.section>

      {/* ── KPI Metric Cards Grid (Horizontally below) ─────────────────── */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch"
        initial="initial"
        animate="animate"
        variants={{ animate: STAGGER.container }}
      >
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} variants={STAGGER.child} className="h-full">
              <Link
                to={kpi.href as any}
                className="block h-full group select-none cursor-pointer focus:outline-none"
              >
                <div
                  className={cn(
                    "relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-surface via-surface to-surface-alt/20 p-4.5 shadow-xs transition-all duration-200 hover:shadow-md",
                    kpi.hoverBorder,
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 pointer-events-none bg-linear-to-br via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300",
                      kpi.ambient,
                    )}
                  />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary group-hover:text-foreground transition-colors">
                        {kpi.label}
                      </p>
                      <div className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground tabular-nums">
                        {isLoading ? (
                          <Skeleton className="mt-1 h-8 w-14 rounded-md" />
                        ) : (
                          kpi.value.toLocaleString()
                        )}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-200 group-hover:scale-110",
                        kpi.iconClass,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="relative z-10 mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[11px] font-medium text-text-tertiary group-hover:text-text-secondary transition-colors">
                    <span>{kpi.subtext}</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.section>
      {/* ── Recent upload activity ────────────────────────────────────── */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <button
            type="button"
            onClick={() => setIsUploadsCollapsed((prev) => !prev)}
            className="group flex items-center gap-2 text-left select-none cursor-pointer focus:outline-none"
            aria-expanded={!isUploadsCollapsed}
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-text-secondary group-hover:text-foreground transition-colors">
              Recent Ingestion History
            </h2>
            {displayedHistory.length > 0 && (
              <span className="font-mono text-xs font-medium text-text-tertiary tabular-nums">
                ({displayedHistory.length})
              </span>
            )}
            <div className="flex h-5 w-5 items-center justify-center rounded-md text-text-tertiary group-hover:bg-surface-alt group-hover:text-text-secondary transition">
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isUploadsCollapsed && "-rotate-90",
                )}
              />
            </div>
          </button>

          <div className="flex items-center gap-1 bg-surface-alt/70 p-0.5 rounded-lg border border-border/80 self-start sm:self-auto">
            <button
              onClick={() => setHistoryTab("all")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-md transition",
                historyTab === "all"
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-text-secondary hover:text-foreground",
              )}
            >
              All
            </button>
            <button
              onClick={() => setHistoryTab("vendor")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-md transition",
                historyTab === "vendor"
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-text-secondary hover:text-foreground",
              )}
            >
              Vendors
            </button>
            <button
              onClick={() => setHistoryTab("client")}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-md transition",
                historyTab === "client"
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-text-secondary hover:text-foreground",
              )}
            >
              Clients
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {!isUploadsCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Card className="border-border/80 shadow-xs overflow-hidden">
                {isLoading ? (
                  <div className="divide-y divide-border">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-4">
                        <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3.5 w-40" />
                          <Skeleton className="h-3 w-56" />
                        </div>
                        <Skeleton className="h-7 w-20 rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : displayedHistory.length > 0 ? (
                  <ul className="divide-y divide-border">
                    {displayedHistory.map((item, idx) => {
                      const isClient = item.upload_type === "Client";
                      return (
                        <motion.li
                          key={item.upload_id || idx}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.04 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 hover:bg-surface-alt/40 transition-colors"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
                                isClient
                                  ? "bg-indigo-500/10 text-indigo-600 border-indigo-500/20"
                                  : "bg-violet-500/10 text-violet-600 border-violet-500/20",
                              )}
                            >
                              {isClient ? (
                                <Users className="h-4 w-4" />
                              ) : (
                                <UploadCloud className="h-4 w-4" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-semibold text-foreground tracking-tight truncate">
                                  {item.file_name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-[10px] font-bold uppercase tracking-wider shrink-0 h-5 px-1.5",
                                    isClient
                                      ? "border-indigo-500/30 text-indigo-600 bg-indigo-500/5"
                                      : "border-violet-500/30 text-violet-600 bg-violet-500/5",
                                  )}
                                >
                                  {item.upload_type}
                                </Badge>
                              </div>
                              <p className="text-xs text-text-secondary mt-0.5 tabular-nums">
                                {(item.record_count ?? 0).toLocaleString()} records ·{" "}
                                {item.uploaded_at
                                  ? (() => {
                                      try {
                                        const d = new Date(item.uploaded_at);
                                        return isNaN(d.getTime())
                                          ? "Recently"
                                          : formatDistanceToNow(d, { addSuffix: true });
                                      } catch {
                                        return "Recently";
                                      }
                                    })()
                                  : "Recently"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 pl-13 sm:pl-0">
                            <div className="flex items-center gap-1 text-xs text-teal-600 font-medium tracking-tight">
                              <CircleCheck className="h-3.5 w-3.5" />
                              Imported
                            </div>
                            <button
                              onClick={() =>
                                setPreviewItem({
                                  id: item.upload_id,
                                  type: isClient ? "Client" : "Vendor",
                                })
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface-alt hover:text-foreground cursor-pointer"
                            >
                              Preview
                              <ArrowUpRight className="h-3 w-3" />
                            </button>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-14 text-center px-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt text-text-tertiary mb-4">
                      <CircleDot className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-text-secondary">No uploads yet</p>
                    <p className="text-xs text-text-tertiary mt-1">
                      Import your first vendor or client list to see activity here.
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <CFOUploadPreviewModal
        uploadId={previewItem?.id ?? null}
        uploadType={previewItem?.type ?? "Vendor"}
        onClose={() => setPreviewItem(null)}
      />
    </div>
  );
}

function ModuleCard({
  title,
  description,
  href,
  buttonLabel,
  icon: Icon,
  accentClass,
  glowClass,
}: {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  icon: React.ElementType;
  accentClass: string;
  glowClass: string;
}) {
  return (
    <motion.div variants={STAGGER.child} className="h-full">
      <Card className="group relative overflow-hidden border-border/80 p-6 shadow-xs transition-all duration-200 hover:border-border hover:shadow-sm h-full flex flex-col justify-between">
        <div
          className={cn(
            "absolute inset-0 pointer-events-none bg-linear-to-br via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300",
            glowClass,
          )}
        />

        <div className="relative z-10 flex flex-col gap-4 h-full">
          <div>
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-200 group-hover:scale-105",
                accentClass,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-display text-base sm:text-lg font-bold text-foreground tracking-tight">
              {title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button asChild size="default" className="h-10 px-5 text-sm font-semibold gap-2 shadow-xs">
              <Link to={href}>
                {buttonLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
