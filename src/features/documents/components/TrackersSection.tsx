import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Users,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
  Lock,
  Loader2,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { canAccessHR, canAccessCFO } from "@/shared/lib/roles";
import { useHRDashboard } from "@/features/hr/hooks/useDashboard";
import { useCFODashboard } from "@/features/cfo/hooks/useCFODashboard";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function TrackersSection() {
  const { user } = useAuth();
  const hasHRAccess = canAccessHR(user?.role);
  const hasCFOAccess = canAccessCFO(user?.role);

  const hrDashboard = useHRDashboard();
  const cfoDashboard = useCFODashboard();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border-c bg-surface p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-text-primary">Live Operations Trackers</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Real-time operational records synchronized from HR and CFO management workflows.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                cfoDashboard.refetch();
              }}
              disabled={cfoDashboard.isLoading || hrDashboard.isLoading}
              className="h-8 gap-1.5 text-xs text-text-secondary hover:text-text-primary"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${
                  cfoDashboard.isLoading || hrDashboard.isLoading ? "animate-spin" : ""
                }`}
              />
              Refresh Metrics
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1. HR Employees Tracker */}
        <div className="rounded-2xl border border-border-c bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border-c">
                HR Ops
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-text-primary">Employees Tracker</h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Organizational headcount, active employees, and roster imports.
              </p>
            </div>

            {hasHRAccess ? (
              hrDashboard.isLoading ? (
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ) : (
                <div className="space-y-1 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-num tabular-nums text-text-primary">
                      {hrDashboard.employeeMetrics?.totalEmployees ?? 0}
                    </span>
                    <span className="text-xs text-text-secondary font-medium">total staff</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    <span className="font-semibold text-success font-num tabular-nums">
                      {hrDashboard.employeeMetrics?.activeEmployees ?? 0}
                    </span>{" "}
                    active headcount on payroll
                  </p>
                </div>
              )
            ) : (
              <div className="rounded-xl border border-border-c/70 bg-surface-alt/50 p-3 flex items-center gap-2.5 text-xs text-text-secondary">
                <Lock className="h-4 w-4 shrink-0 text-text-tertiary" />
                <span>Restricted · Requires CEO, Admin, or HR role</span>
              </div>
            )}
          </div>

          <div className="border-t border-border-c/60 pt-3">
            {hasHRAccess ? (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs"
              >
                <Link to="/hr/employees">
                  <span>Open HR Directory</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs opacity-60"
              >
                <span>Access Restricted</span>
                <Lock className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* 2. CFO Vendors Tracker */}
        <div className="rounded-2xl border border-border-c bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border-c">
                CFO Ops
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-text-primary">Vendors Tracker</h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Supplier ecosystem, active contractors, and procurement records.
              </p>
            </div>

            {hasCFOAccess ? (
              cfoDashboard.isLoading ? (
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ) : (
                <div className="space-y-1 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-num tabular-nums text-text-primary">
                      {cfoDashboard.vendorMetrics?.totalVendors ?? 0}
                    </span>
                    <span className="text-xs text-text-secondary font-medium">vendors</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    <span className="font-semibold text-brand font-num tabular-nums">
                      {cfoDashboard.vendorMetrics?.recurringVendors ?? 0}
                    </span>{" "}
                    recurring suppliers on record
                  </p>
                </div>
              )
            ) : (
              <div className="rounded-xl border border-border-c/70 bg-surface-alt/50 p-3 flex items-center gap-2.5 text-xs text-text-secondary">
                <Lock className="h-4 w-4 shrink-0 text-text-tertiary" />
                <span>Restricted · Requires CEO, Admin, or CFO role</span>
              </div>
            )}
          </div>

          <div className="border-t border-border-c/60 pt-3">
            {hasCFOAccess ? (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs"
              >
                <Link to="/cfo/vendors">
                  <span>Open Vendor Directory</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs opacity-60"
              >
                <span>Access Restricted</span>
                <Lock className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* 3. CFO Clients Tracker */}
        <div className="rounded-2xl border border-border-c bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <span className="text-[10px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border-c">
                CFO Ops
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-text-primary">Clients Tracker</h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Client portfolio accounts, billing profiles, and customer contracts.
              </p>
            </div>

            {hasCFOAccess ? (
              cfoDashboard.isLoading ? (
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ) : (
                <div className="space-y-1 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-num tabular-nums text-text-primary">
                      {cfoDashboard.clientMetrics?.totalClients ?? 0}
                    </span>
                    <span className="text-xs text-text-secondary font-medium">clients</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    <span className="font-semibold text-brand font-num tabular-nums">
                      {cfoDashboard.clientMetrics?.recurringClients ?? 0}
                    </span>{" "}
                    active retaining accounts
                  </p>
                </div>
              )
            ) : (
              <div className="rounded-xl border border-border-c/70 bg-surface-alt/50 p-3 flex items-center gap-2.5 text-xs text-text-secondary">
                <Lock className="h-4 w-4 shrink-0 text-text-tertiary" />
                <span>Restricted · Requires CEO, Admin, or CFO role</span>
              </div>
            )}
          </div>

          <div className="border-t border-border-c/60 pt-3">
            {hasCFOAccess ? (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs"
              >
                <Link to="/cfo/clients">
                  <span>Open Client Directory</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs opacity-60"
              >
                <span>Access Restricted</span>
                <Lock className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
