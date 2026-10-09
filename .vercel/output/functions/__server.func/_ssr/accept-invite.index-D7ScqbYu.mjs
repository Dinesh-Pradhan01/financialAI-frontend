import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accept-invite.index-D7ScqbYu.js
var $$splitComponentImporter = () => import("./accept-invite.index-Kdp-hfQL.mjs");
var Route = createFileRoute("/(auth)/accept-invite/")({
	validateSearch: (search) => ({ token: search.token || "" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
