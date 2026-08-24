import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BottomTabBar, DesktopSidebar } from "@/shared/components/shell/nav";
import { auth } from "@/shared/firebase/firebase";
import { useAuth, getAuthSnapshot } from "@/shared/contexts/AuthContext";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location }) => {
    // Avoid running client redirects during server-side rendering
    if (typeof window === "undefined") return;

    const currentPath = location.href || location.pathname;

    // Fast-path: check in-memory AuthSnapshot if already resolved
    const snapshot = getAuthSnapshot();
    if (!snapshot.loading) {
      if (!snapshot.user) {
        throw redirect({
          to: "/login",
          search: { redirect: currentPath },
        });
      }
      const isVerified = auth.currentUser ? auth.currentUser.emailVerified : snapshot.user.email_verified;
      if (!isVerified) {
        throw redirect({
          to: "/verify-email",
          search: { redirect: currentPath },
        });
      }
    }
    // If loading is true (cold refresh), allow AppLayout to render SpotliteLoader while auth syncs
  },
  component: AppLayout,
});

function AppLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only make navigation decisions AFTER auth initialization and backend sync have completed
    if (!loading) {
      const currentPath = window.location.pathname + window.location.search;
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
    return <SpotliteLoader message="Restoring secure session…" subMessage="SpotLite Executive Intelligence" />;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DesktopSidebar />
      <main className="min-w-0 flex-1 pb-24 md:pb-8">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
