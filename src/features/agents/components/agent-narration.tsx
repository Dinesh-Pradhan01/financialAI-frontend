import { Sparkles } from "lucide-react";
import { agentByKey, type AgentKey } from "@/shared/data/agentic";
import { cn } from "@/shared/lib/utils";

/** Small pill that attributes something to one of the five agents. */
export function AgentBadge({ agent, className }: { agent: AgentKey; className?: string }) {
  const a = agentByKey(agent);
  const Icon = a.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill bg-brand-secondary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-secondary",
        className,
      )}
    >
      <Icon className="h-3 w-3" strokeWidth={2.3} />
      {a.label}
    </span>
  );
}

/** Ambient per-screen narration banner — the agent "speaking first". */
export function AgentNarration({
  agent,
  children,
  className,
}: {
  agent: AgentKey;
  children: React.ReactNode;
  className?: string;
}) {
  const a = agentByKey(agent);
  const Icon = a.icon;
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-brand-secondary/15 bg-brand-secondary/[0.06] px-4 py-3",
        className,
      )}
    >
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-on-brand">
        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
      </span>
      <p className="text-sm leading-snug text-text-primary">
        <span className="font-semibold text-brand-secondary">{a.label}:</span>{" "}
        <span className="text-text-secondary">{children}</span>
      </p>
    </div>
  );
}

/** Confidence bar used on trigger detail. */
export function ConfidenceMeter({ value }: { value: number }) {
  const color =
    value >= 85
      ? "var(--success)"
      : value >= 70
        ? "var(--severity-moderate)"
        : "var(--severity-low)";
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary">
        <Sparkles className="h-3 w-3 text-brand-secondary" /> Confidence
      </span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-alt">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="font-num text-sm font-semibold" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}
