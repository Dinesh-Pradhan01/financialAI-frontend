import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, ShieldCheck, FileUp, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  validateFile,
  ACCEPTED_FILE_FORMATS_STRING,
} from "../lib/uploadHelpers";

export interface HeroUploadDropzoneProps {
  onFileSelected: (file: File) => void;
  className?: string;
}

export function HeroUploadDropzone({
  onFileSelected,
  className,
}: HeroUploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    const result = validateFile(file);
    if (!result.valid) {
      toast.error(result.error || "Invalid file");
      return;
    }
    onFileSelected(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = "";
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileProcess(file);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-surface shadow-xs transition-all duration-200 p-3 sm:p-4",
        className
      )}
    >
      <motion.div
        whileHover={{ scale: 1.002 }}
        transition={{ duration: 0.2 }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative overflow-hidden rounded-xl border-2 border-dashed p-6 sm:p-8 text-center transition-all duration-200 cursor-pointer select-none",
          isDragOver
            ? "border-brand bg-brand/[0.06] ring-4 ring-brand/15 shadow-sm"
            : "border-border-c bg-surface-alt/25 hover:border-brand/40 hover:bg-brand/[0.02]"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          className="hidden"
          accept={ACCEPTED_FILE_FORMATS_STRING}
        />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-3.5">
          {/* Icon Badge */}
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-200 shadow-2xs",
              isDragOver
                ? "bg-brand/15 border-brand/40 text-brand scale-110"
                : "bg-brand/10 border-brand/20 text-brand group-hover:scale-105"
            )}
          >
            {isDragOver ? (
              <FileUp className="h-6 w-6 animate-pulse text-brand" />
            ) : (
              <Upload className="h-5 w-5 text-brand" />
            )}
          </div>

          {/* Text & Primary Action Button */}
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-sm sm:text-base font-bold font-display text-text-primary tracking-tight">
              {isDragOver ? "Drop your file to categorize" : "Upload Company Documents"}
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Drag &amp; drop files here, or click to browse corporate filings
            </p>
          </div>

          <div className="pt-0.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="h-8 px-3.5 text-xs font-semibold border-border-c bg-surface text-text-primary hover:border-brand/40 hover:bg-surface-alt hover:text-brand gap-1.5 shadow-2xs cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5 text-brand" />
              <span>Browse Files</span>
            </Button>
          </div>

          {/* Format Badges & Security Reassurance */}
          <div className="flex items-center justify-center gap-2 pt-1 flex-wrap text-text-tertiary">
            <span className="px-2 py-0.5 rounded-md bg-surface border border-border/70 font-mono text-[10px] font-medium text-text-secondary">
              PDF
            </span>
            <span className="px-2 py-0.5 rounded-md bg-surface border border-border/70 font-mono text-[10px] font-medium text-text-secondary">
              PNG
            </span>
            <span className="px-2 py-0.5 rounded-md bg-surface border border-border/70 font-mono text-[10px] font-medium text-text-secondary">
              JPG
            </span>
            <span className="text-xs text-border">•</span>
            <span className="font-mono text-[11px] text-text-tertiary">
              Max 10MB
            </span>
            <span className="text-xs text-border">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-text-secondary font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" /> 256-bit Encrypted
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
