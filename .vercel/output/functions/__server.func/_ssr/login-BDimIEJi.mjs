import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Ct as Lock, Xt as Eye, Zt as EyeOff, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion } from "../_libs/framer-motion.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AuthHeroPanel } from "./AuthHeroPanel-tH7ddIqi.mjs";
import { t as SpotLiteBrand } from "./SpotLiteBrand-B8zZPSnm.mjs";
import { t as getSafeRedirectPath } from "./redirectValidation-Cbr4eAY9.mjs";
import { t as Route } from "./login-CNLQVDO6.mjs";
import { t as GoogleSignInButton } from "./GoogleSignInButton-EeZVDY_J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BDimIEJi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const nav = useNavigate();
	const search = Route.useSearch();
	const { user, loading, login, resetPassword } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPwd, setShowPwd] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const isFormValid = email.trim().length > 0 && password.length > 0;
	(0, import_react.useEffect)(() => {
		if (!loading && user) if (user.email_verified) nav({
			to: getSafeRedirectPath(search.redirect),
			replace: true
		});
		else nav({
			to: "/signup",
			replace: true
		});
	}, [
		user,
		loading,
		nav,
		search.redirect
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Verifying session…",
		subMessage: "SpotLite Intelligence"
	});
	async function handleSubmit(e) {
		e.preventDefault();
		if (!email.trim() || !password) return;
		setSubmitting(true);
		try {
			await login(email.trim(), password);
			const { auth } = await import("./firebase-pUuzlwRE.mjs").then((n) => n.r).then((n) => n.n);
			const currentUser = auth.currentUser;
			if (currentUser) try {
				await currentUser.reload();
			} catch {}
			if (currentUser && !currentUser.emailVerified) {
				nav({ to: "/signup" });
				return;
			}
			nav({
				to: getSafeRedirectPath(search.redirect),
				replace: true
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Login failed. Please try again.";
			if (msg.includes("auth/invalid-credential") || msg.includes("auth/wrong-password")) toast.error("Invalid email or password.");
			else if (msg.includes("auth/user-not-found")) toast.error("No account found with that email.");
			else if (msg.includes("auth/too-many-requests")) toast.error("Too many attempts. Please try again later.");
			else toast.error(msg);
		} finally {
			setSubmitting(false);
		}
	}
	async function handleForgotPassword(e) {
		e.preventDefault();
		if (!email.trim()) {
			toast.error("Please enter your email address first, then click 'Forgot password?'.");
			return;
		}
		try {
			await resetPassword(email.trim());
			toast.success("Password reset link sent.", { description: `Check ${email.trim()} for password reset instructions.` });
		} catch {
			toast.error("Failed to send reset email. Please try again.");
		}
	}
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
						className: "md:hidden mb-8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-bold tracking-tight text-foreground",
						children: "Welcome back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-text-secondary",
						children: "Sign in to access your executive intelligence portal."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleSignInButton, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-6 flex items-center py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grow border-t border-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider",
								children: "Or continue with email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grow border-t border-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "login-email",
									className: "block text-xs font-semibold text-text-secondary",
									children: "Work Email address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "login-email",
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
									htmlFor: "login-password",
									className: "block text-xs font-semibold text-text-secondary",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "login-password",
										type: showPwd ? "text" : "password",
										required: true,
										autoComplete: "current-password",
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
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleForgotPassword,
									className: "text-xs font-semibold text-brand hover:underline cursor-pointer transition-colors",
									children: "Forgot password?"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: submitting || !isFormValid,
								className: "flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer",
								children: [submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), submitting ? "Signing in…" : "Sign in"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-center text-sm text-text-secondary",
						children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								preload: "intent",
								className: "font-semibold text-brand hover:underline",
								children: "Create an account"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 flex items-center justify-center gap-1.5 text-xs text-text-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " End-to-end 256-bit encrypted session"]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthHeroPanel, {})]
	});
}
//#endregion
export { Login as component };
