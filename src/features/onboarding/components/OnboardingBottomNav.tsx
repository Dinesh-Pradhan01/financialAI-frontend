import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  step: number;
  savingDraft: boolean;
  submitting: boolean;
  isCurrentStepValid: boolean;
  uploadingDocType: string | null;
  deletingDocId: string | null;
  onPrevStep: () => void;
  onNextStep: () => void;
  onFinalSubmit: () => void;
}

export function OnboardingBottomNav({
  step,
  savingDraft,
  submitting,
  isCurrentStepValid,
  uploadingDocType,
  deletingDocId,
  onPrevStep,
  onNextStep,
  onFinalSubmit,
}: Props) {
  const isBusy = Boolean(savingDraft || submitting || uploadingDocType || deletingDocId);
  const isDisabled = isBusy || !isCurrentStepValid;

  return (
    <div className="mt-8 pt-4 border-t border-border flex items-center justify-center gap-4">
      {step > 1 && step < 5 && (
        <button
          type="button"
          onClick={onPrevStep}
          disabled={isBusy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface-alt transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}

      {step < 5 ? (
        <button
          type="button"
          onClick={onNextStep}
          disabled={isDisabled}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 px-10 text-sm font-semibold text-white shadow-brand hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-w-[180px]"
        >
          {savingDraft ? (
            step === 1 ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            )
          ) : (
            <>
              {step === 4 ? "Save & Review" : "Save & Continue"}{" "}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onFinalSubmit}
          disabled={isDisabled}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient py-2.5 px-10 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-w-50"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Completing...
            </>
          ) : (
            <>
              Complete Onboarding <CheckCircle2 className="h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
