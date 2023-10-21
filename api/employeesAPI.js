const Router = require('@koa/router');
const employeesProvider = require('../db/providers/employeesProvider.js');

// Prefix all routes with: /items
const employeesRouter = new Router({
  prefix: '/api/employees',
});



// getbyid
employeesRouter.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("employeesAPI->save(getbyid), wtih id " + ctx.params.id + " Started");
    employeesProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("employeesAPI->save(getbyid) finished");
      resolve();
    });    
  }); 
});

// list all
employeesRouter.get('/listall', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("employeesAPI->listall Started");
    employeesProvider.listAll(function(err,result) {
      ctx.body = result;
      console.log("employeesAPI->listall finished");
      resolve();
    });    
  });  
});

// save
employeesRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.id, firstName: ctx.request.body.firstName, lastName: ctx.request.body.lastName, email1: ctx.request.body.email1, phone1: ctx.request.body.phone1};
    console.log("employeesAPI->save(" + params + ") Started");
    employeesProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("employeesAPI->save finished");
      resolve();
    });    
  });  
});

module.exports = employeesRouter;