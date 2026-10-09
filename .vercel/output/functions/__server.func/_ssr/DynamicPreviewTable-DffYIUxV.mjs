import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Q as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DynamicPreviewTable-DffYIUxV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function validateDynamicField(fieldConfig, value) {
	const isEmpty = !value || String(value).trim() === "";
	if (fieldConfig.required && isEmpty) return "Required";
	if (isEmpty) return null;
	if (fieldConfig.type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email";
	if (fieldConfig.regex) try {
		if (!new RegExp(fieldConfig.regex).test(value)) return "Invalid format";
	} catch {}
	if (fieldConfig.type === "number") {
		const cleaned = String(value).replace(/[$₹€£,\s]/g, "");
		const num = Number(cleaned);
		if (Number.isNaN(num)) return "Must be a number";
		if (fieldConfig.min !== void 0 && num < fieldConfig.min) return `Min ${fieldConfig.min}`;
		if (fieldConfig.max !== void 0 && num > fieldConfig.max) return `Max ${fieldConfig.max}`;
	}
	if (fieldConfig.min_length !== void 0 && value.length < fieldConfig.min_length) return `Min length ${fieldConfig.min_length}`;
	if (fieldConfig.custom_rule === "not_future") {
		const d = new Date(value);
		if (!Number.isNaN(d.getTime()) && d > /* @__PURE__ */ new Date()) return "Cannot be in the future";
	}
	return null;
}
function formatHeaderName(name) {
	return name.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase();
}
function getVisibleFields(schemaDef, records = []) {
	if (schemaDef?.fields && Array.isArray(schemaDef.fields) && schemaDef.fields.length > 0) return schemaDef.fields.filter((field) => {
		if (field.required) return true;
		return records.some((rec) => {
			const camelCaseName = field.name.replace(/_([a-z])/g, (_, g) => g.toUpperCase());
			const snakeCaseName = field.name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
			const val = rec[field.name] ?? rec[camelCaseName] ?? rec[snakeCaseName];
			return val != null && String(val).trim() !== "";
		});
	});
	if (records && records.length > 0) {
		const keysSet = /* @__PURE__ */ new Set();
		const ignoredKeys = new Set([
			"rowId",
			"row_id",
			"_id",
			"id",
			"__v",
			"createdAt",
			"updatedAt",
			"created_at",
			"updated_at",
			"upload_id",
			"uploadId",
			"company_id",
			"companyId"
		]);
		for (const rec of records) if (rec && typeof rec === "object") {
			for (const key of Object.keys(rec)) if (!ignoredKeys.has(key) && rec[key] !== void 0 && rec[key] !== null) keysSet.add(key);
		}
		return Array.from(keysSet).map((key) => ({
			name: key,
			type: typeof records[0]?.[key] === "number" ? "number" : "string",
			required: false
		}));
	}
	return [];
}
function EditableCell({ value, fieldConfig, rowId, className, readOnly, onUpdate }) {
	const [val, setVal] = (0, import_react.useState)(value || "");
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setVal(value || "");
	}, [value]);
	const handleBlur = () => {
		if (readOnly) return;
		const validationError = validateDynamicField(fieldConfig, val);
		setError(validationError);
		if (!validationError && val !== (value || "")) {
			const sanitizedVal = fieldConfig.type === "number" ? String(val).replace(/[$₹€£,\s]/g, "").trim() : val;
			onUpdate(rowId, fieldConfig.name, sanitizedVal);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative group w-full overflow-visible",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			value: val,
			readOnly,
			onChange: (e) => !readOnly && setVal(e.target.value),
			onBlur: handleBlur,
			onKeyDown: (e) => {
				if (e.key === "Enter") e.currentTarget.blur();
			},
			className: cn("w-full bg-transparent border border-transparent rounded px-2.5 py-1.5 outline-none text-foreground transition-colors", !readOnly && "focus:border-transparent focus:ring-0 focus:bg-surface-alt/50 focus:font-semibold cursor-text", readOnly && "cursor-default text-text-secondary opacity-90", error && !readOnly && "border-destructive/50 focus:border-destructive text-destructive", className),
			style: { minWidth: val ? `${Math.max(val.length + 2, 10)}ch` : void 0 },
			title: error || void 0,
			placeholder: fieldConfig.required && !readOnly ? "Required" : ""
		})
	});
}
function DynamicPreviewTable({ records, errorRowIds, warningRowIds, schemaDef, focusedRowId, onClearFocusedRow, onUpdateField, onAddRow, emptyMessage = "No records match the current filters.", addRowLabel = "Add Row", readOnly = false, customColumns }) {
	const rowRefs = (0, import_react.useRef)({});
	const visibleFields = (0, import_react.useMemo)(() => {
		return getVisibleFields(schemaDef, records);
	}, [schemaDef, records]);
	const startCustomColumns = (0, import_react.useMemo)(() => (customColumns || []).filter((c) => c.position === "start"), [customColumns]);
	const endCustomColumns = (0, import_react.useMemo)(() => (customColumns || []).filter((c) => c.position !== "start"), [customColumns]);
	const totalColumnCount = visibleFields.length + startCustomColumns.length + endCustomColumns.length;
	(0, import_react.useEffect)(() => {
		if (focusedRowId && rowRefs.current[focusedRowId]) {
			rowRefs.current[focusedRowId]?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			const timer = setTimeout(() => {
				onClearFocusedRow();
			}, 2e3);
			return () => clearTimeout(timer);
		}
	}, [focusedRowId, onClearFocusedRow]);
	if (!visibleFields.length && !customColumns?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full p-8 text-center text-muted-foreground border border-border rounded-xl bg-surface",
		children: "No schema or columns available to display."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full overflow-x-auto rounded-xl border border-border bg-surface shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-xs text-left border-collapse",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-surface-alt/80 text-[11px] font-semibold text-text-secondary border-b border-border sticky top-0 z-10 uppercase tracking-wider",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						startCustomColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: cn("px-4 py-3 font-semibold whitespace-nowrap", col.className),
							style: col.width ? { width: col.width } : void 0,
							children: col.header
						}, `head-custom-${col.id}`)),
						visibleFields.map((field, colIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: "px-4 py-3 font-semibold whitespace-nowrap",
							children: [formatHeaderName(field.name), field.required && !readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive font-bold ml-1",
								children: "*"
							})]
						}, `head-${field.name || colIdx}-${colIdx}`)),
						endCustomColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: cn("px-4 py-3 font-semibold whitespace-nowrap", col.className),
							style: col.width ? { width: col.width } : void 0,
							children: col.header
						}, `head-custom-${col.id}`))
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border",
					children: records.length > 0 ? records.map((rec, index) => {
						const rowId = String(rec.rowId || rec.id || rec._id || `row-${index}`);
						const isError = errorRowIds.has(rowId);
						const isWarning = warningRowIds.has(rowId);
						const isFocused = focusedRowId === rowId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							ref: (el) => {
								rowRefs.current[rowId] = el;
							},
							className: cn("transition-colors", !readOnly && "hover:bg-surface-alt/50", isError && !readOnly ? "bg-destructive/5 hover:bg-destructive/10" : isWarning && !readOnly ? "bg-amber-500/5 hover:bg-amber-500/10" : "bg-transparent", isFocused && "ring-2 ring-inset ring-primary bg-primary/5"),
							children: [
								startCustomColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-1 whitespace-nowrap",
									children: col.renderCell(rec, rowId, isFocused)
								}, `cell-custom-${rowId}-${col.id}`)),
								visibleFields.map((field, colIdx) => {
									const camelCaseName = field.name.replace(/_([a-z])/g, (_, g) => g.toUpperCase());
									const snakeCaseName = field.name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
									const rawVal = rec[field.name] ?? rec[camelCaseName] ?? rec[snakeCaseName];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableCell, {
											value: rawVal != null ? String(rawVal) : "",
											fieldConfig: field,
											rowId,
											onUpdate: onUpdateField,
											readOnly,
											className: cn(field.name.toLowerCase().includes("id") && "font-medium", field.type === "number" && "font-mono text-xs")
										})
									}, `cell-${rowId}-${field.name || colIdx}-${colIdx}`);
								}),
								endCustomColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-1 whitespace-nowrap",
									children: col.renderCell(rec, rowId, isFocused)
								}, `cell-custom-${rowId}-${col.id}`))
							]
						}, `row-${rowId}-${index}`);
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: totalColumnCount,
						className: "px-4 py-8 text-center text-muted-foreground",
						children: emptyMessage
					}) })
				}),
				!readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
					className: "bg-surface/50 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: totalColumnCount,
						className: "px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onAddRow,
							className: "inline-flex items-center justify-center text-xs font-semibold text-primary hover:text-primary-hover transition gap-1.5 tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), addRowLabel]
						})
					}) })
				})
			]
		})
	});
}
//#endregion
export { DynamicPreviewTable as t };
