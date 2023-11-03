const Router = require('@koa/router');
const teamsProvider = require('../db/providers/teamsProvider.js');

// Prefix all routes with: /items
const teamsRouter = new Router({
  prefix: '/api/teams',
});



// getByGuid
teamsRouter.get('/getByGuidundefined', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    console.log("teamsAPI->getByGuid, with params " + JSON.stringify(ctx.params) + " Started");
    teamsProvider.undefined(ctx.params.id, function(err,result) {
      ctx.body = result;
      console.log("teamsAPI->getByGuid finished");
      resolve();
    });    
  }); 
});

module.exports = teamsRouter;