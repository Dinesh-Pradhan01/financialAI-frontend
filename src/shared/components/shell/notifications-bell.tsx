import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import { agentByKey } from "@/shared/data/agentic";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { selectNotifications, selectNotificationsRead } from "@/shared/store/selectors";
import { markNotificationsRead } from "@/shared/store/slices/notificationsSlice";

export function NotificationsBell() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const notificationsRead = useAppSelector(selectNotificationsRead);
  const [open, setOpen] = useState(false);
  const unread = notificationsRead ? 0 : notifications.length;

  function toggle() {
    setOpen((o) => {
      const next = !o;
      if (next) dispatch(markNotificationsRead());
      return next;
    });
  }

  return (
    <div className="relative">
      <button
        onClick={toggle}
        aria-label="Notifications"
        className="relative rounded-full bg-white/15 p-2 transition hover:bg-white/25"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-severity-high px-1 text-[9px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.16 }}
              className="absolute right-0 top-11 z-50 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-surface text-text-primary shadow-e2"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="text-sm font-semibold">From your agents</p>
                <span className="text-[11px] text-text-secondary">
                  {notifications.length} updates
                </span>
              </div>
              <ul className="max-h-80 divide-y divide-border overflow-y-auto">
                {notifications.map((n) => {
                  const a = agentByKey(n.agent);
                  const Icon = a.icon;
                  return (
                    <li key={n.id} className="flex items-start gap-3 px-4 py-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-on-brand">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug">{n.title}</p>
                        <p className="text-xs text-text-secondary">{n.body}</p>
                        <p className="mt-0.5 text-[10px] text-text-secondary/80">
                          {a.label} · {n.time}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
