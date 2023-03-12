const fs = require("fs");
const XLSX = require("xlsx");

class ImportFile {
  constructor() {}

  importCSV(path, colDelimiter = ",", lineDelimiter = "\n") {
    // Read file
    const rawData = fs.readFileSync(path, "utf-8");
    const rows = rawData.split(lineDelimiter);
    const arrData = rows.map((row) => {
      return row.split(colDelimiter);
    });

    // Extract header and body
    const headers = arrData[0];
    const body = arrData.splice(1);

    // Parse arrData to object format
    const objData = body.map((row) => {
      const obj = headers.reduce((obj, h, index) => {
        return { ...obj, [h]: row[index] };
      }, {});

      return obj;
    });

    return objData;
  }

  importXLSX(path) {
    // Read file
    const rawData = XLSX.readFile(path);
    const sheet_name_list = rawData.SheetNames;
    
    // Parse sheet to json format
    const xlData = XLSX.utils.sheet_to_json(rawData.Sheets[sheet_name_list[0]]);

    return xlData;
  }
}

module.exports = ImportFile;

// Example
// const importFile = new ImportFile();

// const data = importFile.importCSV("path/to/csv");
// const data = importFile.importXLSX('path/to/xlsx');
// console.log(data);
