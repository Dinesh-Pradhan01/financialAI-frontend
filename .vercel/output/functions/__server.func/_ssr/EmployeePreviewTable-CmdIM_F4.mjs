import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as setEmployeeFocusedRow, Q as useAppSelector, Y as updateEmployeeField, Z as useAppDispatch, n as addEmployeeRow } from "./store-i6pKH_iX.mjs";
import { t as DynamicPreviewTable } from "./DynamicPreviewTable-DffYIUxV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EmployeePreviewTable-CmdIM_F4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmployeePreviewTable({ employees, errorRowIds, warningRowIds, schemaDef: propSchemaDef, readOnly = false }) {
	const dispatch = useAppDispatch();
	const focusedRowId = useAppSelector((state) => state.hr.employee.focusedRowId);
	const reduxSchemaDef = useAppSelector((state) => state.hr.employee.backendPreview?.schema_def);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicPreviewTable, {
		records: employees,
		errorRowIds,
		warningRowIds,
		schemaDef: propSchemaDef || reduxSchemaDef,
		focusedRowId,
		onClearFocusedRow: (0, import_react.useCallback)(() => {
			dispatch(setEmployeeFocusedRow(null));
		}, [dispatch]),
		onUpdateField: (0, import_react.useCallback)((rowId, field, value) => {
			dispatch(updateEmployeeField({
				rowId,
				field,
				value
			}));
		}, [dispatch]),
		onAddRow: (0, import_react.useCallback)(() => {
			dispatch(addEmployeeRow());
		}, [dispatch]),
		emptyMessage: "No employees match the current filters.",
		addRowLabel: "Add Row",
		readOnly
	});
}
//#endregion
export { EmployeePreviewTable as t };
