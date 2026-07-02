import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { nextBestProducts } from "@/data/agentic";
import { IconChip } from "@/lib/icons";
import { AgentBadge } from "@/components/spotlite/agent-narration";
import { cn } from "@/lib/utils";

/** "What Spotlite would do next" — each move attributed to an agent. */
export function AgentMarketplace({ className }: { className?: string }) {
  return (
    <div className={cn("card-spot divide-y divide-border", className)}>
      {nextBestProducts.map((p) => {
        const body = (
          <div className="flex items-center gap-3 px-4 py-3">
            <IconChip keyName={p.iconKey} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{p.product}</p>
              <AgentBadge agent={p.agent} className="mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-surface-alt sm:block">
                <span className="block h-full bg-brand" style={{ width: `${p.score}%` }} />
              </span>
              <span className="w-9 text-right font-num text-sm font-semibold">{p.score}</span>
              {p.triggerId && <ArrowRight className="h-4 w-4 text-text-secondary" />}
            </div>
          </div>
        );
        return p.triggerId ? (
          <Link
            key={p.product}
            to="/spotlights/$id"
            params={{ id: p.triggerId }}
            className="block transition hover:bg-surface-alt"
          >
            {body}
          </Link>
        ) : (
          <div key={p.product} className="opacity-70">
            {body}
          </div>
        );
      })}
    </div>
  );
}
