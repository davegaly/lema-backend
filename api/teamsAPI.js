const Router = require('@koa/router');
const teamsProvider = require('../db/providers/teamsProvider.js');
const teamsBusiness  = require('../business/teamsBusiness.js');
const authBusiness  = require('../business/authBusiness.js');

// Prefix all routes with: /items
const teamsRouter = new Router({
  prefix: '/api/teams',
});



// getByGuid
teamsRouter.get('/getByGuid/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
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
teamsRouter.get('/listForGrid', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("teamsAPI->listForGrid Started");
    if (teamsBusiness.listForGridAdjustInputCtx !== undefined) {
      await teamsBusiness.listForGridAdjustInputCtx(ctx);
    }
    teamsProvider.listForGrid(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->listForGrid finished");
      resolve();
    });    
  });  
});

// listForDropdown
teamsRouter.get('/listForDropdown', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("teamsAPI->listForDropdown Started");
    if (teamsBusiness.listForDropdownAdjustInputCtx !== undefined) {
      await teamsBusiness.listForDropdownAdjustInputCtx(ctx);
    }
    teamsProvider.listForDropdown(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->listForDropdown finished");
      resolve();
    });    
  });  
});

// listAll
teamsRouter.get('/listAll', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("teamsAPI->listAll Started");
    if (teamsBusiness.listAllAdjustInputCtx !== undefined) {
      await teamsBusiness.listAllAdjustInputCtx(ctx);
    }
    teamsProvider.listAll(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->listAll finished");
      resolve();
    });    
  });  
});

// save
teamsRouter.post('/save', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise(async (resolve, reject) => {    
    if (teamsBusiness.saveAdjustInputCtx !== undefined) {
      await teamsBusiness.saveAdjustInputCtx(ctx);
    }
    let params = {id: ctx.request.body.id, name: ctx.request.body.name, departmentId: ctx.request.body.departmentId};
    console.log("teamsAPI->save(" + JSON.stringify(params) + ") Started");
    teamsProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->save finished");
      resolve();
    });    
  });  
});

// deleteLogic
teamsRouter.get('/deleteLogic/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
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