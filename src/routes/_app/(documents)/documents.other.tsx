import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/(documents)/documents/other")({
  beforeLoad: () => {
    throw redirect({
      to: "/documents",
      search: {
        category: "others_unclassified",
        view: "grouped",
      },
    });
  },
  component: () => null,
});
