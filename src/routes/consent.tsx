import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title: "Your data, your rules · Spotlite" },
      {
        name: "description",
        content: "DPDP-aligned consent. Revocable, purpose-bound, plain language.",
      },
    ],
  }),
  component: Consent,
});

function Consent() {
  const nav = useNavigate();
  const [read, setRead] = useState(true);
  const [detect, setDetect] = useState(true);
  const [offers, setOffers] = useState(false);
  const ready = read && detect;
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-8">
      <Link to="/login" className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="mt-6 font-display text-3xl font-bold">Your data, your rules</h1>
      <p className="mt-2 text-text-secondary">
        To find money you're missing, Spotlite needs to read your bank statements. Here's the deal:
      </p>

      <div className="mt-6 space-y-3">
        <ConsentRow
          checked={read}
          setChecked={setRead}
          title="Read transactions to build my insights"
          required
        />
        <ConsentRow
          checked={detect}
          setChecked={setDetect}
          title="Detect opportunities & life events"
          required
        />
        <ConsentRow
          checked={offers}
          setChecked={setOffers}
          title="Allow SBI to send me matched offers"
        />
      </div>

      <div className="mt-6 rounded-2xl bg-surface-alt p-4 text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="h-4 w-4 text-success" /> Our promise
        </p>
        <ul className="mt-2 space-y-1 text-text-secondary">
          <li>We never sell your data</li>
          <li>You can delete everything anytime</li>
          <li>Powered by RBI Account Aggregator (Phase 2)</li>
        </ul>
      </div>

      <p className="mt-3 text-xs text-text-secondary">
        Read the full <a className="underline">privacy policy ▸</a>
      </p>

      <div className="mt-auto pt-8">
        <button
          disabled={!ready}
          onClick={() => nav({ to: "/upload" })}
          className="w-full rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand disabled:opacity-40"
        >
          I Agree & Continue
        </button>
      </div>
    </div>
  );
}

function ConsentRow({
  checked,
  setChecked,
  title,
  required,
}: {
  checked: boolean;
  setChecked: (v: boolean) => void;
  title: string;
  required?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-surface p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="mt-0.5 h-5 w-5 accent-[oklch(0.31_0.16_273)]"
      />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-text-secondary">
          {required ? "Required" : "Optional, off by default"}
        </p>
      </div>
    </label>
  );
}
