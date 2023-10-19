const Koa = require('koa');
const logger = require('koa-logger');
const cors = require("@koa/cors");
const { koaBody } = require('koa-body');

//const departmentsProvider = require('./db/providers/departmentsProvider.js');

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

let departmentsAPI = require('./api/departmentsAPI.js');
let teams = require('./teams.js');

//app.use(router.routes());
app.use(departmentsAPI.routes());
app.use(teams.routes());


// testers
//const departmentsProvider = require('./db/providers/departmentsProvider.js');
//departmentsProvider.save({"id":0, "name":"Business Sintesi"}, function(){});


app.listen(3000);
