//#region node_modules/.nitro/vite/services/ssr/assets/passwordRules-fc_ZuKIi.js
var rules = [
	{
		label: "At least 8 characters",
		test: (p) => p.length >= 8
	},
	{
		label: "One uppercase letter",
		test: (p) => /[A-Z]/.test(p)
	},
	{
		label: "One lowercase letter",
		test: (p) => /[a-z]/.test(p)
	},
	{
		label: "One number",
		test: (p) => /\d/.test(p)
	}
];
//#endregion
export { rules as t };
