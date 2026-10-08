import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

const industrySearchSchema = z.object({
  demo: z.string().optional(),
  sector_name: z.string().optional(),
});

export const Route = createFileRoute("/_app/industry")({
  validateSearch: (search) => industrySearchSchema.parse(search),
  component: IndustryLayout,
});

function IndustryLayout() {
  return <Outlet />;
}
