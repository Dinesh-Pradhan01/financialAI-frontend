import React from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Badge } from "@/shared/components/ui/badge";
import { Users2, Mail, Phone, ShieldCheck } from "lucide-react";
import { useOnboardingStatus } from "../hooks/useCompanyAPI";

interface PersonCardProps {
  roleLabel: string;
  name?: string | null;
  designation?: string | null;
  email?: string | null;
  phone?: string | null;
}

const PersonCard: React.FC<PersonCardProps> = ({ roleLabel, name, designation, email, phone }) => {
  const cleanName = name?.trim() || null;
  const cleanDesignation = designation?.trim() || roleLabel;
  const cleanEmail = email?.trim() || null;
  const cleanPhone = phone?.trim() || null;

  // Extract initials for person-first representation
  const initials = cleanName
    ? cleanName
        .split(" ")
        .map((p) => p[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : roleLabel.slice(0, 2).toUpperCase();

  // Role-specific executive color theme
  const getRoleTheme = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("executive") || l.includes("ceo")) {
      return {
        avatar: "bg-primary/10 text-primary border-primary/25",
        badge: "bg-primary/10 text-primary border-primary/20",
      };
    }
    if (l.includes("financial") || l.includes("cfo")) {
      return {
        avatar: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25",
        badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      };
    }
    return {
      avatar: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25",
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    };
  };

  const roleTheme = getRoleTheme(roleLabel);

  return (
    <div className="bg-surface rounded-xl border border-border/80 p-4 sm:p-5 flex flex-col justify-between hover:border-primary/25 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 ease-out shadow-xs group">
      <div className="flex items-start gap-3.5">
        {/* Avatar with Initials */}
        <div
          className={`w-11 h-11 rounded-full border ${roleTheme.avatar} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200 ease-out`}
          aria-hidden="true"
        >
          {initials}
        </div>

        {/* Name and Designation */}
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <Badge
              variant="outline"
              className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 ${roleTheme.badge}`}
            >
              {roleLabel}
            </Badge>
          </div>
          <h3
            className="text-base font-bold text-foreground truncate"
            title={cleanName || undefined}
          >
            {cleanName ? (
              cleanName
            ) : (
              <span className="text-sm font-medium text-text-tertiary">Not designated</span>
            )}
          </h3>
          <p className="text-xs text-text-secondary truncate font-medium" title={cleanDesignation}>
            {cleanDesignation}
          </p>
        </div>
      </div>

      {/* Contact Details (rendered only if present) */}
      {(cleanEmail || cleanPhone) && (
        <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary">
          {cleanEmail && (
            <a
              href={`mailto:${cleanEmail}`}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors truncate max-w-full"
              title={cleanEmail}
            >
              <Mail className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span className="truncate">{cleanEmail}</span>
            </a>
          )}
          {cleanPhone && (
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors shrink-0"
              title={cleanPhone}
            >
              <Phone className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span>{cleanPhone}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export const KeyPersonnelSection: React.FC = () => {
  const { data: onboardingData, isLoading } = useOnboardingStatus();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/70 bg-surface-alt/30 p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-36" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const leadership = onboardingData?.leadership_info;

  return (
    <section
      aria-labelledby="key-personnel-heading"
      className="rounded-2xl border border-border/70 bg-linear-to-br from-surface-alt/40 via-surface to-surface-alt/20 p-5 sm:p-6 space-y-4 shadow-xs"
    >
      {/* Zone Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Users2 className="w-4 h-4" />
          </div>
          <h2
            id="key-personnel-heading"
            className="text-lg font-bold tracking-tight text-foreground font-display"
          >
            Key Personnel
          </h2>
          <span className="text-xs text-text-tertiary font-normal hidden sm:inline">
            · Executive governance & authorized representatives
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <ShieldCheck className="w-3.5 h-3.5 text-success" />
          <span>Synced with onboarding records</span>
        </div>
      </div>

      {/* Exactly 3 Person Cards (CEO, CFO, HR) — COO/CTO/CHRO omitted entirely */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CEO */}
        <PersonCard
          roleLabel="Chief Executive Officer"
          name={leadership?.founder_ceo_name}
          designation={leadership?.founder_ceo_designation || "Founder & CEO"}
          email={leadership?.founder_ceo_email}
          phone={leadership?.founder_ceo_phone}
        />

        {/* CFO */}
        <PersonCard
          roleLabel="Chief Financial Officer"
          name={leadership?.cfo_name}
          designation={leadership?.cfo_designation || "Chief Financial Officer"}
          email={leadership?.cfo_email}
          phone={leadership?.cfo_phone}
        />

        {/* HR Lead */}
        <PersonCard
          roleLabel="Human Resources"
          name={leadership?.hr_name}
          designation={leadership?.hr_designation || "Head of People & HR"}
          email={leadership?.hr_email}
          phone={leadership?.hr_phone}
        />
      </div>
    </section>
  );
};
