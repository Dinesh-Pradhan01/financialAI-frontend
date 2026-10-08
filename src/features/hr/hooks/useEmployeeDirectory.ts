import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/shared/lib/queryKeys";
import { employeeApi } from "../api/employeeApi";
import type { EmployeeRecord } from "../types/employee";

export interface EmployeeDirectoryFilters {
  search?: string;
  department?: string;
  status?: string;
  employmentType?: string;
  page?: number;
  size?: number;
}

export function useEmployeeDirectory(initialFilters?: EmployeeDirectoryFilters) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(initialFilters?.page ?? 1);
  const [size, setSize] = useState(initialFilters?.size ?? 50);
  const [search, setSearch] = useState(initialFilters?.search ?? "");
  const [department, setDepartment] = useState(initialFilters?.department ?? "");
  const [status, setStatus] = useState(initialFilters?.status ?? "");
  const [employmentType, setEmploymentType] = useState(initialFilters?.employmentType ?? "");

  const queryParams = useMemo(
    () => ({
      page,
      size,
      search: search.trim() || undefined,
      department: department || undefined,
      status: status || undefined,
      employment_type: employmentType || undefined,
    }),
    [page, size, search, department, status, employmentType],
  );

  const query = useQuery({
    queryKey: queryKeys.hr.employees.all(queryParams),
    queryFn: async () => {
      const res = await employeeApi.getAll(queryParams);
      const data = res?.data?.data ?? res?.data ?? {};
      return {
        items: (data.items ?? data.employees ?? data.records ?? (Array.isArray(data) ? data : [])) as EmployeeRecord[],
        total: Number(data.total ?? data.totalCount ?? data.count ?? 0),
        page: Number(data.page ?? page),
        size: Number(data.size ?? size),
      };
    },
    placeholderData: (previousData) => previousData,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<EmployeeRecord> }) => {
      return employeeApi.updateEmployee(id, patch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.employee() });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return employeeApi.deleteEmployee(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.employee() });
    },
  });

  const saveBatch = async (dirtyMap: Record<string, Partial<EmployeeRecord>>) => {
    const entries = Object.entries(dirtyMap);
    if (entries.length === 0) return;

    let successCount = 0;
    let errorCount = 0;

    for (const [id, patch] of entries) {
      try {
        await employeeApi.updateEmployee(id, patch);
        successCount++;
      } catch (err: any) {
        errorCount++;
      }
    }

    queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
    queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.employee() });

    if (errorCount === 0) {
      toast.success(`Successfully saved ${successCount} record${successCount > 1 ? "s" : ""}.`);
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
        await employeeApi.deleteEmployee(id);
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }

    queryClient.invalidateQueries({ queryKey: ["hr", "employees"] });
    queryClient.invalidateQueries({ queryKey: queryKeys.hr.dashboard.employee() });

    if (errorCount === 0) {
      toast.success(`Deleted ${successCount} employee record${successCount > 1 ? "s" : ""}.`);
    } else {
      toast.error(`Deleted ${successCount} records, but ${errorCount} failed.`);
    }
  };

  return {
    employees: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    page,
    setPage,
    size,
    setSize,
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
    employmentType,
    setEmploymentType,
    refetch: query.refetch,
    updateMutation,
    deleteMutation,
    saveBatch,
    deleteBatch,
  };
}
