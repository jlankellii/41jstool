const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// 递归遍历 JSON 对象并提取值
function extractValues(obj, result, currentPath) {
    for (const key in obj) {
        const newPath = currentPath ? `${currentPath}.${key}` : key;

        if (typeof obj[key] === 'object') {
            extractValues(obj[key], result, newPath);
        } else {
            result.push({path: newPath, value: obj[key]});
        }
    }
}

// 读取文件夹中的所有文件
const folderPath = path.join(__dirname, 'data');
const files = fs.readdirSync(folderPath);

// 存储所有值的数组
const allValues = [];

// 处理每个文件
files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // 使用 require 动态加载文件
    const jsonData = require(filePath);

    // 提取值
    const values = [];
    extractValues(jsonData, values, '');

    // 将每个文件的值存储在一个数组中，并将该数组添加到 allValues 数组中
    allValues.push({fileName: file, values});
});

// 创建 Excel 文件
const workbook = XLSX.utils.book_new();

// 获取所有不同的路径
const allPaths = Array.from(new Set(allValues.flatMap(({values}) => values.map(({path}) => path))));

// 将每个文件的值按列填充
const filledValues = allValues.map(({fileName, values}) => {
    const row = {File: fileName}; // 使用 "File" 作为文件名的列
    values.forEach(({path, value}) => {
        row[path] = value;
    });
    return row;
});

// 在 Excel 中按路径创建列
const header = ['File', ...allPaths];
const worksheet = XLSX.utils.json_to_sheet(filledValues, {header});
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
XLSX.writeFile(workbook, 'output.xlsx');

console.log('Excel 文件已生成');
