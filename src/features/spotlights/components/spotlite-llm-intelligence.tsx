import React, { useState } from "react";
import { formatINR, formatPct } from "@/shared/lib/format";
import { LLMInsights } from "../hooks/useSpotlite";
import { Link } from "@tanstack/react-router";
import {
  Brain,
  ShieldAlert,
  AlertTriangle,
  Send,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";

interface Props {
  insights: LLMInsights;
  onAskCfo?: (query: string) => Promise<{ answer: string; verified_cell_citation: string; confidence: number }>;
  onSelectTab?: (tab: "tier1") => void;
}

function formatMateriality(mat: string): string {
  return mat
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SpotliteLLMIntelligence({ insights, onSelectTab }: Props) {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            AI Intelligence
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            AI analysis on top of verified ledger data. 3 active findings across Capabilities 3, 5, and 6.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand border border-brand/20">
          <Sparkles size={14} /> AI on verified numbers
        </span>
      </div>

      {/* 1. BOARD-READY EXECUTIVE BRIEF */}
      <div className="rounded-2xl border border-brand/25 bg-brand/5 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white shadow-xs">
              <Brain size={18} />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              Executive Brief
            </h3>
          </div>
          <span className="text-xs font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20 font-mono">
            Capability 9
          </span>
        </div>
        <div className="rounded-xl bg-surface/80 p-4 border border-border/50 space-y-2">
          <p className="text-xs leading-relaxed text-text-secondary whitespace-pre-line">
            "{insights.capability9_executive_brief ? insights.capability9_executive_brief.slice(0, 280).trim() + "…" : ""}"
          </p>
          <div>
            {onSelectTab ? (
              <button
                type="button"
                onClick={() => onSelectTab("tier1")}
                className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/50 rounded-xs"
              >
                <span>View full brief on Executive Front Page</span>
                <ArrowUpRight size={13} />
              </button>
            ) : (
              <Link
                to="/spotlights"
                className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/50 rounded-xs"
              >
                <span>View full brief on Executive Front Page</span>
                <ArrowUpRight size={13} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. HIGH RISK SECURITY ALERTS (BEC FRAUD & EXPIRED CONTRACTS) */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* BEC FRAUD DRIFT DETECTOR */}
        <div className="rounded-2xl border-2 border-rose-500/40 bg-rose-500/5 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                <ShieldAlert size={16} /> Top Fraud Signal
              </span>
              <span className="rounded-full bg-rose-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                Capability 6 · BEC Risk
              </span>
            </div>

            <div>
              <h4 className="font-display text-base font-bold text-foreground">
                Payment-Redirection Bank Identity Drift
              </h4>
              <p className="text-[11px] text-text-secondary mt-0.5">
                Bank account IFSC changed since last verified payment.
              </p>
            </div>

            {insights.capability6_payment_redirection_drift_detector.map((item, idx) => (
              <div key={idx} className="rounded-xl bg-surface p-4 border border-border/60 space-y-2">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-foreground">{item.counterparty}</span>
                  <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                    Bank IFSC Changed
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-md bg-surface-alt p-2">
                    <span className="text-text-tertiary block text-[9px]">Historical Baseline</span>
                    <span className="font-mono font-medium text-text-secondary">{item.historical_bank_ifsc}</span>
                  </div>
                  <div className="rounded-md bg-rose-500/10 p-2 border border-rose-500/20">
                    <span className="text-rose-700 dark:text-rose-300 block text-[9px]">Recent Settlement</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{item.recent_remitting_ifsc}</span>
                  </div>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">{item.detection_narrative}</p>
              </div>
            ))}
          </div>

          <Link
            to="/spotlights/$id/apply"
            params={{ id: "bec-fraud-risk" }}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500/50"
          >
            <span>Execute Bank Verification & Remittance Hold</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* CONTRACT LAPSE & LEGAL EXPOSURE SCANNER */}
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <AlertTriangle size={16} /> Legal Exposure
              </span>
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                Capability 5 · Expired Terms
              </span>
            </div>

            <h4 className="font-display text-base font-bold text-foreground">
              Contract Lapse & Legal Exposure Scan
            </h4>

            {insights.capability5_contract_lapse_scanner.map((item, idx) => (
              <div key={idx} className="rounded-xl bg-surface p-3.5 border border-border/60 space-y-1.5">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-foreground">{item.counterparty} ({item.type})</span>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    Expired {item.end_date}
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">{item.legal_exposure_finding}</p>
              </div>
            ))}
          </div>

          <Link
            to="/spotlights/$id/apply"
            params={{ id: "contract-lapse" }}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500/50"
          >
            <span>Generate SLA Renewal Term Sheet</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* 4. ANOMALY MATERIALITY TRIAGE */}
      <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <FileCheck2 size={18} />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground">
                Anomaly Triage
              </h3>
              <p className="text-[11px] text-text-tertiary">
                (Statistical Outliers) · Distinguishes genuine anomalies from expected spend fluctuations using business context.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20 font-mono">
            Capability 3
          </span>
        </div>

        <div className="space-y-3">
          {insights.capability3_anomaly_materiality_triage.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-surface-alt p-4 border border-border/50 flex flex-col md:flex-row justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-foreground">{item.vendor}</span>
                  <span className="text-text-tertiary">({item.category})</span>
                  <span className="font-mono text-[10px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    Z = {item.raw_z_score.toFixed(2)}σ (high outlier)
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{item.human_triage_explanation}</p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  item.materiality.includes("CRITICAL")
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}>
                  {formatMateriality(item.materiality)}
                </span>
                {item.materiality.includes("CRITICAL") && (
                  <Link
                    to="/spotlights/$id/apply"
                    params={{ id: "vendor-overbilling" }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500/50 rounded-xs"
                  >
                    <span>Remediate Overbill</span>
                    <ArrowUpRight size={12} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
