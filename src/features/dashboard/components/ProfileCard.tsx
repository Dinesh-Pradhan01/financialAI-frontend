import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  MapPin,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Globe,
  Mail,
} from "lucide-react";
import {
  useCompanyProfile,
  useOnboardingStatus,
  isSetupRequiredError,
} from "../hooks/useCompanyAPI";
import { useCFODashboard } from "@/features/cfo/hooks/useCFODashboard";

interface ProfileCardProps {
  onProfileLoaded?: (hasProfile: boolean, companyName?: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = () => {
  const navigate = useNavigate();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
    refetch: refetchProfile,
    isFetching: isProfileFetching,
  } = useCompanyProfile();

  const { data: onboardingData } = useOnboardingStatus();
  const { clientMetrics, isLoading: isCfoLoading } = useCFODashboard();

  // Merge client count loading into profile loading state (no secondary spinner)
  const isInitialLoading = isProfileLoading || (isCfoLoading && !profile);

  if (isInitialLoading) {
    return (
      <Card className="h-full border border-border/70 shadow-sm bg-surface p-6 sm:p-8 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          </div>
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </Card>
    );
  }

  // State: Genuine system/API failure (e.g. 500, network offline)
  if (isProfileError && !isSetupRequiredError(profileError)) {
    return (
      <Card className="h-full border border-destructive/30 bg-destructive/5 shadow-sm p-6 sm:p-8 flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-destructive/10 rounded-xl shrink-0 text-destructive">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base">
                Could not load company profile
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                We encountered an unexpected server error while retrieving company details.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchProfile()}
            disabled={isProfileFetching}
            className="shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProfileFetching ? "animate-spin" : ""}`} />
            Try again
          </Button>
        </div>
      </Card>
    );
  }

  // State: Setup Required (404 or profile not yet created)
  if (!profile || (isProfileError && isSetupRequiredError(profileError))) {
    return (
      <Card className="h-full border-dashed border-2 border-primary/30 bg-linear-to-br from-primary/5 via-surface to-surface-alt/40 p-6 sm:p-8 relative overflow-hidden shadow-sm flex flex-col justify-between">
        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Action Required
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground font-display">
              Complete Company Profile
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
              Enter your statutory registration credentials, sector category, and leadership details
              to initialize your Business 360 intelligence hub.
            </p>
          </div>
        </div>
        <div className="pt-6 relative z-10">
          <Button
            onClick={() => navigate({ to: "/onboarding" })}
            className="bg-brand-gradient hover:opacity-95 text-white font-semibold flex items-center gap-2 cursor-pointer shadow-brand px-6 py-2.5 rounded-full text-sm"
          >
            Complete Setup <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  // Extract merged profile + onboarding general_info attributes
  const generalInfo = onboardingData?.general_info;
  const leadershipInfo = onboardingData?.leadership_info;

  const companyName = profile.company_name || generalInfo?.company_name || "—";
  const sector =
    profile.business_category || generalInfo?.business_category || profile.industry || "—";
  const businessType = profile.business_type || generalInfo?.business_type || null;
  const registeredAddress = profile.registered_address || generalInfo?.registered_address || "—";

  // Employee count: display raw bracket string as-is (e.g. "11–50") — DO NOT convert to number!
  const employeeCountBracket =
    leadershipInfo?.number_of_employees || generalInfo?.number_of_employees || "—";

  // Client count from Step 0D confirmed endpoint / dashboard query
  const totalClients =
    clientMetrics?.totalClients !== undefined && clientMetrics?.totalClients !== null
      ? clientMetrics.totalClients
      : "—";

  const website = profile.website || generalInfo?.website || null;
  const email = profile.email || generalInfo?.official_email || null;

  return (
    <Card className="h-full border border-border/80 shadow-xs bg-surface relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 group hover:border-border transition-colors">
      <div className="space-y-6">
        {/* Header: Company Identity & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-2xl bg-brand/10 text-brand border border-brand/20 flex items-center justify-center shrink-0 shadow-xs">
              <Building2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-display leading-tight">
                {companyName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {sector !== "—" && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/15 font-medium px-2.5 py-0.5 text-xs"
                  >
                    {sector}
                  </Badge>
                )}
                {businessType && (
                  <Badge
                    variant="outline"
                    className="border-border/80 text-text-secondary text-xs px-2.5 py-0.5"
                  >
                    {businessType}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Registered Address */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" />
            <span>Registered Address</span>
          </div>
          <p
            className="text-sm text-foreground/90 font-medium leading-relaxed pl-5 line-clamp-2"
            title={registeredAddress !== "—" ? registeredAddress : undefined}
          >
            {registeredAddress}
          </p>
        </div>
      </div>

      {/* Operational Metrics Ribbon: Employee Count + Client Count + Digital Reach */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-border/60">
        {/* Employee Count */}
        <div className="p-3.5 rounded-xl bg-primary/[0.04] border border-primary/15 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <Users className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Workforce</span>
          </div>
          <div className="text-base font-bold text-foreground font-display">
            {employeeCountBracket}
          </div>
          <div className="text-[10px] text-text-tertiary font-medium">Employees declared</div>
        </div>

        {/* Client Count */}
        <div className="p-3.5 rounded-xl bg-indigo-500/[0.04] border border-indigo-500/15 hover:border-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Clients</span>
          </div>
          <div className="text-base font-bold text-foreground font-num tabular-nums">
            {totalClients}
          </div>
          <div className="text-[10px] text-text-tertiary font-medium">Active relationships</div>
        </div>

        {/* Website or Email Contact */}
        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/15 hover:border-emerald-500/30 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Presence</span>
          </div>
          {website ? (
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline truncate block"
              title={website}
            >
              {website.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          ) : email ? (
            <a
              href={`mailto:${email}`}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline truncate block"
              title={email}
            >
              {email}
            </a>
          ) : (
            <span className="text-xs text-text-tertiary block">—</span>
          )}
          <div className="text-[10px] text-text-tertiary font-medium">Official contact</div>
        </div>
      </div>
    </Card>
  );
};
