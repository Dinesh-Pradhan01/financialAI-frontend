import { Lock, ShieldCheck } from "lucide-react";
import { SECURITY_BADGES } from "./landing-data";
import { motion } from "framer-motion";

export function LandingSecurity() {
  return (
    <section id="security" className="border-y border-border bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-blue-100 bg-[#f0f6fe] p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-primary">
                <Lock size={12} /> Bank-Grade Security
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Enterprise governance without compromise
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We treat your financial and payroll records with strict
                defense-in-depth isolation, multi-tenant database
                partitioning, and automated compliance auditing.
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
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {SECURITY_BADGES.map((badge) => (
                <motion.div
                  key={badge.title}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  className="rounded-xl border border-white bg-white/80 p-3.5 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <p className="text-xs font-bold text-foreground">
                      {badge.title}
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {badge.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
