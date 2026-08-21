import React from "react";
import { ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { MANDATORY_DOCUMENTS } from "../lib/businessOnboarding";
import { DocumentUploadCard } from "./DocumentUploadCard";
import { UploadedDoc } from "./types";

// TODO(phase-2): In Phase 2, move KYC document upload to deferred compliance vault in Settings

interface Props {
  uploadedDocs: UploadedDoc[];
  uploadingDocType: string | null;
  deletingDocId: string | null;
  onUpload: (file: File, docType: string, category: string) => void;
  onDelete: (docId: string) => void;
}

export function Step1Verification({
  uploadedDocs,
  uploadingDocType,
  deletingDocId,
  onUpload,
  onDelete,
}: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Business Verification</h1>
        <p className="text-sm text-text-secondary mt-1">
          Lightweight KYC verification for business identity.
        </p>
      </div>

      {/* Trust & Encryption Banner */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border-c bg-surface-alt/60 p-3.5 text-xs text-text-secondary">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-brand shrink-0" />
          <span>Bank-grade 256-bit encryption. Documents are secured and never shared.</span>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 font-semibold text-success">
          <CheckCircle2 className="h-3.5 w-3.5" /> SOC 2 / DPDP
        </span>
      </div>

      {/* Mandatory Documents Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-text-primary">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand" />
            <span>Required Verification Documents</span>
          </div>
          <span className="text-text-secondary font-normal">Accepted: PDF, PNG, JPG (Max 10MB)</span>
        </div>

        <div className="grid gap-3">
          {MANDATORY_DOCUMENTS.map((docReq) => (
            <DocumentUploadCard
              key={docReq.typeKey}
              req={docReq}
              uploadedDocs={uploadedDocs}
              uploadingDocType={uploadingDocType}
              deletingDocId={deletingDocId}
              onUpload={(file) => onUpload(file, docReq.typeKey, "mandatory")}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
