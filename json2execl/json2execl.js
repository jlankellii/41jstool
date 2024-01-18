// const fs = require('fs');
// const path = require('path');
// const ExcelJS = require('exceljs');
//
// // 读取文件内容
// function parseModule(filePath) {
//     try {
//         let fileContent = fs.readFileSync(filePath, 'utf-8');
//         fileContent = fileContent.replace(/export default/g, 'module.exports =');
//         return eval(fileContent);
//     } catch (error) {
//         console.error('Error parsing module:', error.message);
//         return null;
//     }
// }
//
// function flattenJson(json, parentKey = '') {
//     let result = {};
//
//     for (let key in json) {
//         if (json.hasOwnProperty(key)) {
//             const newKey = parentKey ? `${parentKey}.${key}` : key;
//
//             if (typeof json[key] === 'object' && !Array.isArray(json[key])) {
//                 // 如果属性值是对象，则递归调用
//                 result = {...result, ...flattenJson(json[key], newKey)};
//             } else {
//                 // 否则，添加属性路径和值到结果中
//                 result[newKey] = json[key];
//             }
//         }
//     }
//
//     return result;
// }
//
//
// const languageFolderPath = path.join(__dirname, 'language');
// const referenceFolder = fs.readdirSync(path.join(languageFolderPath, fs.readdirSync(languageFolderPath)[0]));
// const workbook = new ExcelJS.Workbook();
//
// fs.readdirSync(languageFolderPath).forEach(subFolder => {
//     const subFolderPath = path.join(languageFolderPath, subFolder);
//     if (fs.statSync(subFolderPath).isDirectory()) {
//         referenceFolder.forEach(fileName => {
//
//             const filePath = path.join(subFolderPath, fileName);
//             if (fs.existsSync(filePath)) {
//
//             }
//
//         });
//     }
// });
//
// referenceFolder.forEach(fileName => {
//     const worksheet = workbook.addWorksheet(fileName);
//     fs.readdirSync(languageFolderPath).forEach(subFolder => {
//         const subFolderPath = path.join(languageFolderPath, subFolder);
//         const filePath = path.join(subFolderPath, fileName);
//
//
//     });
//     worksheet.addRow(row);
// });
