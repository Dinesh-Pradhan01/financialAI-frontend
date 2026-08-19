import React from "react";
import { Zap, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props {
  completionPct: number;
}

export function OnboardingHeroSidebar({ completionPct }: Props) {
  return (
    <div className="relative hidden lg:flex lg:col-span-4 h-full lg:h-screen sticky top-0 flex-col justify-between bg-brand-gradient p-10 text-on-brand border-r border-white/10 select-none overflow-hidden">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-2.5 w-fit">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
          <Zap size={20} className="fill-current text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Spot<span className="text-blue-200">Lite</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200/80 -mt-0.5">
            Enterprise
          </span>
        </div>
      </Link>

      <div className="my-auto space-y-6 max-w-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm border border-white/15">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-200" />
          <span>Executive Financial Layer</span>
        </div>

        <h2 className="font-display text-2xl lg:text-3xl font-bold leading-snug tracking-tight text-white">
          Configure your enterprise financial profile.
        </h2>

        <p className="text-xs text-white/90 leading-relaxed font-normal">
          SpotLite links entity records, verifies business credentials, and configures autonomous transaction intelligence in 5 structured steps.
        </p>

        {/* Dynamic completion gauge */}
        <div className="rounded-xl bg-white/10 p-4.5 backdrop-blur-sm border border-white/15 shadow-xs space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-white">
            <span>Onboarding Progress</span>
            <span className="font-mono">{completionPct}% Complete</span>
          </div>
          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500 ease-out"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        {/* Trust Markers */}
        <div className="space-y-2.5 text-xs text-white/90 pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
            <span>Bank-grade 256-bit AES encryption</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-white/80 border-t border-white/10 pt-5">
        <span className="flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" /> Encrypted Vault
        </span>
        <span>© SpotLite Inc.</span>
      </div>
    </div>
  );
}
