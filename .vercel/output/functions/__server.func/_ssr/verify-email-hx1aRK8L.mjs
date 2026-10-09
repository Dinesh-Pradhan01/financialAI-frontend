import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as auth } from "./firebase-pUuzlwRE.mjs";
import { d as waitForAuth } from "./api-XLUwYDya.mjs";
import { t as getSafeRedirectPath } from "./redirectValidation-Cbr4eAY9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-hx1aRK8L.js
var $$splitComponentImporter = () => import("./verify-email-CSW03e4E.mjs");
var Route = createFileRoute("/(auth)/verify-email")({
	validateSearch: (search) => {
		return { redirect: typeof search.redirect === "string" ? search.redirect : void 0 };
	},
	head: () => ({ meta: [{ title: "Verify your email · SpotLite Intelligence" }, {
		name: "description",
		content: "Please verify your email to start using SpotLite."
	}] }),
	beforeLoad: async ({ search }) => {
		if (typeof window === "undefined") return;
		const fbUser = auth.currentUser ?? await waitForAuth();
		if (!fbUser) throw redirect({
			to: "/login",
			search: { redirect: search.redirect }
		});
		if (fbUser.emailVerified) throw redirect({ to: getSafeRedirectPath(search.redirect) });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
