import { createFileRoute } from "@tanstack/react-router";
import { EmployeeUploadPage } from "@/features/hr/components/employee/EmployeeUploadPage";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isHR } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";

export const Route = createFileRoute("/_app/(hr)/hr_/employee/upload")({
  head: () => ({
    meta: [{ title: "Upload Employees · HR · Spotlite" }],
  }),
  component: HREmployeeUploadRouteComponent,
});

function HREmployeeUploadRouteComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SpotliteLoader
        message="Loading employee upload…"
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
        description="Employee Upload is strictly restricted to Human Resources (HR) personnel."
        currentRole={user.role}
      />
    );
  }

  return <EmployeeUploadPage />;
}
