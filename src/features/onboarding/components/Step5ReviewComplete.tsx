import React, { useState } from "react";
import {
  Building2,
  Building,
  CreditCard,
  CheckCircle2,
  FileCheck,
  FileText,
  Edit3,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";
import { OPTIONAL_DOCUMENTS, CATEGORY_RECOMMENDED_DOCUMENTS } from "../lib/businessOnboarding";
import { DocumentUploadCard } from "./DocumentUploadCard";
import { GeneralInfoState, LeadershipState, FinancialState, UploadedDoc } from "./types";

// TODO(phase-2): Move secondary and industry-recommended document vault to Dashboard Settings -> Compliance

interface Props {
  generalState: GeneralInfoState;
  leadershipState: LeadershipState;
  financialState: FinancialState;
  uploadedDocs: UploadedDoc[];
  uploadingDocType: string | null;
  deletingDocId: string | null;
  completionPct: number;
  onJumpToStep: (stepNumber: number) => void;
  onEditSection: (stepNumber: number) => void;
  onUpload: (file: File, docType: string, category: string) => void;
  onDelete: (docId: string) => void;
}

export function Step5ReviewComplete({
  generalState,
  leadershipState,
  financialState,
  uploadedDocs,
  uploadingDocType,
  deletingDocId,
  completionPct,
  onJumpToStep,
  onEditSection,
  onUpload,
  onDelete,
}: Props) {
  const [showSecondaryDocs, setShowSecondaryDocs] = useState(false);

  const recommendedDocs =
    CATEGORY_RECOMMENDED_DOCUMENTS[generalState.businessCategory] ||
    CATEGORY_RECOMMENDED_DOCUMENTS["Others"];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Review & Complete
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Review your company profile before final activation.
        </p>
      </div>

      {/* Completion Readiness Banner */}
      <div className="rounded-xl bg-brand/5 p-5 border border-brand/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-on-brand font-bold text-md font-mono shadow-sm">
            {completionPct}%
          </div>
          <div>
            <h3 className="font-bold text-sm text-text-primary">Onboarding Readiness</h3>
            <p className="text-xs text-text-secondary">
              Core business verification & configuration details captured.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-success/15 border border-success/30 px-3 py-1 text-xs font-semibold text-success flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" /> Ready for Activation
        </span>
      </div>

      {/* TIER 1: CORE SUMMARY CARDS */}
      <div className="space-y-4">
        {/* General Info Summary Card */}
        <div className="rounded-xl border border-border-c bg-surface p-5 space-y-3.5 shadow-xs">
          <div className="flex justify-between items-center border-b border-border-c pb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-foreground">
              <Building2 className="h-4 w-4 text-brand" /> 1. Company Profile
            </h3>
            <button
              type="button"
              onClick={() => onEditSection(2)}
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer bg-brand/5 px-2.5 py-1 rounded-md border border-brand/20"
            >
              <Edit3 className="h-3 w-3" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
            <div>
              <span className="text-text-secondary block font-medium">Company Name</span>
              <span className="font-semibold text-text-primary">
                {generalState.companyName || "—"}
              </span>
            </div>
            <div>
              <span className="text-text-secondary block font-medium">Category</span>
              <span className="font-semibold text-text-primary">
                {generalState.businessCategory}
              </span>
            </div>
            <div>
              <span className="text-text-secondary block font-medium">Legal Type</span>
              <span className="font-semibold text-text-primary">{generalState.businessType}</span>
            </div>
            <div>
              <span className="text-text-secondary block font-medium">Business PAN</span>
              <span className="font-mono font-semibold text-text-primary">
                {generalState.businessPan || "—"}
              </span>
            </div>
            <div>
              <span className="text-text-secondary block font-medium">Official Email</span>
              <span className="font-semibold text-text-primary">
                {generalState.officialEmail || "—"}
              </span>
            </div>
            <div>
              <span className="text-text-secondary block font-medium">Location</span>
              <span className="font-semibold text-text-primary">
                {generalState.city
                  ? `${generalState.city}, ${generalState.stateName}`
                  : generalState.stateName}
              </span>
            </div>
          </div>
        </div>

        {/* Leadership & Organization Summary Card */}
        <div className="rounded-xl border border-border-c bg-surface p-5 space-y-3.5 shadow-xs">
          <div className="flex justify-between items-center border-b border-border-c pb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-foreground">
              <Building className="h-4 w-4 text-brand" /> 2. Leadership & Team
            </h3>
            <button
              type="button"
              onClick={() => onEditSection(3)}
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer bg-brand/5 px-2.5 py-1 rounded-md border border-brand/20"
            >
              <Edit3 className="h-3 w-3" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
            {leadershipState.ceoName && (
              <div className="rounded-lg border border-border-c p-3 bg-surface-alt/60">
                <span className="text-brand font-bold block mb-1">CEO / Founder</span>
                <span className="font-semibold text-text-primary block">
                  {leadershipState.ceoName}
                </span>
                {leadershipState.ceoEmail && (
                  <span className="text-text-secondary block truncate">
                    {leadershipState.ceoEmail}
                  </span>
                )}
                {leadershipState.ceoDesignation && (
                  <span className="text-text-secondary block">
                    {leadershipState.ceoDesignation}
                  </span>
                )}
              </div>
            )}
            {leadershipState.cfoName && (
              <div className="rounded-lg border border-border-c p-3 bg-surface-alt/60">
                <span className="text-brand font-bold block mb-1">CFO</span>
                <span className="font-semibold text-text-primary block">
                  {leadershipState.cfoName}
                </span>
                {leadershipState.cfoEmail && (
                  <span className="text-text-secondary block truncate">
                    {leadershipState.cfoEmail}
                  </span>
                )}
                {leadershipState.inviteCfo && (
                  <span className="mt-2 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand capitalize">
                    {leadershipState.teamInvites.find((i) => i.role === "cfo")?.status ||
                      "Invite Pending"}
                  </span>
                )}
              </div>
            )}
            {leadershipState.hrName && (
              <div className="rounded-lg border border-border-c p-3 bg-surface-alt/60">
                <span className="text-brand font-bold block mb-1">HR</span>
                <span className="font-semibold text-text-primary block">
                  {leadershipState.hrName}
                </span>
                {leadershipState.hrEmail && (
                  <span className="text-text-secondary block truncate">
                    {leadershipState.hrEmail}
                  </span>
                )}
                {leadershipState.inviteHr && (
                  <span className="mt-2 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand capitalize">
                    {leadershipState.teamInvites.find((i) => i.role === "hr")?.status ||
                      "Invite Pending"}
                  </span>
                )}
              </div>
            )}
          </div>

          {(leadershipState.numberOfEmployees ||
            leadershipState.businessModel ||
            leadershipState.primaryProductService) && (
            <div className="border-t border-border-c pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {leadershipState.numberOfEmployees && (
                <div>
                  <span className="text-text-secondary block font-medium">Workforce</span>
                  <span className="font-semibold text-text-primary">
                    {leadershipState.numberOfEmployees}
                  </span>
                </div>
              )}
              {leadershipState.numberOfBranches && (
                <div>
                  <span className="text-text-secondary block font-medium">Branches</span>
                  <span className="font-semibold text-text-primary">
                    {leadershipState.numberOfBranches}
                  </span>
                </div>
              )}
              {leadershipState.businessModel && (
                <div>
                  <span className="text-text-secondary block font-medium">Business Model</span>
                  <span className="font-semibold text-text-primary">
                    {leadershipState.businessModel}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Financial Info Summary Card */}
        <div className="rounded-xl border border-border-c bg-surface p-5 space-y-3.5 shadow-xs">
          <div className="flex justify-between items-center border-b border-border-c pb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-foreground">
              <CreditCard className="h-4 w-4 text-brand" /> 3. Banking & Ledger Setup
            </h3>
            <button
              type="button"
              onClick={() => onEditSection(4)}
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer bg-brand/5 px-2.5 py-1 rounded-md border border-brand/20"
            >
              <Edit3 className="h-3 w-3" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
            <div>
              <span className="text-text-secondary block font-medium">Primary Bank</span>
              <span className="font-semibold text-text-primary">
                {financialState.primaryBank || "Not specified"}
              </span>
            </div>
            <div>
              <span className="text-text-secondary block font-medium">Accounting System</span>
              <span className="font-semibold text-text-primary">
                {financialState.accountingSoftware}
              </span>
            </div>
            <div>
              <span className="text-text-secondary block font-medium">Payment Rails</span>
              <span className="font-semibold text-text-primary truncate">
                {financialState.digitalPaymentMethods.length
                  ? financialState.digitalPaymentMethods.join(", ")
                  : "None specified"}
              </span>
            </div>
          </div>
        </div>

        {/* Uploaded Documents Summary Card */}
        <div className="rounded-xl border border-border-c bg-surface p-5 space-y-3.5 shadow-xs">
          <div className="flex justify-between items-center border-b border-border-c pb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-foreground">
              <FileCheck className="h-4 w-4 text-brand" /> 4. Verified Verification Documents (
              {uploadedDocs.length})
            </h3>
            <button
              type="button"
              onClick={() => onEditSection(1)}
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer bg-brand/5 px-2.5 py-1 rounded-md border border-brand/20"
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
                  className="flex items-center justify-between rounded-lg border border-border-c bg-surface-alt/60 p-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-brand shrink-0" />
                    <div>
                      <span className="font-semibold text-text-primary block">
                        {doc.original_name}
                      </span>
                      <span className="text-xs text-text-secondary capitalize">
                        {doc.document_type.replace(/_/g, " ")} •{" "}
                        {(doc.file_size_bytes / 1024).toFixed(0)} KB
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success border border-success/30">
                    Uploaded
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TIER 2: SECONDARY & INDUSTRY DOCUMENTS ACCORDION / TOGGLE */}
        <div className="rounded-xl border border-border-c bg-surface-alt/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand" />
              <div>
                <h4 className="text-xs font-semibold text-text-primary">
                  Additional Compliance Documents (Optional)
                </h4>
                <p className="text-xs text-text-secondary">
                  Optional tax certificates and industry-specific licenses
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSecondaryDocs((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline px-3 py-1.5 rounded-lg border border-brand/20 bg-surface cursor-pointer shadow-xs"
            >
              <span>{showSecondaryDocs ? "Hide Documents" : "View Documents"}</span>
              {showSecondaryDocs ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {showSecondaryDocs && (
            <div className="space-y-4 pt-2 border-t border-border-c animate-in fade-in duration-200">
              {/* Optional Documents */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-text-primary block">
                  General Tax & Banking Certificates
                </span>
                <div className="grid gap-2.5">
                  {OPTIONAL_DOCUMENTS.map((docReq) => (
                    <DocumentUploadCard
                      key={docReq.typeKey}
                      req={docReq}
                      uploadedDocs={uploadedDocs}
                      uploadingDocType={uploadingDocType}
                      deletingDocId={deletingDocId}
                      onUpload={(file) => onUpload(file, docReq.typeKey, "optional")}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              </div>

              {/* Recommended Category Documents */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-text-primary block">
                  Industry Recommended ({generalState.businessCategory})
                </span>
                <div className="grid gap-2.5">
                  {recommendedDocs.map((docReq) => (
                    <DocumentUploadCard
                      key={docReq.typeKey}
                      req={docReq}
                      uploadedDocs={uploadedDocs}
                      uploadingDocType={uploadingDocType}
                      deletingDocId={deletingDocId}
                      onUpload={(file) => onUpload(file, docReq.typeKey, "recommended")}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
