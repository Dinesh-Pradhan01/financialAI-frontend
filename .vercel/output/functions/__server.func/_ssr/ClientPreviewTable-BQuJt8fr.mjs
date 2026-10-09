import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { J as updateClientField, Q as useAppSelector, Z as useAppDispatch, t as addClientRow, w as setClientFocusedRow } from "./store-i6pKH_iX.mjs";
import { t as DynamicPreviewTable } from "./DynamicPreviewTable-DffYIUxV.mjs";
import { t as ContractUploadCell } from "./ContractUploadCell-DGIUU3rF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ClientPreviewTable-BQuJt8fr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientPreviewTable({ clients, errorRowIds, warningRowIds, schemaDef: propSchemaDef, readOnly = false }) {
	const dispatch = useAppDispatch();
	const focusedRowId = useAppSelector((state) => state.cfo.client.focusedRowId);
	const backendPreview = useAppSelector((state) => state.cfo.client.backendPreview);
	const uploadId = backendPreview?.upload_id;
	const reduxSchemaDef = backendPreview?.schema_def;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicPreviewTable, {
		records: clients,
		errorRowIds,
		warningRowIds,
		schemaDef: propSchemaDef || reduxSchemaDef,
		focusedRowId,
		onClearFocusedRow: (0, import_react.useCallback)(() => {
			dispatch(setClientFocusedRow(null));
		}, [dispatch]),
		onUpdateField: (0, import_react.useCallback)((rowId, field, value) => {
			dispatch(updateClientField({
				rowId,
				field,
				value
			}));
		}, [dispatch]),
		onAddRow: (0, import_react.useCallback)(() => {
			dispatch(addClientRow());
		}, [dispatch]),
		emptyMessage: "No clients match the current filters.",
		addRowLabel: "Add Client Row",
		readOnly,
		customColumns: (0, import_react.useMemo)(() => [{
			id: "contract_agreement",
			header: "Contract Agreement",
			width: "240px",
			position: "end",
			renderCell: (record, rowId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractUploadCell, {
				entityType: "client",
				uploadId,
				rowId,
				record,
				readOnly
			})
		}], [uploadId, readOnly])
	});
}
//#endregion
export { ClientPreviewTable as t };
