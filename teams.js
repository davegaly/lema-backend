const Router = require('@koa/router');

const routerTeams = new Router({
  prefix: '/teams',
});

let teamsRecords = [
  { id: 1, name: 'Developers' },
  { id: 2, name: 'Sinistri Allianz' },
];

// Routes
routerTeams.get('/list', (ctx, next) => {
  ctx.body = teamsRecords;
  next();
});

module.exports = routerTeams;
