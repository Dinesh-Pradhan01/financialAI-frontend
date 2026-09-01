import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { setVendorStep, resetVendor } from "@/shared/store/slices/hrSlice";
import { VendorUploadDropzone } from "./VendorUploadDropzone";
import { VendorPreviewStep } from "./VendorPreviewStep";

export function VendorUploadPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.hr.vendor.step);

  const handleBack = () => {
    if (step === "preview") {
      dispatch(setVendorStep("upload"));
    } else {
      dispatch(resetVendor());
      navigate({ to: "/hr" });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface hover:bg-surface-alt transition text-text-secondary"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Upload Vendor Portfolio
          </h1>
          <p className="text-text-secondary mt-0.5 text-xs sm:text-sm leading-relaxed">
            Import your vendor master data via Excel or manual entry.
          </p>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
            >
              <VendorUploadDropzone />
            </motion.div>
          )}

          {step === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
            >
              <VendorPreviewStep />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
