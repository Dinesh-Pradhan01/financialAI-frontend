import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

export type DocumentsView = "grouped" | "table" | "packages";

export interface DocumentsViewToggleProps {
  activeView: DocumentsView;
  onChange: (view: DocumentsView) => void;
  className?: string;
}

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VIEWS: { id: DocumentsView; label: string }[] = [
  { id: "grouped", label: "Grouped" },
  { id: "table", label: "Table" },
  { id: "packages", label: "Packages" },
];

export function DocumentsViewToggle({
  activeView,
  onChange,
  className,
}: Readonly<DocumentsViewToggleProps>) {
  const buttonRefs = useRef<Map<DocumentsView, HTMLButtonElement>>(new Map());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % VIEWS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + VIEWS.length) % VIEWS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = VIEWS.length - 1;
    }

    if (nextIndex !== currentIndex) {
      const nextView = VIEWS[nextIndex].id;
      onChange(nextView);
      buttonRefs.current.get(nextView)?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Documents views"
      className={cn(
        "inline-flex items-center p-1 rounded-xl bg-surface-alt/50 border border-border-c/70 select-none",
        className,
      )}
    >
      {VIEWS.map(({ id, label }, index) => {
        const isActive = activeView === id;
        return (
          <button
            key={id}
            ref={(el) => {
              if (el) buttonRefs.current.set(id, el);
              else buttonRefs.current.delete(id);
            }}
            role="tab"
            id={`documents-view-tab-${id}`}
            aria-selected={isActive}
            aria-controls={`documents-view-panel-${id}`}
            tabIndex={isActive ? 0 : -1}
            type="button"
            onClick={() => onChange(id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "relative flex items-center justify-center px-3.5 sm:px-4 h-8 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="documents-view-indicator"
                className="absolute inset-0 rounded-lg bg-surface shadow-xs border border-border-c/60 z-0"
                transition={{ duration: 0.22, ease: EASING }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
