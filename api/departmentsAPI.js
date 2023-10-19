const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');

// Prefix all routes with: /items
const departmentsRouter = new Router({
  prefix: '/api/departments',
});



module.exports = departmentsRouter;