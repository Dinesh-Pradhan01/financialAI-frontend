import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";



export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in · Spotlite" },
      {
        name: "description",
        content: "Log in to Spotlite, your agentic money companion.",
      },
    ],
  }),
  // No beforeLoad redirect — always show the login form.
  // Users must explicitly click "Sign in" to proceed.
  // The _app layout guard handles protecting dashboard routes.
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const { login, user, loading, refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);

      // Check email verification
      const { auth } = await import("@/firebase/firebase");
      const currentUser = auth.currentUser;

      if (currentUser && !currentUser.emailVerified) {
        nav({ to: "/verify-email" });
        return;
      }

      // Fetch fresh user profile to check profile_completed
      // (the AuthContext sync may still be in progress, so we fetch directly)
      const { api } = await import("@/lib/api");
      try {
        const backendUser = await api.get<{ profile_completed: boolean }>("/api/auth/me");
        if (backendUser.profile_completed) {
          nav({ to: "/home", replace: true });
        } else {
          nav({ to: "/onboarding", replace: true });
        }
      } catch {
        // If /api/auth/me fails, try refreshing user from context
        await refreshUser();
        if (user?.profile_completed) {
          nav({ to: "/home", replace: true });
        } else {
          nav({ to: "/onboarding", replace: true });
        }
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Login failed. Please try again.";

      // Map Firebase error codes to user-friendly messages
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

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* ---- Left hero panel (desktop) ---- */}
      <div className="relative hidden flex-col justify-between bg-brand p-10 text-on-brand md:flex">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-display text-xl font-bold">Spotlite</span>
        </div>
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">
            See the money
            <br />
            you're missing.
          </h2>
          <ul className="mt-8 space-y-3 text-sm opacity-90">
            <li>• Bank-grade security</li>
            <li>• You own your data</li>
            <li>• DPDP Act 2023 compliant</li>
          </ul>
        </div>
        <p className="text-xs opacity-70">Powered by RBI Account Aggregator (Phase 2)</p>
      </div>

      {/* ---- Right form panel ---- */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-16">
        <div className="md:hidden mb-8 flex items-center gap-2 text-brand">
          <Sparkles className="h-5 w-5" />
          <span className="font-display text-lg font-bold">Spotlite</span>
        </div>

        <h1 className="font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-1 text-text-secondary">
          Log in to see your money.
        </p>

        <div className="mt-8">
          <GoogleSignInButton />
        </div>

        <div className="relative mt-6 flex items-center py-2">
          <div className="flex-grow border-t border-border"></div>
          <span className="shrink-0 px-4 text-xs text-text-secondary uppercase">Or continue with email</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="block text-xs font-medium text-text-secondary">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="login-password" className="block text-xs font-medium text-text-secondary">
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
                className="w-full rounded-pill border border-border bg-surface px-4 py-3 pr-12 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/login"
              onClick={async (e) => {
                e.preventDefault();
                if (!email.trim()) {
                  toast.error("Enter your email first, then click Forgot password.");
                  return;
                }
                try {
                  const { resetPassword } = await import("@/contexts/AuthContext").then(
                    (m) => {
                      // We can't call hook here — use the raw function instead
                      throw new Error("use-raw");
                    },
                  ).catch(async () => {
                    const { resetUserPassword } = await import("@/firebase/auth");
                    return { resetPassword: resetUserPassword };
                  });
                  await resetPassword(email.trim());
                  toast.success("Password reset email sent.", {
                    description: `Check ${email.trim()} for the reset link.`,
                  });
                } catch (err) {
                  toast.error("Failed to send reset email. Please try again.");
                }
              }}
              className="text-xs font-semibold text-brand hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-6 text-center text-sm text-text-secondary">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-brand hover:underline">
            Create one
          </Link>
        </p>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
          <Lock className="h-3 w-3" /> 256-bit encrypted
        </p>
      </div>
    </div>
  );
}
