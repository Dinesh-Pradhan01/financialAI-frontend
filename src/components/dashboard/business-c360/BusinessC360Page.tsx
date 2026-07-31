import React from 'react';
import { CompanyOverviewCard } from './CompanyOverviewCard';
import { IndustryLeadershipCard } from './IndustryLeadershipCard';
import { CompanyRatingCard } from './CompanyRatingCard';
import { CompanyNewsCard } from './CompanyNewsCard';
import { AIViewCard } from './AIViewCard';
import { UploadTransactionsCard } from './UploadTransactionsCard';
import { DocumentVaultCard } from './DocumentVaultCard';

export const BusinessC360Page = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Business C360</h1>
        <p className="text-muted-foreground mt-2">The central intelligence hub for your company.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Row 1: Overview */}
        <div className="md:col-span-12">
          <CompanyOverviewCard />
        </div>

        {/* Row 2: Industry Leadership */}
        <div className="md:col-span-12">
          <IndustryLeadershipCard />
        </div>

        {/* Row 2: Rating, News, AI View */}
        <div className="md:col-span-4">
          <CompanyRatingCard />
        </div>
        <div className="md:col-span-4">
          <CompanyNewsCard />
        </div>
        <div className="md:col-span-4">
          <AIViewCard />
        </div>

        {/* Row 3: Upload and Vault */}
        <div className="md:col-span-5">
          <UploadTransactionsCard />
        </div>
        <div className="md:col-span-7">
          <DocumentVaultCard />
        </div>

      </div>
    </div>
  );
};
