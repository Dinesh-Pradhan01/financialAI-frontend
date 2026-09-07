import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

export type DocumentsView = "registry" | "packages";

export interface DocumentsViewToggleProps {
  activeView: DocumentsView;
  onChange: (view: DocumentsView) => void;
  className?: string;
}

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function DocumentsViewToggle({
  activeView,
  onChange,
  className,
}: Readonly<DocumentsViewToggleProps>) {
  const registryRef = useRef<HTMLButtonElement>(null);
  const packagesRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    current: DocumentsView,
  ) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next: DocumentsView = current === "registry" ? "packages" : "registry";
      onChange(next);
      if (next === "registry") {
        registryRef.current?.focus();
      } else {
        packagesRef.current?.focus();
      }
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Documents views"
      className={cn(
        "inline-flex items-center p-1 rounded-xl bg-surface-alt/50 border border-border/70 select-none",
        className,
      )}
    >
      {/* Registry Segment */}
      <button
        ref={registryRef}
        role="tab"
        id="documents-view-tab-registry"
        aria-selected={activeView === "registry"}
        aria-controls="documents-view-panel-registry"
        tabIndex={activeView === "registry" ? 0 : -1}
        type="button"
        onClick={() => onChange("registry")}
        onKeyDown={(e) => handleKeyDown(e, "registry")}
        className={cn(
          "relative flex items-center justify-center w-28 sm:w-32 h-8 rounded-lg text-xs font-semibold cursor-pointer transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          activeView === "registry"
            ? "text-text-primary"
            : "text-text-secondary hover:text-text-primary",
        )}
      >
        {activeView === "registry" && (
          <motion.div
            layoutId="documents-view-indicator"
            className="absolute inset-0 rounded-lg bg-white dark:bg-surface shadow-sm border border-border/60 z-0"
            transition={{ duration: 0.25, ease: EASING }}
          />
        )}
        <span className="relative z-10">Registry</span>
      </button>

      {/* Packages Segment */}
      <button
        ref={packagesRef}
        role="tab"
        id="documents-view-tab-packages"
        aria-selected={activeView === "packages"}
        aria-controls="documents-view-panel-packages"
        tabIndex={activeView === "packages" ? 0 : -1}
        type="button"
        onClick={() => onChange("packages")}
        onKeyDown={(e) => handleKeyDown(e, "packages")}
        className={cn(
          "relative flex items-center justify-center w-28 sm:w-32 h-8 rounded-lg text-xs font-semibold cursor-pointer transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          activeView === "packages"
            ? "text-text-primary"
            : "text-text-secondary hover:text-text-primary",
        )}
      >
        {activeView === "packages" && (
          <motion.div
            layoutId="documents-view-indicator"
            className="absolute inset-0 rounded-lg bg-white dark:bg-surface shadow-sm border border-border/60 z-0"
            transition={{ duration: 0.25, ease: EASING }}
          />
        )}
        <span className="relative z-10">Packages</span>
      </button>
    </div>
  );
}
