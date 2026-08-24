import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BarChart3, Zap, MessageCircle, User, Settings, Users, LogOut, Loader2, TrendingUp, FolderLock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useAppSelector } from "@/shared/store";
import { selectHighPriorityCount, selectLanguage } from "@/shared/store/selectors";
import { languages } from "@/shared/data/agentic";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useLogout } from "@/shared/hooks/useLogout";
import { isCeoOrAdmin } from "@/shared/lib/roles";

const items = [
  { to: "/home", label: "Business C360", icon: Home },
  { to: "/spending", label: "Spending", icon: BarChart3 },
  { to: "/industry", label: "Industry", icon: TrendingUp },
  { to: "/spotlights", label: "Spotlights", icon: Zap },
  { to: "/documents", label: "Documents", icon: FolderLock },
  { to: "/coach", label: "Coach", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
] as const;

function useActive() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (to: string) => path === to || path.startsWith(to + "/");
}

export function BottomTabBar() {
  const isActive = useActive();
  const highPriorityCount = useAppSelector(selectHighPriorityCount);

  return (
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
  );
}

export function DesktopSidebar() {
  const isActive = useActive();
  const highPriorityCount = useAppSelector(selectHighPriorityCount);
  const language = useAppSelector(selectLanguage);
  const { user } = useAuth();
  const { handleLogout, loggingOut } = useLogout();
  const canManageTeam = isCeoOrAdmin(user?.role);

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 md:flex">
      <Link to="/home" className="mb-6 flex items-center gap-2.5 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
          <Zap size={18} className="fill-current text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Spot<span className="text-primary">Lite</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-text-tertiary -mt-1">
            Intelligence
          </span>
        </div>
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
        {canManageTeam && (
          <li>
            <Link
              to="/team"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                isActive("/team")
                  ? "bg-brand text-on-brand shadow-e1"
                  : "text-text-secondary hover:bg-surface-alt",
              )}
            >
              <Users className="h-4 w-4" />
              <span>Team</span>
            </Link>
          </li>
        )}
      </ul>

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

        {/* User Profile Card & Logout */}
        {user && (
          <div className="mt-auto pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-surface-alt border border-border/50">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white font-bold text-xs uppercase shadow-xs">
                  {user.full_name
                    ? user.full_name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                    : user.email.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-text-primary">
                    {user.full_name || user.email.split("@")[0]}
                  </p>
                  <span className="inline-block rounded-full bg-brand/10 px-1.5 py-0.2 text-[9px] font-bold text-brand uppercase tracking-wider">
                    {user.role}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                title={loggingOut ? "Signing out…" : "Log out"}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-secondary hover:bg-destructive/10 hover:text-destructive transition cursor-pointer disabled:opacity-50"
              >
                {loggingOut ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-destructive" />
                ) : (
                  <LogOut className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <div className="px-1 text-[11px] text-text-secondary">
              <p>{languages.find((l) => l.code === language)?.label ?? "English"}</p>
              <p className="mt-0.5 text-[10px] text-text-secondary/70">Trust Center · DPDP-ready</p>
            </div>
          </div>
        )}
      </aside>
  );
}

