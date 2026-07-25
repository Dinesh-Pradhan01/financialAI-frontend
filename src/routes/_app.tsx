import { createFileRoute, Outlet, redirect, useNavigate, isRedirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { BottomTabBar, DesktopSidebar } from "@/components/spotlite/nav";
import { auth } from "@/firebase/firebase";
import { useAuth, getAuthSnapshot } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    // 1. Instant check from in-memory AuthSnapshot (avoids redundant HTTP calls during route switches)
    const snapshot = getAuthSnapshot();

    if (!snapshot.loading && snapshot.user) {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        throw redirect({ to: "/verify-email" });
      }
      if (!snapshot.user.profile_completed) {
        throw redirect({ to: "/onboarding" });
      }
      return;
    }

    // 2. Fallback for initial page load / hard refresh
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
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});

/**
 * Firebase auth state may not be resolved synchronously on hard refresh.
 * Resolves as soon as onAuthStateChanged fires or falls back after 1s.
 */
function waitForAuth(): Promise<import("firebase/auth").User | null> {
  if (auth.currentUser) return Promise.resolve(auth.currentUser);

  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout>;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (timer) clearTimeout(timer);
      unsubscribe();
      resolve(user);
    });
    timer = setTimeout(() => {
      unsubscribe();
      resolve(auth.currentUser);
    }, 1000);
  });
}

function AppLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // Backup guard: if auth loading finished and there's no user,
      // redirect to login. This covers edge cases where beforeLoad
      // might be bypassed (e.g. client-side navigation race).
      navigate({ to: "/login", replace: true });
    } else if (!loading && user && !user.profile_completed) {
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
