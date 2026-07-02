import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { rohan } from "@/data/rohan";
import { wrapped } from "@/data/agentic";
import { PersonaStoryCard } from "@/components/spotlite/persona";

export const Route = createFileRoute("/_app/wrapped")({
  head: () => ({
    meta: [
      { title: "Money Wrapped · Spotlite" },
      { name: "description", content: "Your year in money, Spotify-Wrapped style." },
    ],
  }),
  component: Wrapped,
});

const accents = [
  "linear-gradient(135deg, oklch(0.3 0.1 269), oklch(0.35 0.1 276))",
  "linear-gradient(135deg, oklch(0.29 0.09 258), oklch(0.34 0.09 270))",
  "linear-gradient(135deg, oklch(0.31 0.08 245), oklch(0.35 0.1 260))",
  "linear-gradient(135deg, oklch(0.3 0.11 278), oklch(0.34 0.11 288))",
  "linear-gradient(135deg, oklch(0.3 0.09 230), oklch(0.34 0.1 245))",
];

function Wrapped() {
  const [idx, setIdx] = useState(0);
  const persona = rohan.personas[idx];
  return (
    <div className="px-5 py-6 md:px-10">
      <Link to="/home" className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold">Money Wrapped</h1>
      <p className="text-sm text-text-secondary">Your top 5 personas, this year.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-[420px_1fr]">
        <div className="relative">
          <div className="aspect-[3/4] max-w-sm">
            <PersonaStoryCard persona={persona} accent={accents[idx % accents.length]} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="rounded-full border border-border bg-surface p-2 disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {rohan.personas.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-brand" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => Math.min(rohan.personas.length - 1, i + 1))}
              disabled={idx === rohan.personas.length - 1}
              className="rounded-full border border-border bg-surface p-2 disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-lg font-semibold">Your {wrapped.year}, wrapped</h2>
          <div className="grid grid-cols-2 gap-3">
            {wrapped.stats.map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} caption={s.caption} />
            ))}
          </div>

          <button
            onClick={() =>
              toast.success("Wrapped card ready", {
                description: `Your "${persona.label}" card was saved to share.`,
              })
            }
            className="mt-2 inline-flex items-center gap-2 rounded-pill bg-brand px-4 py-2 text-sm font-semibold text-on-brand shadow-brand"
          >
            <Share2 className="h-4 w-4" /> Share my Wrapped
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, caption }: { label: string; value: string; caption?: string }) {
  return (
    <div className="card-spot p-4">
      <p className="text-xs uppercase tracking-wider text-text-secondary">{label}</p>
      <p className="font-display text-lg font-bold font-num">{value}</p>
      {caption && <p className="text-xs text-text-secondary">{caption}</p>}
    </div>
  );
}
