import React from "react";
import { Building2, Mail, MapPin } from "lucide-react";
import {
  BUSINESS_CATEGORIES,
  BUSINESS_TYPES,
  INDIAN_STATES,
} from "@/lib/businessOnboarding";
import { GeneralInfoState } from "./types";
import { FormField, FormTextarea, FormSelect } from "@/components/ui/FormField";

// TODO(phase-2): Add Protean/GSTIN Auto-Fill lookup trigger here to auto-populate entity details

interface Props {
  state: GeneralInfoState;
}

export function Step2GeneralInfo({ state }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">General Info</h1>
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
              <h3 className="font-semibold text-sm text-foreground">
                1. Legal Business Entity
              </h3>
              <p className="text-xs text-text-secondary">
                Registered identity & statutory numbers
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-1">
            {/* Company Name */}
            <div className="md:col-span-2">
              <FormField
                label="Company / Enterprise Name"
                required
                value={state.companyName}
                onChange={(e) => state.setCompanyName(e.target.value)}
                placeholder="Acme Technologies Pvt Ltd"
              />
            </div>

            {/* Business Category */}
            <FormSelect
              label="Business Category"
              required
              value={state.businessCategory}
              onValueChange={(val) => state.setBusinessCategory(val)}
              options={BUSINESS_CATEGORIES}
              placeholder="Select Category"
            />

            {/* Business Type */}
            <FormSelect
              label="Business Legal Type"
              required
              value={state.businessType}
              onValueChange={(val) => state.setBusinessType(val)}
              options={BUSINESS_TYPES}
              placeholder="Select Legal Type"
            />

            {/* Business PAN */}
            <FormField
              label="Business PAN"
              required
              maxLength={10}
              value={state.businessPan}
              onChange={(e) => state.setBusinessPan(e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              className="uppercase tracking-wider font-mono"
            />

            {/* GSTIN */}
            <FormField
              label="GSTIN"
              optional
              maxLength={15}
              value={state.gstin}
              onChange={(e) => state.setGstin(e.target.value.toUpperCase())}
              placeholder="27AAACB1234C1ZV"
              className="uppercase font-mono"
            />

            {/* CIN */}
            <FormField
              label="Corporate Identification Number (CIN)"
              optional
              value={state.cin}
              onChange={(e) => state.setCin(e.target.value)}
              placeholder="U72200MH2021PTC123456"
              className="font-mono"
            />

            {/* Udyam / MSME Number */}
            <FormField
              label="Udyam / MSME Number"
              optional
              value={state.udyamNumber}
              onChange={(e) => state.setUdyamNumber(e.target.value)}
              placeholder="UDYAM-MH-01-0000000"
              className="font-mono"
            />

            {/* Date of Incorporation */}
            <div className="md:col-span-2">
              <FormField
                label="Date of Incorporation"
                optional
                type="date"
                value={state.dateOfIncorporation}
                onChange={(e) => state.setDateOfIncorporation(e.target.value)}
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
              <p className="text-xs text-text-secondary">
                Primary business communication channels
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-1">
            {/* Official Email */}
            <FormField
              label="Official Work Email"
              type="email"
              required
              value={state.officialEmail}
              onChange={(e) => state.setOfficialEmail(e.target.value)}
              placeholder="contact@acme.com"
            />

            {/* Official Phone */}
            <FormField
              label="Official Contact Phone"
              type="tel"
              required
              value={state.officialPhone}
              onChange={(e) => state.setOfficialPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />

            {/* Website */}
            <div className="md:col-span-2">
              <FormField
                label="Company Website"
                optional
                type="url"
                value={state.website}
                onChange={(e) => state.setWebsite(e.target.value)}
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
              <h3 className="font-semibold text-sm text-foreground">
                3. Business Addresses
              </h3>
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
                value={state.registeredAddress}
                onChange={(e) => state.setRegisteredAddress(e.target.value)}
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
                value={state.operationalAddress}
                onChange={(e) => state.setOperationalAddress(e.target.value)}
                placeholder="Warehouse / Branch / Factory Address"
              />
            </div>

            {/* State */}
            <FormSelect
              label="State / Union Territory"
              required
              value={state.stateName}
              onValueChange={(val) => state.setStateName(val)}
              options={INDIAN_STATES}
              placeholder="Select State"
            />

            {/* City */}
            <FormField
              label="City"
              required
              value={state.city}
              onChange={(e) => state.setCity(e.target.value)}
              placeholder="Mumbai"
            />

            {/* PIN Code */}
            <div className="md:col-span-2">
              <FormField
                label="PIN Code"
                required
                maxLength={6}
                value={state.pincode}
                onChange={(e) => state.setPincode(e.target.value.replace(/\D/g, ""))}
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
