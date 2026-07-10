import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileSearch,
  Shield,
  Building2,
  Brain,
  ListChecks,
  Tags,
  Database,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { agents } from "@/data/agentic";
import { AgentLoop } from "@/components/spotlite/agent-activity";
import { AgentNarration } from "@/components/spotlite/agent-narration";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { DocumentInfo } from "@/components/spotlite/extraction-hub";

export const Route = createFileRoute("/_app/agents")({
  head: () => ({
    meta: [
      { title: "Agents · Spotlite" },
      {
        name: "description",
        content: "The Spotlite agents that observe, think, act and learn on your money.",
      },
    ],
  }),
  component: Agents,
});

// ---------------------------------------------------------------------------
// Pipeline steps
// ---------------------------------------------------------------------------

const pipelineSteps = [
  {
    icon: FileSearch,
    label: "Upload",
    description: "PDF statement received and validated",
    detail: "Format checks, file integrity, deduplication via MD5 hash",
  },
  {
    icon: Shield,
    label: "Validation",
    description: "Content integrity verified",
    detail: "PDF parsing, page count detection, corruption checks",
  },
  {
    icon: Building2,
    label: "Bank Detection",
    description: "Bank and account type identified",
    detail: "AI-powered detection using statement headers and formatting patterns",
  },
  {
    icon: Brain,
    label: "AI Extraction",
    description: "Gemini 2.5 Flash processes raw data",
    detail: "Large language model reads statement pages, extracts structured financial data",
  },
  {
    icon: ListChecks,
    label: "Transaction Parsing",
    description: "Every transaction parsed and validated",
    detail: "Date, narration, debit/credit, running balance — all cross-checked",
  },
  {
    icon: Tags,
    label: "Categorization",
    description: "Transactions auto-categorized",
    detail: "Merchant detection, category tagging (Food, Travel, Utilities, etc.)",
  },
  {
    icon: Database,
    label: "Storage",
    description: "Data saved to your financial graph",
    detail: "Account, transactions, and metadata stored in PostgreSQL",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Agents() {
  const [recentDocs, setRecentDocs] = useState<DocumentInfo[]>([]);

  useEffect(() => {
    api
      .get<DocumentInfo[]>("/api/statements")
      .then((docs) => setRecentDocs(docs.slice(0, 10)))
      .catch(() => setRecentDocs([]));
  }, []);

  return (
    <div className="px-5 py-6 md:px-10">
      <Link to="/home" className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>
      <header className="mt-4">
        <h1 className="font-display text-2xl font-bold">Your agents</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Spotlite isn't a dashboard you check. It's a team of agents working for you around the
          clock.
        </p>
      </header>

      <div className="mt-5">
        <AgentNarration agent="learning">
          We observe → think → act → learn in a loop. Every time you open, apply or snooze, I make
          the next nudge sharper.
        </AgentNarration>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-lg font-semibold">
          The observe → think → act → learn loop
        </h2>
        <div className="overflow-x-auto pb-1">
          <AgentLoop />
        </div>
      </section>

      {/* Agent cards */}
      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.key} className="card-spot p-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-on-brand">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-semibold">{a.label}</p>
              <p className="mt-1 text-xs text-text-secondary">{a.tagline}</p>
            </div>
          );
        })}
      </section>

      {/* Extraction Pipeline Visualization */}
      <section className="mt-8">
        <h2 className="mb-2 font-display text-lg font-semibold">
          Upload & Extraction Pipeline
        </h2>
        <p className="mb-5 text-sm text-text-secondary">
          Here's exactly what happens when you drop a bank statement into Spotlite — every step,
          transparent and traceable.
        </p>

        <div className="card-spot overflow-hidden p-5">
          <div className="relative">
            {pipelineSteps.map((step, i) => {
              const StepIcon = step.icon;
              const isLast = i === pipelineSteps.length - 1;
              return (
                <div key={step.label} className="group relative flex gap-4 pb-6 last:pb-0">
                  {/* Vertical line connector */}
                  {!isLast && (
                    <div className="absolute left-5 top-10 h-[calc(100%-10px)] w-px bg-border" />
                  )}

                  {/* Step icon */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-on-brand shadow-e1 transition group-hover:scale-105">
                    <StepIcon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-pill bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                        Step {i + 1}
                      </span>
                      <h3 className="text-sm font-semibold">{step.label}</h3>
                    </div>
                    <p className="mt-1 text-sm text-text-primary">{step.description}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real recent activity from backend */}
      <section className="card-spot mt-6 p-5">
        <h2 className="mb-4 font-display text-lg font-semibold">Recent extraction activity</h2>
        {recentDocs.length === 0 ? (
          <div className="py-8 text-center">
            <FileSearch className="mx-auto h-8 w-8 text-text-secondary/40" />
            <p className="mt-3 text-sm text-text-secondary">
              No extraction activity yet. Upload a statement to see it here.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentDocs.map((doc) => {
              const statusMap = {
                PENDING: { icon: Clock, color: "text-text-secondary", label: "Pending" },
                PROCESSING: { icon: Loader2, color: "text-brand", label: "Processing" },
                COMPLETED: { icon: CheckCircle2, color: "text-success", label: "Extracted" },
                FAILED: { icon: AlertCircle, color: "text-danger", label: "Failed" },
              };
              const st = statusMap[doc.status];
              const StIcon = st.icon;
              const isSpinning = doc.status === "PROCESSING" || doc.status === "PENDING";
              const time = new Date(doc.created_at).toLocaleString("en-IN", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <li
                  key={doc.id}
                  className="flex items-center gap-3 rounded-xl bg-surface-alt px-3 py-2.5"
                >
                  <StIcon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      st.color,
                      isSpinning && "animate-spin"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{doc.original_name}</p>
                    <p className="text-[11px] text-text-secondary">
                      <span className={cn("font-medium", st.color)}>{st.label}</span>
                      {" · Extraction Agent · "}
                      {time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
