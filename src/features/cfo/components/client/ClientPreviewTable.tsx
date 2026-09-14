import React, { useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/store";
import {
  setClientFocusedRow,
  updateClientField,
  addClientRow,
} from "@/shared/store/slices/cfoSlice";
import {
  DynamicPreviewTable,
  type CustomTableColumn,
} from "@/shared/components/data-table/DynamicPreviewTable";
import { ContractUploadCell } from "../agreement/ContractUploadCell";
import type { ClientRecord } from "../../types/client";

export function ClientPreviewTable({
  clients,
  errorRowIds,
  warningRowIds,
  schemaDef: propSchemaDef,
  readOnly = false,
}: {
  clients: ClientRecord[];
  errorRowIds: Set<string>;
  warningRowIds: Set<string>;
  schemaDef?: any;
  readOnly?: boolean;
}) {
  const dispatch = useAppDispatch();
  const focusedRowId = useAppSelector((state) => state.cfo.client.focusedRowId);
  const backendPreview = useAppSelector((state) => state.cfo.client.backendPreview);
  const uploadId = backendPreview?.upload_id;
  const reduxSchemaDef = backendPreview?.schema_def;
  const schemaDef = propSchemaDef || reduxSchemaDef;

  const handleClearFocusedRow = useCallback(() => {
    dispatch(setClientFocusedRow(null));
  }, [dispatch]);

  const handleUpdateField = useCallback(
    (rowId: string, field: string, value: string) => {
      dispatch(updateClientField({ rowId, field, value }));
    },
    [dispatch],
  );

  const handleAddRow = useCallback(() => {
    dispatch(addClientRow());
  }, [dispatch]);

  const customColumns = useMemo<CustomTableColumn<ClientRecord>[]>(
    () => [
      {
        id: "contract_agreement",
        header: "Contract Agreement",
        width: "240px",
        position: "end",
        renderCell: (record, rowId) => (
          <ContractUploadCell
            entityType="client"
            uploadId={uploadId}
            rowId={rowId}
            record={record}
            readOnly={readOnly}
          />
        ),
      },
    ],
    [uploadId, readOnly],
  );

  return (
    <DynamicPreviewTable
      records={clients}
      errorRowIds={errorRowIds}
      warningRowIds={warningRowIds}
      schemaDef={schemaDef}
      focusedRowId={focusedRowId}
      onClearFocusedRow={handleClearFocusedRow}
      onUpdateField={handleUpdateField}
      onAddRow={handleAddRow}
      emptyMessage="No clients match the current filters."
      addRowLabel="Add Client Row"
      readOnly={readOnly}
      customColumns={customColumns}
    />
  );
}

export { validateDynamicField, formatHeaderName } from "@/shared/components/data-table/previewTableUtils";
export { EditableCell } from "@/shared/components/data-table/EditableCell";
