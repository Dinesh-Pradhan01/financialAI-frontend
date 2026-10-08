import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/shared/contexts/AuthContext";

export function useLogout() {
  const [loggingOut, setLoggingOut] = useState(false);
  const { logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully.");
      nav({ to: "/login", replace: true });
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return { handleLogout, loggingOut };
}
