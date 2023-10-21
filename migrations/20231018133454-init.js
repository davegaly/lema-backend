'use strict';

import migrationHelper from 'migrationHelper.mjs';

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

  tableFields = {};
  tableFields.id = { type: 'int', primaryKey: true, autoIncrement: true };
  tableFields.name = 'string';

  tableFields = migrationHelper.addSystemFields(tableFields);

  return db.createTable('departments', tableFields);
};

exports.down = function(db) {
  return db.dropTable('departments');
};

exports._meta = {
  "version": 1
};
