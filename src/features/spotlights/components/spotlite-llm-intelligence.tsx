import React, { useState } from "react";
import { formatINR, formatPct } from "@/shared/lib/format";
import { LLMInsights } from "../hooks/useSpotlite";
import {
  Brain,
  ShieldAlert,
  AlertTriangle,
  Send,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
} from "lucide-react";

interface Props {
  insights: LLMInsights;
  onAskCfo?: (query: string) => Promise<{ answer: string; verified_cell_citation: string; confidence: number }>;
}

export function SpotliteLLMIntelligence({ insights }: Props) {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            LLM-Augmented AI Feature Layer
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Narrative synthesis, BEC fraud drift detection, contract lapse scanning, and anomaly triage.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-600 dark:text-purple-400">
          <Sparkles size={14} /> AI Synthesized on Top of Verified Numbers
        </span>
      </div>

      {/* 1. BOARD-READY EXECUTIVE BRIEF */}
      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-white">
              <Brain size={18} />
            </div>
            <h3 className="font-display text-base font-bold text-foreground">
              Executive Brief Generator (Board Summary)
            </h3>
          </div>
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full">
            Capability 9
          </span>
        </div>
        <p className="text-xs leading-relaxed text-text-secondary whitespace-pre-line rounded-xl bg-surface/80 p-4 border border-border/50">
          {insights.capability9_executive_brief}
        </p>
      </div>

      {/* 3. HIGH RISK SECURITY ALERTS (BEC FRAUD & EXPIRED CONTRACTS) */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* BEC FRAUD DRIFT DETECTOR */}
        <div className="rounded-2xl border-2 border-rose-500/40 bg-rose-500/5 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
              <ShieldAlert size={16} /> Capability 6 — Highest-Severity Fraud Signal
            </span>
            <span className="rounded-full bg-rose-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
              BEC Risk
            </span>
          </div>

          <h4 className="font-display text-base font-bold text-foreground">
            Payment-Redirection Bank Identity Drift
          </h4>

          {insights.capability6_payment_redirection_drift_detector.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-surface p-4 border border-border/60 space-y-2">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-bold text-foreground">{item.counterparty}</span>
                <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                  IFSC Changed
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

        {/* CONTRACT LAPSE & LEGAL EXPOSURE SCANNER */}
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <AlertTriangle size={16} /> Capability 5 — Legal Exposure Scanner
            </span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
              Expired Terms
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
                Capability 3 — Anomaly Materiality Triage ($Z$-Score Outliers)
              </h3>
              <p className="text-[11px] text-text-tertiary">
                Filters expected noise from statistical z-score flags using context raw tests can't see.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {insights.capability3_anomaly_materiality_triage.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-surface-alt p-4 border border-border/50 flex flex-col md:flex-row justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-foreground">{item.vendor}</span>
                  <span className="text-text-tertiary">({item.category})</span>
                  <span className="font-mono text-[10px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    Z = {item.raw_z_score.toFixed(2)}σ
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{item.human_triage_explanation}</p>
              </div>
              <div className="self-start">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                  item.materiality.includes("CRITICAL")
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}>
                  {item.materiality}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
