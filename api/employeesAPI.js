const Router = require('@koa/router');
const employeesProvider = require('../db/providers/employeesProvider.js');

// Prefix all routes with: /items
const employeesRouter = new Router({
  prefix: '/api/employees',
});



// getByGuid
employeesRouter.get('/getByGuid/:guid', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("employeesAPI->getByGuid, with params " + JSON.stringify(ctx.params) + " Started");
    employeesProvider.getByGuid(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("employeesAPI->getByGuid finished");
      resolve();
    });    
  }); 
});

// listAll
employeesRouter.get('/listAll', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("employeesAPI->listAll Started");
    employeesProvider.listAll(null, function(err,result) {
      ctx.body = result;
      console.log("employeesAPI->listAll finished");
      resolve();
    });    
  });  
});

// save
employeesRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.id, email: ctx.request.body.email};
    console.log("employeesAPI->save(" + JSON.stringify(params) + ") Started");
    employeesProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("employeesAPI->save finished");
      resolve();
    });    
  });  
});

// deleteLogic
employeesRouter.get('/deleteLogic/:guid', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("employeesAPI->deleteLogic(deleteLogic), wtih params " + JSON.stringify(ctx.params) + " Started");
    employeesProvider.deleteLogic(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("employeesAPI->save(getbyid) finished");
      resolve();
    });    
  }); 
});

module.exports = employeesRouter;