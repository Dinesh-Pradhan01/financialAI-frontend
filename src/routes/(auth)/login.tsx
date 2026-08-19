import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth, getAuthSnapshot } from "@/shared/contexts/AuthContext";
import { auth } from "@/shared/firebase/firebase";
import { waitForAuth } from "@/shared/firebase/auth";
import { GoogleSignInButton } from "@/features/auth/components/GoogleSignInButton";
import { AuthHeroPanel } from "@/features/auth/components/AuthHeroPanel";
import { SpotLiteBrand } from "@/shared/components/SpotLiteBrand";

import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";

export const Route = createFileRoute("/(auth)/login")({
  head: () => ({
    meta: [
      { title: "Log in · SpotLite Intelligence" },
      {
        name: "description",
        content: "Log in to SpotLite, unified workforce risk and financial intelligence.",
      },
    ],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;

    const snapshot = getAuthSnapshot();
    if (!snapshot.loading && snapshot.user) {
      if (snapshot.user.email_verified) {
        throw redirect({ to: "/home" });
      } else {
        throw redirect({ to: "/signup" });
      }
    }
  },
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const { user, loading, login, resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = email.trim().length > 0 && password.length > 0;

  // If user is already authenticated/synced, navigate away from login
  useEffect(() => {
    if (!loading && user) {
      if (user.email_verified) {
        nav({ to: "/home", replace: true });
      } else {
        nav({ to: "/signup", replace: true });
      }
    }
  }, [user, loading, nav]);

  if (loading) {
    return <SpotliteLoader message="Verifying session…" subMessage="SpotLite Intelligence" />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);

      // Check email verification
      const { auth } = await import("@/shared/firebase/firebase");
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          await currentUser.reload();
        } catch {
          // ignore reload error
        }
      }

      if (currentUser && !currentUser.emailVerified) {
        nav({ to: "/signup" });
        return;
      }

      // Deferred onboarding: go straight to dashboard home
      nav({ to: "/home", replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Login failed. Please try again.";

      if (msg.includes("auth/invalid-credential") || msg.includes("auth/wrong-password")) {
        toast.error("Invalid email or password.");
      } else if (msg.includes("auth/user-not-found")) {
        toast.error("No account found with that email.");
      } else if (msg.includes("auth/too-many-requests")) {
        toast.error("Too many attempts. Please try again later.");
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleForgotPassword(e: React.MouseEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address first, then click 'Forgot password?'.");
      return;
    }
    try {
      await resetPassword(email.trim());
      toast.success("Password reset link sent.", {
        description: `Check ${email.trim()} for password reset instructions.`,
      });
    } catch {
      toast.error("Failed to send reset email. Please try again.");
    }
  }

  return (
    <div className="relative grid min-h-screen md:grid-cols-2 bg-white overflow-hidden">
      {/* ---- Left form panel ---- */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-20 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="mx-auto w-full max-w-md"
        >
          {/* Mobile Brand Header */}
          <SpotLiteBrand size="sm" className="md:hidden mb-8" />

          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Sign in to access your executive intelligence portal.
            </p>
          </div>

          <div className="mt-8">
            <GoogleSignInButton />
          </div>

          <div className="relative mt-6 flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <span className="shrink-0 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Or continue with email
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-semibold text-text-secondary">
                Work Email address
              </label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs"
                placeholder="name@company.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-xs font-semibold text-text-secondary">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPwd ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 pr-12 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-semibold text-brand hover:underline cursor-pointer transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !isFormValid}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {/* Signup link */}
          <p className="mt-8 text-center text-sm text-text-secondary">
            Don't have an account?{" "}
            <Link
              to="/signup"
              preload="intent"
              className="font-semibold text-brand hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
            <Lock className="h-3 w-3" /> End-to-end 256-bit encrypted session
          </p>
        </motion.div>
      </div>

      {/* ---- Right hero panel (desktop) with dark blue and sine curve divider ---- */}
      <AuthHeroPanel />
    </div>
  );
}
