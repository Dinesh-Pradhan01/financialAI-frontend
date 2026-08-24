import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { Users, ShieldAlert, ArrowLeft, Shield } from "lucide-react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { isCeoOrAdmin } from "@/shared/lib/roles";
import { SpotliteLoader } from "@/shared/components/ui/SpotliteLoader";
import { TeamStatsBar, InviteForm, TeamInviteTable } from "@/features/team/components";

export const Route = createFileRoute("/_app/(team)/team")({
  head: () => ({
    meta: [
      { title: "Team & Access Management · Spotlite" },
      {
        name: "description",
        content: "Manage executive leadership team, dispatch invitations, and oversee workspace governance.",
      },
    ],
  }),
  component: TeamPage,
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

function TeamPage() {
  const { user, loading } = useAuth();

  // 1. Auth/Profile Loading State:
  // Render full-page SpotliteLoader; do NOT show Access Restricted or Team content.
  if (loading) {
    return (
      <SpotliteLoader
        message="Loading team workspace…"
        subMessage="SpotLite Executive Intelligence"
      />
    );
  }

  // 2. Unauthenticated state:
  // Handled by _app.tsx layout barrier (redirects to /login).
  if (!user) {
    return null;
  }

  // 3. Client-side Role Authorization Gate:
  // Evaluates strictly against normalized "ceo" | "admin".
  const authorized = isCeoOrAdmin(user.role);

  // 4 & 5. Non-privileged role or resolved missing role:
  // Explicitly deny access and render the Access Restricted UX.
  if (!authorized) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold font-display text-text-primary tracking-tight">
            Access Restricted
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Team &amp; User Management is strictly restricted to company Chief Executive Officers (CEO) and Workspace Administrators.
          </p>
          <p className="text-xs font-mono text-text-tertiary">
            Current signed-in role:{" "}
            <span className="font-semibold text-text-secondary uppercase">
              {user.role ? user.role : "No Role Assigned"}
            </span>
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-brand hover:opacity-90 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // 6. Authorized CEO / Admin State:
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-8 text-left"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="space-y-1.5 border-b border-border/60 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Users className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold font-display text-text-primary tracking-tight">
            Team &amp; User Management
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          Manage executive leadership access, dispatch secure verification invitations, and oversee role-based workspace permissions.
        </p>
      </motion.div>

      {/* Team Statistics Overview */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
            Workspace Summary
          </h2>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand">
            <Shield className="h-3.5 w-3.5" /> Executive Governance
          </span>
        </div>
        <TeamStatsBar />
      </motion.section>

      {/* Invite Member Form */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
          Invite Leadership
        </h2>
        <InviteForm />
      </motion.section>

      {/* Executive Leadership Directory */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
          Executive Leadership Directory
        </h2>
        <TeamInviteTable />
      </motion.section>
    </motion.div>
  );
}
