import express from "express";
import * as ExcelJS from "exceljs";
const app = express();
const port = 3000;

app.get("/download/:type", (req, res) => {
  const { type } = req.params;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  // Add data to the worksheet
  worksheet.addRow(["Name", "Age"]);
  worksheet.addRow(["Alice", 25]);
  worksheet.addRow(["Bob", 30]);

  if (type == "csv") {
    const csvData = workbook.csv
      .writeBuffer()
      .then((buffer) => buffer.toString());

    // Set headers for response
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=csvexample.csv");

    // Send the CSV data as the response
    csvData.then((data) => {
      res.send(data);
    });
  } else {
    // Set headers for response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=example.xlsx");

    // Write the workbook to the response
    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
