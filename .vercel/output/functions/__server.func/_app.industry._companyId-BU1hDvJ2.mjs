import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as objectType, r as enumType, s as stringType } from "./_libs/zod.mjs";
import { i as competitorsQueryOptions, r as companyFinancialsQueryOptions } from "./_ssr/useCompanyFinancials-Df2wMmnb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.industry._companyId-BU1hDvJ2.js
var $$splitComponentImporter = () => import("./_app.industry._companyId-eF3qdMto.mjs");
var financialsSearchSchema = objectType({
	view: enumType(["quarterly", "annual"]).default("quarterly"),
	demo: stringType().optional()
});
var Route = createFileRoute("/_app/industry/$companyId")({
	validateSearch: (search) => financialsSearchSchema.parse(search),
	loader: async ({ context, params }) => {
		const companyId = Number(params.companyId);
		await Promise.all([context.queryClient.ensureQueryData(competitorsQueryOptions()), !Number.isNaN(companyId) ? context.queryClient.ensureQueryData(companyFinancialsQueryOptions(companyId)) : Promise.resolve()]);
	},
	head: () => ({ meta: [{ title: "Company Financials · Spotlite" }, {
		name: "description",
		content: "Peer competitor financial analysis and statements."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
