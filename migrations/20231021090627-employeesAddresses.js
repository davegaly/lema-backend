'use strict';

const migrationHelper = require("./helper/migrationHelper");

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {

  let tableFields = {};
  tableFields.id = { type: 'int', primaryKey: true, autoIncrement: true };
  tableFields.employeeId = 'int';
  tableFields.fromDate = 'string';
  tableFields.toDate = 'string';
  tableFields.streetAddress = 'string';
  tableFields.city = 'string';
  tableFields.state = 'string';
  tableFields.postalCode = 'string';
  tableFields.country = 'string';

  tableFields = migrationHelper.addSystemFields(tableFields);

  return db.createTable('employeesAddresses', tableFields);

};

exports.down = function(db) {
  return db.dropTable('employeesAddresses');
  return null;
};

exports._meta = {
  "version": 1
};
