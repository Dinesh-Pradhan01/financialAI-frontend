import { createFileRoute, useNavigate, redirect, isRedirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth, getAuthSnapshot } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { auth } from "@/firebase/firebase";
import { waitForAuth } from "@/firebase/auth";
import {
  UploadedDoc,
  TeamInvite,
  GeneralInfoState,
  LeadershipState,
  FinancialState,
} from "@/components/onboarding/types";
import { OnboardingHeroSidebar } from "@/components/onboarding/OnboardingHeroSidebar";
import { OnboardingStepperHeader } from "@/components/onboarding/OnboardingStepperHeader";
import { Step1Verification } from "@/components/onboarding/Step1Verification";
import { Step2GeneralInfo } from "@/components/onboarding/Step2GeneralInfo";
import { Step3Leadership } from "@/components/onboarding/Step3Leadership";
import { Step4FinancialInfo } from "@/components/onboarding/Step4FinancialInfo";
import { Step5ReviewComplete } from "@/components/onboarding/Step5ReviewComplete";
import { OnboardingBottomNav } from "@/components/onboarding/OnboardingBottomNav";
import { SpotliteLoader } from "@/components/ui/SpotliteLoader";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Business Onboarding · SpotLite" },
      {
        name: "description",
        content: "Set up your business profile and verify financial context for SpotLite Financial Intelligence.",
      },
    ],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;

    const snapshot = getAuthSnapshot();

    if (!snapshot.loading && snapshot.user) {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        throw redirect({ to: "/verify-email" });
      }
      if (snapshot.user.profile_completed) {
        throw redirect({ to: "/home" });
      }
      return;
    }
  },
  component: BusinessOnboarding,
});

function BusinessOnboarding() {
  const nav = useNavigate();
  const { user, loading, refreshUser } = useAuth();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [completionPct, setCompletionPct] = useState(0);

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
  const [digitalPaymentMethods, setDigitalPaymentMethods] = useState<string[]>(["UPI", "Net Banking"]);

  // Verification Documents
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [uploadingDocType, setUploadingDocType] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

  // Pre-fill email and contact person if logged in
  useEffect(() => {
    if (user && !officialEmail && user.email) {
      setOfficialEmail(user.email);
    }
  }, [user, officialEmail]);

  // Load existing onboarding draft from backend
  useEffect(() => {
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
            if (g.date_of_incorporation) setDateOfIncorporation(g.date_of_incorporation.split("T")[0]);
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
            if (l.cfo_name) setCfoName(l.cfo_name);
            if (l.cfo_email) setCfoEmail(l.cfo_email);
            if (l.cfo_phone) setCfoPhone(l.cfo_phone);
            if (l.cfo_designation) setCfoDesignation(l.cfo_designation);
            if (l.invite_cfo) setInviteCfo(l.invite_cfo);
            if (l.hr_name) setHrName(l.hr_name);
            if (l.hr_email) setHrEmail(l.hr_email);
            if (l.hr_phone) setHrPhone(l.hr_phone);
            if (l.hr_designation) setHrDesignation(l.hr_designation);
            if (l.invite_hr) setInviteHr(l.invite_hr);
            if (l.number_of_employees) setNumberOfEmployees(l.number_of_employees);
            if (l.number_of_branches) setNumberOfBranches(l.number_of_branches);
            if (l.business_model) setBusinessModel(l.business_model);
            if (l.primary_product_service) setPrimaryProductService(l.primary_product_service);
            if (l.business_description) setBusinessDescription(l.business_description);
          }

          if (res.financial_info) {
            const f = res.financial_info;
            if (f.primary_bank) setPrimaryBank(f.primary_bank);
            if (f.number_of_accounts) setNumberOfAccounts(String(f.number_of_accounts));
            if (f.has_business_loan !== undefined) setHasBusinessLoan(f.has_business_loan);
            if (f.has_business_credit_card !== undefined) setHasBusinessCreditCard(f.has_business_credit_card);
            if (f.accounting_software) setAccountingSoftware(f.accounting_software);
            if (f.digital_payment_methods) setDigitalPaymentMethods(f.digital_payment_methods);
          }

          if (res.documents) {
            setUploadedDocs(res.documents);
          }
        }
      } catch (err) {
        console.log("No previous onboarding draft found or load error:", err);
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    }
    loadExistingOnboarding();

    return () => {
      isMounted = false;
    };
  }, []);

  // Demo Data Filler for Testing
  const fillDemoData = () => {
    // Step 1 / 2 - General Info
    setCompanyName("Acme Financial Technologies Pvt Ltd");
    setBusinessCategory("Technology & IT");
    setBusinessType("Private Limited");
    setCin("U72200MH2021PTC123456");
    setGstin("27AAACB1234C1ZV");
    setBusinessPan("ABCDE1234F");
    setUdyamNumber("UDYAM-MH-01-0000000");
    setDateOfIncorporation("2021-06-15");
    setRegisteredAddress("101 Cyber Heights, BKC, Bandra East");
    setOperationalAddress("Suite 502, Tech Park, Powai");
    setStateName("Maharashtra");
    setCity("Mumbai");
    setPincode("400051");
    setWebsite("https://acmefintech.example.com");
    if (!officialEmail) setOfficialEmail(user?.email || "contact@acmefintech.com");
    setOfficialPhone("9876543210");

    // Step 3 - Leadership Info
    setCeoName("Rajesh Kumar");
    setCeoEmail("ceo@acmefintech.com");
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
    setNumberOfEmployees("51-200");
    setNumberOfBranches("3");
    setBusinessModel("B2B");
    setPrimaryProductService("Financial Analytics Software");
    setBusinessDescription("A leading fintech company providing AI-powered financial analytics solutions.");

    // Step 4 - Financial Info
    setPrimaryBank("HDFC Bank");
    setNumberOfAccounts("2");
    setHasBusinessLoan(true);
    setHasBusinessCreditCard(true);
    setAccountingSoftware("Zoho Books");
    setDigitalPaymentMethods(["UPI", "Net Banking", "NEFT", "RTGS"]);

    toast.success("Loaded demo business details into onboarding form!");
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
    /^\d{6}$/.test(pincode.trim()) &&
    officialEmail.trim().includes("@") &&
    officialPhone.trim().length >= 10;

  const isTeamInfoValid = ceoName.trim().length > 0;

  const isDocUploaded = (typeKey: string) => uploadedDocs.some((d) => d.document_type === typeKey);
  const isDocsValid = isDocUploaded("business_pan") && isDocUploaded("registration_proof");

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
    if (!isGeneralInfoValid) {
      toast.error("Please fill all required fields in General Info correctly.");
      return false;
    }
    setSavingDraft(true);
    try {
      const res = await api.post<any>("/api/business/onboarding/step/1", {
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
      });
      if (res.completion_percentage !== undefined) setCompletionPct(res.completion_percentage);
      return true;
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to save General Info.";
      toast.error(msg);
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  // Save Step 3 (Leadership)
  const saveStep2 = async () => {
    if (!isTeamInfoValid) {
      toast.error("Please provide the CEO / Founder name.");
      return false;
    }
    setSavingDraft(true);
    try {
      const res = await api.post<any>("/api/business/onboarding/step/2", {
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
        invite_cfo: inviteCfo,
        hr_name: hrName.trim() || null,
        hr_email: hrEmail.trim() || null,
        hr_phone: hrPhone.trim() || null,
        hr_designation: hrDesignation.trim() || null,
        invite_hr: inviteHr,
      });
      if (res.completion_percentage !== undefined) setCompletionPct(res.completion_percentage);
      if (res.team_invites) setTeamInvites(res.team_invites);
      return true;
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to save Leadership Info.";
      toast.error(msg);
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  // Save Step 4 (Financial Info)
  const saveStep3 = async () => {
    setSavingDraft(true);
    try {
      const res = await api.post<any>("/api/business/onboarding/step/3", {
        primary_bank: primaryBank.trim() || null,
        number_of_accounts: parseInt(numberOfAccounts, 10) || 1,
        has_business_loan: hasBusinessLoan,
        has_business_credit_card: hasBusinessCreditCard,
        accounting_software: accountingSoftware,
        digital_payment_methods: digitalPaymentMethods,
      });
      if (res.completion_percentage !== undefined) setCompletionPct(res.completion_percentage);
      return true;
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to save Financial Info.";
      toast.error(msg);
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  // Upload Document
  const handleFileUpload = async (file: File, documentType: string, documentCategory: string) => {
    if (!file || uploadingDocType || deletingDocId) return;
    setUploadingDocType(documentType);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("document_type", documentType);
      formData.append("document_category", documentCategory);

      const res = await api.upload<any>("/api/business/onboarding/documents/upload", formData);
      if (res.documents) setUploadedDocs(res.documents);
      if (res.completion_percentage !== undefined) setCompletionPct(res.completion_percentage);
      toast.success(`Uploaded ${file.name} successfully!`);
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to upload document.";
      toast.error(msg);
    } finally {
      setUploadingDocType(null);
    }
  };

  // Delete Document
  const handleDeleteDoc = async (docId: string) => {
    if (deletingDocId || uploadingDocType) return;
    setDeletingDocId(docId);
    try {
      const res = await api.delete<any>(`/api/business/onboarding/documents/${docId}`);
      if (res.documents) setUploadedDocs(res.documents);
      if (res.completion_percentage !== undefined) setCompletionPct(res.completion_percentage);
      toast.success("Document removed.");
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to remove document.";
      toast.error(msg);
    } finally {
      setDeletingDocId(null);
    }
  };

  // Navigation handlers
  const nextStep = async () => {
    if (uploadingDocType || deletingDocId || savingDraft) return;

    if (step === 1) {
      if (!isDocsValid) {
        toast.error("Please upload mandatory documents (Business PAN & Registration Proof) to proceed.");
        return;
      }
      setSavingDraft(true);
      try {
        const res = await api.post<any>("/api/business/onboarding/step/extract-from-docs", {});
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
        setStep(2);
      }
    } else if (step === 2) {
      const ok = await saveStep1();
      if (ok) setStep(3);
    } else if (step === 3) {
      const ok = await saveStep2();
      if (ok) setStep(4);
    } else if (step === 4) {
      const ok = await saveStep3();
      if (ok) setStep(5);
    }
  };

  const prevStep = () => {
    if (step > 1 && !savingDraft && !submitting) setStep(step - 1);
  };

  // Complete Onboarding Final Submit
  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      await api.post("/api/business/onboarding/complete", {});
      toast.success("SpotLite Business Onboarding Completed!");
      await refreshUser();
      nav({ to: "/home" });
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Failed to complete onboarding.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePaymentMethod = (method: string) => {
    setDigitalPaymentMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  if (loading || isInitializing) {
    return (
      <SpotliteLoader
        message="Loading onboarding workspace…"
        subMessage="AES-256 Encrypted Business Vault"
      />
    );
  }

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
  };

  return (
    <div className="grid min-h-screen lg:h-screen lg:grid-cols-12 bg-background lg:overflow-hidden">
      {/* ---- Left Hero Panel ---- */}
      <OnboardingHeroSidebar completionPct={completionPct} />

      {/* ---- Right Form Panel ---- */}
      <div className="lg:col-span-8 flex flex-col justify-between px-6 py-8 md:px-12 lg:px-16 lg:h-screen overflow-y-auto">
        <div>
          {/* Header Mobile / Top Nav */}
          <OnboardingStepperHeader
            step={step}
            savingDraft={savingDraft}
            onFillDemoData={fillDemoData}
            onJumpToStep={(s) => setStep(s)}
          />

          {/* Step 1: Business Verification */}
          {step === 1 && (
            <Step1Verification
              uploadedDocs={uploadedDocs}
              uploadingDocType={uploadingDocType}
              deletingDocId={deletingDocId}
              onUpload={handleFileUpload}
              onDelete={handleDeleteDoc}
            />
          )}

          {/* Step 2: General Info */}
          {step === 2 && <Step2GeneralInfo state={generalState} />}

          {/* Step 3: Leadership & Organization */}
          {step === 3 && <Step3Leadership state={leadershipState} />}

          {/* Step 4: Financial Info */}
          {step === 4 && <Step4FinancialInfo state={financialState} />}

          {/* Step 5: Review & Complete */}
          {step === 5 && (
            <Step5ReviewComplete
              generalState={generalState}
              leadershipState={leadershipState}
              financialState={financialState}
              uploadedDocs={uploadedDocs}
              uploadingDocType={uploadingDocType}
              deletingDocId={deletingDocId}
              completionPct={completionPct}
              onJumpToStep={(s) => setStep(s)}
              onUpload={handleFileUpload}
              onDelete={handleDeleteDoc}
            />
          )}
        </div>

        {/* Bottom Nav Action Bar */}
        <OnboardingBottomNav
          step={step}
          savingDraft={savingDraft}
          submitting={submitting}
          isCurrentStepValid={isCurrentStepValid}
          uploadingDocType={uploadingDocType}
          deletingDocId={deletingDocId}
          onPrevStep={prevStep}
          onNextStep={nextStep}
          onFinalSubmit={handleFinalSubmit}
        />
      </div>
    </div>
  );
}
