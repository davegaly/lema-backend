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
  tableFields.teamId = 'int';
  tableFields.properties = 'string';

  tableFields = migrationHelper.addSystemFields(tableFields);

  return db.createTable('employeesTeams', tableFields);

};

exports.down = function(db) {
  return db.dropTable('employeesTeams');
  return null;
};

exports._meta = {
  "version": 1
};
