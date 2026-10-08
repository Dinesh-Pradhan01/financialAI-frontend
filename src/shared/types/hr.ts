/**
 * HR domain types — shared between the HR slice (Redux) and feature components.
 *
 * Types are defined here (in shared/types) rather than inside features/hr/types
 * so that shared/store/slices/hrSlice.ts can import them without creating a
 * shared → features circular dependency.
 */

// ---------------------------------------------------------------------------
// Employee
// ---------------------------------------------------------------------------

export interface EmployeeFilters {
  search: string;
  department: string;
  status: string;
  employmentType: string;
  manager: string;
  bankName: string;
  accountType: string;
  paymentMode: string;
  salaryMin: string;
  salaryMax: string;
  salaryFrequency: string;
}

// ---------------------------------------------------------------------------
// Vendor
// ---------------------------------------------------------------------------

export interface VendorFilters {
  search: string;
  industry: string;
  status: string;
  currency: string;
  contractType: string;
  paymentType: string;
}
