import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCompanyProfile } from '@/hooks/useCompanyAPI';
import { Building2, Mail, Phone, MapPin, Globe, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const CompanyOverviewCard = () => {
  const { data, isLoading, isError, refetch } = useCompanyProfile();

  if (isLoading) {
    return (
      <Card className="h-full">
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

  if (isError || !data) {
    return (
      <Card className="h-full bg-red-500/10 border-red-500/20">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-full">
          <Building2 className="w-12 h-12 text-red-400" />
          <div className="space-y-1">
            <h3 className="font-medium">Failed to load profile</h3>
            <p className="text-sm text-muted-foreground">We couldn't fetch the company overview.</p>
          </div>
          <button onClick={() => refetch()} className="text-sm text-blue-500 hover:underline">
            Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden border-none shadow-lg bg-gradient-to-br from-card to-card/50 backdrop-blur-xl relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-500" />
              {data.company_name}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{data.industry}</Badge>
              <Badge variant="outline">{data.business_type}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.summary && (
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {data.summary}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">PAN / GST</p>
              <p className="text-sm font-medium">{data.pan} {data.gst ? ` / ${data.gst}` : ''}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Registered Address</p>
              <p className="text-sm font-medium line-clamp-2" title={data.registered_address}>{data.registered_address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Email</p>
              <p className="text-sm font-medium">{data.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</p>
              <p className="text-sm font-medium">{data.phone}</p>
            </div>
          </div>

          {data.website && (
            <div className="flex items-start gap-3 md:col-span-2">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</p>
                <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-500 hover:underline">
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
