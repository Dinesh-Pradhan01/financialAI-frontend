import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PLANS } from "../data/landing-data";
import { motion } from "framer-motion";

interface LandingPricingProps {
  billingCycle: "annual" | "monthly";
  setBillingCycle: (cycle: "annual" | "monthly") => void;
}

export function LandingPricing({ billingCycle, setBillingCycle }: LandingPricingProps) {
  return (
    <section id="pricing" className="bg-[#f8fafc] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
            Transparent Pricing
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Predictable plans scaled to your headcount
          </h2>
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            No hidden per-seat fees or usage penalties. Deploy across your entire leadership team.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center rounded-full border border-border bg-white p-1.5 shadow-xs">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual Billing (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="mt-14 grid gap-6 lg:gap-8 lg:grid-cols-3 items-stretch"
        >
          {PLANS.map((plan) => (
            <motion.article
              key={plan.plan}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative flex flex-col justify-between rounded-2xl border p-8 sm:p-9 transition-colors ${
                plan.highlight
                  ? "border-primary bg-gradient-to-b from-[#0a1b38] to-[#071329] text-white shadow-2xl shadow-blue-900/30 lg:scale-[1.02]"
                  : "border-border bg-white shadow-xs hover:border-slate-300"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-xs font-bold text-white shadow-sm uppercase tracking-wider">
                  Recommended for Scale
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{plan.plan}</h3>
                  {plan.badge && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        plan.highlight ? "bg-white/10 text-white" : "bg-blue-50 text-primary"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p
                  className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${
                    plan.highlight ? "text-slate-300" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-mono">
                    {plan.price === "Custom"
                      ? "Custom"
                      : billingCycle === "annual"
                        ? plan.price
                        : plan.plan === "Essentials"
                          ? "$590"
                          : "$1,490"}
                  </span>
                  <span
                    className={`text-xs sm:text-sm ${
                      plan.highlight ? "text-slate-400" : "text-muted-foreground"
                    }`}
                  >
                    {plan.price === "Custom" ? `/ ${plan.billing}` : `/ billed ${billingCycle}`}
                  </span>
                </div>

                <div
                  className={`my-6 border-t ${
                    plan.highlight ? "border-white/10" : "border-border"
                  }`}
                />

                <p
                  className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                    plan.highlight ? "text-blue-300" : "text-slate-700"
                  }`}
                >
                  What's included:
                </p>

                <ul className="mt-4 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.highlight ? "text-emerald-400" : "text-primary"
                        }`}
                      />
                      <span
                        className={plan.highlight ? "text-slate-200" : "text-slate-700 font-medium"}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to="/signup"
                  className={`flex w-full items-center justify-center rounded-xl py-3.5 sm:py-4 text-xs sm:text-sm font-bold shadow-xs transition-all ${
                    plan.highlight
                      ? "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30"
                      : "border border-border bg-slate-50 text-foreground hover:bg-slate-100"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
