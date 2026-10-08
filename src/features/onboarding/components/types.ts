import { DocumentRequirement } from "../lib/businessOnboarding";

export interface UploadedDoc {
  id: string;
  document_type: string;
  document_category: string;
  filename: string;
  original_name: string;
  file_size_bytes: number;
  upload_status: string;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: string;
  status: string;
}

export interface GeneralInfoState {
  companyName: string;
  setCompanyName: (v: string) => void;
  businessCategory: string;
  setBusinessCategory: (v: string) => void;
  businessType: string;
  setBusinessType: (v: string) => void;
  cin: string;
  setCin: (v: string) => void;
  gstin: string;
  setGstin: (v: string) => void;
  businessPan: string;
  setBusinessPan: (v: string) => void;
  udyamNumber: string;
  setUdyamNumber: (v: string) => void;
  dateOfIncorporation: string;
  setDateOfIncorporation: (v: string) => void;
  registeredAddress: string;
  setRegisteredAddress: (v: string) => void;
  operationalAddress: string;
  setOperationalAddress: (v: string) => void;
  stateName: string;
  setStateName: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  pincode: string;
  setPincode: (v: string) => void;
  website: string;
  setWebsite: (v: string) => void;
  officialEmail: string;
  setOfficialEmail: (v: string) => void;
  officialPhone: string;
  setOfficialPhone: (v: string) => void;
  errors?: Record<string, string>;
  clearError?: (field: string) => void;
}

export interface LeadershipState {
  ceoName: string;
  setCeoName: (v: string) => void;
  ceoEmail: string;
  setCeoEmail: (v: string) => void;
  ceoPhone: string;
  setCeoPhone: (v: string) => void;
  ceoDesignation: string;
  setCeoDesignation: (v: string) => void;
  cfoName: string;
  setCfoName: (v: string) => void;
  cfoEmail: string;
  setCfoEmail: (v: string) => void;
  cfoPhone: string;
  setCfoPhone: (v: string) => void;
  cfoDesignation: string;
  setCfoDesignation: (v: string) => void;
  inviteCfo: boolean;
  setInviteCfo: (v: boolean) => void;
  hrName: string;
  setHrName: (v: string) => void;
  hrEmail: string;
  setHrEmail: (v: string) => void;
  hrPhone: string;
  setHrPhone: (v: string) => void;
  hrDesignation: string;
  setHrDesignation: (v: string) => void;
  inviteHr: boolean;
  setInviteHr: (v: boolean) => void;
  numberOfEmployees: string;
  setNumberOfEmployees: (v: string) => void;
  numberOfBranches: string;
  setNumberOfBranches: (v: string) => void;
  businessModel: string;
  setBusinessModel: (v: string) => void;
  primaryProductService: string;
  setPrimaryProductService: (v: string) => void;
  businessDescription: string;
  setBusinessDescription: (v: string) => void;
  teamInvites: TeamInvite[];
  errors?: Record<string, string>;
  clearError?: (field: string) => void;
}

export interface FinancialState {
  primaryBank: string;
  setPrimaryBank: (v: string) => void;
  numberOfAccounts: string;
  setNumberOfAccounts: (v: string) => void;
  hasBusinessLoan: boolean | null;
  setHasBusinessLoan: (v: boolean | null) => void;
  hasBusinessCreditCard: boolean | null;
  setHasBusinessCreditCard: (v: boolean | null) => void;
  accountingSoftware: string;
  setAccountingSoftware: (v: string) => void;
  digitalPaymentMethods: string[];
  togglePaymentMethod: (method: string) => void;
  errors?: Record<string, string>;
  clearError?: (field: string) => void;
}
