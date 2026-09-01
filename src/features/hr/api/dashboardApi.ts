import { hrApi } from "@/shared/lib/hrAxios";

export const dashboardApi = {
  getEmployeeMetrics: () => hrApi.get("/dashboard/employee"),
  getVendorMetrics: () => hrApi.get("/dashboard/vendor"),
  getHistory: () => hrApi.get("/dashboard/history"),
  getHistoryPreview: (uploadId: string) => hrApi.get(`/dashboard/history/${uploadId}/preview`),
};
