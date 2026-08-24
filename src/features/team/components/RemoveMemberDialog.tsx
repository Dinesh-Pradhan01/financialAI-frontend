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
import { Loader2, UserX } from "lucide-react";
import type { TeamInvite } from "../types";

export interface RemoveMemberDialogProps {
  member: TeamInvite | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (memberId: string) => Promise<void>;
  isProcessing: boolean;
}

export function RemoveMemberDialog({
  member,
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}: RemoveMemberDialogProps) {
  if (!member) return null;

  const displayName = member.full_name?.trim() || member.email;
  const roleLabel = member.role.toUpperCase();

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    await onConfirm(member.id);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && !isProcessing && onClose()}>
      <AlertDialogContent className="max-w-md rounded-2xl p-6 text-left">
        <AlertDialogHeader className="space-y-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs">
            <UserX className="h-5 w-5" />
          </div>
          <AlertDialogTitle className="text-lg font-bold font-display text-text-primary tracking-tight">
            Remove Member from Workspace?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-text-secondary leading-relaxed space-y-2">
            <p>
              Are you sure you want to remove{" "}
              <span className="font-semibold text-text-primary">{displayName}</span> (
              <span className="font-mono text-text-primary">{roleLabel}</span>)?
            </p>
            <p className="bg-destructive/5 p-2.5 rounded-xl border border-destructive/20 text-[11px] text-destructive leading-relaxed">
              • The member will immediately lose access to this company workspace.
              <br />
              • All active application login sessions are invalidated immediately.
              <br />
              • Access can only be restored by creating a brand-new invitation.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-2 gap-2">
          <AlertDialogCancel
            disabled={isProcessing}
            onClick={onClose}
            className="rounded-xl text-xs font-semibold"
          >
            Keep Member
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isProcessing}
            onClick={handleConfirm}
            className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-semibold gap-1.5 shadow-sm cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Removing…</span>
              </>
            ) : (
              <span>Remove Member</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
