const Router = require('@koa/router');
const teamsProvider = require('../db/providers/teamsProvider.js');
const teamsBusiness = require('../business/teamsBusiness.js');

// Prefix all routes with: /items
const teamsRouter = new Router({
  prefix: '/api/teams',
});



// getByGuid
teamsRouter.get('/getByGuid/:guid', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->getByGuid, with params " + JSON.stringify(ctx.params) + " Started");
    teamsProvider.getByGuid(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->getByGuid finished");
      resolve();
    });    
  }); 
});

// listForGrid
teamsRouter.get('/listForGrid', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->listForGrid Started");
    teamsProvider.listForGrid(null, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->listForGrid finished");
      resolve();
    });    
  });  
});

// listForDropdown
teamsRouter.get('/listForDropdown', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->listForDropdown Started");
    teamsProvider.listForDropdown(null, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->listForDropdown finished");
      resolve();
    });    
  });  
});

// listAll
teamsRouter.get('/listAll', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->listAll Started");
    teamsProvider.listAll(null, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->listAll finished");
      resolve();
    });    
  });  
});

// save
teamsRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.id, name: ctx.request.body.name, departmentId: ctx.request.body.departmentId};
    console.log("teamsAPI->save(" + JSON.stringify(params) + ") Started");
    teamsProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->save finished");
      resolve();
    });    
  });  
});

// deleteLogic
teamsRouter.get('/deleteLogic/:guid', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->deleteLogic(deleteLogic), wtih params " + JSON.stringify(ctx.params) + " Started");
    teamsProvider.deleteLogic(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->save(getbyid) finished");
      resolve();
    });    
  }); 
});

module.exports = teamsRouter;