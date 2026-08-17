import { ArrowRight, Bot, CheckCircle2, Sparkles } from "lucide-react";
import { MODULES } from "./landing-data";
import { motion } from "framer-motion";

export function LandingModules() {
  return (
    <section id="modules" className="bg-[#f8fafc] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Intelligence Modules
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Five modules. One shared data ledger.
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Each module answers a distinct executive question while
              drawing from the exact same validated data pipeline —
              guaranteeing consistent numbers across departments.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted-foreground shadow-xs">
              <Sparkles size={13} className="text-primary" /> Powered by
              SpotLite Core AI
            </span>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <motion.article
                key={mod.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-xs transition-colors hover:border-primary/50 hover:shadow-lg hover:shadow-blue-900/5 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                      {mod.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
                    {mod.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {mod.description}
                  </p>

                  <div className="my-5 border-t border-border" />

                  <ul className="space-y-2.5">
                    {mod.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 flex-shrink-0 text-primary"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:underline">
                  <span>View module specs</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </motion.article>
            );
          })}

          {/* 6th Card: SpotLite AI Copilot (Featured) */}
          <motion.article
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col justify-between rounded-2xl border border-blue-600 bg-gradient-to-br from-blue-900 via-primary to-blue-800 p-6 text-white shadow-xl shadow-blue-900/20"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                  <Bot size={22} />
                </div>
                <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-200 border border-emerald-300/30 uppercase tracking-wide">
                  Instant AI Copilot
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                Ask, don't hunt through spreadsheets
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-blue-100/90">
                Natural-language Q&A trained strictly on your uploaded ledgers,
                HR files, and bank records. Instant answers with audit trace.
              </p>

              <div className="my-5 border-t border-white/15" />

              <div className="space-y-2 rounded-xl bg-black/20 p-3.5 text-xs text-blue-100 border border-white/10 font-mono">
                <p className="text-emerald-300">
                  &gt; "What is our runway if we hire 12 senior engineers in Q3?"
                </p>
                <p className="text-white/80 font-sans">
                  "Based on current ₹42.8L burn, runway adjusts from 18.4 to 14.1
                  months."
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-white">
              <span>Try interactive prompts</span>
              <ArrowRight size={14} />
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
