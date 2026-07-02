import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { answerForQuestion, coachSuggestions, type CoachAnswer } from "@/data/rohan";
import { CoachAnswerCard } from "@/components/spotlite/coach-answer";
import { useDemo } from "@/store/demo-store";

export const Route = createFileRoute("/_app/coach")({
  head: () => ({
    meta: [
      { title: "AI Coach · Spotlite" },
      {
        name: "description",
        content:
          "Ask Spotlite anything about your money. Answers come back as cards with numbers and mini-charts.",
      },
    ],
  }),
  component: Coach,
});

const thinkingSteps = [
  "Scanning your transactions",
  "Computing the numbers",
  "Drafting your answer",
];

function Coach() {
  const { conversation, setConversation } = useDemo();
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [conversation, thinking]);

  useEffect(() => {
    if (!thinking) return;
    setStepIdx(0);
    const t = setInterval(() => setStepIdx((i) => Math.min(thinkingSteps.length - 1, i + 1)), 380);
    return () => clearInterval(t);
  }, [thinking]);

  function send(q: string) {
    if (!q.trim() || thinking) return;
    const answer = answerForQuestion(q);
    setConversation((m) => [...m, { who: "user", text: q }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      setConversation((m) => [...m, { who: "bot", answer }]);
      setThinking(false);
    }, 1200);
  }

  const empty = conversation.length === 0 && !thinking;

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col px-5 py-4 md:h-screen md:px-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-on-brand">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <h1 className="font-display text-xl font-bold">Ask Spotlite</h1>
            <p className="text-[11px] text-text-secondary">Reasoning over your real numbers</p>
          </div>
        </div>
        {conversation.length > 0 && (
          <button
            onClick={() => setConversation(() => [])}
            className="inline-flex items-center gap-1 rounded-pill border border-border px-3 py-1.5 text-xs text-text-secondary hover:bg-surface-alt"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </header>

      <div ref={scrollRef} className="mt-4 flex-1 overflow-y-auto">
        {empty ? (
          <div className="mx-auto max-w-md py-8 text-center">
            <p className="text-text-secondary">Hi Rohan, ask me anything about your money.</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-text-secondary">
              Try
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {coachSuggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-pill border border-border bg-surface px-3 py-1.5 text-sm transition hover:bg-surface-alt"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {conversation.map((m, i) => (
              <div key={i} className={m.who === "user" ? "flex justify-end" : "flex justify-start"}>
                {m.who === "user" ? (
                  <p className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2 text-sm text-on-brand">
                    {m.text}
                  </p>
                ) : (
                  m.answer != null && <CoachAnswerCard answer={m.answer as CoachAnswer} />
                )}
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-2.5 shadow-e1">
                  <span className="inline-flex gap-1">
                    <span
                      className="thinking-dot h-1.5 w-1.5 rounded-full bg-brand-secondary"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="thinking-dot h-1.5 w-1.5 rounded-full bg-brand-secondary"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="thinking-dot h-1.5 w-1.5 rounded-full bg-brand-secondary"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                  <span className="text-xs text-text-secondary">{thinkingSteps[stepIdx]}…</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2 shadow-e1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Type a message…"
          className="flex-1 bg-transparent text-sm outline-none"
        />
        <button
          onClick={() => send(input)}
          aria-label="Send"
          className="rounded-full bg-brand p-2 text-on-brand disabled:opacity-50"
          disabled={thinking}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
