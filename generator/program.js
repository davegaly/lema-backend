const fs = require("fs");

// settings e variabili
let filePath = "./generator/result.js";
let fileTemplateProvider = "./generator/templateProvider.js";

// reads template content
fs.readFile('./file3.json', (err,res) => {
    let file = res;
    console.log(res.toString('utf-8'));
});


let fileData = ""

console.log("ok!");

fs.writeFile(filePath, fileData, (err,res) => {
    if(err) console.log(err);
    console.log(res);
});