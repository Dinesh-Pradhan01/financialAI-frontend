import { STEPS } from "../data/landing-data";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f8fafc] py-10 sm:py-12 lg:py-14 border-b border-border">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance">
            From raw transaction records to executive clarity
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[60ch] mx-auto text-balance">
            Deploy SpotLite in three simple steps without disrupting existing accounting software,
            ERP systems, or banking workflows.
          </p>
        </motion.div>

        {/* Connected Step Rail Layout */}
        <div className="mt-7 sm:mt-8 relative">
          {/* Connector Line (Desktop) - Aligned with Step Icon Centers */}
          <div className="hidden lg:block absolute top-11 left-14 right-14 h-0.5 bg-linear-to-r from-primary/20 via-primary/40 to-primary/20 z-0" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="grid gap-5 lg:gap-6 lg:grid-cols-3 relative z-10"
          >
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                className="relative rounded-2xl border border-border-c bg-white p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 transform-gpu flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm sm:text-base font-bold text-white font-mono tabular-nums shadow-xs">
                      {step.step}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-primary border border-blue-100 font-mono">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-base sm:text-lg font-bold font-display tracking-[-0.015em] text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-border-c flex items-center gap-2 text-xs font-semibold text-primary font-mono">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Step {idx + 1} of 3</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
