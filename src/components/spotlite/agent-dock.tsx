import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, PlayCircle, Activity } from "lucide-react";
import { useDemo } from "@/store/demo-store";
import { answerForQuestion } from "@/data/rohan";

const HIDDEN_ROUTES = ["/", "/login", "/consent", "/upload", "/processing"];

const statuses = [
  "Watching your accounts for new signals…",
  "Re-scoring opportunities by confidence…",
  "Picking the best time to reach you…",
  "Learning from what you opened today…",
];

export function SpotliteAgentDock() {
  const nav = useNavigate();
  const { startTour, tourStep, setConversation } = useDemo();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setStatusIdx((i) => (i + 1) % statuses.length), 2600);
    return () => clearInterval(t);
  }, [open]);

  if (HIDDEN_ROUTES.includes(path) || tourStep >= 0) return null;

  function ask(question: string) {
    if (!question.trim()) return;
    setConversation((prev) => [
      ...prev,
      { who: "user", text: question },
      { who: "bot", answer: answerForQuestion(question) },
    ]);
    setQ("");
    setOpen(false);
    nav({ to: "/coach" });
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[20rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-border bg-surface shadow-e2"
          >
            <div className="bg-brand px-4 py-3 text-on-brand">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">Spotlite Agent</p>
                    <p className="flex items-center gap-1 text-[11px] opacity-80">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 pulse-dot" /> always
                      on
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-full p-1 hover:bg-white/15"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div className="rounded-2xl bg-surface-alt p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                  <Activity className="h-3 w-3" /> Doing now
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm">
                  {statuses[statusIdx]}
                  <span className="ml-0.5 inline-flex gap-0.5">
                    <span
                      className="thinking-dot h-1 w-1 rounded-full bg-brand-secondary"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="thinking-dot h-1 w-1 rounded-full bg-brand-secondary"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="thinking-dot h-1 w-1 rounded-full bg-brand-secondary"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                </p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  startTour();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-2.5 text-sm font-semibold text-on-brand shadow-brand"
              >
                <PlayCircle className="h-4 w-4" /> Start the 60-sec guided demo
              </button>

              <div className="flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && ask(q)}
                  placeholder="Ask me about your money…"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
                <button
                  onClick={() => ask(q)}
                  aria-label="Send"
                  className="rounded-full bg-brand-gradient p-1.5 text-on-brand"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Spotlite Agent"
        className="agent-float relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-on-brand shadow-brand"
      >
        <span
          className="absolute inset-0 rounded-full pulse-dot"
          style={{ boxShadow: "0 0 0 0 oklch(0.5 0.2 320 / 0.5)" }}
        />
        <Sparkles className="h-6 w-6" />
      </button>
    </div>
  );
}
