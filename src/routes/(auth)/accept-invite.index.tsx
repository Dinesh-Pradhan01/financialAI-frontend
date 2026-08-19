import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(auth)/accept-invite/")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || "",
  }),
  component: AcceptInviteIndexPage,
});

function AcceptInviteIndexPage() {
  const { token } = Route.useSearch();
  const nav = useNavigate();

  useEffect(() => {
    if (token) {
      nav({ to: `/accept-invite/${token}` as any, replace: true });
    }
  }, [token, nav]);

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold mb-2">No Invitation Token Provided</h1>
        <p className="text-sm text-text-secondary">Please check your email link or request a new invitation link from your CEO/Admin.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-brand" />
    </div>
  );
}
