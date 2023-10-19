const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');

// Prefix all routes with: /items
const routerDepartments = new Router({
  prefix: '/api/departments',
});

// getbyid
routerDepartments.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});

// list all
routerDepartments.get('/listall', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.listAll(function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

routerDepartments.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.body.id, name: ctx.request.body.name};
    departmentsProvider.save(params, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});


module.exports = routerDepartments;
