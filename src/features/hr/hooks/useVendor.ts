import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/queryKeys";
import { vendorApi } from "../api/vendorApi";
import type { VendorRecord, VendorPreviewResponse } from "../types/vendor";
import type { AxiosProgressEvent } from "axios";

export function useVendorUpload() {
  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progressEvent: AxiosProgressEvent) => void;
    }) => {
      return vendorApi.uploadExcel(file, onProgress);
    },
  });
}

export function useVendorManualPreview() {
  return useMutation({
    mutationFn: (data: VendorRecord[]) => vendorApi.previewManual(data),
  });
}

export function useVendorImport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (previewData: VendorPreviewResponse | unknown) =>
      vendorApi.importVendors(previewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["hr", "vendors"] });
    },
  });
}

export function useGetVendors(params?: {
  page?: number;
  size?: number;
  search?: string;
  industry?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: queryKeys.hr.vendors.all(params),
    queryFn: () => vendorApi.getAll(params),
  });
}
