import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { hrApi } from "@/shared/lib/hrAxios";
import { VendorPreviewTable } from "./vendor/VendorPreviewTable";
import type { VendorRecord } from "../types/vendor";

interface CFOUploadPreviewModalProps {
  uploadId: string | null;
  onClose: () => void;
}

export function CFOUploadPreviewModal({ uploadId, onClose }: CFOUploadPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    records: VendorRecord[];
    schema_def?: any;
  } | null>(null);

  useEffect(() => {
    if (uploadId) {
      setLoading(true);
      hrApi
        .get(`/dashboard/history/${uploadId}/preview`)
        .then((res: unknown) => {
          const rawPayload =
            (res as { data?: { data?: unknown } })?.data?.data ??
            (res as { data?: unknown })?.data ??
            res;
          const payload = rawPayload as any;

          const rawRecords = Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.records)
            ? payload.records
            : Array.isArray(payload?.data)
            ? payload.data
            : [];

          if (!rawRecords.length && !payload) {
            setData(null);
            return;
          }

          const recordsWithRowId = rawRecords.map((r: any, idx: number) => ({
            ...r,
            rowId: r.rowId || r.id || r._id || `hist-${idx}`,
          }));

          setData({
            records: recordsWithRowId,
            schema_def: payload?.schema_def || payload?.schemaDef || null,
          });
        })
        .catch((err: unknown) => {
          console.error("Failed to load historical vendor preview data", err);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setData(null);
    }
  }, [uploadId]);

  const emptySet = new Set<string>();

  return (
    <Dialog open={!!uploadId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[85vw] w-full p-6 h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-lg font-bold tracking-tight text-foreground">
            Vendor Upload Preview
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-surface-alt rounded-xl mt-4 border border-border">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary py-20">
              <Loader2 className="h-6 w-6 animate-spin mb-3 text-primary" />
              <p className="text-xs font-medium text-text-secondary">Loading historical records...</p>
            </div>
          ) : data?.records?.length ? (
            <VendorPreviewTable
              vendors={data.records}
              errorRowIds={emptySet}
              warningRowIds={emptySet}
              schemaDef={data.schema_def}
              readOnly={true}
            />
          ) : (
            <div className="text-center py-20 text-text-tertiary flex items-center justify-center h-full text-xs font-medium">
              No records found for this upload.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
