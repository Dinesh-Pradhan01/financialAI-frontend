import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Sparkles, PlayCircle } from "lucide-react";
import { useDemo } from "@/store/demo-store";
import { tourSteps, agentByKey, type TourPhase } from "@/data/agentic";
import { useAuth } from "@/contexts/AuthContext";

const PHASES: TourPhase[] = ["Understand", "Reason", "Act", "Learn"];
const ONBOARDING = ["/", "/login", "/signup", "/verify-email", "/consent", "/upload", "/processing"];

export function DemoTour() {
  const nav = useNavigate();
  const { tourStep, setTourStep, endTour } = useDemo();
  const active = tourStep >= 0 && tourStep < tourSteps.length;
  const step = active ? tourSteps[tourStep] : null;

  // Drive navigation from the active step.
  useEffect(() => {
    if (!step) return;
    (nav as (opts: { to: string; params?: Record<string, string> }) => void)({
      to: step.to,
      params: step.params,
    });
  }, [step, nav]);

  if (!step) return null;

  const isFirst = tourStep === 0;
  const isLast = tourStep === tourSteps.length - 1;
  const agent = step.agent ? agentByKey(step.agent) : null;
  const AgentIcon = agent?.icon ?? Sparkles;

  return (
    <AnimatePresence>
      <motion.div
        key="tour"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-end justify-center p-4 md:items-end md:pb-8"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface shadow-e2"
        >
          <div className="bg-brand px-5 py-4 text-on-brand">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <AgentIcon className="h-4.5 w-4.5" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{agent ? agent.label : "Spotlite"}</p>
                  <p className="text-[11px] opacity-80">Guided demo</p>
                </div>
              </div>
              <button
                onClick={endTour}
                aria-label="Close tour"
                className="rounded-full p-1 hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* phase rail */}
            <div className="mt-3 flex items-center gap-1.5">
              {PHASES.map((p) => (
                <div key={p} className="flex-1">
                  <div
                    className={`h-1 rounded-full ${p === step.phase ? "bg-white" : "bg-white/30"}`}
                  />
                  <p
                    className={`mt-1 text-[9px] uppercase tracking-wide ${p === step.phase ? "opacity-100" : "opacity-60"}`}
                  >
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-balance">{step.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{step.body}</p>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                Step{" "}
                <span className="font-num font-semibold text-text-primary">{tourStep + 1}</span> of{" "}
                {tourSteps.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={endTour}
                  className="rounded-pill px-3 py-2 text-xs font-medium text-text-secondary hover:bg-surface-alt"
                >
                  Skip
                </button>
                {!isFirst && (
                  <button
                    onClick={() => setTourStep(tourStep - 1)}
                    className="inline-flex items-center gap-1 rounded-pill border border-border px-3 py-2 text-xs font-medium hover:bg-surface-alt"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                )}
                <button
                  onClick={() => (isLast ? endTour() : setTourStep(tourStep + 1))}
                  className="inline-flex items-center gap-1 rounded-pill bg-brand-gradient px-4 py-2 text-xs font-semibold text-on-brand shadow-brand"
                >
                  {isLast ? "Finish" : "Next"} <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function IntroModal() {
  const { seenIntro, dismissIntro, startTour, tourStep } = useDemo();
  const { firebaseUser } = useAuth();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const onAppRoute = !ONBOARDING.includes(path);

  let isNewUser = false;
  if (firebaseUser && firebaseUser.metadata.creationTime && firebaseUser.metadata.lastSignInTime) {
    const creationTime = new Date(firebaseUser.metadata.creationTime).getTime();
    const lastSignInTime = new Date(firebaseUser.metadata.lastSignInTime).getTime();
    isNewUser = Math.abs(lastSignInTime - creationTime) < 120000;
  }

  const show = !seenIntro && onAppRoute && tourStep < 0 && isNewUser;

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={dismissIntro} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-e2"
      >
        <div className="bg-brand px-6 py-7 text-on-brand">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Sparkles className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-balance">
            Your bank sees its slice. Spotlite sees your whole financial life.
          </h2>
        </div>
        <div className="space-y-3 p-6">
          <p className="text-sm text-text-secondary">
            Spotlite reads a year of statements across every bank. Its AI agents{" "}
            <span className="font-medium text-text-primary">understand, reason, act and learn</span>
            , then surface the money you're leaving on the table.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={startTour}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand"
            >
              <PlayCircle className="h-4 w-4" /> Take the 60-sec guided tour
            </button>
            <button
              onClick={dismissIntro}
              className="rounded-pill border border-border py-3 text-sm font-semibold hover:bg-surface-alt"
            >
              Explore on my own
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
