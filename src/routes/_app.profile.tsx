import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ShieldCheck } from "lucide-react";
import { rohan } from "@/data/rohan";
import { explainers } from "@/data/agentic";
import { formatINR } from "@/lib/format";
import { WellnessSubScoreCard } from "@/components/spotlite/wellness-gauge";
import { AgentNarration } from "@/components/spotlite/agent-narration";
import { FinancialDNA } from "@/components/spotlite/financial-dna";
import { RelationshipHealth } from "@/components/spotlite/relationship-health";
import { ExplainTip } from "@/components/spotlite/explain-tip";
import { IconChip } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Customer 360 · Spotlite" },
      {
        name: "description",
        content:
          "Customer 360: identity, net worth, personas, relationships, cash flow and wellness.",
      },
    ],
  }),
  component: Profile,
});

function Tip({ k }: { k: keyof typeof explainers }) {
  const e = explainers[k];
  return (
    <ExplainTip agent={e.agent} title={e.title} evidence={e.evidence}>
      {e.text}
    </ExplainTip>
  );
}

function SectionHead({ title, k }: { title: string; k: keyof typeof explainers }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <Tip k={k} />
    </div>
  );
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 flex items-start gap-2 rounded-xl tint-brand px-3 py-2 text-xs text-text-primary">
      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" />
      <span>{children}</span>
    </p>
  );
}

function Profile() {
  const { user } = useAuth();
  const id = rohan.identity;
  const nw = rohan.netWorth;
  const assetTotal = nw.assets.reduce((s, a) => s + a.amount, 0);

  const displayName = user?.full_name || (user?.email ? user.email.split("@")[0] : rohan.name);
  const displayEmail = user?.email || id.email;
  const initials = (user?.full_name
    ? user.full_name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2)
    : displayName.slice(0, 2)
  ).toUpperCase();

  return (
    <div className="px-5 py-6 md:px-10">
      {/* Identity header */}
      <header className="card-spot flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-2xl font-bold text-on-brand">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h1 className="font-display text-2xl font-bold">{displayName}</h1>
            <span className="inline-flex items-center gap-1 rounded-pill bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success">
              <ShieldCheck className="h-3 w-3" /> KYC {id.kyc}
            </span>
            {user?.role && (
              <span className="inline-block rounded-pill bg-brand/10 px-2 py-0.5 text-[11px] font-bold text-brand uppercase tracking-wider">
                {user.role}
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary">
            {rohan.city} · {rohan.age} · {rohan.gender} · {rohan.occupation}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[
              id.segment,
              `Customer since ${id.memberSince}`,
              `${id.relationshipYears} yrs with SBI`,
              id.riskProfile,
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-pill border border-border bg-surface px-2.5 py-0.5 text-[11px] font-medium text-text-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-4">
        <AgentNarration agent="intelligence">
          This is your Customer 360. I unified {rohan.banks.length} relationships across{" "}
          {new Set(rohan.banks.map((b) => b.bank)).size} banks into one view, identity, money,
          behaviour and risk, then explained how I know each part.
        </AgentNarration>
      </div>

      {/* Key metrics */}
      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KeyStat
          label="Wellness score"
          value={`${rohan.wellness}`}
          caption={`/ 100 · ${rohan.wellnessTrend} this month`}
          k="wellness"
        />
        <KeyStat
          label="Credit score"
          value={`${id.creditScore}`}
          caption={id.creditBand}
          k="creditScore"
        />
        <KeyStat
          label="Net worth"
          value={formatINR(nw.total, { compact: true })}
          caption={`▲ ${nw.changePct}% this year`}
          k="netWorth"
        />
        <KeyStat
          label="Financial age"
          value={`${id.financialAge}`}
          caption={`${rohan.age - id.financialAge} yrs younger than you`}
          k="personas"
        />
      </section>

      {/* Identity details */}
      <section className="mt-6">
        <h2 className="mb-3 font-display text-lg font-semibold">Identity & relationship</h2>
        <div className="card-spot grid grid-cols-2 gap-x-8 gap-y-4 p-5 sm:grid-cols-3 lg:grid-cols-4">
          <Fact label="Relationship manager" value={id.relationshipManager} />
          <Fact label="Home branch" value={id.branch} />
          <Fact label="Employer" value={id.employer} />
          <Fact label="Marital status" value={id.maritalStatus} />
          <Fact label="Dependents" value={`${id.dependents}`} />
          <Fact label="Risk profile" value={id.riskProfile} />
          <Fact label="PAN" value={id.pan} />
          <Fact label="Mobile" value={id.mobile} />
          <Fact label="Email" value={displayEmail} />
          <Fact label="Customer since" value={id.memberSince} />
        </div>
      </section>

      {/* Net worth + personas (left) · DNA + goals (right) */}
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          <section>
            <SectionHead title="Net worth" k="netWorth" />
            <div className="card-spot p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-text-secondary">Estimated net worth</p>
                  <p className="font-display text-3xl font-bold font-num">
                    {formatINR(nw.total, { compact: true })}
                  </p>
                </div>
                <span className="text-xs font-semibold text-success">
                  ▲ {nw.changePct}% this year
                </span>
              </div>

              <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
                <NetWorthDonut assets={nw.assets} total={assetTotal} />
                <div className="w-full flex-1">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    Assets
                  </p>
                  <div className="space-y-2.5">
                    {nw.assets.map((a, i) => (
                      <LegendRow
                        key={a.label}
                        color={NW_COLORS[i % NW_COLORS.length]}
                        label={a.label}
                        note={a.note}
                        amount={a.amount}
                      />
                    ))}
                  </div>
                  <div className="mt-3 space-y-2.5 border-t border-border pt-3">
                    {nw.liabilities.map((l) => (
                      <LegendRow
                        key={l.label}
                        color="var(--danger)"
                        label={l.label}
                        note={l.note}
                        amount={l.amount}
                        negative
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Insight>{rohan.insights.netWorth}</Insight>
          </section>

          {/* Who you are — directly under net worth */}
          <section>
            <SectionHead title="Who you are, to the data" k="personas" />
            <div className="space-y-3">
              {rohan.personas.map((p) => (
                <div key={p.id} className="card-spot flex items-center gap-3 p-3">
                  <Ring value={p.match} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <IconChip keyName={p.id} size="sm" />
                      <p className="truncate text-sm font-semibold">{p.label}</p>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">{p.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <section>
            <SectionHead title="Your Financial DNA" k="financialDNA" />
            <FinancialDNA variant="radar" showDrivers />
            <Insight>{rohan.insights.personas}</Insight>
          </section>

          {/* Goals — directly under DNA */}
          <section>
            <SectionHead title="Your goals" k="goals" />
            <div className="space-y-3">
              {rohan.goals.map((g) => (
                <div key={g.id} className="card-spot p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{g.label}</p>
                    <span
                      className={cn(
                        "rounded-pill px-2 py-0.5 text-[10px] font-semibold",
                        goalTone(g.status),
                      )}
                    >
                      {g.status}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-alt">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${g.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-text-secondary">
                    <span>{g.note}</span>
                    <span className="shrink-0 font-num">Target {g.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Banking relationships + cash flow */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section>
          <SectionHead title="Banking relationship health" k="relationship" />
          <RelationshipHealth />
          <Insight>{rohan.insights.relationship}</Insight>
        </section>

        <section>
          <SectionHead title="Cash flow (monthly avg)" k="cashflow" />
          <div className="card-spot space-y-3 p-4">
            <Row label="Income" value={rohan.cashflow.income} highlight="up" />
            <SubRows items={rohan.cashflow.incomeBreakdown} />
            <Row label="Expenses" value={rohan.cashflow.expenses} />
            <SubRows items={rohan.cashflow.expenseBreakdown} />
            <div className="mt-2 border-t border-border pt-3">
              <Row label="Disposable" value={rohan.cashflow.disposable} highlight="up" />
              <div className="mt-2 flex gap-4 text-xs text-text-secondary">
                <span>
                  Savings rate{" "}
                  <span className="font-num font-semibold text-text-primary">
                    {rohan.cashflow.savingsRate}%
                  </span>
                </span>
                <span>
                  Debt ratio{" "}
                  <span className="font-num font-semibold text-text-primary">
                    {rohan.cashflow.debtRatio}%
                  </span>
                </span>
              </div>
            </div>
          </div>
          <Insight>{rohan.insights.cashflow}</Insight>
        </section>
      </div>

      {/* Wellness breakdown */}
      <section className="mt-6">
        <SectionHead title="Wellness breakdown" k="wellness" />
        <WellnessSubScoreCard items={rohan.subscores} />
        <Insight>{rohan.insights.wellness}</Insight>
      </section>
    </div>
  );
}

function KeyStat({
  label,
  value,
  caption,
  k,
}: {
  label: string;
  value: string;
  caption: string;
  k: keyof typeof explainers;
}) {
  return (
    <div className="card-spot p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-text-secondary">{label}</p>
        <Tip k={k} />
      </div>
      <p className="mt-1 font-display text-2xl font-bold font-num">{value}</p>
      <p className="mt-0.5 text-xs text-text-secondary">{caption}</p>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-text-secondary">{label}</p>
      <p className="mt-0.5 text-sm font-medium leading-snug text-text-primary">{value}</p>
    </div>
  );
}

const NW_COLORS = ["var(--brand-primary)", "var(--brand-secondary)", "var(--success)"];

/** Donut of asset allocation; centre shows total assets. */
function NetWorthDonut({
  assets,
  total,
}: {
  assets: { label: string; amount: number }[];
  total: number;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="relative shrink-0" style={{ width: 140, height: 140 }}>
      <svg width={140} height={140} viewBox="0 0 140 140" className="-rotate-90">
        <circle cx={70} cy={70} r={r} fill="none" stroke="var(--surface-alt)" strokeWidth={18} />
        {assets.map((a, i) => {
          const portion = total > 0 ? a.amount / total : 0;
          const dash = c * portion;
          const offset = -c * acc;
          acc += portion;
          return (
            <circle
              key={a.label}
              cx={70}
              cy={70}
              r={r}
              fill="none"
              stroke={NW_COLORS[i % NW_COLORS.length]}
              strokeWidth={18}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[10px] uppercase tracking-wider text-text-secondary">Assets</p>
        <p className="font-num text-lg font-bold">{formatINR(total, { compact: true })}</p>
      </div>
    </div>
  );
}

function LegendRow({
  color,
  label,
  note,
  amount,
  negative,
}: {
  color: string;
  label: string;
  note?: string;
  amount: number;
  negative?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
      <span className="min-w-0 flex-1 truncate">
        <span className="font-medium">{label}</span>
        {note && <span className="ml-1.5 text-xs text-text-secondary">{note}</span>}
      </span>
      <span className={cn("shrink-0 font-num font-semibold", negative && "text-danger")}>
        {negative ? "−" : ""}
        {formatINR(amount)}
      </span>
    </div>
  );
}

/** Circular percentage ring, used for persona match strength. */
function Ring({ value }: { value: number }) {
  const size = 48;
  const sw = 5;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--surface-alt)"
          strokeWidth={sw}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-num text-[11px] font-semibold">
        {value}
      </span>
    </div>
  );
}

function goalTone(status: string): string {
  if (status === "Done") return "bg-success/12 text-success";
  if (status === "On track") return "bg-brand/10 text-brand";
  return "bg-severity-moderate/15 text-severity-moderate";
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: "up" | "down";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <span className="font-num font-semibold">
        {formatINR(value)} {highlight === "up" && <span className="text-success">▲</span>}
      </span>
    </div>
  );
}
function SubRows({ items }: { items: { label: string; amount: number }[] }) {
  return (
    <div className="ml-4 space-y-1 text-sm text-text-secondary">
      {items.map((i) => (
        <div key={i.label} className="flex justify-between">
          <span>└ {i.label}</span>
          <span className="font-num">{formatINR(i.amount)}</span>
        </div>
      ))}
    </div>
  );
}
