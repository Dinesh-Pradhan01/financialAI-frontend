import { createFileRoute } from "@tanstack/react-router";
import { HRDashboardPage } from "@/features/hr/components/HRDashboardPage";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isHR } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";

export const Route = createFileRoute("/_app/(hr)/hr")({
  head: () => ({
    meta: [{ title: "HR Operations Center · Spotlite" }],
  }),
  component: HRRouteComponent,
});

function HRRouteComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SpotliteLoader
        message="Loading HR workspace…"
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
        description="HR Operations is strictly restricted to Human Resources (HR) personnel."
        currentRole={user.role}
      />
    );
  }

  return <HRDashboardPage />;
}
