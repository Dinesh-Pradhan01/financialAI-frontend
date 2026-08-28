import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { PLANS, type Currency } from "../data/landing-data";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface LandingPricingProps {
  billingCycle: "annual" | "monthly";
  setBillingCycle: (cycle: "annual" | "monthly") => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenSandbox?: () => void;
}

export function LandingPricing({
  billingCycle,
  setBillingCycle,
  currency,
  setCurrency,
  onOpenSandbox,
}: LandingPricingProps) {
  return (
    <section id="pricing" className="bg-[#f8fafc] py-10 sm:py-12 lg:py-14 border-t border-border">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance">
            Predictable plans scaled to your business
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[60ch] mx-auto text-balance">
            No hidden per-seat fees or OCR transaction penalties. Deploy across your entire executive table.
          </p>

          {/* Toggles Row: Billing Cycle + Currency */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3">
            {/* Billing Cycle Pill */}
            <div className="inline-flex items-center rounded-full border border-border-c bg-white p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className="relative rounded-full px-3.5 py-1 text-xs font-semibold tracking-[-0.005em] transition-colors cursor-pointer select-none"
              >
                {billingCycle === "annual" && (
                  <motion.div
                    layoutId="activeBillingCyclePill"
                    className="absolute inset-0 rounded-full bg-primary shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className={cn("relative z-10 transition-colors", billingCycle === "annual" ? "text-white font-bold" : "text-slate-600 hover:text-foreground")}>
                  Annual Billing (Save 20%)
                </span>
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className="relative rounded-full px-3.5 py-1 text-xs font-semibold tracking-[-0.005em] transition-colors cursor-pointer select-none"
              >
                {billingCycle === "monthly" && (
                  <motion.div
                    layoutId="activeBillingCyclePill"
                    className="absolute inset-0 rounded-full bg-primary shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className={cn("relative z-10 transition-colors", billingCycle === "monthly" ? "text-white font-bold" : "text-slate-600 hover:text-foreground")}>
                  Monthly
                </span>
              </button>
            </div>

            {/* Currency Pill */}
            <div className="inline-flex items-center rounded-full border border-border-c bg-white p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className="relative rounded-full px-3 py-1 text-xs font-bold font-mono transition-colors cursor-pointer select-none"
              >
                {currency === "INR" && (
                  <motion.div
                    layoutId="activeCurrencyPill"
                    className="absolute inset-0 rounded-full bg-primary shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className={cn("relative z-10 transition-colors", currency === "INR" ? "text-white" : "text-slate-600 hover:text-foreground")}>
                  ₹ INR
                </span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className="relative rounded-full px-3 py-1 text-xs font-bold font-mono transition-colors cursor-pointer select-none"
              >
                {currency === "USD" && (
                  <motion.div
                    layoutId="activeCurrencyPill"
                    className="absolute inset-0 rounded-full bg-primary shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className={cn("relative z-10 transition-colors", currency === "USD" ? "text-white" : "text-slate-600 hover:text-foreground")}>
                  $ USD
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="mt-7 sm:mt-8 grid gap-5 lg:gap-6 lg:grid-cols-3 items-stretch"
        >
          {PLANS.map((plan) => {
            const rawPrice =
              currency === "INR"
                ? plan.priceINR[billingCycle]
                : plan.priceUSD[billingCycle];

            return (
              <motion.article
                key={plan.plan}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={cn(
                  "relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-200 h-full transform-gpu",
                  plan.highlight
                    ? "border-primary bg-gradient-to-b from-[#0a1b38] to-[#071329] text-white shadow-2xl shadow-blue-900/30 lg:scale-[1.02]"
                    : "border-border-c bg-white shadow-xs hover:border-slate-300 hover:shadow-md",
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[11px] font-bold text-white shadow-sm uppercase tracking-wider font-mono">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-bold font-display tracking-[-0.015em]">{plan.plan}</h3>
                  </div>

                  <p
                    className={cn(
                      "mt-1.5 text-xs sm:text-sm leading-relaxed min-h-[36px]",
                      plan.highlight ? "text-slate-300" : "text-slate-600",
                    )}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-3.5 flex items-baseline gap-1.5">
                    <motion.span
                      key={`${rawPrice}-${currency}-${billingCycle}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-mono tabular-nums"
                    >
                      {rawPrice}
                    </motion.span>
                    <span
                      className={cn(
                        "text-xs font-normal",
                        plan.highlight ? "text-slate-300" : "text-slate-500",
                      )}
                    >
                      {rawPrice === "Custom"
                        ? "/ tailored to volume"
                        : `/ month, billed ${billingCycle}`}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "my-3.5 border-t",
                      plan.highlight ? "border-white/10" : "border-border-c",
                    )}
                  />

                  <p
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-wider",
                      plan.highlight ? "text-blue-300 font-mono" : "text-slate-500 font-mono",
                    )}
                  >
                    Included Capabilities
                  </p>

                  <ul className="mt-2.5 space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-start gap-2 text-xs sm:text-sm font-medium leading-relaxed",
                          plan.highlight ? "text-slate-200" : "text-slate-700",
                        )}
                      >
                        <Check
                          size={14}
                          className={cn(
                            "mt-0.5 flex-shrink-0",
                            plan.highlight ? "text-emerald-400" : "text-primary",
                          )}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3">
                  {plan.plan === "Essentials" ? (
                    <button
                      type="button"
                      onClick={onOpenSandbox}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border-c bg-surface-alt px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] text-foreground transition-all hover:bg-slate-200 cursor-pointer"
                    >
                      <span>Explore Live Sandbox</span>
                      <Sparkles size={14} className="text-primary" />
                    </button>
                  ) : (
                    <Link
                      to="/signup"
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] shadow-md transition-all",
                        plan.highlight
                          ? "bg-primary text-white hover:bg-primary-hover shadow-primary/25"
                          : "bg-primary text-white hover:bg-primary-hover shadow-primary/20",
                      )}
                    >
                      <span>Book Executive Demo</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
