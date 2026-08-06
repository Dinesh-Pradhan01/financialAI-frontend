import { createFileRoute, useNavigate, useParams, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Sparkles, Building2, Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth, getAuthSnapshot } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

export const Route = createFileRoute("/accept-invite/$token")({
  component: AcceptInvitePage,
});

function AcceptInvitePage() {
  const { token } = Route.useParams();
  const nav = useNavigate();
  const { user: authUser, refreshUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  useEffect(() => {
    async function verifyInvite() {
      try {
        const res = await api.get<any>(`/api/invite/verify/${token}`);
        setInviteData(res);
      } catch (err: any) {
        console.error("Failed to verify invite", err);
        setError(err.message || "Invalid or expired invite link.");
      } finally {
        setLoading(false);
      }
    }
    verifyInvite();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteData) return;
    
    setProcessing(true);
    
    try {
      if (isLoginMode) {
        // Just log in
        await signInWithEmailAndPassword(auth, inviteData.email, password);
      } else {
        // Registration mode
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (password.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }
        
        // Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, inviteData.email, password);
        
        // Call backend registration
        await api.post("/api/auth/register", {
          firebase_uid: userCredential.user.uid,
          email: inviteData.email,
          full_name: inviteData.full_name,
        });
      }
      
      // Accept invite
      await api.post(`/api/invite/accept/${token}`, {});
      
      await refreshUser();
      
      toast.success("Successfully joined the workspace!");
      nav({ to: "/home" });
      
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to accept invite");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (error || !inviteData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-sm text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mb-6">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Invalid Invite</h2>
          <p className="text-sm text-text-secondary mb-6">{error}</p>
          <Link to="/" className="text-brand font-medium hover:underline text-sm">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-background">
      {/* Left panel - Info */}
      <div className="hidden lg:flex flex-col justify-between bg-brand p-12 text-on-brand relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-display text-2xl font-bold tracking-tight">SpotLite</span>
          </div>
        </div>
        
        <div className="relative z-10 my-auto space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/15">
            <Building2 className="h-3.5 w-3.5" />
            <span>Workspace Invitation</span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight">
            You've been invited to join <span className="text-emerald-400">{inviteData.company_name}</span>
          </h2>
          <p className="text-white/80 leading-relaxed text-lg">
            Join your team on SpotLite to manage financial intelligence, vendor lists, and customer profiles securely.
          </p>
          <div className="rounded-2xl bg-white/10 p-5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-white uppercase text-sm">Assigned Role</h3>
            </div>
            <p className="text-xl font-bold capitalize text-white">{inviteData.role === 'cfo' ? 'Chief Financial Officer (CFO)' : 'Human Resources (HR)'}</p>
          </div>
        </div>

        <div className="relative z-10 text-xs font-medium text-white/60">
          Secure, Encrypted Access &bull; Bank-grade security
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-10">
            <Sparkles className="h-6 w-6 text-brand" />
            <span className="font-display text-xl font-bold">SpotLite</span>
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h1 className="font-display text-3xl font-bold tracking-tight">Accept Invitation</h1>
            <p className="text-sm text-text-secondary">
              Set your password to join <strong className="text-text-primary">{inviteData.company_name}</strong> as <strong className="capitalize text-text-primary">{inviteData.role}</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Email</label>
              <input
                type="email"
                disabled
                value={inviteData.email}
                className="w-full rounded-xl border border-border bg-surface-alt px-4 py-3 text-sm text-text-secondary cursor-not-allowed"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Name</label>
              <input
                type="text"
                disabled
                value={inviteData.full_name}
                className="w-full rounded-xl border border-border bg-surface-alt px-4 py-3 text-sm text-text-secondary cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">
                {isLoginMode ? "Password" : "Create Password"}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/60" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>
            </div>

            {!isLoginMode && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/60" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="••••••••"
                    minLength={8}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-brand hover:opacity-90 transition disabled:opacity-70"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Join Workspace <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
            
            <div className="text-center pt-2">
              <button 
                type="button" 
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-xs text-brand font-medium hover:underline"
              >
                {isLoginMode ? "Need to create an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
