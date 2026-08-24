import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/components/ui/alert-dialog";
import { Loader2, AlertTriangle } from "lucide-react";
import type { TeamInvite } from "../types";

export interface RevokeInviteDialogProps {
  invite: TeamInvite | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inviteId: string) => Promise<void>;
  isProcessing: boolean;
}

export function RevokeInviteDialog({
  invite,
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}: RevokeInviteDialogProps) {
  if (!invite) return null;

  const displayName = invite.full_name?.trim() || invite.email;

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    await onConfirm(invite.id);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && !isProcessing && onClose()}>
      <AlertDialogContent className="max-w-md rounded-2xl p-6 text-left">
        <AlertDialogHeader className="space-y-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <AlertDialogTitle className="text-lg font-bold font-display text-text-primary tracking-tight">
            Revoke Invitation?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-text-secondary leading-relaxed space-y-2">
            <p>
              Are you sure you want to revoke the pending invitation for{" "}
              <span className="font-semibold text-text-primary">{displayName}</span> (
              <span className="font-mono text-text-primary">{invite.email}</span>)?
            </p>
            <p className="bg-surface-alt/70 p-2.5 rounded-xl border border-border/60 text-[11px] text-text-secondary">
              • This invitation will be immediately invalidated and can no longer be used to complete setup.
              <br />
              • The recipient will no longer be able to set up their credentials with this link.
              <br />
              • This does not delete any already accepted team members.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-2 gap-2">
          <AlertDialogCancel
            disabled={isProcessing}
            onClick={onClose}
            className="rounded-xl text-xs font-semibold"
          >
            Keep Invitation
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isProcessing}
            onClick={handleConfirm}
            className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-semibold gap-1.5 shadow-sm cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Revoking…</span>
              </>
            ) : (
              <span>Revoke Invite</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
