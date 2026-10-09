import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-BkRapwZn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { K as RotateCw, U as Search, b as Trash2, n as X, nt as Pencil, tn as Download, wn as Check } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Ct7_2QlC.mjs";
import { t as Badge } from "./badge-BCRWan40.mjs";
import { n as Input } from "./input-RnTFYsbl.mjs";
import { t as require_excel } from "../_libs/exceljs+[...].mjs";
import { t as require_FileSaver_min } from "../_libs/file-saver.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var import_excel = /* @__PURE__ */ __toESM(require_excel());
var import_FileSaver_min = require_FileSaver_min();
function DirectoryToolbar({ search, onSearchChange, searchPlaceholder = "Search records...", filters, isEditMode, onToggleEdit, onSave, onCancel, isSaving = false, dirtyCount = 0, onExport, isExporting = false, selectedCount = 0, onBulkDelete, onRefresh, isRefreshing = false, totalRecords }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [selectedCount > 0 && !isEditMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 animate-in fade-in slide-in-from-top-1 duration-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white",
					children: selectedCount
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-primary",
					children: selectedCount === 1 ? "1 record selected" : `${selectedCount} records selected`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: onBulkDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "destructive",
					size: "sm",
					onClick: onBulkDelete,
					className: "h-8 gap-1.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Delete Selected"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-wrap items-center gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-64",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								value: search,
								onChange: (e) => onSearchChange(e.target.value),
								placeholder: searchPlaceholder,
								className: "pl-9 h-9 text-xs bg-surface border-border/80 focus-visible:ring-primary/20"
							}),
							search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onSearchChange(""),
								className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})
						]
					}),
					filters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center flex-wrap gap-2",
						children: filters
					}),
					onRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: onRefresh,
						disabled: isRefreshing,
						className: "h-9 w-9 p-0 text-text-secondary hover:text-foreground shrink-0 border-border/80",
						title: "Refresh",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: cn("h-3.5 w-3.5", isRefreshing && "animate-spin") })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 shrink-0",
				children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: onCancel,
					disabled: isSaving,
					className: "h-9 gap-1.5 text-xs font-semibold border-border/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), "Cancel"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: onSave,
					disabled: isSaving || dirtyCount === 0,
					className: "h-9 gap-1.5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), isSaving ? "Saving..." : dirtyCount > 0 ? `Save Changes (${dirtyCount})` : "Save Changes"]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: onToggleEdit,
					className: "h-9 gap-1.5 text-xs font-semibold text-text-secondary hover:text-foreground border-border/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), "Edit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: onExport,
					disabled: isExporting || totalRecords === 0,
					className: "h-9 gap-1.5 text-xs font-semibold text-text-secondary hover:text-foreground border-border/80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), isExporting ? "Exporting..." : "Export to Excel"]
				})] })
			})]
		})]
	});
}
function StatusBadge({ status, className }) {
	if (!status) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("text-[10px] font-mono font-medium text-text-tertiary", className),
		children: "—"
	});
	const s = status.trim().toLowerCase();
	let style = "bg-surface-alt text-text-secondary border-border/80";
	if (s === "active") style = "bg-teal-500/10 text-teal-600 border-teal-500/20";
	else if (s === "inactive") style = "bg-rose-500/10 text-rose-600 border-rose-500/20";
	else if (s === "notice period" || s === "notice_period" || s === "pending") style = "bg-amber-500/10 text-amber-600 border-amber-500/20";
	else if (s === "resigned" || s === "terminated" || s === "expired") style = "bg-slate-500/10 text-slate-600 border-slate-500/20";
	else if (s === "recurring") style = "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
	else if (s === "one-off" || s === "non-recurring") style = "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md", style, className),
		children: status
	});
}
async function exportToExcel({ filename, sheetName = "Sheet1", title, creator = "Spotlite Operations", columns, data }) {
	const workbook = new import_excel.default.Workbook();
	workbook.creator = creator;
	workbook.created = /* @__PURE__ */ new Date();
	const worksheet = workbook.addWorksheet(sheetName, { views: [{
		state: "frozen",
		ySplit: title ? 2 : 1
	}] });
	let currentRowIndex = 1;
	if (title) {
		const titleRow = worksheet.addRow([title]);
		titleRow.font = {
			name: "Segoe UI",
			size: 14,
			bold: true,
			color: { argb: "FF0F172A" }
		};
		titleRow.height = 32;
		titleRow.alignment = {
			vertical: "middle",
			horizontal: "left"
		};
		worksheet.mergeCells(1, 1, 1, columns.length);
		currentRowIndex = 2;
	}
	const headerRow = worksheet.addRow(columns.map((c) => c.header.toUpperCase()));
	headerRow.height = 26;
	headerRow.eachCell((cell) => {
		cell.font = {
			name: "Segoe UI",
			size: 10,
			bold: true,
			color: { argb: "FFFFFFFF" }
		};
		cell.fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FF1E293B" }
		};
		cell.alignment = {
			vertical: "middle",
			horizontal: "left",
			wrapText: false
		};
		cell.border = {
			top: {
				style: "thin",
				color: { argb: "FF334155" }
			},
			left: {
				style: "thin",
				color: { argb: "FF334155" }
			},
			bottom: {
				style: "medium",
				color: { argb: "FF0F172A" }
			},
			right: {
				style: "thin",
				color: { argb: "FF334155" }
			}
		};
	});
	const headerRowNumber = currentRowIndex;
	worksheet.autoFilter = {
		from: {
			row: headerRowNumber,
			column: 1
		},
		to: {
			row: headerRowNumber,
			column: columns.length
		}
	};
	data.forEach((item, index) => {
		const rowValues = columns.map((col) => {
			const val = item[col.key];
			if (val === null || val === void 0) return "";
			if (col.type === "boolean") return val ? "Yes" : "No";
			if (col.type === "number") {
				const num = Number(val);
				return Number.isNaN(num) ? val : num;
			}
			return String(val);
		});
		const row = worksheet.addRow(rowValues);
		row.height = 20;
		const isEven = index % 2 === 0;
		row.eachCell((cell, colNumber) => {
			const colDef = columns[colNumber - 1];
			cell.font = {
				name: "Segoe UI",
				size: 9.5,
				color: { argb: "FF1E293B" }
			};
			cell.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: isEven ? "FFFFFFFF" : "FFF8FAFC" }
			};
			cell.border = {
				bottom: {
					style: "thin",
					color: { argb: "FFE2E8F0" }
				},
				left: {
					style: "thin",
					color: { argb: "FFF1F5F9" }
				},
				right: {
					style: "thin",
					color: { argb: "FFF1F5F9" }
				}
			};
			if (colDef?.type === "number") {
				cell.alignment = {
					vertical: "middle",
					horizontal: "right"
				};
				cell.numFmt = "#,##0.00";
			} else if (colDef?.type === "currency") {
				cell.alignment = {
					vertical: "middle",
					horizontal: "right"
				};
				cell.numFmt = "₹#,##0.00";
			} else cell.alignment = {
				vertical: "middle",
				horizontal: "left"
			};
		});
	});
	columns.forEach((col, idx) => {
		const sheetCol = worksheet.getColumn(idx + 1);
		if (col.width) sheetCol.width = col.width;
		else {
			let maxLen = col.header.length;
			data.forEach((item) => {
				const val = item[col.key];
				if (val) {
					const len = String(val).length;
					if (len > maxLen) maxLen = len;
				}
			});
			sheetCol.width = Math.min(Math.max(maxLen + 4, 12), 40);
		}
	});
	const buffer = await workbook.xlsx.writeBuffer();
	(0, import_FileSaver_min.saveAs)(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${filename}.xlsx`);
}
//#endregion
export { StatusBadge as n, exportToExcel as r, DirectoryToolbar as t };
