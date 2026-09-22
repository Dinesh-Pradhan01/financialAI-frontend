import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isCFO } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { AccessRestrictedScreen } from "@/shared/components/ui/AccessRestrictedScreen";
import { ClientDirectoryPage } from "@/features/cfo/components/client/ClientDirectoryPage";

const searchSchema = z
  .object({
    status: z.string().optional().catch(undefined),
    category: z.string().optional().catch(undefined),
    industry: z.string().optional().catch(undefined),
    recurring: z.union([z.boolean(), z.string()]).optional().catch(undefined),
    search: z.string().optional().catch(undefined),
    page: z.union([z.number(), z.string()]).optional().catch(undefined),
    size: z.union([z.number(), z.string()]).optional().catch(undefined),
  })
  .passthrough();

export const Route = createFileRoute("/_app/(cfo)/cfo_/clients")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Client Directory · CFO · Spotlite" }],
  }),
  component: CFOClientsRouteComponent,
});

function CFOClientsRouteComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SpotliteLoader
        message="Loading client directory…"
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

  return <ClientDirectoryPage />;
}
