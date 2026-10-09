import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { wt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./accept-invite.index-D7ScqbYu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accept-invite.index-Kdp-hfQL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AcceptInviteIndexPage() {
	const { token } = Route.useSearch();
	const nav = useNavigate();
	(0, import_react.useEffect)(() => {
		if (token) nav({
			to: `/accept-invite/${token}`,
			replace: true
		});
	}, [token, nav]);
	if (!token) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-bold mb-2",
			children: "No Invitation Token Provided"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-text-secondary",
			children: "Please check your email link or request a new invitation link from your CEO/Admin."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-brand" })
	});
}
//#endregion
export { AcceptInviteIndexPage as component };
