const migrationHelper = {}

migrationHelper.addSystemFields = (createTableObject) => {
   
    createTableObject.isDeleted = 'int';
    createTableObject.createdDate = 'string';
    createTableObject.createdBy = 'string';
    createTableObject.modifiedDate = 'string';
    createTableObject.modifiedBy = 'string';

    return createTableObject;
}

export default migrationHelper;