import { Landmark, CreditCard, Receipt, Layers } from "lucide-react";
import { ACCOUNTING_SOFTWARES, DIGITAL_PAYMENT_METHODS } from "../lib/businessOnboarding";
import { FinancialState } from "./types";
import { FormField, FormSelect } from "@/shared/components/ui/FormField";

interface Props {
  state: FinancialState;
}

const ACCOUNT_OPTIONS = [
  { label: "1 Account", value: "1" },
  { label: "2 Accounts", value: "2" },
  { label: "3 Accounts", value: "3" },
  { label: "4 Accounts", value: "4" },
  { label: "5+ Accounts", value: "5+" },
];

export function Step4FinancialInfo({ state }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Financial Info
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Configure banking, accounts, accounting tools, and transaction channels.
        </p>
      </div>

      <div className="space-y-5">
        {/* Section 1: Banking Setup */}
        <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-c pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Landmark className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">1. Primary Banking Accounts</h3>
              <p className="text-xs text-text-secondary">
                Operating current accounts and banking partner
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-1">
            {/* Primary Bank */}
            <FormField
              label="Primary Business Bank"
              optional
              error={state.errors?.primary_bank}
              value={state.primaryBank}
              onChange={(e) => {
                state.setPrimaryBank(e.target.value);
                state.clearError?.("primary_bank");
              }}
              placeholder="e.g. State Bank of India, HDFC Bank"
            />

            {/* Number of Accounts */}
            <FormSelect
              label="Number of Business Bank Accounts"
              optional
              error={state.errors?.number_of_accounts}
              value={state.numberOfAccounts}
              onValueChange={(val) => {
                state.setNumberOfAccounts(val);
                state.clearError?.("number_of_accounts");
              }}
              options={ACCOUNT_OPTIONS}
              placeholder="Select number of accounts"
            />
          </div>
        </div>

        {/* Section 2: Credit & Loan Facilities */}
        <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-c pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                2. Credit & Borrowing Facilities
              </h3>
              <p className="text-xs text-text-secondary">
                Existing working capital lines and corporate credit cards
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-1">
            {/* Business Loan / CC / OD */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-text-primary">
                Active Business Loan / Cash Credit / Overdraft?
              </span>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => state.setHasBusinessLoan(true)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition cursor-pointer shadow-xs ${
                    state.hasBusinessLoan === true
                      ? "border-brand bg-brand text-on-brand"
                      : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => state.setHasBusinessLoan(false)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition cursor-pointer shadow-xs ${
                    state.hasBusinessLoan === false
                      ? "border-brand bg-brand text-on-brand"
                      : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Corporate Credit Card */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-text-primary">
                Corporate / Commercial Credit Cards?
              </span>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => state.setHasBusinessCreditCard(true)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition cursor-pointer shadow-xs ${
                    state.hasBusinessCreditCard === true
                      ? "border-brand bg-brand text-on-brand"
                      : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => state.setHasBusinessCreditCard(false)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition cursor-pointer shadow-xs ${
                    state.hasBusinessCreditCard === false
                      ? "border-brand bg-brand text-on-brand"
                      : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Software & Channels */}
        <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-c pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Receipt className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                3. Accounting & Transaction Channels
              </h3>
              <p className="text-xs text-text-secondary">
                Ledger system and customer payment rails
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            <FormSelect
              label="Primary Accounting / ERP Software"
              optional
              value={state.accountingSoftware}
              onValueChange={(val) => state.setAccountingSoftware(val)}
              options={ACCOUNTING_SOFTWARES}
              placeholder="Select software"
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text-primary tracking-tight">
                  Accepted Digital Payment Channels
                </label>
                <span className="text-[11px] font-normal text-text-tertiary">
                  Select all that apply
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DIGITAL_PAYMENT_METHODS.map((pm) => {
                  const selected = state.digitalPaymentMethods.includes(pm);
                  return (
                    <button
                      key={pm}
                      type="button"
                      onClick={() => state.togglePaymentMethod(pm)}
                      className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer shadow-xs ${
                        selected
                          ? "border-brand bg-brand/10 text-brand font-bold"
                          : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"
                      }`}
                    >
                      <span>{pm}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
