import { useQuery } from "@tanstack/react-query";
import { cfoKeys } from "../api/queryKeys";
import { hrApi } from "@/shared/lib/hrAxios";

export interface VendorMetrics {
  totalVendors: number;
  recurringVendors: number;
}

export interface UploadHistoryItem {
  upload_id: string;
  upload_type: "Employee" | "Vendor";
  file_name: string;
  record_count: number;
  uploaded_at: string;
}

function normalizeVendorMetrics(raw: any): VendorMetrics {
  const data = raw?.data?.data ?? raw?.data ?? raw ?? {};
  const totalVendors =
    Number(
      data.totalVendors ??
      data.total_vendors ??
      data.total_records ??
      data.total ??
      data.count ??
      0
    ) || 0;
  const recurringVendors =
    Number(
      data.recurringVendors ??
      data.recurring_vendors ??
      data.recurring ??
      0
    ) || 0;

  return {
    totalVendors,
    recurringVendors,
  };
}

function normalizeHistory(raw: any): UploadHistoryItem[] {
  let list = raw?.data?.data ?? raw?.data ?? raw;
  if (list && typeof list === "object" && !Array.isArray(list)) {
    list = list.history ?? list.uploads ?? list.items ?? list.records ?? list.data ?? [];
  }
  if (!Array.isArray(list)) {
    return [];
  }

  return list.map((item: any) => {
    const rawType = item.upload_type ?? item.uploadType ?? item.type ?? "Vendor";
    const upload_type =
      typeof rawType === "string" && rawType.toLowerCase().includes("employee")
        ? "Employee"
        : "Vendor";

    const recordCount =
      Number(
        item.record_count ??
        item.recordCount ??
        item.total_records ??
        item.records_count ??
        (Array.isArray(item.records) ? item.records.length : undefined) ??
        item.count ??
        0
      ) || 0;

    return {
      upload_id: String(item.upload_id ?? item.uploadId ?? item.id ?? ""),
      upload_type,
      file_name: String(
        item.file_name ??
        item.fileName ??
        item.filename ??
        item.name ??
        (upload_type === "Employee" ? "Employee Data" : "Vendor Data")
      ),
      record_count: recordCount,
      uploaded_at: String(
        item.uploaded_at ??
        item.uploadedAt ??
        item.created_at ??
        item.createdAt ??
        item.timestamp ??
        item.date ??
        new Date().toISOString()
      ),
    };
  });
}

export function useCFODashboard() {
  const vendorQ = useQuery({
    queryKey: cfoKeys.dashboard.vendor(),
    queryFn: () => hrApi.get("/dashboard/vendor"),
  });

  const historyQ = useQuery({
    queryKey: cfoKeys.dashboard.history(),
    queryFn: () => hrApi.get("/dashboard/history"),
  });

  const allHistory = historyQ.data ? normalizeHistory(historyQ.data) : [];
  const vendorHistory = allHistory.filter((item) => item.upload_type === "Vendor");

  return {
    vendorMetrics: vendorQ.data ? normalizeVendorMetrics(vendorQ.data) : undefined,
    history: vendorHistory,
    isLoading: vendorQ.isLoading || historyQ.isLoading,
  };
}
