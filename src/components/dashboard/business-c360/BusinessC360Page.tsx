import React, { useState, useEffect } from "react";
import { OnboardingProgressBanner } from "./OnboardingProgressBanner";
import { CompanyOverviewCard } from "./CompanyOverviewCard";
import { IndustryLeadershipCard } from "./IndustryLeadershipCard";
import { CompanyRatingCard } from "./CompanyRatingCard";
import { CompanyNewsCard } from "./CompanyNewsCard";
import { AIViewCard } from "./AIViewCard";
import { UploadTransactionsCard } from "./UploadTransactionsCard";
import { DocumentVaultCard } from "./DocumentVaultCard";
import { useCompanyProfile, useOnboardingStatus } from "@/hooks/useCompanyAPI";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

export const BusinessC360Page = () => {
  const { user } = useAuth();
  const { data: profile, isError } = useCompanyProfile();
  const { data: onboardingData } = useOnboardingStatus();

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Auto-open modal on initial load if user profile is incomplete
  useEffect(() => {
    if (
      user &&
      !user.profile_completed &&
      onboardingData &&
      !onboardingData.onboarding_completed
    ) {
      const hasDismissed = sessionStorage.getItem("spotlite_onboarding_dismissed");
      if (!hasDismissed) {
        setIsOnboardingOpen(true);
      }
    }
  }, [user, onboardingData]);

  // Listen for open-onboarding custom event from any card or action button
  useEffect(() => {
    const handleOpen = () => setIsOnboardingOpen(true);
    window.addEventListener("open-onboarding", handleOpen);
    return () => window.removeEventListener("open-onboarding", handleOpen);
  }, []);

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
    sessionStorage.setItem("spotlite_onboarding_dismissed", "true");
  };

  // Downstream cards know whether profile is ready
  const hasProfile = Boolean(profile && !isError);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Business C360</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Unified executive intelligence hub for workforce risk, financial health, and company compliance.
        </p>
      </div>

      {/* Onboarding Incomplete Reminder Banner */}
      <OnboardingProgressBanner onOpenOnboarding={() => setIsOnboardingOpen(true)} />

      {/* Onboarding Centered Modal Dialog */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Row 1: Overview */}
        <div className="md:col-span-12">
          <CompanyOverviewCard />
        </div>

        {/* Row 2: Industry Leadership */}
        <div className="md:col-span-12">
          <IndustryLeadershipCard hasProfile={hasProfile} />
        </div>

        {/* Row 3: Rating, News, AI View */}
        <div className="md:col-span-4">
          <CompanyRatingCard hasProfile={hasProfile} />
        </div>
        <div className="md:col-span-4">
          <CompanyNewsCard hasProfile={hasProfile} />
        </div>
        <div className="md:col-span-4">
          <AIViewCard hasProfile={hasProfile} />
        </div>

        {/* Row 4: Upload and Vault */}
        <div className="md:col-span-5">
          <UploadTransactionsCard />
        </div>
        <div className="md:col-span-7">
          <DocumentVaultCard hasProfile={hasProfile} />
        </div>
      </div>
    </div>
  );
};
