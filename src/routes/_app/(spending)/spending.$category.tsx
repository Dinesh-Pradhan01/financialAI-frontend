import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { rohan } from "@/shared/data/rohan";
import { formatINR } from "@/shared/lib/format";
import { IconChip } from "@/shared/lib/icons";

export const Route = createFileRoute("/_app/(spending)/spending/$category")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.category} spend · Spotlite` },
      { name: "description", content: "Transaction drill-down for this spending category." },
    ],
  }),
  component: CategoryDetail,
});

function CategoryDetail() {
  const { category } = Route.useParams();
  const cat = rohan.categories.find((c) => c.id === category);
  const txns = rohan.transactionsByCategory[category] ?? [];

  if (!cat) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary mb-4 shadow-xs">
          <ArrowLeft className="h-6 w-6" />
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">Category Not Found</h1>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          The spending category <code className="rounded bg-surface-alt px-1.5 py-0.5 font-mono text-xs text-brand font-semibold">"{category}"</code> could not be found or has no recorded transactions.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/spending"
            className="inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-brand hover:opacity-95 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Spending Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 md:px-10">
      <Link to="/spending" className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowLeft className="h-4 w-4" /> Spending
      </Link>
      <header className="mt-4 flex items-center gap-3">
        <IconChip keyName={cat.id} size="lg" />
        <div>
          <h1 className="font-display text-2xl font-bold">{cat.label}</h1>
          <p className="mt-0.5 font-num text-xl font-bold">{formatINR(cat.amount)}</p>
          <p className="text-sm text-text-secondary">{cat.share}% of all spend · 12 months</p>
        </div>
      </header>

      <div className="card-spot mt-6 divide-y divide-border">
        {txns.length === 0 ? (
          <p className="p-6 text-center text-sm text-text-secondary">
            No detailed transactions for this category in the demo.
          </p>
        ) : (
          txns.map((t, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="text-sm font-medium">{t.merchant}</p>
                <p className="text-xs text-text-secondary">
                  {t.date} · {t.source}
                </p>
              </div>
              <p className="font-num text-sm font-semibold">{formatINR(t.amount)}</p>
            </div>
          ))
        )}
      </div>

      {category === "airlines" && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl tint-brand p-4 text-sm">
          <IconChip keyName="travel-card" size="sm" />
          <p>
            You paid on non-reward cards. An SBI Travel Card would have earned{" "}
            <span className="font-num font-semibold">₹50,000</span>.{" "}
            <Link
              to="/spotlights/$id"
              params={{ id: "travel-card" }}
              className="font-semibold text-brand"
            >
              See ▸
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
