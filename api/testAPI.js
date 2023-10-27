const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');

// Prefix all routes with: /items
const testRouter = new Router({
  prefix: '/api/test',
});


testRouter.get('/', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.getByGuid("asdsad", function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});

module.exports = testRouter;