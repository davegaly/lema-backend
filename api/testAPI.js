const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');
const teamsProvider = require('../db/providers/teamsProvider.js');

// Prefix all routes with: /items
const testRouter = new Router({
  prefix: '/api/test',
});


testRouter.get('/departments', async (ctx, next) => {
  
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


testRouter.get('/teams', async (ctx, next) => {
  
  await new Promise((resolve, reject) => {
    teamsProvider.save({"id":0, "name":"Programmatori", "departmentId":1}, function(err,result) {
      resolve();
    });    
  }); 
  
  await new Promise((resolve, reject) => {
    teamsProvider.listAll({}, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});


module.exports = testRouter;