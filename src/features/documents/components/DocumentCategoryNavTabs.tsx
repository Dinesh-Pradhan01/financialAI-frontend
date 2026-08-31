import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FilePlus2, ChevronsRight, ChevronsLeft } from "lucide-react";
import { DOCUMENT_CATEGORIES } from "../lib/documentTaxonomy";
import { cn } from "@/shared/lib/utils";

interface DocumentCategoryNavTabsProps {
  otherDocumentsCount?: number;
  activeCategoryId?: string;
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
  activeCategoryId,
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

  useEffect(() => {
    if (activeCategoryId && scrollRef.current) {
      // Small delay to ensure layout is complete before calculating scroll position
      const timeoutId = setTimeout(() => {
        if (!scrollRef.current) return;
        const activeElement = scrollRef.current.querySelector(
          `[data-category-id="${activeCategoryId}"]`
        ) as HTMLElement;
        if (activeElement) {
          const container = scrollRef.current;
          const scrollLeft = activeElement.offsetLeft - container.offsetLeft - 16;
          container.scrollTo({ left: scrollLeft, behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [activeCategoryId]);

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
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              type="button"
              data-category-id={category.id}
              onClick={() => {
                if (isActive) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }
                navigate({
                  to: "/documents/$categoryId",
                  params: { categoryId: category.id },
                });
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer border",
                isActive
                  ? "bg-surface text-text-primary shadow-xs border-border/90 font-semibold"
                  : "text-text-secondary border-transparent hover:text-text-primary hover:bg-surface/70 hover:shadow-xs hover:border-border/60",
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
          data-category-id="other"
          onClick={() => {
            if (activeCategoryId === "other") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              return;
            }
            navigate({ to: "/documents/other" });
          }}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer border",
            activeCategoryId === "other"
              ? "bg-surface text-text-primary shadow-xs border-border/90 font-semibold"
              : "text-text-secondary border-transparent hover:text-text-primary hover:bg-surface/70 hover:shadow-xs hover:border-border/60",
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
          "pointer-events-none absolute left-px top-px bottom-px w-16 sm:w-20 rounded-l-xl",
          "flex items-center justify-start pl-1",
          "bg-linear-to-r from-background via-background/90 to-transparent",
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
            "flex items-center justify-center h-6 w-6 rounded-md bg-surface border border-border shadow-sm text-text-secondary hover:text-brand hover:border-brand/30 active:scale-90 transition-all",
            canScrollLeft ? "pointer-events-auto cursor-pointer" : "pointer-events-none",
            "animate-scroll-hint-left motion-reduce:animate-none",
          )}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Right-edge horizontal scroll affordance & button */}
      <div
        className={cn(
          "pointer-events-none absolute right-px top-px bottom-px w-16 sm:w-20 rounded-r-xl",
          "flex items-center justify-end pr-1",
          "bg-linear-to-l from-background via-background/90 to-transparent",
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
            "flex items-center justify-center h-6 w-6 rounded-md bg-surface border border-border shadow-sm text-text-secondary hover:text-brand hover:border-brand/30 active:scale-90 transition-all",
            canScrollRight ? "pointer-events-auto cursor-pointer" : "pointer-events-none",
            "animate-scroll-hint motion-reduce:animate-none",
          )}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
