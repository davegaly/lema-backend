const Router = require('@koa/router');
const teamsProvider = require('../db/providers/teamsProvider.js');

// Prefix all routes with: /items
const teamsRouter = new Router({
  prefix: '/api/teams',
});



// getbyid
teamsRouter.get('/getbyid/:id', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    teamsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  }); 
});

// list all
teamsRouter.get('/listall', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    teamsProvider.listAll(function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

// save
teamsRouter.post('/save', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    let params = {id: ctx.request.body.id, name: ctx.request.body.name};
    teamsProvider.save(params, function(err,result) {
      ctx.body = result;
      resolve();
    });    
  });  
});

module.exports = teamsRouter;