const Koa = require('koa');
const logger = require('koa-logger');
const cors = require("@koa/cors");
const { koaBody } = require('koa-body');

const app = new Koa();

// middlewares

app.use(logger());
app.use(cors());
app.use(koaBody());

const helloWorld = (ctx) => {
  ctx.body = 'Hello World!!!';
};

const dateTest = (ctx) => {
  ctx.body = 'Dave test rcamadonn';
};

//router.get('/', helloWorld);
//router.get('/davetesta', dateTest);

let departments = require('./departments.js');
let teams = require('./teams.js');

//app.use(router.routes());
app.use(departments.routes());
app.use(teams.routes());

app.listen(3000);
