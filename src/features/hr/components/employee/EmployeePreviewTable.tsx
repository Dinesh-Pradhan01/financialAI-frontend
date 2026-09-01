import React, { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import {
  setEmployeeFocusedRow,
  updateEmployeeField,
  addEmployeeRow,
} from "@/shared/store/slices/hrSlice";
import { DynamicPreviewTable } from "../shared/DynamicPreviewTable";
import type { EmployeeRecord } from "../../types/employee";

export function EmployeePreviewTable({
  employees,
  errorRowIds,
  warningRowIds,
  schemaDef: propSchemaDef,
  readOnly = false,
}: {
  employees: EmployeeRecord[];
  errorRowIds: Set<string>;
  warningRowIds: Set<string>;
  schemaDef?: any;
  readOnly?: boolean;
}) {
  const dispatch = useAppDispatch();
  const focusedRowId = useAppSelector((state) => state.hr.employee.focusedRowId);
  const reduxSchemaDef = useAppSelector((state) => state.hr.employee.backendPreview?.schema_def);
  const schemaDef = propSchemaDef || reduxSchemaDef;

  const handleClearFocusedRow = useCallback(() => {
    dispatch(setEmployeeFocusedRow(null));
  }, [dispatch]);

  const handleUpdateField = useCallback(
    (rowId: string, field: string, value: string) => {
      dispatch(updateEmployeeField({ rowId, field, value }));
    },
    [dispatch],
  );

  const handleAddRow = useCallback(() => {
    dispatch(addEmployeeRow());
  }, [dispatch]);

  return (
    <DynamicPreviewTable
      records={employees}
      errorRowIds={errorRowIds}
      warningRowIds={warningRowIds}
      schemaDef={schemaDef}
      focusedRowId={focusedRowId}
      onClearFocusedRow={handleClearFocusedRow}
      onUpdateField={handleUpdateField}
      onAddRow={handleAddRow}
      emptyMessage="No employees match the current filters."
      addRowLabel="Add Row"
      readOnly={readOnly}
    />
  );
}

export { validateDynamicField, formatHeaderName } from "../shared/previewTableUtils";
export { EditableCell } from "../shared/EditableCell";
