import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isCFO } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";
import { VendorUploadPage } from "@/features/cfo/components/vendor/VendorUploadPage";

export const Route = createFileRoute("/_app/(cfo)/cfo_/vendor/upload")({
  head: () => ({
    meta: [{ title: "Upload Vendors · CFO · Spotlite" }],
  }),
  component: CFOVendorUploadRouteComponent,
});

function CFOVendorUploadRouteComponent() {
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

  const authorized = isCFO(user.role);
  if (!authorized) {
    return (
      <AccessRestrictedScreen
        title="Access Restricted"
        description="CFO Operations is strictly restricted to Chief Financial Officers (CFO)."
        currentRole={user.role}
      />
    );
  }

  return <VendorUploadPage />;
}

