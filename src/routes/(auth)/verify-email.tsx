import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { MailCheck, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/shared/contexts/AuthContext";
import { auth } from "@/shared/firebase/firebase";
import { waitForAuth } from "@/shared/firebase/auth";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { SpotLiteBrand } from "@/shared/components/SpotLiteBrand";

export const Route = createFileRoute("/(auth)/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email · SpotLite Intelligence" },
      {
        name: "description",
        content: "Please verify your email to start using SpotLite.",
      },
    ],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;

    const fbUser = auth.currentUser ?? (await waitForAuth());
    if (!fbUser) {
      throw redirect({ to: "/login" });
    }
    // If already verified, move to home
    if (fbUser.emailVerified) {
      throw redirect({ to: "/home" });
    }
  },
  component: VerifyEmail,
});

function VerifyEmail() {
  const nav = useNavigate();
  const { user, firebaseUser, loading, resendVerificationEmail, logout, sync } = useAuth();

  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

  const displayEmail = user?.email || firebaseUser?.email || auth.currentUser?.email || "your email";

  // ---- Resend with cooldown ----
  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;
    setResending(true);
    try {
      await resendVerificationEmail();
      toast.success("Verification email sent!", {
        description: `Check ${displayEmail} for the activation link.`,
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send email. Please try again.";
      toast.error(msg);
    } finally {
      setResending(false);
    }
  }, [cooldown, resendVerificationEmail, displayEmail]);

  // ---- Check verification status ----
  const handleCheckVerification = useCallback(async () => {
    setChecking(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("No active session found. Please log in again.");
        nav({ to: "/login" });
        return;
      }

      // 1. Reload the Firebase user to get the latest emailVerified status from Firebase servers
      await currentUser.reload();

      if (!currentUser.emailVerified) {
        toast.error("Email not verified yet", {
          description: "Please check your inbox, click the verification link in the email, and then click this button again.",
        });
        return;
      }

      // 2. User has verified email in Firebase! Inform backend to update DB record
      try {
        const { api } = await import("@/shared/lib/api");
        await api.post("/api/auth/verify-email");
      } catch (e) {
        console.warn("Backend verify-email call warning:", e);
      }

      // 3. Resync backend session
      await sync();

      toast.success("Email verified successfully! Welcome to SpotLite.");
      nav({ to: "/home", replace: true });
    } catch (error) {
      console.error("Verification check failed:", error);
      toast.error("Could not check verification status. Please try again.");
    } finally {
      setChecking(false);
    }
  }, [nav, sync]);

  if (loading) {
    return <SpotliteLoader message="Verifying status…" subMessage="SpotLite Intelligence" />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md text-center"
      >
        {/* Brand Header */}
        <div className="mb-8 flex items-center justify-center">
          <SpotLiteBrand size="md" />
        </div>

        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <MailCheck className="h-10 w-10" />
        </motion.div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Verify your email
        </h1>

        <p className="mt-3 text-text-secondary text-sm leading-relaxed">
          We sent a verification link to{" "}
          <span className="font-semibold text-foreground">{displayEmail}</span>.
          <br />
          Click the link in your email to activate your fintech account, then return here.
        </p>

        {/* Action buttons */}
        <div className="mt-8 space-y-3">
          {/* I've verified — check status */}
          <motion.button
            whileTap={{ scale: 0.985 }}
            onClick={handleCheckVerification}
            disabled={checking}
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3.5 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 transition-opacity disabled:opacity-60 cursor-pointer"
          >
            {checking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {checking ? "Verifying with server…" : "I've verified my email"}
          </motion.button>

          {/* Resend */}
          <motion.button
            whileTap={{ scale: 0.985 }}
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            className="flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-surface py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-alt disabled:opacity-60 cursor-pointer shadow-xs"
          >
            {resending && <Loader2 className="h-4 w-4 animate-spin" />}
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : resending
                ? "Sending link…"
                : "Resend verification email"}
          </motion.button>

          {/* Sign out and use a different account */}
          <button
            disabled={loggingOut}
            onClick={async () => {
              if (loggingOut) return;
              setLoggingOut(true);
              try {
                await logout();
                nav({ to: "/login" });
              } catch (err: any) {
                console.error("Sign out failed on verify-email page:", err);
                toast.error("Sign out failed. Please try again.");
                // Ensure redirect to /login still occurs so user is not permanently trapped on unverified screen
                nav({ to: "/login" });
              } finally {
                setLoggingOut(false);
              }
            }}
            className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-text-secondary hover:text-text-primary hover:underline cursor-pointer disabled:opacity-60"
          >
            {loggingOut && <Loader2 className="h-3 w-3 animate-spin" />}
            {loggingOut ? "Signing out…" : "Use a different account"}
          </button>
        </div>

        <p className="mt-8 text-xs text-text-secondary">
          SpotLite · Unified Enterprise & Financial Intelligence
        </p>
      </motion.div>
    </div>
  );
}
