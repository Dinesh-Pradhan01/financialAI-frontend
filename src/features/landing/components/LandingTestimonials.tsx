import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data/landing-data";
import { motion } from "framer-motion";

export function LandingTestimonials() {
  return (
    <section className="border-y border-border bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
            Executive Feedback
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Trusted by leaders who demand numbers they can stand behind
          </h2>
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
          {TESTIMONIALS.map((item) => (
            <motion.article
              key={item.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col justify-between rounded-2xl border border-border bg-[#f8fafc] p-8 sm:p-9 shadow-xs transition-colors hover:border-slate-300 hover:bg-white hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 text-amber-500">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {item.metric}
                  </span>
                </div>

                <p className="mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-foreground font-medium">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3.5 border-t border-border pt-5">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${item.badgeColor} text-sm font-extrabold text-white font-mono`}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-base font-bold text-foreground">{item.name}</p>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {item.title}, {item.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
