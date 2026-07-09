import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BottomTabBar, DesktopSidebar } from "@/components/spotlite/nav";
import { auth } from "@/firebase/firebase";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    // Wait briefly for Firebase to initialise if auth.currentUser is still null
    const user = auth.currentUser ?? (await waitForAuth());

    if (!user) {
      throw redirect({ to: "/login" });
    }

    if (!user.emailVerified) {
      throw redirect({ to: "/verify-email" });
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
