const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const {promisify} = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

async function readFilesInDirectory(dir) {
    const files = await readdir(dir);
    const fileContents = await Promise.all(
        files.map(async (file) => {
            const filePath = path.join(dir, file);
            const content = await readFile(filePath, 'utf8');
            return extractValues(content);
        })
    );
    return fileContents;
}

function extractValues(content) {
    const regex = /['"]([^'"]+)['"]/g;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}

function writeExcel(data) {
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
    xlsx.writeFile(workbook, 'output.xlsx');
}

async function main() {
    const directory = './data'; // 请确保目录存在
    const fileContents = await readFilesInDirectory(directory);
    const transposedData = transpose(fileContents);
    writeExcel(transposedData);
}

function transpose(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

main();
