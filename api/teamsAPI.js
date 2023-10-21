const Router = require('@koa/router');
const teamsProvider = require('../db/providers/teamsProvider.js');

// Prefix all routes with: /items
const teamsRouter = new Router({
  prefix: '/api/teams',
});



// getbyid
teamsRouter.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->save(getbyid), wtih id " + ctx.params.id + " Started");
    teamsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->save(getbyid) finished");
      resolve();
    });    
  }); 
});

// list all
teamsRouter.get('/listall', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->listall Started");
    teamsProvider.listAll(function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->listall finished");
      resolve();
    });    
  });  
});

// save
teamsRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.id, name: ctx.request.body.name, departmentId: ctx.request.body.departmentId};
    console.log("teamsAPI->save(" + params + ") Started");
    teamsProvider.save(params, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->save finished");
      resolve();
    });    
  });  
});

module.exports = teamsRouter;