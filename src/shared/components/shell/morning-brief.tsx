import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { formatINR } from "@/shared/lib/format";
import { evidenceBase } from "@/shared/data/agentic";

/**
 * Home hero, reframed as a "Financial Morning Brief": narrative first,
 * graphs later. Leads with what the AI did overnight and what it found.
 *
 * When `hasData` is false, shows a welcome state prompting the user to
 * upload bank statements instead of the analysis summary.
 */
export function MorningBriefHero({
  name,
  greetingPrefix = "Good morning",
  moneyFound,
  wellness,
  hasData = true,
  controls,
}: {
  name: string;
  greetingPrefix?: string;
  moneyFound: number;
  wellness: number;
  hasData?: boolean;
  controls?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-brand px-5 pb-9 pt-10 text-on-brand md:rounded-bl-3xl md:px-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-2xl font-bold leading-tight">{greetingPrefix}, {name}</p>
          <p className="mt-1 text-sm opacity-80">
            {hasData
              ? "Last night, Spotlite analyzed your money."
              : "Upload your bank statements to get started."}
          </p>
        </div>
        <div className="flex items-center gap-3">{controls}</div>
      </div>

      {hasData && (
        <>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {[
              `${evidenceBase.transactions.toLocaleString("en-IN")} transactions`,
              `${evidenceBase.banks} bank relationships`,
              `${evidenceBase.months} months`,
            ].map((chip) => (
              <span key={chip} className="rounded-pill bg-white/12 px-3 py-1 font-medium">
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm opacity-80">and discovered</p>
            <p className="font-display text-5xl font-bold leading-none font-num">
              {formatINR(moneyFound)}
            </p>
            <p className="mt-2 text-sm opacity-90">still on the table.</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link
              to="/spotlights"
              className="inline-flex items-center gap-1.5 rounded-pill bg-white px-4 py-2 text-sm font-semibold text-brand transition hover:opacity-90"
            >
              See your Spotlights <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="rounded-pill bg-white/12 px-3 py-2 text-xs font-medium">
              Wellness <span className="font-num font-semibold">{wellness}</span>
            </span>
          </div>
        </>
      )}

      {!hasData && (
        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Sparkles className="h-4 w-4" />
            <p>Drop in your bank statements below and let our AI agents do the rest.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["Multi-bank support", "AI-powered extraction", "Auto-categorization"].map(
              (chip) => (
                <span key={chip} className="rounded-pill bg-white/12 px-3 py-1 font-medium">
                  {chip}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
