import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Mail, Shield, Check, Copy, X, Loader2, Sparkles, Clock } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"cfo" | "hr">("cfo");
  const [lastInviteLink, setLastInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const queryClient = useQueryClient();

  const { data: invites = [], isLoading: loadingInvites } = useQuery({
    queryKey: queryKeys.auth.invites(),
    queryFn: () => api.get<any[]>("/api/auth/invites"),
    enabled: isOpen,
    staleTime: 60 * 1000,
  });

  const sendInviteMutation = useMutation({
    mutationFn: (payload: { email: string; role: string; full_name: string }) =>
      api.post<any>("/api/auth/invite", payload),
    onSuccess: (res, vars) => {
      toast.success(`Invitation sent to ${vars.email} as ${vars.role.toUpperCase()}`);
      if (res.invite_link) {
        setLastInviteLink(res.invite_link);
      } else if (res.invite_token) {
        setLastInviteLink(`${window.location.origin}/accept-invite/${res.invite_token}`);
      }
      setEmail("");
      setFullName("");
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.invites() });
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err.message || "Failed to send invitation");
    },
  });

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLastInviteLink(null);
    sendInviteMutation.mutate({ email, role, full_name: fullName });
  };

  const submitting = sendInviteMutation.isPending;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Invitation link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface-alt/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-text-primary">Invite HR or CFO</h2>
                <p className="text-xs text-text-secondary">Send a 24-hour invitation link to your executive team</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-text-secondary hover:bg-surface-alt hover:text-text-primary transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Form */}
            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Designated Role <span className="text-danger">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("cfo")}
                    className={`flex flex-col p-3 rounded-2xl border text-left transition ${
                      role === "cfo"
                        ? "border-brand bg-brand/5 ring-2 ring-brand/20"
                        : "border-border bg-surface hover:border-text-secondary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-sm text-text-primary">CFO</span>
                      <Shield className={`h-4 w-4 ${role === "cfo" ? "text-brand" : "text-text-secondary"}`} />
                    </div>
                    <span className="text-[0.6875rem] text-text-secondary">Chief Financial Officer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("hr")}
                    className={`flex flex-col p-3 rounded-2xl border text-left transition ${
                      role === "hr"
                        ? "border-brand bg-brand/5 ring-2 ring-brand/20"
                        : "border-border bg-surface hover:border-text-secondary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-sm text-text-primary">HR</span>
                      <Shield className={`h-4 w-4 ${role === "hr" ? "text-brand" : "text-text-secondary"}`} />
                    </div>
                    <span className="text-[0.6875rem] text-text-secondary">Human Resources</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Email Address <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <input
                    type="email"
                    required
                    placeholder="cfo@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Connor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !email}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-brand hover:opacity-90 transition disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending Invite...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" /> Send Shared Invite Link
                  </>
                )}
              </button>
            </form>

            {/* Generated Link Alert */}
            {lastInviteLink && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-text-primary space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <Sparkles className="h-4 w-4" /> Invitation Link Has Been Sent. (Valid for 24 hours)
                </div>
                {/* <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={lastInviteLink}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(lastInviteLink)}
                    className="flex shrink-0 items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div> */}
              </div>
            )}

            {/* Existing Invites List */}
            <div className="border-t border-border pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Recent Invitations
              </h3>

              {loadingInvites ? (
                <div className="py-4 text-center text-xs text-text-secondary flex justify-center items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading team invites...
                </div>
              ) : invites.length === 0 ? (
                <p className="text-xs text-text-secondary py-2 italic text-center">No pending or previous invites.</p>
              ) : (
                <div className="space-y-2">
                  {invites.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface-alt/40 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-text-primary">{inv.email}</p>
                        <p className="text-text-secondary capitalize">
                          Role: <span className="font-medium text-brand">{inv.role?.toUpperCase()}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[0.625rem] font-bold capitalize ${
                            inv.status === "accepted"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              : inv.status === "expired"
                              ? "bg-red-500/10 text-red-500 border border-red-500/20"
                              : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                          }`}
                        >
                          {inv.status}
                        </span>
                        {inv.invite_token && inv.status === "pending" && (
                          <button
                            onClick={() =>
                              copyToClipboard(`${window.location.origin}/accept-invite/${inv.invite_token}`)
                            }
                            title="Copy invitation link"
                            className="p-1 rounded hover:bg-surface-alt text-text-secondary hover:text-text-primary"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
