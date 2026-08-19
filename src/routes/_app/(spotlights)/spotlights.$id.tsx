import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { spotlightById } from "@/shared/data/rohan";
import { evidenceBase } from "@/shared/data/agentic";
import { formatINR } from "@/shared/lib/format";
import { SeverityBadge } from "@/features/spotlights/components/spotlight-card";
import { IconChip, channelKey } from "@/shared/lib/icons";
import { AgentBadge, ConfidenceMeter, AgentNarration } from "@/features/agents/components/agent-narration";
import { FinancialFuture } from "@/features/spotlights/components/financial-future";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { selectIsApplied } from "@/shared/store/selectors";
import { snoozeTrigger } from "@/shared/store/slices/spotlightsSlice";

export const Route = createFileRoute("/_app/(spotlights)/spotlights/$id")({
  head: () => ({
    meta: [
      { title: `Spotlight detail · Spotlite` },
      {
        name: "description",
        content: `Why Spotlite shone a light here: signals, math, projection and recommendation.`,
      },
    ],
  }),
  component: SpotlightDetail,
});

function SpotlightDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const applied = useAppSelector(selectIsApplied(id));
  const t = spotlightById(id);
  if (!t) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary mb-4 shadow-xs">
          <ArrowLeft className="h-6 w-6" />
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">Spotlight Opportunity Not Found</h1>
        <p className="mt-2 text-sm text-text-secondary">
          The requested opportunity ID could not be loaded or is no longer available.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/spotlights"
            className="inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-brand hover:opacity-95 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Spotlights
          </Link>
        </div>
      </div>
    );
  }

  const isLoss = t.amountLabel === "lost" || t.amountLabel === "missed";
  const confidence = t.confidence ?? 80;

  function snooze() {
    dispatch(snoozeTrigger(t!.id));
    toast("Snoozed", {
      description: `The Learning Agent noted this. We'll resurface ${t!.product} later.`,
    });
    nav({ to: "/spotlights" });
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-10">
      <Link to="/spotlights" className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowLeft className="h-4 w-4" /> Spotlights
      </Link>

      <header className="mt-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <IconChip keyName={t.id} size="lg" />
          <div>
            <p className="text-sm font-medium text-text-secondary">{t.product}</p>
            <p className="mt-1 font-display text-4xl font-bold font-num leading-none">
              {t.bigValue}
            </p>
            <p className="mt-1.5 text-xs uppercase tracking-wider text-text-secondary">
              {t.bigCaption}
            </p>
            <p className="mt-2 text-sm text-text-primary text-balance">{t.oneLiner}</p>
          </div>
        </div>
        <SeverityBadge severity={t.severity} />
      </header>

      <div className="mt-4">
        <AgentNarration agent="reasoning">
          I connected {t.signals.length} signals in your data to reach this. Here's exactly how,
          with my confidence.
        </AgentNarration>
      </div>

      <section className="card-spot mt-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">What I noticed</h2>
          <AgentBadge agent="reasoning" />
        </div>
        <ul className="mt-3 space-y-2 text-sm">
          {t.signals.map((s, i) => (
            <li key={i} className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-border pt-3 text-xs text-text-secondary">
          Reasoned from{" "}
          <span className="font-num font-semibold text-text-primary">
            {evidenceBase.transactions.toLocaleString("en-IN")}
          </span>{" "}
          transactions, {evidenceBase.banks} bank accounts and {evidenceBase.months} months. No
          hallucination, only evidence.
        </p>
      </section>

      <section className="card-spot mt-4 p-5">
        <h2 className="font-display text-base font-semibold">My reasoning</h2>
        <ul className="mt-3 space-y-2 text-sm text-text-secondary">
          {t.reasoning.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-brand">→</span> {r}
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-border pt-4">
          <ConfidenceMeter value={confidence} />
          {t.confidenceReason && (
            <p className="mt-2 text-xs text-text-secondary">{t.confidenceReason}</p>
          )}
        </div>
      </section>

      {t.insight && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl tint-brand px-4 py-3 text-sm text-text-primary">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
          {t.insight}
        </p>
      )}

      {t.id === "home-loan" && (
        <section className="mt-4">
          <h2 className="mb-3 font-display text-base font-semibold">Your financial future</h2>
          <FinancialFuture />
        </section>
      )}

      <section className="card-spot mt-4 p-5">
        <h2 className="font-display text-base font-semibold">Recommended</h2>
        <p className="mt-1 text-sm font-semibold text-brand">{t.recommendation.product}</p>
        <p className="mt-1 text-sm text-text-secondary">{t.recommendation.copy}</p>
      </section>

      <section className="card-spot mt-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">When &amp; how I'll reach you</h2>
          <AgentBadge agent="interaction" />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <IconChip keyName={channelKey(t.channel.label)} size="sm" />
          <p className="text-sm">
            {t.channel.label.replace(/^[^\w]+/, "")} ·{" "}
            <span className="text-text-secondary">{t.channel.when}</span>
          </p>
        </div>
      </section>

      {t.amount !== 0 && (
        <p
          className={`mt-6 text-center font-display text-lg font-bold ${isLoss ? "text-danger" : "text-success"}`}
        >
          Opportunity:{" "}
          <span className="font-num">{formatINR(Math.abs(t.amount), { compact: true })}</span>
        </p>
      )}

      {applied ? (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-pill bg-success/12 py-3 text-sm font-semibold text-success">
          <Check className="h-4 w-4" /> Applied, nice move
        </div>
      ) : (
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={snooze}
            className="flex flex-1 items-center justify-center gap-2 rounded-pill border border-border bg-surface py-3 text-center text-sm font-semibold hover:bg-surface-alt"
          >
            <Clock className="h-4 w-4" /> Not now
          </button>
          <Link
            to="/spotlights/$id/apply"
            params={{ id: t.id }}
            className="flex-1 rounded-pill bg-brand py-3 text-center text-sm font-semibold text-on-brand shadow-brand"
          >
            {t.amountLabel === "could-earn" ? "Apply now" : "Fix it"}
          </Link>
        </div>
      )}
    </div>
  );
}
