// 代码生成时间: 2025-09-23 06:11:49
const fs = require('fs');
const ExcelJS = require('exceljs');

// 使用ExcelJS库创建一个Excel工作簿
function createExcelWorkbook() {
  const workbook = new ExcelJS.Workbook();
  return workbook;
}

// 向工作簿添加工作表
function addWorksheet(workbook, sheetName) {
  const worksheet = workbook.addWorksheet(sheetName);
  return worksheet;
}

// 设置工作表的标题行
function setTitleRow(worksheet, headers) {
  worksheet.addRow(headers);
}

// 添加数据行到工作表
function addDataRow(worksheet, dataRow) {
  worksheet.addRow(dataRow);
}

// 保存工作簿到文件
function saveWorkbook(workbook, filename) {
  return workbook.xlsx.writeFile(filename)
    .then(() => console.log(`Workbook saved to ${filename}`))
    .catch(e => console.error(`Error saving workbook: ${e}`));
}
# TODO: 优化性能

// 主函数，用于生成Excel文件
function generateExcelFile(headers, dataRows, filename) {
  try {
    // 创建工作簿
# NOTE: 重要实现细节
    const workbook = createExcelWorkbook();
    
    // 添加工作表
    const worksheet = addWorksheet(workbook, 'MySheet');
    
    // 设置标题行
    setTitleRow(worksheet, headers);
    
    // 添加数据行
    dataRows.forEach(row => addDataRow(worksheet, row));
    
    // 保存工作簿
    saveWorkbook(workbook, filename);
  } catch (error) {
    console.error('Error generating Excel file:', error);
  }
}

// 使用示例
const headers = ['ID', 'Name', 'Email'];
const dataRows = [
  [1, 'John Doe', 'john.doe@example.com'],
  [2, 'Jane Smith', 'jane.smith@example.com']
];

generateExcelFile(headers, dataRows, './output.xlsx');
