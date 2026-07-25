import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { Settings, MessageCircle, ArrowRight, Bot, Sparkles } from "lucide-react";
import { rohan, coachSuggestions } from "@/data/rohan";
import { MorningBriefHero } from "@/components/spotlite/morning-brief";
import { SpotlightCard } from "@/components/spotlite/spotlight-card";
import { NotificationsBell } from "@/components/spotlite/notifications-bell";
import { MonthChanges } from "@/components/spotlite/month-changes";
import { FinancialDNA } from "@/components/spotlite/financial-dna";
import { FinancialStory } from "@/components/spotlite/financial-story";
import { AgentMarketplace } from "@/components/spotlite/agent-marketplace";
import { FinancialFuture } from "@/components/spotlite/financial-future";
import { IconChip } from "@/lib/icons";
import { ExplainTip } from "@/components/spotlite/explain-tip";
import { ExtractionHub, type DocumentInfo } from "@/components/spotlite/extraction-hub";
import { lifeEvents, explainers } from "@/data/agentic";
import { useDemo } from "@/store/demo-store";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PersonProfile {
  id: string;
  email: string;
  full_name?: string | null;
  phone?: string | null;
  occupation?: string | null;
  primary_bank?: string | null;
  profile_completed: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Tip({ k }: { k: keyof typeof explainers }) {
  const e = explainers[k];
  return (
    <ExplainTip agent={e.agent} title={e.title} evidence={e.evidence}>
      {e.text}
    </ExplainTip>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getFirstName(fullName?: string | null, email?: string): string {
  if (fullName) {
    return fullName.split(" ")[0];
  }
  if (email) {
    const local = email.split("@")[0];
    return local.charAt(0).toUpperCase() + local.slice(1);
  }
  return "there";
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

export const Route = createFileRoute("/_app/home")({
  head: () => ({
    meta: [
      { title: "Home · Spotlite" },
      {
        name: "description",
        content: "Your financial dashboard powered by AI agents.",
      },
    ],
  }),
  component: Home,
});

// ---------------------------------------------------------------------------
// Home component
// ---------------------------------------------------------------------------

function Home() {
  const { moneyFound, wellness, applied } = useDemo();
  const { user } = useAuth();
  const topSpotlights = rohan.spotlights.filter((t) => !applied.includes(t.id)).slice(0, 3);

  // --- Person profile from DB ---
  const [person, setPerson] = useState<PersonProfile | null>(null);
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [docsLoaded, setDocsLoaded] = useState(false);

  // Fetch person profile
  useEffect(() => {
    api
      .get<PersonProfile>("/api/persons/me")
      .then(setPerson)
      .catch(() => setPerson(null));
  }, []);

  // Fetch documents
  const refreshDocs = useCallback(() => {
    api
      .get<DocumentInfo[]>("/api/statements")
      .then((docs) => {
        setDocuments(docs);
        setDocsLoaded(true);
      })
      .catch(() => {
        setDocuments([]);
        setDocsLoaded(true);
      });
  }, []);

  useEffect(() => {
    refreshDocs();
  }, [refreshDocs]);

  // Derived state
  const userName = getFirstName(person?.full_name ?? user?.full_name, user?.email);
  const greeting = getGreeting();
  const hasExtractedData = documents.some((d) => d.status === "COMPLETED");
  const personId = person?.id ?? user?.person_id;

  return (
    <div>
      <MorningBriefHero
        name={`${userName}`}
        greetingPrefix={greeting}
        moneyFound={moneyFound}
        wellness={wellness}
        hasData={hasExtractedData}
        controls={
          <>
            <NotificationsBell />
            <Link
              to="/settings"
              aria-label="Settings"
              className="rounded-full bg-white/15 p-2 transition hover:bg-white/25"
            >
              <Settings className="h-4 w-4" />
            </Link>
          </>
        }
      />

      <div className="space-y-8 px-5 py-7 md:px-10">
        {/* Extraction Hub — always visible, replaces "While you slept" */}
        <ExtractionHub
          personId={personId}
          documents={documents}
          onDocumentsChange={refreshDocs}
        />

        {/* Below sections only show after extraction */}
        {hasExtractedData ? (
          <>
            {/* Spotlights preview */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-semibold">Your Spotlights</h2>
                  <p className="text-xs text-text-secondary">The biggest things you didn't know.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Tip k="spotlights" />
                  <Link
                    to="/spotlights"
                    className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-surface-alt"
                  >
                    See all
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {topSpotlights.map((t) => (
                  <SpotlightCard key={t.id} spotlight={t} />
                ))}
              </div>
            </section>

            {/* Life events — emotional */}
            <section>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    We think something important happened
                  </h2>
                  <p className="text-xs text-text-secondary">Detected by the Reasoning Agent.</p>
                </div>
                <Tip k="lifeEvents" />
              </div>
              <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-3 md:px-0">
                {lifeEvents.map((e) => (
                  <Link
                    key={e.id}
                    to="/spotlights/$id"
                    params={{ id: e.action?.triggerId ?? "fd" }}
                    className="card-spot w-72 shrink-0 p-4 transition hover:shadow-e2 md:w-auto"
                  >
                    <div className="flex items-center justify-between">
                      <IconChip keyName={e.iconKey} size="md" />
                      <span className="font-num text-[11px] text-text-secondary">
                        {e.confidence}% sure
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-tight">{e.title}</p>
                    <p className="mt-1 text-xs text-text-secondary">{e.detail}</p>
                    <p className="mt-2 inline-block rounded-lg bg-surface-alt px-2 py-0.5 font-num text-[11px] text-text-secondary">
                      {e.signal}
                    </p>
                    {e.action && (
                      <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand">
                        {e.action.label} <ArrowRight className="h-3.5 w-3.5" />
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>

            {/* What changed since last month */}
            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold">
                  What changed since last month
                </h2>
                <Tip k="monthChanges" />
              </div>
              <MonthChanges />
            </section>

            {/* Financial DNA + Story */}
            <section className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold">Your Financial DNA</h2>
                  <div className="flex items-center gap-2">
                    <Tip k="financialDNA" />
                    <Link
                      to="/wrapped"
                      className="inline-flex items-center gap-1.5 rounded-pill bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand ring-1 ring-inset ring-brand/20 transition hover:bg-brand/15"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Money Wrapped
                    </Link>
                  </div>
                </div>
                <FinancialDNA className="flex-1" />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold">Your financial story</h2>
                  <Tip k="financialStory" />
                </div>
                <FinancialStory />
              </div>
            </section>

            {/* Agent marketplace */}
            <section>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    What Spotlite would do next
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Each move, attributed to the agent behind it.
                  </p>
                </div>
                <Tip k="agentMarketplace" />
              </div>
              <AgentMarketplace />
            </section>

            {/* Financial future */}
            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold">Your financial future</h2>
                <Tip k="financialFuture" />
              </div>
              <FinancialFuture />
            </section>

            {/* Ask Spotlite */}
            <section>
              <h2 className="mb-3 font-display text-lg font-semibold">Ask Spotlite</h2>
              <Link
                to="/coach"
                className="card-spot flex items-center gap-3 p-4 transition hover:bg-surface-alt"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-on-brand">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Talk to your money</p>
                  <p className="text-xs text-text-secondary">
                    Reasoned answers over your real numbers.
                  </p>
                </div>
              </Link>
              <div className="mt-3 flex flex-wrap gap-2">
                {coachSuggestions.slice(0, 5).map((q) => (
                  <Link
                    key={q}
                    to="/coach"
                    className="rounded-pill border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary transition hover:bg-surface-alt"
                  >
                    {q}
                  </Link>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Empty state when no extraction has happened yet */
          docsLoaded && (
            <section className="card-spot flex flex-col items-center px-6 py-12 text-center">
              <div className="rounded-2xl bg-brand/10 p-4">
                <Sparkles className="h-10 w-10 text-brand" />
              </div>
              <h2 className="mt-5 font-display text-xl font-bold">
                Ready to see the money you're missing?
              </h2>
              <p className="mt-2 max-w-md text-sm text-text-secondary">
                Upload your bank statements above. Our AI agents will extract every transaction,
                detect spending patterns, find blind spots, and build your complete financial
                picture — automatically.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-text-secondary">
                {[
                  "🏦 Multi-bank support",
                  "🤖 5 AI agents",
                  "📊 Auto-categorization",
                  "💡 Smart spotlights",
                ].map((feature) => (
                  <span
                    key={feature}
                    className="rounded-pill border border-border bg-surface px-3 py-1.5 font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}
