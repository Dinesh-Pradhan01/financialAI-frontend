import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, At as Landmark, Cn as ChevronDown, Ct as Lock, Gn as ArrowRight, Jt as FileCheck, Kn as ArrowLeft, Mn as Building2, Nn as Briefcase, R as ShieldCheck, Ut as FileText, X as Receipt, Yt as FileCheckCorner, b as Trash2, bn as ChevronUp, gn as CircleCheck, in as CreditCard, it as PenLine, jn as Building, m as Upload, n as X, nt as Pencil, o as Users, t as Zap, vt as MapPin, wt as LoaderCircle, yt as Mail } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as auth } from "./firebase-pUuzlwRE.mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as queryKeys } from "./queryKeys-DHNOxYVt.mjs";
import { a as numberType, i as literalType, n as booleanType, o as objectType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { r as parseApiError, t as getApiErrorMessage } from "./apiError-ooqyfQTr.mjs";
import { a as validateFile } from "./uploadHelpers-BBrCko7t.mjs";
import { n as FormSelect, r as FormTextarea, s as useSendInvite, t as FormField } from "./useTeamInvites-DRArFdHA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-nlGEUST_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var generalInfoSchema = objectType({
	company_name: stringType().trim().min(2, "Company name must be at least 2 characters"),
	business_category: stringType().min(1, "Please select a business category"),
	business_type: stringType().min(1, "Please select a business legal type"),
	cin: stringType().trim().nullable().optional(),
	gstin: stringType().trim().nullable().optional(),
	business_pan: stringType().trim().toUpperCase().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Business PAN must be exactly 10 characters (e.g. ABCDE1234F)"),
	udyam_number: stringType().trim().nullable().optional(),
	date_of_incorporation: stringType().trim().nullable().optional(),
	registered_address: stringType().trim().min(5, "Registered address must be at least 5 characters"),
	operational_address: stringType().trim().nullable().optional(),
	state: stringType().min(1, "Please select a state"),
	city: stringType().trim().min(2, "City must be at least 2 characters"),
	pincode: stringType().trim().min(6, "PIN code must be at least 6 characters").max(10, "PIN code cannot exceed 10 characters"),
	website: stringType().trim().nullable().optional(),
	official_email: stringType().trim().email("Please enter a valid official email address"),
	official_phone: stringType().trim().min(10, "Official phone must be at least 10 digits")
});
var leadershipInfoSchema = objectType({
	founder_ceo_name: stringType().trim().min(1, "CEO / Founder name is required").nullable().optional(),
	founder_ceo_email: stringType().trim().email("Invalid CEO email").or(literalType("")).nullable().optional(),
	founder_ceo_phone: stringType().trim().nullable().optional(),
	founder_ceo_designation: stringType().trim().nullable().optional(),
	number_of_employees: stringType().trim().nullable().optional(),
	number_of_branches: stringType().trim().nullable().optional(),
	business_model: stringType().trim().nullable().optional(),
	primary_product_service: stringType().trim().nullable().optional(),
	business_description: stringType().trim().nullable().optional(),
	cfo_name: stringType().trim().nullable().optional(),
	cfo_email: stringType().trim().email("Invalid CFO email").or(literalType("")).nullable().optional(),
	cfo_phone: stringType().trim().nullable().optional(),
	cfo_designation: stringType().trim().nullable().optional(),
	invite_cfo: booleanType().default(false),
	hr_name: stringType().trim().nullable().optional(),
	hr_email: stringType().trim().email("Invalid HR email").or(literalType("")).nullable().optional(),
	hr_phone: stringType().trim().nullable().optional(),
	hr_designation: stringType().trim().nullable().optional(),
	invite_hr: booleanType().default(false)
});
var financialInfoSchema = objectType({
	primary_bank: stringType().trim().nullable().optional(),
	number_of_accounts: numberType().int().min(1, "Number of accounts must be at least 1").default(1),
	has_business_loan: booleanType().nullable().optional(),
	has_business_credit_card: booleanType().nullable().optional(),
	accounting_software: stringType().trim().nullable().optional(),
	digital_payment_methods: arrayType(stringType()).default([])
});
/**
* Extracts field-level error messages from backend 422 validation response or Zod error.
*/
function parseApiValidationErrors(error) {
	return parseApiError(error).fieldErrors;
}
function OnboardingStepperHeader({ step, completionPct, savingDraft, onFillDemoData, onJumpToStep }) {
	if (step >= 5) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-end items-center gap-3 mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onFillDemoData,
			className: "flex items-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-xs font-semibold text-brand hover:bg-brand/20 transition shadow-xs cursor-pointer",
			title: "Pre-fill form with sample demo data for quick testing",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-brand" }), "Fill Demo Data"]
		}), savingDraft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5 text-xs text-text-secondary animate-pulse",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin text-brand" }), " Saving progress…"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center text-xs text-text-secondary font-medium mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-brand font-semibold",
						children: [
							"STEP ",
							step,
							" OF 4"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-border-c",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-brand",
						children: [completionPct, "% Complete"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-semibold text-text-primary",
				children: [
					step === 1 && "1. Business Verification",
					step === 2 && "2. General Info",
					step === 3 && "3. Leadership & Organization",
					step === 4 && "4. Financial Info"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-2 mb-2",
			children: [
				1,
				2,
				3,
				4
			].map((s) => {
				const isClickable = s < step;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !isClickable,
					onClick: () => {
						if (isClickable) onJumpToStep(s);
					},
					className: `h-2 rounded-full transition-all duration-300 ${s === step ? "bg-brand shadow-xs" : s < step ? "bg-brand/50 hover:bg-brand/70 cursor-pointer" : "bg-border cursor-default"} ${!isClickable ? "cursor-default" : ""}`,
					title: isClickable ? `Jump to Step ${s}` : void 0
				}, s);
			})
		})]
	})] });
}
function OnboardingBottomNav({ step, savingDraft, submitting, isCurrentStepValid, uploadingDocType, deletingDocId, onPrevStep, onNextStep, onFinalSubmit }) {
	const isBusy = Boolean(savingDraft || submitting || uploadingDocType || deletingDocId);
	const isDisabled = isBusy || !isCurrentStepValid;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 pt-4 border-t border-border flex items-center justify-center gap-4",
		children: [step > 1 && step < 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onPrevStep,
			disabled: isBusy,
			className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface-alt transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
		}), step < 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onNextStep,
			disabled: isDisabled,
			className: "inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 px-10 text-sm font-semibold text-white shadow-brand hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-w-45",
			children: savingDraft ? step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Analyzing..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Saving..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				step === 4 ? "Save & Review" : "Save & Continue",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
			] })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onFinalSubmit,
			disabled: isDisabled,
			className: "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient py-2.5 px-10 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-w-50",
			children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Completing..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Complete Onboarding ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })] })
		})]
	});
}
var BUSINESS_CATEGORIES = [
	"Retail & E-commerce",
	"Manufacturing",
	"Food & Hospitality",
	"Professional Services",
	"Healthcare",
	"Education",
	"Construction & Real Estate",
	"Logistics & Transportation",
	"Technology & IT",
	"Others"
];
var BUSINESS_TYPES = [
	"Proprietorship",
	"Partnership",
	"LLP",
	"Private Limited",
	"Public Limited",
	"OPC",
	"Trust / NGO",
	"Society"
];
var BUSINESS_MODELS = [
	"B2B",
	"B2C",
	"B2B + B2C",
	"D2C"
];
var ACCOUNTING_SOFTWARES = [
	"Tally",
	"Zoho Books",
	"Busy",
	"SAP",
	"Marg ERP",
	"QuickBooks",
	"None",
	"Others"
];
var DIGITAL_PAYMENT_METHODS = [
	"UPI",
	"POS",
	"NEFT",
	"RTGS",
	"IMPS",
	"Net Banking"
];
var INDIAN_STATES = [
	"Andhra Pradesh",
	"Arunachal Pradesh",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttar Pradesh",
	"Uttarakhand",
	"West Bengal",
	"Delhi",
	"Chandigarh",
	"Puducherry"
];
var MANDATORY_DOCUMENTS = [{
	typeKey: "business_pan",
	label: "Business PAN Card",
	why: "Verify business identity"
}, {
	typeKey: "registration_proof",
	label: "Business Registration Proof",
	why: "Certificate of Incorporation / Partnership Deed / LLP Certificate / Shop Registration"
}];
var OPTIONAL_DOCUMENTS = [
	{
		typeKey: "gst_certificate",
		label: "GST Registration Certificate",
		why: "Tax verification",
		isOptional: true
	},
	{
		typeKey: "udyam_certificate",
		label: "Udyam / MSME Certificate",
		why: "MSME verification",
		isOptional: true
	},
	{
		typeKey: "cancelled_cheque",
		label: "Cancelled Cheque",
		why: "Verify business bank account",
		isOptional: true
	},
	{
		typeKey: "address_proof",
		label: "Business Address Proof",
		why: "Verify registered address",
		isOptional: true
	}
];
var CATEGORY_RECOMMENDED_DOCUMENTS = {
	"Retail & E-commerce": [
		{
			typeKey: "rec_trade_license",
			label: "Trade License",
			why: "Verify local trading operation",
			isOptional: true
		},
		{
			typeKey: "rec_shop_est",
			label: "Shop & Establishment Certificate",
			why: "Verify commercial establishment",
			isOptional: true
		},
		{
			typeKey: "rec_brand_auth",
			label: "Brand Authorization Letter",
			why: "Verify brand rights (Optional)",
			isOptional: true
		},
		{
			typeKey: "rec_marketplace_reg",
			label: "Marketplace Registration (Amazon/Flipkart)",
			why: "Verify online presence (Optional)",
			isOptional: true
		}
	],
	Manufacturing: [
		{
			typeKey: "rec_factory_license",
			label: "Factory License",
			why: "Verify manufacturing operations",
			isOptional: true
		},
		{
			typeKey: "rec_factory_reg",
			label: "Factory Registration Certificate",
			why: "Verify legal factory premise",
			isOptional: true
		},
		{
			typeKey: "rec_pollution_noc",
			label: "Pollution Control Board Consent",
			why: "Environmental compliance",
			isOptional: true
		},
		{
			typeKey: "rec_fire_noc",
			label: "Fire NOC",
			why: "Safety compliance",
			isOptional: true
		},
		{
			typeKey: "rec_iso_cert",
			label: "ISO Certificate",
			why: "Quality management (Optional)",
			isOptional: true
		}
	],
	"Food & Hospitality": [
		{
			typeKey: "rec_fssai",
			label: "FSSAI License",
			why: "Food safety compliance",
			isOptional: true
		},
		{
			typeKey: "rec_health_trade",
			label: "Health Trade License",
			why: "Municipal health clearance",
			isOptional: true
		},
		{
			typeKey: "rec_fire_noc",
			label: "Fire NOC",
			why: "Premise fire safety",
			isOptional: true
		},
		{
			typeKey: "rec_liquor_license",
			label: "Liquor License",
			why: "Permit for beverage sales (if applicable)",
			isOptional: true
		}
	],
	Healthcare: [
		{
			typeKey: "rec_clinical_reg",
			label: "Clinical Establishment Registration",
			why: "Verify healthcare facility",
			isOptional: true
		},
		{
			typeKey: "rec_drug_license",
			label: "Drug License",
			why: "Permit for pharma storage & distribution",
			isOptional: true
		},
		{
			typeKey: "rec_medical_council",
			label: "Medical Council Registration",
			why: "Practitioner validation (if applicable)",
			isOptional: true
		},
		{
			typeKey: "rec_nabh_acc",
			label: "NABH Accreditation",
			why: "Hospital quality standard (Optional)",
			isOptional: true
		}
	],
	Education: [
		{
			typeKey: "rec_inst_reg",
			label: "Institution Registration Certificate",
			why: "Verify educational institution",
			isOptional: true
		},
		{
			typeKey: "rec_affiliation_cert",
			label: "Affiliation Certificate",
			why: "Board/University recognition",
			isOptional: true
		},
		{
			typeKey: "rec_trust_society",
			label: "Trust / Society Registration",
			why: "Verify non-profit educational body",
			isOptional: true
		},
		{
			typeKey: "rec_aicte_approval",
			label: "AICTE Approval",
			why: "Technical education approval (if applicable)",
			isOptional: true
		}
	],
	"Construction & Real Estate": [
		{
			typeKey: "rec_contractor_reg",
			label: "Contractor Registration",
			why: "Civil contractor clearance",
			isOptional: true
		},
		{
			typeKey: "rec_labour_license",
			label: "Labour License",
			why: "Workforce regulatory compliance",
			isOptional: true
		},
		{
			typeKey: "rec_rera_reg",
			label: "RERA Registration",
			why: "Real estate regulatory compliance (if applicable)",
			isOptional: true
		},
		{
			typeKey: "rec_fire_safety",
			label: "Fire Safety Certificate",
			why: "Construction site safety",
			isOptional: true
		}
	],
	"Logistics & Transportation": [
		{
			typeKey: "rec_goods_permit",
			label: "Goods Carrier Permit",
			why: "Freight transport authorization",
			isOptional: true
		},
		{
			typeKey: "rec_fleet_reg",
			label: "Fleet Registration",
			why: "Commercial vehicle verification",
			isOptional: true
		},
		{
			typeKey: "rec_vehicle_ins",
			label: "Vehicle Insurance",
			why: "Transit safety insurance",
			isOptional: true
		},
		{
			typeKey: "rec_transport_lic",
			label: "Transport License",
			why: "Logistics operation clearance",
			isOptional: true
		}
	],
	"Technology & IT": [
		{
			typeKey: "rec_startup_india",
			label: "Startup India Recognition",
			why: "Govt startup benefits (Optional)",
			isOptional: true
		},
		{
			typeKey: "rec_dpiit",
			label: "DPIIT Recognition",
			why: "Tax & regulatory perks (Optional)",
			isOptional: true
		},
		{
			typeKey: "rec_iso_27001",
			label: "ISO 27001 Certificate",
			why: "Information security standard (Optional)",
			isOptional: true
		},
		{
			typeKey: "rec_soc2",
			label: "SOC 2 Report",
			why: "Data privacy assurance (Optional)",
			isOptional: true
		}
	],
	"Professional Services": [
		{
			typeKey: "rec_icai_reg",
			label: "ICAI Registration",
			why: "CA Firm validation",
			isOptional: true
		},
		{
			typeKey: "rec_bar_council",
			label: "Bar Council Registration",
			why: "Law firm validation",
			isOptional: true
		},
		{
			typeKey: "rec_medical_council",
			label: "Medical Council Registration",
			why: "Medical practice validation",
			isOptional: true
		},
		{
			typeKey: "rec_sebi_reg",
			label: "SEBI Registration",
			why: "Financial advisory validation",
			isOptional: true
		},
		{
			typeKey: "rec_prof_tax",
			label: "Professional Tax Registration",
			why: "State tax compliance (where applicable)",
			isOptional: true
		}
	],
	Others: [{
		typeKey: "rec_industry_lic",
		label: "Industry Specific License / Certification",
		why: "Relevant business registration",
		isOptional: true
	}]
};
function DocumentUploadCard({ req, uploadedDocs, uploadingDocType, deletingDocId, onUpload, onDelete }) {
	const fileInputRef = (0, import_react.useRef)(null);
	const [isDragOver, setIsDragOver] = (0, import_react.useState)(false);
	const existingDoc = uploadedDocs.find((d) => d.document_type === req.typeKey);
	const isUploading = uploadingDocType === req.typeKey;
	const isDeleting = Boolean(existingDoc && deletingDocId === existingDoc.id);
	const handleProcessFile = (file) => {
		const validation = validateFile(file);
		if (!validation.valid) {
			toast.error(validation.error || "Only PDF files are accepted for document verification.");
			return;
		}
		onUpload(file);
	};
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			e.target.value = "";
			handleProcessFile(file);
		}
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragOver(false);
		if (isUploading || isDeleting || uploadingDocType || deletingDocId) return;
		if (e.dataTransfer.files && e.dataTransfer.files[0]) handleProcessFile(e.dataTransfer.files[0]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		onDragOver: (e) => {
			e.preventDefault();
			setIsDragOver(true);
		},
		onDragLeave: () => setIsDragOver(false),
		onDrop: handleDrop,
		className: `rounded-xl border p-4 transition-all duration-150 ${isDragOver ? "border-brand bg-brand/5 shadow-xs" : existingDoc ? "border-success/40 bg-success/5 shadow-xs" : "border-border-c bg-surface hover:border-brand/40 shadow-xs"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-colors ${existingDoc ? "bg-success/15 text-success" : "bg-brand/10 text-brand"}`,
					children: existingDoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "font-semibold text-sm text-text-primary",
							children: [req.label, !req.isOptional && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive font-bold ml-1",
								children: "*"
							})]
						}), existingDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full px-2.5 py-0.5 text-xs font-semibold bg-success/20 text-success",
							children: "Uploaded"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary mt-1 leading-relaxed",
						children: req.why
					}),
					!existingDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-text-tertiary font-mono mt-1",
						children: "PDF only • Max 10MB"
					}),
					existingDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mt-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-text-primary truncate max-w-55",
							children: existingDoc.original_name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-text-secondary font-mono",
							children: [
								"• ",
								(existingDoc.file_size_bytes / 1024).toFixed(0),
								" KB"
							]
						})]
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 self-end sm:self-center shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					ref: fileInputRef,
					onChange: handleFileChange,
					className: "hidden",
					accept: ".pdf",
					disabled: Boolean(uploadingDocType) || Boolean(deletingDocId)
				}), existingDoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: Boolean(deletingDocId) || Boolean(uploadingDocType),
					onClick: () => onDelete(existingDoc.id),
					className: "flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
					children: isDeleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), " Removing…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"] })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: Boolean(uploadingDocType) || Boolean(deletingDocId),
					onClick: () => fileInputRef.current?.click(),
					className: "flex items-center gap-2 rounded-lg bg-surface border border-border-c px-4 py-2 text-xs font-semibold text-text-primary hover:bg-surface-alt hover:border-brand/40 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer",
					children: isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-brand" }), " Uploading…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5 text-brand" }), " Upload File"] })
				})]
			})]
		})
	});
}
function Step1Verification({ uploadedDocs, uploadingDocType, deletingDocId, onUpload, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl md:text-3xl font-bold text-foreground",
				children: "Business Verification"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-text-secondary mt-1",
				children: "Lightweight KYC verification for business identity."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl border border-border-c bg-surface-alt/60 p-3.5 text-xs text-text-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-brand shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bank-grade 256-bit encryption. Documents are secured and never shared." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden sm:inline-flex items-center gap-1 font-semibold text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " SOC 2 / DPDP"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs font-semibold text-text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Required Verification Documents" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-text-secondary font-normal",
						children: "Accepted: PDF only (Max 10MB)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: MANDATORY_DOCUMENTS.map((docReq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentUploadCard, {
						req: docReq,
						uploadedDocs,
						uploadingDocType,
						deletingDocId,
						onUpload: (file) => onUpload(file, docReq.typeKey, "mandatory"),
						onDelete
					}, docReq.typeKey))
				})]
			})
		]
	});
}
function Step2GeneralInfo({ state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl md:text-3xl font-bold text-foreground",
			children: "General Info"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-text-secondary mt-1",
			children: "Identify your business and create its legal profile."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-b border-border-c pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "1. Legal Business Entity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Registered identity & statutory numbers"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-4 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Company / Enterprise Name",
									required: true,
									error: state.errors?.company_name,
									value: state.companyName,
									onChange: (e) => {
										state.setCompanyName(e.target.value);
										state.clearError?.("company_name");
									},
									placeholder: "Acme Technologies Pvt Ltd"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
								label: "Business Category",
								required: true,
								error: state.errors?.business_category,
								value: state.businessCategory,
								onValueChange: (val) => {
									state.setBusinessCategory(val);
									state.clearError?.("business_category");
								},
								options: BUSINESS_CATEGORIES,
								placeholder: "Select Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
								label: "Business Legal Type",
								required: true,
								error: state.errors?.business_type,
								value: state.businessType,
								onValueChange: (val) => {
									state.setBusinessType(val);
									state.clearError?.("business_type");
								},
								options: BUSINESS_TYPES,
								placeholder: "Select Legal Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Business PAN",
								required: true,
								error: state.errors?.business_pan,
								maxLength: 10,
								value: state.businessPan,
								onChange: (e) => {
									state.setBusinessPan(e.target.value.toUpperCase());
									state.clearError?.("business_pan");
								},
								placeholder: "ABCDE1234F",
								className: "uppercase tracking-wider font-mono"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "GSTIN",
								optional: true,
								error: state.errors?.gstin,
								maxLength: 15,
								value: state.gstin,
								onChange: (e) => {
									state.setGstin(e.target.value.toUpperCase());
									state.clearError?.("gstin");
								},
								placeholder: "27AAACB1234C1ZV",
								className: "uppercase font-mono"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Corporate Identification Number (CIN)",
								optional: true,
								error: state.errors?.cin,
								value: state.cin,
								onChange: (e) => {
									state.setCin(e.target.value);
									state.clearError?.("cin");
								},
								placeholder: "U72200MH2021PTC123456",
								className: "font-mono"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Udyam / MSME Number",
								optional: true,
								error: state.errors?.udyam_number,
								value: state.udyamNumber,
								onChange: (e) => {
									state.setUdyamNumber(e.target.value);
									state.clearError?.("udyam_number");
								},
								placeholder: "UDYAM-MH-01-0000000",
								className: "font-mono"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Date of Incorporation",
									optional: true,
									type: "date",
									error: state.errors?.date_of_incorporation,
									value: state.dateOfIncorporation,
									onChange: (e) => {
										state.setDateOfIncorporation(e.target.value);
										state.clearError?.("date_of_incorporation");
									}
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-b border-border-c pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "2. Official Contact Channels"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Primary business communication channels"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-4 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Official Work Email",
								type: "email",
								required: true,
								error: state.errors?.official_email,
								value: state.officialEmail,
								onChange: (e) => {
									state.setOfficialEmail(e.target.value);
									state.clearError?.("official_email");
								},
								placeholder: "contact@acme.com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Official Contact Phone",
								type: "tel",
								required: true,
								error: state.errors?.official_phone,
								value: state.officialPhone,
								onChange: (e) => {
									state.setOfficialPhone(e.target.value);
									state.clearError?.("official_phone");
								},
								placeholder: "+91 98765 43210"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Company Website",
									optional: true,
									type: "url",
									error: state.errors?.website,
									value: state.website,
									onChange: (e) => {
										state.setWebsite(e.target.value);
										state.clearError?.("website");
									},
									placeholder: "https://www.acme.com"
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-b border-border-c pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "3. Business Addresses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Registered office & operational location"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-4 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormTextarea, {
									label: "Registered Business Address",
									rows: 2,
									required: true,
									error: state.errors?.registered_address,
									value: state.registeredAddress,
									onChange: (e) => {
										state.setRegisteredAddress(e.target.value);
										state.clearError?.("registered_address");
									},
									placeholder: "Building No, Street, Landmark, Area"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormTextarea, {
									label: "Operational Address",
									rows: 2,
									optional: true,
									helperText: "Provide if operating address differs from registered office.",
									error: state.errors?.operational_address,
									value: state.operationalAddress,
									onChange: (e) => {
										state.setOperationalAddress(e.target.value);
										state.clearError?.("operational_address");
									},
									placeholder: "Warehouse / Branch / Factory Address"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
								label: "State / Union Territory",
								required: true,
								error: state.errors?.state,
								value: state.stateName,
								onValueChange: (val) => {
									state.setStateName(val);
									state.clearError?.("state");
								},
								options: INDIAN_STATES,
								placeholder: "Select State"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "City",
								required: true,
								error: state.errors?.city,
								value: state.city,
								onChange: (e) => {
									state.setCity(e.target.value);
									state.clearError?.("city");
								},
								placeholder: "Mumbai"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "PIN Code",
									required: true,
									error: state.errors?.pincode,
									maxLength: 6,
									value: state.pincode,
									onChange: (e) => {
										state.setPincode(e.target.value.replace(/\D/g, ""));
										state.clearError?.("pincode");
									},
									placeholder: "400001",
									className: "font-mono max-w-xs"
								})
							})
						]
					})]
				})
			]
		})]
	});
}
var EMPLOYEE_RANGES = [
	{
		label: "1-10 Employees",
		value: "1-10"
	},
	{
		label: "11-50 Employees",
		value: "11-50"
	},
	{
		label: "51-200 Employees",
		value: "51-200"
	},
	{
		label: "201-500 Employees",
		value: "201-500"
	},
	{
		label: "500+ Employees",
		value: "500+"
	}
];
function Step3Leadership({ state }) {
	const sendInviteMutation = useSendInvite();
	const currentCfoEmail = state.cfoEmail.trim().toLowerCase();
	const existingCfoInvite = state.teamInvites.find((i) => i.role === "cfo" && i.email.trim().toLowerCase() === currentCfoEmail);
	const isCfoInviteSent = Boolean(existingCfoInvite);
	const canCheckCfo = state.cfoName.trim() !== "" && currentCfoEmail !== "";
	const handleCfoInviteToggle = async (checked) => {
		if (isCfoInviteSent) return;
		if (checked) {
			if (!canCheckCfo) {
				toast.error("Please fill in both Full Name and Email Address first.");
				return;
			}
			try {
				const res = await sendInviteMutation.mutateAsync({
					email: currentCfoEmail,
					role: "cfo",
					full_name: state.cfoName.trim()
				});
				toast.success(res?.message || "CFO invitation sent successfully!");
				state.setInviteCfo(true);
			} catch (err) {
				toast.error(err?.response?.data?.message || err?.message || "Failed to send CFO invite");
			}
		} else state.setInviteCfo(false);
	};
	const currentHrEmail = state.hrEmail.trim().toLowerCase();
	const existingHrInvite = state.teamInvites.find((i) => i.role === "hr" && i.email.trim().toLowerCase() === currentHrEmail);
	const isHrInviteSent = Boolean(existingHrInvite);
	const canCheckHr = state.hrName.trim() !== "" && currentHrEmail !== "";
	const handleHrInviteToggle = async (checked) => {
		if (isHrInviteSent) return;
		if (checked) {
			if (!canCheckHr) {
				toast.error("Please fill in both Full Name and Email Address first.");
				return;
			}
			try {
				const res = await sendInviteMutation.mutateAsync({
					email: currentHrEmail,
					role: "hr",
					full_name: state.hrName.trim()
				});
				toast.success(res?.message || "HR invitation sent successfully!");
				state.setInviteHr(true);
			} catch (err) {
				toast.error(err?.response?.data?.message || err?.message || "Failed to send HR invite");
			}
		} else state.setInviteHr(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl md:text-3xl font-bold text-foreground",
			children: "Leadership & Organization"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-text-secondary mt-1",
			children: "Add details about your leadership and invite your CFO and HR to collaborate on SpotLite."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-semibold text-text-primary px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1. Executive Leadership & Signatories" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 border-b border-border-c pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm text-foreground",
								children: "CEO / Founder Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-text-secondary",
								children: "Primary signatory and enterprise owner"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid md:grid-cols-2 gap-4 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Full Legal Name",
									required: true,
									error: state.errors?.founder_ceo_name,
									value: state.ceoName,
									onChange: (e) => {
										state.setCeoName(e.target.value);
										state.clearError?.("founder_ceo_name");
									},
									placeholder: "e.g. Rajesh Kumar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Email Address",
									optional: true,
									type: "email",
									error: state.errors?.founder_ceo_email,
									value: state.ceoEmail,
									onChange: (e) => {
										state.setCeoEmail(e.target.value);
										state.clearError?.("founder_ceo_email");
									},
									placeholder: "e.g. ceo@company.com"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Contact Phone",
									optional: true,
									type: "tel",
									error: state.errors?.founder_ceo_phone,
									value: state.ceoPhone,
									onChange: (e) => {
										state.setCeoPhone(e.target.value);
										state.clearError?.("founder_ceo_phone");
									},
									placeholder: "+91 98765 43210"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									label: "Designation / Title",
									optional: true,
									error: state.errors?.founder_ceo_designation,
									value: state.ceoDesignation,
									onChange: (e) => {
										state.setCeoDesignation(e.target.value);
										state.clearError?.("founder_ceo_designation");
									},
									placeholder: "e.g. CEO / Managing Director"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border-c pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-sm text-foreground",
										children: "Chief Financial Officer (CFO)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-text-secondary",
										children: "Financial oversight & statement reconciliation"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: `flex items-center gap-2 select-none px-3 py-1.5 rounded-lg border transition ${isCfoInviteSent || !canCheckCfo || sendInviteMutation.isPending ? "bg-surface-alt/50 border-border-c/50 opacity-60 cursor-not-allowed" : "bg-surface-alt border-border-c hover:bg-surface cursor-pointer"}`,
									title: !canCheckCfo ? "Please fill Full Name and Email Address to invite" : isCfoInviteSent ? `Invite already sent to ${existingCfoInvite?.email}` : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: isCfoInviteSent || state.inviteCfo && Boolean(currentCfoEmail),
										disabled: isCfoInviteSent || !canCheckCfo || sendInviteMutation.isPending,
										onChange: (e) => handleCfoInviteToggle(e.target.checked),
										className: "h-4 w-4 rounded border-border-c text-brand focus:ring-brand/30 accent-brand disabled:cursor-not-allowed"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-text-primary",
										children: "Invite to SpotLite"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-4 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Full Name",
										optional: true,
										error: state.errors?.cfo_name,
										value: state.cfoName,
										onChange: (e) => {
											state.setCfoName(e.target.value);
											state.clearError?.("cfo_name");
										},
										placeholder: "e.g. Vikramaditya Sharma"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Email Address",
										optional: true,
										type: "email",
										error: state.errors?.cfo_email,
										value: state.cfoEmail,
										onChange: (e) => {
											state.setCfoEmail(e.target.value);
											state.clearError?.("cfo_email");
											state.setInviteCfo(false);
										},
										placeholder: "e.g. cfo@company.com"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Phone Number",
										optional: true,
										type: "tel",
										error: state.errors?.cfo_phone,
										value: state.cfoPhone,
										onChange: (e) => {
											state.setCfoPhone(e.target.value);
											state.clearError?.("cfo_phone");
										},
										placeholder: "+91 98765 43211"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Designation",
										optional: true,
										error: state.errors?.cfo_designation,
										value: state.cfoDesignation,
										onChange: (e) => {
											state.setCfoDesignation(e.target.value);
											state.clearError?.("cfo_designation");
										},
										placeholder: "Chief Financial Officer"
									})
								]
							}),
							existingCfoInvite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 text-xs text-text-secondary",
								children: [
									"Invite Status:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold capitalize text-brand",
										children: existingCfoInvite.status
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border-c pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-sm text-foreground",
										children: "Human Resources (HR)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-text-secondary",
										children: "Workforce payroll & vendor compliance"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: `flex items-center gap-2 select-none px-3 py-1.5 rounded-lg border transition ${isHrInviteSent || !canCheckHr || sendInviteMutation.isPending ? "bg-surface-alt/50 border-border-c/50 opacity-60 cursor-not-allowed" : "bg-surface-alt border-border-c hover:bg-surface cursor-pointer"}`,
									title: !canCheckHr ? "Please fill Full Name and Email Address to invite" : isHrInviteSent ? `Invite already sent to ${existingHrInvite?.email}` : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: isHrInviteSent || state.inviteHr && Boolean(currentHrEmail),
										disabled: isHrInviteSent || !canCheckHr || sendInviteMutation.isPending,
										onChange: (e) => handleHrInviteToggle(e.target.checked),
										className: "h-4 w-4 rounded border-border-c text-brand focus:ring-brand/30 accent-brand disabled:cursor-not-allowed"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-text-primary",
										children: "Invite to SpotLite"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-4 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Full Name",
										optional: true,
										error: state.errors?.hr_name,
										value: state.hrName,
										onChange: (e) => {
											state.setHrName(e.target.value);
											state.clearError?.("hr_name");
										},
										placeholder: "e.g. Jane Doe"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Email Address",
										optional: true,
										type: "email",
										error: state.errors?.hr_email,
										value: state.hrEmail,
										onChange: (e) => {
											state.setHrEmail(e.target.value);
											state.clearError?.("hr_email");
											state.setInviteHr(false);
										},
										placeholder: "e.g. hr@company.com"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Phone Number",
										optional: true,
										type: "tel",
										error: state.errors?.hr_phone,
										value: state.hrPhone,
										onChange: (e) => {
											state.setHrPhone(e.target.value);
											state.clearError?.("hr_phone");
										},
										placeholder: "+91 98765 43212"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										label: "Designation",
										optional: true,
										error: state.errors?.hr_designation,
										value: state.hrDesignation,
										onChange: (e) => {
											state.setHrDesignation(e.target.value);
											state.clearError?.("hr_designation");
										},
										placeholder: "Head of HR / People Ops"
									})
								]
							}),
							existingHrInvite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 text-xs text-text-secondary",
								children: [
									"Invite Status:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold capitalize text-brand",
										children: existingHrInvite.status
									})
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 border-b border-border-c pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-sm text-foreground",
						children: "2. Operational Scale & Business Model"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary",
						children: "Workforce scale, market orientation, and business scope"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-4 pt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
							label: "Workforce / Employee Scale",
							optional: true,
							error: state.errors?.number_of_employees,
							value: state.numberOfEmployees,
							onValueChange: (val) => {
								state.setNumberOfEmployees(val);
								state.clearError?.("number_of_employees");
							},
							options: EMPLOYEE_RANGES,
							placeholder: "Select workforce range"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Number of Branches / Locations",
							optional: true,
							type: "number",
							min: 1,
							error: state.errors?.number_of_branches,
							value: state.numberOfBranches,
							onChange: (e) => {
								state.setNumberOfBranches(e.target.value);
								state.clearError?.("number_of_branches");
							},
							placeholder: "1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
							label: "Business Revenue Model",
							optional: true,
							error: state.errors?.business_model,
							value: state.businessModel,
							onValueChange: (val) => {
								state.setBusinessModel(val);
								state.clearError?.("business_model");
							},
							options: BUSINESS_MODELS,
							placeholder: "Select revenue model"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Primary Product / Service Offering",
							optional: true,
							error: state.errors?.primary_product_service,
							value: state.primaryProductService,
							onChange: (e) => {
								state.setPrimaryProductService(e.target.value);
								state.clearError?.("primary_product_service");
							},
							placeholder: "e.g. SaaS Analytics, Logistics, Retail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormTextarea, {
								label: "Business Description / Summary",
								optional: true,
								rows: 2,
								error: state.errors?.business_description,
								value: state.businessDescription,
								onChange: (e) => {
									state.setBusinessDescription(e.target.value);
									state.clearError?.("business_description");
								},
								placeholder: "Brief summary of operations, target market, or core business activities"
							})
						})
					]
				})]
			})]
		})]
	});
}
var ACCOUNT_OPTIONS = [
	{
		label: "1 Account",
		value: "1"
	},
	{
		label: "2 Accounts",
		value: "2"
	},
	{
		label: "3 Accounts",
		value: "3"
	},
	{
		label: "4 Accounts",
		value: "4"
	},
	{
		label: "5+ Accounts",
		value: "5+"
	}
];
function Step4FinancialInfo({ state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl md:text-3xl font-bold text-foreground",
			children: "Financial Info"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-text-secondary mt-1",
			children: "Configure banking, accounts, accounting tools, and transaction channels."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-b border-border-c pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "1. Primary Banking Accounts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Operating current accounts and banking partner"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-4 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "Primary Business Bank",
							optional: true,
							error: state.errors?.primary_bank,
							value: state.primaryBank,
							onChange: (e) => {
								state.setPrimaryBank(e.target.value);
								state.clearError?.("primary_bank");
							},
							placeholder: "e.g. State Bank of India, HDFC Bank"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
							label: "Number of Business Bank Accounts",
							optional: true,
							error: state.errors?.number_of_accounts,
							value: state.numberOfAccounts,
							onValueChange: (val) => {
								state.setNumberOfAccounts(val);
								state.clearError?.("number_of_accounts");
							},
							options: ACCOUNT_OPTIONS,
							placeholder: "Select number of accounts"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-b border-border-c pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "2. Credit & Borrowing Facilities"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Existing working capital lines and corporate credit cards"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-4 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-semibold text-text-primary",
								children: "Active Business Loan / Cash Credit / Overdraft?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => state.setHasBusinessLoan(true),
									className: `flex-1 rounded-lg border py-2 text-xs font-semibold transition cursor-pointer shadow-xs ${state.hasBusinessLoan === true ? "border-brand bg-brand text-on-brand" : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"}`,
									children: "Yes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => state.setHasBusinessLoan(false),
									className: `flex-1 rounded-lg border py-2 text-xs font-semibold transition cursor-pointer shadow-xs ${state.hasBusinessLoan === false ? "border-brand bg-brand text-on-brand" : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"}`,
									children: "No"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-semibold text-text-primary",
								children: "Corporate / Commercial Credit Cards?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => state.setHasBusinessCreditCard(true),
									className: `flex-1 rounded-lg border py-2 text-xs font-semibold transition cursor-pointer shadow-xs ${state.hasBusinessCreditCard === true ? "border-brand bg-brand text-on-brand" : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"}`,
									children: "Yes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => state.setHasBusinessCreditCard(false),
									className: `flex-1 rounded-lg border py-2 text-xs font-semibold transition cursor-pointer shadow-xs ${state.hasBusinessCreditCard === false ? "border-brand bg-brand text-on-brand" : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"}`,
									children: "No"
								})]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 border-b border-border-c pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm text-foreground",
							children: "3. Accounting & Transaction Channels"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "Ledger system and customer payment rails"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
							label: "Primary Accounting / ERP Software",
							optional: true,
							value: state.accountingSoftware,
							onValueChange: (val) => state.setAccountingSoftware(val),
							options: ACCOUNTING_SOFTWARES,
							placeholder: "Select software"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-text-primary tracking-tight",
									children: "Accepted Digital Payment Channels"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-normal text-text-tertiary",
									children: "Select all that apply"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: DIGITAL_PAYMENT_METHODS.map((pm) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => state.togglePaymentMethod(pm),
										className: `rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer shadow-xs ${state.digitalPaymentMethods.includes(pm) ? "border-brand bg-brand/10 text-brand font-bold" : "border-border-c bg-surface text-text-secondary hover:bg-surface-alt"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pm })
									}, pm);
								})
							})]
						})]
					})]
				})
			]
		})]
	});
}
function Step5ReviewComplete({ generalState, leadershipState, financialState, uploadedDocs, uploadingDocType, deletingDocId, completionPct, onJumpToStep, onEditSection, onUpload, onDelete }) {
	const [showSecondaryDocs, setShowSecondaryDocs] = (0, import_react.useState)(false);
	const recommendedDocs = CATEGORY_RECOMMENDED_DOCUMENTS[generalState.businessCategory] || CATEGORY_RECOMMENDED_DOCUMENTS["Others"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl md:text-3xl font-bold text-foreground",
				children: "Review & Complete"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-text-secondary mt-1",
				children: "Review your company profile before final activation."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-brand/5 p-5 border border-brand/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-on-brand font-bold text-md font-mono shadow-sm",
						children: [completionPct, "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-sm text-text-primary",
						children: "Onboarding Readiness"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary",
						children: "Core business verification & configuration details captured."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-success/15 border border-success/30 px-3 py-1 text-xs font-semibold text-success flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " Ready for Activation"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border-c bg-surface p-5 space-y-3.5 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center border-b border-border-c pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-sm flex items-center gap-2 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 text-brand" }), " 1. Company Profile"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onEditSection(2),
								className: "text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer bg-brand/5 px-2.5 py-1 rounded-md border border-brand/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3 w-3" }), " Edit"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Company Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-text-primary",
									children: generalState.companyName || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-text-primary",
									children: generalState.businessCategory
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Legal Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-text-primary",
									children: generalState.businessType
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Business PAN"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-semibold text-text-primary",
									children: generalState.businessPan || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Official Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-text-primary",
									children: generalState.officialEmail || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Location"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-text-primary",
									children: generalState.city ? `${generalState.city}, ${generalState.stateName}` : generalState.stateName
								})] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border-c bg-surface p-5 space-y-3.5 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center border-b border-border-c pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-semibold text-sm flex items-center gap-2 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-4 w-4 text-brand" }), " 2. Leadership & Team"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onEditSection(3),
									className: "text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer bg-brand/5 px-2.5 py-1 rounded-md border border-brand/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3 w-3" }), " Edit"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs",
								children: [
									leadershipState.ceoName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border-c p-3 bg-surface-alt/60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-brand font-bold block mb-1",
												children: "CEO / Founder"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-text-primary block",
												children: leadershipState.ceoName
											}),
											leadershipState.ceoEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-text-secondary block truncate",
												children: leadershipState.ceoEmail
											}),
											leadershipState.ceoDesignation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-text-secondary block",
												children: leadershipState.ceoDesignation
											})
										]
									}),
									leadershipState.cfoName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border-c p-3 bg-surface-alt/60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-brand font-bold block mb-1",
												children: "CFO"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-text-primary block",
												children: leadershipState.cfoName
											}),
											leadershipState.cfoEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-text-secondary block truncate",
												children: leadershipState.cfoEmail
											}),
											leadershipState.inviteCfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-2 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand capitalize",
												children: leadershipState.teamInvites.find((i) => i.role === "cfo")?.status || "Invite Pending"
											})
										]
									}),
									leadershipState.hrName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border-c p-3 bg-surface-alt/60",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-brand font-bold block mb-1",
												children: "HR"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-text-primary block",
												children: leadershipState.hrName
											}),
											leadershipState.hrEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-text-secondary block truncate",
												children: leadershipState.hrEmail
											}),
											leadershipState.inviteHr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-2 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand capitalize",
												children: leadershipState.teamInvites.find((i) => i.role === "hr")?.status || "Invite Pending"
											})
										]
									})
								]
							}),
							(leadershipState.numberOfEmployees || leadershipState.businessModel || leadershipState.primaryProductService) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border-c pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs",
								children: [
									leadershipState.numberOfEmployees && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-text-secondary block font-medium",
										children: "Workforce"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-text-primary",
										children: leadershipState.numberOfEmployees
									})] }),
									leadershipState.numberOfBranches && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-text-secondary block font-medium",
										children: "Branches"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-text-primary",
										children: leadershipState.numberOfBranches
									})] }),
									leadershipState.businessModel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-text-secondary block font-medium",
										children: "Business Model"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-text-primary",
										children: leadershipState.businessModel
									})] })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border-c bg-surface p-5 space-y-3.5 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center border-b border-border-c pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-sm flex items-center gap-2 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-brand" }), " 3. Banking & Ledger Setup"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onEditSection(4),
								className: "text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer bg-brand/5 px-2.5 py-1 rounded-md border border-brand/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3 w-3" }), " Edit"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Primary Bank"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-text-primary",
									children: financialState.primaryBank || "Not specified"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Accounting System"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-text-primary",
									children: financialState.accountingSoftware
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-secondary block font-medium",
									children: "Payment Rails"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-text-primary truncate",
									children: financialState.digitalPaymentMethods.length ? financialState.digitalPaymentMethods.join(", ") : "None specified"
								})] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border-c bg-surface p-5 space-y-3.5 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center border-b border-border-c pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-sm flex items-center gap-2 text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "h-4 w-4 text-brand" }),
									" 4. Verified Verification Documents (",
									uploadedDocs.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onEditSection(1),
								className: "text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer bg-brand/5 px-2.5 py-1 rounded-md border border-brand/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3 w-3" }), " Edit"]
							})]
						}), uploadedDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-secondary",
							children: "No documents uploaded yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: uploadedDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border-c bg-surface-alt/60 p-3 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-brand shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-text-primary block",
										children: doc.original_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-text-secondary capitalize",
										children: [
											doc.document_type.replace(/_/g, " "),
											" •",
											" ",
											(doc.file_size_bytes / 1024).toFixed(0),
											" KB"
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success border border-success/30",
									children: "Uploaded"
								})]
							}, doc.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border-c bg-surface-alt/40 p-5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-semibold text-text-primary",
									children: "Additional Compliance Documents (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-secondary",
									children: "Optional tax certificates and industry-specific licenses"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowSecondaryDocs((prev) => !prev),
								className: "flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline px-3 py-1.5 rounded-lg border border-brand/20 bg-surface cursor-pointer shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showSecondaryDocs ? "Hide Documents" : "View Documents" }), showSecondaryDocs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })]
							})]
						}), showSecondaryDocs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 pt-2 border-t border-border-c animate-in fade-in duration-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-text-primary block",
									children: "General Tax & Banking Certificates"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2.5",
									children: OPTIONAL_DOCUMENTS.map((docReq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentUploadCard, {
										req: docReq,
										uploadedDocs,
										uploadingDocType,
										deletingDocId,
										onUpload: (file) => onUpload(file, docReq.typeKey, "optional"),
										onDelete
									}, docReq.typeKey))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold text-text-primary block",
									children: [
										"Industry Recommended (",
										generalState.businessCategory,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2.5",
									children: recommendedDocs.map((docReq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentUploadCard, {
										req: docReq,
										uploadedDocs,
										uploadingDocType,
										deletingDocId,
										onUpload: (file) => onUpload(file, docReq.typeKey, "recommended"),
										onDelete
									}, docReq.typeKey))
								})]
							})]
						})]
					})
				]
			})
		]
	});
}
var SECTION_TITLES = {
	1: "Verification Documents",
	2: "Company Profile",
	3: "Leadership & Team",
	4: "Banking & Ledger Setup"
};
var SECTION_DESCRIPTIONS = {
	1: "Manage your mandatory verification documents",
	2: "Update company registration and contact details",
	3: "Edit leadership roles and organizational structure",
	4: "Adjust banking, accounting, and payment preferences"
};
var SECTION_ICONS = {
	1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { size: 18 }),
	2: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 18 }),
	3: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 }),
	4: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { size: 18 })
};
function OnboardingModal({ isOpen, onClose, section }) {
	const { user, loading: authLoading } = useAuth();
	const queryClient = useQueryClient();
	const [step, setStep] = (0, import_react.useState)(section || 1);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [savingDraft, setSavingDraft] = (0, import_react.useState)(false);
	const [isInitializing, setIsInitializing] = (0, import_react.useState)(true);
	const [completionPct, setCompletionPct] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (isOpen && section) setStep(section);
	}, [isOpen, section]);
	const [generalErrors, setGeneralErrors] = (0, import_react.useState)({});
	const [leadershipErrors, setLeadershipErrors] = (0, import_react.useState)({});
	const [financialErrors, setFinancialErrors] = (0, import_react.useState)({});
	const clearGeneralError = (field) => {
		setGeneralErrors((prev) => {
			if (!prev[field]) return prev;
			const next = { ...prev };
			delete next[field];
			return next;
		});
	};
	const clearLeadershipError = (field) => {
		setLeadershipErrors((prev) => {
			if (!prev[field]) return prev;
			const next = { ...prev };
			delete next[field];
			return next;
		});
	};
	const clearFinancialError = (field) => {
		setFinancialErrors((prev) => {
			if (!prev[field]) return prev;
			const next = { ...prev };
			delete next[field];
			return next;
		});
	};
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [businessCategory, setBusinessCategory] = (0, import_react.useState)("Retail & E-commerce");
	const [businessType, setBusinessType] = (0, import_react.useState)("Private Limited");
	const [cin, setCin] = (0, import_react.useState)("");
	const [gstin, setGstin] = (0, import_react.useState)("");
	const [businessPan, setBusinessPan] = (0, import_react.useState)("");
	const [udyamNumber, setUdyamNumber] = (0, import_react.useState)("");
	const [dateOfIncorporation, setDateOfIncorporation] = (0, import_react.useState)("");
	const [registeredAddress, setRegisteredAddress] = (0, import_react.useState)("");
	const [operationalAddress, setOperationalAddress] = (0, import_react.useState)("");
	const [stateName, setStateName] = (0, import_react.useState)("Maharashtra");
	const [city, setCity] = (0, import_react.useState)("");
	const [pincode, setPincode] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [officialEmail, setOfficialEmail] = (0, import_react.useState)("");
	const [officialPhone, setOfficialPhone] = (0, import_react.useState)("");
	const [ceoName, setCeoName] = (0, import_react.useState)("");
	const [ceoEmail, setCeoEmail] = (0, import_react.useState)("");
	const [ceoPhone, setCeoPhone] = (0, import_react.useState)("");
	const [ceoDesignation, setCeoDesignation] = (0, import_react.useState)("");
	const [cfoName, setCfoName] = (0, import_react.useState)("");
	const [cfoEmail, setCfoEmail] = (0, import_react.useState)("");
	const [cfoPhone, setCfoPhone] = (0, import_react.useState)("");
	const [cfoDesignation, setCfoDesignation] = (0, import_react.useState)("");
	const [inviteCfo, setInviteCfo] = (0, import_react.useState)(false);
	const [hrName, setHrName] = (0, import_react.useState)("");
	const [hrEmail, setHrEmail] = (0, import_react.useState)("");
	const [hrPhone, setHrPhone] = (0, import_react.useState)("");
	const [hrDesignation, setHrDesignation] = (0, import_react.useState)("");
	const [inviteHr, setInviteHr] = (0, import_react.useState)(false);
	const [numberOfEmployees, setNumberOfEmployees] = (0, import_react.useState)("");
	const [numberOfBranches, setNumberOfBranches] = (0, import_react.useState)("");
	const [businessModel, setBusinessModel] = (0, import_react.useState)("");
	const [primaryProductService, setPrimaryProductService] = (0, import_react.useState)("");
	const [businessDescription, setBusinessDescription] = (0, import_react.useState)("");
	const [teamInvites, setTeamInvites] = (0, import_react.useState)([]);
	const [primaryBank, setPrimaryBank] = (0, import_react.useState)("");
	const [numberOfAccounts, setNumberOfAccounts] = (0, import_react.useState)("1");
	const [hasBusinessLoan, setHasBusinessLoan] = (0, import_react.useState)(null);
	const [hasBusinessCreditCard, setHasBusinessCreditCard] = (0, import_react.useState)(null);
	const [accountingSoftware, setAccountingSoftware] = (0, import_react.useState)("");
	const [digitalPaymentMethods, setDigitalPaymentMethods] = (0, import_react.useState)([]);
	const [uploadedDocs, setUploadedDocs] = (0, import_react.useState)([]);
	const [uploadingDocType, setUploadingDocType] = (0, import_react.useState)(null);
	const [deletingDocId, setDeletingDocId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
	}, [
		user,
		officialEmail,
		cfoName,
		cfoEmail,
		hrName,
		hrEmail,
		ceoName,
		ceoEmail
	]);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		let isMounted = true;
		async function loadExistingOnboarding() {
			try {
				const res = await api.get("/api/business/onboarding/me");
				if (res && isMounted) {
					if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
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
						if (l.number_of_employees) setNumberOfEmployees(l.number_of_employees);
						if (l.number_of_branches) setNumberOfBranches(l.number_of_branches);
						if (l.business_model) setBusinessModel(l.business_model);
						if (l.primary_product_service) setPrimaryProductService(l.primary_product_service);
						if (l.business_description) setBusinessDescription(l.business_description);
						if (l.cfo_name) setCfoName(l.cfo_name);
						if (l.cfo_email) setCfoEmail(l.cfo_email);
						if (l.cfo_phone) setCfoPhone(l.cfo_phone);
						if (l.cfo_designation) setCfoDesignation(l.cfo_designation);
						if (l.invite_cfo !== void 0) setInviteCfo(l.invite_cfo);
						if (l.hr_name) setHrName(l.hr_name);
						if (l.hr_email) setHrEmail(l.hr_email);
						if (l.hr_phone) setHrPhone(l.hr_phone);
						if (l.hr_designation) setHrDesignation(l.hr_designation);
						if (l.invite_hr !== void 0) setInviteHr(l.invite_hr);
					}
					if (res.financial_info) {
						const f = res.financial_info;
						if (f.primary_bank) setPrimaryBank(f.primary_bank);
						if (f.number_of_accounts) setNumberOfAccounts(String(f.number_of_accounts));
						if (f.has_business_loan !== void 0) setHasBusinessLoan(f.has_business_loan);
						if (f.has_business_credit_card !== void 0) setHasBusinessCreditCard(f.has_business_credit_card);
						if (f.accounting_software) setAccountingSoftware(f.accounting_software);
						if (f.digital_payment_methods && Array.isArray(f.digital_payment_methods)) setDigitalPaymentMethods(f.digital_payment_methods);
					}
					if (res.documents) setUploadedDocs(res.documents);
					if (res.team_invites) setTeamInvites(res.team_invites);
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
	const isGeneralInfoValid = companyName.trim().length >= 2 && Boolean(businessCategory) && Boolean(businessType) && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(businessPan.trim()) && registeredAddress.trim().length >= 5 && Boolean(stateName) && city.trim().length >= 2 && pincode.trim().length >= 6 && officialEmail.trim().includes("@") && officialPhone.trim().length >= 10;
	const isTeamInfoValid = ceoName.trim().length > 0;
	const isDocUploaded = (typeKey) => uploadedDocs.some((d) => d.document_type === typeKey);
	const isDocsValid = isDocUploaded("business_pan") && isDocUploaded("registration_proof");
	const isCurrentStepValid = (function() {
		if (step === 1) return isDocsValid;
		if (step === 2) return isGeneralInfoValid;
		if (step === 3) return isTeamInfoValid;
		if (step === 4) return true;
		return false;
	})();
	const saveStep1 = async () => {
		setGeneralErrors({});
		const payload = {
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
			official_phone: officialPhone.trim()
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
			const res = await api.post("/api/business/onboarding/step/1", payload);
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			return true;
		} catch (err) {
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
	const saveStep2 = async () => {
		setLeadershipErrors({});
		const shouldInviteCfo = Boolean(inviteCfo && cfoEmail.trim() && cfoName.trim());
		const shouldInviteHr = Boolean(inviteHr && hrEmail.trim() && hrName.trim());
		const payload = {
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
			invite_hr: shouldInviteHr
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
			const res = await api.post("/api/business/onboarding/step/2", payload);
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			if (res.team_invites) setTeamInvites(res.team_invites);
			return true;
		} catch (err) {
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
	const saveStep3 = async () => {
		setFinancialErrors({});
		const parsedNumAccounts = Number.parseInt(numberOfAccounts.replace(/\D/g, ""), 10) || 1;
		const payload = {
			primary_bank: primaryBank.trim() || null,
			number_of_accounts: parsedNumAccounts,
			has_business_loan: hasBusinessLoan,
			has_business_credit_card: hasBusinessCreditCard,
			accounting_software: accountingSoftware || null,
			digital_payment_methods: Array.isArray(digitalPaymentMethods) ? digitalPaymentMethods : []
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
			const res = await api.post("/api/business/onboarding/step/3", payload);
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			return true;
		} catch (err) {
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
	const handleFileUpload = async (file, docType, category) => {
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
			const res = await api.upload("/api/business/onboarding/documents/upload", formData);
			if (res.documents) setUploadedDocs(res.documents);
			else if (res.document) setUploadedDocs((prev) => {
				return [...prev.filter((d) => d.document_type !== docType), res.document];
			});
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			toast.success(`${file.name} uploaded successfully!`);
			queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to upload document."));
		} finally {
			setUploadingDocType(null);
		}
	};
	const handleDeleteDoc = async (docId) => {
		setDeletingDocId(docId);
		try {
			const res = await api.delete(`/api/business/onboarding/documents/${docId}`);
			setUploadedDocs((prev) => prev.filter((d) => d.id !== docId));
			queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			toast.success("Document removed.");
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to remove document."));
		} finally {
			setDeletingDocId(null);
		}
	};
	const handleEditSectionSave = async () => {
		if (savingDraft || submitting || uploadingDocType || deletingDocId) return;
		if (step === 1) {
			if (!isDocsValid) {
				toast.error("Please upload mandatory documents (Business PAN & Registration Proof).");
				return;
			}
			toast.success("Verification documents updated!");
			onClose();
		} else if (step === 2) {
			if (await saveStep1()) {
				toast.success("Company profile updated!");
				onClose();
			}
		} else if (step === 3) {
			if (await saveStep2()) {
				toast.success("Leadership info updated!");
				onClose();
			}
		} else if (step === 4) {
			if (await saveStep3()) {
				toast.success("Banking & ledger setup updated!");
				onClose();
			}
		}
	};
	const togglePaymentMethod = (method) => {
		setDigitalPaymentMethods((prev) => prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]);
	};
	const generalState = {
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
		clearError: clearGeneralError
	};
	const leadershipState = {
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
		clearError: clearLeadershipError
	};
	const financialState = {
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
		clearError: clearFinancialError
	};
	const isBusy = Boolean(savingDraft || submitting || uploadingDocType || deletingDocId);
	const isActionDisabled = isBusy || !isCurrentStepValid;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: .18 },
			className: "fixed inset-0 bg-black/60 backdrop-blur-xs",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .96,
				y: 10
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .96,
				y: 10
			},
			transition: {
				duration: .24,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			className: "relative z-10 w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-surface px-6 py-4 shrink-0 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/20",
							children: SECTION_ICONS[step]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 mb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
								size: 10,
								className: "text-brand"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-brand",
								children: "Editing"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm sm:text-base font-bold text-foreground leading-tight",
							children: SECTION_TITLES[step] || "Edit Section"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-alt transition cursor-pointer",
						"aria-label": "Close modal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 px-6 py-2.5 bg-brand/5 border-b border-brand/15 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-brand animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-text-secondary leading-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-brand",
								children: "Live Edit"
							}),
							" — ",
							SECTION_DESCRIPTIONS[step],
							". Changes apply only after you",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-text-primary",
								children: "Save Changes"
							}),
							"."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6",
					children: authLoading || isInitializing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
							message: "Loading profile workspace…",
							subMessage: "Secured Business Vault"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full",
						children: [
							step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step1Verification, {
								uploadedDocs,
								uploadingDocType,
								deletingDocId,
								onUpload: handleFileUpload,
								onDelete: handleDeleteDoc
							}),
							step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step2GeneralInfo, { state: generalState }),
							step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step3Leadership, { state: leadershipState }),
							step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step4FinancialInfo, { state: financialState })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border bg-surface px-6 py-4 shrink-0 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						disabled: isBusy,
						className: "inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-alt transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
						children: "Discard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleEditSectionSave,
						disabled: isActionDisabled,
						className: "inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 px-7 text-sm font-bold text-white shadow-brand hover:opacity-95 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-w-37.5",
						children: savingDraft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Saving..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Save Changes"] })
					})]
				})
			]
		})]
	}) });
}
/**
* Computes the initial resume step index (1-5) based on existing saved progress.
* Evaluates in forward order to land the user on their first incomplete step.
*/
function computeResumeStep(res) {
	if (!res) return 1;
	if (res.status === "completed") return 5;
	const docs = res.documents || [];
	const hasPan = docs.some((d) => d.document_type === "business_pan");
	const hasReg = docs.some((d) => d.document_type === "registration_proof");
	if (!(hasPan && hasReg)) return 1;
	if (!res.general_info) return 2;
	if (!res.leadership_info) return 3;
	if (!res.financial_info) return 4;
	return 5;
}
function OnboardingPage() {
	const { user, refreshUser } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [step, setStep] = (0, import_react.useState)(1);
	const [direction, setDirection] = (0, import_react.useState)(1);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [savingDraft, setSavingDraft] = (0, import_react.useState)(false);
	const [isInitializing, setIsInitializing] = (0, import_react.useState)(true);
	const [completionPct, setCompletionPct] = (0, import_react.useState)(0);
	const [editModalOpen, setEditModalOpen] = (0, import_react.useState)(false);
	const [editSectionStep, setEditSectionStep] = (0, import_react.useState)(2);
	const [generalErrors, setGeneralErrors] = (0, import_react.useState)({});
	const [leadershipErrors, setLeadershipErrors] = (0, import_react.useState)({});
	const [financialErrors, setFinancialErrors] = (0, import_react.useState)({});
	const clearGeneralError = (field) => {
		setGeneralErrors((prev) => {
			if (!prev[field]) return prev;
			const next = { ...prev };
			delete next[field];
			return next;
		});
	};
	const clearLeadershipError = (field) => {
		setLeadershipErrors((prev) => {
			if (!prev[field]) return prev;
			const next = { ...prev };
			delete next[field];
			return next;
		});
	};
	const clearFinancialError = (field) => {
		setFinancialErrors((prev) => {
			if (!prev[field]) return prev;
			const next = { ...prev };
			delete next[field];
			return next;
		});
	};
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [businessCategory, setBusinessCategory] = (0, import_react.useState)("Retail & E-commerce");
	const [businessType, setBusinessType] = (0, import_react.useState)("Private Limited");
	const [cin, setCin] = (0, import_react.useState)("");
	const [gstin, setGstin] = (0, import_react.useState)("");
	const [businessPan, setBusinessPan] = (0, import_react.useState)("");
	const [udyamNumber, setUdyamNumber] = (0, import_react.useState)("");
	const [dateOfIncorporation, setDateOfIncorporation] = (0, import_react.useState)("");
	const [registeredAddress, setRegisteredAddress] = (0, import_react.useState)("");
	const [operationalAddress, setOperationalAddress] = (0, import_react.useState)("");
	const [stateName, setStateName] = (0, import_react.useState)("Maharashtra");
	const [city, setCity] = (0, import_react.useState)("");
	const [pincode, setPincode] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [officialEmail, setOfficialEmail] = (0, import_react.useState)("");
	const [officialPhone, setOfficialPhone] = (0, import_react.useState)("");
	const [ceoName, setCeoName] = (0, import_react.useState)("");
	const [ceoEmail, setCeoEmail] = (0, import_react.useState)("");
	const [ceoPhone, setCeoPhone] = (0, import_react.useState)("");
	const [ceoDesignation, setCeoDesignation] = (0, import_react.useState)("");
	const [cfoName, setCfoName] = (0, import_react.useState)("");
	const [cfoEmail, setCfoEmail] = (0, import_react.useState)("");
	const [cfoPhone, setCfoPhone] = (0, import_react.useState)("");
	const [cfoDesignation, setCfoDesignation] = (0, import_react.useState)("");
	const [inviteCfo, setInviteCfo] = (0, import_react.useState)(false);
	const [hrName, setHrName] = (0, import_react.useState)("");
	const [hrEmail, setHrEmail] = (0, import_react.useState)("");
	const [hrPhone, setHrPhone] = (0, import_react.useState)("");
	const [hrDesignation, setHrDesignation] = (0, import_react.useState)("");
	const [inviteHr, setInviteHr] = (0, import_react.useState)(false);
	const [numberOfEmployees, setNumberOfEmployees] = (0, import_react.useState)("");
	const [numberOfBranches, setNumberOfBranches] = (0, import_react.useState)("");
	const [businessModel, setBusinessModel] = (0, import_react.useState)("");
	const [primaryProductService, setPrimaryProductService] = (0, import_react.useState)("");
	const [businessDescription, setBusinessDescription] = (0, import_react.useState)("");
	const [teamInvites, setTeamInvites] = (0, import_react.useState)([]);
	const [primaryBank, setPrimaryBank] = (0, import_react.useState)("");
	const [numberOfAccounts, setNumberOfAccounts] = (0, import_react.useState)("1");
	const [hasBusinessLoan, setHasBusinessLoan] = (0, import_react.useState)(false);
	const [hasBusinessCreditCard, setHasBusinessCreditCard] = (0, import_react.useState)(false);
	const [accountingSoftware, setAccountingSoftware] = (0, import_react.useState)("Tally");
	const [digitalPaymentMethods, setDigitalPaymentMethods] = (0, import_react.useState)(["UPI", "Net Banking"]);
	const [uploadedDocs, setUploadedDocs] = (0, import_react.useState)([]);
	const [uploadingDocType, setUploadingDocType] = (0, import_react.useState)(null);
	const [deletingDocId, setDeletingDocId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
	}, [
		user,
		officialEmail,
		cfoName,
		cfoEmail,
		hrName,
		hrEmail,
		ceoName,
		ceoEmail
	]);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		async function loadExistingOnboarding() {
			try {
				const res = await api.get("/api/business/onboarding/me");
				if (res && isMounted) {
					if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
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
						if (l.number_of_employees) setNumberOfEmployees(l.number_of_employees);
						if (l.number_of_branches) setNumberOfBranches(l.number_of_branches);
						if (l.business_model) setBusinessModel(l.business_model);
						if (l.primary_product_service) setPrimaryProductService(l.primary_product_service);
						if (l.business_description) setBusinessDescription(l.business_description);
						if (l.cfo_name) setCfoName(l.cfo_name);
						if (l.cfo_email) setCfoEmail(l.cfo_email);
						if (l.cfo_phone) setCfoPhone(l.cfo_phone);
						if (l.cfo_designation) setCfoDesignation(l.cfo_designation);
						if (l.invite_cfo !== void 0) setInviteCfo(l.invite_cfo);
						if (l.hr_name) setHrName(l.hr_name);
						if (l.hr_email) setHrEmail(l.hr_email);
						if (l.hr_phone) setHrPhone(l.hr_phone);
						if (l.hr_designation) setHrDesignation(l.hr_designation);
						if (l.invite_hr !== void 0) setInviteHr(l.invite_hr);
					}
					if (res.financial_info) {
						const f = res.financial_info;
						if (f.primary_bank) setPrimaryBank(f.primary_bank);
						if (f.number_of_accounts) setNumberOfAccounts(String(f.number_of_accounts));
						if (f.has_business_loan !== void 0) setHasBusinessLoan(f.has_business_loan);
						if (f.has_business_credit_card !== void 0) setHasBusinessCreditCard(f.has_business_credit_card);
						if (f.accounting_software) setAccountingSoftware(f.accounting_software);
						if (f.digital_payment_methods && Array.isArray(f.digital_payment_methods)) setDigitalPaymentMethods(f.digital_payment_methods);
					}
					if (res.documents) setUploadedDocs(res.documents);
					if (res.team_invites) setTeamInvites(res.team_invites);
					setStep(computeResumeStep(res));
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
	}, []);
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
		setBusinessDescription("A leading fintech company providing AI-powered financial analytics solutions.");
		setPrimaryBank("HDFC Bank");
		setNumberOfAccounts("2");
		setHasBusinessLoan(true);
		setHasBusinessCreditCard(true);
		setAccountingSoftware("Zoho Books");
		setDigitalPaymentMethods([
			"UPI",
			"Net Banking",
			"NEFT",
			"RTGS"
		]);
		setGeneralErrors({});
		setLeadershipErrors({});
		setFinancialErrors({});
		toast.success("Loaded demo business details into form!");
	};
	const isGeneralInfoValid = companyName.trim().length >= 2 && Boolean(businessCategory) && Boolean(businessType) && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(businessPan.trim()) && registeredAddress.trim().length >= 5 && Boolean(stateName) && city.trim().length >= 2 && pincode.trim().length >= 6 && officialEmail.trim().includes("@") && officialPhone.trim().length >= 10;
	const isTeamInfoValid = ceoName.trim().length > 0;
	const isDocUploaded = (typeKey) => uploadedDocs.some((d) => d.document_type === typeKey);
	const isDocsValid = isDocUploaded("business_pan") && isDocUploaded("registration_proof");
	const isCurrentStepValid = (function() {
		if (step === 1) return isDocsValid;
		if (step === 2) return isGeneralInfoValid;
		if (step === 3) return isTeamInfoValid;
		if (step === 4) return true;
		if (step === 5) return isDocsValid && isGeneralInfoValid && isTeamInfoValid;
		return false;
	})();
	const saveStep1 = async () => {
		setGeneralErrors({});
		const payload = {
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
			official_phone: officialPhone.trim()
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
			const res = await api.post("/api/business/onboarding/step/1", payload);
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			return true;
		} catch (err) {
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
	const saveStep2 = async () => {
		setLeadershipErrors({});
		const shouldInviteCfo = Boolean(inviteCfo && cfoEmail.trim() && cfoName.trim());
		const shouldInviteHr = Boolean(inviteHr && hrEmail.trim() && hrName.trim());
		const payload = {
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
			invite_hr: shouldInviteHr
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
			const res = await api.post("/api/business/onboarding/step/2", payload);
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			if (res.team_invites) setTeamInvites(res.team_invites);
			return true;
		} catch (err) {
			if (err?.status === 400 || typeof err?.message === "string" && err.message.includes("Please complete Step 1")) {
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
	const saveStep3 = async () => {
		setFinancialErrors({});
		const parsedNumAccounts = Number.parseInt(numberOfAccounts.replace(/\D/g, ""), 10) || 1;
		const payload = {
			primary_bank: primaryBank.trim() || null,
			number_of_accounts: parsedNumAccounts,
			has_business_loan: hasBusinessLoan,
			has_business_credit_card: hasBusinessCreditCard,
			accounting_software: accountingSoftware || null,
			digital_payment_methods: Array.isArray(digitalPaymentMethods) ? digitalPaymentMethods : []
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
			const res = await api.post("/api/business/onboarding/step/3", payload);
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			return true;
		} catch (err) {
			if (err?.status === 400 || typeof err?.message === "string" && err.message.includes("Please complete Step 1")) {
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
	const handleFileUpload = async (file, documentType, documentCategory) => {
		if (!file || uploadingDocType || deletingDocId) return;
		const validation = validateFile(file);
		if (!validation.valid) {
			toast.error(validation.error || "Only PDF files are accepted for document verification.");
			return;
		}
		setUploadingDocType(documentType);
		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("document_type", documentType);
			formData.append("document_category", documentCategory);
			const res = await api.upload("/api/business/onboarding/documents/upload", formData);
			if (res.documents) setUploadedDocs(res.documents);
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			toast.success(`Uploaded ${file.name} successfully!`);
			queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to upload document."));
		} finally {
			setUploadingDocType(null);
		}
	};
	const handleDeleteDoc = async (docId) => {
		if (deletingDocId || uploadingDocType) return;
		setDeletingDocId(docId);
		try {
			const res = await api.delete(`/api/business/onboarding/documents/${docId}`);
			if (res.documents) setUploadedDocs(res.documents);
			if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
			toast.success("Document removed.");
			queryClient.invalidateQueries({ queryKey: queryKeys.company.documents() });
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to remove document."));
		} finally {
			setDeletingDocId(null);
		}
	};
	const nextStep = async () => {
		if (uploadingDocType || deletingDocId || savingDraft) return;
		if (step === 1) {
			if (!isDocsValid) {
				toast.error("Please upload mandatory documents (Business PAN & Registration Proof) to proceed.");
				return;
			}
			setSavingDraft(true);
			try {
				const res = await api.post("/api/business/onboarding/step/extract-from-docs", {});
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
			if (await saveStep1()) {
				setDirection(1);
				setStep(3);
			}
		} else if (step === 3) {
			if (await saveStep2()) {
				setDirection(1);
				setStep(4);
			}
		} else if (step === 4) {
			if (await saveStep3()) {
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
	const jumpToStep = (targetStep) => {
		if (targetStep === step) return;
		setDirection(targetStep > step ? 1 : -1);
		setStep(targetStep);
	};
	const handleOpenEditSection = (sectionStep) => {
		setEditSectionStep(sectionStep);
		setEditModalOpen(true);
	};
	const handleCloseEditModal = async () => {
		setEditModalOpen(false);
		try {
			const res = await api.get("/api/business/onboarding/me");
			if (res) {
				if (res.completion_percentage !== void 0) setCompletionPct(res.completion_percentage);
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
					if (l.number_of_employees) setNumberOfEmployees(l.number_of_employees);
					if (l.number_of_branches) setNumberOfBranches(l.number_of_branches);
					if (l.business_model) setBusinessModel(l.business_model);
					if (l.primary_product_service) setPrimaryProductService(l.primary_product_service);
					if (l.business_description) setBusinessDescription(l.business_description);
					if (l.cfo_name) setCfoName(l.cfo_name);
					if (l.cfo_email) setCfoEmail(l.cfo_email);
					if (l.cfo_phone) setCfoPhone(l.cfo_phone);
					if (l.cfo_designation) setCfoDesignation(l.cfo_designation);
					if (l.invite_cfo !== void 0) setInviteCfo(l.invite_cfo);
					if (l.hr_name) setHrName(l.hr_name);
					if (l.hr_email) setHrEmail(l.hr_email);
					if (l.hr_phone) setHrPhone(l.hr_phone);
					if (l.hr_designation) setHrDesignation(l.hr_designation);
					if (l.invite_hr !== void 0) setInviteHr(l.invite_hr);
				}
				if (res.financial_info) {
					const f = res.financial_info;
					if (f.primary_bank) setPrimaryBank(f.primary_bank);
					if (f.number_of_accounts) setNumberOfAccounts(String(f.number_of_accounts));
					if (f.has_business_loan !== void 0) setHasBusinessLoan(f.has_business_loan);
					if (f.has_business_credit_card !== void 0) setHasBusinessCreditCard(f.has_business_credit_card);
					if (f.accounting_software) setAccountingSoftware(f.accounting_software);
					if (f.digital_payment_methods && Array.isArray(f.digital_payment_methods)) setDigitalPaymentMethods(f.digital_payment_methods);
				}
				if (res.documents) setUploadedDocs(res.documents);
				if (res.team_invites) setTeamInvites(res.team_invites);
			}
		} catch (e) {
			console.error("Failed to sync onboarding draft after edit modal save:", e);
		}
	};
	const handleFinalSubmit = async () => {
		setSubmitting(true);
		try {
			await api.post("/api/business/onboarding/complete", {});
			toast.success("SpotLite Business Onboarding Completed!");
			await refreshUser();
			queryClient.invalidateQueries({ queryKey: queryKeys.company.all() });
			queryClient.invalidateQueries({ queryKey: ["companyProfile"] });
			queryClient.invalidateQueries({ queryKey: ["onboardingStatus"] });
			queryClient.invalidateQueries({ queryKey: [
				"business",
				"onboarding",
				"me"
			] });
			navigate({ to: "/home" });
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Failed to complete onboarding."));
		} finally {
			setSubmitting(false);
		}
	};
	const togglePaymentMethod = (method) => {
		setDigitalPaymentMethods((prev) => prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]);
	};
	const generalState = {
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
		clearError: clearGeneralError
	};
	const leadershipState = {
		ceoName,
		setCeoName,
		ceoEmail,
		setCeoEmail,
		ceoPhone,
		setCeoPhone,
		ceoDesignation,
		setCeoDesignation,
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
		teamInvites,
		errors: leadershipErrors,
		clearError: clearLeadershipError
	};
	const financialState = {
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
		clearError: clearFinancialError
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 w-full border-b border-border bg-surface/90 backdrop-blur-sm shadow-2xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/home",
						onClick: () => sessionStorage.setItem("spotlite_onboarding_dismissed", "true"),
						className: "flex items-center gap-2.5 w-fit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
								size: 18,
								className: "fill-current text-white"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-lg font-bold tracking-tight text-foreground leading-tight",
								children: ["Spot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Lite"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-bold uppercase tracking-widest text-text-tertiary -mt-0.5",
								children: "Enterprise"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/home",
						onClick: () => sessionStorage.setItem("spotlite_onboarding_dismissed", "true"),
						className: "inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-foreground transition py-1.5 px-3 rounded-lg hover:bg-surface-alt border border-border/60 hover:border-border cursor-pointer shadow-2xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Exit to Dashboard" })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingStepperHeader, {
					step,
					completionPct,
					savingDraft,
					onFillDemoData: fillDemoData,
					onJumpToStep: jumpToStep
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: isInitializing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-24 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
							message: "Loading onboarding draft…",
							subMessage: "SpotLite Executive Engine"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						custom: direction,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							custom: direction,
							variants: {
								enter: (dir) => ({
									x: dir > 0 ? 32 : -32,
									opacity: 0
								}),
								center: {
									x: 0,
									opacity: 1,
									transition: {
										duration: .22,
										ease: [
											.25,
											1,
											.5,
											1
										]
									}
								},
								exit: (dir) => ({
									x: dir > 0 ? -32 : 32,
									opacity: 0,
									transition: {
										duration: .16,
										ease: [
											.25,
											1,
											.5,
											1
										]
									}
								})
							},
							initial: "enter",
							animate: "center",
							exit: "exit",
							children: [
								step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step1Verification, {
									uploadedDocs,
									uploadingDocType,
									deletingDocId,
									onUpload: handleFileUpload,
									onDelete: handleDeleteDoc
								}),
								step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step2GeneralInfo, { state: generalState }),
								step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step3Leadership, { state: leadershipState }),
								step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step4FinancialInfo, { state: financialState }),
								step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step5ReviewComplete, {
									generalState,
									leadershipState,
									financialState,
									uploadedDocs,
									uploadingDocType,
									deletingDocId,
									completionPct,
									onJumpToStep: jumpToStep,
									onEditSection: handleOpenEditSection,
									onUpload: handleFileUpload,
									onDelete: handleDeleteDoc
								})
							]
						}, step)
					})
				})] }), !isInitializing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingBottomNav, {
					step,
					savingDraft,
					submitting,
					isCurrentStepValid,
					uploadingDocType,
					deletingDocId,
					onPrevStep: prevStep,
					onNextStep: nextStep,
					onFinalSubmit: handleFinalSubmit
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingModal, {
				isOpen: editModalOpen,
				onClose: handleCloseEditModal,
				section: editSectionStep
			})
		]
	});
}
function OnboardingRouteComponent() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading) {
			const currentPath = window.location.pathname + window.location.search || "/onboarding";
			if (!user) navigate({
				to: "/login",
				search: { redirect: currentPath },
				replace: true
			});
			else if (auth.currentUser && !auth.currentUser.emailVerified) navigate({
				to: "/verify-email",
				search: { redirect: currentPath },
				replace: true
			});
		}
	}, [
		user,
		loading,
		navigate
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Verifying session…",
		subMessage: "SpotLite Executive Intelligence"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingPage, {});
}
//#endregion
export { OnboardingRouteComponent as component };
