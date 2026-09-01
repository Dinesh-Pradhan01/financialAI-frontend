import { createFileRoute } from "@tanstack/react-router";
import { VendorUploadPage } from "@/features/hr/components/vendor/VendorUploadPage";

export const Route = createFileRoute("/_app/(hr)/hr_/vendor/upload")({
  head: () => ({
    meta: [{ title: "Upload Vendors · HR · Spotlite" }],
  }),
  component: VendorUploadPage,
});
