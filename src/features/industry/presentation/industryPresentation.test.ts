import { describe, it, expect } from "vitest";
import {
  formatFinancialValue,
  EM_DASH,
  compareOverlapLevels,
  getReasonDisplayCopy,
  getBasisDisplayCopy,
  OVERLAP_LEVEL_META,
} from "./industryPresentation";

describe("industryPresentation formatters", () => {
  describe("formatFinancialValue", () => {
    it("renders em dash for null, undefined, and NaN", () => {
      expect(formatFinancialValue(null)).toBe(EM_DASH);
      expect(formatFinancialValue(undefined)).toBe(EM_DASH);
      expect(formatFinancialValue(NaN)).toBe(EM_DASH);
      expect(formatFinancialValue(null, { isPercentage: true })).toBe(EM_DASH);
      expect(formatFinancialValue(null, { showCurrency: true })).toBe(EM_DASH);
    });

    it("formats zero as 0.00 and not as em dash", () => {
      expect(formatFinancialValue(0)).toBe("0.00");
      expect(formatFinancialValue(0, { isPercentage: true })).toBe("0.00%");
      expect(formatFinancialValue(0, { showCurrency: true })).toBe("₹0.00");
    });

    it("formats standard positive numbers with en-IN grouping and 2 decimal places", () => {
      expect(formatFinancialValue(1422)).toBe("1,422.00");
      expect(formatFinancialValue(45.5)).toBe("45.50");
      expect(formatFinancialValue(1234567.89)).toBe("12,34,567.89");
    });

    it("formats negative numbers with correct sign placement", () => {
      expect(formatFinancialValue(-12.5)).toBe("-12.50");
      expect(formatFinancialValue(-12.5, { isPercentage: true })).toBe("-12.50%");
      expect(formatFinancialValue(-12.5, { showCurrency: true })).toBe("-₹12.50");
    });

    it("formats percentages with % suffix", () => {
      expect(formatFinancialValue(18.07, { isPercentage: true })).toBe("18.07%");
      expect(formatFinancialValue(-3.45, { isPercentage: true })).toBe("-3.45%");
    });

    it("supports custom decimal digits when specified", () => {
      expect(formatFinancialValue(12.3456, { digits: 0 })).toBe("12");
      expect(formatFinancialValue(12.3456, { digits: 1 })).toBe("12.3");
      expect(formatFinancialValue(12.3456, { digits: 3 })).toBe("12.346");
    });
  });

  describe("overlap level ordering", () => {
    it("orders levels strictly from highest to lowest overlap", () => {
      expect(compareOverlapLevels("Very High", "High")).toBeLessThan(0);
      expect(compareOverlapLevels("High", "Moderate High")).toBeLessThan(0);
      expect(compareOverlapLevels("Moderate High", "Moderate")).toBeLessThan(0);
      expect(compareOverlapLevels("Moderate", "Very High")).toBeGreaterThan(0);
      expect(compareOverlapLevels("High", "High")).toBe(0);
    });

    it("has metadata for all 4 allowed levels", () => {
      const levels = ["Very High", "High", "Moderate High", "Moderate"] as const;
      for (const level of levels) {
        const meta = OVERLAP_LEVEL_META[level];
        expect(meta).toBeDefined();
        expect(meta.label).toContain(level);
        expect(meta.badgeClasses).toBeTruthy();
        expect(meta.icon).toBeDefined();
      }
    });
  });

  describe("copy maps", () => {
    it("maps known reason codes to exact human copy", () => {
      expect(getReasonDisplayCopy("unlisted_private_company")).toBe(
        "Financial data is not publicly reported for unlisted private companies.",
      );
      expect(getReasonDisplayCopy("no_financials_loaded")).toBe(
        "Financial statements are currently not loaded for this entity.",
      );
      expect(getReasonDisplayCopy("gap_in_quarters")).toBe(
        "Insufficient consecutive quarterly records to compute reliable annual roll-ups.",
      );
    });

    it("handles unknown or null reason codes gracefully", () => {
      expect(getReasonDisplayCopy(null)).toBeNull();
      expect(getReasonDisplayCopy("")).toBeNull();
      expect(getReasonDisplayCopy("custom_reason_code")).toBe("Custom Reason Code.");
    });

    it("maps basis codes to human copy", () => {
      expect(getBasisDisplayCopy("reported")).toBe("Audited reported figures");
      expect(getBasisDisplayCopy("rolled_up")).toBe("Computed sum of 4 quarters");
      expect(getBasisDisplayCopy(null)).toBe("");
    });
  });
});
