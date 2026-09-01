import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/shared/lib/queryKeys";
import { vendorApi } from "../api/vendorApi";
import type { VendorRecord } from "../types/vendor";

export interface VendorDirectoryFilters {
  search?: string;
  industry?: string;
  status?: string;
  recurring?: boolean | string;
  contractType?: string;
  currency?: string;
  page?: number;
  size?: number;
}

export function useVendorDirectory(initialFilters?: VendorDirectoryFilters) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(initialFilters?.page ?? 1);
  const [size, setSize] = useState(initialFilters?.size ?? 50);
  const [search, setSearch] = useState(initialFilters?.search ?? "");
  const [industry, setIndustry] = useState(initialFilters?.industry ?? "");
  const [status, setStatus] = useState(initialFilters?.status ?? "");
  const [recurring, setRecurring] = useState<string>(
    initialFilters?.recurring === true
      ? "true"
      : initialFilters?.recurring === false
        ? "false"
        : typeof initialFilters?.recurring === "string"
          ? initialFilters.recurring
          : "",
  );
  const [contractType, setContractType] = useState(initialFilters?.contractType ?? "");
  const [currency, setCurrency] = useState(initialFilters?.currency ?? "");

  const queryParams = useMemo(() => {
    let parsedRecurring: boolean | undefined = undefined;
    if (recurring === "true" || recurring === "1") parsedRecurring = true;
    else if (recurring === "false" || recurring === "0") parsedRecurring = false;

    return {
      page,
      size,
      search: search.trim() || undefined,
      industry: industry || undefined,
      status: status || undefined,
      recurring: parsedRecurring,
      contract_type: contractType || undefined,
      currency: currency || undefined,
    };
  }, [page, size, search, industry, status, recurring, contractType, currency]);

  const query = useQuery({
    queryKey: queryKeys.hr.vendors.all(queryParams),
    queryFn: async () => {
      const res = await vendorApi.getAll(queryParams);
      const data = res?.data?.data ?? res?.data ?? {};
      return {
        items: (data.items ?? data.vendors ?? data.records ?? (Array.isArray(data) ? data : [])) as VendorRecord[],
        total: Number(data.total ?? data.totalCount ?? data.count ?? 0),
        page: Number(data.page ?? page),
        size: Number(data.size ?? size),
      };
    },
    placeholderData: (previousData) => previousData,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<VendorRecord> }) => {
      return vendorApi.updateVendor(id, patch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr", "vendors"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.vendor() });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return vendorApi.deleteVendor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr", "vendors"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.vendor() });
    },
  });

  const saveBatch = async (dirtyMap: Record<string, Partial<VendorRecord>>) => {
    const entries = Object.entries(dirtyMap);
    if (entries.length === 0) return;

    let successCount = 0;
    let errorCount = 0;

    for (const [id, patch] of entries) {
      try {
        await vendorApi.updateVendor(id, patch);
        successCount++;
      } catch (err: any) {
        errorCount++;
      }
    }

    queryClient.invalidateQueries({ queryKey: ["hr", "vendors"] });
    queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.vendor() });

    if (errorCount === 0) {
      toast.success(`Successfully saved ${successCount} vendor record${successCount > 1 ? "s" : ""}.`);
    } else {
      toast.error(`Saved ${successCount} records, but ${errorCount} failed.`);
    }
  };

  const deleteBatch = async (ids: string[]) => {
    if (ids.length === 0) return;

    let successCount = 0;
    let errorCount = 0;

    for (const id of ids) {
      try {
        await vendorApi.deleteVendor(id);
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }

    queryClient.invalidateQueries({ queryKey: ["hr", "vendors"] });
    queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.vendor() });

    if (errorCount === 0) {
      toast.success(`Deleted ${successCount} vendor record${successCount > 1 ? "s" : ""}.`);
    } else {
      toast.error(`Deleted ${successCount} records, but ${errorCount} failed.`);
    }
  };

  return {
    vendors: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    page,
    setPage,
    size,
    setSize,
    search,
    setSearch,
    industry,
    setIndustry,
    status,
    setStatus,
    recurring,
    setRecurring,
    contractType,
    setContractType,
    currency,
    setCurrency,
    refetch: query.refetch,
    updateMutation,
    deleteMutation,
    saveBatch,
    deleteBatch,
  };
}
