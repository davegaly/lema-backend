const fs = require("fs");

console.log("Started!"); 

// settings e variabili
let structurePath = "./generator/structure.json";
let structureObject = {};
let structureCurrentTableObject = {};
let fileTemplateProvider = "./generator/templateProvider.txt";
let fileTemplateAPI = "./generator/templateAPI.txt";
let contentTemplateSkeletonProvider = '';
let contentTemplateAPI = '';
let contentTemplateSingleAPI = '';
let filesToWrite = [];


// 1.0 - reads structure content (structure.json)
structureObject = JSON.parse(fs.readFileSync(structurePath, 'utf8'));
console.log("structureObject created succesfully!"); 

// 2.0 - reads templateProvider skeleton
contentTemplateSkeletonProvider = fs.readFileSync(fileTemplateProvider, 'utf8');
console.log("templateProvider skeleton read succesfully!"); 

// 2.1 - creating a provider file for each table in the structure.json
function workTemplateValues() {

    // iterate tables in the structure
    Object.keys(structureObject.tables).forEach(tableIndex => {
        
        structureCurrentTableObject = structureObject.tables[tableIndex];
        console.log("Working on provider file for table: " + structureCurrentTableObject.tableName);

        console.log("Begin create provider content");
        let thisProviderContent = workTemplateSingleProvider();
        console.log("Finished create provider content")

        // susbstite list of functions
        contentTemplateSkeletonProvider = contentTemplateSkeletonProvider.replaceAll("##listAPIs##", thisProviderContent);

        // module.exports for the functions
        listAPIsExport = buildExportFunctionsList();
        console.log("EXPPOOOOOORTTTT" + listAPIsExport);
        contentTemplateSkeletonProvider = contentTemplateSkeletonProvider.replaceAll("##listAPIsExport##", listAPIsExport);
        
        // writes provider file
        fs.writeFileSync("./db/providers/" + structureCurrentTableObject.tableName + "Provider.js", contentTemplateSkeletonProvider);
        console.log(structureCurrentTableObject.tableName + "Provider.js" + " written");
    })
}
workTemplateValues();




// 4.0 - reads templates for API
//contentTemplateAPI = fs.readFileSync(fileTemplateAPI);






function workTemplateSingleProvider() {
    
    let contentProviderFile = '';
    for (let i = 0; i < structureCurrentTableObject.api.length; i++) {

        const apiObject = structureCurrentTableObject.api[i];
        console.log("Working Provider " + structureCurrentTableObject.tableName + ", api: " + apiObject.name);
        
        let templateProviderFileSingleFunctionPath = "./generator/providerTemplates/" + apiObject.type + ".txt";
        let singleProviderFunctionTemplate = fs.readFileSync(templateProviderFileSingleFunctionPath, 'utf8');
        console.log("Reading single provider function template: OK");

        let contentThisProviderSingleFunction = '';
        contentThisProviderSingleFunction += singleProviderFunctionTemplate;
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##tableName##", structureCurrentTableObject.tableName);
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##functionName##", apiObject.name);
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##FieldsAsObject##", replaceFieldsAsObject(structureCurrentTableObject, apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##whereString##", replaceWhereString(apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##whereParams##", replaceWhereParams(apiObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listUpdateFieldsSQL##",  replaceListUpdateFieldsSQL(structureCurrentTableObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listUpdateFieldsArray##", replaceListUpdateFieldsArray(structureCurrentTableObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listInsertFieldsSQL##", replaceListInsertFieldsSQL(structureCurrentTableObject));
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listInsertFieldsValues##", replaceListInsertFieldsValues(structureCurrentTableObject));  
        contentThisProviderSingleFunction = contentThisProviderSingleFunction.replaceAll("##listInsertFieldsArray##", replaceListInsertFieldsArray(structureCurrentTableObject)); 

        // adds to the content for this provider file
        contentProviderFile += contentThisProviderSingleFunction + "\n\n";
    }
    
    // returns the content that will be included in the skeleton
    return contentProviderFile;
}
function buildExportFunctionsList() {
    // builds the replacement content for module.exports = {} part of the skeleton
    let result = '';
    for (let i = 0; i < structureCurrentTableObject.api.length; i++) {
        const apiObject = structureCurrentTableObject.api[i]; 
        result += apiObject.name + ",";
    }
    return result;
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

    let fieldsParamsBodySave = '';
    fieldsParamsBodySave = 'id: ctx.request.id'
    Object.keys(structureCurrentTableObject.fields).forEach(fieldIndex => {
        let fieldProperties = structureCurrentTableObject.fields[fieldIndex];
        fieldsParamsBodySave += ', ' + fieldProperties.fieldName + ": ctx.request.body." + fieldProperties.fieldName;
    });
    singleAPITemplateContent =  singleAPITemplateContent.replaceAll("##listParamsBodySave##", fieldsParamsBodySave); 

    return singleAPITemplateContent;
}

// replace values in templates functions
function replaceWhereString(apiObject) {
    let result = '';
    if (apiObject.whereString != undefined && apiObject.whereString != null) {
        result += "WHERE " + apiObject.whereString;
    }
    return result;
}
function replaceWhereParams(apiObject) {
    let result = '';
    if (apiObject.whereParams != undefined && apiObject.whereParams != null) {
        Object.keys(apiObject.whereParams).forEach(fieldIndex => {
            let apiwhereParam = apiObject.whereParams[fieldIndex];
            result += apiwhereParam + ",";
        });
    }
    return result;
}
function replaceFieldsAsObject(tableObject, apiObject) {
    console.log(apiObject);
    let result = '\t\t\t\t{\n';
    if (apiObject.apiReturnFields != undefined && apiObject.apiReturnFields != null) {
        Object.keys(apiObject.apiReturnFields).forEach(fieldIndex => {
            let apiReturnFieldProperties = apiObject.apiReturnFields[fieldIndex];
            result += '\t\t\t\t\t' + apiReturnFieldProperties + ": row." + apiReturnFieldProperties + ",";
            result += '\n';
        });
    }
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

