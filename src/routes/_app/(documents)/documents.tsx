import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/(documents)/documents")({
  component: DocumentsLayout,
});

function DocumentsLayout() {
  return <Outlet />;
}
