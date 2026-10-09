//#region node_modules/.nitro/vite/services/ssr/assets/queryKeys-DHNOxYVt.js
var queryKeys = {
	auth: {
		me: () => ["auth", "me"],
		invites: () => ["auth", "invites"],
		inviteVerify: (token) => [
			"auth",
			"invite",
			"verify",
			token
		]
	},
	business: { invites: () => ["business", "invites"] },
	team: {
		all: () => ["team"],
		invites: () => ["team", "invites"]
	},
	company: {
		all: () => ["company"],
		profile: () => ["company", "profile"],
		industryLeaders: () => ["company", "industry-leaders"],
		rating: () => ["company", "public-rating"],
		news: () => ["company", "news"],
		aiView: () => ["company", "ai-view"],
		documents: () => ["company", "documents"],
		packages: () => ["company", "packages"],
		competitors: () => ["company", "competitors"]
	},
	statements: {
		all: () => ["statements"],
		byId: (id) => ["statements", id]
	},
	hr: {
		dashboard: {
			employee: () => [
				"hr",
				"dashboard",
				"employee"
			],
			vendor: () => [
				"hr",
				"dashboard",
				"vendor"
			],
			history: () => [
				"hr",
				"dashboard",
				"history"
			],
			preview: (id) => [
				"hr",
				"dashboard",
				"history",
				id
			]
		},
		employees: { all: (params) => [
			"hr",
			"employees",
			params
		] },
		vendors: { all: (params) => [
			"hr",
			"vendors",
			params
		] }
	},
	cfo: {
		dashboard: {
			vendor: () => [
				"cfo",
				"dashboard",
				"vendor"
			],
			history: () => [
				"cfo",
				"dashboard",
				"history"
			],
			preview: (id) => [
				"cfo",
				"dashboard",
				"history",
				id
			]
		},
		vendors: { all: (params) => [
			"cfo",
			"vendors",
			params
		] }
	},
	developments: {
		all: () => ["developments"],
		list: (businessId, params) => [
			"developments",
			"list",
			businessId,
			params
		]
	},
	industry: {
		all: () => ["industry"],
		competitors: () => ["industry", "competitors"],
		financials: (companyId) => [
			"industry",
			"financials",
			String(companyId)
		]
	}
};
//#endregion
export { queryKeys as t };
