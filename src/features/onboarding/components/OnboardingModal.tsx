import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X, Pencil, Loader2, FileCheck2, Building2, Users, Landmark } from "lucide-react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { api } from "@/shared/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/queryKeys";
import {
  GeneralInfoSaveSchema,
  LeadershipInfoSaveSchema,
  FinancialInfoSaveSchema,
} from "@/shared/types/api";
import {
  generalInfoSchema,
  leadershipInfoSchema,
  financialInfoSchema,
  parseApiValidationErrors,
} from "../lib/validation";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { validateFile } from "@/features/documents/lib/uploadHelpers";
import {
  UploadedDoc,
  TeamInvite,
  GeneralInfoState,
  LeadershipState,
  FinancialState,
} from "./types";
import { Step1Verification } from "./Step1Verification";
import { Step2GeneralInfo } from "./Step2GeneralInfo";
import { Step3Leadership } from "./Step3Leadership";
import { Step4FinancialInfo } from "./Step4FinancialInfo";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: number;
}

const SECTION_TITLES: Record<number, string> = {
  1: "Verification Documents",
  2: "Company Profile",
  3: "Leadership & Team",
  4: "Banking & Ledger Setup",
};

const SECTION_DESCRIPTIONS: Record<number, string> = {
  1: "Manage your mandatory verification documents",
  2: "Update company registration and contact details",
  3: "Edit leadership roles and organizational structure",
  4: "Adjust banking, accounting, and payment preferences",
};

const SECTION_ICONS: Record<number, React.ReactNode> = {
  1: <FileCheck2 size={18} />,
  2: <Building2 size={18} />,
  3: <Users size={18} />,
  4: <Landmark size={18} />,
};

export function OnboardingModal({
  isOpen,
  onClose,
  section,
}: OnboardingModalProps) {
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(section || 1);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [completionPct, setCompletionPct] = useState(0);

  useEffect(() => {
    if (isOpen && section) {
      setStep(section);
    }
  }, [isOpen, section]);

  // Field error states for validation
  const [generalErrors, setGeneralErrors] = useState<Record<string, string>>({});
  const [leadershipErrors, setLeadershipErrors] = useState<Record<string, string>>({});
  const [financialErrors, setFinancialErrors] = useState<Record<string, string>>({});

  const clearGeneralError = (field: string) => {
    setGeneralErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const clearLeadershipError = (field: string) => {
    setLeadershipErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const clearFinancialError = (field: string) => {
    setFinancialErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // STEP 1 / 2 — General Info
  const [companyName, setCompanyName] = useState("");
  const [businessCategory, setBusinessCategory] = useState<string>("Retail & E-commerce");
  const [businessType, setBusinessType] = useState<string>("Private Limited");
  const [cin, setCin] = useState("");
  const [gstin, setGstin] = useState("");
  const [businessPan, setBusinessPan] = useState("");
  const [udyamNumber, setUdyamNumber] = useState("");
  const [dateOfIncorporation, setDateOfIncorporation] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [operationalAddress, setOperationalAddress] = useState("");
  const [stateName, setStateName] = useState("Maharashtra");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [website, setWebsite] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [officialPhone, setOfficialPhone] = useState("");

  // STEP 3 — Leadership & Organization
  const [ceoName, setCeoName] = useState("");
  const [ceoEmail, setCeoEmail] = useState("");
  const [ceoPhone, setCeoPhone] = useState("");
  const [ceoDesignation, setCeoDesignation] = useState("");
  const [cfoName, setCfoName] = useState("");
  const [cfoEmail, setCfoEmail] = useState("");
  const [cfoPhone, setCfoPhone] = useState("");
  const [cfoDesignation, setCfoDesignation] = useState("");
  const [inviteCfo, setInviteCfo] = useState(false);
  const [hrName, setHrName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [hrPhone, setHrPhone] = useState("");
  const [hrDesignation, setHrDesignation] = useState("");
  const [inviteHr, setInviteHr] = useState(false);
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [numberOfBranches, setNumberOfBranches] = useState("");
  const [businessModel, setBusinessModel] = useState<string>("");
  const [primaryProductService, setPrimaryProductService] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [teamInvites, setTeamInvites] = useState<TeamInvite[]>([]);

  // STEP 4 — Financial Info
  const [primaryBank, setPrimaryBank] = useState("");
  const [numberOfAccounts, setNumberOfAccounts] = useState("1");
  const [hasBusinessLoan, setHasBusinessLoan] = useState<boolean | null>(null);
  const [hasBusinessCreditCard, setHasBusinessCreditCard] = useState<boolean | null>(null);
  const [accountingSoftware, setAccountingSoftware] = useState("");
  const [digitalPaymentMethods, setDigitalPaymentMethods] = useState<string[]>([]);

  // STEP 1 — Documents
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [uploadingDocType, setUploadingDocType] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

  // Sync user email & name into CEO fields if empty
  useEffect(() => {
    if (user) {
      if (!officialEmail && user.email) setOfficialEmail(user.email);
      if (user.role === "cfo") {
        if (!cfoName && user.full_name) setCfoName(user.full_name);
        if (!cfoEmail && user.email) setCfoEmail(user.email);
      } else if (user.role === "hr") {
        if (!hrName && user.full_name) setHrName(user.full_name);
        if (!hrEmail && user.email) setHrEmail(user.email);
      } else {
        if (!ceoName && user.full_name) setCeoName(user.full_name);
        if (!ceoEmail && user.email) setCeoEmail(user.email);
      }
    }
  }, [user, officialEmail, cfoName, cfoEmail, hrName, hrEmail, ceoName, ceoEmail]);

  // Load existing onboarding draft from backend
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;

    async function loadExistingOnboarding() {
      try {
        const res = await api.get<any>("/api/business/onboarding/me");
        if (res && isMounted) {
          if (res.completion_percentage !== undefined) setCompletionPct(res.completion_percentage);

          if (res.general_info) {
            const g = res.general_info;
            if (g.company_name) setCompanyName(g.company_name);
            if (g.business_category) setBusinessCategory(g.business_category);
            if (g.business_type) setBusinessType(g.business_type);
            if (g.cin) setCin(g.cin);
            if (g.gstin) setGstin(g.gstin);
            if (g.business_pan) setBusinessPan(g.business_pan);
            if (g.udyam_number) setUdyamNumber(g.udyam_number);
            if (g.date_of_incorporation)
              setDateOfIncorporation(g.date_of_incorporation.split("T")[0]);
            if (g.registered_address) setRegisteredAddress(g.registered_address);
            if (g.operational_address) setOperationalAddress(g.operational_address);
            if (g.state) setStateName(g.state);
            if (g.city) setCity(g.city);
            if (g.pincode) setPincode(g.pincode);
            if (g.website) setWebsite(g.website);
            if (g.official_email) setOfficialEmail(g.official_email);
            if (g.official_phone) setOfficialPhone(g.official_phone);
          }

          if (res.leadership_info) {
            const l = res.leadership_info;
            if (l.founder_ceo_name) setCeoName(l.founder_ceo_name);
            if (l.founder_ceo_email) setCeoEmail(l.founder_ceo_email);
            if (l.founder_ceo_phone) setCeoPhone(l.founder_ceo_phone);
            if (l.founder_ceo_designation) setCeoDesignation(l.founder_ceo_designation);
            if (l.number_of_employees) setNumberOfEmployees(l.number_of_employees);
            if (l.number_of_branches) setNumberOfBranches(l.number_of_branches);
            if (l.business_model) setBusinessModel(l.business_model);
            if (l.primary_product_service) setPrimaryProductService(l.primary_product_service);
            if (l.business_description) setBusinessDescription(l.business_description);
            if (l.cfo_name) setCfoName(l.cfo_name);
            if (l.cfo_email) setCfoEmail(l.cfo_email);
            if (l.cfo_phone) setCfoPhone(l.cfo_phone);
            if (l.cfo_designation) setCfoDesignation(l.cfo_designation);
            if (l.invite_cfo !== undefined) setInviteCfo(l.invite_cfo);
            if (l.hr_name) setHrName(l.hr_name);
            if (l.hr_email) setHrEmail(l.hr_email);
            if (l.hr_phone) setHrPhone(l.hr_phone);
            if (l.hr_designation) setHrDesignation(l.hr_designation);
            if (l.invite_hr !== undefined) setInviteHr(l.invite_hr);
          }

          if (res.financial_info) {
            const f = res.financial_info;
            if (f.primary_bank) setPrimaryBank(f.primary_bank);
            if (f.number_of_accounts) setNumberOfAccounts(String(f.number_of_accounts));
            if (f.has_business_loan !== undefined) setHasBusinessLoan(f.has_business_loan);
            if (f.has_business_credit_card !== undefined)
              setHasBusinessCreditCard(f.has_business_credit_card);
            if (f.accounting_software) setAccountingSoftware(f.accounting_software);
            if (f.digital_payment_methods && Array.isArray(f.digital_payment_methods))
              setDigitalPaymentMethods(f.digital_payment_methods);
          }

          if (res.documents) {
            setUploadedDocs(res.documents);
          }

          if (res.team_invites) {
            setTeamInvites(res.team_invites);
          }
        }
      } catch (e) {
        console.error("Failed to load existing onboarding draft:", e);
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    }

    loadExistingOnboarding();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Validation Checks
  const isGeneralInfoValid =
    companyName.trim().length >= 2 &&
    Boolean(businessCategory) &&
    Boolean(businessType) &&
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(businessPan.trim()) &&
    registeredAddress.trim().length >= 5 &&
    Boolean(stateName) &&
    city.trim().length >= 2 &&
    pincode.trim().length >= 6 &&
    officialEmail.trim().includes("@") &&
    officialPhone.trim().length >= 10;

  const isTeamInfoValid = ceoName.trim().length > 0;

  const isDocUploaded = (typeKey: string) =>
    uploadedDocs.some((d) => d.document_type === typeKey);
  const isDocsValid =
    isDocUploaded("business_pan") && isDocUploaded("registration_proof");

  const isCurrentStepValid = (function () {
    if (step === 1) return isDocsValid;
    if (step === 2) return isGeneralInfoValid;
    if (step === 3) return isTeamInfoValid;
    if (step === 4) return true;
    return false;
  })();

  // Save Step 2 (General Info)
  const saveStep1 = async () => {
    setGeneralErrors({});
    const payload: GeneralInfoSaveSchema = {
      company_name: companyName.trim(),
      business_category: businessCategory,
      business_type: businessType,
      cin: cin.trim() || null,
      gstin: gstin.trim() ? gstin.trim().toUpperCase() : null,
      business_pan: businessPan.trim().toUpperCase(),
      udyam_number: udyamNumber.trim() || null,
      date_of_incorporation: dateOfIncorporation || null,
      registered_address: registeredAddress.trim(),
      operational_address: operationalAddress.trim() || null,
      state: stateName,
      city: city.trim(),
      pincode: pincode.trim(),
      website: website.trim() || null,
      official_email: officialEmail.trim(),
      official_phone: officialPhone.trim(),
    };

    const validationResult = generalInfoSchema.safeParse(payload);
    if (!validationResult.success) {
      const fieldErrors = parseApiValidationErrors(validationResult.error);
      setGeneralErrors(fieldErrors);
      const firstMsg = Object.values(fieldErrors)[0] || "Please fill all required fields correctly.";
      toast.error(firstMsg);
      return false;
    }

    setSavingDraft(true);
    try {
      const res = await api.post<{ completion_percentage?: number }>(
        "/api/business/onboarding/step/1",
        payload
      );
      if (res.completion_percentage !== undefined)
        setCompletionPct(res.completion_percentage);
      return true;
    } catch (err: any) {
      const fieldErrors = parseApiValidationErrors(err);
      if (Object.keys(fieldErrors).length > 0) {
        setGeneralErrors(fieldErrors);
        const firstMsg = Object.values(fieldErrors)[0];
        toast.error(firstMsg);
      } else {
        const msg = err instanceof Error ? err.message : "Failed to save General Info.";
        toast.error(msg);
      }
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  // Save Step 3 (Leadership)
  const saveStep2 = async () => {
    setLeadershipErrors({});
    const shouldInviteCfo = Boolean(inviteCfo && cfoEmail.trim() && cfoName.trim());
    const shouldInviteHr = Boolean(inviteHr && hrEmail.trim() && hrName.trim());

    const payload: LeadershipInfoSaveSchema = {
      founder_ceo_name: ceoName.trim() || null,
      founder_ceo_email: ceoEmail.trim() || null,
      founder_ceo_phone: ceoPhone.trim() || null,
      founder_ceo_designation: ceoDesignation.trim() || null,
      number_of_employees: numberOfEmployees || null,
      number_of_branches: numberOfBranches.trim() || null,
      business_model: businessModel || null,
      primary_product_service: primaryProductService.trim() || null,
      business_description: businessDescription.trim() || null,
      cfo_name: cfoName.trim() || null,
      cfo_email: cfoEmail.trim() || null,
      cfo_phone: cfoPhone.trim() || null,
      cfo_designation: cfoDesignation.trim() || null,
      invite_cfo: shouldInviteCfo,
      hr_name: hrName.trim() || null,
      hr_email: hrEmail.trim() || null,
      hr_phone: hrPhone.trim() || null,
      hr_designation: hrDesignation.trim() || null,
      invite_hr: shouldInviteHr,
    };

    const validationResult = leadershipInfoSchema.safeParse(payload);
    if (!validationResult.success) {
      const fieldErrors = parseApiValidationErrors(validationResult.error);
      setLeadershipErrors(fieldErrors);
      const firstMsg = Object.values(fieldErrors)[0] || "Please check Leadership details.";
      toast.error(firstMsg);
      return false;
    }

    setSavingDraft(true);
    try {
      const res = await api.post<{ completion_percentage?: number; team_invites?: TeamInvite[] }>(
        "/api/business/onboarding/step/2",
        payload
      );
      if (res.completion_percentage !== undefined)
        setCompletionPct(res.completion_percentage);
      if (res.team_invites) setTeamInvites(res.team_invites);
      return true;
    } catch (err: any) {
      const fieldErrors = parseApiValidationErrors(err);
      if (Object.keys(fieldErrors).length > 0) {
        setLeadershipErrors(fieldErrors);
        const firstMsg = Object.values(fieldErrors)[0];
        toast.error(firstMsg);
      } else {
        const msg = err instanceof Error ? err.message : "Failed to save Leadership Info.";
        toast.error(msg);
      }
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  // Save Step 4 (Financial Info)
  const saveStep3 = async () => {
    setFinancialErrors({});
    const parsedNumAccounts = parseInt(numberOfAccounts.replace(/\D/g, ""), 10) || 1;
    const payload: FinancialInfoSaveSchema = {
      primary_bank: primaryBank.trim() || null,
      number_of_accounts: parsedNumAccounts,
      has_business_loan: hasBusinessLoan,
      has_business_credit_card: hasBusinessCreditCard,
      accounting_software: accountingSoftware || null,
      digital_payment_methods: Array.isArray(digitalPaymentMethods) ? digitalPaymentMethods : [],
    };

    const validationResult = financialInfoSchema.safeParse(payload);
    if (!validationResult.success) {
      const fieldErrors = parseApiValidationErrors(validationResult.error);
      setFinancialErrors(fieldErrors);
      const firstMsg = Object.values(fieldErrors)[0] || "Please check Financial details.";
      toast.error(firstMsg);
      return false;
    }

    setSavingDraft(true);
    try {
      const res = await api.post<{ completion_percentage?: number }>(
        "/api/business/onboarding/step/3",
        payload
      );
      if (res.completion_percentage !== undefined)
        setCompletionPct(res.completion_percentage);
      return true;
    } catch (err: any) {
      const fieldErrors = parseApiValidationErrors(err);
      if (Object.keys(fieldErrors).length > 0) {
        setFinancialErrors(fieldErrors);
        const firstMsg = Object.values(fieldErrors)[0];
        toast.error(firstMsg);
      } else {
        const msg = err instanceof Error ? err.message : "Failed to save Financial Info.";
        toast.error(msg);
      }
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  // Step 1 File Upload handler
  const handleFileUpload = async (file: File, docType: string, category: string) => {
    if (!file || uploadingDocType || deletingDocId) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error || "Only PDF files are accepted for document verification.");
      return;
    }

    setUploadingDocType(docType);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", docType);
    formData.append("document_category", category);

    try {
      const res = await api.upload<any>("/api/business/onboarding/documents/upload", formData);
      if (res.documents) {
        setUploadedDocs(res.documents);
      } else if (res.document) {
        setUploadedDocs((prev) => {
          const filtered = prev.filter((d) => d.document_type !== docType);
          return [...filtered, res.document];
        });
      }
      if (res.completion_percentage !== undefined) {
        setCompletionPct(res.completion_percentage);
      }
      toast.success(`${file.name} uploaded successfully!`);
      // Invalidate company docs so the Documents page reflects this upload.
      queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
    } catch (err: any) {
      toast.error(getApiErrorMessage(err, "Failed to upload document."));
    } finally {
      setUploadingDocType(null);
    }
  };

  // Step 1 File Delete handler
  const handleDeleteDoc = async (docId: string) => {
    setDeletingDocId(docId);
    try {
      const res = await api.delete<any>(`/api/business/onboarding/documents/${docId}`);
      setUploadedDocs((prev) => prev.filter((d) => d.id !== docId));
      // Invalidate company docs so the Documents page reflects this deletion.
      queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
      if (res.completion_percentage !== undefined) {
        setCompletionPct(res.completion_percentage);
      }
      toast.success("Document removed.");
    } catch (err: any) {
      toast.error(getApiErrorMessage(err, "Failed to remove document."));
    } finally {
      setDeletingDocId(null);
    }
  };

  // Save single section in edit-section mode
  const handleEditSectionSave = async () => {
    if (savingDraft || submitting || uploadingDocType || deletingDocId) return;

    if (step === 1) {
      if (!isDocsValid) {
        toast.error(
          "Please upload mandatory documents (Business PAN & Registration Proof)."
        );
        return;
      }
      toast.success("Verification documents updated!");
      onClose();
    } else if (step === 2) {
      const ok = await saveStep1();
      if (ok) {
        toast.success("Company profile updated!");
        onClose();
      }
    } else if (step === 3) {
      const ok = await saveStep2();
      if (ok) {
        toast.success("Leadership info updated!");
        onClose();
      }
    } else if (step === 4) {
      const ok = await saveStep3();
      if (ok) {
        toast.success("Banking & ledger setup updated!");
        onClose();
      }
    }
  };

  const togglePaymentMethod = (method: string) => {
    setDigitalPaymentMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const generalState: GeneralInfoState = {
    companyName,
    setCompanyName,
    businessCategory,
    setBusinessCategory,
    businessType,
    setBusinessType,
    cin,
    setCin,
    gstin,
    setGstin,
    businessPan,
    setBusinessPan,
    udyamNumber,
    setUdyamNumber,
    dateOfIncorporation,
    setDateOfIncorporation,
    registeredAddress,
    setRegisteredAddress,
    operationalAddress,
    setOperationalAddress,
    stateName,
    setStateName,
    city,
    setCity,
    pincode,
    setPincode,
    website,
    setWebsite,
    officialEmail,
    setOfficialEmail,
    officialPhone,
    setOfficialPhone,
    errors: generalErrors,
    clearError: clearGeneralError,
  };

  const leadershipState: LeadershipState = {
    ceoName,
    setCeoName,
    ceoEmail,
    setCeoEmail,
    ceoPhone,
    setCeoPhone,
    ceoDesignation,
    setCeoDesignation,
    cfoName,
    setCfoName,
    cfoEmail,
    setCfoEmail,
    cfoPhone,
    setCfoPhone,
    cfoDesignation,
    setCfoDesignation,
    inviteCfo,
    setInviteCfo,
    hrName,
    setHrName,
    hrEmail,
    setHrEmail,
    hrPhone,
    setHrPhone,
    hrDesignation,
    setHrDesignation,
    inviteHr,
    setInviteHr,
    numberOfEmployees,
    setNumberOfEmployees,
    numberOfBranches,
    setNumberOfBranches,
    businessModel,
    setBusinessModel,
    primaryProductService,
    setPrimaryProductService,
    businessDescription,
    setBusinessDescription,
    teamInvites,
    errors: leadershipErrors,
    clearError: clearLeadershipError,
  };

  const financialState: FinancialState = {
    primaryBank,
    setPrimaryBank,
    numberOfAccounts,
    setNumberOfAccounts,
    hasBusinessLoan,
    setHasBusinessLoan,
    hasBusinessCreditCard,
    setHasBusinessCreditCard,
    accountingSoftware,
    setAccountingSoftware,
    digitalPaymentMethods,
    togglePaymentMethod,
    errors: financialErrors,
    clearError: clearFinancialError,
  };

  const isBusy = Boolean(
    savingDraft || submitting || uploadingDocType || deletingDocId
  );
  const isActionDisabled = isBusy || !isCurrentStepValid;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Section Title & Close Button */}
            <div className="border-b border-border bg-surface px-6 py-4 shrink-0 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20">
                  {SECTION_ICONS[step]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Pencil size={10} className="text-brand" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                      Editing
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                    {SECTION_TITLES[step] || "Edit Section"}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-alt transition cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Edit-mode notice strip */}
            <div className="shrink-0 px-6 py-2.5 bg-brand/5 border-b border-brand/15 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <p className="text-[11px] text-text-secondary leading-none">
                <span className="font-semibold text-brand">Live Edit</span>
                {" — "}
                {SECTION_DESCRIPTIONS[step]}. Changes apply only after you{" "}
                <span className="font-semibold text-text-primary">Save Changes</span>.
              </p>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6">
              {authLoading || isInitializing ? (
                <div className="py-16">
                  <SpotliteLoader
                    message="Loading profile workspace…"
                    subMessage="Secured Business Vault"
                  />
                </div>
              ) : (
                <div className="w-full">
                  {step === 1 && (
                    <Step1Verification
                      uploadedDocs={uploadedDocs}
                      uploadingDocType={uploadingDocType}
                      deletingDocId={deletingDocId}
                      onUpload={handleFileUpload}
                      onDelete={handleDeleteDoc}
                    />
                  )}
                  {step === 2 && <Step2GeneralInfo state={generalState} />}
                  {step === 3 && <Step3Leadership state={leadershipState} />}
                  {step === 4 && <Step4FinancialInfo state={financialState} />}
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="border-t border-border bg-surface px-6 py-4 shrink-0 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isBusy}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-alt transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Discard
              </button>

              <button
                type="button"
                onClick={handleEditSectionSave}
                disabled={isActionDisabled}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 px-7 text-sm font-bold text-white shadow-brand hover:opacity-95 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-w-37.5"
              >
                {savingDraft ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Pencil className="h-3.5 w-3.5" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
