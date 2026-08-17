import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { spotlightById } from "@/data/rohan";
import { formatINR } from "@/lib/format";
import { IconChip } from "@/lib/icons";
import { AgentBadge } from "@/components/spotlite/agent-narration";
import { Confetti } from "@/components/spotlite/confetti";
import { useAppDispatch } from "@/store";
import { applyTrigger } from "@/store/slices/spotlightsSlice";

export const Route = createFileRoute("/_app/spotlights/$id_/apply")({
  head: () => ({
    meta: [
      { title: "Apply · Spotlite" },
      {
        name: "description",
        content: "Apply for the recommended SBI product directly from Spotlite.",
      },
    ],
  }),
  component: Apply,
});

interface Control {
  id: string;
  label: string;
  kind: "number" | "select";
  value: number;
  options?: number[];
  prefix?: string;
  suffix?: string;
}

interface ApplyConfig {
  controls: Control[];
  statics: { label: string; value: string }[];
  estimate: (v: Record<string, number>) => { label: string; value: string; positive: boolean };
}

function configFor(id: string): ApplyConfig {
  switch (id) {
    case "fd":
      return {
        controls: [
          { id: "amount", label: "Deposit amount", kind: "number", value: 1200000, prefix: "₹" },
          {
            id: "tenure",
            label: "Tenure",
            kind: "select",
            value: 2,
            options: [1, 2, 3, 5],
            suffix: " yr",
          },
        ],
        statics: [
          { label: "Payout", value: "Cumulative" },
          { label: "From account", value: "SBI ····3421" },
          { label: "Rate", value: "7.0% p.a." },
        ],
        estimate: (v) => ({
          label: "Est. interest @ 7%",
          value: `${formatINR(Math.round(v.amount * 0.07))} / year`,
          positive: true,
        }),
      };
    case "travel-card":
      return {
        controls: [
          {
            id: "limit",
            label: "Credit limit",
            kind: "select",
            value: 500000,
            options: [300000, 500000, 800000],
            prefix: "₹",
          },
        ],
        statics: [
          { label: "Card", value: "SBI Travel Card" },
          { label: "Joining fee", value: "Waived (pre-approved)" },
          { label: "Rewards", value: "6× on airlines & hotels" },
        ],
        estimate: () => ({
          label: "Est. rewards on ₹5L travel",
          value: `${formatINR(61000)} / year`,
          positive: true,
        }),
      };
    case "home-loan":
      return {
        controls: [
          {
            id: "loan",
            label: "Loan amount",
            kind: "select",
            value: 10000000,
            options: [7500000, 10000000, 12500000],
            prefix: "₹",
          },
          {
            id: "tenure",
            label: "Tenure",
            kind: "select",
            value: 10,
            options: [10, 15, 20],
            suffix: " yr",
          },
        ],
        statics: [
          { label: "Rate", value: "8.4% p.a." },
          { label: "Lender", value: "SBI Home Loan" },
        ],
        estimate: (v) => {
          const r = 0.084 / 12;
          const n = v.tenure * 12;
          const emi = (v.loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          return {
            label: "Monthly EMI",
            value: `${formatINR(Math.round(emi))} / month`,
            positive: false,
          };
        },
      };
    case "sip":
      return {
        controls: [
          { id: "monthly", label: "Monthly SIP", kind: "number", value: 15000, prefix: "₹" },
          {
            id: "years",
            label: "Duration",
            kind: "select",
            value: 20,
            options: [10, 15, 20, 25],
            suffix: " yr",
          },
        ],
        statics: [
          { label: "Fund", value: "SBI Bluechip" },
          { label: "Debit date", value: "5th of month" },
        ],
        estimate: (v) => {
          const i = 0.12 / 12;
          const m = v.years * 12;
          const fv = v.monthly * ((Math.pow(1 + i, m) - 1) / i) * (1 + i);
          return {
            label: `Projected corpus @ 12%`,
            value: formatINR(Math.round(fv), { compact: true }),
            positive: true,
          };
        },
      };
    case "tax":
      return {
        controls: [
          {
            id: "amount",
            label: "Annual investment",
            kind: "select",
            value: 200000,
            options: [150000, 200000, 250000],
            prefix: "₹",
          },
        ],
        statics: [
          { label: "Instruments", value: "ELSS + NPS Tier 1" },
          { label: "Regime", value: "Old" },
        ],
        estimate: (v) => ({
          label: "Est. tax saved @ 30%",
          value: `${formatINR(Math.round(Math.min(v.amount, 200000) * 0.19))} / year`,
          positive: true,
        }),
      };
    case "insurance":
      return {
        controls: [
          {
            id: "cover",
            label: "Cover amount",
            kind: "select",
            value: 1000000,
            options: [500000, 1000000, 2000000],
            prefix: "₹",
          },
        ],
        statics: [
          { label: "Plan", value: "SBI Life · Health" },
          { label: "Members", value: "Self + Family" },
        ],
        estimate: (v) => ({
          label: "Est. premium",
          value: `${formatINR(Math.round(v.cover * 0.014))} / year`,
          positive: false,
        }),
      };
    default:
      return {
        controls: [],
        statics: [{ label: "From account", value: "SBI ····3421" }],
        estimate: () => ({ label: "Estimate", value: "N/A", positive: true }),
      };
  }
}

function Apply() {
  const { id } = Route.useParams();
  const dispatch = useAppDispatch();
  const t = spotlightById(id);
  const cfg = useMemo(() => configFor(id), [id]);
  const [vals, setVals] = useState<Record<string, number>>(() =>
    Object.fromEntries(cfg.controls.map((c) => [c.id, c.value])),
  );
  const [done, setDone] = useState(false);

  if (!t) return <div className="p-6">Spotlight not found.</div>;

  const est = cfg.estimate(vals);
  const ref = `SPL-${t.id.toUpperCase()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

  function confirm() {
    dispatch(applyTrigger(t!.id));
    setDone(true);
    toast.success(`${t!.recommendation.product} started`, {
      description: "The Interaction Agent will keep you posted. Wellness score updated.",
    });
  }

  if (done) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          <Confetti />
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-12 w-12" />
          </div>
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold">You're all set!</h1>
        <p className="mt-1 text-text-secondary">{t.recommendation.product} application started.</p>
        <p className="mt-2 font-num text-xs text-text-secondary">Ref #{ref}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-success/10 px-4 py-2 text-sm text-success">
          <Sparkles className="h-4 w-4" /> {est.label}:{" "}
          <span className="font-num font-semibold">{est.value}</span>
        </div>
        <p className="mt-4 max-w-xs text-sm text-text-secondary">
          Your wellness score just ticked up, and this Spotlight has dropped out of "money found".
        </p>
        <div className="mt-8 flex w-full flex-col gap-2">
          <Link
            to="/home"
            className="w-full rounded-pill bg-brand py-3 text-sm font-semibold text-on-brand shadow-brand"
          >
            Back to dashboard
          </Link>
          <Link
            to="/spotlights"
            className="w-full rounded-pill border border-border py-3 text-sm font-semibold"
          >
            See remaining Spotlights ▸
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-6">
      <Link
        to="/spotlights/$id"
        params={{ id }}
        className="flex items-center gap-2 text-sm text-text-secondary"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <IconChip keyName={t.id} size="lg" />
        <div>
          <h1 className="font-display text-2xl font-bold">{t.recommendation.product}</h1>
          <p className="text-sm text-text-secondary">{t.recommendation.copy}</p>
        </div>
      </div>

      <div className="mt-4">
        <AgentBadge agent="interaction" />
        <span className="ml-2 text-xs text-text-secondary">
          Pre-filled from your profile · adjust anything
        </span>
      </div>

      <div className="card-spot mt-4 space-y-4 p-5">
        {cfg.controls.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-4">
            <label className="text-sm text-text-secondary">{c.label}</label>
            {c.kind === "number" ? (
              <div className="flex items-center gap-1 rounded-pill border border-border bg-surface px-3 py-1.5">
                {c.prefix && <span className="text-sm text-text-secondary">{c.prefix}</span>}
                <input
                  type="number"
                  value={vals[c.id]}
                  onChange={(e) => setVals((v) => ({ ...v, [c.id]: Number(e.target.value) || 0 }))}
                  className="w-28 bg-transparent text-right font-num text-sm font-semibold outline-none"
                />
              </div>
            ) : (
              <select
                value={vals[c.id]}
                onChange={(e) => setVals((v) => ({ ...v, [c.id]: Number(e.target.value) }))}
                className="rounded-pill border border-border bg-surface px-3 py-1.5 font-num text-sm font-semibold outline-none"
              >
                {c.options!.map((o) => (
                  <option key={o} value={o}>
                    {c.prefix ?? ""}
                    {c.prefix ? formatINR(o, { compact: true }).replace("₹", "") : o}
                    {c.suffix ?? ""}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {cfg.statics.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between border-t border-border pt-3 text-sm"
          >
            <span className="text-text-secondary">{s.label}</span>
            <span className="font-num font-semibold">{s.value}</span>
          </div>
        ))}

        <div className="rounded-xl bg-surface-alt p-3">
          <p className="text-xs text-text-secondary">{est.label}</p>
          <p className="font-num text-xl font-bold">
            {est.value} {est.positive && <span className="text-sm text-success">▲</span>}
          </p>
        </div>
      </div>

      <button
        onClick={confirm}
        className="mt-6 w-full rounded-pill bg-brand py-3 text-sm font-semibold text-on-brand shadow-brand"
      >
        Confirm &amp; open {t.product}
      </button>
    </div>
  );
}
