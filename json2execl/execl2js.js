const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const execlPath = "data.csv";
const jsFilename = "data";

// 读取 Excel 文件
const workbook = xlsx.readFile(execlPath);

// 选择第一个工作表
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// 转换 Excel 数据为 JavaScript 对象
const data = xlsx.utils.sheet_to_json(sheet, {header: 1});

// 获取列数和行数
const numCols = data[0].length;
const numRows = data.length;

// 遍历每一列，从第二列开始
for (let col = 1; col < numCols; col++) {
    const language = data[0][col];
    const languageObject = {};

    // 遍历每一行，从第二行开始
    for (let row = 1; row < numRows; row++) {
        const path = data[row][0];
        const value = data[row][col];

        // 将 path 转换为对象层级
        const pathLevels = path.split('.');
        let currentLevel = languageObject;

        for (let i = 0; i < pathLevels.length; i++) {
            const pathLevel = pathLevels[i];
            if (!currentLevel[pathLevel]) {
                if (i === pathLevels.length - 1) {
                    // 最后一层，使用单引号包裹值，去掉引号转义
                    currentLevel[pathLevel] = value.replace(/'/g, "\\'");
                } else {
                    currentLevel[pathLevel] = {};
                }
            }
            currentLevel = currentLevel[pathLevel];
        }
    }

    const outputDirectory = path.join('.', language);
    const outputFileName = path.join(outputDirectory, `${jsFilename}.js`);

    // 检查文件夹是否存在，如果不存在则创建
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const outputContent = `module.exports = ${JSON.stringify(languageObject, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"'/g, '\'').replace(/'"/g, '\'')};\n`;
    fs.writeFileSync(outputFileName, outputContent);

    console.log(`Generated ${outputFileName}`);
}
