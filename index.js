require("dotenv").config();
const Koa = require("koa");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const basicAuth = require('koa-basic-auth');

console.log("App is starting");
console.log("");

console.log("Checking mandatory .env settings");
const settingsServerENV = process.env["SERVER_ENV"];
console.log("SERVER_ENV: " + settingsServerENV);
if (settingsServerENV == undefined) {
  console.log("Could not retrieve SERVER_END in .env file. Shutting down...");
  return;
}
const settingsListeningPortENV = process.env["LISTENING_PORT"];
console.log("LISTENING_PORT: " + settingsListeningPortENV);
if (settingsListeningPortENV == undefined) {
  console.log("Could not retrieve SERVER_END in .env file. Shutting down...");
  return;
}

const app = new Koa();

// middlewares

app.use(logger());
app.use(cors());
app.use(koaBody());
app.use(bodyParser());

// routes from api files
let departmentsAPI = require("./api/departmentsAPI.js");
let teamsAPI = require("./api/teamsAPI.js");
let employeesAPI = require("./api/employeesAPI.js");
let employeesTeamsAPI = require("./api/employeesTeamsAPI.js");
let usersAPI = require("./api/usersAPI.js");
let authAPI = require("./api/authAPI.js");
let testAPI = require("./api/testAPI.js");

app.use(departmentsAPI.routes());
app.use(teamsAPI.routes());
app.use(employeesAPI.routes());
app.use(employeesTeamsAPI.routes());
app.use(usersAPI.routes());
app.use(authAPI.routes());
app.use(testAPI.routes());

console.log("All good. All ready. Fire some API to see things.");

app.listen(settingsListeningPortENV);
