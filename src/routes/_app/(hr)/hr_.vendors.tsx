import { createFileRoute } from "@tanstack/react-router";
import { VendorDirectoryPage } from "@/features/cfo/components/vendor/VendorDirectoryPage";
import { z } from "zod";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isHR } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";

const searchSchema = z
  .object({
    status: z.string().optional().catch(undefined),
    industry: z.string().optional().catch(undefined),
    recurring: z.union([z.boolean(), z.string()]).optional().catch(undefined),
    search: z.string().optional().catch(undefined),
    page: z.union([z.number(), z.string()]).optional().catch(undefined),
    size: z.union([z.number(), z.string()]).optional().catch(undefined),
  })
  .passthrough();

export const Route = createFileRoute("/_app/(hr)/hr_/vendors")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Vendor Directory · HR · Spotlite" }],
  }),
  component: HRVendorsRouteComponent,
});

function HRVendorsRouteComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SpotliteLoader
        message="Loading vendor directory…"
        subMessage="SpotLite Executive Intelligence"
      />
    );
  }

  if (!user) return null;

  const authorized = isHR(user.role);
  if (!authorized) {
    return (
      <AccessRestrictedScreen
        title="Access Restricted"
        description="Vendor Directory is strictly restricted to Human Resources (HR) personnel."
        currentRole={user.role}
      />
    );
  }

  return <VendorDirectoryPage />;
}
