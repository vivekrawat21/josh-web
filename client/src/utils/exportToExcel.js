// src/utils/exportToExcel.js
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const exportToExcel = async (data, filename = "ExportedData") => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Add headers from object keys
  if (data.length > 0) {
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key: key,
      width: 20,
    }));
  }

  // Add data rows
  worksheet.addRows(data);

  // Generate buffer and save
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${filename}.xlsx`);
};

export default exportToExcel;
