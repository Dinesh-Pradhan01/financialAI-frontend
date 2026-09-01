import { BusinessOnboardingFullResponse } from "@/shared/types/api";

/**
 * Computes the initial resume step index (1-5) based on existing saved progress.
 * Evaluates in forward order to land the user on their first incomplete step.
 */
export function computeResumeStep(
  res: Partial<BusinessOnboardingFullResponse> | null | undefined,
): number {
  if (!res) return 1;

  if (res.status === "completed") {
    return 5;
  }

  const docs = res.documents || [];
  const hasPan = docs.some((d) => d.document_type === "business_pan");
  const hasReg = docs.some((d) => d.document_type === "registration_proof");
  const isStep1Complete = hasPan && hasReg;

  if (!isStep1Complete) {
    return 1;
  }
  if (!res.general_info) {
    return 2;
  }
  if (!res.leadership_info) {
    return 3;
  }
  if (!res.financial_info) {
    return 4;
  }
  return 5;
}
