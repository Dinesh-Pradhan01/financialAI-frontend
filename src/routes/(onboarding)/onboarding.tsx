import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { auth } from "@/shared/firebase/firebase";
import { useAuth, getAuthSnapshot } from "@/shared/contexts/AuthContext";
import { OnboardingPage } from "@/features/onboarding/components/OnboardingPage";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";

export const Route = createFileRoute("/(onboarding)/onboarding")({
  head: () => ({
    meta: [
      { title: "Business Onboarding · Spotlite" },
      {
        name: "description",
        content: "Configure your enterprise financial profile and verify business credentials on SpotLite.",
      },
    ],
  }),
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return;

    const currentPath = location.href || location.pathname || "/onboarding";
    const snapshot = getAuthSnapshot();
    if (!snapshot.loading) {
      if (!snapshot.user) {
        throw redirect({
          to: "/login",
          search: { redirect: currentPath },
        });
      }
      const isVerified = auth.currentUser
        ? auth.currentUser.emailVerified
        : snapshot.user.email_verified;
      if (!isVerified) {
        throw redirect({
          to: "/verify-email",
          search: { redirect: currentPath },
        });
      }
    }
  },
  component: OnboardingRouteComponent,
});

function OnboardingRouteComponent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const currentPath =
        window.location.pathname + window.location.search || "/onboarding";
      if (!user) {
        navigate({
          to: "/login",
          search: { redirect: currentPath },
          replace: true,
        });
      } else if (auth.currentUser && !auth.currentUser.emailVerified) {
        navigate({
          to: "/verify-email",
          search: { redirect: currentPath },
          replace: true,
        });
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <SpotliteLoader
        message="Verifying session…"
        subMessage="SpotLite Executive Intelligence"
      />
    );
  }

  return <OnboardingPage />;
}
