const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '.')).filter((diretorio) => {
    return diretorio != 'index.js';
}).map((diretorio) => {
    return diretorio.replace('.js', '');
});

files.forEach((comando) => {
    module.exports[comando] = require(`./${comando}`);
});