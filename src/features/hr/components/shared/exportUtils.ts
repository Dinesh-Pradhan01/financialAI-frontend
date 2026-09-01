import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
  type?: "string" | "number" | "currency" | "date" | "boolean";
}

export async function exportToExcel({
  filename,
  sheetName = "Sheet1",
  title,
  columns,
  data,
}: {
  filename: string;
  sheetName?: string;
  title?: string;
  columns: ExportColumn[];
  data: Record<string, any>[];
}) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Spotlite HR Operations";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet(sheetName, {
    views: [{ state: "frozen", ySplit: title ? 2 : 1 }],
  });

  let currentRowIndex = 1;

  // Optional Title Row
  if (title) {
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: "Segoe UI", size: 14, bold: true, color: { argb: "FF0F172A" } };
    titleRow.height = 32;
    titleRow.alignment = { vertical: "middle", horizontal: "left" };
    worksheet.mergeCells(1, 1, 1, columns.length);
    currentRowIndex = 2;
  }

  // Header Row
  const headerRow = worksheet.addRow(columns.map((c) => c.header.toUpperCase()));
  headerRow.height = 26;
  headerRow.eachCell((cell) => {
    cell.font = { name: "Segoe UI", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1E293B" }, // Slate-800
    };
    cell.alignment = { vertical: "middle", horizontal: "left", wrapText: false };
    cell.border = {
      top: { style: "thin", color: { argb: "FF334155" } },
      left: { style: "thin", color: { argb: "FF334155" } },
      bottom: { style: "medium", color: { argb: "FF0F172A" } },
      right: { style: "thin", color: { argb: "FF334155" } },
    };
  });

  // Enable auto-filter across header columns
  const headerRowNumber = currentRowIndex;
  worksheet.autoFilter = {
    from: { row: headerRowNumber, column: 1 },
    to: { row: headerRowNumber, column: columns.length },
  };

  // Data Rows
  data.forEach((item, index) => {
    const rowValues = columns.map((col) => {
      const val = item[col.key];
      if (val === null || val === undefined) return "";
      if (col.type === "boolean") {
        return val ? "Yes" : "No";
      }
      if (col.type === "number") {
        const num = Number(val);
        return isNaN(num) ? val : num;
      }
      return String(val);
    });

    const row = worksheet.addRow(rowValues);
    row.height = 20;

    const isEven = index % 2 === 0;
    row.eachCell((cell, colNumber) => {
      const colDef = columns[colNumber - 1];
      cell.font = { name: "Segoe UI", size: 9.5, color: { argb: "FF1E293B" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: isEven ? "FFFFFFFF" : "FFF8FAFC" }, // White vs Slate-50
      };
      cell.border = {
        bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
        left: { style: "thin", color: { argb: "FFF1F5F9" } },
        right: { style: "thin", color: { argb: "FFF1F5F9" } },
      };

      if (colDef?.type === "number") {
        cell.alignment = { vertical: "middle", horizontal: "right" };
        cell.numFmt = "#,##0.00";
      } else if (colDef?.type === "currency") {
        cell.alignment = { vertical: "middle", horizontal: "right" };
        cell.numFmt = "₹#,##0.00";
      } else {
        cell.alignment = { vertical: "middle", horizontal: "left" };
      }
    });
  });

  // Set column widths based on definition or auto-calculate
  columns.forEach((col, idx) => {
    const sheetCol = worksheet.getColumn(idx + 1);
    if (col.width) {
      sheetCol.width = col.width;
    } else {
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

  // Write and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${filename}.xlsx`);
}
