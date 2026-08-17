import { Link } from "@tanstack/react-router";
import { Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

export function AuthHeroPanel() {
  return (
    <div className="relative hidden flex-col justify-between bg-brand p-12 text-on-brand md:flex select-none">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-2.5 group w-fit">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary shadow-md transition-transform group-hover:scale-105">
          <Zap size={20} className="fill-current text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-extrabold tracking-tight text-white">
            Spot<span className="text-blue-200">Lite</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-blue-200/80 -mt-1">
            Intelligence
          </span>
        </div>
      </Link>

      {/* Value Prop */}
      <div className="max-w-md">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 backdrop-blur-xs mb-6">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
          Executive Financial & Workforce Layer
        </div>
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white">
          Unified clarity for leadership teams.
        </h2>
        <p className="mt-4 text-sm text-blue-100/90 leading-relaxed">
          Real-time anomaly radar, cross-bank reconciliation, and verified workforce risk intelligence for CEOs, CFOs, and HR leaders.
        </p>

        <div className="mt-8 space-y-3.5 text-sm text-blue-50/90">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
            <span>SOC 2 Type II Certified & DPDP Act 2023 Compliant</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
            <span>Bank-grade 256-bit AES encryption at rest & in transit</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
            <span>Autonomous anomaly radar & predictive cash runways</span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between text-xs text-blue-200/70 border-t border-white/10 pt-6">
        <span>Enterprise-grade security</span>
        <span>© SpotLite Inc.</span>
      </div>
    </div>
  );
}
