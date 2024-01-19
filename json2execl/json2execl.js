const fs = require('fs');
const excelJS = require('exceljs');

const directoryPath = './language';
const outputPath = './output.xlsx';

function getSubfolders(directoryPath) {
    try {
        // 读取当前文件夹下的所有文件和子文件夹
        const items = fs.readdirSync(directoryPath);

        // 筛选出子文件夹
        const subfolders = items.filter(item => fs.statSync(`${directoryPath}/${item}`).isDirectory());

        return subfolders;
    } catch (error) {
        console.error('Error reading subfolders:', error.message);
        return [];
    }
}

function getFilesInFirstSubfolder(directoryPath) {
    try {
        // 读取第一个子文件夹下的所有文件
        const firstSubfolder = getSubfolders(directoryPath)[0];
        const files = fs.readdirSync(`${directoryPath}/${firstSubfolder}`);

        return files;
    } catch (error) {
        console.error('Error reading files in the first subfolder:', error.message);
        return [];
    }
}

function getObjectFromFile(filePath) {
    try {
        // 读取文件内容
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (!fileContent.startsWith("export default")) {
            return null
        }
        // 使用正则表达式提取对象部分
        const objectRegex = /export default (\{[^]*\});/s;
        const match = fileContent.match(objectRegex);

        if (match) {
            const objectString = match[1];

            // 将字符串转换为对象
            return eval(`(${objectString})`);
        } else {
            console.error('未找到匹配的对象。');
            return null;
        }
    } catch (error) {
        console.error(filePath + '读取文件时发生错误：', error.message);
        return null;
    }
}

function getAllKeyPaths(obj, parentKey = '') {
    let paths = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const currentKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // 递归处理嵌套对象
                paths = paths.concat(getAllKeyPaths(obj[key], currentKey));
            } else {
                paths.push(currentKey);
            }
        }
    }

    return paths;
}

function getAllValues(obj) {
    let values = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // 递归处理嵌套对象
                values = values.concat(getAllValues(obj[key]));
            } else {
                values.push(obj[key]);
            }
        }
    }

    return values;
}


const subfoldersArray = getSubfolders(directoryPath);
const filesArray = getFilesInFirstSubfolder(directoryPath);


// 创建一个工作簿和工作表
const workbook = new excelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1');
const columns = [
    {header: 'file', key: 'file'},
    {header: 'path', key: 'path'}
];

// 动态添加子文件夹列
subfoldersArray.forEach(subFolder => {
    columns.push({header: subFolder, key: subFolder});
});

// 将定义好的列设置给工作表
worksheet.columns = columns;

console.log(worksheet.columns)

const data = [];
filesArray.forEach(fileName => {
    const firstPath = `${directoryPath}/${subfoldersArray[0]}/${fileName}`
    const firstContent = getObjectFromFile(firstPath);
    const keyPaths = getAllKeyPaths(firstContent);

    subfoldersArray.forEach(subFolder => {
        const filePath = `${directoryPath}/${subFolder}/${fileName}`;
        const fileContent = getObjectFromFile(filePath);
        if (!fileContent) {
            return
        }
        const allValues = getAllValues(fileContent);
        for (let i = 0; i < allValues.length; i++) {
            let row = data[i];
            if (!row) {
                row = {
                    file: fileName,
                    path: keyPaths[i]
                }
            }
            row[subFolder] = allValues[i]
            data[i] = row
        }
    });
});


worksheet.addRows(data);
workbook.xlsx.writeFile(outputPath)
    .then(() => {
        console.log('Excel文件已保存');
    })
    .catch((error) => {
        console.error('保存Excel文件时出错:', error);
    });
