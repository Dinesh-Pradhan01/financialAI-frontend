import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface LandingCTAProps {
  onOpenArchitecture?: () => void;
  onOpenSandbox?: () => void;
}

export function LandingCTA({ onOpenArchitecture, onOpenSandbox }: LandingCTAProps) {
  return (
    <section
      id="demo"
      className="bg-[#071329] py-10 sm:py-12 lg:py-14 text-white overflow-hidden relative"
    >
      <div className="mx-auto max-w-5xl 2xl:max-w-6xl px-4 text-center sm:px-6 lg:px-8 2xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white leading-[1.15] text-balance">
            See SpotLite in action with your own ledger data
          </h2>
          <p className="mx-auto mt-2.5 max-w-[58ch] text-sm sm:text-base leading-relaxed text-blue-100/90 text-balance">
            Our financial engineers will walk you through a live, customized demonstration based on
            your industry, transaction volume, and headcount priorities with zero obligation.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold tracking-[-0.005em] text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Book Executive Demo</span>
                <ArrowRight size={15} />
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={onOpenArchitecture}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold tracking-[-0.005em] text-white transition-all hover:bg-white/10 w-full sm:w-auto cursor-pointer"
            >
              <Layers size={15} />
              <span>View Architecture Specs</span>
            </button>
          </div>

          <p className="mt-6 text-xs font-normal text-blue-200/80">
            No long-term contracts · Bank-grade data encryption · Live in days
          </p>
        </motion.div>
      </div>
    </section>
  );
}
