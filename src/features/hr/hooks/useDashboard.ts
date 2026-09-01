import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/queryKeys";
import { dashboardApi } from "../api/dashboardApi";
import type { EmployeeMetrics, VendorMetrics, UploadHistoryItem } from "../types/dashboard";

function normalizeEmployeeMetrics(raw: any): EmployeeMetrics {
  const data = raw?.data?.data ?? raw?.data ?? raw ?? {};
  const totalEmployees =
    Number(
      data.totalEmployees ??
      data.total_employees ??
      data.total_headcount ??
      data.total_records ??
      data.total ??
      data.count ??
      0
    ) || 0;
  const activeEmployees =
    Number(
      data.activeEmployees ??
      data.active_employees ??
      data.active_headcount ??
      data.active ??
      totalEmployees
    ) || 0;

  return {
    totalEmployees,
    activeEmployees,
  };
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
    const rawType = item.upload_type ?? item.uploadType ?? item.type ?? "Employee";
    const upload_type =
      typeof rawType === "string" && rawType.toLowerCase().includes("vendor")
        ? "Vendor"
        : "Employee";

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
        (upload_type === "Vendor" ? "Vendor Data" : "Employee Data")
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

export function useHRDashboard() {
  const employeeQ = useQuery({
    queryKey: queryKeys.hr.dashboard.employee(),
    queryFn: dashboardApi.getEmployeeMetrics,
  });

  const vendorQ = useQuery({
    queryKey: queryKeys.hr.dashboard.vendor(),
    queryFn: dashboardApi.getVendorMetrics,
  });

  const historyQ = useQuery({
    queryKey: queryKeys.hr.dashboard.history(),
    queryFn: dashboardApi.getHistory,
  });

  return {
    employeeMetrics: employeeQ.data ? normalizeEmployeeMetrics(employeeQ.data) : undefined,
    vendorMetrics: vendorQ.data ? normalizeVendorMetrics(vendorQ.data) : undefined,
    history: historyQ.data ? normalizeHistory(historyQ.data) : [],
    isLoading: employeeQ.isLoading || vendorQ.isLoading || historyQ.isLoading,
  };
}
