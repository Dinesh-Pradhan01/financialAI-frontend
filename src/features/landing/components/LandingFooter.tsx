import { Zap } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-[#050c1b] text-slate-400">
      <div className="mx-auto grid max-w-7xl 2xl:max-w-[90rem] gap-8 lg:gap-10 px-4 py-10 lg:py-12 sm:px-6 lg:grid-cols-5 lg:px-8 2xl:px-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white font-bold">
              <Zap size={20} className="fill-current text-white" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-white">
              Spot<span className="text-primary">Lite</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-slate-300">
            The workforce & financial intelligence platform designed for fast-growing companies.
            Automate payroll audits, eliminate ghost payments, and align leadership.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200 font-mono">
              All Systems Operational · 99.99% Uptime
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-200 font-display">
            Platform
          </p>
          <ul className="mt-4 space-y-3 text-xs sm:text-sm font-normal">
            <li>
              <a href="#modules" className="text-slate-300 hover:text-white transition-colors">
                Customer 360
              </a>
            </li>
            <li>
              <a href="#modules" className="text-slate-300 hover:text-white transition-colors">
                Industry Benchmarking
              </a>
            </li>
            <li>
              <a href="#modules" className="text-slate-300 hover:text-white transition-colors">
                Opportunity Radar
              </a>
            </li>
            <li>
              <a href="#modules" className="text-slate-300 hover:text-white transition-colors">
                Risk & Fraud Engine
              </a>
            </li>
            <li>
              <a href="#modules" className="text-slate-300 hover:text-white transition-colors">
                HR & Payroll Ledger
              </a>
            </li>
            <li>
              <a href="#modules" className="text-slate-300 hover:text-white transition-colors">
                SpotLite AI Copilot
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-200 font-display">
            Company
          </p>
          <ul className="mt-4 space-y-3 text-xs sm:text-sm font-normal">
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Leadership
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Careers (We're Hiring)
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Security & Trust
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Press & Media
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-200 font-display">
            Resources
          </p>
          <ul className="mt-4 space-y-3 text-xs sm:text-sm font-normal">
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                API Reference
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Customer Stories
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Payroll Audit Guide
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                Contact Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl 2xl:max-w-[90rem] flex-col gap-3 px-4 py-4 sm:py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 2xl:px-12">
          <p>© 2026 SpotLite Technologies Inc. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-200 transition-colors">
              Security Disclosures
            </a>
            <a href="#" className="hover:text-slate-200 transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
