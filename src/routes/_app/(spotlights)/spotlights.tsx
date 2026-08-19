import { createFileRoute } from "@tanstack/react-router";
import { rohan, type SpotlightBucket } from "@/shared/data/rohan";
import { formatINR } from "@/shared/lib/format";
import { SpotlightCard } from "@/features/spotlights/components/spotlight-card";
import { AgentNarration } from "@/features/agents/components/agent-narration";
import { BlindSpotMeter } from "@/features/spotlights/components/blind-spot-meter";
import { ExplainTip } from "@/features/spotlights/components/explain-tip";
import { explainers } from "@/shared/data/agentic";
import { useAppSelector } from "@/shared/store";
import { selectMoneyFound, selectApplied } from "@/shared/store/selectors";

export const Route = createFileRoute("/_app/(spotlights)/spotlights")({
  head: () => ({
    meta: [
      { title: "Spotlights · Spotlite" },
      {
        name: "description",
        content: "Every opportunity Spotlite found in your money, quantified in rupees.",
      },
    ],
  }),
  component: Spotlights,
});

const sections: { key: SpotlightBucket; title: string; caption: string }[] = [
  { key: "lost", title: "Money You Lost", caption: "Value that already slipped away." },
  { key: "wealth", title: "Wealth You Can Create", caption: "What your money could become." },
  { key: "risk", title: "Risks", caption: "Gaps worth closing before they bite." },
];

function Spotlights() {
  const moneyFound = useAppSelector(selectMoneyFound);
  const applied = useAppSelector(selectApplied);

  return (
    <div className="px-5 py-6 md:px-10">
      <header className="mb-4">
        <h1 className="font-display text-2xl font-bold">Spotlights</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Spotlite found{" "}
          <span className="font-num font-semibold text-success">{formatINR(moneyFound)}</span> in
          hidden value
          {applied.length > 0 && (
            <span className="text-text-secondary"> · {applied.length} acted on</span>
          )}
          .
        </p>
      </header>

      <div className="mb-5">
        <AgentNarration agent="reasoning">
          I shine a light on what is costing you the most. Each Spotlight tells one story, tap Why
          to see my working.
        </AgentNarration>
      </div>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">Blind Spot Meter</h2>
          <ExplainTip
            agent={explainers.blindSpots.agent}
            title={explainers.blindSpots.title}
            evidence={explainers.blindSpots.evidence}
          >
            {explainers.blindSpots.text}
          </ExplainTip>
        </div>
        <BlindSpotMeter />
      </section>

      {sections.map((s) => {
        const list = rohan.spotlights.filter((t) => t.bucket === s.key);
        if (list.length === 0) return null;
        return (
          <section key={s.key} className="mb-7">
            <div className="mb-3">
              <h2 className="font-display text-lg font-semibold">{s.title}</h2>
              <p className="text-xs text-text-secondary">{s.caption}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {list.map((t) => (
                <SpotlightCard key={t.id} spotlight={t} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
