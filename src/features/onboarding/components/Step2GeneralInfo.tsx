import { Building2, Mail, MapPin } from "lucide-react";
import { BUSINESS_CATEGORIES, BUSINESS_TYPES, INDIAN_STATES } from "../lib/businessOnboarding";
import { GeneralInfoState } from "./types";
import { FormField, FormTextarea, FormSelect } from "@/shared/components/ui/FormField";

// TODO(phase-2): Add Protean/GSTIN Auto-Fill lookup trigger here to auto-populate entity details

interface Props {
  state: GeneralInfoState;
}

export function Step2GeneralInfo({ state }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          General Info
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Identify your business and create its legal profile.
        </p>
      </div>

      <div className="space-y-5">
        {/* Section 1: Legal Business Entity */}
        <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-c pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">1. Legal Business Entity</h3>
              <p className="text-xs text-text-secondary">Registered identity & statutory numbers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-1">
            {/* Company Name */}
            <div className="md:col-span-2">
              <FormField
                label="Company / Enterprise Name"
                required
                error={state.errors?.company_name}
                value={state.companyName}
                onChange={(e) => {
                  state.setCompanyName(e.target.value);
                  state.clearError?.("company_name");
                }}
                placeholder="Acme Technologies Pvt Ltd"
              />
            </div>

            {/* Business Category */}
            <FormSelect
              label="Business Category"
              required
              error={state.errors?.business_category}
              value={state.businessCategory}
              onValueChange={(val) => {
                state.setBusinessCategory(val);
                state.clearError?.("business_category");
              }}
              options={BUSINESS_CATEGORIES}
              placeholder="Select Category"
            />

            {/* Business Type */}
            <FormSelect
              label="Business Legal Type"
              required
              error={state.errors?.business_type}
              value={state.businessType}
              onValueChange={(val) => {
                state.setBusinessType(val);
                state.clearError?.("business_type");
              }}
              options={BUSINESS_TYPES}
              placeholder="Select Legal Type"
            />

            {/* Business PAN */}
            <FormField
              label="Business PAN"
              required
              error={state.errors?.business_pan}
              maxLength={10}
              value={state.businessPan}
              onChange={(e) => {
                state.setBusinessPan(e.target.value.toUpperCase());
                state.clearError?.("business_pan");
              }}
              placeholder="ABCDE1234F"
              className="uppercase tracking-wider font-mono"
            />

            {/* GSTIN */}
            <FormField
              label="GSTIN"
              optional
              error={state.errors?.gstin}
              maxLength={15}
              value={state.gstin}
              onChange={(e) => {
                state.setGstin(e.target.value.toUpperCase());
                state.clearError?.("gstin");
              }}
              placeholder="27AAACB1234C1ZV"
              className="uppercase font-mono"
            />

            {/* CIN */}
            <FormField
              label="Corporate Identification Number (CIN)"
              optional
              error={state.errors?.cin}
              value={state.cin}
              onChange={(e) => {
                state.setCin(e.target.value);
                state.clearError?.("cin");
              }}
              placeholder="U72200MH2021PTC123456"
              className="font-mono"
            />

            {/* Udyam / MSME Number */}
            <FormField
              label="Udyam / MSME Number"
              optional
              error={state.errors?.udyam_number}
              value={state.udyamNumber}
              onChange={(e) => {
                state.setUdyamNumber(e.target.value);
                state.clearError?.("udyam_number");
              }}
              placeholder="UDYAM-MH-01-0000000"
              className="font-mono"
            />

            {/* Date of Incorporation */}
            <div className="md:col-span-2">
              <FormField
                label="Date of Incorporation"
                optional
                type="date"
                error={state.errors?.date_of_incorporation}
                value={state.dateOfIncorporation}
                onChange={(e) => {
                  state.setDateOfIncorporation(e.target.value);
                  state.clearError?.("date_of_incorporation");
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Official Contact Channels */}
        <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-c pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                2. Official Contact Channels
              </h3>
              <p className="text-xs text-text-secondary">Primary business communication channels</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-1">
            {/* Official Email */}
            <FormField
              label="Official Work Email"
              type="email"
              required
              error={state.errors?.official_email}
              value={state.officialEmail}
              onChange={(e) => {
                state.setOfficialEmail(e.target.value);
                state.clearError?.("official_email");
              }}
              placeholder="contact@acme.com"
            />

            {/* Official Phone */}
            <FormField
              label="Official Contact Phone"
              type="tel"
              required
              error={state.errors?.official_phone}
              value={state.officialPhone}
              onChange={(e) => {
                state.setOfficialPhone(e.target.value);
                state.clearError?.("official_phone");
              }}
              placeholder="+91 98765 43210"
            />

            {/* Website */}
            <div className="md:col-span-2">
              <FormField
                label="Company Website"
                optional
                type="url"
                error={state.errors?.website}
                value={state.website}
                onChange={(e) => {
                  state.setWebsite(e.target.value);
                  state.clearError?.("website");
                }}
                placeholder="https://www.acme.com"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Registered & Operating Address */}
        <div className="rounded-xl border border-border-c bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-c pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">3. Business Addresses</h3>
              <p className="text-xs text-text-secondary">
                Registered office & operational location
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-1">
            {/* Registered Address */}
            <div className="md:col-span-2">
              <FormTextarea
                label="Registered Business Address"
                rows={2}
                required
                error={state.errors?.registered_address}
                value={state.registeredAddress}
                onChange={(e) => {
                  state.setRegisteredAddress(e.target.value);
                  state.clearError?.("registered_address");
                }}
                placeholder="Building No, Street, Landmark, Area"
              />
            </div>

            {/* Operational Address */}
            <div className="md:col-span-2">
              <FormTextarea
                label="Operational Address"
                rows={2}
                optional
                helperText="Provide if operating address differs from registered office."
                error={state.errors?.operational_address}
                value={state.operationalAddress}
                onChange={(e) => {
                  state.setOperationalAddress(e.target.value);
                  state.clearError?.("operational_address");
                }}
                placeholder="Warehouse / Branch / Factory Address"
              />
            </div>

            {/* State */}
            <FormSelect
              label="State / Union Territory"
              required
              error={state.errors?.state}
              value={state.stateName}
              onValueChange={(val) => {
                state.setStateName(val);
                state.clearError?.("state");
              }}
              options={INDIAN_STATES}
              placeholder="Select State"
            />

            {/* City */}
            <FormField
              label="City"
              required
              error={state.errors?.city}
              value={state.city}
              onChange={(e) => {
                state.setCity(e.target.value);
                state.clearError?.("city");
              }}
              placeholder="Mumbai"
            />

            {/* PIN Code */}
            <div className="md:col-span-2">
              <FormField
                label="PIN Code"
                required
                error={state.errors?.pincode}
                maxLength={6}
                value={state.pincode}
                onChange={(e) => {
                  state.setPincode(e.target.value.replace(/\D/g, ""));
                  state.clearError?.("pincode");
                }}
                placeholder="400001"
                className="font-mono max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
