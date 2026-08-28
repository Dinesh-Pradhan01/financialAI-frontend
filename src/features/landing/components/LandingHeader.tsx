import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X, Zap, Globe } from "lucide-react";
import { NAV_LINKS, type Currency } from "../data/landing-data";
import { cn } from "@/shared/lib/utils";

interface LandingHeaderProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenSandbox?: () => void;
}

export function LandingHeader({
  mobileOpen,
  setMobileOpen,
  currency,
  setCurrency,
  onOpenSandbox,
}: LandingHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("platform");

  useEffect(() => {
    const sectionIds = ["platform", "modules", "roles", "how-it-works", "pricing", "security"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 lg:h-18 max-w-7xl 2xl:max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Brand Logo */}
        <a href="#platform" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
            <Zap size={20} className="fill-current text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-display tracking-tight text-foreground">
              Spot<span className="text-primary">Lite</span>
            </span>
            <span className="text-[0.625rem] font-bold uppercase tracking-widest text-slate-500 -mt-1 font-mono">
              Intelligence
            </span>
          </div>
        </a>

        {/* Desktop Nav with Active Scrollspy */}
        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-normal transition-all relative py-1",
                  isActive
                    ? "text-primary font-bold"
                    : "text-slate-600 hover:text-foreground",
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions: Currency Switcher + CTAs */}
        <div className="hidden items-center gap-3 sm:gap-3.5 sm:flex shrink-0">
          {/* Currency Toggle */}
          <div className="inline-flex items-center rounded-lg border border-border-c bg-surface-alt/70 p-0.5 text-xs font-mono font-semibold">
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs transition-all cursor-pointer",
                currency === "INR"
                  ? "bg-surface text-primary font-bold shadow-2xs"
                  : "text-slate-500 hover:text-foreground",
              )}
              title="Switch to Indian Rupee (₹ INR)"
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs transition-all cursor-pointer",
                currency === "USD"
                  ? "bg-surface text-primary font-bold shadow-2xs"
                  : "text-slate-500 hover:text-foreground",
              )}
              title="Switch to US Dollars ($ USD)"
            >
              $ USD
            </button>
          </div>

          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 px-2.5 py-1.5 transition-colors hover:text-foreground"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-semibold tracking-[-0.005em] text-white shadow-xs shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-md hover:shadow-primary/35 active:scale-[0.98]"
          >
            <span>Book Executive Demo</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile Actions: Currency + Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="inline-flex items-center rounded-lg border border-border-c bg-surface-alt/70 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
              className="px-2 py-1 font-bold text-primary flex items-center gap-1 text-[11px]"
            >
              <Globe size={12} />
              {currency}
            </button>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-border bg-white px-6 py-5 shadow-xl lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-foreground hover:text-primary py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-4 border-t border-border">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-muted-foreground font-semibold">Display Currency</span>
                <div className="inline-flex items-center rounded-lg border border-border bg-surface-alt p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setCurrency("INR")}
                    className={cn(
                      "px-2.5 py-1 rounded text-xs",
                      currency === "INR" ? "bg-white font-bold text-primary shadow-xs" : "text-muted-foreground",
                    )}
                  >
                    ₹ INR
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={cn(
                      "px-2.5 py-1 rounded text-xs",
                      currency === "USD" ? "bg-white font-bold text-primary shadow-xs" : "text-muted-foreground",
                    )}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-border py-2.5 text-center text-sm font-semibold text-foreground hover:bg-muted"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary py-2.5 text-center text-sm font-bold text-white shadow-md shadow-primary/25"
              >
                Book Executive Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
