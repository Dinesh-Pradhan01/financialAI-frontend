import { createFileRoute } from "@tanstack/react-router";
import { VendorDirectoryPage } from "@/features/hr/components/vendor/VendorDirectoryPage";
import { z } from "zod";

const searchSchema = z
  .object({
    status: z.string().optional().catch(undefined),
    industry: z.string().optional().catch(undefined),
    recurring: z.union([z.boolean(), z.string()]).optional().catch(undefined),
    search: z.string().optional().catch(undefined),
    page: z.union([z.number(), z.string()]).optional().catch(undefined),
    size: z.union([z.number(), z.string()]).optional().catch(undefined),
  })
  .passthrough();

export const Route = createFileRoute("/_app/(hr)/hr_/vendors")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Vendor Directory · HR · Spotlite" }],
  }),
  component: VendorDirectoryPage,
});
