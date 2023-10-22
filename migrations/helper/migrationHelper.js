function addSystemFields(createTableObject) {
   
    createTableObject.guid = 'uuid';
    createTableObject.isDeleted = 'int';
    createTableObject.createdDate = 'string';
    createTableObject.createdBy = 'string';
    createTableObject.modifiedDate = 'string';
    createTableObject.modifiedBy = 'string';

    return createTableObject;
}

module.exports = { addSystemFields }