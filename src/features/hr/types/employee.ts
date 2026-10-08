export type EmployeeStatus = "Active" | "Inactive" | "Notice Period" | "Resigned" | "";

export interface EmployeeRecord {
  rowId: string;
  sourceRow: number;

  // Personal
  employeeId: string;
  employeeName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  joiningDate: string;
  department: string;
  designation: string;
  manager: string;
  employmentType: string;
  status: EmployeeStatus;

  // Salary
  salary: string;
  previousSalary: string;
  salaryHikePercent: string;
  grossSalary: string;
  netSalary: string;
  ctc: string;
  salaryFrequency: string;
  salaryCycle: string;
  salaryPaymentDate: string;

  // Identity
  panNumber: string;
  aadhaarNumber: string;
  pfNumber: string;
  esicNumber: string;
  uanNumber: string;

  // Office
  employeeCategory: string;
  location: string;
  costCenter: string;
  vendorAllocation: string;
  projectAllocation: string;
  payrollId: string;
  vendorId: string;

  // Address
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelation: string;

  // Banking
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountType: string;
  salaryAccount: string;
  salaryCreditAccountNumber: string;
  salaryCreditIfsc: string;
  salaryCreditBank: string;
  upiId: string;
  micrCode: string;
  swiftCode: string;
  bankCity: string;
  bankState: string;
  bankCountry: string;
  paymentMode: string;
  salaryTransferType: string;
  primaryBankFlag: string;
  secondaryBankFlag: string;
  panLinkedAccount: string;
  salaryAccountVerified: string;
  bankVerificationStatus: string;
  kycStatus: string;

  isBlank: boolean;
  [key: string]: any;
}

export interface UploadedFileMeta {
  name: string;
  size: number;
  uploadedAt: Date;
  objectUrl: string;
}

export type ValidationSeverity = "error" | "warning";

export interface ValidationIssue {
  id: string;
  severity: ValidationSeverity;
  code: string;
  message: string;
  rowId?: string;
  sourceRow?: number;
  field?: keyof EmployeeRecord;
}

export interface ValidationSummary {
  validEmployees: number;
  warnings: number;
  errors: number;
  issues: ValidationIssue[];
  errorRowIds: string[];
  warningRowIds: string[];
  duplicateIds: number;
  missingRequiredFields: number;
}

export interface EmployeePreviewResponse {
  upload_id?: string;
  schema_def?: any;
  records?: EmployeeRecord[];
  summary?: ValidationSummary;
  validation?: ValidationSummary;
  file_meta?: {
    name?: string;
    size?: number;
  };
}

// EmployeeFilters lives in shared/types/hr.ts (so Redux slice can import it
// without a shared→features circular dependency). Re-export here for convenience.
export type { EmployeeFilters } from "@/shared/types/hr";
