import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cfoKeys } from "../api/queryKeys";
import { clientApi } from "../api/clientApi";
import type { ClientRecord } from "../types/client";

export interface ClientDirectoryFilters {
  search?: string;
  category?: string;
  industry?: string;
  status?: string;
  recurring?: boolean | string;
  contractType?: string;
  currency?: string;
  page?: number;
  size?: number;
}

export function getClientRowKey(clientId: string, category: string): string {
  return `${clientId}:::${category}`;
}

export function parseClientRowKey(key: string): { clientId: string; category: string } {
  const parts = key.split(":::");
  return {
    clientId: parts[0] || "",
    category: parts[1] || "",
  };
}

export function useClientDirectory(initialFilters?: ClientDirectoryFilters) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(initialFilters?.page ?? 1);
  const [size, setSize] = useState(initialFilters?.size ?? 50);
  const [search, setSearch] = useState(initialFilters?.search ?? "");
  const [category, setCategory] = useState(initialFilters?.category ?? "");
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
      category: category || undefined,
      industry: industry || undefined,
      status: status || undefined,
      recurring: parsedRecurring,
      contract_type: contractType || undefined,
      currency: currency || undefined,
    };
  }, [page, size, search, category, industry, status, recurring, contractType, currency]);

  const query = useQuery({
    queryKey: cfoKeys.clients.all(queryParams),
    queryFn: async () => {
      const res = await clientApi.getAll(queryParams);
      const data = res?.data?.data ?? res?.data ?? {};
      const rawItems = (data.items ?? data.clients ?? data.records ?? (Array.isArray(data) ? data : [])) as ClientRecord[];

      // Client listing might not yet filter on the backend for search/industry/category/status
      // We apply a client-side defensive filter to guarantee accurate UI filtering
      let items = rawItems;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        items = items.filter(
          (c) =>
            (c.client_name || c.clientName || "").toLowerCase().includes(q) ||
            (c.client_id || c.clientId || "").toLowerCase().includes(q) ||
            (c.contract_id || c.contractId || "").toLowerCase().includes(q) ||
            (c.legal_name || c.legalName || "").toLowerCase().includes(q)
        );
      }
      if (category) {
        items = items.filter((c) => c.category === category);
      }
      if (industry) {
        items = items.filter((c) => c.industry === industry);
      }
      if (status) {
        items = items.filter((c) => c.status === status);
      }
      if (recurring === "true") {
        items = items.filter((c) => {
          const val = String(c.recurring || "").toLowerCase();
          return val === "yes" || val === "true" || val === "1";
        });
      } else if (recurring === "false") {
        items = items.filter((c) => {
          const val = String(c.recurring || "").toLowerCase();
          return val === "no" || val === "false" || val === "0";
        });
      }

      return {
        items,
        total: Number(data.total ?? items.length),
        page: Number(data.page ?? page),
        size: Number(data.size ?? size),
      };
    },
    placeholderData: (previousData) => previousData,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      clientId,
      category,
      patch,
    }: {
      clientId: string;
      category: string;
      patch: Partial<ClientRecord>;
    }) => {
      return clientApi.updateClient(clientId, category, patch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
      queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ clientId, category }: { clientId: string; category: string }) => {
      return clientApi.deleteClient(clientId, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
      queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });
    },
  });

  const saveBatch = async (dirtyMap: Record<string, Partial<ClientRecord>>) => {
    const entries = Object.entries(dirtyMap);
    if (entries.length === 0) return;

    let successCount = 0;
    let errorCount = 0;

    for (const [key, patch] of entries) {
      const { clientId, category: rowCategory } = parseClientRowKey(key);
      const targetCategory = (patch.category || rowCategory).trim();
      try {
        await clientApi.updateClient(clientId, targetCategory, patch);
        successCount++;
      } catch (err: any) {
        errorCount++;
      }
    }

    queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
    queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });

    if (errorCount === 0) {
      toast.success(`Successfully saved ${successCount} client record${successCount > 1 ? "s" : ""}.`);
    } else {
      toast.error(`Saved ${successCount} records, but ${errorCount} failed.`);
    }
  };

  const deleteBatch = async (keys: string[]) => {
    if (keys.length === 0) return;

    let successCount = 0;
    let errorCount = 0;

    for (const key of keys) {
      const { clientId, category: rowCategory } = parseClientRowKey(key);
      try {
        await clientApi.deleteClient(clientId, rowCategory);
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }

    queryClient.invalidateQueries({ queryKey: ["cfo", "clients"] });
    queryClient.invalidateQueries({ queryKey: ["cfo", "dashboard"] });

    if (errorCount === 0) {
      toast.success(`Deleted ${successCount} client record${successCount > 1 ? "s" : ""}.`);
    } else {
      toast.error(`Deleted ${successCount} records, but ${errorCount} failed.`);
    }
  };

  return {
    clients: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    page,
    setPage,
    size,
    setSize,
    search,
    setSearch,
    category,
    setCategory,
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
    updateMutation,
    deleteMutation,
    saveBatch,
    deleteBatch,
    refetch: query.refetch,
  };
}
