const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');

// Prefix all routes with: /items
const departmentsRouter = new Router({
  prefix: '/api/departments',
});



// getByGuid
departmentsRouter.get('/getByGuid', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->getByGuid, wtih id " + ctx.params.id + " Started");
    departmentsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->getByGuid finished");
      resolve();
    });    
  }); 
});

// listForGrid
departmentsRouter.get('/listForGrid', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->listForGrid Started");
    departmentsProvider.listAll(function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->listForGrid finished");
      resolve();
    });    
  });  
});

// listForDropdown
departmentsRouter.get('/listForDropdown', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->listForDropdown Started");
    departmentsProvider.listAll(function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->listForDropdown finished");
      resolve();
    });    
  });  
});

// listAll
departmentsRouter.get('/listAll', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->listAll Started");
    departmentsProvider.listAll(function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->listAll finished");
      resolve();
    });    
  });  
});

// save
departmentsRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.id, name: ctx.request.body.name};
    console.log("departmentsAPI->save(" + params + ") Started");
    departmentsProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->save finished");
      resolve();
    });    
  });  
});

// deleteLogic
departmentsRouter.get('/deleteLogic', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->deleteLogic(deleteLogic), wtih id " + ctx.params.id + " Started");
    departmentsProvider.deleteLogic(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->save(getbyid) finished");
      resolve();
    });    
  }); 
});

module.exports = departmentsRouter;