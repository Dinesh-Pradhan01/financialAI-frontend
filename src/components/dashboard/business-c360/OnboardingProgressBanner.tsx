import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldAlert, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStatus } from "@/hooks/useCompanyAPI";
import { useAuth } from "@/contexts/AuthContext";

export function OnboardingProgressBanner() {
  const { user } = useAuth();
  const { data: onboardingData } = useOnboardingStatus();

  // If user already completed onboarding, don't show the banner
  if (user?.profile_completed || onboardingData?.onboarding_completed) {
    return null;
  }

  const completionPct = onboardingData?.completion_percentage ?? 0;
  const currentStep = onboardingData?.current_step ?? 1;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-r from-brand/10 via-surface to-brand/5 p-5 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand border border-brand/25 font-bold font-mono text-sm">
            {completionPct}%
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                <Sparkles className="h-3 w-3 text-brand" /> Setup in Progress
              </span>
              <span className="text-xs text-text-secondary">
                Step {currentStep} of 5
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              Finish your Business Profile for Full AI Intelligence
            </h2>
            <p className="text-xs text-text-secondary max-w-2xl leading-relaxed">
              Complete your leadership structure, banking context, and verification documents to unlock real-time financial health scoring and peer benchmarking.
            </p>
          </div>
        </div>

        {/* Right Gauge & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 self-stretch lg:self-center">
          <div className="w-full sm:w-36 space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold text-text-secondary">
              <span>Readiness</span>
              <span className="text-brand font-bold">{completionPct}%</span>
            </div>
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-brand transition-all duration-500 ease-out rounded-full"
                style={{ width: `${Math.max(completionPct, 8)}%` }}
              />
            </div>
          </div>

          <Link to="/onboarding" className="shrink-0">
            <Button className="w-full sm:w-auto bg-brand hover:opacity-90 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-brand px-5 py-2.5 rounded-xl text-xs">
              <span>Resume Onboarding</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
