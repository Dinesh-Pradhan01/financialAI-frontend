import { motion } from "framer-motion";

const COLORS = ["#6C2BD9", "#E0218A", "#F5A623", "#21C97A", "#2D9CDB"];

/** A one-shot confetti burst, positioned by the parent (use a relative wrapper). */
export function Confetti({ count = 26 }: { count?: number }) {
  const pieces = Array.from({ length: count });
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
      aria-hidden
    >
      {pieces.map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random();
        const dist = 90 + Math.random() * 120;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist - 40;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            animate={{ opacity: 0, x, y, scale: 0.6, rotate: Math.random() * 360 }}
            transition={{ duration: 1.1 + Math.random() * 0.5, ease: "easeOut" }}
            className="absolute h-2 w-2 rounded-[2px]"
            style={{ backgroundColor: COLORS[i % COLORS.length] }}
          />
        );
      })}
    </div>
  );
}
