const Router = require('@koa/router');
const employeesTeamsProvider = require('../db/providers/employeesTeamsProvider.js');
const employeesTeamsBusiness  = require('../business/employeesTeamsBusiness.js');
const authBusiness  = require('../business/authBusiness.js');

// Prefix all routes with: /items
const employeesTeamsRouter = new Router({
  prefix: '/api/employeesTeams',
});



// listAll
employeesTeamsRouter.get('/listAll', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("employeesTeamsAPI->listAll Started");
    if (employeesTeamsBusiness.listAllAdjustInputCtx !== undefined) {
      await employeesTeamsBusiness.listAllAdjustInputCtx(ctx);
    }
    employeesTeamsProvider.listAll(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("employeesTeamsAPI->listAll finished");
      resolve();
    });    
  });  
});

// listTeamsForEmployee
employeesTeamsRouter.get('/listTeamsForEmployee/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("employeesTeamsAPI->listTeamsForEmployee Started");
    if (employeesTeamsBusiness.listTeamsForEmployeeAdjustInputCtx !== undefined) {
      await employeesTeamsBusiness.listTeamsForEmployeeAdjustInputCtx(ctx);
    }
    employeesTeamsProvider.listTeamsForEmployee(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("employeesTeamsAPI->listTeamsForEmployee finished");
      resolve();
    });    
  });  
});

// listEmployeesForTeam
employeesTeamsRouter.get('/listEmployeesForTeam/:guid', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise( async (resolve, reject) => {
    console.log("employeesTeamsAPI->listEmployeesForTeam Started");
    if (employeesTeamsBusiness.listEmployeesForTeamAdjustInputCtx !== undefined) {
      await employeesTeamsBusiness.listEmployeesForTeamAdjustInputCtx(ctx);
    }
    employeesTeamsProvider.listEmployeesForTeam(ctx.params, function(err,result) {
      ctx.body = result;
      console.log("employeesTeamsAPI->listEmployeesForTeam finished");
      resolve();
    });    
  });  
});

// save
employeesTeamsRouter.post('/save', authBusiness.authCheckCredentials, async (ctx, next) => {
  await new Promise(async (resolve, reject) => {    
    if (employeesTeamsBusiness.saveAdjustInputCtx !== undefined) {
      await employeesTeamsBusiness.saveAdjustInputCtx(ctx);
    }
    let params = {id: ctx.request.body.id, employeeId: ctx.request.body.employeeId, teamId: ctx.request.body.teamId};
    console.log("employeesTeamsAPI->save(" + JSON.stringify(params) + ") Started");
    employeesTeamsProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("employeesTeamsAPI->save finished");
      resolve();
    });    
  });  
});

module.exports = employeesTeamsRouter;