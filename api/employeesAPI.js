const Router = require('@koa/router');
const employeesProvider = require('../db/providers/employeesProvider.js');

// Prefix all routes with: /items
const employeesRouter = new Router({
  prefix: '/api/employees',
});



module.exports = employeesRouter;