import { createFileRoute } from "@tanstack/react-router";
import { EmployeeDirectoryPage } from "@/features/hr/components/employee/EmployeeDirectoryPage";
import { z } from "zod";

const searchSchema = z
  .object({
    status: z.string().optional().catch(undefined),
    department: z.string().optional().catch(undefined),
    search: z.string().optional().catch(undefined),
    employment_type: z.string().optional().catch(undefined),
    page: z.union([z.number(), z.string()]).optional().catch(undefined),
    size: z.union([z.number(), z.string()]).optional().catch(undefined),
  })
  .passthrough();

export const Route = createFileRoute("/_app/(hr)/hr_/employees")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Employee Directory · HR · Spotlite" }],
  }),
  component: EmployeeDirectoryPage,
});
