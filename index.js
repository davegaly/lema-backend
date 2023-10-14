const Koa = require('koa');
const logger = require('koa-logger');

const app = new Koa();

// middlewares

app.use(logger());

const helloWorld = (ctx) => {
  ctx.body = 'Hello World!!!';
};

const dateTest = (ctx) => {
  ctx.body = 'Dave test rcamadonn';
};

//router.get('/', helloWorld);
//router.get('/davetesta', dateTest);

let departments = require('./departments.js');

//app.use(router.routes());
app.use(departments.routes());

app.listen(3000);
