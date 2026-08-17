import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X, Zap } from "lucide-react";
import { NAV_LINKS } from "./landing-data";

interface LandingHeaderProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export function LandingHeader({ mobileOpen, setMobileOpen }: LandingHeaderProps) {
  return (
    <>
      {/* Top Banner Notice */}
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-900 via-primary to-blue-800 px-4 py-2 text-center text-xs font-semibold text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            New Feature: Instant Financial Copilot & Live Anomaly Radar 2.0
          </span>
          <a
            href="#modules"
            className="hidden items-center gap-1 font-bold underline underline-offset-2 hover:text-blue-100 sm:inline-flex"
          >
            Learn more <ArrowRight size={12} />
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 lg:h-15 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
              <Zap size={18} className="fill-current text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                Spot<span className="text-primary">Lite</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground -mt-1">
                Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/login"
              className="text-sm font-semibold text-muted-foreground px-3 py-2 transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-primary/30 transition-all hover:bg-primary-hover hover:shadow-md hover:shadow-primary/40 active:scale-[0.98]"
            >
              Book a Live Demo
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="border-t border-border bg-white px-6 py-5 shadow-xl lg:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-foreground hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 pt-4 border-t border-border">
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
                  className="rounded-lg bg-primary py-3 text-center text-sm font-bold text-white shadow-md shadow-primary/25"
                >
                  Book a Live Demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
