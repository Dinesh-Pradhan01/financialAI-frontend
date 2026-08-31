import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Mail,
  ShieldCheck,
  Users,
  Loader2,
  AlertCircle,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { FormField } from "@/shared/components/ui/FormField";
import { useSendInvite } from "../hooks/useTeamInvites";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import type { TeamInviteRole, SendInviteResponse } from "../types";

export interface InviteFormProps {
  className?: string;
  onSuccess?: (response: SendInviteResponse) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function InviteForm({ className, onSuccess }: InviteFormProps) {
  const [role, setRole] = useState<TeamInviteRole>("cfo");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const sendInviteMutation = useSendInvite();
  const isSubmitting = sendInviteMutation.isPending;

  const validate = (): boolean => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setValidationError("Email address is required.");
      return false;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setValidationError("Please enter a valid work email address.");
      return false;
    }

    if (role !== "cfo" && role !== "hr") {
      setValidationError("Please select a valid role (CFO or HR).");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      role,
      full_name: fullName.trim() || undefined,
    };

    try {
      const response = await sendInviteMutation.mutateAsync(payload);

      const targetRoleLabel = role.toUpperCase();
      const successMsg =
        response?.message || `Invitation successfully sent to ${payload.email} (${targetRoleLabel})`;
      toast.success(successMsg);

      // Reset form only on successful submission
      setEmail("");
      setFullName("");
      setValidationError(null);

      onSuccess?.(response);
    } catch (err: unknown) {
      const errMsg = getApiErrorMessage(err, "Failed to send executive invitation.");
      toast.error(errMsg);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs text-left space-y-5",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <UserPlus className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold text-text-primary tracking-tight">
            Invite Executive Member
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Send a secure invitation to your CFO or HR leadership.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSendInvite} className="space-y-4" noValidate>
        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-text-primary tracking-tight">
            Designated Role <span className="text-destructive font-bold">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* CFO Option */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setRole("cfo");
                setValidationError(null);
              }}
              className={cn(
                "relative flex flex-col p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer select-none",
                role === "cfo"
                  ? "border-brand bg-brand/4 ring-2 ring-brand/20 shadow-2xs"
                  : "border-border/80 bg-surface-alt/25 hover:border-brand/30 hover:bg-surface-alt/50",
                isSubmitting && "opacity-60 cursor-not-allowed"
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className={cn("h-4 w-4", role === "cfo" ? "text-brand" : "text-text-secondary")}
                  />
                  <span className="font-bold text-xs sm:text-sm text-text-primary">
                    CFO
                  </span>
                </div>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    role === "cfo" ? "bg-brand" : "bg-border"
                  )}
                />
              </div>
              <span className="text-[11px] text-text-secondary">
                Chief Financial Officer · Financials & Reconciliation
              </span>
            </button>

            {/* HR Option */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setRole("hr");
                setValidationError(null);
              }}
              className={cn(
                "relative flex flex-col p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer select-none",
                role === "hr"
                  ? "border-brand bg-brand/4 ring-2 ring-brand/20 shadow-2xs"
                  : "border-border/80 bg-surface-alt/25 hover:border-brand/30 hover:bg-surface-alt/50",
                isSubmitting && "opacity-60 cursor-not-allowed"
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  <Users
                    className={cn("h-4 w-4", role === "hr" ? "text-brand" : "text-text-secondary")}
                  />
                  <span className="font-bold text-xs sm:text-sm text-text-primary">
                    HR Leadership
                  </span>
                </div>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    role === "hr" ? "bg-brand" : "bg-border"
                  )}
                />
              </div>
              <span className="text-[11px] text-text-secondary">
                Human Resources · Team & Payroll Oversight
              </span>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <FormField
            label="Work Email Address"
            type="email"
            required
            disabled={isSubmitting}
            placeholder="e.g. executive@company.com"
            value={email}
            error={validationError || undefined}
            leftIcon={<Mail className="h-4 w-4" />}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationError) setValidationError(null);
            }}
          />

          <FormField
            label="Full Name"
            type="text"
            optional
            disabled={isSubmitting}
            placeholder="e.g. Ananya Roy"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Inline Server Error Banner */}
        <AnimatePresence>
          {sendInviteMutation.isError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{getApiErrorMessage(sendInviteMutation.error, "Failed to dispatch invitation.")}</span>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Actions & Submit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <p className="text-[11px] text-text-tertiary flex items-center gap-1">
            <Info className="h-3 w-3 shrink-0" />
            Invitation links are sent directly to the recipient's email address.
          </p>

          <Button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="w-full sm:w-auto min-w-40 h-10 px-5 text-xs font-semibold gap-2 bg-brand text-white hover:bg-brand/90 shadow-brand transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Sending Invite…</span>
              </>
            ) : (
              <>
                <UserPlus className="h-3.5 w-3.5" />
                <span>Send Invitation</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
