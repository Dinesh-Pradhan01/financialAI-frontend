import { createFileRoute, useNavigate, redirect, isRedirect } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { MailCheck, RefreshCw, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/firebase/firebase";

function waitForAuth(): Promise<import("firebase/auth").User | null> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
    setTimeout(() => {
      unsubscribe();
      resolve(null);
    }, 2000);
  });
}

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email · Spotlite" },
      {
        name: "description",
        content: "Please verify your email to start using Spotlite.",
      },
    ],
  }),
  beforeLoad: async () => {
    const fbUser = auth.currentUser ?? (await waitForAuth());
    if (!fbUser) {
      throw redirect({ to: "/login" });
    }
    if (fbUser.emailVerified) {
      throw redirect({ to: "/onboarding" });
    }
  },
  component: VerifyEmail,
});

function VerifyEmail() {
  const nav = useNavigate();
  const { user, resendVerificationEmail, logout } = useAuth();

  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // ---- Resend with cooldown ----
  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;
    setResending(true);
    try {
      await resendVerificationEmail();
      toast.success("Verification email sent!", {
        description: `Check ${user?.email ?? "your inbox"}.`,
      });
      // Start 60-second cooldown
      setCooldown(60);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setResending(false);
    }
  }, [cooldown, resendVerificationEmail, user?.email]);

  // ---- Check verification status ----
  const handleCheckVerification = useCallback(async () => {
    setChecking(true);
    try {
      // Reload the user from Firebase to get fresh emailVerified status
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        // Force token refresh to pick up the new emailVerified claim
        await currentUser.getIdToken(true);

        if (currentUser.emailVerified) {
          toast.success("Email verified! Redirecting…");
          // Small delay so the user sees the success message
          setTimeout(() => nav({ to: "/onboarding" }), 800);
          return;
        }
      }
      toast.error("Email not yet verified. Please check your inbox.");
    } catch {
      toast.error("Could not check verification status. Try again.");
    } finally {
      setChecking(false);
    }
  }, [nav]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-brand/10">
          <MailCheck className="h-10 w-10 text-brand" />
        </div>

        <h1 className="font-display text-3xl font-bold">Check your email</h1>

        <p className="mt-3 text-text-secondary">
          We sent a verification link to{" "}
          <span className="font-semibold text-foreground">{user?.email ?? "your email"}</span>.
          <br />
          Click the link in the email, then come back here.
        </p>

        {/* Action buttons */}
        <div className="mt-8 space-y-3">
          {/* I've verified — check status */}
          <button
            onClick={handleCheckVerification}
            disabled={checking}
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand disabled:opacity-60"
          >
            {checking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {checking ? "Checking…" : "I've verified my email"}
          </button>

          {/* Resend */}
          <button
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            className="flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-surface py-3 text-sm font-semibold text-brand transition hover:bg-surface-alt disabled:opacity-60"
          >
            {resending && <Loader2 className="h-4 w-4 animate-spin" />}
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : resending
                ? "Sending…"
                : "Resend verification email"}
          </button>

          {/* Sign out and use a different account */}
          <button
            onClick={async () => {
              await logout();
              nav({ to: "/login" });
            }}
            className="mt-2 text-xs text-text-secondary hover:text-text-primary hover:underline"
          >
            Use a different account
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-text-secondary">
          <Sparkles className="h-3.5 w-3.5 text-brand" />
          <span>Spotlite — your money, finally understood.</span>
        </div>
      </div>
    </div>
  );
}
