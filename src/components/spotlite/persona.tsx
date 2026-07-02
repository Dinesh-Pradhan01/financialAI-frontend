import { Link } from "@tanstack/react-router";
import type { Persona } from "@/data/rohan";
import { cn } from "@/lib/utils";
import { iconFor } from "@/lib/icons";

export function PersonaChip({ persona }: { persona: Persona }) {
  const { icon: Icon, color } = iconFor(persona.id);
  return (
    <Link
      to="/wrapped"
      className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-border bg-surface py-1.5 pl-1.5 pr-3 text-sm shadow-e1 transition hover:bg-surface-alt"
    >
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full"
        style={{ backgroundColor: `color-mix(in oklch, ${color} 16%, transparent)`, color }}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
      </span>
      <span className="font-medium">{persona.label}</span>
      <span className="font-num text-xs text-text-secondary">{persona.match}%</span>
    </Link>
  );
}

export function PersonaStoryCard({ persona, accent }: { persona: Persona; accent?: string }) {
  const { icon: Icon } = iconFor(persona.id);
  const circumference = 2 * Math.PI * 22;
  return (
    <div
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 text-on-brand shadow-e2"
      style={{ background: accent ?? "var(--brand-gradient)" }}
    >
      {/* decorative glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/15 blur-2xl" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] opacity-80">
          Your #{persona.rank} persona
        </p>
        <div className="mt-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
          <Icon className="h-12 w-12" strokeWidth={1.8} />
        </div>
        <h2 className="mt-5 font-display text-3xl font-bold uppercase tracking-tight">
          {persona.label}
        </h2>
        <p className="mt-3 max-w-xs text-base opacity-90">{persona.blurb}</p>
      </div>

      <div className="relative mt-8 flex items-end justify-between">
        <div>
          <p className="text-xs opacity-70">match</p>
          <p className="font-display text-4xl font-bold font-num">{persona.match}%</p>
        </div>
        <svg width={56} height={56} className="-rotate-90">
          <circle
            cx={28}
            cy={28}
            r={22}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={5}
            fill="none"
          />
          <circle
            cx={28}
            cy={28}
            r={22}
            stroke="white"
            strokeWidth={5}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - persona.match / 100)}
          />
        </svg>
      </div>
    </div>
  );
}
