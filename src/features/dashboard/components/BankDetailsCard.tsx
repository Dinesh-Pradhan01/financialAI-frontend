import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import {
  Landmark,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  CreditCard,
  Building2,
  ExternalLink,
  CheckCircle2,
  Clock,
  PlusCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useOnboardingStatus, useCompanyProfile } from "../hooks/useCompanyAPI";
import { useSpendingReport } from "@/features/spending/hooks/useSpendingReport";
import { copySingleField, copyBlock } from "../lib/clipboard";

export const BankDetailsCard: React.FC = () => {
  const { data: onboardingData, isLoading: isOnboardingLoading } = useOnboardingStatus();
  const { data: profile } = useCompanyProfile();
  const { data: reportData, isLoading: isReportLoading } = useSpendingReport();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showFullAccount, setShowFullAccount] = useState<boolean>(false);

  const companyName = profile?.company_name || onboardingData?.general_info?.company_name || "Company";

  const financial = onboardingData?.financial_info;
  const metadata = reportData?.section_1_header_metadata;

  // Extracted statement accounts (Tier B)
  const extractedBank = metadata?.bank_name?.trim() || null;
  const rawAccountNumber = metadata?.account_number?.trim() || null;
  const maskedAccountNumber = rawAccountNumber
    ? `•••• ${rawAccountNumber.slice(-4)}`
    : null;
  const ifscCode = metadata?.ifsc_code_branch?.trim() || null;
  const accountHolder = metadata?.account_holder_name?.trim() || null;
  const accountType = metadata?.account_type || "Current Account";

  // Declared onboarding banking (Tier A)
  const primaryBank = extractedBank || financial?.primary_bank?.trim() || null;
  const numberOfAccounts = financial?.number_of_accounts ?? null;

  const hasTierB = Boolean(maskedAccountNumber || ifscCode || accountHolder);
  const hasTierA = Boolean(primaryBank || (numberOfAccounts !== null && numberOfAccounts > 0));
  const hasAnyBankData = hasTierA || hasTierB;

  const handleCopyField = async (label: string, value: string | number | null | undefined, key: string) => {
    const success = await copySingleField(label, value);
    if (success) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  const handleCopyBlock = async () => {
    const fieldsToCopy = [
      { label: "Primary Bank", value: primaryBank },
      { label: "Account Type", value: accountType },
      { label: "Account Number", value: rawAccountNumber || maskedAccountNumber },
      { label: "IFSC Code", value: ifscCode },
      { label: "Account Holder", value: accountHolder },
      ...(numberOfAccounts ? [{ label: "Total Accounts", value: numberOfAccounts }] : []),
    ];
    const success = await copyBlock(companyName, "Bank Details", fieldsToCopy);
    if (success) {
      setCopiedKey("block");
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  if (isOnboardingLoading && isReportLoading) {
    return (
      <Card className="h-full border border-border/80 shadow-xs bg-surface rounded-xl p-6 sm:p-7 flex flex-col justify-between">
        <div className="space-y-4">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-48" />
          <div className="space-y-3 pt-3">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-6 w-24 rounded mt-6" />
      </Card>
    );
  }

  return (
    <Card className="h-full border border-border/80 shadow-xs bg-surface rounded-xl flex flex-col justify-between p-6 sm:p-7 group hover:border-border transition-colors">
      <div className="space-y-4">
        {/* Header with Executive Context and Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground font-display">
                Bank Details
              </CardTitle>
              <p className="text-xs text-text-tertiary mt-0.5 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
                <span>Institutional accounts & settlement infrastructure</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasAnyBankData && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyBlock}
                className="h-8 px-2.5 text-xs text-text-secondary hover:text-foreground border-border/70 cursor-pointer flex items-center gap-1.5"
                title="Copy all bank details"
              >
                {copiedKey === "block" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-success" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copy All</span>
                  </>
                )}
              </Button>
            )}

            <Link
              to="/spending"
              className="h-8 px-2.5 text-xs font-medium text-primary hover:text-primary/80 border border-primary/20 hover:border-primary/40 bg-primary/5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Connect bank statement or account"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Link Bank</span>
            </Link>
          </div>
        </div>

        {/* Content: Multi-Bank Account Register */}
        {hasAnyBankData ? (
          <div className="space-y-3 pt-1">
            {/* Primary Operating Account Register Card */}
            <div className="p-4 rounded-xl bg-surface-alt/60 border border-border/60 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {primaryBank || "Primary Operating Account"}
                    </h3>
                    <span className="text-[11px] text-text-tertiary font-medium">
                      {accountType}
                    </span>
                  </div>
                </div>

                {/* Account Sync Freshness Badge */}
                {hasTierB ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Live Synced
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Clock className="w-3 h-3" /> Statement Pending
                  </span>
                )}
              </div>

              {/* Account Number & IFSC Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-border/40 text-xs">
                {/* Account Number */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface/70 border border-border/40">
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary block">
                        Account No.
                      </span>
                      {showFullAccount && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1 rounded animate-in fade-in duration-200">
                          <ShieldCheck className="w-2.5 h-2.5" /> Full View
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-foreground truncate block select-all">
                      {showFullAccount
                        ? rawAccountNumber || "In Onboarding"
                        : maskedAccountNumber || "•••• In Onboarding"}
                    </span>
                  </div>
                  {(rawAccountNumber || maskedAccountNumber) && (
                    <div className="flex items-center gap-0.5 shrink-0">
                      {rawAccountNumber && (
                        <button
                          type="button"
                          onClick={() => setShowFullAccount((prev) => !prev)}
                          className="p-1 rounded text-text-tertiary hover:text-foreground hover:bg-surface-alt active:scale-90 transition-all cursor-pointer"
                          title={showFullAccount ? "Mask account number" : "Show full account number"}
                          aria-label={showFullAccount ? "Mask account number" : "Show full account number"}
                        >
                          {showFullAccount ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyField(
                            "Account Number",
                            rawAccountNumber || maskedAccountNumber,
                            "acc"
                          )
                        }
                        className="p-1 rounded text-text-tertiary hover:text-foreground hover:bg-surface-alt active:scale-90 transition-all cursor-pointer"
                        title="Copy full account number"
                        aria-label="Copy full account number"
                      >
                        {copiedKey === "acc" ? (
                          <Check className="w-3.5 h-3.5 text-success" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* IFSC Code */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface/70 border border-border/40">
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary block">
                      IFSC Code
                    </span>
                    <span className="font-mono font-bold text-foreground truncate block">
                      {ifscCode || "Declared in Onboarding"}
                    </span>
                  </div>
                  {ifscCode && (
                    <button
                      type="button"
                      onClick={() => handleCopyField("IFSC Code", ifscCode, "ifsc")}
                      className="p-1 rounded text-text-tertiary hover:text-foreground hover:bg-surface-alt active:scale-90 transition-all cursor-pointer shrink-0"
                      aria-label="Copy IFSC code"
                    >
                      {copiedKey === "ifsc" ? (
                        <Check className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Account Holder if extracted */}
              {accountHolder && (
                <div className="flex items-center gap-1 text-xs pt-0.5 text-text-secondary">
                  <span className="text-[11px] text-text-tertiary">Beneficiary / Holder:</span>
                  <span className="font-medium text-foreground truncate max-w-50" title={accountHolder}>
                    {accountHolder}
                  </span>
                </div>
              )}
            </div>

            {/* Additional Registered Bank Accounts (Resolves Multi-Account Amnesia) */}
            {numberOfAccounts !== null && numberOfAccounts > 1 ? (
              <div className="p-3 rounded-xl bg-surface-alt/40 border border-border/50 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-text-tertiary" />
                    <span className="font-semibold text-foreground">
                      {numberOfAccounts - 1} Additional Operating {numberOfAccounts - 1 === 1 ? "Account" : "Accounts"}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-tertiary">
                    Connected in company onboarding · Awaiting statement upload
                  </p>
                </div>
                <Link
                  to="/spending"
                  className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Sync Statement</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          /* Empty state */
          <div className="py-10 px-4 rounded-xl bg-surface-alt/40 border border-dashed border-border/70 flex flex-col items-center justify-center text-center space-y-2 my-auto">
            <Lock className="w-8 h-8 text-text-tertiary/60" />
            <p className="text-sm font-semibold text-foreground/80">No bank details added yet</p>
            <p className="text-xs text-text-tertiary max-w-xs leading-relaxed">
              Bank accounts and settlement details will appear here once connected.
            </p>
          </div>
        )}
      </div>

      {/* Footer security note */}
      <div className="pt-4 border-t border-border/50 flex items-center justify-between text-[11px] text-text-tertiary">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-text-tertiary" />
          <span>{showFullAccount ? "Executive Unmasked View" : "Masked for privacy"}</span>
        </span>
        <span className="font-mono text-[10px]">
          {hasTierB ? "Bank-Grade Encryption · Verified Statement" : hasTierA ? "Bank-Grade Encryption · Declared Setup" : "Unverified"}
        </span>
      </div>
    </Card>
  );
};
