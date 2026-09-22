import { createFileRoute, redirect } from "@tanstack/react-router";
import { VendorUploadPage } from "@/features/cfo/components/vendor/VendorUploadPage";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isHR } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";

export const Route = createFileRoute("/_app/(hr)/hr_/vendor/upload")({
  beforeLoad: () => {
    throw redirect({
      to: "/cfo/vendor/upload",
    });
  },
  head: () => ({
    meta: [{ title: "Upload Vendors · HR · Spotlite" }],
  }),
  component: HRVendorUploadRouteComponent,
});

function HRVendorUploadRouteComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SpotliteLoader
        message="Loading vendor upload…"
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
        description="Vendor Upload is strictly restricted to Human Resources (HR) personnel."
        currentRole={user.role}
      />
    );
  }

  return <VendorUploadPage />;
}

