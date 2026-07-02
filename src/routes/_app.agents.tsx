import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { agents, agentActivity } from "@/data/agentic";
import { AgentActivityTimeline, AgentLoop } from "@/components/spotlite/agent-activity";
import { AgentNarration } from "@/components/spotlite/agent-narration";

export const Route = createFileRoute("/_app/agents")({
  head: () => ({
    meta: [
      { title: "Agents · Spotlite" },
      {
        name: "description",
        content: "The five Spotlite agents that observe, think, act and learn on your money.",
      },
    ],
  }),
  component: Agents,
});

function Agents() {
  return (
    <div className="px-5 py-6 md:px-10">
      <Link to="/home" className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>
      <header className="mt-4">
        <h1 className="font-display text-2xl font-bold">Your agents</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Spotlite isn't a dashboard you check. It's a team of agents working for you around the
          clock.
        </p>
      </header>

      <div className="mt-5">
        <AgentNarration agent="learning">
          We observe → think → act → learn in a loop. Every time you open, apply or snooze, I make
          the next nudge sharper.
        </AgentNarration>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-lg font-semibold">
          The observe → think → act → learn loop
        </h2>
        <div className="overflow-x-auto pb-1">
          <AgentLoop />
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.key} className="card-spot p-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-on-brand">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-semibold">{a.label}</p>
              <p className="mt-1 text-xs text-text-secondary">{a.tagline}</p>
            </div>
          );
        })}
      </section>

      <section className="card-spot mt-6 p-5">
        <h2 className="mb-4 font-display text-lg font-semibold">Recent activity</h2>
        <AgentActivityTimeline events={agentActivity} />
      </section>
    </div>
  );
}
