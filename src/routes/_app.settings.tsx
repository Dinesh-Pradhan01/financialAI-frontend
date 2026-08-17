import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Bell, MessageCircle, Lock, Download, Trash2, ShieldCheck, UserPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { languages, channels } from "@/data/agentic";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectLanguage, selectChannel, selectNotificationsOn } from "@/store/selectors";
import { setLanguage, setChannel, setNotificationsOn, resetPreferences } from "@/store/slices/preferencesSlice";
import { resetSpotlights } from "@/store/slices/spotlightsSlice";
import { resetNotifications } from "@/store/slices/notificationsSlice";
import { clearConversation } from "@/store/slices/coachSlice";
import { resetTour, dismissIntro } from "@/store/slices/tourSlice";
import { InviteModal } from "@/components/spotlite/invite-modal";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Spotlite" },
      {
        name: "description",
        content: "Trust Center, consent management and engagement preferences.",
      },
    ],
  }),
  component: Settings,
});

function Settings() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();
  const language = useAppSelector(selectLanguage);
  const channel = useAppSelector(selectChannel);
  const notificationsOn = useAppSelector(selectNotificationsOn);

  const resetAll = () => {
    dispatch(resetSpotlights());
    dispatch(resetPreferences());
    dispatch(resetNotifications());
    dispatch(clearConversation());
    dispatch(resetTour());
    dispatch(dismissIntro());
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

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

  return (
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-10">
      <h1 className="font-display text-2xl font-bold">Settings</h1>

      <h2 className="mt-6 font-display text-base font-semibold">Preferences</h2>
      <section className="card-spot mt-3 divide-y divide-border">
        <RowSelect
          icon={<Globe className="h-4 w-4" />}
          label="Language"
          value={language}
          options={languages.map((l) => ({ value: l.code, label: l.label }))}
          onChange={(v) => {
            dispatch(setLanguage(v));
            toast.success("Language updated", {
              description: languages.find((l) => l.code === v)?.label,
            });
          }}
        />
        <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
          <span className="flex items-center gap-3">
            <Bell className="h-4 w-4" /> Notifications
          </span>
          <Switch
            checked={notificationsOn}
            onCheckedChange={(v) => {
              dispatch(setNotificationsOn(v));
              toast(v ? "Notifications on" : "Notifications off");
            }}
          />
        </div>
        <RowSelect
          icon={<MessageCircle className="h-4 w-4" />}
          label="Engagement channel"
          value={channel}
          options={channels.map((c) => ({ value: c, label: c }))}
          onChange={(v) => {
            dispatch(setChannel(v));
            toast.success("Channel updated", { description: `We'll reach you on ${v}` });
          }}
        />
      </section>

      <h2 className="mt-8 flex items-center gap-2 font-display text-base font-semibold">
        <UserPlus className="h-4 w-4 text-brand" /> Executive Team & Roles
      </h2>
      <section className="card-spot mt-3 p-4">
        <p className="text-xs text-text-secondary mb-3">
          As CEO/Admin, manually invite your CFO or HR team members. Invited executives receive a shared 24-hour verification link to setup their credentials.
        </p>
        <button
          onClick={() => setInviteModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-brand hover:opacity-90 transition"
        >
          <UserPlus className="h-4 w-4" /> Invite CFO / HR
        </button>
      </section>
      <InviteModal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} />

      <h2 className="mt-8 flex items-center gap-2 font-display text-base font-semibold">
        <ShieldCheck className="h-4 w-4 text-success" /> Trust Center
      </h2>
      <section className="card-spot mt-3 divide-y divide-border">
        <Row icon={<Lock className="h-4 w-4" />} label="Connected banks" value="3 ▸" />
        <Row icon={<Lock className="h-4 w-4" />} label="Permissions" value="2 of 3 enabled" />
        <button
          onClick={() =>
            toast.success("Export started", {
              description: "Your data pack (PDF + CSV) will download shortly.",
            })
          }
          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition hover:bg-surface-alt"
        >
          <span className="flex items-center gap-3">
            <Download className="h-4 w-4" /> Download my data
          </span>
          <span className="text-text-secondary">▸</span>
        </button>
        <button
          onClick={() => setConfirmDelete(true)}
          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm text-danger transition hover:bg-surface-alt"
        >
          <span className="flex items-center gap-3">
            <Trash2 className="h-4 w-4" /> Delete my data
          </span>
          <span>▸</span>
        </button>
      </section>

      <p className="mt-4 text-xs text-text-secondary">
        Spotlite is DPDP Act 2023 compliant. You can revoke consent or erase your data at any time.
      </p>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-destructive hover:underline cursor-pointer disabled:opacity-60"
        >
          {loggingOut && <Loader2 className="h-4 w-4 animate-spin" />}
          {loggingOut ? "Signing out of SpotLite…" : "Sign out of SpotLite"}
        </button>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45" onClick={() => setConfirmDelete(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-e2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-danger/12 text-danger">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">Delete all your data?</h3>
            <p className="mt-1 text-sm text-text-secondary">
              This erases your financial graph, scores and applied products from this demo session.
              This can't be undone.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-pill border border-border py-2.5 text-sm font-semibold hover:bg-surface-alt"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAll();
                  setConfirmDelete(false);
                  toast.success("Data deleted", {
                    description: "Your demo session has been reset.",
                  });
                  nav({ to: "/" });
                }}
                className="flex-1 rounded-pill bg-danger py-2.5 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <span className="flex items-center gap-3">
        {icon} {label}
      </span>
      <span className="font-medium text-text-secondary">{value}</span>
    </div>
  );
}

function RowSelect({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <span className="flex items-center gap-3">
        {icon} {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-pill border border-border bg-surface px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
