import { createFileRoute, Outlet, redirect, useNavigate, isRedirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { BottomTabBar, DesktopSidebar } from "@/components/spotlite/nav";
import { auth } from "@/firebase/firebase";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    // Wait briefly for Firebase to initialise if auth.currentUser is still null
    const fbUser = auth.currentUser ?? (await waitForAuth());

    if (!fbUser) {
      throw redirect({ to: "/login" });
    }

    if (!fbUser.emailVerified) {
      throw redirect({ to: "/verify-email" });
    }

    // Check backend profile completion status before rendering any child routes
    try {
      const { api } = await import("@/lib/api");
      const backendUser = await api.get<{ profile_completed: boolean }>("/api/auth/me");
      if (!backendUser.profile_completed) {
        throw redirect({ to: "/onboarding" });
      }
    } catch (err) {
      if (isRedirect(err)) {
        throw err;
      }
      console.error("Error checking profile completion in beforeLoad:", err);
      // If backend reports 401 (Unauthorized), redirect to login
      if (err && typeof err === "object" && "status" in err && (err as any).status === 401) {
        throw redirect({ to: "/login" });
      }
    }
  },
  component: AppLayout,
});

/**
 * Firebase auth state may not be resolved synchronously (e.g. on hard refresh).
 * This waits up to 2 seconds for the onAuthStateChanged callback to fire.
 */
function waitForAuth(): Promise<import("firebase/auth").User | null> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
    // Timeout fallback — treat as unauthenticated after 2s
    setTimeout(() => {
      unsubscribe();
      resolve(null);
    }, 2000);
  });
}

function AppLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && !user.profile_completed) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  // Double safety gate - render nothing if we are transitioning to onboarding
  if (user && !user.profile_completed) {
    return null;
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
