import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(onboarding)/onboarding")({
  beforeLoad: () => {
    // Redirect to home page where onboarding is handled as a modal overlay
    throw redirect({ to: "/home" });
  },
  component: () => null,
});
