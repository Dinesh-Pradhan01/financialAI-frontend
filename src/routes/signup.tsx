import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Lock, Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up · Spotlite" },
      {
        name: "description",
        content: "Create your Spotlite account and start understanding your money.",
      },
    ],
  }),
  component: Signup,
});

// ---------- Password strength rules ----------
const rules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
] as const;

function Signup() {
  const nav = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const allRulesPass = rules.every((r) => r.test(password));
  const passwordsMatch = password === confirm && confirm.length > 0;
  const formValid = email.trim() && allRulesPass && passwordsMatch;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;

    setSubmitting(true);
    try {
      await signup(email.trim(), password);
      toast.success("Account created!", {
        description: "Check your email to verify your address.",
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
    <div className="grid min-h-screen md:grid-cols-2">
      {/* ---- Left hero panel (desktop) ---- */}
      <div className="relative hidden flex-col justify-between bg-brand p-10 text-on-brand md:flex">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-display text-xl font-bold">Spotlite</span>
        </div>
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">
            Your money,
            <br />
            finally understood.
          </h2>
          <ul className="mt-8 space-y-3 text-sm opacity-90">
            <li>• Cross-bank blind-spot detection</li>
            <li>• AI coach that speaks first</li>
            <li>• Free, forever for core features</li>
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

        <h1 className="font-display text-3xl font-bold">Create your account</h1>
        <p className="mt-1 text-text-secondary">
          Start finding the money you're missing.
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
            <label htmlFor="signup-email" className="block text-xs font-medium text-text-secondary">
              Email address
            </label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password" className="block text-xs font-medium text-text-secondary">
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

            {/* Strength indicators */}
            {password.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs">
                {rules.map((r) => {
                  const pass = r.test(password);
                  return (
                    <li
                      key={r.label}
                      className={`flex items-center gap-1.5 ${pass ? "text-success" : "text-text-secondary"}`}
                    >
                      {pass ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      {r.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="signup-confirm" className="block text-xs font-medium text-text-secondary">
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="••••••••"
            />
            {confirm.length > 0 && !passwordsMatch && (
              <p className="flex items-center gap-1.5 text-xs text-destructive">
                <X className="h-3 w-3" /> Passwords do not match
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !formValid}
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
          <Lock className="h-3 w-3" /> 256-bit encrypted
        </p>
      </div>
    </div>
  );
}
