const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');

// Prefix all routes with: /items
const testRouter = new Router({
  prefix: '/api/test',
});


testRouter.get('/', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.save({id:0,name:'HR'}, function(err,result) {
      if(err!=null) {console.log(err);}
      ctx.body = result;
      resolve();
    });    
  }); 
});

module.exports = testRouter;