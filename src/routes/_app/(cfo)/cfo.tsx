import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isCFO } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";
import { CFODashboardPage } from "@/features/cfo/components/CFODashboardPage";

export const Route = createFileRoute("/_app/(cfo)/cfo")({
  head: () => ({
    meta: [{ title: "CFO Operations Center · Spotlite" }],
  }),
  component: CFORouteComponent,
});

function CFORouteComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SpotliteLoader
        message="Loading CFO workspace…"
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

  return <CFODashboardPage />;
}

