import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Ct as Lock, Xt as Eye, Zt as EyeOff, n as X, wn as Check, wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { t as SpotliteLoader } from "./SpotliteLoader-BkYU6zxS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AuthHeroPanel } from "./AuthHeroPanel-tH7ddIqi.mjs";
import { t as SpotLiteBrand } from "./SpotLiteBrand-B8zZPSnm.mjs";
import { t as rules } from "./passwordRules-fc_ZuKIi.mjs";
import { t as GoogleSignInButton } from "./GoogleSignInButton-EeZVDY_J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-Dw4tppuJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Signup() {
	const nav = useNavigate();
	const { user, loading, signup } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [showPwd, setShowPwd] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && user) if (user.email_verified) nav({
			to: "/home",
			replace: true
		});
		else nav({
			to: "/verify-email",
			replace: true
		});
	}, [
		user,
		loading,
		nav
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotliteLoader, {
		message: "Verifying session…",
		subMessage: "SpotLite Intelligence"
	});
	const allRulesPass = rules.every((r) => r.test(password));
	const passwordsMatch = password === confirm && confirm.length > 0;
	const formValid = email.trim() && allRulesPass && passwordsMatch;
	async function handleSubmit(e) {
		e.preventDefault();
		if (!formValid) return;
		setSubmitting(true);
		try {
			await signup(email.trim(), password);
			toast.success("Account created successfully!", { description: "Check your email for the verification link to activate your account." });
			nav({ to: "/verify-email" });
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Signup failed. Please try again.";
			if (msg.includes("auth/email-already-in-use")) toast.error("An account with this email already exists.");
			else if (msg.includes("auth/weak-password")) toast.error("Password is too weak. Follow the requirements below.");
			else toast.error(msg);
		} finally {
			setSubmitting(false);
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
						children: "Create your account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-text-secondary",
						children: "Get started with enterprise workforce and financial intelligence."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleSignInButton, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-6 flex items-center py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider",
								children: "Or register with email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "signup-email",
									className: "block text-xs font-semibold text-text-secondary",
									children: "Work Email address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "signup-email",
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
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "signup-password",
										className: "block text-xs font-semibold text-text-secondary",
										children: "Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "signup-password",
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: password.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.ul, {
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
										transition: { duration: .15 },
										className: "mt-2.5 grid grid-cols-2 gap-1.5 text-xs overflow-hidden",
										children: rules.map((r) => {
											const pass = r.test(password);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: `flex items-center gap-1.5 font-medium transition-colors ${pass ? "text-success" : "text-text-secondary"}`,
												children: [pass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-success shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 text-text-secondary/60 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.label })]
											}, r.label);
										})
									}) })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "signup-confirm",
										className: "block text-xs font-semibold text-text-secondary",
										children: "Confirm Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "signup-confirm",
										type: "password",
										required: true,
										autoComplete: "new-password",
										value: confirm,
										onChange: (e) => setConfirm(e.target.value),
										className: "w-full rounded-pill border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-xs",
										placeholder: "••••••••"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: confirm.length > 0 && !passwordsMatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
										initial: {
											opacity: 0,
											y: -4
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -4
										},
										className: "flex items-center gap-1.5 text-xs text-destructive font-medium mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), " Passwords do not match"]
									}) })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: submitting || !formValid,
								className: "flex w-full items-center justify-center gap-2 rounded-pill bg-brand-gradient py-3 text-sm font-bold text-on-brand shadow-brand hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer mt-2",
								children: [submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), submitting ? "Creating account…" : "Create Account"]
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthHeroPanel, {})]
	});
}
//#endregion
export { Signup as component };
