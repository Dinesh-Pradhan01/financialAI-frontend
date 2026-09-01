import { useState } from "react";
import { ROLES, type Currency, type RoleItem } from "../data/landing-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  Calculator,
  UserPlus,
  Eye,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface LandingRolesProps {
  currency: Currency;
  onOpenRolePreview?: (roleId: string) => void;
}

export function LandingRoles({ currency, onOpenRolePreview }: LandingRolesProps) {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const selectedRole = ROLES[activeRoleIndex] || ROLES[0];

  return (
    <section id="roles" className="border-b border-border bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl 2xl:max-w-360 px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-bold font-display tracking-tight text-foreground leading-[1.18] text-balance">
            Tailored views for your entire executive table
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[62ch] mx-auto text-balance">
            Data is strictly partitioned by role. Each leader sees the exact operational metrics,
            alerts, and levers they need without data security friction.
          </p>
        </motion.div>

        {/* Interactive Role Switcher Layout */}
        <div className="mt-6 sm:mt-8 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Role Selector Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            {ROLES.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === activeRoleIndex;

              return (
                <div
                  key={item.role}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveRoleIndex(index)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && setActiveRoleIndex(index)
                  }
                  className="relative w-full text-left rounded-2xl border p-3.5 sm:p-4 transition-colors cursor-pointer select-none border-border-c bg-[#f8fafc] hover:bg-white overflow-hidden"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeRoleCardHighlight"
                      className="absolute inset-0 border border-primary bg-blue-50/60 shadow-md ring-1 ring-primary/30 rounded-2xl z-0"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors shadow-2xs",
                            isSelected
                              ? "bg-primary text-white"
                              : "bg-white text-primary border border-border-c",
                          )}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]">
                            {item.role}
                          </h3>
                          <p className="text-[11px] font-semibold text-slate-500">{item.access}</p>
                        </div>
                      </div>

                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold font-mono shrink-0 transition-colors",
                          isSelected ? "bg-primary text-white" : "bg-slate-200/70 text-slate-700",
                        )}
                      >
                        {item.highlightBadge}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual UI Snapshot of Selected Role */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRole.id}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-border-c bg-[#f8fafc] p-5 sm:p-6 lg:p-7 shadow-sm space-y-4 sm:space-y-5"
              >
                {/* Snapshot Header */}
                <div className="flex items-center justify-between border-b border-border-c pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                      <selectedRole.icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold font-display text-foreground tracking-[-0.015em]">
                        {selectedRole.role} Live Workspace Snapshot
                      </h4>
                      <p className="text-[11px] text-slate-500 font-normal">
                        {selectedRole.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200 font-mono">
                    <ShieldCheck size={13} /> Partitioned View
                  </span>
                </div>

                {/* Role Specific KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {selectedRole.previewKpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-xl border border-border-c bg-white p-3 shadow-2xs"
                    >
                      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {kpi.label}
                      </p>
                      <p className="text-base sm:text-lg font-bold font-mono tabular-nums text-foreground mt-0.5 tracking-tight">
                        {currency === "INR" ? kpi.valueINR : kpi.valueUSD}
                      </p>
                      <p
                        className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 ${
                          kpi.status === "alert"
                            ? "text-amber-600"
                            : kpi.status === "good"
                              ? "text-emerald-600"
                              : "text-slate-500"
                        }`}
                      >
                        {kpi.trend}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Specific Capability Bullets */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Role-Gated Permissions & Capabilities
                  </p>
                  <div className="space-y-1.5">
                    {selectedRole.bullets.map((b) => (
                      <div
                        key={b}
                        className="flex items-center gap-2.5 rounded-xl border border-border-c bg-white p-2.5 text-xs font-medium text-slate-700 shadow-2xs"
                      >
                        <CheckCircle2 size={15} className="text-primary shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview Trigger CTA */}
                <div className="pt-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onOpenRolePreview?.(selectedRole.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4.5 py-2.5 text-xs sm:text-sm font-semibold tracking-[-0.005em] text-white shadow-xs hover:bg-primary-hover transition-all cursor-pointer group"
                  >
                    <Eye
                      size={15}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span>Launch Interactive {selectedRole.role} Preview</span>
                  </motion.button>

                  <span className="text-xs text-slate-500 hidden sm:inline">
                    No credentials required
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
