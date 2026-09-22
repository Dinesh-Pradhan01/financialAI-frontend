import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, AlertCircle, RefreshCw, Receipt } from "lucide-react";
import { formatINR } from "@/shared/lib/format";
import { IconChip } from "@/shared/lib/icons";
import { useTransactions } from "@/features/spending/hooks/useTransactions";
import {
  aggregateByCategory,
  isExpense,
  getDateRangeForTimeframe,
  cleanMerchantName,
  getCategoryIconKey,
} from "@/features/spending/lib/aggregate";
import { useAppSelector } from "@/shared/store";
import { selectTimeframe } from "@/shared/store/selectors";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";

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
  const timeframe = useAppSelector(selectTimeframe);

  // Timeframe bound synchronized with parent spending page
  const { date_from, date_to } = useMemo(
    () => getDateRangeForTimeframe(timeframe),
    [timeframe],
  );

  const { data, isLoading, isError, error, refetch } = useTransactions({
    date_from,
    date_to,
    classification: "expense",
    limit: 1000,
  });

  const allTransactions = data?.transactions ?? [];

  // Match category from the dynamic aggregate list
  const categories = useMemo(
    () => aggregateByCategory(allTransactions),
    [allTransactions],
  );

  const cat = useMemo(
    () =>
      categories.find(
        (c) =>
          c.id.toLowerCase() === category.toLowerCase() ||
          c.label.toLowerCase() === category.toLowerCase(),
      ),
    [categories, category],
  );

  // Filter individual transactions belonging to this category
  const txns = useMemo(
    () =>
      allTransactions.filter((t) => {
        if (!isExpense(t)) return false;
        const iconKey = getCategoryIconKey(t.category);
        return (
          iconKey.toLowerCase() === category.toLowerCase() ||
          t.category.toLowerCase() === category.toLowerCase()
        );
      }),
    [allTransactions, category],
  );

  if (isLoading) {
    return (
      <div className="px-5 py-6 md:px-10 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-5 w-24" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
        <div className="card-spot divide-y divide-border/60 p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-5 py-12 max-w-lg mx-auto text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-3">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="font-display text-lg font-bold text-foreground">
          Failed to Load Category Details
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          {error instanceof Error ? error.message : "Unable to fetch category transactions."}
        </p>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="mt-4 inline-flex items-center gap-2 rounded-xl text-xs font-semibold cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Retry
        </Button>
      </div>
    );
  }

  if (!cat && txns.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary mb-4 shadow-xs">
          <Receipt className="h-8 w-8 text-brand" />
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">
          Category Not Found
        </h1>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          The spending category{" "}
          <code className="rounded bg-surface-alt px-1.5 py-0.5 font-mono text-xs text-brand font-semibold">
            "{category}"
          </code>{" "}
          has no recorded transactions in the selected {timeframe} window.
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

  const categoryLabel = cat?.label ?? (category.charAt(0).toUpperCase() + category.slice(1));
  const categoryTotal = cat?.amount ?? txns.reduce((sum, t) => sum + (Number(t.debit_amount) || 0), 0);
  const categoryShare = cat?.share ?? 0;
  const categoryIconKey = cat?.id ?? getCategoryIconKey(category);

  return (
    <div className="px-5 py-6 md:px-10 max-w-5xl mx-auto">
      <Link
        to="/spending"
        className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Spending Overview
      </Link>

      <header className="mt-2 flex items-center gap-4 bg-surface p-6 rounded-2xl border border-border/80 shadow-xs">
        <IconChip keyName={categoryIconKey} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold">{categoryLabel}</h1>
            <span className="text-[0.65rem] font-medium text-text-secondary px-2 py-0.5 rounded-pill bg-surface-alt border border-border/60">
              {timeframe} Range
            </span>
          </div>
          <p className="mt-1 font-num text-2xl font-bold text-foreground">
            {formatINR(categoryTotal)}
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            {categoryShare}% of all spend · {txns.length} {txns.length === 1 ? "transaction" : "transactions"}
          </p>
        </div>
      </header>

      {/* Transaction List */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="font-display text-base font-semibold">Transaction Ledger</h2>
          <span className="text-xs text-text-secondary">{txns.length} records</span>
        </div>

        <div className="card-spot divide-y divide-border/60 overflow-hidden">
          {txns.length === 0 ? (
            <p className="p-8 text-center text-sm text-text-secondary">
              No individual transactions found for this category in the selected timeframe.
            </p>
          ) : (
            txns.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-surface-alt/40 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate text-foreground">
                    {cleanMerchantName(t.narration)}
                  </p>
                  <p className="text-xs text-text-secondary truncate mt-0.5">
                    {t.transaction_date} · {t.narration}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-num text-sm font-bold text-foreground">
                    {formatINR(t.debit_amount)}
                  </p>
                  <span className="text-[0.65rem] font-medium text-text-secondary">
                    {t.reference_number || t.utr_upi_ref || "Direct Debit"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
