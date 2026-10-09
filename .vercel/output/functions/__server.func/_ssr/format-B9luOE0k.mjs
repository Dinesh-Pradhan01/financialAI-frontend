//#region node_modules/.nitro/vite/services/ssr/assets/format-B9luOE0k.js
function formatINR(value, opts = {}) {
	const { compact = false, sign = false } = opts;
	const abs = Math.abs(value);
	let body;
	if (compact) if (abs >= 1e7) body = `${(abs / 1e7).toFixed(abs >= 1e9 ? 0 : 2).replace(/\.00$/, "")} Cr`;
	else if (abs >= 1e5) body = `${(abs / 1e5).toFixed(abs >= 1e6 ? 0 : 1).replace(/\.0$/, "")} L`;
	else if (abs >= 1e3) body = `${(abs / 1e3).toFixed(0)}k`;
	else body = `${abs}`;
	else body = new Intl.NumberFormat("en-IN").format(Math.round(abs));
	return `${value < 0 ? "-₹" : sign ? "+₹" : "₹"}${body}`;
}
function formatPct(value, digits = 0) {
	return `${value.toFixed(digits)}%`;
}
//#endregion
export { formatPct as n, formatINR as t };
