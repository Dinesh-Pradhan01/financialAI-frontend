import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cfoKeys } from "../api/queryKeys";
import { clientApi } from "../api/clientApi";
import type { ClientRecord, ClientPreviewResponse } from "../types/client";
import type { AxiosProgressEvent } from "axios";

export function useClientUpload() {
  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progressEvent: AxiosProgressEvent) => void;
    }) => {
      return clientApi.uploadExcel(file, onProgress);
    },
  });
}

export function useClientManualPreview() {
  return useMutation({
    mutationFn: (data: ClientRecord[]) => clientApi.previewManual(data),
  });
}

export function useClientImport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (previewData: ClientPreviewResponse | unknown) =>
      clientApi.importClients(previewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
      queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
    },
  });
}

export function useGetClients(params?: {
  page?: number;
  size?: number;
  search?: string;
  category?: string;
  industry?: string;
  status?: string;
  recurring?: boolean;
}) {
  return useQuery({
    queryKey: cfoKeys.clients.all(params),
    queryFn: () => clientApi.getAll(params),
  });
}
