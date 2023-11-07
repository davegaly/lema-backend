const Router = require('@koa/router');
const employeesTeamsProvider = require('../db/providers/employeesTeamsProvider.js');
const employeesTeamsBusiness  = require('../business/employeesTeamsBusiness.js');

// Prefix all routes with: /items
const employeesTeamsRouter = new Router({
  prefix: '/api/employeesTeams',
});



// listTeamsForEmployee
employeesTeamsRouter.get('/listTeamsForEmployee', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("employeesTeamsAPI->listTeamsForEmployee Started");
    employeesTeamsProvider.listTeamsForEmployee(null, function(err,result) {
      ctx.body = result;
      console.log("employeesTeamsAPI->listTeamsForEmployee finished");
      resolve();
    });    
  });  
});

// listEmployeesForTeam
employeesTeamsRouter.get('/listEmployeesForTeam', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("employeesTeamsAPI->listEmployeesForTeam Started");
    employeesTeamsProvider.listEmployeesForTeam(null, function(err,result) {
      ctx.body = result;
      console.log("employeesTeamsAPI->listEmployeesForTeam finished");
      resolve();
    });    
  });  
});

// save
employeesTeamsRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {    
    if (employeesTeamsBusiness.saveAdjustInputCtx !== undefined) {
      ctx = employeesTeamsBusiness.saveAdjustInputCtx(ctx);
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