//#region node_modules/.nitro/vite/services/ssr/assets/aggregate-CgEIa98b.js
/**
* Checks whether a transaction record represents an outflow/expense.
*/
function isExpense(tx) {
	const classification = (tx.classification ?? "").toLowerCase().trim();
	if (classification === "income" || classification === "transfer") return false;
	if (classification === "expense") return true;
	return tx.type === "DEBIT" && tx.debit_amount > 0;
}
/**
* Extracts a normalized category icon key for known categories in the icon registry.
*/
function getCategoryIconKey(categoryName) {
	const clean = categoryName.toLowerCase().trim();
	if (clean.includes("air") || clean.includes("flight")) return "airlines";
	if (clean.includes("fuel") || clean.includes("petrol") || clean.includes("gas")) return "fuel";
	if (clean.includes("rest") || clean.includes("dine") || clean.includes("food") || clean.includes("eat")) return "restaurant";
	if (clean.includes("groc") || clean.includes("supermarket") || clean.includes("mart")) return "grocery";
	if (clean.includes("life") || clean.includes("shop") || clean.includes("cloth")) return "lifestyle";
	if (clean.includes("movie") || clean.includes("cinema") || clean.includes("theatre")) return "movies";
	if (clean.includes("rail") || clean.includes("train") || clean.includes("metro")) return "rail";
	if (clean.includes("tax") || clean.includes("gst")) return "tax";
	if (clean.includes("insur")) return "insurance";
	if (clean.includes("card")) return "card";
	if (clean.includes("travel")) return "travel";
	if (clean.includes("salary") || clean.includes("payroll")) return "payroll";
	if (clean.includes("rent")) return "rent";
	if (clean.includes("software")) return "software";
	if (clean.includes("subscription")) return "subscription";
	if (clean.includes("cloud")) return "cloud-services";
	if (clean.includes("supplies")) return "office-supplies";
	if (clean.includes("equipment") || clean.includes("electronic")) return "equipment";
	if (clean.includes("utilit")) return "utilities";
	if (clean.includes("internet") || clean.includes("wifi")) return "internet";
	if (clean.includes("telecom") || clean.includes("phone")) return "telecom";
	if (clean.includes("home-service") || clean.includes("facility")) return "home-services";
	if (clean.includes("ship") || clean.includes("deliver")) return "shipping";
	if (clean.includes("professional")) return "professional-services";
	return clean.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "general";
}
/**
* Computes total expense spend across a list of transactions.
*/
function computeTotalSpend(transactions) {
	return transactions.filter(isExpense).reduce((sum, tx) => sum + (Number(tx.debit_amount) || 0), 0);
}
/**
* Aggregates transactions by category, calculating totals and % share of spend.
* Sorted descending by spend amount.
*/
function aggregateByCategory(transactions) {
	const expenses = transactions.filter(isExpense);
	const totalSpend = computeTotalSpend(expenses);
	const categoryMap = /* @__PURE__ */ new Map();
	for (const tx of expenses) {
		const rawCategory = (tx.category || "Uncategorized").trim();
		const existing = categoryMap.get(rawCategory) ?? {
			label: rawCategory,
			amount: 0,
			count: 0
		};
		existing.amount += Number(tx.debit_amount) || 0;
		existing.count += 1;
		categoryMap.set(rawCategory, existing);
	}
	return Array.from(categoryMap.values()).map(({ label, amount, count }) => {
		const share = totalSpend > 0 ? Math.round(amount / totalSpend * 100) : 0;
		return {
			id: getCategoryIconKey(label),
			label,
			amount: Math.round(amount),
			share,
			count
		};
	}).sort((a, b) => b.amount - a.amount);
}
/**
* Normalizes a transaction narration to extract clean merchant or counterparty name.
*/
function cleanMerchantName(narration) {
	if (!narration) return "Unknown Merchant";
	let clean = narration.trim();
	clean = clean.replace(/^(UPI|NEFT|RTGS|IMPS|POS|ACH|NACH)\s*[/:]\s*[A-Za-z0-9_-]+\s*[/:]\s*/i, "");
	clean = clean.replace(/^(NEFT|RTGS|IMPS|POS|ACH|NACH|UPI|TXN)\s*[-/:]\s*/i, "");
	clean = clean.replace(/^(PAYMENT TO|TRANSFER TO|PURCHASE AT)\s+/i, "");
	if (clean.includes("/")) {
		const parts = clean.split("/").map((p) => p.trim()).filter(Boolean);
		if (parts.length > 0) clean = parts[0];
	}
	return clean.slice(0, 40).trim() || "Other Spend";
}
/**
* Aggregates top merchants ranked by total spend volume.
*/
function aggregateByMerchant(transactions) {
	const expenses = transactions.filter(isExpense);
	const merchantMap = /* @__PURE__ */ new Map();
	for (const tx of expenses) {
		const key = tx.merchant_id ? String(tx.merchant_id) : cleanMerchantName(tx.narration);
		const displayName = tx.merchant_id ? cleanMerchantName(tx.narration) : key;
		const existing = merchantMap.get(key) ?? {
			name: displayName,
			amount: 0,
			count: 0
		};
		existing.amount += Number(tx.debit_amount) || 0;
		existing.count += 1;
		merchantMap.set(key, existing);
	}
	return Array.from(merchantMap.values()).sort((a, b) => b.amount - a.amount).map((m, index) => ({
		rank: index + 1,
		name: m.name,
		amount: Math.round(m.amount),
		count: m.count
	}));
}
/**
* Aggregates monthly spend trend chronologically from transaction dates.
*/
function aggregateMonthlyTrend(transactions) {
	const expenses = transactions.filter(isExpense);
	const monthMap = /* @__PURE__ */ new Map();
	const MONTH_NAMES = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	for (const tx of expenses) {
		if (!tx.transaction_date) continue;
		const [yearStr, monthNumStr] = String(tx.transaction_date).slice(0, 10).split("-");
		const year = Number.parseInt(yearStr, 10);
		const monthIndex = Number.parseInt(monthNumStr, 10) - 1;
		if (Number.isNaN(year) || Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) continue;
		const sortKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
		const monthLabel = `${MONTH_NAMES[monthIndex]} ${year}`;
		const existing = monthMap.get(sortKey) ?? {
			sortKey,
			monthLabel,
			total: 0
		};
		existing.total += Number(tx.debit_amount) || 0;
		monthMap.set(sortKey, existing);
	}
	return Array.from(monthMap.values()).sort((a, b) => a.sortKey.localeCompare(b.sortKey)).map((m) => ({
		month: m.monthLabel,
		total: Math.round(m.total)
	}));
}
/**
* Converts a timeframe string ("3M", "6M", "12M") to ISO YYYY-MM-DD bounds.
*/
function getDateRangeForTimeframe(timeframe, referenceDate = /* @__PURE__ */ new Date()) {
	const to = new Date(referenceDate);
	const from = new Date(referenceDate);
	const months = timeframe === "3M" ? 3 : timeframe === "6M" ? 6 : 12;
	from.setMonth(from.getMonth() - months);
	const format = (d) => d.toISOString().slice(0, 10);
	return {
		date_from: format(from),
		date_to: format(to)
	};
}
//#endregion
export { computeTotalSpend as a, isExpense as c, cleanMerchantName as i, aggregateByMerchant as n, getCategoryIconKey as o, aggregateMonthlyTrend as r, getDateRangeForTimeframe as s, aggregateByCategory as t };
