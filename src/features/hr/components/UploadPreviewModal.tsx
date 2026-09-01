import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { dashboardApi } from "../api/dashboardApi";
import { EmployeePreviewTable } from "./employee/EmployeePreviewTable";
import { VendorPreviewTable } from "./vendor/VendorPreviewTable";

import type { EmployeeRecord } from "../types/employee";
import type { VendorRecord } from "../types/vendor";

interface UploadPreviewModalProps {
  uploadId: string | null;
  onClose: () => void;
}

// Convert snake_case back to camelCase for the frontend components
function toCamelCase(str: string) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}

function convertKeysToCamelCase<T = unknown>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToCamelCase(v)) as unknown as T;
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>).reduce(
      (result, key) => {
        result[toCamelCase(key)] = convertKeysToCamelCase((obj as Record<string, unknown>)[key]);
        return result;
      },
      {} as Record<string, unknown>,
    ) as unknown as T;
  }
  return obj as T;
}

export function UploadPreviewModal({ uploadId, onClose }: UploadPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    upload_type: string | null;
    records: (EmployeeRecord & VendorRecord)[];
    schema_def?: any;
  } | null>(null);

  useEffect(() => {
    if (uploadId) {
      setLoading(true);
      dashboardApi
        .getHistoryPreview(uploadId)
        .then((res: unknown) => {
          // Handle nested .data cases just in case
          const rawPayload = (res as { data?: { data?: unknown } })?.data?.data ?? (res as { data?: unknown })?.data ?? res;
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
            upload_type: payload?.upload_type || payload?.uploadType || payload?.type || "Employee",
            records: recordsWithRowId,
            schema_def: payload?.schema_def || payload?.schemaDef || null,
          });
        })
        .catch((err: unknown) => {
          console.error("Failed to load preview data", err);
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
  const uploadTypeNormalized = data?.upload_type?.toLowerCase();

  return (
    <Dialog open={!!uploadId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[85vw] w-full p-6 h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-lg font-bold tracking-tight text-foreground">Upload Preview</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-surface-alt rounded-xl mt-4 border border-border">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary py-20">
              <Loader2 className="h-6 w-6 animate-spin mb-3 text-primary" />
              <p className="text-xs font-medium text-text-secondary">Loading historical records...</p>
            </div>
          ) : data?.records?.length ? (
            uploadTypeNormalized === "vendor" || uploadTypeNormalized?.includes("ven") ? (
              <VendorPreviewTable
                vendors={data.records}
                errorRowIds={emptySet}
                warningRowIds={emptySet}
                schemaDef={data.schema_def}
                readOnly={true}
              />
            ) : (
              <EmployeePreviewTable
                employees={data.records}
                errorRowIds={emptySet}
                warningRowIds={emptySet}
                schemaDef={data.schema_def}
                readOnly={true}
              />
            )
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
