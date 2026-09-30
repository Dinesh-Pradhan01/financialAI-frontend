import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FilePlus2, ChevronsRight, ChevronsLeft } from "lucide-react";
import { VAULT_SECTIONS } from "../lib/vaultManifest";
import { cn } from "@/shared/lib/utils";

interface DocumentCategoryNavTabsProps {
  otherDocumentsCount?: number;
  activeCategoryId?: string;
  activeSectionId?: string;
  className?: string;
}

/**
 * A horizontal tab bar that navigates between the 7 top-level vault sections
 * (/documents/$sectionId) plus custom/other records.
 */
export function DocumentCategoryNavTabs({
  otherDocumentsCount = 0,
  activeCategoryId,
  activeSectionId,
  className,
}: DocumentCategoryNavTabsProps) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const effectiveActive = activeSectionId || activeCategoryId;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasMoreRight = el.scrollWidth - el.clientWidth - el.scrollLeft > 3;
    const hasMoreLeft = el.scrollLeft > 3;
    setCanScrollRight((prev) => (prev !== hasMoreRight ? hasMoreRight : prev));
    setCanScrollLeft((prev) => (prev !== hasMoreLeft ? hasMoreLeft : prev));
  }, []);

  useEffect(() => {
    if (effectiveActive && scrollRef.current) {
      const timeoutId = setTimeout(() => {
        if (!scrollRef.current) return;
        const activeElement = scrollRef.current.querySelector(
          `[data-section-id="${effectiveActive}"]`,
        ) as HTMLElement;
        if (activeElement) {
          const container = scrollRef.current;
          const scrollLeft = activeElement.offsetLeft - container.offsetLeft - 16;
          container.scrollTo({ left: scrollLeft, behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [effectiveActive]);

  const handleScrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = Math.max(200, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = Math.max(200, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => checkScroll());
      resizeObserver.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      resizeObserver?.disconnect();
    };
  }, [checkScroll]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1.5 rounded-xl border border-border-c/80 bg-surface-alt/40"
      >
        {VAULT_SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = effectiveActive === section.id;
          return (
            <button
              key={section.id}
              type="button"
              data-section-id={section.id}
              onClick={() => {
                if (isActive) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }
                void navigate({
                  to: "/documents/$sectionId",
                  params: { sectionId: section.id },
                });
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer border",
                isActive
                  ? "bg-surface text-text-primary shadow-xs border-border-c/90 font-semibold"
                  : "text-text-secondary border-transparent hover:text-text-primary hover:bg-surface/70 hover:shadow-xs hover:border-border-c/60",
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-brand" />
              <span>{section.shortLabel}</span>
            </button>
          );
        })}

        {/* Other Documents tab */}
        <button
          type="button"
          data-section-id="other"
          onClick={() => {
            if (effectiveActive === "other") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }
            void navigate({ to: "/documents/other" });
          }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer border",
            effectiveActive === "other"
              ? "bg-surface text-text-primary shadow-xs border-border-c/90 font-semibold"
              : "text-text-secondary border-transparent hover:text-text-primary hover:bg-surface/70 hover:shadow-xs hover:border-border-c/60",
          )}
        >
          <FilePlus2 className="h-3.5 w-3.5 shrink-0 text-brand" />
          <span>Other</span>
          {otherDocumentsCount > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-surface-alt text-text-secondary border border-border-c">
              {otherDocumentsCount}
            </span>
          )}
        </button>
      </div>

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Scroll navigation tabs left"
          onClick={handleScrollLeft}
          className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-surface/90 border border-border-c/80 text-text-secondary hover:text-text-primary shadow-xs cursor-pointer"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          aria-label="Scroll navigation tabs right"
          onClick={handleScrollRight}
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-surface/90 border border-border-c/80 text-text-secondary hover:text-text-primary shadow-xs cursor-pointer"
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
