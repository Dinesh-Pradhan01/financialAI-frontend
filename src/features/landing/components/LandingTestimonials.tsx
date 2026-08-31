import { Star, ShieldCheck, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/landing-data";
import { motion } from "framer-motion";

export function LandingTestimonials() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14 border-b border-border">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance">
            Trusted by finance & operations leaders across sectors
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[58ch] mx-auto text-balance">
            Proven ROI, multi-bank reconciliation certainty, and actionable capital visibility from day one.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="mt-6 sm:mt-8 grid gap-5 lg:gap-6 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((item) => (
            <motion.article
              key={item.name}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="flex flex-col justify-between rounded-2xl border border-border-c bg-[#f8fafc] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 transform-gpu relative overflow-hidden h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-500">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 font-mono">
                    {item.metric}
                  </span>
                </div>

                <div className="relative mt-3">
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-normal">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-border-c pt-3 space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.badgeColor} text-xs font-bold text-white font-mono shadow-2xs`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold font-display text-foreground">{item.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {item.title}, <span className="font-semibold text-slate-700">{item.company}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium bg-emerald-50/70 px-2 py-0.5 rounded border border-emerald-200/50 w-fit font-mono">
                  <ShieldCheck size={11} />
                  <span>{item.verifiedLabel}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
