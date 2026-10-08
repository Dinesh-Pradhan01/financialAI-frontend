/**
 * CFO domain types — shared between the CFO slice (Redux) and feature components.
 */

export interface VendorFilters {
  search: string;
  industry: string;
  status: string;
  currency: string;
  contractType: string;
  paymentType: string;
}
