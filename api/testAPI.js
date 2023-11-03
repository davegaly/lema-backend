const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');

// Prefix all routes with: /items
const testRouter = new Router({
  prefix: '/api/test',
});


testRouter.get('/', async (ctx, next) => {

  
  await new Promise((resolve, reject) => {
    departmentsProvider.save({"id":0, "name":"HD Sintesi"}, function(err,result) {
      resolve();
    });    
  }); 
  
  await new Promise((resolve, reject) => {
    departmentsProvider.deleteLogic({"id":1}, function(err,result) {
      resolve();
    });    
  }); 

  await new Promise((resolve, reject) => {
    departmentsProvider.getByGuid({"guid":"21312"}, function(err,result) {
      resolve();
    });    
  }); 

  await new Promise((resolve, reject) => {
    departmentsProvider.listAll({}, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});

module.exports = testRouter;