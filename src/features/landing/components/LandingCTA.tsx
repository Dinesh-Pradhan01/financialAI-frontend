import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function LandingCTA() {
  return (
    <section id="demo" className="bg-[#071329] py-24 sm:py-28 lg:py-36 text-white overflow-hidden relative">
      <div className="mx-auto max-w-5xl 2xl:max-w-6xl px-4 text-center sm:px-6 lg:px-8 2xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-blue-300">
            Personalised Demonstration
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            See SpotLite in action with your own ledger data
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-blue-200">
            Our financial engineers will walk you through a customized
            demonstration based on your industry, transaction volume, and
            headcount priorities with zero obligation.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover active:scale-[0.98] w-full sm:w-auto"
              >
                Schedule Live Executive Demo
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <a
              href="#modules"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all hover:bg-white/10 w-full sm:w-auto"
            >
              Download Product Architecture PDF
            </a>
          </div>

          <p className="mt-10 text-xs sm:text-sm font-medium text-blue-300">
            No long-term commitment required · Full implementation support ·
            Live in 6 weeks
          </p>
        </motion.div>
      </div>
    </section>
  );
}
