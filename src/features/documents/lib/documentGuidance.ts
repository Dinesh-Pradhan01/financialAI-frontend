export interface DocumentSlot {
  typeKey: string; // matches document_type on the backend record
  label: string;
  description: string;
  category: "mandatory" | "optional" | "recommended";
}

export const KNOWN_DOCUMENT_SLOTS: DocumentSlot[] = [
  {
    typeKey: "business_pan",
    label: "Business PAN Card",
    description: "Official Permanent Account Number card issued to the corporate entity.",
    category: "mandatory",
  },
  {
    typeKey: "registration_proof",
    label: "Business Registration Proof",
    description: "Certificate of Incorporation, Partnership Deed, LLP Agreement, or Shop & Establishment Certificate.",
    category: "mandatory",
  },
  {
    typeKey: "gst_certificate",
    label: "GST Registration Certificate",
    description: "GSTIN Certificate showing registered state and business legal name.",
    category: "optional",
  },
  {
    typeKey: "udyam_certificate",
    label: "Udyam / MSME Certificate",
    description: "Ministry of MSME registration certificate verifying enterprise classification.",
    category: "optional",
  },
  {
    typeKey: "cancelled_cheque",
    label: "Cancelled Cheque",
    description: "Bank cheque with printed account name and IFSC code for banking verification.",
    category: "optional",
  },
  {
    typeKey: "address_proof",
    label: "Business Address Proof",
    description: "Utility bill, lease agreement, or municipal property tax receipt for the registered office.",
    category: "optional",
  },
];
