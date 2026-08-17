import React from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface Props {
  step: number;
  savingDraft: boolean;
  onFillDemoData: () => void;
  onJumpToStep: (stepNumber: number) => void;
}

export function OnboardingStepperHeader({
  step,
  savingDraft,
  onFillDemoData,
  onJumpToStep,
}: Props) {
  return (
    <div>
      {/* Header Mobile / Top Nav */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 lg:hidden">
          <Sparkles className="h-5 w-5 text-brand" />
          <span className="font-display text-lg font-bold">SpotLite Business</span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            onClick={onFillDemoData}
            className="flex items-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold text-brand hover:bg-brand/20 transition shadow-xs cursor-pointer"
            title="Pre-fill form with sample demo data for quick testing"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            Fill Demo Data
          </button>
          {savingDraft && (
            <span className="flex items-center gap-1.5 text-xs text-text-secondary animate-pulse">
              <Loader2 className="h-3 w-3 animate-spin text-brand" /> Saving progress…
            </span>
          )}
        </div>
      </div>

      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs text-text-secondary font-medium mb-3">
          <span className="font-mono text-brand font-semibold">STEP {step} OF 5</span>
          <span className="font-semibold text-text-primary">
            {step === 1 && "1. Business Verification"}
            {step === 2 && "2. General Info"}
            {step === 3 && "3. Team Members"}
            {step === 4 && "4. Financial Info"}
            {step === 5 && "5. Review & Complete"}
          </span>
        </div>

        {/* Stepper Pills */}
        <div className="grid grid-cols-5 gap-1.5 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                if (s < step) onJumpToStep(s);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? "bg-brand"
                  : s < step
                  ? "bg-brand/40 cursor-pointer"
                  : "bg-border cursor-default"
              }`}
              title={s < step ? `Jump to Step ${s}` : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
