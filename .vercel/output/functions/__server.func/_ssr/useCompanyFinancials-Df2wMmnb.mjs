import { M as SignalLow, N as SignalHigh, j as SignalMedium } from "../_libs/lucide-react.mjs";
import { n as api } from "./api-XLUwYDya.mjs";
import { a as useQueryClient, n as queryOptions, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as queryKeys } from "./queryKeys-DHNOxYVt.mjs";
import { a as numberType, i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCompanyFinancials-Df2wMmnb.js
/**
* Runtime Zod Schemas for Industry Contracts
*
* Enforces contract integrity at runtime.
* When in "api" mode, malformed or legacy responses fail validation
* and produce a typed unexpected response error.
*/
var OverlapLevelSchema = enumType([
	"Very High",
	"High",
	"Moderate High",
	"Moderate"
]);
var OverlapSourceSchema = enumType(["curated", "ai_assessed"]);
var ListingStatusSchema = enumType(["unlisted", "listed"]);
var FinancialStatusSchema = enumType(["available", "unavailable"]);
var AnnualStatusSchema = enumType(["ok", "unavailable"]);
var FinancialBasisSchema = enumType(["reported", "rolled_up"]);
var FinancialUnitSchema = literalType("INR_CR");
var CompetitorsDataStatusSchema = enumType([
	"ready",
	"generating",
	"none"
]);
var AnchorCompanySchema = objectType({
	company_name: stringType().min(1),
	cin: stringType().nullable(),
	industry: stringType(),
	description: stringType(),
	listing_status: ListingStatusSchema,
	financial_status: FinancialStatusSchema,
	reason: stringType().nullable()
});
var CompetitorItemSchema = objectType({
	company_id: numberType().int(),
	company_name: stringType().min(1),
	ticker: stringType().min(1),
	overlap_level: OverlapLevelSchema,
	overlap_rank: numberType().int(),
	overlap_summary: stringType(),
	overlap_source: OverlapSourceSchema,
	has_financials: booleanType(),
	latest_period: stringType().nullable()
});
var CompetitorsResponseSchema = objectType({
	status: CompetitorsDataStatusSchema,
	generated_at: stringType().nullable(),
	anchor: AnchorCompanySchema,
	competitors: arrayType(CompetitorItemSchema)
});
var MetricValueSchema = objectType({
	value: numberType().nullable(),
	period_label: stringType().nullable(),
	basis: stringType().nullable()
});
var KeyMetricsSchema = objectType({
	ttm_revenue: MetricValueSchema,
	latest_quarter_revenue: MetricValueSchema,
	expenditure_to_revenue_pct: MetricValueSchema,
	net_profit_margin_pct: MetricValueSchema
});
var FinancialPeriodRowSchema = objectType({
	period_label: stringType(),
	period_end: stringType().nullable(),
	revenue: numberType().nullable(),
	other_income: numberType().nullable(),
	total_income: numberType().nullable(),
	expenditure: numberType().nullable(),
	interest: numberType().nullable(),
	operating_profit: numberType().nullable(),
	net_profit: numberType().nullable(),
	opm_pct: numberType().nullable(),
	npm_pct: numberType().nullable()
});
var AnnualFinancialRowSchema = FinancialPeriodRowSchema.extend({ basis: FinancialBasisSchema });
var FinancialMetaSchema = objectType({
	source: stringType(),
	fiscal_year_end: numberType().nullable(),
	fiscal_year_end_assumed: booleanType(),
	quarters_available: numberType().int()
});
var CompanyFinancialsResponseSchema = objectType({
	company_id: numberType().int(),
	company_name: stringType().nullable().optional(),
	ticker: stringType().nullable().optional(),
	as_of: stringType().nullable(),
	latest_period: stringType().nullable(),
	unit: FinancialUnitSchema,
	financial_status: FinancialStatusSchema,
	reason: stringType().nullable(),
	key_metrics: KeyMetricsSchema,
	quarterly: arrayType(FinancialPeriodRowSchema),
	annual: arrayType(AnnualFinancialRowSchema),
	annual_status: AnnualStatusSchema,
	meta: FinancialMetaSchema
});
/**
* Builds a single quarterly or period row ensuring mathematical consistency.
*/
function buildFinancialPeriodRow(input) {
	const { period_label, period_end, revenue, other_income = null, expenditure = null, interest = null, operating_profit: explicitOpProfit = null, net_profit = null } = input;
	let total_income = null;
	if (revenue !== null) total_income = other_income !== null ? Number((revenue + other_income).toFixed(2)) : revenue;
	let operating_profit = explicitOpProfit;
	if (operating_profit === null && revenue !== null && expenditure !== null) operating_profit = Number((revenue - expenditure).toFixed(2));
	let opm_pct = null;
	if (revenue !== null && revenue !== 0 && operating_profit !== null) opm_pct = Number((operating_profit / revenue * 100).toFixed(2));
	let npm_pct = null;
	if (revenue !== null && revenue !== 0 && net_profit !== null) npm_pct = Number((net_profit / revenue * 100).toFixed(2));
	return {
		period_label,
		period_end,
		revenue,
		other_income,
		total_income,
		expenditure,
		interest,
		operating_profit,
		net_profit,
		opm_pct,
		npm_pct
	};
}
/**
* Builds an annual financial row with basis attribution.
*/
function buildAnnualFinancialRow(input) {
	return {
		...buildFinancialPeriodRow(input),
		basis: input.basis
	};
}
/**
* Computes KeyMetrics from quarterly rows.
*
* Rules:
* - Quarters are expected latest-first.
* - hasGap: If there is a missing quarter among the latest 4, TTM and annual margin are null.
*/
function buildKeyMetricsFromQuarters(quartersLatestFirst, options = {}) {
	if (quartersLatestFirst.length === 0) return {
		ttm_revenue: {
			value: null,
			period_label: null,
			basis: null
		},
		latest_quarter_revenue: {
			value: null,
			period_label: null,
			basis: null
		},
		expenditure_to_revenue_pct: {
			value: null,
			period_label: null,
			basis: null
		},
		net_profit_margin_pct: {
			value: null,
			period_label: null,
			basis: null
		}
	};
	const latestQtr = quartersLatestFirst[0];
	const { hasGap = false, latestPeriodLabel = latestQtr.period_label } = options;
	const latest_quarter_revenue = {
		value: latestQtr.revenue,
		period_label: latestPeriodLabel,
		basis: "reported"
	};
	let expToRevVal = null;
	if (latestQtr.revenue !== null && latestQtr.revenue !== 0 && latestQtr.expenditure !== null) expToRevVal = Number((latestQtr.expenditure / latestQtr.revenue * 100).toFixed(2));
	const expenditure_to_revenue_pct = {
		value: expToRevVal,
		period_label: latestPeriodLabel,
		basis: "latest_quarter"
	};
	if (hasGap || quartersLatestFirst.length < 4) return {
		ttm_revenue: {
			value: null,
			period_label: null,
			basis: null
		},
		latest_quarter_revenue,
		expenditure_to_revenue_pct,
		net_profit_margin_pct: {
			value: null,
			period_label: null,
			basis: null
		}
	};
	const last4 = quartersLatestFirst.slice(0, 4);
	const ttmRevSum = last4.reduce((sum, q) => sum + (q.revenue ?? 0), 0);
	const ttmNetProfitSum = last4.reduce((sum, q) => sum + (q.net_profit ?? 0), 0);
	const ttm_revenue = {
		value: Number(ttmRevSum.toFixed(2)),
		period_label: "TTM",
		basis: "rolled_up_4q"
	};
	let ttmNpmVal = null;
	if (ttmRevSum > 0) ttmNpmVal = Number((ttmNetProfitSum / ttmRevSum * 100).toFixed(2));
	return {
		ttm_revenue,
		latest_quarter_revenue,
		expenditure_to_revenue_pct,
		net_profit_margin_pct: {
			value: ttmNpmVal,
			period_label: "TTM",
			basis: "rolled_up_4q"
		}
	};
}
var FIXTURE_SOURCE_LABEL = "Demo data (fixture)";
var FIXTURE_COMPETITORS_RESPONSE = {
	status: "ready",
	generated_at: "2026-10-07T00:00:00Z",
	anchor: {
		company_name: "VL ACCESS INDIA PRIVATE LIMITED",
		cin: "U52392OR2007PTC009194",
		industry: "Trading",
		description: "Hardware wholesaler and system integrator providing CCTV cameras, biometric devices, PA systems, and network switches.",
		listing_status: "unlisted",
		financial_status: "unavailable",
		reason: "unlisted_private_company"
	},
	competitors: [
		{
			company_id: 2213,
			company_name: "Aditya Infotech",
			ticker: "CPPLUS",
			overlap_level: "Very High",
			overlap_rank: 1,
			overlap_summary: "Direct competitor in CCTV, security surveillance hardware distribution, and enterprise camera integrations.",
			overlap_source: "curated",
			has_financials: true,
			latest_period: "Q4 FY26"
		},
		{
			company_id: 900001,
			company_name: "Allied Digital",
			ticker: "ADSL",
			overlap_level: "Very High",
			overlap_rank: 2,
			overlap_summary: "IT infrastructure solutions, network integration, and physical security architecture services.",
			overlap_source: "curated",
			has_financials: false,
			latest_period: null
		},
		{
			company_id: 2276,
			company_name: "Black Box",
			ticker: "BBOX",
			overlap_level: "High",
			overlap_rank: 3,
			overlap_summary: "Enterprise networking, structured cabling systems, and smart communications hardware deployment.",
			overlap_source: "curated",
			has_financials: true,
			latest_period: "Q4 FY26"
		},
		{
			company_id: 1779,
			company_name: "D-Link India",
			ticker: "DLINKINDIA",
			overlap_level: "Moderate High",
			overlap_rank: 4,
			overlap_summary: "Networking products manufacturer and distributor of routers, switches, and commercial wireless systems.",
			overlap_source: "curated",
			has_financials: true,
			latest_period: "Q1 FY27"
		},
		{
			company_id: 1776,
			company_name: "Rashi Peripherals",
			ticker: "RPTECH",
			overlap_level: "Moderate",
			overlap_rank: 5,
			overlap_summary: "National distributor for ICT brands, networking components, and surveillance storage devices.",
			overlap_source: "curated",
			has_financials: true,
			latest_period: "Q1 FY27"
		}
	]
};
var adityaQuarters = [
	buildFinancialPeriodRow({
		period_label: "Q4 FY26",
		period_end: "2026-03-31",
		revenue: 1422,
		expenditure: 1165,
		operating_profit: 257,
		net_profit: 169
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY26",
		period_end: "2025-12-31",
		revenue: 1350,
		expenditure: 1110,
		operating_profit: 240,
		net_profit: 155
	}),
	buildFinancialPeriodRow({
		period_label: "Q2 FY26",
		period_end: "2025-09-30",
		revenue: 1280,
		expenditure: 1060,
		operating_profit: 220,
		net_profit: 140
	}),
	buildFinancialPeriodRow({
		period_label: "Q1 FY26",
		period_end: "2025-06-30",
		revenue: 1210,
		expenditure: 1015,
		operating_profit: 195,
		net_profit: 125
	}),
	buildFinancialPeriodRow({
		period_label: "Q4 FY25",
		period_end: "2025-03-31",
		revenue: 977,
		expenditure: 879,
		operating_profit: 98,
		net_profit: 55
	})
];
var adityaAnnual = [buildAnnualFinancialRow({
	period_label: "FY26",
	period_end: "2026-03-31",
	revenue: 5262,
	expenditure: 4350,
	operating_profit: 912,
	net_profit: 589,
	basis: "rolled_up"
})];
var FIXTURE_FINANCIALS_ADITYA = {
	company_id: 2213,
	as_of: "2026-03-31",
	latest_period: "Q4 FY26",
	unit: "INR_CR",
	financial_status: "available",
	reason: null,
	key_metrics: buildKeyMetricsFromQuarters(adityaQuarters, { latestPeriodLabel: "Q4 FY26" }),
	quarterly: adityaQuarters,
	annual: adityaAnnual,
	annual_status: "ok",
	meta: {
		source: FIXTURE_SOURCE_LABEL,
		fiscal_year_end: 3,
		fiscal_year_end_assumed: false,
		quarters_available: 5
	}
};
var FIXTURE_FINANCIALS_ALLIED = {
	company_id: 900001,
	as_of: null,
	latest_period: null,
	unit: "INR_CR",
	financial_status: "unavailable",
	reason: "no_financials_loaded",
	key_metrics: {
		ttm_revenue: {
			value: null,
			period_label: null,
			basis: null
		},
		latest_quarter_revenue: {
			value: null,
			period_label: null,
			basis: null
		},
		expenditure_to_revenue_pct: {
			value: null,
			period_label: null,
			basis: null
		},
		net_profit_margin_pct: {
			value: null,
			period_label: null,
			basis: null
		}
	},
	quarterly: [],
	annual: [],
	annual_status: "unavailable",
	meta: {
		source: FIXTURE_SOURCE_LABEL,
		fiscal_year_end: null,
		fiscal_year_end_assumed: true,
		quarters_available: 0
	}
};
var blackBoxQuartersWithGap = [
	buildFinancialPeriodRow({
		period_label: "Q4 FY26",
		period_end: "2026-03-31",
		revenue: 410,
		expenditure: 375,
		operating_profit: 35,
		net_profit: 22
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY26",
		period_end: "2025-12-31",
		revenue: 395,
		expenditure: 362,
		operating_profit: 33,
		net_profit: 20
	}),
	buildFinancialPeriodRow({
		period_label: "Q1 FY26",
		period_end: "2025-06-30",
		revenue: 380,
		expenditure: 350,
		operating_profit: 30,
		net_profit: 18
	}),
	buildFinancialPeriodRow({
		period_label: "Q4 FY25",
		period_end: "2025-03-31",
		revenue: 370,
		expenditure: 342,
		operating_profit: 28,
		net_profit: 16
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY25",
		period_end: "2024-12-31",
		revenue: 360,
		expenditure: 335,
		operating_profit: 25,
		net_profit: 15
	})
];
var FIXTURE_FINANCIALS_BLACK_BOX = {
	company_id: 2276,
	as_of: "2026-03-31",
	latest_period: "Q4 FY26",
	unit: "INR_CR",
	financial_status: "available",
	reason: "gap_in_quarters",
	key_metrics: buildKeyMetricsFromQuarters(blackBoxQuartersWithGap, {
		hasGap: true,
		latestPeriodLabel: "Q4 FY26"
	}),
	quarterly: blackBoxQuartersWithGap,
	annual: [],
	annual_status: "unavailable",
	meta: {
		source: FIXTURE_SOURCE_LABEL,
		fiscal_year_end: 3,
		fiscal_year_end_assumed: true,
		quarters_available: 5
	}
};
var dlinkQuarters = [
	buildFinancialPeriodRow({
		period_label: "Q1 FY27",
		period_end: "2026-06-30",
		revenue: 457,
		other_income: 5,
		expenditure: 422,
		operating_profit: 36.56,
		net_profit: 28
	}),
	buildFinancialPeriodRow({
		period_label: "Q4 FY26",
		period_end: "2026-03-31",
		revenue: 440,
		other_income: 4,
		expenditure: 405,
		operating_profit: 35,
		net_profit: 27
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY26",
		period_end: "2025-12-31",
		revenue: 425,
		other_income: 4,
		expenditure: 392,
		operating_profit: 33,
		net_profit: 25
	}),
	buildFinancialPeriodRow({
		period_label: "Q2 FY26",
		period_end: "2025-09-30",
		revenue: 410,
		other_income: 3,
		expenditure: 380,
		operating_profit: 30,
		net_profit: 23
	}),
	buildFinancialPeriodRow({
		period_label: "Q1 FY26",
		period_end: "2025-06-30",
		revenue: 395,
		other_income: 3,
		expenditure: 368,
		operating_profit: 27,
		net_profit: 21
	}),
	buildFinancialPeriodRow({
		period_label: "Q4 FY25",
		period_end: "2025-03-31",
		revenue: 380,
		other_income: 3,
		expenditure: 352,
		operating_profit: 28,
		net_profit: 20
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY25",
		period_end: "2024-12-31",
		revenue: 365,
		other_income: 2,
		expenditure: 338,
		operating_profit: 27,
		net_profit: 19
	}),
	buildFinancialPeriodRow({
		period_label: "Q2 FY25",
		period_end: "2024-09-30",
		revenue: 350,
		other_income: 2,
		expenditure: 325,
		operating_profit: 25,
		net_profit: 18
	}),
	buildFinancialPeriodRow({
		period_label: "Q1 FY25",
		period_end: "2024-06-30",
		revenue: 340,
		other_income: 2,
		expenditure: 315,
		operating_profit: 25,
		net_profit: 17
	}),
	buildFinancialPeriodRow({
		period_label: "Q4 FY24",
		period_end: "2024-03-31",
		revenue: 330,
		other_income: 2,
		expenditure: 305,
		operating_profit: 25,
		net_profit: 16
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY24",
		period_end: "2023-12-31",
		revenue: 320,
		other_income: 2,
		expenditure: 295,
		operating_profit: 25,
		net_profit: 15
	}),
	buildFinancialPeriodRow({
		period_label: "Q2 FY24",
		period_end: "2023-09-30",
		revenue: 310,
		other_income: 2,
		expenditure: 285,
		operating_profit: 25,
		net_profit: 14
	}),
	buildFinancialPeriodRow({
		period_label: "Q1 FY24",
		period_end: "2023-06-30",
		revenue: 300,
		other_income: 3,
		expenditure: 273,
		operating_profit: 27,
		net_profit: 21
	})
];
var dlinkAnnual = [
	buildAnnualFinancialRow({
		period_label: "FY26",
		period_end: "2026-03-31",
		revenue: 1670,
		other_income: 14,
		expenditure: 1545,
		operating_profit: 125,
		net_profit: 96,
		basis: "reported"
	}),
	buildAnnualFinancialRow({
		period_label: "FY25",
		period_end: "2025-03-31",
		revenue: 1435,
		other_income: 9,
		expenditure: 1330,
		operating_profit: 105,
		net_profit: 74,
		basis: "reported"
	}),
	buildAnnualFinancialRow({
		period_label: "FY24",
		period_end: "2024-03-31",
		revenue: 1260,
		other_income: 9,
		expenditure: 1158,
		operating_profit: 102,
		net_profit: 66,
		basis: "reported"
	})
];
var FIXTURE_FINANCIALS_DLINK = {
	company_id: 1779,
	as_of: "2026-06-30",
	latest_period: "Q1 FY27",
	unit: "INR_CR",
	financial_status: "available",
	reason: null,
	key_metrics: buildKeyMetricsFromQuarters(dlinkQuarters, { latestPeriodLabel: "Q1 FY27" }),
	quarterly: dlinkQuarters,
	annual: dlinkAnnual,
	annual_status: "ok",
	meta: {
		source: FIXTURE_SOURCE_LABEL,
		fiscal_year_end: 3,
		fiscal_year_end_assumed: false,
		quarters_available: 13
	}
};
var rashiQuarters = [
	buildFinancialPeriodRow({
		period_label: "Q1 FY27",
		period_end: "2026-06-30",
		revenue: 5102,
		expenditure: 4947,
		operating_profit: 155,
		net_profit: 105
	}),
	buildFinancialPeriodRow({
		period_label: "Q4 FY26",
		period_end: "2026-03-31",
		revenue: 4850,
		expenditure: 4705,
		operating_profit: 145,
		net_profit: 98
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY26",
		period_end: "2025-12-31",
		revenue: 4620,
		expenditure: 4480,
		operating_profit: 140,
		net_profit: 92
	}),
	buildFinancialPeriodRow({
		period_label: "Q2 FY26",
		period_end: "2025-09-30",
		revenue: 4400,
		expenditure: 4270,
		operating_profit: 130,
		net_profit: 85
	}),
	buildFinancialPeriodRow({
		period_label: "Q1 FY26",
		period_end: "2025-06-30",
		revenue: 4180,
		expenditure: 4055,
		operating_profit: 125,
		net_profit: 80
	}),
	buildFinancialPeriodRow({
		period_label: "Q4 FY25",
		period_end: "2025-03-31",
		revenue: 3950,
		expenditure: 3835,
		operating_profit: 115,
		net_profit: 74
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY25",
		period_end: "2024-12-31",
		revenue: 3750,
		expenditure: 3640,
		operating_profit: 110,
		net_profit: 70
	}),
	buildFinancialPeriodRow({
		period_label: "Q2 FY25",
		period_end: "2024-09-30",
		revenue: 3550,
		expenditure: 3445,
		operating_profit: 105,
		net_profit: 65
	}),
	buildFinancialPeriodRow({
		period_label: "Q1 FY25",
		period_end: "2024-06-30",
		revenue: 3350,
		expenditure: 3250,
		operating_profit: 100,
		net_profit: 60
	}),
	buildFinancialPeriodRow({
		period_label: "Q4 FY24",
		period_end: "2024-03-31",
		revenue: 3100,
		expenditure: 3005,
		operating_profit: 95,
		net_profit: 55
	}),
	buildFinancialPeriodRow({
		period_label: "Q3 FY24",
		period_end: "2023-12-31",
		revenue: 2900,
		expenditure: 2810,
		operating_profit: 90,
		net_profit: 52
	}),
	buildFinancialPeriodRow({
		period_label: "Q2 FY24",
		period_end: "2023-09-30",
		revenue: 2700,
		expenditure: 2615,
		operating_profit: 85,
		net_profit: 48
	}),
	buildFinancialPeriodRow({
		period_label: "Q1 FY24",
		period_end: "2023-06-30",
		revenue: 2446,
		expenditure: 2354,
		operating_profit: 92,
		net_profit: 50
	})
];
var rashiAnnual = [
	buildAnnualFinancialRow({
		period_label: "FY26",
		period_end: "2026-03-31",
		revenue: 18050,
		expenditure: 17510,
		operating_profit: 540,
		net_profit: 355,
		basis: "rolled_up"
	}),
	buildAnnualFinancialRow({
		period_label: "FY25",
		period_end: "2025-03-31",
		revenue: 14600,
		expenditure: 14170,
		operating_profit: 430,
		net_profit: 269,
		basis: "rolled_up"
	}),
	buildAnnualFinancialRow({
		period_label: "FY24",
		period_end: "2024-03-31",
		revenue: 11146,
		expenditure: 10784,
		operating_profit: 362,
		net_profit: 205,
		basis: "rolled_up"
	})
];
var FIXTURE_FINANCIALS_BY_COMPANY_ID = {
	2213: FIXTURE_FINANCIALS_ADITYA,
	900001: FIXTURE_FINANCIALS_ALLIED,
	2276: FIXTURE_FINANCIALS_BLACK_BOX,
	1779: FIXTURE_FINANCIALS_DLINK,
	1776: {
		company_id: 1776,
		as_of: "2026-06-30",
		latest_period: "Q1 FY27",
		unit: "INR_CR",
		financial_status: "available",
		reason: null,
		key_metrics: buildKeyMetricsFromQuarters(rashiQuarters, { latestPeriodLabel: "Q1 FY27" }),
		quarterly: rashiQuarters,
		annual: rashiAnnual,
		annual_status: "ok",
		meta: {
			source: FIXTURE_SOURCE_LABEL,
			fiscal_year_end: 3,
			fiscal_year_end_assumed: false,
			quarters_available: 13
		}
	}
};
/**
* Returns fixture financials for a company, or a safe unavailable fallback if unknown.
*/
function getFixtureCompanyFinancials(companyId) {
	if (FIXTURE_FINANCIALS_BY_COMPANY_ID[companyId]) return FIXTURE_FINANCIALS_BY_COMPANY_ID[companyId];
	return {
		company_id: companyId,
		as_of: null,
		latest_period: null,
		unit: "INR_CR",
		financial_status: "unavailable",
		reason: "no_financials_loaded",
		key_metrics: {
			ttm_revenue: {
				value: null,
				period_label: null,
				basis: null
			},
			latest_quarter_revenue: {
				value: null,
				period_label: null,
				basis: null
			},
			expenditure_to_revenue_pct: {
				value: null,
				period_label: null,
				basis: null
			},
			net_profit_margin_pct: {
				value: null,
				period_label: null,
				basis: null
			}
		},
		quarterly: [],
		annual: [],
		annual_status: "unavailable",
		meta: {
			source: FIXTURE_SOURCE_LABEL,
			fiscal_year_end: null,
			fiscal_year_end_assumed: true,
			quarters_available: 0
		}
	};
}
/**
* Industry API Client & Data Source Switch
*
* Implements the dual-source architecture:
* - VITE_INDUSTRY_DATA_SOURCE = "fixtures" (default) | "api"
* - In "fixtures" mode, returns contract-shaped static fixtures with 300ms skeleton delay.
* - In "api" mode, queries live backend and validates with Zod runtime schemas.
* - Demo query parameter support for QA / developer sandboxing:
*   ?demo=empty | none | generating | error | slow | unexpected
*/
var IndustryApiError = class extends Error {
	kind;
	status;
	validationErrors;
	constructor(kind, message, opts) {
		super(message);
		this.name = "IndustryApiError";
		this.kind = kind;
		this.status = opts?.status;
		this.validationErrors = opts?.validationErrors;
		if (opts?.cause) this.cause = opts?.cause;
	}
};
function isIndustryApiError(error) {
	return error instanceof IndustryApiError;
}
function getIndustryDataSource() {
	return "fixtures";
}
function areDemoControlsAllowed() {
	return Boolean(false) || false;
}
function getDemoParam(overrideParam) {
	if (overrideParam) return overrideParam;
	if (!areDemoControlsAllowed() || typeof window === "undefined") return null;
	return new URLSearchParams(window.location.search).get("demo");
}
async function sleep(ms, signal) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(resolve, ms);
		if (signal) signal.addEventListener("abort", () => {
			clearTimeout(timer);
			reject(new DOMException("Aborted", "AbortError"));
		});
	});
}
async function getCompetitorsFromFixtures(opts) {
	const demo = getDemoParam(opts?.demo);
	let latency = 300;
	if (demo === "slow") latency = 1500;
	await sleep(latency, opts?.signal);
	if (demo === "error") throw new IndustryApiError("network_error", "Simulated demo error for competitors query.", { status: 500 });
	if (demo === "unexpected") {
		const parsed = CompetitorsResponseSchema.safeParse({
			status: "invalid_status",
			anchor: null,
			competitors: "not_an_array"
		});
		if (!parsed.success) throw new IndustryApiError("unexpected_response", "Unexpected response schema from upstream service.", { validationErrors: parsed.error.format() });
	}
	if (demo === "empty") return {
		...FIXTURE_COMPETITORS_RESPONSE,
		status: "ready",
		competitors: []
	};
	if (demo === "none") return {
		...FIXTURE_COMPETITORS_RESPONSE,
		status: "none",
		competitors: []
	};
	if (demo === "generating") return {
		...FIXTURE_COMPETITORS_RESPONSE,
		status: "generating",
		competitors: []
	};
	return FIXTURE_COMPETITORS_RESPONSE;
}
async function getCompanyFinancialsFromFixtures(companyId, opts) {
	const demo = getDemoParam(opts?.demo);
	let latency = 300;
	if (demo === "slow") latency = 1500;
	await sleep(latency, opts?.signal);
	if (demo === "error") throw new IndustryApiError("network_error", `Simulated demo error for company ${companyId} financials.`, { status: 500 });
	if (demo === "unexpected") {
		const parsed = CompanyFinancialsResponseSchema.safeParse({
			company_id: "not-a-number",
			key_metrics: null
		});
		if (!parsed.success) throw new IndustryApiError("unexpected_response", "Unexpected financials response schema from upstream service.", { validationErrors: parsed.error.format() });
	}
	if (!FIXTURE_FINANCIALS_BY_COMPANY_ID[companyId]) throw new IndustryApiError("not_found", `Financials not found for company ID ${companyId}.`, { status: 404 });
	return getFixtureCompanyFinancials(companyId);
}
async function getCompetitorsFromApi(opts) {
	try {
		const raw = await api.get("/api/v1/company/competitors", { signal: opts?.signal });
		const parsed = CompetitorsResponseSchema.safeParse(raw);
		if (!parsed.success) throw new IndustryApiError("unexpected_response", "Backend competitors response did not match the required data contract.", { validationErrors: parsed.error.format() });
		return parsed.data;
	} catch (error) {
		if (isIndustryApiError(error)) throw error;
		const status = error?.status;
		const errorMessage = error?.message;
		if (status === 401) throw new IndustryApiError("unauthorized", "User session expired or unauthorized.", {
			status,
			cause: error
		});
		if (status === 404) throw new IndustryApiError("not_found", "Competitor records not found.", {
			status,
			cause: error
		});
		throw new IndustryApiError("network_error", errorMessage || "Failed to fetch competitors from backend API.", {
			status,
			cause: error
		});
	}
}
async function getCompanyFinancialsFromApi(companyId, opts) {
	try {
		const raw = await api.get(`/api/v1/company/competitors/${encodeURIComponent(companyId)}/financials`, { signal: opts?.signal });
		const parsed = CompanyFinancialsResponseSchema.safeParse(raw);
		if (!parsed.success) throw new IndustryApiError("unexpected_response", `Backend financials for company ${companyId} did not match the required data contract.`, { validationErrors: parsed.error.format() });
		return parsed.data;
	} catch (error) {
		if (isIndustryApiError(error)) throw error;
		const status = error?.status;
		const errorMessage = error?.message;
		if (status === 401) throw new IndustryApiError("unauthorized", "User session expired or unauthorized.", {
			status,
			cause: error
		});
		if (status === 404) throw new IndustryApiError("not_found", `Financials not found for company ${companyId}.`, {
			status,
			cause: error
		});
		throw new IndustryApiError("network_error", errorMessage || `Failed to fetch financials for company ${companyId}.`, {
			status,
			cause: error
		});
	}
}
/**
* Fetches the tenant's competitor list.
* Respects VITE_INDUSTRY_DATA_SOURCE ("fixtures" | "api").
*/
async function getCompetitors(opts) {
	if (getIndustryDataSource() === "api") return getCompetitorsFromApi(opts);
	return getCompetitorsFromFixtures(opts);
}
/**
* Fetches per-company financials.
* Respects VITE_INDUSTRY_DATA_SOURCE ("fixtures" | "api").
*/
async function getCompanyFinancials(companyId, opts) {
	if (getIndustryDataSource() === "api") return getCompanyFinancialsFromApi(companyId, opts);
	return getCompanyFinancialsFromFixtures(companyId, opts);
}
/**
* Presentation Helpers & Design Tokens for Industry v2
*
* Adheres strictly to DESIGN.md:
* - Zero arbitrary Tailwind values
* - Semantic design tokens only
* - Meaning carried by text and icons, not colour alone
* - Standard Indian number formatting with tabular mono numerals
* - Null values strictly rendered as em dash ("—")
*/
var FINANCIAL_UNIT_CAPTION = "All figures in ₹ Cr.";
/**
* Formats a nullable financial value with Indian (en-IN) number grouping.
*
* Rules:
* - null / undefined / NaN -> strictly "—" (em dash).
* - Never fabricates 0 when null.
* - Respects negative signs cleanly: -₹12.50 or -12.50% or -12.50.
* - Always 2 decimal places by default for currency/percentage precision.
*/
function formatFinancialValue(value, options = {}) {
	if (value === null || value === void 0 || Number.isNaN(value)) return "—";
	const { isPercentage = false, digits = 2, showCurrency = false } = options;
	const isNegative = value < 0;
	const absValue = Math.abs(value);
	const formattedAbs = new Intl.NumberFormat("en-IN", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(absValue);
	if (isPercentage) return isNegative ? `-${formattedAbs}%` : `${formattedAbs}%`;
	if (showCurrency) return isNegative ? `-₹${formattedAbs}` : `₹${formattedAbs}`;
	return isNegative ? `-${formattedAbs}` : formattedAbs;
}
var OVERLAP_LEVEL_META = {
	"Very High": {
		level: "Very High",
		rankOrder: 1,
		label: "Very High Overlap",
		icon: SignalHigh,
		tintClass: "bg-brand-primary/10",
		borderClass: "border-brand-primary/30",
		textClass: "text-brand-primary",
		badgeClasses: "bg-brand-primary/10 border-brand-primary/30 text-brand-primary",
		description: "Direct competitor sharing identical product categories, business models, and primary buyer segments."
	},
	High: {
		level: "High",
		rankOrder: 2,
		label: "High Overlap",
		icon: SignalHigh,
		tintClass: "bg-severity-low/15",
		borderClass: "border-severity-low/30",
		textClass: "text-severity-low",
		badgeClasses: "bg-severity-low/15 border-severity-low/30 text-severity-low",
		description: "Substantial product catalog or customer market overlap with minor operational differences."
	},
	"Moderate High": {
		level: "Moderate High",
		rankOrder: 3,
		label: "Moderate High Overlap",
		icon: SignalMedium,
		tintClass: "bg-severity-moderate/15",
		borderClass: "border-severity-moderate/30",
		textClass: "text-severity-moderate",
		badgeClasses: "bg-severity-moderate/15 border-severity-moderate/30 text-severity-moderate",
		description: "Partial overlap in wholesale hardware distribution with distinct specialization or service components."
	},
	Moderate: {
		level: "Moderate",
		rankOrder: 4,
		label: "Moderate Overlap",
		icon: SignalLow,
		tintClass: "bg-surface-alt",
		borderClass: "border-border-c",
		textClass: "text-text-secondary",
		badgeClasses: "bg-surface-alt border-border-c text-text-secondary",
		description: "Adjacent industry peer operating within broader technology and electronics distribution."
	}
};
var FINANCIAL_TABLE_ROW_CONFIGS = [
	{
		key: "revenue",
		label: "Revenue",
		isPercentage: false
	},
	{
		key: "other_income",
		label: "Other Income",
		isPercentage: false
	},
	{
		key: "total_income",
		label: "Total Income",
		isPercentage: false
	},
	{
		key: "expenditure",
		label: "Expenditure",
		isPercentage: false
	},
	{
		key: "interest",
		label: "Interest",
		isPercentage: false
	},
	{
		key: "operating_profit",
		label: "Operating Profit",
		isPercentage: false
	},
	{
		key: "net_profit",
		label: "Net Profit",
		isPercentage: false
	},
	{
		key: "opm_pct",
		label: "OPM %",
		isPercentage: true
	},
	{
		key: "npm_pct",
		label: "NPM %",
		isPercentage: true
	}
];
var REASON_CODE_COPY_MAP = {
	unlisted_private_company: "Financial data is not publicly reported for unlisted private companies.",
	no_financials_loaded: "Financial statements are currently not loaded for this entity.",
	gap_in_quarters: "Insufficient consecutive quarterly records to compute reliable annual roll-ups.",
	non_reporting_entity: "Company is not subject to public quarterly reporting requirements."
};
/**
* Returns human-readable explanation copy for a machine reason code.
*/
function getReasonDisplayCopy(reason) {
	if (!reason) return null;
	const normalized = reason.trim().toLowerCase();
	if (REASON_CODE_COPY_MAP[normalized]) return REASON_CODE_COPY_MAP[normalized];
	return `${reason.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}.`;
}
function mapCompetitorRow(dto) {
	return {
		companyId: dto.company_id,
		companyName: dto.company_name,
		ticker: dto.ticker,
		overlapLevel: dto.overlap_level,
		overlapRank: dto.overlap_rank,
		overlapSummary: dto.overlap_summary,
		overlapSource: dto.overlap_source,
		hasFinancials: dto.has_financials,
		latestPeriod: dto.latest_period,
		href: `/industry/${encodeURIComponent(dto.company_id)}`
	};
}
function mapAnchorCompany(dto) {
	return {
		companyName: dto.company_name,
		cin: dto.cin,
		industry: dto.industry,
		description: dto.description,
		listingStatus: dto.listing_status,
		financialStatus: dto.financial_status,
		reason: dto.reason,
		reasonDisplay: getReasonDisplayCopy(dto.reason)
	};
}
function mapCompetitorsResponse(dto, options) {
	const isFixture = options?.isFixture ?? getIndustryDataSource() === "fixtures";
	return {
		status: dto.status,
		generatedAt: dto.generated_at,
		isFixture,
		anchor: mapAnchorCompany(dto.anchor),
		competitors: dto.competitors.map(mapCompetitorRow)
	};
}
/**
* Hook: useCompetitors
*
* TanStack Query hook for fetching the competitor list.
* Cache parameters:
* - staleTime: 5 minutes
* - retry: false on 401/404, max 1 otherwise
*/
var competitorsQueryOptions = () => queryOptions({
	queryKey: queryKeys.industry.competitors(),
	queryFn: async ({ signal }) => {
		return mapCompetitorsResponse(await getCompetitors({ signal }));
	},
	staleTime: 300 * 1e3,
	gcTime: 1800 * 1e3,
	refetchOnWindowFocus: false,
	retry: (failureCount, error) => {
		const status = error?.status;
		if (status === 401 || status === 404) return false;
		return failureCount < 1;
	}
});
function useCompetitors() {
	return useQuery(competitorsQueryOptions());
}
/**
* Builds a FinancialTableViewModel for a list of period rows (Quarterly or Annual).
*
* Requirements:
* - Latest period first, latest 5 shown by default (or all if specified).
* - Costs display as positive numbers via DISPLAY_COSTS_AS_POSITIVE.
* - Hides any row that is null across all shown periods.
* - Returns the names of all hidden rows for footnote attribution.
*/
function buildFinancialTableViewModel(periods, options) {
	const maxPeriods = options?.maxPeriods ?? 5;
	const shownPeriods = maxPeriods > 0 ? periods.slice(0, maxPeriods) : periods;
	const periodLabels = shownPeriods.map((p) => p.period_label);
	if (shownPeriods.length === 0) return {
		periodLabels: [],
		rows: [],
		hiddenRowNames: []
	};
	const activeRows = [];
	const hiddenRowNames = [];
	for (const config of FINANCIAL_TABLE_ROW_CONFIGS) {
		const rawValuesByPeriod = {};
		const valuesByPeriod = {};
		let allNull = true;
		for (const period of shownPeriods) {
			const label = period.period_label;
			const rawVal = period[config.key] ?? null;
			let displayRawVal = rawVal;
			if ((config.key === "expenditure" || config.key === "interest") && rawVal !== null) displayRawVal = Math.abs(rawVal);
			rawValuesByPeriod[label] = displayRawVal;
			valuesByPeriod[label] = formatFinancialValue(displayRawVal, {
				isPercentage: config.isPercentage,
				digits: 2
			});
			if (rawVal !== null) allNull = false;
		}
		if (allNull) hiddenRowNames.push(config.label);
		else activeRows.push({
			key: config.key,
			label: config.label,
			isPercentage: config.isPercentage,
			valuesByPeriod,
			rawValuesByPeriod,
			allNullAcrossShown: false
		});
	}
	return {
		periodLabels,
		rows: activeRows,
		hiddenRowNames
	};
}
/**
* Maps a CompanyFinancialsResponseDTO to CompanyFinancialsViewModel.
*/
function mapCompanyFinancials(dto, metadata, options) {
	const isFixture = options?.isFixture ?? getIndustryDataSource() === "fixtures";
	const quarterlyTable = buildFinancialTableViewModel(dto.quarterly);
	const annualTable = buildFinancialTableViewModel(dto.annual);
	const ttmRaw = dto.key_metrics.ttm_revenue;
	const latestQtrRaw = dto.key_metrics.latest_quarter_revenue;
	const expToRevRaw = dto.key_metrics.expenditure_to_revenue_pct;
	const npmRaw = dto.key_metrics.net_profit_margin_pct;
	return {
		companyId: dto.company_id,
		companyName: dto.company_name ?? metadata?.companyName ?? null,
		ticker: dto.ticker ?? metadata?.ticker ?? null,
		overlapLevel: metadata?.overlapLevel ?? null,
		overlapSummary: metadata?.overlapSummary ?? null,
		isFixture,
		asOf: dto.as_of,
		latestPeriod: dto.latest_period,
		unit: dto.unit,
		unitLabel: FINANCIAL_UNIT_CAPTION,
		financialStatus: dto.financial_status,
		reason: dto.reason,
		reasonDisplay: getReasonDisplayCopy(dto.reason),
		keyMetrics: {
			ttmRevenue: {
				id: "ttm_revenue",
				label: "TTM Revenue",
				formattedValue: formatFinancialValue(ttmRaw.value, { digits: 2 }),
				numericValue: ttmRaw.value,
				periodLabel: ttmRaw.period_label,
				basis: ttmRaw.basis,
				helperText: "Sum of latest 4 consecutive quarters in ₹ Cr.",
				isPercentage: false
			},
			latestQuarterRevenue: {
				id: "latest_quarter_revenue",
				label: "Latest Quarter Revenue",
				formattedValue: formatFinancialValue(latestQtrRaw.value, { digits: 2 }),
				numericValue: latestQtrRaw.value,
				periodLabel: latestQtrRaw.period_label,
				basis: latestQtrRaw.basis,
				helperText: latestQtrRaw.period_label ? `Reported for ${latestQtrRaw.period_label}` : void 0,
				isPercentage: false
			},
			expenditureToRevenue: {
				id: "expenditure_to_revenue_pct",
				label: "Expenditure / Revenue",
				formattedValue: formatFinancialValue(expToRevRaw.value, {
					isPercentage: true,
					digits: 2
				}),
				numericValue: expToRevRaw.value,
				periodLabel: expToRevRaw.period_label,
				basis: expToRevRaw.basis,
				helperText: "Operating efficiency ratio",
				isPercentage: true
			},
			netProfitMargin: {
				id: "net_profit_margin_pct",
				label: "Net Profit Margin",
				formattedValue: formatFinancialValue(npmRaw.value, {
					isPercentage: true,
					digits: 2
				}),
				numericValue: npmRaw.value,
				periodLabel: npmRaw.period_label,
				basis: npmRaw.basis,
				helperText: "Net profit as % of revenue",
				isPercentage: true
			}
		},
		quarterlyTable,
		annualTable,
		rawQuarterlyPeriods: dto.quarterly,
		rawAnnualPeriods: dto.annual,
		annualStatus: dto.annual_status,
		meta: dto.meta
	};
}
/**
* Hook: useCompanyFinancials
*
* TanStack Query hook for fetching competitor financials.
* Cache parameters:
* - staleTime: 5 minutes
* - retry: false on 401/404
* - Automatic resolution of company name, ticker, and overlap from cached competitors query
*/
var companyFinancialsQueryOptions = (companyId, metadata) => queryOptions({
	queryKey: queryKeys.industry.financials(companyId ?? 0),
	queryFn: async ({ signal }) => {
		if (!companyId) throw new Error("companyId is required to fetch financials");
		return mapCompanyFinancials(await getCompanyFinancials(companyId, { signal }), metadata);
	},
	enabled: Boolean(companyId),
	staleTime: 300 * 1e3,
	gcTime: 1800 * 1e3,
	refetchOnWindowFocus: false,
	retry: (failureCount, error) => {
		const status = error?.status;
		if (status === 401 || status === 404) return false;
		return failureCount < 1;
	}
});
function useCompanyFinancials(companyId, metadataOverride) {
	const matchedCompetitor = useQueryClient().getQueryData(queryKeys.industry.competitors())?.competitors.find((c) => c.companyId === companyId);
	return useQuery(companyFinancialsQueryOptions(companyId, {
		companyName: metadataOverride?.companyName ?? matchedCompetitor?.companyName,
		ticker: metadataOverride?.ticker ?? matchedCompetitor?.ticker,
		overlapLevel: metadataOverride?.overlapLevel ?? matchedCompetitor?.overlapLevel,
		overlapSummary: metadataOverride?.overlapSummary ?? matchedCompetitor?.overlapSummary
	}));
}
//#endregion
export { useCompanyFinancials as a, competitorsQueryOptions as i, buildFinancialTableViewModel as n, useCompetitors as o, companyFinancialsQueryOptions as r, OVERLAP_LEVEL_META as t };
