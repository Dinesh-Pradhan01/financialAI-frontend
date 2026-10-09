import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spending._category-_vx1l2jU.js
var $$splitComponentImporter = () => import("./spending._category-3TNzsLFY.mjs");
var Route = createFileRoute("/_app/(spending)/spending/$category")({
	head: ({ params }) => ({ meta: [{ title: `${params.category} spend · Spotlite` }, {
		name: "description",
		content: "Transaction drill-down for this spending category."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
