import React, { useState } from "react";
import { useAppDispatch } from "@/shared/store";
import { resetClient, setClientPreview } from "@/shared/store/slices/cfoSlice";
import { useClientImport } from "../../hooks/useClient";
import { clientApi, normalizeClientPreviewResponse } from "../../api/clientApi";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { ClientPreviewResponse } from "../../types/client";

export function ClientStickyFooter({
  recordCount,
  errorCount,
  backendPreview,
}: {
  recordCount: number;
  errorCount: number;
  backendPreview: ClientPreviewResponse;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const importMutation = useClientImport();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);

  const handleCancel = () => {
    dispatch(resetClient());
    navigate({ to: "/cfo" });
  };

  const handleImport = async () => {
    if (!backendPreview || !backendPreview.records) return;

    try {
      setIsRevalidating(true);
      const res = await clientApi.previewClients(backendPreview.records);
      const freshPreview = normalizeClientPreviewResponse(res.data, backendPreview.records);

      dispatch(setClientPreview(freshPreview));

      if (freshPreview.summary && freshPreview.summary.errors > 0) {
        toast.error(
          `Found ${freshPreview.summary.errors} errors during validation. Please resolve them before importing.`,
        );
        setIsRevalidating(false);
        return;
      }

      importMutation.mutate(freshPreview, {
        onSuccess: () => {
          setShowSuccess(true);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.detail ||
            err?.response?.data?.message ||
            err?.message ||
            "Import failed due to a server error. Your data is preserved — please try again.";
          toast.error(msg, { duration: 6000 });
        },
        onSettled: () => {
          setIsRevalidating(false);
        },
      });
    } catch (err: any) {
      setIsRevalidating(false);
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Validation failed prior to import. Please check your data.",
      );
    }
  };

  const isImporting = importMutation.isPending || isRevalidating;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border shadow-lg px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {recordCount} Client Record{recordCount !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-text-secondary">
                {errorCount > 0 ? (
                  <span className="text-destructive font-medium">
                    {errorCount} error{errorCount !== 1 ? "s" : ""} require resolution
                  </span>
                ) : (
                  <span className="text-emerald-600 font-medium">All records validated and ready</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              disabled={isImporting}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-xs font-semibold text-text-secondary hover:bg-surface-alt transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={isImporting || errorCount > 0 || recordCount === 0}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-xs font-semibold text-white shadow-brand hover:bg-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed gap-2"
            >
              {isImporting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isRevalidating
                ? "Validating..."
                : importMutation.isPending
                ? "Importing..."
                : `Import ${recordCount} Client${recordCount !== 1 ? "s" : ""}`}
            </button>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 mb-4">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <DialogTitle className="text-center text-xl">Import Complete</DialogTitle>
            <p className="text-center text-sm text-text-secondary mt-1">
              Successfully imported {recordCount} client record{recordCount !== 1 ? "s" : ""} into your portfolio.
            </p>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => {
                dispatch(resetClient());
                navigate({ to: "/cfo/clients" });
              }}
              className="w-full inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-brand hover:bg-primary-hover transition"
            >
              View Client Directory
            </button>
            <button
              onClick={() => {
                dispatch(resetClient());
                setShowSuccess(false);
              }}
              className="w-full inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-text-secondary hover:bg-surface-alt transition"
            >
              Import More Clients
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
