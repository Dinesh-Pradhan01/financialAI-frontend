import { Lock, ShieldCheck } from "lucide-react";
import { SECURITY_BADGES } from "../data/landing-data";
import { motion } from "framer-motion";

export function LandingSecurity() {
  return (
    <section id="security" className="border-y border-border bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-blue-100 bg-[#f0f6fe] p-6 sm:p-8 lg:p-9 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance">
                Enterprise governance without compromise
              </h2>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600 max-w-[54ch]">
                We treat your financial and payroll records with strict defense-in-depth isolation,
                multi-tenant database partitioning, and automated compliance auditing.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4"
            >
              {SECURITY_BADGES.map((badge) => (
                <motion.div
                  key={badge.title}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  className="rounded-2xl border border-white bg-white/80 p-3.5 sm:p-4 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                    <p className="text-xs sm:text-sm font-bold font-display text-foreground tracking-[-0.01em]">
                      {badge.title}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{badge.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
