import { createFileRoute, useNavigate, redirect, isRedirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sparkles, Lock, Loader2, ArrowRight, ArrowLeft, Building2, User, MapPin } from "lucide-react";
import { useAuth, getAuthSnapshot } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { auth } from "@/firebase/firebase";

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

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Complete your profile · Spotlite" },
      {
        name: "description",
        content: "Complete your personal profile and set up your financial workspace.",
      },
    ],
  }),
  beforeLoad: async () => {
    // 1. Instant check from in-memory AuthSnapshot
    const snapshot = getAuthSnapshot();

    if (!snapshot.loading && snapshot.user) {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        throw redirect({ to: "/verify-email" });
      }
      if (snapshot.user.profile_completed) {
        throw redirect({ to: "/home" });
      }
      return;
    }

    // 2. Fallback for initial load / hard refresh
    const fbUser = auth.currentUser ?? (await waitForAuth());

    if (!fbUser) {
      throw redirect({ to: "/login" });
    }

    if (!fbUser.emailVerified) {
      throw redirect({ to: "/verify-email" });
    }

    // If profile is already completed, onboarding is done - send to dashboard
    try {
      const { api: apiInstance } = await import("@/lib/api");
      const backendUser = await apiInstance.get<{ profile_completed: boolean }>("/api/auth/me");
      if (backendUser.profile_completed) {
        throw redirect({ to: "/home" });
      }
    } catch (err) {
      if (isRedirect(err)) {
        throw err;
      }
      console.error("Error checking profile completion in onboarding beforeLoad:", err);
      if (err && typeof err === "object" && "status" in err && (err as any).status === 401) {
        throw redirect({ to: "/login" });
      }
    }
  },
  component: Onboarding,
});

function Onboarding() {
  const nav = useNavigate();
  const { user, loading, refreshUser } = useAuth();

  // Step tracking (1: Profile, 2: Address, 3: Banking Info)
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  const [panNumber, setPanNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [bankCount, setBankCount] = useState("1");
  const [primaryBank, setPrimaryBank] = useState("");

  // Pre-fill full name if auth state changes and name isn't set yet
  useEffect(() => {
    if (user && !fullName) {
      const display = user.email.split("@")[0];
      setFullName(display.charAt(0).toUpperCase() + display.slice(1));
    }
  }, [user, fullName]);

  // Gatekeeping: Redirect to dashboard if profile is already completed
  useEffect(() => {
    if (!loading && user && user.profile_completed) {
      nav({ to: "/home", replace: true });
    }
  }, [user, loading, nav]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  // Step 1 Validation
  const isStep1Valid = fullName.trim().length >= 2 && phone.trim().length >= 10 && dob && gender;

  // Step 2 Validation
  const isStep2Valid = address.trim().length >= 5 && city.trim().length >= 2 && stateName.trim().length >= 2 && /^\d{6}$/.test(pincode);

  // Step 3 Validation
  const isStep3Valid = occupation && bankCount && primaryBank.trim().length >= 2;

  const nextStep = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setSubmitting(true);
    try {
      // PAN Number regex validation (optional but if entered, must be valid PAN format)
      if (panNumber.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(panNumber.trim())) {
        toast.error("Invalid PAN format. Example: ABCDE1234F");
        setSubmitting(false);
        return;
      }

      // Format birthdate to ISO datetime
      const isoDob = new Date(dob).toISOString();

      await api.patch("/api/persons/me", {
        full_name: fullName.trim(),
        phone: phone.trim(),
        date_of_birth: isoDob,
        gender,
        address: address.trim(),
        city: city.trim(),
        state: stateName.trim(),
        pincode: pincode.trim(),
        pan_number: panNumber.trim() ? panNumber.trim().toUpperCase() : null,
        occupation,
        bank_count: parseInt(bankCount, 10),
        primary_bank: primaryBank.trim(),
      });

      toast.success("Profile updated successfully!");

      // Update the AuthContext user object so it reflects profile_completed: true
      await refreshUser();

      // Redirect to home
      nav({ to: "/home" });
    } catch (err: any) {
      toast.error(err.message || "Failed to complete profile onboarding. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2 bg-background">
      {/* ---- Left hero panel (desktop) ---- */}
      <div className="relative hidden flex-col justify-between bg-brand p-10 text-on-brand md:flex">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-display text-xl font-bold">Spotlite</span>
        </div>
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">
            Let's personalize
            <br />
            your experience.
          </h2>
          <p className="mt-4 text-sm opacity-90 max-w-sm">
            We use this information to configure your dashboard, verify financial details (like PAN/Tax queries), and customize AI insights to your occupation and lifestyle.
          </p>
          <ul className="mt-8 space-y-3 text-sm opacity-90">
            <li className="flex items-center gap-2">
              <User className="h-4 w-4" /> Personal Profile
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Billing & Locality
            </li>
            <li className="flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Banking & Accounts
            </li>
          </ul>
        </div>
        <p className="text-xs opacity-70">Secured with AES-256 bit encryption at rest</p>
      </div>

      {/* ---- Right form panel ---- */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-16 overflow-y-auto">
        <div className="md:hidden mb-8 flex items-center gap-2 text-brand">
          <Sparkles className="h-5 w-5" />
          <span className="font-display text-lg font-bold">Spotlite</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-text-secondary font-medium mb-2">
            <span>STEP {step} OF 3</span>
            <span>{step === 1 ? "Personal Profile" : step === 2 ? "Contact & Address" : "Financial & Banking"}</span>
          </div>
          <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-gradient transition-all duration-300 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()} className="space-y-5">
          {/* STEP 1: PERSONAL INFORMATION */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="font-display text-3xl font-bold">About You</h1>
                <p className="text-sm text-text-secondary mt-1">First, let's get to know you.</p>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="John Doe"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">Gender</label>
                <select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={!isStep1Valid}
                className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand disabled:opacity-60 mt-6"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* STEP 2: ADDRESS */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="font-display text-3xl font-bold">Where do you live?</h1>
                <p className="text-sm text-text-secondary mt-1">This helps us customize regional and local features.</p>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="Flat 101, Park Street"
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="Mumbai"
                />
              </div>

              {/* State */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">State</label>
                <input
                  type="text"
                  required
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="Maharashtra"
                />
              </div>

              {/* Pincode */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">Pincode (6 Digits)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="400001"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex flex-1 items-center justify-center gap-2 rounded-pill border border-border bg-surface py-3 text-sm font-semibold text-text-primary hover:bg-surface-alt"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep2Valid}
                  className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand disabled:opacity-60"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: FINANCIAL & BANKING */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="font-display text-3xl font-bold">Financial Background</h1>
                <p className="text-sm text-text-secondary mt-1">Tell us about your finance setup to isolate workspace recommendations.</p>
              </div>

              {/* Occupation */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">Occupation</label>
                <select
                  required
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 appearance-none"
                >
                  <option value="">Select Occupation</option>
                  <option value="Salaried Employee">Salaried Employee</option>
                  <option value="Self-Employed / Business">Self-Employed / Business</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Student">Student</option>
                  <option value="Retired">Retired</option>
                  <option value="Homemaker">Homemaker</option>
                </select>
              </div>

              {/* How many bank accounts */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">How many bank accounts do you hold?</label>
                <select
                  required
                  value={bankCount}
                  onChange={(e) => setBankCount(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 appearance-none"
                >
                  <option value="1">1 Account</option>
                  <option value="2">2 Accounts</option>
                  <option value="3">3 Accounts</option>
                  <option value="4">4 Accounts</option>
                  <option value="5">5+ Accounts</option>
                </select>
              </div>

              {/* Primary Bank */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">What is your primary bank?</label>
                <input
                  type="text"
                  required
                  value={primaryBank}
                  onChange={(e) => setPrimaryBank(e.target.value)}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="e.g. State Bank of India"
                />
              </div>

              {/* PAN Number (Optional) */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="block text-xs font-medium text-text-secondary">PAN Card Number (Optional)</label>
                  <span className="text-xs text-text-secondary font-light">Optional</span>
                </div>
                <input
                  type="text"
                  maxLength={10}
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  className="w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  placeholder="ABCDE1234F"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex flex-1 items-center justify-center gap-2 rounded-pill border border-border bg-surface py-3 text-sm font-semibold text-text-primary hover:bg-surface-alt"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={submitting || !isStep3Valid}
                  className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand disabled:opacity-60"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Saving Info…" : "Complete Setup"}
                </button>
              </div>
            </div>
          )}
        </form>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
          <Lock className="h-3 w-3" /> Data is stored in secure, compliance-ready sandbox.
        </p>
      </div>
    </div>
  );
}
