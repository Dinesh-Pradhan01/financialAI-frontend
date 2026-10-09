import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Sparkles, Ct as Lock, Mn as Building2, R as ShieldCheck, Xt as Eye, Zt as EyeOff, _n as CircleAlert, n as X, p as UserCheck, wn as Check, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { s as signInWithEmailAndPassword } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { n as auth } from "./firebase-pUuzlwRE.mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./accept-invite._token-BU1vWUlT.mjs";
import { t as AuthHeroPanel } from "./AuthHeroPanel-tH7ddIqi.mjs";
import { t as SpotLiteBrand } from "./SpotLiteBrand-B8zZPSnm.mjs";
import { t as rules } from "./passwordRules-fc_ZuKIi.mjs";
import { t as getApiErrorMessage } from "./apiError-ooqyfQTr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accept-invite._token-wV5_1fSb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AcceptInvitePage() {
	const { token } = Route.useParams();
	const nav = useNavigate();
	const { user, refreshUser, sync } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [inviteData, setInviteData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showPwd, setShowPwd] = (0, import_react.useState)(false);
	const [showConfirmPwd, setShowConfirmPwd] = (0, import_react.useState)(false);
	const [processing, setProcessing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function verifyInvite() {
			try {
				const res = await api.get(`/api/auth/invite/verify/${token}`);
				setInviteData(res);
				if (res.email) setEmail(res.email);
				if (res.full_name) setFullName(res.full_name);
			} catch (err) {
				console.error("Failed to verify invite", err);
				setError(getApiErrorMessage(err, "Invalid or expired invite link (valid for 24 hours)."));
			} finally {
				setLoading(false);
			}
		}
		verifyInvite();
	}, [token]);
	const handleFillDemoData = () => {
		if (!inviteData) return;
		setFullName(inviteData.full_name || (inviteData.role === "cfo" ? "Alex Morgan (CFO)" : "Jordan Taylor (HR)"));
		setPassword("Password123!");
		setConfirmPassword("Password123!");
		toast.success("Demo credentials populated!", { description: "Click 'Join Workspace' to complete setup." });
	};
	const allRulesPassed = rules.every((r) => r.test(password));
	const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
	const isFormValid = fullName.trim().length >= 2 && email.trim().includes("@") && allRulesPassed && passwordsMatch;
	const handleAcceptLoggedIn = async () => {
		if (!token) return;
		setProcessing(true);
		try {
			await api.post(`/api/invite/accept/${token}`, {});
			toast.success(`Workspace invitation accepted for ${inviteData?.company_name || "your company"}!`);
			await refreshUser();
			nav({ to: "/home" });
		} catch (err) {
			console.error("Failed to accept logged-in invite", err);
			toast.error(getApiErrorMessage(err, "Failed to accept invite with current account."));
		} finally {
			setProcessing(false);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inviteData) return;
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		if (password.length < 8) {
			toast.error("Password must be at least 8 characters");
			return;
		}
		setProcessing(true);
		try {
			try {
				await auth.signOut();
			} catch {}
			await api.post("/api/auth/invite/accept-with-password", {
				token,
				password,
				email,
				full_name: fullName.trim()
			});
			await signInWithEmailAndPassword(auth, email, password);
			if (sync) await sync();
			else await refreshUser();
			toast.success(`Account created as ${inviteData.role?.toUpperCase()}!`);
			nav({ to: "/verify-email" });
		} catch (err) {
			console.error(err);
			toast.error(getApiErrorMessage(err, "Failed to accept invite"));
		} finally {
			setProcessing(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Verifying workspace invitation…",
		subMessage: "SpotLite Intelligence"
	});
	if (error || !inviteData) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-sm text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-8 w-8 text-red-500" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold mb-2",
					children: "Invalid or Expired Invite"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-text-secondary mb-6",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-brand font-medium hover:underline text-sm",
					children: "Return to Home"
				})
			]
		})
	});
	const roleLabel = inviteData.role === "cfo" ? "Chief Financial Officer (CFO)" : inviteData.role === "hr" ? "Human Resources (HR)" : inviteData.role?.toUpperCase() || "Executive";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative grid min-h-screen md:grid-cols-2 bg-white overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-20 bg-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: .18,
					ease: "easeOut"
				},
				className: "mx-auto w-full max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotLiteBrand, {
						size: "sm",
						className: "md:hidden mb-6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-[11px] font-bold text-brand mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3 w-3" }), " Workspace Invite"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
								children: "Join your workspace"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs sm:text-sm text-text-secondary",
								children: [
									"Invited to join",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-text-primary",
										children: inviteData.company_name
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleFillDemoData,
							className: "flex items-center gap-1.5 rounded-pill bg-brand/10 hover:bg-brand/20 border border-brand/30 px-3 py-1.5 text-xs font-bold text-brand transition shadow-xs cursor-pointer shrink-0 mt-1",
							title: "Auto-fill with sample test data",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "Demo Data"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-2xl border border-brand/25 bg-linear-to-r from-brand/10 via-brand/5 to-transparent p-3.5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] font-bold uppercase tracking-wider text-brand",
							children: "Designated Executive Role"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs sm:text-sm font-bold text-foreground",
							children: roleLabel
						})] })]
					}),
					user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-2xl border border-brand/30 bg-brand/5 p-4 space-y-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-semibold text-text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-4 w-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Signed in as ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-brand",
									children: user.email
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-secondary",
								children: [
									"You can directly join ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: inviteData.company_name }),
									" with your active account:"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleAcceptLoggedIn,
								disabled: processing,
								className: "w-full flex items-center justify-center gap-2 rounded-pill bg-brand py-2.5 px-4 text-xs font-bold text-white shadow-brand hover:opacity-95 transition cursor-pointer disabled:opacity-50",
								children: [processing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Accept Invite as ", user.full_name || user.email] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "invite-email",
									className: "block text-xs font-semibold text-text-secondary",
									children: "Work Email address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "invite-email",
									type: "email",
									required: true,
									autoComplete: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs",
									placeholder: "name@company.com"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "invite-name",
									className: "block text-xs font-semibold text-text-secondary",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "invite-name",
									type: "text",
									required: true,
									autoComplete: "name",
									placeholder: "e.g. Alex Morgan",
									value: fullName,
									onChange: (e) => setFullName(e.target.value),
									className: "w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "invite-password",
										className: "block text-xs font-semibold text-text-secondary",
										children: "Create Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "invite-password",
											type: showPwd ? "text" : "password",
											required: true,
											autoComplete: "new-password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											className: "w-full rounded-pill border border-border bg-surface px-4 py-3 pr-12 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs",
											placeholder: "••••••••"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowPwd((v) => !v),
											className: "absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer transition-colors",
											"aria-label": showPwd ? "Hide password" : "Show password",
											children: showPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: password.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											height: 0
										},
										animate: {
											opacity: 1,
											height: "auto"
										},
										exit: {
											opacity: 0,
											height: 0
										},
										className: "grid grid-cols-2 gap-1.5 pt-2 overflow-hidden",
										children: rules.map((rule) => {
											const passed = rule.test(password);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `flex items-center gap-1.5 text-xs transition-colors ${passed ? "text-success font-medium" : "text-text-secondary/60"}`,
												children: [passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rule.label })]
											}, rule.label);
										})
									}) })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "invite-confirm",
										className: "block text-xs font-semibold text-text-secondary",
										children: "Confirm Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "invite-confirm",
											type: showConfirmPwd ? "text" : "password",
											required: true,
											autoComplete: "new-password",
											value: confirmPassword,
											onChange: (e) => setConfirmPassword(e.target.value),
											className: "w-full rounded-pill border border-border bg-surface px-4 py-3 pr-12 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs",
											placeholder: "••••••••"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowConfirmPwd((v) => !v),
											className: "absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary cursor-pointer transition-colors",
											"aria-label": showConfirmPwd ? "Hide password" : "Show password",
											children: showConfirmPwd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})]
									}),
									confirmPassword.length > 0 && !passwordsMatch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive pt-1",
										children: "Passwords do not match."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: processing || !isFormValid,
								className: "flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer mt-2",
								children: [processing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), processing ? "Joining Workspace…" : "Join Workspace"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-center text-sm text-text-secondary",
						children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								preload: "intent",
								className: "font-semibold text-brand hover:underline",
								children: "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 flex items-center justify-center gap-1.5 text-xs text-text-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " End-to-end 256-bit encrypted session"]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthHeroPanel, {
			role: inviteData?.role,
			companyName: inviteData?.company_name || void 0
		})]
	});
}
//#endregion
export { AcceptInvitePage as component };
