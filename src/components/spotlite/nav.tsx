import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BarChart3, Zap, MessageCircle, User, Settings, Sparkles, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemo } from "@/store/demo-store";
import { languages } from "@/data/agentic";
import { useAuth } from "@/contexts/AuthContext";
import { InviteModal } from "./invite-modal";

const items = [
  { to: "/home", label: "Business C360", icon: Home },
  { to: "/spending", label: "Spending", icon: BarChart3 },
  { to: "/spotlights", label: "Spotlights", icon: Zap },
  { to: "/coach", label: "Coach", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
] as const;

function useActive() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (to: string) => path === to || path.startsWith(to + "/");
}

export function BottomTabBar() {
  const isActive = useActive();
  const { highPriorityCount } = useDemo();
  const { user } = useAuth();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const isCeoOrAdmin = !user?.role || user.role === "ceo" || user.role === "admin" || user.role === "user";

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden">
        <ul className="grid grid-cols-5">
          {items.map((it) => {
            const Icon = it.icon;
            const active = isActive(it.to);
            const badge = it.to === "/spotlights" ? highPriorityCount : 0;
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium",
                    active ? "text-brand" : "text-text-secondary",
                  )}
                >
                  <span className="relative">
                    <Icon className={cn("h-5 w-5", active && "stroke-[2.4]")} />
                    {badge > 0 && (
                      <span className="absolute -right-1.5 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-severity-high px-1 text-[9px] font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </span>
                  {it.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
      <InviteModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </>
  );
}

export function DesktopSidebar() {
  const isActive = useActive();
  const { highPriorityCount, language } = useDemo();
  const { user } = useAuth();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const isCeoOrAdmin = !user?.role || user.role === "ceo" || user.role === "admin" || user.role === "user";

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 md:flex">
        <Link to="/home" className="mb-6 flex items-center gap-2 px-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-on-brand">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Spotlite</span>
        </Link>
        <ul className="space-y-1">
          {items.map((it) => {
            const Icon = it.icon;
            const active = isActive(it.to);
            const badge = it.to === "/spotlights" ? highPriorityCount : 0;
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                    active
                      ? "bg-brand text-on-brand shadow-e1"
                      : "text-text-secondary hover:bg-surface-alt",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{it.label}</span>
                  {badge > 0 && (
                    <span className="ml-auto rounded-pill bg-severity-high px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {isCeoOrAdmin && (
          <div className="mt-4">
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand/10 hover:bg-brand/20 text-brand py-2.5 px-3 text-xs font-bold transition border border-brand/20 shadow-sm group"
            >
              <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
              Invite HR / CFO
            </button>
          </div>
        )}

        <div className="my-4 border-t border-border" />
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
            isActive("/settings")
              ? "bg-surface-alt text-text-primary"
              : "text-text-secondary hover:bg-surface-alt",
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="mt-auto pt-4 text-xs text-text-secondary">
          <p>{languages.find((l) => l.code === language)?.label ?? "English"}</p>
          <p className="mt-1">Trust Center · DPDP-ready</p>
        </div>
      </aside>

      <InviteModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </>
  );
}
