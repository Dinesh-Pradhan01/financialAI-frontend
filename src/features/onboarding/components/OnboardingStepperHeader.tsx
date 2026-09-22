import { Sparkles, Loader2 } from "lucide-react";

interface Props {
  step: number;
  completionPct: number;
  savingDraft: boolean;
  onFillDemoData: () => void;
  onJumpToStep: (stepNumber: number) => void;
}

export function OnboardingStepperHeader({
  step,
  completionPct,
  savingDraft,
  onFillDemoData,
  onJumpToStep,
}: Props) {
  // Do not render stepper header / progress bar on the final Review & Complete screen
  if (step >= 5) {
    return null;
  }

  return (
    <div>
      {/* Top Action Bar: Demo Fill & Auto-Save Indicator */}
      <div className="flex justify-end items-center gap-3 mb-5">
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

      {/* Stepper Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-text-secondary font-medium mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-brand font-semibold">STEP {step} OF 4</span>
            <span className="text-border-c">·</span>
            <span className="font-semibold text-brand">{completionPct}% Complete</span>
          </div>
          <span className="font-semibold text-text-primary">
            {step === 1 && "1. Business Verification"}
            {step === 2 && "2. General Info"}
            {step === 3 && "3. Leadership & Organization"}
            {step === 4 && "4. Financial Info"}
          </span>
        </div>

        {/* Stepper Pills */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          {[1, 2, 3, 4].map((s) => {
            const isClickable = s < step;
            return (
              <button
                key={s}
                type="button"
                disabled={!isClickable}
                onClick={() => {
                  if (isClickable) onJumpToStep(s);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? "bg-brand shadow-xs"
                    : s < step
                      ? "bg-brand/50 hover:bg-brand/70 cursor-pointer"
                      : "bg-border cursor-default"
                } ${!isClickable ? "cursor-default" : ""}`}
                title={isClickable ? `Jump to Step ${s}` : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
