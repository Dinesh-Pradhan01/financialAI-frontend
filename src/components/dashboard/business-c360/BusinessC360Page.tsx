import React from 'react';
import { OnboardingProgressBanner } from './OnboardingProgressBanner';
import { CompanyOverviewCard } from './CompanyOverviewCard';
import { IndustryLeadershipCard } from './IndustryLeadershipCard';
import { CompanyRatingCard } from './CompanyRatingCard';
import { CompanyNewsCard } from './CompanyNewsCard';
import { AIViewCard } from './AIViewCard';
import { UploadTransactionsCard } from './UploadTransactionsCard';
import { DocumentVaultCard } from './DocumentVaultCard';
import { useCompanyProfile } from '@/hooks/useCompanyAPI';

export const BusinessC360Page = () => {
  const { data: profile, isError } = useCompanyProfile();
  
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
      <OnboardingProgressBanner />

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
