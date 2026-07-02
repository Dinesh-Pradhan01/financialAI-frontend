import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sparkles, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in · Spotlite" },
      { name: "description", content: "Log in to Spotlite, your agentic money companion." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("98765 43210");
  const [resendIn, setResendIn] = useState(28);

  useEffect(() => {
    if (step !== "otp" || resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [step, resendIn]);

  return (
    <div className="grid min-h-screen md:grid-cols-2">
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

      <div className="flex flex-col justify-center px-6 py-12 md:px-16">
        <div className="md:hidden mb-8 flex items-center gap-2 text-brand">
          <Sparkles className="h-5 w-5" />
          <span className="font-display text-lg font-bold">Spotlite</span>
        </div>
        <h1 className="font-display text-3xl font-bold">Welcome</h1>
        <p className="mt-1 text-text-secondary">Log in to see your money.</p>

        {step === "phone" ? (
          <div className="mt-8 space-y-3">
            <label className="block text-xs font-medium text-text-secondary">Mobile number</label>
            <div className="flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-3">
              <span className="font-num text-sm text-text-secondary">+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent outline-none font-num"
                placeholder="98765 43210"
              />
            </div>
            <button
              onClick={() => {
                setStep("otp");
                setResendIn(28);
                toast.success("OTP sent", { description: `Sent to +91 ${phone}` });
              }}
              className="w-full rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand"
            >
              Get OTP
            </button>
            <div className="flex items-center gap-3 py-3 text-xs text-text-secondary">
              <span className="h-px flex-1 bg-border" /> or{" "}
              <span className="h-px flex-1 bg-border" />
            </div>
            <button
              onClick={() => nav({ to: "/consent" })}
              className="w-full rounded-pill border border-border bg-surface py-3 text-sm font-semibold text-brand"
            >
              Continue with SBI YONO
            </button>
            <p className="flex items-center justify-center gap-1.5 pt-2 text-xs text-text-secondary">
              <Lock className="h-3 w-3" /> 256-bit encrypted
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <p className="text-sm text-text-secondary">Enter the OTP sent to +91 {phone}</p>
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  defaultValue={["1", "2", "3", "4", "5", "6"][i]}
                  maxLength={1}
                  className="h-12 w-12 rounded-xl border border-border bg-surface text-center font-num text-lg"
                />
              ))}
            </div>
            {resendIn > 0 ? (
              <p className="font-num text-xs text-text-secondary">
                Resend in 0:{String(resendIn).padStart(2, "0")}
              </p>
            ) : (
              <button
                onClick={() => {
                  setResendIn(28);
                  toast.success("OTP resent", { description: `Sent to +91 ${phone}` });
                }}
                className="text-xs font-semibold text-brand hover:underline"
              >
                Resend OTP
              </button>
            )}
            <button
              onClick={() => nav({ to: "/consent" })}
              className="w-full rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand"
            >
              Verify & continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
