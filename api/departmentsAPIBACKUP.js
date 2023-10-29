const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');

// Prefix all routes with: /items
const departmentsRouter = new Router({
  prefix: '/api/departments',
});



// getbyid
departmentsRouter.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->save(getbyid), wtih id " + ctx.params.id + " Started");
    departmentsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->save(getbyid) finished");
      resolve();
    });    
  }); 
});

// list all
departmentsRouter.get('/listall', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("departmentsAPI->listall Started");
    departmentsProvider.listAll(function(err,result) {
      ctx.body = result;
      console.log("departmentsAPI->listall finished");
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

module.exports = departmentsRouter;