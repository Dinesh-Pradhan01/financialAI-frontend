import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/queryKeys";
import { employeeApi } from "../api/employeeApi";
import type { EmployeeRecord, EmployeePreviewResponse } from "../types/employee";
import type { AxiosProgressEvent } from "axios";

export function useEmployeeUpload() {
  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progressEvent: AxiosProgressEvent) => void;
    }) => {
      return employeeApi.uploadExcel(file, onProgress);
    },
  });
}

export function useEmployeeManualPreview() {
  return useMutation({
    mutationFn: (data: EmployeeRecord[]) => employeeApi.previewManual(data),
  });
}

export function useEmployeeImport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (previewData: EmployeePreviewResponse | unknown) =>
      employeeApi.importEmployees(previewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
    },
  });
}

export function useGetEmployees(params?: {
  page?: number;
  size?: number;
  search?: string;
  department?: string;
  status?: string;
  employment_type?: string;
}) {
  return useQuery({
    queryKey: queryKeys.hr.employees.all(params),
    queryFn: () => employeeApi.getAll(params),
  });
}
