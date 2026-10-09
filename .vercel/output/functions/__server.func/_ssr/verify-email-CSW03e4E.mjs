import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Y as RefreshCw, bt as MailCheck, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { n as auth } from "./firebase-pUuzlwRE.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as SpotLiteBrand } from "./SpotLiteBrand-B8zZPSnm.mjs";
import { t as getSafeRedirectPath } from "./redirectValidation-Cbr4eAY9.mjs";
import { t as Route } from "./verify-email-hx1aRK8L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-CSW03e4E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VerifyEmail() {
	const nav = useNavigate();
	const search = Route.useSearch();
	const { user, firebaseUser, loading, resendVerificationEmail, logout, sync } = useAuth();
	const [resending, setResending] = (0, import_react.useState)(false);
	const [checking, setChecking] = (0, import_react.useState)(false);
	const [cooldown, setCooldown] = (0, import_react.useState)(0);
	const [loggingOut, setLoggingOut] = (0, import_react.useState)(false);
	const displayEmail = user?.email || firebaseUser?.email || auth.currentUser?.email || "your email";
	const handleResend = (0, import_react.useCallback)(async () => {
		if (cooldown > 0) return;
		setResending(true);
		try {
			await resendVerificationEmail();
			toast.success("Verification email sent!", { description: `Check ${displayEmail} for the activation link.` });
			setCooldown(60);
			const interval = setInterval(() => {
				setCooldown((prev) => {
					if (prev <= 1) {
						clearInterval(interval);
						return 0;
					}
					return prev - 1;
				});
			}, 1e3);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to send email. Please try again.";
			toast.error(msg);
		} finally {
			setResending(false);
		}
	}, [
		cooldown,
		resendVerificationEmail,
		displayEmail
	]);
	const handleCheckVerification = (0, import_react.useCallback)(async () => {
		setChecking(true);
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				toast.error("No active session found. Please log in again.");
				nav({ to: "/login" });
				return;
			}
			await currentUser.reload();
			if (!currentUser.emailVerified) {
				toast.error("Email not verified yet", { description: "Please check your inbox, click the verification link in the email, and then click this button again." });
				return;
			}
			try {
				const { api } = await import("./api-XLUwYDya.mjs").then((n) => n.r).then((n) => n.r);
				await api.post("/api/auth/verify-email");
			} catch (e) {
				console.warn("Backend verify-email call warning:", e);
			}
			await sync();
			toast.success("Email verified successfully! Welcome to SpotLite.");
			nav({
				to: getSafeRedirectPath(search.redirect),
				replace: true
			});
		} catch (error) {
			console.error("Verification check failed:", error);
			toast.error("Could not check verification status. Please try again.");
		} finally {
			setChecking(false);
		}
	}, [
		nav,
		sync,
		search.redirect
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Verifying status…",
		subMessage: "SpotLite Intelligence"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			transition: {
				duration: .4,
				ease: "easeOut"
			},
			className: "w-full max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotLiteBrand, { size: "md" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { scale: .8 },
					animate: { scale: [
						1,
						1.05,
						1
					] },
					transition: {
						duration: 2.5,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "h-10 w-10" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold tracking-tight text-foreground",
					children: "Verify your email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-text-secondary text-sm leading-relaxed",
					children: [
						"We sent a verification link to",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: displayEmail
						}),
						".",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Click the link in your email to activate your fintech account, then return here."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileTap: { scale: .985 },
							onClick: handleCheckVerification,
							disabled: checking,
							className: "flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3.5 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 transition-opacity disabled:opacity-60 cursor-pointer",
							children: [checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), checking ? "Verifying with server…" : "I've verified my email"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileTap: { scale: .985 },
							onClick: handleResend,
							disabled: resending || cooldown > 0,
							className: "flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-surface py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-alt disabled:opacity-60 cursor-pointer shadow-xs",
							children: [resending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), cooldown > 0 ? `Resend in ${cooldown}s` : resending ? "Sending link…" : "Resend verification email"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: loggingOut,
							onClick: async () => {
								if (loggingOut) return;
								setLoggingOut(true);
								try {
									await logout();
									nav({ to: "/login" });
								} catch (err) {
									console.error("Sign out failed on verify-email page:", err);
									toast.error("Sign out failed. Please try again.");
									nav({ to: "/login" });
								} finally {
									setLoggingOut(false);
								}
							},
							className: "mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-text-secondary hover:text-text-primary hover:underline cursor-pointer disabled:opacity-60",
							children: [loggingOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), loggingOut ? "Signing out…" : "Use a different account"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-xs text-text-secondary",
					children: "SpotLite · Unified Enterprise & Financial Intelligence"
				})
			]
		})
	});
}
//#endregion
export { VerifyEmail as component };
