const fs = require('fs');
const excelJS = require('exceljs');

// const directoryPath = 'D:\\G7\\g7-asia-saas-truck-portal\\src\\i18n\\language';
const directoryPath = 'D:\\G7\\tools\\language';
const outputPath = 'D:\\G7\\tools\\output\\output.xlsx';

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
        
        console.log("🚀 ~ getFilesInFirstSubfolder ~ files:", files)
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
    // console.log("6️⃣6️⃣6️⃣6️⃣6️⃣ ~ getAllValues ~ values:", values)
    return values;
}


let subfoldersArray = getSubfolders(directoryPath);
subfoldersArray = subfoldersArray.reverse();
console.log("🚀 ~ subfoldersArray:", subfoldersArray)
const filesArray = getFilesInFirstSubfolder(directoryPath);
console.log("🚀 ~ filesArray:", filesArray)



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

// console.log(worksheet.columns)

const data = [];
filesArray.forEach(fileName => {
    if(fileName === 'index.js') {
        return;
    }
    const basicFolder = 'zh-CN'
    const firstPath = `${directoryPath}/${basicFolder}/${fileName}`
    const firstContent = getObjectFromFile(firstPath);
    // console.log("🚀 ~ firstContent:", firstContent)
    // console.log("🚀 ~ firstPath:", firstPath)
    const keyPaths = getAllKeyPaths(firstContent);
    console.log("🚀 ~ keyPaths:", keyPaths)
    
    subfoldersArray.forEach(subFolder => {
        console.log("😃 ~ subFolder:", subFolder)
        const filePath = `${directoryPath}/${subFolder}/${fileName}`;
        const fileContent = getObjectFromFile(filePath);
        console.log("🚀 ~ directoryPath:", filePath)
        // console.log("😜😜😜😜😜 ~ fileContent:", fileContent)
        // console.log("🚀🚀🚀🚀🚀 ~ filePath:", filePath)
        if (!fileContent) {
            return
        }
        const allValues = getAllValues(fileContent);
        console.log("😍😍😍😍😍😍😍😍😍 ~ allValues:", allValues)
        for (let i = 0; i < keyPaths.length; i++) {
            let row = data.find(entry => entry && entry.file === fileName && entry.path === keyPaths[i]);
            // console.log("🚀 ~ row:", row)
            if (!row) {
                row = {
                    file: fileName,
                    path: keyPaths[i]
                };
                data.push(row);
            }

            row[subFolder] = allValues[i]||'';
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