export const BUSINESS_CATEGORIES = [
  "Retail & E-commerce",
  "Manufacturing",
  "Food & Hospitality",
  "Professional Services",
  "Healthcare",
  "Education",
  "Construction & Real Estate",
  "Logistics & Transportation",
  "Technology & IT",
  "Others",
] as const;

export type BusinessCategory = typeof BUSINESS_CATEGORIES[number];

export const BUSINESS_TYPES = [
  "Proprietorship",
  "Partnership",
  "LLP",
  "Private Limited",
  "Public Limited",
  "OPC",
  "Trust / NGO",
  "Society",
] as const;

export type BusinessType = typeof BUSINESS_TYPES[number];

export const BUSINESS_MODELS = [
  "B2B",
  "B2C",
  "B2B + B2C",
  "D2C",
] as const;

export const ACCOUNTING_SOFTWARES = [
  "Tally",
  "Zoho Books",
  "Busy",
  "SAP",
  "Marg ERP",
  "QuickBooks",
  "None",
  "Others",
] as const;

export const DIGITAL_PAYMENT_METHODS = [
  "UPI",
  "POS",
  "NEFT",
  "RTGS",
  "IMPS",
  "Net Banking",
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Puducherry"
];

export interface DocumentRequirement {
  typeKey: string;
  label: string;
  why: string;
  isOptional?: boolean;
}

export const MANDATORY_DOCUMENTS: DocumentRequirement[] = [
  {
    typeKey: "business_pan",
    label: "Business PAN Card",
    why: "Verify business identity",
  },
  {
    typeKey: "registration_proof",
    label: "Business Registration Proof",
    why: "Certificate of Incorporation / Partnership Deed / LLP Certificate / Shop Registration",
  },
];

export const OPTIONAL_DOCUMENTS: DocumentRequirement[] = [
  {
    typeKey: "gst_certificate",
    label: "GST Registration Certificate",
    why: "Tax verification",
    isOptional: true,
  },
  {
    typeKey: "udyam_certificate",
    label: "Udyam / MSME Certificate",
    why: "MSME verification",
    isOptional: true,
  },
  {
    typeKey: "cancelled_cheque",
    label: "Cancelled Cheque",
    why: "Verify business bank account",
    isOptional: true,
  },
  {
    typeKey: "address_proof",
    label: "Business Address Proof",
    why: "Verify registered address",
    isOptional: true,
  },
];

export const CATEGORY_RECOMMENDED_DOCUMENTS: Record<string, DocumentRequirement[]> = {
  "Retail & E-commerce": [
    { typeKey: "rec_trade_license", label: "Trade License", why: "Verify local trading operation", isOptional: true },
    { typeKey: "rec_shop_est", label: "Shop & Establishment Certificate", why: "Verify commercial establishment", isOptional: true },
    { typeKey: "rec_brand_auth", label: "Brand Authorization Letter", why: "Verify brand rights (Optional)", isOptional: true },
    { typeKey: "rec_marketplace_reg", label: "Marketplace Registration (Amazon/Flipkart)", why: "Verify online presence (Optional)", isOptional: true },
  ],
  "Manufacturing": [
    { typeKey: "rec_factory_license", label: "Factory License", why: "Verify manufacturing operations", isOptional: true },
    { typeKey: "rec_factory_reg", label: "Factory Registration Certificate", why: "Verify legal factory premise", isOptional: true },
    { typeKey: "rec_pollution_noc", label: "Pollution Control Board Consent", why: "Environmental compliance", isOptional: true },
    { typeKey: "rec_fire_noc", label: "Fire NOC", why: "Safety compliance", isOptional: true },
    { typeKey: "rec_iso_cert", label: "ISO Certificate", why: "Quality management (Optional)", isOptional: true },
  ],
  "Food & Hospitality": [
    { typeKey: "rec_fssai", label: "FSSAI License", why: "Food safety compliance", isOptional: true },
    { typeKey: "rec_health_trade", label: "Health Trade License", why: "Municipal health clearance", isOptional: true },
    { typeKey: "rec_fire_noc", label: "Fire NOC", why: "Premise fire safety", isOptional: true },
    { typeKey: "rec_liquor_license", label: "Liquor License", why: "Permit for beverage sales (if applicable)", isOptional: true },
  ],
  "Healthcare": [
    { typeKey: "rec_clinical_reg", label: "Clinical Establishment Registration", why: "Verify healthcare facility", isOptional: true },
    { typeKey: "rec_drug_license", label: "Drug License", why: "Permit for pharma storage & distribution", isOptional: true },
    { typeKey: "rec_medical_council", label: "Medical Council Registration", why: "Practitioner validation (if applicable)", isOptional: true },
    { typeKey: "rec_nabh_acc", label: "NABH Accreditation", why: "Hospital quality standard (Optional)", isOptional: true },
  ],
  "Education": [
    { typeKey: "rec_inst_reg", label: "Institution Registration Certificate", why: "Verify educational institution", isOptional: true },
    { typeKey: "rec_affiliation_cert", label: "Affiliation Certificate", why: "Board/University recognition", isOptional: true },
    { typeKey: "rec_trust_society", label: "Trust / Society Registration", why: "Verify non-profit educational body", isOptional: true },
    { typeKey: "rec_aicte_approval", label: "AICTE Approval", why: "Technical education approval (if applicable)", isOptional: true },
  ],
  "Construction & Real Estate": [
    { typeKey: "rec_contractor_reg", label: "Contractor Registration", why: "Civil contractor clearance", isOptional: true },
    { typeKey: "rec_labour_license", label: "Labour License", why: "Workforce regulatory compliance", isOptional: true },
    { typeKey: "rec_rera_reg", label: "RERA Registration", why: "Real estate regulatory compliance (if applicable)", isOptional: true },
    { typeKey: "rec_fire_safety", label: "Fire Safety Certificate", why: "Construction site safety", isOptional: true },
  ],
  "Logistics & Transportation": [
    { typeKey: "rec_goods_permit", label: "Goods Carrier Permit", why: "Freight transport authorization", isOptional: true },
    { typeKey: "rec_fleet_reg", label: "Fleet Registration", why: "Commercial vehicle verification", isOptional: true },
    { typeKey: "rec_vehicle_ins", label: "Vehicle Insurance", why: "Transit safety insurance", isOptional: true },
    { typeKey: "rec_transport_lic", label: "Transport License", why: "Logistics operation clearance", isOptional: true },
  ],
  "Technology & IT": [
    { typeKey: "rec_startup_india", label: "Startup India Recognition", why: "Govt startup benefits (Optional)", isOptional: true },
    { typeKey: "rec_dpiit", label: "DPIIT Recognition", why: "Tax & regulatory perks (Optional)", isOptional: true },
    { typeKey: "rec_iso_27001", label: "ISO 27001 Certificate", why: "Information security standard (Optional)", isOptional: true },
    { typeKey: "rec_soc2", label: "SOC 2 Report", why: "Data privacy assurance (Optional)", isOptional: true },
  ],
  "Professional Services": [
    { typeKey: "rec_icai_reg", label: "ICAI Registration", why: "CA Firm validation", isOptional: true },
    { typeKey: "rec_bar_council", label: "Bar Council Registration", why: "Law firm validation", isOptional: true },
    { typeKey: "rec_medical_council", label: "Medical Council Registration", why: "Medical practice validation", isOptional: true },
    { typeKey: "rec_sebi_reg", label: "SEBI Registration", why: "Financial advisory validation", isOptional: true },
    { typeKey: "rec_prof_tax", label: "Professional Tax Registration", why: "State tax compliance (where applicable)", isOptional: true },
  ],
  "Others": [
    { typeKey: "rec_industry_lic", label: "Industry Specific License / Certification", why: "Relevant business registration", isOptional: true },
  ],
};
