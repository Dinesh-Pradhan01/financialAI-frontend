import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accept-invite._token-BU1vWUlT.js
var $$splitComponentImporter = () => import("./accept-invite._token-wV5_1fSb.mjs");
var Route = createFileRoute("/(auth)/accept-invite/$token")({
	head: () => ({ meta: [{ title: "Accept Workspace Invitation · SpotLite" }, {
		name: "description",
		content: "Set up your executive account to join your company workspace on SpotLite Intelligence."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
