import { STATS } from "./landing-data";
import { motion } from "framer-motion";

export function LandingStats() {
  return (
    <section className="border-b border-border bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
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
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className={`flex flex-col ${i !== 0 ? "md:border-l md:border-border md:pl-8" : ""}`}
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary font-mono tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm sm:text-base lg:text-lg font-bold text-foreground">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
