import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompanyProfile, isSetupRequiredError } from "@/hooks/useCompanyAPI";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  ArrowRight,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const CompanyOverviewCard = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useCompanyProfile();

  if (isLoading) {
    return (
      <Card className="h-full border border-border/70 shadow-sm">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // State: Genuine system/API failure (e.g. 500, network offline, etc.)
  if (isError && !isSetupRequiredError(error)) {
    return (
      <Card className="h-full border border-destructive/30 bg-destructive/5 shadow-sm">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 text-left gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-destructive/10 rounded-xl shrink-0 text-destructive">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Could not load company profile</h3>
              <p className="text-sm text-muted-foreground">
                We encountered a server error while loading your company details.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // State: Expected First-Time / Setup Required (404 or profile not yet created)
  if (!data || (isError && isSetupRequiredError(error))) {
    return (
      <Card className="h-full border-dashed border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-secondary/5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 text-left gap-6 h-full relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-primary/10 rounded-xl shrink-0 text-primary">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Action Required
              </div>
              <h3 className="text-xl font-bold text-foreground">Complete Company Profile</h3>
              <p className="text-sm text-muted-foreground max-w-lg">
                Enter your company registration details, industry, and PAN/GST to generate your
                Business C360 intelligence scorecard.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/onboarding">
              <Button className="bg-brand-gradient hover:opacity-95 text-white font-semibold flex items-center gap-2 cursor-pointer shadow-brand px-5 py-2.5 rounded-pill">
                Complete Setup <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // State: Ready / Data populated
  return (
    <Card className="h-full overflow-hidden border border-border/70 shadow-sm bg-card relative group">
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              {data.company_name}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {data.industry}
              </Badge>
              <Badge variant="outline">{data.business_type}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.summary && (
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{data.summary}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                PAN / GST
              </p>
              <p className="text-sm font-medium">
                {data.pan} {data.gst ? ` / ${data.gst}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Registered Address
              </p>
              <p className="text-sm font-medium line-clamp-2" title={data.registered_address}>
                {data.registered_address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Contact Email
              </p>
              <p className="text-sm font-medium">{data.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Phone
              </p>
              <p className="text-sm font-medium">{data.phone}</p>
            </div>
          </div>

          {data.website && (
            <div className="flex items-start gap-3 md:col-span-2">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Website
                </p>
                <a
                  href={data.website.startsWith("http") ? data.website : `https://${data.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {data.website}
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
