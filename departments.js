const Router = require('@koa/router');
const departmentsProvider = require('./db/departments/departmentsProvider.js');

// Prefix all routes with: /items
const routerDepartments = new Router({
  prefix: '/departments',
});

//dbFunctions.createDbConnection();
//dbFunctions.createTables();
//dbFunctions.insertDepartment({name:'HR'});
//dbFunctions.insertDepartment({name:'Business Sintesi'});

// Routes
routerDepartments.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});

routerDepartments.get('/list', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    departmentsProvider.list(function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

routerDepartments.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.body.id, name: ctx.request.body.name};
    departmentsProvider.save(params, function(err,result) {
      ctx.body = "ok";
      resolve();
    });    
  });  
});


module.exports = routerDepartments;
