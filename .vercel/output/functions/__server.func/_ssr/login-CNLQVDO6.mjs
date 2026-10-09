import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getAuthSnapshot } from "./AuthContext-Cv6TbLYz.mjs";
import { t as getSafeRedirectPath } from "./redirectValidation-Cbr4eAY9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CNLQVDO6.js
var $$splitComponentImporter = () => import("./login-BDimIEJi.mjs");
var Route = createFileRoute("/(auth)/login")({
	validateSearch: (search) => {
		return { redirect: typeof search.redirect === "string" ? search.redirect : void 0 };
	},
	head: () => ({ meta: [{ title: "Log in · SpotLite Intelligence" }, {
		name: "description",
		content: "Log in to SpotLite, unified workforce risk and financial intelligence."
	}] }),
	beforeLoad: async ({ search }) => {
		if (typeof window === "undefined") return;
		const snapshot = getAuthSnapshot();
		if (!snapshot.loading && snapshot.user) if (snapshot.user.email_verified) throw redirect({ to: getSafeRedirectPath(search.redirect) });
		else throw redirect({ to: "/signup" });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
