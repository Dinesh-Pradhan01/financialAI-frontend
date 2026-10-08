import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { LandingCTA } from "./LandingCTA";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingHero } from "./LandingHero";
import { LandingHowItWorks } from "./LandingHowItWorks";
import { LandingModules } from "./LandingModules";
import { LandingPricing } from "./LandingPricing";
import { LandingRoles } from "./LandingRoles";
import { LandingSecurity } from "./LandingSecurity";
import { LandingStats } from "./LandingStats";
import { LandingTestimonials } from "./LandingTestimonials";
import { LandingPreviewModal, type PreviewModalType } from "./LandingPreviewModal";
import type { Currency } from "../data/landing-data";

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  // Initial currency detection: default to INR for Indian timezones/locales, otherwise USD
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes("Calcutta") || tz.includes("Kolkata") || navigator.language === "en-IN") {
        return "INR";
      }
    } catch {
      // ignore
    }
    return "INR"; // default to SpotLite primary MSME target market
  });

  // Top activation bar state
  const [showActivationBar, setShowActivationBar] = useState(() => {
    try {
      return localStorage.getItem("spotlite_landing_tour_seen") !== "true";
    } catch {
      return true;
    }
  });

  const dismissActivationBar = () => {
    setShowActivationBar(false);
    try {
      localStorage.setItem("spotlite_landing_tour_seen", "true");
    } catch {
      // ignore
    }
  };

  // Interactive Preview Modal State
  const [previewModal, setPreviewModal] = useState<PreviewModalType>(null);

  const handleOpenRolePreview = (roleId: string) => {
    setPreviewModal({ type: "sandbox", roleId });
  };

  const handleOpenModuleSpecs = (moduleId: string) => {
    setPreviewModal({ type: "module", moduleId });
  };

  const handleOpenArchitecture = () => {
    setPreviewModal({ type: "architecture" });
  };

  const handleOpenSandbox = (roleId?: string | unknown) => {
    const validRoleId = typeof roleId === "string" ? roleId : undefined;
    setPreviewModal({ type: "sandbox", roleId: validRoleId });
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Fast Activation Ribbon for First-Time Visitors */}
      {showActivationBar && (
        <div className="bg-primary text-white px-4 py-2 text-xs font-medium flex items-center justify-between gap-3 relative z-50">
          <div className="mx-auto flex items-center gap-2 flex-wrap justify-center">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-tight">
              Interactive Demo: Test SpotLite's multi-bank OCR audit & AI Copilot in 60 seconds.
            </span>
            <button
              type="button"
              onClick={() => handleOpenSandbox()}
              className="inline-flex items-center gap-1 rounded-md bg-white text-primary px-2.5 py-0.5 text-xs font-semibold tracking-[-0.005em] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <span>Launch 60s Tour</span>
              <Sparkles className="h-3 w-3" />
            </button>
          </div>
          <button
            type="button"
            onClick={dismissActivationBar}
            className="text-white/80 hover:text-white cursor-pointer p-0.5 rounded"
            title="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <LandingHeader
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        currency={currency}
        setCurrency={setCurrency}
        onOpenSandbox={handleOpenSandbox}
      />
      <main>
        <LandingHero currency={currency} onOpenSandbox={handleOpenSandbox} />
        <LandingStats currency={currency} />
        <LandingModules
          currency={currency}
          onOpenModuleSpecs={handleOpenModuleSpecs}
          onOpenSandbox={handleOpenSandbox}
        />
        <LandingRoles currency={currency} onOpenRolePreview={handleOpenRolePreview} />
        <LandingHowItWorks />
        <LandingTestimonials />
        <LandingPricing
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
          currency={currency}
          setCurrency={setCurrency}
          onOpenSandbox={handleOpenSandbox}
        />
        <LandingSecurity />
        <LandingCTA onOpenArchitecture={handleOpenArchitecture} onOpenSandbox={handleOpenSandbox} />
      </main>
      <LandingFooter />

      {/* Interactive Modal Sheet for Previews & Specs */}
      <LandingPreviewModal
        preview={previewModal}
        onClose={() => setPreviewModal(null)}
        currency={currency}
      />
    </div>
  );
}
