import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { setEmployeeStep, resetEmployee } from "@/shared/store/slices/hrSlice";
import { EmployeeUploadDropzone } from "./EmployeeUploadDropzone";
import { EmployeePreviewStep } from "./EmployeePreviewStep";

export function EmployeeUploadPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.hr.employee.step);

  const handleBack = () => {
    if (step === "preview") {
      dispatch(setEmployeeStep("upload"));
    } else {
      dispatch(resetEmployee());
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
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Upload Employee List
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Import your employee master data via Excel or manual entry.
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
              <EmployeeUploadDropzone />
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
              <EmployeePreviewStep />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
