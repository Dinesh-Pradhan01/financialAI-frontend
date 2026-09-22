import { useState } from "react";
import { motion } from "framer-motion";
import {
  MoreHorizontal,
  RotateCw,
  Send,
  Ban,
  UserX,
  UserCheck,
  Clock,
  AlertCircle,
  ShieldCheck,
  Users,
  AlertTriangle,
  UserMinus,
  CheckCircle2,
  Calendar,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import {
  useTeamInvites,
  useResendInvite,
  useRevokeInvite,
  useRemoveMember,
} from "../hooks/useTeamInvites";
import { useAuth } from "@/shared/contexts/AuthContext";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { RevokeInviteDialog } from "./RevokeInviteDialog";
import { RemoveMemberDialog } from "./RemoveMemberDialog";
import type { TeamInvite, TeamInviteStatus } from "../types";

export interface TeamInviteTableProps {
  className?: string;
}

function formatInviteDate(dateStr?: string | null): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function getAvatarInitials(name?: string | null, email?: string): string {
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "EX";
}

function getStatusBadge(status: TeamInviteStatus | string) {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case "accepted":
      return {
        label: "Active",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        icon: UserCheck,
      };
    case "pending":
      return {
        label: "Pending",
        badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        icon: Clock,
      };
    case "expired":
      return {
        label: "Expired",
        badgeColor: "bg-red-500/10 text-red-500 border-red-500/20",
        icon: AlertCircle,
      };
    case "revoked":
      return {
        label: "Revoked",
        badgeColor: "bg-slate-500/10 text-slate-500 border-slate-500/20",
        icon: Ban,
      };
    case "removed":
      return {
        label: "Removed",
        badgeColor: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
        icon: UserMinus,
      };
    default:
      return {
        label: status,
        badgeColor: "bg-surface-alt text-text-secondary border-border/60",
        icon: Users,
      };
  }
}

export function TeamInviteTable({ className }: TeamInviteTableProps) {
  const { data: invites = [], isLoading, isError, error, refetch, isFetching } = useTeamInvites();
  const { user: currentUser } = useAuth();

  const resendMutation = useResendInvite();
  const revokeMutation = useRevokeInvite();
  const removeMutation = useRemoveMember();

  const [activeResendId, setActiveResendId] = useState<string | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<TeamInvite | null>(null);
  const [removeTarget, setRemoveTarget] = useState<TeamInvite | null>(null);

  // ---------------------------------------------------------------------------
  // Action Handlers
  // ---------------------------------------------------------------------------

  const handleResend = async (invite: TeamInvite) => {
    setActiveResendId(invite.id);
    try {
      const res = await resendMutation.mutateAsync(invite.id);
      toast.success(res?.message || `Invitation resent to ${invite.email}`);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to resend invitation link."));
    } finally {
      setActiveResendId(null);
    }
  };

  const handleRevokeConfirm = async (inviteId: string) => {
    try {
      const res = await revokeMutation.mutateAsync(inviteId);
      toast.success(res?.message || "Invitation successfully revoked.");
      setRevokeTarget(null);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to revoke invitation."));
    }
  };

  const handleRemoveConfirm = async (memberId: string) => {
    try {
      const res = await removeMutation.mutateAsync(memberId);
      toast.success(res?.message || "Member successfully removed from workspace.");
      setRemoveTarget(null);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to remove member."));
    }
  };

  // ---------------------------------------------------------------------------
  // Loading & Error States
  // ---------------------------------------------------------------------------

  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border/80 bg-surface shadow-xs p-5 space-y-4",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-surface-alt/20"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-36 rounded-md" />
                  <Skeleton className="h-3 w-48 rounded-md" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-destructive/30 bg-destructive/5 p-6 shadow-xs text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
          className,
        )}
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-destructive">Failed to Load Team Directory</h4>
            <p className="text-xs text-text-secondary mt-0.5">
              {getApiErrorMessage(error, "Could not retrieve executive members from server.")}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-semibold cursor-pointer"
        >
          <RotateCw className={cn("h-3.5 w-3.5", isFetching && "animate-spin")} />
          <span>Retry</span>
        </Button>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Empty State
  // ---------------------------------------------------------------------------

  if (invites.length === 0) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-dashed border-border-c bg-surface-alt/25 p-8 sm:p-12 text-center space-y-3",
          className,
        )}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <Users className="h-6 w-6" />
        </div>
        <div className="space-y-1 max-w-sm mx-auto">
          <h4 className="text-sm font-bold text-text-primary">No Executive Members Yet</h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            Your executive directory is empty. Use the invite form above to dispatch invitations to
            your CFO or HR leadership.
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Populated Member & Invite Table
  // ---------------------------------------------------------------------------

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-surface shadow-xs overflow-hidden text-left",
        className,
      )}
    >
      {/* Table Header / Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 bg-surface-alt/30 px-5 py-3.5">
        <div>
          <p className="text-[11px] text-text-tertiary">
            {invites.length} {invites.length === 1 ? "record" : "records"} (members &amp;
            invitations)
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-text-secondary font-medium">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" /> Real-time
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/60">
        {invites.map((invite) => {
          const statusInfo = getStatusBadge(invite.status);
          const StatusIcon = statusInfo.icon;
          const isPending = invite.status === "pending";
          const isAccepted = invite.status === "accepted";
          const isExpired = invite.status === "expired";
          const isTerminal = invite.status === "revoked" || invite.status === "removed";

          // UX Guard: Check if the row belongs to current authenticated user.
          // Note: Backend server-side guard ("Cannot remove yourself from the business") is authoritative;
          // this client-side email comparison is solely for immediate UX feedback.
          const isSelf = Boolean(
            currentUser?.email &&
            invite.email &&
            currentUser.email.toLowerCase() === invite.email.toLowerCase(),
          );

          const roleUpper = invite.role.toUpperCase();
          const initials = getAvatarInitials(invite.full_name, invite.email);
          const displayName = invite.full_name?.trim() || invite.email.split("@")[0];
          const isResendingThis = activeResendId === invite.id;

          return (
            <motion.div
              key={invite.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 hover:bg-surface-alt/25 transition-colors duration-150"
            >
              {/* Left: Avatar + Identity */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold shadow-2xs",
                    isAccepted
                      ? "bg-brand text-white"
                      : isPending
                        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                        : "bg-surface-alt text-text-secondary border border-border",
                  )}
                >
                  {initials}
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-text-primary tracking-tight truncate">
                      {displayName}
                    </span>
                    {isSelf && (
                      <span className="px-1.5 py-0.2 rounded-md bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-wider">
                        You
                      </span>
                    )}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                        invite.role.toLowerCase() === "cfo"
                          ? "bg-brand/10 text-brand border-brand/20"
                          : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
                      )}
                    >
                      {invite.role.toLowerCase() === "cfo" ? (
                        <ShieldCheck className="h-3 w-3" />
                      ) : (
                        <Users className="h-3 w-3" />
                      )}
                      <span>{roleUpper}</span>
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary font-mono truncate">{invite.email}</p>
                </div>
              </div>

              {/* Middle: Lifecycle Status & Date */}
              <div className="flex items-center gap-3 sm:gap-6 shrink-0 text-xs">
                <div className="space-y-1 text-left sm:text-right">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                      statusInfo.badgeColor,
                    )}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    <span>{statusInfo.label}</span>
                  </span>

                  <p className="text-[11px] text-text-tertiary flex items-center sm:justify-end gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {isAccepted
                        ? `Joined ${formatInviteDate(invite.created_at)}`
                        : isPending
                          ? `Invited ${formatInviteDate(invite.created_at)}`
                          : isExpired
                            ? `Expired ${formatInviteDate(invite.expires_at || invite.created_at)}`
                            : `Updated ${formatInviteDate(invite.updated_at || invite.created_at)}`}
                    </span>
                  </p>
                </div>

                {/* Right: Actions Dropdown Menu */}
                {!isTerminal && (
                  <div className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isResendingThis}
                          className="h-8 w-8 p-0 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt cursor-pointer"
                          aria-label="Manage team member actions"
                        >
                          {isResendingThis ? (
                            <Loader2 className="h-4 w-4 animate-spin text-brand" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-xl p-1 shadow-lg text-xs"
                      >
                        {/* Pending Invite Actions */}
                        {isPending && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleResend(invite)}
                              disabled={isResendingThis}
                              className="gap-2 cursor-pointer text-xs"
                            >
                              <Send className="h-3.5 w-3.5 text-brand" />
                              <span>Resend Invite</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setRevokeTarget(invite)}
                              className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 text-xs"
                            >
                              <Ban className="h-3.5 w-3.5" />
                              <span>Revoke</span>
                            </DropdownMenuItem>
                          </>
                        )}

                        {/* Expired Invite Actions (Backend allows resend) */}
                        {isExpired && (
                          <DropdownMenuItem
                            onClick={() => handleResend(invite)}
                            disabled={isResendingThis}
                            className="gap-2 cursor-pointer text-xs"
                          >
                            <RotateCw className="h-3.5 w-3.5 text-brand" />
                            <span>Resend</span>
                          </DropdownMenuItem>
                        )}

                        {/* Accepted Member Actions */}
                        {isAccepted && (
                          <>
                            {isSelf ? (
                              <div className="px-2 py-1.5 text-[11px] text-text-tertiary italic">
                                Active Signed-In Account
                              </div>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => setRemoveTarget(invite)}
                                className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 text-xs"
                              >
                                <UserX className="h-3.5 w-3.5" />
                                <span>Remove from Workspace</span>
                              </DropdownMenuItem>
                            )}
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Confirmation Dialogs */}
      <RevokeInviteDialog
        invite={revokeTarget}
        isOpen={Boolean(revokeTarget)}
        onClose={() => setRevokeTarget(null)}
        onConfirm={handleRevokeConfirm}
        isProcessing={revokeMutation.isPending}
      />

      <RemoveMemberDialog
        member={removeTarget}
        isOpen={Boolean(removeTarget)}
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemoveConfirm}
        isProcessing={removeMutation.isPending}
      />
    </div>
  );
}
