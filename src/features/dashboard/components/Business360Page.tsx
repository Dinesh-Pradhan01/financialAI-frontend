import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { OnboardingProgressBanner } from "./OnboardingProgressBanner";
import { ProfileCard } from "./ProfileCard";
import { OfferingsCard } from "./OfferingsCard";
import { KeyPersonnelSection } from "./KeyPersonnelSection";
import { TopClientsCard } from "./TopClientsCard";
import { BankDetailsCard } from "./BankDetailsCard";
import { KeyInformationCard } from "./KeyInformationCard";
import { CompanyRatingCard } from "./CompanyRatingCard";
import { CompanyNewsCard } from "./CompanyNewsCard";
import { CompetitorsCard } from "./CompetitorsCard";
import { cn } from "@/shared/lib/utils";
import { useCompanyProfile, competitorsQueryOptions } from "../hooks/useCompanyAPI";
import { useQueryClient } from "@tanstack/react-query";
import { developmentsQueryOptions } from "@/features/developments/hooks/useDevelopments";
import { useAuth } from "@/shared/contexts/AuthContext";

export const Business360Page: React.FC = () => {
  const { data: profile, isError } = useCompanyProfile();
  const [activeTab, setActiveTab] = useState<string>("news");
  const shouldReduceMotion = useReducedMotion();

  // Background prefetch: proactively fires the Developments query in the background on mount.
  // Never blocks render and never shows a global loader. When the user later navigates to
  // Developments, TanStack Query serves the pre-cached result instantly.
  const queryClient = useQueryClient();
  const { user } = useAuth();
  useEffect(() => {
    if (user?.business_id) {
      void queryClient.prefetchQuery(developmentsQueryOptions(user.business_id));
    }
  }, [queryClient, user?.business_id]);

  // Downstream cards know whether profile is ready
  const hasProfile = Boolean(profile && !isError);

  // Background prefetch: Competitors (Peer Benchmarks).
  // Gated on hasProfile so requests only fire once the business identity exists,
  // avoiding 404s for uninitialized accounts. Silently pre-warms the cache slot.
  useEffect(() => {
    if (!hasProfile) return;
    void queryClient.prefetchQuery(competitorsQueryOptions);
  }, [hasProfile, queryClient]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-7xl mx-auto space-y-7 p-4 md:p-6 pb-24"
    >
      {/* Page Title & Narrative Pitch */}
      <motion.header variants={itemVariants} className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-display">
              Business 360
            </h1>
            <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
              Unified executive intelligence hub for workforce governance, financial infrastructure,
              and company compliance.
            </p>
          </div>
        </div>
      </motion.header>

      {/* Onboarding Incomplete Reminder Banner (Preserved) */}
      <motion.div variants={itemVariants}>
        <OnboardingProgressBanner />
      </motion.div>

      {/* ── ZONE 1: IDENTITY (Profile + Offerings) ─────────────────────────── */}
      <motion.section
        variants={itemVariants}
        aria-labelledby="zone-identity-heading"
        className="space-y-3"
      >
        <h2 id="zone-identity-heading" className="sr-only">
          Company Identity and Offerings
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <ProfileCard />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <OfferingsCard />
          </div>
        </div>
      </motion.section>

      {/* ── ZONE 2: LEADERSHIP (Key Personnel) ───────────────────────────── */}
      <motion.div variants={itemVariants}>
        <KeyPersonnelSection />
      </motion.div>

      {/* ── ZONE 3: RELATIONSHIPS & INFRASTRUCTURE (Top Clients + Bank Details) ─── */}
      <motion.section
        variants={itemVariants}
        aria-labelledby="zone-infrastructure-heading"
        className="space-y-3"
      >
        <h2 id="zone-infrastructure-heading" className="sr-only">
          Relationships and Infrastructure
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="flex flex-col">
            <TopClientsCard />
          </div>
          <div className="flex flex-col">
            <BankDetailsCard />
          </div>
        </div>
      </motion.section>

      {/* ── ZONE 4: REGISTRATION (Key Information) ───────────────────────── */}
      <motion.div variants={itemVariants}>
        <KeyInformationCard />
      </motion.div>

      {/* ── ZONE 5: CONTEXT (Ratings & News + Competitors) ─── */}
      <motion.section
        variants={itemVariants}
        aria-labelledby="zone-context-heading"
        className="space-y-4 pt-1"
      >
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/40">
            <div>
              <h2
                id="zone-context-heading"
                className="text-base sm:text-lg font-bold tracking-tight text-foreground font-display"
              >
                Market Context & Intelligence Feeds
              </h2>
              <p className="text-xs text-text-tertiary mt-0.5 font-medium">
                Curated feeds and automated peer benchmarking (external synthesis)
              </p>
            </div>

            {/* Sliding Pill Segmented Control */}
            <div
              role="tablist"
              aria-label="Market context feeds"
              className="relative flex items-center bg-surface-alt/70 border border-border/50 p-1 h-9 shrink-0 rounded-lg"
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  setActiveTab((prev) => (prev === "news" ? "competitors" : "news"));
                }
              }}
            >
              <button
                type="button"
                role="tab"
                id="tab-news"
                aria-controls="panel-news"
                aria-selected={activeTab === "news"}
                onClick={() => setActiveTab("news")}
                className={cn(
                  "relative z-10 text-xs px-3.5 py-1 font-medium transition-colors cursor-pointer rounded-md select-none outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeTab === "news"
                    ? "text-primary font-semibold"
                    : "text-text-secondary hover:text-foreground"
                )}
              >
                {activeTab === "news" && (
                  <motion.div
                    layoutId="activeMarketTabPill"
                    className="absolute inset-0 rounded-md bg-card shadow-xs"
                    style={{ zIndex: -1 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 450, damping: 32 }
                    }
                  />
                )}
                <span>Market News</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-competitors"
                aria-controls="panel-competitors"
                aria-selected={activeTab === "competitors"}
                onClick={() => setActiveTab("competitors")}
                className={cn(
                  "relative z-10 text-xs px-3.5 py-1 font-medium transition-colors cursor-pointer rounded-md select-none outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeTab === "competitors"
                    ? "text-purple-600 dark:text-purple-400 font-semibold"
                    : "text-text-secondary hover:text-foreground"
                )}
              >
                {activeTab === "competitors" && (
                  <motion.div
                    layoutId="activeMarketTabPill"
                    className="absolute inset-0 rounded-md bg-card shadow-xs"
                    style={{ zIndex: -1 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 450, damping: 32 }
                    }
                  />
                )}
                <span>Peer Benchmarks</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch mt-4">
            <div className="w-full lg:w-[35%] lg:shrink-0 flex flex-col">
              <CompanyRatingCard hasProfile={hasProfile} />
            </div>
            <div className="w-full lg:flex-1 min-w-0 flex flex-col">
              <AnimatePresence mode="wait">
                {activeTab === "news" ? (
                  <motion.div
                    key="news"
                    role="tabpanel"
                    id="panel-news"
                    aria-labelledby="tab-news"
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full flex flex-col"
                  >
                    <CompanyNewsCard hasProfile={hasProfile} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="competitors"
                    role="tabpanel"
                    id="panel-competitors"
                    aria-labelledby="tab-competitors"
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full flex flex-col"
                  >
                    <CompetitorsCard hasProfile={hasProfile} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export const BusinessC360Page = Business360Page;
