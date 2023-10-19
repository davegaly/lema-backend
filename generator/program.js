const fs = require("fs");

console.log("Started!"); 

// settings e variabili
let structurePath = "./generator/structure.json";
let structureObject = {};
let structureCurrentTableObject = {};
let fileTemplateProvider = "./generator/templateProvider.txt";
let fileTemplateAPI = "./generator/templateAPI.txt";
let contentTemplateProvider = '';
let contentTemplateAPI = '';
let contentTemplateSingleAPI = '';
let filesToWrite = [];

// reads structure content
function readStructureContent(callback) {
    fs.readFile(structurePath, (err,res) => {
        let file = res;
        callback(res.toString('utf-8'));
    });
}
readStructureContent(function(data){
    structureObject = JSON.parse(data);
    //console.log(structureObject);
});

// reads template content
function readTemplateContent(callback) {
    fs.readFile(fileTemplateProvider, (err,res) => {
        let file = res;
        contentTemplateProvider = res.toString('utf-8');
        callback(contentTemplateProvider);
    });
}
function readAPIContent(callback) {
    fs.readFile(fileTemplateAPI, (err,res) => {
        let file = res;
        contentTemplateAPI = res.toString('utf-8');
        callback(contentTemplateAPI);
    });
}
readTemplateContent(function(data){
    console.log("Template Provider was read");
    readAPIContent(function(data){
        console.log("Template API was read");
        workTemplateValues();
    });
});


// working on the template
function workTemplateValues() {

    // iterate tables in the structure
    Object.keys(structureObject.tables).forEach(tableIndex => {
        
        structureCurrentTableObject = structureObject.tables[tableIndex];
        console.log("Working on table:");

        // provider content for this table
        let thisProviderContent = workTemplateSingleProvider();
        let newFileToWriteProvider = {
            path: './db/providers/' + structureCurrentTableObject.tableName + "Provider.js",
            content: thisProviderContent
        }
        filesToWrite.push(newFileToWriteProvider);

        // api content for this table
        let thisAPIContent = workTemplateSingleAPI();
        let newFileToWriteAPI = {
            path: './api/' + structureCurrentTableObject.tableName + "API.js",
            content: thisAPIContent
        }
        filesToWrite.push(newFileToWriteAPI);

    })

    writeTemplateContent();
}
function workTemplateSingleProvider() {
    let thisProviderContent = contentTemplateProvider;
    thisProviderContent = thisProviderContent.replaceAll("##tableName##", structureCurrentTableObject.tableName);
    //##FieldsAsObject##
    thisProviderContent = thisProviderContent.replaceAll("##FieldsAsObject##", replaceFieldsAsObject(structureCurrentTableObject));
    //####listUpdateFieldsSQL##
    thisProviderContent = thisProviderContent.replaceAll("##listUpdateFieldsSQL##", replaceListUpdateFieldsSQL(structureCurrentTableObject));
    //####listUpdateFieldsArray##
    thisProviderContent = thisProviderContent.replaceAll("##listUpdateFieldsArray##", replaceListUpdateFieldsArray(structureCurrentTableObject));
    //##listInsertFieldsSQL##
    thisProviderContent = thisProviderContent.replaceAll("##listInsertFieldsSQL##", replaceListInsertFieldsSQL(structureCurrentTableObject));
    //##listInsertFieldsValues##
    thisProviderContent = thisProviderContent.replaceAll("##listInsertFieldsValues##", replaceListInsertFieldsValues(structureCurrentTableObject));   
    //##listInsertFieldsArray##
    thisProviderContent = thisProviderContent.replaceAll("##listInsertFieldsArray##", replaceListInsertFieldsArray(structureCurrentTableObject));   
    return thisProviderContent;
}
function workTemplateSingleAPI() {
    let thisAPIContent = contentTemplateAPI;
    thisAPIContent = thisAPIContent.replaceAll("##tableName##", structureCurrentTableObject.tableName);

    let apiCode = '';
    for (let i = 0; i < structureCurrentTableObject.api.length; i++) {
        const apiObject = structureCurrentTableObject.api[i];
        let templateAPIFile = './generator/apiTemplates/' + apiObject.name  + '.txt';
        let singleAPITemplateContent = fs.readFileSync(templateAPIFile, 'utf8');
        singleAPITemplateContent = replaceKeyWordsSingleAPIContent(singleAPITemplateContent);
        apiCode += "\n\n" + singleAPITemplateContent;
    }
    thisAPIContent = thisAPIContent.replaceAll("##apiContent##", apiCode);

    return thisAPIContent;
}

// writes the result
function writeTemplateContent() {
    Object.keys(filesToWrite).forEach(newFileToWrite => {
        let thisFileToWrite = filesToWrite[newFileToWrite];
        writeTemplateContentSingleFile(thisFileToWrite, function(data){
            console.log("Single file written: " + thisFileToWrite.path);  
        });
    });
    console.log("All files written");    
    console.log("Finished!");    
}
function writeTemplateContentSingleFile(params, callback) {
    fs.writeFile(params.path, params.content, (err,res) => {
        if(err) console.log(err);
        callback();
    });
}


function replaceKeyWordsSingleAPIContent(singleAPITemplateContent) {
    singleAPITemplateContent = singleAPITemplateContent.replaceAll("##tableName##", structureCurrentTableObject.tableName);
    return singleAPITemplateContent;
}

// replace values in templates functions
function replaceFieldsAsObject(tableObject) {
    let result = '\t\t\t\t{\n';
    result += "id: row.id,";
    Object.keys(tableObject.fields).forEach(fieldIndex => {
        let fieldProperties = tableObject.fields[fieldIndex];
        result += '\t\t\t\t\t' + fieldProperties.fieldName + ": row." + fieldProperties.fieldName + ",";
        result += '\n';
    });
    result += '\t\t\t\t}';
    return result;
}
function replaceListUpdateFieldsSQL(tableObject) {
    let result = '';
    Object.keys(tableObject.fields).forEach(fieldIndex => {
        let fieldProperties = tableObject.fields[fieldIndex];
        result += fieldProperties.fieldName + '=?,';
    });
    result = result.substring(0, result.length - 1); // removes last ,
    return result;
}
function replaceListUpdateFieldsArray(tableObject) {
    let result = '[';
    Object.keys(tableObject.fields).forEach(fieldIndex => {
        let fieldProperties = tableObject.fields[fieldIndex];
        result += 'params.' + fieldProperties.fieldName + ",";
    });
    result += 'params.id';
    result += ']';
    return result;
}
function replaceListInsertFieldsSQL(tableObject) {
    let result = '';
    Object.keys(tableObject.fields).forEach(fieldIndex => {
        let fieldProperties = tableObject.fields[fieldIndex];
        result += fieldProperties.fieldName + ",";
    });
    result = result.replace(/,*$/, '');
    return result;
}
function replaceListInsertFieldsValues(tableObject) {
    let result = '';
    Object.keys(tableObject.fields).forEach(fieldIndex => {
        let fieldProperties = tableObject.fields[fieldIndex];
        result += '?' + ",";
    });
    result = result.replace(/,*$/, '');
    return result;
}
function replaceListInsertFieldsArray(tableObject) {
    let result = '';
    Object.keys(tableObject.fields).forEach(fieldIndex => {
        let fieldProperties = tableObject.fields[fieldIndex];
        result += 'params.' + fieldProperties.fieldName  + ",";
    });
    result = result.replace(/,*$/, '');
    return result;
}

