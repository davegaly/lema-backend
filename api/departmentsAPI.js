const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');

// Prefix all routes with: /items
const departmentsRouter = new Router({
  prefix: '/api/departments',
});



// getbyid
departmentsRouter.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});

// list all
departmentsRouter.get('/listall', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.listAll(function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

// save
departmentsRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.body.id, name: ctx.request.body.name};
    departmentsProvider.save(params, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

module.exports = departmentsRouter;