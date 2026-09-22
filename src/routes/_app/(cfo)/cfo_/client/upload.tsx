import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isCFO } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";
import { ClientUploadPage } from "@/features/cfo/components/client/ClientUploadPage";

export const Route = createFileRoute("/_app/(cfo)/cfo_/client/upload")({
  head: () => ({
    meta: [{ title: "Upload Clients · CFO · Spotlite" }],
  }),
  component: CFOClientUploadRouteComponent,
});

function CFOClientUploadRouteComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SpotliteLoader
        message="Loading client upload…"
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

  return <ClientUploadPage />;
}
