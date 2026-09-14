import { createFileRoute, Link } from "@tanstack/react-router";
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
} from "lucide-react";
import { agents } from "@/shared/data/agentic";
import { AgentLoop } from "@/features/agents/components/agent-activity";
import { AgentNarration } from "@/features/agents/components/agent-narration";

export const Route = createFileRoute("/_app/(agents)/agents")({
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
        <h2 className="mb-2 font-display text-lg font-semibold">Upload & Extraction Pipeline</h2>
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

      {/* Link to authoritative Document Extraction Hub */}
      <section className="card-spot mt-6 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-base font-semibold">Document Extraction Hub</h2>
          <p className="mt-1 text-sm text-text-secondary">
            View live processing status, statement audit trails, and document history in the extraction workspace.
          </p>
        </div>
        <Link
          to="/upload"
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-on-brand shadow-e1 transition hover:opacity-90 shrink-0"
        >
          <span>Open Extraction Hub</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
