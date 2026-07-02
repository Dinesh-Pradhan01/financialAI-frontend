import { motion } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { agentByKey, agents, type AgentEvent } from "@/data/agentic";
import { cn } from "@/lib/utils";

function AgentAvatar({ agentKey, size = 28 }: { agentKey: AgentEvent["agent"]; size?: number }) {
  const a = agentByKey(agentKey);
  const Icon = a.icon;
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-gradient text-on-brand"
      style={{ width: size, height: size }}
    >
      <Icon style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={2.2} />
    </span>
  );
}

export function AgentActivityTimeline({ events, limit }: { events: AgentEvent[]; limit?: number }) {
  const list = limit ? events.slice(0, limit) : events;
  return (
    <ul className="space-y-3">
      {list.map((e, i) => {
        const a = agentByKey(e.agent);
        return (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <AgentAvatar agentKey={e.agent} />
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-sm leading-snug",
                  e.highlight ? "font-medium text-text-primary" : "text-text-secondary",
                )}
              >
                {e.text}
              </p>
              <p className="mt-0.5 text-[11px] text-text-secondary/80">
                {a.label} · {e.time}
              </p>
            </div>
            {e.highlight && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-success" />}
          </motion.li>
        );
      })}
    </ul>
  );
}

/** The observe -> think -> act -> learn loop, visualised as the 5 agents. */
export function AgentLoop() {
  return (
    <div className="card-spot p-5">
      <div className="flex flex-wrap items-stretch gap-2">
        {agents.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={a.key} className="flex items-center gap-2">
              <div className="flex w-32 flex-col items-center gap-2 rounded-2xl bg-surface-alt p-3 text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-on-brand">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="text-xs font-semibold leading-tight">{a.label}</p>
                <p className="text-[10px] leading-tight text-text-secondary">{a.tagline}</p>
              </div>
              {i < agents.length - 1 ? (
                <ArrowRight className="h-4 w-4 shrink-0 text-text-secondary" />
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-secondary">
                  <RefreshCw className="h-4 w-4" /> loops
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
