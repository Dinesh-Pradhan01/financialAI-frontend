import { Building2, Lock, ShieldCheck, Users, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { BUSINESS_MODELS } from "../lib/businessOnboarding";
import { LeadershipState } from "./types";
import { FormField, FormTextarea, FormSelect } from "@/shared/components/ui/FormField";
import { useSendInvite } from "../../team/hooks/useTeamInvites";

// TODO(phase-2): Defer CFO & HR team invitation flow to workspace post-onboarding modal in Phase 2

interface Props {
  state: LeadershipState;
}

const EMPLOYEE_RANGES = [
  { label: "1-10 Employees", value: "1-10" },
  { label: "11-50 Employees", value: "11-50" },
  { label: "51-200 Employees", value: "51-200" },
  { label: "201-500 Employees", value: "201-500" },
  { label: "500+ Employees", value: "500+" },
];

export function Step3Leadership({ state }: Props) {
  const sendInviteMutation = useSendInvite();

  const currentCfoEmail = state.cfoEmail.trim().toLowerCase();
  const existingCfoInvite = state.teamInvites.find(
    (i) => i.role === "cfo" && i.email.trim().toLowerCase() === currentCfoEmail,
  );
  const isCfoInviteSent = Boolean(existingCfoInvite);
  const canCheckCfo = state.cfoName.trim() !== "" && currentCfoEmail !== "";

  const handleCfoInviteToggle = async (checked: boolean) => {
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
          full_name: state.cfoName.trim(),
        });
        toast.success(res?.message || "CFO invitation sent successfully!");
        state.setInviteCfo(true);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || err?.message || "Failed to send CFO invite");
      }
    } else {
      state.setInviteCfo(false);
    }
  };

  const currentHrEmail = state.hrEmail.trim().toLowerCase();
  const existingHrInvite = state.teamInvites.find(
    (i) => i.role === "hr" && i.email.trim().toLowerCase() === currentHrEmail,
  );
  const isHrInviteSent = Boolean(existingHrInvite);
  const canCheckHr = state.hrName.trim() !== "" && currentHrEmail !== "";

  const handleHrInviteToggle = async (checked: boolean) => {
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
          full_name: state.hrName.trim(),
        });
        toast.success(res?.message || "HR invitation sent successfully!");
        state.setInviteHr(true);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || err?.message || "Failed to send HR invite");
      }
    } else {
      state.setInviteHr(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Leadership & Organization
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Add details about your leadership and invite your CFO and HR to collaborate on SpotLite.
        </p>
      </div>

      <div className="space-y-5">
        {/* Section 1: Executive Leadership */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-primary px-1">
            <Building2 className="h-4 w-4 text-brand" />
            <span>1. Executive Leadership & Signatories</span>
          </div>

          {/* CEO Card */}
          <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border-c pb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">CEO / Founder Details</h3>
                <p className="text-xs text-text-secondary">
                  Primary signatory and enterprise owner
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-1">
              <FormField
                label="Full Legal Name"
                required
                error={state.errors?.founder_ceo_name}
                value={state.ceoName}
                onChange={(e) => {
                  state.setCeoName(e.target.value);
                  state.clearError?.("founder_ceo_name");
                }}
                placeholder="e.g. Rajesh Kumar"
              />

              <FormField
                label="Email Address"
                optional
                type="email"
                error={state.errors?.founder_ceo_email}
                value={state.ceoEmail}
                onChange={(e) => {
                  state.setCeoEmail(e.target.value);
                  state.clearError?.("founder_ceo_email");
                }}
                placeholder="e.g. ceo@company.com"
              />

              <FormField
                label="Contact Phone"
                optional
                type="tel"
                error={state.errors?.founder_ceo_phone}
                value={state.ceoPhone}
                onChange={(e) => {
                  state.setCeoPhone(e.target.value);
                  state.clearError?.("founder_ceo_phone");
                }}
                placeholder="+91 98765 43210"
              />

              <FormField
                label="Designation / Title"
                optional
                error={state.errors?.founder_ceo_designation}
                value={state.ceoDesignation}
                onChange={(e) => {
                  state.setCeoDesignation(e.target.value);
                  state.clearError?.("founder_ceo_designation");
                }}
                placeholder="e.g. CEO / Managing Director"
              />
            </div>
          </div>

          {/* CFO Card */}
          <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border-c pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">
                    Chief Financial Officer (CFO)
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Financial oversight & statement reconciliation
                  </p>
                </div>
              </div>

              <label
                className={`flex items-center gap-2 select-none px-3 py-1.5 rounded-lg border transition ${
                  isCfoInviteSent || !canCheckCfo || sendInviteMutation.isPending
                    ? "bg-surface-alt/50 border-border-c/50 opacity-60 cursor-not-allowed"
                    : "bg-surface-alt border-border-c hover:bg-surface cursor-pointer"
                }`}
                title={
                  !canCheckCfo
                    ? "Please fill Full Name and Email Address to invite"
                    : isCfoInviteSent
                      ? `Invite already sent to ${existingCfoInvite?.email}`
                      : ""
                }
              >
                <input
                  type="checkbox"
                  checked={isCfoInviteSent || (state.inviteCfo && Boolean(currentCfoEmail))}
                  disabled={isCfoInviteSent || !canCheckCfo || sendInviteMutation.isPending}
                  onChange={(e) => handleCfoInviteToggle(e.target.checked)}
                  className="h-4 w-4 rounded border-border-c text-brand focus:ring-brand/30 accent-brand disabled:cursor-not-allowed"
                />
                <span className="text-xs font-semibold text-text-primary">Invite to SpotLite</span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-1">
              <FormField
                label="Full Name"
                optional
                error={state.errors?.cfo_name}
                value={state.cfoName}
                onChange={(e) => {
                  state.setCfoName(e.target.value);
                  state.clearError?.("cfo_name");
                }}
                placeholder="e.g. Vikramaditya Sharma"
              />

              <FormField
                label="Email Address"
                optional
                type="email"
                error={state.errors?.cfo_email}
                value={state.cfoEmail}
                onChange={(e) => {
                  state.setCfoEmail(e.target.value);
                  state.clearError?.("cfo_email");
                  state.setInviteCfo(false);
                }}
                placeholder="e.g. cfo@company.com"
              />

              <FormField
                label="Phone Number"
                optional
                type="tel"
                error={state.errors?.cfo_phone}
                value={state.cfoPhone}
                onChange={(e) => {
                  state.setCfoPhone(e.target.value);
                  state.clearError?.("cfo_phone");
                }}
                placeholder="+91 98765 43211"
              />

              <FormField
                label="Designation"
                optional
                error={state.errors?.cfo_designation}
                value={state.cfoDesignation}
                onChange={(e) => {
                  state.setCfoDesignation(e.target.value);
                  state.clearError?.("cfo_designation");
                }}
                placeholder="Chief Financial Officer"
              />
            </div>

            {existingCfoInvite && (
              <div className="pt-2 text-xs text-text-secondary">
                Invite Status:{" "}
                <span className="font-semibold capitalize text-brand">
                  {existingCfoInvite.status}
                </span>
              </div>
            )}
          </div>

          {/* HR Card */}
          <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border-c pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Human Resources (HR)</h3>
                  <p className="text-xs text-text-secondary">
                    Workforce payroll & vendor compliance
                  </p>
                </div>
              </div>

              <label
                className={`flex items-center gap-2 select-none px-3 py-1.5 rounded-lg border transition ${
                  isHrInviteSent || !canCheckHr || sendInviteMutation.isPending
                    ? "bg-surface-alt/50 border-border-c/50 opacity-60 cursor-not-allowed"
                    : "bg-surface-alt border-border-c hover:bg-surface cursor-pointer"
                }`}
                title={
                  !canCheckHr
                    ? "Please fill Full Name and Email Address to invite"
                    : isHrInviteSent
                      ? `Invite already sent to ${existingHrInvite?.email}`
                      : ""
                }
              >
                <input
                  type="checkbox"
                  checked={isHrInviteSent || (state.inviteHr && Boolean(currentHrEmail))}
                  disabled={isHrInviteSent || !canCheckHr || sendInviteMutation.isPending}
                  onChange={(e) => handleHrInviteToggle(e.target.checked)}
                  className="h-4 w-4 rounded border-border-c text-brand focus:ring-brand/30 accent-brand disabled:cursor-not-allowed"
                />
                <span className="text-xs font-semibold text-text-primary">Invite to SpotLite</span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-1">
              <FormField
                label="Full Name"
                optional
                error={state.errors?.hr_name}
                value={state.hrName}
                onChange={(e) => {
                  state.setHrName(e.target.value);
                  state.clearError?.("hr_name");
                }}
                placeholder="e.g. Jane Doe"
              />

              <FormField
                label="Email Address"
                optional
                type="email"
                error={state.errors?.hr_email}
                value={state.hrEmail}
                onChange={(e) => {
                  state.setHrEmail(e.target.value);
                  state.clearError?.("hr_email");
                  state.setInviteHr(false);
                }}
                placeholder="e.g. hr@company.com"
              />

              <FormField
                label="Phone Number"
                optional
                type="tel"
                error={state.errors?.hr_phone}
                value={state.hrPhone}
                onChange={(e) => {
                  state.setHrPhone(e.target.value);
                  state.clearError?.("hr_phone");
                }}
                placeholder="+91 98765 43212"
              />

              <FormField
                label="Designation"
                optional
                error={state.errors?.hr_designation}
                value={state.hrDesignation}
                onChange={(e) => {
                  state.setHrDesignation(e.target.value);
                  state.clearError?.("hr_designation");
                }}
                placeholder="Head of HR / People Ops"
              />
            </div>

            {existingHrInvite && (
              <div className="pt-2 text-xs text-text-secondary">
                Invite Status:{" "}
                <span className="font-semibold capitalize text-brand">
                  {existingHrInvite.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Operational Scale & Profile */}
        <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-c pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                2. Operational Scale & Business Model
              </h3>
              <p className="text-xs text-text-secondary">
                Workforce scale, market orientation, and business scope
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-1">
            {/* Number of Employees */}
            <FormSelect
              label="Workforce / Employee Scale"
              optional
              error={state.errors?.number_of_employees}
              value={state.numberOfEmployees}
              onValueChange={(val) => {
                state.setNumberOfEmployees(val);
                state.clearError?.("number_of_employees");
              }}
              options={EMPLOYEE_RANGES}
              placeholder="Select workforce range"
            />

            {/* Number of Branches */}
            <FormField
              label="Number of Branches / Locations"
              optional
              type="number"
              min={1}
              error={state.errors?.number_of_branches}
              value={state.numberOfBranches}
              onChange={(e) => {
                state.setNumberOfBranches(e.target.value);
                state.clearError?.("number_of_branches");
              }}
              placeholder="1"
            />

            {/* Business Model */}
            <FormSelect
              label="Business Revenue Model"
              optional
              error={state.errors?.business_model}
              value={state.businessModel}
              onValueChange={(val) => {
                state.setBusinessModel(val);
                state.clearError?.("business_model");
              }}
              options={BUSINESS_MODELS}
              placeholder="Select revenue model"
            />

            {/* Primary Product / Service */}
            <FormField
              label="Primary Product / Service Offering"
              optional
              error={state.errors?.primary_product_service}
              value={state.primaryProductService}
              onChange={(e) => {
                state.setPrimaryProductService(e.target.value);
                state.clearError?.("primary_product_service");
              }}
              placeholder="e.g. SaaS Analytics, Logistics, Retail"
            />

            {/* Business Description */}
            <div className="md:col-span-2">
              <FormTextarea
                label="Business Description / Summary"
                optional
                rows={2}
                error={state.errors?.business_description}
                value={state.businessDescription}
                onChange={(e) => {
                  state.setBusinessDescription(e.target.value);
                  state.clearError?.("business_description");
                }}
                placeholder="Brief summary of operations, target market, or core business activities"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
