import { STEPS } from "./landing-data";
import { motion } from "framer-motion";

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f8fafc] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Implementation
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            From raw data to board-ready clarity
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Deploy SpotLite in three simple steps without disrupting
            existing accounting software or banking workflows.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.step}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-border bg-white p-7 shadow-xs transition-colors hover:border-primary/40 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white font-mono shadow-xs">
                  {step.step}
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-primary">
                  {step.badge}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
