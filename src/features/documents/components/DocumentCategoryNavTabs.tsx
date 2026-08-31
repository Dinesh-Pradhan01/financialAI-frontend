import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FilePlus2, ChevronsRight, ChevronsLeft } from "lucide-react";
import { DOCUMENT_CATEGORIES } from "../lib/documentTaxonomy";
import { cn } from "@/shared/lib/utils";

interface DocumentCategoryNavTabsProps {
  otherDocumentsCount?: number;
  className?: string;
}

/**
 * A simple horizontal tab bar that navigates to the existing per-category
 * page (/documents/$categoryId) when a tab is clicked.
 * The 9th tab leads to the other-documents upload section on the same page
 * (scrolls down to it).
 *
 * Features interactive right/left horizontal scroll affordances that scroll
 * smoothly when clicked and indicate when more categories exist off-screen.
 */
export function DocumentCategoryNavTabs({
  otherDocumentsCount = 0,
  className,
}: DocumentCategoryNavTabsProps) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Account for fractional pixel values
    const hasMoreRight = el.scrollWidth - el.clientWidth - el.scrollLeft > 3;
    const hasMoreLeft = el.scrollLeft > 3;
    setCanScrollRight((prev) => (prev !== hasMoreRight ? hasMoreRight : prev));
    setCanScrollLeft((prev) => (prev !== hasMoreLeft ? hasMoreLeft : prev));
  }, []);

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
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1.5 rounded-xl border border-border/80 bg-surface-alt/40"
      >
        {DOCUMENT_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                navigate({
                  to: "/documents/$categoryId",
                  params: { categoryId: category.id },
                })
              }
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer",
                "text-text-secondary hover:text-text-primary hover:bg-surface/70 hover:shadow-xs border border-transparent hover:border-border/60",
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{category.shortLabel}</span>
            </button>
          );
        })}

        {/* Other Documents tab — navigates to dedicated Other Documents page */}
        <button
          type="button"
          onClick={() => navigate({ to: "/documents/other" })}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer",
            "text-text-secondary hover:text-text-primary hover:bg-surface/70 hover:shadow-xs border border-transparent hover:border-border/60",
          )}
        >
          <FilePlus2 className="h-3.5 w-3.5 shrink-0 text-brand" />
          <span>Other Documents</span>
          {otherDocumentsCount > 0 && (
            <span className="text-[10px] font-mono tabular-nums px-1.5 rounded-full border bg-brand/10 text-brand border-brand/20 font-semibold">
              {otherDocumentsCount}
            </span>
          )}
        </button>
      </div>

      {/* Left-edge horizontal scroll affordance & button */}
      <div
        className={cn(
          "pointer-events-none absolute left-px top-px bottom-px w-12 sm:w-14 rounded-l-xl",
          "flex items-center justify-start pl-1",
          "bg-linear-to-r from-sky-500/40 via-sky-500/20 to-transparent",
          "transition-opacity duration-300 ease-out",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      >
        <button
          type="button"
          onClick={handleScrollLeft}
          aria-label="Scroll categories left"
          tabIndex={canScrollLeft ? 0 : -1}
          className={cn(
            "flex items-center justify-center h-6 w-6 rounded-md text-brand hover:text-brand-dark hover:bg-surface/90 hover:shadow-xs active:scale-90 transition-all",
            canScrollLeft ? "pointer-events-auto cursor-pointer" : "pointer-events-none",
            "animate-scroll-hint-left motion-reduce:animate-none",
          )}
        >
          <ChevronsLeft className="h-4 w-4 stroke-[2.5] drop-shadow-xs" />
        </button>
      </div>

      {/* Right-edge horizontal scroll affordance & button */}
      <div
        className={cn(
          "pointer-events-none absolute right-px top-px bottom-px w-12 sm:w-14 rounded-r-xl",
          "flex items-center justify-end pr-1",
          "bg-linear-to-l from-sky-500/45 via-sky-500/25 to-transparent",
          "transition-opacity duration-300 ease-out",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      >
        <button
          type="button"
          onClick={handleScrollRight}
          aria-label="Scroll categories right"
          tabIndex={canScrollRight ? 0 : -1}
          className={cn(
            "flex items-center justify-center h-6 w-6 rounded-md text-brand hover:text-brand-dark hover:bg-surface/90 hover:shadow-xs active:scale-90 transition-all",
            canScrollRight ? "pointer-events-auto cursor-pointer" : "pointer-events-none",
            "animate-scroll-hint motion-reduce:animate-none",
          )}
        >
          <ChevronsRight className="h-4 w-4 stroke-[2.5] drop-shadow-xs" />
        </button>
      </div>
    </div>
  );
}
