import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ShieldCheck, LineChart, FolderKanban } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function DocumentsWhyWeNeedGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border-c/80 bg-surface shadow-2xs overflow-hidden transition-all duration-200 hover:border-brand/30">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer select-none transition-colors hover:bg-surface-alt/30"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-text-primary tracking-tight">
              Why does SpotLite need company documents?
            </h4>
            <p className="text-[11px] text-text-secondary mt-0.5">
              Learn how corporate filings power your MSME credit score, continuous risk models, and due diligence vault.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand shrink-0">
          <span className="hidden sm:inline">{isOpen ? "Hide details" : "Learn more"}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "rotate-180 text-brand" : "text-text-tertiary"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/60 bg-surface-alt/20 p-4 md:p-5 grid gap-4 sm:grid-cols-3">
              {/* Pillar 1: Statutory Verification */}
              <div className="space-y-2 rounded-xl border border-blue-500/20 bg-blue-500/[0.03] p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span>Statutory Verification</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed max-w-prose">
                  Confirms corporate entity registration and PAN with regulatory authorities (MCA/MSME) to verify business legitimacy.
                </p>
              </div>

              {/* Pillar 2: Credit Profiling */}
              <div className="space-y-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <LineChart className="h-4 w-4" />
                  </div>
                  <span>Credit Profiling</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed max-w-prose">
                  GSTIN and bank cheque verification enhance automated AI health scoring, helping negotiate better credit lines.
                </p>
              </div>

              {/* Pillar 3: Due Diligence Vault */}
              <div className="space-y-2 rounded-xl border border-purple-500/20 bg-purple-500/[0.03] p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    <FolderKanban className="h-4 w-4" />
                  </div>
                  <span>Due Diligence Vault</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed max-w-prose">
                  Organize verified filings into curated audit packages to share securely with lenders, auditors, and board members.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
