import React from "react";
import { Link } from "@tanstack/react-router";
import { ShieldAlert, ArrowLeft } from "lucide-react";

interface AccessRestrictedScreenProps {
  title?: string;
  description?: string;
  currentRole?: string | null;
  allowedRole?: string;
}

export function AccessRestrictedScreen({
  title = "Access Restricted",
  description,
  currentRole,
  allowedRole,
}: AccessRestrictedScreenProps) {
  const defaultDesc = allowedRole
    ? `This section is strictly restricted to ${allowedRole}.`
    : "You do not have permission to view this section.";

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center space-y-5">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs">
        <ShieldAlert className="h-7 w-7" />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-bold font-display text-text-primary tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description || defaultDesc}
        </p>
        <p className="text-xs font-mono text-text-tertiary">
          Current signed-in role:{" "}
          <span className="font-semibold text-text-secondary uppercase">
            {currentRole ? currentRole : "No Role Assigned"}
          </span>
        </p>
      </div>
      <div className="pt-2">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-brand hover:opacity-90 transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
