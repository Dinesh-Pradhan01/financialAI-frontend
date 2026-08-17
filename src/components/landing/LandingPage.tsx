import { useState } from "react";
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

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <LandingHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <LandingHero />
        <LandingStats />
        <LandingModules />
        <LandingRoles />
        <LandingHowItWorks />
        <LandingTestimonials />
        <LandingPricing
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
        />
        <LandingSecurity />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
