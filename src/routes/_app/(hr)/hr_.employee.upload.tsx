import { createFileRoute } from "@tanstack/react-router";
import { EmployeeUploadPage } from "@/features/hr/components/employee/EmployeeUploadPage";

export const Route = createFileRoute("/_app/(hr)/hr_/employee/upload")({
  head: () => ({
    meta: [{ title: "Upload Employees · HR · Spotlite" }],
  }),
  component: EmployeeUploadPage,
});
