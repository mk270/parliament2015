function runExample() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var dataSs = SpreadsheetApp.openById(0Agy0A2HaanQFdFl6R2daNEhmeG9fMmdFOUF5M0V6MUE);
  Browser.msgBox(dataSs.getName());
  var dataSheet = dataSs.getSheets()[0];

  // Fetch all the data
  var data = getRowsData(dataSheet);

  // This is the data we want to display
  var columnNames = ["First Name", "Last Name", "Department"];

  // Index data by department name
  var dataByDepartment = {};
  var departments = [];
  for (var i = 0; i < data.length; ++i) {
    var rowData = data[i];
    if (!dataByDepartment[rowData.department]) {
      dataByDepartment[rowData.department] = [];
      departments.push(rowData.department);
    }
    dataByDepartment[rowData.department].push(rowData);
  }

  departments.sort();
  var headerBackgroundColor = dataSheet.getRange(1, 1).getBackgroundColor();
  for (var i = 0; i < departments.length; ++i) {
    var sheet = ss.getSheetByName(departments[i]) ||
      ss.insertSheet(departments[i], ss.getSheets().length);
    sheet.clear();
    var headersRange = sheet.getRange(1, 1, 1, columnNames.length);
    headersRange.setValues([columnNames]);
    headersRange.setBackgroundColor(headerBackgroundColor);
    setRowsData(sheet, dataByDepartment[departments[i]]);
  }
}
