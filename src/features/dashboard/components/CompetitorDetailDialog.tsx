import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import {
  MapPin,
  ExternalLink,
  Globe,
  Search,
  Linkedin,
  TrendingUp,
  BookOpen,
  Newspaper,
  Copy,
  Check,
  ShieldAlert,
  Building2,
  Briefcase,
  Layers,
} from "lucide-react";
import type { CompetitorItem } from "../hooks/useCompanyAPI";

interface Props {
  competitor: CompetitorItem | null;
  open: boolean;
  onClose: () => void;
}

interface ResearchLink {
  id: string;
  label: string;
  category: string;
  href: string;
  icon: React.ReactNode;
  external: boolean;
}

/**
 * Defensive URL normalizer: ensures valid http/https scheme and strips dangerous protocols.
 */
function sanitizeUrl(rawUrl: string): string | null {
  try {
    const trimmed = rawUrl.trim();
    if (!trimmed) return null;
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(withProtocol);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Generates reliable external intelligence and due-diligence research destinations.
 */
function buildResearchLinks(name: string, rawWebsite: string | null | undefined): ResearchLink[] {
  const q = encodeURIComponent(name.trim());
  const validWebsite = rawWebsite ? sanitizeUrl(rawWebsite) : null;
  const links: ResearchLink[] = [];

  if (validWebsite) {
    links.push({
      id: "official-website",
      label: "Official Website",
      category: "Corporate",
      href: validWebsite,
      icon: <Globe className="w-3.5 h-3.5 text-primary shrink-0" />,
      external: true,
    });
  }

  links.push(
    {
      id: "google-search",
      label: "Company Overview",
      category: "Search",
      href: `https://www.google.com/search?q=${q}`,
      icon: <Search className="w-3.5 h-3.5 text-text-tertiary shrink-0" />,
      external: true,
    },
    {
      id: "linkedin",
      label: "Team & Leadership",
      category: "Professional Network",
      href: `https://www.linkedin.com/search/results/companies/?keywords=${q}`,
      icon: <Linkedin className="w-3.5 h-3.5 text-text-tertiary shrink-0" />,
      external: true,
    },
    {
      id: "google-news",
      label: "Recent News",
      category: "Media Coverage",
      href: `https://www.google.com/search?q=${q}&tbm=nws`,
      icon: <Newspaper className="w-3.5 h-3.5 text-text-tertiary shrink-0" />,
      external: true,
    },
    {
      id: "crunchbase",
      label: "Financials & Filings",
      category: "Market Data",
      href: `https://www.crunchbase.com/textsearch?q=${q}`,
      icon: <TrendingUp className="w-3.5 h-3.5 text-text-tertiary shrink-0" />,
      external: true,
    },
    {
      id: "wikipedia",
      label: "Background",
      category: "Reference",
      href: `https://en.wikipedia.org/wiki/Special:Search?search=${q}`,
      icon: <BookOpen className="w-3.5 h-3.5 text-text-tertiary shrink-0" />,
      external: true,
    },
  );

  return links;
}

/**
 * Returns clean, safe monogram initials (up to 2 characters).
 */
function getMonogram(name: string): string {
  const cleaned = name.trim().replace(/[^\w\s]/gi, "");
  if (!cleaned) return "CO";
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export const CompetitorDetailDialog: React.FC<Props> = ({ competitor, open, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (!competitor) return null;

  const links = buildResearchLinks(competitor.name, competitor.website);
  const monogram = getMonogram(competitor.name);

  const handleCopySummary = async () => {
    const textToCopy = [
      `Competitor: ${competitor.name}`,
      competitor.location ? `Location: ${competitor.location}` : null,
      competitor.market_cap ? `Valuation/Scale: ${competitor.market_cap}` : null,
      competitor.services ? `Services: ${competitor.services}` : null,
      competitor.overlap_summary ? `Market Overlap: ${competitor.overlap_summary}` : null,
      competitor.website ? `Website: ${competitor.website}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback in restricted clipboard contexts
      setCopied(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: shouldReduceMotion ? 0 : 0.02,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl w-[94vw] sm:w-full p-0 gap-0 overflow-hidden rounded-2xl border border-border/80 shadow-e2 bg-card max-h-[90vh] flex flex-col">
        {/* ── Fixed Header ── */}
        <DialogHeader className="px-6 py-5 border-b border-border/50 shrink-0 bg-surface">
          <div className="flex items-start justify-between gap-4 pr-6">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Institutional Monogram Avatar */}
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm border border-primary/20 select-none"
              >
                <span className="text-base font-bold font-display tracking-tight">
                  {monogram}
                </span>
              </div>

              {/* Title & Metadata badges */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <DialogTitle className="text-lg font-bold font-display text-foreground tracking-tight truncate max-w-sm sm:max-w-md">
                    {competitor.name}
                  </DialogTitle>
                  <Badge
                    variant="outline"
                    className="bg-primary/5 text-primary border-primary/20 text-[10px] font-semibold tracking-wide py-0 h-4.5"
                  >
                    Direct Competitor
                  </Badge>
                </div>

                <DialogDescription asChild>
                  <div className="flex items-center gap-2.5 mt-1 text-xs text-text-tertiary flex-wrap">
                    {competitor.location ? (
                      <span className="inline-flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
                        <span className="truncate max-w-64">{competitor.location}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
                        Enterprise Peer
                      </span>
                    )}

                    {competitor.market_cap && (
                      <>
                        <span className="text-border">•</span>
                        <span className="font-num text-[11px] text-text-secondary bg-surface-alt px-1.5 py-0.5 rounded border border-border/60">
                          {competitor.market_cap}
                        </span>
                      </>
                    )}
                  </div>
                </DialogDescription>
              </div>
            </div>

            {/* Quick Actions (Copy Brief) */}
            <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-foreground bg-surface-alt/70 hover:bg-surface-alt border border-border/60 transition-colors cursor-pointer"
                title="Copy competitor brief to clipboard"
                aria-label="Copy competitor summary"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="checked"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center gap-1 text-success"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">Copied</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">Copy Brief</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </DialogHeader>

        {/* ── Scrollable Body Area with Staggered Motion ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-6 py-5 space-y-5 overflow-y-auto custom-scrollbar flex-1"
        >
          {/* Overlap & Strategic Threat Callout */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-primary" />
                Strategic Market Overlap
              </span>
              <span className="text-[11px] text-text-tertiary">Peer Analysis</span>
            </div>

            <div className="p-4 rounded-xl bg-primary/3 dark:bg-primary/6 border border-primary/20">
              <p className="text-sm text-foreground/90 leading-relaxed font-sans wrap-break-word">
                {competitor.overlap_summary ||
                  competitor.description ||
                  "Direct commercial competitor targeting equivalent enterprise client demographics with overlapping capability sets."}
              </p>
            </div>
          </motion.div>

          {/* Offerings & Capabilities Block */}
          <motion.div variants={itemVariants} className="space-y-2">
            <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-text-tertiary" />
              Products & Service Coverage
            </span>

            <div className="p-4 rounded-xl bg-surface-alt/40 border border-border/70">
              <p className="text-sm text-text-secondary leading-relaxed wrap-break-word">
                {competitor.services ||
                  "Broad-spectrum commercial service operations in active domestic segments."}
              </p>
            </div>
          </motion.div>

          <Separator className="bg-border/60" />

          {/* Research & Due Diligence Links */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-text-tertiary" />
                Due Diligence & External Records
              </span>
              <span className="text-[11px] text-text-tertiary">Opens in new tab</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {links.map((link) => {
                const isOfficial = link.id === "official-website";
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                      isOfficial
                        ? "bg-primary/5 hover:bg-primary/10 border-primary/25 hover:border-primary/40 shadow-xs"
                        : "bg-surface hover:bg-surface-alt/70 border-border/70 hover:border-primary/30"
                    } hover:-translate-y-0.5`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isOfficial ? "bg-primary/10 text-primary" : "bg-muted text-text-tertiary"
                        }`}
                      >
                        {link.icon}
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-xs font-semibold truncate ${
                            isOfficial ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {link.label}
                        </div>
                        <div className="text-[10px] text-text-tertiary truncate">
                          {link.category}
                        </div>
                      </div>
                    </div>

                    <ExternalLink className="w-3 h-3 text-text-tertiary/70 group-hover:text-primary transition-colors shrink-0" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Fixed Institutional Footer ── */}
        <div className="px-6 py-3 border-t border-border/50 shrink-0 flex items-center justify-between text-[11px] text-text-tertiary bg-surface-alt/30">
          <div className="flex items-center gap-2">
            <span>Spotlite Intelligence Feed</span>
            <span className="text-border">•</span>
            <span>Synthesized cross-source benchmarking</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px]">
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/80 text-text-tertiary">
              ESC
            </kbd>
            <span className="text-text-tertiary">to close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
