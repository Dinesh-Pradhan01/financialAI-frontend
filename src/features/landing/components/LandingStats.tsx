import { STATS_DATA, type Currency } from "../data/landing-data";
import { motion } from "framer-motion";

interface LandingStatsProps {
  currency: Currency;
}

export function LandingStats({ currency }: LandingStatsProps) {
  const stats = STATS_DATA[currency];

  return (
    <section className="border-b border-border bg-white py-6 sm:py-8 lg:py-9">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
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
          className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className={`flex flex-col ${i !== 0 ? "md:border-l md:border-border-c md:pl-4 sm:pl-6 lg:pl-8" : ""}`}
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary font-mono tabular-nums">
                {stat.value}
              </p>
              <p className="mt-2 text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]">
                {stat.label}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
