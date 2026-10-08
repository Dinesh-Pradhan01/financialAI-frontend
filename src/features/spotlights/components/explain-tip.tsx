import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { agentByKey, type AgentKey } from "@/shared/data/agentic";
import { cn } from "@/shared/lib/utils";

/**
 * A small agent-attributed "Why?" affordance. Click to reveal a popover that
 * explains how Spotlite derived what's on screen, with optional evidence.
 * Keeps explainability consistent and unobtrusive across every section.
 */
export function ExplainTip({
  agent,
  title = "Why Spotlite shows this",
  children,
  evidence,
  label = "Why?",
  align = "right",
  className,
}: {
  agent: AgentKey;
  title?: string;
  children: React.ReactNode;
  evidence?: string;
  label?: string;
  align?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const a = agentByKey(agent);
  const Icon = a.icon;

  return (
    <span className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={title}
        className={cn(
          "inline-flex items-center gap-1 rounded-pill border px-2.5 py-1 text-[11px] font-semibold transition",
          open
            ? "border-brand-secondary/40 bg-brand-secondary/10 text-brand-secondary"
            : "border-border bg-surface text-text-secondary hover:text-text-primary",
        )}
      >
        <Info className="h-3.5 w-3.5" />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 cursor-default"
            />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              role="dialog"
              className={cn(
                "absolute top-full z-40 mt-2 w-72 rounded-2xl border border-border bg-surface p-4 text-left shadow-e2",
                align === "right" ? "right-0" : "left-0",
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-on-brand">
                  <Icon className="h-3 w-3" strokeWidth={2.3} />
                </span>
                <span className="text-xs font-semibold text-brand-secondary">{a.label}</span>
              </div>
              <p className="text-xs font-semibold text-text-primary">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">{children}</p>
              {evidence && (
                <p className="mt-2 border-t border-border pt-2 text-[11px] text-text-secondary">
                  {evidence}
                </p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
