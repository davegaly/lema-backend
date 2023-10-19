const Router = require('@koa/router');
const teamsProvider = require('../db/providers/teamsProvider.js');

// Prefix all routes with: /items
const teamsRouter = new Router({
  prefix: '/api/teams',
});



module.exports = teamsRouter;