const Router = require('@koa/router');
const departmentsProvider = require('../db/providers/departmentsProvider.js');
const teamsProvider = require('../db/providers/teamsProvider.js');
const employeesProvider = require('../db/providers/employeesProvider.js');
const employeesTeamsProvider = require('../db/providers/employeesTeamsProvider.js');
const usersProvider = require('../db/providers/usersProvider.js');

// Prefix all routes with: /items
const testRouter = new Router({
  prefix: '/api/test',
});


testRouter.get('/departments', async (ctx, next) => {
  
  await new Promise((resolve, reject) => {
    departmentsProvider.save({"id":0, "name":"Business Compagnie"}, function(err,result) {
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


testRouter.get('/employees', async (ctx, next) => {
  
  await new Promise((resolve, reject) => {
    employeesProvider.save({"id":0, "email":"davegaly@sfsdf.it"}, function(err,result) {
      resolve();
    });    
  }); 
  
  await new Promise((resolve, reject) => {
    employeesProvider.listAll({}, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});


testRouter.get('/employeesTeams', async (ctx, next) => {
  
  /*
  await new Promise((resolve, reject) => {
    employeesTeamsProvider.save({"id":0, "employeeId":"1", "teamId":"1"}, function(err,result) {
      resolve();
    });    
  }); 
  */
  
  await new Promise((resolve, reject) => {
    employeesTeamsProvider.listTeamsForEmployee({"employeeId":"1"}, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 

  await new Promise((resolve, reject) => {
    employeesTeamsProvider.listEmployeesForTeam({"teamId":"1"}, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
  
});

testRouter.get('/users', async (ctx, next) => {
  
  await new Promise((resolve, reject) => {
    usersProvider.save({"id":0, "username":"a", "password":"a", "isEnabled":1, "settings":""}, function(err,result) {
      resolve();
    });    
  }); 

});


module.exports = testRouter;