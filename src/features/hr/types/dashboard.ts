export interface EmployeeMetrics {
  totalEmployees: number;
  activeEmployees: number;
}

export interface VendorMetrics {
  totalVendors: number;
  recurringVendors: number;
}

export interface UploadHistoryItem {
  upload_id: string;
  upload_type: "Employee" | "Vendor";
  file_name: string;
  record_count: number;
  uploaded_at: string;
}
