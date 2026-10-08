import { motion } from "framer-motion";
import { financialDNA, type DnaTrait } from "@/shared/data/agentic";
import { cn } from "@/shared/lib/utils";

/**
 * Visual trait fingerprint that replaces flat persona badges.
 * `variant="bars"` is the compact home version; `variant="radar"` is the
 * richer profile "fingerprint" with per-trait drivers.
 */
export function FinancialDNA({
  className,
  showDrivers = false,
  variant = "bars",
}: {
  className?: string;
  showDrivers?: boolean;
  variant?: "bars" | "radar";
}) {
  const sorted = [...financialDNA].sort((a, b) => b.value - a.value);
  const top = sorted[0];
  return (
    <div className={cn("card-spot flex flex-col p-4", className)}>
      {variant === "radar" ? (
        <>
          <DnaRadar traits={financialDNA} />
          {showDrivers && (
            <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {sorted.map((t) => (
                <li key={t.trait} className="text-xs">
                  <span className="font-medium text-text-primary">{t.trait}</span>
                  <span className="ml-1.5 font-num font-semibold text-brand">{t.value}</span>
                  <span className="block text-[11px] leading-snug text-text-secondary">
                    {t.driver}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
          {sorted.map((t, i) => (
            <div key={t.trait}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-medium">{t.trait}</span>
                <span className="font-num text-xs font-semibold text-text-secondary">
                  {t.value}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-alt">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.value}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                  className="h-full rounded-full bg-brand"
                />
              </div>
              {showDrivers && (
                <p className="mt-1.5 text-[11px] leading-snug text-text-secondary">{t.driver}</p>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex-1" />
      <p className="mt-4 border-t border-border pt-3 text-xs text-text-secondary">
        Your strongest trait is <span className="font-semibold text-text-primary">{top.trait}</span>{" "}
        at {top.value} / 100.
      </p>
    </div>
  );
}

/** Hexagonal radar/spider chart — the literal "fingerprint" of the traits. */
function DnaRadar({ traits }: { traits: DnaTrait[] }) {
  const W = 240;
  const H = 216;
  const cx = W / 2;
  const cy = H / 2;
  const R = 72;
  const n = traits.length;

  const angle = (i: number) => ((-90 + (360 / n) * i) * Math.PI) / 180;
  const at = (i: number, frac: number): [number, number] => [
    cx + R * frac * Math.cos(angle(i)),
    cy + R * frac * Math.sin(angle(i)),
  ];
  const polyFor = (frac: number) => traits.map((_, i) => at(i, frac).join(",")).join(" ");

  const dataPoly = traits.map((t, i) => at(i, t.value / 100).join(",")).join(" ");
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto h-auto w-full max-w-[260px]">
      {/* grid rings + spokes */}
      <g style={{ stroke: "var(--surface-alt)" }} strokeWidth={1} fill="none">
        {rings.map((f) => (
          <polygon key={f} points={polyFor(f)} />
        ))}
        {traits.map((_, i) => {
          const [x, y] = at(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} />;
        })}
      </g>

      {/* data polygon */}
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        points={dataPoly}
        style={{
          fill: "color-mix(in oklch, var(--brand-primary) 18%, transparent)",
          stroke: "var(--brand-primary)",
        }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {traits.map((t, i) => {
        const [x, y] = at(i, t.value / 100);
        return (
          <circle key={t.trait} cx={x} cy={y} r={3} style={{ fill: "var(--brand-primary)" }} />
        );
      })}

      {/* axis labels (first word, full names live in the legend) */}
      <g className="fill-current text-text-secondary" fontSize={10} fontWeight={600}>
        {traits.map((t, i) => {
          const [x, y] = at(i, 1.26);
          const c = Math.cos(angle(i));
          const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
          return (
            <text key={t.trait} x={x} y={y} textAnchor={anchor} dominantBaseline="middle">
              {t.trait.split(" ")[0]}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
