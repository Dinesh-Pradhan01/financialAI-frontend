import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, PlayCircle, Lock } from "lucide-react";
import { useDemo } from "@/store/demo-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spotlite: Your money, finally understood" },
      {
        name: "description",
        content: "An agentic financial intelligence layer for SBI customers.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const { startTour } = useDemo();
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-brand px-6 py-12 text-on-brand">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-white/14 blur-3xl" />
        <div className="absolute -right-24 bottom-32 h-96 w-96 rounded-full bg-white/8 blur-3xl" />
      </div>
      <div className="relative mt-24 flex flex-col items-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur agent-float">
          <Sparkles className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-5xl font-bold tracking-tight">Spotlite</h1>
        <p className="mt-3 max-w-xs text-center text-lg opacity-90">
          Your money, finally understood.
        </p>
        <p className="mt-2 max-w-xs text-center text-sm opacity-70">
          The agentic intelligence layer between your financial life and your bank.
        </p>
      </div>

      <div className="relative w-full max-w-sm space-y-3">
        <Link
          to="/login"
          className="block w-full rounded-pill bg-white py-3 text-center text-sm font-semibold text-brand shadow-e2"
        >
          Get started
        </Link>
        <button
          onClick={startTour}
          className="flex w-full items-center justify-center gap-2 rounded-pill border border-white/40 bg-white/10 py-3 text-center text-sm font-semibold text-on-brand backdrop-blur transition hover:bg-white/20"
        >
          <PlayCircle className="h-4 w-4" /> Start guided demo
        </button>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs opacity-70">
          <Lock className="h-3 w-3" /> Bank-grade · DPDP-compliant · You own your data
        </p>
      </div>
    </div>
  );
}
