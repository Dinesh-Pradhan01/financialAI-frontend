import React, { useState } from "react";
import { Copy, Check, ShieldCheck, FileText } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useCompanyProfile, useOnboardingStatus } from "../hooks/useCompanyAPI";
import { copySingleField, copyBlock } from "../lib/clipboard";

export const KeyInformationCard: React.FC = () => {
  const { data: profile, isLoading: isProfileLoading } = useCompanyProfile();
  const { data: onboardingData, isLoading: isOnboardingLoading } = useOnboardingStatus();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const general = onboardingData?.general_info;
  const companyName = profile?.company_name || general?.company_name || "Company";

  // Identifiers: GSTIN, CIN, PAN, UDYAM
  const gstin = profile?.gst || general?.gstin?.trim() || null;
  const cin = general?.cin?.trim() || null;
  const pan = profile?.pan || general?.business_pan?.trim() || null;
  const udyam = general?.udyam_number?.trim() || null;

  // Determine if non-corporate entity legally without a CIN
  const bType = (general?.business_type || general?.business_category || "").toLowerCase();
  const isExplicitNonCorporate = Boolean(
    bType &&
    !bType.includes("limited") &&
    !bType.includes("ltd") &&
    (bType.includes("proprietorship") || bType.includes("partnership") || bType.includes("llp") || bType.includes("individual"))
  );
  const displayCin = cin || (isExplicitNonCorporate ? "N/A (Non-corporate)" : "—");

  const handleCopyField = async (label: string, value: string | null | undefined, key: string) => {
    const success = await copySingleField(label, value);
    if (success) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  const handleCopyBlock = async () => {
    const fieldsToCopy = [
      { label: "GSTIN", value: gstin },
      { label: "CIN", value: cin || (isExplicitNonCorporate ? "N/A (Non-corporate)" : null) },
      { label: "PAN", value: pan },
      ...(udyam ? [{ label: "UDYAM", value: udyam }] : []),
    ];
    const success = await copyBlock(companyName, "Statutory Identifiers", fieldsToCopy);
    if (success) {
      setCopiedKey("block");
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  const activeCount = [gstin, cin, pan, udyam].filter(Boolean).length;
  const hasAnyKeyInfo = Boolean(gstin || cin || pan || udyam);

  if (isProfileLoading && isOnboardingLoading) {
    return (
      <Card className="border border-border/80 shadow-xs bg-surface rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-3.5 w-64" />
            </div>
          </div>
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      aria-labelledby="key-information-heading"
      className="border border-border/80 shadow-xs bg-surface rounded-xl p-5 sm:p-6 transition-colors"
    >
      {/* Header with Title, Badge, Description, and Copy All action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <CardTitle id="key-information-heading" className="text-base sm:text-lg font-bold tracking-tight text-foreground font-display">
                Key Information
              </CardTitle>
              <Badge
                variant="outline"
                className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20 px-2 py-0.5"
              >
                {activeCount > 0 ? `${activeCount} Verified Identifiers` : "Statutory Records"}
              </Badge>
            </div>
            <p className="text-xs text-text-tertiary mt-0.5 font-medium">
              Official corporate registration, tax identification numbers, and compliance filings
            </p>
          </div>
        </div>

        {hasAnyKeyInfo && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyBlock}
            className={`h-8 px-3 text-xs border-border/70 cursor-pointer self-start sm:self-auto flex items-center gap-1.5 shrink-0 active:scale-95 transition-all duration-200 ${
              copiedKey === "block"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "text-text-secondary hover:text-foreground hover:bg-surface-alt"
            }`}
            title="Copy all statutory credentials to clipboard"
          >
            {copiedKey === "block" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {activeCount} Records Copied
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Structured 4-Column Identifier Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
        {/* GSTIN Tile */}
        <div className="p-3.5 rounded-xl bg-surface-alt/50 border border-border/60 hover:border-primary/40 hover:bg-surface-alt/80 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group/tile">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-foreground tracking-wide block">GSTIN</span>
              <span className="text-[10px] text-text-tertiary font-medium block">Goods & Services Tax</span>
            </div>
            {gstin && (
              <button
                type="button"
                onClick={() => handleCopyField("GSTIN", gstin, "gstin")}
                className="p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border/60 text-text-tertiary hover:text-foreground active:scale-90 transition-all cursor-pointer shrink-0"
                title="Copy GSTIN"
                aria-label="Copy GSTIN"
              >
                {copiedKey === "gstin" ? (
                  <Check className="w-3.5 h-3.5 text-success" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
          <div className="mt-3 pt-2.5 border-t border-border/40">
            <span
              className={`font-mono text-xs sm:text-sm tracking-tight block truncate ${
                gstin ? "font-bold text-foreground select-all" : "text-text-tertiary font-normal"
              }`}
            >
              {gstin || "Not configured"}
            </span>
          </div>
        </div>

        {/* CIN Tile */}
        <div className="p-3.5 rounded-xl bg-surface-alt/50 border border-border/60 hover:border-primary/40 hover:bg-surface-alt/80 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group/tile">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-foreground tracking-wide block">CIN</span>
              <span className="text-[10px] text-text-tertiary font-medium block">Corporate Identity</span>
            </div>
            {cin && (
              <button
                type="button"
                onClick={() => handleCopyField("CIN", cin, "cin")}
                className="p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border/60 text-text-tertiary hover:text-foreground active:scale-90 transition-all cursor-pointer shrink-0"
                title="Copy CIN"
                aria-label="Copy CIN"
              >
                {copiedKey === "cin" ? (
                  <Check className="w-3.5 h-3.5 text-success" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
          <div className="mt-3 pt-2.5 border-t border-border/40">
            <span
              className={`font-mono text-xs sm:text-sm tracking-tight block truncate ${
                cin
                  ? "font-bold text-foreground select-all"
                  : isExplicitNonCorporate
                  ? "text-text-tertiary font-medium text-xs"
                  : "text-text-tertiary font-normal"
              }`}
            >
              {displayCin}
            </span>
          </div>
        </div>

        {/* PAN Tile */}
        <div className="p-3.5 rounded-xl bg-surface-alt/50 border border-border/60 hover:border-primary/40 hover:bg-surface-alt/80 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group/tile">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-foreground tracking-wide block">PAN</span>
              <span className="text-[10px] text-text-tertiary font-medium block">Income Tax ID</span>
            </div>
            {pan && (
              <button
                type="button"
                onClick={() => handleCopyField("PAN", pan, "pan")}
                className="p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border/60 text-text-tertiary hover:text-foreground active:scale-90 transition-all cursor-pointer shrink-0"
                title="Copy PAN"
                aria-label="Copy PAN"
              >
                {copiedKey === "pan" ? (
                  <Check className="w-3.5 h-3.5 text-success" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
          <div className="mt-3 pt-2.5 border-t border-border/40">
            <span
              className={`font-mono text-xs sm:text-sm tracking-tight block truncate ${
                pan ? "font-bold text-foreground select-all" : "text-text-tertiary font-normal"
              }`}
            >
              {pan || "Not configured"}
            </span>
          </div>
        </div>

        {/* UDYAM Tile */}
        <div className="p-3.5 rounded-xl bg-surface-alt/50 border border-border/60 hover:border-primary/40 hover:bg-surface-alt/80 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group/tile">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-foreground tracking-wide block">UDYAM</span>
              <span className="text-[10px] text-text-tertiary font-medium block">MSME Registration</span>
            </div>
            {udyam && (
              <button
                type="button"
                onClick={() => handleCopyField("UDYAM", udyam, "udyam")}
                className="p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border/60 text-text-tertiary hover:text-foreground active:scale-90 transition-all cursor-pointer shrink-0"
                title="Copy UDYAM number"
                aria-label="Copy UDYAM number"
              >
                {copiedKey === "udyam" ? (
                  <Check className="w-3.5 h-3.5 text-success" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
          <div className="mt-3 pt-2.5 border-t border-border/40">
            <span
              className={`font-mono text-xs sm:text-sm tracking-tight block truncate ${
                udyam ? "font-bold text-foreground select-all" : "text-text-tertiary font-normal"
              }`}
            >
              {udyam || "Optional / Not registered"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
