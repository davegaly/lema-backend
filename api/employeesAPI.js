const Router = require('@koa/router');
const employeesProvider = require('../db/providers/employeesProvider.js');

// Prefix all routes with: /items
const employeesRouter = new Router({
  prefix: '/api/employees',
});



// getbyid
employeesRouter.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    employeesProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});

// list all
employeesRouter.get('/listall', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    employeesProvider.listAll(function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

// save
employeesRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.body.id, name: ctx.request.body.name};
    employeesProvider.save(params, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

module.exports = employeesRouter;