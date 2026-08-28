import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Upload,
  RefreshCw,
  Check,
  ChevronRight,
  Bot,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Landmark,
  Calculator,
  Users,
  Network,
  Send,
  Sliders,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui/button";
import {
  SANDBOX_ROLES_DATA,
  ROLES,
  type Currency,
  type SandboxPersonaData,
} from "../data/landing-data";
import { cn } from "@/shared/lib/utils";

interface LandingInteractiveSandboxProps {
  currency: Currency;
  initialRole?: string;
  onClose?: () => void;
  isEmbedded?: boolean;
}

export function LandingInteractiveSandbox({
  currency,
  initialRole = "ceo",
  onClose,
  isEmbedded = false,
}: LandingInteractiveSandboxProps) {
  // Active Persona State
  const validInitialRole = (["ceo", "cfo", "hr", "coo"].includes(initialRole)
    ? initialRole
    : "ceo") as "ceo" | "cfo" | "hr" | "coo";

  const [activePersonaId, setActivePersonaId] = useState<"ceo" | "cfo" | "hr" | "coo">(
    validInitialRole,
  );

  // Sync if initialRole prop changes
  useEffect(() => {
    if (["ceo", "cfo", "hr", "coo"].includes(initialRole)) {
      setActivePersonaId(initialRole as "ceo" | "cfo" | "hr" | "coo");
    }
  }, [initialRole]);

  const persona: SandboxPersonaData = SANDBOX_ROLES_DATA[activePersonaId] || SANDBOX_ROLES_DATA.ceo;

  // Step Progress State: 1 = Ingest, 2 = Anomaly, 3 = AI Copilot, 4 = Graduation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State: OCR Ingestion
  const [isParsingOcr, setIsParsingOcr] = useState(false);
  const [ocrCompleted, setOcrCompleted] = useState(false);
  const [extractedCount, setExtractedCount] = useState(0);

  // Step 2 State: Anomaly Action
  const [actionSimulated, setActionSimulated] = useState(false);

  // Step 3 State: Copilot Q&A
  const [customInput, setCustomInput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string>(persona.step3.presetPrompts[0]);
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);

  // Reset steps when persona changes
  const handlePersonaChange = (newPersonaId: "ceo" | "cfo" | "hr" | "coo") => {
    setActivePersonaId(newPersonaId);
    setOcrCompleted(false);
    setIsParsingOcr(false);
    setActionSimulated(false);
    const newPersona = SANDBOX_ROLES_DATA[newPersonaId];
    setSelectedPrompt(newPersona.step3.presetPrompts[0]);
    setCustomInput("");
  };

  // Run OCR Simulation
  const handleStartOcr = () => {
    setIsParsingOcr(true);
    setExtractedCount(0);
    const target = persona.step1.transactionCount;
    const interval = setInterval(() => {
      setExtractedCount((prev) => {
        const next = prev + Math.floor(target / 8);
        if (next >= target) {
          clearInterval(interval);
          setIsParsingOcr(false);
          setOcrCompleted(true);
          return target;
        }
        return next;
      });
    }, 120);
  };

  // Run Copilot Query
  const handleRunQuery = (queryText: string) => {
    setSelectedPrompt(queryText);
    setIsCopilotThinking(true);
    setTimeout(() => {
      setIsCopilotThinking(false);
    }, 550);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    handleRunQuery(customInput.trim());
    setCustomInput("");
  };

  // Get active response from dictionary or generate generic intelligent response
  const qaDict = currency === "INR" ? persona.step3.qaINR : persona.step3.qaUSD;
  const currentResponse = qaDict[selectedPrompt] || {
    summary: `Based on your ${currency === "INR" ? "₹3.84 Cr" : "$4.62M"} operating ledger, SpotLite verified cash flow trends and flagged 1 high-priority optimization.`,
    reasoning: [
      `Data verified across ${persona.step1.sourcesList.join(", ")}.`,
      `Statutory compliance and vendor ledger integrity confirmed.`,
      `Working capital impact calculated with 99.8% reconciliation certainty.`,
    ],
    impactDelta: currency === "INR" ? "Optimized: +₹4.2L monthly liquidity" : "Optimized: +$5.1K monthly liquidity",
    action: "Recommendation: Review detailed transaction log and export audit schedule.",
  };

  return (
    <div className={cn("flex flex-col gap-6", isEmbedded ? "p-4 sm:p-6" : "")}>
      {/* Top Bar: Persona Switcher */}
      <div className="rounded-2xl border border-border-c bg-surface p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                Interactive Multi-Role Sandbox
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-foreground mt-0.5">
              Select your role to test SpotLite in 60 seconds
            </h3>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-xs font-semibold text-slate-500">Currency:</span>
            <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-primary border border-blue-200">
              {currency === "INR" ? "INR (₹) India" : "USD ($) Global"}
            </span>
          </div>
        </div>

        {/* Persona Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const isSelected = r.id === activePersonaId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handlePersonaChange(r.id as "ceo" | "cfo" | "hr" | "coo")}
                className={cn(
                  "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer select-none",
                  isSelected
                    ? "border-primary bg-primary text-white shadow-xs"
                    : "border-border-c bg-[#f8fafc] text-foreground hover:bg-white hover:border-slate-300",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                    isSelected ? "bg-white/20 text-white" : "bg-white text-primary border border-border-c",
                  )}
                >
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold font-display truncate">{r.role}</p>
                  <p
                    className={cn(
                      "text-[10px] font-mono truncate",
                      isSelected ? "text-blue-100" : "text-slate-500",
                    )}
                  >
                    {r.highlightBadge}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Persona Focus Tagline */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-border-c">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-foreground">{persona.roleName} Mode:</span>
            <span className="truncate">{persona.targetFocus}</span>
          </div>
          <span className="shrink-0 text-[11px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Real Sandbox Telemetry
          </span>
        </div>
      </div>

      {/* Step Stepper Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-border-c pb-3">
        {[
          { num: 1, label: "1. Ingest & Reconcile" },
          { num: 2, label: "2. Anomaly Watchdog" },
          { num: 3, label: "3. AI Financial Copilot" },
          { num: 4, label: "4. Activation" },
        ].map((s) => {
          const isCurrent = step === s.num;
          const isPast = step > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num as 1 | 2 | 3 | 4)}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl text-left transition-all cursor-pointer",
                isCurrent
                  ? "bg-primary/10 border border-primary/30 text-primary font-bold shadow-2xs font-mono"
                  : isPast
                    ? "bg-emerald-50/80 text-emerald-800 font-semibold font-mono"
                    : "text-slate-500 hover:bg-slate-100/60 font-mono",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold font-mono",
                  isCurrent
                    ? "bg-primary text-white"
                    : isPast
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-700",
                )}
              >
                {isPast ? <Check size={12} /> : s.num}
              </span>
              <span className="text-xs truncate hidden sm:inline">{s.label}</span>
              <span className="text-xs truncate sm:hidden">Step {s.num}</span>
            </button>
          );
        })}
      </div>

      {/* Step Content Container */}
      <div className="min-h-[380px]">
        {/* STEP 1: MULTI-SOURCE INGESTION & OCR PIPELINE */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-border-c bg-white p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                    Step 1 of 3: Data Ingestion Engine
                  </span>
                  <h4 className="text-base sm:text-lg font-bold font-display tracking-[-0.015em] text-foreground mt-0.5">
                    Connect & Reconcile Multi-Bank Statements
                  </h4>
                </div>
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                  Zero manual data entry
                </span>
              </div>

              {/* Sample File Card */}
              <div className="rounded-xl border border-dashed border-primary/40 bg-blue-50/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                    <FileSpreadsheet size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold font-display text-foreground">
                      {currency === "INR" ? persona.step1.fileTitleINR : persona.step1.fileTitleUSD}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {persona.step1.subtitle} • {persona.step1.fileSize}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleStartOcr}
                  disabled={isParsingOcr}
                  className="w-full sm:w-auto text-xs font-semibold tracking-[-0.005em] gap-2 cursor-pointer shrink-0"
                >
                  {isParsingOcr ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Parsing OCR…</span>
                    </>
                  ) : ocrCompleted ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Re-Run OCR Parse</span>
                    </>
                  ) : (
                    <>
                      <Upload size={14} />
                      <span>Test Live Ingestion</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Live OCR Progress / Completed Stats */}
              {isParsingOcr && (
                <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-primary font-mono">
                    <span className="flex items-center gap-2">
                      <RefreshCw size={13} className="animate-spin" />
                      Ingesting and extracting statement records…
                    </span>
                    <span>{extractedCount} / {persona.step1.transactionCount} txns</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-blue-200/60">
                    <div
                      className="h-full bg-primary transition-all duration-150"
                      style={{
                        width: `${Math.min(100, (extractedCount / persona.step1.transactionCount) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {ocrCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-950">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      <span>Automated Cross-Bank Reconciliation Succeeded</span>
                    </div>
                    <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white font-mono">
                      {persona.step1.matchRate} Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="rounded-lg bg-white p-2.5 border border-emerald-100">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Transactions Parsed</p>
                      <p className="text-sm font-bold font-mono tabular-nums text-foreground mt-0.5">
                        {persona.step1.transactionCount.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 border border-emerald-100">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Reconciled Balance</p>
                      <p className="text-sm font-bold font-mono tabular-nums text-foreground mt-0.5">
                        {currency === "INR" ? persona.step1.clearedBalanceINR : persona.step1.clearedBalanceUSD}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-2.5 border border-emerald-100 col-span-2">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Institutions Reconciled</p>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate font-mono">
                        {persona.step1.sourcesList.join(" • ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Connected Feeds Info */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-border-c font-mono">
                <div className="flex items-center gap-1.5 font-sans">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>256-bit TLS encrypted bank statement ingestion</span>
                </div>
                <span>Step 1 of 3</span>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-end pt-2">
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold tracking-[-0.005em] gap-1.5 cursor-pointer"
              >
                <span>Proceed to Step 2: Anomaly Watchdog</span>
                <ChevronRight size={15} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: ANOMALY & BLIND SPOT RADAR */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-border-c bg-white p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                    Step 2 of 3: Risk & Opportunity Radar
                  </span>
                  <h4 className="text-base sm:text-lg font-bold font-display tracking-[-0.015em] text-foreground mt-0.5">
                    Proactive Blind Spot Detection
                  </h4>
                </div>
                <span className="rounded-full bg-amber-100 text-amber-900 px-2.5 py-0.5 text-xs font-bold border border-amber-200 font-mono">
                  {persona.step2.severity} Severity Flag
                </span>
              </div>

              {/* Anomaly Card */}
              <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-4 sm:p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-2xs">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm sm:text-base font-bold font-display text-amber-950">
                      {persona.step2.anomalyTitle}
                    </h5>
                    <p className="text-xs text-amber-900 leading-relaxed font-normal">
                      {currency === "INR" ? persona.step2.descriptionINR : persona.step2.descriptionUSD}
                    </p>
                  </div>
                </div>

                {/* Quantified Leakage Box */}
                <div className="rounded-lg border border-amber-200 bg-white/80 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Identified Financial Leakage / Variance
                    </p>
                    <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-amber-950 mt-0.5 tracking-tight">
                      {currency === "INR" ? persona.step2.quantifiedLeakageINR : persona.step2.quantifiedLeakageUSD}
                    </p>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant={actionSimulated ? "outline" : "default"}
                    onClick={() => setActionSimulated(true)}
                    className={cn(
                      "text-xs font-semibold tracking-[-0.005em] gap-1.5 cursor-pointer",
                      actionSimulated ? "border-emerald-300 text-emerald-800 bg-emerald-50 font-bold" : "",
                    )}
                  >
                    {actionSimulated ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span>Action Executed</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>{persona.step2.actionLabel}</span>
                      </>
                    )}
                  </Button>
                </div>

                {actionSimulated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs font-medium text-emerald-900 bg-emerald-100/70 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                    <span>{persona.step2.actionDoneText}</span>
                  </motion.div>
                )}
              </div>

              {/* Recommendation summary */}
              <div className="rounded-xl border border-border-c bg-[#f8fafc] p-3.5 text-xs text-foreground space-y-1">
                <p className="font-bold text-primary font-display">Executive Action Recommendation:</p>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {persona.step2.recommendation}
                </p>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold cursor-pointer"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs font-semibold tracking-[-0.005em] gap-1.5 cursor-pointer"
              >
                <span>Proceed to Step 3: AI Copilot Q&A</span>
                <ChevronRight size={15} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: CONVERSATIONAL AI FINANCIAL COPILOT */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-blue-900 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 sm:p-6 text-white shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                    <Bot size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300 font-mono">
                      Step 3 of 3: Conversational Intelligence
                    </span>
                    <h4 className="text-sm sm:text-base font-bold font-display text-white mt-0.5 tracking-tight">
                      SpotLite AI Copilot Reasoning Sandbox
                    </h4>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-blue-300 bg-white/10 px-2.5 py-1 rounded-full">
                  Persona: {persona.roleName}
                </span>
              </div>

              {/* Preset Query Chips */}
              <div className="space-y-1.5">
                <p className="text-xs text-blue-200 font-semibold">Try role-curated executive queries:</p>
                <div className="flex flex-wrap gap-1.5">
                  {persona.step3.presetPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleRunQuery(prompt)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs text-left transition-all cursor-pointer font-medium",
                        selectedPrompt === prompt
                          ? "bg-primary text-white font-bold shadow-xs ring-1 ring-white/30"
                          : "bg-white/10 text-blue-100 hover:bg-white/20 border border-white/10",
                      )}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input Form */}
              <form onSubmit={handleCustomSubmit} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={`Ask custom question as ${persona.roleName} (e.g. "What is our burn multiple?")...`}
                  className="flex-1 rounded-xl border border-white/20 bg-black/40 px-3.5 py-2 text-xs text-white placeholder:text-blue-300/60 focus:border-primary focus:outline-none font-sans"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!customInput.trim()}
                  className="text-xs font-semibold tracking-[-0.005em] gap-1 cursor-pointer shrink-0"
                >
                  <Send size={13} />
                  <span className="hidden sm:inline">Ask AI</span>
                </Button>
              </form>

              {/* AI Terminal Output */}
              <div className="rounded-xl border border-white/15 bg-black/60 p-4 space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 border-b border-white/10 pb-2">
                  <span>{`> "${selectedPrompt}"`}</span>
                  <span className="text-[10px] text-blue-300 font-sans">99.8% Confidence</span>
                </div>

                {isCopilotThinking ? (
                  <div className="flex items-center gap-2.5 text-blue-200 py-3">
                    <RefreshCw size={15} className="animate-spin text-primary" />
                    <span className="text-xs font-normal">
                      SpotLite AI synthesizing multi-bank statements & industry benchmarks…
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2.5 text-xs">
                    <p className="text-white font-medium leading-relaxed">
                      {currentResponse.summary}
                    </p>

                    <div className="space-y-1.5 pl-2 border-l border-primary/60">
                      {currentResponse.reasoning.map((r, i) => (
                        <p key={i} className="text-slate-300 leading-relaxed text-[11px] font-normal">
                          • {r}
                        </p>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 text-[11px]">
                      <span className="font-mono font-bold text-emerald-400 tabular-nums">
                        {currentResponse.impactDelta}
                      </span>
                      <span className="text-blue-200 italic font-normal">{currentResponse.action}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold cursor-pointer"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(4)}
                className="text-xs font-semibold tracking-[-0.005em] gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <span>Complete Tour & Launch Workspace</span>
                <CheckCircle2 size={15} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: GRADUATION & INSTANT ACTIVATION */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/90 to-white p-6 sm:p-8 text-center shadow-xs space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                <CheckCircle2 size={32} />
              </div>

              <div className="max-w-md mx-auto space-y-1">
                <h4 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-foreground">
                  You've experienced the SpotLite Advantage!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In under 60 seconds, you tested multi-bank statement OCR reconciliation, proactive
                  anomaly watchdogs, and conversational financial reasoning as {persona.roleName}.
                </p>
              </div>

              {/* Action Cards */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-2 text-left">
                <div className="rounded-xl border border-primary/30 bg-white p-4 shadow-xs space-y-3 flex flex-col justify-between h-full">
                  <div>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold font-mono text-primary uppercase tracking-wider">
                      Fastest Path to Value
                    </span>
                    <h5 className="text-sm font-bold font-display text-foreground mt-2">
                      Launch Free Workspace with Sample Data
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Start exploring your pre-populated executive dashboard immediately. Zero credit card needed.
                    </p>
                  </div>

                  <Button asChild className="w-full text-xs font-semibold tracking-[-0.005em] gap-1.5 mt-2">
                    <Link to="/signup" onClick={onClose}>
                      <span>Start Instant Setup</span>
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>

                <div className="rounded-xl border border-border-c bg-white p-4 shadow-xs space-y-3 flex flex-col justify-between h-full">
                  <div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold font-mono text-slate-700 uppercase tracking-wider">
                      Tailored Consultation
                    </span>
                    <h5 className="text-sm font-bold font-display text-foreground mt-2">
                      Book 1-on-1 Executive Walkthrough
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Walk through custom bank integrations and enterprise governance with our product specialist.
                    </p>
                  </div>

                  <Button asChild variant="outline" className="w-full text-xs font-semibold tracking-[-0.005em] gap-1.5 mt-2">
                    <Link to="/signup" onClick={onClose}>
                      <span>Schedule 15m Demo</span>
                      <ChevronRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Replay action */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOcrCompleted(false);
                    setActionSimulated(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-foreground cursor-pointer transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Re-test with another executive persona</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
