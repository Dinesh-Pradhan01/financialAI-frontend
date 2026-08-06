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
    console.log("[_app beforeLoad] snapshot:", { loading: snapshot.loading, hasUser: !!snapshot.user, profile_completed: snapshot.user?.profile_completed });

    if (!snapshot.loading && snapshot.user) {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        console.log("[_app beforeLoad] → redirect to /verify-email (snapshot path)");
        throw redirect({ to: "/verify-email" });
      }
      if (!snapshot.user.profile_completed) {
        console.log("[_app beforeLoad] → redirect to /onboarding (snapshot path, profile_completed=false)");
        throw redirect({ to: "/onboarding" });
      }
      console.log("[_app beforeLoad] → ALLOW (snapshot path, profile_completed=true)");
      return;
    }

    // 2. Fallback for initial page load / hard refresh
    const fbUser = auth.currentUser ?? (await waitForAuth());
    console.log("[_app beforeLoad] waitForAuth result:", fbUser?.email ?? "null");

    if (!fbUser) {
      console.log("[_app beforeLoad] → redirect to /login (no firebase user)");
      throw redirect({ to: "/login" });
    }

    if (!fbUser.emailVerified) {
      console.log("[_app beforeLoad] → redirect to /verify-email (fallback path)");
      throw redirect({ to: "/verify-email" });
    }

    // Check backend profile completion status before rendering any child routes
    try {
      const { api } = await import("@/lib/api");
      const backendUser = await api.get<{ profile_completed: boolean }>("/api/auth/me");
      console.log("[_app beforeLoad] /api/auth/me response:", { profile_completed: backendUser.profile_completed });
      if (!backendUser.profile_completed) {
        console.log("[_app beforeLoad] → redirect to /onboarding (me endpoint, profile_completed=false)");
        throw redirect({ to: "/onboarding" });
      }
      console.log("[_app beforeLoad] → ALLOW (me endpoint, profile_completed=true)");
    } catch (err) {
      if (isRedirect(err)) {
        throw err;
      }
      console.error("[_app beforeLoad] Error checking profile completion:", err);
      console.log("[_app beforeLoad] → redirect to /login (error fallback)");
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
