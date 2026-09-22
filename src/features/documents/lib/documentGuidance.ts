export interface DocumentSlot {
  typeKey: string; // matches document_type on the backend record
  label: string;
  description: string;
  category: "mandatory" | "optional" | "recommended";
  instanceMode: "single" | "multiple";
  why: string;
  equivalents?: string;
  acceptedFormats?: string;
  maxSizeLabel?: string;
}

export const KNOWN_DOCUMENT_SLOTS: DocumentSlot[] = [
  {
    typeKey: "business_pan",
    label: "Business PAN Card",
    description: "Official Permanent Account Number card issued to the corporate entity.",
    category: "mandatory",
    instanceMode: "single",
    why: "Entity identity and permanent tax identification required for SpotLite credit scoring and regulatory compliance.",
    equivalents: "Company PAN Card, Partnership Entity PAN, or LLP PAN Certificate.",
  },
  {
    typeKey: "registration_proof",
    label: "Business Registration Proof",
    description:
      "Certificate of Incorporation, Partnership Deed, LLP Agreement, or Shop & Establishment Certificate.",
    category: "mandatory",
    instanceMode: "single",
    why: "Legal proof of commercial establishment under Indian statutory authorities.",
    equivalents:
      "Certificate of Incorporation (CoI), registered Partnership Deed, LLP Agreement, or Shop & Establishment Certificate.",
  },
  {
    typeKey: "udyam_certificate",
    label: "Udyam / MSME Certificate",
    description: "Ministry of MSME registration certificate verifying enterprise classification.",
    category: "optional",
    instanceMode: "single",
    why: "Validates MSME enterprise tier (Micro/Small/Medium) for priority sector credit and government benefits.",
    equivalents: "Udyam Registration Certificate with valid Udyam Registration Number (URN).",
  },
  {
    typeKey: "gst_certificate",
    label: "GST Registration Certificate",
    description: "GSTIN Certificate showing registered state and business legal name.",
    category: "optional",
    instanceMode: "multiple",
    why: "Verifies tax compliance and state-wise operating jurisdictions. Multiple state GSTIN certificates can be uploaded.",
    equivalents: "Form GST REG-06 Registration Certificate (Annexure A and B).",
  },
  {
    typeKey: "cancelled_cheque",
    label: "Cancelled Cheque",
    description: "Bank cheque with printed account name and IFSC code for banking verification.",
    category: "optional",
    instanceMode: "multiple",
    why: "Verifies operational bank account details, IFSC code, and legal account title for banking assessments. Multiple bank accounts can be added.",
    equivalents:
      "Personalized cancelled cheque, latest bank statement with printed account name/IFSC, or passbook front page.",
  },
  {
    typeKey: "address_proof",
    label: "Business Address Proof",
    description:
      "Utility bill, lease agreement, or municipal property tax receipt for the registered office.",
    category: "optional",
    instanceMode: "multiple",
    why: "Validates physical operational presence for registered office, branches, or factories. Multiple premises can be added.",
    equivalents:
      "Electricity bill (<3 months old), registered lease/rental agreement, or municipal property tax receipt.",
  },
];
