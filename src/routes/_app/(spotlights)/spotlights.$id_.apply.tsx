import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Copy,
  Building2,
  FileCheck2,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { getB2BSpotlightById, b2bSpotlights } from "@/features/spotlights/data/b2bSpotlights";
import { formatINR } from "@/shared/lib/format";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { applyTrigger } from "@/shared/store/slices/spotlightsSlice";
import { selectIsApplied } from "@/shared/store/selectors";
import { cn } from "@/shared/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

export const Route = createFileRoute("/_app/(spotlights)/spotlights/$id_/apply")({
  head: () => ({
    meta: [
      { title: "Executive Remediation Console · Spotlite" },
      {
        name: "description",
        content: "Execute corporate dispute claims, payment holds, and treasury sweep instructions.",
      },
    ],
  }),
  component: B2BRemediationConsole,
});

function B2BRemediationConsole() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const alreadyApplied = useAppSelector(selectIsApplied(id));
  const spotlight = getB2BSpotlightById(id);
  const shouldReduceMotion = useReducedMotion();

  // Remediation form state
  const [monthsClaimed, setMonthsClaimed] = useState(6);
  const [resolutionType, setResolutionType] = useState("credit-note");
  const [renewalTerm, setRenewalTerm] = useState(24);
  const [discountTarget, setDiscountTarget] = useState(7.5);
  const [sweepAmount, setSweepAmount] = useState(2500000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(alreadyApplied);
  const [becChecklist, setBecChecklist] = useState({
    cancelledCheque: true,
    verbalConfirm: true,
    gstinMatch: true,
  });

  if (!spotlight) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center space-y-4">
        <h1 className="font-display text-xl font-bold text-foreground">
          Remediation Target Not Found
        </h1>
        <p className="text-xs text-text-secondary">
          No active B2B remediation configuration exists for ID &ldquo;{id}&rdquo;.
        </p>
        <Link
          to="/spotlights"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold shadow-xs hover:opacity-95"
        >
          <ArrowLeft size={14} /> Back to Spotlights
        </Link>
      </div>
    );
  }

  // Calculated recovery for vendor overbilling
  const calculatedOverbillClaim = useMemo(() => {
    return (185000 - 100000) * monthsClaimed;
  }, [monthsClaimed]);

  // Calculated savings for contract renewal
  const calculatedRenewalSavings = useMemo(() => {
    return Math.round((1450000 * discountTarget) / 100);
  }, [discountTarget]);

  // Calculated interest for treasury sweep
  const calculatedSweepYield = useMemo(() => {
    return Math.round(sweepAmount * 0.065);
  }, [sweepAmount]);

  function handleExecuteRemediation(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      dispatch(applyTrigger(spotlight!.id));

      if (spotlight!.id === "vendor-overbilling") {
        toast.success("Vendor Dispute Claim Registered", {
          description: `Dispute of ${formatINR(calculatedOverbillClaim)} logged against ${spotlight!.entityName}.`,
        });
      } else if (spotlight!.id === "bec-fraud-risk") {
        toast.error("Remittance Hold Activated", {
          description: `Outbound payments to ${spotlight!.entityName} frozen pending bank authentication.`,
        });
      } else {
        toast.success("Executive Action Dispatched", {
          description: `${spotlight!.remediation.title} successfully logged in audit trail.`,
        });
      }
    }, 600);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-10 space-y-6">
      {/* NAVIGATION */}
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <Link
          to="/spotlights/$id"
          params={{ id: spotlight.id }}
          className="inline-flex items-center gap-1.5 hover:text-foreground transition font-medium"
        >
          <ArrowLeft size={14} /> Back to Detail Analysis
        </Link>
        <span className="font-semibold text-text-tertiary">
          Entity: <strong className="text-foreground">{spotlight.entityName}</strong>
        </span>
      </div>

      {/* HEADER */}
      <header
        className={cn(
          "rounded-2xl border p-6 shadow-xs space-y-2 transition",
          spotlight.severity === "high"
            ? "border-rose-500/35 bg-gradient-to-br from-rose-500/10 via-surface to-surface dark:from-rose-950/25 dark:via-surface dark:to-surface"
            : spotlight.severity === "moderate"
            ? "border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-surface to-surface dark:from-amber-950/25 dark:via-surface dark:to-surface"
            : "border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface"
        )}
      >
        <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider">
          <Building2 size={14} />
          <span>Executive Remediation Console</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          {spotlight.remediation.title}
        </h1>
        <p className="text-xs text-text-secondary leading-relaxed">
          {spotlight.remediation.description}
        </p>
      </header>

      {/* SUCCESS CONFIRMATION STATE */}
      {isSuccess ? (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 p-8 text-center space-y-5 shadow-xs"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={shouldReduceMotion ? undefined : { type: "spring", stiffness: 450, damping: 20, delay: 0.08 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xs"
          >
            <CheckCircle2 size={28} />
          </motion.div>
          <div className="space-y-1">
            <h2 className="font-display text-xl font-bold text-foreground">
              Remediation Action Formally Dispatched
            </h2>
            <p className="text-xs text-text-secondary max-w-md mx-auto">
              This action has been sealed in the immutable audit ledger. A formal notification has been queued for your Chartered Accountant and treasury review.
            </p>
          </div>

          <div className="rounded-xl bg-surface p-4 border border-border/60 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-text-tertiary">Resolution Reference:</span>
              <span className="font-mono font-bold text-foreground">SPL-REM-{spotlight.id.toUpperCase().slice(0, 6)}-2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-tertiary">Target Entity:</span>
              <span className="font-semibold text-foreground">{spotlight.entityName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-tertiary">Quantified Impact:</span>
              <span className="font-num tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                {spotlight.id === "vendor-overbilling"
                  ? formatINR(calculatedOverbillClaim)
                  : spotlight.id === "contract-lapse"
                  ? `${formatINR(calculatedRenewalSavings)} / yr`
                  : spotlight.id === "idle-cash-optimization"
                  ? `${formatINR(calculatedSweepYield)} / yr`
                  : spotlight.bigValue}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <motion.button
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              type="button"
              onClick={() => {
                const memo = `Spotlite Formal Resolution Certificate:\n- Reference: SPL-REM-${spotlight.id.toUpperCase().slice(0, 6)}-2026\n- Entity: ${spotlight.entityName}\n- Action: ${spotlight.remediation.title}\n- Date: ${new Date().toLocaleDateString("en-IN")}\nStatus: Verified and Dispatched.`;
                navigator.clipboard.writeText(memo);
                toast.success("Resolution certificate copied to clipboard");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-border hover:bg-surface-alt transition cursor-pointer"
            >
              <Copy size={13} /> Copy Resolution Certificate
            </motion.button>
            <motion.div whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}>
              <Link
                to="/spotlights"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand text-white text-xs font-bold shadow-brand hover:opacity-95 transition cursor-pointer"
              >
                <span>Back to Spotlights Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* INTERACTIVE REMEDIATION FORM */
        <form onSubmit={handleExecuteRemediation} className="space-y-6">
          {/* SCENARIO 1: VENDOR OVERBILLING DISPUTE */}
          {spotlight.id === "vendor-overbilling" && (
            <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-5">
              <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                <FileText size={18} className="text-brand" /> Configure Overbilling Claim Parameters
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="contractBaseRate" className="text-xs font-semibold text-text-secondary">
                    Master Agreement Rate (Monthly Baseline)
                  </label>
                  <input
                    id="contractBaseRate"
                    type="text"
                    readOnly
                    value="₹1,00,000 / mo"
                    className="w-full rounded-xl bg-surface-alt border border-border/70 px-3.5 py-2 text-xs font-num font-bold text-foreground cursor-not-allowed"
                  />
                  <p className="text-[10px] text-text-tertiary">Verified from Document Vault contract.</p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="actualBilledRate" className="text-xs font-semibold text-text-secondary">
                    Actual Average Monthly Billed
                  </label>
                  <input
                    id="actualBilledRate"
                    type="text"
                    readOnly
                    value="₹1,85,000 / mo"
                    className="w-full rounded-xl bg-surface-alt border border-border/70 px-3.5 py-2 text-xs font-num font-bold text-rose-600 dark:text-rose-400 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-text-tertiary">Average from 6 cleared NEFT disbursements.</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="monthsClaimedSlider" className="font-semibold text-foreground">
                    Consecutive Months to Claim in Dispute
                  </label>
                  <span className="font-num font-bold text-brand">{monthsClaimed} Months</span>
                </div>
                <input
                  id="monthsClaimedSlider"
                  type="range"
                  min={1}
                  max={12}
                  step={1}
                  value={monthsClaimed}
                  onChange={(e) => setMonthsClaimed(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-text-tertiary">
                  <span>1 Month (₹85k)</span>
                  <span>6 Months (₹5.10L)</span>
                  <span>12 Months (₹10.20L)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="resolutionSelect" className="text-xs font-semibold text-foreground">
                  Target Settlement Structure
                </label>
                <select
                  id="resolutionSelect"
                  value={resolutionType}
                  onChange={(e) => setResolutionType(e.target.value)}
                  className="w-full rounded-xl bg-surface border border-border px-3.5 py-2 text-xs font-medium text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  <option value="credit-note">Credit Note offset against upcoming monthly billings (Recommended)</option>
                  <option value="refund-wire">Direct RTGS/NEFT cash restitution to company operating account</option>
                  <option value="rate-freeze">Immediate rate rollback to ₹1,00,000 with 12-month extension</option>
                </select>
              </div>

              {/* LIVE RECOVERY SUMMARY CARD */}
              <div className="rounded-xl border border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface p-4 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800/90 dark:text-emerald-300/90 uppercase tracking-wider">
                    Calculated Rupee Claim Amount
                  </span>
                  <motion.div
                    key={calculatedOverbillClaim}
                    initial={shouldReduceMotion ? false : { opacity: 0.7, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="font-num tabular-nums text-2xl font-black text-emerald-600 dark:text-emerald-400"
                  >
                    +{formatINR(calculatedOverbillClaim)}
                  </motion.div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const disputeNotice = `FORMAL CONTRACT BILLING RECONCILIATION NOTICE\n\nTo: Accounts Department, Office Depot Supplies\nFrom: Nimbus Logistics Pvt Ltd (Finance & Operations)\nDate: ${new Date().toLocaleDateString("en-IN")}\nSubject: Dispute of Uncontracted Rate Inflation — Demand for ${formatINR(calculatedOverbillClaim)} Credit Note\n\nDear Accounts Team,\nAn authoritative audit of our master agreement dated 15 Jan 2024 and bank disbursements reveals an uncontracted billing disparity over the last ${monthsClaimed} months:\n- Master Contract Rate: ₹1,00,000 / month\n- Average Billed: ₹1,85,000 / month\n- Monthly Variance: ₹85,000 / month excess\n- Cumulative Claim: ${formatINR(calculatedOverbillClaim)}\n\nPlease issue an immediate credit note or contact our finance team within 7 business days.\n\nSincerely,\nDirector of Finance, Nimbus Logistics`;
                    navigator.clipboard.writeText(disputeNotice);
                    toast.success("Formal dispute notice copied to clipboard", {
                      description: "Ready to email to accounts@officedepot.com",
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface border border-border hover:bg-surface-alt transition cursor-pointer shadow-xs"
                >
                  <Copy size={13} /> Copy Formal Letter
                </button>
              </div>
            </div>
          )}

          {/* SCENARIO 2: BEC FRAUD RISK REMITTANCE HOLD */}
          {spotlight.id === "bec-fraud-risk" && (
            <div className="rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 p-6 shadow-xs space-y-5">
              <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2 border-b border-rose-500/20 pb-3">
                <ShieldAlert size={18} className="text-rose-600" /> Outbound Remittance Verification &amp; Security Hold
              </h2>

              <div className="rounded-xl bg-surface p-4 border border-rose-500/20 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-secondary">Beneficiary Identity:</span>
                  <span className="font-bold text-foreground">{spotlight.entityName}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-border/60">
                  <div className="p-3 rounded-lg bg-surface-alt">
                    <span className="text-[10px] text-text-tertiary block">Historical Verified IFSC</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">HDFC0001234</span>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    <span className="text-[10px] text-rose-700 dark:text-rose-300 block font-bold">Unverified Drift IFSC</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">SBIN0009876</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Mandatory Pre-Remittance Authentication Checklist
                </h3>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface border border-border cursor-pointer">
                    <input
                      type="checkbox"
                      checked={becChecklist.cancelledCheque}
                      onChange={(e) => setBecChecklist({ ...becChecklist, cancelledCheque: e.target.checked })}
                      className="rounded accent-rose-600 h-4 w-4"
                    />
                    <span>Obtain signed &amp; stamped cancelled cheque for branch SBIN0009876</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface border border-border cursor-pointer">
                    <input
                      type="checkbox"
                      checked={becChecklist.verbalConfirm}
                      onChange={(e) => setBecChecklist({ ...becChecklist, verbalConfirm: e.target.checked })}
                      className="rounded accent-rose-600 h-4 w-4"
                    />
                    <span>Dual-control phone verification with counterparty CFO on verified phone record</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface border border-border cursor-pointer">
                    <input
                      type="checkbox"
                      checked={becChecklist.gstinMatch}
                      onChange={(e) => setBecChecklist({ ...becChecklist, gstinMatch: e.target.checked })}
                      className="rounded accent-rose-600 h-4 w-4"
                    />
                    <span>Verify new bank branch matches GST portal registered banking records</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SCENARIO 3: CONTRACT LAPSE RENEWAL */}
          {spotlight.id === "contract-lapse" && (
            <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-5">
              <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                <FileCheck2 size={18} className="text-brand" /> Procurement Contract Renewal Term Sheet
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="renewalTenure" className="text-xs font-semibold text-foreground">
                    Renewal Contract Duration
                  </label>
                  <select
                    id="renewalTenure"
                    value={renewalTerm}
                    onChange={(e) => setRenewalTerm(parseInt(e.target.value, 10))}
                    className="w-full rounded-xl bg-surface border border-border px-3.5 py-2 text-xs font-medium text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                  >
                    <option value={12}>12 Months (1 Year Term)</option>
                    <option value={24}>24 Months (2 Year Term — Volume Lock)</option>
                    <option value={36}>36 Months (3 Year Multi-Year SLA)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="discountTargetSelect" className="text-xs font-semibold text-foreground">
                    Target Volume Renewal Discount
                  </label>
                  <select
                    id="discountTargetSelect"
                    value={discountTarget}
                    onChange={(e) => setDiscountTarget(parseFloat(e.target.value))}
                    className="w-full rounded-xl bg-surface border border-border px-3.5 py-2 text-xs font-medium text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                  >
                    <option value={5.0}>5.0% Standard Renewal Discount</option>
                    <option value={7.5}>7.5% Two-Year Commitment Discount (Target)</option>
                    <option value={10.0}>10.0% Multi-Year Cloud Enterprise Discount</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 via-surface to-surface dark:from-emerald-950/25 dark:via-surface dark:to-surface p-4 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800/90 dark:text-emerald-300/90 uppercase tracking-wider">
                    Projected Annual Savings from Renewal
                  </span>
                  <motion.div
                    key={calculatedRenewalSavings}
                    initial={shouldReduceMotion ? false : { opacity: 0.7, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="font-num tabular-nums text-2xl font-black text-emerald-600 dark:text-emerald-400"
                  >
                    +{formatINR(calculatedRenewalSavings)} / yr
                  </motion.div>
                </div>
                <div className="text-right text-xs text-text-secondary">
                  <span>Effective Annual Spend: </span>
                  <strong className="text-foreground font-num tabular-nums font-bold">
                    {formatINR(1450000 - calculatedRenewalSavings)}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* SCENARIO 4: IDLE CASH TREASURY SWEEP */}
          {spotlight.id === "idle-cash-optimization" && (
            <div className="rounded-2xl border border-teal-500/30 bg-surface p-6 shadow-xs space-y-5">
              <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                <Sparkles size={18} className="text-teal-600 dark:text-teal-400" /> Treasury Sweep Instruction Setup
              </h2>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="sweepAmountSlider" className="font-semibold text-foreground">
                    Surplus Cash to Sweep into Overnight/Liquid Yield
                  </label>
                  <span className="font-num tabular-nums font-bold text-teal-600 dark:text-teal-400">{formatINR(sweepAmount)}</span>
                </div>
                <input
                  id="sweepAmountSlider"
                  type="range"
                  min={500000}
                  max={3030000}
                  step={50000}
                  value={sweepAmount}
                  onChange={(e) => setSweepAmount(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-text-tertiary">
                  <span>₹5.00L Minimum</span>
                  <span>₹25.00L Suggested</span>
                  <span>₹30.30L Max Surplus</span>
                </div>
              </div>

              <div className="rounded-xl border border-teal-500/35 bg-gradient-to-br from-teal-500/10 via-surface to-surface dark:from-teal-950/25 dark:via-surface dark:to-surface p-4 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-bold text-teal-800/90 dark:text-teal-300/90 uppercase tracking-wider">
                    Projected Annual Treasury Earnings @ 6.50%
                  </span>
                  <motion.div
                    key={calculatedSweepYield}
                    initial={shouldReduceMotion ? false : { opacity: 0.7, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="font-num tabular-nums text-2xl font-black text-teal-600 dark:text-teal-400"
                  >
                    +{formatINR(calculatedSweepYield)} / yr
                  </motion.div>
                </div>
                <div className="text-right text-xs text-text-secondary">
                  <span>Liquid Reserve Maintained: </span>
                  <strong className="text-foreground font-num tabular-nums font-bold">₹13,50,000</strong>
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK / GENERIC FORM FOR OTHER SPOTLIGHTS */}
          {spotlight.id !== "vendor-overbilling" &&
            spotlight.id !== "bec-fraud-risk" &&
            spotlight.id !== "contract-lapse" &&
            spotlight.id !== "idle-cash-optimization" && (
              <div className="rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4">
                <h2 className="font-display text-base font-bold text-foreground">
                  Action Dispatch: {spotlight.remediation.title}
                </h2>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Confirm dispatch of {spotlight.remediation.actionLabel} to your corporate finance operations queue.
                </p>
              </div>
            )}

          {/* SUBMIT ACTIONS */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
            <Link
              to="/spotlights/$id"
              params={{ id: spotlight.id }}
              className="px-5 py-2.5 rounded-xl border border-border bg-surface text-text-secondary hover:text-foreground text-xs font-semibold transition cursor-pointer w-full sm:w-auto text-center"
            >
              Cancel &amp; Return
            </Link>

            <motion.button
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-brand transition cursor-pointer w-full sm:w-auto",
                spotlight.id === "bec-fraud-risk"
                  ? "bg-rose-600 hover:bg-rose-700"
                  : "bg-brand hover:opacity-95"
              )}
            >
              {isSubmitting ? (
                <>
                  <Clock size={14} className="animate-spin" />
                  <span>Dispatching to Audit Ledger…</span>
                </>
              ) : (
                <>
                  <span>Confirm &amp; {spotlight.remediation.actionLabel}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
}
