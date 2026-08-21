import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { toast } from "sonner";
import {
  X,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Building2,
  Users,
  Landmark,
  FileCheck,
} from "lucide-react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { api } from "@/shared/lib/api";
import { useQueryClient } from "@tanstack/react-query";
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
import { getApiErrorMessage, parseApiError } from "@/shared/lib/apiError";
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
import { Step5ReviewComplete } from "./Step5ReviewComplete";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { number: 1, label: "Verification", icon: ShieldCheck },
  { number: 2, label: "General", icon: Building2 },
  { number: 3, label: "Leadership", icon: Users },
  { number: 4, label: "Financial", icon: Landmark },
  { number: 5, label: "Review", icon: FileCheck },
];

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [completionPct, setCompletionPct] = useState(0);

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
  const [businessModel, setBusinessModel] = useState("");
  const [primaryProductService, setPrimaryProductService] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [teamInvites, setTeamInvites] = useState<TeamInvite[]>([]);

  // STEP 4 — Financial Info
  const [primaryBank, setPrimaryBank] = useState("");
  const [numberOfAccounts, setNumberOfAccounts] = useState("1");
  const [hasBusinessLoan, setHasBusinessLoan] = useState<boolean | null>(false);
  const [hasBusinessCreditCard, setHasBusinessCreditCard] = useState<boolean | null>(false);
  const [accountingSoftware, setAccountingSoftware] = useState("Tally");
  const [digitalPaymentMethods, setDigitalPaymentMethods] = useState<string[]>([
    "UPI",
    "Net Banking",
  ]);

  // Verification Documents
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [uploadingDocType, setUploadingDocType] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

  // Pre-fill email and contact person according to user role if logged in
  useEffect(() => {
    if (user) {
      if (!officialEmail && user.email) {
        setOfficialEmail(user.email);
      }
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

  // Load Demo Data for fast testing
  const fillDemoData = () => {
    setCompanyName("Acme Technologies Private Limited");
    setBusinessCategory("Technology & IT");
    setBusinessType("Private Limited");
    setCin("U72200MH2021PTC123456");
    setGstin("27AAACB1234C1ZV");
    setBusinessPan("AAACB1234C");
    setUdyamNumber("UDYAM-MH-01-0000000");
    setDateOfIncorporation("2021-06-15");
    setRegisteredAddress("Tower B, 4th Floor, Tech Park, Powai");
    setOperationalAddress("Tower B, 4th Floor, Tech Park, Powai");
    setStateName("Maharashtra");
    setCity("Mumbai");
    setPincode("400076");
    setWebsite("https://www.acmetech.com");
    setOfficialEmail(user?.email || "contact@acmetech.com");
    setOfficialPhone("9876543210");

    if (user?.role === "cfo") {
      setCeoName("Rajesh Kumar");
      setCeoEmail("ceo@acmefintech.com");
      setCeoPhone("9876543210");
      setCeoDesignation("CEO / Founder");
      setCfoName(user?.full_name || "Alex Morgan");
      setCfoEmail(user?.email || "cfo@acmefintech.com");
      setCfoPhone("9876543211");
      setCfoDesignation("Chief Financial Officer");
      setInviteCfo(false);
      setHrName("Jordan Taylor");
      setHrEmail("hr@acmefintech.com");
      setHrPhone("9876543212");
      setHrDesignation("Head of HR");
      setInviteHr(true);
    } else if (user?.role === "hr") {
      setCeoName("Rajesh Kumar");
      setCeoEmail("ceo@acmefintech.com");
      setCeoPhone("9876543210");
      setCeoDesignation("CEO / Founder");
      setCfoName("Vikramaditya Sharma");
      setCfoEmail("cfo@acmefintech.com");
      setCfoPhone("9876543211");
      setCfoDesignation("Chief Financial Officer");
      setInviteCfo(true);
      setHrName(user?.full_name || "Jordan Taylor");
      setHrEmail(user?.email || "hr@acmefintech.com");
      setHrPhone("9876543212");
      setHrDesignation("Head of HR");
      setInviteHr(false);
    } else {
      setCeoName(user?.full_name || "Rajesh Kumar");
      setCeoEmail(user?.email || "ceo@acmefintech.com");
      setCeoPhone("9876543210");
      setCeoDesignation("CEO / Founder");
      setCfoName("Vikramaditya Sharma");
      setCfoEmail("cfo@acmefintech.com");
      setCfoPhone("9876543211");
      setCfoDesignation("Chief Financial Officer");
      setInviteCfo(true);
      setHrName("Jane Doe");
      setHrEmail("hr@acmefintech.com");
      setHrPhone("9876543212");
      setHrDesignation("Head of HR");
      setInviteHr(true);
    }
    setNumberOfEmployees("51-200");
    setNumberOfBranches("3");
    setBusinessModel("B2B");
    setPrimaryProductService("Financial Analytics Software");
    setBusinessDescription(
      "A leading fintech company providing AI-powered financial analytics solutions."
    );

    setPrimaryBank("HDFC Bank");
    setNumberOfAccounts("2");
    setHasBusinessLoan(true);
    setHasBusinessCreditCard(true);
    setAccountingSoftware("Zoho Books");
    setDigitalPaymentMethods(["UPI", "Net Banking", "NEFT", "RTGS"]);

    setGeneralErrors({});
    setLeadershipErrors({});
    setFinancialErrors({});

    toast.success("Loaded demo business details into form!");
  };

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
    if (step === 5) return isDocsValid && isGeneralInfoValid && isTeamInfoValid;
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

    // Client-side Zod validation
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

    // Client-side Zod validation
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
      if (
        err?.status === 400 ||
        (typeof err?.message === "string" && err.message.includes("Please complete Step 1"))
      ) {
        toast.error("Please complete Step 1 (General Information) first.");
        setDirection(-1);
        setStep(2);
        return false;
      }

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

    // Client-side Zod validation
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
      if (
        err?.status === 400 ||
        (typeof err?.message === "string" && err.message.includes("Please complete Step 1"))
      ) {
        toast.error("Please complete Step 1 (General Information) first.");
        setDirection(-1);
        setStep(2);
        return false;
      }

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

  // Upload Document
  const handleFileUpload = async (
    file: File,
    documentType: string,
    documentCategory: string
  ) => {
    if (!file || uploadingDocType || deletingDocId) return;
    setUploadingDocType(documentType);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("document_type", documentType);
      formData.append("document_category", documentCategory);

      const res = await api.upload<any>(
        "/api/business/onboarding/documents/upload",
        formData
      );
      if (res.documents) setUploadedDocs(res.documents);
      if (res.completion_percentage !== undefined)
        setCompletionPct(res.completion_percentage);
      toast.success(`Uploaded ${file.name} successfully!`);
    } catch (err: any) {
      toast.error(getApiErrorMessage(err, "Failed to upload document."));
    } finally {
      setUploadingDocType(null);
    }
  };

  // Delete Document
  const handleDeleteDoc = async (docId: string) => {
    if (deletingDocId || uploadingDocType) return;
    setDeletingDocId(docId);
    try {
      const res = await api.delete<any>(
        `/api/business/onboarding/documents/${docId}`
      );
      if (res.documents) setUploadedDocs(res.documents);
      if (res.completion_percentage !== undefined)
        setCompletionPct(res.completion_percentage);
      toast.success("Document removed.");
    } catch (err: any) {
      toast.error(getApiErrorMessage(err, "Failed to remove document."));
    } finally {
      setDeletingDocId(null);
    }
  };

  // Navigation handlers
  const nextStep = async () => {
    if (uploadingDocType || deletingDocId || savingDraft) return;

    if (step === 1) {
      if (!isDocsValid) {
        toast.error(
          "Please upload mandatory documents (Business PAN & Registration Proof) to proceed."
        );
        return;
      }
      setSavingDraft(true);
      try {
        const res = await api.post<any>(
          "/api/business/onboarding/step/extract-from-docs",
          {}
        );
        if (res.data) {
          const d = res.data;
          if (d.company_name) setCompanyName(d.company_name);
          if (d.business_pan) setBusinessPan(d.business_pan);
          if (d.cin) setCin(d.cin);
          if (d.gstin) setGstin(d.gstin);
          if (d.date_of_incorporation) setDateOfIncorporation(d.date_of_incorporation);
          if (d.registered_address) setRegisteredAddress(d.registered_address);
          if (d.city) setCity(d.city);
          if (d.state) setStateName(d.state);
          if (d.pincode) setPincode(d.pincode);
          if (d.udyam_number) setUdyamNumber(d.udyam_number);
          toast.success("AI auto-filled your business details!");
        }
      } catch (err) {
        console.error("AI extraction error", err);
      } finally {
        setSavingDraft(false);
        setDirection(1);
        setStep(2);
      }
    } else if (step === 2) {
      const ok = await saveStep1();
      if (ok) {
        setDirection(1);
        setStep(3);
      }
    } else if (step === 3) {
      const ok = await saveStep2();
      if (ok) {
        setDirection(1);
        setStep(4);
      }
    } else if (step === 4) {
      const ok = await saveStep3();
      if (ok) {
        setDirection(1);
        setStep(5);
      }
    }
  };

  const prevStep = () => {
    if (step > 1 && !savingDraft && !submitting) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const jumpToStep = (targetStep: number) => {
    if (targetStep === step) return;
    setDirection(targetStep > step ? 1 : -1);
    setStep(targetStep);
  };

  // Complete Onboarding Final Submit
  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      await api.post("/api/business/onboarding/complete", {});
      toast.success("SpotLite Business Onboarding Completed!");
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: ["companyProfile"] });
      queryClient.invalidateQueries({ queryKey: ["onboardingStatus"] });
      onClose();
    } catch (err: any) {
      toast.error(getApiErrorMessage(err, "Failed to complete onboarding."));
    } finally {
      setSubmitting(false);
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

  const stepVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 32 : -32,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.22,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -32 : 32,
      opacity: 0,
      transition: {
        duration: 0.16,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      },
    }),
  };

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
            {/* Header: Progress, Demo Action, Close Button */}
            <div className="border-b border-border bg-surface px-6 py-4 shrink-0 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">
                      Step {step} of 5
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs font-medium text-text-secondary">
                      {STEPS[step - 1]?.label}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-foreground -mt-0.5">
                    Business Onboarding
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fillDemoData}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-alt px-2.5 py-1.5 text-xs font-semibold text-text-secondary hover:text-foreground hover:bg-surface transition cursor-pointer"
                  title="Auto-fill with sample demo business data"
                >
                  <Sparkles size={12} className="text-brand" />
                  <span>Demo Data</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-alt transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Stepper Dots Bar */}
            <div className="bg-surface-alt/50 border-b border-border px-6 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1 sm:gap-2 w-full">
                {STEPS.map((s, idx) => {
                  const isPassed = s.number < step;
                  const isCurrent = s.number === step;
                  const StepIcon = s.icon;
                  return (
                    <button
                      key={s.number}
                      type="button"
                      onClick={() => jumpToStep(s.number)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isCurrent
                          ? "bg-brand text-white shadow-xs"
                          : isPassed
                          ? "bg-brand/10 text-brand hover:bg-brand/15"
                          : "text-muted-foreground hover:bg-surface"
                      }`}
                    >
                      <StepIcon size={12} className="shrink-0" />
                      <span className="hidden sm:inline truncate">{s.label}</span>
                      <span className="sm:hidden">{s.number}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Form Body with Slide Transitions */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6">
              {authLoading || isInitializing ? (
                <div className="py-16">
                  <SpotliteLoader
                    message="Loading profile workspace…"
                    subMessage="Secured Business Vault"
                  />
                </div>
              ) : (
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
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

                    {step === 5 && (
                      <Step5ReviewComplete
                        generalState={generalState}
                        leadershipState={leadershipState}
                        financialState={financialState}
                        uploadedDocs={uploadedDocs}
                        uploadingDocType={uploadingDocType}
                        deletingDocId={deletingDocId}
                        completionPct={completionPct}
                        onJumpToStep={jumpToStep}
                        onUpload={handleFileUpload}
                        onDelete={handleDeleteDoc}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Action Footer */}
            <div className="border-t border-border bg-surface px-6 py-4 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[0.6875rem] text-muted-foreground hidden sm:block">
                <span>Auto-saved to your draft at every step.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isBusy}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text-primary hover:bg-surface-alt transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={isActionDisabled}
                    className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-brand py-2.5 px-6 text-xs font-bold text-white shadow-brand hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-w-[140px]"
                  >
                    {savingDraft ? (
                      step === 1 ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> AI Analyzing...
                        </>
                      ) : (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...
                        </>
                      )
                    ) : (
                      <>
                        Save & Continue <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={isActionDisabled}
                    className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-brand-gradient py-2.5 px-6 text-xs font-bold text-on-brand shadow-brand hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-w-[170px]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Completing...
                      </>
                    ) : (
                      <>
                        Complete Onboarding <CheckCircle2 className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
