import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  UserRound,
  Landmark,
  TrendingUp,
  Receipt,
  Store,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { agents, evidenceBase } from "@/shared/data/agentic";
import { rohan } from "@/shared/data/rohan";
import { formatINR } from "@/shared/lib/format";

export const Route = createFileRoute("/(onboarding)/processing")({
  head: () => ({
    meta: [
      { title: "Building your financial graph · Spotlite" },
      {
        name: "description",
        content: "Reading transactions, classifying merchants, detecting opportunities.",
      },
    ],
  }),
  component: Processing,
});

// Satellite nodes wired up to the central "You" hub, in pentagon layout.
const SATELLITES: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "accounts", label: "Accounts", icon: Landmark },
  { key: "income", label: "Income", icon: TrendingUp },
  { key: "expenses", label: "Expenses", icon: Receipt },
  { key: "merchants", label: "Merchants", icon: Store },
  { key: "recurring", label: "Recurring", icon: Repeat },
];

// Live status, each line attributed to the agent doing the work.
const STEPS: { text: string }[] = [
  { text: `Parsing statements across ${evidenceBase.banks} banks` },
  { text: `Reading ${evidenceBase.transactions.toLocaleString("en-IN")} transactions` },
  { text: "Merging duplicate UPI entries" },
  { text: "Building your Unified Financial Graph" },
  { text: "Scoring wellness and personas" },
  { text: "Detecting life events and opportunities" },
];

const C = 160; // svg centre
const R = 112; // satellite radius
const HUB_R = 30; // progress ring radius
const RING_C = 2 * Math.PI * HUB_R;

function Processing() {
  const nav = useNavigate();
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(6);

  const points = useMemo(
    () =>
      SATELLITES.map((s, i) => {
        const angle = ((-90 + i * (360 / SATELLITES.length)) * Math.PI) / 180;
        return {
          ...s,
          x: C + R * Math.cos(angle),
          y: C + R * Math.sin(angle),
        };
      }),
    [],
  );

  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => Math.min(100, p + (p < 80 ? 2 : 1)));
    }, 70);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (pct >= 100) {
      const t = setTimeout(() => nav({ to: "/home" }), 1100);
      return () => clearTimeout(t);
    }
  }, [pct, nav]);

  const ready = pct >= 100;
  const activeAgent = Math.min(agents.length - 1, Math.floor((pct / 100) * agents.length));
  const stepIdx = ready
    ? STEPS.length
    : Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length));
  const reachedNodes = (pct / 100) * SATELLITES.length;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand px-6 text-on-brand">
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="agent-float absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
        <div className="agent-float absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-secondary/20 blur-3xl" />
      </div>

      <div className="relative flex w-full max-w-md flex-col items-center">
        <header className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/12 px-3 py-1 text-[11px] font-medium">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-white" />
            Agents at work
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-balance">
            Spotlite is reading your financial life
          </h1>
          <p className="mt-2 text-sm opacity-80">
            {evidenceBase.transactions.toLocaleString("en-IN")} transactions · {evidenceBase.banks}{" "}
            banks · {evidenceBase.months} months
          </p>
        </header>

        {/* Financial graph */}
        <div className="relative my-8 aspect-square w-[min(20rem,80vw)]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 320">
            {/* edges */}
            {points.map((p, i) => (
              <motion.line
                key={`edge-${p.key}`}
                x1={C}
                y1={C}
                x2={p.x}
                y2={p.y}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: "easeOut" }}
              />
            ))}

            {/* data pulses travelling along edges */}
            {!reduce &&
              points.map((p, i) => (
                <motion.circle
                  key={`pulse-${p.key}`}
                  r={2.6}
                  fill="#fff"
                  initial={{ cx: C, cy: C, opacity: 0 }}
                  animate={{
                    cx: [C, p.x],
                    cy: [C, p.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.8 + i * 0.18,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}

            {/* progress ring around hub */}
            <circle
              cx={C}
              cy={C}
              r={HUB_R}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={5}
            />
            <circle
              cx={C}
              cy={C}
              r={HUB_R}
              fill="none"
              stroke="#fff"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - pct / 100)}
              transform={`rotate(-90 ${C} ${C})`}
              style={{ transition: "stroke-dashoffset 0.18s linear" }}
            />
          </svg>

          {/* hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur"
              animate={reduce ? {} : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                {ready ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Check className="h-6 w-6" strokeWidth={2.6} />
                  </motion.span>
                ) : (
                  <motion.span key="user" exit={{ opacity: 0 }}>
                    <UserRound className="h-6 w-6" strokeWidth={2.2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* satellite labels */}
          {points.map((p, i) => {
            const active = reachedNodes > i || ready;
            return (
              <motion.div
                key={p.key}
                className="absolute flex w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                style={{ left: `${(p.x / 320) * 100}%`, top: `${(p.y / 320) * 100}%` }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ${
                    active
                      ? "bg-white text-brand shadow-[0_0_16px_rgba(255,255,255,0.55)]"
                      : "bg-white/15 text-white/70"
                  }`}
                >
                  <p.icon className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span
                  className={`text-[10px] font-medium transition-opacity ${active ? "opacity-100" : "opacity-50"}`}
                >
                  {p.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Agent pipeline */}
        <div className="flex w-full items-center justify-between">
          {agents.map((a, i) => {
            const Icon = a.icon;
            const done = i < activeAgent || ready;
            const current = i === activeAgent && !ready;
            return (
              <div key={a.key} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ${
                    done
                      ? "bg-white text-brand"
                      : current
                        ? "bg-white/25 text-white ring-2 ring-white/60"
                        : "bg-white/10 text-white/50"
                  } ${current && !reduce ? "pulse-dot" : ""}`}
                >
                  {done ? (
                    <Check className="h-4 w-4" strokeWidth={2.6} />
                  ) : (
                    <Icon className="h-4 w-4" strokeWidth={2.1} />
                  )}
                </span>
                <span
                  className={`text-center text-[9px] font-medium leading-tight transition-opacity ${
                    done || current ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {a.short}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live status */}
        <div className="mt-7 h-5 w-full text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={ready ? "done" : stepIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-sm font-medium"
            >
              {ready ? (
                <span>
                  Done. Found{" "}
                  <span className="font-num font-bold">{formatINR(rohan.totalFound)}</span> for you.
                </span>
              ) : (
                STEPS[stepIdx].text
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${pct}%`, transition: "width 0.18s linear" }}
          />
        </div>
        <p className="mt-2 font-num text-xs opacity-80">{pct}%</p>
      </div>
    </div>
  );
}
