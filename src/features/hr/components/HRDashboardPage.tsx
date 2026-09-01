import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Users,
  Building2,
  TrendingUp,
  RefreshCw,
  BriefcaseBusiness,
  UploadCloud,
  ArrowUpRight,
  CircleCheck,
  CircleDot,
} from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Badge } from "@/shared/components/ui/badge";
import { motion } from "framer-motion";
import { useHRDashboard } from "../hooks/useDashboard";
import { UploadPreviewModal } from "./UploadPreviewModal";
import { cn } from "@/shared/lib/utils";

// ---------------------------------------------------------------------------
// Semantic token map – kept consistent with the rest of the Spotlight product.
//
// In this product, emerald/UserCheck = "accepted / live member" (Team section).
// We must NOT reuse that for a different concept in HR.
//
// HR semantic tokens:
//   • Employees (headcount)  → primary blue
//   • Vendors (partners)     → violet
//   • Growth / trend         → teal
//   • Recurrence / renewal   → indigo
//   • Upload event           → slate (neutral action, not a status)
// ---------------------------------------------------------------------------

const STAGGER = {
  container: { transition: { staggerChildren: 0.06 } },
  child: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export function HRDashboardPage() {
  const { employeeMetrics, vendorMetrics, history, isLoading } = useHRDashboard();
  const [previewUploadId, setPreviewUploadId] = useState<string | null>(null);

  const kpis = [
    {
      label: "Total Employees",
      value: employeeMetrics?.totalEmployees ?? 0,
      icon: Users,
      iconClass: "bg-primary/10 text-primary border-primary/20",
      ambient: "from-primary/8",
      delta: null,
    },
    {
      label: "Active Headcount",
      value: employeeMetrics?.activeEmployees ?? 0,
      icon: TrendingUp,
      iconClass: "bg-teal-500/10 text-teal-600 border-teal-500/20",
      ambient: "from-teal-500/8",
      delta: null,
    },
    {
      label: "Total Vendors",
      value: vendorMetrics?.totalVendors ?? 0,
      icon: Building2,
      iconClass: "bg-violet-500/10 text-violet-600 border-violet-500/20",
      ambient: "from-violet-500/8",
      delta: null,
    },
    {
      label: "Recurring Vendors",
      value: vendorMetrics?.recurringVendors ?? 0,
      icon: RefreshCw,
      iconClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
      ambient: "from-indigo-500/8",
      delta: null,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 pb-24">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <header className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <BriefcaseBusiness className="h-4.5 w-4.5" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            HR Operations
          </h1>
        </div>
        <p className="text-text-secondary text-sm pl-0.5">
          Bulk-import and manage employee &amp; vendor data through intelligent Excel workflows.
        </p>
      </header>

      {/* ── Module entry-points ───────────────────────────────────────── */}
      <motion.section
        className="grid gap-4 lg:grid-cols-2"
        initial="initial"
        animate="animate"
        variants={{ animate: STAGGER.container }}
      >
        <ModuleCard
          title="Employee Management"
          description="Upload employee master data, validate records, review information and import employees at scale."
          href="/hr/employee/upload"
          icon={Users}
          buttonLabel="Manage Employees"
          accentClass="bg-primary/10 text-primary border-primary/20"
          glowClass="from-primary/12"
        />
        <ModuleCard
          title="Vendor Management"
          description="Upload vendor portfolio, review contract information and analyse business data before importing."
          href="/hr/vendor/upload"
          icon={Building2}
          buttonLabel="Manage Vendors"
          accentClass="bg-violet-500/10 text-violet-600 border-violet-500/20"
          glowClass="from-violet-500/12"
        />
      </motion.section>

      {/* ── KPI row ───────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3">
          Overview
        </h2>
        <motion.div
          className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4"
          initial="initial"
          animate="animate"
          variants={{ animate: STAGGER.container }}
        >
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <motion.div key={kpi.label} variants={STAGGER.child}>
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-surface via-surface to-surface-alt/20 p-4 shadow-xs transition-all duration-200 hover:border-border hover:shadow-sm group",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 pointer-events-none bg-gradient-to-br via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300",
                      kpi.ambient,
                    )}
                  />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        {kpi.label}
                      </p>
                      <div className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground">
                        {isLoading ? (
                          <Skeleton className="mt-1 h-8 w-14 rounded-md" />
                        ) : (
                          kpi.value.toLocaleString()
                        )}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-200 group-hover:scale-105",
                        kpi.iconClass,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Recent upload activity ────────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3">
          Recent Uploads
        </h2>
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
          ) : history.length > 0 ? (
            <ul className="divide-y divide-border">
              {history.map((item, idx) => {
                const isEmployee = item.upload_type === "Employee";
                return (
                  <motion.li
                    key={item.upload_id || idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 hover:bg-surface-alt/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Use UploadCloud (neutral upload icon) — NOT CheckCircle2 which
                          means "accepted member" in Team. Color is type-specific, not
                          status-specific, to avoid semantic clash. */}
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
                          isEmployee
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-violet-500/10 text-violet-600 border-violet-500/20",
                        )}
                      >
                        <UploadCloud className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-foreground truncate">
                            {item.file_name}
                          </span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] font-semibold shrink-0 h-5 px-1.5",
                              isEmployee
                                ? "border-primary/30 text-primary bg-primary/5"
                                : "border-violet-500/30 text-violet-600 bg-violet-500/5",
                            )}
                          >
                            {item.upload_type}
                          </Badge>
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5">
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

                    <div className="flex items-center gap-2 shrink-0 pl-[52px] sm:pl-0">
                      {/* Completion indicator — use CircleCheck (distinct from CheckCircle2
                          used by Team) to avoid icon-reuse semantic conflict */}
                      <div className="flex items-center gap-1 text-xs text-teal-600 font-medium">
                        <CircleCheck className="h-3.5 w-3.5" />
                        Imported
                      </div>
                      <button
                        onClick={() => setPreviewUploadId(item.upload_id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:bg-surface-alt hover:text-foreground"
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
              <p className="text-sm font-medium text-text-secondary">No uploads yet</p>
              <p className="text-xs text-text-tertiary mt-1">
                Import your first employee or vendor list to see activity here.
              </p>
            </div>
          )}
        </Card>
      </section>

      <UploadPreviewModal uploadId={previewUploadId} onClose={() => setPreviewUploadId(null)} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ModuleCard
// ---------------------------------------------------------------------------

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
    <motion.div variants={STAGGER.child}>
      <Card className="group relative overflow-hidden border-border/80 p-6 shadow-xs transition-all duration-200 hover:border-border hover:shadow-sm h-full">
        {/* Ambient glow */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none bg-gradient-to-br via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300",
            glowClass,
          )}
        />

        <div className="relative z-10 flex flex-col gap-5 h-full">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border shadow-2xs transition-transform duration-200 group-hover:scale-105",
              accentClass,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            <p className="mt-1.5 text-sm leading-6 text-text-secondary">{description}</p>
          </div>

          <Link
            to={href}
            className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-foreground/90 px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground"
          >
            {buttonLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
