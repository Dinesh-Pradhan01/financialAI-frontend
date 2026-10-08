import { createFileRoute } from "@tanstack/react-router";
import { EmployeeDirectoryPage } from "@/features/hr/components/employee/EmployeeDirectoryPage";
import { z } from "zod";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isHR } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";

const searchSchema = z
  .object({
    status: z.string().optional().catch(undefined),
    department: z.string().optional().catch(undefined),
    search: z.string().optional().catch(undefined),
    employment_type: z.string().optional().catch(undefined),
    page: z.union([z.number(), z.string()]).optional().catch(undefined),
    size: z.union([z.number(), z.string()]).optional().catch(undefined),
  })
  .passthrough();

export const Route = createFileRoute("/_app/(hr)/hr_/employees")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Employee Directory · HR · Spotlite" }],
  }),
  component: HREmployeesRouteComponent,
});

function HREmployeesRouteComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SpotliteLoader
        message="Loading employee directory…"
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
        description="Employee Directory is strictly restricted to Human Resources (HR) personnel."
        currentRole={user.role}
      />
    );
  }

  return <EmployeeDirectoryPage />;
}
