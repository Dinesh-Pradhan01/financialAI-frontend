import { z } from "zod";
import type { ValidationErrorDetail } from "@/shared/types/api";

// ---------------------------------------------------------------------------
// Step 1: General Information Schema
// ---------------------------------------------------------------------------

export const generalInfoSchema = z.object({
  company_name: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters"),
  business_category: z
    .string()
    .min(1, "Please select a business category"),
  business_type: z
    .string()
    .min(1, "Please select a business legal type"),
  cin: z.string().trim().nullable().optional(),
  gstin: z.string().trim().nullable().optional(),
  business_pan: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Business PAN must be exactly 10 characters (e.g. ABCDE1234F)"),
  udyam_number: z.string().trim().nullable().optional(),
  date_of_incorporation: z.string().trim().nullable().optional(),
  registered_address: z
    .string()
    .trim()
    .min(5, "Registered address must be at least 5 characters"),
  operational_address: z.string().trim().nullable().optional(),
  state: z.string().min(1, "Please select a state"),
  city: z.string().trim().min(2, "City must be at least 2 characters"),
  pincode: z
    .string()
    .trim()
    .min(6, "PIN code must be at least 6 characters")
    .max(10, "PIN code cannot exceed 10 characters"),
  website: z.string().trim().nullable().optional(),
  official_email: z
    .string()
    .trim()
    .email("Please enter a valid official email address"),
  official_phone: z
    .string()
    .trim()
    .min(10, "Official phone must be at least 10 digits"),
});

export type GeneralInfoFormData = z.infer<typeof generalInfoSchema>;

// ---------------------------------------------------------------------------
// Step 2: Leadership & Team Info Schema
// ---------------------------------------------------------------------------

export const leadershipInfoSchema = z.object({
  founder_ceo_name: z
    .string()
    .trim()
    .min(1, "CEO / Founder name is required")
    .nullable()
    .optional(),
  founder_ceo_email: z
    .string()
    .trim()
    .email("Invalid CEO email")
    .or(z.literal(""))
    .nullable()
    .optional(),
  founder_ceo_phone: z.string().trim().nullable().optional(),
  founder_ceo_designation: z.string().trim().nullable().optional(),
  number_of_employees: z.string().trim().nullable().optional(),
  number_of_branches: z.string().trim().nullable().optional(),
  business_model: z.string().trim().nullable().optional(),
  primary_product_service: z.string().trim().nullable().optional(),
  business_description: z.string().trim().nullable().optional(),
  cfo_name: z.string().trim().nullable().optional(),
  cfo_email: z
    .string()
    .trim()
    .email("Invalid CFO email")
    .or(z.literal(""))
    .nullable()
    .optional(),
  cfo_phone: z.string().trim().nullable().optional(),
  cfo_designation: z.string().trim().nullable().optional(),
  invite_cfo: z.boolean().default(false),
  hr_name: z.string().trim().nullable().optional(),
  hr_email: z
    .string()
    .trim()
    .email("Invalid HR email")
    .or(z.literal(""))
    .nullable()
    .optional(),
  hr_phone: z.string().trim().nullable().optional(),
  hr_designation: z.string().trim().nullable().optional(),
  invite_hr: z.boolean().default(false),
});

export type LeadershipInfoFormData = z.infer<typeof leadershipInfoSchema>;

// ---------------------------------------------------------------------------
// Step 3: Financial Info Schema
// ---------------------------------------------------------------------------

export const financialInfoSchema = z.object({
  primary_bank: z.string().trim().nullable().optional(),
  number_of_accounts: z
    .number()
    .int()
    .min(1, "Number of accounts must be at least 1")
    .default(1),
  has_business_loan: z.boolean().nullable().optional(),
  has_business_credit_card: z.boolean().nullable().optional(),
  accounting_software: z.string().trim().nullable().optional(),
  digital_payment_methods: z.array(z.string()).default([]),
});

export type FinancialInfoFormData = z.infer<typeof financialInfoSchema>;

// ---------------------------------------------------------------------------
// Error Parser Helper
// ---------------------------------------------------------------------------

import { parseApiError } from "@/shared/lib/apiError";

/**
 * Extracts field-level error messages from backend 422 validation response or Zod error.
 */
export function parseApiValidationErrors(
  error: unknown
): Record<string, string> {
  return parseApiError(error).fieldErrors;
}
