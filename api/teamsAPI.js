const Router = require('@koa/router');
const teamsProvider = require('../db/providers/teamsProvider.js');

// Prefix all routes with: /items
const teamsRouter = new Router({
  prefix: '/api/teams',
});



// getByGuid
teamsRouter.get('/getByGuid', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->getByGuid, wtih id " + ctx.params.id + " Started");
    teamsProvider.getById(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->getByGuid finished");
      resolve();
    });    
  }); 
});

module.exports = teamsRouter;