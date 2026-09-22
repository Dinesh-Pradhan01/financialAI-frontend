import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calculator,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Landmark,
  Layers,
  Lock,
  Network,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  BrainCircuit,
  Upload,
  RefreshCw,
  Search,
  Check,
  ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogPortal,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import {
  MODULES,
  ROLES,
  type Currency,
  type ModuleItem,
  type RoleItem,
} from "../data/landing-data";
import { LandingInteractiveSandbox } from "./LandingInteractiveSandbox";
import { cn } from "@/shared/lib/utils";

export type PreviewModalType =
  | { type: "role"; roleId: string }
  | { type: "module"; moduleId: string }
  | { type: "architecture" }
  | { type: "sandbox"; roleId?: string }
  | null;

interface LandingPreviewModalProps {
  preview: PreviewModalType;
  onClose: () => void;
  currency: Currency;
  onSelectRoleInSandbox?: (roleId: string) => void;
}

export function LandingPreviewModal({
  preview,
  onClose,
  currency,
  onSelectRoleInSandbox,
}: LandingPreviewModalProps) {
  if (!preview) return null;

  const selectedRole = preview.type === "role" ? ROLES.find((r) => r.id === preview.roleId) : null;
  const selectedModule =
    preview.type === "module" ? MODULES.find((m) => m.id === preview.moduleId) : null;

  return (
    <Dialog open={Boolean(preview)} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] sm:w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-surface p-5 sm:p-7 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl max-h-[90vh] overflow-y-auto",
            preview.type === "sandbox" ? "max-w-4xl" : "max-w-3xl",
          )}
        >
          <DialogPrimitive.Close
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* 1. Role Preview Modal Content */}
          {preview.type === "role" && selectedRole && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                    <selectedRole.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold font-mono text-primary">
                        {selectedRole.highlightBadge}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {selectedRole.access}
                      </span>
                    </div>
                    <DialogTitle className="text-xl font-bold font-display text-foreground mt-1">
                      {selectedRole.role} Workspace Preview
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {selectedRole.description}
                </DialogDescription>
              </DialogHeader>

              {/* Simulated Live KPIs */}
              <div className="rounded-2xl border border-border-c bg-surface-alt/40 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Role-Scoped Executive Metrics
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Partition
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedRole.previewKpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-xl border border-border-c bg-surface p-3.5 shadow-2xs"
                    >
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {kpi.label}
                      </p>
                      <p className="text-lg sm:text-xl font-bold font-mono tabular-nums text-foreground mt-1 tracking-tight">
                        {currency === "INR" ? kpi.valueINR : kpi.valueUSD}
                      </p>
                      <p
                        className={`text-[11px] font-semibold mt-1 ${
                          kpi.status === "alert"
                            ? "text-amber-600"
                            : kpi.status === "good"
                              ? "text-emerald-600"
                              : "text-slate-500"
                        }`}
                      >
                        {kpi.trend}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature capabilities */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Role Capabilities
                </h4>
                <div className="grid gap-2 sm:grid-cols-1">
                  {selectedRole.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2.5 rounded-lg border border-border-c bg-surface p-2.5 text-xs sm:text-sm font-medium text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/60">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="text-xs font-semibold"
                >
                  Close Preview
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="text-xs font-semibold tracking-[-0.005em] gap-1.5"
                >
                  <Link to="/signup" onClick={onClose}>
                    Book Executive Demo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* 2. Module Specs Modal Content */}
          {preview.type === "module" && selectedModule && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                    <selectedModule.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold font-mono text-primary uppercase tracking-wider">
                      {selectedModule.tag}
                    </span>
                    <DialogTitle className="text-xl font-bold font-display text-foreground mt-1">
                      {selectedModule.title} Specifications
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {selectedModule.description}
                </DialogDescription>
              </DialogHeader>

              {/* Sample output */}
              <div className="rounded-2xl border border-border-c bg-surface-alt/40 p-4 sm:p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Operational Output & Sample Telemetry
                </p>
                <div className="flex items-center justify-between rounded-xl border border-border-c bg-surface p-4">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      {selectedModule.sampleMetric.label}
                    </p>
                    <p className="text-xl font-bold font-mono tabular-nums text-foreground mt-0.5 tracking-tight">
                      {selectedModule.sampleMetric.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedModule.sampleMetric.subtext}
                    </p>
                  </div>
                  {selectedModule.sampleMetric.badge && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold font-mono text-primary border border-primary/20">
                      {selectedModule.sampleMetric.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Core Features */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Data Pipeline & Features
                </h4>
                <div className="space-y-2">
                  {selectedModule.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-2.5 rounded-lg border border-border-c bg-surface p-3 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/60">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="text-xs font-semibold"
                >
                  Close Specs
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="text-xs font-semibold tracking-[-0.005em] gap-1.5"
                >
                  <Link to="/signup" onClick={onClose}>
                    Book Executive Demo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* 3. Product Architecture Modal */}
          {preview.type === "architecture" && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold font-mono text-emerald-800 uppercase tracking-wider">
                      Enterprise Grade
                    </span>
                    <DialogTitle className="text-xl font-bold font-display text-foreground mt-1">
                      SpotLite Architecture & Security Model
                    </DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  How SpotLite securely ingests, tokenizes, and processes high-volume corporate
                  financial data.
                </DialogDescription>
              </DialogHeader>

              {/* Architecture diagram steps */}
              <div className="space-y-3">
                <div className="rounded-xl border border-border-c bg-surface-alt/30 p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      1. Bank Statement OCR & Tokenization
                    </span>
                    <span className="text-[10px] font-mono bg-blue-100 text-primary px-2 py-0.5 rounded font-bold">
                      AES-256 GCM
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct integration with SBI, HDFC, ICICI, and custom CSV/PDF uploads with
                    automated PII redaction.
                  </p>
                </div>

                <div className="rounded-xl border border-border-c bg-surface-alt/30 p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      2. Continuous Ledger Reconciliation
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      Zero-Knowledge
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Matches transaction flows against approved vendor lists and HR employee tax IDs.
                  </p>
                </div>

                <div className="rounded-xl border border-border-c bg-surface-alt/30 p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      3. Role-Scoped Intelligence Delivery
                    </span>
                    <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">
                      RBAC Partitioning
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Each executive receives only authorized telemetry (CEO, CFO, HR Director, Ops
                    Lead).
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                <div className="text-xs text-emerald-950">
                  <p className="font-bold">SOC2 Type II & ISO 27001 Certified Infrastructure</p>
                  <p className="text-emerald-800 mt-0.5 leading-relaxed">
                    Data residency in Indian data centers (MeitY empaneled) or US-East regions with
                    zero model retraining on client financial records.
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/60">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="text-xs font-semibold"
                >
                  Close
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="text-xs font-semibold tracking-[-0.005em] gap-1.5"
                >
                  <Link to="/signup" onClick={onClose}>
                    Book Executive Demo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* 4. Live Interactive Onboarding Sandbox (The 60-Second Multi-Role "Aha Moment" Walkthrough) */}
          {preview.type === "sandbox" && (
            <LandingInteractiveSandbox
              currency={currency}
              initialRole={preview.roleId || "ceo"}
              onClose={onClose}
            />
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
