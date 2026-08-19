import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, getAuthSnapshot } from "@/shared/contexts/AuthContext";
import { auth } from "@/shared/firebase/firebase";
import { waitForAuth } from "@/shared/firebase/auth";
import { GoogleSignInButton } from "@/features/auth/components/GoogleSignInButton";
import { AuthHeroPanel } from "@/features/auth/components/AuthHeroPanel";
import { SpotLiteBrand } from "@/shared/components/SpotLiteBrand";
import { rules } from "@/features/auth/lib/passwordRules";

import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";

export const Route = createFileRoute("/(auth)/signup")({
  head: () => ({
    meta: [
      { title: "Sign up · SpotLite Intelligence" },
      {
        name: "description",
        content: "Create your SpotLite account for unified workforce risk and financial intelligence.",
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
        throw redirect({ to: "/verify-email" });
      }
    }
  },
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const { user, loading, signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If user is already authenticated/synced, navigate away from signup
  useEffect(() => {
    if (!loading && user) {
      if (user.email_verified) {
        nav({ to: "/home", replace: true });
      } else {
        nav({ to: "/verify-email", replace: true });
      }
    }
  }, [user, loading, nav]);

  if (loading) {
    return <SpotliteLoader message="Verifying session…" subMessage="SpotLite Intelligence" />;
  }

  const allRulesPass = rules.every((r) => r.test(password));
  const passwordsMatch = password === confirm && confirm.length > 0;
  const formValid = email.trim() && allRulesPass && passwordsMatch;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;

    setSubmitting(true);
    try {
      await signup(email.trim(), password);
      toast.success("Account created successfully!", {
        description: "Check your email for the verification link to activate your account.",
      });
      nav({ to: "/verify-email" });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Signup failed. Please try again.";

      if (msg.includes("auth/email-already-in-use")) {
        toast.error("An account with this email already exists.");
      } else if (msg.includes("auth/weak-password")) {
        toast.error("Password is too weak. Follow the requirements below.");
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
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
              Create your account
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Get started with enterprise workforce and financial intelligence.
            </p>
          </div>

          <div className="mt-8">
            <GoogleSignInButton />
          </div>

          <div className="relative mt-6 flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <span className="shrink-0 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Or register with email
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="signup-email" className="block text-xs font-semibold text-text-secondary">
                Work Email address
              </label>
              <input
                id="signup-email"
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
              <label htmlFor="signup-password" className="block text-xs font-semibold text-text-secondary">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPwd ? "text" : "password"}
                  required
                  autoComplete="new-password"
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

              {/* Password strength rules */}
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="mt-2.5 grid grid-cols-2 gap-1.5 text-xs overflow-hidden"
                  >
                    {rules.map((r) => {
                      const pass = r.test(password);
                      return (
                        <li
                          key={r.label}
                          className={`flex items-center gap-1.5 font-medium transition-colors ${
                            pass ? "text-success" : "text-text-secondary"
                          }`}
                        >
                          {pass ? (
                            <Check className="h-3.5 w-3.5 text-success shrink-0" />
                          ) : (
                            <X className="h-3.5 w-3.5 text-text-secondary/60 shrink-0" />
                          )}
                          <span>{r.label}</span>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="signup-confirm" className="block text-xs font-semibold text-text-secondary">
                Confirm Password
              </label>
              <input
                id="signup-confirm"
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs"
                placeholder="••••••••"
              />
              <AnimatePresence>
                {confirm.length > 0 && !passwordsMatch && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-1.5 text-xs text-destructive font-medium mt-1"
                  >
                    <X className="h-3.5 w-3.5" /> Passwords do not match
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !formValid}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer mt-2"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Creating account…" : "Create Account"}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              preload="intent"
              className="font-semibold text-brand hover:underline"
            >
              Sign in
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
