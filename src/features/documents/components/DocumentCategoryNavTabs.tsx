import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FilePlus2, ChevronsRight } from "lucide-react";
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
 * Features a sleek, non-blocking right-edge horizontal scroll affordance
 * indicating when more categories exist off-screen.
 */
export function DocumentCategoryNavTabs({
  otherDocumentsCount = 0,
  className,
}: DocumentCategoryNavTabsProps) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Account for fractional pixel values
    const hasMore = el.scrollWidth - el.clientWidth - el.scrollLeft > 3;
    setCanScrollRight((prev) => (prev !== hasMore ? hasMore : prev));
  }, []);

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

      {/* Clearly visible right-edge horizontal scroll affordance */}
      <div
        className={cn(
          "pointer-events-none absolute right-px top-px bottom-px w-14 sm:w-16 rounded-r-xl",
          "flex items-center justify-end pr-2",
          "bg-linear-to-l from-sky-500/45 via-sky-500/25 to-transparent",
          "transition-opacity duration-300 ease-out",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      >
        <div className="flex items-center text-brand animate-scroll-hint motion-reduce:animate-none">
          <ChevronsRight className="h-4 w-4 stroke-[2.5] drop-shadow-xs" />
        </div>
      </div>
    </div>
  );
}
