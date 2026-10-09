import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Q as useAppSelector, R as setVendorFocusedRow, X as updateVendorField, Z as useAppDispatch, i as addVendorRow } from "./store-i6pKH_iX.mjs";
import { t as DynamicPreviewTable } from "./DynamicPreviewTable-DffYIUxV.mjs";
import { t as ContractUploadCell } from "./ContractUploadCell-DGIUU3rF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VendorPreviewTable-DHN3S-da.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VendorPreviewTable({ vendors, errorRowIds, warningRowIds, schemaDef: propSchemaDef, readOnly = false }) {
	const dispatch = useAppDispatch();
	const focusedRowId = useAppSelector((state) => state.cfo.vendor.focusedRowId);
	const backendPreview = useAppSelector((state) => state.cfo.vendor.backendPreview);
	const uploadId = backendPreview?.upload_id;
	const reduxSchemaDef = backendPreview?.schema_def;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicPreviewTable, {
		records: vendors,
		errorRowIds,
		warningRowIds,
		schemaDef: propSchemaDef || reduxSchemaDef,
		focusedRowId,
		onClearFocusedRow: (0, import_react.useCallback)(() => {
			dispatch(setVendorFocusedRow(null));
		}, [dispatch]),
		onUpdateField: (0, import_react.useCallback)((rowId, field, value) => {
			dispatch(updateVendorField({
				rowId,
				field,
				value
			}));
		}, [dispatch]),
		onAddRow: (0, import_react.useCallback)(() => {
			dispatch(addVendorRow());
		}, [dispatch]),
		emptyMessage: "No vendors match the current filters.",
		addRowLabel: "Add Row",
		readOnly,
		customColumns: (0, import_react.useMemo)(() => [{
			id: "contract_agreement",
			header: "Contract Agreement",
			width: "240px",
			position: "end",
			renderCell: (record, rowId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractUploadCell, {
				entityType: "vendor",
				uploadId,
				rowId,
				record,
				readOnly
			})
		}], [uploadId, readOnly])
	});
}
//#endregion
export { VendorPreviewTable as t };
