import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAuth } from "./AuthContext-Cv6TbLYz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GoogleSignInButton-EeZVDY_J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoogleSignInButton() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const { loginWithGoogle } = useAuth();
	const handleGoogleSignIn = async () => {
		setLoading(true);
		setError(null);
		try {
			const backendUser = await loginWithGoogle();
			if (backendUser && !backendUser.email_verified) {
				navigate({
					to: "/verify-email",
					replace: true
				});
				return;
			}
			toast.success("Signed in with Google successfully!");
			navigate({
				to: "/home",
				replace: true
			});
		} catch (err) {
			console.error("Google Sign-In error:", err);
			if (err.code === "auth/popup-closed-by-user") setError("Sign-in popup was closed before completion.");
			else if (err.code === "auth/cancelled-popup-request") {} else {
				const msg = err.message || "An error occurred during Google sign in.";
				setError(msg);
				toast.error(msg);
			}
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: handleGoogleSignIn,
			disabled: loading,
			className: "flex w-full items-center justify-center gap-3 rounded-pill border border-border bg-surface px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-alt hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-60 cursor-pointer shadow-xs",
			children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-brand" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				width: "18",
				height: "18",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						fill: "#4285F4",
						d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						fill: "#34A853",
						d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						fill: "#FBBC05",
						d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						fill: "#EA4335",
						d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						fill: "none",
						d: "M1 1h22v22H1z"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "Signing in with Google…" : "Continue with Google" })]
		}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-destructive text-center",
			children: error
		})]
	});
}
//#endregion
export { GoogleSignInButton as t };
