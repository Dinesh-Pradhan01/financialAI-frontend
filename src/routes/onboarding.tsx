import { createFileRoute, useNavigate, redirect, isRedirect } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  Lock,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Upload,
  FileText,
  Trash2,
  Edit3,
  ShieldCheck,
  Building,
  CreditCard,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { useAuth, getAuthSnapshot } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { auth } from "@/firebase/firebase";
import {
  BUSINESS_CATEGORIES,
  BUSINESS_TYPES,
  BUSINESS_MODELS,
  ACCOUNTING_SOFTWARES,
  DIGITAL_PAYMENT_METHODS,
  INDIAN_STATES,
  MANDATORY_DOCUMENTS,
  OPTIONAL_DOCUMENTS,
  CATEGORY_RECOMMENDED_DOCUMENTS,
  DocumentRequirement,
} from "@/lib/businessOnboarding";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function waitForAuth(): Promise<import("firebase/auth").User | null> {
  if (auth.currentUser) return Promise.resolve(auth.currentUser);

  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout>;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (timer) clearTimeout(timer);
      unsubscribe();
      resolve(user);
    });
    timer = setTimeout(() => {
      unsubscribe();
      resolve(auth.currentUser);
    }, 1000);
  });
}

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

    const fbUser = auth.currentUser ?? (await waitForAuth());

    if (!fbUser) {
      throw redirect({ to: "/login" });
    }

    if (!fbUser.emailVerified) {
      throw redirect({ to: "/verify-email" });
    }

    try {
      const { api: apiInstance } = await import("@/lib/api");
      const backendUser = await apiInstance.get<{ profile_completed: boolean }>("/api/auth/me");
      if (backendUser.profile_completed) {
        throw redirect({ to: "/home" });
      }
    } catch (err) {
      if (isRedirect(err)) {
        throw err;
      }
      console.error("Error checking profile completion in onboarding beforeLoad:", err);
      if (err && typeof err === "object" && "status" in err && (err as any).status === 401) {
        throw redirect({ to: "/login" });
      }
    }
  },
  component: BusinessOnboarding,
});

interface UploadedDoc {
  id: string;
  document_type: string;
  document_category: string;
  filename: string;
  original_name: string;
  file_size_bytes: number;
  upload_status: string;
}

function BusinessOnboarding() {
  const nav = useNavigate();
  const { user, loading, refreshUser } = useAuth();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [completionPct, setCompletionPct] = useState(0);

  // STEP 1 — General Info
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

  // STEP 2 — Leadership & Organization
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
  const [teamInvites, setTeamInvites] = useState<any[]>([]);

  // STEP 3 — Financial Info
  const [primaryBank, setPrimaryBank] = useState("");
  const [numberOfAccounts, setNumberOfAccounts] = useState("1");
  const [hasBusinessLoan, setHasBusinessLoan] = useState<boolean | null>(false);
  const [hasBusinessCreditCard, setHasBusinessCreditCard] = useState<boolean | null>(false);
  const [accountingSoftware, setAccountingSoftware] = useState("Tally");
  const [digitalPaymentMethods, setDigitalPaymentMethods] = useState<string[]>(["UPI", "Net Banking"]);

  // STEP 4 — Verification Documents
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [uploadingDocType, setUploadingDocType] = useState<string | null>(null);

  // Pre-fill email and contact person if logged in
  useEffect(() => {
    if (user) {
      if (!officialEmail && user.email) {
        setOfficialEmail(user.email);
      }
    }
  }, [user]);

  // Load existing onboarding draft from backend
  useEffect(() => {
    async function loadExistingOnboarding() {
      try {
        const res = await api.get<any>("/api/business/onboarding/me");
        if (res) {
          if (res.completion_percentage) setCompletionPct(res.completion_percentage);

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
      }
    }
    loadExistingOnboarding();
  }, []);

  // Demo Data Filler for Development & Testing
  const fillDemoData = () => {
    // Step 1 - General Info
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

    // Step 2 - Leadership Info
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

    // Step 3 - Financial Info
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
    businessCategory &&
    businessType &&
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(businessPan.trim()) &&
    registeredAddress.trim().length >= 5 &&
    stateName &&
    city.trim().length >= 2 &&
    /^\d{6}$/.test(pincode.trim()) &&
    officialEmail.trim().includes("@") &&
    officialPhone.trim().length >= 10;

  const isTeamInfoValid = ceoName.trim().length > 0;

  const isFinancialInfoValid = true; // Financial Info has optional fields with sensible defaults

  // Step 1 mandatory document check
  const isDocUploaded = (typeKey: string) => uploadedDocs.some((d) => d.document_type === typeKey);
  const isDocsValid = isDocUploaded("business_pan") && isDocUploaded("registration_proof");


  // Save Step 2 (was Step 1)
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
      if (res.completion_percentage) setCompletionPct(res.completion_percentage);
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to save General Info.");
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

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
      if (res.completion_percentage) setCompletionPct(res.completion_percentage);
      if (res.team_invites) setTeamInvites(res.team_invites);
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to save Leadership Info.");
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  // Save Step 4 (was Step 3)
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
      if (res.completion_percentage) setCompletionPct(res.completion_percentage);
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to save Financial Info.");
      return false;
    } finally {
      setSavingDraft(false);
    }
  };

  // Upload Document
  const handleFileUpload = async (file: File, documentType: string, documentCategory: string) => {
    if (!file) return;
    setUploadingDocType(documentType);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("document_type", documentType);
      formData.append("document_category", documentCategory);

      const res = await api.upload<any>("/api/business/onboarding/documents/upload", formData);
      if (res.documents) setUploadedDocs(res.documents);
      if (res.completion_percentage) setCompletionPct(res.completion_percentage);
      toast.success(`Uploaded ${file.name} successfully!`);
    } catch (err: any) {
      toast.error(err.message || "Failed to upload document.");
    } finally {
      setUploadingDocType(null);
    }
  };

  // Delete Document
  const handleDeleteDoc = async (docId: string) => {
    try {
      const res = await api.delete<any>(`/api/business/onboarding/documents/${docId}`);
      if (res.documents) setUploadedDocs(res.documents);
      if (res.completion_percentage) setCompletionPct(res.completion_percentage);
      toast.success("Document removed.");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove document.");
    }
  };

  // Navigation handlers
  const nextStep = async () => {
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
    if (step > 1) setStep(step - 1);
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
      toast.error(err.message || "Failed to complete onboarding.");
    } finally {
      setSubmitting(false);
    }
  };

  // Digital Payment Checkbox Toggle
  const togglePaymentMethod = (method: string) => {
    setDigitalPaymentMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  const recommendedDocs = CATEGORY_RECOMMENDED_DOCUMENTS[businessCategory] || CATEGORY_RECOMMENDED_DOCUMENTS["Others"];

  return (
    <div className="grid min-h-screen lg:grid-cols-12 bg-background">
      {/* ---- Left Hero Panel ---- */}
      <div className="relative hidden lg:flex lg:col-span-4 flex-col justify-between bg-brand p-10 text-on-brand border-r border-border/20">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight">SpotLite</span>
            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white">
              BUSINESS
            </span>
          </div>
        </div>

        <div className="my-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <Building2 className="h-3.5 w-3.5" />
            <span>Business Financial Intelligence</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight">
            Build your company's financial profile.
          </h2>
          <p className="text-sm opacity-90 leading-relaxed">
            SpotLite connects transaction feeds, verifies business identity, and prepares your financial workspace in 5 quick steps.
          </p>

          {/* Dynamic completion gauge */}
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/15">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span>Onboarding Completion</span>
              <span>{completionPct}%</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 ease-out"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs opacity-75">
          <span className="flex items-center gap-1">
            <Lock className="h-3.5 w-3.5" /> AES-256 Encrypted Vault
          </span>
          <span>5-10 min setup</span>
        </div>
      </div>

      {/* ---- Right Form Panel ---- */}
      <div className="lg:col-span-8 flex flex-col justify-between px-6 py-8 md:px-12 lg:px-16 overflow-y-auto">
        <div>
          {/* Header Mobile / Top Nav */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 lg:hidden">
              <Sparkles className="h-5 w-5 text-brand" />
              <span className="font-display text-lg font-bold">SpotLite Business</span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={fillDemoData}
                className="flex items-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold text-brand hover:bg-brand/20 transition shadow-xs"
                title="Pre-fill form with sample demo data for quick testing"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                Fill Demo Data
              </button>
              {savingDraft && (
                <span className="flex items-center gap-1.5 text-xs text-text-secondary animate-pulse">
                  <Loader2 className="h-3 w-3 animate-spin text-brand" /> Saving progress…
                </span>
              )}
            </div>
          </div>

          {/* Stepper Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs text-text-secondary font-medium mb-3">
              <span className="font-mono text-brand font-semibold">STEP {step} OF 5</span>
              <span className="font-semibold text-text-primary">
                {step === 1 && "1. Business Verification"}
                {step === 2 && "2. General Info"}
                {step === 3 && "3. Team Members"}
                {step === 4 && "4. Financial Info"}
                {step === 5 && "5. Review & Complete"}
              </span>
            </div>

            {/* Stepper Pills */}
            <div className="grid grid-cols-5 gap-1.5 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    if (s < step) setStep(s);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step
                      ? "bg-brand"
                      : s < step
                      ? "bg-brand/40"
                      : "bg-border"
                  }`}
                  title={`Jump to Step ${s}`}
                />
              ))}
            </div>
          </div>

          {/* ==================================================================== */}
          {/* STEP 2: GENERAL INFORMATION (Was Step 1) */}
          {/* ==================================================================== */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold">General Info</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Identify your business and create its legal profile.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Company Name <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="Acme Technologies Pvt Ltd"
                  />
                </div>

                {/* Business Category */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Business Category <span className="text-brand">*</span>
                  </label>
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Business Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Business Type <span className="text-brand">*</span>
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt} value={bt}>
                        {bt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Business PAN */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Business PAN <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    required
                    value={businessPan}
                    onChange={(e) => setBusinessPan(e.target.value.toUpperCase())}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 uppercase tracking-widest font-mono"
                    placeholder="ABCDE1234F"
                  />
                </div>

                {/* GSTIN */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                    <span>GSTIN</span>
                    <span className="font-normal text-text-secondary/70">Optional</span>
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 uppercase font-mono"
                    placeholder="27AAACB1234C1ZV"
                  />
                </div>

                {/* CIN */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                    <span>CIN</span>
                    <span className="font-normal text-text-secondary/70">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 font-mono"
                    placeholder="U72200MH2021PTC123456"
                  />
                </div>

                {/* Udyam / MSME Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                    <span>Udyam / MSME Number</span>
                    <span className="font-normal text-text-secondary/70">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={udyamNumber}
                    onChange={(e) => setUdyamNumber(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 font-mono"
                    placeholder="UDYAM-MH-01-0000000"
                  />
                </div>

                {/* Date of Incorporation */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                    <span>Date of Incorporation</span>
                    <span className="font-normal text-text-secondary/70">Optional</span>
                  </label>
                  <input
                    type="date"
                    value={dateOfIncorporation}
                    onChange={(e) => setDateOfIncorporation(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>

                {/* Official Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Official Email <span className="text-brand">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="contact@acme.com"
                  />
                </div>

                {/* Official Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Official Phone <span className="text-brand">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={officialPhone}
                    onChange={(e) => setOfficialPhone(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Registered Address */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Registered Address <span className="text-brand">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={registeredAddress}
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                    placeholder="Building No, Street, Landmark"
                  />
                </div>

                {/* Operational Address */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                    <span>Operational Address</span>
                    <span className="font-normal text-text-secondary/70">Optional (If different from Registered)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={operationalAddress}
                    onChange={(e) => setOperationalAddress(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                    placeholder="Warehouse / Branch / Factory Address"
                  />
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    State <span className="text-brand">*</span>
                  </label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    City <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="Mumbai"
                  />
                </div>

                {/* PIN Code */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    PIN Code <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 font-mono"
                    placeholder="400001"
                  />
                </div>

                {/* Website */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                    <span>Website</span>
                    <span className="font-normal text-text-secondary/70">Optional</span>
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="https://www.acme.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 3: LEADERSHIP & ORGANIZATION */}
          {/* ==================================================================== */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold">Leadership & Organization</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Add details about your leadership and invite your CFO and HR to collaborate on SpotLite.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {/* CEO Card */}
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">CEO / Founder Details</h3>
                        <p className="text-[10px] text-text-secondary">Primary leadership information</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary">
                          Full Name <span className="text-brand">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={ceoName}
                          onChange={(e) => setCeoName(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Email</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="email"
                          value={ceoEmail}
                          onChange={(e) => setCeoEmail(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="ceo@company.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Phone</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="tel"
                          value={ceoPhone}
                          onChange={(e) => setCeoPhone(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Designation</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="text"
                          value={ceoDesignation}
                          onChange={(e) => setCeoDesignation(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="CEO / Founder / Managing Director"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CFO Card */}
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200 delay-75">
                  <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                          <Lock className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">Chief Financial Officer (CFO)</h3>
                          <p className="text-[10px] text-text-secondary">Full access to Customer 360 & Statements</p>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inviteCfo}
                          onChange={(e) => setInviteCfo(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-brand focus:ring-brand/30 accent-brand"
                        />
                        <span className="text-xs font-semibold text-text-secondary">Invite to SpotLite</span>
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Full Name</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="text"
                          value={cfoName}
                          onChange={(e) => setCfoName(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Email Address</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="email"
                          value={cfoEmail}
                          onChange={(e) => setCfoEmail(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="cfo@company.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Phone</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="tel"
                          value={cfoPhone}
                          onChange={(e) => setCfoPhone(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="+91 98765 43211"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Designation</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="text"
                          value={cfoDesignation}
                          onChange={(e) => setCfoDesignation(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="Chief Financial Officer"
                        />
                      </div>
                    </div>
                    {teamInvites.find(i => i.role === 'cfo') && (
                      <div className="pt-2 text-xs">
                        Invite Status: <span className="font-semibold capitalize text-brand">{teamInvites.find(i => i.role === 'cfo').status}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* HR Card */}
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200 delay-150">
                  <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">Human Resources (HR)</h3>
                          <p className="text-[10px] text-text-secondary">Uploads employee & vendor lists</p>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={inviteHr}
                          onChange={(e) => setInviteHr(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-brand focus:ring-brand/30 accent-brand"
                        />
                        <span className="text-xs font-semibold text-text-secondary">Invite to SpotLite</span>
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Full Name</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="text"
                          value={hrName}
                          onChange={(e) => setHrName(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Email Address</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="email"
                          value={hrEmail}
                          onChange={(e) => setHrEmail(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="hr@company.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Phone</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="tel"
                          value={hrPhone}
                          onChange={(e) => setHrPhone(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="+91 98765 43212"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Designation</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="text"
                          value={hrDesignation}
                          onChange={(e) => setHrDesignation(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="Head of HR"
                        />
                      </div>
                    </div>
                    {teamInvites.find(i => i.role === 'hr') && (
                      <div className="pt-2 text-xs">
                        Invite Status: <span className="font-semibold capitalize text-brand">{teamInvites.find(i => i.role === 'hr').status}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Organization Details Card */}
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200 delay-200">
                  <div className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-border pb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <Building className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">Organization Details</h3>
                        <p className="text-[10px] text-text-secondary">Business operational profile</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Number of Employees</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <select
                          value={numberOfEmployees}
                          onChange={(e) => setNumberOfEmployees(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                        >
                          <option value="">Select range</option>
                          <option value="1-10">1–10</option>
                          <option value="11-50">11–50</option>
                          <option value="51-200">51–200</option>
                          <option value="201-500">201–500</option>
                          <option value="501-1000">501–1,000</option>
                          <option value="1001+">1,001+</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Number of Branches</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="text"
                          value={numberOfBranches}
                          onChange={(e) => setNumberOfBranches(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="e.g. 3"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Business Model</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <select
                          value={businessModel}
                          onChange={(e) => setBusinessModel(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                        >
                          <option value="">Select model</option>
                          {BUSINESS_MODELS.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Primary Product / Service</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <input
                          type="text"
                          value={primaryProductService}
                          onChange={(e) => setPrimaryProductService(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                          placeholder="e.g. Financial Analytics Software"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                          <span>Business Description</span>
                          <span className="font-normal text-text-secondary/70">Optional</span>
                        </label>
                        <textarea
                          rows={3}
                          value={businessDescription}
                          onChange={(e) => setBusinessDescription(e.target.value)}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                          placeholder="Brief description of what your business does..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 4: FINANCIAL INFORMATION (Was Step 3) */}
          {/* ==================================================================== */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold">Financial Info</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Collect banking and payment software context. (Sensitive turnover and revenue data will be generated dynamically through transaction feeds later).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Primary Bank */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                    <span>Primary Bank</span>
                    <span className="font-normal text-text-secondary/70">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={primaryBank}
                    onChange={(e) => setPrimaryBank(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    placeholder="HDFC Bank / ICICI Bank / SBI"
                  />
                </div>

                {/* Number of Business Accounts */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary flex justify-between">
                    <span>Number of Business Accounts</span>
                    <span className="font-normal text-text-secondary/70">Optional</span>
                  </label>
                  <select
                    value={numberOfAccounts}
                    onChange={(e) => setNumberOfAccounts(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="1">1 Account</option>
                    <option value="2">2 Accounts</option>
                    <option value="3">3 Accounts</option>
                    <option value="4">4 Accounts</option>
                    <option value="5">5+ Accounts</option>
                  </select>
                </div>

                {/* Existing Business Loan */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Existing Business Loan?
                  </label>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="businessLoan"
                        checked={hasBusinessLoan === true}
                        onChange={() => setHasBusinessLoan(true)}
                        className="text-brand focus:ring-brand"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="businessLoan"
                        checked={hasBusinessLoan === false}
                        onChange={() => setHasBusinessLoan(false)}
                        className="text-brand focus:ring-brand"
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Existing Business Credit Card */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Existing Business Credit Card?
                  </label>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="businessCreditCard"
                        checked={hasBusinessCreditCard === true}
                        onChange={() => setHasBusinessCreditCard(true)}
                        className="text-brand focus:ring-brand"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="businessCreditCard"
                        checked={hasBusinessCreditCard === false}
                        onChange={() => setHasBusinessCreditCard(false)}
                        className="text-brand focus:ring-brand"
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Accounting Software */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Accounting Software Used
                  </label>
                  <select
                    value={accountingSoftware}
                    onChange={(e) => setAccountingSoftware(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    {ACCOUNTING_SOFTWARES.map((sw) => (
                      <option key={sw} value={sw}>
                        {sw}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Digital Payment Methods */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-xs font-semibold text-text-secondary">
                    Digital Payment Methods Accepted
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {DIGITAL_PAYMENT_METHODS.map((pm) => {
                      const checked = digitalPaymentMethods.includes(pm);
                      return (
                        <button
                          key={pm}
                          type="button"
                          onClick={() => togglePaymentMethod(pm)}
                          className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-medium text-left transition-all ${
                            checked
                              ? "border-brand bg-brand/5 text-brand"
                              : "border-border bg-surface hover:border-brand/40"
                          }`}
                        >
                          <div
                            className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                              checked ? "bg-brand border-brand text-white" : "border-border"
                            }`}
                          >
                            {checked && <CheckCircle2 className="h-3 w-3" />}
                          </div>
                          <span>{pm}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 1: BUSINESS VERIFICATION (Was Step 4) */}
          {/* ==================================================================== */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold">Business Verification</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Lightweight KYC verification for business identity.
                </p>
              </div>

              {/* Mandatory Documents Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  <span>Mandatory Documents</span>
                </div>
                <div className="grid gap-3">
                  {MANDATORY_DOCUMENTS.map((docReq) => (
                    <DocumentUploadCard
                      key={docReq.typeKey}
                      req={docReq}
                      uploadedDocs={uploadedDocs}
                      uploadingDocType={uploadingDocType}
                      onUpload={(file) => handleFileUpload(file, docReq.typeKey, "mandatory")}
                      onDelete={handleDeleteDoc}
                    />
                  ))}
                </div>
              </div>


            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 5: REVIEW & COMPLETE */}
          {/* ==================================================================== */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold">Review & Complete</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Review your company profile before final activation.
                </p>
              </div>

              {/* Completion Banner */}
              <div className="rounded-2xl bg-brand/10 p-5 border border-brand/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white font-bold text-lg font-mono">
                    {completionPct}%
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text-primary">Onboarding Readiness</h3>
                    <p className="text-xs text-text-secondary">All required business verification details captured.</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Ready for AI Analysis
                </span>
              </div>

              <div className="space-y-4">
                {/* General Info Summary Card */}
                <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-brand" /> Company Details
                    </h3>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-text-secondary block">Company Name</span>
                      <span className="font-semibold text-text-primary">{companyName}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Category</span>
                      <span className="font-semibold text-text-primary">{businessCategory}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Type</span>
                      <span className="font-semibold text-text-primary">{businessType}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Business PAN</span>
                      <span className="font-mono font-semibold text-text-primary">{businessPan}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Official Email</span>
                      <span className="font-semibold text-text-primary">{officialEmail}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">City & State</span>
                      <span className="font-semibold text-text-primary">{city}, {stateName}</span>
                    </div>
                  </div>
                </div>

                {/* Leadership & Organization Summary Card */}
                <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Building className="h-4 w-4 text-brand" /> Leadership & Organization
                    </h3>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    {ceoName && (
                      <div className="rounded-xl border border-border/50 p-3 bg-surface-alt">
                        <span className="text-brand font-bold block mb-1">CEO / Founder</span>
                        <span className="font-semibold text-text-primary block">{ceoName}</span>
                        {ceoEmail && <span className="text-text-secondary block">{ceoEmail}</span>}
                        {ceoDesignation && <span className="text-text-secondary block">{ceoDesignation}</span>}
                      </div>
                    )}
                    {cfoName && (
                      <div className="rounded-xl border border-border/50 p-3 bg-surface-alt">
                        <span className="text-brand font-bold block mb-1">CFO</span>
                        <span className="font-semibold text-text-primary block">{cfoName}</span>
                        {cfoEmail && <span className="text-text-secondary block">{cfoEmail}</span>}
                        {cfoDesignation && <span className="text-text-secondary block">{cfoDesignation}</span>}
                        {inviteCfo && (
                          <span className="mt-2 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand capitalize">
                            {teamInvites.find(i => i.role === 'cfo')?.status || 'Invite Pending'}
                          </span>
                        )}
                      </div>
                    )}
                    {hrName && (
                      <div className="rounded-xl border border-border/50 p-3 bg-surface-alt">
                        <span className="text-brand font-bold block mb-1">HR</span>
                        <span className="font-semibold text-text-primary block">{hrName}</span>
                        {hrEmail && <span className="text-text-secondary block">{hrEmail}</span>}
                        {hrDesignation && <span className="text-text-secondary block">{hrDesignation}</span>}
                        {inviteHr && (
                          <span className="mt-2 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand capitalize">
                            {teamInvites.find(i => i.role === 'hr')?.status || 'Invite Pending'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {(numberOfEmployees || businessModel || primaryProductService) && (
                    <div className="border-t border-border pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      {numberOfEmployees && (
                        <div>
                          <span className="text-text-secondary block">Employees</span>
                          <span className="font-semibold">{numberOfEmployees}</span>
                        </div>
                      )}
                      {numberOfBranches && (
                        <div>
                          <span className="text-text-secondary block">Branches</span>
                          <span className="font-semibold">{numberOfBranches}</span>
                        </div>
                      )}
                      {businessModel && (
                        <div>
                          <span className="text-text-secondary block">Business Model</span>
                          <span className="font-semibold">{businessModel}</span>
                        </div>
                      )}
                      {primaryProductService && (
                        <div className="col-span-2 sm:col-span-3">
                          <span className="text-text-secondary block">Primary Product/Service</span>
                          <span className="font-semibold">{primaryProductService}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Financial Info Summary Card */}
                <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-brand" /> Banking & Payments
                    </h3>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-text-secondary block">Primary Bank</span>
                      <span className="font-semibold text-text-primary">{primaryBank || "Not specified"}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Accounting Software</span>
                      <span className="font-semibold text-text-primary">{accountingSoftware}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Payment Methods</span>
                      <span className="font-semibold text-text-primary">
                        {digitalPaymentMethods.length ? digitalPaymentMethods.join(", ") : "None"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Optional Documents Section */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-sm font-bold text-text-primary">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-text-secondary" />
                      <span>Optional Documents</span>
                    </div>
                    <span className="text-xs font-normal text-text-secondary">Can be skipped</span>
                  </div>
                  <div className="grid gap-3">
                    {OPTIONAL_DOCUMENTS.map((docReq) => (
                      <DocumentUploadCard
                        key={docReq.typeKey}
                        req={docReq}
                        uploadedDocs={uploadedDocs}
                        uploadingDocType={uploadingDocType}
                        onUpload={(file) => handleFileUpload(file, docReq.typeKey, "optional")}
                        onDelete={handleDeleteDoc}
                      />
                    ))}
                  </div>
                </div>

                {/* Recommended Documents Section (Based on selected Category) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-sm font-bold text-text-primary">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-brand" />
                      <span>Recommended Documents ({businessCategory})</span>
                    </div>
                    <span className="text-xs font-normal text-brand font-medium">Industry Specific</span>
                  </div>
                  <div className="grid gap-3">
                    {recommendedDocs.map((docReq) => (
                      <DocumentUploadCard
                        key={docReq.typeKey}
                        req={docReq}
                        uploadedDocs={uploadedDocs}
                        uploadingDocType={uploadingDocType}
                        onUpload={(file) => handleFileUpload(file, docReq.typeKey, "recommended")}
                        onDelete={handleDeleteDoc}
                      />
                    ))}
                  </div>
                </div>

                {/* Uploaded Documents Summary Card */}
                <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-brand" /> Uploaded Verification Documents ({uploadedDocs.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                  </div>
                  {uploadedDocs.length === 0 ? (
                    <p className="text-xs text-text-secondary">No documents uploaded yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {uploadedDocs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between rounded-xl border border-border bg-surface-alt p-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <FileText className="h-4 w-4 text-brand" />
                            <div>
                              <span className="font-semibold text-text-primary block">{doc.original_name}</span>
                              <span className="text-[10px] text-text-secondary capitalize">
                                {doc.document_type.replace(/_/g, " ")} • {(doc.file_size_bytes / 1024).toFixed(0)} KB
                              </span>
                            </div>
                          </div>
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                            Uploaded
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Nav Action Bar */}
        <div className="mt-8 pt-4 border-t border-border flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-text-primary hover:bg-surface-alt transition"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={savingDraft || (step === 2 && !isGeneralInfoValid)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3 px-6 text-sm font-semibold text-white shadow-brand hover:opacity-95 transition disabled:opacity-60 ml-auto"
            >
              {savingDraft ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & Continue"}
              {!savingDraft && <ArrowRight className="h-4 w-4" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 px-6 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 transition disabled:opacity-60 ml-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Completing Onboarding…
                </>
              ) : (
                <>
                  Complete Onboarding <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface DocumentUploadCardProps {
  req: DocumentRequirement;
  uploadedDocs: UploadedDoc[];
  uploadingDocType: string | null;
  onUpload: (file: File) => void;
  onDelete: (docId: string) => void;
}

function DocumentUploadCard({ req, uploadedDocs, uploadingDocType, onUpload, onDelete }: DocumentUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const existingDoc = uploadedDocs.find((d) => d.document_type === req.typeKey);
  const isUploading = uploadingDocType === req.typeKey;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`rounded-2xl border p-4 transition-all ${
        existingDoc
          ? "border-emerald-500/30 bg-emerald-500/5"
          : "border-border bg-surface hover:border-brand/40"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
              existingDoc
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-brand/10 text-brand"
            }`}
          >
            {existingDoc ? <CheckCircle2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-text-primary">{req.label}</h4>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  existingDoc
                    ? "bg-emerald-500/20 text-emerald-700"
                    : req.isOptional
                    ? "bg-secondary text-text-secondary"
                    : "bg-brand/10 text-brand"
                }`}
              >
                {existingDoc ? "Uploaded" : req.isOptional ? "Optional" : "Required"}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">{req.why}</p>
            {existingDoc && (
              <span className="text-[11px] font-mono text-emerald-600 mt-1 block">
                {existingDoc.original_name} • {(existingDoc.file_size_bytes / 1024).toFixed(0)} KB
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
          />

          {existingDoc ? (
            <button
              type="button"
              onClick={() => onDelete(existingDoc.id)}
              className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          ) : (
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-xl bg-surface-alt border border-border px-4 py-2 text-xs font-semibold text-text-primary hover:bg-surface transition disabled:opacity-60 shadow-xs"
            >
              {isUploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
              ) : (
                <Upload className="h-3.5 w-3.5 text-brand" />
              )}
              {isUploading ? "Uploading..." : "Upload File"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
