import { createFileRoute, Link } from "@tanstack/react-router";
import { rohan } from "@/shared/data/rohan";
import { formatINR } from "@/shared/lib/format";
import { IconChip } from "@/shared/lib/icons";
import { AgentNarration } from "@/features/agents/components/agent-narration";
import { ExplainTip } from "@/features/spotlights/components/explain-tip";
import { BalanceTrend } from "@/features/spending/components/BalanceTrend";
import { SpendingDonut } from "@/features/spending/components/SpendingDonut";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { selectTimeframe } from "@/shared/store/selectors";
import { setTimeframe } from "@/shared/store/slices/preferencesSlice";
import { timeframeFactors, explainers } from "@/shared/data/agentic";
import { cn } from "@/shared/lib/utils";

function Tip({ k }: { k: keyof typeof explainers }) {
  const e = explainers[k];
  return (
    <ExplainTip agent={e.agent} title={e.title} evidence={e.evidence}>
      {e.text}
    </ExplainTip>
  );
}

export const Route = createFileRoute("/_app/(spending)/spending")({
  head: () => ({
    meta: [
      { title: "Spending · Spotlite" },
      {
        name: "description",
        content: "Spend by category, top merchants and your monthly balance trend.",
      },
    ],
  }),
  component: Spending,
});

const TIMEFRAMES = ["3M", "6M", "12M"];

function Spending() {
  const dispatch = useAppDispatch();
  const timeframe = useAppSelector(selectTimeframe);
  const factor = timeframeFactors[timeframe] ?? 1;
  const cats = rohan.categories.map((c) => ({ ...c, amount: Math.round(c.amount * factor) }));
  const total = cats.reduce((sum, c) => sum + c.amount, 0);
  const months = timeframe === "3M" ? 3 : timeframe === "6M" ? 6 : 12;
  const trend = rohan.monthlyTrend.slice(-months);

  return (
    <div className="px-5 py-6 md:px-10">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Spending</h1>
        <div className="inline-flex rounded-pill border border-border bg-surface p-0.5">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => dispatch(setTimeframe(tf))}
              className={cn(
                "rounded-pill px-3 py-1 text-xs font-semibold transition",
                timeframe === tf ? "bg-brand text-on-brand shadow-e1" : "text-text-secondary",
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </header>

      <div className="mb-5">
        <AgentNarration agent="intelligence">
          Airlines is {rohan.categories[0].share}% of your spend, your single biggest category. That
          pattern is what powers the Travel Card opportunity.
        </AgentNarration>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <section className="card-spot p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Where your money goes</p>
            <Tip k="spendingDonut" />
          </div>
          <SpendingDonut categories={cats} total={total} />
        </section>

        <section className="card-spot p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Top merchants</p>
            <Tip k="spendingDonut" />
          </div>
          <ul className="mt-3 space-y-2.5">
            {rohan.topMerchants.map((m) => {
              const max = rohan.topMerchants[0].amount;
              return (
                <li key={m.rank} className="flex items-center gap-3">
                  <span className="w-5 text-xs font-num text-text-secondary">{m.rank}</span>
                  <span className="flex-1 text-sm font-medium">{m.name}</span>
                  <span className="font-num text-sm">
                    {formatINR(Math.round(m.amount * factor))}
                  </span>
                  <span className="ml-2 hidden h-1.5 w-20 overflow-hidden rounded-full bg-surface-alt md:block">
                    <span
                      className="block h-full bg-brand"
                      style={{ width: `${(m.amount / max) * 100}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-start gap-3 rounded-2xl tint-brand p-4 text-sm">
            <IconChip keyName="travel-card" size="sm" />
            <p>
              <span className="font-medium">Airlines</span> is your biggest category, and a Travel
              Card could earn ₹50,000/yr.
              <Link
                to="/spotlights/$id"
                params={{ id: "travel-card" }}
                className="ml-1 font-semibold text-brand"
              >
                See Spotlight ▸
              </Link>
            </p>
          </div>
        </section>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-lg font-semibold">Categories</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {cats.map((c) => (
            <Link
              key={c.id}
              to="/spending/$category"
              params={{ category: c.id }}
              className="card-spot flex flex-col gap-2 p-3 transition hover:-translate-y-0.5 hover:shadow-e2"
            >
              <IconChip keyName={c.id} size="md" />
              <span className="text-sm font-medium">{c.label}</span>
              <span className="font-num text-sm font-semibold">
                {formatINR(c.amount, { compact: true })}
              </span>
              <span className="text-xs text-text-secondary">{c.share}% of spend</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="card-spot mt-6 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">Balance trend ({months} months)</h2>
          <Tip k="balanceTrend" />
        </div>
        <BalanceTrend values={trend} />
        <p className="mt-2 text-xs text-text-secondary">
          Average balance growing steadily ▲, which is exactly why the FD opportunity exists.
        </p>
      </section>
    </div>
  );
}
