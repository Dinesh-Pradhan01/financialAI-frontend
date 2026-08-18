import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Zap,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  ShieldCheck,
  Building2,
  AlertCircle,
  Check,
  X as XIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel";
import { SpotliteLoader } from "@/components/ui/SpotliteLoader";

export const Route = createFileRoute("/accept-invite/$token")({
  head: () => ({
    meta: [
      { title: "Accept Workspace Invitation · SpotLite" },
      {
        name: "description",
        content: "Set up your executive account to join your company workspace on SpotLite Intelligence.",
      },
    ],
  }),
  component: AcceptInvitePage,
});

// ---------- Password strength rules ----------
const rules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
] as const;

function AcceptInvitePage() {
  const { token } = Route.useParams();
  const nav = useNavigate();
  const { refreshUser, sync } = useAuth();

  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function verifyInvite() {
      try {
        let res;
        try {
          res = await api.get<any>(`/api/auth/invite/verify/${token}`);
        } catch {
          res = await api.get<any>(`/api/invite/verify/${token}`);
        }
        setInviteData(res);
        if (res.email) setEmail(res.email);
        if (res.full_name) setFullName(res.full_name);
      } catch (err: any) {
        console.error("Failed to verify invite", err);
        setError(err.message || "Invalid or expired invite link (valid for 24 hours).");
      } finally {
        setLoading(false);
      }
    }
    verifyInvite();
  }, [token]);

  const handleFillDemoData = () => {
    if (!inviteData) return;
    const defaultName =
      inviteData.full_name ||
      (inviteData.role === "cfo" ? "Alex Morgan (CFO)" : "Jordan Taylor (HR)");
    setFullName(defaultName);
    setPassword("Password123!");
    setConfirmPassword("Password123!");
    toast.success("Demo credentials populated!", {
      description: "Click 'Join Workspace' to complete setup.",
    });
  };

  const allRulesPassed = rules.every((r) => r.test(password));
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const isFormValid =
    fullName.trim().length >= 2 &&
    email.trim().includes("@") &&
    allRulesPassed &&
    passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteData) return;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setProcessing(true);

    try {
      // 1. Sign out any existing session to prevent previous user session bleed
      try {
        await auth.signOut();
      } catch {
        // ignore sign out error
      }

      // 2. Call dedicated auth password setup endpoint
      await api.post("/api/auth/invite/accept-with-password", {
        token,
        password,
        email,
        full_name: fullName.trim(),
      });

      // 3. Sign in to Firebase with the newly created credentials
      await signInWithEmailAndPassword(auth, email, password);

      // 4. Sync new user profile into AuthContext
      if (sync) {
        await sync();
      } else {
        await refreshUser();
      }

      toast.success(
        `Account created as ${inviteData.role?.toUpperCase()}!`,
      );
      nav({ to: "/verify-email" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to accept invite");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <SpotliteLoader
        message="Verifying workspace invitation…"
        subMessage="SpotLite Intelligence"
      />
    );
  }

  if (error || !inviteData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-sm text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mb-6">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Invalid or Expired Invite</h2>
          <p className="text-sm text-text-secondary mb-6">{error}</p>
          <Link to="/" className="text-brand font-medium hover:underline text-sm">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const roleLabel =
    inviteData.role === "cfo"
      ? "Chief Financial Officer (CFO)"
      : inviteData.role === "hr"
      ? "Human Resources (HR)"
      : inviteData.role?.toUpperCase() || "Executive";

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
          <Link to="/" className="md:hidden mb-6 flex items-center gap-2.5 w-fit">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/25">
              <Zap size={18} className="fill-current text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                Spot<span className="text-primary">Lite</span>
              </span>
              <span className="text-[0.5625rem] font-semibold uppercase tracking-widest text-muted-foreground -mt-1">
                Intelligence
              </span>
            </div>
          </Link>

          {/* Heading and Demo Button */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-[11px] font-bold text-brand mb-2">
                <Building2 className="h-3 w-3" /> Workspace Invite
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Join your workspace
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                Invited to join <strong className="text-text-primary">{inviteData.company_name}</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={handleFillDemoData}
              className="flex items-center gap-1.5 rounded-pill bg-brand/10 hover:bg-brand/20 border border-brand/30 px-3 py-1.5 text-xs font-bold text-brand transition shadow-xs cursor-pointer shrink-0 mt-1"
              title="Auto-fill with sample test data"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Demo Data
            </button>
          </div>

          {/* Role Pill Card */}
          <div className="mt-5 rounded-2xl border border-brand/25 bg-linear-to-r from-brand/10 via-brand/5 to-transparent p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-brand">
                Designated Executive Role
              </span>
              <span className="text-xs sm:text-sm font-bold text-foreground">
                {roleLabel}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Work Email */}
            <div className="space-y-1.5">
              <label htmlFor="invite-email" className="block text-xs font-semibold text-text-secondary">
                Work Email address
              </label>
              <input
                id="invite-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs"
                placeholder="name@company.com"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="invite-name" className="block text-xs font-semibold text-text-secondary">
                Full Name
              </label>
              <input
                id="invite-name"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs"
              />
            </div>

            {/* Create Password */}
            <div className="space-y-1.5">
              <label htmlFor="invite-password" className="block text-xs font-semibold text-text-secondary">
                Create Password
              </label>
              <div className="relative">
                <input
                  id="invite-password"
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

              {/* Password strength checklist */}
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-1.5 pt-2 overflow-hidden"
                  >
                    {rules.map((rule) => {
                      const passed = rule.test(password);
                      return (
                        <div
                          key={rule.label}
                          className={`flex items-center gap-1.5 text-xs transition-colors ${
                            passed ? "text-success font-medium" : "text-text-secondary/60"
                          }`}
                        >
                          {passed ? (
                            <Check className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <XIcon className="h-3.5 w-3.5 shrink-0" />
                          )}
                          <span>{rule.label}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="invite-confirm" className="block text-xs font-semibold text-text-secondary">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="invite-confirm"
                  type={showConfirmPwd ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 pr-12 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
                  aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                >
                  {showConfirmPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-destructive pt-1">Passwords do not match.</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing || !isFormValid}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer mt-2"
            >
              {processing && <Loader2 className="h-4 w-4 animate-spin" />}
              {processing ? "Joining Workspace…" : "Join Workspace"}
            </button>
          </form>

          {/* Login fallback link */}
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
      <AuthHeroPanel role={inviteData?.role} companyName={inviteData?.company_name} />
    </div>
  );
}
