import React, { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import {
  setVendorFocusedRow,
  updateVendorField,
  addVendorRow,
} from "@/shared/store/slices/cfoSlice";
import { DynamicPreviewTable } from "@/shared/components/data-table/DynamicPreviewTable";
import type { VendorRecord } from "../../types/vendor";

export function VendorPreviewTable({
  vendors,
  errorRowIds,
  warningRowIds,
  schemaDef: propSchemaDef,
  readOnly = false,
}: {
  vendors: VendorRecord[];
  errorRowIds: Set<string>;
  warningRowIds: Set<string>;
  schemaDef?: any;
  readOnly?: boolean;
}) {
  const dispatch = useAppDispatch();
  const focusedRowId = useAppSelector((state) => state.cfo.vendor.focusedRowId);
  const reduxSchemaDef = useAppSelector((state) => state.cfo.vendor.backendPreview?.schema_def);
  const schemaDef = propSchemaDef || reduxSchemaDef;

  const handleClearFocusedRow = useCallback(() => {
    dispatch(setVendorFocusedRow(null));
  }, [dispatch]);

  const handleUpdateField = useCallback(
    (rowId: string, field: string, value: string) => {
      dispatch(updateVendorField({ rowId, field, value }));
    },
    [dispatch],
  );

  const handleAddRow = useCallback(() => {
    dispatch(addVendorRow());
  }, [dispatch]);

  return (
    <DynamicPreviewTable
      records={vendors}
      errorRowIds={errorRowIds}
      warningRowIds={warningRowIds}
      schemaDef={schemaDef}
      focusedRowId={focusedRowId}
      onClearFocusedRow={handleClearFocusedRow}
      onUpdateField={handleUpdateField}
      onAddRow={handleAddRow}
      emptyMessage="No vendors match the current filters."
      addRowLabel="Add Row"
      readOnly={readOnly}
    />
  );
}

export { validateDynamicField, formatHeaderName } from "@/shared/components/data-table/previewTableUtils";
export { EditableCell } from "@/shared/components/data-table/EditableCell";
