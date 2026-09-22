import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  FileUp,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RotateCw,
  Trash2,
  Check,
  ChevronDown,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import {
  setVendorRowAgreement,
  setClientRowAgreement,
  applyVendorExtractedData,
  applyClientExtractedData,
} from "@/shared/store/slices/cfoSlice";
import { vendorApi } from "../../api/vendorApi";
import { clientApi } from "../../api/clientApi";
import type { RowAgreementState, ExtractedAgreementData } from "../../types/agreement";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";

interface ContractUploadCellProps {
  entityType: "vendor" | "client";
  uploadId?: string;
  rowId: string;
  record: any;
  readOnly?: boolean;
}

export function ContractUploadCell({
  entityType,
  uploadId,
  rowId,
  record,
  readOnly = false,
}: ContractUploadCellProps) {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Read agreement state from Redux store for this row
  const agreementState =
    useAppSelector((state) => {
      if (entityType === "vendor") {
        return state.cfo?.vendor?.agreements?.[rowId];
      } else {
        return state.cfo?.client?.agreements?.[rowId];
      }
    }) || { status: "none" };

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const api = entityType === "vendor" ? vendorApi : clientApi;

  // Helper to dispatch agreement state updates
  const updateAgreementState = useCallback(
    (patch: Partial<RowAgreementState>) => {
      if (entityType === "vendor") {
        dispatch(setVendorRowAgreement({ rowId, agreement: patch }));
      } else {
        dispatch(setClientRowAgreement({ rowId, agreement: patch }));
      }
    },
    [dispatch, entityType, rowId],
  );

  // Trigger file selection dialog
  const handleOpenFileDialog = () => {
    if (readOnly) return;
    if (!uploadId) {
      toast.error("Upload staging record required. Please upload the file first.");
      return;
    }
    fileInputRef.current?.click();
  };

  // Handle PDF file selection & upload (without auto-extraction)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate PDF extension / MIME
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      toast.error("Only PDF files are supported for contract agreements.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate size (max 20MB)
    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("File exceeds 20MB limit.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!uploadId) {
      toast.error("Missing upload ID for staging.");
      return;
    }

    try {
      updateAgreementState({
        status: "uploading",
        fileName: file.name,
        error: undefined,
        isApplied: false,
      });
      setUploadProgress(10);

      const res = await api.uploadAgreement(uploadId, rowId, file, (event) => {
        if (event.total) {
          const percent = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(percent);
        }
      });

      const data = res.data?.data;
      updateAgreementState({
        status: "uploaded",
        fileName: data?.file_name || file.name,
        documentId: data?.document_id,
        error: undefined,
      });
      toast.success("Contract agreement attached. Click 'Extract' to process terms.");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to upload contract agreement.";
      updateAgreementState({
        status: "failed",
        error: msg,
      });
      toast.error(msg);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Trigger background extraction explicitly
  const handleTriggerExtract = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (readOnly || !uploadId) return;

    try {
      updateAgreementState({
        status: "processing",
        error: undefined,
      });
      await api.extractAgreement(uploadId, rowId);
      toast.info("Extracting contract agreement terms with AI...");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to trigger agreement extraction.";
      updateAgreementState({
        status: "failed",
        error: msg,
      });
      toast.error(msg);
    }
  };

  // Polling effect while in "processing" state
  useEffect(() => {
    if (agreementState.status !== "processing" || !uploadId) return;

    let attempts = 0;
    const maxAttempts = 30; // 60 seconds at 2s interval

    const timer = setInterval(async () => {
      attempts += 1;
      try {
        const res = await api.getAgreementExtraction(uploadId, rowId);
        const data = res.data?.data;
        const status = data?.status?.toUpperCase();

        if (status === "EXTRACTED" || status === "COMPLETED") {
          clearInterval(timer);
          updateAgreementState({
            status: "extracted",
            extractedData: data.extracted_data,
            fieldConfidence: data.field_confidence,
            fileName: data.file_name || agreementState.fileName,
            error: undefined,
          });
          toast.success("Contract terms extracted successfully!");
        } else if (status === "EXTRACTION_FAILED" || status === "FAILED") {
          clearInterval(timer);
          updateAgreementState({
            status: "failed",
            error: data?.error_message || "Extraction encountered an error.",
          });
          toast.error("Contract extraction failed.");
        } else if (attempts >= maxAttempts) {
          clearInterval(timer);
          updateAgreementState({
            status: "failed",
            error: "Extraction timed out. You can retry.",
          });
          toast.error("Extraction timed out.");
        }
      } catch (err: any) {
        if (attempts >= maxAttempts) {
          clearInterval(timer);
          updateAgreementState({
            status: "failed",
            error: "Failed checking extraction status.",
          });
        }
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [agreementState.status, agreementState.fileName, api, rowId, updateAgreementState, uploadId]);

  // Apply extracted data to preview row in Redux store
  const handleApplyExtracted = () => {
    if (!agreementState.extractedData) return;

    if (entityType === "vendor") {
      dispatch(
        applyVendorExtractedData({
          rowId,
          extracted: agreementState.extractedData,
        }),
      );
    } else {
      dispatch(
        applyClientExtractedData({
          rowId,
          extracted: agreementState.extractedData,
        }),
      );
    }
    setIsPopoverOpen(false);
    toast.success("Extracted agreement terms applied to row. You can Undo if needed.");
  };

  // View PDF in a new tab
  const handleViewPdf = () => {
    if (!uploadId) return;
    const url = api.getAgreementFileUrl(uploadId, rowId);
    window.open(url, "_blank");
  };

  // Remove/detach agreement
  const handleRemoveAgreement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateAgreementState({
      status: "none",
      fileName: undefined,
      documentId: undefined,
      extractedData: undefined,
      fieldConfidence: undefined,
      isApplied: false,
      error: undefined,
    });
    setIsPopoverOpen(false);
    toast.info("Agreement unattached.");
  };

  // Calculate average confidence score
  const avgConfidence = agreementState.fieldConfidence
    ? Math.round(
        (Object.values(agreementState.fieldConfidence).reduce((a, b) => a + b, 0) /
          Object.values(agreementState.fieldConfidence).length) *
          100,
      )
    : 95;

  return (
    <div className="flex items-center gap-1.5 min-w-[160px]">
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* STATE 1: NO AGREEMENT */}
      {agreementState.status === "none" && (
        <button
          type="button"
          onClick={handleOpenFileDialog}
          disabled={readOnly || !uploadId}
          className={cn(
            "group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer",
            "border border-border/80 bg-surface/80 hover:bg-surface-alt hover:border-primary/40 text-text-secondary hover:text-foreground shadow-2xs hover:shadow-xs",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        >
          <FileUp className="h-3.5 w-3.5 text-text-tertiary group-hover:text-primary transition-colors" />
          <span>Attach PDF</span>
        </button>
      )}

      {/* STATE 2: UPLOADING */}
      {agreementState.status === "uploading" && (
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/5 border border-primary/20 text-primary animate-pulse">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
          <span className="tabular-nums">Uploading {uploadProgress > 0 ? `${uploadProgress}%` : "..."}</span>
        </div>
      )}

      {/* STATE 3: AGREEMENT UPLOADED (Ready to extract) */}
      {agreementState.status === "uploaded" && (
        <div className="group/cell flex items-center gap-1.5">
          <div className="inline-flex items-center rounded-lg border border-border/80 bg-surface shadow-2xs hover:border-border transition-all duration-150 overflow-hidden divide-x divide-border/60">
            {/* Document link / view */}
            <button
              type="button"
              onClick={handleViewPdf}
              className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-foreground hover:text-primary transition-colors max-w-[125px] group/doc cursor-pointer"
              title={`Click to view ${agreementState.fileName || "agreement.pdf"}`}
            >
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <FileText className="h-2.5 w-2.5" />
              </div>
              <span className="truncate font-medium text-[11.5px] text-text-secondary group-hover/doc:text-foreground">
                {agreementState.fileName || "agreement.pdf"}
              </span>
            </button>

            {/* AI Extract Action */}
            {!readOnly && (
              <button
                type="button"
                onClick={handleTriggerExtract}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all duration-150 cursor-pointer"
                title="Extract contract agreement details with Spotlite AI"
              >
                <Sparkles className="h-3 w-3 shrink-0" />
                <span>Extract</span>
              </button>
            )}
          </div>

          {/* Discrete Remove action */}
          {!readOnly && (
            <button
              type="button"
              onClick={handleRemoveAgreement}
              className="inline-flex items-center justify-center h-6 w-6 rounded-md text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition-colors opacity-40 hover:opacity-100 group-hover/cell:opacity-80 shrink-0 cursor-pointer"
              title="Remove document"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* STATE 4: PROCESSING / EXTRACTING */}
      {agreementState.status === "processing" && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/8 border border-primary/20 text-primary animate-pulse shadow-2xs">
          <Sparkles className="h-3 w-3 text-primary animate-spin" />
          <Loader2 className="h-3 w-3 animate-spin text-primary" />
          <span>Extracting terms…</span>
        </div>
      )}

      {/* STATE 5: EXTRACTION COMPLETED */}
      {agreementState.status === "extracted" && (
        <div className="group/cell flex items-center gap-1.5">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer border shadow-2xs",
                  agreementState.isApplied
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-primary/10 border-primary/25 text-primary hover:bg-primary/15 hover:border-primary/35",
                )}
              >
                {agreementState.isApplied ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                )}
                <span className="font-semibold">
                  {agreementState.isApplied ? "Applied" : "Terms Ready"}
                </span>
                <span className="font-mono text-[10px] opacity-75 tabular-nums">
                  ({avgConfidence}%)
                </span>
                <ChevronDown className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-transform duration-150 group-data-[state=open]:rotate-180" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-84 p-4 shadow-xl border border-border bg-surface text-foreground rounded-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold truncate max-w-[160px]" title={agreementState.fileName}>
                      {agreementState.fileName || "Contract Agreement"}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0",
                      avgConfidence >= 90
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20",
                    )}
                  >
                    {avgConfidence}% Match
                  </span>
                </div>

                {/* Extracted Fields Table */}
                <div className="space-y-1.5 text-xs">
                  <div className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">
                    Extracted Contract Terms
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-surface-alt/50 p-2.5 rounded-lg border border-border/80">
                    <div>
                      <div className="text-[10px] text-text-tertiary">Contract Value</div>
                      <div className="font-semibold font-mono text-xs text-foreground mt-0.5">
                        {agreementState.extractedData?.currency || "INR"}{" "}
                        {agreementState.extractedData?.contract_value != null
                          ? Number(agreementState.extractedData.contract_value).toLocaleString()
                          : "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-text-tertiary">Contract Type</div>
                      <div className="font-semibold text-xs text-foreground mt-0.5">
                        {agreementState.extractedData?.contract_type || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-text-tertiary">Start Date</div>
                      <div className="font-mono text-xs text-foreground mt-0.5">
                        {agreementState.extractedData?.contract_start_date || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-text-tertiary">End Date</div>
                      <div className="font-mono text-xs text-foreground mt-0.5">
                        {agreementState.extractedData?.contract_end_date || "—"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={handleViewPdf}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-text-secondary hover:text-foreground transition-colors cursor-pointer"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>View PDF</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={handleTriggerExtract}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-text-tertiary hover:text-foreground px-2 py-1 rounded-md transition-colors cursor-pointer"
                        title="Re-run AI extraction"
                      >
                        <RotateCw className="h-3 w-3" />
                        <span>Re-extract</span>
                      </button>
                    )}

                    {!readOnly && (
                      <button
                        type="button"
                        onClick={handleApplyExtracted}
                        disabled={agreementState.isApplied}
                        className={cn(
                          "inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer",
                          agreementState.isApplied
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 cursor-default"
                            : "bg-primary text-primary-foreground hover:bg-primary-hover active:scale-95",
                        )}
                      >
                        {agreementState.isApplied ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Applied</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3 w-3" />
                            <span>Apply to Row</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {!readOnly && (
            <button
              type="button"
              onClick={handleRemoveAgreement}
              className="inline-flex items-center justify-center h-6 w-6 rounded-md text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition-colors opacity-40 hover:opacity-100 group-hover/cell:opacity-80 shrink-0 cursor-pointer"
              title="Remove agreement"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* STATE 6: FAILED */}
      {agreementState.status === "failed" && (
        <div className="group/cell flex items-center gap-1.5">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-destructive/30 bg-destructive/8 text-destructive text-xs font-medium shadow-2xs"
            title={agreementState.error || "Extraction failed"}
          >
            <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0" />
            <span className="truncate max-w-[80px]">Failed</span>
          </div>

          {!readOnly && (
            <button
              type="button"
              onClick={handleTriggerExtract}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-surface hover:bg-surface-alt border border-border text-foreground transition-colors shadow-2xs cursor-pointer"
              title="Retry extraction"
            >
              <RotateCw className="h-3 w-3" />
              <span>Retry</span>
            </button>
          )}

          {!readOnly && (
            <button
              type="button"
              onClick={handleRemoveAgreement}
              className="inline-flex items-center justify-center h-6 w-6 rounded-md text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition-colors opacity-50 hover:opacity-100 group-hover/cell:opacity-80 shrink-0 cursor-pointer"
              title="Remove failed agreement"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
