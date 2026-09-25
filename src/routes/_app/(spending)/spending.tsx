import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { formatINR } from "@/shared/lib/format";
import { IconChip } from "@/shared/lib/icons";
import { AgentNarration } from "@/features/agents/components/agent-narration";
import { ExplainTip } from "@/features/spotlights/components/explain-tip";
import { ExecutiveSolvencyRibbon } from "@/features/spending/components/ExecutiveSolvencyRibbon";
import { SpendingDonut } from "@/features/spending/components/SpendingDonut";
import { SpendingSkeleton } from "@/features/spending/components/SpendingSkeleton";
import { UploadTransactionsCard } from "@/features/dashboard/components/UploadTransactionsCard";
import { StatementsList } from "@/features/spending/components/StatementsList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs";
import { FinancialIntelligenceTab } from "@/features/spending/components/FinancialIntelligenceTab";
import { SpotliteSpendingInsights } from "@/features/spending/components/SpotliteSpendingInsights";
import { HeaderMetadataPanel } from "@/features/spending/components/HeaderMetadataPanel";
import { SpendingIncomeTab } from "@/features/spending/components/SpendingIncomeTab";
import { SpendingExpenditureTab } from "@/features/spending/components/SpendingExpenditureTab";
import { useSpendingReport } from "@/features/spending/hooks/useSpendingReport";
import {
  useTransactions,
  useTransactionDocuments,
} from "@/features/spending/hooks/useTransactions";
import {
  computeTotalSpend,
  aggregateByCategory,
  aggregateByMerchant,
  aggregateMonthlyTrend,
  getDateRangeForTimeframe,
} from "@/features/spending/lib/aggregate";
import {
  getDisplayCategoryLabel,
  formatShare,
} from "@/features/spending/lib/categoryLabels";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { selectTimeframe } from "@/shared/store/selectors";
import { setTimeframe } from "@/shared/store/slices/preferencesSlice";
import { explainers } from "@/shared/data/agentic";
import { cn } from "@/shared/lib/utils";
import {
  AlertCircle,
  RefreshCw,
  Receipt,
  UploadCloud,
  Clock,
  Loader2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/shared/components/ui/tooltip";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function Tip({ k }: { k: keyof typeof explainers }) {
  const e = explainers[k];
  return (
    <ExplainTip agent={e.agent} title={e.title} evidence={e.evidence}>
      {e.text}
    </ExplainTip>
  );
}

/**
 * Accessible transaction count badge.
 * Provides hover tooltip on desktop and tap-to-toggle on touch devices,
 * stopping propagation so parent category links are not inadvertently triggered.
 */
function TxnBadge({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              setOpen((prev) => !prev);
            }
          }}
          className={cn(
            "text-[0.65rem] font-medium text-text-secondary px-2 py-0.5 rounded-pill bg-surface-alt transition-colors hover:text-foreground cursor-help select-none",
            className,
          )}
          aria-label={`${count} ${count === 1 ? "transaction" : "transactions"} (txns = transactions)`}
        >
          {count} {count === 1 ? "txn" : "txns"}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="text-xs font-medium z-50 py-1.5 px-2.5 shadow-e2"
        onClick={(e) => e.stopPropagation()}
      >
        <p>
          <span className="font-semibold">
            {count} {count === 1 ? "transaction" : "transactions"}
          </span>
          <span className="opacity-80 ml-1.5">· txns = transactions</span>
        </p>
      </TooltipContent>
    </Tooltip>
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

const TIMEFRAMES = ["3M", "6M", "12M"] as const;

function Spending() {
  const dispatch = useAppDispatch();
  const timeframe = useAppSelector(selectTimeframe);
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Derive date bounds from selected timeframe
  const { date_from, date_to } = useMemo(
    () => getDateRangeForTimeframe(timeframe),
    [timeframe],
  );

  // Live transaction data fetching (expenses)
  const { data, isLoading, isError, error, refetch } = useTransactions({
    date_from,
    date_to,
    classification: "expense",
    limit: 1000,
  });

  // Income transactions for Net Cash Flow in Executive Solvency Ribbon
  const { data: incomeData } = useTransactions({
    date_from,
    date_to,
    classification: "income",
    limit: 1000,
  });

  const { data: reportData } = useSpendingReport({ enabled: activeTab === "overview" });

  const transactions = data?.transactions ?? [];

  // Live total income across selected timeframe
  const totalIncome = useMemo(() => {
    const incTxns = incomeData?.transactions ?? [];
    if (incTxns.length > 0) {
      return incTxns.reduce((sum, t) => sum + (t.credit_amount || 0), 0);
    }
    return undefined;
  }, [incomeData]);

  // Live document fetching to determine state context
  const { data: documents = [], isLoading: isDocsLoading } = useTransactionDocuments();
  const processingDocs = useMemo(
    () => documents.filter((d) => d.status === "PENDING" || d.status === "PROCESSING"),
    [documents],
  );
  const hasProcessingDocs = processingDocs.length > 0;

  // Derived aggregates via pure selectors
  const total = useMemo(() => computeTotalSpend(transactions), [transactions]);
  const categories = useMemo(
    () => aggregateByCategory(transactions),
    [transactions],
  );
  const topMerchants = useMemo(
    () => aggregateByMerchant(transactions),
    [transactions],
  );
  const trend = useMemo(
    () => aggregateMonthlyTrend(transactions),
    [transactions],
  );

  // Safe derivation for biggest category callout
  const biggestCategory = categories[0];

  // Two-tier category partitioning (Tier 1: Top 8 cards, Tier 2: Collapsible compact list)
  const [isTier2Expanded, setIsTier2Expanded] = useState(false);
  const TIER1_COUNT = 8;
  const tier1Categories = useMemo(() => categories.slice(0, TIER1_COUNT), [categories]);
  const tier2Categories = useMemo(() => categories.slice(TIER1_COUNT), [categories]);
  const hasTier2 = tier2Categories.length > 0;

  const allTier2BelowOnePercent = useMemo(() => {
    if (tier2Categories.length === 0) return false;
    return tier2Categories.every((c) => {
      const pct = total > 0 ? (c.amount / total) * 100 : 0;
      return pct < 1;
    });
  }, [tier2Categories, total]);

  // Bar scale max based on actual top merchant amounts (safe, never assumes index 0 > 0)
  const maxMerchantAmount = useMemo(
    () => Math.max(...topMerchants.map((m) => m.amount), 1),
    [topMerchants],
  );

  const monthsCount = timeframe === "3M" ? 3 : timeframe === "6M" ? 6 : 12;

  return (
    <div className="px-5 py-6 md:px-10 max-w-7xl mx-auto">
      <header className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Spending</h1>
          <p className="text-xs text-text-secondary mt-1">
            Real-time aggregate expense tracking across your connected business bank accounts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          {documents.length > 0 && (
            <Link to="/upload">
              <Button size="sm" className="gap-1.5 rounded-xl text-xs font-semibold cursor-pointer min-h-[36px] px-3.5">
                <UploadCloud className="h-3.5 w-3.5" />
                <span>Upload Statement</span>
              </Button>
            </Link>
          )}
          <div className="inline-flex rounded-pill border border-border bg-surface p-0.5 shadow-xs">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => dispatch(setTimeframe(tf))}
                className={cn(
                  "relative rounded-pill px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer min-h-[32px] sm:min-h-0 flex items-center justify-center",
                  timeframe === tf
                    ? "text-on-brand"
                    : "text-text-secondary hover:text-foreground",
                )}
              >
                {timeframe === tf && (
                  <motion.span
                    layoutId="activeTimeframePill"
                    className="absolute inset-0 rounded-pill bg-brand shadow-e1"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 500, damping: 35 }
                    }
                  />
                )}
                <span className="relative z-10">{tf}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="h-10 p-1 bg-surface-alt/70 border border-border/70 rounded-xl inline-flex self-start mb-6 overflow-x-auto max-w-full">
          <TabsTrigger
            value="overview"
            className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-xs"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="income"
            className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-xs"
          >
            Income
          </TabsTrigger>
          <TabsTrigger
            value="expenditure"
            className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-xs"
          >
            Expenditure
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
          <motion.div
            key="overview-tab-view"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Loading State */}
      {isLoading && <SpendingSkeleton />}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center my-6 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">
            Failed to Load Transactions
          </h3>
          <p className="text-xs text-text-secondary mt-1 max-w-md mx-auto">
            {error instanceof Error ? error.message : "Unable to reach the transaction service. Please verify your connection."}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="mt-4 inline-flex items-center gap-2 rounded-xl text-xs font-semibold cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry Fetch
          </Button>
        </div>
      )}

      {/* Active Content States */}
      {!isLoading && !isError && (
        <>
          {/* Elevated Bank Statement Header Metadata Panel at the very top */}
          {reportData?.section_1_header_metadata && (
            <div className="mb-6">
              <HeaderMetadataPanel
                metadata={reportData.section_1_header_metadata}
                documentsCount={documents.length}
              />
            </div>
          )}

          {/* Executive Solvency & Liquidity Ribbon */}
          {documents.length > 0 && (
            <ExecutiveSolvencyRibbon
              timeframe={timeframe}
              monthsCount={monthsCount}
              totalExpense={total}
              totalIncome={totalIncome}
              reportData={reportData}
              isLoading={isLoading}
            />
          )}

          {/* Agent Narration Dynamic Callout */}
          <div className="mb-6">
            <AgentNarration agent="intelligence">
              {biggestCategory ? (
                <>
                  <strong className="font-semibold text-foreground">
                    {getDisplayCategoryLabel(biggestCategory.label)}
                  </strong>{" "}
                  is{" "}
                  <strong className="font-semibold text-foreground">
                    {formatShare(biggestCategory.share, biggestCategory.amount)}
                  </strong>{" "}
                  of your spend (
                  {formatINR(biggestCategory.amount, { compact: true })}), your single biggest expense category over the last {timeframe}.
                </>
              ) : hasProcessingDocs ? (
                "Bank statement processing is underway. Our agents are currently structuring your transactions and calculating expense categorizations."
              ) : documents.length > 0 ? (
                `No debit outflows detected in the last ${timeframe}. Switch to a wider timeframe or upload new statements to review category movements.`
              ) : (
                "Upload and process bank statements to unlock automated category clustering, vendor tracking, and proactive savings opportunities."
              )}
            </AgentNarration>
          </div>

          {/* Multi-Scenario Empty & Processing States */}
          {transactions.length === 0 ? (
            documents.length === 0 ? (
              /* Scenario 1: Brand new user with 0 statements uploaded */
              <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-8 md:p-12 text-center my-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt border border-border text-brand mb-4 shadow-xs">
                  <Receipt className="h-7 w-7" />
                </div>
                <h2 className="font-display text-lg md:text-xl font-bold text-foreground">
                  No Bank Statements Uploaded Yet
                </h2>
                <p className="mt-1.5 text-sm text-text-secondary max-w-lg mx-auto">
                  Upload your PDF bank statements to automatically extract transactions, cluster expense categories, and gain deep visibility into your company&apos;s cash outflows.
                </p>
                <div className="mt-6 flex justify-center">
                  <Link to="/upload">
                    <Button className="inline-flex items-center gap-2 rounded-xl bg-brand text-white text-xs font-semibold px-5 py-2.5 shadow-brand hover:opacity-95 cursor-pointer">
                      <UploadCloud className="h-4 w-4" /> Upload Statement Now
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-6 border-t border-border/50 text-left">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-alt/60">
                    <div className="h-2 w-2 rounded-full bg-brand mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Instant Parsing</p>
                      <p className="text-[0.7rem] text-text-secondary">Extracts banking narrations & balances with zero manual entry.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-alt/60">
                    <div className="h-2 w-2 rounded-full bg-success mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Auto-Categorization</p>
                      <p className="text-[0.7rem] text-text-secondary">Classifies outflows into OPEX, COGS, tax, and payroll.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-alt/60">
                    <div className="h-2 w-2 rounded-full bg-brand-secondary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Merchant Analytics</p>
                      <p className="text-[0.7rem] text-text-secondary">Identifies top vendor spend and monthly burn trends.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : hasProcessingDocs ? (
              /* Scenario 2: User has uploaded bank statements that are currently processing */
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 md:p-10 text-center my-6 shadow-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3 shadow-xs">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  Statements Are Currently Processing
                </h2>
                <p className="mt-1.5 text-sm text-text-secondary max-w-md mx-auto">
                  {processingDocs.length} bank statement{processingDocs.length > 1 ? "s are" : " is"} currently being parsed by the extraction engine. Your transaction ledgers and spending breakdowns will populate here automatically once processing completes.
                </p>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-pill bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 text-xs font-semibold border border-blue-500/20">
                    <Clock className="h-3.5 w-3.5" />
                    Extraction in progress…
                  </span>
                  <Button
                    onClick={() => refetch()}
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3 mr-1.5" /> Check Status
                  </Button>
                </div>
              </div>
            ) : (
              /* Scenario 3: Statements exist and are completed, but 0 transactions in selected timeframe */
              <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-8 md:p-10 text-center my-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-alt border border-border text-text-secondary mb-3 shadow-xs">
                  <Receipt className="h-6 w-6 text-brand" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  No Expense Transactions in This {timeframe} Period
                </h2>
                <p className="mt-1.5 text-sm text-text-secondary max-w-lg mx-auto">
                  You have {documents.length} bank statement{documents.length > 1 ? "s" : ""} on file, but no expense records match the dates ({date_from} to {date_to}). Try expanding the timeframe or upload a more recent statement.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  {TIMEFRAMES.filter((tf) => tf !== timeframe).map((tf) => (
                    <Button
                      key={tf}
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(setTimeframe(tf))}
                      className="rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      View {tf} History
                    </Button>
                  ))}
                  <Link to="/upload">
                    <Button
                      size="sm"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand text-white text-xs font-semibold px-4 py-2 shadow-brand hover:opacity-95 cursor-pointer"
                    >
                      <UploadCloud className="h-3.5 w-3.5" />
                      Upload Newer Statement
                    </Button>
                  </Link>
                </div>
              </div>
            )
          ) : (
            <>
              {/* Where Money Goes: Donut */}
              <section className="card-spot p-5 flex flex-col justify-between mb-8">
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">Where your money goes</p>
                    <Tip k="spendingDonut" />
                  </div>
                  <SpendingDonut categories={categories} total={total} />
                </div>
              </section>

              {/* Category Grid Section */}
              <TooltipProvider delayDuration={150}>
                <section className="mt-8">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-display text-lg font-semibold">Categories</h2>
                        <span className="text-xs text-text-secondary">
                          {categories.length} {categories.length === 1 ? "category" : "categories"} identified
                        </span>
                        <span className="text-xs text-text-secondary/50 font-medium">·</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                }
                              }}
                              className="text-xs text-text-secondary hover:text-foreground underline decoration-dotted decoration-text-secondary/60 underline-offset-2 cursor-help transition-colors select-none"
                            >
                              txns = transactions
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            &quot;txns&quot; stands for transactions recorded in your statements.
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      {hasTier2 && (
                        <p className="text-xs text-text-secondary mt-0.5">
                          {isTier2Expanded
                            ? `Showing all ${categories.length} categories`
                            : allTier2BelowOnePercent
                              ? `Top 8 shown — ${tier2Categories.length} more below 1% each`
                              : `Top 8 shown — ${tier2Categories.length} more categories`}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tier 1: Top 8 Category Cards */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {tier1Categories.map((c) => (
                      <Link
                        key={c.id}
                        to="/spending/$category"
                        params={{ category: c.id }}
                        className="card-spot flex flex-col gap-2 p-3.5 transition hover:-translate-y-0.5 hover:shadow-e2 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <IconChip keyName={c.id} size="md" />
                          <TxnBadge count={c.count} />
                        </div>
                        <span className="text-sm font-semibold truncate group-hover:text-brand transition-colors">
                          {getDisplayCategoryLabel(c.label)}
                        </span>
                        <span className="font-num tabular-nums text-sm font-bold text-foreground">
                          -{formatINR(c.amount, { compact: true })}
                        </span>
                        <span className="text-xs text-text-secondary font-medium">
                          {formatShare(c.share, c.amount)} of spend
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Tier 2: Collapsible Accordion for Remaining Categories */}
                  {hasTier2 && (
                    <div className="mt-4 flex flex-col gap-3">
                      <div className="flex justify-center">
                        <button
                          type="button"
                          id="tier2-categories-toggle"
                          aria-expanded={isTier2Expanded}
                          aria-controls="tier2-categories-list"
                          onClick={() => setIsTier2Expanded((prev) => !prev)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill border border-border/70 bg-surface text-xs font-semibold text-text-secondary hover:text-foreground hover:bg-surface-alt hover:border-border transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        >
                          <span>
                            {isTier2Expanded
                              ? `Hide ${tier2Categories.length} categories`
                              : `Show ${tier2Categories.length} more categories`}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 text-text-secondary transition-transform duration-200",
                              isTier2Expanded && "rotate-180",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {isTier2Expanded && (
                          <motion.div
                            key="tier2-content"
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, height: 0 }
                            }
                            animate={{ opacity: 1, height: "auto" }}
                            exit={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, height: 0 }
                            }
                            transition={{
                              duration: 0.28,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden flex flex-col gap-3"
                          >
                            <div
                              id="tier2-categories-list"
                              role="region"
                              aria-labelledby="tier2-categories-toggle"
                              className="card-spot divide-y divide-border/60 overflow-hidden"
                            >
                              {tier2Categories.map((c) => (
                                <Link
                                  key={c.id}
                                  to="/spending/$category"
                                  params={{ category: c.id }}
                                  className="flex items-center justify-between gap-3 px-4 py-2.5 sm:py-3 transition hover:bg-surface-alt/60 cursor-pointer group"
                                >
                                  <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <IconChip keyName={c.id} size="sm" />
                                    <span className="text-xs sm:text-sm font-semibold truncate group-hover:text-brand transition-colors text-foreground">
                                      {getDisplayCategoryLabel(c.label)}
                                    </span>
                                    <TxnBadge
                                      count={c.count}
                                      className="hidden sm:inline-flex shrink-0"
                                    />
                                  </div>

                                  <div className="flex items-center gap-3 sm:gap-4 shrink-0 tabular-nums">
                                    <TxnBadge count={c.count} className="sm:hidden px-1.5" />
                                    <span className="font-num tabular-nums text-xs sm:text-sm font-bold text-foreground">
                                      -{formatINR(c.amount)}
                                    </span>
                                    <span className="min-w-[2.5rem] text-right text-xs text-text-secondary font-medium font-num">
                                      {formatShare(c.share, c.amount)}
                                    </span>
                                    <ChevronRight className="h-3.5 w-3.5 text-text-secondary/50 group-hover:text-brand group-hover:translate-x-0.5 transition-all hidden sm:block" />
                                  </div>
                                </Link>
                              ))}
                            </div>

                            <div className="flex justify-center pt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsTier2Expanded(false);
                                  const el = document.getElementById("tier2-categories-toggle");
                                  el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                  el?.focus();
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-foreground transition-colors cursor-pointer"
                              >
                                <span>Hide {tier2Categories.length} categories</span>
                                <ChevronDown className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </section>
              </TooltipProvider>

              {/* Spotlite Executive Intelligence: Risk Signals, Anomalies & Outliers */}
              <div className="mt-8 pt-6 border-t border-border/60">
                <SpotliteSpendingInsights />
              </div>

              {/* Merged Financial Intelligence Section */}
              <div className="mt-8 pt-6 border-t border-border/60">
                <FinancialIntelligenceTab
                  isActive={activeTab === "overview"}
                  documentsCount={documents.length}
                />
              </div>
            </>
          )}
        </>
      )}

        {/* Section 2: Statements (Upload & Extracted Ledger) */}
        <StatementsList />
          </motion.div>
      </TabsContent>

      <TabsContent value="income" className="mt-0 focus-visible:outline-none">
        <motion.div
          key="income-tab-view"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpendingIncomeTab
            isActive={activeTab === "income"}
            timeframe={timeframe}
            date_from={date_from}
            date_to={date_to}
          />
        </motion.div>
      </TabsContent>

      <TabsContent value="expenditure" className="mt-0 focus-visible:outline-none">
        <motion.div
          key="expenditure-tab-view"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpendingExpenditureTab
            isActive={activeTab === "expenditure"}
            timeframe={timeframe}
            date_from={date_from}
            date_to={date_to}
          />
        </motion.div>
      </TabsContent>
    </Tabs>
  </div>
  );
}
