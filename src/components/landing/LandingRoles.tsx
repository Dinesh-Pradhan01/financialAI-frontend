import { ROLES } from "./landing-data";
import { motion } from "framer-motion";

export function LandingRoles() {
  return (
    <section id="roles" className="border-y border-border bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
            Role-Based Governance
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Tailored views for your entire executive table
          </h2>
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Access is strictly partitioned by role. Every executive sees the exact actionable
            intelligence they need to make decisions without security friction.
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
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="mt-14 grid gap-6 lg:gap-8 lg:grid-cols-3"
        >
          {ROLES.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.role}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-[#f8fafc] p-7 sm:p-8 shadow-xs transition-colors hover:border-primary/40 hover:bg-white hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                      <Icon size={24} />
                    </div>
                    <span className="rounded-full bg-blue-100/70 px-3 py-1 text-xs font-bold text-primary">
                      {item.highlightBadge}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      {item.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground mt-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 border-b border-border pb-5">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-3.5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-border/60">
                  <span className="text-xs sm:text-sm font-bold text-primary hover:underline">
                    See {item.role} dashboard preview →
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
